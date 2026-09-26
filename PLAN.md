# PLAN.md – Kế hoạch xây dựng ChatApp

> Đồ án CNPM · Nhóm 3 người · 11 tuần (18/09/2026 → 03/12/2026)
> Web chat tương tự Messenger/Instagram: React + Vite · Node.js (Express) REST API · PostgreSQL + Drizzle · Socket.io · WebRTC

---

## 0. Cách dùng file này

- Mỗi việc là một checkbox. Làm xong thì đổi `- [ ]` thành `- [x]` và commit cùng PR của việc đó (ví dụ commit `docs(plan): tick A-1.3`).
- Người phụ trách ghi ở đầu dòng: **@A**, **@B**, **@C**, **@ALL** (cả nhóm). Việc nào chưa có người nhận thì ghi `@?`.
- Mã việc có dạng `<Sprint>.<số>` (vd `S1.12`) để nhắc trong issue, PR, commit.
- Việc đánh dấu ✂️ là **ứng viên cắt giảm** nếu trễ tiến độ (xem mục 9).
- Việc đánh dấu ⭐ là **mốc quan trọng**: phải xong đúng hạn, trễ thì cả nhóm dừng lại xử lý.
- Cuối mỗi sprint: cập nhật bảng tiến độ ở mục 1 và ghi 3–5 dòng vào mục 11 (Retro).

### Phân vai (vertical slice, mỗi người làm full-stack một mảng)

| Vai | Mảng phụ trách |
|---|---|
| **@A** | Auth, User/Profile, Admin-User, Report, DB schema tổng, repo/CI, test infra |
| **@B** | Realtime (Socket.io), Messaging & tính năng tin nhắn, Upload file, Notification in-app, WebRTC Call |
| **@C** | Friend/Block, Group chat, Admin-Group, Dashboard thống kê, UI nền tảng (layout, design system) |

> Phân vai là đề xuất; nhóm có thể đổi người trong buổi họp Sprint 0, chỉ cần sửa lại tag trong file.

---

## 1. Tổng quan tiến độ

| Sprint | Tuần | Thời gian | Mục tiêu (demo được cuối sprint) | Trạng thái |
|---|---|---|---|---|
| 0 | 1 | 18/09 – 24/09 | Repo, ERD, wireframe, backlog, khung dự án chạy được | 🟡 Đang làm |
| 1 | 2–3 | 25/09 – 08/10 | Đăng ký/đăng nhập, profile, chat text 1-1 realtime, online/offline | ⬜ |
| 2 | 4–5 | 09/10 – 22/10 | Bạn bè/chặn, chat nhóm, trạng thái/thu hồi/sửa/tìm kiếm tin nhắn, prototype WebRTC | ⬜ |
| 3 | 6–7 | 23/10 – 05/11 | Gửi file, thông báo in-app, report, Admin user (list/ban/detail) | ⬜ |
| 4 | 8–9 | 06/11 – 19/11 | Call 1-1 + lịch sử, Admin dashboard, Admin nhóm + giải tán nhóm | ⬜ |
| 5 | 10–11 | 20/11 – 03/12 | Feature freeze, test E2E, polish, seed data, báo cáo, slide, buffer | ⬜ |

**Mốc chính**
- ⭐ 24/09 – Khung dự án chạy được local (FE + BE + DB), CI xanh.
- ⭐ 08/10 – Demo chat 1-1 realtime giữa 2 trình duyệt.
- ⭐ 22/10 – Prototype WebRTC gọi được 1-1 trên 2 máy trong LAN (quyết định giữ/cắt call).
- ⭐ 19/11 – **Feature freeze**: sau mốc này chỉ sửa bug, không thêm tính năng.
- ⭐ 03/12 – Nộp: source, báo cáo, slide, video demo.

---

## 2. Kiến trúc & quy ước kỹ thuật (tham chiếu chung)

### 2.1 Kiến trúc tổng thể

```
[React + Vite SPA] ──REST (axios, JWT)──▶ [Express API] ──Drizzle──▶ [PostgreSQL]
        │                                       │
        └────── Socket.io (JWT handshake) ──────┘──▶ lưu file: Cloudinary (hoặc thư mục uploads/ local)
        │
        └── WebRTC P2P (media) ◀── signaling qua Socket.io ──▶ STUN public (stun:stun.l.google.com:19302)
```

- REST cho CRUD và truy vấn; Socket.io cho sự kiện realtime (tin mới, typing, online, receipt, call signaling).
- **Ghi dữ liệu luôn qua REST hoặc handler socket có validate**, sau đó server phát sự kiện tới room liên quan.
- Mỗi user join room `user:<id>`; mỗi hội thoại có room `conv:<id>`.

### 2.2 Cấu trúc repo (monorepo, npm workspaces)

```
chat-app/
├── apps/
│   ├── web/                 # React + Vite
│   │   └── src/
│   │       ├── api/         # axios client + hàm gọi API theo module
│   │       ├── socket/      # kết nối socket.io-client, hooks
│   │       ├── features/    # auth/ chat/ friends/ groups/ calls/ admin/ profile/
│   │       ├── components/  # UI dùng chung (Button, Avatar, Modal…)
│   │       ├── layouts/     # AppLayout, AdminLayout, AuthLayout
│   │       ├── routes/      # router, ProtectedRoute, AdminRoute
│   │       └── store/       # state toàn cục (Zustand)
│   └── api/                 # Express
│       └── src/
│           ├── db/          # schema.js (Drizzle), migrations/, seed.js
│           ├── modules/     # auth/ users/ friends/ conversations/ messages/ calls/ reports/ admin/
│           │   └── <module>/{router.js, controller.js, service.js, validator.js}
│           ├── socket/      # index.js, handlers/ (chat, presence, call)
│           ├── middlewares/ # auth, requireAdmin, errorHandler, validate, rateLimit
│           └── utils/
├── .github/workflows/ci.yml
├── docker-compose.yml       # PostgreSQL local (+ pgAdmin tùy chọn)
├── docs/                    # ERD, API, báo cáo, ảnh chụp
└── PLAN.md
```

