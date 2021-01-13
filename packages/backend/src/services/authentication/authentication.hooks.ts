import { User } from '@leek/commons';

import { HookContext } from '../../declarations';

type AuthenticationData = {
  strategy: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  access_token?: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  refresh_token?: string;
  user?: User;
};

export default {
  after: {
    create: [
      async (context: HookContext<AuthenticationData>): Promise<HookContext<AuthenticationData>> => {
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

        return context;
      },
    ],
  },
};
