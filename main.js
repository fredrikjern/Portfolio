let moveButton = document.querySelector(".move-button");
//let wave_0 = document.querySelector(".wave-0");
let waves = document.querySelectorAll(".wave");
let backgroundGradient = document.querySelector(".div-waves");
moveButton.addEventListener("click", (event) => {
  event.preventDefault();
  transitionGradient(170, 278, -15, 115, -20, -30, 2000, backgroundGradient,waves);
  waves.forEach((element, index) => {
    if (index % 2 === 0) {
      console.log("hej");
      element.classList.toggle("translateX-20");
    }
  });
  //wave_0.classList.toggle("translateX-20")
});

// Funktions
function transitionGradient(startAngle,endAngle,startX,endX,startY,highY,time,obj,waves
) { return new Promise((resolve, reject) => {
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
        if (frame > frames / 2) {
            increase = false;
        }
        y = increase ? y - deltaY : y + deltaY;

        obj.style.backgroundImage = `conic-gradient(from ${angle}deg at ${x}% ${y}%, rgb(130, 160, 238) 76%, rgb(182, 202, 255) 87%, rgb(130, 160, 238) 100%)`;

        if (frame % 20 == 0) {
            waves.forEach((element, index) => {
                if (frame % 20 === 0) {
                    console.log("hej");
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
