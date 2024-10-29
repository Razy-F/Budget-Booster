import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
  const user = await auth();
  console.log(user);
  console.log("this is the user");
  if (!user || !user.user || !user.user.id) {
    redirect("/log-in");
  }

  let userSettings = await prisma.userSettings.findUnique({
    where: {
      userId: user.user.id,
    },
  });

  if (!userSettings) {
    userSettings = await prisma.userSettings.create({
      data: {
        userId: user.user.id,
        currency: "ILS",
      },
    });
  }
  // Revalidate the home page that uses the user currency
  revalidatePath("/");
  console.log(userSettings);
  return Response.json(userSettings);
}
