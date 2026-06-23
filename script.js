const keywords = [
  { keyword: 'Camping Tents', searches: '100K - 1M', demand: 550000, three: 0, yoy: 0, competition: 'High', low: 0.25, high: 0.82, insight: 'Broad, high-volume demand makes this the strongest awareness and conversion bridge. Coleman should pair paid search with tent comparison pages and family-camping creative.' },
  { keyword: 'Coleman Tents', searches: '10K-100K', demand: 55000, three: 900, yoy: 0, competition: 'High', low: 0.27, high: 1.15, insight: 'Branded intent is surging. Coleman should defend this term, use sitelinks for best sellers, and retarget visitors with accessories and seasonal offers.' },
  { keyword: 'Camping Equipment', searches: '10K-100K', demand: 55000, three: 0, yoy: 0, competition: 'High', low: 0.32, high: 1.12, insight: 'This term supports cross-selling because shoppers may need more than tents. Use bundles, checklists, and organic guides to raise basket size.' },
  { keyword: 'Sale on Tents', searches: '10K-100K', demand: 55000, three: 0, yoy: 0, competition: 'High', low: 0.25, high: 1.57, insight: 'Deal-seeking intent is explicit. Coleman can tailor offers, urgency messages, and promotional landing pages without discounting every product.' },
  { keyword: 'Outdoors Tents', searches: '10K-100K', demand: 55000, three: 0, yoy: -90, competition: 'High', low: 0.28, high: 2.04, insight: 'The YoY decline and highest bid ceiling make this a test-and-learn keyword. Use limited budget and validate whether customers actually use this phrasing.' },
  { keyword: 'Outdoors Equipment', searches: '1K-10K', demand: 5500, three: 0, yoy: 0, competition: 'High', low: 0.24, high: 1.63, insight: 'Lower volume but inexpensive entry can support niche content and equipment bundles, especially for new shoppers exploring outdoor categories.' },
  { keyword: 'Outdoors Accommodations', searches: '10-100', demand: 55, three: 0, yoy: 0, competition: 'Low', low: null, high: null, insight: 'This is a low-volume discovery term. Coleman should treat it as content research for tents as temporary accommodations, not as a primary paid-search target.' }
];
const segmentCopy = {
  families: 'Family campers care about capacity, durability, weather protection, and fast setup. Tailor copy toward tent size, comfort, and safety.',
  deal: 'Deal seekers respond to sale language, price anchors, bundles, and limited-time promotions. Connect “Sale on Tents” to promotional landing pages.',
  brand: 'Brand loyalists already know Coleman. Use “Coleman Tents” to defend branded traffic, highlight trust, and upsell accessories.',
  new: 'New outdoor shoppers need education. Use “Camping Equipment” and “Outdoors Equipment” for checklists, explainers, and starter kits.'
};
let current = keywords[0];
const rows = document.getElementById('keywordRows');
const barChart = document.getElementById('barChart');
const bidChart = document.getElementById('bidChart');
function money(v){ return v == null ? '-' : `$${v.toFixed(2)}`; }
function renderTable(data){ rows.innerHTML = data.map(k => `<tr data-keyword="${k.keyword}" class="${k.keyword===current.keyword?'active':''}"><td><strong>${k.keyword}</strong></td><td>${k.searches}</td><td>${k.three>0?'+':''}${k.three}%</td><td>${k.yoy>0?'+':''}${k.yoy}%</td><td>${k.competition}</td><td>${money(k.low)}</td><td>${money(k.high)}</td></tr>`).join(''); }
function renderBars(data){ const max = Math.max(...keywords.map(k=>k.demand)); barChart.innerHTML = data.map(k => `<div class="bar-row ${k.keyword===current.keyword?'highlight':''}"><span class="bar-label">${k.keyword}</span><div class="bar-track"><div class="bar" style="width:${Math.max(2,k.demand/max*100)}%"></div></div><span>${k.searches}</span></div>`).join(''); }
function renderBids(data){ const max = 2.1; bidChart.innerHTML = data.filter(k=>k.high).map(k => `<div class="bid-item"><strong>${k.keyword}</strong><div class="bid-line"><span class="bid-range" style="left:${k.low/max*100}%;width:${(k.high-k.low)/max*100}%"></span></div><small>${money(k.low)} to ${money(k.high)}</small></div>`).join('') + '<p><small>Outdoors Accommodations has no available bid range.</small></p>'; }
function updateSelected(k=current){ current = k; document.getElementById('selectedKeyword').textContent = k.keyword; document.getElementById('selectedInsight').textContent = `${k.insight} ${segmentCopy[document.getElementById('segmentSelect').value]}`; document.getElementById('selectedMetrics').innerHTML = `<div><b>${k.searches}</b><span>Monthly searches</span></div><div><b>${k.three>0?'+':''}${k.three}%</b><span>3-month change</span></div><div><b>${money(k.low)}–${money(k.high)}</b><span>Bid range</span></div>`; renderTable(getSorted()); renderBars(getSorted()); }
function getSorted(){ const v=document.getElementById('sortSelect').value; return [...keywords].sort((a,b)=> v==='growth'?b.three-a.three : v==='lowBid'?(a.low??99)-(b.low??99) : v==='highBid'?(b.high??-1)-(a.high??-1) : b.demand-a.demand); }
function rerender(){ const data=getSorted(); renderTable(data); renderBars(data); renderBids(data); updateSelected(current); }
rows.addEventListener('click', e => { const tr=e.target.closest('tr'); if(!tr) return; updateSelected(keywords.find(k=>k.keyword===tr.dataset.keyword)); });
document.getElementById('sortSelect').addEventListener('change', rerender);
document.getElementById('segmentSelect').addEventListener('change', () => updateSelected(current));
document.getElementById('focusHighIntent').addEventListener('click', () => updateSelected(keywords[1]));
document.getElementById('resetView').addEventListener('click', () => { document.getElementById('sortSelect').value='demand'; document.getElementById('segmentSelect').value='families'; updateSelected(keywords[0]); rerender(); });
rerender();
