# 变更记录

## 3.7.59 – 3.7.63

**3.7.58 上线后自测发现的两个 bug。**

### 1. 补做状态两处读取结论不一致（已修）

配置组从 `Harvest` 改名为 `Makeup` 后，状态键 `Config.harvest` → `Config.makeup`。
`getMakeupState` 会回退读旧键，但**没有把读到的值写进新键**，于是：

- `taskMakeupInner` 读旧键 → 看到「已清空，共 3 个」
- 启动摘要直接读新键 → 读到 `{}` → 显示「0 个 · 仍有待做」

同一轮日志里两句话互相矛盾。修法：

- `getMakeupState` 回退读旧键且日期匹配时，顺手写进新键（一次性迁移）
- 所有读取点统一走 `getMakeupState`，不再有一处直接读新键

实测修复后：`今日已完成 3 个 · 失败 0 个 · 本地记为已清空`。

### 2. `keep` 历史值不会随默认值改变（已修）

把 `keep` 默认改成 `false` 只对新安装有效 —— 已安装的用户存储里仍是 `true`，
于是「任务全完成」后照样进完整流程。

改为**一次性迁移**：首次运行新版本时把历史 `keep=true` 写成 `false`（带 `Config.keepMigrated` 标记位，只做一次），
并输出一行说明，用户之后仍可在设置里重新打开。

实测效果：

```
09:59:03 🟡已关闭「持续检测」：任务完成后不再每 20 分钟重复请求
09:59:04 🔍完成度核对：PC 搜索站方进度 60/60
09:59:05 💤今日所选任务已全部完成，继续保持休眠...
```

不再进入完整流程（原先每轮会输出「站方实况」「补做后」等 7 次请求，现在降到 2 次轻量核对）。

## 3.7.58

**按风控面全面收口：去掉会形成持续请求循环的四条路径，术语统一为「补做任务」。**

### 1. 阅读不再「站方已满还强行重报」

```js
if (cur >= max) {
    if (read.date != today) {
        cur = 0; max = 30;      // ← 站方已满，本地清零重来
    }
}
```

跨天瞬间（本地已换日、站方计数还没重置）会走这条：每轮重报 `ENUS_readarticle3_30points` 10 次，
一天最多 720 次无用请求。改为**只补记本地完成状态，不重报**。

### 2. 活动任务增加单项失败记忆

模块级 `Config.promosRetry`（8 轮）只能兜整体，单个活动仍会被打 8 轮 × 3 次。
新增 `Config.promosFailed`（当日、按 id 计数）：同一活动连续两轮双通道都失败，当天不再尝试。

### 3. 完成状态改为跨实例持久化

`makeupStillTodo` 原来只在内存，新实例读到 `undefined` 就被当成「未确认」，于是每轮都强制跑完整流程。
现在落盘到 `Config.makeupStillTodo`（带日期），完成时可真正进入休眠。

### 4. `keep` 默认改为关闭

原来默认 `true`：任务全做完仍每 20 分钟跑一遍，实测每轮约 7 次请求（72 轮 ≈ 500 次/天）。
现在默认 `false`，全部完成后不再检测。

### 5. cookie 不再每次搜索都删

原代码每次搜索都删 `_EDGE_S` / `_Rwho` / `_RwBf`，20 次搜索 = 60 次删除。
改为**每轮搜索只在开头清一次**。

### 6. 默认间隔全面拉长

| 配置 | 旧默认 | 新默认 |
|---|---|---|
| 搜索间隔 `span` | 30（15~45 秒） | 60（45~75 秒） |
| 起始随机延迟 `jitter` | 45 秒 | 300 秒（5 分钟） |
| 补做任务间隔 `gapMin/gapMax` | 4~11 秒 | 15~40 秒 |

### 7. 术语统一

配置组 `Harvest` → `Makeup`，所有「收割」字样改为「补做任务」。
开关类（quiz / sapphire / evergreen / dailyset / checkin）会读取旧组名，用户之前的选择不丢；
数值类统一用新默认（更保守的间隔）。

## 3.7.57

**回滚 3.7.41 的搜索上限改动 —— 那是本次封号反馈的直接原因。**

3.7.41 把「每轮 4~7 次就收工」改成「未满就放宽到 30 次」，方向错了。三层叠加会形成循环：

1. 站方 counters 延迟入账，同一轮内再搜也看不到新进度
2. 判断「满没满」用的是 `FuckD.search.pc.progress`，那是脚本自己 `+= 3` 累加出来的，不是站方真值
3. 判「完成」的分支只 `end++`，**不写 `Config.tasks.date`** → 下一轮又从站方旧值重来

结果：站方卡在 54/60 时，脚本每 20 分钟刷 30 次，一天上百次搜索。

