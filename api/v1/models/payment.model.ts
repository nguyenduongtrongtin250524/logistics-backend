import mongoose from "mongoose";

import { IPaymentFull } from "../interfaces/payment.interface";
import { EPaymentPaymentMethod } from "../enums/payment.enum";

export interface PaymentDocument extends IPaymentFull, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
};

const PaymentSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "orders",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: Object.values(EPaymentPaymentMethod),
    required: true
  }
}, {
  timestamps: true
});

const PaymentModel = mongoose.model<PaymentDocument>("payments", PaymentSchema);
export default PaymentModel;