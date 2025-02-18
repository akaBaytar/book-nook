import { createUploadthing } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

import { auth } from '@clerk/nextjs/server';

import type { FileRouter } from 'uploadthing/next';

const f = createUploadthing();

export const ourFileRouter: FileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const { userId } = await auth();

      if (!userId) throw new UploadThingError('Unauthorized.');

      return { userId };
    })
    .onUploadComplete(async ({ metadata }) => {
      return { uploadedBy: metadata.userId };
    }),
};

export type OurFileRouter = typeof ourFileRouter;
