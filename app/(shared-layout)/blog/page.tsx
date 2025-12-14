'use client'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import Image from 'next/image'
import Link from 'next/link'

const BlogPage = () => {

  const data = useQuery(api.posts.getPosts)
  return (
    <section className='py-12'>
      <div className='text-center pb-12'>
        <h1 className='text-4xl font-extrabold tracking-tight sm:text-5xl'>Our Blog</h1>
        <p className='pt-4 max-w-2xl mx-auto text-xl text-muted-foreground'>Insights, thoughts, and trends from our team.</p>

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {data?.map((post) => (
            <Card key={post._id} className='pt-0'>
              <div className='relative h-48 w-full overflow-hidden'>
                <Image 
                  src={'https://images.unsplash.com/photo-1494172961521-33799ddd43a5?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                  alt='image'
                  fill
                  className='rounded-t-lg'
                  /> 
              </div>

              <CardContent className='text-left'>
                <Link href={`/blog/${post._id}`}>
                  <h2 className='text-xl hover:text-primary transition-colors'>
                    {post.title}
                    </h2>
                </Link>
                <p className='text-muted-foreground line-clamp-2 pt-1 min-h-10'>
                  {post.body}
                </p>
              </CardContent>
              <CardFooter>
                <Link href={`/blog/${post._id}`} className={buttonVariants({className: 'w-full'})}>
                  Read More
                </Link>
              </CardFooter>
              </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogPage