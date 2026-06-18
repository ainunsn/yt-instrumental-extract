// src/components/auth/login-form.tsx

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiFetch } from '@/app/lib/api'
import { useAuthRedirect } from '@/app/hooks/useAuthRedirect'

export default function LoginForm() {
  useAuthRedirect()
  const router = useRouter()

  const [email, setEmail] =
    useState('')
  const [password, setPassword] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState('')

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    const response = await fetch(
      '/api/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type':
            'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    )

    if (!response.ok) {
      setError('Invalid email or password')
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-md rounded-3xl bg-white p-8 shadow-xl'
      >
        <h1 className='mb-6 text-3xl font-bold text-violet-700'>
          Login
        </h1>

        {error && (
          <div className='mb-4 rounded-lg bg-red-50 p-3 text-red-600'>
            {error}
          </div>
        )}

        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className='mb-4 w-full rounded-xl border p-3'
        />

        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className='mb-4 w-full rounded-xl border p-3'
        />

        <button
          type='submit'
          disabled={loading}
          className='w-full rounded-xl bg-violet-600 py-3 text-white'
        >
          {loading
            ? 'Signing In...'
            : 'Login'}
        </button>
      </form>
      <div className='mt-4 text-center'>
        Don&apos;t have an account?{' '}
        <a
          href='/register'
          className='text-violet-600 hover:underline'
        >
          Register
        </a>
      </div>
    </div>
  )
}