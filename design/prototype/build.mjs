// Build ChatApp UI prototype.
//   node build.mjs [cssUrl]
// Xuất ra:
//   dist/project/*.dc.html + dist/project/canvas.json  → artboard cho canvas Design trên claude.ai
//   dist/chatapp.css                                   → stylesheet dùng chung (upload làm asset của canvas)
//   ChatApp-UI-Prototype.html                          → bản HTML độc lập, mở offline bằng trình duyệt
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ICONS, ic, P, G, av, gav, btn, ibtn, input, badge } from './src/ui.mjs';
import { USER_SCREENS } from './src/screens-user.mjs';
import { ADMIN_SCREENS } from './src/screens-admin.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const CSS_URL = process.argv[2] || './chatapp.css';
const css = fs.readFileSync(path.join(ROOT, 'src/styles.css'), 'utf8');

const PAGES = [
  { id: 'overview', name: '00 · Mục lục' },
  { id: 'ds', name: '01 · Design system' },
  { id: 'auth', name: '1 · Xác thực', note: 'Xác thực (Auth)' },
  { id: 'chat', name: '2 · Chat 1-1', note: 'Chat 1-1' },
  { id: 'group', name: '3 · Nhóm chat', note: 'Nhóm chat' },
  { id: 'friends', name: '4 · Bạn bè', note: 'Bạn bè & kết nối' },
  { id: 'calls', name: '5 · Cuộc gọi', note: 'Cuộc gọi' },
  { id: 'profile', name: '6 · Hồ sơ', note: 'Hồ sơ & cài đặt' },
  { id: 'admin', name: '7 · Admin', note: 'Trang quản trị' },
];
const SCREENS = [...USER_SCREENS, ...ADMIN_SCREENS];

// ================= Main (mục lục) =================
const idxCard = (pageId, label) => {
  const list = SCREENS.filter((s) => s.page === pageId);
  return `<section class="card"><div class="card-head" style="min-height: 52px"><h2 class="t-title">${label}</h2><span class="t-cap c3 tnum">${list.length}</span></div><nav class="idx col" style="padding: 6px">${list
    .map((s) => `<a href="@@${s.id}@@"><span class="t-small"><span class="fw6 tnum" style="display: inline-block; width: 34px">${s.title.split(' · ')[0]}</span>${s.title.split(' · ')[1]}</span>${s.figma ? '<span class="badge line" style="height: 18px; font-size: 11px">Figma</span>' : ic('chevron-right', 16)}</a>`)
    .join('')}</nav></section>`;
};
const MAIN = `<main class="col" style="flex: 1 1 0; padding: 56px 64px; gap: 32px">
<header class="row" style="justify-content: space-between; align-items: flex-end; gap: 40px">
<div class="col" style="gap: 14px"><div class="auth-brand"><span class="logo" aria-hidden="true">${ic('message-circle', 20)}</span>ChatApp</div><h1 class="t-display">Bộ màn hình UI · Prototype</h1><p class="c2" style="max-width: 720px">Đồ án CNPM, Sprint 0. ${SCREENS.length} màn hình cho người dùng và admin, cùng một design system (Mono Light, font Inter). Bấm tên màn hình để mở. Ở chế độ Play, các nút điều hướng trong màn hình đều bấm được.</p></div>
<div class="col" style="gap: 8px; align-items: flex-end">${badge('Cập nhật 25/09/2026', 'line')}<a class="btn btn-secondary btn-sm" href="@@DesignSystem@@">${ic('palette', 16)}Design system</a></div>
</header>
<div style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 20px; align-items: start">
<div class="col" style="gap: 20px">${idxCard('auth', 'Xác thực')}${idxCard('profile', 'Hồ sơ')}${idxCard('calls', 'Cuộc gọi')}</div>
<div class="col" style="gap: 20px">${idxCard('chat', 'Chat 1-1')}</div>
<div class="col" style="gap: 20px">${idxCard('group', 'Nhóm chat')}${idxCard('friends', 'Bạn bè')}</div>
<div class="col" style="gap: 20px">${idxCard('admin', 'Admin')}</div>
</div>
</main>`;

