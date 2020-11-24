import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config';

export default function context({ req }) {
  let token = req.headers.authorization || '';
  token = token.replace('Bearer ', '');
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return {};
  }
}
