(async () => {
    chrome.runtime.onMessage.addListener(
        (request, sender, sendResponse) => {
            if (request.getanalysis) {
                let inputext = "Is the following property a good investment. ";

                document
                    .querySelectorAll('[data-testid="primary-layout"]')
                    .forEach((node) => {
                        inputext += node.textContent;
                    });
            
                fetch(`http://localhost:8080/report?input=${encodeURIComponent(inputext)}`)
                .then((responseOutput) => {
                    responseOutput.json()
                    .then((json) => {
                        console.log(json);
                        sendResponse({output: json});
                    });
                });
            }

            return true;
        }
    );
})();