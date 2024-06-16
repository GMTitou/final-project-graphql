import prisma from '../client';
import UserResolvers from './UserResolvers';
import SongResolvers from './SongResolvers';

const resolvers = {
  Query: {
    ...UserResolvers.Query,
    ...SongResolvers.Query,
  },
  Mutation: {
    ...UserResolvers.Mutation,
    ...SongResolvers.Mutation,
  },
  Song: {
    ...SongResolvers.Song,
  },
  User: {
    songs: async (parent: any) => {
      return await prisma.song.findMany({
        where: { userId: parent.id },
      });
    },
  },
};

export default resolvers;
