// Helper dựng markup dùng chung cho mọi màn hình.
// Link giữa các màn viết dạng href="@@<ScreenId>@@"; build.mjs đổi thành
// "<id>.dc.html" (canvas) hoặc "#<id>" (bản HTML độc lập).

const PHONE = 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z';
const USERS_BASE = '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>';

// Lucide icon paths (24x24, stroke 2)
export const ICONS = {
  'message-circle': '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  'square-pen': '<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>',
  users: USERS_BASE + '<path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  user: '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
  'user-plus': USERS_BASE + '<line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>',
  'user-check': USERS_BASE + '<polyline points="16 11 18 13 22 9"/>',
  'user-x': USERS_BASE + '<line x1="17" x2="22" y1="8" y2="13"/><line x1="22" x2="17" y1="8" y2="13"/>',
  'user-search': '<circle cx="10" cy="7" r="4"/><path d="M10.3 15H7a4 4 0 0 0-4 4v2"/><circle cx="17" cy="17" r="3"/><path d="m21 21-1.9-1.9"/>',
  phone: `<path d="${PHONE}"/>`,
  'phone-incoming': `<polyline points="16 2 16 8 22 8"/><line x1="22" x2="16" y1="2" y2="8"/><path d="${PHONE}"/>`,
  'phone-outgoing': `<polyline points="22 8 22 2 16 2"/><line x1="16" x2="22" y1="8" y2="2"/><path d="${PHONE}"/>`,
  'phone-missed': `<line x1="22" x2="16" y1="2" y2="8"/><line x1="16" x2="22" y1="2" y2="8"/><path d="${PHONE}"/>`,
  'phone-off': '<path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"/><line x1="22" x2="2" y1="2" y2="22"/>',
  video: '<path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
  'video-off': '<path d="M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196"/><path d="M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2"/><path d="m2 2 20 20"/>',
  mic: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>',
  'mic-off': '<line x1="2" x2="22" y1="2" y2="22"/><path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2"/><path d="M5 10v2a7 7 0 0 0 12 5"/><path d="M15 9.34V5a3 3 0 0 0-5.68-1.33"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12"/><line x1="12" x2="12" y1="19" y2="22"/>',
  'volume-2': '<path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  'bell-off': '<path d="M8.7 3A6 6 0 0 1 18 8a21.3 21.3 0 0 0 .6 5"/><path d="M17 17H3s3-2 3-9a4.67 4.67 0 0 1 .3-1.7"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/><path d="m2 2 20 20"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  paperclip: '<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
  image: '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
  send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  'file-text': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  'check-check': '<path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  'more-h': '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
  'more-v': '<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>',
  pencil: '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>',
  undo: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/>',
  trash: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
  copy: '<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/>',
  ban: '<circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/>',
  settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  'log-out': '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  'mail-check': '<path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="m16 19 2 2 4-4"/>',
  eye: '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',
  camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
  'chevron-left': '<path d="m15 18-6-6 6-6"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  'arrow-left': '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  'arrow-up-right': '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
  dashboard: '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>',
  'shield-alert': '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
  alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  filter: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
  calendar: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
  'trending-up': '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  play: '<polygon points="6 3 20 12 6 21 6 3"/>',
  'file-audio': '<path d="M17.5 22h.5a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M2 19a2 2 0 1 1 4 0v1a2 2 0 1 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 1 1-4 0v-1a2 2 0 1 1 4 0"/>',
  folder: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
  crown: '<path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/>',
  'user-cog': '<circle cx="18" cy="15" r="3"/><circle cx="9" cy="7" r="4"/><path d="M10 15H6a4 4 0 0 0-4 4v2"/><path d="m21.7 16.4-.9-.3"/><path d="m15.2 13.9-.9-.3"/><path d="m16.6 18.7.3-.9"/><path d="m19.1 12.2.3-.9"/><path d="m19.6 18.7-.4-1"/><path d="m16.8 12.3-.4-1"/><path d="m14.3 16.6 1-.4"/><path d="m20.7 13.8 1-.4"/>',
  palette: '<circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>',
  wifi: '<path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/>',
  'log-in': '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/>',
  'message-plus': '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M8 12h8"/><path d="M12 8v8"/>',
  layers: '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
};

const closeTags = (s) => s.replace(/<(\w+)([^<>]*?)\s*\/>/g, '<$1$2></$1>');

export const ic = (name, size = 20, sw = 2) => {
  const body = ICONS[name];
  if (!body) throw new Error('Unknown icon: ' + name);
  return `<svg class="ic" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${closeTags(body)}</svg>`;
};

