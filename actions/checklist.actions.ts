'use server';

import prisma from '@/database';

import { handleError } from '@/utils';
import { CheckListSchema } from '@/schemas';
import { getCurrentUser } from '@/actions/user.actions';

import type { CheckList } from '@/types';

export const updateCheckListName = async (data: CheckList) => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  try {
    const { name } = CheckListSchema.parse(data);

    await prisma.checkList.update({ where: { userId }, data: { name } });

    return {
      success: true,
      message: 'Your list name updated successfully.',
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error),
    };
  }
};
