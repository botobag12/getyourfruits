import { redirect } from "next/navigation";
import { createClient } from "../../../lib/supabase/server";

export default async function ProtectedAdminLayout({ children }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // User is not logged in
  if (!user) {
    redirect("/admin/login");
  }

  // Get the user's profile
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  // User does not have an admin profile
  if (error || !profile || profile.role !== "admin") {
    redirect("/admin/login");
  }

  return <>{children}</>;
}