// ---------- People & groups (dữ liệu mẫu) ----------
export const P = {
  me: { n: 'Lâm Tuấn Kiệt', i: 'TK', u: 'tuankiet', t: 4 },
  ma: { n: 'Nguyễn Minh Anh', i: 'MA', u: 'minhanh', t: 1, on: true },
  hn: { n: 'Trần Hoàng Nam', i: 'HN', u: 'hoangnam', t: 2 },
  th: { n: 'Lê Thu Hà', i: 'TH', u: 'thuha', t: 3, on: true },
  qb: { n: 'Phạm Quốc Bảo', i: 'QB', u: 'quocbao', t: 4 },
  nl: { n: 'Võ Ngọc Linh', i: 'NL', u: 'ngoclinh', t: 2, on: true },
  gh: { n: 'Đặng Gia Huy', i: 'GH', u: 'giahuy', t: 1 },
  kv: { n: 'Bùi Khánh Vy', i: 'KV', u: 'khanhvy', t: 3 },
  dt: { n: 'Hoàng Đức Trí', i: 'ĐT', u: 'ductri', t: 1 },
  pm: { n: 'Mai Phương', i: 'MP', u: 'maiphuong', t: 2 },
  sn: { n: 'Trương Sơn', i: 'TS', u: 'truongson', t: 4 },
};
export const G = {
  cn: { n: 'Nhóm đồ án CNPM', i: 'CN', t: 2, members: 5 },
  kt: { n: 'Lớp KTPM K22', i: 'KT', t: 3, members: 62 },
  gt: { n: 'CLB Guitar', i: 'GT', t: 4, members: 18 },
  mb: { n: 'Hội chợ mua bán', i: 'MB', t: 1, members: 214 },
};

export const av = (p, size = 40, opts = {}) =>
  `<span class="av av${size} tn${p.t || 1}${opts.sq ? ' sq' : ''}" aria-hidden="true">${p.i}${opts.online ?? p.on ? '<span class="on-dot"></span>' : ''}</span>`;
export const gav = (g, size = 40) => av(g, size, { sq: true, online: false });

export const ibtn = (icon, label, cls = '', size = 20) =>
  `<button class="ibtn ${cls}" aria-label="${label}">${ic(icon, size)}</button>`;
export const btn = (label, cls = 'btn-primary', icon = null, extra = '') =>
  `<button class="btn ${cls}"${extra}>${icon ? ic(icon, cls.includes('btn-sm') ? 16 : 18) : ''}${label}</button>`;
export const alink = (label, target, cls = 'btn-primary', icon = null) =>
  `<a class="btn ${cls}" href="@@${target}@@">${icon ? ic(icon, 18) : ''}${label}</a>`;

export const input = (id, placeholder, { icon = null, value = '', cls = '', type = 'text', trail = '' } = {}) =>
  `<div class="input ${cls}">${icon ? ic(icon, 18) : ''}<input id="${id}" type="${type}" placeholder="${placeholder}"${value ? ` value="${value}"` : ''} />${trail}</div>`;
export const field = (id, label, placeholder, opts = {}) =>
  `<div class="field"><label class="label" for="${id}">${label}</label>${input(id, placeholder, opts)}${opts.hint ? `<span class="hint${opts.err ? ' err' : ''}">${opts.hint}</span>` : ''}</div>`;

export const badge = (label, cls = '', dot = false) => `<span class="badge ${cls}">${dot ? '<span class="bd"></span>' : ''}${label}</span>`;

// ---------- Rail (điều hướng trái của user) ----------
export const rail = (active = 'chat', { bellOpen = false } = {}) => {
  const item = (key, icon, label, target, extra = '') =>
    `<a class="navbtn${active === key ? ' on' : ''}" href="@@${target}@@" aria-label="${label}">${ic(icon, 22)}${extra}</a>`;
  return `<nav class="rail" aria-label="Điều hướng chính">
<span class="logo" aria-hidden="true">${ic('message-circle', 20)}</span>
<div class="rail-nav">
${item('chat', 'message-circle', 'Đoạn chat', 'C1-Chat', '<span class="count">4</span>')}
${item('friends', 'users', 'Bạn bè', 'F1-Friends', '<span class="count">3</span>')}
${item('calls', 'phone', 'Cuộc gọi', 'P1-CallHistory')}
</div>
<div class="spacer"></div>
<a class="navbtn${bellOpen ? ' on' : ''}" href="@@C8-Notifications@@" aria-label="Thông báo">${ic('bell', 22)}<span class="pip"></span></a>
<a class="navbtn${active === 'profile' ? ' on' : ''}" href="@@S1-Profile@@" aria-label="Hồ sơ">${av(P.me, 32, { online: false })}</a>
</nav>`;
};

// ---------- Danh sách hội thoại ----------
export const CONVS = [
  { id: 'ma', p: P.ma, prev: 'Bạn: Tối nay mình gửi bản báo cáo nhé', time: '10:24', to: 'C1-Chat' },
  { id: 'cn', g: G.cn, prev: 'Gia Huy: Mình push code lên nhánh feat/auth rồi', time: '10:02', unread: 3, to: 'G1-GroupChat' },
  { id: 'hn', p: P.hn, prev: 'Tối nay họp nhóm lúc 8h nhé', time: '09:41', unread: 1, to: 'C1-Chat' },
  { id: 'th', p: P.th, prev: 'Bạn: Cảm ơn nha!', time: 'Hôm qua', to: 'C1-Chat' },
  { id: 'kt', g: G.kt, prev: 'Thầy đã đăng lịch thi giữa kỳ', time: 'Hôm qua', to: 'G1-GroupChat' },
  { id: 'qb', p: P.qb, prev: 'Cuộc gọi nhỡ', time: 'T2', missed: true, to: 'C1-Chat' },
  { id: 'nl', p: P.nl, prev: 'Đã gửi một ảnh', time: 'T2', to: 'C1-Chat' },
  { id: 'gt', g: G.gt, prev: 'Khánh Vy: Chủ nhật tập ở phòng B2', time: '20/09', to: 'G1-GroupChat' },
];

