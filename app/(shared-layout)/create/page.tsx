
'use client'
import { createBlogAction } from '@/app/actions'
import { postSchema } from '@/app/schemas/blog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'

const CreatePage = () => {
  const [isPending, startTransition] = useTransition()
  
  const form = useForm({
      resolver: zodResolver(postSchema),
      defaultValues: {
        title: '',
        content: '',
        image: undefined
      }
    })

    const onSubmit = async (values: z.infer <typeof postSchema> ) => {
      startTransition(async () => {
        
        await createBlogAction(values)
      })

    }
  return (
    <section className='py-12'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-extrabold tracking-tight sm:text-5xl'>Create Post</h1>
        <p className='pt-4 text-xl text-muted-foreground'>Share your thoughts...</p>
      </div>

      <Card className='w-full max-w-xl mx-auto'>
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
          <CardDescription>Create your own blog article...</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className='gap-y-4'>
              <Controller 
              name='title'
              control={form.control}
              render={({field, fieldState}) => (
                <Field>
                  <FieldLabel>Title</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    placeholder='My First Post'
                    {...field} 
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]}/>
                  )}
                </Field>
              )}
            />
            <Controller 
              name='content'
              control={form.control}
              render={({field, fieldState}) => (
                <Field>
                  <FieldLabel>Body</FieldLabel>
                  <Textarea
                    aria-invalid={fieldState.invalid}
                    placeholder='Write your content here...'
                    {...field} 
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]}/>
                  )}
                </Field>
              )}
            />

            {/* IMAGE UPLOAD */}
            <Controller 
              name='image'
              control={form.control}
              render={({fieldState,field: {onChange}}) => (
                <Field>
                  <FieldLabel>Image</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    placeholder='Write your content here...'
                    type='file'
                    accept='image/*'
                     onChange={(e) => onChange(e.target.files?.[0])} // Pass the file object
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]}/>
                  )}
                </Field>
              )}
            />


            <Button type='submit' disabled={isPending} className='hover:cursor-pointer'>
              {isPending ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
                  <span>Creating...</span>
                </>
              ) : <span>Create Post</span>}
            </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}

export default CreatePage