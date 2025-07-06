import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { CloseOutlined, LoginOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const AuthHeader = ({ mode }: { mode: "signin" | "signup" }) => (
  <>
    <div className="flex justify-center items-center mb-2">
      <div className="bg-gray-100 rounded-full p-3 flex items-center justify-center">
        <LoginOutlined className="text-2xl text-gray-700" />
      </div>
    </div>
    <h2 className="text-2xl font-bold mb-1 text-center">
      {mode === "signin"
        ? "Sign in to continue"
        : "Create an account to continue"}
    </h2>
    <div className="text-gray-500 text-center mb-4">
      {mode === "signin"
        ? "Sign in to access all the features on this app"
        : "Create an account to access all the features on this app"}
    </div>
  </>
);

const AuthInput = ({
  label,
  type,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="text-start">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      className="w-full bg-gray-100 rounded-lg px-4 py-3 text-base outline-none focus:ring-2 focus:ring-blue-200"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

const AuthFooter = ({
  mode,
  setMode,
}: {
  mode: "signin" | "signup";
  setMode: (mode: "signin" | "signup") => void;
}) => (
  <div className="bg-gray-50 rounded-b-3xl text-center mt-8 -mx-8 px-8 py-4 text-sm">
    {mode === "signin" ? (
      <>
        Do not have an account?{" "}
        <button
          className="text-[#3A5EFF] hover:underline font-medium"
          onClick={() => setMode("signup")}
        >
          Sign Up
        </button>
      </>
    ) : (
      <>
        Already have an account?{" "}
        <button
          className="text-[#3A5EFF] hover:underline font-medium"
          onClick={() => setMode("signin")}
        >
          Sign In
        </button>
      </>
    )}
  </div>
);

type Mode = "signin" | "signup";

interface AuthModalProps {
  open: boolean;
  mode: Mode;
  onClose: () => void;
  onAuthSuccess: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({
  open,
  mode,
  onClose,
  onAuthSuccess,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [currentMode, setCurrentMode] = useState<Mode>(mode);
  const login = useAuthStore((s) => s.login);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentMode(mode);
    setError("");
    setEmail("");
    setPassword("");
    setRepeatPassword("");
  }, [mode, open]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (currentMode === "signin") {
      const ok = login(email, password);
      if (ok) {
        onAuthSuccess();
        setEmail("");
        setPassword("");
      } else {
        setError("Invalid credentials");
      }
    } else {
      if (
        (email === "demo@example.com" && password === "password123") ||
        (email === "test@user.com" && password === "testpass")
      ) {
        if (password !== repeatPassword) {
          setError("Passwords do not match");
          return;
        }
        const ok = login(email, password);
        if (ok) {
          onAuthSuccess();
          setEmail("");
          setPassword("");
          setRepeatPassword("");
        } else {
          setError("Account already exists or error");
        }
      } else {
        setError("Only test accounts allowed, Please sign in with the test accounts");
      }
    }
  };

  const modalClass =
    "bg-white rounded-3xl shadow-2xl w-full max-w-md relative flex flex-col pt-8 pb-0 px-8";

  const isAuthRoute =
    location.pathname === "/signin" || location.pathname === "/signup";

  if (isAuthRoute) {
    return (
      <div>
        <div className="w-full flex justify-between items-center px-8 py-4 sticky top-0 bg-white/70 backdrop-blur-md shadow-sm z-50">
          <div className="text-2xl font-bold">foo-rum</div>
          <div className="flex items-center gap-4 font-semibold text-md" onClick={() => navigate("/")} style={{ cursor: 'pointer' }}>
            Back to home
          </div>
        </div>

        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
          <div className={modalClass + " border-4 border-gray-100"}>
            <AuthHeader mode={currentMode} />
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <AuthInput
                label="Email or username"
                type="email"
                placeholder="Enter your email or username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <AuthInput
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {currentMode === "signup" && (
                <AuthInput
                  label="Repeat password"
                  type="password"
                  placeholder="Enter your password again"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              )}
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <button
                type="submit"
                className="bg-[#3A5EFF] text-white py-3 rounded-lg font-semibold text-base mt-2 transition hover:bg-blue-700 w-full"
              >
                {currentMode === "signin" ? "Sign In" : "Sign Up"}
              </button>
            </form>
            <AuthFooter mode={currentMode} setMode={setCurrentMode} />
          </div>
        </div>
      </div>

    );
  }

  // overlay modal
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className={modalClass}>
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 w-10 h-10 flex items-center justify-center"
          onClick={onClose}
        >
          <CloseOutlined />
        </button>
        <AuthHeader mode={currentMode} />
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <AuthInput
            label="Email or username"
            type="email"
            placeholder="Enter your email or username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <AuthInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {currentMode === "signup" && (
            <AuthInput
              label="Repeat password"
              type="password"
              placeholder="Enter your password again"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          )}
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="bg-[#3A5EFF] text-white py-3 rounded-lg font-semibold text-base mt-2 transition hover:bg-blue-700 w-full"
            onClick={() => {
              if (currentMode === "signup") {
                window.location.href = "/signup";
              }
            }}
          >
            {currentMode === "signin" ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <AuthFooter mode={currentMode} setMode={setCurrentMode} />
      </div>
    </div>
  );
};

export default AuthModal;