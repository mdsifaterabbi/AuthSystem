import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Boolean,
      default: 0,
    },
    question: {
      type: String,
      required: true,
    },
    profileImage: {
      type: [
        {
          data: Buffer, // Binary data representing the image content
          contentType: String, // MIME type of the image (e.g., "image/jpeg")
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("UsersModel", usersSchema);
