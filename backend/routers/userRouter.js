import express from 'express';
import bcrypt from 'bcrypt';
import expressAsyncHandler from 'express-async-handler';
import { getToken } from '../utils/auth.js';
import User from '../models/user.js';

const userRouter = express.Router();

//POST
//Verifies the sent username and password data and sends back the userinfo with JWT token for authorization
userRouter.post(
  '/login',
  expressAsyncHandler(async (req, res) => {
    const signedinUser = await User.findByPk(req.body.username, { raw: true });
    console.log(signedinUser);
    if (
      signedinUser &&
      bcrypt.compareSync(req.body.password, signedinUser.password)
    ) {
      console.log('beforeRes ' + getToken(signedinUser));
      res.send({
        username: signedinUser.username,
        firstName: signedinUser.first_name,
        lastName: signedinUser.last_name,
        isAdmin: signedinUser.isAdmin,
        userToken: getToken(signedinUser),
      });
    } else {
      res.status(401).send({ message: 'Invalid User or Password!' });
    }
  })
);

export default userRouter;
