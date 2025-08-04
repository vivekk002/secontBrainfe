import { useRef, useState } from "react";
import Button from "../component/Button";
import InputBox from "../component/InputBox";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toast from "../component/Toast";
import { useToast } from "../hooks/useToast";
import { useAuth } from "../hooks/useAuth";
import { login } from "../utils/auth";

const SingIn = () => {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const { toast, showToast, hideToast } = useToast();
  const { refreshAuth } = useAuth();

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
      login({ jwt, name });

      showToast("Sign In successful!", "success");
      refreshAuth();
      setLoading(false);

      // Navigate to dashboard
      navigate("/dashboard");

      // Handle success (e.g., redirect, show success message)
    } catch (error: string | any) {
      console.log("error", error);
      // showToast(error.response.data.error, "error");
      setLoading(false);
      // Handle error (e.g., show error message)
    }
  };

  const goSignUp = () => {
    navigate("/signup");
  };
  return (
    <div className="flex h-screen w-full  items-center justify-center">
      <div
        className="flex p-6 w-[40%] justify-center h-[60%]  bg-gray-100 
      rounded-2xl border border-gray-300 shadow-xl stroke-2"
      >
        <div className="flex flex-col gap-6 justify-center w-full ml-10 mr-10 p-4 text-gray-700">
          <h2 className="flex text-3xl justify-center text-blue-600 font-bold p-4">
            Welcome Back!
          </h2>

          <InputBox
            type="text"
            placeholder="Enter username"
            ref={usernameRef}
            required={true}
          />
          <InputBox
            type="password"
            placeholder="Enter password"
            ref={passwordRef}
            required={true}
          />
          {Loading ? (
            <Button
              size="lg"
              variant="primary"
              label="Sign In"
              className="w-full justify-center cursor-not-allowed"
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

          <p className="text-center text-gray-500">
            Create new account?{" "}
            <span className="text-blue-600 cursor-pointer" onClick={goSignUp}>
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
  );
};

export default SingIn;
