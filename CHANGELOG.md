# 变更记录

## 3.7.17

- 运行锁改为心跳续期（每 60 秒刷新，3 分钟无心跳视为上次被强杀），避免装新版本/重启浏览器后锁残留
- 新增菜单「🔓 解除运行锁」应急

## 3.7.16

- 新增余额二次校验：每批任务前后读取余额并比对差额，识别「接口返回成功但未真正到账」
- 新增每日台账 `Config.ledger`：按任务名累计当日到账，日志输出 `📒 今日台账`
- 新增未适配任务检测：每天首次运行报出「有 offerid 但被跳过」的项，作为新活动适配信号
- 新增运行锁，避免 cron 与手动 run 并发上报
- 实测结论：旧版 REST `/api/reportactivity` 已下线（GET 404 页 / POST 401），页面上下文因 CSP 被拦，桌面端无额外增量
- README 新增「任务通道现状（多端）」章节

## 3.7.15

- 授权流程加固：
  - 修正 cookie 读写为 ScriptCat 新版函数式 API（`GM_cookie("get"|"set", details)`），保留旧写法与 `document.cookie` 兜底
  - 新增菜单「🔑 打开授权页面」「🔍 检查授权状态」；「📋 粘贴授权码」兼容完整 URL 与裸 `M.xxx`，并处理无 prompt 的环境
  - 自动打开授权页加 6 小时冷却，避免 token 长期失效时每轮 cron 弹窗
  - 记录 `Config.codeTime`，捕获成功后立即写日志，便于排查
- README 新增「授权码（登录）详解」章节：三种获取方式、自动捕获原理、存储字段、排错表

## 3.7.14

- HPQuiz 入账时同步推送通知（此前只有日志，问答是独立通道容易被忽略）

## 3.7.13

- 新增每日得分汇总日志：`📊 今日累计 +N 分（任务收割 +X，HPQuiz +Y）`
- 记录实测结论：打卡 child 项在 SAAndroid / web+MSRewards / Bing / edge 四种 appid 组合下均不下发，
  只有计数器与父容器，说明打卡必须在 Bing App 内真实交互，dapi 无法完成

## 3.7.12

- 修复收割与 HPQuiz 未等待完成就进入休眠：改为 `await`，日志顺序确定
- 任务过滤器同时匹配 `name` 与 `offerid`，正确排除 `DailyCheckIn_Parent_*`（父容器 0/1000）与 `Gamification_Sapphire_DailyCheckIn`（累计签到计数器 1/11760）
- 按 offerid 内嵌日期跳过未来日期的每日任务（`Gamification_DailySet_*_YYYYMMDD_*`），每天少发 3 次必然 `p=0` 的请求
- 实测结论写入注释：`Bing_Sapphire_TrialUser` 上报后只置 `complete=True`、`p=0` 且余额不变，属于空耗资格，保持永久排除

## 3.7.11

- HPQuiz 增加自动停跑：连续 3 天检测不到入账则写 `Config.quizDisabled`，停止每日请求（独立键，不与 UserConfig 抢 `Harvest.quiz`）
- 日志区分「未入账 x/3」与「已自动停跑」

## 3.7.10

- 启用 GitHub Pages，`@updateURL` / `@downloadURL` 改为 Pages 地址（GitHub 自托管，无第三方缓存）
- 此前镜像方案实测均有缓存延迟，ghfast/jsDelivr 抓到的仍是旧版本

## 3.7.9

- `@updateURL` / `@downloadURL` 指向国内可用的加速地址：`raw.githubusercontent.com` 在国内直连超时，改用 `ghfast.top` 透传
- README 补充镜像说明与源码同步配置方式

## 3.7.8

- 新增 `@updateURL` / `@downloadURL` 指向本仓库 raw 地址
- 本地分支统一为 `main`

## 3.7.7

- 仓库迁移：发布源改为 GitHub
- 头部补充 `@homepageURL` / `@supportURL` 指向本仓库
- `@author` 更新为维护者，原作者信息保留在 `@original-*`

## 3.7.6

- 新增 HPQuiz（Bing 首页问答）每日余额自检：投票接口只返回 `ErrorCode`，改由 dapi 余额前后差值判断是否入账并写入日志
- 修复 `MUID` 获取：`GM_cookie` 在 service worker 下无 `.get` 方法且回调超时，改为从 `bing.com` 响应头 `MUIDB` 兜底并缓存到 `Config.MUID`

## 3.7.5

- 修复 HPQuiz 完全不执行的严重问题，两个原因：
  - 调用点在 `tasksStart` 之前，`FuckD.bing.host`/token 尚未初始化，函数首行即返回
  - 首页图片接口的 `quiz` 字段滞后一天，与题目接口返回的当日 quizId 匹配失败后静默返回
- HPQuiz 调用点移入 `tasksStart`，复用随机停留，避免每次 cron 准点开跑
- 题目匹配失败时兜底取第一个（每天只有一个 HomepageQuiz）

## 3.7.4

- **修复致命 bug**：原版 `tasksStart` 内硬校验 `GM_info.script.author == "geoisam@qq.com"`，
  维护版改了 `@author` 后所有任务被直接跳过（表现为「停留 N 秒 → exec script complete」，无任何任务输出）
- 新增 HPQuiz 实现（`funapi` 取题 + `quiz/record` 投票 + `rewardsapp/reportActivity` 上报）
- `Harvest` 配置组新增 `quiz` 开关

## 3.7.0

- 首个对外发布版本
- 网页 Server Action 通道失效后改走 dapi `type 101 + offerid`
- 新增通用任务收割：Sapphire / Evergreen / 每日任务
- 收割改为分次执行 + 随机顺序 + 随机停顿 + 失败退避
- 新增 `Harvest` 配置组，可逐类开关
- Edge 浏览连签任务站点下线，改为每日一次提示
- 修复 `@grant GM_registerMenuCommand` 缺失
