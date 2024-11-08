"use client";
import React from "react";
import { TransactionType } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { cn } from "@/lib/utils";

import {
  CreateTransactionSchema,
  type CreateTransactionSchemaType,
} from "@/lib/zod/schema/transaction";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./ui/form";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import CategoryPicker from "./CategoryPicker";

type Props = {
  children: React.ReactNode;
  type: TransactionType;
};
const CreateTransactionDialog = ({ children, type }: Props) => {
  const form = useForm<CreateTransactionSchemaType>({
    resolver: zodResolver(CreateTransactionSchema),
    defaultValues: {
      type,
      date: new Date(),
      description: "",
      amount: 0,
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create a new
            <span
              className={cn(
                "m-1",
                type === "income" ? "text-emerald-500" : "text-rose-500"
              )}
            >
              {type}
            </span>
            transaction
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormDescription>Transaction description</FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Transaction amount{" "}
                    <span className="text-destructive font-extrabold">*</span>
                  </FormDescription>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-2">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">{field.name}</FormLabel>
                    <FormControl>
                      <CategoryPicker type={type} />
                    </FormControl>
                    <FormDescription>
                      Select a category for this transaction{" "}
                      <span className="text-destructive font-extrabold">*</span>
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTransactionDialog;
