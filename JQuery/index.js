$("h1").addClass("big-title margin-50");

$("h1").html("<em>Hey</em>");

$("a").attr("href", "https://www.yahoo.com");

$("button").click(function() {
  $("h1").css("color", "yellow");
})

$("h1").on("mouseover", function() {
  $("h1").css("color", "yellow");
})
