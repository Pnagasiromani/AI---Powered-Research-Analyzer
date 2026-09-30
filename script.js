document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("start-analysis").addEventListener("click", async function () {
        const groqApiKey = document.getElementById("groq-api").value;
        const openRouterApiKey = document.getElementById("openrouter-api").value;
        const groqModel = document.getElementById("groq-model").value;
        const openRouterModel = document.getElementById("openrouter-model").value;
        const query = document.getElementById("query").value;
        const maxPages = document.getElementById("max-pages").value;

        if (!groqApiKey || !openRouterApiKey || !query) {
            alert("Please enter all required fields.");
            return;
        }

        const requestData = {
            groq_api_key: groqApiKey,
            openrouter_api_key: openRouterApiKey,
            groq_model: groqModel,
            openrouter_model: openRouterModel,
            query: query,
            max_pages: maxPages
        };

        try {
            const response = await fetch("http://127.0.0.1:5000/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            document.getElementById("results").innerHTML = <pre>${JSON.stringify(result, null, 2)}</pre>;
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to analyze. Check console for details.");
        }
    });
});