"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { validateInviteCode } from "@/lib/utils/invites";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SignUpFormProps {
  setMode: (mode: "signin" | "signup") => void;
  onAuthSuccess: () => void;
}

export function SignUpForm({
  setMode,
  onAuthSuccess,
}: SignUpFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);

  const supabase = createClientComponentClient();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate invite code first
      await validateInviteCode(inviteCode);

      // If validation passes, proceed with signup
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
      onAuthSuccess();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Error during sign up"
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Create an account using your invite code
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignUp} className="space-y-6">
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
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign up"}
          </Button>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setMode("signin")}
              className="text-primary underline-offset-4 hover:underline"
            >
              Sign in
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
