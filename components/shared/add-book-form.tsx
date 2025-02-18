'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImagePlusIcon, Loader2Icon, XIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from '@/components/ui/select';

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';

import { AddBookSchema } from '@/schemas';
import { useToast } from '@/hooks/use-toast';
import { addBook } from '@/actions/book.actions';
import { UploadDropzone } from '@/utils/uploadthing';
import { ADD_BOOK_DEFAULT_VALUES } from '@/constants';

import { BookType } from '@/types';
import type { Dispatch, SetStateAction } from 'react';

type PropTypes = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onBookAdded?: () => void;
};

const AddBookForm = ({ setIsOpen, onBookAdded }: PropTypes) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof AddBookSchema>>({
    resolver: zodResolver(AddBookSchema),
    defaultValues: ADD_BOOK_DEFAULT_VALUES,
  });

  const onSubmit = async (values: z.infer<typeof AddBookSchema>) => {
    const response = await addBook(values);

    if (response.success) {
      toast({ title: response.message });

      if (onBookAdded) {
        onBookAdded();
      } else {
        setIsOpen(false);
      }
    } else {
      toast({
        title: 'Error',
        description: response.message,
      });
    }
  };

  const addGenre = (genre: string) => {
    const currentGenres = form.getValues('genre') || [];

    if (genre && !currentGenres.includes(genre)) {
      form.setValue('genre', [...currentGenres, genre]);
    }
  };

  const removeGenre = (genreToRemove: string) => {
    const currentGenres = form.getValues('genre') || [];
    form.setValue(
      'genre',
      currentGenres.filter((genre) => genre !== genreToRemove)
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5 my-2.5'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Book Title</FormLabel>
                <FormControl>
                  <Input placeholder='Enter book title' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='author'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="Enter author's name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='translator'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Translator</FormLabel>
                <FormControl>
                  <Input placeholder="Enter translator's name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='illustrator'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Illustrator</FormLabel>
                <FormControl>
                  <Input placeholder="Enter illustrator's name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='language'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language</FormLabel>
                <FormControl>
                  <Input placeholder='Enter book language' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='type'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Book Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select book type' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem
                      value={BookType.BOOK}
                      className='cursor-pointer'>
                      Physical Book
                    </SelectItem>
                    <SelectItem
                      value={BookType.EBOOK}
                      className='cursor-pointer'>
                      E-Book
                    </SelectItem>
                    <SelectItem
                      value={BookType.AUDIO_BOOK}
                      className='cursor-pointer'>
                      Audio Book
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='pageCount'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Page Count</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    min='0'
                    {...field}
                    placeholder='Enter page count'
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='volume'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Volume</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    min='0'
                    placeholder='Enter volume number'
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='printing'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Printing</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    min='1'
                    placeholder='Enter printing number'
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='rating'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    min='1'
                    max='5'
                    step='0.5'
                    placeholder='Rate from 1 to 5'
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='publisher'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Publisher</FormLabel>
                <FormControl>
                  <Input placeholder='Enter publisher' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder='Enter book category' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='genre'
            render={({ field }) => (
              <FormItem className='col-span-2'>
                <FormLabel>Genres</FormLabel>
                <div className='space-y-2.5'>
                  <FormControl>
                    <div className='flex gap-2'>
                      <Input
                        placeholder='Add a genre'
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();

                            addGenre((e.target as HTMLInputElement).value);

                            (e.target as HTMLInputElement).value = '';
                          }
                        }}
                      />
                      <Button
                        type='button'
                        onClick={() => {
                          const input = document.querySelector(
                            'input[placeholder="Add a genre"]'
                          ) as HTMLInputElement;

                          addGenre(input.value);

                          input.value = '';
                        }}>
                        Add
                      </Button>
                    </div>
                  </FormControl>
                  <div className='flex flex-wrap gap-2.5'>
                    {field.value?.map((genre) => (
                      <Badge
                        variant='secondary'
                        key={genre}
                        className='flex items-center gap-1'>
                        {genre}
                        <button
                          type='button'
                          onClick={() => removeGenre(genre)}
                          className='text-xs'>
                          <XIcon className='size-3' />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='image'
            render={() => (
              <FormItem className='col-span-2'>
                <FormLabel>Book Cover</FormLabel>
                <FormControl>
                  <UploadDropzone
                    endpoint='imageUploader'
                    content={{
                      button({ ready }) {
                        if (ready)
                          return (
                            <p className='flex items-center gap-2'>
                              <ImagePlusIcon className='size-4' />
                              Upload
                            </p>
                          );

                        return <Loader2Icon className='size-4 animate-spin' />;
                      },
                      label({ ready }) {
                        if (ready)
                          return (
                            <p className='text-xs'>
                              Choose file and then upload
                            </p>
                          );

                        return <Loader2Icon className='size-4 animate-spin' />;
                      },
                      allowedContent() {
                        return (
                          <p className='text-muted-foreground'>
                            Images up to 4MB, max 1.
                          </p>
                        );
                      },
                    }}
                    onClientUploadComplete={(res: { url: string }[]) => {
                      form.setValue('image', res[0].url);

                      toast({
                        description: 'Book cover uploaded successfully.',
                      });
                    }}
                    onUploadError={(err: Error) => {
                      toast({ description: err.message });
                    }}
                    className='border-double border-input ut-button:bg-gradient-to-r from-violet-200 to-pink-200 ut-button:text-primary ut-button:text-sm ut-label:text-muted-foreground ut-button:shadow'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='completed'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center justify-between rounded-md shadow-sm border border-pink-100 p-2.5'>
                <div className='space-y-0.5'>
                  <FormLabel>Completed</FormLabel>
                  <FormDescription>
                    Mark if you&apos;ve finished
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='isbn'
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISBN</FormLabel>
                <FormControl>
                  <Input placeholder='Enter ISBN' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='space-y-5'>
          <FormField
            control={form.control}
            name='summary'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Summary</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Enter book summary'
                    className='h-16 resize-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='quote'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Favorite Quote</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Enter your favorite quote from the book'
                    className='h-16 resize-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <FormField
            control={form.control}
            name='publicationDate'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Publication Date</FormLabel>
                <FormControl>
                  <Input type='date' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='acquiredDate'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date Acquired</FormLabel>
                <FormControl>
                  <Input type='date' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='startDate'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input type='date' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='endDate'
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Input type='date' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type='submit' className='w-full'>
          Add New Book
        </Button>
      </form>
    </Form>
  );
};

export default AddBookForm;
