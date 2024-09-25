"use server";

import { signIn } from "@/auth";

import { redirect } from "next/navigation";
import { LoginForm } from "../zod";

export async function logIn(formData: LoginForm) {
  await signIn("credentials", { redirect: false, ...formData });
  redirect("/");
}
