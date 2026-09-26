// Màn hình Admin (D1–D7)
import { ic, P, G, av, gav, ibtn, btn, alink, input, field, badge, modal, scrim } from './ui.mjs';

const U = { ...P,
  dq: { n: 'Đỗ Quỳnh', i: 'ĐQ', u: 'doquynh', t: 3 },
  at: { n: 'Lương Anh Tú', i: 'AT', u: 'anhtu', t: 3 },
  ad: { n: 'Admin', i: 'AD', t: 4 },
};
const GG = { ...G,
  sv: { n: 'Săn vé concert', i: 'SV', t: 3 },
  bd: { n: 'Team bóng đá K22', i: 'BĐ', t: 2 },
  tc: { n: 'Ôn thi TOEIC', i: 'TC', t: 4 },
};

const anav = (active) => {
  const a = (key, icon, label, target, tail = '') => `<a class="${active === key ? 'on' : ''}" href="@@${target}@@">${ic(icon, 20)}${label}${tail}</a>`;
  return `<nav class="anav" aria-label="Điều hướng quản trị">
<div class="anav-brand"><span class="logo" aria-hidden="true">${ic('message-circle', 20)}</span><span class="col" style="gap: 0"><span class="fw6">ChatApp</span><span class="t-cap c2">Trang quản trị</span></span></div>
${a('dash', 'dashboard', 'Tổng quan', 'D1-Dashboard')}
${a('users', 'users', 'Người dùng', 'D2-Users')}
${a('groups', 'layers', 'Nhóm chat', 'D4-Groups')}
${a('reports', 'flag', 'Báo cáo', 'D7-Reports', '<span class="count">7</span>')}
<div class="spacer"></div>
<div class="row" style="gap: 10px; padding: 12px 8px; border-top: 1px solid var(--border)">${av(U.ad, 32, { online: false })}<span class="col grow" style="gap: 0"><span class="t-small fw5">Quản trị viên</span><span class="t-cap c2 trunc">admin@chatapp.local</span></span><a class="ibtn sm" href="@@A1-Login@@" aria-label="Đăng xuất">${ic('log-out', 18)}</a></div>
</nav>`;
};
const topbar = (title, sub, right = '', back = null) =>
  `<header class="topbar"><div class="row" style="gap: 12px">${back ? `<a class="ibtn bordered sm" href="@@${back}@@" aria-label="Quay lại">${ic('arrow-left', 18)}</a>` : ''}<div class="col" style="gap: 0"><h1 class="t-h2">${title}</h1>${sub ? `<span class="t-small c2">${sub}</span>` : ''}</div></div><div class="row">${right}</div></header>`;
const shell = (active, main) => `${anav(active)}<main class="main">${main}</main>`;
const select = (label, value) => `<button class="select"><span class="c3">${label}:</span>${value}${ic('chevron-down', 16)}</button>`;
const flag = (n) => (n >= 3 ? `<span class="flagcount">${ic('alert', 14)}${n}</span>` : `<span class="tnum">${n}</span>`);
const pager = (text) => `<div class="pager"><span>${text}</span><div class="row" style="gap: 4px">${ibtn('chevron-left', 'Trang trước', 'sm bordered', 16)}<button class="btn btn-subtle btn-sm" aria-current="page">1</button><button class="btn btn-ghost btn-sm">2</button><button class="btn btn-ghost btn-sm">3</button><span class="c3" style="padding: 0 4px">…</span><button class="btn btn-ghost btn-sm">139</button>${ibtn('chevron-right', 'Trang sau', 'sm bordered', 16)}</div></div>`;

