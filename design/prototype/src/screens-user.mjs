// Màn hình phía người dùng: Auth (A), Chat (C), Nhóm (G), Bạn bè (F), Cuộc gọi (P), Hồ sơ (S)
import {
  ic, P, G, av, gav, ibtn, btn, alink, input, field, badge, rail, convList,
  msgIn, msgOut, bubble, imgMsg, fileMsg, audioMsg, header, composer, modal, scrim,
} from './ui.mjs';

const MORE = { ...P,
  dq: { n: 'Đỗ Quỳnh', i: 'ĐQ', u: 'doquynh', t: 3 },
  mc: { n: 'Minh Châu', i: 'MC', u: 'minhchau', t: 2 },
  mk: { n: 'Trần Minh Khoa', i: 'MK', u: 'minhkhoa', t: 4 },
  nm: { n: 'Phan Nhật Minh', i: 'NM', u: 'nhatminh', t: 1 },
  at: { n: 'Lương Anh Tú', i: 'AT', u: 'anhtu', t: 3 },
  bn: { n: 'Lý Bảo Ngọc', i: 'BN', u: 'baongoc', t: 1 },
  gn: { n: 'Hà Gia Hân', i: 'GH', u: 'giahan', t: 4 },
};

// ================= AUTH =================
const authShell = (inner) => `<main class="auth">
<div class="auth-card">
<div class="auth-brand"><span class="logo" aria-hidden="true">${ic('message-circle', 20)}</span>ChatApp</div>
${inner}
</div>
</main>`;

const pwTrail = `<button class="ibtn sm" aria-label="Hiện mật khẩu" style="margin-right: -6px">${ic('eye', 18)}</button>`;

const A1 = authShell(`<div class="col" style="gap: 6px"><h1 class="t-h1">Đăng nhập</h1><p class="c2">Chào mừng trở lại! Nhập thông tin để tiếp tục trò chuyện.</p></div>
<div class="col" style="gap: 16px">
${field('login-id', 'Email hoặc tên người dùng', 'ban@email.com', { icon: 'mail' })}
<div class="field"><div class="row" style="justify-content: space-between"><label class="label" for="login-pw">Mật khẩu</label><a class="t-small link" href="@@A3-ForgotPassword@@">Quên mật khẩu?</a></div>${input('login-pw', 'Nhập mật khẩu', { icon: 'lock', type: 'password', trail: pwTrail })}</div>
</div>
<a class="btn btn-primary btn-lg btn-block" href="@@C1-Chat@@">Đăng nhập</a>
<p class="t-small c2" style="text-align: center">Chưa có tài khoản? <a class="link" href="@@A2-Register@@">Đăng ký</a></p>`);

const A2 = authShell(`<div class="col" style="gap: 6px"><h1 class="t-h1">Tạo tài khoản</h1><p class="c2">Chỉ mất một phút để bắt đầu nhắn tin với bạn bè.</p></div>
<div class="col" style="gap: 16px">
${field('reg-name', 'Tên người dùng', 'vd: tuankiet', { icon: 'user', value: 'tuankiet', hint: '3–20 ký tự: chữ thường, số hoặc dấu gạch dưới' })}
${field('reg-email', 'Email', 'ban@email.com', { icon: 'mail', value: 'tuankiet@gmail.com' })}
${field('reg-pw', 'Mật khẩu', 'Tối thiểu 8 ký tự', { icon: 'lock', type: 'password', value: 'matkhau123', trail: pwTrail })}
${field('reg-pw2', 'Nhập lại mật khẩu', 'Nhập lại mật khẩu', { icon: 'lock', type: 'password', value: 'matkhau12', cls: 'error', hint: 'Mật khẩu nhập lại không khớp', err: true })}
</div>
<a class="btn btn-primary btn-lg btn-block" href="@@C2-NoConversation@@">Tạo tài khoản</a>
<p class="t-small c2" style="text-align: center">Đã có tài khoản? <a class="link" href="@@A1-Login@@">Đăng nhập</a></p>`);

const A3 = authShell(`<a class="row t-small c2 fw5" href="@@A1-Login@@" style="gap: 6px">${ic('arrow-left', 16)}Quay lại đăng nhập</a>
<span class="ring" style="width: 56px; height: 56px; background: var(--bg-subtle)">${ic('mail', 24)}</span>
<div class="col" style="gap: 6px"><h1 class="t-h1">Quên mật khẩu?</h1><p class="c2">Nhập email đã đăng ký. Chúng tôi sẽ gửi cho bạn liên kết đặt lại mật khẩu, có hiệu lực trong 30 phút.</p></div>
${field('fp-email', 'Email', 'ban@email.com', { icon: 'mail', cls: 'focus', value: 'tuankiet@gmail.com' })}
<a class="btn btn-primary btn-lg btn-block" href="@@A4-ResetPassword@@">Gửi liên kết đặt lại</a>
<div class="alert">${ic('info', 18)}<span>Không thấy email? Hãy kiểm tra thư mục Spam hoặc gửi lại sau 60 giây.</span></div>`);

const A4 = authShell(`<span class="ring" style="width: 56px; height: 56px; background: var(--bg-subtle)">${ic('lock', 24)}</span>
<div class="col" style="gap: 6px"><h1 class="t-h1">Đặt lại mật khẩu</h1><p class="c2">Tạo mật khẩu mới cho tài khoản <span class="fw5" style="color: var(--text)">tuankiet@gmail.com</span>.</p></div>
<div class="col" style="gap: 16px">
${field('rp-pw', 'Mật khẩu mới', 'Tối thiểu 8 ký tự', { icon: 'lock', type: 'password', value: 'Matkhau', cls: 'focus', trail: pwTrail })}
<ul class="rules" style="margin: 0; padding: 0; list-style: none">
<li class="row ok" style="gap: 8px">${ic('check', 16)}Có chữ hoa và chữ thường</li>
<li class="row c2" style="gap: 8px">${ic('x', 16)}Ít nhất 8 ký tự</li>
<li class="row c2" style="gap: 8px">${ic('x', 16)}Có ít nhất 1 chữ số</li>
</ul>
${field('rp-pw2', 'Nhập lại mật khẩu mới', 'Nhập lại mật khẩu', { icon: 'lock', type: 'password' })}
</div>
<a class="btn btn-primary btn-lg btn-block" href="@@A1-Login@@">Đặt lại mật khẩu</a>`);

