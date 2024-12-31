import { Request, Response } from "express";

import orderService from "../services/order.service";
import notificationService from "../services/notification.service";

// [POST] /api/v1/notifications/order-status
const orderStatus = async (req: Request, res: Response) => {
  try {
    const orderId = req.body.orderId;
    const status = req.body.status;

    const orderExists = await orderService.findById(orderId);
    if (!orderExists) {
      return res.status(400).json({
        status: false,
        message: "Order id not found."
      });
    }

    const newNotification = await notificationService.orderStatus({
      orderId,
      status
    });
    return res.status(200).json({
      status: true,
      message: "Notification was created successfully.",
      data: newNotification
    });
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    });
  }
}

const notificationController = {
  orderStatus
};
export default notificationController;