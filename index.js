const express = require("express");
const rateLimit = require("express-rate-limit");

const [arr1, arr2, arr3] = Object.assign([], require("./data.json"));

function getRandomInArr(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

const app = express();

const limiter = rateLimit({
	windowMs: 60 * 1000, // 1 minute
	max: 2,
	standardHeaders: true,
	legacyHeaders: false
});

// app.use('/api/', limiter);
app.use(express.json());
app.use(express.static('public', { extensions: ['html'] }))
app.use(express.urlencoded({ extended: true }));

app.get("/api/swear", (req, res) => {
	return res.send({ word: `${getRandomInArr(arr1)} ${getRandomInArr(arr2)} ${getRandomInArr(arr3)}` });
});

app.get("/favicon.ico", (req, res) => {
	return res.sendFile(__dirname + '/shakeswear.png');
})

app.listen(8080, () => console.log('Listening at http://localhost:8080'));