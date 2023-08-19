(async () => {
    // do api call here?
    let input = document.getElementById
    let responseOutput = "hello"
    await chrome.runtime.sendMessage({output: responseOutput});
})();