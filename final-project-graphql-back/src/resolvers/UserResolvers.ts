import prisma from '../client';
import { UserInputError } from 'apollo-server';

const UserResolvers = {
  Query: {
    users: async () => await prisma.user.findMany(),
  },
  Mutation: {
    createUser: async (_: any, { email, name }: { email: string, name?: string }) => {
      try {
        return await prisma.user.create({
          data: {
            email,
            name,
          },
        });
      } catch (error) {
        if ((error as any).code === 'P2002') {
          throw new UserInputError('Email already exists', {
            invalidArgs: { email },
          });
        }
        throw error;
      }
    },
    updateUser: async (_: any, { id, email, name }: { id: number, email?: string, name?: string }) => {
      try {
        return await prisma.user.update({
          where: { id },
          data: {
            email,
            name,
          },
        });
      } catch (error) {
        if ((error as any).code === 'P2002') {
          throw new UserInputError('Email already exists', {
            invalidArgs: { email },
          });
        } else if ((error as any).code === 'P2025') {
          throw new UserInputError('User not found', {
            invalidArgs: { id },
          });
        }
        throw error;
      }
    },
    deleteUser: async (_: any, { id }: { id: number }) => {
      try {
        return await prisma.user.delete({
          where: { id },
        });
      } catch (error) {
        if ((error as any).code === 'P2025') {
          throw new UserInputError('User not found', {
            invalidArgs: { id },
          });
        }
        throw error;
      }
    },
  },
};

export default UserResolvers;
