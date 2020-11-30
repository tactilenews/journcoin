import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config';

export default async function context({ req }) {
  let token = req.headers.authorization || '';
  token = token.replace('Bearer ', '');
  try {
    const decoded = await jwt.verify(token, JWT_SECRET);
    return { ...decoded, jwt };
  } catch (e) {
    return { jwt };
  }
}
