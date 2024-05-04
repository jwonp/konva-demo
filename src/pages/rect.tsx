import { KonvaEventObject } from "konva/lib/Node";
import { useState } from "react";
import { Stage, Layer, Text, Rect } from "react-konva";

const generateShapes = () => {
  return [...Array(10)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    rotation: Math.random() * 180,
    isDragging: false,
  }));
};

const INITIAL_STATE = generateShapes();
const RectPage = () => {
  const [rects, setRects] = useState(INITIAL_STATE);

  const handleDragStart = (e: KonvaEventObject<DragEvent>) => {
    const id = e.target.id();
    setRects(
      rects.map((rect) => {
        return {
          ...rect,
          isDragging: rect.id === id,
        };
      })
    );
  };
  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    setRects(
      rects.map((rect) => {
        return {
          ...rect,
          isDragging: false,
        };
      })
    );
  };
  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}>
      <Layer>
        <Text text="Try to drag a rect" />
        {rects.map((rect) => (
          <Rect
            key={rect.id}
            id={rect.id}
            x={rect.x}
            y={rect.y}
            width={50}
            height={50}
            fill="#89b717"
            opacity={0.8}
            draggable
            rotation={rect.rotation}
            shadowColor="black"
            shadowBlur={10}
            shadowOpacity={0.6}
            shadowOffsetX={rect.isDragging ? 10 : 5}
            shadowOffsetY={rect.isDragging ? 10 : 5}
            scaleX={rect.isDragging ? 1.2 : 1}
            scaleY={rect.isDragging ? 1.2 : 1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default RectPage;
