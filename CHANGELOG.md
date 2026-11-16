# 变更记录

## 3.7.31

**两个真实根因：授权 URL 缺 `prompt=select_account` + 凭证类型判别反了。**

### 根因 1：`?removed=true` 不是 redirect_uri 被拉黑，是缺 `prompt=select_account`

3.7.28 曾判定 redirect_uri 被微软拉黑，**该结论错误**。实测对照：

| 授权 URL 变体 | 结果 |
|---|---|
| 基线（无 prompt） | `oauth20_desktop.srf?removed=true` |
| `&prompt=consent` | `?removed=true` |
| `&prompt=none` | `?removed=true` |
| `&prompt=select_account` | **落到「选择帐户」页，点帐户即得 `?code=M.xxx`** |
| `&prompt=login` | 落到「发送邮件验证码」页（需二次验证，绕远路） |
| `redirect_uri=oauth20_nativeclient.srf` | `invalid_request`（该 URI 确实未注册） |

所以是微软的**会话复用判定**：浏览器里已有会话时，不带 `prompt` 的授权请求会被
安全策略踢到 `?removed=true`。加 `prompt=select_account` 强制走一次帐户选择，正常发码。

### 根因 2：`MsaArtifacts` 不能用来区分授权码和 refresh token

3.7.29 的判断是反的。实测两种凭证的完整结构：

| 类型 | 形态 | 长度 |
|---|---|---|
| authorization code | `M.C529_BAY.2.U.MsaArtifacts.<payload>` | ~672 |
| refresh token | `M.C529_SN1.0.U.MsaArtifacts.<payload>` | 373 |

**两者都含 `MsaArtifacts`**。真正的判别位是版本段：`.2.U.` = 授权码，`.0.U.` = refresh token。

3.7.29 把所有含 `MsaArtifacts` 的值判成 refresh token，导致：

1. 有效授权码被搬进 `Config.token`，按 `grant_type=REFRESH_TOKEN` 用 → 必然 `invalid_grant`
2. 迁移分支 `GM_setValue("Config.code", "")` 把用户在设置里刚粘贴的值清空 → **「保存没成功」**
3. 判别条件对真实授权码恒真，每次粘贴都被搬走清空，永远配不好

### 修复

- 授权 URL（`renewToken` 与「🔑 打开授权页面」菜单）统一加 `&prompt=select_account`
- 新增 `credKind()`，按 `.2.U.` / `.0.U.` 判别，取代 `MsaArtifacts` 特征
- `renewToken` 迁移分支不再清空 `Config.code`（那是用户手填的字段）
- 新增脏数据自愈：`Config.token` 里若发现 `.2.U.` 授权码，反向搬回 `Config.code`
- 设置项 `Config.code` 的说明改为两种凭证的真实格式
- 自动授权提示改为「点一下你的帐户」，与实际流程一致

### 端到端实测

```
prompt=select_account → 选择帐户页 → 点帐户 → ?code=M.C529_BAY.2.U.MsaArtifacts...
code → POST oauth20_token.srf (authorization_code) → 200，access_token 1292 字节
refresh_token → POST oauth20_token.srf (REFRESH_TOKEN) → 200，access_token 1312 字节，refresh 正常轮换
access_token → GET prod.rewardsplatform.microsoft.com/dapi/me → 200，balance = 15269
```

3.7.31 装入后连续两轮运行日志中**不再出现 `Token 被拒绝`**。

## 3.7.29

**修复：粘贴凭证时未区分类型，refresh token 被当成授权码用。**

用户从「脚本设置 → Config → 授权码链接」粘贴 `M.C529_SN1.2.U.MsaArtifacts...`，
脚本把它写进 `Config.code` 并按 authorization code 使用，微软返回 `invalid_grant`，
日志显示「授权码无效」——用户完全不知道是类型填错了。

两种凭证特征：

