# 变更记录

## 3.7.7

- 仓库迁移：发布源改为 GitHub，取消 `@updateURL`/`@downloadURL`，避免与脚本猫源码同步互相覆盖
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
