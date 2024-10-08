"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { FormSchema, LoginFormType } from "@/lib/zod";
import Link from "next/link";
import { logIn } from "@/lib/server/actions";

export default function LoginForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const {
    reset,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(data: LoginFormType) {
    try {
      //await new Promise((resolve) => setTimeout(resolve, 10000));

      await logIn(data);
    } catch (error) {
      console.log(error);
      reset();
    }
    reset();
  }
  return (
    <div className="w-full max-w-sm rounded-lg border-t-8 border-primary bg-card p-5 shadow-lg">
      <h1 className="my-4 text-xl font-bold">LogIn</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isSubmitting} type="submit">
            Submit
          </Button>
          <Link className="mt-3 block text-right text-sm" href="/sign-in">
            Not registred yet? <span className="underline">Register</span>
          </Link>
        </form>
      </Form>
    </div>
  );
}
