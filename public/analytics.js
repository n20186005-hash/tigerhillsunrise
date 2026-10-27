// Existing yes/no choice, with effective runtime refusal before persistence.
(() => {
  const key = 'tiger-hill-ga-consent';
  const vetoKey = key + '-session-denied';
  const id = 'G-HXM22WWPKP';
  const panel = document.getElementById('cookie-panel');
  const status = document.getElementById('consent-status');
  let loaded = false;
  let deniedHere = false;
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
    say(saved === 'denied' ? 'अस्वीकार सुरक्षित भयो। यस पृष्ठको थप Analytics बन्द छ; पहिले पठाइएको विवरण फिर्ता आउँदैन।'
      : saved === 'removed' ? 'साझा अनुमति हटाइएको पुष्टि भयो। यस पृष्ठको थप Analytics बन्द छ; फेरि खोल्दा छनोट सोधिन सक्छ। पहिले पठाइएको विवरण फिर्ता आउँदैन।'
      : sessionOff ? 'अस्वीकार सुरक्षित भएन। यस पृष्ठ र चालु ट्याबको सत्रमा Analytics बन्द छ। अर्को ट्याब वा नयाँ सत्रमा पुरानो अनुमति लागू हुन सक्छ।'
      : 'अस्वीकार सुरक्षित भएन। यस पृष्ठमा Analytics बन्द छ। फेरि खोल्दा वा अर्को ट्याबमा पुरानो अनुमति लागू हुन सक्छ।');
    return saved;
  };
  const allow = () => {
    stop();
    // Verify the session veto is cleared before publishing a shared grant.
    if (!clearVeto() || !sharedWrite('yes')) {
      deniedHere = true;
      const sessionOff = veto();
      const sharedOff = revokeShared();
      say(sharedOff ? 'अनुमति सुरक्षित भएन। यस पृष्ठको Analytics बन्द छ र साझा अनुमति बाँकी नरहेको पुष्टि भयो। फेरि खोल्दा छनोट सोधिन सक्छ।'
        : sessionOff ? 'अनुमति सुरक्षित भएको पुष्टि भएन। यस पृष्ठ र चालु ट्याबमा Analytics बन्द छ; यो प्रयास वा पहिलेको अनुमति अर्को ट्याब वा नयाँ सत्रमा लागू हुन सक्छ।'
        : 'अनुमति सुरक्षित भएको पुष्टि भएन। यस पृष्ठमा Analytics बन्द छ; यो प्रयास वा पहिलेको अनुमति अर्को पटक वा अर्को ट्याबमा लागू हुन सक्छ।');
      return false;
    }
    deniedHere = false;
    start();
    say('अनुमति सुरक्षित भयो। Google Analytics अहिले लोड हुन सक्छ। पछि यही सेटिङबाट फिर्ता लिन सक्नुहुन्छ।');
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
      say('अर्को ट्याबको छनोटअनुसार यस पृष्ठको Analytics बन्द छ।');
    } else if (deniedHere) stop();
  });
  if ('serviceWorker' in navigator && location.protocol === 'https:' && !['localhost','127.0.0.1'].includes(location.hostname)) {
    window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
  }
})();
