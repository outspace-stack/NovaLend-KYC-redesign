import {renderScreen,screenNames} from './screens.js';
const app=document.querySelector('#app');
const key='novalend-demo-session-v1';
let stored={};try{stored=JSON.parse(sessionStorage.getItem(key)||'{}')}catch{}
const params=new URLSearchParams(location.search);
const requested=params.get('state');
const state={screen:screenNames.includes(requested)?requested:(screenNames.includes(stored.screen)?stored.screen:'splash'),idType:stored.idType||'National ID',form:stored.form||{},deferred:stored.deferred||null,retryTarget:stored.retryTarget||'id-verified',history:stored.history||[],completed:false};
let timer;
function save(){try{sessionStorage.setItem(key,JSON.stringify(state))}catch{}}
function render(focus=true){clearTimeout(timer);app.innerHTML=renderScreen(state.screen,state);document.title='NovaLend — '+state.screen.replaceAll('-',' ');if(focus)app.querySelector('h1')?.focus({preventScroll:true});save();if(state.screen==='splash')timer=setTimeout(()=>go('onboarding',false),1400);if(state.screen==='verifying')timer=setTimeout(()=>go('success'),2200);}
function go(screen,push=true){if(!screenNames.includes(screen))return;if(push&&screen!==state.screen)state.history.push(state.screen);state.screen=screen;history[push?'pushState':'replaceState'](null,'',location.pathname+'?state='+screen);render();}
function back(){const previous=state.history.pop();go(previous||({'details':'identity','id-select':'details',permission:'id-select','id-camera':'permission','review-id':'id-camera',manual:'permission','id-verified':'review-id','selfie-intro':'id-verified','selfie-camera':'selfie-intro','review-selfie':'selfie-camera',verifying:'review-selfie','id-capture-failed':'id-camera','camera-unavailable':'permission','connection-interrupted':'review-id','upload-failed':'review-id','selfie-failed':'review-selfie'}[state.screen]||'modules'),false);}
app.addEventListener('change',e=>{if(e.target.name==='idType'){state.idType=e.target.value;save();if(state.screen==='id-select'){app.querySelectorAll('.id-card').forEach(card=>card.classList.toggle('selected',card.querySelector('input').checked));}}});
app.addEventListener('input',e=>{if(['idNumber','fullName','dob'].includes(e.target.name)){state.form[e.target.name]=e.target.value;save();}});
app.addEventListener('submit',e=>{e.preventDefault();if(e.target.id==='manual-form'&&e.target.reportValidity())go('id-verified');});
app.addEventListener('click',e=>{const button=e.target.closest('[data-action]');if(!button)return;const action=button.dataset.action;if(action==='submit-manual')return;if(action==='back')return back();if(action==='defer'){state.deferred=state.screen;save();return go('modules');}if(action==='lend'&&state.deferred){const resume=state.deferred;state.deferred=null;return go(resume);}if(action==='complete'){state.completed=true;state.deferred=null;state.history=[];return go('modules',false);}if(action==='retry')return go(state.retryTarget);if(action==='flash'){const on=button.getAttribute('aria-pressed')==='true';button.setAttribute('aria-pressed',String(!on));return;}if(action==='switch-camera'){button.setAttribute('aria-pressed',String(button.getAttribute('aria-pressed')!=='true'));return;}if(action==='language'){const menu=document.querySelector('#language-menu');menu.hidden=!menu.hidden;document.querySelector('.language-button').setAttribute('aria-expanded',String(!menu.hidden));return;}if(action==='support'||action==='unavailable'){return;}go(action);});
const errors=['id-capture-failed','camera-unavailable','connection-interrupted','upload-failed','selfie-failed'];
document.addEventListener('keydown',e=>{if(e.altKey&&e.shiftKey){if(e.code==='KeyR'){e.preventDefault();state.history=[];state.form={};state.deferred=null;state.idType='National ID';go('splash',false);}const index=e.code.startsWith('Digit')?Number(e.code.slice(5))-1:-1;if(index>=0&&index<5){e.preventDefault();state.retryTarget=['review-selfie','selfie-camera','selfie-intro','verifying','selfie-failed'].includes(state.screen)?'verifying':'id-verified';go(errors[index]);}}});
window.addEventListener('popstate',()=>{const screen=new URLSearchParams(location.search).get('state');if(screenNames.includes(screen))go(screen,false);});
render(false);

// Installed experience: all screens and bundled assets remain available offline.
if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(()=>{});
