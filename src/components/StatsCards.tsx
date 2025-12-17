"use client";
import { useQuery } from "@tanstack/react-query";

type Props = {
  userSettings: UserSettings;
  from: Date;
  to: Date;
};

function StatsCards({ userSettings, from, to }: Props) {
  return (
    <div className="relative flex w-full flex-wrap gap-2 md:flex-nowrap">
    </div>
  );
}

export default StatsCards;

type StatsCardProps = {
  formatter: Intl.NumberFormat;
  value: number;
  title: string;
  icon: ReactNode;
};
function StatsCard({ formatter, value, title, icon }: StatsCardProps) {
  return (
    <Card className="flex h-24 w-full items-center gap-2 p-4">
      {icon}
    </Card>
  );
}
