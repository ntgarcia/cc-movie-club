"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";

declare const hcaptcha: {
  execute: (widgetId?: string) => Promise<string>;
};

interface LoginFormProps {
  mode: "signin" | "signup";
  setMode: (mode: "signin" | "signup") => void;
  onAuthSuccess: () => void;
  className?: string;
}

export function LoginForm({
  mode,
  setMode,
  onAuthSuccess,
  className,
  ...props
}: LoginFormProps & React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      if (mode === "signin") {
        const { error } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            captchaToken: await hcaptcha.execute(),
          },
        });
        if (error) throw error;
      }
      onAuthSuccess();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Authentication failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {mode === "signin" ? "Login" : "Create Account"}
          </CardTitle>
          <CardDescription>
            {mode === "signin"
              ? "Enter your email below to login to your account"
              : "Enter your details below to create your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {mode === "signin" && (
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading
                  ? mode === "signin"
                    ? "Signing in..."
                    : "Creating account..."
                  : mode === "signin"
                  ? "Login"
                  : "Create Account"}
              </Button>
              {error && (
                <p className="text-sm text-destructive text-center">
                  {error}
                </p>
              )}
            </div>
            <div className="mt-4 text-center text-sm">
              {mode === "signin" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    className="underline underline-offset-4"
                    onClick={() => setMode("signup")}
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="underline underline-offset-4"
                    onClick={() => setMode("signin")}
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
