import { auth } from "@/auth";
import { CurrencyComboBox } from "@/components/CurrencyComboBox";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const WizardPage = async () => {
  const user = await auth();
  if (!user || !user.user) {
    redirect("/log-in");
  }
  return (
    <div className="container flex max-w-2xl flex-col items-center justify-between gap-4">
      <div>
        <h1 className="text-center text-3xl">
          Welcome,{" "}
          <span className="ml-2 font-bold text-secondary">
            {user.user.name} !👋
          </span>
        </h1>
        <h2 className="mt-4 text-center text-base text-muted-foreground">
          Let &apos;s get started by setting up your currency
        </h2>
        <h3 className="mt-2 text-center text-sm text-muted-foreground">
          you can change theses settings any time
        </h3>
      </div>
      <Separator />
      <Card className="w-full ">
        <CardHeader>
          <CardTitle>Currency</CardTitle>
          <CardDescription>
            Set your default currency for transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CurrencyComboBox />
        </CardContent>
      </Card>
      <Separator />
      <Button className="w-full" asChild>
        <Link href={"/"}>I&apos;m done! Take me to the dashboard</Link>
      </Button>
      <div className="mt-8">
        <Logo />
      </div>
    </div>
  );
};

export default WizardPage;
