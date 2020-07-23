$(document).keydown(function(e) {
  var s = ["green", "red"];
  if (e.which === 65) {
    // console.log(s);
    // var tests = sequence.length;
    // for (var i = 0; i < s.length; i++) {
    //   runSequence(s);
    // }
    runSequence(s);

  }
});

$(".btn").on("click", function() {

  var buttonPressed = $(this).attr('id');
  clickAnimation(buttonPressed);

});

function clickAnimation(colorBtn) {
  var url = "sounds/" + colorBtn + ".mp3"
  var urlID = "#" + colorBtn
  var audio = new Audio(url);
  audio.play();
  $(urlID).addClass("pressed");
  setTimeout(function() {
    $(urlID).removeClass("pressed");
  }, 100);
}

function runSequence(s) {
  for (var i = 0; i < s.length; i++) {
    clickAnimation(s[i]);
    debugger;
      setTimeout(function() {clickAnimation(s[i]);}, 500);
    }

}
let sequence = {
  "1": ["green"],
  "2": ["green", "red"]
}
