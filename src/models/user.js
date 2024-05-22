import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    unique: false,
    required: true,
  },
  email: {
    type: String,
    unique: false,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
},
// {
//     timestamps: true,
// }
);

export const User = mongoose.model("user", userSchema);
