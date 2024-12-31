import { EPaymentPaymentMethod } from "../enums/payment.enum";
import { OrderDocument } from "../models/order.model";

interface IPaymentFull {
  orderId: OrderDocument["_id"];
  amount: number;
  paymentMethod: EPaymentPaymentMethod;
};

export {
  IPaymentFull
};