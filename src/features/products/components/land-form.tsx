'use client';

import { FormFileUpload } from '@/components/forms/form-file-upload';
import { FormInput } from '@/components/forms/form-input';
import { FormSelect } from '@/components/forms/form-select';
import { FormTextarea } from '@/components/forms/form-textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Land } from '@/types/lands';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

const formSchema = z.object({
  image: z
    .any()
    .refine((files) => files?.length == 1, 'Image is required.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    ),
  name: z.string().min(2, {
    message: 'Landing name must be at least 2 characters.'
  }),
  category: z.string(),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.'
  })
});

export function LandForm({
  initialData,
  pageTitle
}: {
  initialData: Land | null;
  pageTitle: string;
}) {
  const defaultValues = {
    name: initialData?.name || '',
    category: initialData?.category || '',
    description: initialData?.description || ''
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (initialData) {
        // Update existing land
        const response = await fetch(`/api/lands/${initialData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: values.name,
            category: values.category,
            description: values.description
          })
        });

        if (!response.ok) {
          throw new Error('Failed to update land');
        }
      } else {
        // Create new land
        const response = await fetch('/api/lands', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: values.name,
            category: values.category,
            description: values.description,
            path: '' // This would be set on the server
          })
        });

        if (!response.ok) {
          throw new Error('Failed to create land');
        }
      }

      // Redirect to lands list
      router.push('/dashboard/lands');
      router.refresh();
    } catch (error) {
      console.error('Error saving land:', error);
      // In a real app, you would show an error message to the user
    }
  }

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form
          form={form}
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8'
        >
          <FormFileUpload
            control={form.control}
            name='image'
            label='Landing Image'
            description='Upload a landing image'
            config={{
              maxSize: 5 * 1024 * 1024,
              maxFiles: 4
            }}
          />

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <FormInput
              control={form.control}
              name='name'
              label='Landing Name'
              placeholder='Enter landing name'
              required
            />

            <FormSelect
              control={form.control}
              name='category'
              label='Category'
              placeholder='Select category'
              required
              options={[
                {
                  label: 'Marketing',
                  value: 'marketing'
                },
                {
                  label: 'Product Launch',
                  value: 'product-launch'
                },
                {
                  label: 'Event',
                  value: 'event'
                },
                {
                  label: 'Promotion',
                  value: 'promotion'
                }
              ]}
            />
          </div>

          <FormTextarea
            control={form.control}
            name='description'
            label='Description'
            placeholder='Enter landing description'
            required
            config={{
              maxLength: 500,
              showCharCount: true,
              rows: 4
            }}
          />

          <div className='flex justify-end space-x-4'>
            <Button
              type='button'
              variant='outline'
              onClick={() => router.push('/dashboard/lands')}
            >
              Cancel
            </Button>
            <Button type='submit'>Save Landing</Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
