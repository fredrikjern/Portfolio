let moveButton = document.querySelector(".move-button");
//let wave_0 = document.querySelector(".wave-0");
let waves = document.querySelectorAll(".wave");
console.log("hej");
moveButton.addEventListener("click", (event) => {
    event.preventDefault();
    waves.forEach((element, index) => {
        console.log("knappis");
        if (index % 2 === 0) {
            console.log("hej");
            element.classList.toggle("translateX-20")
        } 
    });
    //wave_0.classList.toggle("translateX-20")
});
