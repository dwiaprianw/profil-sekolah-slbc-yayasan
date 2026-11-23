(function () {
  'use strict';

  const FACILITIES = [
    { name: 'Ruang Kelas', qty: '6 ruang', category: 'pembelajaran' },
    { name: 'Ruang Bina Diri', qty: '1 ruang', category: 'pembelajaran' },
    { name: 'Ruang Tata Boga', qty: '1 ruang', category: 'pembelajaran' },
    { name: 'Ruang Keterampilan', qty: '1 ruang', category: 'pembelajaran' },
    { name: 'Ruang IT', qty: '1 ruang', category: 'pembelajaran' },
    { name: 'Ruang Perpustakaan', qty: '1 ruang', category: 'pembelajaran' },
    { name: 'Ruang BK', qty: '1 ruang', category: 'pembelajaran' },
    { name: 'Aula', qty: '1 ruang', category: 'pembelajaran' },
    { name: 'Lapangan Bocce', qty: '1 lapangan', category: 'olahraga' },
    { name: 'Lapangan Basket', qty: '1 lapangan', category: 'olahraga' },
    { name: 'Lapangan Upacara', qty: '1 lapangan', category: 'olahraga' },
    { name: 'Taman', qty: '2 area', category: 'olahraga' },
    { name: 'Mushola', qty: '1 ruang', category: 'penunjang' },
    { name: 'Ruang UKS', qty: '1 ruang', category: 'penunjang' },
    { name: 'Ruang Tunggu Wali Murid', qty: '1 ruang', category: 'penunjang' },
    { name: 'Ruang Kepala Sekolah', qty: '1 ruang', category: 'penunjang' },
    { name: 'Ruang Guru', qty: '1 ruang', category: 'penunjang' },
    { name: 'Ruang TU', qty: '1 ruang', category: 'penunjang' },
    { name: 'Ruang Tamu', qty: '1 ruang', category: 'penunjang' },
    { name: 'Lapangan Parkir', qty: '1 area', category: 'penunjang' },
    { name: 'Toilet Kepala Sekolah', qty: '1 ruang', category: 'penunjang' },
    { name: 'Toilet Guru', qty: '2 ruang', category: 'penunjang' },
    { name: 'Toilet Murid Laki-laki', qty: '1 ruang', category: 'penunjang' },
    { name: 'Toilet Murid Perempuan', qty: '1 ruang', category: 'penunjang' },
    { name: 'Toilet Tamu', qty: '1 ruang', category: 'penunjang' },
    { name: 'Gudang', qty: '4 ruang', category: 'penunjang' }
  ];

  // Mobile navigation drawer
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  function setDrawerOpen(open) {
    if (!menuToggle || !mobileDrawer) return;
    menuToggle.setAttribute('aria-expanded', String(open));
    mobileDrawer.hidden = !open;
  }

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', function () {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      setDrawerOpen(!isOpen);
    });

    mobileDrawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setDrawerOpen(false);
      });
    });
  }

  // Accessible modals
  let activeModal = null;
  let lastTrigger = null;

  function openModal(modalId, triggerEl) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    lastTrigger = triggerEl || document.activeElement;
    activeModal = modal;
    modal.hidden = false;
    document.body.classList.add('modal-open');

    const closeBtn = modal.querySelector('[data-close-modal]');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    if (!activeModal) return;
    activeModal.hidden = true;
    document.body.classList.remove('modal-open');
    activeModal = null;
    if (lastTrigger && typeof lastTrigger.focus === 'function') {
      lastTrigger.focus();
    }
    lastTrigger = null;
  }

  document.querySelectorAll('[data-open-modal]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openModal(btn.getAttribute('data-open-modal'), btn);
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach(function (btn) {
    btn.addEventListener('click', closeModal);
  });

  document.querySelectorAll('.modal-backdrop').forEach(function (backdrop) {
    backdrop.addEventListener('click', function (event) {
      if (event.target === backdrop) {
        closeModal();
      }
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      if (activeModal) {
        closeModal();
      } else if (mobileDrawer && !mobileDrawer.hidden) {
        setDrawerOpen(false);
        if (menuToggle) menuToggle.focus();
      }
    }
  });

  // Jenjang tabs with keyboard navigation
  const tabButtons = Array.from(document.querySelectorAll('[role="tab"]'));
  const tabPanels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

  function activateTab(selectedBtn) {
    tabButtons.forEach(function (btn) {
      const isSelected = btn === selectedBtn;
      btn.classList.toggle('is-active', isSelected);
      btn.setAttribute('aria-selected', String(isSelected));
      btn.setAttribute('tabindex', isSelected ? '0' : '-1');
    });

    const targetId = selectedBtn.getAttribute('aria-controls');
    tabPanels.forEach(function (panel) {
      panel.hidden = panel.id !== targetId;
    });
  }

  tabButtons.forEach(function (btn, index) {
    btn.addEventListener('click', function () {
      activateTab(btn);
    });

    btn.addEventListener('keydown', function (event) {
      let nextIndex = null;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabButtons.length;
      if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabButtons.length) % tabButtons.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabButtons.length - 1;

      if (nextIndex !== null) {
        event.preventDefault();
        activateTab(tabButtons[nextIndex]);
        tabButtons[nextIndex].focus();
      }
    });
  });

  // Facilities directory inside modal
  const facilityList = document.getElementById('facility-list');
  const facilityStatus = document.getElementById('facility-status');
  const facilityEmpty = document.getElementById('facility-empty');
  const facilitySearch = document.getElementById('facility-search');
  const facilityReset = document.getElementById('facility-reset');
  const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));

  let activeCategory = 'semua';
  let searchQuery = '';

  function renderFacilities() {
    if (!facilityList || !facilityStatus || !facilityEmpty) return;

    const normalized = searchQuery.trim().toLowerCase();
    const filtered = FACILITIES.filter(function (item) {
      const matchesCat = activeCategory === 'semua' || item.category === activeCategory;
      const matchesText = normalized === '' || item.name.toLowerCase().includes(normalized);
      return matchesCat && matchesText;
    });

    facilityList.innerHTML = '';

    if (filtered.length === 0) {
      facilityList.hidden = true;
      facilityEmpty.hidden = false;
      facilityStatus.textContent = 'Menampilkan 0 dari 26 sarana dan prasarana.';
      return;
    }

    facilityList.hidden = false;
    facilityEmpty.hidden = true;
    facilityStatus.textContent =
      'Menampilkan ' + filtered.length + ' dari ' + FACILITIES.length + ' sarana dan prasarana.';

    const fragment = document.createDocumentFragment();
    filtered.forEach(function (item) {
      const li = document.createElement('li');
      li.className = 'facility-row';

      const nameSpan = document.createElement('span');
      nameSpan.textContent = item.name;

      const qtySpan = document.createElement('span');
      qtySpan.className = 'facility-qty';
      qtySpan.textContent = item.qty;

      li.appendChild(nameSpan);
      li.appendChild(qtySpan);
      fragment.appendChild(li);
    });

    facilityList.appendChild(fragment);
  }

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      activeCategory = btn.dataset.filter || 'semua';
      filterButtons.forEach(function (other) {
        const isSelected = other === btn;
        other.classList.toggle('is-active', isSelected);
        other.setAttribute('aria-pressed', String(isSelected));
      });
      renderFacilities();
    });
  });

  if (facilitySearch) {
    facilitySearch.addEventListener('input', function (event) {
      searchQuery = event.target.value;
      renderFacilities();
    });
  }

  if (facilityReset) {
    facilityReset.addEventListener('click', function () {
      activeCategory = 'semua';
      searchQuery = '';
      if (facilitySearch) facilitySearch.value = '';
      filterButtons.forEach(function (btn) {
        const isAll = btn.dataset.filter === 'semua';
        btn.classList.toggle('is-active', isAll);
        btn.setAttribute('aria-pressed', String(isAll));
      });
      renderFacilities();
      if (facilitySearch) facilitySearch.focus();
    });
  }

  renderFacilities();

  // Consultation form -> WhatsApp composer
  const contactForm = document.getElementById('contact-form');
  const parentNameInput = document.getElementById('parent-name');
  const inquiryLevelSelect = document.getElementById('inquiry-level');
  const inquiryMessageInput = document.getElementById('inquiry-message');
  const formFeedback = document.getElementById('form-feedback');
  const waFallbackLink = document.getElementById('wa-fallback-link');

  function setFieldError(inputEl, errorElId, message) {
    const errorEl = document.getElementById(errorElId);
    if (!inputEl || !errorEl) return;
    if (message) {
      inputEl.setAttribute('aria-invalid', 'true');
      errorEl.textContent = message;
      errorEl.hidden = false;
    } else {
      inputEl.removeAttribute('aria-invalid');
      errorEl.textContent = '';
      errorEl.hidden = true;
    }
  }

  if (contactForm && parentNameInput && inquiryLevelSelect && inquiryMessageInput) {
    [
      { el: parentNameInput, errId: 'error-parent-name' },
      { el: inquiryLevelSelect, errId: 'error-inquiry-level' },
      { el: inquiryMessageInput, errId: 'error-inquiry-message' }
    ].forEach(function (field) {
      field.el.addEventListener('input', function () {
        if (field.el.getAttribute('aria-invalid') === 'true') {
          setFieldError(field.el, field.errId, '');
        }
      });
    });

    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const nameVal = parentNameInput.value.trim();
      const levelVal = inquiryLevelSelect.value.trim();
      const msgVal = inquiryMessageInput.value.trim();

      let firstInvalid = null;

      if (!nameVal) {
        setFieldError(parentNameInput, 'error-parent-name', 'Mohon isi nama Anda terlebih dahulu.');
        firstInvalid = firstInvalid || parentNameInput;
      } else {
        setFieldError(parentNameInput, 'error-parent-name', '');
      }

      if (!levelVal) {
        setFieldError(inquiryLevelSelect, 'error-inquiry-level', 'Mohon pilih jenjang atau keperluan.');
        firstInvalid = firstInvalid || inquiryLevelSelect;
      } else {
        setFieldError(inquiryLevelSelect, 'error-inquiry-level', '');
      }

      if (msgVal.length < 10) {
        setFieldError(inquiryMessageInput, 'error-inquiry-message', 'Mohon tuliskan pertanyaan minimal 10 karakter.');
        firstInvalid = firstInvalid || inquiryMessageInput;
      } else {
        setFieldError(inquiryMessageInput, 'error-inquiry-message', '');
      }

      if (firstInvalid) {
        if (formFeedback) formFeedback.hidden = true;
        firstInvalid.focus();
        return;
      }

      const composedText =
        'Halo Ibu Kepala Sekolah SLB-C Yayasan 88 Palembang.\n' +
        'Nama: ' + nameVal + '\n' +
        'Keperluan / Jenjang: ' + levelVal + '\n' +
        'Pesan: ' + msgVal;

      const waUrl = 'https://wa.me/6281271148696?text=' + encodeURIComponent(composedText);

      if (waFallbackLink) waFallbackLink.href = waUrl;
      if (formFeedback) formFeedback.hidden = false;

      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // Purposeful scroll reveal
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealElements = Array.from(document.querySelectorAll('.reveal'));

  if (!prefersReducedMotion && 'IntersectionObserver' in window && revealElements.length > 0) {
    document.documentElement.classList.add('js-enabled');

    const observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: '0px 0px 60px 0px' }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }
})();
