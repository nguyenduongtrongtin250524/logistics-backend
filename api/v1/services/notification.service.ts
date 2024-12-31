import { INotificationFull } from "../interfaces/notification.interface";
import NotificationModel from "../models/notification.model";

const orderStatus = async (notification: Partial<INotificationFull>) => {
  const newNotification = new NotificationModel(notification);
  await newNotification.save();
  return newNotification;
}

const notificationService = {
  orderStatus
};
export default notificationService;