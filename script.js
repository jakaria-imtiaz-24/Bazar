
// ---- Data ----
const categories = [
  { id:'fruits', nameBn:'ফলমূল', icon:'🍎', image:'images/category-fruits.jpg', count:45 },
  { id:'vegetables', nameBn:'সবজি', icon:'🥬', image:'images/category-vegetables.jpg', count:62 },
  { id:'fish', nameBn:'মাছ', icon:'🐟', image:'images/category-fish.jpg', count:38 },
  { id:'clothing', nameBn:'জামাকাপড়', icon:'👕', image:'images/category-clothing.jpg', count:85 },
];

const products = [
  {id:1,nameBn:'আম',price:120,originalPrice:150,unitBn:'কেজি',category:'fruits',image:'🥭',badgeBn:'তাজা',rating:4.8,reviews:234},
  {id:2,nameBn:'কলা',price:60,unitBn:'ডজন',category:'fruits',image:'🍌',rating:4.5,reviews:189},
  {id:3,nameBn:'আপেল',price:250,originalPrice:300,unitBn:'কেজি',category:'fruits',image:'🍎',badgeBn:'বিদেশি',rating:4.6,reviews:156},
  {id:4,nameBn:'পেঁপে',price:40,unitBn:'পিস',category:'fruits',image:'🍈',rating:4.2,reviews:98},
  {id:5,nameBn:'কমলা',price:180,originalPrice:220,unitBn:'কেজি',category:'fruits',image:'🍊',badgeBn:'মৌসুমি',rating:4.7,reviews:210},
  {id:6,nameBn:'আঙুর',price:320,unitBn:'কেজি',category:'fruits',image:'🍇',badgeBn:'প্রিমিয়াম',rating:4.9,reviews:167},
  {id:7,nameBn:'আলু',price:30,unitBn:'কেজি',category:'vegetables',image:'🥔',rating:4.3,reviews:345},
  {id:8,nameBn:'টমেটো',price:50,originalPrice:70,unitBn:'কেজি',category:'vegetables',image:'🍅',badgeBn:'জৈব',rating:4.5,reviews:278},
  {id:9,nameBn:'বেগুন',price:40,unitBn:'কেজি',category:'vegetables',image:'🍆',rating:4.1,reviews:134},
  {id:10,nameBn:'ফুলকপি',price:35,unitBn:'পিস',category:'vegetables',image:'🥦',rating:4.4,reviews:189},
  {id:11,nameBn:'কাঁচামরিচ',price:80,unitBn:'কেজি',category:'vegetables',image:'🌶️',badgeBn:'ঝাল',rating:4.0,reviews:112},
  {id:12,nameBn:'করলা',price:60,unitBn:'কেজি',category:'vegetables',image:'🥒',rating:3.9,reviews:87},
  {id:13,nameBn:'রুই মাছ',price:350,originalPrice:400,unitBn:'কেজি',category:'fish',image:'🐟',badgeBn:'তাজা',rating:4.7,reviews:298},
  {id:14,nameBn:'ইলিশ মাছ',price:1200,originalPrice:1500,unitBn:'কেজি',category:'fish',image:'🐠',badgeBn:'প্রিমিয়াম',rating:4.9,reviews:456},
  {id:15,nameBn:'কাতলা মাছ',price:380,unitBn:'কেজি',category:'fish',image:'🐡',rating:4.5,reviews:213},
  {id:16,nameBn:'চিংড়ি মাছ',price:650,originalPrice:800,unitBn:'কেজি',category:'fish',image:'🦐',badgeBn:'জাম্বো',rating:4.8,reviews:324},
  {id:17,nameBn:'তেলাপিয়া মাছ',price:180,unitBn:'কেজি',category:'fish',image:'🐟',rating:4.2,reviews:167},
  {id:18,nameBn:'শুটকি মাছ',price:500,unitBn:'কেজি',category:'fish',image:'🐟',badgeBn:'ঐতিহ্যবাহী',rating:4.3,reviews:145},
  {id:19,nameBn:'সুতি শাড়ি',price:850,originalPrice:1200,unitBn:'পিস',category:'clothing',image:'👗',badgeBn:'বেস্টসেলার',rating:4.8,reviews:389},
  {id:20,nameBn:'পাঞ্জাবি',price:1200,originalPrice:1600,unitBn:'পিস',category:'clothing',image:'👔',badgeBn:'নতুন',rating:4.6,reviews:267},
  {id:21,nameBn:'টি-শার্ট',price:450,unitBn:'পিস',category:'clothing',image:'👕',rating:4.4,reviews:423},
  {id:22,nameBn:'সালোয়ার কামিজ',price:1500,originalPrice:2000,unitBn:'পিস',category:'clothing',image:'👗',badgeBn:'এলিগ্যান্ট',rating:4.7,reviews:312},
  {id:23,nameBn:'লুঙ্গি',price:350,unitBn:'পিস',category:'clothing',image:'🧣',rating:4.3,reviews:198},
  {id:24,nameBn:'জুব্বা',price:1800,originalPrice:2200,unitBn:'পিস',category:'clothing',image:'🧥',badgeBn:'প্রিমিয়াম',rating:4.9,reviews:156},
];

