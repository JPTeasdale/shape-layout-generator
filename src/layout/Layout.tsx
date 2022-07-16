import React from "react";
import { fabric } from "fabric";
import { sample, range } from "lodash";
import { randomInt, randomIntFromInterval } from "./utils";

const lockParam = {
  hasControls: true,
  lockMovementX: true,
  lockMovementY: true,
  lockScalingX: true,
  lockScalingY: true,
  lockUniScaling: true,
  lockRotation: true
}

function generateLayout(canvas: fabric.StaticCanvas) {
  const isVertical = Math.round(Math.random()) === 1;
  const height = isVertical ? 800 : (800 * 1) / 1.2941;
  const width = isVertical ? (800 * 1) / 1.2941 : 800;
  canvas.setHeight(height);
  canvas.setWidth(width);

  function generateRandomShape():
    | fabric.Rect
    | fabric.Circle
    | fabric.Triangle
    | fabric.Line {
    const shape = sample(["rect", "circle", "triangle", "line"] as const);
    if (shape === undefined) {
      throw Error("shape should never be undefined");
    }

    switch (shape) {
      case "circle":
        return new fabric.Circle({
          top: randomInt(height),
          left: randomInt(width),
          radius: randomIntFromInterval(10, 500),
          stroke: "black",
          strokeWidth: 2,
          fill: "white"
        });
      case "line":
        return new fabric.Line(
          [
            randomInt(height),
            randomInt(width),
            randomInt(height),
            randomInt(width),
          ],
          {
            stroke: "black",
            strokeWidth: 2,
            hasControls: false
          }
        );
      case "triangle":
        return new fabric.Triangle({
          top: randomInt(height),
          left: randomInt(width),
          angle: randomIntFromInterval(0, 360),
          width: randomIntFromInterval(10, 100),
          stroke: "black",
          strokeWidth: 2,
          fill: "white"
        });
      case "rect":
        return new fabric.Rect({
          top: randomInt(height),
          left: randomInt(width),
          height: randomIntFromInterval(10, 400),
          width: randomIntFromInterval(10, 400),
          stroke: "black",
          strokeWidth: 2,
          fill: "white"
        });
    }
  }

  function addShape(): void {
    const newShape = generateRandomShape();
    if (!newShape.isType("line")) {
      const intersects = canvas
        .getObjects()
        .some(
          (obj) =>
            !obj.isType("line") &&
            newShape.intersectsWithObject(obj) &&
            !(newShape.isContainedWithinObject(obj) || obj.isContainedWithinObject(newShape))
        );
      if (intersects) {
        return addShape();
      }
    }
    canvas.add(newShape);
  }

  range(0, 7 + randomInt(7)).forEach(addShape);
}

export function Layout() {
  const canvasEl = React.useRef(null);
  React.useEffect(() => {
    const options = { backgroundColor: "#fff" };
    const canvas = new fabric.StaticCanvas(canvasEl.current, options);
    generateLayout(canvas);
    return () => {
      canvas.dispose();
    };
  }, []);

  return (
    <canvas
      style={{
        border: "1px solid black",
      }}
      ref={canvasEl}
    />
  );
}
