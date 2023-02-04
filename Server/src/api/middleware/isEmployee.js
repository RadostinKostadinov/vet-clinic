import { GlobalVariables } from '../../config/index.js';

export function isEmployee(req, res, next) {
  if (req.user.role === GlobalVariables.userRoles.employee) {
    next();
  } else {
    res.sendStatus(403);
  }
}