// ---------- Charts ----------
const lineChart = (data, w = 640, h = 190) => {
  const max = 60;
  const step = w / (data.length - 1);
  const pts = data.map((v, i) => `${(i * step).toFixed(1)},${(h - (v / max) * h).toFixed(1)}`);
  const grid = [0, 0.25, 0.5, 0.75, 1].map((f) => `<line x1="0" x2="${w}" y1="${(h * f).toFixed(1)}" y2="${(h * f).toFixed(1)}" style="stroke: var(--border)" stroke-width="1" vector-effect="non-scaling-stroke"></line>`).join('');
  const last = pts[pts.length - 1].split(',');
  return `<div class="row" style="align-items: stretch; gap: 12px">
<div class="col t-cap c3 tnum" style="justify-content: space-between; text-align: right; width: 20px; margin: -8px 0"><span>60</span><span>45</span><span>30</span><span>15</span><span>0</span></div>
<div class="col grow" style="gap: 8px">
<svg class="chart" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" style="height: ${h}px; overflow: visible" role="img" aria-label="Biểu đồ số người dùng đăng ký theo ngày, 01/09 đến 25/09">${grid}<polygon points="0,${h} ${pts.join(' ')} ${w},${h}" style="fill: var(--bg-subtle)"></polygon><polyline points="${pts.join(' ')}" fill="none" style="stroke: var(--text)" stroke-width="2" stroke-linejoin="round" vector-effect="non-scaling-stroke"></polyline><circle cx="${last[0]}" cy="${last[1]}" r="4" style="fill: var(--text)"></circle></svg>
<div class="row t-cap c3 tnum" style="justify-content: space-between"><span>01/09</span><span>08/09</span><span>15/09</span><span>22/09</span><span>25/09</span></div>
</div>
</div>`;
};
const bars = (data, labels, fmt, aria) => {
  const max = Math.max(...data) * 1.1;
  const cols = data.map((v, i) => `<div class="col" style="flex: 1 1 0; align-items: center; gap: 6px; height: 100%; justify-content: flex-end"><span class="t-cap c2 tnum">${fmt(v)}</span><span style="width: 100%; max-width: 28px; height: ${Math.round((v / max) * 100)}%; border-radius: 6px 6px 2px 2px; background: ${i === data.length - 1 ? 'var(--accent)' : 'var(--bg-muted)'}"></span><span class="t-cap c3">${labels[i]}</span></div>`).join('');
  return `<div class="row" style="align-items: stretch; gap: 10px; height: 168px" role="img" aria-label="${aria}">${cols}</div>`;
};

// ================= D1 · Dashboard =================
const kpi = (label, icon, val, delta, danger = false) =>
  `<div class="card kpi"><div class="row c2 t-small fw5" style="justify-content: space-between">${label}${ic(icon, 18)}</div><span class="val">${val}</span><span class="delta"${danger ? ' style="color: var(--danger-text)"' : ''}>${danger ? ic('alert', 14) : ic('trending-up', 14)}${delta}</span></div>`;
const watchRow = (who, sub, n, target, isGroup = false) =>
  `<a class="row" href="@@${target}@@" style="gap: 12px; min-height: 52px">${isGroup ? gav(who, 36) : av(who, 36, { online: false })}<span class="col grow" style="gap: 0"><span class="fw5 trunc">${who.n}</span><span class="t-cap c2">${sub}</span></span><span class="badge danger">${n} báo cáo</span></a>`;