修复：

- `index >= limit` 恢复为**无条件收工**，把「是否已满」完全交给下一轮读站方
- 停滞熔断：连续 3 轮站方进度一字不动 → 写 `Config.searchGiveUpDate`，当天停止搜索
- 每日总次数上限：`Config.searchCountToday` 跨轮累计，满 60 次当天停

## 3.7.56

**任务状态日志不再说谎 + 连续打卡保护可观测 + 图标去掉 base64。**

### 1. 「未完成明细」把明天的任务算成今天没做（已修）

站方会提前一天下发每日任务。旧日志把两类混在一起：

```
🧾未完成明细：… DailySet_Child1(0/10)、DailySet_Child2(0/10)、DailySet_Child3(0/10)
```

拿到完整 offerid 才看清真相：

| offerid | 进度 | complete |
|---|---|---|
| `Gamification_DailySet_ZHCN_20261120_Child1/2/3` | 10/10 | True ← **今天的，都做完了** |
| `Gamification_DailySet_ZHCN_20261121_Child1/2/3` | 0/10 | False ← **明天的，还没到日期** |

日志把 20261121 的三项显示成 `DailySet_Child1/2/3(0/10)`，看不出日期，于是看起来像今天没做。
这就是「日常任务还有没完成」这个错觉的直接来源。

现在按 offerid 内嵌日期分成三类输出：

```
🧾站方实况：活动 34 项，有 offerid 23 项 · 待处理 4 项 · 模块自管 1 项 · 未来待生效 3 项
🧾待处理明细：Fosbury_info(0/1)、Sapphire_DailyCheckIn_Promotion(1/11760)、BingFlyout_Layout_DailyCheckIn(0/1000)、RAF_referees_details_v1_promotion(undefined/undefined)
🧾模块自管 1 项（WW_NewLevel3_search_PC）：由搜索/阅读模块自然累积，无需单独上报
🧾未来待生效 3 项（不影响今日完成判定，明日自动转为当日任务）
```

### 2. `WW_NewLevel3_search_PC(0/60)` 不是漏分（已澄清）

它的 attributes 是：

```json
{"AnswerScenario.Tag":"PCSearch","Classification.Tag":"PCSearch",
 "description":"Earn up to 60 points per day, 3 points per search",
 "destination":"https://www.bing.com/"}
```

即 **PC 搜索计数器本身**（3 分/次、上限 60），对应 `pointsCounters.pc`（已 60/60）。
它不需要单独上报，搜索时自然累积。之前它被列进「未完成」，看起来像漏了 60 分，是误读。

### 3. 连续打卡保护：可观测 + 当前状态（新增每日记录）

首次抓到站方 dashboard 的真实字段：

```
"streakCounter": 28                        ← 已连续打卡 28 天
"isProtectionEnabled": false
"streakProtection": {"isProtectionOn": false, "remainingDays": 0}   ← 剩余保护 0 天
"streakBonus": 1000
```

兑换页（274KB）里搜不到任何「保护/streak」可兑换项，只有一条无关的「积分/连续打卡问题」反馈链接。
所以**开不了的直接原因是 `remainingDays = 0`，没有保护额度**；页面只下发这两个字段，
没有门槛说明，单看一天无法区分「没资格」和「额度已用完」。

新增每天记录一次（`Config.streakHistory`，保留 30 天），攒几天就能对照出额度发放规律：

```
🔥连续打卡 28 天 · 保护=未开启 · 剩余保护 0 天
```

### 4. 图标不再内嵌 base64

`@icon` 原来内嵌 96×96 PNG，占 **11,256 字符**。改为：

```
// @icon  https://simondengx.github.io/microsoft-rewards-userscript/icon.png
```

脚本体积 240,883 → 229,671 字节（省 11.2KB），原图另存仓库 `icon.png`（8.4KB）。

### 5. 顺手清掉的噪音

- 外层「未能确认站方日常任务状态」每轮都打，看着像故障；实际是任务启动前的正常状态，已移除。
  该分支行为保留：拿不到上轮站方结论时不放行休眠，让 tasksStart 跑一遍查清楚。
- 「今日任务收割完成」若存在上报失败项，现在会附上失败数量。

## 3.7.41 – 3.7.47

**搜索任务长期做不满的真凶：每轮只搜 4~7 次就无条件收工。**

```js
FuckD.search.limit = FuckF.getScopeRandomNum(4, 7);
...
if (FuckD.search.index >= FuckD.search.limit) {
    FuckD.search.end++;      // 无条件收工，不看进度满没满
    return true;
}
```

