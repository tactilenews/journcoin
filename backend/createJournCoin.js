const jsonwebtoken = require('jsonwebtoken');

require('dotenv').config();

const [payload] = process.argv.slice(2);

const { JWT_SECRET } = process.env;
const signed = jsonwebtoken.sign(JSON.parse(payload), JWT_SECRET);

// eslint-disable-next-line no-console
console.log(JSON.stringify({ authorization: `Bearer ${signed}` }));
