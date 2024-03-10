import path from "path";
import fs from "fs";
import multer from "multer";
import "dotenv/config";
import express from "express";
import cors from "cors";
import UsersModel from "../Models/UsersModel.js";

export const RegistrationController = async (req, res) => {
  try {
    const { name, email, phone, address, password, role, question } = req.body;
    const avatarFile = req.file;

    //validation here

    const newUser = new UsersModel({
      name,
      email,
      phone,
      address,
      password,
      role,
      question,
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
      Question: question,
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

    res.send({
      message: "LoginController working!",
      Email: email,
      Password: password,
    });
  } catch (error) {
    console.log(error);
    res.send({
      message: "Error occurred in LoginController",
      error,
    });
  }
};
