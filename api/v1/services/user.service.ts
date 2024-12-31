import { IUserFull } from "../interfaces/user.interface";
import UserModel from "../models/user.model"

const findById = async (id: string) => {
  const userExists = await UserModel
    .findOne({ _id: id })
    .select("-password");
  return userExists;
}

const findByEmail = async (email: string) => {
  const userExists = await UserModel
    .findOne({ email })
    .select("-password");
  return userExists;
}

const findByEmailAndPassword = async (email: string, password: string) => {
  const userExists = await UserModel
    .findOne({ email, password })
    .select("-password");
  return userExists;
}

const create = async (user: Partial<IUserFull>) => {
  const newUser = new UserModel(user);
  await newUser.save();

  const userExists = await UserModel
    .findOne({
      _id: newUser.id
    })
    .select("-password");
  return userExists;
}

const userService = {
  findById,
  findByEmail,
  findByEmailAndPassword,
  create
};
export default userService;