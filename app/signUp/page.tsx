"use client";
import { createUser, registerUserAction } from "@/actions/auth-actions";
import { useToken } from "@/utils/contexts/TokenContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function SignUp() {
  const { setToken } = useToken();
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await registerUserAction(formData);
    if (response.errors) {
      setErrors(response.errors);
    } else {
      const data = await createUser(formData);
      if (data) {
        setToken(data.token);
        router.push("/");
      }
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-8 rounded-lg shadow-md dark:shadow-lg dark:shadow-gray6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue3 mb-8 ">
          Next-Social
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray7 mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                className={`w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${
                  errors.firstName
                    ? "border-red2 focus:ring-red2 dark:bg-gray5 "
                    : "border-gray2 text-gray5 dark:bg-gray8 dark:text-gray2 focus:ring-blue2 dark:focus:ring-blue2"
                }`}
              />
              {errors.firstName && (
                <p className="text-red2 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray7 mb-2">
                Last Name (Optional)
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                className={`w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${
                  errors.lastName
                    ? "border-red2 focus:ring-red2 dark:bg-gray5 "
                    : "border-gray2 text-gray5 dark:bg-gray8 dark:text-gray2 focus:ring-blue2 dark:focus:ring-blue2"
                }`}
              />
              {errors.lastName && (
                <p className="text-red2 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray7 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className={`w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red2 focus:ring-red2 dark:bg-gray5 "
                  : "border-gray2 text-gray5 dark:bg-gray8 dark:text-gray2 focus:ring-blue2 dark:focus:ring-blue2"
              }`}
            />
            {errors.email && (
              <p className="text-red2 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray7 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className={`w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red2 focus:ring-red2 dark:bg-gray5 "
                  : "border-gray2 text-gray5 dark:bg-gray8 dark:text-gray2 focus:ring-blue2 dark:focus:ring-blue2"
              }`}
            />
            {errors.password && (
              <p className="text-red2 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue3 text-white rounded-md text-sm font-semibold hover:bg-blue4 focus:outline-none focus:ring-2 focus:ring-blue2">
            Sign Up
          </button>
          <div className="flex p-2 gap-2 items-center justify-center">
            <p>Already a member?</p>
            <Link href="/signIn">
              <p className="text-blue3 font-bold">Log in</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
