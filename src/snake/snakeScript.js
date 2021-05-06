const canvas = document.getElementById("game");
const ctx = canvas.getContext('2d');

redApple = new Image();
blueApple = new Image();
body_topLeft = new Image();
body_topRight = new Image();
body_horizontal = new Image();
body_bottomLeft = new Image();
body_bottomRight = new Image();
body_vertical = new Image();
head_down = new Image();
head_left = new Image();
head_right = new Image();
head_up = new Image();
tail_down = new Image();
tail_left = new Image();
tail_right = new Image();
tail_up = new Image();
snakeBlock = new Image();
redApple.src = 'Graphics/apple.png';
blueApple.src = 'Graphics/blueApple.png';
body_topLeft.src = 'Graphics/body_bottomleft.png';
body_topRight.src = 'Graphics/body_bottomright.png';
body_horizontal.src = 'Graphics/body_horizontal.png';
body_bottomLeft.src = 'Graphics/body_topleft.png';
body_bottomRight.src = 'Graphics/body_topright.png';
body_vertical.src = 'Graphics/body_vertical.png';
head_down.src = 'Graphics/head_down.png';
head_left.src = 'Graphics/head_left.png';
head_right.src = 'Graphics/head_right.png';
head_up.src = 'Graphics/head_up.png';
tail_down.src = 'Graphics/tail_down.png';
tail_up.src = 'Graphics/tail_up.png';
tail_left.src = 'Graphics/tail_left.png';
tail_right.src = 'Graphics/tail_right.png';
snakeBlock.src = 'Graphics/snakeBlock.png'

class SnakePart {
    constructor(x, y, img) {
        this.x = x;
        this.y = y;
        this.img = img;
    }
}

let speed = 3;

let tileCount = 20;
let tileSize = canvas.width / tileCount;

let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 3;

let appleX = 5;
let appleY = 5;

let appleX1 = 7;
let appleY1 = 7;

let xVelocity = 0;
let yVelocity = 0;
let xLastVelocity = 0;
let yLastVelocity = 0;

let score = 0;

let gameOver = false;

let databaseEntry = [];
let lastQuestion;
let correctApple;
let correctAnswers = 0;
let wrongAnswers = 0;

let question1 = ""
let question2 = ""
let completedQuestions = "";

let startTime;
let endTime;

let clicked = false;

let pressedLeft, pressedRight, pressedUp, pressedDown = false;

let gameLoopTimeout;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

firebase.initializeApp({
    apiKey: 'AIzaSyD7A0QItV-e6sWIh-hVxvf9mIbzSqiSwTk',
    authDomain: 'learningames-30ee8.firebaseapp.com',
    projectId: 'learningames-30ee8'
});

var db = firebase.firestore();
docRef = db.collection("answers").doc(id);