// ================= CHAT 1-1 =================
const directHead = (active = '') => header('Nguyễn Minh Anh', 'Đang hoạt động', av(P.ma, 40),
  ibtn('search', 'Tìm trong đoạn chat', active === 'search' ? 'on' : '') +
  ibtn('phone', 'Gọi thoại') + ibtn('video', 'Gọi video') +
  ibtn('info', 'Thông tin', active === 'info' ? 'on' : ''));

const MENU = `<div class="pop" style="right: 0; top: calc(100% + 6px); width: 232px">
<button class="pop-item hov">${ic('pencil', 18)}Chỉnh sửa</button>
<button class="pop-item">${ic('copy', 18)}Sao chép</button>
<button class="pop-item">${ic('undo', 18)}Thu hồi với mọi người</button>
<div class="pop-sep"></div>
<button class="pop-item danger">${ic('trash', 18)}Xóa ở phía bạn</button>
<button class="pop-item danger">${ic('flag', 18)}Báo cáo tin nhắn</button>
</div>`;

const directThread = ({ hl = false, menu = false, editing = false, typing = false, audio = false } = {}) => {
  const target = 'Chốt rồi nha, bản v2 còn 8 bảng thôi.';
  let targetMsg;
  if (menu) {
    targetMsg = `<div class="msg out" style="z-index: 3"><div class="hover-actions">${ibtn('more-h', 'Tùy chọn tin nhắn', 'sm on', 18)}</div>${bubble(target)}${MENU}</div>`;
  } else if (editing) {
    targetMsg = msgOut(bubble(target, '" style="opacity: .5'));
  } else {
    targetMsg = msgOut(bubble(target));
  }
  return `<div class="msgs">
${audio ? `<div class="date-div">Hôm qua</div>${msgIn(audioMsg('0:42', 22), P.ma)}<div class="gap"></div>` : ''}
<div class="date-div">Hôm nay</div>
${msgIn(bubble('Kiệt ơi, phần ERD nhóm mình chốt chưa?'))}
${msgIn(bubble(hl ? 'Mình cần để viết <mark>schema</mark> Drizzle.' : 'Mình cần để viết schema Drizzle.', hl ? 'hl' : ''), P.ma)}
<div class="gap"></div>
${targetMsg}
${msgOut(bubble('Mình gộp attachments vào bảng messages luôn<span class="edited">(đã chỉnh sửa)</span>'))}
<div class="gap"></div>
${msgIn(imgMsg('erd-v2.png'))}
${msgIn(bubble('Nhìn gọn hơn hẳn luôn.'), P.ma)}
<div class="gap"></div>
${msgOut(fileMsg('ChatApp-ERD-v2.drawio', '83 KB · drawio'))}
${msgOut('<div class="recalled">Bạn đã thu hồi một tin nhắn</div>')}
${msgOut(bubble('Tối nay mình gửi bản báo cáo nhé'))}
<div class="msg-status">${ic('check-check', 14)}Đã xem · 10:24</div>
${typing ? `${msgIn('<div class="typing" aria-label="Đang soạn tin"><span></span><span></span><span></span></div>', P.ma)}` : ''}
</div>`;
};

const chatDirect = (opts = {}) => `<main class="chat" aria-label="Cuộc trò chuyện">
${directHead(opts.active)}
${directThread(opts)}
${opts.composerHtml ?? composer()}
${opts.extra ?? ''}
</main>`;

const userShell = (main, { active = 'chat', selected = 'ma', side = '', bellOpen = false, list = true } = {}) =>
  `${rail(active, { bellOpen })}${list ? convList(selected) : ''}${main}${side}`;

const C1 = userShell(chatDirect({ typing: true }));

const C2 = userShell(`<main class="chat" style="align-items: center; justify-content: center; gap: 16px; background: var(--bg-app); text-align: center">
<span class="ring" style="width: 72px; height: 72px; background: var(--bg-subtle)">${ic('message-circle', 32, 1.5)}</span>
<div class="col" style="gap: 6px; align-items: center"><h2 class="t-h2">Chọn một đoạn chat</h2><p class="c2" style="max-width: 360px">Chọn một cuộc trò chuyện trong danh sách bên trái hoặc bắt đầu cuộc trò chuyện mới.</p></div>
${btn('Tin nhắn mới', 'btn-primary', 'square-pen')}
</main>`, { selected: null });

const searchSide = `<aside class="side" aria-label="Tìm trong đoạn chat">
<div class="side-head"><span class="t-title">Tìm trong đoạn chat</span>${ibtn('x', 'Đóng', 'sm', 18)}</div>
<div class="sec">${input('msg-search', 'Tìm tin nhắn', { icon: 'search', cls: 'focus', value: 'schema', trail: ibtn('x', 'Xóa từ khóa', 'sm', 16) })}<span class="t-cap c2">3 kết quả</span></div>
<div class="sec" style="gap: 4px">
<a class="result sel" href="@@C3-SearchMessages@@">${av(P.ma, 32, { online: false })}<span class="col grow" style="gap: 2px"><span class="row" style="justify-content: space-between"><span class="fw5">Nguyễn Minh Anh</span><span class="t-cap c3">Hôm nay 10:12</span></span><span class="t-small c2">Mình cần để viết <mark>schema</mark> Drizzle.</span></span></a>
<a class="result" href="@@C3-SearchMessages@@">${av(P.me, 32, { online: false })}<span class="col grow" style="gap: 2px"><span class="row" style="justify-content: space-between"><span class="fw5">Bạn</span><span class="t-cap c3">23/09</span></span><span class="t-small c2"><mark>Schema</mark> users mình thêm cột reset_token_hash rồi nha</span></span></a>
<a class="result" href="@@C3-SearchMessages@@">${av(P.ma, 32, { online: false })}<span class="col grow" style="gap: 2px"><span class="row" style="justify-content: space-between"><span class="fw5">Nguyễn Minh Anh</span><span class="t-cap c3">20/09</span></span><span class="t-small c2">Gửi mình link doc <mark>schema</mark> với</span></span></a>
</div>
</aside>`;
const C3 = userShell(chatDirect({ hl: true, active: 'search' }), { side: searchSide });