const topGroup = (g, n, pct) => `<div class="row" style="gap: 12px; min-height: 44px">${gav(g, 32)}<span class="grow fw5 trunc t-small">${g.n}</span><span class="activity"><span class="bar"><span style="width: ${pct}%"></span></span><span class="t-cap c2 tnum" style="width: 48px; text-align: right">${n}</span></span></div>`;
const USERS_BY_DAY = [18, 22, 15, 30, 41, 26, 19, 24, 33, 38, 29, 21, 17, 27, 35, 44, 52, 31, 28, 36, 40, 47, 39, 33, 45];
const D1 = shell('dash', `${topbar('Tổng quan', 'Cập nhật lúc 10:30 · 25/09/2026', `<div class="seg" role="tablist" aria-label="Nhóm theo"><button>Ngày</button><button class="on">Tuần</button><button>Tháng</button></div><button class="select">${ic('calendar', 16)}01/09 – 25/09/2026${ic('chevron-down', 16)}</button>`)}
<div class="content" style="gap: 16px">
<div class="kpis">
${kpi('Tổng người dùng', 'users', '1.248', '+32 trong tuần này')}
${kpi('Tin nhắn hôm nay', 'message-circle', '8.392', '+12% so với hôm qua')}
${kpi('Cuộc gọi hôm nay', 'phone', '146', '+4% so với hôm qua')}
${kpi('Báo cáo đang mở', 'flag', '7', '5 đối tượng có ≥ 3 báo cáo', true)}
</div>
<div style="display: grid; grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); gap: 16px">
<section class="card"><div class="card-head"><h2 class="t-title">Người dùng đăng ký mới</h2><span class="t-small c2">798 người · 25 ngày</span></div><div class="card-body" style="padding-top: 16px; padding-bottom: 16px">${lineChart(USERS_BY_DAY)}</div></section>
<section class="card"><div class="card-head"><h2 class="t-title">Cần chú ý</h2><a class="t-small fw5" href="@@D7-Reports@@">Xem báo cáo</a></div><div class="card-body col" style="gap: 4px; padding-top: 12px; padding-bottom: 12px">
${watchRow(U.sn, 'Người dùng · Đang bị cấm', 5, 'D3-UserDetail')}
${watchRow(GG.mb, 'Nhóm · 214 thành viên', 5, 'D5-GroupDetail', true)}
${watchRow(U.at, 'Người dùng · Đang hoạt động', 4, 'D3-UserDetail')}
${watchRow(U.pm, 'Người dùng · Đang hoạt động', 3, 'D3-UserDetail')}
${watchRow(GG.sv, 'Nhóm · 96 thành viên', 3, 'D5-GroupDetail', true)}
</div></section>
</div>
<div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px">
<section class="card"><div class="card-head"><h2 class="t-title">Tin nhắn / ngày</h2><span class="t-small c2">7 ngày</span></div><div class="card-body" style="padding-top: 12px; padding-bottom: 16px">${bars([6100, 7400, 6800, 8000, 7200, 5100, 8392], ['T7', 'CN', 'T2', 'T3', 'T4', 'T5', 'T6'], (v) => (v / 1000).toFixed(1).replace('.', ',') + 'k', 'Số tin nhắn 7 ngày gần nhất')}</div></section>
<section class="card"><div class="card-head"><h2 class="t-title">Cuộc gọi / ngày</h2><span class="t-small c2">7 ngày</span></div><div class="card-body" style="padding-top: 12px; padding-bottom: 16px">${bars([98, 72, 131, 140, 122, 118, 146], ['T7', 'CN', 'T2', 'T3', 'T4', 'T5', 'T6'], (v) => String(v), 'Số cuộc gọi 7 ngày gần nhất')}</div></section>
<section class="card"><div class="card-head"><h2 class="t-title">Nhóm hoạt động nhất</h2><span class="t-small c2">tin / 7 ngày</span></div><div class="card-body col" style="gap: 2px; padding-top: 8px; padding-bottom: 8px">
${topGroup(GG.kt, '1.204', 100)}${topGroup(GG.cn, '862', 72)}${topGroup(GG.gt, '415', 35)}${topGroup(GG.mb, '388', 32)}
</div></section>
</div>
</div>`);

