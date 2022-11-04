chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.command === "get_artwork_url") {
    var node = document.querySelector(
      "#content .listenArtworkWrapper .sc-artwork span.sc-artwork"
    );
    var url = window.getComputedStyle(node, false).backgroundImage.slice(4, -1);
    console.log("Detected URL of coverart: " + url);
    sendResponse({ url: url });
  }
});
