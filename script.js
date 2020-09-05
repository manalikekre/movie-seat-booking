const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();
var ticketPrice = parseInt(movieSelect.value);
updateSelectedCount();

//get data from localstorage and populate UI
function populateUI() {
	//set selected seats
	const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
	if (selectedSeats !== null && selectedSeats.length > 0) {
		seats.forEach((seat, index) => {
			if (selectedSeats.indexOf(index) > -1) {
				seat.classList.add('selected');
			}
		});
	}

	//set selected movie
	const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
	if (selectedMovieIndex !== null) {
		movieSelect.selectedIndex = selectedMovieIndex;
	}
}

//seat click event listener
container.addEventListener('click', (event) => {
	let target = event.target;
	if (
		target.classList.contains('seat') &&
		!target.classList.contains('occupied')
	) {
		target.classList.toggle('selected');
		updateSelectedCount();
	}
});

//update total and count
function updateSelectedCount() {
	const selectedSeats = document.querySelectorAll('.row .seat.selected');
	const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
	localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
	count.innerText = selectedSeats.length;
	total.innerHTML = selectedSeats.length * ticketPrice;
}

//movie select event
movieSelect.addEventListener('change', (event) => {
	ticketPrice = parseInt(event.target.value);
	setMovieData(event.target.selectedIndex, event.target.value);
	updateSelectedCount();
});

//save selecetd movie index and price
function setMovieData(movieIdx, moviePrice) {
	localStorage.setItem('selectedMovieIndex', movieIdx);
	localStorage.setItem('selectedMoviePrice', moviePrice);
}
