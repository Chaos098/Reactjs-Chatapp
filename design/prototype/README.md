# ChatApp · UI Prototype

Bộ màn hình UI của ChatApp (31 màn + mục lục + design system), dựng bằng HTML/CSS thay cho Figma
(quota Figma MCP gói Starter đã hết). Gồm cả 6 màn đã vẽ trên Figma: A1–A4, C1, C2.

## Xem

| Cách | Ở đâu |
|---|---|
| Online (canvas, bấm Play để đi theo luồng, comment góp ý) | https://claude.ai/artifact/M4cCvHz5CXn9S2vsCGk1wM |
| Offline | Mở `ChatApp-UI-Prototype.html` bằng trình duyệt. Phím ← → để chuyển màn, đổi theme ở thanh bên trái |
| Ảnh PNG (dùng cho báo cáo) | `screenshots/<theme>/<mã-màn>.png` |

Theme: Mono Light (mặc định), Mono Dark, Indigo Light.

## Danh sách màn

| Nhóm | Màn |
|---|---|
| Xác thực | A1 Đăng nhập · A2 Đăng ký · A3 Quên mật khẩu · A4 Đặt lại mật khẩu |
| Chat 1-1 | C1 Chat chính · C2 Chưa chọn đoạn chat · C3 Tìm tin nhắn · C4 Thông tin liên hệ · C5 Menu tin nhắn · C5b Sửa tin nhắn · C6 Đính kèm file · C7 Báo cáo · C8 Thông báo |
| Nhóm | G1 Chat nhóm + thành viên · G2 Thêm thành viên · G3 Đổi thông tin nhóm |
| Bạn bè | F1 Tất cả bạn bè · F2 Lời mời · F3 Tìm người dùng · F4 Đã chặn |
| Cuộc gọi | P1 Lịch sử · P2 Cuộc gọi đến · P3 Video call (tắt mic/camera) |
| Hồ sơ | S1 Hồ sơ & cài đặt |
| Admin | D1 Dashboard · D2 Người dùng · D3 Chi tiết người dùng · D4 Nhóm · D5 Chi tiết nhóm · D6 Giải tán nhóm · D7 Báo cáo |

## Sửa và build lại

```
src/styles.css          token màu (3 theme) + toàn bộ component CSS
src/ui.mjs              icon (Lucide), dữ liệu mẫu, helper: rail, danh sách chat, bubble, modal…
src/screens-user.mjs    màn A, C, G, F, P, S
src/screens-admin.mjs   màn D
build.mjs               ghép màn → dist/project/*.dc.html (canvas) + ChatApp-UI-Prototype.html (offline)
shots.sh                chụp PNG từng màn bằng Chrome headless
```

```bash
node build.mjs          # build bản offline + dist/
./shots.sh              # chụp lại ảnh (tham số: mono-light | mono-dark | indigo-light)
```

Muốn cập nhật canvas online thì nhờ Claude upload lại `dist/chatapp.css` rồi publish `dist/project/`
(build với tham số là URL CSS đã upload: `node build.mjs /_blob/<id>`).

Dữ liệu trên màn hình (tên, số liệu) là dữ liệu mẫu để minh họa.