// ================= Design system =================
const TOKENS = [
  ['bg/app', '--bg-app', '#FAFAFA'], ['bg/surface', '--bg-surface', '#FFFFFF'], ['bg/subtle', '--bg-subtle', '#F4F4F5'], ['bg/muted', '--bg-muted', '#E4E4E7'],
  ['border/default', '--border', '#E8E8EB'], ['border/strong', '--border-strong', '#D4D4D8'], ['text/primary', '--text', '#09090B'], ['text/secondary', '--text-2', '#52525B'],
  ['text/tertiary', '--text-3', '#71717A'], ['accent/default', '--accent', '#09090B'], ['success/default', '--success', '#16A34A'], ['danger/default', '--danger', '#DC2626'],
  ['warning/default', '--warning', '#B45309'], ['stage/bg', '--stage', '#0E0E10'],
];
const dsSec = (title, inner, span = 1) => `<section class="card" style="grid-column: span ${span}"><div class="card-head" style="min-height: 52px"><h2 class="t-title">${title}</h2></div><div class="card-body col" style="gap: 16px">${inner}</div></section>`;
const lbl = (t) => `<span class="t-cap c2">${t}</span>`;
const DS = `<main class="col" style="flex: 1 1 0; padding: 48px 56px; gap: 24px">
<header class="col" style="gap: 8px"><div class="auth-brand"><span class="logo" aria-hidden="true">${ic('message-circle', 20)}</span>ChatApp</div><h1 class="t-display">Design system</h1><p class="c2">Token màu, kiểu chữ và component dùng chung cho mọi màn hình. Đổi theme (Mono Light, Mono Dark, Indigo Light) ở mục Tweaks của từng artboard.</p></header>
<div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; align-items: stretch">
${dsSec('Màu (Mono Light)', `<div style="display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 12px">${TOKENS.map(([n, v, h]) => `<div class="sw"><span class="chip-c" style="background: var(${v})"></span><span class="t-cap fw5">${n}</span><span class="t-cap c2 tnum">${h}</span></div>`).join('')}</div>`, 2)}
${dsSec('Kiểu chữ · Inter', `<span class="t-display">Display 32</span><span class="t-h1">H1 24 Semi Bold</span><span class="t-h2">H2 20 Semi Bold</span><span class="t-title">Title 16 Semi Bold</span><span>Body 14 Regular</span><span class="fw5">Body/Medium 14</span><span class="t-small">Small 13 Regular</span><span class="t-cap">Caption 12 Regular</span><span class="t-over">Overline 11 Medium</span>`)}
${dsSec('Button', `<div class="row" style="flex-wrap: wrap">${btn('Primary')}${btn('Secondary', 'btn-secondary')}${btn('Subtle', 'btn-subtle')}${btn('Ghost', 'btn-ghost')}</div><div class="row" style="flex-wrap: wrap">${btn('Danger', 'btn-danger', 'trash')}${btn('Danger soft', 'btn-danger-soft')}${btn('Disabled', 'btn-primary', null, ' disabled="disabled"')}</div><div class="row" style="flex-wrap: wrap">${btn('Large', 'btn-primary btn-lg')}${btn('Small', 'btn-secondary btn-sm', 'plus')}</div>${lbl('Icon button: ghost · subtle · solid · bordered · sm/md/lg')}<div class="row">${ibtn('phone', 'Ghost')}${ibtn('search', 'Subtle', 'subtle')}${ibtn('send', 'Solid', 'solid', 18)}${ibtn('arrow-left', 'Bordered', 'bordered sm', 18)}${ibtn('message-circle', 'Large', 'lg on', 22)}</div>`)}
${dsSec('Input', `${input('ds-1', 'Default')}${input('ds-2', 'Filled + icon', { icon: 'search', cls: 'filled' })}${input('ds-3', 'Focus', { cls: 'focus', value: 'Đang nhập' })}<div class="field">${input('ds-4', 'Error', { cls: 'error', value: 'sai@', icon: 'mail' })}<span class="hint err">Email không hợp lệ</span></div><textarea class="ta" placeholder="Textarea"></textarea>`)}
${dsSec('Chọn &amp; trạng thái', `<div class="row" style="flex-wrap: wrap"><button class="chip on">Tất cả</button><button class="chip">Chưa đọc</button><button class="chip">Nhóm</button></div><div class="seg"><button class="on">Ngày</button><button>Tuần</button><button>Tháng</button></div><div class="tabs"><button class="tab on">Đã nhận <span class="count">3</span></button><button class="tab">Đã gửi</button></div><div class="row" style="flex-wrap: wrap">${badge('Hoạt động', 'success', true)}${badge('Bị cấm', 'danger', true)}${badge('Đang mở', 'warning', true)}${badge('Đã xóa', 'line', true)}${badge('Mới', 'dark')}</div><div class="row"><span class="count">3</span><span class="count dark">12</span><button class="switch on" role="switch" aria-checked="true" aria-label="Bật"></button><button class="switch" role="switch" aria-checked="false" aria-label="Tắt"></button><label class="check"><input type="checkbox" checked="checked" />Checkbox</label></div>`)}
${dsSec('Avatar', `<div class="row" style="gap: 12px; align-items: flex-end">${av(P.ma, 24)}${av(P.hn, 32)}${av(P.th, 40)}${av(P.qb, 48)}${av(P.nl, 56)}${av(P.gh, 80)}</div>${lbl('Nhóm (bo góc) · stack đã xem')}<div class="row" style="gap: 12px">${gav(G.cn, 40)}${gav(G.kt, 48)}<span class="stack">${av(P.ma, 24, { online: false })}${av(P.gh, 24, { online: false })}${av(P.th, 24, { online: false })}</span></div>`)}
${dsSec('ConversationItem', `<div class="clist" style="padding: 0"><a class="citem sel" href="@@C1-Chat@@">${av(P.ma, 48)}<span class="meta"><span class="top"><span class="name">Selected</span><span class="time">10:24</span></span><span class="bottom"><span class="trunc grow">Bạn: Tối nay mình gửi bản báo cáo nhé</span></span></span></a><a class="citem unread" href="@@G1-GroupChat@@">${gav(G.cn, 48)}<span class="meta"><span class="top"><span class="name">Unread</span><span class="time">10:02</span></span><span class="bottom"><span class="trunc grow">Gia Huy: Mình push code rồi</span><span class="count dark">3</span></span></span></a><a class="citem" href="@@C1-Chat@@">${av(P.hn, 48)}<span class="meta"><span class="top"><span class="name">Default</span><span class="time">T2</span></span><span class="bottom"><span class="trunc grow">Tối nay họp nhóm lúc 8h nhé</span></span></span></a></div>`)}
${dsSec('Tin nhắn', `<div class="msg in">${av(P.ma, 24, { online: false })}<div class="bubble">Tin nhắn đến</div></div><div class="msg out"><div class="bubble">Tin nhắn đi<span class="edited">(đã chỉnh sửa)</span></div></div><div class="msg out"><div class="recalled">Bạn đã thu hồi một tin nhắn</div></div><div class="msg-status">${ic('check', 14)}Đã gửi · ${ic('check-check', 14)}Đã nhận · Đã xem</div><div class="sysmsg">Tin nhắn hệ thống</div><div class="filemsg"><span class="fileicon">${ic('file-text', 20)}</span><span class="col grow" style="gap: 2px"><span class="fw5 trunc">BaoCao.pdf</span><span class="t-cap c2">1,2 MB · PDF</span></span>${ibtn('download', 'Tải xuống', 'sm', 18)}</div><div class="audiomsg"><button class="playbtn" aria-label="Phát">${ic('play', 14)}</button><span class="wave">${[8, 14, 20, 12, 18, 24, 10, 16, 22, 14, 8, 18, 12, 20, 16, 10].map((h, i) => `<span class="${i < 6 ? 'p' : ''}" style="height: ${h}px"></span>`).join('')}</span><span class="t-cap tnum">0:42</span></div>`)}
${dsSec(`Icon · ${Object.keys(ICONS).length} (Lucide, stroke 2)`, `<div style="display: grid; grid-template-columns: repeat(18, minmax(0, 1fr)); gap: 6px">${Object.keys(ICONS).map((k) => `<span class="col" style="align-items: center; gap: 4px; padding: 8px 0; border-radius: 8px; background: var(--bg-subtle)" title="${k}">${ic(k, 20)}<span style="font-size: 9px; line-height: 12px" class="c2 trunc">${k}</span></span>`).join('')}</div>`, 3)}
</div>
</main>`;

