import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { User } from "../schemas/User.model";
import passport from "passport";
import jwt from "jsonwebtoken";
import validateRegister from "../middleware/validateRegister";
import qs from 'qs';

class apiController {
  register = async (req: Request, res: Response): Promise<any> => {
    try {
      let { username, password } = req.body;
      let validateResult = validateRegister.check(username, password);

      if (validateResult === "bothValid") {
        let isUsernameExist = await User.findOne({ username: username });
        if (isUsernameExist) {
          res.status(400).json({message: 'Register fail'});
        } else {
          const salt = await bcrypt.genSaltSync(10);
          password = await bcrypt.hashSync(password, salt);

          let newUser = new User({ username, password });
          await newUser.save();
          res.status(200).json({ message: "Register success" });
        }
      } else {
        res.status(400).json({ message: validateResult });
      }
    } catch (error) {
      console.log(error);
    }
  };

  login = async (req: Request, res: Response) => {
    let { username, password } = req.body;
    let user = await User.findOne({ username: username });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          let token = jwt.sign(
            {
              iss: "Book Store",
              sub: user.id,
              iat: new Date().getTime(),
            },
            process.env.USER_CODE_SECRET,
            { expiresIn: 604800000 }
          );
          res.cookie("authorization", "Bearer " + token, { signed: true });
          res.status(200).json({ message: "Login success", user, token });
        } else {
          res.status(400).json({ message: "wrong password" });
        }
      });
    }
  };

  logout  = async (req: Request, res: Response) => {
    let cookieObj = qs.parse(req.headers.cookie);
    let name = Object.keys(cookieObj)[0];
    res.clearCookie(name).status(200).json({message: 'logout success'});
  }
}

export default new apiController();
