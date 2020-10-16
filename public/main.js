const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')

update.addEventListener('click', _ => {
    fetch('/countries', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            country: 'poland',
        })
    })
    .then(res => {
        if(res.ok) return res.json()
    })
    .then(response => {
        window.location.reload(true)
    })
})

deleteButton.addEventListener('click', _ => {
    fetch('/countries', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            country: 'korea'
        })
    })
    .then(res => {
        if(res.ok) return res.json()
    })
    .then(response => {
        window.location.reload(true)
    })
})