### 2.3 Thư viện đề xuất

| Tầng | Thư viện |
|---|---|
| BE | express, drizzle-orm, drizzle-kit, pg, zod, bcrypt, jsonwebtoken, socket.io, multer, cloudinary, nodemailer, helmet, cors, express-rate-limit, uuidv7 |
| FE | react-router-dom, axios, @tanstack/react-query, zustand, socket.io-client, react-hook-form + zod, dayjs, recharts, (peerjs – tùy chọn) |
| Test | vitest, supertest, @testing-library/react, playwright |
| Lint | eslint, prettier, husky + lint-staged (tùy chọn) |

### 2.4 Quy ước

- **Git**: `main` luôn chạy được; nhánh `feat/<mã-việc>-<tên>`, `fix/...`, `docs/...`. Merge qua PR, **ít nhất 1 người review**, CI phải xanh.
- **Commit**: Conventional Commits – `feat(chat): gửi tin nhắn realtime`.
- **API**: tiền tố `/api/v1`, JSON, lỗi dạng `{ error: { code, message } }`, phân trang cursor `?cursor=<uuid>&limit=30` (UUID v7 sắp xếp theo thời gian).
- **Auth**: access token JWT (15 phút) trong header `Authorization: Bearer`; refresh token (7 ngày) trong cookie httpOnly.
- **Env**: `.env.example` luôn cập nhật; không commit secret.
- **Definition of Done (DoD)** cho mỗi tính năng:
  1. API + UI hoạt động theo đặc tả, đã tự test tay trên 2 trình duyệt (nếu realtime).
  2. Validate input (zod) + kiểm tra quyền (chỉ thành viên/chủ sở hữu/admin).
  3. Có ít nhất test API cho luồng chính (happy path + 1 lỗi phân quyền).
  4. Không lỗi console, có trạng thái loading/empty/error trên UI.
  5. PR đã review, CI xanh, tick checkbox trong PLAN.md.

---

## 3. Sprint 0 – Khởi động (Tuần 1: 18/09 – 24/09)

### 3.1 Phân tích & thiết kế
- [x] **@ALL** S0.1 Liệt kê chức năng, chốt phạm vi MVP (mục 3 trong CLAUDE.md)
- [x] **@ALL** S0.2 Chốt tech stack: React+Vite, Express, PostgreSQL+Drizzle, Socket.io, WebRTC
- [x] **@A** S0.3 Thiết kế ERD v2 – 8 bảng (`ChatApp-ERD-v2.drawio`)
- [ ] **@ALL** S0.4 Họp nhóm chốt: Express hay NestJS (khuyến nghị **Express**), phân vai vertical slice, yêu cầu báo cáo của môn
- [ ] **@ALL** S0.5 Chốt cách đếm report (mọi report hay chỉ report đã xác nhận) – khuyến nghị: đếm report `status = resolved`
- [ ] **@A** S0.6 Viết đặc tả Use Case (danh sách actor + use case chính) → `docs/usecase.md` (dùng cho báo cáo)
- [ ] **@A** S0.7 Viết danh sách API (mục 10.1) thành `docs/api.md`, cả nhóm review

### 3.2 UI/UX (Figma)
- [x] **@C** S0.8 Design system: màu (Mono Light/Dark, Indigo), text style, icon, component cơ bản
- [x] **@C** S0.9 Màn hình Auth A1–A4, Chat C1–C2
- [x] **@C** S0.10 Màn hình Chat còn lại: C3 tìm kiếm tin nhắn, C4 thông tin liên hệ, C5 menu tin nhắn, C5b sửa tin nhắn, C6 đính kèm, C7 modal report, C8 thông báo
- [x] **@C** S0.11 Màn hình Nhóm G1–G3, Bạn bè F1–F4, Cuộc gọi P1–P3, Hồ sơ S1
- [x] **@C** S0.12 Màn hình Admin D1–D7
- [x] ✂️ **@C** S0.13 Theme Dark/Indigo (làm bằng CSS variables: `.theme-mono-dark`, `.theme-indigo-light`)
- [ ] **@ALL** S0.13b Cả nhóm review prototype, góp ý trực tiếp trên canvas (comment), chốt UI trước khi code FE

> Quota Figma MCP (gói Starter) đã hết nên từ 25/09 UI được dựng thành **prototype HTML** thay cho Figma, gồm cả 6 màn đã có trên Figma (A1–A4, C1, C2), tổng cộng 31 màn + mục lục + design system:
> - Canvas xem/comment online: https://claude.ai/artifact/M4cCvHz5CXn9S2vsCGk1wM
> - Bản offline: `design/prototype/ChatApp-UI-Prototype.html` (mở bằng trình duyệt; ảnh PNG từng màn ở `design/prototype/screenshots/`)
> - Nguồn: `design/prototype/src/` (sửa rồi chạy `node build.mjs`, xem `design/prototype/README.md`). CSS trong `src/styles.css` dùng lại được khi code `apps/web`.