// ================= D2 · Users =================
const statusBadge = (s) => (s === 'active' ? badge('Hoạt động', 'success', true) : s === 'banned' ? badge('Bị cấm', 'danger', true) : badge('Đã xóa', 'line', true));
const userRow = (p, email, status, joined, msgs, reports, sel = false) => {
  const flagged = reports >= 3 && status !== 'deleted';
  let actions;
  if (status === 'deleted') actions = '<span class="t-small c3">Đã xóa 20/09</span>';
  else {
    const ban = status === 'banned' ? btn('Bỏ cấm', 'btn-secondary btn-sm') : btn('Cấm', 'btn-secondary btn-sm', 'ban');
    actions = `<div class="row" style="gap: 6px; justify-content: flex-end">${ban}${flagged ? btn('Xóa', 'btn-danger-soft btn-sm', 'trash') : ''}<a class="ibtn sm" href="@@D3-UserDetail@@" aria-label="Xem chi tiết ${p.n}">${ic('chevron-right', 18)}</a></div>`;
  }
  return `<tr class="${flagged ? 'flag' : ''}${sel ? ' sel' : ''}"><td><a class="row" href="@@D3-UserDetail@@" style="gap: 12px">${av(p, 32, { online: false })}<span class="col" style="gap: 0"><span class="fw5">${p.n}</span><span class="t-cap c2">${email}</span></span></a></td><td>${statusBadge(status)}</td><td class="tnum c2">${joined}</td><td class="num">${msgs}</td><td class="num">${flag(reports)}</td><td>${actions}</td></tr>`;
};
const D2 = shell('users', `${topbar('Người dùng', '1.248 tài khoản')}
<div class="content" style="gap: 16px">
<div class="toolbar">${input('user-q', 'Tìm theo tên hoặc email', { icon: 'search' }).replace('class="input "', 'class="input" style="width: 320px"')}${select('Trạng thái', 'Tất cả')}${select('Báo cáo', 'Tất cả')}${select('Sắp xếp', 'Mới tham gia')}<div class="spacer"></div><span class="row t-small c2" style="gap: 8px"><span style="width: 14px; height: 14px; border-radius: 4px; background: var(--danger-subtle); border: 1px solid var(--danger)"></span>Tô đỏ: có từ 3 báo cáo trở lên</span></div>
<div class="card" style="overflow: hidden">
<table class="table"><thead><tr><th>Người dùng</th><th>Trạng thái</th><th>Ngày tham gia</th><th class="num">Tin nhắn</th><th class="num">Báo cáo</th><th style="text-align: right">Hành động</th></tr></thead><tbody>
${userRow(U.ma, 'minhanh@gmail.com', 'active', '02/09/2026', '3.214', 0)}
${userRow(U.sn, 'truongson@gmail.com', 'banned', '05/09/2026', '1.022', 5)}
${userRow(U.th, 'thuha@gmail.com', 'active', '03/09/2026', '2.480', 1)}
${userRow(U.at, 'anhtu@gmail.com', 'active', '10/09/2026', '640', 4)}
${userRow(U.hn, 'hoangnam@gmail.com', 'active', '04/09/2026', '1.876', 0)}
${userRow(U.pm, 'maiphuong@gmail.com', 'active', '12/09/2026', '312', 3)}
${userRow(U.qb, 'quocbao@gmail.com', 'banned', '06/09/2026', '902', 2)}
${userRow(U.dq, 'doquynh@gmail.com', 'deleted', '01/09/2026', '58', 7)}
${userRow(U.nl, 'ngoclinh@gmail.com', 'active', '08/09/2026', '1.150', 0)}
</tbody></table>
${pager('Hiển thị 1–9 trong 1.248 người dùng')}
</div>
</div>`);

