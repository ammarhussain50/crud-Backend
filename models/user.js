// models/user.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  image: String
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;