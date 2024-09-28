import Link from "next/link";
import React from "react";
import { HandCoins } from "lucide-react";
import { ModeToggle } from "./ModeToggle";

const Logo = () => {
  return (
    <div>
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <HandCoins className="stroke-primary size-11 stroke-[1.5]" />
        <p className="bg-gradient-to-r from-primary/60 to-secondary/40 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent">
          BudgetTracker
        </p>
      </Link>
      <ModeToggle />
    </div>
  );
};

export default Logo;
