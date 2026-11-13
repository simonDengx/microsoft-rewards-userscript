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
