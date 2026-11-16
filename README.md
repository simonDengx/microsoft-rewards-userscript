# Microsoft Rewards 自动任务（维护版）

> 基于 [geoisam/FuckScripts](https://github.com/geoisam/FuckScripts) 3.6.52 的维护版本。
> 原版自 2026-11 起大面积失效，本仓库针对实际失效原因做了修复并持续跟进。

[![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-blue.svg)](LICENSE)
[![ScriptCat](https://img.shields.io/badge/ScriptCat-9065-orange)](https://scriptcat.org/zh-CN/script-show-page/9065)

## 安装

**方式一：脚本猫平台**

打开 [脚本猫脚本页](https://scriptcat.org/zh-CN/script-show-page/9065) 点击安装。

**方式二：直接安装（GitHub Pages，推荐）**

```
https://simondengx.github.io/microsoft-rewards-userscript/microsoft-rewards.user.js
```

国内直连 `raw.githubusercontent.com` 会超时，脚本头部的 `@updateURL` / `@downloadURL` 已指向上面的 Pages 地址，安装后会自动检查更新。

备用加速地址（第三方镜像，内容可能有缓存延迟）：

```
https://ghfast.top/https://raw.githubusercontent.com/simonDengx/microsoft-rewards-userscript/main/microsoft-rewards.user.js
```

**方式三：源码同步（开发者推荐）**

在脚本猫脚本编辑页的「源代码同步」填入上面的加速地址，同步方式选「自动同步」。
之后本仓库有更新时，扩展会自动拉取，不需要手动重装。

> 同步地址需指向 `main` 分支，且 `@version` 递增才会触发更新。
> 脚本头部已内置 `@updateURL` / `@downloadURL`，正常安装后脚本猫会自行检查更新。

## 仓库结构

```
microsoft-rewards.user.js   # 脚本本体（唯一发布源）
CHANGELOG.md                # 版本变更记录
LICENSE                     # GPL-3.0
```

---

## 这是什么

Microsoft Rewards（微软积分商城）自动任务脚本的**维护版**，基于 [geoisam](https://github.com/geoisam/FuckScripts) 的 3.6.52 版本修改。

原版在 2026-11 之后出现大面积失效，本版针对实际失效原因做了修复。

## 修复内容

**1. 网页交卷通道已失效**

原版通过 `rewards.bing.com` 的 Next.js Server Action（POST + `next-action` 头）提交任务，实测该通道已被网关整条拦截：无论 action id 是真实的、过期的还是伪造的，都返回同一个 Bing 500 错误页（`It's not you, it's us`，`x-cache: CONFIG_NOCACHE`），与动作标识、`x-deployment-id` 都无关。同一时刻 GET 请求正常返回 200。

站点同时撤下了 `reportClaimAllPoints` 动作，页面 `pointClaim` 恒为 `null`，即「积分领取」功能本身已下线。

**2. 改用 dapi 通道**

本版把可做的任务改走 `prod.rewardsplatform.microsoft.com/dapi/me/activities`（`type 101 + offerid`），该通道完全可用：服务端即时记账、幂等、无 origin 校验。

实测可正常记账的任务类型：

- `Sapphire_AppNewBonus_*`（App 新功能奖励，合计约 100 分）
- `ENstar_Rewards_DailyGlobalOffer_Evergreen_*`（每日问答，6 个，各 5 分）
- `Gamification_DailySet_*`（每日热搜任务，当日 3×10 分）
- `Gamification_Sapphire_DailyCheckIn`（每日打卡）

**3. Edge 浏览连签任务已下线**

原版每天报「edge 通道未发现该活动」。经核实，`edge_browsing_streak_flight` promotion 已从账号的 promotion 列表中消失，替代品 `Rewards_EdgeUsage_progress_info` 的 `max`/`progress` 均为 `-1` 且无 `offerid`，无法做时长上报。这是站点侧下线，不是脚本缺陷。本版对该任务只做一次说明并跳过，不再重复刷日志。

## 抗风控设计

任务收割不是一次性跑完，按原版的真人模拟思路做了以下处理：

- **分次执行**：每次定时触发只做 1～2 个任务，剩余留给后续触发，分散到全天
- **随机顺序**：候选任务先洗牌，每次点选序列不同
- **随机起始延迟**：每轮开始前随机等待，错开整点特征
- **任务间停顿**：每个任务之间随机停留数秒
- **批次抖动**：每批随机选择数量
- **失败退避**：未记账或失败的项当天不再重试

所有参数都可在脚本设置中调整。

## 任务勾选

设置面板新增「Harvest」分组，可逐类开关：

| 配置项 | 默认 | 说明 |
|---|---|---|
| sapphire | 开 | App 新功能奖励 |
| evergreen | 开 | 每日问答 6 个 |
| dailyset | 开 | 每日热搜任务 |
| checkin | 开 | 每日打卡 |
| maxPerRun | 2 | 每轮最多做几个 |
| gapMin / gapMax | 4 / 11 | 任务之间的停顿（秒） |
| jitter | 45 | 每轮起始随机延迟（秒） |

原有配置项（持续检测、锁定国区、搜索间隔、搜索词接口、签入/阅读/搜索开关、各类消息推送）全部保留。

## 使用说明

1. 安装后打开脚本设置，在 `Config` 分组填入授权码链接
2. 授权码获取方式与原版一致（访问脚本提供的授权页面，从跳转链接中复制 `code=` 参数）
3. 定时脚本默认每 20 分钟运行一次，无需保持页面打开


## 任务通道现状（多端）

下面这张表是 2026-11 对当前账号逐项实测的结果，用于判断「多端任务」还有没有可做的增量。

| 通道 | 状态 | 实测依据 |
|---|---|---|
| **PC 搜索（60 分/日）** | ✅ 可用 | `pointsCounters.pc` 60/60，脚本走搜索 + `ncheader` + `rewardsapp/reportActivity` |
| **手机端搜索** | ❌ 未下发 | `pointsCounters` 里没有 `mobile` 字段，账号无移动搜索额度 |
| **dapi 活动上报（type 101）** | ✅ 可用 | 主要得分通道，Sapphire / Evergreen / 每日任务都走它 |
| **dapi 签入（type 103）** | ✅ 可用 | 每日 15 分 |
| **阅读任务（`ENUS_readarticle3_30points`）** | ✅ 可用 | 30/30 已完成，走 dapi `options=613` |
| **网页交卷（Next.js Server Action）** | ❌ 网关拦截 | 任意 action id（含伪造）都返回 Bing 500 页 |
| **旧版 REST `/api/reportactivity`** | ❌ 已下线 | GET 返回 rewards-404 页；POST 四种 header 组合全部 401 |
| **Edge 浏览连签** | ❌ 站点下线 | promotion 已从列表消失，替代项无 offerid |
| **每日打卡（counter）** | ❌ 无法上报 | 四种 appid 组合下都只有计数器，没有可上报的 child |
| **Bing App 专属（TrialUser / AppInstall）** | ⚠️ 不可上报 | TrialUser 上报后只置 `complete=True`、`p=0`，且余额不变 |
| **HPQuiz 首页问答** | ⚠️ 流程可用、入账未验证 | 投票返回 `ErrorCode=200`，余额未变化；连续 3 天未入账会自动停跑 |

### 为什么桌面端没有额外增量

- **PC 搜索、PC 活动卡片**已经在跑，这就是桌面端的全部可得分项
- **`/api/reportactivity`**（8249 用的 PC 签入端点）已被微软下线，代码路径实测不可用
- **页面上下文**（带 cookie 同源请求）在本环境不可行：`rewards.bing.com` 的 CSP 会拦掉 ScriptCat 的内容脚本注入，同一份探针在 `example.com` 能执行、在 `rewards.bing.com` 不执行

### 新任务如何自动跟上

脚本每天首次运行会做一次「未适配任务检测」：

- 遍历全部 promotion，挑出「有 offerid + 未完成 + 上限有效」但被跳过规则或分类开关排除的项
- 在日志里输出 `🧩 检测到 N 个未适配任务：名称(offerid)…`
- 每天只报一次，不会刷屏

这样微软上线新活动时能第一时间看到，再有针对性地适配；同时通用收割本身会对任何「有 offerid + 正分」的项直接尝试 type 101，不需要逐项写死。

### 积分可靠性

上报接口返回的分值不等于真的到账，脚本做了两层校验：

1. **余额二次校验**：每批任务前后各读一次余额，比对差额；差额小于声明值时记录「记账滞后」提示，而不是当成成功
2. **每日台账**：`Config.ledger` 按任务名累计当日到账，日志输出 `📒 今日台账（N 项，共 +X）`，可跨轮次对账

### 执行流程保护

- **运行锁**：cron 与手动 run 不会并发（并发会导致同一任务重复上报或判重）
- 锁采用**心跳续期**（每 60 秒刷新），超过 3 分钟无心跳视为上次被强杀，不会卡住
- 菜单提供 `🔓 解除运行锁` 应急

## 授权码（登录）详解

脚本需要一次 OAuth 授权才能调用 Rewards 接口。这个授权只能用微软账号在浏览器里完成，脚本能做的是**在你登录后自动抓取 code**，不需要手动复制粘贴。

### 三种获取方式

**方式 A：半自动（推荐）**

脚本菜单 → `🔑 打开授权页面`。

授权链接带 `prompt=select_account`，会落到微软的**「选择帐户」页** —— 点一下你自己的帐户头像，页面立刻跳到
`login.live.com/oauth20_desktop.srf?code=M.C529_xxx.2.U.xxx`。

> **为什么必须带 `prompt=select_account`**：浏览器里已有微软会话时，不带 `prompt` 的授权请求会被
> 会话复用判定踢到 `oauth20_desktop.srf?removed=true`（"你已进入一个通常不会显示的页面"），永远拿不到 code。
> 这是 3.7.28 误判成「redirect_uri 被拉黑」的真正原因，3.7.31 已修正。

拿到 code 后，用菜单 `📋 粘贴授权码（输入框）` 粘进去（整条 URL 或只粘 `M.` 开头的值都行）。

> 自动捕获在本机不生效（见下方 CSP 说明），所以「点帐户 → 复制地址栏 → 粘贴」是当前主路径。

**方式 B：定时运行自动触发**

当 `Config.token` 为空或已失效时，脚本运行时会自己打开授权页面并轮询等待（最长 120 秒 × 2 轮）。同样依赖浏览器已登录。

为避免 token 长期失效时每 20 分钟弹一次页面，加了冷却：**6 小时内只自动打开一次**。冷却期间的日志会提示改用菜单手动打开。

**方式 C：手动粘贴（兜底）**

菜单 → `📋 粘贴授权码`，粘贴以下任一种都可以：

- 完整 URL：`https://login.live.com/oauth20_desktop.srf?code=M.C5xx...`
- 只有 code 本身：`M.C5xx...`

也可以在脚本设置 → `Config` → `授权码链接` 里填写。

### 两种凭证的区别

| 类型 | 形态 | 长度 | 有效期 | 用途 |
|---|---|---|---|---|
| 授权码 | `M.C529_xxx.2.U.MsaArtifacts.…` | ~672 | 几分钟，一次性 | `grant_type=authorization_code` 换 token |
| refresh token | `M.C529_xxx.0.U.MsaArtifacts.…` | 373 | 长期 | `grant_type=REFRESH_TOKEN` 直接刷新 |

**判别位是版本段 `.2.U.` / `.0.U.`，不是 `MsaArtifacts`** —— 两者都含它。
脚本（`credKind()`）按版本段分流，粘错类型也会自动纠正。

### 自动捕获的原理

脚本头部有一条内容脚本分支，只在 `login.live.com` 上激活：

```
检测 URL 中的 ?code= → 长度 > 10 → 写入 Config.code
                                   → 清空 Config.token（触发下次换新）
                                   → 记录 Config.codeTime / codeManual（便于排查）
                                   → 尝试写 cookie microsoft_rewards_auth_code（仅作后备）
                                   → history.replaceState 清理地址栏（code 不留在历史里）
                                   → 若本页是脚本打开的，调用 handle.close() 关闭标签

检测 URL 中的 ?error= → 记录 Config.lastAuthError
                     → 弹通知说明失败原因（access_denied / invalid_request 等）
                     → 同样清理地址栏；脚本打开的页面自动关闭
```



> **⚠️ 实测限制（2026-11）：自动捕获在本机不生效。**
> 用 sctl 打开 `oauth20_authorize.srf` 后检查页面上下文，`GM_setValue` / `GM_cookie` / `GM_log` 全部为 `undefined`，
> 说明内容脚本未被注入 —— `login.live.com` 的 CSP 极严，与 `rewards.bing.com` 同类问题。
> 历史上每次成功授权都走「手动粘贴」路径。因此**请以「📋 粘贴授权码（输入框）」为主要方式**：
> 登录完成后复制地址栏的 `oauth20_desktop.srf?code=...` 整条 URL，粘贴进该菜单即可。

后台脚本侧用 `GM_addValueChangeListener` 实时监听 `Config.code` 变化，所以**捕获是即时的**，不用等下一次轮询。同一个对象也做了「旧码过滤」，避免读到失效的历史 code。

### 存储字段

| 键 | 含义 |
|---|---|
| `Config.code` | 授权码链接（`oauth20_desktop.srf?code=...`） |
| `Config.token` | refresh token；为空表示下次运行要重新换 |
| `Config.codeTime` | 最近一次捕获/粘贴时间 |
| `Config.codeManual` | 授权码来自手动打开页面（`true`）还是脚本打开（`false`） |
| `Config.lastAuthError` | 最近一次 OAuth 失败信息（`error` / `description` / `ts`） |
| `Config.authFlowAt` | 最近一次脚本主动打开授权页的时间（判断标签页归属） |
| `Config.lastAuthPrompt` | 最近一次自动打开授权页的时间（冷却用，6 小时） |

### 自检与排错

菜单 → `🔍 检查授权状态`，会显示授权码、获取时间、refresh token 是否存在、脚本版本。

常见情况：

| 现象 | 原因 | 处理 |
|---|---|---|
| 日志「检测到授权码为空，正在打开授权页面」 | 全新安装或从未授权 | 在打开的页面登录，登录后自动捕获 |
| 日志「授权码失效」反复出现 | code 是一次性的，且有效期很短；换 token 失败会重试 | 用菜单重新打开授权页，登录后让脚本自动抓 |
| 日志「N 分钟内已尝试过自动授权」 | 冷却中 | 点菜单 `🔑 打开授权页面`，或等冷却结束 |
| 打开页面一直停在登录框 | 浏览器没登录微软账号 | 手动登录一次，登录成功即自动捕获 |
| 换 token 报 400/401 | code 过期或已被用过 | 重新走一次授权 |

> **注意**：`code` 一次性有效，有效期约几分钟。抓到之后脚本会立即换成长期 `refresh_token`，之后都靠 refresh token 维持，正常使用不会再要求授权。

## 已知限制

- **Edge 浏览连签**：站点已下线该 promotion，无法完成，脚本每日提示一次后跳过
- **积分领取**：`reportClaimAllPoints` 动作已被站点撤销，「领取」功能本身不存在了
- **HPQuiz 首页问答**：流程已实现（投票返回 `ErrorCode=200`），但 service worker 环境下拿不到完整的 `MUID`/`_SS` 会话，实测未观察到余额增加。默认开启并带每日余额自检日志，若持续为 0 建议在设置里关闭
- **移动端搜索**：账号的 `mobileSearch` 计数器已为 0，脚本自动跳过

## 贡献

欢迎提交 Issue 反馈失效场景。提交前请附上脚本猫日志中对应的输出片段（含时间戳），便于定位是站点改版还是脚本问题。

## 许可与致谢

- 本项目遵循 **GPL-3.0**，与原版一致
- 原作者：[geoisam](https://github.com/geoisam/FuckScripts)（`geoisam@qq.com`）
- 原版信息已在脚本头 `@original-author` / `@original-script` / `@original-license` 中保留
- HPQuiz 的实现思路参考了脚本猫上「微软积分商城签到（改进加强版）」3.6.73 的公开实现，代码为本项目独立重写

> 本脚本仅供学习交流使用。使用自动化脚本可能违反 Microsoft Rewards 服务条款，由此产生的账号风险由使用者自行承担。
