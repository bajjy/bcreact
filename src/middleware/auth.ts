import jwt from 'jsonwebtoken';
import config from '../config/config';
import type { Request, Response, NextFunction } from 'express';
// import type { IUserRequest } from '../types';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.body.token || req.query['token'] || req.params['token'] || req.headers['x-access-token'];

  if (!token) return res.status(403).send('Token required');

  try {
    const decoded = jwt.verify(token, config.key_token);
    //req.user = decoded;
    console.log(decoded);
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
};

export default verifyToken;