import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// ROUTE FOR USER LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Generate token if credentials are valid
    const token = createToken(user._id);
    res.status(200).json({ success: true, token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// ROUTE FOR USER REGISTER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body; // to get data from user

    // to check user exsist or not
    const userExists = await userModel.findOne({ email });

    if (userExists) {
      return res.json({ success: false, message: "User already exsist" });
    }

    // validating strong password and email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email" });
    }
    if (password.length < 8) {
      return res.json({ success: "Password should contain min 8 character" });
    }

    //password hashing
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashpassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ROUTE FOR ADMIN LOGIN
const adminLogin = async (req, res) => {
  try {
    
    const { email , password} = req.body ;
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
      const token = jwt.sign(email+password,process.env.JWT_SECRET)
      res.json({ success : true , token})
    }

  } catch (error) {
    console.log(error)
    res.status(200).json({ success : false , message : "Invalid credentials"})
  }
};

export { loginUser, adminLogin, registerUser };