const infoSide = `<aside class="side" aria-label="Thông tin liên hệ">
<div class="side-head"><span class="t-title">Thông tin</span>${ibtn('x', 'Đóng', 'sm', 18)}</div>
<div class="sec" style="align-items: center; text-align: center; gap: 6px; padding-top: 24px">
${av(P.ma, 80)}
<h3 class="t-title" style="margin-top: 6px">Nguyễn Minh Anh</h3>
<p class="t-small c2">@minhanh · Đang hoạt động</p>
<p class="t-small">“Đang ôn thi giữa kỳ, nhắn chậm nha”</p>
<span style="margin-top: 4px">${badge(`${ic('user-check', 14)}Bạn bè`, 'line')}</span>
<div class="quick" style="width: 100%; margin-top: 12px">
<button>${ic('user', 18)}Hồ sơ</button><button>${ic('bell-off', 18)}Tắt báo</button><button>${ic('search', 18)}Tìm kiếm</button>
</div>
</div>
<div class="sec">
<div class="row" style="justify-content: space-between"><span class="t-over c2">Ảnh &amp; file đã chia sẻ</span><a class="t-small fw5" href="@@C4-ContactInfo@@">Xem tất cả</a></div>
<div class="media-grid"><span></span><span></span><span></span><span></span><span></span><span></span></div>
<div class="row" style="gap: 10px"><span class="fileicon" style="width: 36px; height: 36px">${ic('file-text', 18)}</span><span class="col grow" style="gap: 0"><span class="t-small fw5 trunc">ChatApp-ERD-v2.drawio</span><span class="t-cap c2">83 KB · Hôm nay</span></span></div>
<div class="row" style="gap: 10px"><span class="fileicon" style="width: 36px; height: 36px">${ic('file-text', 18)}</span><span class="col grow" style="gap: 0"><span class="t-small fw5 trunc">KeHoach-Sprint.pdf</span><span class="t-cap c2">1,4 MB · 20/09</span></span></div>
</div>
<div class="sec" style="gap: 2px">
<a class="mrow" href="@@F1-Friends@@">${ic('user-x', 20)}Hủy kết bạn</a>
<a class="mrow danger" href="@@F4-Blocked@@">${ic('ban', 20)}Chặn Nguyễn Minh Anh</a>
<a class="mrow danger" href="@@C7-ReportModal@@">${ic('flag', 20)}Báo cáo</a>
</div>
</aside>`;
const C4 = userShell(chatDirect({ active: 'info' }), { side: infoSide });

const C5 = userShell(chatDirect({ menu: true }));

const editComposer = `<div class="composer-wrap">
<div class="editbar">${ic('pencil', 18)}<span class="col grow" style="gap: 0"><span class="t-cap fw5">Đang chỉnh sửa tin nhắn</span><span class="t-small c2 trunc">Chốt rồi nha, bản v2 còn 8 bảng thôi.</span></span>${ibtn('x', 'Hủy chỉnh sửa', 'sm', 18)}</div>
<div class="composer">${input('composer', 'Nhập tin nhắn…', { cls: 'filled focus', value: 'Chốt rồi nha, bản v2 còn 8 bảng, gộp 5 bảng phụ.' })}${ibtn('check', 'Lưu chỉnh sửa', 'solid', 18)}</div>
</div>`;
const C5b = userShell(chatDirect({ editing: true, composerHtml: editComposer }));

const attachComposer = `<div class="composer-wrap">
<div class="tray">
<div class="tray-thumb" role="img" aria-label="Ảnh sắp gửi: so-do-kien-truc.png">${ic('image', 22, 1.5)}<button class="tray-x" aria-label="Bỏ ảnh">${ic('x', 12, 3)}</button></div>
<div class="tray-thumb" role="img" aria-label="Ảnh sắp gửi: wireframe-chat.png">${ic('image', 22, 1.5)}<button class="tray-x" aria-label="Bỏ ảnh">${ic('x', 12, 3)}</button></div>
<div class="tray-file"><span class="fileicon">${ic('file-text', 20)}</span><span class="col grow" style="gap: 6px"><span class="t-small fw5 trunc">BaoCao-Sprint1.pdf</span><span class="progress"><span style="width: 64%"></span></span><span class="t-cap c2">1,2 MB · Đang tải lên 64%</span></span><button class="tray-x" aria-label="Hủy tải lên">${ic('x', 12, 3)}</button></div>
</div>
${composer('Gửi mọi người bản sơ đồ với báo cáo', { attachOn: true })}
</div>`;
const attachPop = `<div class="pop" style="left: 24px; bottom: 170px; width: 300px">
<button class="pop-item hov" style="height: auto; padding: 8px 10px; align-items: flex-start">${ic('image', 18)}<span class="col" style="gap: 0"><span>Ảnh hoặc video</span><span class="t-cap c2">JPG, PNG, GIF, MP4</span></span></button>
<button class="pop-item" style="height: auto; padding: 8px 10px; align-items: flex-start">${ic('file-text', 18)}<span class="col" style="gap: 0"><span>Tệp tài liệu</span><span class="t-cap c2">PDF, DOC, XLSX, ZIP · tối đa 20 MB</span></span></button>
<button class="pop-item" style="height: auto; padding: 8px 10px; align-items: flex-start">${ic('mic', 18)}<span class="col" style="gap: 0"><span>Ghi âm tin nhắn thoại</span><span class="t-cap c2">Tối đa 2 phút</span></span></button>
</div>`;
const C6 = userShell(chatDirect({ audio: true, composerHtml: attachComposer, extra: attachPop }));

