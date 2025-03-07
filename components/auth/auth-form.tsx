"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

declare const hcaptcha: {
  render: (
    container: string | HTMLElement,
    options: {
      sitekey: string;
      theme?: string;
      size?: string;
      callback?: (token: string) => void;
    }
  ) => string;
  execute: (widgetId?: string) => Promise<string>;
};

interface AuthFormProps {
  mode: "signin" | "signup";
  setMode: (mode: "signin" | "signup") => void;
  onAuthSuccess: () => void;
}

export function AuthForm({
  mode,
  setMode,
  onAuthSuccess,
}: AuthFormProps) {
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
            captchaToken: await generateCaptchaToken(),
          },
        });
        if (error) throw error;
      }

      onAuthSuccess();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : `Failed to ${
              mode === "signin" ? "sign in" : "sign up"
            }`
      );
    } finally {
      setLoading(false);
    }
  };

  const generateCaptchaToken = async () => {
    try {
      const token = await hcaptcha.execute();
      return token;
    } catch (error) {
      console.error("hCaptcha error:", error);
      throw new Error("Failed to verify captcha");
    }
  };

  return (
    <Card className="border-none">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl">
          {mode === "signin"
            ? "Welcome back"
            : "Create an account"}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            className="w-full"
            type="submit"
            disabled={loading}
          >
            {loading
              ? mode === "signin"
                ? "Signing in..."
                : "Signing up..."
              : mode === "signin"
              ? "Sign In"
              : "Sign Up"}
          </Button>
          <Button
            variant="link"
            className="text-xs text-muted-foreground"
            type="button"
            onClick={() =>
              setMode(
                mode === "signin" ? "signup" : "signin"
              )
            }
          >
            {mode === "signin"
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </Button>
          {error && (
            <p className="text-sm text-destructive text-center">
              {error}
            </p>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
