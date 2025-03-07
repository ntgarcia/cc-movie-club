"use client";

import { LoginForm } from "@/components/login-form";

interface AuthFormProps {
  mode: "signin" | "signup";
  setMode: (mode: "signin" | "signup") => void;
  onAuthSuccess: () => void;
}

export function AuthForm(props: AuthFormProps) {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full max-w-sm">
        <LoginForm {...props} />
      </div>
    </div>
  );
}
