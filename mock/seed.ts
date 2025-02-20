import { PrismaClient } from '@prisma/client';

import { BOOKS, TBR_LIST } from '.';

const prisma = new PrismaClient();

const seed = async () => {
  try {
    console.log('Getting user data...');

    const userId = process.env.USER_ID;

    if (!userId) {
      throw new Error(
        'Authentication required: Please create an account and make sure USER_ID is present.'
      );
    }

    console.log('User found:', userId);

    console.log('Cleaning up existing data...');

    await Promise.all([
      prisma.tbr.deleteMany({ where: { userId } }),
      prisma.book.deleteMany({ where: { userId } }),
    ]);

    console.log('Seeding books...');

    await prisma.book.createMany({
      data: BOOKS.map((book) => ({
        ...book,
        userId,
      })),
    });

    console.log('Seeding TBR list...');

    await prisma.tbr.createMany({
      data: TBR_LIST.map((tbr) => ({
        ...tbr,
        userId,
      })),
    });

    console.log('Database seeded successfully!');

    console.log(
      `Seeded ${BOOKS.length} books and ${TBR_LIST.length} TBR items for user ${userId}`
    );
  } catch (error) {
    console.error('Seeding failed:', error);

    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
