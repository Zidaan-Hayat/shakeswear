function getWord() {
	fetch('/api/swear')
		.then(async r => {
			console.log(r.status, r.statusText)

			const elem = document.getElementById("word");
			if (r.status == 429) {
				elem.innerText = 'You\'ve asked for too many phrases!'
				elem.className = 'red-text';
			} else if (r.status == 200) {
				const { word } = await r.json();
				elem.innerText = word;
				elem.className = '';
			}
		})
}

document.getElementById("generate-btn").addEventListener("click", () => {
	getWord();
});

document.getElementById("word-btn").addEventListener("click", () => {	
	const notifElem = document.getElementById("notif")
	notifElem.innerText = 'Copied!'
	notifElem.className = '';

	navigator.clipboard.writeText(document.getElementById("word").innerText);
});