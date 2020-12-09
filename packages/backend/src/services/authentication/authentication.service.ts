import { Params, ServiceAddons, HooksObject } from '@feathersjs/feathers';
import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication';
import { expressOauth, OAuthProfile, OAuthStrategy } from '@feathersjs/authentication-oauth';

import { Application } from '../../declarations';
import hooks from './authentication.hooks';

declare module '../../declarations' {
  interface ServiceTypes {
    authentication: AuthenticationService & ServiceAddons<any>;
  }
}

type SpotifyProfileImage = { url: string; height: number | null; width: number | null };

type SpotifyProfile = OAuthProfile & {
  display_name: string;
  images: SpotifyProfileImage[];
  email: string;
};

class SpotifyStrategy extends OAuthStrategy {
  async getEntityData(profile: SpotifyProfile, existing: any, params: Params) {
    const baseData = await super.getEntityData(profile, existing, params);

    return {
      ...baseData,
      // You can also set the display name to profile.
      name: profile.display_name,
      // The GitHub profile image
      avatar: profile.images[0] && profile.images[0].url,
      // The user email address (if available)
      email: profile.email,
    };
  }
}

export default (app: Application): void => {
  const authentication = new AuthenticationService(app);
  authentication.register('jwt', new JWTStrategy());
  authentication.register('spotify', new SpotifyStrategy());

  app.use('authentication', authentication);
  // TODO remove workaround
  app.service('authentication').hooks((hooks as unknown) as Partial<HooksObject>);

  app.configure(expressOauth());
};
