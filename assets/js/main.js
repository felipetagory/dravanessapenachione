/* ==========================================================================
   DRA. VANESSA PENACHIONE - SCRIPTS PRINCIPAIS (MENU MOBILE E CARROSSEL)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  /* ------------------------------------------------------------------------
     1. MENU MOBILE
     ------------------------------------------------------------------------ */
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ------------------------------------------------------------------------
     2. CARROSSEL DE AVALIAÇÕES DO GOOGLE + BOTÃO "LEIA MAIS"
     ------------------------------------------------------------------------ */
  document.querySelectorAll('.reviews-carousel-wrapper').forEach((carousel) => {
    const track = carousel.querySelector('.reviews-track');
    const cards = Array.from(carousel.querySelectorAll('.review-card'));
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');

    if (!track || cards.length === 0) return;

    let currentIndex = 0;
    let autoplayTimer = null;

    function getVisibleCount() {
      if (window.innerWidth <= 767) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    }

    function updateCarousel() {
      const visible = getVisibleCount();
      const maxIndex = Math.max(0, cards.length - visible);
      if (currentIndex > maxIndex) currentIndex = 0;
      if (currentIndex < 0) currentIndex = maxIndex;

      const cardWidth = cards[0].getBoundingClientRect().width;
      const gap = 20;
      const offset = currentIndex * (cardWidth + gap);
      track.style.transform = `translateX(-${offset}px)`;
    }

    function nextSlide() {
      const visible = getVisibleCount();
      const maxIndex = Math.max(0, cards.length - visible);
      currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      updateCarousel();
    }

    function prevSlide() {
      const visible = getVisibleCount();
      const maxIndex = Math.max(0, cards.length - visible);
      currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
      updateCarousel();
    }

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    window.addEventListener('resize', updateCarousel);

    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(nextSlide, 6000);
    }

    function stopAutoplay() {
      if (autoplayTimer) clearInterval(autoplayTimer);
    }

    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    startAutoplay();

    // Botão "Leia mais / Esconder" em avaliações longas
    cards.forEach((card) => {
      const readMoreBtn = card.querySelector('.review-read-more');
      if (!readMoreBtn) return;

      readMoreBtn.addEventListener('click', () => {
        const expanded = card.classList.toggle('expanded');
        readMoreBtn.textContent = expanded ? 'Esconder' : 'Leia mais';
      });
    });
  });
});
