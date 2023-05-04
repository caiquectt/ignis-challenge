var teams = []
var rounds = 0;
var halfTeams = 0;

function getTeams(){
  teams = []
  let teamsToSplit = document.querySelector("#textareaTeams").value;
  let teamsInfo = teamsToSplit.split("\n");
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
    const homeTeams = teams.slice(0,halfTeams);
    const awayTeams = teams.slice(halfTeams, teams.length).reverse();
    var matchState = [];
    for (let i = 0; i < homeTeams.length; i++){
      matchState[i] = homeTeams[i].state;
    }

    for (let i = 0; i < homeTeams.length; i++){
      if (awayTeams[i].state == "Descanso"){
        matchState[i] = "Descanso";
      }

      var element = homeTeams[i].state;
      var duplicates = [];
      let index = matchState.map(find => find).indexOf(element);
      while (index !== -1){
        duplicates.push(index);
        index = matchState.map(find => find).indexOf(element, index + 1);
      }

      var textResult;
      let homeScore = 0;
      let awayScore = 0;
      if(matchState[i] != "Descanso"){
        homeScore = Math.floor(Math.random() * 6);
        awayScore = Math.floor(Math.random() * 6);
      }
      
      if (duplicates.length == 2 && matchState[i] == homeTeams[i].state){
        textResult = `${homeTeams[i].name} ${homeScore} x ${awayScore} ${awayTeams[i].name} - ${matchState[i]} - Rodada ${round} (Rodada dupla) <br>`
      }
      else if (duplicates.length > 2 && matchState[i] == homeTeams[i].state){
        textResult = `${homeTeams[i].name} ${homeScore} x ${awayScore} ${awayTeams[i].name} - ${matchState[i]} - Rodada ${round} (Rodada múltipla) <br>`
      }
      else {
        if(homeTeams[i].name == "BYE" || awayTeams[i].name == "BYE"){
          textResult = `${homeTeams[i].name} x ${awayTeams[i].name} - ${matchState[i]} - Rodada ${round} <br>`
        }
        else{
          textResult = `${homeTeams[i].name} ${homeScore} x ${awayScore} ${awayTeams[i].name} - ${matchState[i]} - Rodada ${round} <br>`
        }
      }

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
    }
    else{
      let hold = teams.pop();
      teams.push(teams.shift());
      teams.push(teams.shift());
      teams.unshift(hold);
    }
  }
}