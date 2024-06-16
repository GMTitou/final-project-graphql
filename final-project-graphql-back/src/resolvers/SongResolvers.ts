import prisma from '../client';
import { UserInputError } from 'apollo-server';

const SongResolvers = {
  Query: {
    songs: async () => await prisma.song.findMany(),
  },
  Mutation: {
    createSong: async (_: any, { title, artist, userId }: { title: string, artist: string, userId: number }) => {
      return await prisma.song.create({
        data: {
          title,
          artist,
          userId,
        },
      });
    },
    deleteSong: async (_: any, { id }: { id: number }) => {
      try {
        return await prisma.song.delete({
          where: { id },
        });
      } catch (error) {
        if ((error as any).code === 'P2025') {
          throw new UserInputError('Song not found', {
            invalidArgs: { id },
          });
        }
        throw error;
      }
    },
  },
  Song: {
    user: async (parent: any) => {
      return await prisma.user.findUnique({
        where: { id: parent.userId },
      });
    },
  },
};

export default SongResolvers;
