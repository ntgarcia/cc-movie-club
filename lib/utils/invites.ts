import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import crypto from "crypto";

export async function createInviteCode(
  email: string | null = null
) {
  const supabase = createClientComponentClient();
  const code = crypto.randomBytes(4).toString("hex");

  const user = (await supabase.auth.getUser()).data.user;

  const { data, error } = await supabase
    .from("invites")
    .insert({
      code,
      email,
      created_by: user?.id,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function validateInviteCode(code: string) {
  const supabase = createClientComponentClient();

  const { data: invite, error } = await supabase
    .from("invites")
    .select("*")
    .eq("code", code)
    .eq("used", false)
    .gte("expires_at", new Date().toISOString())
    .single();

  if (error || !invite) {
    throw new Error("Invalid or expired invite code");
  }

  return invite;
}
