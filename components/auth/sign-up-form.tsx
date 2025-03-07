"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

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
      // First verify the invite code
      const { data: invite, error: inviteError } =
        await supabase
          .from("invites")
          .select("*")
          .eq("code", inviteCode)
          .single();

      if (inviteError || !invite) {
        toast.error("Invalid invite code");
        return;
      }

      if (invite.used) {
        toast.error(
          "This invite code has already been used"
        );
        return;
      }

      if (
        invite.expires_at &&
        new Date(invite.expires_at) < new Date()
      ) {
        toast.error("This invite code has expired");
        return;
      }

      // If invite is valid, proceed with signup
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

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
      toast.error("Error during sign up");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="invite-code">Invite Code</Label>
        <Input
          id="invite-code"
          type="text"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
          required
        />
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Signing up..." : "Sign up"}
      </Button>
      <Button
        type="button"
        variant="ghost"
        className="w-full"
        onClick={() => setMode("signin")}
      >
        Already have an account? Sign in
      </Button>
    </form>
  );
}
