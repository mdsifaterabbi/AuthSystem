import path from "path";
import fs from "fs";
import multer from "multer";
import "dotenv/config";
import express from "express";
import cors from "cors";
import UsersModel from "../Models/UsersModel.js";
import { hashPassword, comparePassword } from "../Helpers/AuthHelper.js";
import JWT from "jsonwebtoken";

export const RegistrationController = async (req, res) => {
  try {
    const { name, email, phone, address, password, role, answer } = req.body;
    const avatarFile = req.file;

    //validation here
    if (!name) {
      return res.send({ error: "name is required" });
    }
    if (!email) {
      return res.send({ error: "email is required" });
    }
    if (!phone) {
      return res.send({ error: "phone is required" });
    }
    if (!address) {
      return res.send({ error: "address is required" });
    }
    if (!password) {
      return res.send({ error: "password is required" });
    }
    if (!answer) {
      return res.send({ error: "answer is required" });
    }

    //checking exixting user
    const existingUser = await UsersModel.findOne({ email });
    if (existingUser) {
      return res.send({
        message: `This user is already registered with this ${email}`,
      });
    }

    //making the password hashed password
    const hashedPassword = await hashPassword(password);

    const newUser = new UsersModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      role,
      answer,
      profileImage: [
        {
          data: fs.readFileSync(avatarFile.path), //Read file contents
          contentType: avatarFile.mimetype,
        },
      ],
    });

    // Save the newUser data to MongoDB
    await newUser.save();

    res.send({
      message: "RegistrationController Working!",
      Name: name,
      Email: email,
      Phone: phone,
      Address: address,
      Password: password,
      Role: role,
      Answer: answer,
      filename: avatarFile?.filename,
      originalname: avatarFile?.originalname,
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.send({
      message: "Error occurred in RegistrationController",
      error,
    });
  }
};

export const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.send({ message: "Please enter email and password" });
    }

    //check user
    const thisUser = await UsersModel.findOne({ email });
    if (!thisUser) {
      return res.send({ message: "This user is not registered" });
    }

    //comparing password with hashed password
    const match = await comparePassword(password, thisUser.password);

    if (!match) {
      return res.send({ message: "Password not matched!" });
    }

    //now creating json web token after successfull login
    const token = await JWT.sign(
      { _id: thisUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.send({
      message: "LoginController working!",
      Email: email,
      Password: password,
      hashedPassword: thisUser.password,
      Token: token,
    });
  } catch (error) {
    console.log(error);
    res.send({
      message: "Error occurred in LoginController",
      error,
    });
  }
};
