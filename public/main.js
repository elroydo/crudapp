const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

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
    .catch(error => console.error(error))
})

deleteButton.addEventListener('click', _ => {
    fetch('/countries', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            country: 'spain'
        })
    })
    .then(res => {
        if(res.ok) return res.json()
    })
    .then(response => {
        if(response === 'no more requested data to delete') {
            messageDiv.textContent = 'no more requested data to delete'
        }else{
            window.location.reload(true)
        }
    })
    .catch(error => console.error(error))
})