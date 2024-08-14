import { isAxiosError } from "axios";
import api from "../lib/axios";
import { UserPasswordForm, UserProfileForm } from "../types";
// import { updatePassword } from "./AuthAPI";

export async function updateProfile(formData: UserProfileForm) {
  try {
    const url = `/auth/profile`;
    const { data } = await api.put<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      console.log(error);
    }
  }
}

export async function updatePassword(formData: UserPasswordForm){
  try {
    const url = '/auth/update-password'
    const { data } = await api.post<string>(url, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      console.log(error);
    }
  }
}