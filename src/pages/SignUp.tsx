import { useRef, useState } from "react";
import Button from "../component/Button";
import InputBox from "../component/InputBox";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toast from "../component/Toast";
import { useToast } from "../hooks/useToast";
import { login } from "../utils/auth";
import PasswordHideIcon from "../icons/PasswordHideIcon";
import PasswordShowIcon from "../icons/PasswordShowIcon";

const SingUp = () => {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const { toast, showToast, hideToast } = useToast();
  const nameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/signup`, {
        name: nameRef.current?.value,
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
      });

      if (response.data.token) {
        login({
          jwt: response.data.token,
          name: response.data.name,
          profilePicture: response.data.profilePicture,
        });
        showToast("Sign up successful! You are now logged in.", "success");
        setLoading(false);
        navigate("/dashboard");
      } else {
        showToast("Sign up successful! Please sign in.", "success");
        setLoading(false);
        navigate("/signin");
      }
    } catch (error: string | any) {
      showToast(error.response.data.error, "error");
      setLoading(false);
    }
  };

  const goSignin = () => {
    navigate("/signin");
  };
  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600">
      {/* Left Side - Welcome Section */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
        <div className="max-w-lg text-white">
          <h1 className="text-5xl font-bold mb-6">Welcome to Second Brain</h1>
          <p className="text-lg text-blue-100 leading-relaxed">
            Your personal knowledge management system. Save, organize, and
            access all your important content in one place. From articles and
            videos to tweets and documents - keep everything that matters at
            your fingertips.
          </p>

          {/* Decorative Elements */}
          <div className="mt-12 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-blue-100">Organize your knowledge</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-blue-100">Access anytime, anywhere</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </div>
              <span className="text-blue-100">
                Never lose important content
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">
            Create Account
          </h2>
          <p className="text-center text-slate-500 mb-8">
            Join us and start organizing your knowledge
          </p>

          <div className="flex flex-col gap-5">
            <InputBox
              type="text"
              placeholder="Enter full name"
              ref={nameRef}
              required={true}
            />
            <InputBox
              type="text"
              placeholder="Enter username"
              ref={usernameRef}
              required={true}
            />
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
                className="absolute right-3 top-1/2 -translate-y-1/2 pr-4 text-2xl hover:opacity-70 transition-opacity"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <PasswordShowIcon size="sm" />
                ) : (
                  <PasswordHideIcon size="sm" />
                )}
              </button>
            </div>
            {Loading ? (
              <Button
                size="lg"
                variant="primary"
                label="Signing Up..."
                className="w-full justify-center cursor-not-allowed opacity-70"
                disabled={true}
              />
            ) : (
              <Button
                size="lg"
                variant="primary"
                label="Sign Up"
                className="w-full justify-center cursor-pointer"
                onClick={handleSignUp}
              />
            )}

            <p className="text-center text-slate-500 mt-4">
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer hover:underline font-semibold"
                onClick={goSignin}
              >
                Sign In
              </span>
            </p>
          </div>
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
  );
};

export default SingUp;
