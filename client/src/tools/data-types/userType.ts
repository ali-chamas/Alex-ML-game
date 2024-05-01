import { gameType } from "./gameType";

export interface userType {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
  username: string;
  password?: string;
  role: string;
  age: number;
  avatar: string;
  games: [gameType];
}
