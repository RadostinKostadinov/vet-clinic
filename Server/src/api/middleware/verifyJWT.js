import jwt from 'jsonwebtoken';

export function verifyJWT(req, res, next) {
  const accessToken = req.cookies.access_token;
  if (accessToken === undefined) {
    return res.status(401).send('Please log in.');
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send('Invalid Access Token.');
    }
    req.user = decoded;
    next();
  });
}
