const slides = [...document.querySelectorAll('.slide')];
const progressCurrent = document.querySelector('.progress-current');
const progressFill = document.querySelector('.progress-bar i');
let activeIndex = 0;

function showSlide(index) {
	activeIndex = (index + slides.length) % slides.length;
	slides.forEach((slide, slideIndex) => {
		slide.classList.toggle('is-active', slideIndex === activeIndex);
	});
	progressCurrent.textContent = String(activeIndex + 1).padStart(2, '0');
	progressFill.style.width = `${((activeIndex + 1) / slides.length) * 100}%`;
	history.replaceState(null, '', `#${slides[activeIndex].id}`);
}

function move(direction) {
	showSlide(activeIndex + direction);
}

document.querySelectorAll('.next-button').forEach((button) => button.addEventListener('click', () => move(1)));
document.querySelector('.prev-button').addEventListener('click', () => move(-1));
document.querySelector('.wordmark').addEventListener('click', () => {
	showSlide(slides.findIndex((slide) => slide.id === 'home'));
});
document.querySelector('.top-link').addEventListener('click', () => {
	showSlide(slides.findIndex((slide) => slide.id === 'connect'));
});

document.addEventListener('keydown', (event) => {
	if (event.key === 'ArrowRight' || event.key === 'ArrowDown') move(1);
	if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') move(-1);
});

let touchStartX = 0;
document.addEventListener('touchstart', (event) => { touchStartX = event.changedTouches[0].screenX; }, { passive: true });
document.addEventListener('touchend', (event) => {
	const distance = event.changedTouches[0].screenX - touchStartX;
	if (Math.abs(distance) > 50) move(distance < 0 ? 1 : -1);
}, { passive: true });

const initialSlide = slides.findIndex((slide) => slide.id === window.location.hash.slice(1));
showSlide(initialSlide >= 0 ? initialSlide : 0);

