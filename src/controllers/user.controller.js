import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, username, email, password, phoneNumber, address } =
    req.body;

  if (
    [fullName, email, username, password, phoneNumber, address].some(
      (field) => field?.trim() == "",
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existedUser) {
    throw new ApiError(409, "User Already Existed..");
  }

  const userImageLocalPath = req.files?.userImage[0]?.path;
  if (!userImageLocalPath) {
    throw new ApiError(400, "User Image Field Required");
  }

  const userImage = await uploadOnCloudinary(userImageLocalPath);

  const user = await User.create({
    fullName,
    username: username.toLowerCase(),
    password,
    email,
    userImage: userImage?.url || "",
    phoneNumber,
    address,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong when Registering User");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, "User Created Successfully..", createdUser));
});

export { registerUser };
