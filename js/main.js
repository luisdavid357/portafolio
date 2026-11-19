/* =========================================================================
   LUIS DAVID — PORTAFOLIO PROFESIONAL
   JavaScript compartido por todas las páginas.
   No necesitas tocar este archivo para personalizar el contenido.
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* Menú hamburguesa (móvil) */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // Cierra el menú al elegir una opción
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('is-open'));
    });
  }

  /* Aparición suave de elementos al hacer scroll */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => obs.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  document.querySelectorAll('.meta-card .field').forEach(field => {
    const label = field.querySelector('.k')?.textContent.trim();
    if (label !== 'Lugar') field.remove();
  });

  document.querySelectorAll('.session-media').forEach(gallery => {
    const images = [...gallery.querySelectorAll('img')];
    if (!images.length) return;

    const lightbox = document.createElement('div');
    const figure = document.createElement('div');
    const lightboxImage = document.createElement('img');
    const info = document.createElement('aside');
    const details = document.createElement('dl');
    const closeButton = document.createElement('button');
    const previousButton = document.createElement('button');
    const nextButton = document.createElement('button');
    const counter = document.createElement('span');
    let currentIndex = 0;

    lightbox.className = 'lightbox';
    lightbox.hidden = true;
    figure.className = 'lightbox-figure';
    lightboxImage.className = 'lightbox-image';
    lightboxImage.alt = '';
    info.className = 'lightbox-info';
    closeButton.className = 'lightbox-close';
    closeButton.type = 'button';
    closeButton.setAttribute('aria-label', 'Cerrar visor');
    closeButton.innerHTML = '&times;';
    previousButton.className = 'lightbox-control previous';
    previousButton.type = 'button';
    previousButton.setAttribute('aria-label', 'Fotografía anterior');
    previousButton.innerHTML = '&#8592;';
    nextButton.className = 'lightbox-control next';
    nextButton.type = 'button';
    nextButton.setAttribute('aria-label', 'Fotografía siguiente');
    nextButton.innerHTML = '&#8594;';
    counter.className = 'lightbox-counter';
    counter.setAttribute('aria-live', 'polite');

    const fields = [['Lugar', 'location']];
    fields.forEach(([label, key]) => {
      const term = document.createElement('dt');
      const description = document.createElement('dd');
      term.textContent = label;
      description.dataset.field = key;
      details.append(term, description);
    });

    figure.appendChild(lightboxImage);
    info.appendChild(details);
    lightbox.append(figure, info, closeButton, previousButton, nextButton, counter);
    document.body.appendChild(lightbox);

    const closeLightbox = () => {
      lightbox.hidden = true;
      document.body.style.overflow = '';
    };

    const showImage = index => {
      currentIndex = (index + images.length) % images.length;
      const image = images[currentIndex];
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
      counter.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(images.length).padStart(2, '0')}`;
      fields.forEach(([label, key]) => {
        const sessionField = [...gallery.closest('.session').querySelectorAll('.meta-card .field')]
          .find(field => field.querySelector('.k')?.textContent.trim() === label);
        details.querySelector(`[data-field="${key}"]`).textContent = sessionField?.querySelector('.v')?.textContent.trim() || '';
      });
    };

    images.forEach((image, index) => {
      image.addEventListener('click', () => {
        showImage(index);
        lightbox.hidden = false;
        document.body.style.overflow = 'hidden';
        closeButton.focus();
      });
    });
    closeButton.addEventListener('click', closeLightbox);
    previousButton.addEventListener('click', () => showImage(currentIndex - 1));
    nextButton.addEventListener('click', () => showImage(currentIndex + 1));
    lightbox.addEventListener('click', event => {
      if (event.target === lightbox) closeLightbox();
    });
    lightboxImage.addEventListener('click', event => event.stopPropagation());
    document.addEventListener('keydown', event => {
      if (lightbox.hidden) return;
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') showImage(currentIndex - 1);
      if (event.key === 'ArrowRight') showImage(currentIndex + 1);
    });
  });

});
