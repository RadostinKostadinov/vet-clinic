import jwt from 'jsonwebtoken';

import clientsTable from '../services/database/clientsTable.js';
import employeesTable from '../services/database/employeesTable.js';
import refreshTokenTable from '../services/database/refreshTokenTable.js';
import { clientValidations, employeeValidations } from '../validations/index.js';
import { comparePasswords } from '../services/authService.js';
import { GlobalVariables } from '../../config/index.js';

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

    // Generates the data that will be saved in JWT
    const userData = JSON.parse(dbUser.toJSON());
    userData.role = GlobalVariables.userRoles.client;

    // Generates JWTokens
    const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
    const refreshToken = jwt.sign(userData, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '60m' });

    // Adds refreshToken to DB(VetClinic.RefreshTokens)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);
    refreshTokenTable.addRefreshToken(userData.username, refreshToken, expiresAt, GlobalVariables.userRoles.client);

    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 1 * 60 * 60 * 1000 });
    res.status(200).json({ accessToken, userData });
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] clientLogin(${req.body.username}): ${error.message}`);

    res.status(500).send('Invalid data.');
  }
}

async function employeeLogin(req, res) {
  try {
    employeeValidations.userName(req.body.username);
    employeeValidations.password(req.body.password);
    const dbUser = await employeesTable.getEmployeeByUsername(req.body.username);
    await comparePasswords(req.body.password, dbUser.password);

    // ToDo: Find a better solution
    await refreshTokenTable.removeExpiredTokens();

    // Generates the data that will be saved in JWT
    const userData = JSON.parse(dbUser.toJSON());
    userData.role = GlobalVariables.userRoles.employee;

    // Generates JWTokens
    const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
    const refreshToken = jwt.sign(userData, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '480m' });

    // Adds refreshToken to DB(VetClinic.RefreshTokens)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 8);
    refreshTokenTable.addRefreshToken(userData.username, refreshToken, expiresAt, GlobalVariables.userRoles.employee);

    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 8 * 60 * 60 * 1000 });
    res.status(200).json({ accessToken, userData });
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] employeeLogin(${req.body.username}): ${error.message}`);

    res.status(500).send('Invalid data.');
  }
}

async function refreshToken(req, res) {
  const refreshToken = req.cookies.jwt;

  // If the http request doesn't contain refresh token cookie.
  if (refreshToken === undefined) {
    console.error(`[${new Date().toLocaleString()}] refreshToken: Cookies doesn't contain JWT Refresh Token.`);
    return res.sendStatus(401);
  }

  try {
    // Gets data from DB about the received refresh token.
    const dbToken = await refreshTokenTable.getRefreshToken(refreshToken);

    // Verify token
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err || dbToken.username !== decoded.username) {
        console.error(`[${new Date().toLocaleString()}] refreshToken: Error in token verification.`);
        return res.sendStatus(401);
      }

      delete decoded.iat;
      delete decoded.exp;
      const accessToken = jwt.sign(decoded, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
      res.status(200).json({ accessToken });
    });
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] refreshToken: ${error.message}`);

    res.sendStatus(500);
  }
}

async function logout(req, res) {
  const refreshToken = req.cookies.jwt;

  // If the http request doesn't contain refresh token cookie.
  if (refreshToken === undefined) {
    return res.sendStatus(204);
  }

  try {
    // Delete refresh token from DB.
    await refreshTokenTable.removeToken(refreshToken);

    res.clearCookie('jwt', { httpOnly: true }); // On Production add -> secure: true
    res.sendStatus(204);
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] logout: ${error.message}`);

    res.clearCookie('jwt', { httpOnly: true }); // On Production add -> secure: true
    res.sendStatus(204);
  }
}
