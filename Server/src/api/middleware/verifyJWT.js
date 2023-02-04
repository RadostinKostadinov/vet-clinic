import jwt from 'jsonwebtoken';

export function verifyJWT(req, res, next) {
  const token = req.headers['x-vetclinic-auth-token'];
  if (token === undefined) {
    return res.status(401).send('Please log in.');
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err.message === 'jwt expired') {
      return res.status(403).send('Access Token expired.');
    }
    if (err) {
      return res.status(403).send('Invalid Access Token.');
    }

    req.user = decoded;
    next();
  });
}
