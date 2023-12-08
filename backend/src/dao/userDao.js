import UserModel from "../models/user.js";

export const findUserByEmail = (emailId) => UserModel.findOne({email: emailId});
export const createUser = (user) => UserModel.create(user);
export const findUserById = (id) => UserModel.findById(id);
export const findUserByCredentials = (email, password) => UserModel.findOne(
    {email: email, password: password});
export const updateUser = (id, user) => UserModel.updateOne({_id: id}, user);
export const deleteUser = (id) => UserModel.deleteOne({_id: id});