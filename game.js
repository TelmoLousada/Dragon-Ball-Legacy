const gameArea = document.getElementById("gameArea");
const nimbus = document.getElementById("nimbus");
const backgroundMusic = document.getElementById("backgroundMusic");

let nimbusLeft = 50;
let nimbusTop = 50;
const nimbusSpeed = 10;

let obstacles = [];

window.addEventListener("load", () => {
    backgroundMusic.play();
});

function moveNimbus(event) {
    switch (event.key) {
        case "ArrowUp":
            nimbusTop = Math.max(0, nimbusTop - nimbusSpeed);
            break;
        case "ArrowDown":
            nimbusTop = Math.min(gameArea.clientHeight - nimbus.clientHeight, nimbusTop + nimbusSpeed);
            break;
        case "ArrowLeft":
            nimbusLeft = Math.max(0, nimbusLeft - nimbusSpeed);
            break;
        case "ArrowRight":
            nimbusLeft = Math.min(gameArea.clientWidth - nimbus.clientWidth, nimbusLeft + nimbusSpeed);
            break;
    }

    nimbus.style.left = `${nimbusLeft}px`;
    nimbus.style.top = `${nimbusTop}px`;

    checkCollisions();
}

function createObstacle() {
    const obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");
    obstacle.style.left = `${window.innerWidth}px`;
    obstacle.style.top = `${Math.random() * (window.innerHeight - 30)}px`;
    gameArea.appendChild(obstacle);
    obstacles.push(obstacle);
}

function moveObstacles() {
    for (let index = obstacles.length - 1; index >= 0; index--) {
        const obstacle = obstacles[index];
        const obstacleLeft = parseFloat(obstacle.style.left);
        obstacle.style.left = `${obstacleLeft - 5}px`;

        if (obstacleLeft + 30 < 0) {
            obstacle.remove();
            obstacles.splice(index, 1);
        }
    }
}

function checkCollisions() {
    const nimbusRect = nimbus.getBoundingClientRect();

    obstacles.forEach((obstacle) => {
        const obstacleRect = obstacle.getBoundingClientRect();

        if (
            nimbusRect.left < obstacleRect.right &&
            nimbusRect.right > obstacleRect.left &&
            nimbusRect.top < obstacleRect.bottom &&
            nimbusRect.bottom > obstacleRect.top
        ) {
            alert("Oh no! Tao Pai Pai got you! Game Over!");
            resetGame();
        }
    });
}

function resetGame() {
    nimbusLeft = 50;
    nimbusTop = 50;
    nimbus.style.left = `${nimbusLeft}px`;
    nimbus.style.top = `${nimbusTop}px`;

    obstacles.forEach((obstacle) => obstacle.remove());
    obstacles = [];


    backgroundMusic.currentTime = 0;
    backgroundMusic.play();
}

document.addEventListener("keydown", moveNimbus);

setInterval(createObstacle, 1000);
setInterval(moveObstacles, 20);
setInterval(checkCollisions, 20);