"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { validateInviteCode } from "@/lib/utils/invites";

interface AuthFormProps {
  onAuthSuccess: () => void;
}

export function AuthForm({ onAuthSuccess }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const supabase = createClientComponentClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        // Sign up flow
        await validateInviteCode(inviteCode);

        const { error: signUpError } =
          await supabase.auth.signUp({
            email,
            password,
          });

        if (signUpError) throw signUpError;

        // Mark invite as used
        const { error: updateError } = await supabase
          .from("invites")
          .update({
            used: true,
            used_by: (
              await supabase.auth.getUser()
            ).data.user?.id,
          })
          .eq("code", inviteCode);

        if (updateError) throw updateError;

        toast.success("Signed up successfully!");
      } else {
        // Sign in flow
        const { error } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });

        if (error) throw error;

        toast.success("Signed in successfully!");
      }

      onAuthSuccess();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Authentication error"
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="text-2xl">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </CardTitle>
        <CardDescription>
          {isSignUp
            ? "Sign up with your invite code"
            : "Sign in to your account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
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
              <Label htmlFor="password">Password</Label>
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
            {isSignUp && (
              <div className="grid gap-2">
                <Label htmlFor="invite-code">
                  Invite Code
                </Label>
                <Input
                  id="invite-code"
                  type="text"
                  placeholder="Enter your invite code"
                  value={inviteCode}
                  onChange={(e) =>
                    setInviteCode(e.target.value)
                  }
                  required
                />
              </div>
            )}
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : isSignUp
              ? "Sign Up"
              : "Sign In"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-sm text-primary underline-offset-4 hover:underline"
        >
          {isSignUp
            ? "Already have an account? Sign in"
            : "Need an account? Sign up"}
        </button>
      </CardFooter>
    </Card>
  );
}
