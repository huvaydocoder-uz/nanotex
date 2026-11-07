// Pastga tushganda chiqadigan sariq tugmalar: telefon qilish va yuqoriga chiqish
(function () {
  var PHONE = '+998902997996';
  var SHOW_AFTER = 400; // px
  var labels = {
    uz: { call: 'Qo‘ng‘iroq qilish', top: 'Yuqoriga chiqish' },
    ru: { call: 'Позвонить', top: 'Наверх' },
    en: { call: 'Call us', top: 'Back to top' },
  };

  var call = document.createElement('a');
  call.className = 'nt-float nt-float--call';
  call.href = 'tel:' + PHONE;
  call.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';

  var top = document.createElement('button');
  top.type = 'button';
  top.className = 'nt-float nt-float--top';
  top.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>';
  top.addEventListener('click', function () {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });

  function setLabels() {
    var lang = (document.documentElement.lang || 'uz').slice(0, 2);
    var l = labels[lang] || labels.uz;
    call.setAttribute('aria-label', l.call);
    call.title = l.call;
    top.setAttribute('aria-label', l.top);
    top.title = l.top;
  }

  function update() {
    var show = window.scrollY > SHOW_AFTER;
    call.classList.toggle('is-visible', show);
    top.classList.toggle('is-visible', show);
    call.tabIndex = top.tabIndex = show ? 0 : -1;
  }

  function init() {
    document.body.appendChild(call);
    document.body.appendChild(top);
    setLabels();
    update();
    window.addEventListener('scroll', update, { passive: true });
    new MutationObserver(setLabels).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang'],
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
