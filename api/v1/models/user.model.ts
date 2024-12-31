import mongoose from "mongoose";
import { IUserFull } from "../interfaces/user.interface";

export interface UserDocument extends IUserFull, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
};

const UserSchema = new mongoose.Schema({
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
  address: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const UserModel = mongoose.model<UserDocument>("users", UserSchema);
export default UserModel;