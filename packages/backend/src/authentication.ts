import { Params, ServiceAddons } from '@feathersjs/feathers';
import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication';
import { LocalStrategy } from '@feathersjs/authentication-local';
import { expressOauth, OAuthProfile, OAuthStrategy } from '@feathersjs/authentication-oauth';

import { Application } from './declarations';
import SpotifyAuthenticationService from './spotifyAuthenticationService';

declare module './declarations' {
  interface ServiceTypes {
    authentication: AuthenticationService & ServiceAddons<any>;
  }
}

type SpotifyProfileImage = { url: string; height: number | null; width: number | null };

// create a new type for typesafe calls
type SpotifyProfile = OAuthProfile & {
  display_name: string;
  images: SpotifyProfileImage[];
  email: string;
};

class SpotifyStrategy extends OAuthStrategy {
  accessToken!: string;
  refreshToken!: string;

  async createEntity(profile: OAuthProfile, params: Params): Promise<any> {
    var extendedProfile = {...profile, accessToken: this.accessToken,  }
    return super.createEntity(profile, params);
  }

  async getEntityData(profile: SpotifyProfile, existing: any, params: Params) {
    const baseData = await super.getEntityData(profile, existing, params);
    console.log("wir sind in getEntity Data")
    return {
      ...baseData,
      // You can also set the display name to profile.name
      name: profile.display_name,
      // The GitHub profile image
      avatar: profile.images[0] && profile.images[0].url,
      // The user email address (if available)
      email: profile.email,
    };
  }
}

export default (app: Application): void => {
  const authentication = new SpotifyAuthenticationService(app);
  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());
  authentication.register('spotify', new SpotifyStrategy());

  app.use('/authentication', authentication);
  app.configure(expressOauth());
};
