"use client";
import { loginUser, loginUserAction } from "@/actions/auth-actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [invalidCredentials, setInvalidCredentials] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await loginUserAction(formData);
    if (response.errors) {
      setErrors(response.errors);
    } else {
      const data = await loginUser(formData);
      if (data === "Invalid Credentials") {
        setInvalidCredentials("Invalid Credentials");
      } else {
        router.push("/");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-8">
          Next-Social
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-600 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Log In
          </button>
          {invalidCredentials && (
            <p className="text-red-600 font-semibold text-sm mt-2">
              {invalidCredentials}
            </p>
          )}
          <div className="flex p-2 gap-2 items-center justify-center">
            <p>New to Next-Social?</p>
            <Link href="/signUp">
              <p className="text-blue-600 font-bold">Join now</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
