

const scriptsInEvents = {

	async E_game_Event66_Act1(runtime, localVars)
	{
		console.log("Sending leaderboard postMessage");
		window.parent.postMessage({ type: "IFRAME_BUTTON_CLICKED", value: "ok" }, "*");
		
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
