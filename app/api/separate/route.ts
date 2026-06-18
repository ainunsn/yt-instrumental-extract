import { prisma } from "@/app/lib/prisma";
import { getCurrentUser } from "@/app/lib/current-user";

export async function POST(req: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return Response.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();

  const job = await prisma.audioJob.create({
    data: {
      youtubeUrl: body.url,
      userId: user.id,
      status: "PENDING",
    },
  });

  return Response.json(job);
}