// Bangla numerals
const bn = n => String(n).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[d]);

// State
let cart = JSON.parse(localStorage.getItem('bazar-cart') || '[]');
let selectedCategory = null;
let liked = new Set();

// ---- Render Categories ----
function renderCategories(){
  const el = document.getElementById('catGrid');
  el.innerHTML = categories.map(c => `
    <button class="cat-card ${selectedCategory===c.id?'selected':''}" data-cat="${c.id}">
      <div class="cat-bg" style="background-image:url('${c.image}')"></div>
      <div class="cat-overlay cat-c-${c.id}"></div>
      <div class="cat-dark"></div>
      <div class="cat-content">
        <span class="cat-icon">${c.icon}</span>
        <h3>${c.nameBn}</h3>
        <p>${bn(c.count)}+ পণ্য</p>
      </div>
      ${selectedCategory===c.id?'<div class="cat-check">✓</div>':''}
    </button>
  `).join('');
  el.querySelectorAll('.cat-card').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const id = btn.dataset.cat;
      selectedCategory = selectedCategory===id ? null : id;
      renderAll();
    });
  });
}

// ---- Render Products ----
function stars(rating){
  const full = Math.floor(rating);
  let s = '';
  for(let i=0;i<5;i++) s += i<full ? '★' : '<span class="off">★</span>';
  return s;
}

function productHTML(p){
  const inCart = cart.find(c=>c.id===p.id);
  const discount = p.originalPrice ? Math.round((p.originalPrice - p.price)/p.originalPrice*100) : 0;
  return `
    <div class="product p-${p.category}">
      <div class="p-badges">
        ${discount?`<span class="p-badge b-discount">-${bn(discount)}%</span>`:''}
        ${p.badgeBn?`<span class="p-badge b-tag">${p.badgeBn}</span>`:''}
      </div>
      <button class="p-like ${liked.has(p.id)?'liked':''}" data-like="${p.id}">${liked.has(p.id)?'❤️':'🤍'}</button>
      <div class="p-image">${p.image}</div>
      <div class="p-info">
        <h3 class="p-name">${p.nameBn}</h3>
        <div class="p-rating">
          <span class="stars">${stars(p.rating)}</span>
          <span>(${bn(p.reviews)})</span>
        </div>
        <div class="p-price">
          <strong>৳${bn(p.price)}</strong>
          ${p.originalPrice?`<span class="p-original">৳${bn(p.originalPrice)}</span>`:''}
          <span class="p-unit">/${p.unitBn}</span>
        </div>
        ${inCart ? `
          <div class="qty-ctrl">
            <button class="qty-btn" data-dec="${p.id}">−</button>
            <span class="qty-num">${bn(inCart.qty)}</span>
            <button class="qty-btn plus" data-inc="${p.id}">+</button>
          </div>
        ` : `
          <button class="add-btn" data-add="${p.id}">🛒 কার্টে যোগ করুন</button>
        `}
      </div>
    </div>
  `;
}

function renderProducts(){
  const discountSection = document.getElementById('discountSection');
  const topTitle = document.getElementById('topTitle');
  const topSub = document.getElementById('topSubtitle');
  const topIcon = document.getElementById('topIcon');

  if(selectedCategory){
    discountSection.style.display = 'none';
    const cat = categories.find(c=>c.id===selectedCategory);
    topTitle.textContent = `${cat.nameBn} — সকল পণ্য`;
    topSub.textContent = `সেরা মানের ${cat.nameBn} পাবেন এখানে`;
    topIcon.textContent = cat.icon;
    document.getElementById('topGrid').innerHTML = products.filter(p=>p.category===selectedCategory).map(productHTML).join('');
  } else {
    discountSection.style.display = '';
    topTitle.textContent = 'জনপ্রিয় পণ্য';
    topSub.textContent = 'সবচেয়ে বেশি বিক্রি হওয়া পণ্য';
    topIcon.textContent = '📈';
    document.getElementById('discountGrid').innerHTML = products.filter(p=>p.originalPrice).map(productHTML).join('');
    document.getElementById('topGrid').innerHTML = [...products].sort((a,b)=>b.rating-a.rating).slice(0,8).map(productHTML).join('');
  }
  bindProductActions();
}

