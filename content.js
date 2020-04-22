let myBrowser = null;
try {
  myBrowser = browser;
} catch(e) {
  myBrowser = chrome;
}

var observer = new MutationObserver(function(mutations, observer) {
    FindError();
});

var player = 0;

function FindError() {
  player = document.querySelector('.content-overlay-gate__content');
  if (player.innerHTML.indexOf('Error') > -1) {
    myBrowser.runtime.sendMessage({ text: "Please refresh" });
  }
  else {
    return "ok";
  }
}

function WaitForPlayer() {
  player = document.querySelector('.content-overlay-gate__content');
  if (player == null) {
    window.requestAnimationFrame(WaitForPlayer);
  }
  else {
      if (FindError() == "ok") {
        observer.observe(player, {
        childList: true,
        subtree: true
        });
      }
    }
};

WaitForPlayer()
