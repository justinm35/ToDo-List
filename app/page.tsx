import Image from 'next/image'
import { Inter } from 'next/font/google'
import { db } from './lib/db'
import Button from './components/ui/Button'
import { Ghost } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export default async function Home() {

  
  return (
   <Button variant='ghost'>Hello</Button>
  )
}
