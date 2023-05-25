handler = function () {
  var error_box = document.querySelector(
    "div[aria-labelledby='content-overlay-gate-text']"
  );
  if (error_box) {
    if (error_box.innerText.search(/\#\d000/g)) {
      if (error_box.querySelector("button")){
        error_box.querySelector("button").click();
      }
    }
  }
};

setInterval(handler, 3000);
