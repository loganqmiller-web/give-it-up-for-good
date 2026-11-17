'use strict';

// Grounded examples from USC's program descriptions. An item appearing here is
// never a guarantee of current acceptance at any specific location.
const items = [
  { name: 'Clothes & jackets', group:'clothing', tag:'CLOTHING', symbol:'👕', text:'Gently used, clean, wearable clothing. Check the intended program for specific restrictions.', route:'Spring program / CommUnity Shop' },
  { name: 'Shoes', group:'clothing', tag:'CLOTHING', symbol:'👟', text:'Clean pairs in wearable condition. Confirm which types your receiving location takes.', route:'Ask your receiving program' },
  { name: 'Dishes & kitchenware', group:'home', tag:'DORM + HOME', symbol:'🍽️', text:'Usable plates, cups, and dishes were described in USC’s spring collection guide.', route:'Spring program; ask for year-round' },
  { name: 'Small appliances', group:'home', tag:'DORM + HOME', symbol:'🔌', text:'Small appliances are mentioned for spring move-out collections. Ask before taking them anywhere else.', route:'Spring program; confirm first' },
  { name: 'Household goods', group:'home', tag:'DORM + HOME', symbol:'📦', text:'Clean, useful home goods may suit a reuse program; condition and size rules vary.', route:'Spring program / ask CommUnity Shop' },
  { name: 'School supplies', group:'home', tag:'DORM + HOME', symbol:'📚', text:'Usable school supplies are listed as items available through the CommUnity Shop.', route:'Ask CommUnity Shop' },
  { name: 'Unopened shelf-stable food', group:'food', tag:'FOOD + CARE', symbol:'🥫', text:'Unopened, nonperishable food is described in USC’s spring collection and campus shop resources.', route:'Spring program / CommUnity Shop' },
  { name: 'Toiletries', group:'food', tag:'FOOD + CARE', symbol:'🧴', text:'Toiletries are mentioned by USC. Favor unopened, unused products and check the receiving rules.', route:'Spring program / CommUnity Shop' },
  { name: 'Large furniture', group:'special', tag:'ASK FIRST', symbol:'🪑', text:'Do not leave bulky items in a hallway or at a bin without specific collection approval.', route:'Contact a receiving partner first', ask:true },
  { name: 'Batteries & e-waste', group:'special', tag:'ASK FIRST', symbol:'🔋', text:'May require specialized recycling. Never place in ordinary donation boxes without permission.', route:'Find an approved recycling route', ask:true },
  { name: 'Opened food / damaged items', group:'special', tag:'ASK FIRST', symbol:'⚠️', text:'Not suitable for standard donation. Ask about proper disposal, composting, or recycling.', route:'Do not place in donation boxes', ask:true }
];

const results = document.querySelector('#guide-results');
const search = document.querySelector('#item-search');
let activeFilter = 'all';

function renderItems(){
  if (!results) return;
  const term = (search?.value || '').trim().toLocaleLowerCase();
  const filtered = items.filter(item =>
    (activeFilter === 'all' || activeFilter === item.group) &&
    (item.name + ' ' + item.text + ' ' + item.route).toLocaleLowerCase().includes(term)
  );
  results.replaceChildren();
  if (!filtered.length) {
    const empty = document.createElement('p');
    empty.className = 'no-results';
    empty.textContent = 'No matches found. Try a different search, or ask the receiving program before donating.';
    results.append(empty);
    return;
  }
  filtered.forEach(item => {
    const article = document.createElement('article');
    article.className = 'item-card';
    const top = document.createElement('div'); top.className = 'item-card-top';
    const icon = document.createElement('span'); icon.className = 'item-symbol'; icon.textContent = item.symbol; icon.setAttribute('aria-hidden','true');
    const tag = document.createElement('span'); tag.className = 'item-category'; tag.textContent = item.tag;
    top.append(icon,tag);
    const title = document.createElement('h3'); title.textContent = item.name;
    const desc = document.createElement('p'); desc.textContent = item.text;
    const route = document.createElement('span'); route.className = 'item-route' + (item.ask ? ' route-ask' : ''); route.textContent = item.route + ' →';
    article.append(top,title,desc,route);
    results.append(article);
  });
}
search?.addEventListener('input',renderItems);
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click',()=>{
  activeFilter = button.dataset.filter;
  document.querySelectorAll('.filter').forEach(other=>{
    const selected=other===button;
    other.classList.toggle('active',selected);
    other.setAttribute('aria-pressed',String(selected));
  });
  renderItems();
}));
renderItems();

