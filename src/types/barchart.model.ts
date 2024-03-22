import { IActualData } from "./actual-data.model";
import { MouseEvent } from "react";

export interface ITooltip {
  x: number;
  y: number;
  index: number;
}
export interface IBarchartProps {
  data: IActualData[];
}

export interface IBarProps {
  x: number | undefined;
  y: number;
  width: number;
  height: number;
  color: string;
  onMouseEnter: (e: MouseEvent<SVGPathElement>) => void;
  onMouseLeave: () => void;
}
