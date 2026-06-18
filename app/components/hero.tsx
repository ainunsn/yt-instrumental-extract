import Link from 'next/link'

export default function Hero() {
  return (
    <section className='mx-auto max-w-7xl px-6 py-24'>
      <div className='text-center'>

        <h1 className='text-6xl font-bold tracking-tight text-violet-950 mt-16'>
          Extract Vocals From
          <span className='block text-violet-600'>
            Any YouTube Video
          </span>
        </h1>

        <p className='mx-auto mt-6 max-w-2xl text-lg text-slate-600'>
          Paste a YouTube URL and generate clean vocal
          tracks for transcription, AI processing, karaoke,
          remixing, and content creation.
        </p>

        <div className='mt-10 flex justify-center gap-4'>
          <Link
            href='/register'
            className='rounded-xl bg-violet-600 px-8 py-4 font-medium text-white transition hover:bg-violet-700'
          >
            Start Free
          </Link>

          <Link
            href='/login'
            className='rounded-xl border border-violet-300 bg-white px-8 py-4 font-medium text-violet-700'
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  )
}