| 类型 | 特征 | 用途 |
|---|---|---|
| authorization code | `M.C529_SN1.2.U...` | 一次性，`grant_type=authorization_code` |
| refresh token | 含 `MsaArtifacts` | 长期，`grant_type=REFRESH_TOKEN` |

修复内容：

- `applyPastedCode` 按特征分流：含 `MsaArtifacts` → 写入 `Config.token`；否则按授权码处理
- 两个入口的提示文案区分「已识别为 refresh token / 授权码 / 未识别格式」
- `renewToken` 增加运行时纠错：即使通过设置页绕过 `applyPastedCode` 直接填了 refresh token，
  也会自动迁移到 `Config.token` 并继续刷新，不会反复 `invalid_grant`

实测验证：日志输出「检测到授权码字段里填的是 refresh token，已自动迁移到正确字段」，迁移生效。
但用户手上这个 refresh token 本身已失效（迁移后仍 `invalid_grant`），需要重新获取。

## 3.7.28

**授权通道实测结论：`redirect_uri=https://login.live.com/oauth20_desktop.srf` 已被微软拉黑。**

对照实验（同一浏览器、已登录状态）：

| 请求 | 结果 |
|---|---|
| `oauth20_authorize.srf?...&redirect_uri=https://login.live.com/oauth20_desktop.srf` | 跳到 `?removed=true` 安全提示页 |
| `oauth20_authorize.srf?...`（不带 redirect_uri） | 正常返回 `invalid_request`（接口存活） |
| `oauth20_desktop.srf` 裸访问 | 200，正常页面 |
| Node 直连 authorize URL | 200，正常 HTML |

结论：接口和 client_id 都正常，是 **redirect_uri 被判定为不安全**。
`?removed=true` 页面文案为「你已进入一个通常不会显示的页面。Microsoft 绝不会要求你复制或分享此 URL」——
这是微软对「把 code 显示在 URL 里」这类 legacy 流程的安全提示，属于站点侧策略变更。

影响：

- 授权码换 token 的整条链路（签入 15 分 + 阅读 30 分）不可用
- 历史上 7 天内没有一次「Token 获取成功」，说明该通道早已失效，不是本次改动引入
- 不依赖 token 的通道（dapi 收割、PC 搜索）仍正常，今日站方统计 +141 分

本次仅做可观测性改进，不再尝试修复不可修的站点限制：

- `getToken` 明确区分「微软拒绝」与「网络异常」，输出 `invalid_grant` 等真实原因
- `renewToken` 去掉递归重试，避免反复弹授权页
- 「检查授权状态」菜单新增 `Token 拒绝` 行

## 3.7.27

授权失败时的错误处理修正（此前会把真实原因掩盖成「请检查网络连接」）：

- **`getToken` 区分错误类型**：微软在 code 无效时返回 400 + `{"error":"invalid_grant",...}`，
  原实现只判 400 就 `return false`，日志只写「Token 请求失败」，用户完全看不到「code 无效」。
  现在会提取 `error` / `error_description` 写进日志，并存入 `Config.lastTokenError`
- **消除无限重试**：`renewToken` 在 code 被拒后会再调 `fetchCodeLogic` 开授权页，失败后再递归调自己。
  已改为只尝试一次，失败就明确报错退出
- **不再用笼统文案覆盖**：`tasksStart` 里「Token 请求失败，请检查网络连接」会在 `renewToken` 已写明
  具体原因时跳过，避免误导
- 「检查授权状态」菜单新增 `Token 拒绝` 行，显示最近一次被拒原因与时间

实测发现（非脚本问题）：用 sctl 打开 `oauth20_authorize.srf` 会跳到 `?removed=true` 安全提示页，
内容是「你已进入一个通常不会显示的页面。Microsoft 绝不会要求你复制或分享此 URL」。
因此必须在浏览器里正常点击授权链接完成流程，不要用工具直接打开该 URL。

## 3.7.25

实测确认：**自动捕获授权码在 login.live.com 上从未生效**。

