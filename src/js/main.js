(function () {
  var urlPatterns = ["https://soundcloud.com/*/*"];

  var menuId = chrome.contextMenus.create({
    type: "normal",
    id: "main",
    documentUrlPatterns: urlPatterns,
    title: "Open this tracks's coverart in new tab",
  });

  chrome.contextMenus.create({
    type: "normal",
    id: "500x500",
    parentId: "main",
    documentUrlPatterns: urlPatterns,
    title: "500 x 500 (Same as in this page's one)",
  });

  chrome.contextMenus.create({
    type: "normal",
    id: "original",
    parentId: "main",
    documentUrlPatterns: urlPatterns,
    title: "Original File",
  });

  chrome.contextMenus.onClicked.addListener(function (e, tab) {
    chrome.tabs.sendMessage(
      tab.id,
      { command: "get_artwork_url" },
      function (res) {
        if (res && res.url) {
          var url = res.url.slice(1, -1);
          switch (e.menuItemId) {
            case "main":
            case "original":
              var url = url.replace("t500x500.jpg", "original.jpg");
              break;
            case "500x500":
              break;
          }
          chrome.tabs.create({ url: url });
        } else {
          window.alert("No jacket image detected");
        }
      }
    );
  });
})();
