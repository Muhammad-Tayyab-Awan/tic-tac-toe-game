let toggle_card = document.querySelector(".disclaim");
let player1Name;
let player2Name;
let turn = 1;
let changed_code =
  "<div><label for='p1name'>Player 1 Name : </label> <input type='text' placeholder='Enter Name Here' required id='p1name' name='P 1 Name' autofocus autocomplete='off'></div><div><label for='p2name'>Player 2 Name : </label> <input type='text' placeholder='Enter Name Here' required id='p2name' name='P 2 Name' autofocus autocomplete='off'></div><button id='next-play'>Next</button>";
let toggle_btn = document.querySelector("#next-name");
function getName() {
  let p1nameInput = document.querySelector("#p1name");
  let p2nameInput = document.querySelector("#p2name");
  player1Name = p1nameInput.value;
  player2Name = p2nameInput.value;
  if (player1Name === "") {
    player1Name = "Player 1";
  }
  if (player2Name === "") {
    player2Name = "Player 2";
  }
  turnMsg.innerText = `It's Your Turn ${player1Name}`;
  let niParent = p1nameInput.parentNode.parentNode.parentNode;
  niParent.remove();
}
toggle_btn.addEventListener("click", () => {
  toggle_card.classList.remove("disclaim");
  toggle_card.classList.add("name");
  toggle_card.innerHTML = changed_code;
  let toogle_next_btn = document.querySelector("#next-play");
  toogle_next_btn.addEventListener("click", getName);
});
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnMsg = document.querySelector("#turn-msg");
let turnO = true;
let count = 0;
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      turnMsg.innerText = `It's your Turn ${player2Name}`;
      box.innerText = "O";
      box.classList.add("tick");
      turnO = false;
    } else {
      turnMsg.innerText = `It's your Turn ${player1Name}`;
      box.innerText = "X";
      box.classList.add("cross");
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("tick");
    box.classList.remove("cross");
    turnMsg.innerText = `It's Your Turn ${player1Name}`;
  }
};

const showWinner = (winner) => {
  if (winner == "O") {
    winner = player1Name;
  } else {
    winner = player2Name;
  }
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
