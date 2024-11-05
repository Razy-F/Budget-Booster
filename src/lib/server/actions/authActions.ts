"use server";

import { signIn } from "@/auth";
import { LoginFormType } from "@/lib/zod/schema/loginForm";

import { redirect } from "next/navigation";

export async function logIn(formData: LoginFormType) {
  await signIn("credentials", { redirect: false, ...formData });
  redirect("/");
}
