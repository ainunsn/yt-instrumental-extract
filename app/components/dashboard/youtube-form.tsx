'use client'

import { useState } from 'react'

export default function YoutubeForm() {
  const [url, setUrl] = useState('')

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    const response = await fetch(
      '/api/separate',
      {
        method: 'POST',
        headers: {
          'Content-Type':
            'application/json',
        },
        body: JSON.stringify({
          url
        }),
      }
    )
  }

  return (
    <div className='rounded-3xl bg-white p-6 shadow'>
      <h2 className='mb-4 text-xl font-semibold'>
        Extract Audio
      </h2>

      <form className='flex gap-4' onSubmit={handleSubmit}>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder='https://youtube.com/watch?v=...'
          className='flex-1 rounded-xl border border-violet-200 p-3'
        />

        <button className='rounded-xl bg-violet-600 px-6 text-white hover:bg-violet-700'>
          Extract
        </button>
      </form>
    </div>
  )
}