'use client';

import { Share2Icon } from 'lucide-react';

import {
  EmailShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
} from 'react-share';

import {
  RiTwitterXLine,
  RiMailLine,
  RiRedditLine,
  RiWhatsappLine,
  RiTelegram2Line,
} from 'react-icons/ri';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Button } from '@/components/ui/button';

import type { ShareContent } from '@/types';

type PropTypes = {
  type: 'list' | 'book';
  content: ShareContent;
};

const ShareButton = ({ content, type }: PropTypes) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${
    type === 'book' ? 'all-books' : 'lists'
  }/${content.id}`;

  const getShareTitle = () => {
    switch (type) {
      case 'book':
        return `Check out this book: ${content.name}${
          content.author ? ` by ${content.author}` : ''
        }`;
      case 'list':
        return `Check out this reading list: ${content.name}`;
      default:
        return content.name;
    }
  };

  const title = getShareTitle();

  const shareButtons = [
    {
      component: EmailShareButton,
      icon: RiMailLine,
    },
    {
      component: WhatsappShareButton,
      icon: RiWhatsappLine,
    },
    {
      component: TelegramShareButton,
      icon: RiTelegram2Line,
    },
    {
      component: RedditShareButton,
      icon: RiRedditLine,
    },
    {
      component: TwitterShareButton,
      icon: RiTwitterXLine,
    },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size='icon'>
          <Share2Icon className='size-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent align='end' className='min-h-9'>
        <div className='flex items-center gap-1.5'>
          {shareButtons.map(({ component: Component, icon: Icon }, idx) => (
            <Button key={idx} size='icon' variant='outline' asChild>
              <Component
                url={shareUrl}
                title={title}
                className='hover:opacity-80 transition-opacity'>
                <Icon />
              </Component>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ShareButton;
