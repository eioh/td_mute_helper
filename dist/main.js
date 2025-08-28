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
(()=>{var J=Object.defineProperty;var a=(t,o)=>()=>(t&&(o=t(t=0)),o);var Q=(t,o)=>()=>(o||t((o={exports:{}}).exports,o),o.exports),D=(t,o)=>{for(var e in o)J(t,e,{get:o[e],enumerable:!0})};var I={};D(I,{DELAY_BETWEEN_OPERATIONS:()=>T,INITIALIZATION_DELAY:()=>k,VERSION:()=>w});var w,T,k,m=a(()=>{w="0.5",T=2e4,k=3e4});function N(){let t=`
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
    `,o=document.createElement("style");o.textContent=t,document.head.appendChild(o)}var z=a(()=>{});function _(){let t=`
        <div id="td-mute-dialog" class="td-dialog-overlay" style="display: none;">
            <div class="td-dialog-container">
                <div class="td-dialog-header">
                    <h3 class="td-dialog-title">\u30DF\u30E5\u30FC\u30C8\u8A2D\u5B9A</h3>
                    <button class="td-dialog-close">&times;</button>
                </div>
                <div class="td-dialog-tabs">
                    <button class="td-dialog-tab active" data-tab="add">\u8FFD\u52A0</button>
                    <button class="td-dialog-tab" data-tab="remove">\u524A\u9664</button>
                </div>
                <div class="td-dialog-body">
                    <div class="tab-content active" id="add-tab">
                        <p class="td-dialog-message">\u30DF\u30E5\u30FC\u30C8\u3059\u308B\u30AD\u30FC\u30EF\u30FC\u30C9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044<br>
                        \u30FB\u901A\u5E38\u306E\u30AD\u30FC\u30EF\u30FC\u30C9: "example"<br>
                        \u30FB\u6B63\u898F\u8868\u73FE: "/pattern/"<br>
                        \u30FB\u30E6\u30FC\u30B6\u30FC\u30AD\u30FC\u30EF\u30FC\u30C9: "@@username"<br>
                        \u30FB\u30E6\u30FC\u30B6\u30FC\u6B63\u898F\u8868\u73FE: "@username"<br>
                        \u30FBURL\u30B7\u30E7\u30FC\u30C8\u30EA\u30F3\u30AF: "https://t.co/..."</p>
                        <input type="text" class="td-dialog-input" id="add-input" placeholder="\u30AD\u30FC\u30EF\u30FC\u30C9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044" autocomplete="off" data-lpignore="true" data-form-type="other" data-1p-ignore>
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
    `,o=document.createElement("div");return o.innerHTML=t,o.firstElementChild}function H(){if(!document.querySelector("style[data-td-dialog]")){N();let t=document.querySelector("style:last-of-type");t&&t.setAttribute("data-td-dialog","true")}}var M=a(()=>{z()});function X(){return new Promise((t,o)=>{let e=document.getElementById("td-mute-dialog");e&&e.remove(),e=_(),document.body.appendChild(e);let n=e.querySelector(".td-dialog-cancel"),r=e.querySelector(".td-dialog-confirm"),b=e.querySelector(".td-dialog-close"),p=e.querySelectorAll(".td-dialog-tab"),G=e.querySelectorAll(".tab-content"),s=e.querySelector("#add-input"),x=e.querySelector("#remove-input"),h="add";p.forEach(i=>{i.addEventListener("click",()=>{let S=i.dataset.tab;h=S,p.forEach(E=>E.classList.remove("active")),i.classList.add("active"),G.forEach(E=>{E.classList.remove("active")}),e.querySelector(`#${S}-tab`).classList.add("active")})}),e.style.display="flex",setTimeout(()=>s.focus(),100);let v=()=>{e.remove()},y=()=>{if(h==="add"){let i=s.value.trim();if(i===""){s.focus();return}v(),t({action:"add",value:i})}else if(h==="remove"){let i=x.value.trim();if(i===""||isNaN(Number(i))||Number(i)<=0){x.focus();return}v(),t({action:"remove",value:Number(i)})}},l=()=>{v(),o(new Error("User cancelled"))};r.addEventListener("click",y),n.addEventListener("click",l),b.addEventListener("click",l),s.addEventListener("keydown",i=>{i.key==="Enter"?y():i.key==="Escape"&&l()}),x.addEventListener("keydown",i=>{i.key==="Enter"?y():i.key==="Escape"&&l()}),e.addEventListener("click",i=>{i.target===e&&l()})})}async function R(){console.log("[TD Mute Helper] showMuteDialog called");try{let t=await X();return console.log("[TD Mute Helper] showCustomDialog resolved with:",t),t}catch(t){throw console.log("[TD Mute Helper] showCustomDialog rejected:",t.message),t}}var q=a(()=>{M()});function d(t,o){console.error(`[TD Mute Helper] ${t}:`,o),alert(`\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F: ${t}`)}var u=a(()=>{});var P={};D(P,{getDuplication:()=>tt});function tt(){try{let t=TD.controller.filterManager.getAll(),o=t.length,e=[];for(let n=0;n<o;n++)for(let r=n+1;r<o;r++)t[n].type==t[r].type&&t[n].value==t[r].value&&e.push(t[n]);return e}catch(t){return d("\u91CD\u8907\u30D5\u30A3\u30EB\u30BF\u30FC\u691C\u7D22\u306B\u5931\u6557\u3057\u307E\u3057\u305F",t),[]}}var B=a(()=>{u()});var C={};D(C,{sleep:()=>ot});var ot,O=a(()=>{ot=t=>new Promise(o=>setTimeout(o,t))});function c(t,o){try{TD.controller.filterManager.addFilter(t,o)}catch(e){return d(`\u30D5\u30A3\u30EB\u30BF\u30FC\u8FFD\u52A0\u306B\u5931\u6557\u3057\u307E\u3057\u305F (${t}: ${o})`,e),!1}return!0}function g(t){return t.match(/https?:\/\/t\.co\/(.+)/)?"url":t.match(/^\/.+\/$/)?"regex":t.match(/^@@.+/)?"userKeyword":t.match(/^@.+/)?"userRegex":"phrase"}function $(t){let o=t.match(/https?:\/\/t\.co\/(.+)/);o&&o[1].length>0&&c("phrase",o[1])}function F(t){let o=t.match(/^\/(.+)\/$/)[1];c("BTD_regex",o)}function U(t){let o=t.match(/^@@(.+)/)[1];c("BTD_mute_user_keyword",o)}async function j(t){let{getDuplication:o}=await Promise.resolve().then(()=>(B(),P)),{sleep:e}=await Promise.resolve().then(()=>(O(),C)),{DELAY_BETWEEN_OPERATIONS:n}=await Promise.resolve().then(()=>(m(),I)),r=o();if(r.length>0)try{TD.controller.filterManager.removeFilter(r[0]),await e(n)}catch(p){d("\u91CD\u8907\u30D5\u30A3\u30EB\u30BF\u30FC\u524A\u9664\u306B\u5931\u6557\u3057\u307E\u3057\u305F",p)}let b=t.match(/^@(.+)/)[1];c("BTD_user_regex",b)}function Y(t){c("phrase",t)}var L=a(()=>{u()});async function K(t){try{switch(g(t)){case"url":$(t);break;case"regex":F(t);break;case"userKeyword":U(t);break;case"userRegex":await j(t);break;case"phrase":default:Y(t);break}return!0}catch(o){return d(`\u30DF\u30E5\u30FC\u30C8\u30D5\u30A3\u30EB\u30BF\u30FC\u8FFD\u52A0\u51E6\u7406\u3067\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F: "${t}"`,o),!1}}function A(t){if(!(t<=0))try{var o=TD.controller.filterManager.getAll(),e=o.filter(function(r){return r.type=="phrase"});if(e.length===0){console.log("\u524A\u9664\u5BFE\u8C61\u306E\u30D5\u30A3\u30EB\u30BF\u30FC\u304C\u3042\u308A\u307E\u305B\u3093");return}var n=e[0];console.log(t),console.log(e.length+"/"+o.length),TD.controller.filterManager.removeFilter(n),setTimeout(function(){A(t-1)},2e4)}catch(r){d(`\u30D5\u30A3\u30EB\u30BF\u30FC\u524A\u9664\u306B\u5931\u6557\u3057\u307E\u3057\u305F (\u6B8B\u308A${t}\u500B)`,r)}}var W=a(()=>{u();m();L()});function V(){setTimeout(function(){console.log("loaded"),console.log(`[TD Mute Helper] version ${w} loaded`),H(),document.querySelectorAll(".visible-in-contracted-header").forEach(o=>{o.addEventListener("click",async function(e){console.log("[TD Mute Helper] Click event triggered");try{let n=TD.controller.filterManager.getAll().length;console.log("[TD Mute Helper] Showing unified dialog");let r=await R();console.log("[TD Mute Helper] Dialog result:",r),r.action==="add"&&r.value?await K(r.value):r.action==="remove"&&r.value&&A(r.value)}catch(n){console.log("[TD Mute Helper] Dialog cancelled or error:",n.message)}}),o.addEventListener("contextmenu",e=>{e.preventDefault()})})},3e4)}var Z=a(()=>{m();M();q();W()});var et=Q((Tt,f)=>{Z();L();(function(){"use strict";V(),typeof f!="undefined"&&f.exports&&(f.exports={detectMutePattern:g})})()});et();})();
