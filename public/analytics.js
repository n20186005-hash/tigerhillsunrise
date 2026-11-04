// Analytics consent, with localized messages injected per page language.
// The layout publishes window.__THS_CONSENT__ (see PageLayout.astro); the
// English strings below are only a safety fallback for the static 404 page.
(() => {
  const key = 'tiger-hill-ga-consent';
  const vetoKey = key + '-session-denied';
  const id = 'G-HXM22WWPKP';
  const messages = window.__THS_CONSENT__ || {
    title: 'Analytics consent',
    body: 'If you allow it, Google Analytics may load. Refusing does not block the main content.',
    accept: 'Allow',
    reject: 'Refuse / withdraw',
    close: 'Close',
    status: {
      accepted: 'Consent saved. Google Analytics may load now.',
      deniedSaved: 'Refusal saved. Further Analytics on this page is off.',
      deniedRemoved: 'The shared consent was removed. Further Analytics on this page is off.',
      deniedSession: 'Refusal could not be saved. Analytics is off on this page and in the current tab session.',
      deniedFailed: 'Refusal could not be saved. Analytics is off on this page.',
      acceptFailed: 'Consent could not be saved. Analytics is off on this page.',
      acceptFailedClean: 'Consent could not be saved. Analytics is off on this page and no shared consent remains.',
      acceptFailedSession: 'Consent could not be confirmed. Analytics is off on this page and in the current tab.',
      remoteDenied: 'Following the choice made in another tab, Analytics is off on this page.'
    },
    offline: 'Offline: this page is not cached. Reconnect and try again.'
  };
  const msg = messages.status || {};

  const panel = document.getElementById('cookie-panel');
  const status = document.getElementById('consent-status');
  let loaded = false;
  let deniedHere = false;

  // Fill any static panel markup (the 404 page) with the active language.
  if (panel) {
    const title = panel.querySelector('#cookie-title');
    const copy = panel.querySelector('#cookie-copy');
    const accept = panel.querySelector('[data-consent="yes"]');
    const reject = panel.querySelector('[data-consent="no"]');
    const close = panel.querySelector('[data-close-settings]');
    if (title) title.textContent = messages.title;
    if (copy) copy.textContent = messages.body;
    if (accept) accept.textContent = messages.accept;
    if (reject) reject.textContent = messages.reject;
    if (close) close.textContent = messages.close;
  }

  const read = (storageName, name) => { try { return window[storageName].getItem(name); } catch { return undefined; } };
  const say = (message) => { if (status) status.textContent = message; };
  const stop = () => {
    window['ga-disable-' + id] = true;
    if (loaded && window.gtag) window.gtag('consent', 'update', { analytics_storage: 'denied' });
  };
  const start = () => {
    window['ga-disable-' + id] = false;
    if (loaded) {
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
      return;
    }
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', { analytics_storage: 'granted' });
    window.gtag('js', new Date());
    window.gtag('config', id, { anonymize_ip: true });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.appendChild(script);
  };
  const sharedWrite = (value) => {
    try { window.localStorage.setItem(key, value); return window.localStorage.getItem(key) === value; }
    catch { return false; }
  };
  const revokeShared = () => {
    if (sharedWrite('no')) return 'denied';
    try {
      window.localStorage.removeItem(key);
      return window.localStorage.getItem(key) === null ? 'removed' : false;
    } catch { return false; }
  };
  const veto = () => {
    try { window.sessionStorage.setItem(vetoKey, 'yes'); return window.sessionStorage.getItem(vetoKey) === 'yes'; }
    catch { return false; }
  };
  const clearVeto = () => {
    try { window.sessionStorage.removeItem(vetoKey); return window.sessionStorage.getItem(vetoKey) === null; }
    catch { return false; }
  };
  const refuse = () => {
    deniedHere = true;
    stop();
    const sessionOff = veto();
    const saved = revokeShared();
    say(saved === 'denied' ? msg.deniedSaved
      : saved === 'removed' ? msg.deniedRemoved
      : sessionOff ? msg.deniedSession
      : msg.deniedFailed);
    return saved;
  };
  const allow = () => {
    stop();
    // Verify the session veto is cleared before publishing a shared grant.
    if (!clearVeto() || !sharedWrite('yes')) {
      deniedHere = true;
      const sessionOff = veto();
      const sharedOff = revokeShared();
      say(sharedOff ? msg.acceptFailedClean : sessionOff ? msg.acceptFailedSession : msg.acceptFailed);
      return false;
    }
    deniedHere = false;
    start();
    say(msg.accepted);
    return true;
  };
  stop();
  const stored = read('localStorage', key);
  const blocked = read('sessionStorage', vetoKey);
  if (stored === 'yes' && blocked === null) start();
  else if (stored !== 'no' && panel) panel.hidden = false;
  const open = () => { if (panel) panel.hidden = false; };
  document.getElementById('cookie-settings')?.addEventListener('click', open);
  document.querySelectorAll('[data-open-settings]').forEach((button) => button.addEventListener('click', open));
  panel?.querySelectorAll('[data-consent]').forEach((button) => button.addEventListener('click', () => {
    if (button.getAttribute('data-consent') === 'yes') allow(); else refuse();
  }));
  panel?.querySelector('[data-close-settings]')?.addEventListener('click', () => { panel.hidden = true; });
  window.addEventListener('storage', (event) => {
    if (event.key !== key && event.key !== null) return;
    // A remote denial is latched here; remote grants never restart measurement.
    if (read('localStorage', key) !== 'yes') {
      deniedHere = true;
      stop();
      veto();
      say(msg.remoteDenied);
    } else if (deniedHere) stop();
  });
  if ('serviceWorker' in navigator && location.protocol === 'https:' && !['localhost', '127.0.0.1'].includes(location.hostname)) {
    window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
  }
})();