// ================= D3 · User detail =================
const stat = (label, val, danger = false) => `<div class="card stat"><span class="t-small c2">${label}</span><span class="val"${danger ? ' style="color: var(--danger-text)"' : ''}>${val}</span></div>`;
const repRow = (p, reason, date, status) => `<tr><td><span class="row" style="gap: 10px">${av(p, 24, { online: false })}<span class="t-small fw5">${p.n}</span></span></td><td class="t-small">${reason}</td><td class="t-small c2 tnum">${date}</td><td>${status === 'open' ? badge('Đang mở', 'warning', true) : status === 'resolved' ? badge('Đã xử lý', 'success', true) : badge('Đã bác bỏ', 'line', true)}</td></tr>`;
const D3 = shell('users', `${topbar('Chi tiết người dùng', null, `${btn('Cấm tài khoản', 'btn-secondary', 'ban')}${btn('Xóa tài khoản', 'btn-danger', 'trash')}`, 'D2-Users')}
<div class="content" style="gap: 16px">
<div class="alert danger">${ic('shield-alert', 18)}<span><b>Người dùng này đã nhận 4 báo cáo (≥ 3).</b> Xem kỹ các báo cáo bên dưới trước khi quyết định xóa tài khoản. Xóa là xóa mềm: tin nhắn vẫn được lưu nhưng người khác sẽ không thấy tài khoản này nữa.</span></div>
<section class="card"><div class="row" style="gap: 20px; padding: 20px">${av(U.at, 80, { online: false })}<div class="col grow" style="gap: 6px"><div class="row" style="gap: 10px"><h2 class="t-h2">Lương Anh Tú</h2>${badge('Hoạt động', 'success', true)}</div><span class="c2">@anhtu · anhtu@gmail.com</span><span class="t-small c3">Tham gia 10/09/2026 · Hoạt động gần nhất 2 giờ trước</span></div></div></section>
<div class="kpis">${stat('Tin nhắn đã gửi', '640')}${stat('Nhóm đang tham gia', '3')}${stat('Báo cáo đã nhận', '4', true)}${stat('Cuộc gọi', '21')}</div>
<div style="display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr); gap: 16px; align-items: start">
<section class="card" style="overflow: hidden"><div class="card-head"><h2 class="t-title">Nhóm đang tham gia</h2><span class="t-small c2">3 nhóm</span></div>
<table class="table"><thead><tr><th>Nhóm</th><th>Vai trò</th><th>Tham gia</th></tr></thead><tbody>
<tr><td><a class="row" href="@@D5-GroupDetail@@" style="gap: 10px">${gav(GG.mb, 28)}<span class="t-small fw5">Hội chợ mua bán</span></a></td><td class="t-small">Thành viên</td><td class="t-small c2 tnum">11/09/2026</td></tr>
<tr><td><span class="row" style="gap: 10px">${gav(GG.kt, 28)}<span class="t-small fw5">Lớp KTPM K22</span></span></td><td class="t-small">Thành viên</td><td class="t-small c2 tnum">10/09/2026</td></tr>
<tr><td><span class="row" style="gap: 10px">${gav(GG.gt, 28)}<span class="t-small fw5">CLB Guitar</span></span></td><td class="t-small">Quản trị viên</td><td class="t-small c2 tnum">14/09/2026</td></tr>
</tbody></table></section>
<section class="card" style="overflow: hidden"><div class="card-head"><h2 class="t-title">Báo cáo đã nhận</h2><a class="t-small fw5" href="@@D7-Reports@@">Mở trong Báo cáo</a></div>
<table class="table"><thead><tr><th>Người báo cáo</th><th>Lý do</th><th>Thời gian</th><th>Trạng thái</th></tr></thead><tbody>
${repRow(U.th, 'Quấy rối, bắt nạt', '25/09 10:12', 'open')}
${repRow(U.nl, 'Spam hoặc lừa đảo', '24/09 21:40', 'open')}
${repRow(U.hn, 'Nội dung không phù hợp', '22/09 08:05', 'open')}
${repRow(U.gh, 'Spam hoặc lừa đảo', '18/09 15:30', 'resolved')}
</tbody></table></section>
</div>
</div>`);

