(async () => {
    chrome.runtime.onMessage.addListener(
        (request, sender, sendResponse) => {
            if (request.getinvestment) {
                let inputext = "Is the following property a good investment. ";

                document
                    .querySelectorAll('[data-testid="primary-layout"]')
                    .forEach((node) => {
                        inputext += node.textContent;
                    });
            
                let endpoint = request.gpt4 ? "report" : "report/gpt4";
                fetch(`http://localhost:8080/${endpoint}?input=${encodeURIComponent(inputext)}`)
                .then(responseOutput => responseOutput.json())
                .then(json => sendResponse({output: json}))
                .catch(error => console.error(error));
            }

            if (request.getrental) {
                let inputext = "Is the following property a good for private renting. ";

                document
                    .querySelectorAll('[data-testid="primary-layout"]')
                    .forEach((node) => {
                        inputext += node.textContent;
                    });
            
                let endpoint = request.gpt4 ? "report/gpt4" : "report";
                fetch(`http://localhost:8080/${endpoint}?input=${encodeURIComponent(inputext)}`)
                .then(responseOutput => responseOutput.json())
                .then(json => sendResponse({output: json}))
                .catch(error => console.error(error));
            }

            if (request.getbuyer) {
                let inputext = "Is the following property a good for purchasing. ";

                document
                    .querySelectorAll('[data-testid="primary-layout"]')
                    .forEach((node) => {
                        inputext += node.textContent;
                    });
            
                let endpoint = request.gpt4 ? "report/gpt4" : "report";
                fetch(`http://localhost:8080/${endpoint}?input=${encodeURIComponent(inputext)}`)
                .then(responseOutput => responseOutput.json())
                .then(json => sendResponse({output: json}))
                .catch(error => console.error(error));
            }

            if (request.getestateagents) {
                let inputext = "Provide me with a list of estate agents for the following address with contact details. ";

                document
                    .querySelectorAll('[itemprop="address"]')
                    .forEach((node) => {
                        inputext += node.textContent;
                    });

                let endpoint = request.gpt4 ? "report/gpt4" : "report";
                fetch(`http://localhost:8080/${endpoint}?input=${encodeURIComponent(inputext)}`)
                .then(responseOutput => responseOutput.json())
                .then(json => sendResponse({output: json}))
                .catch(error => console.error(error));
            }

            if (request.getarea) {
                let inputext = "Tell me about the historical property trends for the following address. ";

                document
                    .querySelectorAll('[itemprop="address"]')
                    .forEach((node) => {
                        inputext += node.textContent;
                    });
            
                let endpoint = request.gpt4 ? "report/gpt4" : "report";
                fetch(`http://localhost:8080/${endpoint}?input=${encodeURIComponent(inputext)}`)
                .then(responseOutput => responseOutput.json())
                .then(json => sendResponse({output: json}))
                .catch(error => console.error(error));
            }

            if (request.getcrime) {
                let inputext = "Tell me about the historical crime rate for the following address. ";

                document
                    .querySelectorAll('[itemprop="address"]')
                    .forEach((node) => {
                        inputext += node.textContent;
                    });
        
                let endpoint = request.gpt4 ? "report/gpt4" : "report";
                fetch(`http://localhost:8080/${endpoint}?input=${encodeURIComponent(inputext)}`)
                .then(responseOutput => responseOutput.json())
                .then(json => sendResponse({output: json}))
                .catch(error => console.error(error));
            }

            return true;
        }
    );
})();