import { useRef, useState } from "react";
import Button from "../component/Button";
import InputBox from "../component/InputBox";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toast from "../component/Toast";
import { useToast } from "../hooks/useToast";
import { login } from "../utils/auth";
import PasswordResetDia from "../component/PasswordResetDia";

const SignIn = () => {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const { toast, showToast, hideToast } = useToast();
  const [forgotPassword, setForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSignin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/signin`, {
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
      });
      const jwt = response.data.token;
      const name = response.data.name;
      const profilePicture = response.data.profilePicture;
      login({ jwt, name, profilePicture });

      showToast("Sign In successful!", "success");

      setLoading(false);

      navigate("/dashboard");
    } catch (error: any) {
      console.log("error", error);
      showToast(
        error.response?.data?.error || "Sign in failed. Please try again.",
        "error",
      );
      setLoading(false);
    }
  };

  const goSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      <div className="flex h-screen w-full items-center justify-center overflow-auto">
        <div
          className="flex p-6 w-full md:w-[40%] justify-center md:h-[60%] bg-white
          rounded-2xl border border-slate-200 shadow-xl stroke-2"
        >
          <div className="flex flex-col gap-6 justify-center w-full ml-10 mr-10 p-4 text-slate-700">
            <h2 className="flex text-3xl justify-center text-blue-600 font-bold p-4">
              Welcome Back!
            </h2>

            <InputBox
              type="text"
              placeholder="Enter username"
              ref={usernameRef}
              required={true}
            />

            {/* Password input with toggle button */}
            <div className="relative">
              <InputBox
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                ref={passwordRef}
                required={true}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl hover:opacity-70 transition-opacity"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>

            <a
              onClick={() => {
                setForgotPassword(true);
              }}
              className="text-blue-600 text-right cursor-pointer hover:underline"
            >
              Forgot password?
            </a>

            {Loading ? (
              <Button
                size="lg"
                variant="primary"
                label="Signing In..."
                className="w-full justify-center cursor-not-allowed opacity-70"
                disabled={true}
              />
            ) : (
              <Button
                size="lg"
                variant="primary"
                label="Sign In"
                className="w-full justify-center cursor-pointer"
                onClick={handleSignin}
              />
            )}

            <p className="text-center text-slate-500">
              Create new account?{" "}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={goSignUp}
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>

        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={hideToast}
          position="bottom-right"
          duration={4000}
        />
      </div>
      <PasswordResetDia
        forgotPassword={forgotPassword}
        setForgotPassword={setForgotPassword}
      />
    </div>
  );
};

export default SignIn;
