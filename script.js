var teams = []
var rounds;
var half;

function getTeams(){
  teams = []
  let teamsToSplit = document.querySelector("#textareaTeams").value;
  teamsInfo = teamsToSplit.split("\n");
    if (teamsInfo.length % 2 == 1){
      teamsInfo.push("BYE;Descanso");
    }
  rounds = teamsInfo.length - 1;
  half = teamsInfo.length / 2;
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
  console.log(teams)
}

