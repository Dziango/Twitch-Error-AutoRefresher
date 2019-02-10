var observer = new MutationObserver(function(mutations, observer) {
    FindError();
});

var player = 0;

function FindError() {
  player = document.getElementById('default-player');
  if (player.innerHTML.indexOf('Error #2000') > -1) {
    chrome.runtime.sendMessage({ text: "Please refresh" });
  }
}

function WaitForPlayer() {
  player = document.getElementById('default-player');
  if (player == null) {
    window.requestAnimationFrame(WaitForPlayer);
  }
  else {
    observer.observe(player, {
      childList: true,
      subtree: true
    });
   }
};

WaitForPlayer()
