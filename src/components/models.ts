export type Nullable<T> = T | null;

export interface PrizeData {
  rank: number;
  label: string;
  desc: string;
  imgUrl: string;
  imgUrlLarge: string;
}

export interface PrizesResponse {
  success: boolean;
  drawId: string;
  prizes: PrizeData[];
}
