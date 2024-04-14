import prisma from "@/lib/prisma";

// on recupere tous les cours qui st lies a cet utilisateur
//de tell sorte que l'utilisateur ne peut acceder aux cours qu'il a cree

export const getCourse = async ({
  courseId,
  userId,
  userPage,
}: {
  courseId: string;
  userId: string;
  userPage: number;
}) => {
  const courses = await prisma.course.findUnique({
    where: {
      creatorId: userId,
      id: courseId,
    },
    select: {
      id: true,
      image: true,
      name: true,
      presentation: true,
      users: {
        take: 5,
        skip: Math.max(0, userPage * 5),
        select: {
          canceledAt: true,
          id: true,
          user: {
            select: {
              email: true,
              id: true,
              image: true,
            },
          },
        },
      },
      _count: {
        select: {
          lessons: true,
          users: true,
        },
      },
    },
  });

  const users = courses?.users.map((user) => {
    return {
      cancel: user.canceledAt ? true : false,
      ...user.user,
    };
  });
  return {
    ...courses,
    users,
  };
};