### 3.3 Repo & hạ tầng
- [x] **@A** S0.14 Khởi tạo git repo
- [ ] **@A** S0.15 Tạo repo GitHub, mời thành viên, bật branch protection cho `main` (require PR + CI pass)
- [ ] **@A** S0.16 Thêm `.gitignore` (node_modules, .env, dist, .DS_Store, `*.bkp`), xóa `.DS_Store` khỏi repo
- [ ] **@A** S0.17 Dựng monorepo npm workspaces: `apps/web` (Vite React), `apps/api` (Express)
- [ ] **@A** S0.18 `docker-compose.yml` chạy PostgreSQL 16 (port 5432, volume) + hướng dẫn cài không Docker
- [ ] **@A** S0.19 ESLint + Prettier dùng chung, script `npm run lint`, `npm run format`
- [ ] **@A** S0.20 `apps/api`: Express skeleton – helmet, cors, json, errorHandler, `GET /api/v1/health`
- [ ] **@C** S0.21 `apps/web`: Vite skeleton – router, layout rỗng, axios client, CSS variables từ design system
- [ ] **@A** S0.22 GitHub Actions `ci.yml`: install → lint → test (api + web) → build web; service container PostgreSQL cho test
- [ ] **@A** S0.23 `README.md`: yêu cầu cài đặt, cách chạy (`docker compose up -d`, `npm run db:migrate`, `npm run dev`)
- [ ] **@A** S0.24 Script `npm run dev` chạy song song web + api (concurrently)

### 3.4 Database
- [ ] ⭐ **@A** S0.25 Viết `schema.js` Drizzle cho 8 bảng theo ERD v2 (xem mục 10.3), enum PostgreSQL, UUID v7 mặc định
- [ ] **@A** S0.26 Index: `messages(conversation_id, id DESC)`, `conversation_members(user_id)`, unique `(conversation_id, user_id)`, unique `friendships(requester_id, addressee_id)`, unique `blocks(blocker_id, blocked_id)`, `users(created_at)`, `calls(started_at)`, `reports(target_user_id)`
- [ ] **@A** S0.27 Migration đầu tiên (`drizzle-kit generate` + `migrate`), script `db:migrate`, `db:studio`
- [ ] **@A** S0.28 Seed tối thiểu: 1 admin, 5 user, vài hội thoại 1-1 → `npm run db:seed`

### 3.5 Quản lý dự án
- [ ] **@ALL** S0.29 Tạo GitHub Projects (Kanban: Backlog / Todo / In progress / Review / Done), đưa backlog từ file này vào issue
- [ ] **@ALL** S0.30 Thống nhất lịch: daily ngắn (chat nhóm), họp sprint planning + review mỗi 2 tuần
- [ ] ⭐ **@ALL** S0.31 Mỗi người clone repo, chạy được `npm run dev` + migrate + seed trên máy mình

---

## 4. Sprint 1 – Auth + Chat 1-1 realtime (Tuần 2–3: 25/09 – 08/10)

**Mục tiêu demo:** 2 user đăng ký, đăng nhập, mở hội thoại 1-1, nhắn tin realtime, thấy online/offline.

### 4.1 Auth & Profile – @A
**Backend**
- [ ] S1.1 `POST /auth/register` – validate email/username/password, hash bcrypt, trả user + token
- [ ] S1.2 `POST /auth/login` – chặn user `banned` (trả mã lỗi `ACCOUNT_BANNED`) và `deleted`
- [ ] S1.3 `POST /auth/refresh`, `POST /auth/logout` (refresh token cookie httpOnly)
- [ ] S1.4 Middleware `requireAuth` (verify JWT, load user, chặn banned/deleted), `requireAdmin`
- [ ] S1.5 `POST /auth/forgot-password` – tạo token ngẫu nhiên, lưu `reset_token_hash` + `reset_token_expires_at` (15–30 phút), gửi mail qua Nodemailer (dev: Ethereal/Mailtrap hoặc log link ra console)
- [ ] S1.6 `POST /auth/reset-password` – kiểm tra hash + hạn, đổi mật khẩu, xóa token
- [ ] S1.7 Rate limit cho login/forgot-password
- [ ] S1.8 `GET /users/me`, `PATCH /users/me` (username, status_text), `PATCH /users/me/password`
- [ ] S1.9 `PATCH /users/me/avatar` (tạm lưu local `uploads/`, Sprint 3 chuyển Cloudinary dùng chung module upload của @B)
- [ ] S1.10 Test API: register/login/refresh/reset, login bị ban

**Frontend**
- [ ] S1.11 Trang Đăng nhập, Đăng ký (react-hook-form + zod, hiển thị lỗi server)
- [ ] S1.12 Trang Quên mật khẩu, Đặt lại mật khẩu (đọc token từ URL)
- [ ] S1.13 Auth store (Zustand) + axios interceptor tự refresh token khi 401
- [ ] S1.14 `ProtectedRoute`, `AdminRoute`, redirect sau đăng nhập (admin → `/admin`, user → `/chat`)
- [ ] S1.15 Trang Hồ sơ & cài đặt (S1): đổi avatar, username, status, mật khẩu

