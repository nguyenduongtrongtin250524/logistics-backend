import mongoose from "mongoose";

import { INotificationFull } from "../interfaces/notification.interface";
import { EOrderStatus } from "../enums/order.enum";

export interface NotificationDocument extends INotificationFull, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
};

const NotificationSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "orders"
  },
  status: {
    type: String,
    enum: EOrderStatus
  }
}, {
  timestamps: true
});

const NotificationModel = mongoose.model<NotificationDocument>("notifications", NotificationSchema);
export default NotificationModel;