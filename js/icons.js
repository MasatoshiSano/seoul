/* Material-style simple line icons (inline SVG, 24x24). window.ICON(name) / window.injectIcons() */
(function () {
  const INNER = {
    calendar: '<rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9h18"/><path d="M8 2.5v4"/><path d="M16 2.5v4"/>',
    place: '<path d="M12 21c4-4.5 7-7.8 7-11a7 7 0 1 0-14 0c0 3.2 3 6.5 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    payments: '<rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10.3h18"/><circle cx="16.6" cy="14.6" r="1.3"/>',
    luggage: '<rect x="6" y="7.5" width="12" height="13" rx="2"/><path d="M9.5 7.5V5A1.5 1.5 0 0 1 11 3.5h2A1.5 1.5 0 0 1 14.5 5v2.5"/><path d="M10 11v6"/><path d="M14 11v6"/>',
    ticket: '<path d="M4 9.5V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2.5a2 2 0 0 0 0 4V17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2.5a2 2 0 0 0 0-4z"/>',
    flight: '<path fill="currentColor" stroke="none" d="M21 15.5v-1.4l-7.5-4.6V4.6a1.5 1.5 0 0 0-3 0V9.5L3 14.1v1.4l7.5-2.3v4.9L8.4 19.6v1.1l3.6-1 3.6 1v-1.1l-2.1-1.5v-4.9z"/>',
    train: '<rect x="6" y="4" width="12" height="12" rx="2.5"/><path d="M6 11h12"/><path d="M8 16l-2 4"/><path d="M16 16l2 4"/><circle cx="9.5" cy="13.3" r="0.5" fill="currentColor" stroke="none"/><circle cx="14.5" cy="13.3" r="0.5" fill="currentColor" stroke="none"/>',
    hotel: '<path d="M4 11V8.5A1.5 1.5 0 0 1 5.5 7h13A1.5 1.5 0 0 1 20 8.5V11"/><path d="M2 18v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4"/><path d="M2 18v2"/><path d="M22 18v2"/>',
    exchange: '<path d="M4 9a8 8 0 0 1 13.5-3.3L20 8"/><path d="M20 4v4h-4"/><path d="M20 15a8 8 0 0 1-13.5 3.3L4 16"/><path d="M4 20v-4h4"/>',
    restaurant: '<path d="M6 3v6a2 2 0 0 0 4 0V3"/><path d="M8 9v12"/><path d="M16 3c-1.7 1-2.5 3.5-2 6 .3 1.4 1 2 2 2v10"/>',
    nightlife: '<path d="M5 5h14l-7 7z"/><path d="M12 12v7"/><path d="M8 21h8"/>',
    temple: '<path d="M3 21h18"/><path d="M5 21V10"/><path d="M19 21V10"/><path d="M4 10l8-5 8 5"/><path d="M9 21v-6h6v6"/>',
    camera: '<path d="M3 9a2 2 0 0 1 2-2h1.6l1.1-2h6.6l1.1 2H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="3.2"/>',
    cafe: '<path d="M4 8h13v4.5A4.5 4.5 0 0 1 12.5 17h-4A4.5 4.5 0 0 1 4 12.5z"/><path d="M17 9h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M8 21h8"/><path d="M8 3v2"/><path d="M12 3v2"/>',
    palette: '<path d="M12 3a9 9 0 0 0-.5 18c1 0 1.7-.8 1.3-1.8-.4-1 .3-2 1.2-2H16a5 5 0 0 0 5-5c0-5-4-9.2-9-9.2z"/><circle cx="7.5" cy="11" r="1" fill="currentColor" stroke="none"/><circle cx="10" cy="7.5" r="1" fill="currentColor" stroke="none"/><circle cx="14.5" cy="7.5" r="1" fill="currentColor" stroke="none"/>',
    park: '<path d="M12 3l5 8h-3.2L17 16H7l3.2-5H7z"/><path d="M12 16v5"/>',
    sparkle: '<path fill="currentColor" stroke="none" d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path fill="currentColor" stroke="none" d="M18.2 14.5l.6 1.9 1.9.6-1.9.6-.6 1.9-.6-1.9-1.9-.6 1.9-.6z"/>',
    shopping: '<path d="M5.5 8h13l-1 11.5a1 1 0 0 1-1 .9H7.5a1 1 0 0 1-1-.9z"/><path d="M9 8V6.2a3 3 0 0 1 6 0V8"/>',
    gift: '<rect x="3" y="8.5" width="18" height="11.5" rx="1.5"/><path d="M3 13h18"/><path d="M12 8.5V20"/><path d="M12 8.5C11 6 9.5 4.2 8 5c-1.3.7-.6 2.6 1 3.1"/><path d="M12 8.5C13 6 14.5 4.2 16 5c1.3.7.6 2.6-1 3.1"/>',
    badge: '<rect x="4" y="4" width="16" height="16" rx="2.5"/><circle cx="12" cy="10" r="2.3"/><path d="M8 16.6a4 4 0 0 1 8 0"/>',
    credit_card: '<rect x="2.5" y="5.5" width="19" height="13" rx="2.5"/><path d="M2.5 10h19"/>',
    compare: '<path d="M4 8.5h11"/><path d="M12 5.5l3 3-3 3"/><path d="M20 15.5H9"/><path d="M12 12.5l-3 3 3 3"/>',
    storefront: '<path d="M4.5 9l1-4h13l1 4"/><path d="M4.5 9a2.1 2.1 0 0 0 4.1 0 2.1 2.1 0 0 0 4.1 0 2.1 2.1 0 0 0 4.1 0"/><path d="M5.5 11v8.5h13V11"/><path d="M10 19.5V14h4v5.5"/>',
    warning: '<path d="M12 4.5 21 19H3z"/><path d="M12 10v4"/><path d="M12 16.8v.1"/>',
    info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5"/><path d="M12 8.2v.1"/>',
    check: '<circle cx="12" cy="12" r="8.5"/><path d="M8.4 12.2l2.4 2.4 4.7-4.9"/>'
  };
  function icon(name) {
    const inner = INNER[name];
    if (!inner) return "";
    return '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + inner + "</svg>";
  }
  function injectIcons(root) {
    (root || document).querySelectorAll("[data-icon]").forEach((el) => { el.innerHTML = icon(el.getAttribute("data-icon")); });
  }
  window.ICON = icon;
  window.injectIcons = injectIcons;
})();
