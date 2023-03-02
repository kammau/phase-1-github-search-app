document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("github-form");
    form.addEventListener("submit", function(event) {
        event.preventDefault()
        let search = event.search.value
        searcher(search)
    })
})

function searcher(search) {
    fetch(`https://api.github.com/search/users?q=${search}`, {
        method: "GET",
        header: {
            "Content-Type": "application/json",
            "Accept": "application/vnd.github.v3+json"
        },
        body: JSON.stringify()
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        document.getElementById("user-list").innerHTML = ""
        document.getElementById("repos-list").innerHTML = ""

        data.items.forEach(function (user) {
            let li = document.createElement("li")
            li.className = "all-users"
            li.innerHTML = `<div class='content'>
            <h3> User: ${user.login}</h3>
            <p> URL: ${user.html_url}</p>
            <div class ='repos'>
            <button class='repo-button' style='margin-bottom: 25px'>
            Repositories
            </button>
            </div>
            <img src=${user.avatar_url} />
        </div>`
            document.getElementById("user-list").appendChild(li)

            const repoBtn = document.getElementsByClassName("repo-button");
            repoBtn.addEventListener("click", function() {
                fetch(user.repos_url, {
                    method: "GET",
                    header: {
                        "Content-Type": "application/json",
                        "Accept": "application/vnd.github.v3+json"
                    },
                    body: JSON.stringify()
                })
                .then(function(response) {
                    return response.json()
                })
                .then(function(data) {
                    data.forEach(function(repo) {
                        let repoC = document.createElement("li")
                        repoC.innerHTML = `
                        <h4> ${repo.name} </h4>
                        <p> ${repo.html_url} </p>`;
                        document.getElementById("repos-list").appendChild(repoC)
                    })
                })
            })
        })
    })
}