export interface gameType {
  _id: string;
  name: string;
  description: string;
  image: string;
  solution: string;
  hint: string;
  level: string;
  order: number;
  type: string;

  isApproved: boolean;
}
