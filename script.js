const counters = document.querySelectorAll('.counter');
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting) return;
    const el=entry.target;
    if(el.dataset.done==='true') return;
    el.dataset.done='true';
    const target=parseInt(el.dataset.target,10);
    const suffix=el.dataset.suffix||'';
    const start=performance.now();
    const duration=1700;
    function tick(now){
      const progress=Math.min((now-start)/duration,1);
      const ease=1-Math.pow(1-progress,3);
      el.textContent=Math.floor(target*ease)+suffix;
      if(progress<1) requestAnimationFrame(tick);
      else el.textContent=target+suffix;
    }
    requestAnimationFrame(tick);
  });
},{threshold:.35});
counters.forEach(c=>observer.observe(c));

document.querySelectorAll('.glow-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const glow=card.querySelector('.glow-spot');
    if(!glow) return;
    const r=card.getBoundingClientRect();
    glow.style.left=(e.clientX-r.left)+'px';
    glow.style.top=(e.clientY-r.top)+'px';
  });
});

let currentSymbol = "BINANCE:BTCUSDT";
let currentName = "BTC / USDT";
function loadChart(symbol = currentSymbol){
  currentSymbol = symbol;
  const container = document.getElementById('mainChart');
  container.innerHTML = "";
  if(!window.TradingView) return setTimeout(()=>loadChart(symbol),300);
  new TradingView.widget({
    width:"100%",
    height:620,
    symbol:symbol,
    interval:"15",
    timezone:"Etc/UTC",
    theme:"dark",
    style:"1",
    locale:"en",
    toolbar_bg:"#050505",
    enable_publishing:false,
    allow_symbol_change:true,
    container_id:"mainChart",
    hide_side_toolbar:false,
    studies:["RSI@tv-basicstudies","MACD@tv-basicstudies"]
  });
}
loadChart();

document.querySelectorAll('.mini-tab').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.mini-tab').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelector('.chart-title').textContent = btn.dataset.name + " Live";
    loadChart(btn.dataset.symbol);
  });
});

document.getElementById('leadForm').addEventListener('submit', function(e){
  e.preventDefault();
  const data = new FormData(this);
  const msg = `Grow Funded Registration%0A%0AName: ${encodeURIComponent(data.get('name'))}%0AEmail: ${encodeURIComponent(data.get('email'))}%0ANumber: ${encodeURIComponent(data.get('number'))}%0ACity: ${encodeURIComponent(data.get('city'))}%0AAge: ${encodeURIComponent(data.get('age'))}%0AGender: ${encodeURIComponent(data.get('gender'))}`;
  window.open(`https://wa.me/917439026141?text=${msg}`,'_blank');
});
