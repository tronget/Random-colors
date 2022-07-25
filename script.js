let colors = document.querySelectorAll(".color span");
let bcgs = document.querySelectorAll(".background");
let generBtns = document.querySelectorAll(".generate");
let copyBtns = document.querySelectorAll(".color-copy svg");
const duplicateBtn = document.querySelector(".duplicate");
let cnt = -1;
// generate
function generateColor() {
	let randomColor = '';
	for (let i = 0; i < 3; i++) {
		let num = new Number;
		num += Math.round(Math.random() * 255);
		num = num.toString(16);
		if (num.length === 1) num += num; 	// Удваивание числа если оно однозначное
		randomColor += num;
	}
	randomColor = randomColor.toUpperCase();
	return randomColor;
}

function setColor(e) {
	let generColor = generateColor();
	let order = Number(e.target.dataset.order);
	bcgs[order].style.backgroundColor = `#${generColor}`;
	colors[order].textContent = generColor;
}

// copy
function copyColor(e) {
	navigator.clipboard.writeText(e.target.closest('.copy-wrapper').previousElementSibling.textContent);
	e.target.previousElementSibling.style.display = 'block';
	setTimeout(() => {e.target.previousElementSibling.style.display = 'none'}, 1200);
	console.log(e.target)
}

// initialize
function initialize() {
	let generColor = generateColor();
	bcgs[cnt].style.backgroundColor = `#${generColor}`
	colors[cnt].textContent = generColor;
};

// duplicate
duplicateBtn.addEventListener('click', duplicate);
function duplicate() {
	document.body.insertAdjacentHTML('beforeend', `<div class="background">
		<div class="wrapper">
			<div class="color-copy">
				<h2 class="color">#<span></span></h2>
				<div class="copy-wrapper">
					<p>Copied!</p>
					<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 36 36"><path fill="currentColor" d="M29.5 7h-19A1.5 1.5 0 0 0 9 8.5v24a1.5 1.5 0 0 0 1.5 1.5h19a1.5 1.5 0 0 0 1.5-1.5v-24A1.5 1.5 0 0 0 29.5 7ZM29 32H11V9h18Z" class="clr-i-outline clr-i-outline-path-1"/><path fill="currentColor" d="M26 3.5A1.5 1.5 0 0 0 24.5 2h-19A1.5 1.5 0 0 0 4 3.5v24A1.5 1.5 0 0 0 5.5 29H6V4h20Z" class="clr-i-outline clr-i-outline-path-2"/><path fill="none" d="M0 0h36v36H0z"/></svg>
				</div>
			</div>
			<button data-order="${++cnt}" class="btn generate">Generate!</button>
		</div>
	</div>`);
	colors = document.querySelectorAll(".color span");
	bcgs = document.querySelectorAll(".background");
	generBtns = document.querySelectorAll(".generate");
	copyBtns = document.querySelectorAll(".color-copy svg");
	generBtns.forEach(i => i.addEventListener('click', setColor));
	copyBtns.forEach(i => i.addEventListener('click', copyColor));
	initialize();
}

duplicate();