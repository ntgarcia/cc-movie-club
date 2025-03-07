"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function InviteGenerator() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient();

  const generateInviteCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = (await supabase.auth.getUser()).data
        .user;

      // Generate a random code
      const code = Math.random()
        .toString(36)
        .substring(2, 15);

      const { error } = await supabase
        .from("invites")
        .insert({
          code,
          email: email || null,
          created_by: user?.id,
        });

      if (error) throw error;

      toast.success(`Invite code generated: ${code}`);
      setEmail("");
    } catch (error) {
      toast.error("Error generating invite code");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={generateInviteCode}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="email">Email (optional)</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Optional email for invite"
        />
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Invite Code"}
      </Button>
    </form>
  );
}
