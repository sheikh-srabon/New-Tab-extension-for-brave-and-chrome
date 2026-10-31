const $=id=>document.getElementById(id);
const defaults=[
 {name:'Google',url:'https://google.com'},{name:'YouTube',url:'https://youtube.com'},
 {name:'GitHub',url:'https://github.com'},{name:'Gmail',url:'https://mail.google.com'},
 {name:'Wikipedia',url:'https://wikipedia.org'},{name:'ChatGPT',url:'https://chatgpt.com'}
];
const motivations=[
 ['The secret of getting ahead is getting started.','MARK TWAIN'],
 ['Great things are done by a series of small things brought together.','VINCENT VAN GOGH'],
 ['It always seems impossible until it is done.','NELSON MANDELA'],
 ['Well done is better than well said.','BENJAMIN FRANKLIN'],
 ['The future depends on what you do today.','MAHATMA GANDHI']
];
const ayat=[
 ['فَإِنَّ مَعَ الْعُسْرِ يُسْرًا','নিশ্চয়ই কষ্টের সাথেই রয়েছে স্বস্তি।','সূরা আশ-শারহ · ৯৪:৫'],
 ['لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا','আল্লাহ কোনো ব্যক্তির ওপর তার সাধ্যের বাইরে দায়িত্ব চাপিয়ে দেন না।','সূরা আল-বাকারা · ২:২৮৬'],
 ['وَلَا تَهِنُوا وَلَا تَحْزَنُوا','তোমরা হীনবল হয়ো না এবং দুঃখিত হয়ো না।','সূরা আলে ইমরান · ৩:১৩৯'],
 ['إِنَّ اللَّهَ مَعَ الصَّابِرِينَ','নিশ্চয়ই আল্লাহ ধৈর্যশীলদের সঙ্গে রয়েছেন।','সূরা আল-বাকারা · ২:১৫৩']
];
let links=defaults.slice(),tasks=[],events=[],focusSeconds=1500,focusRunning=false,focusInterval=null,dragged=null;
const persist=data=>chrome.storage.local.set(data);
function updateClock(){
 const d=new Date(),h=d.getHours(),m=d.getMinutes(),s=d.getSeconds();
 $('hourHand').style.transform=`rotate(${(h%12)*30+m*.5}deg)`;
 $('minuteHand').style.transform=`rotate(${m*6+s*.1}deg)`;
 $('secondHand').style.transform=`rotate(${s*6}deg)`;
 $('digitalTime').textContent=d.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:true});
 $('greeting').textContent=h<12?'GOOD MORNING':h<18?'GOOD AFTERNOON':'GOOD EVENING';
 $('date').textContent=d.toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
 $('calendarDate').textContent=d.toLocaleDateString('en-GB',{day:'2-digit',month:'short'});
 $('calendarSub').textContent=d.toLocaleDateString('en-GB',{weekday:'long',year:'numeric'});
}
for(let i=0;i<60;i++){const t=document.createElement('i');t.className='tick'+(i%5===0?' major':'');t.style.transform=`rotate(${i*6}deg)`;$('clockTicks').append(t)}
function renderLinks(){
 const grid=$('shortcutGrid');grid.innerHTML='';
 links.forEach((l,i)=>{
  const a=document.createElement('a');a.className='shortcut';a.href=l.url;a.title=l.url;
  const icon=document.createElement('span');icon.className='shortcut-icon';icon.textContent=l.name.slice(0,2).toUpperCase();
  const label=document.createElement('span');label.textContent=l.name;
  const del=document.createElement('button');del.className='shortcut-del';del.type='button';del.textContent='×';
  del.onclick=e=>{e.preventDefault();e.stopPropagation();links.splice(i,1);persist({links});renderLinks()};
  a.append(icon,label,del);grid.append(a);
 });
}
function renderTasks(){
 const list=$('taskList');list.innerHTML='';
 tasks.forEach((t,i)=>{
  const li=document.createElement('li');li.className=t.done?'done':'';
  const cb=document.createElement('input');cb.type='checkbox';cb.checked=t.done;cb.onchange=()=>{tasks[i].done=cb.checked;persist({tasks});renderTasks()};
  const span=document.createElement('span');span.textContent=t.text;
  const del=document.createElement('button');del.className='delete-task';del.textContent='×';del.onclick=()=>{tasks.splice(i,1);persist({tasks});renderTasks()};
  li.append(cb,span,del);list.append(li);
 });
 $('taskCounter').textContent=`${tasks.filter(t=>!t.done).length} LEFT`;$('taskEmpty').style.display=tasks.length?'none':'block';
}
function renderEvents(){const ul=$('eventList');ul.innerHTML='';events.forEach((ev,i)=>{const li=document.createElement('li');li.textContent='• '+ev;ul.append(li)})}
function showMotivation(){const q=motivations[Math.floor(Math.random()*motivations.length)];$('motivationQuote').textContent='“'+q[0]+'”';$('motivationAuthor').textContent='— '+q[1]}
function showAyat(){const q=ayat[Math.floor(Math.random()*ayat.length)];$('arabicAyat').textContent=q[0];$('ayatMeaning').textContent=q[1];$('ayatRef').textContent=q[2]}
function openModal(id){$(id).classList.add('open')}function closeModal(id){$(id).classList.remove('open')}
$('searchForm').onsubmit=e=>{e.preventDefault();const q=$('searchInput').value.trim();if(q)location.href='https://search.brave.com/search?q='+encodeURIComponent(q)};
$('taskForm').onsubmit=e=>{e.preventDefault();const v=$('taskInput').value.trim();if(v){tasks.push({text:v,done:false});persist({tasks});$('taskInput').value='';renderTasks()}};
$('addLink').onclick=()=>openModal('linkModal');
$('linkForm').onsubmit=e=>{e.preventDefault();let url=$('linkUrl').value.trim();if(!/^https?:\/\//i.test(url))url='https://'+url;links.push({name:$('linkName').value.trim(),url});persist({links});renderLinks();closeModal('linkModal');e.target.reset()};
$('addEvent').onclick=()=>{const v=$('eventInput').value.trim();if(v){events.push(v);persist({events});$('eventInput').value='';renderEvents()}};
$('newMotivation').onclick=showMotivation;$('nextAyat').onclick=showAyat;
$('settingsBtn').onclick=()=>openModal('settingsModal');
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>closeModal(b.dataset.close));
document.querySelectorAll('.modal-backdrop').forEach(m=>m.onclick=e=>{if(e.target===m)closeModal(m.id)});
$('notes').addEventListener('input',()=>{persist({notes:$('notes').value});$('noteStatus').textContent='Saved locally'});
function renderFocus(){$('focusTime').textContent=String(Math.floor(focusSeconds/60)).padStart(2,'0')+':'+String(focusSeconds%60).padStart(2,'0');$('focusStart').textContent=focusRunning?'Pause':'Start';$('focusLabel').textContent=focusRunning?'FOCUS IN PROGRESS':'POMODORO SESSION'}
$('focusStart').onclick=()=>{focusRunning=!focusRunning;if(focusRunning){focusInterval=setInterval(()=>{if(focusSeconds>0){focusSeconds--;renderFocus()}else{clearInterval(focusInterval);focusRunning=false;$('focusLabel').textContent='SESSION COMPLETE';renderFocus()}},1000)}else clearInterval(focusInterval);renderFocus()};
$('focusReset').onclick=()=>{clearInterval(focusInterval);focusRunning=false;focusSeconds=1500;renderFocus()};
const dashboard=$('dashboard');
function enableDrag(){dashboard.querySelectorAll('.widget').forEach(w=>{
 w.addEventListener('dragstart',()=>{dragged=w;w.classList.add('dragging')});
 w.addEventListener('dragend',()=>{w.classList.remove('dragging');dashboard.querySelectorAll('.widget').forEach(x=>x.classList.remove('over'));persist({layout:[...dashboard.children].map(x=>x.dataset.widget)})});
 w.addEventListener('dragover',e=>{e.preventDefault();if(w!==dragged)w.classList.add('over')});
 w.addEventListener('dragleave',()=>w.classList.remove('over'));
 w.addEventListener('drop',e=>{e.preventDefault();if(dragged&&dragged!==w){const children=[...dashboard.children],from=children.indexOf(dragged),to=children.indexOf(w);dashboard.insertBefore(dragged,from<to?w.nextSibling:w);w.classList.remove('over')}})
})}
$('resetLayout').onclick=()=>{const order=['clock','weather','calendar','tasks','links','focus','motivation','quran','notes'];order.forEach(k=>{const el=dashboard.querySelector(`[data-widget="${k}"]`);if(el)dashboard.append(el)});persist({layout:order});closeModal('settingsModal')};
chrome.storage.local.get(['links','tasks','events','notes','layout'],d=>{
 if(Array.isArray(d.links))links=d.links;if(Array.isArray(d.tasks))tasks=d.tasks;if(Array.isArray(d.events))events=d.events;
 if(typeof d.notes==='string')$('notes').value=d.notes;
 if(Array.isArray(d.layout)){d.layout.forEach(k=>{const el=dashboard.querySelector(`[data-widget="${k}"]`);if(el)dashboard.append(el)})}
 renderLinks();renderTasks();renderEvents();enableDrag();
});
updateClock();setInterval(updateClock,1000);showMotivation();showAyat();renderFocus();
