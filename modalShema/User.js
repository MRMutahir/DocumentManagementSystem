import mongoose, { Mongoose } from "mongoose";
const UserSshema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);
let User = mongoose.model("user", UserSshema);

export { User };
