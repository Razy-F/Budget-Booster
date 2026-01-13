import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function requireUserId() {
  const user = await auth();
  if (!user || !user.user || !user.user.id) {
    redirect("/log-in");
  }
  return user.user.id;
}
