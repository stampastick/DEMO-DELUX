/* ==========================================================================
   Demo Delux — JavaScript refactorizado
   Responsabilidad: datos, renderizado seguro, validación, servicios e interfaz.
   ========================================================================== */

(() => {
  'use strict';

  const MAX_COMPANIONS = 5;
  const MILLISECONDS = { second: 1000, minute: 60_000, hour: 3_600_000, day: 86_400_000 };

  const WEDDING = Object.freeze({
    bride: 'Julieta',
    groom: 'Romeo',
    initials: 'J&R',
    initialsNav: 'J & R',
    sealImage: 'https://i.postimg.cc/g2Bcb52b/Sello-JR.png',
    heroImage: 'https://lh3.googleusercontent.com/pw/AP1GczMZcC26cEwXnSwNGVS2U3D9G3bJBs7TigFZ88SDfJIsG2IzO-0SN0tYzau46jsrmx4LRoIMWkdgYbGub81Fq3X5r0hU_8b-VLyPG_F7Fc6534LHpts=w2400',
    storyImage: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=1000',
    storyParagraphs: [
      'Una propuesta, un sí y una decisión que tomamos juntos. Nuestro amor ha crecido, ha madurado y florecido; a veces sencillo, otras caótico, pero siempre maravilloso.',
      'Somos aventureros, dedicados y fuertes de carácter. Los desafíos que hemos enfrentado nos han ayudado a crecer y madurar.',
      'Hoy sentimos nuestra vida completa y estamos listos para compartir esta nueva etapa con las personas que más queremos.'
    ],
    dateIso: '2026-10-15T17:00:00',
    longDate: '15 de Octubre de 2026',
    shortDate: '15 · Octubre · 2026',
    rsvpDeadline: '01 de Septiembre de 2026',
    ceremonyTime: '17:00',
    receptionTime: '19:30',
    city: 'Mazatlán, Sinaloa, México',
    appsScriptUrl: 'https://script.google.com/macros/s/AKfycbxuhvbQA3dFjMfrnKF04faQ4ZhSpApdXCFHrf1191sXVFe9nLDjRyv_p9WwlO3d9hh6gA/exec',
    musicUrl: 'https://videotourl.com/audio/1778372091234-bcb21a46-e421-471b-9563-b7e7ff8508e1.opus',
    musicVolume: 0.35,
    locations: [
      {
        type: 'Ceremonia',
        name: 'Catedral Basílica de la Inmaculada Concepción',
        address: '21 de Marzo, Centro, 82000',
        city: 'Mazatlán, Sinaloa, México',
        time: '17:00',
        image: 'https://descubreenmexico.com/wp-content/uploads/2022/04/Immaculate-Conception-Cathedral.jpg',
        mapUrl: 'https://maps.app.goo.gl/BYQWKHfKTuGLZtaq6'
      },
      {
        type: 'Recepción',
        name: 'La Casona De La Machado',
        address: 'Sixto Osuna 19, Centro, 82000',
        city: 'Mazatlán, Sinaloa, México',
        time: '19:30',
        image: 'https://cdn0.bodas.com.mx/vendor/3749/3_2/960/jpg/decoracion-para-eventos.jpeg',
        mapUrl: 'https://maps.app.goo.gl/RdF1jii8E3kM9dai7'
      }
    ],
    timeline: [
      { time: '17:00', title: 'Ceremonia Religiosa', description: 'Daremos el “sí, acepto” frente a nuestros seres queridos.', icon: 'fa-solid fa-church' },
      { time: '18:30', title: 'Cóctel al Atardecer', description: 'Recibe nuestro abrazo con un cóctel de bienvenida.', icon: 'fa-solid fa-champagne-glasses' },
      { time: '20:00', title: 'Gran Banquete', description: 'Cena de gala con los mejores sabores para celebrar esta noche.', icon: 'fa-solid fa-utensils' },
      { time: '22:00', title: '¡A Bailar!', description: 'Que empiece la fiesta con el mejor ambiente.', icon: 'fa-solid fa-music' },
      { time: '02:00', title: 'Fin de Fiesta', description: 'Gracias por compartir este momento con nosotros.', icon: 'fa-solid fa-moon' }
    ],
    dressCode: [
      {
        type: 'Damas',
        title: 'Vestido Largo',
        text: 'Colores elegantes. Evitar blanco, beige o marfil.',
        image: 'https://i.postimg.cc/4dnLfb3M/Dress-Code-Dama.png',
        url: 'https://www.pinterest.com.mx/search/pins/?q=vestidos%20largos%20elegantes%20boda%20noche',
        icon: 'fa-brands fa-pinterest'
      },
      {
        type: 'Caballeros',
        title: 'Traje Formal',
        text: 'Traje completo oscuro con corbata o moño.',
        image: 'https://i.postimg.cc/SsjTS7sb/Dress-Code-Caballero.png',
        url: 'https://www.pinterest.com.mx/search/pins/?q=traje%20formal%20hombre%20boda%20noche',
        icon: 'fa-brands fa-pinterest'
      }
    ],
    hotels: [
      {
        badge: 'Sugerencia',
        title: 'Pueblo Bonito Emerald Bay',
        text: 'Av. Ernesto Coppel Campaña 201, Nueva Cerritos, Mazatlán, Sin.',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
        url: 'https://www.pueblobonito.com.mx/resorts/emerald-bay'
      },
      {
        badge: 'Opción B',
        title: 'Hotel El Cid Castilla',
        text: 'Av. Camarón Sábalo S/N, Zona Dorada, Mazatlán, Sin.',
        image: 'https://ba8a95d4aa7b000bdb27-a4e6f9e1710496f0fd0180f011e6f4e2.ssl.cf1.rackcdn.com/u/general-resort-photos/Moro-Pool-1.jpg',
        url: 'https://www.elcid.com/es/mazatlan/el-cid-castilla-beach-hotel/'
      }
    ],
    registry: [
      { name: 'Liverpool', event: '50592260', url: 'https://mesaderegalos.liverpool.com.mx/eventodebusqueda', logo: 'https://gcp-na-images.contentstack.com/v3/assets/blt339516d00dd80f86/blt85188d18944bdde1/6761fdbd1f8efa7e864e1129/liverpool-primary.svg?branch=release1510' },
      { name: 'Sears', event: '50592260', url: 'https://www.sears.com.mx/Mesa-de-Regalos/buscar-evento', logo: 'https://www.sears.com.mx/img/logo-sears.svg' },
      { name: 'Amazon', event: '50592260', url: 'https://www.amazon.com.mx/wedding', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' }
    ],
    bank: {
      Banco: 'BBVA',
      Titular: 'Isabella Gómez',
      Cuenta: '1234 5678 9012',
      CLABE: '012 345 678 901 234 56'
    },
    gallery: [
      'https://lh3.googleusercontent.com/pw/AP1GczPVX5Nye_q_jhzdyFtpMYaNUpaoxnYP37WnK8-QfHlx-TIP0RYFJgIb65em0Mj4TtTDvkIAuKOYXGgQHceINxVm-p6GGvdtg4-gABztnpsqghAW_Xk=w2400',
      'https://lh3.googleusercontent.com/pw/AP1GczN9VWaUVsYr7BLn46PmeuIxbC1QOvvMiYxdOgEwCLp2R0Ixo24Qhk9bVqt8Wnl2BexGJgTs1TCIsZKMPK3nSDWjDauqKYe7dAWfUGT6DVlZTbwuHEQ=w2400',
      'https://lh3.googleusercontent.com/pw/AP1GczM4vMc4Pl_LGlCD515dHLD9qgSSI-6INYjc51kfbpvqXPWtdm3I1pxSGvsjKHTNWZze7kSB0EM_7-iNtIertWOoKmiM8VeI5K5HWF9u9yw5csL3bz4=w2400',
      'https://lh3.googleusercontent.com/pw/AP1GczN2e6UxW39oLhIBC1iB52t9REiFxLynuxr9LsVu9euxR07MsdXV90joi0nmcPp3buKscr1EQkD6yZWmWRC6RMxf2jXVaK5cVZM0jrClV2GS04iWLRY=w2400',
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800',
      'https://lh3.googleusercontent.com/pw/AP1GczMmqQI8eKeii5GuxDan4HzKGgfV0-iDXJ-pxKmU6F1f32lcWUP0Y_t3CajxCz9rcscO2TXn2rbDpIEM97tW9GGaienNOVvjHAi3sFfa9b9Fw4oUJv4=w2400'
    ]
  });

  const state = { lightboxIndex: 0, companionCount: 0, countdownTimer: null };

  const selectors = {
    envelope: '#envelope-screen',
    header: '#site-header',
    main: '#main-content',
    navLinks: '#nav-links',
    navToggle: '.nav-toggle',
    music: '#bg-music',
    musicButton: '#music-toggle',
    musicIcon: '#music-icon',
    rsvpModal: '#rsvp-modal',
    rsvpFormContainer: '#rsvp-form-container',
    rsvpSuccess: '#rsvp-success',
    lightbox: '#lightbox',
    lightboxImg: '#lightbox-img'
  };

  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

  const isSafeHttpUrl = (value) => {
    try {
      const url = new URL(value, window.location.origin);
      return ['http:', 'https:'].includes(url.protocol);
    } catch {
      return false;
    }
  };

  const normalizeText = (value, maxLength = 500) => String(value ?? '')
    .normalize('NFKC')
    .replace(/[<>]/g, '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);

  const setText = (element, value) => {
    if (element) element.textContent = normalizeText(value, 1_000);
  };

  const setSafeLink = (element, url) => {
    if (!element || !isSafeHttpUrl(url)) return;
    element.href = url;
    element.rel = 'noopener noreferrer';
    element.target = '_blank';
  };

  const setSafeImage = (element, url, alt) => {
    if (!element || !isSafeHttpUrl(url)) return;
    element.src = url;
    element.alt = normalizeText(alt, 120);
  };

  const createElement = (tagName, className, text) => {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (text !== undefined) setText(element, text);
    return element;
  };

  const formatCalendarDate = (date) => {
    const pad = (number) => String(number).padStart(2, '0');
    return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`;
  };

  const getCalendarRange = () => {
    const startDate = new Date(WEDDING.dateIso);
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 10);
    return { start: formatCalendarDate(startDate), end: formatCalendarDate(endDate) };
  };

  const renderStaticText = () => {
    const dictionary = {
      coupleNames: `${WEDDING.bride} & ${WEDDING.groom}`,
      initials: WEDDING.initials,
      initialsNav: WEDDING.initialsNav,
      longDate: WEDDING.longDate,
      rsvpDeadline: WEDDING.rsvpDeadline
    };

    $$('[data-text]').forEach((node) => setText(node, dictionary[node.dataset.text] ?? ''));
    setText($('#wedding-hashtag'), `#${WEDDING.bride.replace(/\s+/g, '')}Y${WEDDING.groom.replace(/\s+/g, '')}`);
  };

  const renderImagesAndMedia = () => {
    document.documentElement.style.setProperty('--hero-image', `url('${WEDDING.heroImage}')`);
    document.documentElement.style.setProperty('--save-date-image', `url('${WEDDING.heroImage}')`);
    setSafeImage($('#wax-seal-img'), WEDDING.sealImage, `Sello de ${WEDDING.initials}`);
    setSafeImage($('#story-img'), WEDDING.storyImage, 'Historia de la pareja');

    const audio = $(selectors.music);
    if (audio && isSafeHttpUrl(WEDDING.musicUrl)) {
      audio.src = WEDDING.musicUrl;
      audio.volume = Number.isFinite(WEDDING.musicVolume) ? Math.min(Math.max(WEDDING.musicVolume, 0), 1) : 0.35;
    }
  };

  const renderStory = () => {
    const container = $('#story-text');
    if (!container) return;
    container.replaceChildren(...WEDDING.storyParagraphs.map((paragraph) => createElement('p', '', paragraph)));
  };

  const renderCard = ({ badge, title, text, image, url, actionLabel = 'Ver más', icon = 'fa-solid fa-arrow-up-right-from-square', tall = false }) => {
    const article = createElement('article', 'card');
    const figure = createElement('figure', `card-media${tall ? ' is-tall' : ''}`);
    const badgeElement = createElement('span', 'card-badge', badge);
    const imageElement = createElement('img');
    setSafeImage(imageElement, image, title);
    imageElement.loading = 'lazy';
    figure.append(badgeElement, imageElement);

    const body = createElement('div', 'card-body');
    body.append(createElement('h3', 'card-title', title), createElement('p', 'card-text', text));

    if (url) {
      const link = createElement('a', 'btn btn-primary');
      setSafeLink(link, url);
      const iconElement = createElement('i', icon);
      iconElement.setAttribute('aria-hidden', 'true');
      link.append(iconElement, document.createTextNode(` ${actionLabel}`));
      body.append(link);
    }

    article.append(figure, body);
    return article;
  };

  const renderLocations = () => {
    const grid = $('#locations-grid');
    if (!grid) return;
    const cards = WEDDING.locations.map((location) => {
      const article = createElement('article', 'card');
      const figure = createElement('figure', 'card-media');
      const image = createElement('img');
      image.loading = 'lazy';
      setSafeImage(image, location.image, location.name);
      figure.append(createElement('span', 'card-badge', location.type), image);

      const body = createElement('div', 'card-body');
      body.append(
        createElement('h3', 'card-title', location.name),
        createElement('p', 'card-text', `${location.address}. ${location.city}.`),
        createElement('p', 'card-meta', `${WEDDING.shortDate} | ${location.time} Hrs`)
      );
      const link = createElement('a', 'btn btn-primary');
      setSafeLink(link, location.mapUrl);
      link.append(createElement('i', 'fa-solid fa-location-dot'), document.createTextNode(' Maps'));
      body.append(link);
      article.append(figure, body);
      return article;
    });
    grid.replaceChildren(...cards);
  };

  const renderTimeline = () => {
    const timeline = $('#timeline');
    if (!timeline) return;
    const items = WEDDING.timeline.map((item) => {
      const row = createElement('article', 'timeline-item');
      const iconWrap = createElement('div', 'timeline-icon');
      const icon = createElement('i', item.icon);
      icon.setAttribute('aria-hidden', 'true');
      iconWrap.append(icon);
      const copy = createElement('div', 'timeline-copy');
      copy.append(
        createElement('span', 'timeline-time', item.time),
        createElement('h3', 'timeline-title', item.title),
        createElement('p', 'timeline-description', item.description)
      );
      row.append(iconWrap, copy);
      return row;
    });
    timeline.replaceChildren(...items);
  };

  const renderDressCode = () => {
    const grid = $('#dresscode-grid');
    if (!grid) return;
    const cards = WEDDING.dressCode.map((item) => renderCard({
      badge: item.type,
      title: item.title,
      text: item.text,
      image: item.image,
      url: item.url,
      actionLabel: 'Inspiración',
      icon: item.icon,
      tall: true
    }));
    grid.replaceChildren(...cards);
  };

  const renderHotels = () => {
    const grid = $('#hotels-grid');
    if (!grid) return;
    const cards = WEDDING.hotels.map((hotel) => renderCard({ ...hotel, actionLabel: 'Reservar', icon: 'fa-solid fa-bell-concierge' }));
    grid.replaceChildren(...cards);
  };

  const renderGallery = () => {
    const grid = $('#gallery-grid');
    if (!grid) return;
    const buttons = WEDDING.gallery.filter(isSafeHttpUrl).map((url, index) => {
      const button = createElement('button', 'gallery-button');
      button.type = 'button';
      button.dataset.action = 'open-lightbox';
      button.dataset.index = String(index);
      button.setAttribute('aria-label', `Abrir foto ${index + 1}`);
      const image = createElement('img');
      image.loading = 'lazy';
      setSafeImage(image, url, `Foto ${index + 1} de la galería`);
      button.append(image);
      return button;
    });
    grid.replaceChildren(...buttons);
  };

  const renderRegistry = () => {
    const track = $('#registry-track');
    if (!track) return;
    const duplicatedRegistry = [...WEDDING.registry, ...WEDDING.registry];
    const cards = duplicatedRegistry.map((item) => {
      const link = createElement('a', 'registry-card');
      setSafeLink(link, item.url);
      const logo = createElement('img');
      logo.loading = 'lazy';
      setSafeImage(logo, item.logo, `Logo de ${item.name}`);
      link.append(logo, createElement('span', '', `Evento ${item.event}`));
      return link;
    });
    track.replaceChildren(...cards);
  };

  const renderBankDetails = () => {
    const list = $('#bank-details');
    if (!list) return;
    const fragment = document.createDocumentFragment();
    Object.entries(WEDDING.bank).forEach(([label, value]) => {
      const wrapper = createElement('div');
      wrapper.append(createElement('dt', '', label), createElement('dd', '', value));
      fragment.append(wrapper);
    });
    list.replaceChildren(fragment);
  };

  const configureCalendarLink = () => {
    const { start, end } = getCalendarRange();
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: `Boda de ${WEDDING.bride} y ${WEDDING.groom}`,
      dates: `${start}/${end}`,
      details: '¡Nos casamos! Te esperamos para celebrar este gran día.',
      location: `${WEDDING.locations[0].name}, ${WEDDING.locations[0].city}`
    });
    setSafeLink($('#google-calendar-link'), `https://calendar.google.com/calendar/render?${params.toString()}`);
  };

  const updateCountdown = () => {
    const countdown = $('#countdown');
    if (!countdown) return;

    const distance = new Date(WEDDING.dateIso).getTime() - Date.now();
    if (distance <= 0) {
      window.clearInterval(state.countdownTimer);
      countdown.replaceChildren(createElement('h3', '', '¡Llegó el gran día!'));
      return;
    }

    const units = [
      ['Días', Math.floor(distance / MILLISECONDS.day)],
      ['Hrs', Math.floor((distance % MILLISECONDS.day) / MILLISECONDS.hour)],
      ['Min', Math.floor((distance % MILLISECONDS.hour) / MILLISECONDS.minute)],
      ['Seg', Math.floor((distance % MILLISECONDS.minute) / MILLISECONDS.second)]
    ];

    const boxes = units.map(([label, value]) => {
      const box = createElement('div', 'time-box');
      box.append(createElement('strong', '', value), createElement('span', '', label));
      return box;
    });
    countdown.replaceChildren(...boxes);
  };

  const openEnvelope = () => {
    const envelope = $(selectors.envelope);
    const main = $(selectors.main);
    const header = $(selectors.header);
    const musicButton = $(selectors.musicButton);
    const music = $(selectors.music);

    envelope?.classList.add('is-opening');
    music?.play().catch(() => undefined);

    window.setTimeout(() => {
      envelope?.classList.add('is-open');
      if (main) main.hidden = false;
      header?.classList.add('is-visible');
      musicButton?.classList.add('is-visible');
      observeScrollReveal();
    }, 1_000);
  };

  const toggleMusic = () => {
    const music = $(selectors.music);
    const icon = $(selectors.musicIcon);
    if (!music || !icon) return;

    if (music.paused) {
      music.play().catch(() => undefined);
      icon.classList.replace('fa-volume-xmark', 'fa-volume-high');
      return;
    }
    music.pause();
    icon.classList.replace('fa-volume-high', 'fa-volume-xmark');
  };

  const toggleMenu = () => {
    const links = $(selectors.navLinks);
    const toggle = $(selectors.navToggle);
    const isOpen = !links?.classList.contains('is-open');
    links?.classList.toggle('is-open', isOpen);
    toggle?.setAttribute('aria-expanded', String(isOpen));
  };

  const closeMenu = () => {
    $(selectors.navLinks)?.classList.remove('is-open');
    $(selectors.navToggle)?.setAttribute('aria-expanded', 'false');
  };

  const openRsvp = () => {
    const modal = $(selectors.rsvpModal);
    const formContainer = $(selectors.rsvpFormContainer);
    const success = $(selectors.rsvpSuccess);
    if (!modal || !formContainer || !success) return;
    formContainer.hidden = false;
    success.hidden = true;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    $('#guest-name')?.focus();
  };

  const closeRsvp = () => {
    const modal = $(selectors.rsvpModal);
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
  };

  const setAttendanceFields = (willAttend) => {
    const extraFields = $('#attendance-fields');
    const declineMessage = $('#decline-message');
    if (extraFields) extraFields.hidden = !willAttend;
    if (declineMessage) declineMessage.hidden = willAttend;
  };

  const setCompanionFields = (hasCompanions) => {
    const wrapper = $('#companions-wrapper');
    if (!wrapper) return;
    wrapper.hidden = !hasCompanions;
    if (hasCompanions && state.companionCount === 0) addCompanion();
    if (!hasCompanions) resetCompanions();
  };

  const addCompanion = () => {
    if (state.companionCount >= MAX_COMPANIONS) return;
    state.companionCount += 1;
    const list = $('#companions-list');
    const addButton = $('#add-companion');
    if (!list) return;

    const row = createElement('div', 'companion-row');
    row.dataset.companionId = String(state.companionCount);

    const input = createElement('input', 'form-control companion-input');
    input.type = 'text';
    input.name = 'companion';
    input.maxLength = 80;
    input.required = true;
    input.placeholder = `Acompañante ${state.companionCount}`;

    const removeButton = createElement('button', 'remove-companion');
    removeButton.type = 'button';
    removeButton.dataset.action = 'remove-companion';
    removeButton.dataset.companionId = String(state.companionCount);
    removeButton.setAttribute('aria-label', `Eliminar acompañante ${state.companionCount}`);
    const icon = createElement('i', 'fa-solid fa-xmark');
    icon.setAttribute('aria-hidden', 'true');
    removeButton.append(icon);

    row.append(input, removeButton);
    list.append(row);
    if (addButton) addButton.hidden = state.companionCount >= MAX_COMPANIONS;
  };

  const removeCompanion = (id) => {
    const row = $(`[data-companion-id="${CSS.escape(id)}"]`);
    row?.remove();
    state.companionCount = Math.max(0, $$('.companion-row').length);
    const addButton = $('#add-companion');
    if (addButton) addButton.hidden = state.companionCount >= MAX_COMPANIONS;
  };

  const resetCompanions = () => {
    $('#companions-list')?.replaceChildren();
    state.companionCount = 0;
    const addButton = $('#add-companion');
    if (addButton) addButton.hidden = false;
  };

  const openLightbox = (index) => {
    const safeIndex = Number(index);
    if (!Number.isInteger(safeIndex) || safeIndex < 0 || safeIndex >= WEDDING.gallery.length) return;
    state.lightboxIndex = safeIndex;
    const modal = $(selectors.lightbox);
    const image = $(selectors.lightboxImg);
    setSafeImage(image, WEDDING.gallery[state.lightboxIndex], `Foto ${state.lightboxIndex + 1} ampliada`);
    if (modal) modal.hidden = false;
    document.body.classList.add('modal-open');
  };

  const closeLightbox = () => {
    const modal = $(selectors.lightbox);
    if (modal) modal.hidden = true;
    document.body.classList.remove('modal-open');
  };

  const moveLightbox = (step) => {
    const nextIndex = (state.lightboxIndex + step + WEDDING.gallery.length) % WEDDING.gallery.length;
    openLightbox(nextIndex);
  };

  const validateRsvp = (form) => {
    const formData = new FormData(form);
    const attendance = formData.get('attendance');
    const name = normalizeText(formData.get('name'), 80);
    const phone = normalizeText(formData.get('phone'), 20);
    const menu = normalizeText(formData.get('menu') || 'N/A', 40);
    const song = normalizeText(formData.get('song') || 'N/A', 100);
    const message = normalizeText(formData.get('message') || '', 500);
    const companions = $$('.companion-input')
      .map((input) => normalizeText(input.value, 80))
      .filter(Boolean);

    const errors = {};
    if (name.length < 3) errors.name = 'Escribe un nombre válido.';
    if (!/^\+?[0-9\s().-]{8,20}$/.test(phone)) errors.phone = 'Escribe un teléfono válido.';
    if (!['Si', 'No'].includes(attendance)) errors.attendance = 'Selecciona una opción de asistencia.';
    if (attendance === 'Si' && companions.length !== $$('.companion-input').length) {
      errors.attendance = 'Completa o elimina los acompañantes vacíos.';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      payload: {
        Nombre: name,
        Telefono: phone,
        Asistencia: attendance || 'No',
        Menu: attendance === 'Si' ? menu : 'N/A',
        Cancion: attendance === 'Si' ? song : 'N/A',
        Pases: attendance === 'Si' ? String(1 + companions.length) : '0',
        Acompanantes: companions.length ? companions.join(', ') : attendance === 'Si' ? 'Ninguno' : 'N/A',
        Mensaje: message
      }
    };
  };

  const showFormErrors = (errors) => {
    $$('[data-error-for]').forEach((node) => setText(node, errors[node.dataset.errorFor] || ''));
  };

  const submitRsvp = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const submitButton = $('#rsvp-submit');
    const validation = validateRsvp(form);
    showFormErrors(validation.errors);
    if (!validation.isValid) return;

    if (!isSafeHttpUrl(WEDDING.appsScriptUrl) || WEDDING.appsScriptUrl === 'xx') {
      showFormErrors({ attendance: 'Configura una URL segura de Google Apps Script antes de enviar.' });
      return;
    }

    const body = new FormData();
    Object.entries(validation.payload).forEach(([key, value]) => body.append(key, value));

    try {
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
      }
      await fetch(WEDDING.appsScriptUrl, { method: 'POST', body, mode: 'no-cors' });
      $('#rsvp-form-container').hidden = true;
      $('#rsvp-success').hidden = false;
      form.reset();
      resetCompanions();
      setAttendanceFields(false);
    } catch {
      showFormErrors({ attendance: 'No fue posible enviar la confirmación. Intenta nuevamente.' });
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Confirmar';
      }
    }
  };

  const downloadIcs = () => {
    const { start, end } = getCalendarRange();
    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Demo Delux//Boda//ES',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@demo-delux.local`,
      `DTSTAMP:${start}Z`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:Boda de ${normalizeText(WEDDING.bride)} y ${normalizeText(WEDDING.groom)}`,
      'DESCRIPTION:¡Nos casamos!',
      `LOCATION:${normalizeText(`${WEDDING.locations[0].name}, ${WEDDING.locations[0].city}`, 180)}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Boda.ics';
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const observeScrollReveal = () => {
    if (!('IntersectionObserver' in window)) {
      $$('.reveal-on-scroll').forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.15 });

    $$('.reveal-on-scroll').forEach((element) => observer.observe(element));
  };

  const handleDocumentClick = (event) => {
    const actionElement = event.target.closest('[data-action]');
    if (!actionElement) return;
    const { action } = actionElement.dataset;

    const handlers = {
      'open-envelope': openEnvelope,
      'toggle-music': toggleMusic,
      'toggle-menu': toggleMenu,
      'close-menu': closeMenu,
      'open-rsvp': openRsvp,
      'close-rsvp': closeRsvp,
      'attendance-yes': () => setAttendanceFields(true),
      'attendance-no': () => setAttendanceFields(false),
      'companions-yes': () => setCompanionFields(true),
      'companions-no': () => setCompanionFields(false),
      'add-companion': addCompanion,
      'remove-companion': () => removeCompanion(actionElement.dataset.companionId),
      'open-lightbox': () => openLightbox(Number(actionElement.dataset.index)),
      'close-lightbox': closeLightbox,
      'prev-lightbox': () => moveLightbox(-1),
      'next-lightbox': () => moveLightbox(1),
      'download-ics': downloadIcs
    };

    if (handlers[action]) handlers[action]();
  };

  const handleKeyboard = (event) => {
    const lightbox = $(selectors.lightbox);
    const rsvpModal = $(selectors.rsvpModal);
    if (event.key === 'Escape') {
      if (lightbox && !lightbox.hidden) closeLightbox();
      if (rsvpModal && !rsvpModal.hidden) closeRsvp();
    }
    if (!lightbox || lightbox.hidden) return;
    if (event.key === 'ArrowRight') moveLightbox(1);
    if (event.key === 'ArrowLeft') moveLightbox(-1);
  };

  const bindEvents = () => {
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleKeyboard);
    $('#rsvp-form')?.addEventListener('submit', submitRsvp);
  };

  const init = () => {
    renderStaticText();
    renderImagesAndMedia();
    renderStory();
    renderLocations();
    renderTimeline();
    renderDressCode();
    renderHotels();
    renderGallery();
    renderRegistry();
    renderBankDetails();
    configureCalendarLink();
    updateCountdown();
    state.countdownTimer = window.setInterval(updateCountdown, 1_000);
    bindEvents();
  };

  document.addEventListener('DOMContentLoaded', init);
})();
