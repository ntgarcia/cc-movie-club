"use client";

import { SignInForm } from "@/components/auth/sign-in-form";
import { SignUpForm } from "@/components/auth/sign-up-form";

interface AuthFormProps {
  mode: "signin" | "signup";
  setMode: (mode: "signin" | "signup") => void;
  onAuthSuccess: () => void;
}

export function AuthForm(props: AuthFormProps) {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full max-w-sm">
        {props.mode === "signin" ? (
          <SignInForm {...props} />
        ) : (
          <SignUpForm {...props} />
        )}
      </div>
    </div>
  );
}