const reasons = [['Spam hoặc lừa đảo', false], ['Quấy rối, bắt nạt', true], ['Nội dung không phù hợp', false], ['Giả mạo người khác', false], ['Lý do khác', false]];
const reportModal = modal('Báo cáo Nguyễn Minh Anh', 'Cho chúng tôi biết điều gì đang xảy ra. Người bị báo cáo sẽ không biết ai đã báo cáo.',
  `<fieldset class="col" style="gap: 8px; border: 0; margin: 0; padding: 0"><legend class="label" style="margin-bottom: 8px; padding: 0">Lý do</legend>
${reasons.map(([r, s], i) => `<label class="radio-card${s ? ' sel' : ''}"><input type="radio" name="reason" value="r${i}"${s ? ' checked="checked"' : ''} />${r}</label>`).join('\n')}
</fieldset>
<div class="field"><label class="label" for="report-desc">Mô tả thêm <span class="c3" style="font-weight: 400">(không bắt buộc)</span></label><textarea id="report-desc" class="ta" placeholder="Mô tả ngắn gọn sự việc">Liên tục nhắn tin xúc phạm trong nhóm lớp.</textarea></div>
<label class="check"><input type="checkbox" checked="checked" />Chặn Nguyễn Minh Anh sau khi gửi báo cáo</label>`,
  `${btn('Hủy', 'btn-secondary')}${btn('Gửi báo cáo', 'btn-danger', 'flag')}`);
const C7 = `${C1.replace('<div class="typing"', '<div class="typing" style="visibility: hidden"')}${scrim(reportModal)}`;

const notifPop = `<div class="pop" style="left: 80px; bottom: 76px; width: 400px; padding: 8px" role="dialog" aria-label="Thông báo">
<div class="row" style="justify-content: space-between; padding: 8px 8px 12px"><span class="t-title">Thông báo</span><button class="btn btn-ghost btn-sm">Đánh dấu đã đọc</button></div>
<div class="notif new">${av(P.pm, 40)}<div class="col grow" style="gap: 8px"><p class="t-small"><b>Mai Phương</b> đã gửi cho bạn lời mời kết bạn.<br /><span class="c3 t-cap">5 phút trước</span></p><div class="row">${btn('Chấp nhận', 'btn-primary btn-sm')}${btn('Xóa', 'btn-secondary btn-sm')}</div></div></div>
<div class="notif new">${gav(G.cn, 40)}<p class="t-small grow"><b>Nguyễn Minh Anh</b> đã thêm bạn vào nhóm <b>Nhóm đồ án CNPM</b>.<br /><span class="c3 t-cap">1 giờ trước</span></p></div>
<div class="notif">${av(P.qb, 40)}<p class="t-small grow"><span class="c-danger">Cuộc gọi nhỡ</span> từ <b>Phạm Quốc Bảo</b>.<br /><span class="c3 t-cap">Thứ Hai</span></p></div>
<div class="notif">${av(P.dt, 40)}<p class="t-small grow"><b>Hoàng Đức Trí</b> đã chấp nhận lời mời kết bạn.<br /><span class="c3 t-cap">Thứ Hai</span></p></div>
</div>`;
const toast = `<div class="toast" style="top: 16px; right: 16px" role="status">${av(P.hn, 40, { online: false })}<div class="col grow" style="gap: 2px"><div class="row" style="justify-content: space-between"><span class="fw6">Trần Hoàng Nam</span><span class="t-cap c3">vừa xong</span></div><p class="t-small c2">Tối nay họp nhóm lúc 8h nhé</p></div>${ibtn('x', 'Đóng thông báo', 'sm', 16)}</div>`;
const C8 = `${userShell(chatDirect({}), { bellOpen: true })}${notifPop}${toast}`;

// ================= NHÓM =================
const groupThread = `<div class="msgs">
<div class="date-div">Hôm nay</div>
<div class="sysmsg">Nguyễn Minh Anh đã thêm Lê Thu Hà vào nhóm</div>
<div class="sender">Đặng Gia Huy</div>
${msgIn(bubble('Mình push code lên nhánh feat/auth rồi, mọi người review giúp nha'))}
${msgIn(bubble('PR #12: đăng ký, đăng nhập, refresh token'), P.gh)}
<div class="sender">Lê Thu Hà</div>
${msgIn(bubble('Để mình review tối nay'), P.th)}
<div class="sender">Nguyễn Minh Anh</div>
${msgIn(fileMsg('PLAN.md', '12 KB · Markdown'), P.ma)}
<div class="gap"></div>
${msgOut(bubble('Nhớ chạy CI trước khi merge nha'))}
${msgOut(bubble('Ai xong việc thì tick vào PLAN.md giúp mình'))}
<div class="seen-by"><span class="stack">${av(P.ma, 20, { online: false })}${av(P.gh, 20, { online: false })}${av(P.th, 20, { online: false })}</span><span class="t-cap c3">Đã xem</span></div>
</div>`;
const groupChat = `<main class="chat" aria-label="Chat nhóm">
${header('Nhóm đồ án CNPM', '5 thành viên · 3 đang hoạt động', gav(G.cn, 40), ibtn('search', 'Tìm trong nhóm') + ibtn('info', 'Thông tin nhóm', 'on'))}
${groupThread}
${composer()}
</main>`;
const member = (p, role, me = false, extra = '') =>
  `<div class="row" style="gap: 12px; min-height: 48px; position: relative">${av(p, 40)}<span class="col grow" style="gap: 0"><span class="fw5 trunc">${p.n}${me ? ' <span class="c3" style="font-weight: 400">(bạn)</span>' : ''}</span><span class="t-cap c2">${role}</span></span>${me ? '' : ibtn('more-h', 'Tùy chọn thành viên', extra ? 'sm on' : 'sm', 18)}${extra}</div>`;