### 4.2 Chat 1-1 realtime – @B
**Backend**
- [ ] S1.16 Socket.io server gắn vào HTTP server, xác thực JWT ở handshake, join room `user:<id>` và các room `conv:<id>` của user
- [ ] S1.17 `POST /conversations/direct { userId }` – tìm hoặc tạo hội thoại direct (không tạo trùng giữa 2 người)
- [ ] S1.18 `GET /conversations` – danh sách hội thoại của tôi, sắp theo `last_message_at`, kèm tin cuối + số chưa đọc (tính từ `last_read_message_id`)
- [ ] S1.19 `GET /conversations/:id/messages?cursor=&limit=` – phân trang ngược theo id (UUID v7)
- [ ] S1.20 `POST /conversations/:id/messages` (type text) – kiểm tra là thành viên, lưu DB, cập nhật `last_message_at`, emit `message:new` tới `conv:<id>`
- [ ] S1.21 Presence: đếm socket theo user (map in-memory), emit `presence:online/offline` cho bạn bè/người cùng hội thoại; `GET /users/online` hoặc gửi kèm danh sách khi connect
- [ ] S1.22 Typing indicator: `typing:start/stop` (không lưu DB)
- [ ] S1.23 Test: tạo direct không trùng, gửi tin khi không phải thành viên → 403

**Frontend**
- [ ] S1.24 Kết nối `socket.io-client` sau khi đăng nhập, tự reconnect, cleanup khi logout
- [ ] S1.25 Màn Chat C1: sidebar danh sách hội thoại + khung chat + ô nhập; C2 trạng thái chưa chọn hội thoại
- [ ] S1.26 Infinite scroll tải tin cũ (react-query `useInfiniteQuery`), giữ vị trí cuộn
- [ ] S1.27 Nhận `message:new` → chèn tin, đẩy hội thoại lên đầu, tăng badge chưa đọc
- [ ] S1.28 Gửi tin optimistic (hiện ngay, trạng thái "đang gửi", lỗi thì cho gửi lại)
- [ ] S1.29 Chấm xanh online/offline trên avatar, "Đang soạn tin…"

### 4.3 UI nền tảng & tìm user – @C
- [ ] S1.30 Component dùng chung: Button, IconButton, Input, Avatar (+ chấm online), Badge, Modal, Dropdown, Toast, Spinner, EmptyState
- [ ] S1.31 `AppLayout` (thanh điều hướng trái: Chat / Bạn bè / Cuộc gọi / Hồ sơ), `AuthLayout`, `AdminLayout`
- [ ] S1.32 Theme bằng CSS variables (light mặc định; dark để Sprint 5)
- [ ] S1.33 BE `GET /users/search?q=` – tìm theo username/email, loại user deleted, loại người đã chặn/bị chặn
- [ ] S1.34 FE màn F3 Tìm người dùng → nút "Nhắn tin" (gọi S1.17)

### 4.4 Chung
- [ ] **@A** S1.35 Mở rộng seed: 20 user, hội thoại, 200 tin nhắn
- [ ] ⭐ **@ALL** S1.36 Sprint review: demo chat realtime 2 trình duyệt; retro; tick checklist

---

## 5. Sprint 2 – Bạn bè, Nhóm, Tính năng tin nhắn, Prototype call (Tuần 4–5: 09/10 – 22/10)

**Mục tiêu demo:** kết bạn/chặn, tạo nhóm và chat nhóm, thấy đã gửi/đã nhận/đã xem, sửa/thu hồi/xóa/tìm tin nhắn; gọi thử WebRTC.

### 5.1 Bạn bè & chặn – @C
**Backend**
- [ ] S2.1 `POST /friends/requests { userId }` – không gửi nếu đã là bạn/đang pending/bị chặn; nếu đối phương đã gửi thì tự accept
- [ ] S2.2 `GET /friends/requests?type=incoming|outgoing`, `POST /friends/requests/:id/accept`, `DELETE /friends/requests/:id` (từ chối/hủy)
- [ ] S2.3 `GET /friends`, `DELETE /friends/:userId` (hủy kết bạn)
- [ ] S2.4 `POST /blocks { userId }`, `DELETE /blocks/:userId`, `GET /blocks` – chặn thì hủy kết bạn
- [ ] S2.5 Áp dụng chặn: không gửi tin trong direct khi một bên chặn, ẩn khỏi tìm kiếm (phối hợp @B ở S1.20)
- [ ] S2.6 Emit socket `friend:request`, `friend:accepted` tới `user:<id>`
- [ ] S2.7 Test: gửi trùng, chặn rồi nhắn tin → 403

**Frontend**
- [ ] S2.8 F1 Tất cả bạn bè (online lên đầu), F2 Lời mời (đến/đi), F4 Danh sách đã chặn
- [ ] S2.9 Nút kết bạn/hủy/chấp nhận ở kết quả tìm kiếm và C4 thông tin liên hệ
- [ ] S2.10 Badge số lời mời kết bạn trên thanh điều hướng

### 5.2 Chat nhóm – @C
**Backend**
- [ ] S2.11 `POST /conversations/group { name, memberIds }` – người tạo là `owner`, tạo tin `system` "X đã tạo nhóm"
- [ ] S2.12 `PATCH /conversations/:id` – đổi tên/avatar nhóm (owner/admin)
- [ ] S2.13 `POST /conversations/:id/members`, `DELETE /conversations/:id/members/:userId` (owner/admin xóa; thành viên tự rời); ghi `left_at` thay vì xóa dòng
- [ ] S2.14 `PATCH /conversations/:id/members/:userId { role }` – owner đổi vai trò (tùy chọn)
- [ ] S2.15 Tin `system` cho thêm/xóa/rời/đổi tên; emit `conversation:updated`, cập nhật room socket (join/leave `conv:<id>`)
- [ ] S2.16 Thành viên đã rời không đọc được tin mới, nhóm đã giải tán (`disbanded_at`) thì chỉ đọc
- [ ] S2.17 Test phân quyền: member không xóa được người khác

