import { NextFunction, Request, Response } from "express";

import { EOrderStatus } from "../enums/order.enum";

// [POST] /api/v1/notifications/order-status
const orderStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderId = req.body.orderId;
    const status = req.body.status;

    if (
      !orderId ||
      !status
    ) {
      return res.status(400).json({
        status: false,
        message: "Missing required information."
      });
    }

    if (
      typeof orderId !== "string" ||
      typeof status !== "string"
    ) {
      return res.status(400).json({
        status: false,
        message: "Missing datatype."
      });
    }

    if (!Object.values(EOrderStatus).includes(status as EOrderStatus)) {
      return res.status(400).json({
        status: false,
        message: "Status was incorrect."
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

const notificationValidate = {
  orderStatus
};
export default notificationValidate;