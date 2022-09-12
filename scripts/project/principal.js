runOnStartup(async runtime =>
{	
	runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
});

async function OnBeforeProjectStart(runtime)
{
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	
	if (typeof urlParams === 'object' &&  urlParams !== null) {
		if (urlParams.has('user_id') && urlParams.has('game_id') && urlParams.has('game_play_id') && urlParams.has('server_url') && urlParams.has('token') ) 		{
			alert(urlParams.get('user_id'));
			alert(urlParams.get('game_id'));
			alert(urlParams.get('game_play_id'));
			alert(urlParams.get('server_url'));
			alert(urlParams.get('token'));
			
			runtime.globalVars.user_id = urlParams.get('user_id');
			runtime.globalVars.game_id = urlParams.get('game_id');
			runtime.globalVars.gameplay_id = urlParams.get('game_play_id');
			runtime.globalVars.server_url = urlParams.get('server_url');
			runtime.globalVars.game_play_api_key = urlParams.get('token');
			validateToken(runtime);
		}
	}
	
	runtime.addEventListener("tick", () => Tick(runtime));
}

function validateToken(runtime) {
	var xhr = new XMLHttpRequest(runtime);
	xhr.open("GET", runtime.globalVars.server_url+ "/game/validatedToken/+" + runtime.globalVars.game_id+ "?token="+       runtime.globalVars.game_play_api_key);
	
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function () {
		if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
			var jsonResponse = JSON.parse(xhr.response);
			runtime.globalVars.token_authorized = jsonResponse.success;
		}
	};

	xhr.send(JSON.stringify({"game_id": runtime.globalVars.game_id}));

}


function isLocalHost(url) {
  return url.indexOf('localhost') !== -1 || url.indexOf('127.0.0.1') !== -1;
}


function Tick(runtime)
{
	
}