const memberPop = `<div class="pop" style="right: 0; top: 44px; width: 220px">
<button class="pop-item">${ic('message-circle', 18)}Nhắn tin riêng</button>
<button class="pop-item hov">${ic('crown', 18)}Chỉ định quản trị viên</button>
<div class="pop-sep"></div>
<button class="pop-item danger">${ic('user-x', 18)}Xóa khỏi nhóm</button>
</div>`;
const groupSide = `<aside class="side" aria-label="Thông tin nhóm">
<div class="side-head"><span class="t-title">Thông tin nhóm</span>${ibtn('x', 'Đóng', 'sm', 18)}</div>
<div class="sec" style="align-items: center; text-align: center; gap: 6px; padding-top: 20px">
${gav(G.cn, 80)}
<h3 class="t-title" style="margin-top: 6px">Nhóm đồ án CNPM</h3>
<p class="t-small c2">Nhóm · 5 thành viên</p>
<div class="quick" style="width: 100%; margin-top: 10px">
<a href="@@G2-AddMembers@@">${ic('user-plus', 18)}Thêm</a>
<a href="@@G3-EditGroup@@">${ic('pencil', 18)}Đổi thông tin</a>
<button>${ic('bell-off', 18)}Tắt báo</button>
</div>
</div>
<div class="sec" style="gap: 4px">
<div class="row" style="justify-content: space-between; margin-bottom: 4px"><span class="t-over c2">Thành viên · 5</span><a class="btn btn-ghost btn-sm" href="@@G2-AddMembers@@">${ic('plus', 16)}Thêm</a></div>
${member(P.me, 'Trưởng nhóm', true)}
${member(P.ma, 'Quản trị viên')}
${member(P.gh, 'Thành viên', false, memberPop)}
${member(P.th, 'Thành viên')}
${member(P.hn, 'Thành viên')}
</div>
<div class="sec" style="gap: 2px">
<a class="mrow danger" href="@@C2-NoConversation@@">${ic('log-out', 20)}Rời nhóm</a>
<a class="mrow danger" href="@@C7-ReportModal@@">${ic('flag', 20)}Báo cáo nhóm</a>
</div>
</aside>`;
const G1 = userShell(groupChat, { selected: 'cn', side: groupSide });

const pick = (p, checked, disabled = false) =>
  `<label class="row" style="gap: 12px; min-height: 56px${disabled ? '; opacity: .5' : ''}"><input type="checkbox" style="width: 16px; height: 16px; margin: 0; accent-color: var(--accent)"${checked ? ' checked="checked"' : ''}${disabled ? ' disabled="disabled"' : ''} />${av(p, 40)}<span class="col grow" style="gap: 0"><span class="fw5">${p.n}</span><span class="t-cap c2">${disabled ? 'Đã ở trong nhóm' : '@' + p.u}</span></span></label>`;
const chipSel = (p) => `<span class="chip out">${av(p, 24, { online: false })}${p.n}<button class="ibtn sm" style="width: 20px; height: 20px" aria-label="Bỏ chọn ${p.n}">${ic('x', 14)}</button></span>`;
const addModal = modal('Thêm thành viên', 'Nhóm đồ án CNPM',
  `${input('add-search', 'Tìm bạn bè theo tên', { icon: 'search', cls: 'filled' })}
<div class="row" style="flex-wrap: wrap">${chipSel(P.nl)}${chipSel(P.kv)}</div>
<div class="col" style="gap: 0">
<span class="t-over c2" style="margin-bottom: 4px">Bạn bè</span>
${pick(P.nl, true)}${pick(P.kv, true)}${pick(P.qb, false)}${pick(P.dt, false)}${pick(P.ma, true, true)}
</div>`,
  `${btn('Hủy', 'btn-secondary')}${btn('Thêm 2 người', 'btn-primary', 'user-plus')}`);
const G2 = `${G1.replace(memberPop, '')}${scrim(addModal)}`;

const editModal = modal('Đổi thông tin nhóm', null,
  `<div class="row" style="gap: 20px">
<div style="position: relative">${gav(G.cn, 96)}<button class="ibtn sm solid" style="position: absolute; right: -4px; bottom: -4px; border-radius: 50%; box-shadow: 0 0 0 3px var(--bg-surface)" aria-label="Đổi ảnh nhóm">${ic('camera', 16)}</button></div>
<div class="col" style="gap: 8px"><div class="row">${btn('Tải ảnh lên', 'btn-secondary btn-sm', 'upload')}${btn('Xóa ảnh', 'btn-ghost btn-sm')}</div><span class="hint">JPG hoặc PNG, tối đa 5 MB</span></div>
</div>
${field('group-name', 'Tên nhóm', 'Nhập tên nhóm', { cls: 'focus', value: 'Nhóm đồ án CNPM – K22', trail: '<span class="t-cap c3 tnum">21/50</span>' })}
<div class="alert">${ic('info', 18)}<span>Mọi thành viên sẽ thấy tin nhắn hệ thống khi bạn đổi tên hoặc ảnh nhóm.</span></div>`,
  `${btn('Hủy', 'btn-secondary')}${btn('Lưu thay đổi', 'btn-primary')}`, 460);
const G3 = `${G1.replace(memberPop, '')}${scrim(editModal)}`;

// ================= BẠN BÈ =================
const friendsNav = (activeKey) => {
  const a = (key, icon, label, target, tail) => `<a class="${activeKey === key ? 'on' : ''}" href="@@${target}@@">${ic(icon, 20)}${label}${tail}</a>`;
  return `<section class="pane" style="width: 280px" aria-label="Bạn bè">
<div class="pane-head"><h2 class="t-h2">Bạn bè</h2></div>
<nav class="snav">
${a('all', 'users', 'Tất cả bạn bè', 'F1-Friends', '<span class="t-cap c3" style="margin-left: auto">24</span>')}
${a('req', 'user-plus', 'Lời mời kết bạn', 'F2-FriendRequests', '<span class="count">3</span>')}
${a('find', 'user-search', 'Tìm người dùng', 'F3-FindUsers', '')}
${a('blocked', 'ban', 'Đã chặn', 'F4-Blocked', '<span class="t-cap c3" style="margin-left: auto">2</span>')}
</nav>
</section>`;
};
const friendsShell = (key, main) => `${rail('friends')}${friendsNav(key)}<main class="main">${main}</main>`;
const topbar = (title, sub, right = '') => `<header class="topbar"><div class="col" style="gap: 0"><h1 class="t-h2">${title}</h1>${sub ? `<span class="t-small c2">${sub}</span>` : ''}</div><div class="row">${right}</div></header>`;