const ALL = [
  { id: 'Main', title: 'Mục lục', page: 'overview', body: MAIN },
  { id: 'DesignSystem', title: 'Design system', page: 'ds', body: DS, h: 1920 },
  ...SCREENS,
];
const ids = new Set(ALL.map((s) => s.id));

// Kiểm tra link
for (const s of ALL) {
  for (const m of s.body.matchAll(/@@([^@]+)@@/g)) if (!ids.has(m[1])) throw new Error(`${s.id}: link tới màn không tồn tại "${m[1]}"`);
  if (s.body.includes('{{')) throw new Error(`${s.id}: có "{{" trong markup`);
}

// ================= Canvas (.dc.html) =================
const OUT = path.join(ROOT, 'dist');
const PROJ = path.join(OUT, 'project');
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(PROJ, { recursive: true });
fs.writeFileSync(path.join(OUT, 'chatapp.css'), css);

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const dcFile = (s) => {
  const h = s.h || 900;
  const body = s.body.replace(/@@([^@]+)@@/g, '$1.dc.html');
  const props = JSON.stringify({
    theme: { editor: 'enum', options: ['mono-light', 'mono-dark', 'indigo-light'], default: 'mono-light', section: 'Theme' },
    $preview: { width: 1440, height: h },
  });
  return `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<title>${esc(s.title)} · ChatApp</title>
<script src="./support.js"></script>
<link rel="stylesheet" href="${CSS_URL}">
</head>
<body>
<x-dc>
<helmet>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet">
<style>body{margin:0}</style>
</helmet>
<div class="app theme-{{theme}}${s.rootClass ? ' ' + s.rootClass : ''}" style="width: 1440px; height: ${h}px">
${body}
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='${props}'>
class Component extends DCLogic {
  renderVals() {
    return { theme: this.props.theme ?? 'mono-light' };
  }
}
</script>
</body>
</html>
`;
};