docRef.get().then((doc) => {
    if (doc.exists) {
        let data = doc.data()
        for (let i = 0; i < data.answersArr.length; i++) {
            if (data.answersArr[i].name == window.user.displayName) {
                document.getElementById("mainDiv").remove()
                document.getElementById("alreadyComplete").innerHTML = "You've already completed this test!"
            }
        }
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

async function getQuestions() {
    var docRef = db.collection("questions").doc(id);

    docRef.get().then((doc) => {
        if (doc.exists) {
            databaseEntry = doc.data()
            drawGame()
            startTime = performance.now();
            progress(0)
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}
firebase.auth().onAuthStateChanged(function (user) {
    window.user = user; // user is undefined if no user signed in
    getQuestions()
});


//game looop
function drawGame() {
    changeSnakePosition()
    isgameOver()
    if (gameOver) {
        document.getElementById("mainDiv").remove()
        var answRef = db.collection('answers').doc(id);
        endTime = performance.now();
        answRef.update({
            answersArr: firebase.firestore.FieldValue.arrayUnion({ name: window.user.displayName, correctAnswers: correctAnswers, wrongAnswers: wrongAnswers, mail: window.user.email, time: Math.round((endTime - startTime) / 1000) })
        })
        document.getElementById("finish").innerHTML = "You finished, the answers have been submited to your teacher. Good luck!";
        return;
    }

    clearScreen()

    checkAppleCollision()
    drawApple();
    drawSnake();

    window.clearTimeout(gameLoopTimeout)
    gameLoopTimeout = setTimeout(drawGame, 1000 / speed);
}

function isgameOver() {
    if (gameOver) return;
    if (yVelocity === 0 && xVelocity === 0) {
        return false;
    }

    //walls
    if (headX < 0) {
        gameOver = true;
    } else if (headX >= tileCount) {
        gameOver = true;
    } else if (headY >= tileCount) {
        gameOver = true;
    } else if (headY < 0) {
        gameOver = true;
    }

    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if (part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }
}

// function drawScore() {
//     ctx.fillStyle = 'white';
//     ctx.font = "10px Verdana";
//     ctx.fillText("Score " + (correctAnswers - wrongAnswers), canvas.width - 50, 10)
// }

function clearScreen() {
    for (let x = 0; x < tileCount; x++) {
        for (let y = 0; y < tileCount; y++) {
            if (x % 2 == 0) {
                if (y % 2 == 0) {
                    ctx.fillStyle = '#d8efdf';
                    ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
                } else {
                    ctx.fillStyle = '#cfebd7';
                    ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
                }
            } else {
                if (y % 2 == 0) {
                    ctx.fillStyle = '#cfebd7';
                    ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
                } else {
                    ctx.fillStyle = '#d8efdf';
                    ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
                }
            }
        }
    }
}


function drawSnake() {

    if (xVelocity < 0 || xVelocity > 0) snakeParts.push(new SnakePart(headX, headY, body_horizontal)); //put an item at the end of the list (next to the head)
    if (yVelocity < 0 || yVelocity > 0) snakeParts.push(new SnakePart(headX, headY, body_vertical));


    if (clicked && snakeParts.length > 2) {
        if (xLastVelocity == 1 && yVelocity == 1) snakeParts[snakeParts.length - 2].img = body_topLeft
        else if (xLastVelocity == -1 && yVelocity == 1) snakeParts[snakeParts.length - 2].img = body_topRight
        else if (yLastVelocity == 1 && xVelocity == -1) snakeParts[snakeParts.length - 2].img = body_bottomLeft
        else if (yLastVelocity == 1 && xVelocity == 1) snakeParts[snakeParts.length - 2].img = body_bottomRight

        else if (xLastVelocity == 1 && yVelocity == -1) snakeParts[snakeParts.length - 2].img = body_bottomLeft
        else if (xLastVelocity == -1 && yVelocity == -1) snakeParts[snakeParts.length - 2].img = body_bottomRight
        else if (yLastVelocity == -1 && xVelocity == 1) snakeParts[snakeParts.length - 2].img = body_topRight
        else if (yLastVelocity == -1 && xVelocity == -1) snakeParts[snakeParts.length - 2].img = body_topLeft
        else snakeParts[snakeParts.length - 2].img = snakeBlock
    }
    while (snakeParts.length > tailLength) {
        snakeParts.shift(); //remove the furthest item from the snake parts if we have more than our tail size
    }

    if (snakeParts.length > 1) {
        if (snakeParts[1].x == snakeParts[0].x + 1) snakeParts[0].img = tail_left
        else if (snakeParts[1].x == snakeParts[0].x - 1) snakeParts[0].img = tail_right
        if (snakeParts[1].y == snakeParts[0].y + 1) snakeParts[0].img = tail_up
        else if (snakeParts[1].y == snakeParts[0].y - 1) snakeParts[0].img = tail_down
    }

    for (let i = 0; i < snakeParts.length - 1; i++) {
        let part = snakeParts[i];
        ctx.drawImage(part.img, part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    if (xVelocity < 0) ctx.drawImage(head_left, headX * tileCount, headY * tileCount, tileSize, tileSize);
    else if (xVelocity > 0) ctx.drawImage(head_right, headX * tileCount, headY * tileCount, tileSize, tileSize);
    else if (yVelocity < 0) ctx.drawImage(head_up, headX * tileCount, headY * tileCount, tileSize, tileSize);
    else ctx.drawImage(head_down, headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}


function drawApple() {
    ctx.drawImage(redApple, appleX * tileCount, appleY * tileCount, tileSize, tileSize);

    ctx.drawImage(blueApple, appleX1 * tileCount, appleY1 * tileCount, tileSize, tileSize);
}

function checkAppleCollision() {
    if (appleX == headX && appleY == headY) {
        for (let i = 0; i < 50; i++) {
            appleX = Math.floor(Math.random() * tileCount);
            appleY = Math.floor(Math.random() * tileCount);

            // for (let index = 0; index < snakeParts; index++) {
            //     if (appleX != snakeParts[index].x && appleY != snakeParts[index].y) {
            //         appleX = Math.floor(Math.random() * tileCount);
            //         appleY = Math.floor(Math.random() * tileCount);
            //     }
            // }
            if (appleX == headX && appleY == headY) {
                appleX = Math.floor(Math.random() * tileCount);
                appleY = Math.floor(Math.random() * tileCount);
            } else break;

        }
        progress(1)
        tailLength++;
        score++;
    }

    if (appleX1 == headX && appleY1 == headY) {
        appleX1 = Math.floor(Math.random() * tileCount);
        appleY1 = Math.floor(Math.random() * tileCount);
        progress(2)
        tailLength++;
        score++;
    }

}

document.body.addEventListener('keydown', keyDown);
document.body.addEventListener('keyup', keyUp);

function keyDown(event) {
    if (gameOver) return;
    if (event.keyCode == 38 && !pressedUp) {
        //up
        if (yVelocity == 1) return;
        if (yVelocity != -1) clicked = true;
        yLastVelocity = yVelocity;
        xLastVelocity = xVelocity;
        yVelocity = -1;
        xVelocity = 0;
        pressedUp = true;
    } else if (event.keyCode == 40 && !pressedDown) {
        //down
        if (yVelocity == -1) return;
        if (yVelocity != 1) clicked = true;
        yLastVelocity = yVelocity;
        xLastVelocity = xVelocity;
        yVelocity = 1;
        xVelocity = 0;
        pressedDown = true;
    } else if (event.keyCode == 37 && !pressedLeft) {
        //left
        if (xVelocity == 1) return;
        if (xVelocity != -1) clicked = true;
        yLastVelocity = yVelocity;
        xLastVelocity = xVelocity;
        yVelocity = 0;
        xVelocity = -1;
        pressedLeft = true;
    } else if (event.keyCode == 39 && !pressedRight) {
        //right
        if (xVelocity == -1) return;
        if (xVelocity != 1) clicked = true;
        yLastVelocity = yVelocity;
        xLastVelocity = xVelocity;
        yVelocity = 0;
        xVelocity = 1;
        pressedRight = true;
    } else return;
    window.clearTimeout(gameLoopTimeout)
    drawGame()
    clicked = false;
}

function keyUp(event) {
    if (event.keyCode == 38) {
        //up
        pressedUp = false;
    } else if (event.keyCode == 40) {
        //down
        pressedDown = false;
    } if (event.keyCode == 37) {
        //left
        pressedLeft = false;
    } if (event.keyCode == 39) {
        //right
        pressedRight = false;
    }
}

function progress(appleId) {
    if (lastQuestion == null) lastQuestion = Math.floor(Math.random() * databaseEntry.allQuestions.length);

    if (appleId == correctApple && appleId != 0) {
        if (databaseEntry.allQuestions.length < 2) return gameOver = true;
        correctAnswers++;
    } else if (appleId != 0) {
        if (databaseEntry.allQuestions.length < 2) return gameOver = true;
        wrongAnswers++;
    }

    if (completedQuestions.length >= databaseEntry.allQuestions.length) return gameOver = true;

    rndQuestion = Math.floor(Math.random() * databaseEntry.allQuestions.length);
    correctApple = Math.floor(Math.random() * 2) + 1;

    for (let i = 0; i < 50; i++) {
        if (rndQuestion != lastQuestion && completedQuestions.includes(rndQuestion.toString()) == false) {
            lastQuestion = rndQuestion
            completedQuestions += rndQuestion.toString()
            break;
        } else {
            rndQuestion = Math.floor(Math.random() * databaseEntry.allQuestions.length);
        }
    }

    document.getElementById("question").innerHTML = databaseEntry.allQuestions[rndQuestion]
    if (correctApple == 1) {
        document.getElementById("answer1").innerHTML = '<img src="./Graphics/apple.png" height="20" width="20">  ' + databaseEntry.wrongAnswers[rndQuestion]
        document.getElementById("answer2").innerHTML = '<img src="./Graphics/blueApple.png" height="20" width="20">  ' + databaseEntry.rightAnswers[rndQuestion]
        question1 = databaseEntry.rightAnswers[rndQuestion]
        question2 = databaseEntry.wrongAnswers[rndQuestion]
    } else {
        document.getElementById("answer2").innerHTML = '<img src="./Graphics/blueApple.png" height="20" width="20">  ' + databaseEntry.rightAnswers[rndQuestion]
        document.getElementById("answer1").innerHTML = '<img src="./Graphics/apple.png" height="20" width="20">  ' + databaseEntry.wrongAnswers[rndQuestion]
        question2 = databaseEntry.rightAnswers[rndQuestion]
        question1 = databaseEntry.wrongAnswers[rndQuestion]
    }
    if (appleId == 0) {
        wrongAnswers = 0;
        correctAnswers = 0;
    }
}