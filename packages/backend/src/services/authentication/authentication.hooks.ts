import { User } from '@project-leek/commons';

import { HookContext } from '../../declarations';

type AuthenticationData = {
  strategy: string;
  access_token?: string;
  refresh_token?: string;
  user?: User;
};

export default {
  after: {
    create: [
      async (ctx: HookContext<AuthenticationData>) => {
        const { data } = ctx;

        if (data && data.strategy === 'spotify') {
          if (!ctx.result) {
            throw new Error('Result not expected to be empty');
          }

          const { user } = ctx.result;

          if (!user) {
            throw new Error('No user found');
          }

          const userId = user._id;
          const spotifyAccessToken = data.access_token;
          const spotifyRefreshToken = data.refresh_token;

          await ctx.app.service('users').patch(userId, { spotifyAccessToken, spotifyRefreshToken });
        }
      },
    ],
  },
};
