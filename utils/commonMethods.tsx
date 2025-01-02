import { getUserDetails } from "@/actions/auth-actions";

export interface UserInfo {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}
export const setTokenCookie = (token: string) => {
  const expirationTime = new Date();
  expirationTime.setHours(expirationTime.getHours() + 1);
  document.cookie = `token=${token}; expires=${expirationTime.toUTCString()}; path=/; SameSite=Lax; Secure`;
  return document.cookie;
};

export const getUserInfo = async (token: string) => {
  const response = await getUserDetails(token);
  return response;
};
