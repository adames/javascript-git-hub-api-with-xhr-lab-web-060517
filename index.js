//this adds listener to form
document.getElementById("username").addEventListener('submit', getRepositories);

function getRepositories() {
  event.preventDefault();
  const username = event.target.username.value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

function getCommits(el){
  event.preventDefault();
  let repo = el.dataset.repo
  let req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${username.value}/${repo}/commits`)
  req.send()
}

function getBranches(el){
  event.preventDefault();
  let repo = el.dataset.repo
  let req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", `https://api.github.com/repos/${username.value}/${repo}/branches`)
  req.send()
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  //repos to lis below
  let repoList = "<ul>"
  repoList += repos.map(function(r){
    let repoLink = '<li>' + '<a href=' + r.html_url + '>' + r.name + '</a>' + '</li>'
    let showCommitsLink = `- <a href=# data-repo="${r.name}" onclick="getCommits(this)">Show Commits</a>`
    let showBranchesLink = `- <a href=# data-repo="${r.name}" onclick="getBranches(this)">Show Branches</a>`
    return repoLink + showCommitsLink + showBranchesLink
  }).join(' ')
  repoList += "</ul>"

  document.getElementById("repositories").innerHTML = repoList
}

function displayCommits(){
  let commits = JSON.parse(this.responseText)
  let htmlCommits = commits.map(function(commit){
    let fullName = commit.commit.author.name
    let gitName = commit.committer.login
    let commitMessage = commit.commit.message
    return `<li>${fullName} - ${gitName} - ${commitMessage}</li>`
  }).join(' ')
  htmlCommits = `<ul>${htmlCommits}</ul>`

  document.getElementById("details").innerHTML = htmlCommits
}

function displayBranches(){
  let branches = JSON.parse(this.responseText)
  let htmlBranches = branches.map(function(branch){
    //The API doesn't provide full name anymore
    return `<li>${branch.name}</li>`
  }).join(' ')
  htmlbranches = `<ul>${htmlBranches}</ul>`

  document.getElementById("details").innerHTML = htmlBranches
}
