import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

// Interface for User document
interface IUser extends Document {
  email: string;
  password: string;
}

// Interface for User model with static methods
interface IUserModel extends Model<IUser> {
  signup(email: string, password: string): Promise<IUser>;
  login(email: string, password: string): Promise<IUser>;
}

// User schema definition
const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Static signup method
userSchema.statics.signup = async function (
  email: string,
  password: string
): Promise<IUser> {
  // Validation
  if (!email || !password) {
    throw new Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw new Error("Email already in use");
  }

  const normalizedEmail = email.toLowerCase();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email: normalizedEmail, password: hash });

  return user;
};

// Static login method
userSchema.statics.login = async function (
  email: string,
  password: string
): Promise<IUser> {
  if (!email || !password) {
    throw new Error("All fields must be filled");
  }

  const normalizedEmail = email.toLowerCase();

  const user = await this.findOne({ email: normalizedEmail });

  if (!user) {
    throw new Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Incorrect password");
  }

  return user;
};

// Create and export the User model
const UserModel = mongoose.model<IUser, IUserModel>("User", userSchema);

export default UserModel;
