# CLAUDE.md — `_deploy-gtm`（douzistudio 心田靜態站）協作規約

> 多視窗 / 多個 Claude 同時動這個 repo，容易互相洗掉對方還沒推上去的編輯。動手前**必讀**。

## 三個真理來源，不要交叉
- **文章**（發／改／刪）→ 真理來源是後台 **DB（CMS）**，只在 `douzistudio.com/admin` 改。
- **靜態頁面**（index / about / grow / css…）→ 真理來源是**這個 repo**。
- **伺服器 / 服務** → SSH。

## 規則
1. **`posts.js` 絕不手改**：它由伺服器從 DB **自動烤 + 自動 push**（發文後觸發）。手改會被下次發文覆蓋。要改文章請去後台。
2. **改靜態頁面時**：
   - 動手前先 `git pull --rebase origin main`
   - 改完**立刻** `git add → commit → push`（別讓編輯擱著等一下再推——擱著最容易被別的視窗洗掉）
   - 再部署 webroot（`scp` → 伺服器 `sudo cp` 到 `/var/www/landing/`，**永遠排除** `admin.html`、`uploads`、`.git`）
3. **同一時間只讓一個 session 動這個 repo 的檔**；其它視窗只做後台 / 伺服器 / 唯讀查詢。
4. 動手前先 `git log --oneline -3` + `git status` 瞄一眼，確認沒有別人正在改。

## 救援
- 編輯被還原 → 重做，且把「改＋commit＋push」放同一步、立刻推。
- `push` 被拒（non-fast-forward）→ `git pull --rebase` 後再 push。

完整版說明：`OneDrive\桌面\Projects\00-個人品牌網頁\多視窗協作規約.md`
