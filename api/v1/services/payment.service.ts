import { IPaymentFull } from "../interfaces/payment.interface";
import PaymentModel from "../models/payment.model";

const create = async (payment: Partial<IPaymentFull>) => {
  const newPayment = new PaymentModel(payment);
  await newPayment.save();
  return newPayment;
}

const paymentService = {
  create
};
export default paymentService;