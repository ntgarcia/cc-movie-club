"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AuthForm } from "./auth-form";

interface AuthDialogProps {
  isLoggedIn: boolean;
  onAuthSuccess: () => void;
}

export function AuthDialog({
  isLoggedIn,
  onAuthSuccess,
}: AuthDialogProps) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">(
    "signin"
  );

  if (isLoggedIn) {
    return null; // Don't show dialog if logged in
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Sign In
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] border-none p-0">
        <AuthForm
          mode={mode}
          setMode={setMode}
          onAuthSuccess={() => {
            onAuthSuccess();
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
