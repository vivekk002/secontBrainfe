import type React from "react";
import Button from "./Button";
import InputBox from "./InputBox";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface PropsTypes {
  setForgotPassword: React.Dispatch<React.SetStateAction<boolean>>;
  forgotPassword: boolean;
}

const PasswordResetDia = (props: PropsTypes) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);

  const handlePasswordUpdate = async () => {
    try {
      const username = usernameRef.current?.value;
      const newPassword = newPasswordRef.current?.value;
      console.log(username);

      const response = await axios.post(`${BACKEND_URL}/reset-password`, {
        username,
        newPassword,
      });
      console.log(response);

      if (response.status === 200) {
        alert("Password updated successfully!");
        props.setForgotPassword(false);
      }
    } catch (error) {
      alert("Failed to reset password. Please try again.");
      console.log("error", error);
    }
  };
  return (
    <>
      {props.forgotPassword && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500/40  w-full h-full">
          <div className="bg-white p-6 rounded-lg flex flex-col items-center shadow-lime-300 gap-4 w-1/3 h-1/2">
            <div className="flex justify-between items-center gap-2">
              <h2 className="text-2xl font-bold p-5"> Reset Your Password</h2>
            <Button  label="Close" variant="secondary" size="md" onClick={() => props.setForgotPassword(false)}/>
            </div>
            <div className="  flex flex-col gap-2 w-full mb-8">
              <label className="mt-2">Username</label>
              <InputBox
                type="text"
                placeholder="enter your username"
                required={true}
                ref={usernameRef}
              />
              <label className="mt-4">New password</label>
              <InputBox
                type="password"
                placeholder="enter your new password"
                required={true}
                ref={newPasswordRef}
              />
            </div>
            <Button
              label="Reset Password"
              variant="primary"
              size="md"
              onClick={handlePasswordUpdate}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PasswordResetDia;
