import { PollOption } from "./poll-option";

export interface Poll {
  id: string;
  title: string;
  options: PollOption[];
}