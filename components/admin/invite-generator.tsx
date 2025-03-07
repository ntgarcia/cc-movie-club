"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createInviteCode } from "@/lib/utils/invites";

export function InviteGenerator() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const generateInviteCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const invite = await createInviteCode(email);
      toast.success(
        `Invite code generated: ${invite.code}`
      );
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
