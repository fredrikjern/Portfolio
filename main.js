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
      -15,
      115,
      -20,
      -30,
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
  highY,
  time,
  obj,
  waves
) {
  return new Promise((resolve, reject) => {
    let frameRate = 1000 / 60; // 16.666666666666668, uppdateringsfrekens
    let frames = Math.round(time / frameRate); //ger totala antalet frames under animationen? (avrundat)
    let updatePerFrame = (endAngle - startAngle) / frames;
    let deltaX = (endX - startX) / frames;
    let deltaY = (2 * (highY - startY)) / frames;
    let angle = startAngle;
    let x = startX;
    let y = startY;
    let increase = true;
    let frame = 0;

    let intervalId = setInterval(function () {
      frame++;
      angle += updatePerFrame;
      x += deltaX;
      // if (frame > frames / 2) {
      //   increase = false;
      // }
      // y = increase ? y - deltaY : y + deltaY;

      // Jag vill beskriva y som en funktion av x som vänder halvvägs
      //och är parabolformad-- > ex. y = 50x - x^2,
      //(x = -15 -> y= -20), (x=65 -> y=-40) (x = 115 -> y= -20)
      // x går från -15 till 115 -> 130 i skillnad på 120 steg (beror på animationens längd)
      // Förenkla? Gör positiv, gå från 20 till 40 till 20 och ändra till negativt vid implementering?
      // Gör den relativt frames istället för x ?
      // y = (frame-frame^2) + 20, där frame-frame^2 går från 0 till 20 till 0?
      // f(x)=(120x-x^(2))*0.005 + 20  går från 20 till 40 till 20

      y = (frames * frame - frame ** 2) * 0.006 + 20;

      obj.style.backgroundImage = `conic-gradient(from ${angle}deg at ${x}% -${y}%, rgb(130, 160, 238) 76%, rgb(182, 202, 255) 87%, rgb(130, 160, 238) 100%)`;

      if (frame % 20 == 0) {
        waves.forEach((element, index) => {
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
