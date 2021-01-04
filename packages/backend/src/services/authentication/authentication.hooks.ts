import { User } from '@leek/commons';

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
      async (context: HookContext<AuthenticationData>) => {
        const { data } = context;

        if (data && data.strategy === 'spotify') {
          if (!context.result) {
            throw new Error('Result not expected to be empty');
          }

          const { user } = context.result;

          if (!user) {
            throw new Error('No user found');
          }

          const userId = user._id;
          const spotifyAccessToken = data.access_token;
          const spotifyRefreshToken = data.refresh_token;

          await context.app.service('users').patch(userId, { spotifyAccessToken, spotifyRefreshToken });
        }
      },
    ],
  },
};
