# ChatApp – Project Memory

File này là bộ nhớ dự án cho Claude. Đọc đầu mỗi phiên; cập nhật khi user chốt/đổi quyết định.

## 1. Bối cảnh
- User: sinh viên CNTT, chuyên Kỹ thuật phần mềm; đồ án môn CNPM. Giao tiếp bằng tiếng Việt.
- Vai trò của Claude: cố vấn/chuyên gia phần mềm, hướng dẫn và hỗ trợ xây dựng dự án cùng user.
- Sản phẩm: **ChatApp chạy trên web**, chức năng tương tự Messenger/Instagram.
- Thời gian: **10-11 tuần**, nhóm **3 người**. Bắt đầu lập kế hoạch ngày 2026-09-18.
- Chưa có repo/code (thư mục hiện tại chưa phải git repo).

## 2. Tech stack (đã chốt)
- Ngôn ngữ: JavaScript
- Frontend: ReactJS + Vite
- Backend: REST API viết bằng JavaScript (Node.js). Framework cụ thể (gợi ý Express, đơn giản hơn NestJS) chưa xác nhận.
- Database: **PostgreSQL**; ORM/migration: **Drizzle** (drizzle-orm + drizzle-kit migrations)
- Deploy/CI: không thuê hosting; app chạy nền (local) để demo, test tự động bằng **GitHub Actions**
- Realtime: Socket.io (dự kiến); Call: WebRTC (signaling qua Socket.io, cân nhắc PeerJS)
- Lưu file: Cloudinary/S3 (dự kiến)

## 3. Phạm vi MVP (user đã chốt)
### Admin
- Danh sách user: filter, search, ban/unban
- Chi tiết user: số lượng tin nhắn, nhóm đang tham gia, report đã nhận
- Danh sách nhóm: số thành viên, mức độ hoạt động, giải tán nhóm (có warning report), xem report nhóm
- Dashboard & thống kê: user đăng ký theo thời gian; số message, call theo ngày/tuần/tháng

### User
- Tài khoản: đăng ký/đăng nhập, quên/reset mật khẩu, đổi thông tin (avatar, username, status)
- Tin nhắn: trạng thái tin nhắn (sent/delivered/seen), thu hồi/xóa/chỉnh sửa/tìm kiếm, gửi file (ảnh/âm thanh/doc)
- Kết nối: tìm kiếm user; bạn bè (add friend, chấp nhận, block, report)
- Nhóm chat: thêm/xóa thành viên, đổi thông tin nhóm
- Call/video call: lịch sử cuộc gọi, mute mic/tắt camera
- Notification: thông báo khi có tin nhắn mới

### Ngoài MVP (để sau)
Group call, push notification thật (service worker), reaction, ghim tin nhắn, reply, OAuth Google, cài đặt quyền riêng tư, audit log/phân quyền admin nâng cao.

## 4. Quyết định & khuyến nghị đã đưa ra
- MVP đánh giá là khả thi nhưng sát nút; tránh scope creep.
- Rủi ro lớn nhất: **WebRTC call** → chỉ làm gọi 1-1, prototype sớm từ tuần 4-5.
- Notification chỉ làm **in-app** (badge/toast) trong MVP.
- Thiết kế schema log sự kiện (message, call) ngay từ Sprint 0 để dashboard aggregate không phải làm lại.
- Thứ tự cắt giảm nếu trễ: tìm kiếm tin nhắn nâng cao → thu hồi/chỉnh sửa → report nhóm → (cuối cùng) call video.
- Chia việc theo **vertical slice** (mỗi người full-stack một mảng), không tách cứng FE/BE. User chưa xác nhận lại (đang có comment hỏi trong doc).

### Quyết định thiết kế DB (đã chốt)
- Khóa chính: **UUID v7 cho tất cả bảng** (duy nhất + sắp xếp được theo thời gian, dùng làm cursor phân trang).
- **ERD chốt (v2, 8 bảng)**: users, friendships, blocks, conversations (direct/group dùng chung), conversation_members, messages, calls, reports. File: `ChatApp-ERD-v2.drawio` (cùng thư mục; `ChatApp-ERD.drawio` là bản 13 bảng cũ, đã bỏ). Dashboard aggregate trực tiếp từ created_at/started_at, chưa cần bảng activity_logs.
- Các bảng đã gộp/bỏ so với bản 13 bảng:
  - `password_reset_tokens` → cột `reset_token_hash`, `reset_token_expires_at` trong `users` (1 token hiệu lực/user).
  - `attachments` → cột `file_url`, `file_name`, `mime_type`, `file_size` (nullable) trong `messages` (1 tin = 1 file; nhiều file = nhiều tin).
  - `message_hidden` → cột `hidden_by uuid[]` trong `messages` (xóa phía mình; ứng viên cắt nếu trễ).
  - `message_receipts` → bỏ; `seen` suy ra từ `conversation_members.last_read_message_id`, `delivered` từ `last_delivered_message_id` (so sánh UUID v7).
  - `notifications` → bỏ; số tin chưa đọc suy ra từ `last_read_message_id`, lời mời kết bạn từ `friendships.status = pending`, toast gửi qua Socket.io.
