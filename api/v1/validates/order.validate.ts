import { NextFunction, Request, Response } from "express";
import validateHelper from "../../../helpers/validate.helper";

// [POST] /api/v1/orders/create
const create = (req: Request, res: Response, next: NextFunction) => {
  try {
    const pickupAddress = req.body.pickupAddress;
    const deliveryAddress = req.body.deliveryAddress;
    const packageDetails = req.body.packageDetails;
    const deliveryTime = req.body.deliveryTime;

    if (
      !pickupAddress ||
      !deliveryAddress ||
      !packageDetails ||
      !deliveryTime
    ) {
      return res.status(400).json({
        status: false,
        message: "Missing required informatino."
      });
    }

    if (
      typeof pickupAddress !== "string" ||
      typeof deliveryAddress !== "string" ||
      typeof packageDetails !== "string" ||
      typeof deliveryTime !== "string"
    ) {
      return res.status(400).json({
        status: false,
        message: "Missing datatype."
      });
    }

    const deliveryTimeDate = new Date(deliveryTime);
    if (!validateHelper.validateDate(deliveryTimeDate)) {
      return res.status(400).json({
        status: false,
        message: "Delivery time was incorrect."
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

const orderValidate = {
  create
};
export default orderValidate;