chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.text == "Please refresh") {
        chrome.tabs.reload(sender.tab.id);
        sendResponse({ text: "You got it" });
    }
});