// ================= D4 · Groups =================
const level = (pct, n, label) => `<span class="activity"><span class="bar"><span style="width: ${pct}%"></span></span><span class="t-small tnum" style="width: 44px">${n}</span><span class="t-cap c2">${label}</span></span>`;
const groupRow = (g, owner, members, act, reports, created) => {
  const flagged = reports >= 3;
  return `<tr class="${flagged ? 'flag' : ''}"><td><a class="row" href="@@D5-GroupDetail@@" style="gap: 12px">${gav(g, 32)}<span class="col" style="gap: 0"><span class="fw5">${g.n}</span><span class="t-cap c2">Trưởng nhóm: ${owner}</span></span></a></td><td class="num">${members}</td><td>${act}</td><td class="num">${flag(reports)}</td><td class="tnum c2">${created}</td><td><div class="row" style="gap: 6px; justify-content: flex-end">${alink('Xem', 'D5-GroupDetail', 'btn-secondary btn-sm')}${flagged ? `<a class="btn btn-danger-soft btn-sm" href="@@D6-DisbandGroup@@">Giải tán</a>` : ''}</div></td></tr>`;
};
const D4 = shell('groups', `${topbar('Nhóm chat', '86 nhóm')}
<div class="content" style="gap: 16px">
<div class="toolbar">${input('group-q', 'Tìm theo tên nhóm', { icon: 'search' }).replace('class="input "', 'class="input" style="width: 320px"')}${select('Mức hoạt động', 'Tất cả')}${select('Sắp xếp', 'Nhiều báo cáo nhất')}</div>
<div class="card" style="overflow: hidden">
<table class="table"><thead><tr><th>Nhóm</th><th class="num">Thành viên</th><th>Hoạt động 7 ngày</th><th class="num">Báo cáo</th><th>Ngày tạo</th><th style="text-align: right">Hành động</th></tr></thead><tbody>
${groupRow(GG.mb, 'Trương Sơn', 214, level(32, '388', 'Trung bình'), 5, '11/08/2026')}
${groupRow(GG.sv, 'Mai Phương', 96, level(5, '57', 'Thấp'), 3, '02/09/2026')}
${groupRow(GG.gt, 'Bùi Khánh Vy', 18, level(35, '415', 'Trung bình'), 1, '20/08/2026')}
${groupRow(GG.kt, 'Hoàng Đức Trí', 62, level(100, '1.204', 'Cao'), 0, '01/09/2026')}
${groupRow(GG.cn, 'Lâm Tuấn Kiệt', 5, level(72, '862', 'Cao'), 0, '18/09/2026')}
${groupRow(GG.tc, 'Lê Thu Hà', 45, level(17, '210', 'Trung bình'), 0, '05/09/2026')}
${groupRow(GG.bd, 'Đặng Gia Huy', 24, level(11, '130', 'Thấp'), 0, '09/09/2026')}
</tbody></table>
${pager('Hiển thị 1–7 trong 86 nhóm').replace('139', '13')}
</div>
</div>`);

// ================= D5 · Group detail =================
const gRep = (p, reason, date, status) => repRow(p, reason, date, status);
const gMember = (p, role, joined) => `<div class="row" style="gap: 12px; min-height: 52px; padding: 0 20px; border-bottom: 1px solid var(--border)">${av(p, 32, { online: false })}<span class="col grow" style="gap: 0"><span class="t-small fw5">${p.n}</span><span class="t-cap c2">${role}</span></span><span class="t-cap c3 tnum">${joined}</span></div>`;
const D5 = shell('groups', `${topbar('Chi tiết nhóm', null, `<a class="btn btn-danger" href="@@D6-DisbandGroup@@">${ic('ban', 18)}Giải tán nhóm</a>`, 'D4-Groups')}
<div class="content" style="gap: 16px">
<div class="alert warning">${ic('alert', 18)}<span><b>Nhóm có 5 báo cáo đang mở.</b> Xem nội dung báo cáo trước khi quyết định giải tán nhóm.</span></div>
<section class="card"><div class="row" style="gap: 20px; padding: 20px">${gav(GG.mb, 80)}<div class="col grow" style="gap: 6px"><div class="row" style="gap: 10px"><h2 class="t-h2">Hội chợ mua bán</h2>${badge('Đang hoạt động', 'success', true)}</div><span class="c2">Trưởng nhóm: Trương Sơn (đang bị cấm)</span><span class="t-small c3">Tạo ngày 11/08/2026</span></div></div></section>
<div class="kpis">${stat('Thành viên', '214')}${stat('Tin nhắn 7 ngày', '388')}${stat('Báo cáo đang mở', '5', true)}${stat('Quản trị viên', '3')}</div>
<div style="display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr); gap: 16px; align-items: start">
<section class="card" style="overflow: hidden"><div class="card-head"><h2 class="t-title">Báo cáo về nhóm</h2><span class="t-small c2">5 báo cáo</span></div>
<table class="table"><thead><tr><th>Người báo cáo</th><th>Lý do</th><th>Thời gian</th><th>Trạng thái</th></tr></thead><tbody>
${gRep(U.qb, 'Spam hoặc lừa đảo', '25/09 09:30', 'open')}
${gRep(U.gh, 'Nội dung không phù hợp', '21/09 18:02', 'open')}
${gRep(U.kv, 'Spam hoặc lừa đảo', '19/09 11:47', 'open')}
${gRep(U.th, 'Spam hoặc lừa đảo', '15/09 20:10', 'open')}
${gRep(U.nl, 'Lý do khác', '12/09 07:55', 'open')}
</tbody></table></section>
<section class="card" style="overflow: hidden"><div class="card-head"><h2 class="t-title">Thành viên</h2><a class="t-small fw5" href="@@D5-GroupDetail@@">Xem tất cả 214</a></div>
${gMember(U.sn, 'Trưởng nhóm', '11/08')}${gMember(U.at, 'Quản trị viên', '12/08')}${gMember(U.pm, 'Quản trị viên', '12/08')}${gMember(U.hn, 'Thành viên', '03/09')}
</section>
</div>
</div>`);

