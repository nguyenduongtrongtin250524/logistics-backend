import { NextFunction, Request, Response } from "express";
import { EPaymentPaymentMethod } from "../enums/payment.enum";

// [POST] /api/v1/payments/create
const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderId = req.body.orderId;
    const amount = req.body.amount;
    const paymentMethod = req.body.paymentMethod;

    if (
      !orderId ||
      amount === undefined ||
      !paymentMethod
    ) {
      return res.status(400).json({
        status: false,
        message: "Missing required information."
      });
    }

    if (
      typeof orderId !== "string" ||
      typeof amount !== "number" ||
      typeof paymentMethod !== "string"
    ) {
      return res.status(400).json({
        status: false,
        message: "Missing datatype."
      });
    }

    if (amount < 0) {
      return res.status(400).json({
        status: false,
        message: "Amount was incorrect."
      });
    }

    if (!Object.values(EPaymentPaymentMethod).includes(paymentMethod as EPaymentPaymentMethod)) {
      return res.status(400).json({
        status: false,
        message: "Payment method was incorrect."
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

const paymentValidate = {
  create
};
export default paymentValidate;