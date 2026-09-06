/* ============================================================
   Motion Lab — expander
   The hand written set (js/data) is the seed. js/gen/*.gen.js each fill a
   pool with far more variants than the category needs; this file tops every
   category up to exactly 200, so the collection stays complete and the
   generators can never over- or under-shoot the count.
   ============================================================ */
(function (global) {
  'use strict';

  var LAB = (global.MOTION_LAB = global.MOTION_LAB || []);
  var KIT = global.MLKit;
  var TARGET = KIT ? KIT.TARGET : 200;
  var targetFor = (KIT && KIT.targetFor) || function () { return TARGET; };
  var CATS = KIT ? KIT.CATS : Object.keys(global.ML_GEN || {});

  var have = {}, report = { target: TARGET, targets: {}, added: {}, short: {}, pruned: {}, byCat: {} };
  LAB.forEach(function (i) { have[i.cat] = (have[i.cat] || 0) + 1; });

  var pools = global.ML_GEN || {};

  /* keep the gallery readable: interleave families instead of dumping one
     family after another, so neighbouring cards never look like twins */
  function weave(list) {
    var buckets = {}, order = [];
    list.forEach(function (it) {
      var fam = it.family || 'misc';
      if (!buckets[fam]) { buckets[fam] = []; order.push(fam); }
      buckets[fam].push(it);
    });
    var out = [], more = true, depth = 0;
    while (more) {
      more = false;
      for (var i = 0; i < order.length; i++) {
        var b = buckets[order[i]];
        if (b[depth]) { out.push(b[depth]); more = true; }
      }
      depth++;
    }
    return out;
  }

  CATS.forEach(function (cat) {
    var pool = pools[cat] || [];
    var want = targetFor(cat);
    var need = Math.max(0, want - (have[cat] || 0));
    var woven = weave(pool.slice());
    var take = woven.slice(0, need);
    take.forEach(function (it) {
      it.family = undefined;
      LAB.push(it);
    });
    have[cat] = (have[cat] || 0) + take.length;
    report.added[cat] = take.length;
    report.short[cat] = Math.max(0, need - pool.length);
    report.pruned[cat] = Math.max(0, pool.length - need);
    report.byCat[cat] = have[cat];
    report.targets[cat] = want;
  });

  global.ML_EXPAND = report;
  global.ML_COUNTS = have;

  if (global.console && console.table) {
    console.table(report.byCat);
  }
})(window);