// ================= D6 · Disband modal =================
const disband = `<div class="modal" role="dialog" aria-label="Giải tán nhóm" style="width: 520px">
<div class="modal-head"><div class="row" style="gap: 14px; align-items: flex-start"><span class="ring" style="width: 44px; height: 44px; flex: none; background: var(--danger-subtle); color: var(--danger-text)">${ic('alert', 22)}</span><div class="col" style="gap: 4px"><h2 class="t-h2">Giải tán nhóm “Hội chợ mua bán”?</h2><p class="t-small c2">Thao tác này không thể hoàn tác.</p></div></div>${ibtn('x', 'Đóng', 'sm', 18)}</div>
<div class="modal-body">
<div class="alert danger">${ic('shield-alert', 18)}<span><b>Cảnh báo: nhóm đang có 5 báo cáo chưa xử lý.</b> Các báo cáo sẽ được đánh dấu “Đã xử lý” sau khi giải tán.</span></div>
<ul class="t-small c2 col" style="gap: 6px; margin: 0; padding-left: 18px">
<li>214 thành viên sẽ không thể gửi tin nhắn mới trong nhóm.</li>
<li>Lịch sử trò chuyện được giữ lại ở chế độ chỉ đọc.</li>
<li>Thành viên nhận tin nhắn hệ thống kèm lý do giải tán.</li>
</ul>
<div class="field"><label class="label" for="disband-reason">Lý do giải tán</label><textarea id="disband-reason" class="ta" style="min-height: 76px">Nhóm đăng nhiều nội dung lừa đảo, vi phạm quy định cộng đồng.</textarea></div>
${field('disband-confirm', 'Nhập tên nhóm để xác nhận', 'Hội chợ mua bán', { cls: 'focus', value: 'Hội chợ mua bán' })}
</div>
<div class="modal-foot">${btn('Hủy', 'btn-secondary')}${btn('Giải tán nhóm', 'btn-danger', 'ban')}</div>
</div>`;
const D6 = `${D5}${scrim(disband)}`;

// ================= D7 · Reports =================
const target = (who, type, isGroup) => `<span class="row" style="gap: 10px">${isGroup ? gav(who, 32) : av(who, 32, { online: false })}<span class="col" style="gap: 0"><span class="fw5">${who.n}</span><span class="t-cap c2">${type}</span></span></span>`;
const rRow = (who, isGroup, reason, reporter, time, total, sel = false) =>
  `<tr class="${sel ? 'sel' : ''}"><td>${target(who, isGroup ? 'Nhóm' : 'Người dùng', isGroup)}</td><td class="t-small">${reason}</td><td class="t-small">${reporter.n}</td><td class="t-small c2 tnum">${time}</td><td class="num">${flag(total)}</td></tr>`;
