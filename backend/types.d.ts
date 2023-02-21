export interface Artist {
  id: string;
  name: string;
  image: string | null;
  info: string;
}

export type ArtistWithoutId = Omit<Artist, 'id'>;

export interface AlbumMutation {
  artist: string;
  name: string;
  image: string | null;
  year: string;
}

export interface TaskMutation {
  user: ObjectId;
  title: string;
  description: string;
  status: string;
}

export interface TrackHistoryMutation {
  user: ObjectId;
  track: string;
  datetime: Date;
}

export interface IUser {
  username: string;
  password: string;
  token: string;
}