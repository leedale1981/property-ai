(async () => {
  function wordsEndingWithColon(inputString) {
      const regex = /\w+:/g;
      return inputString.match(regex) || [];
  }

  function charsIncludingColonWords(inputString) {
      const wordsWithColon = wordsEndingWithColon(inputString);
      
      const results = [];
      for (let i = 0; i < wordsWithColon.length - 1; i++) {
          const startWord = wordsWithColon[i];
          const endWord = wordsWithColon[i + 1];
          
          const startIndex = inputString.indexOf(startWord);
          const endIndex = inputString.indexOf(endWord);
          
          const betweenTextIncludingColonWords = inputString.slice(startIndex, endIndex).trim();
          
          results.push(betweenTextIncludingColonWords);
      }
      
      if (wordsWithColon.length) {
          results.push(wordsWithColon[wordsWithColon.length - 1].trim());
      }
      
      return results;
  }

  const tabs = await chrome.tabs.query({active: true, currentWindow: true});

  function getReport(reportType, element) {
    chrome.tabs.sendMessage(tabs[0].id, reportType, (response) => 
    {
      var points = charsIncludingColonWords(response.output);

      for (index = 0; index < points.length; index++) {
        let p = document.createElement("p");
        p.innerHTML = points[index]
          .replace(/\bPros:/g, '<h2><u>Pros:</u></h2>')
          .replace(/\bCons:/g, '<h2><u>Cons:</u></h2>')
          .replace(/[\n\r]/g, '');
        document.getElementById("points").append(p);
      }

      document.getElementById("analysis").style.display = 'block';
      document.getElementById("loading").style.display = 'none';
      element.textContent = response.output;

    });   
  }

  getReport({getinvestment: true}, document.getElementById("investmentoutput"));
  getReport({getrental: true}, document.getElementById("rentaloutput"));
  getReport({getbuyer: true}, document.getElementById("buyeroutput"));
  getReport({getestateagents: true}, document.getElementById("estateagents"));
  getReport({getarea: true}, document.getElementById("areaoutput"));
  getReport({getcrime: true}, document.getElementById("crimeoutput"));

    const checkbox = document.getElementById('flexSwitchCheckDefault');

    checkbox.addEventListener('change', (event) => {
      getReport({getinvestment: true, gpt4: true}, document.getElementById("investmentoutput"));
      getReport({getrental: true, gpt4: true}, document.getElementById("rentaloutput"));
      getReport({getbuyer: true, gpt4: true}, document.getElementById("buyeroutput"));
      getReport({getestateagents: true, gpt4: true}, document.getElementById("estateagents"));
      getReport({getarea: true, gpt4: true}, document.getElementById("areaoutput"));
      getReport({getcrime: true, gpt4: true}, document.getElementById("crimeoutput"));
    });
})();

