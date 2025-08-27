// ==UserScript==
// @name td_mute_helper
// @namespace http://tampermonkey.net/
// @version 0.4
// @description try to take over the world!
// @author You
// @match https://tweetdeck.twitter.com
// @match https://twitter.com/i/tweetdeck
// @match https://x.com/i/tweetdeck
// @updateURL https://raw.githubusercontent.com/eioh/td_mute_helper/main/main.js
// @downloadURL https://raw.githubusercontent.com/eioh/td_mute_helper/main/main.js
// ==/UserScript==
(()=>{var G=Object.defineProperty;var l=(e,t)=>()=>(e&&(t=e(e=0)),t);var J=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),h=(e,t)=>{for(var o in t)G(e,o,{get:t[o],enumerable:!0})};var N={};h(N,{DELAY_BETWEEN_OPERATIONS:()=>y,INITIALIZATION_DELAY:()=>v,VERSION:()=>b});var b,y,v,p=l(()=>{b="0.4",y=2e4,v=3e4});function L(){let e=`
        .td-dialog-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        }

        .td-dialog-container {
            background: #15202b;
            border: 1px solid #38444d;
            border-radius: 8px;
            min-width: 400px;
            max-width: 500px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
        }

        .td-dialog-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 20px;
            border-bottom: 1px solid #38444d;
        }

        .td-dialog-title {
            color: #fff;
            margin: 0;
            font-size: 18px;
            font-weight: 600;
        }

        .td-dialog-close {
            background: none;
            border: none;
            color: #8b98a5;
            font-size: 24px;
            cursor: pointer;
            padding: 0;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .td-dialog-close:hover {
            color: #fff;
        }

        .td-dialog-body {
            padding: 20px;
        }

        .td-dialog-message {
            color: #8b98a5;
            margin: 0 0 16px 0;
            font-size: 14px;
        }

        .td-dialog-input {
            width: 100%;
            padding: 12px;
            background: #192734;
            border: 1px solid #38444d;
            border-radius: 6px;
            color: #fff;
            font-size: 16px;
            outline: none;
            box-sizing: border-box;
        }

        .td-dialog-input:focus {
            border-color: #1d9bf0;
        }

        .td-dialog-footer {
            display: flex;
            justify-content: flex-end;
            gap: 12px;
            padding: 16px 20px;
            border-top: 1px solid #38444d;
        }

        .td-dialog-cancel, .td-dialog-confirm {
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            border: none;
            min-width: 80px;
        }

        .td-dialog-cancel {
            background: transparent;
            color: #8b98a5;
            border: 1px solid #38444d;
        }

        .td-dialog-cancel:hover {
            background: #1c2732;
        }

        .td-dialog-confirm {
            background: #1d9bf0;
            color: #fff;
        }

        .td-dialog-confirm:hover {
            background: #1a8cd8;
        }

        .td-dialog-confirm:disabled {
            background: #3c4043;
            color: #5f6368;
            cursor: not-allowed;
        }
    `,t=document.createElement("style");t.textContent=e,document.head.appendChild(t)}var S=l(()=>{});function A(){let e=`
        <div id="td-mute-dialog" class="td-dialog-overlay" style="display: none;">
            <div class="td-dialog-container">
                <div class="td-dialog-header">
                    <h3 class="td-dialog-title">\u30AD\u30FC\u30EF\u30FC\u30C9\u5165\u529B\u30C0\u30A4\u30A2\u30ED\u30B0</h3>
                    <button class="td-dialog-close">&times;</button>
                </div>
                <div class="td-dialog-body">
                    <p class="td-dialog-message">\u30AD\u30FC\u30EF\u30FC\u30C9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044</p>
                    <input type="text" class="td-dialog-input" placeholder="\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044">
                </div>
                <div class="td-dialog-footer">
                    <button class="td-dialog-cancel">\u30AD\u30E3\u30F3\u30BB\u30EB</button>
                    <button class="td-dialog-confirm">OK</button>
                </div>
            </div>
        </div>
    `,t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}function I(){if(!document.querySelector("style[data-td-dialog]")){L();let e=document.querySelector("style:last-of-type");e&&e.setAttribute("data-td-dialog","true")}}var E=l(()=>{S()});function Q(e,t,o="text"){return new Promise((r,i)=>{let n=document.getElementById("td-mute-dialog");n&&n.remove(),n=A(),document.body.appendChild(n);let x=n.querySelector(".td-dialog-title"),Y=n.querySelector(".td-dialog-message"),d=n.querySelector(".td-dialog-input"),W=n.querySelector(".td-dialog-cancel"),V=n.querySelector(".td-dialog-confirm"),Z=n.querySelector(".td-dialog-close");x.textContent=e,Y.textContent=t,d.type=o,o==="number"&&(d.placeholder="\u6570\u5024\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044"),n.style.display="flex",setTimeout(()=>d.focus(),100);let M=()=>{n.remove()},k=()=>{let a=d.value.trim();if(a===""){d.focus();return}if(o==="number"&&isNaN(Number(a))){d.focus();return}M(),r(o==="number"?Number(a):a)},u=()=>{M(),i(new Error("User cancelled"))};V.addEventListener("click",k),W.addEventListener("click",u),Z.addEventListener("click",u),d.addEventListener("keydown",a=>{a.key==="Enter"?k():a.key==="Escape"&&u()}),n.addEventListener("click",a=>{a.target===n&&u()})})}async function D(e,t="",o="text"){console.log("[TD Mute Helper] customPrompt called with:",{message:e,defaultValue:t,inputType:o});try{let r=await Q("\u5165\u529B",e,o);return console.log("[TD Mute Helper] showCustomDialog resolved with:",r),r.toString()}catch(r){return console.log("[TD Mute Helper] showCustomDialog rejected:",r.message),null}}var P=l(()=>{E()});function c(e,t){console.error(`[TD Mute Helper] ${e}:`,t),alert(`\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F: ${e}`)}var g=l(()=>{});var _={};h(_,{getDuplication:()=>X});function X(){try{let e=TD.controller.filterManager.getAll(),t=e.length,o=[];for(let r=0;r<t;r++)for(let i=r+1;i<t;i++)e[r].type==e[i].type&&e[r].value==e[i].value&&o.push(e[r]);return o}catch(e){return c("\u91CD\u8907\u30D5\u30A3\u30EB\u30BF\u30FC\u691C\u7D22\u306B\u5931\u6557\u3057\u307E\u3057\u305F",e),[]}}var H=l(()=>{g()});var C={};h(C,{sleep:()=>ee});var ee,z=l(()=>{ee=e=>new Promise(t=>setTimeout(t,e))});function s(e,t){try{TD.controller.filterManager.addFilter(e,t)}catch(o){return c(`\u30D5\u30A3\u30EB\u30BF\u30FC\u8FFD\u52A0\u306B\u5931\u6557\u3057\u307E\u3057\u305F (${e}: ${t})`,o),!1}return!0}function f(e){return e.match(/https?:\/\/t\.co\/(.+)/)?"url":e.match(/^\/.+\/$/)?"regex":e.match(/^@@.+/)?"userKeyword":e.match(/^@.+/)?"userRegex":"phrase"}function O(e){let t=e.match(/https?:\/\/t\.co\/(.+)/);t&&t[1].length>0&&s("phrase",t[1])}function R(e){let t=e.match(/^\/(.+)\/$/)[1];s("BTD_regex",t)}function B(e){let t=e.match(/^@@(.+)/)[1];s("BTD_mute_user_keyword",t)}async function $(e){let{getDuplication:t}=await Promise.resolve().then(()=>(H(),_)),{sleep:o}=await Promise.resolve().then(()=>(z(),C)),{DELAY_BETWEEN_OPERATIONS:r}=await Promise.resolve().then(()=>(p(),N)),i=t();if(i.length>0)try{TD.controller.filterManager.removeFilter(i[0]),await o(r)}catch(x){c("\u91CD\u8907\u30D5\u30A3\u30EB\u30BF\u30FC\u524A\u9664\u306B\u5931\u6557\u3057\u307E\u3057\u305F",x)}let n=e.match(/^@(.+)/)[1];s("BTD_user_regex",n)}function q(e){s("phrase",e)}var T=l(()=>{g()});async function F(e){try{switch(f(e)){case"url":O(e);break;case"regex":R(e);break;case"userKeyword":B(e);break;case"userRegex":await $(e);break;case"phrase":default:q(e);break}return!0}catch(t){return c(`\u30DF\u30E5\u30FC\u30C8\u30D5\u30A3\u30EB\u30BF\u30FC\u8FFD\u52A0\u51E6\u7406\u3067\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F: "${e}"`,t),!1}}function w(e){if(!(e<=0))try{var t=TD.controller.filterManager.getAll(),o=t.filter(function(i){return i.type=="phrase"});if(o.length===0){console.log("\u524A\u9664\u5BFE\u8C61\u306E\u30D5\u30A3\u30EB\u30BF\u30FC\u304C\u3042\u308A\u307E\u305B\u3093");return}var r=o[0];console.log(e),console.log(o.length+"/"+t.length),TD.controller.filterManager.removeFilter(r),setTimeout(function(){w(e-1)},2e4)}catch(i){c(`\u30D5\u30A3\u30EB\u30BF\u30FC\u524A\u9664\u306B\u5931\u6557\u3057\u307E\u3057\u305F (\u6B8B\u308A${e}\u500B)`,i)}}var U=l(()=>{g();p();T()});function j(){setTimeout(function(){console.log("loaded"),console.log(`[TD Mute Helper] version ${b} loaded`),I(),document.querySelectorAll(".visible-in-contracted-header").forEach(t=>{t.addEventListener("click",async function(o){console.log("[TD Mute Helper] Click event triggered");try{var r=TD.controller.filterManager.getAll().length;console.log("[TD Mute Helper] Showing dialog for mute filter input");var i=await D(`\u5165\u529B(${r})`,"","text");console.log("[TD Mute Helper] Dialog result:",i),i&&i.length>0&&F(i).then(n=>{})}catch(n){console.error("[TD Mute Helper] Error in click handler:",n)}}),t.addEventListener("contextmenu",async function(o){var r=await D("\u524A\u9664\u3059\u308B\u6570\u3092\u5165\u529B","","number");r&&!isNaN(r)&&w(Number(r))})})},3e4)}var K=l(()=>{p();E();P();U()});var te=J((Te,m)=>{K();T();(function(){"use strict";j(),typeof m!="undefined"&&m.exports&&(m.exports={detectMutePattern:f})})()});te();})();
