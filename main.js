let moveButton = document.querySelector(".move-button");
let flexContainer = document.querySelector(".flex-container");
let home = document.querySelector(".home");
let gallery = document.querySelector(".gallery");
let about = document.querySelector(".about");
let waves = document.querySelectorAll(".wave");
let backgroundGradient = document.querySelector(".svg-container");
let nav = document.querySelector(".nav");
let pageindex = 0;
let navlinks = document.querySelectorAll(".nav-link");
let github = document.querySelector(".rock-git");


buildNav();
buildHome();
addListeners();
// Funktions
function transitionGradient(
  startAngle,
  endAngle,
  startX,
  endX,
  startY,
  endY,
  shadowStart,
  shadowEnd,
  time,
  obj,
  waves
) {
  return new Promise((resolve, reject) => {
    let frameRate = 1000 / 60; // 16.666666666666668 ms, uppdateringsfrekens
    let frames = Math.round(time / frameRate); // ger totala antalet frames under animationen
    let updatePerFrame = (endAngle - startAngle) / frames;
    console.log("updates angle  :  " + updatePerFrame); // Anglechange per frame
    let deltaX = (endX - startX) / frames;
    console.log("deltaX :  " + deltaX); // x-change per frame
    let deltaShadow = (shadowEnd - shadowStart) / frames;
    let shadowX = shadowStart;
    let shadowY;
    let angle = startAngle;
    let x = startX;
    let y = startY;
    let frame = 0;

    let intervalId = setInterval(function () {
      frame++;
      angle += updatePerFrame;
      x += deltaX;
      if (startY === endY) {
        y = (frames * frame - frame ** 2) * 0.006 + startY;
        shadowY = (frames * frame - frame ** 2) * 0.003 + shadowStart;
        console.log(shadowY + "   shadowY  hela animationen ");
      } else if (startY > endY) {
        console.log("startY > endY   neråt  ");
        y =
          (frames * (frames - frame / 2) - (frames - frame / 2) ** 2) * -0.003 +
          startY;
        shadowY =
          (frames * (frames - frame / 2) - (frames - frame / 2) ** 2) * 0.001 +
          shadowStart;
      } else if (startY < endY) {
        console.log("startY<endY   uppåt   ");
        y = ((frames * frame) / 2 - frame / 2 ** 2) * 0.006 + startY;
        shadowY =
          ((frames * frame) / 2 - frame / 2 ** 2) * 0.00055 + shadowStart;
      }
      console.log(shadowY + " shadowY   frame: " + frame);
      obj.style.backgroundImage = `conic-gradient(from ${angle}deg at ${x}% -${y}%, rgb(130, 160, 238) 76%, rgb(182, 202, 255) 87%, rgb(130, 160, 238) 100%)`;

      // Vågor
      if (frame % 20 == 0) {
        waves.forEach((element, index) => {
          if (
            index === waves.length - 1 ||
            index === waves.length - 2 ||
            index === waves.length - 3
          )
            return;
          if (index % 2 === 0) {
            element.classList.toggle("translateX20");
          } else {
            element.classList.toggle("translateX-20");
          }
        });
      }
      // skuggor
      // shadowX += deltaShadow;
      // console.log(shadowX + "  shadowX    frame: " +frame);
      // let navlinks = document.querySelectorAll(".nav-link");

      // navlinks.forEach((navlink) => {
      //   navlink.style.textShadow = `-${shadowX}px ${shadowY}px 4px rgba(255, 255, 255, 10%)`;
      // });
      //resolve condition
      if (frame === frames) {
        
        clearInterval(intervalId);
        resolve();
      }
    }, frameRate);
  });
}
// Logik för vilken animation som ska köras utfrån vilken sida man befinner sig på,
//eventlisteners läggs på efter att animationen slutförts för att undvika att flera animationer körs samtidigt.
function runAnimations(pageindex, index) {
  if (pageindex === 0) {
    if (index === 0) {
      console.log(" 0 0 ");
    }
    if (index === 1) {
      transitionGradient(
        170,
        225,
        -25,
        50,
        20,
        40,
        -4,
        0,
        2000,
        backgroundGradient,
        waves
      ).then(function () {
        addListeners();
      });
      console.log("från home till gallery");
    } else if (index === 2) {
      transitionGradient(
        170,
        300,
        -25,
        125,
        20,
        20,
        -4,
        4,
        3000,
        backgroundGradient,
        waves
      ).then(function () {
        addListeners();
      });
    }
  } else if (pageindex === 1) {
    if (index === 0) {
      transitionGradient(
        225,
        170,
        50,
        -25,
        40,
        20,
        0,
        -4,
        2000,
        backgroundGradient,
        waves
      ).then(function () {
        addListeners();
      });
      //console.log("gallery to nhome");
    } else if (index === 1) {
      console.log(" 1 1 ");
      //addListeners();
    } else if (index === 2) {
      transitionGradient(
        225,
        300,
        50,
        125,
        40,
        20,
        0,
        4,
        2000,
        backgroundGradient,
        waves
      ).then(function () {
        addListeners();
      });
      //console.log("från gallery till about");
    }
  } else if (pageindex === 2) {
    if (index === 0) {
      transitionGradient(
        300,
        170,
        125,
        -25,
        20,
        20,
        4,
        -4,
        3000,
        backgroundGradient,
        waves
      ).then(function () {
        addListeners();
      });
    } else if (index === 1) {
      transitionGradient(
        300,
        230,
        125,
        50,
        20,
        40,
        4,
        0,
        2000,
        backgroundGradient,
        waves
      ).then(function () {
        addListeners();
      });
    } else if (index === 2) {
      console.log(" 2 2 ");
    }
  }
}
function buildNav() {
  console.log("buildnav");
  nav.innerHTML = "";
  nav.innerHTML = `<ul>
                <li class="nav-link">Home</li>
                <li class="nav-link">Gallery</li>
                <li class="nav-link">About</li>
            </ul>`;
}
function buildHome() {
  flexContainer.innerHTML = "";
  flexContainer.innerHTML = `<p>Hi, I'm Fredrik Home</p>
            <p>I'm a FrontEnd Developer</p>`;
  flexContainer.classList.remove("hidden");
}
function buildGallery() {
  flexContainer.innerHTML = "";
  flexContainer.innerHTML = `<div class="gallery-card html"><h1>HTML</h1></div>
            <div class="gallery-card css"><h1>CSS</h1></div>
            <div class="gallery-card JS"><h1>JS</h1></div>
            <div class="gallery-card React"><h1>React</div></h1>`;
  flexContainer.classList.remove("hidden");
}
function buildAbout() {
  flexContainer.innerHTML = "";
  flexContainer.innerHTML = `<div><p>Hi, I'm About</p></div>
            <div><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione culpa similique unde labore soluta consequuntur.</p></div>`;
  flexContainer.classList.remove("hidden");
}
function addListeners() {
  console.log("add events   pageindex= " + pageindex);
  let navlinks = document.querySelectorAll(".nav-link");
  navlinks.forEach((navlink, index) => {
    if (index === 0 && pageindex !== index) {
      navlink.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("klick");
        console.log("home");
        flexContainer.classList.add("hidden"); //Funksr ej
        buildNav();
        buildHome();
        runAnimations(pageindex, index);
        pageindex = 0;
      });
    } else if (index === 1 && pageindex !== index) {
      navlink.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("gallery");
        flexContainer.classList.add("hidden");
        buildNav();
        buildGallery();
        runAnimations(pageindex, index);
        pageindex = 1;
        console.log("new pageindex:  " + pageindex);
      });
    } else if (index === 2 && pageindex !== index) {
      navlink.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("about");
        flexContainer.classList.add("hidden");
        buildNav();
        buildAbout();
        runAnimations(pageindex, index);
        pageindex = 2;
      });
    } else {
      console.log("else??   " + pageindex + "   index:" + index);
    }
  });
}
github.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("kliceklle");
  window.open("https://github.com/fredrikjern");
});
