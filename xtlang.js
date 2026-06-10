/* 心田 · 子頁面外框雙語(diary / post 等)
   讀 localStorage 記住的語言、翻外框文字、切換鈕(reload 讓內容也換)。
   首頁 index.html 自帶完整 i18n,不需這支。 */
(function(){
  var DICT = {
    "豆子的心田":"Douzi's Heart Farm",
    "農事筆記":"Farming Diary",
    "我是誰":"Who I Am",
    "陪跑":"Mentoring",
    "造物坊":"The Creative Studio",
    "整地":"Groundwork",
    "選單":"Menu",
    "心田小屋":"The inner Cabins",
    "← 回心田":"← Back to the Heart Farm",
    "回心田":"Back to the Heart Farm",
    "沙遊心藝工作室 · 統一編號 76392596":"Sandplay Heart-Art Studio · Tax ID 76392596",
    "把看不見的,慢慢長成看得見的":"Nurturing the unseen, until it slowly comes to light",
    "田間的日記":"Diary from the field",
    "今天種了什麼、哪一株長得好、哪一株沒活——誠實地寫下來。寫出來的,都是真的長出來的東西。":"What I planted, which seedling thrived, which didn't — written down honestly. What gets written is always something that truly grew.",
    "把看不見的,慢慢長成看得見的。":"Nurturing the unseen, until it slowly comes to light.",
    "全部":"All",
    "這一畦還在發芽。":"This row is still sprouting.",
    "第一篇長出來,就會出現在這裡。":"When the first piece grows, it will appear here.",
    "← 回農事筆記":"← Back to Farming Diary",
    "回農事筆記":"Back to Farming Diary",
    "正在把這一畦翻出來…":"Turning over this row…",
    "讀到這裡,謝謝你。":"Thank you for reading this far.",
    "下一畦長出來,我再寫信給你 ——":"When the next row grows, I'll write to you ——",
    "留個位子":"Save me a seat",
    "沒有指定文章。":"No article specified.",
    "找不到這一篇,也許它還在發芽,或被移走了。":"This one can't be found — perhaps it's still sprouting, or has been moved."
  };

  var qsLang = new URLSearchParams(location.search).get("lang");
  if(qsLang){ try{ localStorage.setItem("xtlang", qsLang); }catch(e){} }
  var saved="zh"; try{ saved=localStorage.getItem("xtlang")||"zh"; }catch(e){}
  var LANG = (saved==="en") ? "en" : "zh";

  function tNode(n){
    if(!n || n.nodeType!==3) return;
    var t=(n.nodeValue||"").trim(); if(!t) return;
    if(DICT[t]!==undefined){ if(n.__zh===undefined) n.__zh=n.nodeValue; n.nodeValue=n.nodeValue.replace(t, DICT[t]); }
  }
  function walk(root, fn){
    for(var n=root.firstChild;n;n=n.nextSibling){
      if(n.nodeType===3){ fn(n); }
      else if(n.nodeType===1){ var tg=n.tagName; if(tg!=="SCRIPT"&&tg!=="STYLE") walk(n, fn); }
    }
  }

  var _busy=false;
  function applyEN(){
    if(LANG!=="en") return;
    _busy=true;
    walk(document.body, tNode);
    document.documentElement.lang="en";
    _busy=false;
  }

  // 切換鈕外觀
  function paintToggles(){
    var tg=document.querySelectorAll(".lang-toggle");
    for(var i=0;i<tg.length;i++) tg[i].textContent=(LANG==="en")?"中文":"EN";
  }
  document.addEventListener("click", function(e){
    var b=e.target.closest && e.target.closest(".lang-toggle");
    if(b){ e.preventDefault();
      var nl=(LANG==="en")?"zh":"en";
      try{ localStorage.setItem("xtlang", nl); }catch(e2){}
      var u=new URL(location.href); u.searchParams.set("lang", nl); location.href=u.toString();
    }
  });

  // 之後才生出來的中文(渲染的文章/列表外框、狀態訊息)也翻
  try{
    var mo=new MutationObserver(function(muts){
      if(LANG!=="en" || _busy) return;
      _busy=true;
      for(var i=0;i<muts.length;i++){ var m=muts[i];
        if(m.type==="characterData"){ tNode(m.target); }
        else { for(var k=0;k<m.addedNodes.length;k++){ var nd=m.addedNodes[k];
          if(nd.nodeType===3) tNode(nd);
          else if(nd.nodeType===1){ var tg=nd.tagName; if(tg!=="SCRIPT"&&tg!=="STYLE") walk(nd, tNode); }
        } }
      }
      _busy=false;
    });
    mo.observe(document.body,{childList:true,subtree:true,characterData:true});
  }catch(e){}

  function init(){ applyEN(); paintToggles(); }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