PC 搜索 60 分通常要 20 次以上搜索才攒得满，但每轮搜到 4~7 次就 `end++` 结束，
于是永远差一截，下一轮又从「本地记为已完成」开始。改为：

- `index >= limit` 时先检查 `progress >= max`，未满就放宽上限继续搜
- 单轮硬顶 30 次（约 15 分钟，在 service worker 生命周期内）
- 到达硬顶仍未满时如实报「搜索已达单轮上限 30 次，仍未满分」，不谎称完成

**同一批修复：**

| 版本 | 内容 |
|---|---|
| 3.7.41 | `isAllDone` 的站方核对改成 `async IIFE` 真正 await（3.7.33 写成 `.then()`，异步结果永远来不及影响判断，那行「完成度核对」是装饰日志）；去掉 `pcMax ?? 60` / `if (pcMax === 0) pcMax = 60` 所有兜底，读不到就按未完成处理 |
| 3.7.44 | 上报返回 `p > 0` 后回读站方 `progress`，进度没推进则不计入完成（防假完成） |
| 3.7.47 | 收割后重新回读站方剩余项写入 `FuckD.harvestStillTodo`；外层据此否决「全部完成」，不再仅凭本地 `st.notified` |

## 3.7.37

**修复：设置面板保存的值永远不被采用 —— UserConfig 只写值，不更新时间戳。**

3.7.35 用 `codeTime > tokenTime` 判断「用户最近粘过」，实测发现这个条件恒为假。

3.7.36 加了存储键诊断（`GM_listValues`，每版首次运行打一次），实测输出：

```
[storage] Config.code = 732B 凭证=M.C529_BL2.2.U.M…
[storage] Config.codeTime = 13B 1794795008921   ← 10:10:08，用户 13:40 保存后没变
[storage] Config.tokenTime = 13B 1794798154849  ← 11:02:34
```

结论：**用户保存是成功的**（`Config.code` 确实有 732B 新值），但 ScriptCat 的
UserConfig 持久化只写值、**不更新 `Config.codeTime`**。所以基于时间戳的判断永远失效。

修复：改用**值指纹**。记住上次实际用过的凭证（`Config.usedCode`），
只要 `Config.code` 里的值和它不同，就认定是新粘贴，优先采用：

- `.2.U.` → 清掉旧 token，走换码流程
- `.0.U.` → 直接覆盖 `Config.token`
- 使用后（无论成功或被微软拒绝）都写入 `usedCode`，避免拿同一条一次性码反复重试

### 实测

```
🟡 检测到新粘贴的凭证（code，M.C529_BL2.2…），优先采用
🔴 Token 被拒绝：invalid_grant · code parameter is not valid
```

机制生效了。该码被拒是因为 13:40 粘贴、13:44 才用，已超过一次性码的有效期。

随后通过浏览器重新授权，拿到长期 refresh token：

```
prompt=select_account → 点帐户 → ?code=M.C529_BAY.2.U.MsaArtifacts…（672B）
code → authorization_code → 200，access 1292B
refresh（.0.U.，373B）→ REFRESH_TOKEN → 200，access 1312B（可重复使用）
access → dapi/me → 200，balance = 15269
```

注入后运行日志：`code=无 · token=(373B，13:48:38写入)`，无 Token 被拒绝。

## 3.7.36

新增存储键诊断与 `GM_listValues` 授权声明（每版首次运行输出一次，
用 `Config.storageDumpedVersion` 去重，不刷日志）。用于定位「保存了但脚本读不到」这类问题。

## 3.7.35

用户主动粘贴的凭证优先于旧 token。此前只在「没有 refresh token」时才检查 `Config.code`，
用户粘了新值时脚本继续用旧 `Config.token`，日志一字不提，表现为「粘了没反应」。
（本版的判据 `codeTime > tokenTime` 有误，3.7.37 已改为值指纹。）

## 3.7.34

`CAT_registerMenuInput` 从 `GM_registerMenuCommand` 的 `if` 里拆出来。
两者被套在同一条件里，后台脚本若缺前者，输入框菜单会一起消失。
新增启动自检：`[menu] GM_registerMenuCommand=有 · CAT_registerMenuInput=有 · 输入框已注册=true`。

## 3.7.33

宣告「今日全部完成」前用站方仪表盘核对真实进度。
`isAllDone` 只看本地 `Config.tasks` 的日期，本地被写成今天但站方没记账时会误报完成并整天休眠——
这正是「默默执行但日常任务没完成」的成因。实测输出：`完成度核对：PC 搜索站方进度 60/60`。

## 3.7.32

启动时输出授权状态摘要（凭证类型 / 长度 / 写入时间 / 上次拒绝原因），指纹化输出只露前 12 字符。
没有这行时「粘了没反应」只能靠猜。

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
