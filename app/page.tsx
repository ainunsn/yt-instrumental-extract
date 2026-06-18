import Hero from './components/hero'
import Navbar from './components/navbar'

export default function HomePage() {
  return (
    <main className='min-h-screen bg-violet-50'>
      <Navbar />
      <Hero />
    </main>
  )
}