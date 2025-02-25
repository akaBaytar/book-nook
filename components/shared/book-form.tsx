'use client';

import Image from 'next/image';

import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImagePlusIcon, Loader2Icon, XIcon, CalendarIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';

import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from '@/components/ui/select';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';

import { cn } from '@/lib/utils';
import { BookSchema } from '@/schemas';
import { useToast } from '@/hooks/use-toast';
import { BOOK_DEFAULT_VALUES } from '@/constants';
import { UploadButton } from '@/utils/uploadthing';
import { addBook, updateBook } from '@/actions/book.actions';

import { BookType, BookData } from '@/types';
import type { Dispatch, SetStateAction } from 'react';

const sanitizeFormData = (data: Partial<BookData> | undefined): BookData => {
  if (!data) return BOOK_DEFAULT_VALUES;

  const sanitized = { ...BOOK_DEFAULT_VALUES };

  Object.entries(data).forEach(([key, value]) => {
    if (value !== null) {
      // @ts-expect-error - dynamic key access
      sanitized[key] = value;
    }
  });

  return sanitized as BookData;
};

type PropTypes = {
  initialData?: Partial<BookData>;
  isEdit?: boolean;
  bookId?: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onSuccess?: () => void;
};

const BookForm = ({
  initialData,
  isEdit = false,
  bookId,
  setIsOpen,
  onSuccess,
}: PropTypes) => {
  const { toast } = useToast();

  const formDefaultValues = sanitizeFormData(initialData);

  const form = useForm<BookData>({
    resolver: zodResolver(BookSchema),
    defaultValues: {
      ...formDefaultValues,
      rating: Number(formDefaultValues.rating),
    },
  });

  const coverImage = form.watch('image') || '';

  const onSubmit = async (values: BookData) => {
    try {
      const response = isEdit
        ? await updateBook(bookId as string, values)
        : await addBook(values);

      if (response.success) {
        toast({ description: response.message });

        if (onSuccess) {
          onSuccess();
        } else {
          setIsOpen(false);
        }
      } else {
        toast({
          title: 'Error',
          description: response.message,
        });
      }
    } catch {
      toast({
        title: 'Error',
        description: 'An error occurred.',
      });
    }
  };

  const addGenre = (genre: string) => {
    if (!genre.trim()) return;

    const currentGenres = form.getValues('genre') || [];

    if (!currentGenres.includes(genre)) {
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
                  <Input
                    placeholder='Enter book title'
                    {...field}
                    value={field.value || ''}
                  />
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
                  <Input
                    placeholder="Enter author's name"
                    {...field}
                    value={field.value || ''}
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
            name='translator'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Translator</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter translator's name"
                    {...field}
                    value={field.value || ''}
                  />
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
                  <Input
                    placeholder="Enter illustrator's name"
                    {...field}
                    value={field.value || ''}
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
            name='language'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter book language'
                    {...field}
                    value={field.value || ''}
                  />
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
                  value={field.value || BookType.BOOK}>
                  <FormControl>
                    <SelectTrigger className='bg-transparent'>
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
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <FormField
            control={form.control}
            name='pageCount'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Page Count</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    min='1'
                    placeholder='Enter page count'
                    value={field.value ?? 1}
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
                    value={field.value ?? 0}
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
                    value={field.value ?? 1}
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
                    min={1}
                    max={5}
                    step={0.1}
                    value={Number(field.value) ?? 5}
                    onChange={(e) => field.onChange(Number(e.target.value))}
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
            name='publisher'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Publisher</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter publisher'
                    {...field}
                    value={field.value || ''}
                  />
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
                  <Input
                    placeholder='Enter book category'
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
                  {(field.value || []).map((genre) => (
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
              <Image
                priority
                src={coverImage || '/placeholder.jpg'}
                width={900}
                height={600}
                alt='book cover'
                className='w-full max-h-40 p-2.5 object-contain rounded-md border border-input'
              />
              <FormControl>
                <div>
                  <UploadButton
                    endpoint='imageUploader'
                    content={{
                      button({ ready }) {
                        if (ready)
                          return (
                            <div className='flex items-center gap-2'>
                              <ImagePlusIcon className='size-4' />
                              Upload Cover
                            </div>
                          );
                        return <Loader2Icon className='size-4 animate-spin' />;
                      },
                    }}
                    appearance={{
                      container: { padding: 0, margin: 0 },
                      allowedContent: { display: 'none' },
                    }}
                    onClientUploadComplete={async (res: { url: string }[]) => {
                      form.setValue('image', res[0].url);
                      toast({
                        description: 'Book cover uploaded successfully.',
                      });
                    }}
                    onUploadError={(err: Error) => {
                      toast({ description: err.message });
                    }}
                    className='ut-button:border ut-button:border-input ut-button:bg-gradient-to-r from-violet-200 to-pink-200 ut-button:text-sm ut-button:font-medium ut-button:h-9 ut-button:ut-uploading:bg-secondary ut-button:w-full'
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <FormField
            control={form.control}
            name='completed'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center justify-between rounded-md shadow-sm border border-pink-100 p-2.5'>
                <div className='space-y-0.5'>
                  <FormLabel>Completed</FormLabel>
                  <FormDescription className='text-xs'>
                    Mark if you&apos;ve finished
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value || false}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='readingNow'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center justify-between rounded-md shadow-sm border border-pink-100 p-2.5'>
                <div className='space-y-0.5'>
                  <FormLabel>Reading Now</FormLabel>
                  <FormDescription className='text-xs'>
                    Mark if you&apos;re reading now
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value || false}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 items-end gap-5'>
          <FormField
            control={form.control}
            name='private'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center justify-between rounded-md shadow-sm border border-pink-100 p-2.5'>
                <div className='space-y-0.5'>
                  <FormLabel>Private</FormLabel>
                  <FormDescription className='text-xs'>
                    Mark if you want your book to be visible only to you
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value || false}
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
                  <Input
                    placeholder='Enter ISBN'
                    {...field}
                    value={field.value || ''}
                  />
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
                    value={field.value || ''}
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
                    value={field.value || ''}
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
              <FormItem className='flex flex-col'>
                <FormLabel>Publication Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl className='bg-transparent hover:bg-pink-50 hover:border-pink-300'>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full ps-2.5 text-start font-normal',
                          !field.value && 'text-muted-foreground'
                        )}>
                        {field.value ? (
                          format(new Date(field.value), 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className='ms-auto size-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      captionLayout='dropdown'
                      fromYear={1940}
                      toYear={new Date().getFullYear()}
                      ISOWeek
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => field.onChange(date?.toISOString())}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='acquiredDate'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Date Acquired</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl className='bg-transparent hover:bg-pink-50 hover:border-pink-300'>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full ps-2.5 text-start font-normal',
                          !field.value && 'text-muted-foreground'
                        )}>
                        {field.value ? (
                          format(new Date(field.value), 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className='ms-auto size-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      captionLayout='dropdown'
                      fromYear={1940}
                      toYear={new Date().getFullYear()}
                      ISOWeek
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => field.onChange(date?.toISOString())}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='startDate'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl className='bg-transparent hover:bg-pink-50 hover:border-pink-300'>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full ps-2.5 text-start font-normal',
                          !field.value && 'text-muted-foreground'
                        )}>
                        {field.value ? (
                          format(new Date(field.value), 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className='ms-auto size-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      captionLayout='dropdown'
                      fromYear={1940}
                      toYear={new Date().getFullYear()}
                      ISOWeek
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => field.onChange(date?.toISOString())}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='endDate'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl className='bg-transparent hover:bg-pink-50 hover:border-pink-300'>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full ps-2.5 text-start font-normal',
                          !field.value && 'text-muted-foreground'
                        )}>
                        {field.value ? (
                          format(new Date(field.value), 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className='ms-auto size-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      captionLayout='dropdown'
                      fromYear={1940}
                      toYear={new Date().getFullYear()}
                      ISOWeek
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => field.onChange(date?.toISOString())}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type='submit' className='w-full'>
          {isEdit ? 'Update Book' : 'Add New Book'}
        </Button>
      </form>
    </Form>
  );
};

export default BookForm;
