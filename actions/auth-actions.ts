"use server";

import axios from "axios";

export const registerUserAction = async (formData: FormData) => {
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");
  const errors = { firstName: "", lastName: "", email: "", password: "" };
  if (typeof firstName !== "string" || !firstName.trim()) {
    errors.firstName = "First name must be provided and contain only letters.";
  }

  const nameRegex = /^[A-Za-z]+$/;
  if (!firstName) {
    errors.firstName = "First name is required";
  }
  if (firstName && !nameRegex.test(firstName.toString())) {
    errors.firstName =
      "First name must contain only letters and no special characters.";
  }
  if (lastName && typeof lastName === "string" && !nameRegex.test(lastName)) {
    errors.lastName = "Last name can only contain letters.";
  }
  if (!email) {
    errors.email = "Email is required";
  }

  if (!password) {
    errors.password = "Password is required";
  }
  if (
    typeof password !== "string" ||
    (password.length > 0 && password.length < 8)
  ) {
    errors.password = "Password must contain at least 8 characters";
  }
  if (Object.values(errors).some((error) => error !== "")) {
    return { errors };
  }

  return { success: true };
};

export const loginUserAction = async (formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  const errors = { email: "", password: "" };

  if (!email) {
    errors.email = "Email is required";
  }
  if (!password) {
    errors.password = "Password is required";
  }
  if (typeof password !== "string" || password.length < 8) {
    errors.password = "Password must contain at least 8 characters";
  }
  if (Object.values(errors).some((error) => error !== "")) {
    return { errors };
  }

  return { success: true };
};

export const createUser = async (formData: FormData) => {
  const email = formData.get("email");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const password = formData.get("password");
  try {
    const response = await axios.post("http://localhost:3333/auth/signup", {
      email,
      firstName,
      lastName,
      password,
    });
    if (response.status === 201) {
      return response.data;
    }
  } catch (err) {
    console.log("Error saving user to the database ", err);
  }
};
export const loginUser = async (formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    const response = await axios.post("http://localhost:3333/auth/login", {
      email,
      password,
    });
    if (response.status === 201) {
      return response.data;
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const { message } = error.response.data;
      return message;
    } else {
      console.log("Error loading user from the database ", error);
    }
  }
};

export const getUserDetails = async (token: string | null) => {
  try {
    if (!token) return null;
    const response = await axios.get(
      `http://localhost:3333/auth/userInfo?token=${token}`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching user info ", error);
  }
};

export const loadUserDetailsFromID = async (userId: string) => {
  try {
    if (!userId) return null;
    const response = await axios.get(
      `http://localhost:3333/user/loadUser?userId=${userId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching user info ", error);
  }
};

export const searchResults = async (query: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3333/user/searchUsers?q=${query}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error fetching users info ", error);
  }
};
