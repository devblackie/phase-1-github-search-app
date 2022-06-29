function searchGithub(user) {
    fetch(`https://api.github.com/search/users?q=${user}`, {
        method: 'GET',
        headers: { 'Accept': 'application/vnd.github.v3+json' }
    })
    .then(res => res.json())
    .then(json => json.items.forEach(displaySearch))
}

document.querySelector('#github-form').addEventListener('submit', (e) => {
    e.preventDefault()

    searchGithub(e.target.search.value)
})

function displaySearch(individual) {
    const ul=document.querySelector('#user-list')
    const div=document.createElement('div')
    const avatar=document.createElement('img')
    const individualName=document.createElement('h2')
    const link=document.createElement('a')
    let linkText=document.createTextNode('Github Link')
    


    avatar.src = individual.avatar_url
    individualName.textContent = individual.login
    link.href = individual.html_url
    
    div.append(avatar, individualName)
    link.append(linkText)
    ul.append(div, link)

    div.addEventListener('click', () => {
        fetchRepos(individual.login)
    })
}

function fetchRepos(user) {
    fetch(`https://api.github.com/users/${user}/repos`, {
        method: 'GET',
        headers: { 'Accept': 'application/vnd.github.v3+json' }
    })
    .then(res => res.json())
    .then(json => json.forEach(displayRepos))
}

function displayRepos(repo) {
    let ul= document.querySelector('#repos-list')
    let individualName = document.createElement('h2')

    individualName.textContent = repo.name

    ul.append(individualName)
}
