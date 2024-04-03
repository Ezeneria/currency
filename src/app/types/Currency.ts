export interface Currency {
  base: string;
  date: Date;
  rates: {
    [key: string]: number
  }
}