**Frontend**
- [ ] S2.18 Modal tạo nhóm (chọn bạn bè), G1 chat nhóm + panel thành viên
- [ ] S2.19 G2 Thêm thành viên, G3 Sửa thông tin nhóm, nút Rời nhóm
- [ ] S2.20 Hiển thị tên người gửi + avatar trong tin nhóm, render tin `system`

### 5.3 Tính năng tin nhắn – @B
- [ ] S2.21 Receipt: client emit `message:delivered { convId, messageId }` khi nhận, `message:read` khi mở hội thoại/cuộn tới cuối → cập nhật `last_delivered_message_id` / `last_read_message_id` (chỉ tăng, so sánh UUID v7) → emit `receipt:update`
- [ ] S2.22 FE hiển thị ✓ Đã gửi / ✓✓ Đã nhận / "Đã xem" (1-1) và avatar nhỏ người đã xem (nhóm)
- [ ] S2.23 FE badge số tin chưa đọc mỗi hội thoại + tổng trên tab
- [ ] ✂️ S2.24 `PATCH /messages/:id` – sửa nội dung (chỉ người gửi, chỉ tin text, trong 15 phút), set `edited_at`, emit `message:updated`; FE hiện "(đã chỉnh sửa)"
- [ ] ✂️ S2.25 `POST /messages/:id/recall` – thu hồi với mọi người, set `recalled_at`, xóa nội dung hiển thị, emit `message:updated`; FE hiện "Tin nhắn đã được thu hồi"
- [ ] ✂️ S2.26 `DELETE /messages/:id` – xóa phía tôi: thêm user id vào `hidden_by`; query danh sách tin loại bỏ tin có tôi trong `hidden_by`
- [ ] ✂️ S2.27 `GET /conversations/:id/messages/search?q=` – ILIKE trên `content` (tin chưa thu hồi); FE C3 panel kết quả, bấm vào nhảy tới tin (tải tin quanh id)
- [ ] S2.28 FE C5 menu tin nhắn (hover: sửa/thu hồi/xóa/report), chế độ sửa inline
- [ ] S2.29 Test: sửa tin người khác → 403, receipt không lùi

### 5.4 Prototype WebRTC – @B (rủi ro lớn nhất)
- [ ] S2.30 Trang thử nghiệm `/lab/call`: getUserMedia, RTCPeerConnection, trao đổi offer/answer/ICE qua Socket.io (`call:offer`, `call:answer`, `call:ice`)
- [ ] S2.31 Thử 2 tab cùng máy → 2 máy cùng LAN (lưu ý: getUserMedia cần `localhost` hoặc HTTPS → dùng `vite --https` với cert tự ký/mkcert khi test khác máy)
- [ ] ⭐ S2.32 **Quyết định go/no-go** (22/10): giữ call video hay chỉ audio hay cắt; ghi kết quả vào mục 11

### 5.5 Chung
- [ ] **@A** S2.33 Hoàn thiện Auth còn tồn (nếu có), hỗ trợ @B/@C viết test, rà CI
- [ ] **@A** S2.34 BE module Report (chuẩn bị Sprint 3): `POST /reports { targetType, targetUserId | targetConversationId, reason }`, không report chính mình, chống spam (1 report mở/người/đối tượng)
- [ ] ⭐ **@ALL** S2.35 Sprint review + retro

---

## 6. Sprint 3 – File, Notification, Report, Admin User (Tuần 6–7: 23/10 – 05/11)

**Mục tiêu demo:** gửi ảnh/âm thanh/tài liệu, toast thông báo tin mới, user report, admin quản lý user (lọc, tìm, ban/unban, xem chi tiết).

### 6.1 Upload file – @B
- [ ] S3.1 Module upload: multer (memory) → Cloudinary (`resource_type: auto`); fallback lưu `uploads/` khi không có key; giới hạn 10–20MB, whitelist mime (ảnh, audio, pdf/doc/docx/xlsx/zip)
- [ ] S3.2 `POST /conversations/:id/messages` hỗ trợ `multipart` → lưu `type` (image/audio/file), `file_url`, `file_name`, `mime_type`, `file_size`; nhiều file = nhiều tin
- [ ] S3.3 FE C6: nút đính kèm, kéo-thả, preview trước khi gửi, thanh tiến trình upload
- [ ] S3.4 FE render: ảnh (thumbnail + lightbox), audio player, file (icon + tên + dung lượng + tải về)
- [ ] ✂️ S3.5 Ghi âm tin nhắn thoại bằng MediaRecorder
- [ ] S3.6 Chuyển avatar user/nhóm sang dùng module upload này (phối hợp @A, @C)

### 6.2 Notification in-app – @B
- [ ] S3.7 Khi có `message:new` ở hội thoại không đang mở → toast (tên + trích nội dung), click mở hội thoại
- [ ] S3.8 Tiêu đề tab trình duyệt `(3) ChatApp` + âm báo (có nút tắt)
- [ ] S3.9 C8 dropdown thông báo: lời mời kết bạn mới, được thêm vào nhóm (dữ liệu suy ra, không có bảng notifications)
- [ ] ✂️ S3.10 Tắt thông báo cho từng hội thoại (lưu localStorage)

### 6.3 Report – @A
- [ ] S3.11 FE C7 modal report user (từ C4) và report nhóm (từ G1), chọn lý do + mô tả
- [ ] S3.12 BE `GET /admin/reports?status=&targetType=`, `PATCH /admin/reports/:id { status: resolved|dismissed }` (set `handled_by = admin`)
- [ ] S3.13 FE Admin D7 danh sách report: lọc theo trạng thái/loại, xử lý (đồng ý → gợi ý ban / bác bỏ)

