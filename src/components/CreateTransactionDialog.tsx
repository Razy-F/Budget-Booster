"use client";
import React from "react";
import { TransactionType } from "@/lib/types";
type Props = {
  children: React.ReactNode;
  type: TransactionType;
};
const CreateTransactionDialog = ({ children, type }: Props) => {
};

export default CreateTransactionDialog;
