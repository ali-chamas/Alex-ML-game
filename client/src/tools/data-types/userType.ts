import { modelType } from "./modelType";

export interface userType {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
  username: string;
  currentGame: string;
  role: string;
  age: number;
  avatar: string;
  progress: number;
  gamesProgress: [userGame] | [];
}

interface userGame {
  _id: String;
  finished: boolean;
  model: [modelType];
  order: number;
}
