const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET, URL = 'http://localhost:3000' } = process.env;

const [personId] = process.argv.slice(2);
const randomId = require('crypto').randomBytes(64).toString('base64');

const payload = personId ? { person: { id: personId } } : { coin: { id: randomId } };
const jwt = jsonwebtoken.sign(payload, JWT_SECRET);

// eslint-disable-next-line no-console
console.log(`${URL}/?jwt=${jwt}`);
