import { Visit } from "./visit.interface";

export interface Link {
  id: string;
  url: string;
  visits: Visit[];
}
