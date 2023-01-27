let moveButton = document.querySelector(".move-button");
//let wave_0 = document.querySelector(".wave-0");
let waves = document.querySelectorAll(".wave");
let backgroundGradient = document.querySelector(".div-waves");
let navlinks = document.querySelectorAll(".nav-link");
navlinks.forEach((navlink) => {
  navlink.addEventListener("click", (event) => {
    event.preventDefault();
    transitionGradient(
      170,
      300,
      -25,
      125,
      20,
      3000,
      backgroundGradient,
      waves
    );
  });
});

// Funktions
function transitionGradient(
  startAngle,
  endAngle,
  startX,
  endX,
  startY,
  time,
  obj,
  waves
) {
  return new Promise((resolve, reject) => {
    let frameRate = 1000 / 60; // 16.666666666666668, uppdateringsfrekens
    let frames = Math.round(time / frameRate); //ger totala antalet frames under animationen? (avrundat)
    let updatePerFrame = (endAngle - startAngle) / frames;
    let deltaX = (endX - startX) / frames;
    let angle = startAngle;
    let x = startX;
    let frame = 0;
    let y = (frames * frame - frame ** 2) * 0.006 + startY;

    let intervalId = setInterval(function () {
      frame++;
      angle += updatePerFrame;
      x += deltaX;
      y = (frames * frame - frame ** 2) * 0.006 + startY;

      obj.style.backgroundImage = `conic-gradient(from ${angle}deg at ${x}% -${y}%, rgb(130, 160, 238) 76%, rgb(182, 202, 255) 87%, rgb(130, 160, 238) 100%)`;

      if (frame % 20 == 0) {
        waves.forEach((element, index) => {
          if (index===waves.length-1) return
          if (index % 2 === 0) {
            element.classList.toggle("translateX20");
          } else {
            element.classList.toggle("translateX-20");
          }
        });
      }
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
