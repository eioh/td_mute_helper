// ==UserScript==
// @name td_mute_helper
// @namespace http://tampermonkey.net/
// @version 0.7.1
// @description try to take over the world!
// @author You
// @match https://tweetdeck.twitter.com
// @match https://twitter.com/i/tweetdeck
// @match https://x.com/i/tweetdeck
// @updateURL https://raw.githubusercontent.com/eioh/td_mute_helper/main/dist/main.js
// @downloadURL https://raw.githubusercontent.com/eioh/td_mute_helper/main/dist/main.js
// ==/UserScript==

(()=>{var Y=Object.defineProperty;var h=(t,e)=>()=>(t&&(e=t(t=0)),e);var v=(t,e)=>{for(var r in e)Y(t,r,{get:e[r],enumerable:!0})};var A={};v(A,{DELAY_BETWEEN_OPERATIONS:()=>E,INITIALIZATION_DELAY:()=>k,VERSION:()=>w});var w,E,k,b=h(()=>{w="0.7.1",E=2e4,k=3e4});function d(t,e){console.error(`[TD Mute Helper] ${t}:`,e),alert(`\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F: ${t}`)}var x=h(()=>{});var H={};v(H,{getDuplication:()=>Q});function Q(){try{let t=TD.controller.filterManager.getAll(),e=t.length,r=[];for(let a=0;a<e;a++)for(let o=a+1;o<e;o++)t[a].type==t[o].type&&t[a].value==t[o].value&&r.push(t[a]);return r}catch(t){return d("\u91CD\u8907\u30D5\u30A3\u30EB\u30BF\u30FC\u691C\u7D22\u306B\u5931\u6557\u3057\u307E\u3057\u305F",t),[]}}var z=h(()=>{x()});var C={};v(C,{sleep:()=>X});var X,O=h(()=>{X=t=>new Promise(e=>setTimeout(e,t))});b();var _=`<div id="td-mute-dialog" class="td-dialog-overlay" style="display: none;">\r
  <div class="td-dialog-container">\r
    <div class="td-dialog-header">\r
      <h3 class="td-dialog-title">\u30DF\u30E5\u30FC\u30C8\u8A2D\u5B9A</h3>\r
      <button class="td-dialog-close">&times;</button>\r
    </div>\r
    <div class="td-dialog-main">\r
      <div class="td-dialog-sidebar">\r
        <nav class="td-dialog-tabs">\r
          <button class="td-dialog-tab active" data-tab="phrase">\u30D5\u30EC\u30FC\u30BA</button>\r
          <button class="td-dialog-tab" data-tab="regex">\u6B63\u898F\u8868\u73FE</button>\r
          <button class="td-dialog-tab" data-tab="url">URL</button>\r
          <button class="td-dialog-tab" data-tab="user-keyword">\u30E6\u30FC\u30B6\u30FC\u30AD\u30FC\u30EF\u30FC\u30C9</button>\r
          <button class="td-dialog-tab" data-tab="user-regex">\u30E6\u30FC\u30B6\u30FC\u6B63\u898F\u8868\u73FE</button>\r
          <button class="td-dialog-tab" data-tab="remove">\u524A\u9664</button>\r
        </nav>\r
      </div>\r
      <div class="td-dialog-content">\r
        <div class="td-dialog-body">\r
          <div class="tab-content active" id="phrase-tab">\r
            <p class="td-dialog-message">\u30DF\u30E5\u30FC\u30C8\u3059\u308B\u30AD\u30FC\u30EF\u30FC\u30C9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044<br>\u4F8B: "\u30B9\u30D1\u30E0", "\u5BA3\u4F1D"</p>\r
            <textarea class="td-dialog-input" id="phrase-input" placeholder="\u30AD\u30FC\u30EF\u30FC\u30C9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044" autocomplete="off" data-lpignore="true" data-form-type="other" data-1p-ignore rows="3"></textarea>\r
          </div>\r
          <div class="tab-content" id="regex-tab">\r
            <p class="td-dialog-message">\u6B63\u898F\u8868\u73FE\u30D1\u30BF\u30FC\u30F3\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044<br>\u4F8B: "RT.*\u30BB\u30FC\u30EB", ".*\u9650\u5B9A*"<br><small>\u203B \u30B9\u30E9\u30C3\u30B7\u30E5(/)\u306F\u4E0D\u8981\u3067\u3059</small></p>\r
            <textarea class="td-dialog-input" id="regex-input" placeholder="\u6B63\u898F\u8868\u73FE\u30D1\u30BF\u30FC\u30F3\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044" autocomplete="off" data-lpignore="true" data-form-type="other" data-1p-ignore rows="3"></textarea>\r
          </div>\r
          <div class="tab-content" id="url-tab">\r
            <p class="td-dialog-message">\u30DF\u30E5\u30FC\u30C8\u3059\u308BURL\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044<br>\u4F8B: "https://example.com"<br><small>\u203B Twitter\u77ED\u7E2EURL\u306E t.co \u306B\u3082\u5BFE\u5FDC\u3057\u307E\u3059</small></p>\r
            <textarea class="td-dialog-input" id="url-input" placeholder="URL\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044" autocomplete="off" data-lpignore="true" data-form-type="other" data-1p-ignore rows="3"></textarea>\r
          </div>\r
          <div class="tab-content" id="user-keyword-tab">\r
            <p class="td-dialog-message">\u7279\u5B9A\u30E6\u30FC\u30B6\u30FC\u306E\u30AD\u30FC\u30EF\u30FC\u30C9\u3092\u30DF\u30E5\u30FC\u30C8\u3057\u307E\u3059<br>\u5F62\u5F0F: "\u30E6\u30FC\u30B6\u30FC\u540D|\u30AD\u30FC\u30EF\u30FC\u30C9"<br>\u4F8B: "spamuser|\u5BA3\u4F1D", "botname|\u544A\u77E5"<br><small>\u203B @\u30DE\u30FC\u30AF\u306F\u4E0D\u8981\u3067\u3059\u3002\u300C|\u300D\u3067\u533A\u5207\u3063\u3066\u304F\u3060\u3055\u3044</small></p>\r
            <textarea class="td-dialog-input" id="user-keyword-input" placeholder="\u30E6\u30FC\u30B6\u30FC\u540D|\u30AD\u30FC\u30EF\u30FC\u30C9" autocomplete="off" data-lpignore="true" data-form-type="other" data-1p-ignore rows="3"></textarea>\r
          </div>\r
          <div class="tab-content" id="user-regex-tab">\r
            <p class="td-dialog-message">\u7279\u5B9A\u30E6\u30FC\u30B6\u30FC\u3092\u6B63\u898F\u8868\u73FE\u3067\u30DF\u30E5\u30FC\u30C8\u3057\u307E\u3059<br>\u4F8B: "spam_.*", "bot[0-9]+"</p>\r
            <textarea class="td-dialog-input" id="user-regex-input" placeholder="\u30E6\u30FC\u30B6\u30FC\u540D\u30D1\u30BF\u30FC\u30F3\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044" autocomplete="off" data-lpignore="true" data-form-type="other" data-1p-ignore rows="3"></textarea>\r
          </div>\r
          <div class="tab-content" id="remove-tab">\r
            <p class="td-dialog-message">\u524A\u9664\u3059\u308B\u30D5\u30A3\u30EB\u30BF\u30FC\u6570\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044<br><small>phrase\u578B\u30D5\u30A3\u30EB\u30BF\u30FC\u3092\u53E4\u3044\u9806\u304B\u3089\u524A\u9664\u3057\u307E\u3059</small></p>\r
            <input type="number" class="td-dialog-input" id="remove-input" placeholder="\u524A\u9664\u6570\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044" min="1" autocomplete="off" data-lpignore="true" data-form-type="other" data-1p-ignore>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
    <div class="td-dialog-footer">\r
      <button class="td-dialog-cancel">\u30AD\u30E3\u30F3\u30BB\u30EB</button>\r
      <button class="td-dialog-confirm">\u5B9F\u884C</button>\r
    </div>\r
  </div>\r
</div>\r
\r
`;var N=`#td-mute-dialog.td-dialog-overlay {\r
  position: fixed !important;\r
  top: 0 !important;\r
  left: 0 !important;\r
  width: 100% !important;\r
  height: 100% !important;\r
  background-color: rgba(0, 0, 0, 0.5) !important;\r
  display: flex !important;\r
  justify-content: center !important;\r
  align-items: center !important;\r
  z-index: 10000 !important;\r
}\r
\r
#td-mute-dialog .td-dialog-container {\r
  background: #15202b !important;\r
  border: 1px solid #38444d !important;\r
  border-radius: 8px !important;\r
  min-width: 600px !important;\r
  max-width: 800px !important;\r
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4) !important;\r
  display: flex !important;\r
  flex-direction: column !important;\r
}\r
\r
.td-dialog-container .td-dialog-header {\r
  display: flex !important;\r
  justify-content: space-between !important;\r
  align-items: center !important;\r
  padding: 16px 20px !important;\r
  border-bottom: 1px solid #38444d !important;\r
  flex-shrink: 0 !important;\r
}\r
\r
.td-dialog-container .td-dialog-title {\r
  color: #fff !important;\r
  margin: 0 !important;\r
  font-size: 18px !important;\r
  font-weight: 600 !important;\r
}\r
\r
.td-dialog-container .td-dialog-close {\r
  background: none !important;\r
  border: none !important;\r
  color: #8b98a5 !important;\r
  font-size: 24px !important;\r
  cursor: pointer !important;\r
  padding: 0 !important;\r
  width: 32px !important;\r
  height: 32px !important;\r
  display: flex !important;\r
  align-items: center !important;\r
  justify-content: center !important;\r
  outline: none !important;\r
  text-decoration: none !important;\r
  box-shadow: none !important;\r
  border-radius: 0 !important;\r
}\r
\r
.td-dialog-container .td-dialog-close:hover {\r
  color: #fff !important;\r
}\r
\r
/* \u30E1\u30A4\u30F3\u30B3\u30F3\u30C6\u30F3\u30C4\u30A8\u30EA\u30A2\u306E\u5DE6\u53F3\u5206\u5272 */\r
.td-dialog-container .td-dialog-main {\r
  display: flex !important;\r
  flex: 1 !important;\r
  min-height: 300px !important;\r
}\r
\r
/* \u30B5\u30A4\u30C9\u30D0\u30FC\uFF08\u5DE6\u5074\u306E\u30BF\u30D6\u9818\u57DF\uFF09 */\r
.td-dialog-container .td-dialog-sidebar {\r
  width: 200px !important;\r
  background: #192734 !important;\r
  border-right: 1px solid #38444d !important;\r
  flex-shrink: 0 !important;\r
}\r
\r
.td-dialog-container .td-dialog-tabs {\r
  display: flex !important;\r
  flex-direction: column !important;\r
  padding: 0 !important;\r
  margin: 0 !important;\r
}\r
\r
.td-dialog-container .td-dialog-tab {\r
  padding: 16px 20px !important;\r
  background: #192734 !important;\r
  border: none !important;\r
  color: #8b98a5 !important;\r
  cursor: pointer !important;\r
  font-size: 14px !important;\r
  font-weight: 500 !important;\r
  text-align: left !important;\r
  transition: all 0.2s ease !important;\r
  border-bottom: 1px solid #38444d !important;\r
  position: relative !important;\r
  outline: none !important;\r
  text-decoration: none !important;\r
  box-shadow: none !important;\r
  border-radius: 0 !important;\r
}\r
\r
.td-dialog-container .td-dialog-tab:last-child {\r
  border-bottom: none !important;\r
}\r
\r
.td-dialog-container .td-dialog-tab.active {\r
  background: #15202b !important;\r
  color: #1d9bf0 !important;\r
}\r
\r
.td-dialog-container .td-dialog-tab.active::before {\r
  content: '' !important;\r
  position: absolute !important;\r
  left: 0 !important;\r
  top: 0 !important;\r
  bottom: 0 !important;\r
  width: 3px !important;\r
  background: #1d9bf0 !important;\r
}\r
\r
.td-dialog-container .td-dialog-tab:hover:not(.active) {\r
  background: #1c2732 !important;\r
  color: #fff !important;\r
}\r
\r
/* \u30B3\u30F3\u30C6\u30F3\u30C4\u30A8\u30EA\u30A2\uFF08\u53F3\u5074\u306E\u5165\u529B\u9818\u57DF\uFF09 */\r
.td-dialog-container .td-dialog-content {\r
  flex: 1 !important;\r
  display: flex !important;\r
  flex-direction: column !important;\r
}\r
\r
.td-dialog-container .td-dialog-body {\r
  padding: 20px !important;\r
  flex: 1 !important;\r
  display: flex !important;\r
  flex-direction: column !important;\r
}\r
\r
.td-dialog-container .td-dialog-message {\r
  color: #8b98a5 !important;\r
  margin: 0 0 16px 0 !important;\r
  font-size: 14px !important;\r
  line-height: 1.4 !important;\r
}\r
\r
.td-dialog-container .td-dialog-input {\r
  width: 100% !important;\r
  padding: 12px !important;\r
  background: #192734 !important;\r
  border: 1px solid #38444d !important;\r
  border-radius: 6px !important;\r
  color: #fff !important;\r
  font-size: 16px !important;\r
  outline: none !important;\r
  box-sizing: border-box !important;\r
  font-family: inherit !important;\r
}\r
\r
.td-dialog-container .td-dialog-input:focus {\r
  border-color: #1d9bf0 !important;\r
}\r
\r
/* textarea\u5C02\u7528\u30B9\u30BF\u30A4\u30EB - TweetDeck\u306ECSS\u3092\u5F37\u5236\u4E0A\u66F8\u304D */\r
.td-dialog-container textarea.td-dialog-input {\r
  min-height: 80px !important;\r
  max-height: 200px !important;\r
  height: auto !important;\r
  resize: vertical !important;\r
  line-height: 1.4 !important;\r
  white-space: pre-wrap !important;\r
  word-wrap: break-word !important;\r
  overflow-y: auto !important;\r
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;\r
}\r
\r
/* \u7279\u5B9A\u306Etextarea\u8981\u7D20\u306B\u30D5\u30A9\u30FC\u30AB\u30B9\u6642\u306E\u8FFD\u52A0\u30B9\u30BF\u30A4\u30EB */\r
.td-dialog-container textarea.td-dialog-input:focus {\r
  box-shadow: 0 0 0 2px rgba(29, 155, 240, 0.2) !important;\r
}\r
\r
.td-dialog-container .td-dialog-footer {\r
  display: flex !important;\r
  justify-content: flex-end !important;\r
  gap: 12px !important;\r
  padding: 16px 20px !important;\r
  border-top: 1px solid #38444d !important;\r
  flex-shrink: 0 !important;\r
}\r
\r
.td-dialog-container .td-dialog-cancel,\r
.td-dialog-container .td-dialog-confirm {\r
  padding: 8px 16px !important;\r
  border-radius: 6px !important;\r
  font-size: 14px !important;\r
  font-weight: 600 !important;\r
  cursor: pointer !important;\r
  border: none !important;\r
  min-width: 80px !important;\r
  outline: none !important;\r
  text-decoration: none !important;\r
  box-shadow: none !important;\r
  font-family: inherit !important;\r
}\r
\r
.td-dialog-container .td-dialog-cancel {\r
  background: transparent !important;\r
  color: #8b98a5 !important;\r
  border: 1px solid #38444d !important;\r
}\r
\r
.td-dialog-container .td-dialog-cancel:hover {\r
  background: #1c2732 !important;\r
}\r
\r
.td-dialog-container .td-dialog-confirm {\r
  background: #1d9bf0 !important;\r
  color: #fff !important;\r
}\r
\r
.td-dialog-container .td-dialog-confirm:hover {\r
  background: #1a8cd8 !important;\r
}\r
\r
.td-dialog-container .td-dialog-confirm:disabled {\r
  background: #3c4043 !important;\r
  color: #5f6368 !important;\r
  cursor: not-allowed !important;\r
}\r
\r
.td-dialog-container .tab-content {\r
  display: none !important;\r
  flex: 1 !important;\r
  flex-direction: column !important;\r
}\r
\r
.td-dialog-container .tab-content.active {\r
  display: flex !important;\r
}\r
\r
`;function U(){let t=document.createElement("div");return t.innerHTML=_,t.firstElementChild}function $(){if(!document.querySelector("style[data-td-dialog]")){let t=document.createElement("style");t.textContent=N,t.setAttribute("data-td-dialog","true"),document.head.appendChild(t)}}function J(){return new Promise((t,e)=>{let r=document.getElementById("td-mute-dialog");r&&r.remove(),r=U(),document.body.appendChild(r);let a=r.querySelector(".td-dialog-cancel"),o=r.querySelector(".td-dialog-confirm"),s=r.querySelector(".td-dialog-close"),g=r.querySelectorAll(".td-dialog-tab"),W=r.querySelectorAll(".tab-content"),c={phrase:r.querySelector("#phrase-input"),regex:r.querySelector("#regex-input"),url:r.querySelector("#url-input"),userKeyword:r.querySelector("#user-keyword-input"),userRegex:r.querySelector("#user-regex-input"),remove:r.querySelector("#remove-input")},m="phrase";g.forEach(i=>{i.addEventListener("click",()=>{let n=i.dataset.tab;m=n,g.forEach(p=>p.classList.remove("active")),i.classList.add("active"),W.forEach(p=>{p.classList.remove("active")}),r.querySelector(`#${n}-tab`).classList.add("active");let l=S();l&&setTimeout(()=>l.focus(),100)})});let S=()=>{switch(m){case"phrase":return c.phrase;case"regex":return c.regex;case"url":return c.url;case"user-keyword":return c.userKeyword;case"user-regex":return c.userRegex;case"remove":return c.remove;default:return null}},j=(i,n)=>{switch(i){case"phrase":case"regex":case"url":case"user-regex":return n.trim()!=="";case"user-keyword":let l=n.trim();if(l===""||!l.includes("|"))return!1;let p=l.split("|");return p.length===2&&p[0].trim()!==""&&p[1].trim()!=="";case"remove":return n.trim()!==""&&!isNaN(Number(n))&&Number(n)>0;default:return!1}},V=(i,n)=>{let l=n.trim();switch(i){case"phrase":case"url":case"user-keyword":case"user-regex":return l;case"regex":return`/${l}/`;case"remove":return Number(l);default:return l}};r.style.display="flex",setTimeout(()=>c.phrase.focus(),100);let I=()=>{r.remove()},K=()=>{let i=S();if(!i)return;let n=i.value;if(!j(m,n)){i.focus();return}if(I(),m==="remove")t({action:"remove",value:Number(n.trim())});else{let l=V(m,n);t({action:"add",value:l,type:m})}},f=()=>{I(),e(new Error("User cancelled"))};o.addEventListener("click",K),a.addEventListener("click",f),s.addEventListener("click",f),Object.values(c).forEach(i=>{i&&i.addEventListener("keydown",n=>{n.key==="Escape"&&f()})}),r.addEventListener("click",i=>{i.target===r&&f()})})}async function q(){console.log("[TD Mute Helper] showMuteDialog called");try{let t=await J();return console.log("[TD Mute Helper] showCustomDialog resolved with:",t),t}catch(t){throw console.log("[TD Mute Helper] showCustomDialog rejected:",t.message),t}}x();b();x();function u(t,e){try{TD.controller.filterManager.addFilter(t,e)}catch(r){return d(`\u30D5\u30A3\u30EB\u30BF\u30FC\u8FFD\u52A0\u306B\u5931\u6557\u3057\u307E\u3057\u305F (${t}: ${e})`,r),!1}return!0}function B(t){return t.match(/https?:\/\/t\.co\/(.+)/)?"url":t.match(/^\/.+\/$/)?"regex":t.match(/^@@.+/)?"userKeyword":t.match(/^@.+/)?"userRegex":"phrase"}function T(t){try{if(!t||t.trim()==="")throw new Error(`URL\u304C\u7A7A\u3067\u3059\u3002
\u6709\u52B9\u306AURL\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002
\u4F8B: "https://example.com"`);try{new URL(t)}catch(r){let a=t.match(/https?:\/\/t\.co\/(.+)/);if(!a||!a[1]||a[1].length===0)throw new Error(`\u7121\u52B9\u306AURL\u5F62\u5F0F\u3067\u3059: "${t}"
\u6B63\u3057\u3044URL\u5F62\u5F0F\u3067\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002
\u4F8B: "https://example.com", "https://t.co/abc123"`)}let e=t.match(/https?:\/\/t\.co\/(.+)/);e&&e[1].length>0?u("phrase",e[1]):u("phrase",t)}catch(e){throw e.message.includes("URL")?e:new Error(`URL\u30DF\u30E5\u30FC\u30C8\u306E\u8FFD\u52A0\u306B\u5931\u6557\u3057\u307E\u3057\u305F: ${e.message}`)}}function D(t){try{let e;if(t.startsWith("/")&&t.endsWith("/")){let r=t.match(/^\/(.*)\/$/);e=r?r[1]:""}else e=t;if(!e||e.trim()==="")throw new Error(`\u6B63\u898F\u8868\u73FE\u30D1\u30BF\u30FC\u30F3\u304C\u7A7A\u3067\u3059\u3002
\u6709\u52B9\u306A\u30D1\u30BF\u30FC\u30F3\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002
\u4F8B: "RT.*\u30BB\u30FC\u30EB", ".*\u9650\u5B9A.*"`);try{new RegExp(e)}catch(r){throw new Error(`\u6B63\u898F\u8868\u73FE\u30D1\u30BF\u30FC\u30F3\u304C\u7121\u52B9\u3067\u3059: "${e}"
\u6B63\u3057\u3044\u6B63\u898F\u8868\u73FE\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002
\u4F8B: "RT.*\u30BB\u30FC\u30EB", ".*\u9650\u5B9A.*"`)}u("BTD_regex",e)}catch(e){throw e.message.includes("\u6B63\u898F\u8868\u73FE")?e:new Error(`\u6B63\u898F\u8868\u73FE\u30DF\u30E5\u30FC\u30C8\u306E\u8FFD\u52A0\u306B\u5931\u6557\u3057\u307E\u3057\u305F: ${e.message}`)}}function L(t){try{let e;if(t.startsWith("@@")?e=t.match(/^@@(.+)/)[1]:e=t,!e.includes("|"))throw new Error(`\u30E6\u30FC\u30B6\u30FC\u30AD\u30FC\u30EF\u30FC\u30C9\u5F62\u5F0F\u304C\u6B63\u3057\u304F\u3042\u308A\u307E\u305B\u3093\u3002
\u6B63\u3057\u3044\u5F62\u5F0F: "\u30E6\u30FC\u30B6\u30FC\u540D|\u30AD\u30FC\u30EF\u30FC\u30C9"
\u4F8B: "spamuser|\u5E83\u544A"`);let r=e.split("|");if(r.length!==2||r[0].trim()===""||r[1].trim()==="")throw new Error(`\u30E6\u30FC\u30B6\u30FC\u30AD\u30FC\u30EF\u30FC\u30C9\u5F62\u5F0F\u304C\u6B63\u3057\u304F\u3042\u308A\u307E\u305B\u3093\u3002
\u30E6\u30FC\u30B6\u30FC\u540D\u3068\u30AD\u30FC\u30EF\u30FC\u30C9\u306E\u4E21\u65B9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002
\u4F8B: "spamuser|\u5E83\u544A"`);u("BTD_mute_user_keyword",e)}catch(e){throw e.message.includes("\u30E6\u30FC\u30B6\u30FC\u30AD\u30FC\u30EF\u30FC\u30C9\u5F62\u5F0F")?e:new Error(`\u30E6\u30FC\u30B6\u30FC\u30AD\u30FC\u30EF\u30FC\u30C9\u30DF\u30E5\u30FC\u30C8\u306E\u8FFD\u52A0\u306B\u5931\u6557\u3057\u307E\u3057\u305F: ${e.message}`)}}async function R(t){try{let{getDuplication:e}=await Promise.resolve().then(()=>(z(),H)),{sleep:r}=await Promise.resolve().then(()=>(O(),C)),{DELAY_BETWEEN_OPERATIONS:a}=await Promise.resolve().then(()=>(b(),A)),o=e();if(o.length>0)try{TD.controller.filterManager.removeFilter(o[0]),await r(a)}catch(g){d("\u91CD\u8907\u30D5\u30A3\u30EB\u30BF\u30FC\u524A\u9664\u306B\u5931\u6557\u3057\u307E\u3057\u305F",g)}let s;if(t.startsWith("@")?s=t.match(/^@(.+)/)[1]:s=t,!s||s.trim()==="")throw new Error(`\u30E6\u30FC\u30B6\u30FC\u540D\u304C\u7A7A\u3067\u3059\u3002
\u6709\u52B9\u306A\u30E6\u30FC\u30B6\u30FC\u540D\u30D1\u30BF\u30FC\u30F3\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002
\u4F8B: "spam_.*", "bot[0-9]+"`);try{new RegExp(s)}catch(g){throw new Error(`\u30E6\u30FC\u30B6\u30FC\u540D\u30D1\u30BF\u30FC\u30F3\u304C\u7121\u52B9\u3067\u3059: "${s}"
\u6B63\u3057\u3044\u6B63\u898F\u8868\u73FE\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002
\u4F8B: "spam_.*", "bot[0-9]+"`)}u("BTD_user_regex",s)}catch(e){throw e.message.includes("\u30E6\u30FC\u30B6\u30FC\u540D")?e:new Error(`\u30E6\u30FC\u30B6\u30FC\u6B63\u898F\u8868\u73FE\u30DF\u30E5\u30FC\u30C8\u306E\u8FFD\u52A0\u306B\u5931\u6557\u3057\u307E\u3057\u305F: ${e.message}`)}}function y(t){try{if(!t||t.trim()==="")throw new Error(`\u30AD\u30FC\u30EF\u30FC\u30C9\u304C\u7A7A\u3067\u3059\u3002
\u6709\u52B9\u306A\u30AD\u30FC\u30EF\u30FC\u30C9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002
\u4F8B: "\u30B9\u30D1\u30E0", "\u5E83\u544A"`);let e=t.trim();if(e.length<2)throw new Error(`\u30AD\u30FC\u30EF\u30FC\u30C9\u304C\u77ED\u3059\u304E\u307E\u3059\u3002
2\u6587\u5B57\u4EE5\u4E0A\u306E\u30AD\u30FC\u30EF\u30FC\u30C9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002
\u4F8B: "\u30B9\u30D1\u30E0", "\u5E83\u544A"`);u("phrase",e)}catch(e){throw e.message.includes("\u30AD\u30FC\u30EF\u30FC\u30C9")?e:new Error(`\u30D5\u30EC\u30FC\u30BA\u30DF\u30E5\u30FC\u30C8\u306E\u8FFD\u52A0\u306B\u5931\u6557\u3057\u307E\u3057\u305F: ${e.message}`)}}async function P(t,e=null){try{if(e)switch(e){case"phrase":y(t);break;case"regex":D(t);break;case"url":T(t);break;case"user-keyword":L(t);break;case"user-regex":await R(t);break;default:y(t);break}else switch(B(t)){case"url":T(t);break;case"regex":D(t);break;case"userKeyword":L(t);break;case"userRegex":await R(t);break;case"phrase":default:y(t);break}return!0}catch(r){return r.message.includes("\u5F62\u5F0F\u304C\u6B63\u3057\u304F\u3042\u308A\u307E\u305B\u3093")||r.message.includes("\u304C\u7A7A\u3067\u3059")||r.message.includes("\u304C\u77ED\u3059\u304E\u307E\u3059")||r.message.includes("\u304C\u7121\u52B9\u3067\u3059")||r.message.includes("\u7121\u52B9\u306AURL\u5F62\u5F0F")||r.message.includes("\u7121\u52B9\u306A\u6B63\u898F\u8868\u73FE")?d("\u5165\u529B\u5F62\u5F0F\u30A8\u30E9\u30FC",r):d(`\u30DF\u30E5\u30FC\u30C8\u30D5\u30A3\u30EB\u30BF\u30FC\u8FFD\u52A0\u51E6\u7406\u3067\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F: "${t}"`,r),!1}}function M(t){if(!(t<=0))try{var e=TD.controller.filterManager.getAll(),r=e.filter(function(o){return o.type=="phrase"});if(r.length===0){console.log("\u524A\u9664\u5BFE\u8C61\u306E\u30D5\u30A3\u30EB\u30BF\u30FC\u304C\u3042\u308A\u307E\u305B\u3093");return}var a=r[0];console.log(t),console.log(r.length+"/"+e.length),TD.controller.filterManager.removeFilter(a),setTimeout(function(){M(t-1)},2e4)}catch(o){d(`\u30D5\u30A3\u30EB\u30BF\u30FC\u524A\u9664\u306B\u5931\u6557\u3057\u307E\u3057\u305F (\u6B8B\u308A${t}\u500B)`,o)}}function F(){setTimeout(function(){console.log("loaded"),console.log(`[TD Mute Helper] version ${w} loaded`),$(),document.querySelectorAll(".visible-in-contracted-header").forEach(e=>{e.addEventListener("click",async function(r){console.log("[TD Mute Helper] Click event triggered");try{let a=TD.controller.filterManager.getAll().length;console.log("[TD Mute Helper] Showing unified dialog");let o=await q();console.log("[TD Mute Helper] Dialog result:",o),o.action==="add"&&o.value?await P(o.value,o.type):o.action==="remove"&&o.value&&M(o.value)}catch(a){console.log("[TD Mute Helper] Dialog cancelled or error:",a.message)}}),e.addEventListener("contextmenu",r=>{r.preventDefault()})})},3e4)}(function(){"use strict";F()})();})();
