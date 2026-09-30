import js
import json
import asyncio
from pyodide.http import pyfetch # type: ignore

async def analyze():
    groq_api_key = js.document.getElementById("groq-api").value
    openrouter_api_key = js.document.getElementById("openrouter-api").value
    groq_model = js.document.getElementById("groq-model").value
    openrouter_model = js.document.getElementById("openrouter-model").value
    query = js.document.getElementById("query").value
    max_pages = js.document.getElementById("max-pages").value

    if not groq_api_key or not openrouter_api_key or not query:
        js.alert("Please enter all required fields.")
        return

    request_data = {
        "groq_api_key": groq_api_key,
        "openrouter_api_key": openrouter_api_key,
        "groq_model": groq_model,
        "openrouter_model": openrouter_model,
        "query": query,
        "max_pages": max_pages
    }

    try:
        response = await pyfetch(
            url="http://127.0.0.1:5000/analyze",
            method="POST",
            headers={"Content-Type": "application/json"},
            body=json.dumps(request_data),
        )
        result = await response.json()
        js.document.getElementById("results").innerHTML = f"<pre>{json.dumps(result, indent=2)}</pre>"
        print("Python analysis completed successfully!")
    except Exception as e:
        js.alert(f"Error: {str(e)}")
        print("Error during analysis",e)