### 6.4 Admin – User – @A
- [ ] S3.14 BE `GET /admin/users?q=&status=&role=&sort=&page=` – kèm `report_count`
- [ ] S3.15 BE `POST /admin/users/:id/ban`, `/unban` (set `status`, `banned_at`), `POST /admin/users/:id/delete` (soft: `status = deleted`, `deleted_at`)
- [ ] S3.16 Khi ban/delete: emit `force:logout` tới `user:<id>`, ngắt socket; user bị delete hiển thị "Người dùng ChatApp" với người khác, không tìm thấy được
- [ ] S3.17 BE `GET /admin/users/:id` – thông tin, số tin nhắn đã gửi, danh sách nhóm đang tham gia, report đã nhận
- [ ] S3.18 FE D2 bảng user: tìm, lọc, sắp xếp, phân trang, **highlight user có report_count >= 3**, nút ban/unban/delete có modal xác nhận
- [ ] S3.19 FE D3 chi tiết user
- [ ] S3.20 Test: user thường gọi `/admin/*` → 403; user bị ban không đăng nhập được

### 6.5 Admin – Group (bắt đầu) – @C
- [ ] S3.21 BE `GET /admin/groups?q=&sort=` – số thành viên, số tin 7 ngày gần nhất (mức độ hoạt động), số report
- [ ] S3.22 FE D4 danh sách nhóm
- [ ] S3.23 BE `GET /admin/groups/:id` + FE D5 chi tiết nhóm & report của nhóm
- [ ] S3.24 **@C** Hoàn thiện Friend/Group còn tồn từ Sprint 2

### 6.6 Chung
- [ ] ⭐ **@ALL** S3.25 Sprint review + retro; cập nhật thứ tự cắt giảm nếu trễ

---

## 7. Sprint 4 – Call 1-1, Dashboard, Giải tán nhóm (Tuần 8–9: 06/11 – 19/11)

**Mục tiêu demo:** gọi thoại/video 1-1 có mute/tắt camera và lịch sử cuộc gọi; admin xem dashboard, giải tán nhóm.

### 7.1 Call 1-1 – @B
**Backend**
- [ ] S4.1 Socket `call:invite` → tạo bản ghi `calls` (status `ringing`), emit tới `user:<callee>`; không gọi nếu bị chặn hoặc người nhận offline (→ `missed`)
- [ ] S4.2 `call:accept` (→ `answered`, `answered_at`), `call:reject` (→ `rejected`), hết 30s không trả lời (→ `missed`), `call:end` (→ `ended`, `ended_at`)
- [ ] S4.3 Chuyển tiếp `call:offer/answer/ice` giữa 2 bên; xử lý người đang trong cuộc gọi khác (báo bận)
- [ ] S4.4 Ngắt kết nối giữa chừng → tự kết thúc cuộc gọi
- [ ] S4.5 Tạo tin `system` trong hội thoại: "Cuộc gọi video · 3 phút" / "Cuộc gọi nhỡ"
- [ ] S4.6 `GET /calls?cursor=` – lịch sử cuộc gọi của tôi

**Frontend**
- [ ] S4.7 Nút gọi thoại/video trong header chat 1-1
- [ ] S4.8 P2 Popup cuộc gọi đến (nhạc chuông, chấp nhận/từ chối), màn hình đang gọi đi
- [ ] S4.9 P3 Màn hình cuộc gọi: video 2 bên, đồng hồ thời lượng, **mute mic**, **tắt camera**, kết thúc
- [ ] S4.10 P1 Lịch sử cuộc gọi (loại, chiều gọi, trạng thái, thời lượng, gọi lại)
- [ ] S4.11 Xử lý lỗi quyền camera/mic, thiết bị không có camera (tự chuyển audio)

### 7.2 Dashboard – @C
- [ ] S4.12 BE `GET /admin/stats/overview` – tổng user (theo trạng thái), tổng nhóm, tin nhắn hôm nay, cuộc gọi hôm nay, report đang mở
- [ ] S4.13 BE `GET /admin/stats/users?range=day|week|month&from=&to=` – user đăng ký theo thời gian (`date_trunc` trên `users.created_at`)
- [ ] S4.14 BE `GET /admin/stats/messages?...`, `GET /admin/stats/calls?...` (`messages.created_at`, `calls.started_at`)
- [ ] S4.15 FE D1: thẻ KPI + biểu đồ đường/cột (Recharts), chọn khoảng thời gian ngày/tuần/tháng
- [ ] S4.16 Seed dữ liệu lịch sử (3 tháng) để biểu đồ có số liệu khi demo

### 7.3 Giải tán nhóm – @C
- [ ] S4.17 BE `POST /admin/groups/:id/disband { reason }` – set `disbanded_at`, tin `system`, emit `conversation:disbanded`
- [ ] S4.18 FE D6 modal giải tán: **cảnh báo** kèm số report của nhóm, bắt nhập lý do/xác nhận tên nhóm
- [ ] S4.19 FE phía thành viên: nhóm bị giải tán hiển thị banner, khóa ô nhập

### 7.4 Chất lượng – @A
- [ ] S4.20 Rà bảo mật: phân quyền mọi endpoint, validate mọi input, không trả `password_hash`/`reset_token_hash`, CORS đúng origin, helmet
- [ ] S4.21 Test API bổ sung cho các module còn thiếu (mục tiêu: mọi endpoint có ít nhất 1 test)
- [ ] S4.22 Viết khung test E2E Playwright (đăng nhập, gửi tin) chạy trên CI
- [ ] ✂️ S4.23 **Hướng 2 – AI kiểm duyệt** (chỉ làm nếu mọi việc trên đã xong): thêm cột `ai_decision`, gọi model/API phân loại nội dung report, tự ban khi chắc chắn, còn lại chuyển admin; AI không bao giờ delete

