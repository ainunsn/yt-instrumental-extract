'use client'

import { useAuthRedirect } from '@/app/hooks/useAuthRedirect'
import { apiFetch } from '@/app/lib/api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function RegisterForm() {
  useAuthRedirect()
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState('')

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    const response = await fetch(
      '/api/auth/register',
      {
        method: 'POST',
        headers: {
          'Content-Type':
            'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    )

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
          Register
        </h1>

        {error && (
          <div className='mb-4 rounded-lg bg-red-50 p-3 text-red-600'>
            {error}
          </div>
        )}

        <input
          type='name'
          placeholder='Name'
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className='mb-4 w-full rounded-xl border p-3'
        />


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
            ? 'Registering...'
            : 'Register'}
        </button>
      </form>
      <div className='mt-4 text-center'>
        Already have an account?{' '}
        <a
          href='/login'
          className='text-violet-600 hover:underline'
        >
          Login
        </a>
      </div>
    </div>

  )
}