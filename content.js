handler = function () {
  var x = document.querySelector(
    "div[aria-labelledby='content-overlay-gate-text']"
  );
  if (x != null) {
    if (x.innerText.search(/\#\d000/g)) {
      x.querySelector("button").click();
    }
  }
};

setInterval(handler, 3000);