const boards = {};
const order = [];
const notes = {};
const perPage = {};
for (const s of ALL) {
  const file = `${s.id}.dc.html`;
  fs.writeFileSync(path.join(PROJ, file), dcFile(s));
  const i = (perPage[s.page] = (perPage[s.page] ?? -1) + 1);
  const h = s.h || 900;
  boards[file] = { x: (i % 3) * (1440 + 80), y: Math.floor(i / 3) * (900 + 120), w: 1440, h, title: s.title, page: s.page, is_interactive: true };
  order.push(file);
}
for (const p of PAGES) {
  if (!p.note) continue;
  const n = ALL.filter((s) => s.page === p.id).length;
  notes[`title-${p.id}`] = { x: 0, y: -300, text: `${p.note} · ${n} màn hình`, kind: 'title1', maxW: Math.min(n, 3) * 1440 + (Math.min(n, 3) - 1) * 80, page: p.id };
}
const canvas = {
  v: 3,
  createdOnFiles: { v: 1, at: new Date().toISOString().replace(/\.\d+Z$/, 'Z') },
  title: 'ChatApp · UI Prototype',
  launch: { view: 'canvas', page: 'overview' },
  pages: PAGES.map(({ id, name }) => ({ id, name })),
  boards,
  order,
  notes,
  designSystems: [],
};
fs.writeFileSync(path.join(PROJ, 'canvas.json'), JSON.stringify(canvas, null, 2));

