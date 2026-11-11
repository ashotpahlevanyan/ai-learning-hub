// Applies the saved theme and reading preferences before the first paint, so pages never flash the wrong colours.
// A classic (blocking) script from the same origin, so it runs under the site's script-src 'self' policy.
(function () {
  try {
    var s = JSON.parse(localStorage.getItem('aiLearningHub.v1') || '{}');
    var d = document.documentElement, r = s.reading || {};
    if (s.theme) d.setAttribute('data-theme', s.theme);
    if (r.size) d.setAttribute('data-text', r.size);
    if (r.font) d.setAttribute('data-font', r.font);
    if (r.leading) d.setAttribute('data-leading', r.leading);
    if (r.width) d.setAttribute('data-width', r.width);
  } catch (e) { /* storage blocked: defaults apply */ }
})();
