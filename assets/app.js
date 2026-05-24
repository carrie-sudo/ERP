const MOCK = {
  masterData: [
    ['C-1001','客戶資料一','客戶','啟用','華北事業群','2026/05/22'],
    ['S-2001','供應商資料一','供應商','啟用','採購中心','2026/05/21'],
    ['P-3001','產品料號一','產品','草稿','產品管理部','2026/05/20'],
    ['D-4001','部門資料一','部門','啟用','人資行政部','2026/05/18'],
    ['E-5001','員工資料一','員工','停用','人資行政部','2026/05/17'],
    ['W-6001','倉別資料一','倉別','啟用','物流管理部','2026/05/17'],
    ['T-7001','付款條件一','條件','啟用','財務管理部','2026/05/16'],
    ['C-1002','客戶資料二','客戶','啟用','華南事業群','2026/05/15'],
    ['S-2002','供應商資料二','供應商','草稿','採購中心','2026/05/15'],
    ['P-3002','產品料號二','產品','啟用','產品管理部','2026/05/14'],
    ['E-5002','員工資料二','員工','啟用','人資行政部','2026/05/14'],
    ['W-6002','倉別資料二','倉別','啟用','物流管理部','2026/05/13']
  ],
  procurement: [
    ['PO-202605-001','供應商一','待審核','125,000','李採購','2026/05/24'],
    ['PO-202605-002','供應商二','進行中','89,200','王採購','2026/05/24'],
    ['PO-202605-003','供應商三','已完成','42,500','陳採購','2026/05/23'],
    ['PO-202605-004','供應商四','已退回','15,200','李採購','2026/05/23'],
    ['PO-202605-005','供應商五','進行中','220,000','黃採購','2026/05/22'],
    ['PO-202605-006','供應商六','草稿','9,800','黃採購','2026/05/22'],
    ['PO-202605-007','供應商七','待審核','64,500','陳採購','2026/05/21'],
    ['PO-202605-008','供應商八','已完成','305,700','王採購','2026/05/21'],
    ['PO-202605-009','供應商九','進行中','120,900','李採購','2026/05/20'],
    ['PO-202605-010','供應商十','草稿','19,700','黃採購','2026/05/20']
  ],
  sales: [
    ['SO-202605-001','客戶一','待出貨','158,000','北區業務','2026/05/24'],
    ['SO-202605-002','客戶二','已完成','92,400','南區業務','2026/05/24'],
    ['SO-202605-003','客戶三','待審核','76,800','海外業務','2026/05/23'],
    ['SO-202605-004','客戶四','進行中','205,900','北區業務','2026/05/23'],
    ['SO-202605-005','客戶五','已退回','14,000','南區業務','2026/05/22'],
    ['SO-202605-006','客戶六','待出貨','320,500','海外業務','2026/05/22'],
    ['SO-202605-007','客戶七','已完成','51,200','北區業務','2026/05/21'],
    ['SO-202605-008','客戶八','進行中','63,900','南區業務','2026/05/21'],
    ['SO-202605-009','客戶九','待審核','49,800','海外業務','2026/05/20']
  ],
  inventory: [
    ['INV-0001','產品料號一','A倉','1,280','安全','2026/05/24'],
    ['INV-0002','產品料號二','A倉','250','預警','2026/05/24'],
    ['INV-0003','產品料號三','B倉','86','缺貨','2026/05/24'],
    ['INV-0004','產品料號四','C倉','2,940','安全','2026/05/23'],
    ['INV-0005','產品料號五','B倉','1,120','安全','2026/05/23'],
    ['INV-0006','產品料號六','D倉','430','預警','2026/05/22'],
    ['INV-0007','產品料號七','A倉','0','缺貨','2026/05/22'],
    ['INV-0008','產品料號八','D倉','1,720','安全','2026/05/21']
  ],
  approvals: [
    ['APV-001','採購單 PO-202605-001','待我簽核','採購中心','10 分鐘前'],
    ['APV-002','請假單 LV-202605-006','待我簽核','人資行政部','30 分鐘前'],
    ['APV-003','銷售單 SO-202605-003','補件中','銷售管理部','1 小時前'],
    ['APV-004','費用申請 EX-202605-022','已完成','財務管理部','今天'],
    ['APV-005','盤點差異單 STK-202605-011','退回','物流管理部','昨天']
  ],
  reports: [
    ['RPT-001','經營總覽','董事會','已更新','2026/05/24'],
    ['RPT-002','銷售分析','業務主管','已更新','2026/05/24'],
    ['RPT-003','採購分析','採購主管','排程中','2026/05/23'],
    ['RPT-004','庫存週轉','營運主管','已更新','2026/05/23'],
    ['RPT-005','人力分析','人資主管','草稿','2026/05/22']
  ]
};

