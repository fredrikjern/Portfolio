({
  plugins: ["jsdom-quokka-plugin"],
  jsdom: { file: "index.html" }, // Located in project root
});

function transition(start, end, time, obj, prop, unit, shadowbox) {
  return new Promise((resolve, reject) => {
    const frameRate = 1000 / 60; // 16.666666666666668
    const frames = Math.round(time / frameRate); //ger totala antalet frames under animationen? (avrundat)
    const updatePerFrame = Math.abs(end - start) / frames; //absolutbeloppet av delta t, delat med totala antalet frames. Alltså hur länge varje frame ska visas/ Hur ofta loopen behöver uppdatera DOM med ny postition
    let val = start; // Alltså startposition 0 position absolute

    const intervalId = setInterval(function () {
      val += updatePerFrame; // val ökar med Steglängd (tid/frame),
      obj[prop] = unit ? val + unit : val; // condition ? if true : if false
      // backgroundDiv.style.left =  if(px) {120+px} else { 120} fattar inte riktigt varför denna är nödvändig?
      if (val >= end) {
        // Avsluta "loopen" när val stegat upp till end-tiden (1200ms)
        obj[prop] = unit ? end + unit : end;
        clearInterval(intervalId);
        resolve();
      }
    }, frameRate);
  });
}
function transitionGradient(
  startAngle,
  endAngle,
  startX,
  endX,
  startY,
  highY,
  bsStart,
  bsEnd,
  time,
  obj,
  child,
  prop,
  unit,
  color1,
  color2,
  color3
) {
  return new Promise((resolve, reject) => {
    let frameRate = 1000 / 60; // 16.666666666666668, uppdateringsfrekens
    let frames = Math.round(time / frameRate); //ger totala antalet frames under animationen? (avrundat)
    let updatePerFrame = Math.abs(endAngle - startAngle) / frames;
    let deltaX = Math.abs(endX - startX) / frames;
    let deltaY = 2*Math.abs(highY - startY) / frames;
    let deltaShadow = Math.abs(bsEnd - bsStart) / frames;
    let angle = startAngle;
    let x = startX;
    let y = startY;
    let shadowX = bsStart
    let increase = true;
    let frame = 0;

    let intervalId = setInterval(function () {
      frame++;
      shadowX -= deltaShadow;
      console.log(shadowX);
      angle += updatePerFrame;
      x += deltaX;
      if (frame > (frames/2)) {increase = false }
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

let button = document.querySelector(".button");
let gradientButton = document.querySelector(".gradientButton");
let gradientContainer = document.querySelector(".gradientContainer");
let msgContainer = document.querySelector(".msg");

if (gradientButton) {
  gradientButton.addEventListener('click', (event) => {
    event.preventDefault();
    transitionGradient(
      170, 278,-15, 115, -20, -40,8,-8, 2000, gradientContainer,msgContainer
    ).then(function () {
      msgContainer.innerText = "El gradiente!";
    });
  });
}
    
if (button) {
  button.addEventListener("click", function () {
    transition(
      0,
      200,
      1200,
      backgroundDiv.style,
      "left",
      "px",
      msgContainer
    ).then(function () {
      msgContainer.innerText = "Moving is done!";
    });
  });
}


