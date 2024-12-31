import { EOrderStatus } from "../enums/order.enum";

interface IOrderFull {
  pickupAddress: string;
  deliveryAddress: string;
  packageDetails: string;
  deliveryTime: Date;
  status: EOrderStatus
};

export { IOrderFull };