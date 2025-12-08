'use client'
import Link from 'next/link'
import { Button, buttonVariants } from '../ui/button'
import { ThemeToggle } from './theme-toggle'
import { useConvexAuth } from 'convex/react'
import { authClient } from '@/lib/auth-client'

      
const Navbar = () => {
  const { isAuthenticated, isLoading} = useConvexAuth()
  return (
    <nav className='w-full py-5 flex items-center justify-between'>
      <div className='flex items-center gap-8'>
        <Link href="/">
          <h1 className='text-3xl font-bold'>Next<span className='text-blue-500'>Pro</span></h1>
        </Link>

        <div className='flex items-center gap-2'>
          <Link className={buttonVariants({ variant: "ghost" })} href="/">Home</Link>
          <Link className={buttonVariants({ variant: "ghost" })} href="/blog">Blog</Link>
          <Link className={buttonVariants({ variant: "ghost" })} href="/create">Create</Link>
        </div>
      </div>

      <div className='flex items-center gap-2'>
        { isLoading ? null : isAuthenticated ? (
          <Button
          className='hover:cursor-pointer'
            onClick={() => authClient.signOut({})}
          >Logout</Button>
        ) : (
          <>
          <Link 
          href="/auth/sign-up"
          className={buttonVariants({ variant: "default" })}
        >Sign up</Link>
        <Link 
          href="/auth/login"
          className={buttonVariants({ variant: "outline" })}
        >Login</Link></>
        )
      }
       
        <ThemeToggle />
      </div>

    </nav>
  )
}

export default Navbar