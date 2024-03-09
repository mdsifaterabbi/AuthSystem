export const RegistrationController = async (req, res) => {
  try {
    const { name, email, phone, address, password, role, question } = req.body;

    //image with multer here

    res.send({
      message: "RegistrationController Working!",
      Name: name,
      Email: email,
      Phone: phone,
      Address: address,
      Password: password,
      Role: role,
      Question: question,
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
