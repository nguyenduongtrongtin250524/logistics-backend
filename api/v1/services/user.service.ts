import { IUserFull } from "../interfaces/user.interface";
import UserModel from "../models/user.model"

const findById = async (id: string) => {
  const userExists = await UserModel.findOne({ _id: id });
  return userExists;
}

const findByEmail = async (email: string) => {
  const userExists = await UserModel.findOne({ email });
  return userExists;
}

const findByEmailAndPassword = async (email: string, password: string) => {
  const userExists = await UserModel.findOne({ email, password });
  return userExists;
}

const create = async (user: Partial<IUserFull>) => {
  const newUser = new UserModel(user);
  await newUser.save();
  return newUser;
}

const userService = {
  findById,
  findByEmail,
  findByEmailAndPassword,
  create
};
export default userService;