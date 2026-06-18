import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className='border-b border-violet-200 bg-white'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4'>
        <Link
          href='/'
          className='text-2xl font-bold text-violet-700'
        >
          Instrumental Extract
        </Link>

        <div className='flex gap-3'>
          <Link
            href='/login'
            className='rounded-lg px-4 py-2 text-violet-700 hover:bg-violet-100'
          >
            Login
          </Link>

          <Link
            href='/register'
            className='rounded-lg bg-violet-600 px-4 py-2 text-white hover:bg-violet-700'
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  )
}