function getStatusTag(status){
  const map = {
    '啟用':'success','已完成':'success','安全':'success',
    '進行中':'info','待出貨':'info','排程中':'info',
    '草稿':'neutral','待我簽核':'warning','待審核':'warning','預警':'warning',
    '已退回':'error','退回':'error','補件中':'error','缺貨':'error','停用':'error'
  };
  const cls = map[status] || 'neutral';
  return `<span class="tag ${cls}">${status}</span>`;
}

function renderTable(id, rows, options={}){
  const table = document.getElementById(id);
  if(!table) return;
  const tbody = table.querySelector('tbody');
  const pager = table.closest('.table-card')?.querySelector('[data-pagination]');
  const count = table.closest('.table-card')?.querySelector('[data-count]');
  const q = (document.querySelector(`[data-search="${id}"]`)?.value || '').trim();
  const status = document.querySelector(`[data-status="${id}"]`)?.value || '全部';
  const pageSize = Number(document.querySelector(`[data-pagesize="${id}"]`)?.value || options.pageSize || 5);
  let filtered = rows.filter(row => row.join(' ').includes(q));
  if(status !== '全部') filtered = filtered.filter(row => row.includes(status));
  const page = Number(table.dataset.page || 1);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  table.dataset.page = safePage;
  const start = (safePage - 1) * pageSize;
  const view = filtered.slice(start, start + pageSize);
  tbody.innerHTML = view.map(row => {
    return `<tr>${row.map((cell, idx) => {
      const isStatus = options.statusIndex === idx;
      const cls = options.numericIndices?.includes(idx) ? 'numeric' : '';
      return `<td class="${cls}">${isStatus ? getStatusTag(cell) : cell}</td>`;
    }).join('')}</tr>`;
  }).join('') || `<tr><td colspan="${options.columns || 6}"><div class="empty-state">沒有符合條件的資料</div></td></tr>`;
  if(count) count.textContent = `共 ${filtered.length} 筆資料`;
  if(pager) {
    pager.innerHTML = '';
    const prev = document.createElement('button');
    prev.className = 'page-btn'; prev.textContent = '‹'; prev.disabled = safePage === 1;
    prev.onclick = () => { table.dataset.page = Math.max(1, safePage - 1); renderTable(id, rows, options); };
    pager.appendChild(prev);
    for(let i=1;i<=totalPages;i++){
      const btn = document.createElement('button');
      btn.className = `page-btn ${i===safePage ? 'active' : ''}`;
      btn.textContent = i;
      btn.onclick = () => { table.dataset.page = i; renderTable(id, rows, options); };
      pager.appendChild(btn);
    }
    const next = document.createElement('button');
    next.className = 'page-btn'; next.textContent = '›'; next.disabled = safePage === totalPages;
    next.onclick = () => { table.dataset.page = Math.min(totalPages, safePage + 1); renderTable(id, rows, options); };
    pager.appendChild(next);
  }
}

function wireTable(id, rows, options){
  ['search','status','pagesize'].forEach(type => {
    const el = document.querySelector(`[data-${type}="${id}"]`);
    if(el) el.addEventListener(type === 'search' ? 'input' : 'change', () => { document.getElementById(id).dataset.page = 1; renderTable(id, rows, options); });
  });
  renderTable(id, rows, options);
}

function setupDemoInteractions(){
  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const msg = btn.dataset.openModal || '示意互動：此操作在高擬真網站原型中已連動，可於後續 Figma 與前端階段延伸為正式流程。';
      const box = document.getElementById('demo-modal');
      if(!box) return;
      box.querySelector('[data-modal-message]').textContent = msg;
      box.showModal();
    });
  });
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => document.getElementById('demo-modal')?.close());
  });
}

window.addEventListener('DOMContentLoaded', () => {
  wireTable('master-table', MOCK.masterData, {statusIndex:3, columns:6});
  wireTable('procurement-table', MOCK.procurement, {statusIndex:2, numericIndices:[3], columns:6});
  wireTable('sales-table', MOCK.sales, {statusIndex:2, numericIndices:[3], columns:6});
  wireTable('inventory-table', MOCK.inventory, {statusIndex:4, numericIndices:[3], columns:6});
  wireTable('approval-table', MOCK.approvals, {statusIndex:2, columns:5});
  wireTable('report-table', MOCK.reports, {statusIndex:3, columns:5});
  setupDemoInteractions();
  const current = document.body.dataset.page;
  document.querySelectorAll('.nav-link').forEach(a => {
    if(a.dataset.page === current) a.classList.add('active');
  });
});
