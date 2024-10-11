import { HandCoins } from "lucide-react";
import Link from "next/link";

const Logo = () => {
  return (
    <div>
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <HandCoins className="stroke-primary size-11 stroke-[1.5]" />
        <p className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent">
          BudgetTracker
        </p>
      </Link>
    </div>
  );
};

export const LogoMobile = () => {
  return (
    <div>
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <p className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-2xl font-bold leading-tight tracking-tighter text-transparent">
          BudgetTracker
        </p>
      </Link>
    </div>
  );
};

export default Logo;
