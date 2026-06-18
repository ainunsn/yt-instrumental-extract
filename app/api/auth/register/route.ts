
import { signToken } from '@/app/lib/auth'
import { prisma } from '@/app/lib/prisma'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { name, email, password } = body

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email,
        },
      })

    if (existingUser) {
      return NextResponse.json(
        {
          message: 'Email already exists',
        },
        {
          status: 400,
        }
      )
    }

    const hashedPassword =
      await bcrypt.hash(password, 10)

    const user =
      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      })

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
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Registration failed',
      },
      {
        status: 500,
      }
    )
  }
}