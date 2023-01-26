export function transitionGradient(
  startAngle,
  endAngle,
  startX,
  endX,
  startY,
  highY,
  time,
  obj
) {
  return new Promise((resolve, reject) => {
    let frameRate = 1000 / 60; // 16.666666666666668, uppdateringsfrekens
    let frames = Math.round(time / frameRate); //ger totala antalet frames under animationen? (avrundat)
    let updatePerFrame = (endAngle - startAngle) / frames;
    let deltaX = (endX - startX) / frames;
    let deltaY = (2 * (highY - startY)) / frames;
    let deltaShadow = (bsEnd - bsStart) / frames;
    let angle = startAngle;
    let x = startX;
    let y = startY;
    let shadowX = bsStart;
    let increase = true;
    let frame = 0;

    let intervalId = setInterval(function () {
      frame++;
      shadowX -= deltaShadow;
      console.log(shadowX);
      angle += updatePerFrame;
      x += deltaX;
      if (frame > frames / 2) {
        increase = false;
      }
      y = increase ? y - deltaY : y + deltaY;

      obj.style.backgroundImage = `conic-gradient(from ${angle}deg at ${x}% ${y}%, rgb(130, 160, 238) 76%, rgb(182, 202, 255) 87%, rgb(130, 160, 238) 100%)`;
      child.style.boxShadow = `${shadowX}px 10px 5px 0px black`;
      if (angle >= endAngle) {
        clearInterval(intervalId);
        resolve();
      }
    }, frameRate);
  });
}

function getDelta(start, end, interval) {
  return math.abs(end - start) / interval;
}
