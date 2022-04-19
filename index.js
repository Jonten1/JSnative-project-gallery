async function f() {
	const response = await fetch('https://api.artic.edu/api/v1/artworks')
	const result = await response.json()

	for (i = 0; i < result.data.length; i++) {
		painting.push(result.data[i])
		element.innerHTML += `<div class=grid-template>
    <img src=
    "https://www.artic.edu/iiif/2/${result.data[i].image_id}/full/843,/0/default.jpg"
    alt="${result.data[i].title}">
    <div class=textigrid>
    ${result.data[i].title} </div>
    </div>`
	}
}
let element = document.querySelector('.grid-container')
f()

let painting = []
let searchBar = document.getElementById('searchBar')
searchBar.addEventListener('input', (e) => {
	let searchString = e.target.value.toLowerCase()
	let filteredTitle = painting.filter((painting) => {
		return painting.title.toLowerCase().includes(searchString)
	})
	displayPainting(filteredTitle)
})

const displayPainting = (painting) => {
	const htmlString = painting
		.map((painting) => {
			return `
              <div class=grid-template>
              <img src=
              "https://www.artic.edu/iiif/2/${painting.image_id}/full/843,/0/default.jpg" alt="">
              <div class=textigrid>
              ${painting.title} </div>
              </div>
        `
		})
		.join('')
	element.innerHTML = htmlString
}

function sub() {
	document.getElementById('felmeddelande').style.display = 'none'
	document.getElementById('tack').style.display = 'block'
}
let skicka = document.getElementById('send')
skicka.addEventListener('click', sub)
document.getElementById('felmeddelande').style.display = 'block'
skicka.disabled = true
document.getElementById('tack').style.display = 'none'
document.querySelector('#e-post').addEventListener('input', () => {
	if (document.querySelector('#e-post').value === '') {
		document.getElementById('felmeddelande').style.display = 'block'
		skicka.disabled = true
	} else {
		document.getElementById('felmeddelande').style.display = 'none'
		skicka.disabled = false
	}
})
