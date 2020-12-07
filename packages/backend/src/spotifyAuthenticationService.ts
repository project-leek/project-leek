import { AuthenticationRequest, AuthenticationResult, AuthenticationService } from '@feathersjs/authentication';
import { Params } from '@feathersjs/feathers';

export default class SpotifyAuthenticationService extends AuthenticationService {
  async create(data: AuthenticationRequest, params: Params): Promise<AuthenticationResult> {
    console.log('create method:');
    console.log(`access_token:${String(data?.access_token)}`);
    console.log(`refresh_token:${String(data?.refresh_token)}`);

    return super.create(data, params);
  }
}
