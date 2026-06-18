// src/app/api/auth/login/route.ts

import { prisma } from '@/app/lib/prisma'
import { signToken } from '@/app/lib/auth'

import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()

  const { email, password } = body

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    return NextResponse.json(
      {
        message: 'Invalid credentials',
      },
      {
        status: 401,
      }
    )
  }

  const valid = await bcrypt.compare(
    password,
    user.password
  )

  if (!valid) {
    return NextResponse.json(
      {
        message: 'Invalid credentials',
      },
      {
        status: 401,
      }
    )
  }

  const token = signToken({
    userId: user.id,
    email: user.email,
  })

  const response = NextResponse.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  })

  response.cookies.set({
    name: 'token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })

  return response
}