import jwt from 'jsonwebtoken';
import config from './config.js';

//Simple JWT Token Authorization for private API endpoints

//Create token for user
const getToken = (user) => {
  return jwt.sign(
    {
      username: user.username,
      password: user.password,
      firstName: user.first_name,
      lastName: user.last_name,
    },
    config.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

//Verify user token
const isAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const onlyToken = token.slice(7, token.length);

    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};

export { getToken, isAuth };
