(function() {
    var menuId = chrome.contextMenus.create({
      type: 'normal',
      id: 'main',
      documentUrlPatterns: ["https://soundcloud.com/*/*"],
      title: "Open this tracks's original coverart in new tab"
    });

    chrome.contextMenus.onClicked.addListener(
      function(e, tab) {
        chrome.tabs.sendMessage(
          tab.id,
          { command: "get_artwork_url" },
          function(res) {
            if (res && res.url) {
              chrome.tabs.create({ url: res.url.replace('t500x500.jpg', 'original.jpg') });
            } else {
              window.alert('No jacket image detected');
            }
          }
        );
      }
    );
})();
