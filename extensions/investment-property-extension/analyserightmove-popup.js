chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      document.getElementById("output").textContent = request.output;
    }
  );