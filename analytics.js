/* ============================================================
   豆子的心田 · Google Analytics 4(全站共用)
   - 全站每頁 <script src="analytics.js"></script> 引用即可。
   - GA 的評估 ID 不寫在這裡,而是你在「心田後台 → 設定」填、存在伺服器;
     這支會跟伺服器要(GET /api/config),拿到才載入。
   - 只在正式網域(douzistudio.com)載入;本機 file:// / localhost 一律不追蹤,
     所以開發測試不會污染分析數據。
   ============================================================ */
(function () {
  var host = location.hostname;
  var isProd = (host === 'douzistudio.com' || host.indexOf('.douzistudio.com') !== -1);
  if (!isProd) return; // 本機 / localhost 不追蹤

  fetch('/api/config')
    .then(function (r) { return r.json(); })
    .then(function (c) {
      var id = c && c.ga_id;
      if (!id || id.indexOf('G-') !== 0) return; // 後台還沒填 ID
      var s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', id);
    })
    .catch(function () { /* 沒有 /api/config 就安靜略過 */ });
})();
