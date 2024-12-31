import { EOrderStatus } from "../enums/order.enum";
import { OrderDocument } from "../models/order.model";

interface INotificationFull {
  orderId: OrderDocument["_id"];
  status: EOrderStatus;
};

export {
  INotificationFull
};