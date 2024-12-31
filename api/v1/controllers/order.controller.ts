import { Request, Response } from "express";


import { EOrderStatus } from "../enums/order.enum";
import orderService from "../services/order.service";

// [POST] /api/v1/orders/create
const create = async (req: Request, res: Response) => {
  try {
    const pickupAddress = req.body.pickupAddress;
    const deliveryAddress = req.body.deliveryAddress;
    const packageDetails = req.body.packageDetails;
    const deliveryTime = req.body.deliveryTime;

    const newOrder = await orderService.create({
      pickupAddress,
      deliveryAddress,
      packageDetails,
      deliveryTime,
      status: EOrderStatus.PENDING
    });
    return res.status(201).json({
      status: true,
      message: "Order was created successfully.",
      data: newOrder
    });
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    });
  }
}

// [GET] /api/v1/orders/track/:id
const track = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const orderExists = await orderService.findById(id);
    if (!orderExists) {
      return res.status(404).json({
        status: false,
        message: "Order id not found."
      });
    }
    return res.status(200).json({
      status: true,
      message: "Order status retrieved successfully.",
      data: {
        status: orderExists.status
      }
    })
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    });
  }
}

const orderController = {
  create,
  track
};
export default orderController;