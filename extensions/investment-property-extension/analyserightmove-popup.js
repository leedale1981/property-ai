(async () => {
  const tabs = await chrome.tabs.query({active: true, currentWindow: true});
  chrome.tabs.sendMessage(tabs[0].id, {getanalysis: true}, (response) => 
  {
    document.getElementById("output").textContent = response.output; 
  });   
})();

