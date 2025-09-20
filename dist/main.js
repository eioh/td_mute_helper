// ==UserScript==
// @name td_mute_helper
// @namespace http://tampermonkey.net/
// @version 0.7.2
// @description try to take over the world!
// @author You
// @match https://tweetdeck.twitter.com
// @match https://twitter.com/i/tweetdeck
// @match https://x.com/i/tweetdeck
// @updateURL https://raw.githubusercontent.com/eioh/td_mute_helper/main/dist/main.js
// @downloadURL https://raw.githubusercontent.com/eioh/td_mute_helper/main/dist/main.js
// ==/UserScript==

(()=>{var Q=Object.defineProperty;var b=(t,e)=>()=>(t&&(e=t(t=0)),e);var w=(t,e)=>{for(var r in e)Q(t,r,{get:e[r],enumerable:!0})};var $={};w($,{DELAY_BETWEEN_OPERATIONS:()=>k,INITIALIZATION_DELAY:()=>T,VERSION:()=>E});var E,k,T,x=b(()=>{E="0.7.2",k=2e4,T=3e4});function d(t,e){console.error(`[TD Mute Helper] ${t}:`,e),alert(`\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F: ${t}`)}var y=b(()=>{});var B={};w(B,{getDuplication:()=>rt});function rt(){try{let t=TD.controller.filterManager.getAll(),e=t.length,r=[];for(let i=0;i<e;i++)for(let a=i+1;a<e;a++)t[i].type==t[a].type&&t[i].value==t[a].value&&r.push(t[i]);return r}catch(t){return d("\u91CD\u8907\u30D5\u30A3\u30EB\u30BF\u30FC\u691C\u7D22\u306B\u5931\u6557\u3057\u307E\u3057\u305F",t),[]}}var O=b(()=>{y()});var F={};w(F,{sleep:()=>ot});var ot,P=b(()=>{ot=t=>new Promise(e=>setTimeout(e,t))});x();var N=`<div id="td-mute-dialog" class="td-dialog-overlay" style="display: none;">\r
  <div class="td-dialog-container">\r
    <div class="td-dialog-header">\r
      <h3 class="td-dialog-title">\u30DF\u30E5\u30FC\u30C8\u8A2D\u5B9A <span class="td-dialog-title-count"></span></h3>\r
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
`;var z=`#td-mute-dialog.td-dialog-overlay {\r
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
/* \u30BF\u30A4\u30C8\u30EB\u6A2A\u306E\u4EF6\u6570\u8868\u793A */\r
.td-dialog-container .td-dialog-title-count {\r
  color: #8b98a5 !important; /* \u8584\u3044\u30B0\u30EC\u30FC */\r
  font-size: 0.9em !important; /* \u30BF\u30A4\u30C8\u30EB\u3088\u308A\u5C11\u3057\u5C0F\u3055\u3081 */\r
  margin-left: 8px !important;\r
}\r
\r
/* \u30BF\u30D6\u306E\u4EF6\u6570\u8868\u793A */\r
.td-dialog-container .td-dialog-tab .td-tab-count {\r
  color: #8b98a5 !important;\r
  font-size: 0.9em !important;\r
  margin-left: 6px !important;\r
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
`;function q(){let t=document.createElement("div");return t.innerHTML=N,t.firstElementChild}function C(){if(!document.querySelector("style[data-td-dialog]")){let t=document.createElement("style");t.textContent=z,t.setAttribute("data-td-dialog","true"),document.head.appendChild(t)}}function et(){return new Promise((t,e)=>{let r=document.getElementById("td-mute-dialog");r&&r.remove(),r=q(),document.body.appendChild(r);let i=r.querySelector(".td-dialog-title-count"),a=()=>{var n;try{if(!i)return;let o=((n=TD.controller.filterManager.getAll())==null?void 0:n.length)||0;i.textContent=`(${o}\u4EF6)`}catch(o){console.log(`[TD Mute Helper] \u30D5\u30A3\u30EB\u30BF\u30FC\u4EF6\u6570\u306E\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F: ${o.message}`)}};a(),setTimeout(a,200),setTimeout(a,800);let c=r.querySelector(".td-dialog-cancel"),f=r.querySelector(".td-dialog-confirm"),K=r.querySelector(".td-dialog-close"),A=r.querySelectorAll(".td-dialog-tab"),Y=r.querySelectorAll(".tab-content"),p={phrase:r.querySelector("#phrase-input"),regex:r.querySelector("#regex-input"),url:r.querySelector("#url-input"),userKeyword:r.querySelector("#user-keyword-input"),userRegex:r.querySelector("#user-regex-input"),remove:r.querySelector("#remove-input")},m="phrase";A.forEach(n=>{n.addEventListener("click",()=>{let o=n.dataset.tab;m=o,A.forEach(s=>s.classList.remove("active")),n.classList.add("active"),Y.forEach(s=>{s.classList.remove("active")}),r.querySelector(`#${o}-tab`).classList.add("active");let l=U();l&&setTimeout(()=>l.focus(),100)})});let U=()=>{switch(m){case"phrase":return p.phrase;case"regex":return p.regex;case"url":return p.url;case"user-keyword":return p.userKeyword;case"user-regex":return p.userRegex;case"remove":return p.remove;default:return null}},_=n=>{try{let o=new URL(n),l=(o.hostname||"").toLowerCase();if(!(l==="twitter.com"||l==="www.twitter.com"||l==="x.com"||l==="www.x.com"))return null;let s=o.pathname.split("/").filter(Boolean);if(s.length===0)return null;let u=s[0];return/^[A-Za-z0-9_]{1,15}$/.test(u)?u:null}catch(o){return null}},Z=(n,o)=>{switch(n){case"phrase":case"regex":case"url":return o.trim()!=="";case"user-regex":{let u=o.trim();return u===""?!1:/^https?:\/\//i.test(u)&&!_(u)?(alert(`\u7121\u52B9\u306AURL\u3067\u3059\u3002\u6B21\u306E\u5F62\u5F0F\u3067\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044:
https://twitter.com/<\u30E6\u30FC\u30B6\u30FC\u540D>/... \u307E\u305F\u306F https://x.com/<\u30E6\u30FC\u30B6\u30FC\u540D>/...`),!1):!0}case"user-keyword":let l=o.trim();if(l===""||!l.includes("|"))return!1;let s=l.split("|");return s.length===2&&s[0].trim()!==""&&s[1].trim()!=="";case"remove":return o.trim()!==""&&!isNaN(Number(o))&&Number(o)>0;default:return!1}},G=(n,o)=>{let l=o.trim();switch(n){case"phrase":case"url":case"user-keyword":case"user-regex":{if(/^https?:\/\//i.test(l)){let s=_(l);if(s)return s}return l}case"regex":return`/${l}/`;case"remove":return Number(l);default:return l}};r.style.display="flex",setTimeout(()=>p.phrase.focus(),100);let I=()=>{r.remove()},J=()=>{let n=U();if(!n)return;let o=n.value;if(!Z(m,o)){n.focus();return}if(I(),m==="remove")t({action:"remove",value:Number(o.trim())});else{let l=G(m,o);t({action:"add",value:l,type:m})}},h=()=>{I(),e(new Error("User cancelled"))};f.addEventListener("click",J),c.addEventListener("click",h),K.addEventListener("click",h),Object.values(p).forEach(n=>{n&&n.addEventListener("keydown",o=>{o.key==="Escape"&&h()})}),r.addEventListener("click",n=>{n.target===r&&h()})})}async function H(){console.log("[TD Mute Helper] showMuteDialog called");try{let t=await et();return console.log("[TD Mute Helper] showCustomDialog resolved with:",t),t}catch(t){throw console.log("[TD Mute Helper] showCustomDialog rejected:",t.message),t}}y();x();y();function g(t,e){try{TD.controller.filterManager.addFilter(t,e)}catch(r){return d(`\u30D5\u30A3\u30EB\u30BF\u30FC\u8FFD\u52A0\u306B\u5931\u6557\u3057\u307E\u3057\u305F (${t}: ${e})`,r),!1}return!0}function W(t){return t.match(/https?:\/\/t\.co\/(.+)/)?"url":t.match(/^\/.+\/$/)?"regex":t.match(/^@@.+/)?"userKeyword":t.match(/^@.+/)?"userRegex":"phrase"}function D(t){try{if(!t||t.trim()==="")throw new Error(`URL\u304C\u7A7A\u3067\u3059\u3002
\u6709\u52B9\u306AURL\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002
\u4F8B: "https://example.com"`);try{new URL(t)}catch(r){let i=t.match(/https?:\/\/t\.co\/(.+)/);if(!i||!i[1]||i[1].length===0)throw new Error(`\u7121\u52B9\u306AURL\u5F62\u5F0F\u3067\u3059: "${t}"
\u6B63\u3057\u3044URL\u5F62\u5F0F\u3067\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002
\u4F8B: "https://example.com", "https://t.co/abc123"`)}let e=t.match(/https?:\/\/t\.co\/(.+)/);e&&e[1].length>0?g("phrase",e[1]):g("phrase",t)}catch(e){throw e.message.includes("URL")?e:new Error(`URL\u30DF\u30E5\u30FC\u30C8\u306E\u8FFD\u52A0\u306B\u5931\u6557\u3057\u307E\u3057\u305F: ${e.message}`)}}function L(t){try{let e;if(t.startsWith("/")&&t.endsWith("/")){let r=t.match(/^\/(.*)\/$/);e=r?r[1]:""}else e=t;if(!e||e.trim()==="")throw new Error(`\u6B63\u898F\u8868\u73FE\u30D1\u30BF\u30FC\u30F3\u304C\u7A7A\u3067\u3059\u3002
\u6709\u52B9\u306A\u30D1\u30BF\u30FC\u30F3\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002
\u4F8B: "RT.*\u30BB\u30FC\u30EB", ".*\u9650\u5B9A.*"`);try{new RegExp(e)}catch(r){throw new Error(`\u6B63\u898F\u8868\u73FE\u30D1\u30BF\u30FC\u30F3\u304C\u7121\u52B9\u3067\u3059: "${e}"
\u6B63\u3057\u3044\u6B63\u898F\u8868\u73FE\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002
\u4F8B: "RT.*\u30BB\u30FC\u30EB", ".*\u9650\u5B9A.*"`)}g("BTD_regex",e)}catch(e){throw e.message.includes("\u6B63\u898F\u8868\u73FE")?e:new Error(`\u6B63\u898F\u8868\u73FE\u30DF\u30E5\u30FC\u30C8\u306E\u8FFD\u52A0\u306B\u5931\u6557\u3057\u307E\u3057\u305F: ${e.message}`)}}function R(t){try{let e;if(t.startsWith("@@")?e=t.match(/^@@(.+)/)[1]:e=t,!e.includes("|"))throw new Error(`\u30E6\u30FC\u30B6\u30FC\u30AD\u30FC\u30EF\u30FC\u30C9\u5F62\u5F0F\u304C\u6B63\u3057\u304F\u3042\u308A\u307E\u305B\u3093\u3002
\u6B63\u3057\u3044\u5F62\u5F0F: "\u30E6\u30FC\u30B6\u30FC\u540D|\u30AD\u30FC\u30EF\u30FC\u30C9"
\u4F8B: "spamuser|\u5E83\u544A"`);let r=e.split("|");if(r.length!==2||r[0].trim()===""||r[1].trim()==="")throw new Error(`\u30E6\u30FC\u30B6\u30FC\u30AD\u30FC\u30EF\u30FC\u30C9\u5F62\u5F0F\u304C\u6B63\u3057\u304F\u3042\u308A\u307E\u305B\u3093\u3002
\u30E6\u30FC\u30B6\u30FC\u540D\u3068\u30AD\u30FC\u30EF\u30FC\u30C9\u306E\u4E21\u65B9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002
\u4F8B: "spamuser|\u5E83\u544A"`);g("BTD_mute_user_keyword",e)}catch(e){throw e.message.includes("\u30E6\u30FC\u30B6\u30FC\u30AD\u30FC\u30EF\u30FC\u30C9\u5F62\u5F0F")?e:new Error(`\u30E6\u30FC\u30B6\u30FC\u30AD\u30FC\u30EF\u30FC\u30C9\u30DF\u30E5\u30FC\u30C8\u306E\u8FFD\u52A0\u306B\u5931\u6557\u3057\u307E\u3057\u305F: ${e.message}`)}}async function M(t){try{let{getDuplication:e}=await Promise.resolve().then(()=>(O(),B)),{sleep:r}=await Promise.resolve().then(()=>(P(),F)),{DELAY_BETWEEN_OPERATIONS:i}=await Promise.resolve().then(()=>(x(),$)),a=e();if(a.length>0)try{TD.controller.filterManager.removeFilter(a[0]),await r(i)}catch(f){d("\u91CD\u8907\u30D5\u30A3\u30EB\u30BF\u30FC\u524A\u9664\u306B\u5931\u6557\u3057\u307E\u3057\u305F",f)}let c;if(t.startsWith("@")?c=t.match(/^@(.+)/)[1]:c=t,!c||c.trim()==="")throw new Error(`\u30E6\u30FC\u30B6\u30FC\u540D\u304C\u7A7A\u3067\u3059\u3002
\u6709\u52B9\u306A\u30E6\u30FC\u30B6\u30FC\u540D\u30D1\u30BF\u30FC\u30F3\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002
\u4F8B: "spam_.*", "bot[0-9]+"`);try{new RegExp(c)}catch(f){throw new Error(`\u30E6\u30FC\u30B6\u30FC\u540D\u30D1\u30BF\u30FC\u30F3\u304C\u7121\u52B9\u3067\u3059: "${c}"
\u6B63\u3057\u3044\u6B63\u898F\u8868\u73FE\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002
\u4F8B: "spam_.*", "bot[0-9]+"`)}g("BTD_user_regex",c)}catch(e){throw e.message.includes("\u30E6\u30FC\u30B6\u30FC\u540D")?e:new Error(`\u30E6\u30FC\u30B6\u30FC\u6B63\u898F\u8868\u73FE\u30DF\u30E5\u30FC\u30C8\u306E\u8FFD\u52A0\u306B\u5931\u6557\u3057\u307E\u3057\u305F: ${e.message}`)}}function v(t){try{if(!t||t.trim()==="")throw new Error(`\u30AD\u30FC\u30EF\u30FC\u30C9\u304C\u7A7A\u3067\u3059\u3002
\u6709\u52B9\u306A\u30AD\u30FC\u30EF\u30FC\u30C9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002
\u4F8B: "\u30B9\u30D1\u30E0", "\u5E83\u544A"`);let e=t.trim();if(e.length<2)throw new Error(`\u30AD\u30FC\u30EF\u30FC\u30C9\u304C\u77ED\u3059\u304E\u307E\u3059\u3002
2\u6587\u5B57\u4EE5\u4E0A\u306E\u30AD\u30FC\u30EF\u30FC\u30C9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002
\u4F8B: "\u30B9\u30D1\u30E0", "\u5E83\u544A"`);g("phrase",e)}catch(e){throw e.message.includes("\u30AD\u30FC\u30EF\u30FC\u30C9")?e:new Error(`\u30D5\u30EC\u30FC\u30BA\u30DF\u30E5\u30FC\u30C8\u306E\u8FFD\u52A0\u306B\u5931\u6557\u3057\u307E\u3057\u305F: ${e.message}`)}}async function j(t,e=null){try{if(e)switch(e){case"phrase":v(t);break;case"regex":L(t);break;case"url":D(t);break;case"user-keyword":R(t);break;case"user-regex":await M(t);break;default:v(t);break}else switch(W(t)){case"url":D(t);break;case"regex":L(t);break;case"userKeyword":R(t);break;case"userRegex":await M(t);break;case"phrase":default:v(t);break}return!0}catch(r){return r.message.includes("\u5F62\u5F0F\u304C\u6B63\u3057\u304F\u3042\u308A\u307E\u305B\u3093")||r.message.includes("\u304C\u7A7A\u3067\u3059")||r.message.includes("\u304C\u77ED\u3059\u304E\u307E\u3059")||r.message.includes("\u304C\u7121\u52B9\u3067\u3059")||r.message.includes("\u7121\u52B9\u306AURL\u5F62\u5F0F")||r.message.includes("\u7121\u52B9\u306A\u6B63\u898F\u8868\u73FE")?d("\u5165\u529B\u5F62\u5F0F\u30A8\u30E9\u30FC",r):d(`\u30DF\u30E5\u30FC\u30C8\u30D5\u30A3\u30EB\u30BF\u30FC\u8FFD\u52A0\u51E6\u7406\u3067\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F: "${t}"`,r),!1}}function S(t){if(!(t<=0))try{var e=TD.controller.filterManager.getAll(),r=e.filter(function(a){return a.type=="phrase"});if(r.length===0){console.log("\u524A\u9664\u5BFE\u8C61\u306E\u30D5\u30A3\u30EB\u30BF\u30FC\u304C\u3042\u308A\u307E\u305B\u3093");return}var i=r[0];console.log(t),console.log(r.length+"/"+e.length),TD.controller.filterManager.removeFilter(i),setTimeout(function(){S(t-1)},2e4)}catch(a){d(`\u30D5\u30A3\u30EB\u30BF\u30FC\u524A\u9664\u306B\u5931\u6557\u3057\u307E\u3057\u305F (\u6B8B\u308A${t}\u500B)`,a)}}function V(){setTimeout(function(){console.log("loaded"),console.log(`[TD Mute Helper] version ${E} loaded`),C(),document.querySelectorAll(".visible-in-contracted-header").forEach(e=>{e.addEventListener("click",async function(r){console.log("[TD Mute Helper] Click event triggered");try{let i=TD.controller.filterManager.getAll().length;console.log("[TD Mute Helper] Showing unified dialog");let a=await H();console.log("[TD Mute Helper] Dialog result:",a),a.action==="add"&&a.value?await j(a.value,a.type):a.action==="remove"&&a.value&&S(a.value)}catch(i){console.log("[TD Mute Helper] Dialog cancelled or error:",i.message)}}),e.addEventListener("contextmenu",r=>{r.preventDefault()})})},3e4)}(function(){"use strict";V()})();})();
