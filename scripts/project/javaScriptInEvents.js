

const scriptsInEvents = {

	async E_game_Event1_Act12(runtime, localVars)
	{
		// ✅ Read query parameters from page URL
		const params = new URLSearchParams(window.location.search);
		
		// ✅ Extract parameter values
		const mobileNumberValue  = params.get('mobileNumber');
		const tokenValue         = params.get('key');
		const gameModeValue      = params.get('gameMode');
		const transactionIDValue = params.get('trx');
		
		// ✅ Access Text2 object (for debugging output)
		const Text2 = runtime.objects.Text2.getFirstInstance();
		
		// ✅ Display raw query string or token
		Text2.text = tokenValue ? tokenValue : "No parameters found";
		
		// ✅ Save readable params to global var (optional debug)
		runtime.globalVars.params = params.toString() || "NO_params_FOUND";
		
		// ✅ Assign global variables
		runtime.globalVars.mobileNumber  = mobileNumberValue  || "NO_mobileNumber_FOUND";
		runtime.globalVars.transactionID = transactionIDValue || "NO_transactionID_FOUND";
		runtime.globalVars.gamemodeID    = gameModeValue      || "NO_gamemodeID_FOUND";
		runtime.globalVars.token         = tokenValue ? "Bearer " + tokenValue : "NO_token_FOUND";  // add Bearer prefix
		
		// ✅ Optional: Debug display in console
		console.log("URL Parameters:");
		console.log("mobileNumber:", runtime.globalVars.mobileNumber);
		console.log("transactionID:", runtime.globalVars.transactionID);
		console.log("gamemodeID:", runtime.globalVars.gamemodeID);
		console.log("token (first 30 chars):", runtime.globalVars.token.substring(0, 30) + "...");
		
	},

	async E_game_Event1_Act15(runtime, localVars)
	{

	},

	async E_game_Event66_Act2(runtime, localVars)
	{
		// ✅ Get Construct global variables
		const mobileNumberValue = runtime.globalVars.mobileNumber;
		const gameIdValue = runtime.globalVars.ID_game;
		const transaction_idValue = runtime.globalVars.transactionID;
		const game_mode_idValue = runtime.globalVars.gamemodeID;
		const scoreValue = runtime.globalVars.Score;
		const tokenValue = runtime.globalVars.token;
		
		// ✅ Access status text object
		const statusText = runtime.objects.Text2.getFirstInstance();
		
		// ✅ Show initial message
		if (statusText) {
		    statusText.text = "Preparing to submit score...";
		}
		
		// ✅ Helper function to print all variables (for debugging)
		function showDebugVariables(prefix, errorMsg = "") {
		    if (!statusText) return;
		    statusText.text =
		        prefix + "\n\n" +
		        (errorMsg ? "❌ " + errorMsg + "\n\n" : "") +
		        "🧩 Current Variables:\n" +
		        "📱 mobileNumber: " + mobileNumberValue + "\n" +
		        "🎮 gameID: " + gameIdValue + "\n" +
		        "🧾 transactionID: " + transaction_idValue + "\n" +
		        "🕹️ gameModeID: " + game_mode_idValue + "\n" +
		        "⭐ score: " + scoreValue + "\n" +
		        "🔑 token (first 30 chars): " +
		        (tokenValue ? tokenValue.substring(0, 30) + "..." : "NO_TOKEN_FOUND");
		}
		
		try {
		    // ✅ Build payload
		    const dataObject = {
		        mobile_number: mobileNumberValue,
		        game_id: gameIdValue,
		        transaction_id: transaction_idValue,
		        game_mode_id: game_mode_idValue,
		        score: scoreValue
		    };
		
		    // ✅ Convert to JSON
		    const jsonData = JSON.stringify(dataObject);
		    runtime.globalVars.Data = jsonData;
		
		    // ✅ API endpoint
		    const apiUrl = "https://b3k3n.minigameprix.com/api/leaderboards/submit";
		
		    // ✅ Send POST request
		    fetch(apiUrl, {
		        method: "POST",
		        headers: {
		            "Content-Type": "application/json",
		            "Authorization": tokenValue
		        },
		        body: runtime.globalVars.Data
		    })
		    .then(async (response) => {
		        let resultText;
		        try {
		            const data = await response.json();
		            resultText = JSON.stringify(data, null, 2);
		        } catch {
		            resultText = await response.text();
		        }
		
		        // ✅ Success or error
		        if (response.ok) {
		            if (statusText) {
		                statusText.text = "🏆 Score successfully sent!\n\nResponse:\n" + resultText;
		            }
		        } else {
		            // Show error + variables
		            showDebugVariables(
		                "⚠️ Server returned an error (" + response.status + ")",
		                resultText
		            );
		        }
		
		        console.log("Server response:", resultText);
		    })
		    .catch((err) => {
		        // ❌ Network or fetch error — show all variables
		        showDebugVariables("❌ Failed to send score (network error)", err.message);
		        console.error("Fetch error:", err);
		    });
		
		} catch (err) {
		    // ❌ Build data error — show all variables
		    showDebugVariables("⚠️ Failed to build score data", err.message);
		    console.error("Build data error:", err);
		}
		
	},

	async E_game_Event70_Act1(runtime, localVars)
	{
		console.log("Sending leaderboard postMessage");
		window.parent.postMessage({ type: "IFRAME_BUTTON_CLICKED", value: "ok" }, "*");
		
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
