import { IOrderFull } from "../interfaces/order.interface";
import OrderModel from "../models/order.model";

const findById = async (id: string) => {
  const orderExists = await OrderModel.findOne({
    _id: id
  });
  return orderExists;
}

const create = async (order: Partial<IOrderFull>) => {
  const newOrder = new OrderModel(order);
  await newOrder.save();
  return newOrder;
}

const orderService = {
  findById,
  create
};
export default orderService;