const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
    fetch('/name', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            forename: 'peter',
            surname: 'parker'
        })
    })
    .then(res => {
        if(res.ok) return res.json()
    })
    .then(response => {
        window.location.reload(true)
    })
})