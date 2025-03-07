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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          {isLoggedIn ? "Account" : "Sign In"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <AuthForm
          onAuthSuccess={() => {
            onAuthSuccess();
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
