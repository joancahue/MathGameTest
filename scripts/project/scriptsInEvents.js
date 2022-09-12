


const scriptsInEvents = {

	async Es_gameover_Event1_Act3(runtime, localVars)
	{
		const user_id = runtime.globalVars.user_id;
		const game_id = runtime.globalVars.game_id;
		const server_url = runtime.globalVars.server_url;
		const gameplay_id = runtime.globalVars.gameplay_id;
		const api_key = runtime.globalVars.game_play_api_key;
		const nCorrectAnswers = runtime.globalVars.correct;
		const nWrongAnswers = runtime.globalVars.wrong;
		const totalAnswers = (nCorrectAnswers+nWrongAnswers === 0) ? 0 : nCorrectAnswers+nWrongAnswers;
		const accuracy = (totalAnswers === 0)? 0 : (nCorrectAnswers/(totalAnswers))*100;
		
		if(runtime.globalVars.token_authorized) {
		
			let xhr = new XMLHttpRequest();
			xhr.open("POST", server_url+"/gameplay/score/"+game_id+"?api_key="+api_key+"&gameplay="+gameplay_id);
			xhr.setRequestHeader("Content-Type", "application/json;");
			
			xhr.onreadystatechange = function () {
				if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
					postEndGame();
				}
			};
			
			xhr.send(JSON.stringify({ "user_id": user_id, "game_id": game_id, "gameplay_id": gameplay_id, "score": nCorrectAnswers, "nCorrectAnswers": nCorrectAnswers, "nWrongAnswers": nWrongAnswers, "accuracy": accuracy}));
		}
		
		function postEndGame() {
			let xhr = new XMLHttpRequest();
		   	xhr.open("POST", server_url+"/gameplay/end/"+game_id+"?api_key="+api_key+"&gameplay="+gameplay_id);
			xhr.setRequestHeader("Content-Type", "application/json");
		
			xhr.onreadystatechange = function () {
				if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
					
				}
			};
		
			xhr.send(JSON.stringify({ "user_id": user_id, "game_id": game_id, "gameplay_id": gameplay_id, "score":nCorrectAnswers, "nCorrectAnswers": nCorrectAnswers, "nWrongAnswers": nWrongAnswers, "accuracy": accuracy}));
		}
	},

	async Es_gameover_Event5_Act2(runtime, localVars)
	{
		const user_id = runtime.globalVars.user_id;
		const game_id = runtime.globalVars.game_id;
		const server_url = runtime.globalVars.server_url;
		const api_key = runtime.globalVars.game_play_api_key;
		const gameplay_id = runtime.globalVars.gameplay_id;
		
		if(runtime.globalVars.token_authorized) {
			let xhr = new XMLHttpRequest();
			xhr.open("POST", server_url+"/gameplay/start/"+game_id+"?api_key="+api_key+"&gameplay="+gameplay_id);
			
			xhr.setRequestHeader("Content-Type", "application/json;");
			
			xhr.onreadystatechange = function () {
				if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
					var jsonResponse = JSON.parse(xhr.response);
					runtime.globalVars.gameplay_id = jsonResponse.gameplay;
				}
			};
			xhr.send(JSON.stringify({ "user_id": user_id, "game_id": game_id}));
		}
	},

	async Es_splashscreen_Event2_Act1(runtime, localVars)
	{
		const user_id = runtime.globalVars.user_id;
		const game_id = runtime.globalVars.game_id;
		const server_url = runtime.globalVars.server_url;
		const api_key = runtime.globalVars.game_play_api_key;
		const gameplay_id = runtime.globalVars.gameplay_id;
		
		if(runtime.globalVars.token_authorized) {
			
			let xhr = new XMLHttpRequest();
			alert(user_id);
			alert(game_id);
			alert(api_key);
			alert(gameplay_id);
			alert(server_url+"/gameplay/start/"+game_id+"?api_key="+api_key+"&gameplay="+gameplay_id);
			
			xhr.open("POST", server_url+"/gameplay/start/"+game_id+"?api_key="+api_key+"&gameplay="+gameplay_id);
			
			xhr.setRequestHeader("Content-Type", "application/json;");
			
			xhr.onreadystatechange = function () {
				if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
					var jsonResponse = JSON.parse(xhr.response);
					runtime.globalVars.gameplay_id = jsonResponse.gameplay;
				}
			};
			xhr.send(JSON.stringify({ "user_id": user_id, "game_id": game_id}));
		}
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

