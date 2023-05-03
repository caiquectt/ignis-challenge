var teams = []
var rounds = 0;
var halfTeams = 0;

function getTeams(){
  teams = []
  let teamsToSplit = document.querySelector("#textareaTeams").value;
  teamsInfo = teamsToSplit.split("\n");
  var filteredTeams = teamsInfo.filter(elm => elm); 
  
  if (filteredTeams.length % 2 == 1){
      filteredTeams.push("BYE;Descanso");
    }

  rounds = (filteredTeams.length - 1) * 2;
  halfTeams = filteredTeams.length / 2;

  filteredTeams.map((info) => {
      teams.push({
        name: info.split(";")[0],
        state: info.split(";")[1]
      })
    })

  roundRobin();
}

function roundRobin(){

  for (let round = 1; round <= rounds; round++){
    const roundGames = [];
    const firstHalf = teams.slice(0,halfTeams);
    const secondHalf = teams.slice(halfTeams, teams.length).reverse();

      for (let i = 0; i < firstHalf.length; i++){
        roundGames.push({
          home: firstHalf[i].name,
          away: secondHalf[i].name,
          location: firstHalf[i].state,
          round: round
        })

        var textResult = `${roundGames[i].home} vs ${roundGames[i].away} - ${roundGames[i].location} - Rodada ${roundGames[i].round} <br>`

        var print = document.querySelector("#results");

        if(round == 1 && i == 0){
          print.innerHTML = "<br>Jogos de Ida <br>";
        }
        if(round == (halfTeams * 2) && i == 0){
          print.insertAdjacentHTML('beforeend',"<br>Jogos de Returno <br>")
        }

        if (i == 0){
        print.insertAdjacentHTML('beforeend', "<br>")
        }
        print.insertAdjacentHTML('beforeend', textResult);
      }

      if (round == rounds / 2){
        let hold = teams.shift();
        teams.reverse();
        teams.unshift(hold);
      }

      if (round % 2 == 1){
        teams.push(teams.shift());
      }else{
        let hold = teams.pop();
        teams.push(teams.shift());
        teams.push(teams.shift());
        teams.unshift(hold);
      }
  }
}