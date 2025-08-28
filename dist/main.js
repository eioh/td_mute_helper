// ==UserScript==
// @name td_mute_helper
// @namespace http://tampermonkey.net/
// @version 0.5
// @description try to take over the world!
// @author You
// @match https://tweetdeck.twitter.com
// @match https://twitter.com/i/tweetdeck
// @match https://x.com/i/tweetdeck
// @updateURL https://raw.githubusercontent.com/eioh/td_mute_helper/main/dist/main.js
// @downloadURL https://raw.githubusercontent.com/eioh/td_mute_helper/main/dist/main.js
// ==/UserScript==
(()=>{var Y=Object.defineProperty;var f=(t,e)=>()=>(t&&(e=t(t=0)),e);var v=(t,e)=>{for(var o in e)Y(t,o,{get:e[o],enumerable:!0})};var S={};v(S,{DELAY_BETWEEN_OPERATIONS:()=>E,INITIALIZATION_DELAY:()=>D,VERSION:()=>w});var w,E,D,b=f(()=>{w="0.5",E=2e4,D=3e4});function s(t,e){console.error(`[TD Mute Helper] ${t}:`,e),alert(`\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F: ${t}`)}var x=f(()=>{});var q={};v(q,{getDuplication:()=>Z});function Z(){try{let t=TD.controller.filterManager.getAll(),e=t.length,o=[];for(let l=0;l<e;l++)for(let r=l+1;r<e;r++)t[l].type==t[r].type&&t[l].value==t[r].value&&o.push(t[l]);return o}catch(t){return s("\u91CD\u8907\u30D5\u30A3\u30EB\u30BF\u30FC\u691C\u7D22\u306B\u5931\u6557\u3057\u307E\u3057\u305F",t),[]}}var _=f(()=>{x()});var H={};v(H,{sleep:()=>G});var G,$=f(()=>{G=t=>new Promise(e=>setTimeout(e,t))});b();function A(){let t=`
        #td-mute-dialog.td-dialog-overlay {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background-color: rgba(0, 0, 0, 0.5) !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            z-index: 10000 !important;
        }

        #td-mute-dialog .td-dialog-container {
            background: #15202b !important;
            border: 1px solid #38444d !important;
            border-radius: 8px !important;
            min-width: 600px !important;
            max-width: 800px !important;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4) !important;
            display: flex !important;
            flex-direction: column !important;
        }

        .td-dialog-container .td-dialog-header {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            padding: 16px 20px !important;
            border-bottom: 1px solid #38444d !important;
            flex-shrink: 0 !important;
        }

        .td-dialog-container .td-dialog-title {
            color: #fff !important;
            margin: 0 !important;
            font-size: 18px !important;
            font-weight: 600 !important;
        }

        .td-dialog-container .td-dialog-close {
            background: none !important;
            border: none !important;
            color: #8b98a5 !important;
            font-size: 24px !important;
            cursor: pointer !important;
            padding: 0 !important;
            width: 32px !important;
            height: 32px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            outline: none !important;
            text-decoration: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
        }

        .td-dialog-container .td-dialog-close:hover {
            color: #fff !important;
        }

        /* \u30E1\u30A4\u30F3\u30B3\u30F3\u30C6\u30F3\u30C4\u30A8\u30EA\u30A2\uFF08\u5DE6\u53F3\u5206\u5272\uFF09 */
        .td-dialog-container .td-dialog-main {
            display: flex !important;
            flex: 1 !important;
            min-height: 300px !important;
        }

        /* \u30B5\u30A4\u30C9\u30D0\u30FC\uFF08\u5DE6\u5074\u306E\u30BF\u30D6\u9818\u57DF\uFF09 */
        .td-dialog-container .td-dialog-sidebar {
            width: 200px !important;
            background: #192734 !important;
            border-right: 1px solid #38444d !important;
            flex-shrink: 0 !important;
        }

        .td-dialog-container .td-dialog-tabs {
            display: flex !important;
            flex-direction: column !important;
            padding: 0 !important;
            margin: 0 !important;
        }

        .td-dialog-container .td-dialog-tab {
            padding: 16px 20px !important;
            background: #192734 !important;
            border: none !important;
            color: #8b98a5 !important;
            cursor: pointer !important;
            font-size: 14px !important;
            font-weight: 500 !important;
            text-align: left !important;
            transition: all 0.2s ease !important;
            border-bottom: 1px solid #38444d !important;
            position: relative !important;
            outline: none !important;
            text-decoration: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
        }

        .td-dialog-container .td-dialog-tab:last-child {
            border-bottom: none !important;
        }

        .td-dialog-container .td-dialog-tab.active {
            background: #15202b !important;
            color: #1d9bf0 !important;
        }

        .td-dialog-container .td-dialog-tab.active::before {
            content: '' !important;
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            bottom: 0 !important;
            width: 3px !important;
            background: #1d9bf0 !important;
        }

        .td-dialog-container .td-dialog-tab:hover:not(.active) {
            background: #1c2732 !important;
            color: #fff !important;
        }

        /* \u30B3\u30F3\u30C6\u30F3\u30C4\u30A8\u30EA\u30A2\uFF08\u53F3\u5074\u306E\u5165\u529B\u9818\u57DF\uFF09 */
        .td-dialog-container .td-dialog-content {
            flex: 1 !important;
            display: flex !important;
            flex-direction: column !important;
        }

        .td-dialog-container .td-dialog-body {
            padding: 20px !important;
            flex: 1 !important;
            display: flex !important;
            flex-direction: column !important;
        }

        .td-dialog-container .td-dialog-message {
            color: #8b98a5 !important;
            margin: 0 0 16px 0 !important;
            font-size: 14px !important;
            line-height: 1.4 !important;
        }

        .td-dialog-container .td-dialog-input {
            width: 100% !important;
            padding: 12px !important;
            background: #192734 !important;
            border: 1px solid #38444d !important;
            border-radius: 6px !important;
            color: #fff !important;
            font-size: 16px !important;
            outline: none !important;
            box-sizing: border-box !important;
            font-family: inherit !important;
        }

        .td-dialog-container .td-dialog-input:focus {
            border-color: #1d9bf0 !important;
        }

        .td-dialog-container .td-dialog-footer {
            display: flex !important;
            justify-content: flex-end !important;
            gap: 12px !important;
            padding: 16px 20px !important;
            border-top: 1px solid #38444d !important;
            flex-shrink: 0 !important;
        }

        .td-dialog-container .td-dialog-cancel,
        .td-dialog-container .td-dialog-confirm {
            padding: 8px 16px !important;
            border-radius: 6px !important;
            font-size: 14px !important;
            font-weight: 600 !important;
            cursor: pointer !important;
            border: none !important;
            min-width: 80px !important;
            outline: none !important;
            text-decoration: none !important;
            box-shadow: none !important;
            font-family: inherit !important;
        }

        .td-dialog-container .td-dialog-cancel {
            background: transparent !important;
            color: #8b98a5 !important;
            border: 1px solid #38444d !important;
        }

        .td-dialog-container .td-dialog-cancel:hover {
            background: #1c2732 !important;
        }

        .td-dialog-container .td-dialog-confirm {
            background: #1d9bf0 !important;
            color: #fff !important;
        }

        .td-dialog-container .td-dialog-confirm:hover {
            background: #1a8cd8 !important;
        }

        .td-dialog-container .td-dialog-confirm:disabled {
            background: #3c4043 !important;
            color: #5f6368 !important;
            cursor: not-allowed !important;
        }

        .td-dialog-container .tab-content {
            display: none !important;
            flex: 1 !important;
            flex-direction: column !important;
        }

        .td-dialog-container .tab-content.active {
            display: flex !important;
        }
    `,e=document.createElement("style");e.textContent=t,document.head.appendChild(e)}function I(){let t=`
        <div id="td-mute-dialog" class="td-dialog-overlay" style="display: none;">
            <div class="td-dialog-container">
                <div class="td-dialog-header">
                    <h3 class="td-dialog-title">\u30DF\u30E5\u30FC\u30C8\u8A2D\u5B9A</h3>
                    <button class="td-dialog-close">&times;</button>
                </div>
                <div class="td-dialog-main">
                    <div class="td-dialog-sidebar">
                        <nav class="td-dialog-tabs">
                            <button class="td-dialog-tab active" data-tab="phrase">\u30D5\u30EC\u30FC\u30BA</button>
                            <button class="td-dialog-tab" data-tab="regex">\u6B63\u898F\u8868\u73FE</button>
                            <button class="td-dialog-tab" data-tab="url">URL</button>
                            <button class="td-dialog-tab" data-tab="user-keyword">\u30E6\u30FC\u30B6\u30FC\u30AD\u30FC\u30EF\u30FC\u30C9</button>
                            <button class="td-dialog-tab" data-tab="user-regex">\u30E6\u30FC\u30B6\u30FC\u6B63\u898F\u8868\u73FE</button>
                            <button class="td-dialog-tab" data-tab="remove">\u524A\u9664</button>
                        </nav>
                    </div>
                    <div class="td-dialog-content">
                        <div class="td-dialog-body">
                            <div class="tab-content active" id="phrase-tab">
                                <p class="td-dialog-message">\u30DF\u30E5\u30FC\u30C8\u3059\u308B\u30AD\u30FC\u30EF\u30FC\u30C9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044<br>
                                \u4F8B: "\u30B9\u30D1\u30E0", "\u5E83\u544A"</p>
                                <input type="text" class="td-dialog-input" id="phrase-input" placeholder="\u30AD\u30FC\u30EF\u30FC\u30C9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044" autocomplete="off" data-lpignore="true" data-form-type="other" data-1p-ignore>
                            </div>
                            <div class="tab-content" id="regex-tab">
                                <p class="td-dialog-message">\u6B63\u898F\u8868\u73FE\u30D1\u30BF\u30FC\u30F3\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044<br>
                                \u4F8B: "RT.*\u30BB\u30FC\u30EB", ".*\u9650\u5B9A.*"<br>
                                <small>\u203B \u30B9\u30E9\u30C3\u30B7\u30E5\uFF08/\uFF09\u306F\u4E0D\u8981\u3067\u3059</small></p>
                                <input type="text" class="td-dialog-input" id="regex-input" placeholder="\u6B63\u898F\u8868\u73FE\u30D1\u30BF\u30FC\u30F3\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044" autocomplete="off" data-lpignore="true" data-form-type="other" data-1p-ignore>
                            </div>
                            <div class="tab-content" id="url-tab">
                                <p class="td-dialog-message">\u30DF\u30E5\u30FC\u30C8\u3059\u308BURL\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044<br>
                                \u4F8B: "https://example.com"<br>
                                <small>\u203B Twitter\u77ED\u7E2EURL\uFF08t.co\uFF09\u3082\u5BFE\u5FDC\u3057\u307E\u3059</small></p>
                                <input type="text" class="td-dialog-input" id="url-input" placeholder="URL\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044" autocomplete="off" data-lpignore="true" data-form-type="other" data-1p-ignore>
                            </div>
                            <div class="tab-content" id="user-keyword-tab">
                                <p class="td-dialog-message">\u7279\u5B9A\u30E6\u30FC\u30B6\u30FC\u306E\u30AD\u30FC\u30EF\u30FC\u30C9\u3092\u30DF\u30E5\u30FC\u30C8\u3057\u307E\u3059<br>
                                \u5F62\u5F0F: "\u30E6\u30FC\u30B6\u30FC\u540D|\u30AD\u30FC\u30EF\u30FC\u30C9"<br>
                                \u4F8B: "spamuser|\u5E83\u544A", "botname|\u5BA3\u4F1D"<br>
                                <small>\u203B @\u30DE\u30FC\u30AF\u306F\u4E0D\u8981\u3067\u3059\u3002\u5FC5\u305A\u300C|\u300D\u3067\u533A\u5207\u3063\u3066\u304F\u3060\u3055\u3044</small></p>
                                <input type="text" class="td-dialog-input" id="user-keyword-input" placeholder="\u30E6\u30FC\u30B6\u30FC\u540D|\u30AD\u30FC\u30EF\u30FC\u30C9" autocomplete="off" data-lpignore="true" data-form-type="other" data-1p-ignore>
                            </div>
                            <div class="tab-content" id="user-regex-tab">
                                <p class="td-dialog-message">\u7279\u5B9A\u30E6\u30FC\u30B6\u30FC\u3092\u6B63\u898F\u8868\u73FE\u3067\u30DF\u30E5\u30FC\u30C8\u3057\u307E\u3059<br>
                                \u4F8B: "spam_.*", "bot[0-9]+"<br>
                                <small>\u203B @\u30DE\u30FC\u30AF\u306F\u4E0D\u8981\u3067\u3059</small></p>
                                <input type="text" class="td-dialog-input" id="user-regex-input" placeholder="\u30E6\u30FC\u30B6\u30FC\u540D\u30D1\u30BF\u30FC\u30F3\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044" autocomplete="off" data-lpignore="true" data-form-type="other" data-1p-ignore>
                            </div>
                            <div class="tab-content" id="remove-tab">
                                <p class="td-dialog-message">\u524A\u9664\u3059\u308B\u30D5\u30A3\u30EB\u30BF\u30FC\u6570\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044<br>
                                \uFF08phrase\u578B\u30D5\u30A3\u30EB\u30BF\u30FC\u3092\u53E4\u3044\u9806\u304B\u3089\u524A\u9664\u3057\u307E\u3059\uFF09</p>
                                <input type="number" class="td-dialog-input" id="remove-input" placeholder="\u524A\u9664\u6570\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044" min="1" autocomplete="off" data-lpignore="true" data-form-type="other" data-1p-ignore>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="td-dialog-footer">
                    <button class="td-dialog-cancel">\u30AD\u30E3\u30F3\u30BB\u30EB</button>
                    <button class="td-dialog-confirm">\u5B9F\u884C</button>
                </div>
            </div>
        </div>
    `,e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}function N(){if(!document.querySelector("style[data-td-dialog]")){A();let t=document.querySelector("style:last-of-type");t&&t.setAttribute("data-td-dialog","true")}}function W(){return new Promise((t,e)=>{let o=document.getElementById("td-mute-dialog");o&&o.remove(),o=I(),document.body.appendChild(o);let l=o.querySelector(".td-dialog-cancel"),r=o.querySelector(".td-dialog-confirm"),y=o.querySelector(".td-dialog-close"),u=o.querySelectorAll(".td-dialog-tab"),j=o.querySelectorAll(".tab-content"),d={phrase:o.querySelector("#phrase-input"),regex:o.querySelector("#regex-input"),url:o.querySelector("#url-input"),userKeyword:o.querySelector("#user-keyword-input"),userRegex:o.querySelector("#user-regex-input"),remove:o.querySelector("#remove-input")},p="phrase";u.forEach(i=>{i.addEventListener("click",()=>{let a=i.dataset.tab;p=a,u.forEach(c=>c.classList.remove("active")),i.classList.add("active"),j.forEach(c=>{c.classList.remove("active")}),o.querySelector(`#${a}-tab`).classList.add("active");let n=T();n&&setTimeout(()=>n.focus(),100)})});let T=()=>{switch(p){case"phrase":return d.phrase;case"regex":return d.regex;case"url":return d.url;case"user-keyword":return d.userKeyword;case"user-regex":return d.userRegex;case"remove":return d.remove;default:return null}},K=(i,a)=>{switch(i){case"phrase":case"regex":case"url":case"user-regex":return a.trim()!=="";case"user-keyword":let n=a.trim();if(n===""||!n.includes("|"))return!1;let c=n.split("|");return c.length===2&&c[0].trim()!==""&&c[1].trim()!=="";case"remove":return a.trim()!==""&&!isNaN(Number(a))&&Number(a)>0;default:return!1}},V=(i,a)=>{let n=a.trim();switch(i){case"phrase":return n;case"regex":return`/${n}/`;case"url":return n;case"user-keyword":return`@@${n}`;case"user-regex":return`@${n}`;case"remove":return Number(n);default:return n}};o.style.display="flex",setTimeout(()=>d.phrase.focus(),100);let M=()=>{o.remove()},L=()=>{let i=T();if(!i)return;let a=i.value;if(!K(p,a)){i.focus();return}if(M(),p==="remove")t({action:"remove",value:Number(a.trim())});else{let n=V(p,a);t({action:"add",value:n,type:p})}},g=()=>{M(),e(new Error("User cancelled"))};r.addEventListener("click",L),l.addEventListener("click",g),y.addEventListener("click",g),Object.values(d).forEach(i=>{i&&i.addEventListener("keydown",a=>{a.key==="Enter"?L():a.key==="Escape"&&g()})}),o.addEventListener("click",i=>{i.target===o&&g()})})}async function R(){console.log("[TD Mute Helper] showMuteDialog called");try{let t=await W();return console.log("[TD Mute Helper] showCustomDialog resolved with:",t),t}catch(t){throw console.log("[TD Mute Helper] showCustomDialog rejected:",t.message),t}}x();b();x();function m(t,e){try{TD.controller.filterManager.addFilter(t,e)}catch(o){return s(`\u30D5\u30A3\u30EB\u30BF\u30FC\u8FFD\u52A0\u306B\u5931\u6557\u3057\u307E\u3057\u305F (${t}: ${e})`,o),!1}return!0}function h(t){return t.match(/https?:\/\/t\.co\/(.+)/)?"url":t.match(/^\/.+\/$/)?"regex":t.match(/^@@.+/)?"userKeyword":t.match(/^@.+/)?"userRegex":"phrase"}function z(t){let e=t.match(/https?:\/\/t\.co\/(.+)/);e&&e[1].length>0&&m("phrase",e[1])}function C(t){let e=t.match(/^\/(.+)\/$/)[1];m("BTD_regex",e)}function O(t){let e=t.match(/^@@(.+)/)[1];m("BTD_mute_user_keyword",e)}async function P(t){let{getDuplication:e}=await Promise.resolve().then(()=>(_(),q)),{sleep:o}=await Promise.resolve().then(()=>($(),H)),{DELAY_BETWEEN_OPERATIONS:l}=await Promise.resolve().then(()=>(b(),S)),r=e();if(r.length>0)try{TD.controller.filterManager.removeFilter(r[0]),await o(l)}catch(u){s("\u91CD\u8907\u30D5\u30A3\u30EB\u30BF\u30FC\u524A\u9664\u306B\u5931\u6557\u3057\u307E\u3057\u305F",u)}let y=t.match(/^@(.+)/)[1];m("BTD_user_regex",y)}function U(t){m("phrase",t)}async function B(t,e=null){try{let o;switch(e?o=e==="user-keyword"?"userKeyword":e==="user-regex"?"userRegex":e:o=h(t),o){case"url":z(t);break;case"regex":C(t);break;case"userKeyword":O(t);break;case"userRegex":await P(t);break;case"phrase":default:U(t);break}return!0}catch(o){return s(`\u30DF\u30E5\u30FC\u30C8\u30D5\u30A3\u30EB\u30BF\u30FC\u8FFD\u52A0\u51E6\u7406\u3067\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F: "${t}"`,o),!1}}function k(t){if(!(t<=0))try{var e=TD.controller.filterManager.getAll(),o=e.filter(function(r){return r.type=="phrase"});if(o.length===0){console.log("\u524A\u9664\u5BFE\u8C61\u306E\u30D5\u30A3\u30EB\u30BF\u30FC\u304C\u3042\u308A\u307E\u305B\u3093");return}var l=o[0];console.log(t),console.log(o.length+"/"+e.length),TD.controller.filterManager.removeFilter(l),setTimeout(function(){k(t-1)},2e4)}catch(r){s(`\u30D5\u30A3\u30EB\u30BF\u30FC\u524A\u9664\u306B\u5931\u6557\u3057\u307E\u3057\u305F (\u6B8B\u308A${t}\u500B)`,r)}}function F(){setTimeout(function(){console.log("loaded"),console.log(`[TD Mute Helper] version ${w} loaded`),N(),document.querySelectorAll(".visible-in-contracted-header").forEach(e=>{e.addEventListener("click",async function(o){console.log("[TD Mute Helper] Click event triggered");try{let l=TD.controller.filterManager.getAll().length;console.log("[TD Mute Helper] Showing unified dialog");let r=await R();console.log("[TD Mute Helper] Dialog result:",r),r.action==="add"&&r.value?await B(r.value,r.type):r.action==="remove"&&r.value&&k(r.value)}catch(l){console.log("[TD Mute Helper] Dialog cancelled or error:",l.message)}}),e.addEventListener("contextmenu",o=>{o.preventDefault()})})},3e4)}(function(){"use strict";F(),typeof module!="undefined"&&module.exports&&(module.exports={detectMutePattern:h})})();})();
