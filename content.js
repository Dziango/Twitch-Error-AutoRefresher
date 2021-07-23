let myBrowser = null;
try {
  myBrowser = browser;
} catch(e) {
  myBrowser = chrome;
}

let player;

let player_observer = new MutationObserver(function(mutations, observer) {  //Whenever MutationObserver fires, we run FindError().
    FindError();
});

function FindError(){
  let error_overlay = player.querySelector("div[data-test-selector*='content-overlay']");
  if ((error_overlay != null) && (error_overlay.innerText.search(/\#\d000/g) > -1)) { //Checking if there's an overlay and if it's in fact an indicator of an error (by looking for '#*000' scheme in its text).
      if (error_overlay.querySelector("button") != null) { //If that's the kind of an error with a refresh button in it,
        error_overlay.querySelector("button").click(); //ten click it.
      }
      else { //If not, we refresh whole page.
        myBrowser.runtime.sendMessage({ text: "Please refresh" });
      }
  }
  else {
    // return "ok";             
  }
};

function WaitForPlayer() {  //First we need to make sure there is a player loaded.                                  
  player = document.querySelector("div[data-test-selector*='video-player']");
  if (player == null) { //If not, then we wait for it.
    window.requestAnimationFrame(WaitForPlayer);  //Waiting for it using requestAnimationFrame which probes around 60 times per second (or more, depending on the screen).
  }
  else {                                                                              
        player_observer.observe(player, { //If there is a player, we run MutationObserver on it.
        childList: true,
        subtree: true
        });
    }
};

WaitForPlayer() //Here we acutally start our script.