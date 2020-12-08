import { HookContext } from '@/app';
import spotifyWebApi from 'spotify-web-api-node';

export default (ctx: HookContext) => {
  // nfc-reader änderung: tag gesetzt oder gelöscht (ignorieren)?
  // nfc-reader anliegenden tag mit id laden.
  // aus dem geladenen Tag die url auslesen
  // user auslesen und authtoken auslesen
  // anfragen url erstellen aus infos
  // get connected devices and choose the first device GET https://api.spotify.com/v1/me/player/devices
  // make call to PUT https://api.spotify.com/v1/me/player/play with device_id in query parameters
  return ctx;
};
