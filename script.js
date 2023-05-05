var teams = []
var rounds = 0;
var halfTeams = 0;

function getTeams(){
  teams = []
  let teamsToSplit = document.querySelector("#textareaTeams").value;
  let teamsInfo = teamsToSplit.split("\n");
  let filteredTeams = teamsInfo.filter(elm => elm); 
  
  if (filteredTeams.length % 2 == 1){
      filteredTeams.push("BYE;Descanso");
  }

  rounds = (filteredTeams.length - 1) * 2;
  halfTeams = filteredTeams.length / 2;

  filteredTeams.map((info) => {
    if (info == "BYE;Descanso"){
      teams.push({
        name: info.split(";")[0],
        state: info.split(";")[1],
        points: null
      })
    }
    else{
       teams.push({
        name: info.split(";")[0],
        state: info.split(";")[1],
        points: 0
      })
    }
  })
    
  roundRobin();
}

function roundRobin(){

  for (let round = 1; round <= rounds; round++){
    const homeTeams = teams.slice(0,halfTeams);
    const awayTeams = teams.slice(halfTeams, teams.length).reverse();
    let matchState = [];

    for (let i = 0; i < homeTeams.length; i++){
      matchState[i] = homeTeams[i].state;
    }

    for (let i = 0; i < homeTeams.length; i++){
      if (awayTeams[i].state == "Descanso"){
        matchState[i] = "Descanso";
      }

      let element = homeTeams[i].state;
      let duplicates = [];
      let index = matchState.map(find => find).indexOf(element);
      while (index !== -1){
        duplicates.push(index);
        index = matchState.map(find => find).indexOf(element, index + 1);
      }

      let textResult;
      let homeScore = 0;
      let awayScore = 0;
      if(matchState[i] != "Descanso"){
        homeScore = Math.floor(Math.random() * 6);
        awayScore = Math.floor(Math.random() * 6);
          if (homeScore > awayScore){
            homeTeams[i].points += 3;
          }
          else if (homeScore < awayScore){
            awayTeams[i].points += 3;
          }
          else{
            homeTeams[i].points += 1;
            awayTeams[i].points += 1;
          }
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

      let print = document.querySelector("#standings");

      if(round == 1 && i == 0){
          print.innerHTML = "Jogos de Ida<br>";
      }
      if(round == (halfTeams * 2) && i == 0){
        print.insertAdjacentHTML('beforeend',"<br><br>Jogos de Returno <br>")
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

  pointsTable();
}

function pointsTable(){
  let tableResults = [];
  for (let i = 0; i < teams.length; i++){
    tableResults[i] = teams[i].points;
  }
  tableResults.sort(function(a,b){
    return a - b;
  });
  tableResults.reverse();

  let print = document.querySelector("#results");

  for (let i = 0; i < teams.length; i++){
      let scoreToFind = tableResults[i];
      let index = teams.map(find => find.points).indexOf(scoreToFind);
      let resultPrint;

      resultPrint = `${teams[index].name} - ${teams[index].points} pontos<br>`
      teams[index].points = null;

      if (i == 0){
        if (tableResults[0] == tableResults[1]){
          let secondTeam = teams.map(find => find.points).indexOf(scoreToFind);
          let x, y;
          x = Math.random();
          y = Math.random();
          if (x >= y){
            print.innerHTML = `O time vencedor é o ${teams[index].name}!<br>`;
          }
          else{
            print.innerHTML = `O time vencedor é o ${teams[secondTeam].name}!<br>`;
          }
          print.insertAdjacentHTML('beforeend', "(VENCEDOR DO SORTEIO DE DESEMPATE)<br><br>")
        }
        else{
          print.innerHTML = `O time vencedor é o ${teams[index].name}!<br><br>`;
        }
        print.insertAdjacentHTML('beforeend', "Resultados<br>")
      }

    if (scoreToFind != null){
      print.insertAdjacentHTML('beforeend', resultPrint);
    }
  }
}
