/* ============================================================
   Motion Lab — After Effects export UI
   Generates a tuned, standalone JSX builder for any of the 3,400 effects.
   The builder runs in After Effects, where Adobe itself writes the binary
   .aep, XML .aepx and optional .mogrt outputs.
   ============================================================ */
(function () {
  'use strict';

  var Core = window.MotionLabAECore;
  var T = window.MotionLabTune;
  var modal = document.querySelector('#aeExport');
  if (!Core || !modal) return;

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var current = null, currentProfile = null, lastFocus = null;

  function items() { return (window.MotionLab && window.MotionLab.items) || window.MOTION_LAB || []; }
  function itemIndex(item) {
    var list = items();
    for (var i = 0; i < list.length; i++) if (list[i].id === item.id) return i + 1;
    return 1;
  }
  function makeProfile(item, index) {
    var settings = T ? T.get(item.id) : {};
    return Core.profile(item, {
      index: index || itemIndex(item),
      settings: settings,
      palette: T ? T.palette(item) : [],
      tunedCss: T ? T.srcOf(item).css : item.css,
      tuned: T ? T.isTuned(item.id) : false
    });
  }
  function toast(msg) {
    if (window.MotionLabToast) window.MotionLabToast(msg);
  }
  function download(text, name, type) {
    var url = URL.createObjectURL(new Blob([text], { type: type || 'text/plain;charset=utf-8' }));
    var a = document.createElement('a');
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1800);
  }
  function copyText(text, message) {
    if (window.MotionLab && window.MotionLab.copy) return window.MotionLab.copy(text, message);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { toast(message); });
      return;
    }
    var ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); toast(message); } catch (e) { toast('Copy failed — select the expression manually'); }
    ta.remove();
  }
  function optionValues() {
    return {
      aep: $('#aeAep').checked,
      aepx: $('#aeAepx').checked,
      mogrt: $('#aeMogrt').checked
    };
  }
  function optionSummary() {
    var o = optionValues(), f = [];
    if (o.aep) f.push('.aep');
    if (o.aepx) f.push('.aepx');
    if (o.mogrt) f.push('.mogrt');
    $('#aeOutputSummary').textContent = f.length
      ? 'After Effects will write ' + f.join(' + ') + ' after building the composition.'
      : 'The JSX will add the composition to the current project without saving files.';
  }
  function destroyPreview() {
    var h = $('#aePreview .demo-host');
    if (h && h.__inst) h.__inst.destroy();
    $('#aePreview').innerHTML = '';
  }
  function preview(item) {
    destroyPreview();
    var host = document.createElement('div');
    host.className = 'demo-host';
    $('#aePreview').appendChild(host);
    try {
      if (window.MotionLab && window.MotionLab.mount) window.MotionLab.mount(item, host).setVisible(true);
    } catch (e) {}
  }
  function paintProfile(p) {
    $('#aeTitle').textContent = p.title + ' for After Effects';
    $('#aeMeta').textContent = p.fileBase + ' · ' + p.category + ' · ' + p.archetype + ' rig';
    $('#aeFileName').textContent = p.fileBase + '.jsx';
    $('#aeArchetype').textContent = p.archetype;
    $('#aeLayers').textContent = '~' + p.layerEstimate;
    $('#aeCycle').textContent = p.cycle + 's';
    $('#aeComp').textContent = '1080 × 1080 · ' + p.fps + ' fps · ' + p.compDuration + 's';
    $('#aeTuneState').textContent = p.tuned ? 'Current customisation included' : 'Authored defaults included';
    $('#aeTuneState').classList.toggle('is-tuned', p.tuned);
    $('#aePalette').innerHTML = '';
    p.colors.slice(0, 3).forEach(function (c, i) {
      var sw = document.createElement('span');
      sw.className = 'ae-swatch';
      sw.style.setProperty('--swatch', c);
      sw.title = ['Primary', 'Secondary', 'Accent'][i] + ' · ' + c;
      sw.setAttribute('aria-label', sw.title);
      $('#aePalette').appendChild(sw);
    });
    optionSummary();
  }

  function open(item) {
    if (!item) return;
    current = item;
    currentProfile = makeProfile(item);
    lastFocus = document.activeElement;
    paintProfile(currentProfile);
    preview(item);
    modal.hidden = false;
    document.body.classList.add('ae-open');
    if (window.MLSyncPageLock) window.MLSyncPageLock();
    else document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () {
      modal.classList.add('open');
      var first = $('#aeDownload');
      if (first) first.focus();
    });
  }
  function close() {
    modal.classList.remove('open');
    setTimeout(function () {
      modal.hidden = true;
      destroyPreview();
      current = null; currentProfile = null;
      document.body.classList.remove('ae-open');
      if (window.MLSyncPageLock) window.MLSyncPageLock();
      else document.body.style.overflow = '';
      if (lastFocus && document.contains(lastFocus) && lastFocus.focus) {
        try { lastFocus.focus(); } catch (e) {}
      }
      lastFocus = null;
    }, 240);
  }

  $('#aeDownload').addEventListener('click', function () {
    if (!currentProfile) return;
    var o = optionValues();
    download(Core.generate(currentProfile, o), currentProfile.fileBase + '.jsx', 'text/javascript;charset=utf-8');
    toast('AE builder downloaded · run it from File › Scripts in After Effects');
  });
  $('#aeExpression').addEventListener('click', function () {
    if (!currentProfile) return;
    copyText(Core.expression(currentProfile), 'After Effects expression copied');
  });
  $('#aeManifest').addEventListener('click', function () {
    if (!currentProfile) return;
    download(JSON.stringify(Core.manifest(currentProfile), null, 2) + '\n', currentProfile.fileBase + '.json', 'application/json;charset=utf-8');
    toast('AE settings manifest downloaded');
  });
  $$('.ae-format input').forEach(function (input) { input.addEventListener('change', optionSummary); });
  $$('[data-ae-close]').forEach(function (b) { b.addEventListener('click', close); });

  /* Close before the gallery's own Escape handler can close a panel under us. */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape' || modal.hidden) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    close();
  }, true);

  var starterIds = ['ring-spinner', 'dual-ring', 'dots-bounce', 'equalizer', 'square-flip', 'pulse-circle', 'atom-loader', 'btn-shine', 'gradient-text', 'cube-rotate'];
  function starterProfiles() {
    var list = items(), picked = [], used = {};
    starterIds.forEach(function (id) {
      for (var i = 0; i < list.length; i++) if (list[i].id === id && !used[id]) {
        picked.push(makeProfile(list[i], i + 1)); used[id] = 1; break;
      }
    });
    for (var n = 0; picked.length < 10 && n < list.length; n++) {
      if (!used[list[n].id]) { picked.push(makeProfile(list[n], n + 1)); used[list[n].id] = 1; }
    }
    return picked;
  }
  function downloadStarter() {
    var profiles = starterProfiles();
    if (!profiles.length) return;
    download(Core.generate(profiles, { aep: true, aepx: true, mogrt: true, baseName: 'motion-lab-ae-starter-kit' }), 'motion-lab-ae-starter-kit.jsx', 'text/javascript;charset=utf-8');
    toast('10-effect AE starter kit downloaded');
  }
  function downloadFull() {
    if (!window.confirm('Build all ' + items().length + ' effects?\n\nThe downloaded JSX is compact, but running it creates hundreds of compositions and can take several minutes in After Effects. MOGRT export is left off.')) return;
    toast('Preparing the full After Effects builder…');
    setTimeout(function () {
      var list = items(), profiles = [];
      for (var i = 0; i < list.length; i++) profiles.push(makeProfile(list[i], i + 1));
      download(Core.generate(profiles, { aep: true, aepx: true, mogrt: false, baseName: 'motion-lab-3400-effect-bundle' }), 'motion-lab-3400-effect-bundle.jsx', 'text/javascript;charset=utf-8');
      toast(profiles.length + '-effect AE builder downloaded');
    }, 40);
  }
  var starter = $('#aeStarterKit');
  var full = $('#aeFullBundle');
  if (starter) starter.addEventListener('click', downloadStarter);
  if (full) full.addEventListener('click', downloadFull);

  window.MotionLabAE = {
    open: open,
    close: close,
    profile: makeProfile,
    starter: downloadStarter,
    fullBundle: downloadFull,
    core: Core
  };
})();
