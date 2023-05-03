var teams = []
var rounds;
var halfRounds;

function getTeams(){
  teams = []
  let teamsToSplit = document.querySelector("#textareaTeams").value;
  teamsInfo = teamsToSplit.split("\n");
    if (teamsInfo.length % 2 == 1){
      teamsInfo.push("BYE;Descanso");
    }

  rounds = teamsInfo.length;
  halfRounds = teamsInfo.length / 2;

  teamsInfo.map((info) => {
    if (info == ''){
      teams.push({
        name: 'BYE',
        state: 'Descanso'
      })
    }
    else{
      teams.push({
        name: info.split(";")[0],
        state: info.split(";")[1]
      })
    }
  })

  roundRobin();
}

function roundRobin(){
  const tournamentGames = [];

  for (let round = 1; round <= rounds; round++){
    const roundGames = [];
    const firstHalf = teams.slice(0,halfRounds);
    const secondHalf = teams.slice(halfRounds, teams.length).reverse();

      for (let i = 0; i < firstHalf.length; i++){
        roundGames.push({
          home: firstHalf[i].name,
          away: secondHalf[i].name,
          location: firstHalf[i].state,
          round: round
        })

        var teste = `${roundGames[i].home} vs ${roundGames[i].away} - ${roundGames[i].location} - Rodada ${roundGames[i].round} <br>`

        var print = document.querySelector("#results");
        var print2 = document.querySelector("#results2")

        if(round == 1 && i == 0){
          print.innerHTML = "<br>Jogos de Ida <br>";
        }
        if(round == (halfRounds + 1) && i == 0){
          print.insertAdjacentHTML('beforeend',"<br>Jogos de Returno <br>")
        }

        if (i == 0){
        print.insertAdjacentHTML('beforeend', "<br>")
        }
        print.insertAdjacentHTML('beforeend', teste);
      }
    teams.push(teams.shift());
    }
  }