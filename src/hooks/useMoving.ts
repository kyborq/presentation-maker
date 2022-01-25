import { RefObject, useEffect, useState } from "react";
import { TPosition, TSize } from "../model/element/ElementTypes";

export const useMoveAndResize = (
  elementRef: RefObject<HTMLDivElement>,
  resizeRef: RefObject<HTMLDivElement>,
  initPosition: TPosition,
  initSize: TSize,
  enabled?: boolean,
  onMoving?: (status: boolean) => void,
  onResizing?: (status: boolean) => void
) => {
  const [position, setPosition] = useState<TPosition>(initPosition);
  const [size, setSize] = useState<TSize>(initSize);

  let startDragX = 0;
  let startDragY = 0;

  useEffect(() => {
    setPosition(initPosition);
  }, [initPosition]);

  useEffect(() => {
    if (elementRef.current)
      elementRef.current.addEventListener("mousedown", moveHandler);
    if (resizeRef.current)
      resizeRef.current.addEventListener("mousedown", resizeHandler);
    return () => {
      if (elementRef.current)
        elementRef.current.removeEventListener("mousedown", moveHandler);
      if (resizeRef.current)
        resizeRef.current.removeEventListener("mousedown", resizeHandler);
    };
  });

  const resizeHandler = (e: MouseEvent) => {
    startDragX = e.clientX;
    startDragY = e.clientY;

    document.addEventListener("mousemove", onResize);
    document.addEventListener("mouseup", onStopResize);
  };

  const onResize = (e: MouseEvent) => {
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onStopMove);

    const newWidth = size.width - startDragX + e.clientX;
    const newHeight = size.height - startDragY + e.clientY;
    enabled && setSize({ width: newWidth, height: newHeight });

    onResizing && onResizing(true);
  };

  const onStopResize = () => {
    if (elementRef.current)
      elementRef.current.removeEventListener("mousedown", resizeHandler);
    document.removeEventListener("mousemove", onResize);
    document.removeEventListener("mouseup", onStopResize);
    onResizing && onResizing(false);
  };

  const moveHandler = (e: MouseEvent) => {
    startDragX = e.clientX;
    startDragY = e.clientY;

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onStopMove);
  };

  const onMove = (e: MouseEvent) => {
    const newX = position.x - startDragX + e.clientX;
    const newY = position.y - startDragY + e.clientY;
    enabled && setPosition({ x: newX, y: newY });
    onMoving && onMoving(true);
  };

  const onStopMove = () => {
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onStopMove);
    onMoving && onMoving(false);
  };

  return [position, size];
};
