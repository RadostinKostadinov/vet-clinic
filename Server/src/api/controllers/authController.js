import jwt from 'jsonwebtoken';

import clientsTable from '../services/database/clientsTable.js';
import employeesTable from '../services/database/employeesTable.js';
import refreshTokenTable from '../services/database/refreshTokenTable.js';
import {
  clientValidations,
  employeeValidations
} from '../validations/index.js';
import { comparePasswords } from '../services/authService.js';
import { GlobalVariables } from '../../config/index.js';
import generateResponseObject from '../helpers/generateResponseObject.js';

export default {
  clientLogin,
  employeeLogin,
  refreshToken,
  logout
};

async function clientLogin(req, res) {
  try {
    clientValidations.userName(req.body.username);
    clientValidations.password(req.body.password);
    const dbUser = await clientsTable.getClientByUsername(req.body.username);
    await comparePasswords(req.body.password, dbUser.password);

    // Generate the data that will be saved in JWT
    const userData = dbUser.toJSON();
    userData.role = GlobalVariables.userRoles.client;

    // Generate JWTokens
    const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN * 1000
    });
    const refreshToken = jwt.sign(userData, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN * 1000
    });

    // Add refreshToken to DB(VetClinic.RefreshTokens)
    const expiresAt = new Date(
      new Date().getTime() + process.env.REFRESH_TOKEN_EXPIRES_IN * 1000
    );
    refreshTokenTable.addRefreshToken(
      userData.username,
      refreshToken,
      expiresAt,
      GlobalVariables.userRoles.client
    );

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: true,
      maxAge: process.env.REFRESH_TOKEN_EXPIRES_IN * 1000
    });
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: true,
      maxAge: process.env.ACCESS_TOKEN_EXPIRES_IN * 1000
    });
    const response = generateResponseObject(
      200,
      'Successfully logged in.',
      userData
    );
    res.status(200).json(response);
  } catch (error) {
    console.error(
      `[${new Date().toLocaleString()}] clientLogin(${req.body.username}): ${error.message
      }`
    );

    const response = generateResponseObject(400, error.message, []);
    res.status(400).json(response);
  }
}

async function employeeLogin(req, res) {
  try {
    employeeValidations.userName(req.body.username);
    employeeValidations.password(req.body.password);
    const dbUser = await employeesTable.getEmployeeByUsername(
      req.body.username
    );
    await comparePasswords(req.body.password, dbUser.password);

    // ToDo: Find a better solution
    await refreshTokenTable.removeExpiredTokens();

    // Generate the data that will be saved in JWT
    const userData = dbUser.toJSON();
    userData.role = GlobalVariables.userRoles.employee;

    // Generate JWTokens
    const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN * 1000
    });
    const refreshToken = jwt.sign(userData, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN * 1000
    });

    // Add refreshToken to DB(VetClinic.RefreshTokens)
    const expiresAt = new Date(
      new Date().getTime() + process.env.REFRESH_TOKEN_EXPIRES_IN * 1000
    );
    refreshTokenTable.addRefreshToken(
      userData.username,
      refreshToken,
      expiresAt,
      GlobalVariables.userRoles.employee
    );

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: true,
      maxAge: process.env.REFRESH_TOKEN_EXPIRES_IN * 1000
    });
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: true,
      maxAge: process.env.ACCESS_TOKEN_EXPIRES_IN * 1000
    });
    const response = generateResponseObject(
      200,
      'Successfully logged in.',
      userData
    );
    res.status(200).json(response);
  } catch (error) {
    console.error(
      `[${new Date().toLocaleString()}] employeeLogin(${req.body.username}): ${error.message
      }`
    );

    const response = generateResponseObject(500, error.message, []);
    res.status(500).json(response);
  }
}

async function refreshToken(req, res) {
  const refreshToken = req.cookies.refresh_token;

  // If the http request doesn't contain refresh token cookie.
  console.log(refreshToken);
  if (refreshToken === undefined) {
    console.error(
      `[${new Date().toLocaleString()}] refreshToken: Cookies doesn't contain JWT Refresh Token.`
    );
    const response = generateResponseObject(
      403,
      'There is a problem with the refresh token',
      []
    );
    return res.status(403).json(response);
  }

  try {
    // Gets data from DB about the received refresh token.
    const dbToken = await refreshTokenTable.getRefreshToken(refreshToken);

    // Verify token
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || dbToken.username !== decoded.username) {
          console.error(
            `[${new Date().toLocaleString()}] refreshToken: Error in token verification.`
          );

          const response = generateResponseObject(
            403,
            'There is a problem with the refresh token',
            []
          );
          res.status(403).json(response);
        }

        delete decoded.iat;
        delete decoded.exp;
        const accessToken = jwt.sign(decoded, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN * 1000
        });

        res.cookie('access_token', accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: true,
          maxAge: process.env.ACCESS_TOKEN_EXPIRES_IN * 1000
        });

        const response = generateResponseObject(
          200,
          'Access token refreshed successful',
          []
        );
        res.status(200).json(response);
      }
    );
  } catch (error) {
    console.error(
      `[${new Date().toLocaleString()}] refreshToken: ${error.message}`
    );

    res.sendStatus(500);
  }
}

async function logout(req, res) {
  const refreshToken = req.cookies.refresh_token;

  // If the http request doesn't contain refresh token cookie.
  if (refreshToken === undefined) {
    const response = generateResponseObject(
      200,
      'Successfully logged out.',
      []
    );
    return res.status(200).json(response);
  }

  try {
    // Delete refresh token from DB.
    await refreshTokenTable.removeToken(refreshToken);

    res.clearCookie('refresh_token', { httpOnly: true }); // On Production add -> secure: true
    res.clearCookie('access_token', { httpOnly: true }); // On Production add -> secure: true
    const response = generateResponseObject(
      200,
      'Successfully logged out.',
      []
    );
    res.status(200).json(response);
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] logout: ${error.message}`);

    res.clearCookie('refresh_token', { httpOnly: true }); // On Production add -> secure: true
    res.clearCookie('access_token', { httpOnly: true }); // On Production add -> secure: true

    const response = generateResponseObject(
      200,
      'Successfully logged out.',
      []
    );
    res.status(200).json(response);
  }
}
