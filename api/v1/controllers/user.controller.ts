import { Request, Response } from "express";

import { IUserFull } from "../interfaces/user.interface";

import userService from "../services/user.service";

import md5Util from "../../../utils/md5.util";
import jwtUtil from "../../../utils/jwt.util";

// [POST] /api/v1/users/create
const register = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = md5Util.encodePassword(req.body.password);
    const phoneNumber = req.body.phoneNumber;
    const fullName = req.body.fullName;
    const address = req.body.address;

    const userExists = await userService.findByEmail(email);
    if (userExists) {
      return res.status(400).json({
        status: false,
        message: "User email was exists."
      });
    }

    const newUser = await userService.create({
      email,
      password,
      phoneNumber,
      fullName,
      address
    });
    return res.status(201).json({
      status: true,
      message: "User was registered successfully.",
      data: newUser
    })
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    });
  }
}

// [POST] /api/v1/users/login
const login = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = md5Util.encodePassword(req.body.password);

    const userExists = await userService.findByEmailAndPassword(email, password);
    if (!userExists) {
      return res.status(400).json({
        status: false,
        message: "Email or password were incorrect."
      });
    }

    const user: Pick<IUserFull, "code"> = { code: userExists.id };
    const accessToken = jwtUtil.generate(user, "1d");
    const refreshToken = jwtUtil.generate(user, "7d");

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7
    });

    return res.status(200).json({
      status: true,
      message: "Login successfully.",
      data: {
        accessToken,
        refreshToken
      }
    });
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    });
  }
}

// [POST] /api/v1/users/refreshToken
const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        status: false,
        message: "Authentification denied."
      });
    }

    const verify = jwtUtil.verify(refreshToken);
    if (!verify.success) {
      return res.status(401).json({
        status: false,
        message: "Authentification denied."
      });
    }

    const userId = verify.user.code;
    const userExists = await userService.findById(userId);
    if (!userExists) {
      return res.status(400).json({
        status: false,
        message: "User id not found."
      });
    }

    const accessToken = jwtUtil.generate({ code: userId }, "1d");
    return res.status(200).json({
      status: true,
      message: "Refresh token successfully.",
      data: { accessToken }
    });
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    });
  }
}

const userController = {
  register,
  login,
  refreshToken
};
export default userController;