const friendRow = (p, status, extra = '') =>
  `<div class="prow"${extra ? ' style="position: relative"' : ''}>${av(p, 48)}<span class="meta"><span class="fw5">${p.n}</span><span class="t-small c2">@${p.u} · ${status}</span></span><a class="ibtn subtle" href="@@C1-Chat@@" aria-label="Nhắn tin">${ic('message-circle', 20)}</a>${ibtn('phone', 'Gọi thoại', 'subtle')}${ibtn('more-h', 'Tùy chọn', extra ? 'on' : '')}${extra}</div>`;
const friendPop = `<div class="pop" style="right: 20px; top: 60px; width: 220px">
<button class="pop-item">${ic('user', 18)}Xem hồ sơ</button>
<button class="pop-item hov">${ic('user-x', 18)}Hủy kết bạn</button>
<div class="pop-sep"></div>
<button class="pop-item danger">${ic('ban', 18)}Chặn</button>
<button class="pop-item danger">${ic('flag', 18)}Báo cáo</button>
</div>`;
const F1 = friendsShell('all', `${topbar('Tất cả bạn bè', '24 người', input('friend-filter', 'Tìm trong danh sách bạn bè', { icon: 'search', cls: 'filled' }).replace('class="input filled"', 'class="input filled" style="width: 300px"'))}
<div class="content"><div class="card" style="max-width: 960px">
<div class="t-over c2" style="padding: 16px 20px 4px">Đang hoạt động — 3</div>
${friendRow(P.ma, 'Đang hoạt động')}${friendRow(P.th, 'Đang hoạt động')}${friendRow(P.nl, 'Đang hoạt động')}
<div class="t-over c2" style="padding: 16px 20px 4px; border-top: 1px solid var(--border)">Khác — 21</div>
${friendRow(P.hn, 'Hoạt động 15 phút trước')}${friendRow(P.qb, 'Hoạt động 2 giờ trước', friendPop)}${friendRow(P.gh, 'Hoạt động hôm qua')}${friendRow(P.kv, 'Hoạt động hôm qua')}
</div></div>`);

const reqRow = (p, when) => `<div class="prow">${av(p, 48, { online: false })}<span class="meta"><span class="fw5">${p.n}</span><span class="t-small c2">@${p.u} · ${when}</span></span>${btn('Chấp nhận', 'btn-primary btn-sm', 'check')}${btn('Từ chối', 'btn-secondary btn-sm')}</div>`;
const F2 = friendsShell('req', `${topbar('Lời mời kết bạn', null)}
<div class="content">
<div class="tabs" style="max-width: 960px"><button class="tab on">Đã nhận <span class="count">3</span></button><button class="tab">Đã gửi <span class="count dark" style="background: var(--bg-muted); color: var(--text-2)">2</span></button></div>
<div class="card" style="max-width: 960px">
${reqRow(P.pm, '5 phút trước')}${reqRow(MORE.bn, 'Hôm qua')}${reqRow(MORE.gn, '3 ngày trước')}
</div>
<p class="t-small c2">Lời mời kết bạn sẽ hiển thị ở đây cho đến khi bạn chấp nhận hoặc từ chối.</p>
</div>`);

const findRow = (p, right, note = '') => `<div class="prow">${av(p, 48, { online: false })}<span class="meta"><span class="fw5">${p.n}</span><span class="t-small c2">@${p.u}${note ? ' · ' + note : ''}</span></span>${right}</div>`;
const F3 = friendsShell('find', `${topbar('Tìm người dùng', 'Tìm theo tên người dùng hoặc email')}
<div class="content" style="max-width: 1024px">
${input('user-search', 'Nhập tên hoặc email', { icon: 'search', cls: 'lg focus', value: 'minh', trail: ibtn('x', 'Xóa từ khóa', 'sm', 16) })}
<span class="t-small c2">4 kết quả cho “minh”</span>
<div class="card">
${findRow(P.ma, `${badge(`${ic('user-check', 14)}Bạn bè`, 'line')}${alink('Nhắn tin', 'C1-Chat', 'btn-secondary btn-sm', 'message-circle')}`)}
${findRow(MORE.mc, `${btn('Kết bạn', 'btn-primary btn-sm', 'user-plus')}${btn('Nhắn tin', 'btn-secondary btn-sm', 'message-circle')}`)}
${findRow(MORE.mk, `${btn('Đã gửi lời mời', 'btn-subtle btn-sm', 'check')}${btn('Hủy', 'btn-ghost btn-sm')}`)}
${findRow(MORE.nm, `${btn('Chấp nhận', 'btn-primary btn-sm')}${btn('Từ chối', 'btn-ghost btn-sm')}`, 'đã gửi lời mời cho bạn')}
</div>
</div>`);

const blockRow = (p, when) => `<div class="prow">${av(p, 48, { online: false })}<span class="meta"><span class="fw5">${p.n}</span><span class="t-small c2">@${p.u} · Đã chặn ${when}</span></span>${btn('Bỏ chặn', 'btn-secondary btn-sm')}</div>`;
const F4 = friendsShell('blocked', `${topbar('Đã chặn', '2 người')}
<div class="content" style="max-width: 1024px">
<div class="alert">${ic('info', 18)}<span>Người bị chặn không thể nhắn tin, gọi cho bạn hay tìm thấy bạn. Họ sẽ không nhận được thông báo khi bị chặn.</span></div>
<div class="card">${blockRow(P.sn, '12/09/2026')}${blockRow(MORE.at, '02/09/2026')}</div>
</div>`);

