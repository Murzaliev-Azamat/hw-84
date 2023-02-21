export interface TaskMutation {
  user: ObjectId;
  title: string;
  description: string;
  status: string;
}

export interface IUser {
  username: string;
  password: string;
  token: string;
}