const kv = (k, v) => `<div class="col" style="gap: 2px"><span class="t-cap c2">${k}</span><span class="t-small">${v}</span></div>`;
const D7 = shell('reports', `${topbar('Báo cáo', 'Báo cáo từ người dùng về người dùng khác và nhóm chat')}
<div class="content" style="gap: 16px">
<div class="row" style="justify-content: space-between; gap: 16px">
<div class="tabs" style="border-bottom: 0"><button class="tab on">Đang mở <span class="count">7</span></button><button class="tab">Đã xử lý <span class="t-cap c3">23</span></button><button class="tab">Đã bác bỏ <span class="t-cap c3">9</span></button></div>
<div class="toolbar">${select('Đối tượng', 'Tất cả')}${select('Lý do', 'Tất cả')}${input('rep-q', 'Tìm theo tên', { icon: 'search' }).replace('class="input "', 'class="input" style="width: 220px"')}</div>
</div>
<div style="display: grid; grid-template-columns: minmax(0, 1fr) 360px; gap: 16px; align-items: start">
<div class="card" style="overflow: hidden">
<table class="table dense"><thead><tr><th>Đối tượng bị báo cáo</th><th>Lý do</th><th>Người báo cáo</th><th>Thời gian</th><th class="num">Tổng BC</th></tr></thead><tbody>
${rRow(U.at, false, 'Quấy rối, bắt nạt', U.th, '10:12', 4, true)}
${rRow(GG.mb, true, 'Spam hoặc lừa đảo', U.qb, '09:30', 5)}
${rRow(U.pm, false, 'Giả mạo người khác', U.nl, 'Hôm qua', 3)}
${rRow(GG.sv, true, 'Spam hoặc lừa đảo', U.hn, 'Hôm qua', 3)}
${rRow(U.at, false, 'Spam hoặc lừa đảo', U.nl, '24/09', 4)}
${rRow(GG.gt, true, 'Lý do khác', U.kv, '22/09', 1)}
${rRow(U.at, false, 'Nội dung không phù hợp', U.hn, '22/09', 4)}
</tbody></table>
</div>
<aside class="card">
<div class="card-head"><h2 class="t-title">Chi tiết báo cáo</h2>${badge('Đang mở', 'warning', true)}</div>
<div class="card-body col" style="gap: 16px">
<a class="row" href="@@D3-UserDetail@@" style="gap: 12px">${av(U.at, 48, { online: false })}<span class="col grow" style="gap: 2px"><span class="fw6">Lương Anh Tú</span><span class="t-small c2">Người dùng · @anhtu</span></span><span class="badge danger">${ic('alert', 12)}4 báo cáo</span></a>
<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px">${kv('Lý do', 'Quấy rối, bắt nạt')}${kv('Người báo cáo', 'Lê Thu Hà')}${kv('Thời gian', '10:12 · 25/09/2026')}${kv('Xử lý bởi', 'Chưa xử lý')}</div>
${kv('Mô tả', 'Liên tục nhắn tin xúc phạm sau khi mình từ chối lời mời kết bạn.')}
<div class="alert warning">${ic('alert', 18)}<span>Người dùng này đã có từ 3 báo cáo trở lên. Có thể cân nhắc xóa tài khoản ở trang chi tiết người dùng.</span></div>
<div class="col" style="gap: 8px">
${btn('Chấp nhận &amp; cấm người dùng', 'btn-primary btn-block', 'ban')}
${btn('Chỉ đánh dấu đã xử lý', 'btn-secondary btn-block', 'check')}
${btn('Bác bỏ báo cáo', 'btn-ghost btn-block')}
</div>
</div>
</aside>
</div>
</div>`);

export const ADMIN_SCREENS = [
  { id: 'D1-Dashboard', title: 'D1 · Dashboard', page: 'admin', body: D1 },
  { id: 'D2-Users', title: 'D2 · Danh sách người dùng', page: 'admin', body: D2 },
  { id: 'D3-UserDetail', title: 'D3 · Chi tiết người dùng', page: 'admin', body: D3 },
  { id: 'D4-Groups', title: 'D4 · Danh sách nhóm', page: 'admin', body: D4 },
  { id: 'D5-GroupDetail', title: 'D5 · Chi tiết nhóm & báo cáo', page: 'admin', body: D5 },
  { id: 'D6-DisbandGroup', title: 'D6 · Modal giải tán nhóm', page: 'admin', body: D6 },
  { id: 'D7-Reports', title: 'D7 · Danh sách báo cáo', page: 'admin', body: D7 },
];