// ================= Bản HTML độc lập =================
const prefixIds = (html, sid) => html.replace(/\b(id|for)="([^"]+)"/g, (_, a, v) => `${a}="${sid}--${v}"`);
const sections = ALL.map((s) => {
  const body = prefixIds(s.body, s.id).replace(/@@([^@]+)@@/g, '#$1');
  return `<section class="screen" id="${s.id}" data-title="${esc(s.title)}" data-h="${s.h || 900}"><div class="app theme-mono-light${s.rootClass ? ' ' + s.rootClass : ''}" style="width: 1440px; height: ${s.h || 900}px">${body}</div></section>`;
}).join('\n');
const navHtml = PAGES.map((p) => {
  const list = ALL.filter((s) => s.page === p.id);
  return `<div class="grp">${p.name}</div>${list.map((s) => `<a href="#${s.id}" data-id="${s.id}"><span>${esc(s.title)}</span>${s.figma ? '<em>Figma</em>' : ''}</a>`).join('')}`;
}).join('');
const standalone = `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ChatApp · UI Prototype</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
${css}
/* ---------- Viewer ---------- */
html, body { margin: 0; height: 100%; }
body { display: flex; background: #E9E9EC; color: #09090B; font-family: Inter, ui-sans-serif, system-ui, sans-serif; font-size: 13px; }
.vnav { width: 272px; flex: none; height: 100vh; overflow: auto; box-sizing: border-box; padding: 20px 12px 32px; background: #FFFFFF; border-right: 1px solid #E8E8EB; }
.vnav h1 { margin: 0 8px; font-size: 16px; }
.vnav p { margin: 4px 8px 12px; color: #52525B; line-height: 18px; }
.vnav label { display: flex; flex-direction: column; gap: 4px; margin: 0 8px 8px; color: #52525B; font-weight: 500; }
.vnav select { height: 32px; padding: 0 8px; border: 1px solid #D4D4D8; border-radius: 8px; font: inherit; background: #FFFFFF; }
.vnav .grp { margin: 16px 8px 4px; color: #52525B; font-size: 11px; font-weight: 500; letter-spacing: .06em; text-transform: uppercase; }
.vnav a { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 7px 8px; border-radius: 8px; color: #09090B; text-decoration: none; }
.vnav a:hover { background: #F4F4F5; }
.vnav a.on { background: #09090B; color: #FFFFFF; }
.vnav em { font-style: normal; font-size: 10px; padding: 1px 6px; border: 1px solid currentColor; border-radius: 9px; opacity: .6; }
.vstage { flex: 1 1 0; min-width: 0; height: 100vh; overflow: auto; box-sizing: border-box; padding: 16px 24px 24px; display: flex; flex-direction: column; align-items: center; gap: 12px; }
.vbar { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.vbar b { font-size: 15px; }
.vbar button { height: 32px; padding: 0 12px; border: 1px solid #D4D4D8; border-radius: 8px; background: #FFFFFF; font: inherit; cursor: pointer; }
.vframe { position: relative; flex: none; overflow: hidden; border-radius: 10px; box-shadow: 0 10px 40px rgba(9, 9, 11, .14); background: #FFFFFF; }
.screen { display: none; position: absolute; left: 0; top: 0; transform-origin: 0 0; }
.screen.on { display: block; }
/* ?bare: chỉ hiện màn hình ở kích thước thật (dùng để chụp ảnh) */
body.bare .vnav, body.bare .vbar { display: none; }
body.bare .vstage { padding: 0; overflow: hidden; }
body.bare .vframe { border-radius: 0; box-shadow: none; }
</style>
</head>
<body>
<nav class="vnav" aria-label="Danh sách màn hình">
<h1>ChatApp · UI Prototype</h1>
<p>${ALL.length} màn hình · cập nhật 25/09/2026. Phím ← → để chuyển màn. Bấm nút trong màn để đi theo luồng.</p>
<label>Theme<select id="theme"><option value="mono-light">Mono Light</option><option value="mono-dark">Mono Dark</option><option value="indigo-light">Indigo Light</option></select></label>
${navHtml}
</nav>
<div class="vstage">
<div class="vbar"><button id="prev">← Trước</button><b id="vtitle"></b><button id="next">Sau →</button></div>
<div class="vframe" id="frame">
${sections}
</div>
</div>
<script>
const screens = [...document.querySelectorAll('.screen')];
const links = [...document.querySelectorAll('.vnav a')];
const stage = document.querySelector('.vstage');
const frame = document.getElementById('frame');
let cur = 0;
const bare = new URLSearchParams(location.search).has('bare');
document.body.classList.toggle('bare', bare);
function fit() {
  const s = screens[cur];
  const h = +s.dataset.h;
  const scale = bare ? 1 : Math.min(1, (stage.clientWidth - 48) / 1440);
  s.style.transform = 'scale(' + scale + ')';
  frame.style.width = 1440 * scale + 'px';
  frame.style.height = h * scale + 'px';
}
function show(id) {
  const i = Math.max(0, screens.findIndex((s) => s.id === id));
  cur = i;
  screens.forEach((s, j) => s.classList.toggle('on', j === i));
  links.forEach((a) => a.classList.toggle('on', a.dataset.id === screens[i].id));
  document.getElementById('vtitle').textContent = screens[i].dataset.title;
  document.title = screens[i].dataset.title + ' · ChatApp';
  fit();
  stage.scrollTop = 0;
}
function go(d) { location.hash = screens[(cur + d + screens.length) % screens.length].id; }
window.addEventListener('hashchange', () => show(location.hash.slice(1)));
window.addEventListener('resize', fit);
document.getElementById('prev').onclick = () => go(-1);
document.getElementById('next').onclick = () => go(1);
document.addEventListener('keydown', (e) => {
  if (e.target.closest('input, textarea, select')) return;
  if (e.key === 'ArrowRight') go(1);
  if (e.key === 'ArrowLeft') go(-1);
});
function setTheme(t) {
  document.querySelectorAll('.app').forEach((a) => {
    a.classList.remove('theme-mono-light', 'theme-mono-dark', 'theme-indigo-light');
    a.classList.add('theme-' + t);
  });
}
const themeSel = document.getElementById('theme');
themeSel.onchange = (e) => setTheme(e.target.value);
const t0 = new URLSearchParams(location.search).get('theme');
if (t0) { themeSel.value = t0; setTheme(t0); }
show(location.hash.slice(1) || 'Main');
</script>
</body>
</html>
`;
fs.writeFileSync(path.join(ROOT, 'ChatApp-UI-Prototype.html'), standalone);

console.log(`OK: ${ALL.length} màn hình → dist/project (${Object.keys(boards).length} artboard), ChatApp-UI-Prototype.html (${(standalone.length / 1024).toFixed(0)} KB)`);