// ================= CUỘC GỌI =================
const callRow = (p, kind, dir, label, time, danger = false) => {
  const icon = dir === 'in' ? 'phone-incoming' : dir === 'out' ? 'phone-outgoing' : 'phone-missed';
  return `<div class="prow">${av(p, 48, { online: false })}<span class="meta"><span class="fw5${danger ? ' c-danger' : ''}">${p.n}</span><span class="row t-small ${danger ? 'c-danger' : 'c2'}" style="gap: 6px">${ic(icon, 14)}${ic(kind === 'video' ? 'video' : 'phone', 14)}${label}</span></span><span class="t-small c3 tnum" style="width: 64px; text-align: right">${time}</span>${ibtn('phone', 'Gọi thoại', 'subtle')}${ibtn('video', 'Gọi video', 'subtle')}</div>`;
};
const dayHead = (d, first = false) => `<div class="t-over c2" style="padding: 16px 20px 4px${first ? '' : '; border-top: 1px solid var(--border)'}">${d}</div>`;
const P1 = `${rail('calls')}<main class="main">
${topbar('Cuộc gọi', 'Lịch sử cuộc gọi 1-1', '<div class="seg" role="tablist"><button class="on">Tất cả</button><button>Cuộc gọi nhỡ</button><button>Gọi đi</button><button>Gọi đến</button></div>')}
<div class="content" style="align-items: center"><div class="card" style="width: 880px">
${dayHead('Hôm nay', true)}
${callRow(P.ma, 'video', 'out', 'Gọi video đi · 12:48', '10:05')}
${callRow(P.hn, 'audio', 'in', 'Gọi thoại đến · 3:12', '08:30')}
${dayHead('Hôm qua')}
${callRow(P.qb, 'audio', 'miss', 'Cuộc gọi nhỡ', '21:14', true)}
${callRow(P.th, 'video', 'in', 'Gọi video đến · 25:03', '19:40')}
${callRow(P.nl, 'audio', 'out', 'Gọi thoại đi · Không trả lời', '14:02')}
${dayHead('Thứ Ba, 22/09')}
${callRow(P.gh, 'video', 'in', 'Gọi video đến · Đã từ chối', '20:15')}
${callRow(P.ma, 'audio', 'out', 'Gọi thoại đi · 5:40', '09:12')}
</div></div>
</main>`;

const incoming = `<div class="col stage" style="width: 360px; align-items: center; gap: 24px; padding: 40px 32px 32px; border-radius: 28px; box-shadow: var(--shadow-modal)" role="dialog" aria-label="Cuộc gọi đến">
<span class="ring" style="width: 160px; height: 160px; background: rgba(255, 255, 255, .05)"><span class="ring" style="width: 128px; height: 128px; background: rgba(255, 255, 255, .08)">${av(P.ma, 96, { online: false })}</span></span>
<div class="col" style="align-items: center; gap: 4px"><h2 class="t-h2">Nguyễn Minh Anh</h2><p class="clabel" style="font-size: 14px">Cuộc gọi video đến…</p></div>
<div class="row" style="gap: 56px; margin-top: 8px">
<div class="col" style="align-items: center; gap: 8px"><button class="cbtn decline" aria-label="Từ chối">${ic('phone-off', 24)}</button><span class="clabel">Từ chối</span></div>
<div class="col" style="align-items: center; gap: 8px"><a class="cbtn accept" href="@@P3-VideoCall@@" aria-label="Chấp nhận">${ic('video', 24)}</a><span class="clabel">Chấp nhận</span></div>
</div>
</div>`;
const P2 = `${C1.replace('<div class="typing"', '<div class="typing" style="visibility: hidden"')}${scrim(incoming)}`;

const P3 = `<main class="col" style="flex: 1 1 0; padding: 20px 24px 24px; gap: 20px; position: relative">
<header class="row" style="justify-content: space-between">
<div class="row" style="gap: 12px">${av(P.ma, 40, { online: false })}<div class="col" style="gap: 0"><span class="fw6">Nguyễn Minh Anh</span><span class="row clabel" style="gap: 6px; font-size: 13px"><span class="tnum">12:48</span>·${ic('wifi', 14)}Kết nối tốt</span></div></div>
<span class="clabel" style="font-size: 13px">Cuộc gọi video</span>
</header>
<div class="tile" style="flex: 1 1 0" role="img" aria-label="Video của Nguyễn Minh Anh">
<div class="col" style="align-items: center; gap: 12px; color: rgba(255, 255, 255, .5)">${ic('video', 40, 1.25)}<span class="t-small">[Video của người nhận]</span></div>
<span class="tile-label">Nguyễn Minh Anh</span>
<div class="tile" style="position: absolute; right: 20px; bottom: 20px; width: 264px; height: 168px; background: #2A2A2F; box-shadow: 0 12px 32px rgba(0, 0, 0, .5)">
<div class="col" style="align-items: center; gap: 8px">${av(P.me, 56, { online: false })}<span class="t-cap" style="color: rgba(255, 255, 255, .7)">Camera đã tắt</span></div>
<span class="tile-label" style="left: 10px; bottom: 10px; height: 26px; font-size: 12px">${ic('mic-off', 14)}Bạn</span>
</div>
<div class="tile-label" style="left: 50%; top: 16px; bottom: auto; transform: translateX(-50%)">${ic('mic-off', 16)}Mic của bạn đang tắt</div>
</div>
<footer class="row" style="justify-content: center; gap: 20px">
<div class="col" style="align-items: center; gap: 8px"><button class="cbtn off" aria-label="Bật mic" aria-pressed="true">${ic('mic-off', 24)}</button><span class="clabel">Đã tắt mic</span></div>
<div class="col" style="align-items: center; gap: 8px"><button class="cbtn off" aria-label="Bật camera" aria-pressed="true">${ic('video-off', 24)}</button><span class="clabel">Camera đã tắt</span></div>
<div class="col" style="align-items: center; gap: 8px"><button class="cbtn" aria-label="Loa">${ic('volume-2', 24)}</button><span class="clabel">Loa</span></div>
<div class="col" style="align-items: center; gap: 8px"><a class="cbtn end" href="@@P1-CallHistory@@" aria-label="Kết thúc cuộc gọi">${ic('phone-off', 24)}</a><span class="clabel">Kết thúc</span></div>
</footer>
</main>`;

