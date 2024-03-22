import { IActualData } from "./actual-data.model";

export interface IPeriodData extends IActualData {
  period: IPeriodDetailData[];
}

export interface IPeriodDetailData {
  periodTimeline: string;
  totalRoomInHotel: number;
  roomRevenue: number;
  fBRevenue: number;
}

export interface IPeriodDetailProps {
  data: IPeriodData[];
}