### 7.5 Chung
- [ ] ⭐ **@ALL** S4.24 **Feature freeze 19/11** – demo toàn bộ MVP, lập danh sách bug

---

## 8. Sprint 5 – Hoàn thiện & Bàn giao (Tuần 10–11: 20/11 – 03/12)

### 8.1 Kiểm thử
- [ ] **@A** S5.1 Viết test case (bảng: mã TC, mô tả, bước, kết quả mong đợi, kết quả thực tế) cho mọi use case → `docs/test-cases.md`
- [ ] **@ALL** S5.2 E2E Playwright các luồng chính: đăng ký → đăng nhập → kết bạn → chat → gửi file; tạo nhóm; admin ban user
- [ ] **@ALL** S5.3 Test chéo: mỗi người test mảng của người khác, ghi bug vào GitHub Issues (label `bug`, mức độ)
- [ ] **@ALL** S5.4 Sửa hết bug mức cao/trung bình
- [ ] **@B** S5.5 Test realtime nhiều tab/nhiều user, mất mạng rồi kết nối lại, call trên 2 máy thật

### 8.2 Polish
- [ ] **@C** S5.6 Rà UI theo Figma: khoảng cách, trạng thái loading/empty/error, responsive tối thiểu (≥ 1024px; mobile là điểm cộng)
- [ ] ✂️ **@C** S5.7 Dark mode (đổi bộ CSS variables)
- [ ] **@B** S5.8 Tối ưu: tránh re-render danh sách tin dài, nén ảnh trước khi upload
- [ ] **@A** S5.9 Seed data demo đẹp: user có avatar, hội thoại có ảnh/file/call, nhóm, report, số liệu dashboard

### 8.3 Tài liệu & báo cáo
- [ ] **@A** S5.10 Hoàn thiện `README.md` (cài đặt, chạy, tài khoản demo, cấu trúc thư mục)
- [ ] **@A** S5.11 Tài liệu API (`docs/api.md` hoặc Swagger/OpenAPI)
- [ ] **@ALL** S5.12 Báo cáo đồ án (theo mẫu của môn), gợi ý chương:
  - [ ] Giới thiệu, mục tiêu, phạm vi
  - [ ] Phân tích yêu cầu: actor, use case diagram, đặc tả use case chính
  - [ ] Thiết kế: kiến trúc hệ thống, ERD + giải thích chuẩn hóa/gộp bảng, sequence diagram (gửi tin, receipt, call signaling), thiết kế API, thiết kế giao diện
  - [ ] Hiện thực: công nghệ, cấu trúc mã nguồn, ảnh chụp màn hình
  - [ ] Kiểm thử: chiến lược, test case, kết quả CI
  - [ ] Quản lý dự án: kế hoạch sprint, phân công, burndown/tiến độ, rủi ro
  - [ ] Kết luận, hạn chế, hướng phát triển (group call, push notification, AI kiểm duyệt…)
- [ ] **@C** S5.13 Slide thuyết trình (15–20 slide)
- [ ] **@B** S5.14 Quay video demo dự phòng (5–7 phút) phòng khi demo trực tiếp lỗi
- [ ] **@ALL** S5.15 Tập demo theo kịch bản (ai nói phần nào, tài khoản nào, thứ tự thao tác)

### 8.4 Bàn giao
- [ ] **@A** S5.16 Tag release `v1.0.0` trên GitHub, CI xanh
- [ ] **@ALL** S5.17 Chuẩn bị máy demo: DB đã seed, 2 trình duyệt/2 máy đăng nhập sẵn, mạng LAN ổn định cho call
- [ ] ⭐ **@ALL** S5.18 Nộp bài (03/12)

---

## 9. Quản lý rủi ro & cắt giảm

| Rủi ro | Mức | Biện pháp |
|---|---|---|
| WebRTC call không chạy ổn (NAT, HTTPS, thiết bị) | Cao | Prototype sớm S2.30; demo trong cùng LAN; chỉ 1-1; cho phép chỉ audio; có video demo dự phòng |
| Trễ tiến độ do học công nghệ mới | Trung bình | Vertical slice, việc nhỏ ≤ 2 ngày, review sớm, pair khi kẹt > 1 ngày |
| Xung đột schema giữa các mảng | Trung bình | @A là chủ schema; mọi thay đổi schema qua PR có migration, báo cả nhóm |
| Scope creep | Trung bình | Chỉ làm những gì trong file này; ý tưởng mới ghi vào mục "Ngoài MVP" |
| Thành viên bận/thi giữa kỳ | Trung bình | Buffer ở Sprint 5; cập nhật tiến độ hằng ngày để phát hiện sớm |
| Hết quota dịch vụ ngoài (Cloudinary, Figma, mail) | Thấp | Fallback lưu file local; log link reset ra console; vẽ UI bằng code |

**Thứ tự cắt giảm khi trễ** (cắt từ trên xuống):
1. Hướng 2 – AI kiểm duyệt (S4.23)
2. Dark mode, tắt thông báo từng hội thoại, ghi âm (S5.7, S3.10, S3.5)
3. Tìm kiếm tin nhắn nâng cao (S2.27 – giữ bản ILIKE đơn giản hoặc bỏ)
4. Thu hồi/chỉnh sửa/xóa phía tôi (S2.24–S2.26)
5. Report nhóm (giữ report user)
6. Call video (giữ call audio; cuối cùng mới cắt toàn bộ call)