- Giữ `conversation_members` (bảng nối N–N, chứa vai trò + mốc đã nhận/đã đọc riêng từng người) và `blocks` (A chặn B và B chặn A là hai sự kiện độc lập); không nhúng vào jsonb.
- **User chỉ soft delete**, không bao giờ xóa cứng. Luật xử phạt theo số report nhận:
  - 1-3 report: **ban** (inactive, dữ liệu vẫn hiển thị, admin có thể unban).
  - Vượt 3 report: **delete** (soft) – tin nhắn vẫn lưu trong DB, nhưng với user khác thì user đó xem như không tồn tại.
- users có trạng thái `active | banned | deleted` + `banned_at`, `deleted_at`.

### Xử lý report: 2 hướng (user chốt giữ cả hai; chưa chọn hướng chính thức)
- **Hướng 1 – Thủ công (baseline, làm trước):** user gửi report → admin xem trong danh sách report → admin **ban thủ công**. Vượt ngưỡng report → hệ thống hiện **bộ đếm** cho admin → admin **delete thủ công**.
- **Hướng 2 – AI kiểm duyệt (mở rộng, làm sau nếu còn thời gian):** một model AI phân loại nội dung report.
  - Nội dung **nằm trong phạm vi model được huấn luyện/nhận diện** → AI có quyền **tự ban** user.
  - Nội dung **ngoài phạm vi** (model không chắc) → chuyển report về admin, admin **ban thủ công**.
  - Delete user **luôn do admin làm thủ công** ở cả hai hướng; AI không có quyền delete. Bộ đếm số report (từ ngưỡng 3 trở lên) hiển thị cho admin để quyết định.
- Hướng 2 là superset của Hướng 1: dùng chung bảng `reports`, chỉ thêm cột như `handled_by` (admin | ai), `ai_label`, `ai_confidence`, `ai_decision`. Vì vậy thiết kế schema cho Hướng 1 trước, thêm cột AI sau không phải làm lại.
- Hướng 2 nằm ngoài MVP cốt lõi; ứng viên cắt đầu tiên nếu trễ tiến độ (chưa chốt: dùng model có sẵn/API hay tự huấn luyện).
- Ngưỡng đã chốt: khi bộ đếm report của một user **>= 3**, UI admin chỉ cần **highlight** user đó; admin tự delete thủ công (hệ thống không tự xóa).
- Vẫn chưa chốt: cách đếm report (mọi report hay chỉ report admin/AI đã xác nhận).

## 5. Phân công (đề xuất; user: không xét thế mạnh, nhóm tự thống nhất phân chia nội bộ)
| Vai | Mảng phụ trách |
|---|---|
| Dev A | Auth, User, Admin-User, DB schema tổng, deploy/CI |
| Dev B | Realtime messaging, message features, upload file, notification, WebRTC call |
| Dev C | Friend/Social, Group chat, Admin-Group, Dashboard, UI nền tảng |

## 6. Kế hoạch Sprint
| Sprint | Tuần | Nội dung chính |
|---|---|---|
| 0 | 1 | Setup repo, chốt tech stack, ERD, wireframe (Figma), design system, backlog |
| 1 | 2-3 | Auth + profile + chat text 1-1 realtime + online/offline |
| 2 | 4-5 | Friend system, group chat, trạng thái/thu hồi/sửa/tìm kiếm tin nhắn, prototype WebRTC |
| 3 | 6-7 | Upload file, in-app notification, Admin user (list/ban/detail), report nhóm |
| 4 | 8-9 | Call 1-1 + lịch sử, Admin dashboard, giải tán nhóm |
| 5 | 10-11 | Tích hợp, test E2E, polish, seed data, báo cáo, slide, buffer |

Doc kế hoạch chi tiết (Claude Docs): https://claude.ai/code/artifact/a8abc8c2-8a07-43b2-a9d3-b8f763317ccd

## 7. Câu hỏi còn mở (cần user chốt)
- Backend framework: Express hay NestJS? (đang mặc định Express)
- Cách chia vai: vertical slice hay tách FE/BE? (nhóm tự chốt qua họp nhóm)
- Có yêu cầu báo cáo/tài liệu cụ thể của môn không?

Đã chốt: DB = PostgreSQL + Drizzle migration; deploy = chạy nền local + GitHub Actions test; thế mạnh thành viên không cần xét.

## 8. Quy ước làm việc với user
- Trả lời tiếng Việt, ngắn gọn, đứng góc nhìn chuyên gia; đưa khuyến nghị rõ ràng kèm trade-off.
- User thích đi từng bước: liệt kê → chốt phạm vi → kế hoạch → thiết kế → code.
- Bước tiếp theo dự kiến: viết schema Drizzle từ ERD đã chốt (PostgreSQL), kiến trúc hệ thống, dựng cấu trúc repo + workflow GitHub Actions.