export const convList = (selected = 'ma', filter = 'all') => {
  const items = CONVS.map((c) => {
    const who = c.p ? av(c.p, 48) : gav(c.g, 48);
    const name = (c.p || c.g).n;
    const cls = ['citem', selected === c.id ? 'sel' : '', c.unread ? 'unread' : ''].join(' ').trim();
    return `<a class="${cls}" href="@@${c.to}@@">${who}<span class="meta"><span class="top"><span class="name trunc">${name}</span><span class="time">${c.time}</span></span><span class="bottom">${c.missed ? `<span class="c-danger row" style="gap: 4px">${ic('phone-missed', 14)}</span>` : ''}<span class="trunc grow${c.missed ? ' c-danger' : ''}">${c.prev}</span>${c.unread ? `<span class="count dark">${c.unread}</span>` : ''}</span></span></a>`;
  }).join('\n');
  const chip = (key, label) => `<button class="chip${filter === key ? ' on' : ''}">${label}</button>`;
  return `<section class="pane" style="width: 340px" aria-label="Danh sách đoạn chat">
<div class="pane-head"><h2 class="t-h2">Đoạn chat</h2>${ibtn('square-pen', 'Tin nhắn mới', 'subtle sm', 18)}</div>
<div class="pane-pad">${input('conv-search', 'Tìm kiếm đoạn chat', { icon: 'search', cls: 'filled' })}</div>
<div class="filters">${chip('all', 'Tất cả')}${chip('unread', 'Chưa đọc')}${chip('group', 'Nhóm')}</div>
<div class="clist">
${items}
</div>
</section>`;
};

// ---------- Tin nhắn ----------
export const msgIn = (content, p = null) =>
  `<div class="msg in">${p ? av(p, 24, { online: false }) : '<span class="av-space"></span>'}${content}</div>`;
export const msgOut = (content) => `<div class="msg out">${content}</div>`;
export const bubble = (text, cls = '') => `<div class="bubble ${cls}">${text}</div>`;
export const imgMsg = (name) => `<div class="imgmsg" role="img" aria-label="Ảnh ${name}"><span class="cap">${ic('image', 28, 1.5)}${name}</span></div>`;
export const fileMsg = (name, meta) =>
  `<div class="filemsg"><span class="fileicon">${ic('file-text', 20)}</span><span class="col grow" style="gap: 2px"><span class="fw5 trunc">${name}</span><span class="t-cap c2">${meta}</span></span>${ibtn('download', 'Tải xuống', 'sm', 18)}</div>`;
export const audioMsg = (dur, played = 9) => {
  const hs = [8, 14, 20, 12, 18, 24, 10, 16, 22, 14, 8, 18, 12, 20, 16, 10, 6, 14, 18, 10, 8, 12];
  const bars = hs.map((h, i) => `<span class="${i < played ? 'p' : ''}" style="height: ${h}px"></span>`).join('');
  return `<div class="audiomsg"><button class="playbtn" aria-label="Phát tin nhắn thoại">${ic('play', 14)}</button><span class="wave">${bars}</span><span class="t-cap tnum">${dur}</span></div>`;
};

export const header = (title, sub, avatarHtml, actions) =>
  `<header class="chat-head">${avatarHtml}<div class="col" style="gap: 1px; min-width: 0"><span class="fw6 trunc">${title}</span><span class="t-cap c2">${sub}</span></div><div class="actions">${actions}</div></header>`;

export const composer = (value = '', { attachOn = false } = {}) =>
  `<div class="composer">${ibtn('paperclip', 'Đính kèm file', attachOn ? 'on' : '')}${ibtn('image', 'Gửi ảnh')}${input('composer', 'Nhập tin nhắn…', { cls: 'filled', value })}${ibtn('mic', 'Ghi âm')}${ibtn('send', 'Gửi', 'solid', 18)}</div>`;

export const modal = (title, sub, body, foot, width = 480) =>
  `<div class="modal" role="dialog" aria-label="${title}" style="width: ${width}px"><div class="modal-head"><div class="col" style="gap: 4px"><h2 class="t-h2">${title}</h2>${sub ? `<p class="t-small c2">${sub}</p>` : ''}</div>${ibtn('x', 'Đóng', 'sm', 18)}</div><div class="modal-body">${body}</div>${foot ? `<div class="modal-foot">${foot}</div>` : ''}</div>`;

export const scrim = (inner) => `<div class="scrim">${inner}</div>`;
