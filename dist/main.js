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
(()=>{var tt=Object.defineProperty;var d=(t,e)=>()=>(t&&(e=t(t=0)),e);var et=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),w=(t,e)=>{for(var o in e)tt(t,o,{get:e[o],enumerable:!0})};var N={};w(N,{DELAY_BETWEEN_OPERATIONS:()=>D,INITIALIZATION_DELAY:()=>T,VERSION:()=>E});var E,D,T,f=d(()=>{E="0.5",D=2e4,T=3e4});function R(){let t=`
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
            min-width: 450px !important;
            max-width: 550px !important;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4) !important;
        }

        .td-dialog-container .td-dialog-header {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            padding: 16px 20px !important;
            border-bottom: 1px solid #38444d !important;
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

        .td-dialog-container .td-dialog-tabs {
            display: flex !important;
            background: #192734 !important;
            padding: 0 !important;
            margin: 0 !important;
            position: relative !important;
            border-radius: 0 !important;
        }

        .td-dialog-container .td-dialog-tab {
            flex: 1 !important;
            padding: 14px 20px 12px 20px !important;
            background: #192734 !important;
            border: none !important;
            color: #8b98a5 !important;
            cursor: pointer !important;
            font-size: 14px !important;
            font-weight: 500 !important;
            position: relative !important;
            transition: all 0.2s ease !important;
            border-top: 1px solid #38444d !important;
            border-right: 1px solid #38444d !important;
            margin-right: -1px !important;
            z-index: 1 !important;
            border-radius: 0 !important;
            outline: none !important;
            text-decoration: none !important;
            box-shadow: none !important;
        }

        .td-dialog-container .td-dialog-tab:last-child {
            border-right: none !important;
        }

        .td-dialog-container .td-dialog-tab.active {
            background: #15202b !important;
            color: #1d9bf0 !important;
            border-bottom: 1px solid #15202b !important;
            z-index: 2 !important;
            margin-bottom: -1px !important;
        }

        .td-dialog-container .td-dialog-tab:hover:not(.active) {
            background: #1c2732 !important;
            color: #fff !important;
        }

        .td-dialog-container .td-dialog-tab:first-child {
            border-left: 1px solid #38444d !important;
        }

        .td-dialog-container .td-dialog-tab.active:first-child {
            border-left: 1px solid #38444d !important;
        }

        .td-dialog-container .td-dialog-body {
            padding: 20px !important;
            border-top: 1px solid #38444d !important;
            margin-top: -1px !important;
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
        }

        .td-dialog-container .tab-content.active {
            display: block !important;
        }
    `,e=document.createElement("style");e.textContent=t,document.head.appendChild(e)}var q=d(()=>{});function _(){let t=`
        <div id="td-mute-dialog" class="td-dialog-overlay" style="display: none;">
            <div class="td-dialog-container">
                <div class="td-dialog-header">
                    <h3 class="td-dialog-title">\u30DF\u30E5\u30FC\u30C8\u8A2D\u5B9A</h3>
                    <button class="td-dialog-close">&times;</button>
                </div>
                <div class="td-dialog-tabs">
                    <button class="td-dialog-tab active" data-tab="phrase">\u30D5\u30EC\u30FC\u30BA</button>
                    <button class="td-dialog-tab" data-tab="regex">\u6B63\u898F\u8868\u73FE</button>
                    <button class="td-dialog-tab" data-tab="url">URL</button>
                    <button class="td-dialog-tab" data-tab="user-keyword">\u30E6\u30FC\u30B6\u30FC\u30AD\u30FC\u30EF\u30FC\u30C9</button>
                    <button class="td-dialog-tab" data-tab="user-regex">\u30E6\u30FC\u30B6\u30FC\u6B63\u898F\u8868\u73FE</button>
                    <button class="td-dialog-tab" data-tab="remove">\u524A\u9664</button>
                </div>
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
                        \u4F8B: username<br>
                        <small>\u203B @\u30DE\u30FC\u30AF\u306F\u4E0D\u8981\u3067\u3059</small></p>
                        <input type="text" class="td-dialog-input" id="user-keyword-input" placeholder="\u30E6\u30FC\u30B6\u30FC\u540D\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044" autocomplete="off" data-lpignore="true" data-form-type="other" data-1p-ignore>
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
                <div class="td-dialog-footer">
                    <button class="td-dialog-cancel">\u30AD\u30E3\u30F3\u30BB\u30EB</button>
                    <button class="td-dialog-confirm">\u5B9F\u884C</button>
                </div>
            </div>
        </div>
    `,e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}function z(){if(!document.querySelector("style[data-td-dialog]")){R();let t=document.querySelector("style:last-of-type");t&&t.setAttribute("data-td-dialog","true")}}var k=d(()=>{q()});function ot(){return new Promise((t,e)=>{let o=document.getElementById("td-mute-dialog");o&&o.remove(),o=_(),document.body.appendChild(o);let n=o.querySelector(".td-dialog-cancel"),r=o.querySelector(".td-dialog-confirm"),y=o.querySelector(".td-dialog-close"),m=o.querySelectorAll(".td-dialog-tab"),J=o.querySelectorAll(".tab-content"),s={phrase:o.querySelector("#phrase-input"),regex:o.querySelector("#regex-input"),url:o.querySelector("#url-input"),userKeyword:o.querySelector("#user-keyword-input"),userRegex:o.querySelector("#user-regex-input"),remove:o.querySelector("#remove-input")},p="phrase";m.forEach(a=>{a.addEventListener("click",()=>{let i=a.dataset.tab;p=i,m.forEach(v=>v.classList.remove("active")),a.classList.add("active"),J.forEach(v=>{v.classList.remove("active")}),o.querySelector(`#${i}-tab`).classList.add("active");let l=S();l&&setTimeout(()=>l.focus(),100)})});let S=()=>{switch(p){case"phrase":return s.phrase;case"regex":return s.regex;case"url":return s.url;case"user-keyword":return s.userKeyword;case"user-regex":return s.userRegex;case"remove":return s.remove;default:return null}},Q=(a,i)=>{switch(a){case"phrase":case"regex":case"url":case"user-keyword":case"user-regex":return i.trim()!=="";case"remove":return i.trim()!==""&&!isNaN(Number(i))&&Number(i)>0;default:return!1}},X=(a,i)=>{let l=i.trim();switch(a){case"phrase":return l;case"regex":return`/${l}/`;case"url":return l;case"user-keyword":return`@@${l}`;case"user-regex":return`@${l}`;case"remove":return Number(l);default:return l}};o.style.display="flex",setTimeout(()=>s.phrase.focus(),100);let A=()=>{o.remove()},I=()=>{let a=S();if(!a)return;let i=a.value;if(!Q(p,i)){a.focus();return}if(A(),p==="remove")t({action:"remove",value:Number(i.trim())});else{let l=X(p,i);t({action:"add",value:l,type:p})}},g=()=>{A(),e(new Error("User cancelled"))};r.addEventListener("click",I),n.addEventListener("click",g),y.addEventListener("click",g),Object.values(s).forEach(a=>{a&&a.addEventListener("keydown",i=>{i.key==="Enter"?I():i.key==="Escape"&&g()})}),o.addEventListener("click",a=>{a.target===o&&g()})})}async function H(){console.log("[TD Mute Helper] showMuteDialog called");try{let t=await ot();return console.log("[TD Mute Helper] showCustomDialog resolved with:",t),t}catch(t){throw console.log("[TD Mute Helper] showCustomDialog rejected:",t.message),t}}var $=d(()=>{k()});function c(t,e){console.error(`[TD Mute Helper] ${t}:`,e),alert(`\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F: ${t}`)}var b=d(()=>{});var C={};w(C,{getDuplication:()=>rt});function rt(){try{let t=TD.controller.filterManager.getAll(),e=t.length,o=[];for(let n=0;n<e;n++)for(let r=n+1;r<e;r++)t[n].type==t[r].type&&t[n].value==t[r].value&&o.push(t[n]);return o}catch(t){return c("\u91CD\u8907\u30D5\u30A3\u30EB\u30BF\u30FC\u691C\u7D22\u306B\u5931\u6557\u3057\u307E\u3057\u305F",t),[]}}var O=d(()=>{b()});var P={};w(P,{sleep:()=>at});var at,U=d(()=>{at=t=>new Promise(e=>setTimeout(e,t))});function u(t,e){try{TD.controller.filterManager.addFilter(t,e)}catch(o){return c(`\u30D5\u30A3\u30EB\u30BF\u30FC\u8FFD\u52A0\u306B\u5931\u6557\u3057\u307E\u3057\u305F (${t}: ${e})`,o),!1}return!0}function x(t){return t.match(/https?:\/\/t\.co\/(.+)/)?"url":t.match(/^\/.+\/$/)?"regex":t.match(/^@@.+/)?"userKeyword":t.match(/^@.+/)?"userRegex":"phrase"}function B(t){let e=t.match(/https?:\/\/t\.co\/(.+)/);e&&e[1].length>0&&u("phrase",e[1])}function F(t){let e=t.match(/^\/(.+)\/$/)[1];u("BTD_regex",e)}function j(t){let e=t.match(/^@@(.+)/)[1];u("BTD_mute_user_keyword",e)}async function K(t){let{getDuplication:e}=await Promise.resolve().then(()=>(O(),C)),{sleep:o}=await Promise.resolve().then(()=>(U(),P)),{DELAY_BETWEEN_OPERATIONS:n}=await Promise.resolve().then(()=>(f(),N)),r=e();if(r.length>0)try{TD.controller.filterManager.removeFilter(r[0]),await o(n)}catch(m){c("\u91CD\u8907\u30D5\u30A3\u30EB\u30BF\u30FC\u524A\u9664\u306B\u5931\u6557\u3057\u307E\u3057\u305F",m)}let y=t.match(/^@(.+)/)[1];u("BTD_user_regex",y)}function V(t){u("phrase",t)}var M=d(()=>{b()});async function Y(t,e=null){try{let o;switch(e?o=e==="user-keyword"?"userKeyword":e==="user-regex"?"userRegex":e:o=x(t),o){case"url":B(t);break;case"regex":F(t);break;case"userKeyword":j(t);break;case"userRegex":await K(t);break;case"phrase":default:V(t);break}return!0}catch(o){return c(`\u30DF\u30E5\u30FC\u30C8\u30D5\u30A3\u30EB\u30BF\u30FC\u8FFD\u52A0\u51E6\u7406\u3067\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F: "${t}"`,o),!1}}function L(t){if(!(t<=0))try{var e=TD.controller.filterManager.getAll(),o=e.filter(function(r){return r.type=="phrase"});if(o.length===0){console.log("\u524A\u9664\u5BFE\u8C61\u306E\u30D5\u30A3\u30EB\u30BF\u30FC\u304C\u3042\u308A\u307E\u305B\u3093");return}var n=o[0];console.log(t),console.log(o.length+"/"+e.length),TD.controller.filterManager.removeFilter(n),setTimeout(function(){L(t-1)},2e4)}catch(r){c(`\u30D5\u30A3\u30EB\u30BF\u30FC\u524A\u9664\u306B\u5931\u6557\u3057\u307E\u3057\u305F (\u6B8B\u308A${t}\u500B)`,r)}}var W=d(()=>{b();f();M()});function Z(){setTimeout(function(){console.log("loaded"),console.log(`[TD Mute Helper] version ${E} loaded`),z(),document.querySelectorAll(".visible-in-contracted-header").forEach(e=>{e.addEventListener("click",async function(o){console.log("[TD Mute Helper] Click event triggered");try{let n=TD.controller.filterManager.getAll().length;console.log("[TD Mute Helper] Showing unified dialog");let r=await H();console.log("[TD Mute Helper] Dialog result:",r),r.action==="add"&&r.value?await Y(r.value,r.type):r.action==="remove"&&r.value&&L(r.value)}catch(n){console.log("[TD Mute Helper] Dialog cancelled or error:",n.message)}}),e.addEventListener("contextmenu",o=>{o.preventDefault()})})},3e4)}var G=d(()=>{f();k();$();W()});var it=et((Lt,h)=>{G();M();(function(){"use strict";Z(),typeof h!="undefined"&&h.exports&&(h.exports={detectMutePattern:x})})()});it();})();
