import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import AuthModal from "../components/AuthModal";
import { useNavigate } from "react-router-dom";

const SignInPage: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  if (user) {
    navigate("/");
    return null;
  }

  return (
    <AuthModal
      open={open}
      mode="signin"
      onClose={() => navigate("/")}
      onAuthSuccess={() => navigate("/")}
    />
  );
};

export default SignInPage; 