**Ngoài MVP (không làm):** group call, push notification thật (service worker), reaction, ghim tin, reply, OAuth Google, cài đặt quyền riêng tư, audit log/phân quyền admin nâng cao.

---

## 10. Phụ lục kỹ thuật

### 10.1 Danh sách REST API (`/api/v1`)

| Module | Endpoint | Người |
|---|---|---|
| Auth | `POST /auth/register`, `/auth/login`, `/auth/refresh`, `/auth/logout`, `/auth/forgot-password`, `/auth/reset-password` | @A |
| Users | `GET/PATCH /users/me`, `PATCH /users/me/password`, `PATCH /users/me/avatar`, `GET /users/search`, `GET /users/:id` | @A/@C |
| Friends | `GET /friends`, `DELETE /friends/:userId`, `GET/POST /friends/requests`, `POST /friends/requests/:id/accept`, `DELETE /friends/requests/:id` | @C |
| Blocks | `GET/POST /blocks`, `DELETE /blocks/:userId` | @C |
| Conversations | `GET /conversations`, `GET /conversations/:id`, `POST /conversations/direct`, `POST /conversations/group`, `PATCH /conversations/:id`, `POST/DELETE /conversations/:id/members[/:userId]` | @B/@C |
| Messages | `GET/POST /conversations/:id/messages`, `GET /conversations/:id/messages/search`, `PATCH /messages/:id`, `POST /messages/:id/recall`, `DELETE /messages/:id` | @B |
| Calls | `GET /calls` | @B |
| Reports | `POST /reports` | @A |
| Admin | `GET /admin/users`, `GET /admin/users/:id`, `POST /admin/users/:id/{ban,unban,delete}`, `GET /admin/groups`, `GET /admin/groups/:id`, `POST /admin/groups/:id/disband`, `GET/PATCH /admin/reports`, `GET /admin/stats/{overview,users,messages,calls}` | @A/@C |

### 10.2 Sự kiện Socket.io

| Sự kiện | Chiều | Mô tả |
|---|---|---|
| `presence:online` / `presence:offline` | S→C | Bạn bè online/offline |
| `typing:start` / `typing:stop` | C↔S | Đang soạn tin |
| `message:new` / `message:updated` | S→C | Tin mới / sửa / thu hồi |
| `message:delivered` / `message:read` | C→S | Báo đã nhận / đã xem |
| `receipt:update` | S→C | Cập nhật mốc delivered/read của thành viên |
| `conversation:updated` / `conversation:disbanded` | S→C | Đổi thông tin/thành viên nhóm, giải tán |
| `friend:request` / `friend:accepted` | S→C | Lời mời kết bạn |
| `call:invite/accept/reject/end/busy` | C↔S | Điều khiển cuộc gọi |
| `call:offer/answer/ice` | C↔S | WebRTC signaling |
| `force:logout` | S→C | Bị ban/delete |

### 10.3 Schema (ERD v2 – 8 bảng, PK UUID v7)

| Bảng | Cột chính |
|---|---|
| users | email (UK), username (UK), password_hash, avatar_url, status_text, role(user/admin), status(active/banned/deleted), banned_at, deleted_at, reset_token_hash, reset_token_expires_at, created_at |
| friendships | requester_id, addressee_id, status(pending/accepted), created_at |
| blocks | blocker_id, blocked_id, created_at |
| conversations | type(direct/group), name, avatar_url, created_by, last_message_at, disbanded_at, created_at |
| conversation_members | conversation_id, user_id, role(owner/admin/member), last_delivered_message_id, last_read_message_id, joined_at, left_at |
| messages | conversation_id, sender_id, type(text/image/audio/file/system), content, file_url, file_name, mime_type, file_size, hidden_by uuid[], edited_at, recalled_at, created_at |
| calls | conversation_id, caller_id, type(audio/video), status(ringing/answered/missed/rejected/ended), started_at, answered_at, ended_at |
| reports | reporter_id, target_type(user/group), target_user_id, target_conversation_id, reason, status(open/resolved/dismissed), handled_by(admin/ai), ai_label, ai_confidence, created_at |

**Luật nghiệp vụ cần nhớ khi code**
- User chỉ soft delete. Ban: không đăng nhập được, dữ liệu vẫn hiển thị, có thể unban. Delete: tin nhắn vẫn lưu, với người khác user đó như không tồn tại.
- report_count >= 3 → chỉ **highlight** trên UI admin; admin tự delete, hệ thống không tự xóa.
- `seen`/`delivered` suy ra từ mốc trong `conversation_members`; số chưa đọc = số tin có id > `last_read_message_id` và không do mình gửi.
- Không có bảng notifications: thông báo = sự kiện socket + dữ liệu suy ra.

### 10.4 Biến môi trường (`.env.example`)

```
# api
PORT=4000
DATABASE_URL=postgres://chatapp:chatapp@localhost:5432/chatapp
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
CLIENT_URL=http://localhost:5173
CLOUDINARY_URL=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
# web
VITE_API_URL=http://localhost:4000/api/v1
VITE_SOCKET_URL=http://localhost:4000
```

---

## 11. Nhật ký sprint (Retro & quyết định)

| Ngày | Sprint | Đã xong / Quyết định / Vấn đề | Hành động tiếp theo |
|---|---|---|---|
| 21/09 | 0 | Chốt ERD v2 (8 bảng), dựng design system + A1–A4, C1–C2 trên Figma | Họp chốt Express + phân vai; dựng repo |
| | | | |
