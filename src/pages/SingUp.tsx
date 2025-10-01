import { useRef, useState } from "react";
import Button from "../component/Button";
import InputBox from "../component/InputBox";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toast from "../component/Toast";
import { useToast } from "../hooks/useToast";
import { login } from "../utils/auth";

const SingUp = () => {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const { toast, showToast, hideToast } = useToast();
  const nameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/signup`, {
        name: nameRef.current?.value,
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
      });

      // If the backend returns a token after signup, log the user in
      if (response.data.token) {
        login(response.data.token);
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
    <div className="flex h-screen w-full  items-center justify-center">
      <div
        className="flex p-6 md:w-[40%] justify-center md:h-[60%]  bg-gray-100 
      rounded-2xl border border-gray-300 shadow-xl stroke-2 "
      >
        <div className="flex flex-col gap-4 justify-center w-full ml-10 mr-10 p-4 text-gray-700">
          <h2 className="flex text-3xl justify-center text-blue-600 font-bold p-4">
            Create new account
          </h2>
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
              label="Sign Up"
              className="w-full justify-center cursor-not-allowed"
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

          <p className="text-center text-gray-500">
            Already have an account?{" "}
            <span className="text-blue-600 cursor-pointer" onClick={goSignin}>
              Sign In
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

export default SingUp;
