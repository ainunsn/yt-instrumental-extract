import { getCurrentUser } from '@/app/lib/current-user';
import { prisma } from '@/app/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return Response.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }


  const jobs =
    await prisma.audioJob.findMany({
      where: {
        userId: user.id!,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

  return NextResponse.json(jobs)
}