const finderItem = document.querySelector('#finder-item');
const finderTime = document.querySelector('#finder-time');
const finderResult = document.querySelector('#finder-result');
const shopLink = 'https://view.sc.edu/about/offices_and_divisions/student_affairs/student-services/dean_of_students/gamecock_community_shop/index.php';
const springLink = 'https://www.sc.edu/about/offices_and_divisions/student_affairs/our_news_and_publications/news/2025/Move_Out_Sustainably.php';
function renderFinder(){
  if (!finderItem || !finderTime || !finderResult) return;
  const item=finderItem.value, when=finderTime.value;
  let headline,body,href,label;
  if(when==='now'){
    if(['clothing','food','care'].includes(item)){
      headline='Start with the Gamecock CommUnity Shop.';
      body='It is an existing USC donation option during the academic year. Confirm the accepted condition and type before donating; posted weekday hours are 9 a.m.–5 p.m., with donation bins outside the shop.';
      href=shopLink;label='Check official Shop details';
    }else if(item==='dishes' || item==='other'){
      headline='Ask the receiving program first.';
      body='The CommUnity Shop lists home goods and supplies, but not every individual item. Confirm acceptance and drop-off details before taking anything there.';
      href=shopLink;label='Contact / review the Shop';
    }else{
      headline='No verified year-round route for that appliance.';
      body='Small appliances appear in USC’s spring move-out guidance, not the CommUnity Shop’s published donation list. Do not leave one at an unapproved drop-off.';
      href=springLink;label='Review the spring program';
    }
  }else{
    if(item==='appliance'||item==='dishes'||item==='clothing'||item==='food'||item==='care'){
      headline='Check USC Housing’s official spring collection notice.';
      body='USC has described this category in spring Give It Up for Good collections. Residence hall boxes are seasonal; confirm that spring 2027 bins are open and that the item is accepted.';
      href=springLink;label='Read the USC overview';
    }else{
      headline='Confirm the collection rules before bringing it.';
      body='Spring bins do not accept every item. Ask Housing, the CommUnity Shop, or a local receiving organization about the appropriate route.';
      href=springLink;label='See spring guidance';
    }
  }
  finderResult.replaceChildren();
  const strong=document.createElement('strong');strong.textContent=headline;
  const text=document.createElement('span');text.textContent=body+' ';
  const a=document.createElement('a');a.href=href;a.target='_blank';a.rel='noopener noreferrer';a.textContent=label+' ↗';
  finderResult.append(strong,text,a);
}
finderItem?.addEventListener('change',renderFinder);
finderTime?.addEventListener('change',renderFinder);
renderFinder();

const socialMessages = {
  movein:{ headline:'LESS STUFF.<br />MORE GOOD.', caption:'Moving in? Here’s one thing to remember: when you don’t need something anymore, you can give it another life. Learn about USC’s donation options before move-out sneaks up on you. #GiveItUpForGood' },
  midyear:{ headline:'MAKE ROOM.<br />MAKE IMPACT.', caption:'A mid-semester closet clean-out can do more good than you think. Set aside clean, usable belongings and check the Gamecock CommUnity Shop’s official donation details. #GiveItUpForGood' },
  moveout:{ headline:'DON’T DUMP IT.<br />DONATE IT.', caption:'Packing up? Your clothes, dishes and other usable essentials could have a second life. Check University Housing’s current Give It Up for Good dates, items and bins before spring move-out. #GiveItUpForGood' }
};
let chosenMessage='movein';
const socialHeadline=document.querySelector('#social-headline');
const socialCaption=document.querySelector('#social-caption');
document.querySelectorAll('.share-choice').forEach(button=>button.addEventListener('click',()=>{
  chosenMessage=button.dataset.message;
  if(socialHeadline) socialHeadline.innerHTML=socialMessages[chosenMessage].headline; // trusted static strings only
  if(socialCaption) socialCaption.textContent=socialMessages[chosenMessage].caption;
  document.querySelectorAll('.share-choice').forEach(other=>{
    let chosen=button===other;other.classList.toggle('selected',chosen);other.setAttribute('aria-pressed',String(chosen));
  });
}));
let toastTimeout;
function showToast(message){
  const toast=document.querySelector('#toast');
  if(!toast)return;
  toast.textContent=message;toast.classList.add('show');
  window.clearTimeout(toastTimeout);
  toastTimeout=window.setTimeout(()=>toast.classList.remove('show'),2800);
}
document.querySelector('#copy-caption')?.addEventListener('click',async()=>{
  const text=socialMessages[chosenMessage].caption;
  try{
    if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(text);}else{throw Error('Clipboard unavailable')}
    showToast('Sample caption copied!');
  }catch{
    const input=document.createElement('textarea');input.value=text;input.style.position='fixed';input.style.opacity='0';document.body.append(input);input.select();
    try{ if(document.execCommand('copy')){showToast('Sample caption copied!');}else{showToast('Select and copy the sample caption above.');} }
    catch{showToast('Select and copy the sample caption above.');}
    input.remove();
  }
});

const menuToggle=document.querySelector('#menu-toggle');
const nav=document.querySelector('#main-nav');
menuToggle?.addEventListener('click',()=>{
  const isOpen=nav?.classList.toggle('open')||false;
  menuToggle.setAttribute('aria-expanded',String(isOpen));
  menuToggle.setAttribute('aria-label',isOpen?'Close menu':'Open menu');
});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  nav.classList.remove('open');menuToggle?.setAttribute('aria-expanded','false');menuToggle?.setAttribute('aria-label','Open menu');
}));
