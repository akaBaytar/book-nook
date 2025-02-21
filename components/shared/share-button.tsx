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
  XIcon,
  EmailIcon,
  RedditIcon,
  WhatsappIcon,
  TelegramIcon,
} from 'react-share';

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
    type === 'book' ? 'books' : 'my-lists'
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
  const iconSize = 28;

  const shareButtons = [
    {
      component: EmailShareButton,
      icon: EmailIcon,
    },
    {
      component: WhatsappShareButton,
      icon: WhatsappIcon,
    },
    {
      component: TelegramShareButton,
      icon: TelegramIcon,
    },
    {
      component: RedditShareButton,
      icon: RedditIcon,
    },
    {
      component: TwitterShareButton,
      icon: XIcon,
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
            <div
              key={idx}
              className='flex flex-col items-center gap-2 hover:bg-popover hover:shadow-none'>
              <Component
                url={shareUrl}
                title={title}
                className='hover:opacity-80 transition-opacity'>
                <Icon size={iconSize} round />
              </Component>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ShareButton;
