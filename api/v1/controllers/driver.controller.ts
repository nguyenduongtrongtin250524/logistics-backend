import { Request, Response } from "express";

import driverService from "../services/driver.service";
import userService from "../services/user.service";
import md5Util from "../../../utils/md5.util";

// [POST] /api/v1/drivers/register
const register = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = md5Util.encodePassword(req.body.password);
    const phoneNumber = req.body.phoneNumber;
    const fullName = req.body.fullName;
    const vehicleLicensePlate = req.body.vehicleLicensePlate;
    const vehicleType = req.body.vehicleType;

    const userExists = await userService.findByEmail(email);
    const driverExists = await driverService.findByEmail(email);
    if (userExists || driverExists) {
      return res.status(400).json({
        status: false,
        message: "Email was exists."
      });
    }

    const newDriver = await driverService.create({
      email,
      password,
      phoneNumber,
      fullName,
      vehicleLicensePlate,
      vehicleType
    });
    return res.status(201).json({
      status: true,
      message: "Driver was registered successfully.",
      data: newDriver
    });
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    });
  }
}

const driverController = {
  register
};
export default driverController;