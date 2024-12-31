import { Request, Response } from "express";

import orderService from "../services/order.service";
import paymentService from "../services/payment.service";

import vietqrHelper from "../../../helpers/vietqr.helper";
import { EPaymentPaymentMethod } from "../enums/payment.enum";

// [POST] /api/v1/payments/create
const create = async (req: Request, res: Response) => {
  try {
    const orderId = req.body.orderId;
    const amount = req.body.amount;
    const paymentMethod = req.body.paymentMethod;

    const orderExists = await orderService.findById(orderId);
    if (!orderExists) {
      return res.status(400).json({
        status: false,
        message: "Order id not found."
      });
    }

    const newPayment = await paymentService.create({
      orderId,
      amount,
      paymentMethod
    });
    switch (paymentMethod) {
      case EPaymentPaymentMethod.VIETQR: {
        const url = vietqrHelper.generate(amount, orderId);
        return res.status(201).json({
          status: true,
          message: "Payment was created successfully.",
          data: {
            url: url,
            payment: newPayment
          }
        });
      }
    }
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    });
  }
}

const paymentController = {
  create
};
export default paymentController;