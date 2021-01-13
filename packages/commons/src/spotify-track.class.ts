export default class SpotifyTrack {
  uri: string;
  title: string;
  artists: string[];
  imageUri: string;

  constructor(
    uri: string,
    title: string,
    artists: SpotifyApi.ArtistObjectSimplified[],
    album: SpotifyApi.AlbumObjectSimplified,
  ) {
    this.uri = uri;
    this.title = title;
    this.artists = [];
    this.artists = artists.map((artist) => artist.name);
    this.imageUri = album.images[0].url;
  }
}
