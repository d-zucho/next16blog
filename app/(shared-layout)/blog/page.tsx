
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/convex/_generated/api'
import { fetchQuery } from 'convex/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

const BlogPage =  () => {

  return (
    <section className='py-12'>
      <div className='text-center pb-12'>
        <h1 className='text-4xl font-extrabold tracking-tight sm:text-5xl'>Our Blog</h1>
        <p className='pt-4 max-w-2xl mx-auto text-xl text-muted-foreground'>Insights, thoughts, and trends from our team.</p>
        <Suspense fallback={<SkeletonLoadingUi />}>
          <LoadBlogList />
        </Suspense>
      </div>
    </section>
  )
}

const LoadBlogList = async () => {
  // fetch data
  
  const data = await fetchQuery(api.posts.getPosts)

  return (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 pt-12 max-md:justify-center'>
          {data?.map((post) => (
            <Card key={post._id} className='pt-0 max-md:max-w-sm'>
              <div className='relative h-48 w-full overflow-hidden'>
                <Image 
                  src={post.imageUrl ?? 'https://images.unsplash.com/photo-1494172961521-33799ddd43a5?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
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
  )
}

const SkeletonLoadingUi = () => {
  return (
    
          <div className='grid gap-6 grid-cols-6 md:grid-cols-2 lg:grid-cols-3 pt-12'>
            {[...Array(6)].map((_, i) => (
              <div key={i} className='flex flex-col space-y-3 w-full'>
                <Skeleton className='h-48 w-full rounded-xl'/>
                <div className="flex flex-col space-y-2">
                  <Skeleton className='h-6 w-3/4'/>
                  <Skeleton className='h-4 w-full'/>
                  <Skeleton className='h-4 w-2/3'/>
                </div>
                
              </div>
            ))}
          </div>
  )
}

export default BlogPage