- 用 sctl 打开 `oauth20_authorize.srf` 后检查页面上下文，`GM_setValue` / `GM_cookie` / `GM_log` 全部 `undefined`，
  说明内容脚本未被注入（该站点 CSP 极严，与 `rewards.bing.com` 同类问题）。历史上每次成功授权都走「手动粘贴」路径。
- 关闭标签页机制本身可用（实测 `window.close()` 触发 `target_closed`），只是捕获分支不执行，所以永远走不到关闭逻辑
- `GM_openInTab` 的 handle 之前被丢弃，后台无法关闭；现已保留 handle 并在捕获/超时后调用 `close()`
- 新增 `CAT_registerMenuInput` 原生输入框入口「📋 粘贴授权码（输入框）」，不依赖页面 `prompt`（CSP 可能拦），
  后台脚本里也能弹，是当前环境最可靠的粘贴方式；补充 `@grant CAT_registerMenuInput`
- 「打开授权页面」文案改为明确提示：登录后复制地址栏 URL，用粘贴菜单完成授权

## 3.7.22

修复授权流程的自毁行为（这是「日常任务不完成」的直接原因）：

- **菜单回调语法错误**：「检查授权状态」数组字面量少一个逗号，被解析成 tagged template，
  运行必然 TypeError 且被空 catch 吞掉，点击完全无反应。已修复并补上日志 / 通知 / 存储三通道输出

- **fetchCodeLogic 提前清空授权码**：原来一进入就清空 `Config.code`，
  自动授权超时后旧码永久丢失（实测：手动粘贴的新码，62 秒后就被脚本删掉）。
  改为保留旧值，只在真正捕获到新码时覆盖

- **token 失效时连带清空 code**：refresh token 过期不等于 code 过期，清掉会失去重试机会。
  现在只标记 token 失效，code 保留

两个主动清空点已全部移除。

## 3.7.20

修复三个导致「日常任务没完成」的问题：

- **活动通道假完成**：APP 通道只判 `code===0 && response.activity` 就把任务标记为完成，
  但实测 `Gamification_DailySet_*_Child1` 会返回 `code=0` + activity 对象且 `activity.p=0`、余额不增。
  现在要求 `p>0` 才算完成，否则保留待下轮重试

- **重试预算被耗尽**：`skipped>0` 时累加 `FuckD.promos.times`（原版单轮重试上限 2），
  未记账项会很快撞上限被永久放弃。改用独立计数 `Config.promosRetry`（按日重置，上限 8 轮）

- **Evergreen 前缀漏判**：分类用 `^ENstar_` 严格匹配，实测还有 `ZHstar_Rewards_DailyGlobalOffer_Evergreen_Monday`，
  落到 `other` 被默认跳过，转而由旧活动通道处理。改为按 `Rewards_DailyGlobalOffer_Evergreen_` 通配

- 台账/积分统计改用服务端返回的 `activity.p`（网页通道成功时用卡片声明值）

## 3.7.19

- 授权捕获环节补齐三处细节（参考社区「前台授权助手」的做法）：

  - 捕获 `?error=` 分支：记录 `Config.lastAuthError`（access_denied / invalid_request 等）并弹通知，不再静默失败

  - 捕获后 `history.replaceState` 清理地址栏，code 不留在地址栏与浏览历史

  - 脚本自己打开的授权页在捕获/报错后 400ms 自动关闭；手动打开的不动

- 新增 `Config.codeManual`、`Config.authFlowAt`；「检查授权状态」菜单显示授权来源与最近一次错误

## 3.7.18

- 台账改为全通道记账：活动任务（网页/APP 通道）也写入 `Config.ledger`，此前只记收割导致汇总偏低

- 汇总优先使用站方当日统计（`Config.todayTotal` 持久化，取自 `pointsCounters.totalPoints`），含签入/阅读/搜索/活动全部来源

- 未适配检测排除已有专门模块处理的任务（阅读 `readarticle`、搜索 `WW_NewLevel3_search`），减少每日误报

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
