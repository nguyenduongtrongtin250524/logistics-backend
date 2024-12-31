import mongoose from "mongoose";

import { IOrderFull } from "../interfaces/order.interface";
import { EOrderStatus } from "../enums/order.enum";

export interface OrderDocument extends IOrderFull, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
};

const OrderSchema = new mongoose.Schema({
  pickupAddress: {
    type: String,
    required: true
  },
  deliveryAddress: {
    type: String,
    required: true
  },
  packageDetails: {
    type: String,
    required: true
  },
  deliveryTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: Object.values(EOrderStatus),
    required: true
  }
}, {
  timestamps: true
});

const OrderModel = mongoose.model<OrderDocument>("orders", OrderSchema);
export default OrderModel;