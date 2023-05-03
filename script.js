var teams = []

function getTeams(){
  teams = []
  let teamsToSplit = document.querySelector("#textareaTeams").value;
  teamsInfo = teamsToSplit.split("\n");
  teamsInfo.map((info) => {
    if (info !== ''){
    teams.push({
      name: info.split(";")[0],
      state: info.split(";")[1]
    })
  }})
  console.log(teams)
}

