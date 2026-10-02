const zoomTriggers = document.querySelectorAll('.wireframe-zoom');

if (zoomTriggers.length) {
	const dialog = document.createElement('dialog');
	dialog.className = 'wireframe-lightbox';
	dialog.setAttribute('aria-label', 'Enlarged wireframe image');
	dialog.innerHTML = `
		<div class="wireframe-lightbox-controls" aria-label="Image zoom controls">
			<button type="button" data-zoom-out aria-label="Zoom out">-</button>
			<output aria-live="polite">100%</output>
			<button type="button" data-zoom-in aria-label="Zoom in">+</button>
			<button type="button" data-zoom-fit>Fit</button>
			<button type="button" data-zoom-close aria-label="Close enlarged image">Close</button>
		</div>
		<div class="wireframe-lightbox-viewport"><img alt=""></div>
	`;
	document.body.append(dialog);

	const image = dialog.querySelector('.wireframe-lightbox-viewport img');
	const zoomLevel = dialog.querySelector('output');
	const zoomOut = dialog.querySelector('[data-zoom-out]');
	const zoomIn = dialog.querySelector('[data-zoom-in]');
	let scale = 1;

	function setScale(nextScale) {
		scale = Math.min(4, Math.max(1, nextScale));
		image.style.width = `${scale * 100}%`;
		zoomLevel.value = `${Math.round(scale * 100)}%`;
		zoomOut.disabled = scale === 1;
		zoomIn.disabled = scale === 4;
	}

	zoomTriggers.forEach((trigger) => {
		trigger.addEventListener('click', () => {
			const source = trigger.querySelector('img');
			image.src = source.currentSrc || source.src;
			image.alt = source.alt;
			setScale(1);
			dialog.showModal();
			dialog.querySelector('[data-zoom-close]').focus();
		});
	});

	zoomOut.addEventListener('click', () => setScale(scale - 0.5));
	zoomIn.addEventListener('click', () => setScale(scale + 0.5));
	dialog.querySelector('[data-zoom-fit]').addEventListener('click', () => setScale(1));
	dialog.querySelector('[data-zoom-close]').addEventListener('click', () => dialog.close());
	dialog.addEventListener('click', (event) => {
		if (event.target === dialog) dialog.close();
	});
	dialog.addEventListener('close', () => image.removeAttribute('src'));
}