// ================= HỒ SƠ =================
const sw = (label, sub, on) => `<div class="row" style="gap: 16px; min-height: 56px; justify-content: space-between"><span class="col" style="gap: 0"><span class="fw5">${label}</span><span class="t-small c2">${sub}</span></span><button class="switch${on ? ' on' : ''}" role="switch" aria-checked="${on}" aria-label="${label}"></button></div>`;
const S1 = `${rail('profile')}<main class="main">
${topbar('Hồ sơ &amp; cài đặt', null, alink('Đăng xuất', 'A1-Login', 'btn-secondary', 'log-out'))}
<div class="content" style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); align-items: start; max-width: 1180px">
<section class="card">
<div class="card-head"><h2 class="t-title">Thông tin cá nhân</h2></div>
<div class="card-body col" style="gap: 20px">
<div class="row" style="gap: 20px"><div style="position: relative">${av(P.me, 96, { online: false })}<button class="ibtn sm solid" style="position: absolute; right: -2px; bottom: -2px; border-radius: 50%; box-shadow: 0 0 0 3px var(--bg-surface)" aria-label="Đổi ảnh đại diện">${ic('camera', 16)}</button></div><div class="col" style="gap: 8px"><div class="row">${btn('Tải ảnh lên', 'btn-secondary btn-sm', 'upload')}${btn('Xóa ảnh', 'btn-ghost btn-sm')}</div><span class="hint">JPG hoặc PNG, tối đa 5 MB</span></div></div>
${field('pf-display', 'Tên hiển thị', 'Tên của bạn', { value: 'Lâm Tuấn Kiệt' })}
${field('pf-username', 'Tên người dùng', 'vd: tuankiet', { value: 'tuankiet', trail: '<span class="c3">@</span>', hint: 'Bạn bè dùng tên này để tìm thấy bạn' })}
${field('pf-email', 'Email', '', { value: 'tuankiet@gmail.com', cls: 'filled', hint: 'Email dùng để đăng nhập và khôi phục mật khẩu' })}
${field('pf-status', 'Trạng thái', 'Bạn đang làm gì?', { value: 'Đang làm đồ án CNPM', trail: '<span class="t-cap c3 tnum">19/80</span>' })}
<div class="row" style="justify-content: flex-end">${btn('Hủy', 'btn-ghost')}${btn('Lưu thay đổi', 'btn-primary')}</div>
</div>
</section>
<div class="col" style="gap: 20px">
<section class="card">
<div class="card-head"><h2 class="t-title">Đổi mật khẩu</h2></div>
<div class="card-body col" style="gap: 16px">
${field('pw-cur', 'Mật khẩu hiện tại', 'Nhập mật khẩu hiện tại', { type: 'password' })}
${field('pw-new', 'Mật khẩu mới', 'Tối thiểu 8 ký tự, có chữ và số', { type: 'password' })}
${field('pw-new2', 'Nhập lại mật khẩu mới', 'Nhập lại mật khẩu mới', { type: 'password' })}
<div class="row" style="justify-content: flex-end">${btn('Cập nhật mật khẩu', 'btn-secondary')}</div>
</div>
</section>
<section class="card">
<div class="card-head"><h2 class="t-title">Tùy chọn</h2></div>
<div class="card-body col" style="gap: 4px; padding-top: 8px; padding-bottom: 8px">
${sw('Âm báo tin nhắn mới', 'Phát âm thanh khi có tin nhắn ở đoạn chat khác', true)}
${sw('Hiện thông báo dạng toast', 'Hiện góc trên bên phải khi có tin nhắn mới', true)}
<div class="row" style="gap: 16px; min-height: 56px; justify-content: space-between"><span class="col" style="gap: 0"><span class="fw5">Giao diện</span><span class="t-small c2">Chế độ sáng hoặc tối</span></span><div class="seg"><button class="on">Sáng</button><button>Tối</button></div></div>
</div>
</section>
</div>
</div>
</main>`;

export const USER_SCREENS = [
  { id: 'A1-Login', title: 'A1 · Đăng nhập', page: 'auth', body: A1, figma: true },
  { id: 'A2-Register', title: 'A2 · Đăng ký', page: 'auth', body: A2, figma: true },
  { id: 'A3-ForgotPassword', title: 'A3 · Quên mật khẩu', page: 'auth', body: A3, figma: true },
  { id: 'A4-ResetPassword', title: 'A4 · Đặt lại mật khẩu', page: 'auth', body: A4, figma: true },
  { id: 'C1-Chat', title: 'C1 · Chat 1-1 (chính)', page: 'chat', body: C1, figma: true },
  { id: 'C2-NoConversation', title: 'C2 · Chưa chọn cuộc trò chuyện', page: 'chat', body: C2, figma: true },
  { id: 'C3-SearchMessages', title: 'C3 · Tìm kiếm tin nhắn', page: 'chat', body: C3 },
  { id: 'C4-ContactInfo', title: 'C4 · Thông tin liên hệ', page: 'chat', body: C4 },
  { id: 'C5-MessageMenu', title: 'C5 · Menu tin nhắn', page: 'chat', body: C5 },
  { id: 'C5b-EditMessage', title: 'C5b · Chỉnh sửa tin nhắn', page: 'chat', body: C5b },
  { id: 'C6-Attachments', title: 'C6 · Đính kèm file', page: 'chat', body: C6 },
  { id: 'C7-ReportModal', title: 'C7 · Modal báo cáo', page: 'chat', body: C7 },
  { id: 'C8-Notifications', title: 'C8 · Thông báo', page: 'chat', body: C8 },
  { id: 'G1-GroupChat', title: 'G1 · Chat nhóm + thành viên', page: 'group', body: G1 },
  { id: 'G2-AddMembers', title: 'G2 · Thêm thành viên', page: 'group', body: G2 },
  { id: 'G3-EditGroup', title: 'G3 · Đổi thông tin nhóm', page: 'group', body: G3 },
  { id: 'F1-Friends', title: 'F1 · Tất cả bạn bè', page: 'friends', body: F1 },
  { id: 'F2-FriendRequests', title: 'F2 · Lời mời kết bạn', page: 'friends', body: F2 },
  { id: 'F3-FindUsers', title: 'F3 · Tìm người dùng', page: 'friends', body: F3 },
  { id: 'F4-Blocked', title: 'F4 · Đã chặn', page: 'friends', body: F4 },
  { id: 'P1-CallHistory', title: 'P1 · Lịch sử cuộc gọi', page: 'calls', body: P1 },
  { id: 'P2-IncomingCall', title: 'P2 · Cuộc gọi đến', page: 'calls', body: P2 },
  { id: 'P3-VideoCall', title: 'P3 · Video call', page: 'calls', body: P3, rootClass: 'stage' },
  { id: 'S1-Profile', title: 'S1 · Hồ sơ & cài đặt', page: 'profile', body: S1 },
];
