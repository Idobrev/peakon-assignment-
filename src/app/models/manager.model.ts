export interface Manager {
  id: number;
  attributes: {
    identifier: string;
    firstName: string;
    lastName: string;
    name: string;
    features: string;
    gender: string,
    email: string,
    'Job Level': string, // thats ugly but its in the data
  };
}
