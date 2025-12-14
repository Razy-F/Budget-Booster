import { auth } from "@/auth";
import CreateTransactionDialog from "@/components/CreateTransactionDialog";
import Overview from "@/components/Overview";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";

const DashboardPage = async () => {
  const user = await auth();
  if (!user || !user.user || !user.user.id) {
    redirect("/log-in");
  }
  const userSettings = await prisma.userSettings.findUnique({
    where: {
      userId: user.user.id,
    },
  });

  if (!userSettings) {
    redirect("/wizard");
  }

  return (
    <div className="h-full">
      <div className="border-b relative">
        <div className="top-0 absolute w-full -z-[11] rotate-180">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop
                  offset="0%"
                  style={{
                    stopColor: "#12f386",
                    lightingColor: "ButtonFace",
                    stopOpacity: "0.8",
                  }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#12f386", stopOpacity: "0.4" }}
                />
              </linearGradient>

              <filter id="blur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="25" />
              </filter>
            </defs>
            <path
              fill="url(#gradient)"
              filter="url(#blur)"
              d="M0,32L10.9,37.3C21.8,43,44,53,65,96C87.3,139,109,213,131,245.3C152.7,277,175,267,196,256C218.2,245,240,235,262,202.7C283.6,171,305,117,327,101.3C349.1,85,371,107,393,101.3C414.5,96,436,64,458,90.7C480,117,502,203,524,229.3C545.5,256,567,224,589,186.7C610.9,149,633,107,655,96C676.4,85,698,107,720,149.3C741.8,192,764,256,785,282.7C807.3,309,829,299,851,272C872.7,245,895,203,916,192C938.2,181,960,203,982,186.7C1003.6,171,1025,117,1047,112C1069.1,107,1091,149,1113,154.7C1134.5,160,1156,128,1178,112C1200,96,1222,96,1244,90.7C1265.5,85,1287,75,1309,80C1330.9,85,1353,107,1375,133.3C1396.4,160,1418,192,1429,208L1440,224L1440,320L1429.1,320C1418.2,320,1396,320,1375,320C1352.7,320,1331,320,1309,320C1287.3,320,1265,320,1244,320C1221.8,320,1200,320,1178,320C1156.4,320,1135,320,1113,320C1090.9,320,1069,320,1047,320C1025.5,320,1004,320,982,320C960,320,938,320,916,320C894.5,320,873,320,851,320C829.1,320,807,320,785,320C763.6,320,742,320,720,320C698.2,320,676,320,655,320C632.7,320,611,320,589,320C567.3,320,545,320,524,320C501.8,320,480,320,458,320C436.4,320,415,320,393,320C370.9,320,349,320,327,320C305.5,320,284,320,262,320C240,320,218,320,196,320C174.5,320,153,320,131,320C109.1,320,87,320,65,320C43.6,320,22,320,11,320L0,320Z"
            ></path>
          </svg>
        </div>

        <div className="container flex flex-wrap items-center justify-between gap-6 py-8 ">
          <p className="text-3xl font-bold">Hello, {user.user.name}! 👋</p>
          <div className="flex items-center gap-3">
            <CreateTransactionDialog type="income">
              <Button
                variant={"outline"}
                className="border-emerald-900 border-4"
              >
                New Income 🤑
              </Button>
            </CreateTransactionDialog>
            <CreateTransactionDialog type="expense">
              <Button variant={"outline"} className="border-rose-900 border-4">
                New Expense 🙃
              </Button>
            </CreateTransactionDialog>
          </div>
        </div>
      </div>
      <Overview userSettings={userSettings} />
    </div>
  );
};

export default DashboardPage;
