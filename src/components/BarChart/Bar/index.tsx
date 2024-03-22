import { IBarProps } from "../../../types/barchart.model";

// bar component
function Bar(props: IBarProps) {
  const { x, y, width, height, color, onMouseEnter, onMouseLeave } = props;

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={color}
      onMouseEnter={(event) => onMouseEnter(event)}
      onMouseLeave={onMouseLeave}
    />
  );
}

export default Bar;
