var observer = new MutationObserver(function(mutations, observer) {
    FindError();
});

var player = 0;

function FindError() {
  player = document.getElementById('default-player');
  if (player.innerHTML.indexOf('Error') > -1) {
    chrome.runtime.sendMessage({ text: "Please refresh" });
  }
  else {
    return "ok";
  }
}

function WaitForPlayer() {
  player = document.getElementById('default-player');
  if (player == null) {
    window.requestAnimationFrame(WaitForPlayer);
  }
  else {
    FindError();
      if (FindError() == "ok") {
        observer.observe(player, {
        childList: true,
        subtree: true
        });
      }
    }
};

WaitForPlayer()
