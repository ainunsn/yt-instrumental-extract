import { redirect } from 'next/navigation'
import ProcessedList from '../components/dashboard/processed-list'
import YoutubeForm from '../components/dashboard/youtube-form'
import { getCurrentUser } from '../lib/current-user'

export default async function DashboardPage() {

  const user =
    await getCurrentUser()

  if (!user) {
    redirect('/login')
  }
  return (
    <main className='min-h-screen bg-violet-50'>
      <div className='mx-auto max-w-6xl p-8'>
        <div className='mb-10'>
          <h1 className='text-4xl font-bold text-violet-700'>
            Instrumental Extract Dashboard
          </h1>

          <p className='mt-2 text-slate-500'>
            Submit YouTube videos and manage extracted
            vocals.
          </p>
        </div>

        <YoutubeForm />

        <div className='mt-8'>
          <ProcessedList />
        </div>
      </div>
    </main>
  )
}