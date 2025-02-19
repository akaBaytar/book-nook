import { Webhook } from 'svix';
import { headers } from 'next/headers';

import prisma from '@/database';

import type { WebhookEvent } from '@clerk/nextjs/server';

export const POST = async (req: Request) => {
  const SIGNING_SECRET = process.env.SIGNING_SECRET!;

  const wh = new Webhook(SIGNING_SECRET);

  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    });
  }

  const payload = await req.json();

  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error: Could not verify webhook:', err);
    return new Response('Error: Verification error', {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name } = evt.data;

    try {
      await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            clerkId: id,
            email: email_addresses?.[0]?.email_address || null,
            firstName: first_name || null,
            lastName: last_name || null,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any,
        });

        const checkList = await tx.checkList.create({
          data: {
            userId: user.id,
            name: 'Checklist',
          },
        });

        const updatedUser = await tx.user.update({
          where: { id: user.id },
          data: { checkListId: checkList.id },
          include: {
            checkList: {
              include: {
                items: true,
              },
            },
          },
        });

        return updatedUser;
      });

      console.log(
        `User with Clerk ID ${id} and checklist created in database.`
      );

      return new Response('User and checklist created successfully', {
        status: 200,
      });
    } catch (error) {
      console.error('Error creating user and checklist in database:', error);
      return new Response('Error creating user and checklist', { status: 500 });
    }
  }

  return new Response('Webhook received', { status: 200 });
};
