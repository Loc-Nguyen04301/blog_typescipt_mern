import {
  generateAccessToken,
  generateRefreshToken,
} from "./../config/generateToken";
import { Request, Response } from "express";
import Users from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateActiveToken } from "../config/generateToken";

import { validateEmail, validPhone } from "../middlewares/valid";
import sendMail from "../config/sendMail";
import sendSMS from "../config/sendSMS";
import {
  InterfaceDecodedToken,
  InterfaceNewUser,
  InterfaceUser,
} from "../config/interface";
import { decode } from "punycode";

const saltRound = 10;

const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, account, password } = req.body;

      const user = await Users.findOne({ account });
      if (user)
        return res
          .status(400)
          .json({ message: "Email or Phone number already exists." });

      const passwordHash = await bcrypt.hash(password, saltRound);

      const newUser = { name, account, password: passwordHash };

      const active_token = generateActiveToken({ newUser });

      const url = active_token;

      if (validateEmail(account)) {
        sendMail(account, url, "Verify your email address");
        return res.json({ message: "Success! Please check your email." });
      } else if (validPhone(account)) {
        sendSMS(account, url, "Verify your phone number");
        return res.json({ message: "Success! Please check phone." });
      }
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  },

  activeAccount: async (req: Request, res: Response) => {
    try {
      const { active_token } = req.body;

      const decoded = <InterfaceDecodedToken>(
        jwt.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`)
      );

      const { newUser } = decoded;

      const user = new Users(newUser);

      await user.save();

      res.json({ message: "Account has been activated!" });
    } catch (err: any) {
      let errorMessage;
      if (err.code === 11000) {
        errorMessage =
          Object.keys(err.keyValue)[0] +
          " " +
          err.keyValue[Object.keys(err.keyValue)[0]] +
          " " +
          "already exists";
      }
      return res.status(500).json({ message: errorMessage });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { account, password } = req.body;

      const user = await Users.findOne({ account });
      // if account not exists
      if (!user) {
        return res.status(404).json({ message: "This account doesn't exist." });
      }
      // if account exists
      loginUser(user, password, res);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  },

  refreshToken: async (req: Request, res: Response) => {
    try {
      const refresh_token = req.cookies["REFRESH_TOKEN"];
      console.log(req.cookies);

      if (!refresh_token)
        return res.status(400).json({ message: "Please login now!" });

      const decoded = <InterfaceDecodedToken>(
        jwt.verify(refresh_token, `${process.env.REFRESH_TOKEN_SECRET}`)
      );

      if (!decoded.id)
        return res.status(400).json({ message: "Please login now!" });

      const user = await Users.findById(decoded.id);
      if (!user)
        return res.status(400).json({ message: "This account doesn't exist!" });

      const access_token = generateAccessToken({ id: user._id });

      return res.json({ access_token });
      
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  },

  logout: async (req: Request, res: Response) => {
    try {
      res.clearCookie("REFRESH_TOKEN", { path: "/api/v1/auth/refresh_token" });
      return res.json({ message: "Logged out." });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  },
};



const loginUser = async (
  user: InterfaceUser,
  password: string,
  res: Response
) => {
  //check Password
  const isMatchingPassword = await bcrypt.compare(password, user.password);
  if (!isMatchingPassword) {
    return res.status(400).json({ message: "Password is incorrect." });
  }

  const access_token = generateAccessToken({ id: user._id });
  const refresh_token = generateRefreshToken({ id: user._id });

  res.cookie("REFRESH_TOKEN", refresh_token, {
    httpOnly: true,
    path: "/api/v1/auth/refresh_token",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });

  return res.json({
    message: "Login Successfully",
    access_token,
    user: { ...user._doc },
  });
};

export default authController;
