let myBrowser = null;
try {
  myBrowser = browser;
} catch(e) {
  myBrowser = chrome;
}

let player;

let player_observer = new MutationObserver(function(mutations, observer) {  //Whenever MutationObserver fires, we run FindError().
   //console.log('change in the player detected');
    FindError();
});

function FindError(){
  //console.log('looking for errors');
  if (player.innerText.indexOf('Error #2000') > -1) { //Checking whetver there is an error#2000. If that's the case, we can use refresh button provided by the twitch. That's gonna be like 95% of the times.
    //console.log('error2000'); 
    let allButtons = player.querySelectorAll("button");
    for (let i = 0; i < allButtons.length; i++) { //But first we need to locate that button,
      if (allButtons[i].innerText.indexOf('Click Here to Reload Player') > -1) {  //so we grab it and then click it.
        //console.log('button found, clicking');
        allButtons[i].click();
      }
      else {  //We don't need to do anything here - even if the button didn't load in time, the moment it finally loads mutation observer is going to catch it and run whole function again.
        //console.log('button not there yet');
      }
    }
  }
  else if (player.innerText.indexOf('Error #') > -1) { //If there's a different error then all we can do is refresh the page and hope for the best.
    //console.log(player.innerText);
    //console.log('different error - refreshing');
    myBrowser.runtime.sendMessage({ text: "Please refresh" });
  }
  else {
    // return "ok";             
  }
};

function WaitForPlayer() {  //First we need to make sure there is a player loaded.                                  
  player = document.querySelector("div[data-test-selector*='video-player']");
  if (player == null) { //If not, then we wait for it.
    //console.log('no player');
    window.requestAnimationFrame(WaitForPlayer);  //Waiting for it using requestAnimationFrame which probes around 60 times per second (or more, depending on the screen).
  }
  else {                                                                              
        //console.log('player found, initiazing observer');
        player_observer.observe(player, { //If there is a player, we run MutationObserver on it.
        childList: true,
        subtree: true
        });
    }
};

WaitForPlayer() //Here we acutally start our script.