function bindProductActions(){
  document.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>{addItem(+b.dataset.add)});
  document.querySelectorAll('[data-inc]').forEach(b=>b.onclick=()=>{updateQty(+b.dataset.inc,1)});
  document.querySelectorAll('[data-dec]').forEach(b=>b.onclick=()=>{updateQty(+b.dataset.dec,-1)});
  document.querySelectorAll('[data-like]').forEach(b=>b.onclick=()=>{
    const id=+b.dataset.like; liked.has(id)?liked.delete(id):liked.add(id); renderProducts();
  });
}

// ---- Cart ----
function saveCart(){ localStorage.setItem('bazar-cart', JSON.stringify(cart)); }

function addItem(id){
  const ex = cart.find(c=>c.id===id);
  if(ex) ex.qty++;
  else cart.push({id, qty:1});
  saveCart(); renderAll();
}
function updateQty(id, delta){
  const it = cart.find(c=>c.id===id);
  if(!it) return;
  it.qty += delta;
  if(it.qty<=0) cart = cart.filter(c=>c.id!==id);
  saveCart(); renderAll();
}
function removeItem(id){ cart = cart.filter(c=>c.id!==id); saveCart(); renderAll(); }
function clearCart(){ cart = []; saveCart(); renderAll(); }

function renderCart(){
  const total = cart.reduce((s,c)=>{
    const p = products.find(p=>p.id===c.id);
    return s + (p?p.price*c.qty:0);
  },0);
  const totalItems = cart.reduce((s,c)=>s+c.qty,0);

  const cc = document.getElementById('cartCount');
  if(totalItems>0){ cc.style.display=''; cc.textContent = bn(totalItems); }
  else cc.style.display='none';

  document.getElementById('cartItemsLabel').textContent = `${bn(totalItems)}টি পণ্য`;
  const body = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');

  if(cart.length===0){
    body.innerHTML = `<div class="cart-empty">
      <div class="emoji">🛒</div>
      <p>কার্ট খালি!</p>
      <small>আপনার পছন্দের পণ্য যোগ করুন</small>
    </div>`;
    footer.style.display='none';
    return;
  }

  body.innerHTML = cart.map(c=>{
    const p = products.find(p=>p.id===c.id);
    return `<div class="cart-item">
      <div class="cart-item-img">${p.image}</div>
      <div class="cart-item-info">
        <h4>${p.nameBn}</h4>
        <div class="price">৳${bn(p.price*c.qty)} <small>(৳${bn(p.price)}/${p.unitBn})</small></div>
        <div class="cart-item-ctrl">
          <button data-dec="${p.id}">−</button>
          <span>${bn(c.qty)}</span>
          <button data-inc="${p.id}">+</button>
        </div>
      </div>
      <button class="cart-item-del" data-rm="${p.id}">🗑️</button>
    </div>`;
  }).join('');

  document.getElementById('cartTotal').textContent = `৳${bn(total)}`;
  footer.style.display='';

  body.querySelectorAll('[data-inc]').forEach(b=>b.onclick=()=>updateQty(+b.dataset.inc,1));
  body.querySelectorAll('[data-dec]').forEach(b=>b.onclick=()=>updateQty(+b.dataset.dec,-1));
  body.querySelectorAll('[data-rm]').forEach(b=>b.onclick=()=>removeItem(+b.dataset.rm));
}

function renderAll(){ renderCategories(); renderProducts(); renderCart(); }

// ---- UI bindings ----
const sidebar = document.getElementById('cartSidebar');
const backdrop = document.getElementById('cartBackdrop');
function openCart(){ sidebar.classList.add('open'); backdrop.classList.add('open'); }
function closeCart(){ sidebar.classList.remove('open'); backdrop.classList.remove('open'); }
document.getElementById('openCart').onclick = openCart;
document.getElementById('openCartMobile').onclick = openCart;
document.getElementById('closeCart').onclick = closeCart;
backdrop.onclick = closeCart;
document.getElementById('clearCart').onclick = clearCart;
document.getElementById('menuToggle').onclick = ()=>{
  document.getElementById('mobileMenu').classList.toggle('open');
};

renderAll();
