import { IDriverFull } from "../interfaces/driver.interface";
import DriverModel from "../models/driver.model"

const findByEmail = async (email: string) => {
  const driverExists = await DriverModel
    .findOne({ email })
    .select("-password");
  return driverExists;
}

const create = async (driver: Partial<IDriverFull>) => {
  const newDriver = new DriverModel(driver);
  await newDriver.save();

  const driverExists = await DriverModel
    .findOne({
      _id: newDriver.id
    })
    .select("-password");
  return driverExists;
}

const driverService = {
  findByEmail,
  create
};
export default driverService;