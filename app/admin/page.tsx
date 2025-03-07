"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { InviteGenerator } from "@/components/admin/invite-generator";
import { redirect } from "next/navigation";

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        redirect("/login");
      }

      // Check if user is in admin_users table
      const { data: adminUser } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", session.user.id)
        .single();

      setIsAdmin(!!adminUser);
      setLoading(false);
    };

    checkAdmin();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return <div>Not authorized</div>;
  }

  return (
    <div className="container max-w-md py-8">
      <h1 className="text-2xl font-bold mb-6">
        Generate Invite Codes
      </h1>
      <InviteGenerator />
    </div>
  );
}
