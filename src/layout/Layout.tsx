import React from "react";
import { fabric } from "fabric";
import { sample, range } from "lodash";
import { randomInt, randomIntFromInterval } from "./utils";

function generateLayout(canvas: fabric.Canvas) {
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
          radius: randomIntFromInterval(10, 100),
          fill: "black",
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
          }
        );
      case "triangle":
        return new fabric.Triangle({
          top: randomInt(height),
          left: randomInt(width),
          angle: randomIntFromInterval(0, 360),
          width: randomIntFromInterval(10, 100),
          fill: "black",
        });
      case "rect":
        return new fabric.Rect({
          top: randomInt(height),
          left: randomInt(width),
          height: randomIntFromInterval(10, 100),
          width: randomIntFromInterval(10, 100),
          fill: "black",
        });
    }
  }

  function addShape(): void {
    const newShape = generateRandomShape();
    if(!newShape.isType('line')) {
        const intersects = canvas.getObjects().some((obj) => !obj.isType('line') && newShape.intersectsWithObject(obj));
        if (intersects) {
            return addShape()
        }
    }

    console.log("Adding shape", newShape)
    canvas.add(newShape);
  }

  range(0, 5 + randomInt(10)).forEach(addShape);
}

export function Layout() {
  const canvasEl = React.useRef(null);
  React.useEffect(() => {
    const options = {backgroundColor: '#fff'};
    const canvas = new fabric.Canvas(canvasEl.current, options);
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
