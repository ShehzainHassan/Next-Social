"use client";
import { loginUser, loginUserAction } from "@/actions/auth-actions";
import { validateEmail } from "@/utils/commonMethods/methods";
import { useToken } from "@/utils/contexts/TokenContext";
import { FormErrors } from "@/utils/schemaInterfaces";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignIn() {
  const { setToken } = useToken();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [invalidCredentials, setInvalidCredentials] = useState("");
  const [email, setEmail] = useState<string>("");
  const [emailInteraction, setEmailInteraction] = useState(false);
  const [passwordInteraction, setPasswordInteraction] = useState(false);

  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const response = await loginUserAction(formData);
    setIsLoading(true);

    if (response.errors) {
      setErrors(response.errors);
      setIsLoading(false);
    } else {
      const data = await loginUser(formData);
      if (data === "Invalid Credentials") {
        setInvalidCredentials("Invalid Credentials");
        setIsLoading(false);
      } else {
        setToken(data.token);
        router.push("/");
      }
    }
  };

  useEffect(() => {
    const formErrors: FormErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };

    if (emailInteraction) {
      if (!email.trim()) {
        formErrors.email = "Email cannot be empty";
      } else if (!validateEmail(email)) {
        formErrors.email = "Please enter a valid email address";
      }
    }

    if (passwordInteraction) {
      if (!password.trim()) {
        formErrors.password = "Password cannot be empty";
      } else if (password.length < 8) {
        formErrors.password = "Password must be at least 8 characters long";
      }
    }

    setErrors(formErrors);
  }, [email, password, emailInteraction, passwordInteraction]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-8 rounded-lg shadow-md dark:shadow-lg dark:shadow-gray6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-primary mb-8">
          Next-Social
        </h2>
        <form onSubmit={handleSubmit}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailInteraction(true)}
              placeholder="Enter your email"
              className={`w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${
                invalidCredentials || errors.email
                  ? "border-red2 focus:ring-red2 dark:bg-gray5"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setPasswordInteraction(true)}
              placeholder="Enter your password"
              className={`w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${
                invalidCredentials || errors.password
                  ? "border-red2 focus:ring-red2 dark:bg-gray5"
                  : "border-gray2 text-gray5 dark:bg-gray8 dark:text-gray2 focus:ring-blue2 dark:focus:ring-blue2"
              }`}
            />
            {errors.password && (
              <p className="text-red2 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue3 text-white rounded-md text-sm font-semibold hover:bg-blue4 focus:outline-none focus:ring-2 focus:ring-blue2 flex items-center justify-center"
            disabled={isLoading}>
            {isLoading ? (
              <>
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                Logging in...
              </>
            ) : (
              "Log In"
            )}
          </button>
          {invalidCredentials && (
            <p className="text-red2 font-semibold text-sm mt-2">
              {invalidCredentials}
            </p>
          )}
          <div className="flex p-2 gap-2 items-center justify-center">
            <p>New to Next-Social?</p>
            <Link href="/signUp">
              <p className="text-primary font-bold">Join now</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
