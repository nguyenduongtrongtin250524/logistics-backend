import mongoose from "mongoose";

import { IDriverFull } from "../interfaces/driver.interface";

export interface DriverDocument extends IDriverFull, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
};

const DriverSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  vehicleLicensePlate: {
    type: String,
    required: true
  },
  vehicleType: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const DriverModel = mongoose.model<DriverDocument>("drivers", DriverSchema);
export default DriverModel;