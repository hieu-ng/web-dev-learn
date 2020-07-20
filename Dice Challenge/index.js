// alert ("working!");
var dice1 = Math.floor(Math.random() * 6 + 1);
var dice2 = Math.floor(Math.random() * 6 + 1);

var dice1_src = "images/dice" + dice1 + ".png";
var dice2_src = "images/dice" + dice2 + ".png";

document.querySelectorAll("img")[0].setAttribute("src", dice1_src);
document.querySelectorAll("img")[1].setAttribute("src", dice2_src);
if (dice1 < dice2) {
  document.querySelector("h1").innerHTML = "Player 2 wins";
}
else if (dice1 > dice2) {
  document.querySelector("h1").innerHTML = "Player 1 wins";
}
else {
  document.querySelector("h1").innerHTML = "It's a Draw";
}
