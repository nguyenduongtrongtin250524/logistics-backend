import { NextFunction, Request, Response } from "express";

import validateHelper from "../../../helpers/validate.helper";

// [POST] /api/v1/users/create
const register = (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const phoneNumber = req.body.phoneNumber;
    const fullName = req.body.fullName;
    const address = req.body.address;

    if (
      !email ||
      !password ||
      !phoneNumber ||
      !fullName ||
      !address
    ) {
      return res.status(400).json({
        status: false,
        message: "Missing required information."
      });
    }

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof phoneNumber !== "string" ||
      typeof fullName !== "string" ||
      typeof address !== "string"
    ) {
      return res.status(400).json({
        status: false,
        message: "Missing datatype."
      });
    }

    if (!validateHelper.validateEmail(email)) {
      return res.status(400).json({
        status: false,
        message: "Email was incorrect."
      });
    }

    if (!validateHelper.validatePassword(password)) {
      return res.status(400).json({
        status: false,
        message: "Password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character."
      });
    }

    if (!validateHelper.validatePhoneNumber(phoneNumber)) {
      return res.status(400).json({
        status: false,
        message: "Phone number was incorrect."
      });
    }

    return next();
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    });
  }
}

const userValidate = {
  register
};
export default userValidate;