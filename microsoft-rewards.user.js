// ==UserScript==
// @name	Microsoft Rewards 自动任务（维护版）
// @name:zh-CN	微软积分商城自动任务（维护版）
// @namespace	https://scriptcat.org/zh-CN/users/201032
// @version	3.7.29
// @description	Microsoft Rewards 自动完成：签入、阅读、搜索、每日任务、App 新功能奖励。基于 geoisam 3.6.52 维护，修复网页通道失效并改为 dapi 通道分次执行
// @author	simonDengx（维护）· geoisam（原作者）
// @original-author	geoisam (geoisam@qq.com)
// @original-script	https://github.com/geoisam/FuckScripts
// @original-license	GPL-3.0
// @icon	data:image/png;base64,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
// @homepage	https://github.com/simonDengx/microsoft-rewards-userscript
// @homepageURL	https://github.com/simonDengx/microsoft-rewards-userscript
// @supportURL	https://github.com/simonDengx/microsoft-rewards-userscript/issues
// @updateURL	https://simondengx.github.io/microsoft-rewards-userscript/microsoft-rewards.user.js
// @downloadURL	https://simondengx.github.io/microsoft-rewards-userscript/microsoft-rewards.user.js
// @crontab	*/20 * * * *
// @connect	bing.com
// @connect	login.live.com
// @connect	rewards.bing.com
// @connect	prod.rewardsplatform.microsoft.com
// @connect	hotapi.nntool.cc
// @connect	hot.baiwumm.com
// @connect	cnxiaobai.com
// @connect	disp-qryapi.3g.qq.com
// @connect	qyapi.weixin.qq.com
// @connect	oapi.dingtalk.com
// @connect	open.feishu.cn
// @connect	push.i-i.me
// @connect	api.day.app
// @match	https://login.live.com/*
// @include	https://login.live.com/*
// @match	https://rewards.bing.com/dashboard
// @run-at	document-end
// @noframes
// @all-frames
// @grant	unsafeWindow
// @grant	GM_xmlhttpRequest
// @grant	GM_notification
// @grant	GM_openInTab
// @grant	GM_getValue
// @grant	GM_setValue
// @grant	GM_cookie
// @grant	GM_addValueChangeListener
// @grant	GM_removeValueChangeListener
// @grant	GM_info
// @grant	GM_log
// @grant	GM_registerMenuCommand
// @grant	CAT_registerMenuInput
// @storageName	FuckScripts_Shared_Auth
// @tips	此脚本一直为 开源免费 使用，如果你是从某些地方买的话，你就是被骗了
// @license	GPL-3.0
// ==/UserScript==

/* global GM_cookie, GM_getValue, GM_setValue, GM_xmlhttpRequest, GM_log, GM_info, GM_notification, GM_openInTab */

/* ==UserConfig==
Config:
    keep:
        title: 持续检测（关闭则所有任务完成后不再检测）
        type: checkbox
        default: true
    lock:
        title: 锁定国区（若当前 IP 非中国大陆地区则停止）
        type: checkbox
        default: true
    span:
        title: 搜索间隔（至少 30 秒即间隔 15-45 秒）
        type: number
        default: 30
        min: 30
        unit: ±15秒
    api:
        title: 搜索词接口（offline为随机搜索词）
        type: select
        default: hot.nntool.cc
        values: [offline, hot.nntool.cc, hot.baiwumm.com, hot.cnxiaobai.com]
    code:
        title: 授权码链接（请勿分享以免个人数据泄露）
        type: textarea
        description: https://login.live.com/oauth20_desktop.srf?code=M.C540_BAY.2.U.********-****-****-****-************&...
Tasks:
    sign:
        title: 签入（Authorization Code）
        type: checkbox
        default: true
    read:
        title: 阅读（Authorization Code）
        type: checkbox
        default: true
    promos:
        title: 活动卡片（电脑/手机端）
        type: checkbox
        default: true
    edge:
        title: Edge浏览连签（每日30分钟计时上报）
        type: checkbox
        default: true
    bonus:
        title: 每日额外积分（dashboard领取按钮）
        type: checkbox
        default: true
    search:
        title: 搜索（www.bing.com）
        type: checkbox
        default: true
Harvest:
    quiz:
        title: 收割·Bing 首页问答（HPQuiz，约 10 分/日）
        type: checkbox
        default: true
    sapphire:
        title: 收割·App 新功能奖励（50/20/20/10 分）
        type: checkbox
        default: true
    evergreen:
        title: 收割·每日问答（6 个，各 5 分）
        type: checkbox
        default: true
    dailyset:
        title: 收割·每日热搜任务（当日 3×10 分）
        type: checkbox
        default: true
    checkin:
        title: 收割·每日打卡
        type: checkbox
        default: true
    maxPerRun:
        title: 每轮最多做几个（越小越稳）
        type: number
        default: 2
        min: 1
        max: 6
        unit: 个/次
    gapMin:
        title: 任务之间最短间隔
        type: number
        default: 4
        min: 1
        max: 60
        unit: 秒
    gapMax:
        title: 任务之间最长间隔
        type: number
        default: 11
        min: 1
        max: 120
        unit: 秒
    jitter:
        title: 每轮起始随机延迟（抗整点特征）
        type: number
        default: 45
        min: 0
        max: 300
        unit: 秒
Notice:
    bro:
        title: 浏览器通知（当前脚本）
        type: checkbox
        default: true
    wework:
        title: 企业微信消息推送（群机器人）
        type: text
        password: true
        description: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    dingding:
        title: 钉钉群机器人（不加签，关键词：#）
        type: text
        password: true
        description: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    feishu:
        title: 飞书群机器人（不加签，关键词：#）
        type: text
        password: true
        description: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    pushme:
        title: PushMe（push.i-i.me）
        type: text
        password: true
        description: xxxxxxxxxxxxxxxxxxxx
    bark:
        title: Bark（bark.day.app）
        type: text
        password: true
        description: xxxxxxxxxxxxxxxxxxxx
==/UserConfig== */

// ⚠️ 2026-11-16 实测：本分支在 login.live.com 上【不会执行】。
// 用 sctl 打开 oauth20_authorize.srf 后检查页面上下文，GM_setValue / GM_cookie / GM_log 全部 undefined，
// 说明内容脚本未被注入（该站点 CSP 极严，与 rewards.bing.com 同类问题）。
// 历史上每次成功授权都走的是「📋 粘贴授权码」手动路径，自动捕获从未生效。
// 保留本分支：若将来 ScriptCat 或站点放宽注入限制，可自动恢复；同时它不影响手动路径。
if (typeof window !== 'undefined' && window.location && window.location.hostname === "login.live.com") {
    (function() {
        // 写 cookie 只是给「跨上下文读取」留的后备通道：
        // 新版 ScriptCat 的 GM_cookie 是函数式 API（GM_cookie("set", details)），没有 .set 方法，
        // 直接调用 GM_cookie.set 会抛 TypeError。两种写法都试，最后再退回 document.cookie。
        const setAuthCookie = function(code) {
            const details = {
                name: "microsoft_rewards_auth_code",
                value: encodeURIComponent(code),
                domain: ".live.com",
                path: "/",
                secure: true,
                expirationDate: Date.now() / 1000 + 60
            };
            try {
                if (typeof GM_cookie !== 'undefined') {
                    try { GM_cookie.set(details); }
                    catch (e) { try { GM_cookie("set", details); } catch (e2) {} }
                }
            } catch (e) {}
            try {
                if (typeof document !== 'undefined') {
                    const expiration = new Date();
                    expiration.setTime(expiration.getTime() + 60 * 1000);
                    document.cookie = "microsoft_rewards_auth_code=" + encodeURIComponent(code) + "; expires=" + expiration.toUTCString() + "; path=/; domain=.live.com";
                }
            } catch (e) {}
        };

        // 捕获后清理地址栏：code 是一次性凭证，没必要留在地址栏和浏览历史里
        const scrubUrl = function() {
            try { history.replaceState({}, "", "/oauth20_desktop.srf"); } catch (e) {}
        };

        // 判断这个授权页是不是本脚本打开的：10 分钟内有「打开授权页」记录就算
        const openedByScript = function() {
            try {
                const at = Number(GM_getValue("Config.authFlowAt", 0)) || 0;
                return !!(at && (Date.now() - at) < 10 * 60 * 1000);
            } catch (e) { return false; }
        };

        // 关闭当前标签页。
        // 注意：window.close() 只对「由脚本 window.open 打开」或「有 opener 的标签」有效；
        // 对 GM_openInTab 打开的标签，多数浏览器会静默拒绝（这正是之前关不掉的原因）。
        // 因此按「能关就关，关不掉就明确告诉用户」处理，并把结果写进存储便于排查。
        const closeIfOurs = function(ours) {
            if (!ours) return;
            setTimeout(function() {
                let how = "";
                try { window.close(); how = "window.close"; } catch (e) { how = "window.close 抛错:" + e.message; }
                // 400ms 后还活着，说明 close 被忽略：再试两种兜底
                setTimeout(function() {
                    try {
                        if (typeof GM_closeInTab === "function") { GM_closeInTab(); how += " → GM_closeInTab"; }
                    } catch (e) {}
                    try { window.open("", "_self"); window.close(); } catch (e) {}
                    try {
                        GM_setValue("Config.authCloseResult", { at: Date.now(), how, url: location.href.slice(0, 80) });
                    } catch (e) {}
                    try { GM_log("[auth] 尝试关闭授权页（" + how + "）"); } catch (e) {}
                }, 500);
            }, 400);
        };

        const checkAndCapture = function() {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const authCode = urlParams.get("code");
                const authError = urlParams.get("error");

                if (authCode && authCode.length > 10) {
                    const fullCode = "https://login.live.com/oauth20_desktop.srf?code=" + authCode.trim();
                    const ours = openedByScript();
                    // 先落库再写 cookie：cookie 通道可能因权限失败，不能影响主链路
                    GM_setValue("Config.code", fullCode);
                    GM_setValue("Config.token", false);
                    GM_setValue("Config.codeTime", Date.now());
                    GM_setValue("Config.codeManual", !ours);
                    GM_setValue("Config.lastAuthError", null);
                    GM_log(`[auth] 已捕获授权码（长度 ${authCode.length}，${ours ? "脚本打开" : "手动打开"}），已清除旧 refresh token，下次运行自动换取新 token`);
                    setAuthCookie(fullCode);

                    if (GM_getValue("Notice.bro", true)) {
                        GM_notification({
                            text: "授权码获取成功！",
                            title: GM_info.script.name,
                            onclick: function() {}
                        });
                    }

                    scrubUrl();
                    closeIfOurs(ours);
                    return true;
                }

                // OAuth 失败分支：常见 access_denied / invalid_request / consent_required
                if (authError) {
                    const desc = urlParams.get("error_description") || "";
                    GM_setValue("Config.lastAuthError", { error: authError, description: desc, ts: Date.now() });
                    GM_log(`[auth] 授权失败：${authError}${desc ? " · " + desc : ""}`);
                    if (GM_getValue("Notice.bro", true)) {
                        GM_notification({
                            text: `授权失败：${authError}\n${desc.slice(0, 80)}`,
                            title: GM_info.script.name,
                            onclick: function() {}
                        });
                    }
                    const ours = openedByScript();
                    scrubUrl();
                    closeIfOurs(ours);
                    return true;
                }
            } catch (e) {}
            return false;
        };

        if (checkAndCapture()) {
            return;
        }

        window.addEventListener("hashchange", checkAndCapture);
        window.addEventListener("popstate", checkAndCapture);

        const checkInterval = setInterval(function() {
            if (checkAndCapture()) {
                clearInterval(checkInterval);
            }
        }, 300);

        setTimeout(function() {
            clearInterval(checkInterval);
        }, 60000);
    })();
    return;
}

const FuckD = {
    wh: [
        {
            name: "企业微信",
            url: "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=",
            key: GM_getValue("Notice.wework", false),
            msg: {
                "msgtype": "text",
                "text": {
                    get content() {
                        return `> ${FuckD.bing.datetimeLocaleStr}\n\n ## ${GM_info.script.name}\n ${FuckD.bing.sendMSG}`
                    }
                },
            },
            docs: "https://developer.work.weixin.qq.com/document/path/91770"
        },
        {
            name: "钉钉",
            url: "https://oapi.dingtalk.com/robot/send?access_token=",
            key: GM_getValue("Notice.dingding", false),
            msg: {
                "msgtype": "markdown",
                "markdown": {
                    "title": GM_info.script.name,
                    get text() {
                        return `> ${FuckD.bing.datetimeLocaleStr}\n ### ${GM_info.script.name}\n ${FuckD.bing.sendMSG}`
                    }
                },
            },
            docs: "https://open.dingtalk.com/document/orgapp/custom-robots-send-group-messages"
        },
        {
            name: "飞书",
            url: "https://open.feishu.cn/open-apis/bot/v2/hook/",
            key: GM_getValue("Notice.feishu", false),
            msg: {
                "msg_type": "interactive",
                "card": {
                    "schema": "2.0",
                    "header": {
                        "title": {
                            "tag": "plain_text",
                            "content": GM_info.script.name
                        },
                        "template": "orange"
                    },
                    "body": {
                        "elements": [{
                            "tag": "markdown",
                            "text_align": "center",
                            get content() {
                                return `#### ${FuckD.bing.datetimeLocaleStr}\n ${FuckD.bing.sendMSG}`
                            }
                        }]
                    }
                }
            },
            docs: "https://open.feishu.cn/document/client-docs/bot-v3/add-custom-bot"
        },
        {
            name: "PushMe",
            url: "https://push.i-i.me/?push_key=",
            key: GM_getValue("Notice.pushme", false),
            msg: {
                "type": "markdown",
                "title": `${GM_info.script.name}[#reawrds!https://rewards.bing.com/rewards.png]`,
                get content() {
                    return `\n ${FuckD.bing.sendMSG}`
                }
            },
            docs: "https://push.i-i.me/docs/index"
        },
        {
            name: "Bark",
            url: "https://api.day.app/",
            key: GM_getValue("Notice.bark", false),
            msg: {
                "group": "rewards",
                "icon": "https://rewards.bing.com/rewards.png",
                "title": GM_info.script.name,
                get markdown() {
                    return `\n ${FuckD.bing.sendMSG}`
                }
            },
            docs: "https://bark.day.app/#/tutorial"
        },
    ],
    ua: {
        // 拟人化 P0：PC 端优先用浏览器真实 UA（与 TLS 指纹一致，避免 UA 版本声明与实际指纹不符的伪装特征；沙箱无 navigator 时回退到近期版本，需随版本更替更新）
        pc: (typeof navigator !== "undefined" && /Chrome\//.test(navigator.userAgent || "")) ? navigator.userAgent : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36 Edg/150.0.2420.81",
        // APP 通道移动 UA（dapi/移动搜索），硬编码需定期跟随版本更新
        m: "Mozilla/5.0 (Linux; Android 16; MCE16 Build/BP3A.250905.014; ) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/150.0.0.0 Mobile Safari/537.36 EdgA/150.0.2420.102",
    },
    cookie: {
        bing: "",
    },
    api: {
        mode: GM_getValue("Config.api", "offline"),
        arr: [
            ["hot.baiwumm.com", {
                url: "https://hot.baiwumm.com/api/",
                hot: ["weibo", "douyin", "baidu", "toutiao", "thepaper", "qq", "netease", "zhihu"],
            }],
            ["hot.cnxiaobai.com", {
                url: "https://cnxiaobai.com/DailyHotApi/",
                hot: ["weibo", "douyin", "baidu", "toutiao", "thepaper", "qq-news", "netease-news", "zhihu"],
            }],
            ["hot.nntool.cc", {
                url: "https://hotapi.nntool.cc/",
                hot: ["weibo", "douyin", "baidu", "toutiao", "thepaper", "qq-news", "netease-news", "zhihu"],
            }],
        ],
    },
    tasks: {
        sign: GM_getValue("Tasks.sign", true),
        read: GM_getValue("Tasks.read", true),
        promos: GM_getValue("Tasks.promos", true),
        edge: GM_getValue("Tasks.edge", true),
        bonus: GM_getValue("Tasks.bonus", true),
        search: GM_getValue("Tasks.search", true),
    },
    bing: {
        region: "CN",
        status: GM_getValue("Config.lock", true),
        repo: "https://github.com/geoisam/FuckScripts/",
        time: 3210,
        span: GM_getValue("Config.span", 30),
        code: 0,
        token: false,
        error: 0,
        tasks: {
            get sign() {
                return FuckD.sign.date
            },
            get read() {
                return FuckD.read.date
            },
            get promos() {
                return FuckD.promos.date
            },
            get streak() {
                return FuckD.streak.date
            },
            get search() {
                return FuckD.search.date
            },
        },
        mainland: 1,
        end: 1,
    },
    sign: {
        times: 0,
        point: -1,
        end: 0,
    },
    read: {
        times: 0,
        point: 0,
        end: 0,
    },
    promos: {
        times: 0,
        token: 0,
        end: 0,
    },
    streak: {
        times: 0,
        point: 0,
        end: 0,
    },
    edge: {
        times: 0,
        end: 0,
        running: false,
    },
    search: {
        device: "",
        word: {
            list: [],
            index: 0,
        },
        times: 0,
        progressNow: 0,
        pc: {
            progress: 0,
            max: 1,
        },
        m: {
            progress: 0,
            max: 1,
        },
        index: 0,
        end: 0,
    },
}

const FuckF = {
    getRandomNum(num) {
        return Math.floor(Math.random() * num)
    },
    getScopeRandomNum(min, max) {
        return Math.floor(Math.random() * (max + 1 - min) + min)
    },
    getRandomArr(arr) {
        return arr.sort(() => {
            return Math.random() - 0.5
        })
    },
    getRandomUUID(only = false) {
        const uuid = crypto.randomUUID()
        const sid = uuid.replace(/-/g, "").toUpperCase()
        return only ? sid : uuid
    },
    getTimestamp(start = 0, end = 13) {
        const timestamp = Date.now()
        const num = timestamp.toString().substring(start, end)
        return Number(num)
    },
    getDatetime(num = false, slash = true) {
        const today = new Date()
        const year = today.getFullYear()
        let month = today.getMonth() + 1
        let day = today.getDate()
        month = month < 10 ? "0" + month : month
        day = day < 10 ? "0" + day : day
        const dateNow = num ? Number(`${year}${month}${day}`) : slash ? `${month}/${day}/${year}` : `${year}-${month}-${day}`
        return dateNow
    },
    isJSON(s) {
        try {
            const j = JSON.parse(s)
            const p = Array.isArray(j) || (typeof j === "object" && j !== null)
            return p ? true : false
        } catch {
            return false
        }
    },
    log(title, text, push = false) {
        GM_log(title + text + "🔚")
        if (!GM_getValue("Notice.bro", true) || !push) return
        GM_notification({
            text: text,
            title: GM_info.script.name + title,
            onclick: () => {
                if (typeof push === 'string' && push.startsWith('http')) {
                    GM_openInTab(push, { active: true, insert: true, setParent: true });
                } else if (title.includes("🔵") || title.includes("🎉")) {
                    GM_openInTab("https://rewards.bing.com/earn", { active: true, insert: true, setParent: true });
                } else {
                    GM_openInTab("https://rewards.bing.com/dashboard", { active: true, insert: true, setParent: true });
                }
            },
        })
    },
    xhr(options, only = false) {
        return new Promise((resolve, reject) => {
            const start = FuckF.getTimestamp();
            try {
                GM_xmlhttpRequest({
                    ...options,
                    timeout: 15000,
                    ontimeout: () => {
                        const cost = (FuckF.getTimestamp() - start) / 1000;
                        reject(new Error(`请求超时！用时 ${cost} 秒`));
                    },
                    onload: (xhr) => {
                        const cost = (FuckF.getTimestamp() - start) / 1000;
                        if (xhr.status >= 200 && xhr.status < 300) {
                            resolve(only ? xhr.finalUrl : xhr.responseText);
                            return;
                        }
                        const redirectStatuses = [301, 302, 307, 308];
                        if (redirectStatuses.includes(xhr.status)) {
                            const match = xhr.responseHeaders?.match(/Location:\s*(.*?)\s*\r?\n/i);
                            resolve(match ? match[1] : false);
                            return;
                        }
                        // 附带响应体前 120 字符摘要：500 多为 React flight 错误帧（如 1:E{"digest":"..."}），
                        // 没有响应体内容则服务端报错原因完全是排查盲区
                        const bodySnippet = (xhr.responseText || "").replace(/\s+/g, " ").slice(0, 120);
                        reject(new Error(`请求失败，用时 ${cost} 秒，状态码：${xhr.status}${bodySnippet ? ` 🔛${bodySnippet}` : ""}`));
                    },
                    onerror: (err) => {
                        const cost = (FuckF.getTimestamp() - start) / 1000;
                        let errDetail = "";
                        if (err) {
                            errDetail = err.error || err.statusText || (typeof err === "object" ? JSON.stringify(err) : err);
                        } else {
                            errDetail = "未知网络错误";
                        }
                        reject(new Error(`请求异常！用时 ${cost} 秒 🔛${errDetail}`));
                    },
                });
            } catch (e) {
                reject(e);
            }
        });
    },
}

FuckF.getRandomSubstring = (str, min = 20, max = 32) => {
    const length = str.length
    if (length <= min) {
        return str
    }
    const randomLength = FuckF.getScopeRandomNum(min, max)
    return str.substring(0, randomLength)
}

FuckF.getRandomApiHot = () => {
    const lastIndex = parseInt(GM_getValue("Config.index", -1))
    const filteredArr = FuckD.api.hot.filter((name, index) => index != lastIndex)
    const randomIndex = FuckF.getRandomNum(filteredArr.length)
    GM_setValue("Config.index", randomIndex)
    return filteredArr[randomIndex]
}

// 用授权码 / refresh token 换取 access token。
// 返回值：true = 成功；false = 微软明确拒绝（invalid_grant 等，重试无意义）；null = 网络/未知错误
//
// ⚠️ 关键：微软在 code 无效时返回 HTTP 400 + {"error":"invalid_grant", ...}，
//    xhr 抛出的错误信息里带这段 JSON。原实现只判 400/401 就 return false，
//    但调用方拿 false 会再去 fetchCodeLogic 开授权页，日志也只写「Token 请求失败」，
//    完全看不到「code 无效」这个真实原因——排查时等于瞎子。
//    这里把 error / error_description 提出来写进日志，并标记为「明确拒绝」。
FuckF.getToken = async (url, maxRetries = 3) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const result = await FuckF.xhr({ url: url });
            if (result && FuckF.isJSON(result)) {
                const res = JSON.parse(result);
                // 微软也可能返回 200 + {"error":"..."}，这种同样要当失败处理
                if (res.error) {
                    FuckF.log("🔴", `Token 被拒绝：${res.error}${res.error_description ? " · " + String(res.error_description).slice(0, 80) : ""}`);
                    GM_setValue("Config.lastTokenError", {
                        error: res.error,
                        description: String(res.error_description || "").slice(0, 200),
                        ts: Date.now(),
                    });
                    return false;
                }
                const refresh = res.refresh_token;
                const access = res.access_token;
                if (refresh && access) {
                    GM_setValue("Config.token", refresh);
                    FuckD.bing.token = access;
                    GM_setValue("Config.lastTokenError", null);
                    return true;
                }
                FuckF.log("🟡", `Token 响应缺少字段：${Object.keys(res).join(",").slice(0, 120)}`);
            } else {
                FuckF.log("🟡", `Token 响应不是 JSON：${String(result).slice(0, 120)}`);
            }
            return false;
        } catch (e) {
            const msg = String(e.message || "");
            // 微软的明确拒绝（code/token 无效）：把 error_description 挖出来，不要笼统说「请求失败」
            const m = msg.match(/"error"\s*:\s*"([^"]+)"[\s\S]*?"error_description"\s*:\s*"([^"]*)"/);
            if (m || msg.includes("400") || msg.includes("401")) {
                const code = m ? m[1] : "http_" + (msg.match(/状态码：(\d+)/) || [])[1];
                const desc = m ? m[2] : msg.slice(0, 120);
                FuckF.log("🔴", `Token 被拒绝：${code}${desc ? " · " + desc.slice(0, 100) : ""}`);
                GM_setValue("Config.lastTokenError", { error: code, description: desc.slice(0, 200), ts: Date.now() });
                return false;   // 明确拒绝，重试无意义
            }
            if (attempt < maxRetries) {
                await new Promise(resolve => setTimeout(resolve, 3210));
                continue;
            }
            FuckF.log("🔴", `Token 请求网络异常：${msg.slice(0, 150)}`);
            return null;
        }
    }
    return null;
}

FuckF.renewToken = async () => {
    if (!FuckD.tasks.sign && !FuckD.tasks.read && !FuckD.tasks.edge) return true;
    let refreshToken = GM_getValue("Config.token", false);
    const authUrl = "https://login.live.com/oauth20_authorize.srf?client_id=0000000040170455&response_type=code&scope=service::prod.rewardsplatform.microsoft.com::MBI_SSL&redirect_uri=https://login.live.com/oauth20_desktop.srf";

    const pollForAuthCodeFromWindow = (authWindow, maxSeconds) => {
        return new Promise((resolve) => {
            const startTime = Date.now();
            const checkInterval = setInterval(() => {
                try {
                    if (authWindow && !authWindow.closed) {
                        const currentUrl = authWindow.location.href;
                        if (currentUrl && currentUrl.includes("code=")) {
                            const urlParams = new URLSearchParams(new URL(currentUrl).search);
                            const authCode = urlParams.get("code");
                            if (authCode && authCode.length > 10) {
                                clearInterval(checkInterval);
                                const fullCode = `https://login.live.com/oauth20_desktop.srf?code=${authCode.trim()}`;
                                GM_setValue("Config.code", fullCode);
                                GM_setValue("Config.token", false);
                                FuckF.log("🟢", "通过子窗口检测到授权码");
                                resolve(authCode.match(/M\.[^&]+/));
                                return;
                            }
                        }
                    }
                } catch (e) {}

                if (Date.now() - startTime >= maxSeconds * 1000) {
                    clearInterval(checkInterval);
                    resolve(null);
                }
            }, 300);
        });
    };

    const pollForAuthCodeViaRequest = (maxSeconds) => {
        return new Promise((resolve) => {
            const startTime = Date.now();
            const checkInterval = setInterval(() => {
                GM_xmlhttpRequest({
                    method: "GET",
                    url: "https://login.live.com/oauth20_desktop.srf",
                    onload: function(response) {
                        if (response.responseText) {
                            const match = response.responseText.match(/code=([^&"]+)/);
                            if (match && match[1] && match[1].length > 10) {
                                clearInterval(checkInterval);
                                const fullCode = `https://login.live.com/oauth20_desktop.srf?code=${match[1].trim()}`;
                                GM_setValue("Config.code", fullCode);
                                GM_setValue("Config.token", false);
                                FuckF.log("🟢", "通过GM_xmlhttpRequest检测到授权码");
                                resolve(match[1].match(/M\.[^&]+/));
                                return;
                            }
                        }
                    },
                    onerror: function() {}
                });

                if (Date.now() - startTime >= maxSeconds * 1000) {
                    clearInterval(checkInterval);
                    resolve(null);
                }
            }, 1000);
        });
    };

    const getAuthCodeFromCookie = function() {
        return new Promise((resolve) => {
            let settled = false;
            const finish = (v) => { if (!settled) { settled = true; resolve(v); } };
            // service_worker（@crontab 定时脚本）环境下 cookie 回调可能永不触发，
            // 不加超时会令 await 永久挂起、整个授权码轮询卡死（日志表现为此后再无任何输出）
            setTimeout(() => finish(null), 3000);
            try {
                if (typeof GM_cookie !== 'undefined') {
                    const onCookie = (cookie) => {
                        const v = Array.isArray(cookie) ? (cookie[0] && cookie[0].value) : (cookie && cookie.value);
                        finish(v ? decodeURIComponent(v) : null);
                    };
                    // 新版 ScriptCat：函数式 API，没有 .get 方法；旧版是 GM_cookie.get(...)
                    try { GM_cookie("get", { url: "https://login.live.com", name: "microsoft_rewards_auth_code" }, onCookie); }
                    catch (e) { try { GM_cookie.get("microsoft_rewards_auth_code", onCookie); } catch (e2) {} }
                }
                if (typeof document !== 'undefined') {
                    const value = "; " + document.cookie;
                    const parts = value.split("; microsoft_rewards_auth_code=");
                    if (parts.length === 2) {
                        finish(decodeURIComponent(parts.pop().split(";").shift()));
                    }
                }
            } catch (e) {
                finish(null);
            }
        });
    };

    const pollForAuthCode = async (maxSeconds, excludeCode = "") => {
        return new Promise((resolve) => {
            let settled = false;
            let listenerId = null;
            const done = (match) => {
                if (settled) return;
                settled = true;
                if (listenerId != null && typeof GM_removeValueChangeListener !== 'undefined') {
                    try { GM_removeValueChangeListener(listenerId); } catch (e) {}
                }
                resolve(match);
            };
            const accept = (code) => {
                if (settled || !code) return;
                const m = String(code).match(/M\.[^&]+/);
                // 排除已失效的旧授权码，防止读到清空前的残留快照值
                if (m && (!excludeCode || m[0] !== excludeCode)) done(m);
            };
            // 实时跨脚本监听：捕获脚本（同 storageName）写入 Config.code 后立即收到通知，
            // 不依赖本运行上下文内 GM_getValue 能否看到跨脚本写入
            if (typeof GM_addValueChangeListener !== 'undefined') {
                try {
                    listenerId = GM_addValueChangeListener("Config.code", (name, oldValue, newValue) => {
                        accept(newValue);
                    });
                } catch (e) {}
            }
            (async () => {
                const startTime = Date.now();
                while (!settled && Date.now() - startTime < maxSeconds * 1000) {
                    await new Promise(r => setTimeout(r, 500));
                    if (settled) break;
                    let code = GM_getValue("Config.code", "");
                    if (!code) {
                        const cookieCode = await getAuthCodeFromCookie();
                        if (cookieCode) {
                            code = cookieCode;
                            GM_setValue("Config.code", code);
                            GM_setValue("Config.token", false);
                        }
                    }
                    accept(code);
                }
                done(null);
            })();
        });
    };

    const fetchCodeLogic = async (msg) => {
        // 自动打开授权页有冷却：token 长期失效时，cron 每 20 分钟跑一次，
        // 不加限制会不停弹标签页。6 小时内只弹一次，其余轮次只写日志。
        const lastPrompt = Number(GM_getValue("Config.lastAuthPrompt", 0)) || 0;
        const COOLDOWN = 6 * 60 * 60 * 1000;
        if (lastPrompt && Date.now() - lastPrompt < COOLDOWN) {
            const left = Math.ceil((COOLDOWN - (Date.now() - lastPrompt)) / 60000);
            FuckF.log("🟡", `${msg}，但 ${left} 分钟内已尝试过自动授权，本次不再打开页面。请手动点击脚本菜单「🔑 打开授权页面」完成授权`);
            return null;
        }
        // 记录旧授权码：轮询时用它过滤残留的失效旧码。
        // ⚠️ 绝不能在这里 GM_setValue("Config.code", "")：
        //    之前就是这么写的，结果自动授权超时后「原授权码 + 原 refresh token」双双被清空，
        //    用户刚粘贴的新码 62 秒后就被脚本自己删掉，所有任务随之跳过。
        //    正确做法是保留旧值，只在真的拿到新码时才覆盖（登录页捕获分支会写）。
        const oldCodeRaw = GM_getValue("Config.code", "") || "";
        const oldCodeMatch = oldCodeRaw.match(/M\.[^&]+/);
        const excludeCode = oldCodeMatch ? oldCodeMatch[0] : "";
        GM_setValue("Config.lastAuthPrompt", Date.now());
        // 标记授权流程：登录页据此判断标签页是脚本打开的，捕获后可自动关闭
        GM_setValue("Config.authFlowAt", Date.now());
        FuckF.log("🟡", `${msg}，正在打开授权页面...`);

        let authWindow = null;
        let authTab = null;
        if (typeof window !== 'undefined' && window.open) {
            authWindow = window.open(authUrl, '_blank', 'width=600,height=600');
        } else {
            // 必须留住 handle：window.close() 只能关 window.open 打开的子窗口，
            // 对 GM_openInTab 打开的标签页无效（浏览器会静默拒绝），
            // 只能由打开方通过 handle.close() 关闭。
            try {
                authTab = GM_openInTab(authUrl, { active: true, insert: true, setParent: true });
            } catch (e) {
                GM_openInTab(authUrl, { active: true, insert: true });
            }
        }

        // 关闭授权标签页：优先用 handle，其次 window.close（只对 window.open 有效）
        const closeAuthTab = () => {
            try {
                if (authTab && typeof authTab.close === "function") { authTab.close(); return true; }
            } catch (e) {}
            try {
                if (authWindow && !authWindow.closed) { authWindow.close(); return true; }
            } catch (e) {}
            return false;
        };

        await new Promise(resolve => setTimeout(resolve, 2000));
        FuckF.log("🟡", `请在打开的页面中完成登录授权，等待授权码...`);

        FuckF.log("🟡", `等待授权码...请在打开的授权页面中完成登录`);
        let codeMatch = await pollForAuthCode(120, excludeCode);
        if (codeMatch) {
            FuckF.log("🟢", "授权码获取成功");
            if (closeAuthTab()) FuckF.log("🟢", "已关闭授权页面");
            return codeMatch;
        }

        FuckD.bing.sendMSG = `${msg}，自动获取授权码超时，请手动复制授权页面URL后点击脚本菜单的"粘贴授权码"选项`;
        FuckF.log("🟡", FuckD.bing.sendMSG, authUrl);
        FuckF.send(FuckD.wh);

        codeMatch = await pollForAuthCode(120, excludeCode);
        if (codeMatch) {
            FuckF.log("🟢", "授权码手动获取成功");
            if (closeAuthTab()) FuckF.log("🟢", "已关闭授权页面");
            return codeMatch;
        }
        // 超时也关掉：页面停在登录框对用户没有价值，留着只是多一个标签
        if (closeAuthTab()) FuckF.log("🟡", "授权超时，已关闭授权页面");

        FuckD.tasks.sign = false;
        FuckD.tasks.read = false;
        return false;
    };
    if (!refreshToken) {
        let code = GM_getValue("Config.code", "");
        // 运行时纠错：用户可能通过「脚本设置 → Config → 授权码链接」直接粘贴，
        // 那条路径绕过了 applyPastedCode，不会区分类型。
        // 若发现填的其实是 refresh token（MsaArtifacts 特征），自动搬进 Config.token 并清掉 code，
        // 否则会一直拿它当 authorization code 用，每次都 invalid_grant。
        const rawVal = (code.match(/M\.[^&\s]+/) || [])[0] || "";
        if (rawVal && /MsaArtifacts/i.test(rawVal)) {
            FuckF.log("🟡", `检测到授权码字段里填的是 refresh token（${rawVal.slice(0, 20)}…），已自动迁移到正确字段`);
            GM_setValue("Config.token", rawVal);
            GM_setValue("Config.code", "");
            GM_setValue("Config.tokenTime", Date.now());
            // 迁移后直接按 refresh token 分支继续，不重复走 code 流程
            refreshToken = rawVal;
        } else {
        let codeMatch = code ? code.match(/M\.[^&]+/) : null;
        if (!codeMatch) {
            codeMatch = await fetchCodeLogic("检测到授权码为空");
            if (!codeMatch) return false;
        }
        const url = `https://login.live.com/oauth20_token.srf?client_id=0000000040170455&code=${encodeURIComponent(codeMatch[0])}&redirect_uri=https://login.live.com/oauth20_desktop.srf&grant_type=authorization_code`;
        const token = await FuckF.getToken(url);
        if (token === null) return false;
        if (!token) {
            // 微软明确拒绝了这个 code（通常是 invalid_grant：code 已被用过或已过期）。
            // 不要把用户再拖去开授权页——之前就是这样无限循环，日志还只写「Token 请求失败」。
            // 这里保留 code 不清空（可能用户手滑粘了旧码，重新粘一条新的即可），
            // 明确告诉用户原因和下一步。
            const err = GM_getValue("Config.lastTokenError", null);
            const reason = err ? `${err.error}${err.description ? " · " + String(err.description).slice(0, 80) : ""}` : "未知";
            FuckD.bing.sendMSG = `授权码无效（${reason}）。授权码是一次性的：请在浏览器完成授权后，立刻复制地址栏里的 oauth20_desktop.srf?code=... 整条链接，用菜单「📋 粘贴授权码（输入框）」粘贴`;
            FuckF.log("🔴", FuckD.bing.sendMSG, true);
            FuckF.send(FuckD.wh);
            FuckD.tasks.sign = false;
            FuckD.tasks.read = false;
            return false;
        }
        GM_setValue("Config.lastAuthPrompt", 0);
        FuckD.bing.sendMSG = "Token 获取成功！";
        FuckF.log("🟢", FuckD.bing.sendMSG, true);
        FuckF.send(FuckD.wh);
        return true;
        }   // end else (授权码分支)
    }
    // refresh token 分支：可能是原有 token，也可能是上面从 Config.code 迁移过来的
    {
        const url = `https://login.live.com/oauth20_token.srf?client_id=0000000040170455&refresh_token=${encodeURIComponent(refreshToken)}&scope=service::prod.rewardsplatform.microsoft.com::MBI_SSL&grant_type=REFRESH_TOKEN`;
        const token = await FuckF.getToken(url);
        if (token === null) return false;
        if (!token) {
            // refresh token 已失效。不清 Config.code（refresh token 过期不等于 code 过期），
            // 但要避免「开授权页 → 失败 → 再递归 renewToken → 再开授权页」的无限循环。
            // 这里只尝试一次自动授权；拿不到就明确报错退出，让用户手动粘贴。
            GM_setValue("Config.token", false);
            const err = GM_getValue("Config.lastTokenError", null);
            const reason = err ? `${err.error}` : "refresh token 失效";
            const codeMatch = await fetchCodeLogic(`检测到 Token 失效（${reason}）`);
            if (!codeMatch) return false;
            // 直接用手上的新 code 换一次 token，不再递归（递归会重新走整个 refresh 分支）
            const newUrl = `https://login.live.com/oauth20_token.srf?client_id=0000000040170455&code=${encodeURIComponent(codeMatch[0])}&redirect_uri=https://login.live.com/oauth20_desktop.srf&grant_type=authorization_code`;
            const ok = await FuckF.getToken(newUrl);
            if (ok) {
                GM_setValue("Config.lastAuthPrompt", 0);
                return true;
            }
            const err2 = GM_getValue("Config.lastTokenError", null);
            FuckD.bing.sendMSG = `重新授权失败（${err2 ? err2.error : "未知"}）。授权码一次性有效，请重新完成授权后立刻粘贴`;
            FuckF.log("🔴", FuckD.bing.sendMSG, true);
            FuckF.send(FuckD.wh);
            return false;
        }
        GM_setValue("Config.lastAuthPrompt", 0);
        return true;
    }
}

FuckF.getRewardsInfo = async (maxRetries = 3) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const earnHtml = await FuckF.xhr({ url: "https://rewards.bing.com/earn" });
            const cleanHtml = earnHtml.replace(/\\"/g, '"');
            const balMatch = cleanHtml.match(/"balance":(\d+)/) || cleanHtml.match(/"availablePoints":(\d+)/);
            const keyword = '"pointsCounters":{';
            const idx = cleanHtml.indexOf(keyword);
            if (!balMatch || idx === -1) {
                if (attempt < maxRetries) {
                    await new Promise(resolve => setTimeout(resolve, 3210));
                    continue;
                }
                return false;
            }
            let balance = parseInt(balMatch[1]);
            let pcMax = 60, pcCur = 0;
            let mobMax = 0, mobCur = 0;
            let dailyPoint = 0;
            let todayTotal = 0;
            let start = idx + 17;
            let openBraces = 0;
            let end = start;
            for (let i = start; i < cleanHtml.length; i++) {
                if (cleanHtml[i] === '{') openBraces++;
                if (cleanHtml[i] === '}') {
                    openBraces--;
                    if (openBraces === 0) {
                        end = i + 1;
                        break;
                    }
                }
            }
            try {
                const pts = JSON.parse(cleanHtml.substring(start, end));
                pcMax = pts.pc?.max ?? 60;
                pcCur = pts.pc?.progress ?? 0;
                mobMax = pts.mobile?.max ?? 0;
                mobCur = pts.mobile?.progress ?? 0;
                dailyPoint = pts.dailyOffer ?? 0;
                todayTotal = pts.totalPoints ?? 0;
            } catch {
                FuckF.log("🟡", "仪表盘解析异常，将使用保底数值");
            }
            FuckD.bing.todayTotalPoints = todayTotal;
            // 持久化站方当日总分：汇总日志在本轮更早的位置执行，只能读上一轮写入的值
            try { GM_setValue("Config.todayTotal", { date: FuckD.bing.dateNowNum, total: todayTotal }); } catch (e) {}
            return {
                userStatus: {
                    availablePoints: balance,
                    counters: {
                        pcSearch: [{ pointProgress: pcCur, pointProgressMax: pcMax }],
                        mobileSearch: [{ pointProgress: mobCur, pointProgressMax: mobMax }],
                        dailyPoint: [{ pointProgress: dailyPoint }]
                    }
                }
            };
        } catch (e) {
            if (attempt < maxRetries) {
                await new Promise(resolve => setTimeout(resolve, 3210));
                continue;
            }
            FuckF.log("🔴", `仪表盘请求失败！🔛 ${e.message}`);
        }
    }
    return false;
}

FuckF.taskSign = async () => {
    if (!FuckD.tasks.sign || FuckD.sign.date == FuckD.bing.dateNowNum || FuckD.sign.times > 2 || FuckD.sign.end > 0) {
        FuckD.sign.end++
        return true
    }
    if (FuckD.sign.point >= 0) {
        FuckD.sign.end++
        if (FuckD.sign.date != FuckD.bing.dateNowNum) {
            FuckD.sign.date = FuckD.bing.dateNowNum
            FuckD.bing.sendMSG = `📅签入任务已完成！\n${FuckD.sign.point > 0 ? `✨今日签入奖励：${FuckD.sign.point}` : "🍵今日已签入，无法二次签入"}`
            FuckF.log("🔵", FuckD.bing.sendMSG, true)
            FuckF.send(FuckD.wh)
        }
        GM_setValue("Config.tasks", FuckD.bing.tasks)
        return true
    }
    try {
        const envStatus = await FuckF.mainlandCheck();
        if (envStatus === 1) {
            FuckD.bing.code = -1;
            return true;
        }
        const region = FuckD.bing.status ? "cn" : FuckD.bing.region.toLowerCase()
        const result = await FuckF.xhr({
            method: "POST",
            url: "https://prod.rewardsplatform.microsoft.com/dapi/me/activities",
            headers: {
                "content-type": "application/json; charset=UTF-8",
                "user-agent": FuckD.ua.m,
                "authorization": `Bearer ${FuckD.bing.token}`,
                "x-rewards-appid": "SAAndroid/31.4.2110003555",
                "x-rewards-ismobile": "true",
                "x-rewards-country": region,
                "x-rewards-partnerid": "startapp",
                "x-rewards-flights": "rwgobig",
            },
            data: JSON.stringify({
                "amount": 1,
                "attributes": {},
                "id": FuckF.getRandomUUID(),
                "type": 103,
                "country": region,
                "risk_context": {},
                "channel": "SAAndroid",
            }),
        })
        if (result && FuckF.isJSON(result)) {
            FuckD.sign.times = 0
            const res = JSON.parse(result)
            const point = res.response.activity.p
            FuckD.sign.point = point || 0;
            GM_setValue("Config.signPoint", FuckD.sign.point);
        } else {
            FuckD.sign.times++
        }
    } catch (e) {
        FuckF.log("🔴", `签入任务出错！🔛${e.message}`)
        FuckD.sign.times++;
    }
    return false
}

FuckF.getReadPro = async () => {
    try {
        const result = await FuckF.xhr({
            url: "https://prod.rewardsplatform.microsoft.com/dapi/me?channel=SAAndroid&options=613",
            headers: {
                "content-type": "application/json; charset=UTF-8",
                "user-agent": FuckD.ua.m,
                "authorization": `Bearer ${FuckD.bing.token}`,
                "x-rewards-appid": "SAAndroid/31.4.2110003555",
                "x-rewards-ismobile": "true",
            },
        });
        if (result && FuckF.isJSON(result)) {
            const res = JSON.parse(result);
            const promos = res.response?.promotions || [];
            const readTask = promos.find(x => x.attributes?.offerid === 'ENUS_readarticle3_30points');
            if (readTask) {
                const progress = parseInt(readTask.attributes.progress) || 0;
                const max = parseInt(readTask.attributes.max) || 30;
                return { progress, max };
            }
        }
    } catch (e) {
        FuckF.log("🔴", `阅读进度获取出错！🔛${e.message}`);
    }
    return false;
}

// 拉取 dapi APP 通道的全量活动列表（每日打卡等 APP 专属活动在此下发，与阅读进度同源）
FuckF.getPromotions = async () => {
    try {
        const result = await FuckF.xhr({
            url: "https://prod.rewardsplatform.microsoft.com/dapi/me?channel=SAAndroid&options=613",
            headers: {
                "content-type": "application/json; charset=UTF-8",
                "user-agent": FuckD.ua.m,
                "authorization": `Bearer ${FuckD.bing.token}`,
                "x-rewards-appid": "SAAndroid/31.4.2110003555",
                "x-rewards-ismobile": "true",
            },
        });
        if (result && FuckF.isJSON(result)) {
            return JSON.parse(result).response?.promotions || [];
        }
    } catch (e) {
        FuckF.log("🔴", `活动列表获取出错！🔛${e.message}`);
    }
    return false;
}

FuckF.taskRead = async () => {
    if (!FuckD.tasks.read || FuckD.read.times > 2 || FuckD.read.end > 0) {
        FuckD.read.end++;
        return true;
    }
    try {
        const readPro = await FuckF.getReadPro();
        if (!readPro) {
            FuckD.read.times++
            return false;
        }
        let cur = readPro.progress || 0;
        let max = readPro.max || 30;
        if (FuckD.read.date != FuckD.bing.dateNowNum) {
            FuckF.log("📖", `阅读进度获取成功：${cur}/${max}`);
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        if (cur >= max) {
            if (FuckD.read.date != FuckD.bing.dateNowNum) {
                FuckF.log("📖", "接口返回进度已满，但本地无今日记录，强制开始阅读...");
                cur = 0;
                max = 30;
            } else {
                FuckD.read.end++;
                return true;
            }
        }
        const envStatus = await FuckF.mainlandCheck();
        if (envStatus === 1) {
            FuckD.bing.code = -1;
            return true;
        }
        const region = FuckD.bing.status ? "cn" : FuckD.bing.region.toLowerCase();
        FuckD.read.date = 0;
        const readsNeeded = Math.ceil((max - cur) / 3);
        for (let i = 0; i < readsNeeded; i++) {
            await FuckF.xhr({
                method: "POST",
                url: "https://prod.rewardsplatform.microsoft.com/dapi/me/activities",
                headers: {
                    "content-type": "application/json; charset=UTF-8",
                    "user-agent": FuckD.ua.m,
                    "authorization": `Bearer ${FuckD.bing.token}`,
                    "x-rewards-appid": "SAAndroid/31.4.2110003555",
                    "x-rewards-ismobile": "true",
                    "x-rewards-country": region,
                },
                data: JSON.stringify({
                    "amount": 1,
                    "country": region,
                    "id": FuckF.getRandomUUID(),
                    "type": 101,
                    "attributes": {
                        "offerid": "ENUS_readarticle3_30points",
                    },
                }),
            });
            FuckF.log("📖", `正在阅读第 ${i + 1}/${readsNeeded} 篇文章...`);
            const waitTime = FuckF.getScopeRandomNum(3000, 7000);
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }
        FuckD.read.end++;
        if (FuckD.read.date != FuckD.bing.dateNowNum) {
            FuckD.read.date = FuckD.bing.dateNowNum;
            GM_setValue("Config.tasks", FuckD.bing.tasks);
            const actualCur = cur + (readsNeeded * 3);
            const finalCur = actualCur > max ? max : actualCur;
            GM_setValue("Config.readPoint", finalCur);
            FuckD.bing.sendMSG = `📖阅读任务已完成！\n✨今日阅读奖励：${finalCur}/${max}`;
            FuckF.log("🔵", FuckD.bing.sendMSG, true);
            FuckF.send(FuckD.wh);
        }
        return true;
    } catch (e) {
        FuckF.log("🔴", `阅读任务出错！🔛${e.message}`);
        FuckD.read.times++;
        return false;
    }
}

// 构建 Next.js 新版路由状态树（next-router-state-tree 请求头）
FuckF.getRouterStateTree = (segment) => {
    const refreshFlag = 4096;
    const tree = ["", {
        children: ["(nav)", {
            children: [segment, { children: ["PAGE", {}, null, null, refreshFlag] }, null, null, refreshFlag]
        }, null, null, refreshFlag]
    }, null, null, refreshFlag + 16];
    return encodeURIComponent(JSON.stringify(tree));
}

// 清除 action 标识缓存（404 时调用，下次运行重新提取）
FuckF.clearActionCache = () => {
    GM_setValue("Config.actionMap", "");
    GM_setValue("Config.actionId", "");
    GM_setValue("Config.actionBuild", "");
    GM_setValue("Config.actionDpl", "");
}

// 从 rewards.bing.com 页面引用的 JS 包中动态提取 server action ID 映射表
// 微软每次重新部署站点都会变更这些 ID，硬编码会导致交卷/领取请求 404
// 返回 { ids: { reportActivity, reportClaimAllPoints, ... }, dpl }
FuckF.getRewardsAction = async (htmls) => {
    const REQUIRED_ACTIONS = ["reportActivity", "reportClaimAllPoints"];
    const cached = {
        build: GM_getValue("Config.actionBuild", ""),
        map: GM_getValue("Config.actionMap", ""),
        id: GM_getValue("Config.actionId", ""),
        dpl: GM_getValue("Config.actionDpl", ""),
    };
    let cachedMap = {};
    try { cachedMap = JSON.parse(cached.map) || {}; } catch {}
    if (!cachedMap.reportActivity && cached.id) cachedMap.reportActivity = cached.id;
    try {
        let combined = (htmls || []).filter(Boolean).join("\n");
        let dpl = combined.match(/[?&](?:amp;)?dpl=([A-Za-z0-9._-]+)/i)?.[1] || "";
        let build = dpl || combined.match(/\/_next\/static\/([A-Za-z0-9._-]+)\//)?.[1] || "";
        // 缓存含交卷标识且构建未变化（或未提供页面、无从判断）时直接复用，避免重复抓取 JS 包
        // 领取标识缺失不阻断缓存，taskClaim 有已知标识兜底
        // [PATCH] 站点下线领取 Server Action 后，页面里不再有 pointClaim / ClaimAllPoints。
        // 此时若继续用缓存里的旧领取标识，会导致每次运行都 POST 到已失效的 action → 500。
        // 判据：调用方确实传入了页面 HTML 且页面里已无任何领取痕迹 → 作废缓存的领取标识。
        const cacheOK = cached.build && cachedMap.reportActivity;
        if (cacheOK && (!build || build === cached.build)) {
            const pageSaysClaimGone = combined.length > 0 && !/pointClaim|ClaimAllPoints|claimAllPoints/i.test(combined);
            if (pageSaysClaimGone) {
                delete cachedMap.reportClaimAllPoints;
                cachedMap.__claimGone = true;
                FuckF.log("🟡", "页面已无领取动作标识，判定站点下线该功能，作废旧缓存");
            }
            // [PATCH] Next.js Server Action 校验 x-deployment-id，站点每次部署都会变更。
            // 旧代码写成 cached.dpl || dpl，优先返回过期部署 ID，导致所有交卷请求 500。
            // 有实时 dpl 时必须用实时的；只有拿不到页面时才退回缓存值。
            return { ids: cachedMap, dpl: dpl || cached.dpl || "" };
        }
        // 未提供页面 HTML 时（如领取任务单独调用）自行抓取
        if (!combined) {
            try {
                const dashHtml = await FuckF.xhr({ url: "https://rewards.bing.com/dashboard" });
                const earnHtml = await FuckF.xhr({ url: "https://rewards.bing.com/earn" });
                combined = [dashHtml, earnHtml].filter(Boolean).join("\n");
                dpl = combined.match(/[?&](?:amp;)?dpl=([A-Za-z0-9._-]+)/i)?.[1] || "";
                build = dpl || combined.match(/\/_next\/static\/([A-Za-z0-9._-]+)\//)?.[1] || "";
            } catch {}
        }
        const chunkSet = new Set();
        const chunkRegex = /(?:\/_next\/)?(static\/(?:chunks|immutable|media)\/[\w\-./()]+?\.js)/g;
        let chunkMatch;
        while ((chunkMatch = chunkRegex.exec(combined)) !== null) {
            chunkSet.add("/_next/" + chunkMatch[1]);
        }
        // 从 webpack 运行时清单中枚举按需加载的动态分包（领取组件等不在初始分包中）
        // 新版分包哈希已非纯十六进制（如 4ds1xh5s3），放宽字符集
        const extractDynamicCandidates = (text, set) => {
            const re = /\b(\d{2,6}):"([a-z0-9_-]{8,})"/g;
            let m;
            while ((m = re.exec(text)) !== null) {
                set.add(`/_next/static/chunks/${m[1]}-${m[2]}.js`);
                set.add(`/_next/static/chunks/${m[1]}.${m[2]}.js`);
            }
        }
        // 页面相关静态分包优先
        const queue = [...chunkSet].sort((a, b) => {
            const score = (x) => /(dashboard|earn|page|layout|nav)/i.test(x) ? 0 : 1;
            return score(a) - score(b);
        }).slice(0, 40);
        const dynSeed = new Set();
        extractDynamicCandidates(combined, dynSeed);
        queue.push(...dynSeed);
        // 已知历史领取分包兜底（CDN 保留旧分包，新版清单不可枚举时仍可从中提取领取标识）
        queue.push("/_next/static/chunks/4069k0g6u-2ge.js");
        const hex = "[a-f0-9]{40,64}";
        const createRegex = new RegExp(`createServerReference\\s*\\)?\\s*\\(\\s*"(${hex})"([\\s\\S]{0,800}?)\\)`, "g");
        const registerRegex = new RegExp(`registerServerReference\\s*\\)?\\s*\\([^,]+,\\s*"(${hex})"([\\s\\S]{0,800}?)\\)`, "g");
        const nonNames = ["callServer", "findSourceMapURL", "encodeFormAction", "default"];
        const scanChunk = (js, map) => {
            for (const regex of [createRegex, registerRegex]) {
                regex.lastIndex = 0;
                let m;
                while ((m = regex.exec(js)) !== null) {
                    const names = [...(m[2] || "").matchAll(/"([A-Za-z_$][\w$]*)"/g)]
                        .map(x => x[1])
                        .filter(n => !nonNames.includes(n) && n.length > 3);
                    const name = names[names.length - 1];
                    if (name && !map[name]) map[name] = m[1];
                }
            }
        }
        const actionMap = {};
        const visited = new Set();
        let fetched = 0;
        const maxFetch = 100;
        while (queue.length && fetched < maxFetch) {
            const path = queue.shift();
            if (visited.has(path)) continue;
            visited.add(path);
            fetched++;
            try {
                const js = await FuckF.xhr({ url: `https://rewards.bing.com${path}` });
                if (!js) continue;
                scanChunk(js, actionMap);
                if (!REQUIRED_ACTIONS.every(k => actionMap[k])) {
                    // 已抓分包中可能含有更完整的动态分包清单，持续发现
                    const more = new Set();
                    extractDynamicCandidates(js, more);
                    for (const p of more) {
                        if (!visited.has(p) && !queue.includes(p)) queue.push(p);
                    }
                }
                if (REQUIRED_ACTIONS.every(k => actionMap[k])) break;
            } catch {}
        }
        if (actionMap.reportActivity) {
            GM_setValue("Config.actionBuild", build);
            GM_setValue("Config.actionMap", JSON.stringify(actionMap));
            GM_setValue("Config.actionDpl", dpl);
            FuckF.log("🧩", `服务端标识更新成功（build：${build || "未知"}，动作数：${Object.keys(actionMap).length}）`);
            return { ids: actionMap, dpl };
        }
        FuckF.log("🟡", "未能从页面 JS 包中提取服务端标识，使用缓存/默认值");
    } catch (e) {
        FuckF.log("🟡", `服务端标识获取出错！🔛${e.message}`);
    }
    return { ids: cachedMap, dpl: cached.dpl || "" };
}
// ---- 稳健提取数组（括号配平，不依赖固定锚点如 "discovery"，上游 3.6.50 合并）----
FuckF.extractArrayAfterKey = function(html, key) {
    const marker = '"' + key + '":';
    const idx = html.indexOf(marker);
    if (idx === -1) return null;
    let i = html.indexOf('[', idx);
    if (i === -1) return null;
    let depth = 0, inStr = false, esc = false;
    for (let j = i; j < html.length; j++) {
        const c = html[j];
        if (inStr) {
            if (esc) esc = false;
            else if (c === '\\') esc = true;
            else if (c === '"') inStr = false;
        } else {
            if (c === '"') inStr = true;
            else if (c === '[') depth++;
            else if (c === ']') { depth--; if (depth === 0) return html.slice(i, j + 1); }
        }
    }
    return null;
};

// ---- 日期归一化为 YYYYMMDD，解析失败返回 null（上游 3.6.50 合并）----
FuckF.normalizeDate = function(d) {
    if (d == null) return null;
    let m = String(d).match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);          // M/D/YYYY 或 MM/DD/YYYY
    if (m) return Number(m[3] + String(m[1]).padStart(2, '0') + String(m[2]).padStart(2, '0'));
    m = String(d).match(/(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);            // YYYY-M-D 或 YYYY/MM/DD
    if (m) return Number(m[1] + String(m[2]).padStart(2, '0') + String(m[3]).padStart(2, '0'));
    const t = Date.parse(d);
    if (!isNaN(t)) { const dt = new Date(t); return Number(dt.getFullYear() + String(dt.getMonth()+1).padStart(2, '0') + String(dt.getDate()).padStart(2, '0')); }
    return null;
};

// ---- 每日额外积分（仅当 dashboard 页面打开时，按 XPath 点击按钮，上游 3.6.50 合并）----
FuckF.claimExtraPoints = async () => {
    if (!FuckD.tasks.bonus) return;
    const todayNum = FuckF.getDatetime(true);
    if (GM_getValue("Config.bonusDate", 0) == todayNum) {
        GM_log("每日额外积分今日已领取，跳过");
        return;
    }
    const xpath = "/html/body/div[2]/div[2]/div/main/div/button[2]/div/div";
    const findBtn = () => {
        let btn = null;
        try {
            btn = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        } catch (e) {}
        if (btn && btn.offsetParent !== null) return btn;          // 仅当按钮可见才点击
        const fallbacks = ["main button", "div[class*='bonus'] button", "button[class*='reward']"];
        for (const sel of fallbacks) {
            const els = document.querySelectorAll(sel);
            for (const el of els) {
                const txt = (el.innerText || el.textContent || "").replace(/\s/g, "");
                if (/额外/.test(txt)) return el;   // 仅匹配含"额外"的按钮，避免误点页面其它"积分"按钮
            }
        }
        return null;
    };
    let tries = 0;
    const tick = () => {
        const btn = findBtn();
        if (btn) {
            btn.click();
            GM_setValue("Config.bonusDate", todayNum);
            FuckF.log("🎉", "已点击每日额外积分按钮");
            return;
        }
        if (tries++ < 40) setTimeout(tick, 1000);
        else FuckF.log("🟡", "未找到每日额外积分按钮（XPath 可能已变更），请反馈页面结构");
    };
    tick();
};

FuckF.taskPromos = async () => {
    if (!FuckD.tasks.promos || FuckD.promos.times > 2 || FuckD.promos.end > 0 || (!GM_getValue("Config.keep", true) && FuckD.promos.date == FuckD.bing.dateNowNum)) {
        FuckD.promos.end++;
        return true;
    }
    let promosArr = [];
    let seenIds = new Set();
    let dashPoints = 0, dashMax = 0;
    let earnPoints = 0, earnMax = 0;
    let dashHtml = "", earnHtml = "";
    // 锁定任务（unlockCriteria: rewardsApp / isLocked: true，需在必应 Windows App 登录账号后解锁点击）：
    // 网页端 server action 与 dapi 通道都无法记账（destination 带 rnoreward=1，网页端完成不给分），
    // 而服务端始终不标记完成，脚本每轮 cron 都会重复执行并重复推送，故解析阶段直接排除。
    const isLockedCard = (c) => {
        if (!c) return false;
        // 结构化字段明确表示未解锁条件为无时，不因 offerId 模式误伤（微软若放开网页端完成可自动恢复执行）
        const noUnlockCriteria = !c.unlockCriteria || c.unlockCriteria === "$undefined";
        if (c.isLocked === false && c.isUnlocked !== false && noUnlockCriteria) return false;
        return c.isLocked === true ||
            c.isUnlocked === false ||
            (typeof c.unlockCriteria === "string" && !noUnlockCriteria) ||
            /Moreactivities_RewardsApp/i.test(c.offerId || c.name || "");
    };
    // 注意：完成报告位于 try 块之外，计数必须声明在函数作用域，否则报告阶段会 ReferenceError
    let lockedCount = 0;
    let lockedPoints = 0;
    try {
        dashHtml = await FuckF.xhr({ url: "https://rewards.bing.com/dashboard" });
        lastRewardHtml.dash = dashHtml;
        const cleanDash = dashHtml.replace(/\\"/g, '"');
        const todayNum = FuckD.bing.dateNowNum;
        let dailySetItems = [];
        const dashRaw = FuckF.extractArrayAfterKey(cleanDash, "dailySetItems");
        if (dashRaw) {
            try { dailySetItems = JSON.parse(dashRaw.replace(/\\"/g, '"')); }
            catch (e) { FuckF.log("🟡", `dailySetItems 解析失败，尝试兜底旧写法 🔛${e.message}`); }
        }
        if (!dailySetItems.length) {
            // 兜底：兼容旧版带 "discovery" 锚点的写法
            const legacy = cleanDash.match(/"dailySetItems":(\[.*?\]),"discovery"/);
            if (legacy && legacy[1]) { try { dailySetItems = JSON.parse(legacy[1].replace(/\\"/g, '"')); } catch (e) {} }
        }
        for (const item of dailySetItems) {
            if (item.points === 0 || seenIds.has(item.offerId)) continue;
            if (isLockedCard(item)) {
                lockedCount++;
                lockedPoints += item.points || 0;
                seenIds.add(item.offerId);
                continue;
            }
            const itemDate = FuckF.normalizeDate(item.date);
            if (itemDate !== null && itemDate !== todayNum) continue;   // 解析不出日期则不跳过，避免误杀今日活动
            seenIds.add(item.offerId);
            dashMax += item.points;
            if (item.isCompleted) {
                dashPoints += item.points;
            } else {
                promosArr.push({
                    id: item.offerId,
                    hash: item.hash,
                    url: "https://rewards.bing.com/dashboard",
                    points: item.points,
                    type: "dash"
                });
            }
        }
        earnHtml = await FuckF.xhr({ url: "https://rewards.bing.com/earn" });
        lastRewardHtml.earn = earnHtml;
        const cleanEarn = earnHtml.replace(/\\"/g, '"');
        const daysEn = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const todayDayEn = daysEn[new Date().getDay()];
        const skipCompletedFilter = (offerId) => {
            if (offerId.includes("Evergreen") && !offerId.includes(todayDayEn)) return true;
            const dateMatch = offerId.match(/(20\d{6})/);
            if (dateMatch && dateMatch[1] !== FuckD.bing.dateNowNum.toString()) return true;
            if (/(w[1-5]|week|month)/i.test(offerId) || /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\d{2}/i.test(offerId)) return true;
            return false;
        };
        // 优先结构化解析 activityCards：只有这样才能读到 isLocked / isUnlocked / unlockCriteria
        let earnCards = null;
        const earnCardsRaw = FuckF.extractArrayAfterKey(cleanEarn, "activityCards");
        if (earnCardsRaw) {
            try {
                const arr = JSON.parse(earnCardsRaw.replace(/\\"/g, '"'));
                if (Array.isArray(arr) && arr.length) earnCards = arr;
            } catch (e) {}
        }
        if (earnCards) {
            for (const card of earnCards) {
                const points = parseInt(card.points) || 0;
                const offerId = card.offerId || card.name || "";
                if (points === 0 || !offerId || seenIds.has(offerId)) continue;
                if (isLockedCard(card)) {
                    lockedCount++;
                    lockedPoints += points;
                    seenIds.add(offerId);
                    continue;
                }
                if (card.isCompleted && skipCompletedFilter(offerId)) continue;
                seenIds.add(offerId);
                earnMax += points;
                if (card.isCompleted) {
                    earnPoints += points;
                } else {
                    promosArr.push({
                        id: offerId,
                        hash: card.hash || "",
                        url: "https://rewards.bing.com/earn",
                        points: points,
                        type: "earn"
                    });
                }
            }
        } else if (cleanEarn.includes('"activityCards":[')) {
            const taskRegex = /"isCompleted":(true|false).*?"points":(\d+).*?"offerId":"([^"]+)","hash":"([^"]+)"/g;
            let match;
            while ((match = taskRegex.exec(cleanEarn)) !== null) {
                const isCompleted = match[1] === "true";
                const points = parseInt(match[2]);
                const offerId = match[3];
                const hash = match[4];
                if (points === 0 || seenIds.has(offerId)) continue;
                // 正则读不到结构化字段，退回上下文扫描 + offerId 模式排除 App 锁定任务
                const ctx = cleanEarn.substring(Math.max(0, match.index - 500), match.index + 500);
                if (/Moreactivities_RewardsApp/i.test(offerId) || /"unlockCriteria":"[^"]+"/.test(ctx) || /"isLocked":true/.test(ctx)) {
                    lockedCount++;
                    lockedPoints += points;
                    seenIds.add(offerId);
                    continue;
                }
                if (isCompleted && skipCompletedFilter(offerId)) continue;
                seenIds.add(offerId);
                earnMax += points;
                if (isCompleted) {
                    earnPoints += points;
                } else {
                    promosArr.push({
                        id: offerId,
                        hash: hash,
                        url: "https://rewards.bing.com/earn",
                        points: points,
                        type: "earn"
                    });
                }
            }
        }
    } catch (e) {
        FuckF.log("🔴", `活动解析出错！🔛${e.message}`);
    }
    const todayPromosSaved = FuckD.promos.date == FuckD.bing.dateNowNum ? GM_getValue("Config.promosPoint", 0) : 0;
    GM_setValue("Config.promosPoint", Math.max(todayPromosSaved, dashPoints + earnPoints));
    const dashTasks = promosArr.filter(i => i.type === 'dash').length;
    const earnTasks = promosArr.filter(i => i.type === 'earn').length;
    const totalNewTasks = dashTasks + earnTasks;
    if (totalNewTasks < 1) {
        FuckD.promos.end++;
        if (FuckD.promos.date != FuckD.bing.dateNowNum) {
            FuckD.promos.date = FuckD.bing.dateNowNum;
            GM_setValue("Config.tasks", FuckD.bing.tasks);
            const dashReport = dashMax > 0 ? `\n📱手机端活动：${dashPoints}/${dashMax}` : "";
            const earnReport = earnMax > 0 ? `\n💻电脑端活动：${earnPoints}/${earnMax}` : "";
            const lockedReport = lockedCount > 0 ? `\n🔒${lockedCount} 个任务需在必应 App 完成（${lockedPoints} 分），已跳过` : "";
            FuckD.bing.sendMSG = `🧩活动任务已完成！${dashReport}${earnReport}${lockedReport}`;
            FuckF.log("🔵", FuckD.bing.sendMSG, true);
            FuckF.send(FuckD.wh);
        }
        return true;
    }
    try {
        const envStatus = await FuckF.mainlandCheck();
        if (envStatus === 1) {
            FuckD.bing.code = -1;
            return true;
        }
        FuckD.promos.date = 0;
        const actionInfo = await FuckF.getRewardsAction([dashHtml, earnHtml]);
        const actionId = actionInfo.ids.reportActivity || "70babbc81d2724f60d29a95c03b3d739cba77cea92";
        if (lockedCount > 0) FuckF.log("🔒", `跳过 ${lockedCount} 个需在必应 App 解锁的任务（${lockedPoints} 分，网页端无法完成）`);
        const taskMsgs = [];
        if (dashTasks > 0) taskMsgs.push(`${dashTasks}个手机端活动`);
        if (earnTasks > 0) taskMsgs.push(`${earnTasks}个电脑端活动`);
        FuckF.log("🧩", `检测到有${taskMsgs.join("、")}未完成，开始执行...`);
        await new Promise(resolve => setTimeout(resolve, 500));
        let dashCurrent = 1;
        let earnCurrent = 1;
        let skipped = 0;
        for (const item of promosArr) {
            if (item.type === 'dash') {
                FuckF.log("📱", `正在执行第${dashCurrent}/${dashTasks}个手机端活动...`);
                dashCurrent++;
            } else {
                FuckF.log("💻", `正在执行第${earnCurrent}/${earnTasks}个电脑端活动...`);
                earnCurrent++;
            }
            const reqHeaders = {
                "content-type": "text/plain;charset=UTF-8",
                "next-action": actionId,
                "referer": item.url,
                // 显式覆盖 origin：扩展 service_worker 请求被浏览器自动附带 Origin: chrome-extension://<id>，
                // 风控账号的 server action 对非站点同源 origin 直接抛 500（对照实验证实），
                // 若运行环境允许覆盖该头则可直接走通网页通道
                "origin": "https://rewards.bing.com",
                "next-router-state-tree": FuckF.getRouterStateTree(item.type === 'dash' ? "dashboard" : "earn"),
            };
            if (actionInfo.dpl) {
                reqHeaders["x-deployment-id"] = actionInfo.dpl;
            }
            const postData = JSON.stringify([
                item.hash,
                11,
                { "offerid": item.id, "isPromotional": "$undefined", "timezoneOffset": "-480" }
            ]);
            let posted = false;
            // [PATCH] 2026-11 起 rewards.bing.com 的 Server Action POST 通道在网关层被整条拦截：
            // 无论 next-action 是真实 id、过期 id 还是伪造 id，都返回同一个 Bing 500 错误页
            // （"It's not you, it's us"，x-cache: CONFIG_NOCACHE），与动作标识/deployment-id 无关。
            // 对照实验：同一时刻 dapi/me/activities（type 101 + offerid）返回 code=0 并即时记账。
            // 因此默认直接走 APP 通道，网页通道仅在用户显式开启时才尝试，避免每轮白跑 3 次必失败请求。
            const tryWebChannel = GM_getValue("Config.webAction", false);
            if (tryWebChannel) {
                for (let attempt = 1; attempt <= 3 && !posted; attempt++) {
                    try {
                        await FuckF.xhr({
                            method: "POST",
                            url: item.url,
                            headers: reqHeaders,
                            data: postData,
                        });
                        posted = true;
                    } catch (e) {
                        if (e.message.includes("404")) throw e;
                        if (attempt === 3) {
                            FuckF.log("🟡", `活动 ${item.id} 网页通道3次尝试失败：${e.message}`);
                        } else {
                            await new Promise(resolve => setTimeout(resolve, FuckF.getScopeRandomNum(2000, 4000)));
                        }
                    }
                }
            }
            // 网页通道失败/跳过且 token 可用时改走 dapi APP 通道（type 101 + offerid，幂等、即时记账，不做 origin 校验）；
            // 注意 renewToken 仅在签入/阅读任务启用时执行，必须先判 token 空
            let appPoint = -1;
            if (!posted && FuckD.bing.token) {
                try {
                    const region = FuckD.bing.status ? "cn" : (FuckD.bing.region || "").toLowerCase();
                    const dapiResp = await FuckF.reportViaAppChannel({ type: 101, attributes: { offerid: item.id }, region });
                    if (dapiResp && FuckF.isJSON(dapiResp)) {
                        const res = JSON.parse(dapiResp);
                        const act = res.response?.activity;
                        const dup = res.response?.isDuplicate === true;
                        // 关键：不能只看 code===0。实测某些项（如 Gamification_DailySet_*_Child1）
                        // 会返回 code=0 + activity 对象，但 activity.p=0、余额不增加——
                        // 只判 code 会把「接口接受但没给分」当成完成，导致假完成、后续不再重试。
                        if (res.code === 0 && act && !dup && Number(act.p) > 0) {
                            posted = true;
                            appPoint = Number(act.p);
                            FuckF.log("🟢", `活动 ${item.id} 已切换到APP通道完成（+${appPoint}）`);
                        } else if (res.code === 0 && act && !dup && !(Number(act.p) > 0)) {
                            FuckF.log("🟡", `活动 ${item.id} APP通道已接受但未记账（p=0），保留待下轮重试`);
                        } else {
                            FuckF.log("🟡", `活动 ${item.id} APP通道响应异常（code=${res.code}${dup ? "，判重" : ""}）`);
                        }
                    }
                } catch (e) {
                    FuckF.log("🟡", `活动 ${item.id} APP通道兜底失败：${e.message}`);
                }
            }
            if (!posted) {
                // 双通道均失败：跳过该项继续队列，不累计积分，由下轮运行补做
                skipped++;
                FuckF.log("🔴", `活动 ${item.id} 两个通道都失败，跳过该任务`);
                continue;
            }
            // 分值以服务端返回的 p 为准（APP 通道），网页通道成功时用卡片声明值
            const credited = appPoint > 0 ? appPoint : item.points;
            if (item.type === 'dash') {
                dashPoints += credited;
            } else {
                earnPoints += credited;
            }
            GM_setValue("Config.promosPoint", Math.max(todayPromosSaved, dashPoints + earnPoints));
            // 记入台账：活动通道（网页/APP）的到账同样要进每日对账
            FuckF.ledgerAdd(item.id, credited);
            if (dashCurrent - 1 + earnCurrent - 1 < totalNewTasks) {
                await new Promise(resolve => setTimeout(resolve, FuckF.getScopeRandomNum(2000, 4000)));
            }
        }
        // 复核：交卷后重拉 dashboard 核对每日活动完成状态，及早发现交卷标识失效（上游 3.6.50 合并）
        if (dashTasks > 0) {
            try {
                const reHtml = await FuckF.xhr({ url: "https://rewards.bing.com/dashboard" });
                const reClean = reHtml.replace(/\\"/g, '"');
                const reRaw = FuckF.extractArrayAfterKey(reClean, "dailySetItems");
                if (reRaw) {
                    const reItems = JSON.parse(reRaw.replace(/\\"/g, '"'));
                    const stillOpen = reItems.filter(x => !x.isCompleted && (x.points > 0) && (FuckF.normalizeDate(x.date) === FuckD.bing.dateNowNum)).length;
                    if (stillOpen > 0) FuckF.log("🟡", `复核发现仍有 ${stillOpen} 个每日活动未完成，交卷标识可能已失效`);
                }
            } catch (e) {}
        }
        if (skipped > 0) {
            // 有未记账/失败的项：不标记完成，下轮定时运行自动补做。
            // 注意不能无限重试：cron 每 20 分钟一轮，整夜空转既无意义也增加风控面。
            // 用独立计数 Config.promosRetry（按日期重置），上限 8 轮；FuckD.promos.times 的 >2 是原版给
            // 「本轮内重试」用的，不该被跨轮次的补做消耗掉，否则第 3 轮之后就永久放弃。
            const retry = (() => {
                let r = GM_getValue("Config.promosRetry", null);
                if (!r || r.date != FuckD.bing.dateNowNum) r = { date: FuckD.bing.dateNowNum, n: 0 };
                return r;
            })();
            retry.n++;
            GM_setValue("Config.promosRetry", retry);
            if (retry.n >= 8) {
                FuckF.log("🟡", `有 ${skipped} 个活动连续 ${retry.n} 轮未记账，今日停止重试（可能需在 App 内完成或站点限制）`);
                FuckD.promos.end++;
                return true;
            }
            FuckF.log("🟡", `有 ${skipped} 个活动未记账（网页与 APP 通道均未给分），等待下轮重试（${retry.n}/8）`);
            return false;
        }
        FuckD.promos.end++;
        if (FuckD.promos.date != FuckD.bing.dateNowNum) {
            FuckD.promos.date = FuckD.bing.dateNowNum;
            GM_setValue("Config.tasks", FuckD.bing.tasks);
            const dashReport = dashMax > 0 ? `\n📱手机端活动：${dashPoints}/${dashMax}` : "";
            const earnReport = earnMax > 0 ? `\n💻电脑端活动：${earnPoints}/${earnMax}` : "";
            const lockedReport = lockedCount > 0 ? `\n🔒${lockedCount} 个任务需在必应 App 完成（${lockedPoints} 分），已跳过` : "";
            FuckD.bing.sendMSG = `🧩活动任务已完成！${dashReport}${earnReport}${lockedReport}`;
            FuckF.log("🔵", FuckD.bing.sendMSG, true);
            FuckF.send(FuckD.wh);
        }
        return true;
    } catch (e) {
        FuckF.log("🔴", `活动交卷出错！🔛${e.message}`);
        if (e.message.includes("404")) {
            // 标识已失效，清除缓存以便下次运行重新提取
            FuckF.clearActionCache();
        }
    }
    FuckD.promos.times++;
    return false;
}

// dapi APP 通道活动上报（与阅读/打卡同链路）：type 101 + offerid，服务端即时记账、幂等、不做 origin 校验。
// APP通道兜底：网页端Server Action被风控拦截(500)时，改用必应APP端API上报活动
FuckF.reportViaAppChannel = async ({ type, attributes = {}, region }) => {
    return await FuckF.xhr({
        method: "POST",
        url: "https://prod.rewardsplatform.microsoft.com/dapi/me/activities",
        headers: {
            "content-type": "application/json; charset=UTF-8",
            "user-agent": FuckD.ua.m,
            "authorization": `Bearer ${FuckD.bing.token}`,
            "x-rewards-appid": "SAAndroid/31.4.2110003555",
            "x-rewards-ismobile": "true",
            "x-rewards-country": region,
        },
        data: JSON.stringify({
            "amount": 1,
            "country": region,
            "id": FuckF.getRandomUUID(),
            "type": type,
            "attributes": attributes,
        }),
    });
};

// 读取当前积分余额（dapi 通道，需 token）。
// 用途：上报类任务的响应只给「本次分值」，无法证明服务端真的记账；
// 用余额前后差值做二次校验，才能区分「接口返回 ok」和「积分真的到账」。
FuckF.readBalance = async () => {
    if (!FuckD.bing.token) return null;
    try {
        const raw = await FuckF.xhr({
            url: "https://prod.rewardsplatform.microsoft.com/dapi/me?channel=SAAndroid&options=Promotions",
            headers: {
                "content-type": "application/json; charset=UTF-8",
                authorization: `Bearer ${FuckD.bing.token}`,
                "x-rewards-appid": "SAAndroid/31.4.2110003555",
                "x-rewards-ismobile": "true",
                "x-rewards-country": FuckD.bing.status ? "cn" : ((FuckD.bing.region || "").toLowerCase() || "cn"),
                "user-agent": FuckD.ua.m,
                accept: "*/*",
            },
        });
        const m = String(raw || "").match(/"balance":(\d+)/);
        return m ? Number(m[1]) : null;
    } catch (e) { return null; }
};

// 每日台账：按任务名累计当日到账，用于跨轮次对账。
// 收割（dapi 直报）与活动任务（网页/APP 通道）都会写这里，避免汇总只统计一半。
FuckF.ledgerAdd = (name, point) => {
    try {
        const today = FuckD.bing.dateNowNum;
        let l = GM_getValue("Config.ledger", null);
        if (!l || l.date != today || typeof l.items !== "object") l = { date: today, items: {}, total: 0 };
        const key = String(name || "unknown").replace(/^Gamification_DailySet_[A-Z]+_\d+_/, "DailySet_");
        l.items[key] = (l.items[key] || 0) + (Number(point) || 0);
        l.total += (Number(point) || 0);
        GM_setValue("Config.ledger", l);
    } catch (e) {}
};

// ===== [PATCH] Bing 首页问答（HPQuiz）=====
// 技术来源：脚本猫「微软积分商城签到（改进加强版）」3.6.73 的实现思路（GPL-3.0 系脚本，此处为独立重写）。
// 这套接口是另一条独立的得分通道，与本脚本原先依赖的 rewards.bing.com Server Action 无关，
// 因此在网页通道被网关拦死后仍然可用。
//
// 链路（每道题三步，缺一步不记账）：
//   1. 访问答案页   —— 服务端在 answerChoices[].requeryUrl 里下发的计分 URL，
//                      其中 WQSCOREVALUE 占位符必须替换为「当前累计答对题数」，否则第 2 题起不计分
//   2. 记录投票     —— POST funapi/api/quiz/record，PartnerId=BingQAUX
//   3. 上报积分     —— POST rewardsapp/reportActivity（先 GET 同路径初始化 rewards 会话）
//
// 关键细节（都是踩过的坑）：
//   · x-search-clientid 必须等于浏览器 MUID cookie，随手编一个随机值服务端不计分
//   · 全程用 BingSapphire App UA，普通桌面 UA 不计分
//   · authtoken 是 funapi 的固定应用令牌，随 App 版本变更
//   · 进度按账号 EPuid 隔离，否则切账号后会继承「已答完」状态而跳过
FuckF.getBingCookie = (name) => new Promise((resolve) => {
    // service_worker 下 GM_cookie 回调可能永不触发，2.5s 超时兜底
    let settled = false;
    const finish = (v) => { if (!settled) { settled = true; resolve(v || ""); } };
    setTimeout(() => finish(""), 2500);
    try {
        if (typeof GM_cookie === "undefined") return finish("");
        const cb = (cookie) => finish(cookie && cookie.value ? String(cookie.value) : "");
        try { GM_cookie.get({ url: "https://www.bing.com", name }, cb); }
        catch (e) { GM_cookie.get(name, cb); }
    } catch (e) { finish(""); }
});

FuckF.QUIZ_KEY = "Config.quiz";
let hpQuizRunning = false;
FuckF.taskHPQuiz = async () => {
    if (!GM_getValue("Harvest.quiz", true)) return true;
    // 连续未入账后的自动停跑标记（独立键，避免与 UserConfig 的 Harvest.quiz 冲突）
    if (GM_getValue("Config.quizDisabled", false)) return true;
    // HPQuiz 走 bing.com 的 cookie 会话，不使用 dapi token，也不依赖 FuckD.bing.host
    // （该字段在 tasksStart 里才赋值，而本函数在更早的外层流程就会被调用，不能依赖它）
    if (hpQuizRunning) return true;
    hpQuizRunning = true;
    try {
        return await FuckF.taskHPQuizInner();
    } finally {
        hpQuizRunning = false;
    }
};

FuckF.taskHPQuizInner = async () => {
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    const quizServiceUrl = "https://www.bing.com/funapi/api/v1/QuizService/GetContent";
    const recordUrl = "https://www.bing.com/funapi/api/quiz/record?ajaxreq=1";
    const reportUrl = "https://www.bing.com/rewardsapp/reportActivity";
    const authtoken = "321530aa-bbed-4376-a7f1-1c6fd7d2ca2b";
    const appUA = "Mozilla/5.0 (Linux; Android 14; MEIZU 21 Build/UKQ1.230917.001; ) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/117.0.0.0 Mobile Safari/537.36 BingSapphire/32.6.2110003561";
    // 全部端点固定走 www.bing.com（实测 funapi / reportActivity 均在此域可用）
    const searchHost = "www.bing.com";

    try {
        // MUID 决定 x-search-clientid，服务端据此判断会话归属；取不到会导致不计分。
        // service worker 下 GM_cookie 不可靠（实测无 .get 方法、回调超时），
        // 退而求其次：从 bing.com 响应头的 Set-Cookie 里取 MUIDB（与 MUID 同值）。
        const [muidCookie, ssCookie] = await Promise.all([
            FuckF.getBingCookie("MUID"),
            FuckF.getBingCookie("_SS"),
        ]);
        let muid = muidCookie || "";
        if (!muid) {
            try {
                const probe = await FuckF.xhr({
                    url: "https://www.bing.com/",
                    headers: { "User-Agent": appUA },
                });
                muid = (probe.match(/MUIDB=([A-F0-9]{32})/i) || [])[1] || "";
            } catch (e) {}
        }
        if (muid) GM_setValue("Config.MUID", muid);
        const userId = (muid || GM_getValue("Config.MUID", "") || FuckF.getRandomUUID(true)).toUpperCase();
        const sid = (ssCookie.match(/SID=([^&;]+)/) || [])[1] || "";
        const clientHeader = muid ? { "x-search-clientid": muid.toUpperCase() } : {};

        // rewards 会话初始化 + 积分上报（两者必须成对，缺初始化则上报无效）
        const reportActivity = async (targetUrl) => {
            try {
                await FuckF.xhr({
                    url: reportUrl,
                    headers: { "User-Agent": appUA, "x-search-market": "zh-CN", ...clientHeader, "Referer": `https://${searchHost}/` },
                });
            } catch (e) {}
            try {
                await FuckF.xhr({
                    method: "POST",
                    url: reportUrl,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                        "User-Agent": appUA, "Accept": "*/*", "request_user_info": "true",
                        "x-search-market": "zh-CN", ...clientHeader, "Referer": `https://${searchHost}/`,
                    },
                    data: `url=${encodeURIComponent(targetUrl)}&V=web`,
                });
            } catch (e) {}
        };

        // 建会话并取账号标识（用于进度隔离）
        let accountKey = "";
        try {
            const sessionResp = await FuckF.xhr({
                url: reportUrl,
                headers: { "User-Agent": appUA, "x-search-market": "zh-CN", ...clientHeader, "Referer": `https://${searchHost}/` },
            });
            if (sessionResp) {
                accountKey = (sessionResp.match(/"EPuid":"([^"]+)"/) || [])[1] || "";
                const auth = (sessionResp.match(/"IsAuthenticated":(\w+)/) || [])[1] || "";
                if (auth === "false") {
                    FuckF.log("🟡", "HPQuiz：bing.com 未登录，积分无法计入，跳过");
                    return true;
                }
            }
        } catch (e) {}

        // 当日进度（按账号隔离，跨运行续传）
        const today = FuckF.getDatetime(true);
        let st = GM_getValue(FuckF.QUIZ_KEY, false);
        if (!st || st.date != today || st.v != 4 || (accountKey && st.account !== accountKey)) {
            st = { v: 4, date: today, account: accountKey, submitted: [], done: false, key: "", point: 0 };
            GM_setValue(FuckF.QUIZ_KEY, st);
        }
        const save = () => GM_setValue(FuckF.QUIZ_KEY, st);
        if (st.done) {
            FuckF.log("🌐", "HPQuiz：今日问答已完成，跳过");
            return true;
        }
        FuckF.log("📝", `HPQuiz：开始检查今日问答（已答题 ${st.submitted.length} 道）`);

        // 今日首页图片 → quiz 标识
        const imgRaw = await FuckF.xhr({
            url: "https://www.bing.com/HPImageArchive.aspx?n=1&idx=-1&format=js&pid=opal&mbl=1",
            headers: { "User-Agent": appUA },
        });
        if (!imgRaw || !FuckF.isJSON(imgRaw)) {
            FuckF.log("🟡", "HPQuiz：首页图片接口无响应，跳过");
            return true;
        }
        const img = (JSON.parse(imgRaw).images || [])[0] || {};
        const quizPath = img.quiz || "";
        if (!quizPath) { st.done = true; save(); return true; }
        // HPImageArchive 的 quiz 字段会滞后一天（前一天图），只用于提示，不作匹配依据
        const quizCore = (quizPath.match(/HPQuiz_\d+_(\w+)/) || [])[1] || "";
        if (st.done && st.key === quizCore) return true;

        // 拉题目（含正确答案与 requeryUrl）
        const quizResp = await FuckF.xhr({
            method: "POST",
            url: quizServiceUrl,
            headers: { "Content-Type": "application/json; charset=utf-8", "User-Agent": appUA, "authtoken": authtoken },
            data: JSON.stringify({ PartnerName: "StartApp", Market: "zh-cn", QuizCategory: "HOMEPAGEQUIZ" }),
        });
        if (!quizResp || !FuckF.isJSON(quizResp)) {
            FuckF.log("🟡", "HPQuiz：题目接口无响应，跳过");
            return true;
        }
        const quizzes = (JSON.parse(quizResp).quizzes) || [];
        // QuizService 返回的是「今天的」quiz，而首页图片字段常是昨天的，
        // 因此优先按名称匹配，匹配不到就取第一个（每天只有一个 HomepageQuiz）
        const target = quizzes.find(q => quizCore && String(q.quizId || q.id || "").includes(quizCore)) || quizzes[0];
        if (!target) { FuckF.log("🟡", "HPQuiz：今日无问答任务"); st.done = true; save(); return true; }
        const questions = target.questions || [];
        if (!questions.length) { FuckF.log("🟡", "HPQuiz：题目列表为空"); st.done = true; save(); return true; }
        const quizName = target.quizId || quizCore || "unknown";
        if (st.done && st.key === quizName) return true;
        FuckF.log("📝", `HPQuiz：今日问答 ${quizName}，共 ${questions.length} 题`);

        // 先访问落地页并上报（服务端要求先有 landing 记录）
        const promo = target.promotionInfo || {};
        const attrs = target.attributes || {};
        const quizQuery = attrs.query || quizCore;
        let landingUrl = (promo.bingLandingUrl || "").trim().replace(/^https?:\/\/www\.bing\.com/, `https://${searchHost}`);
        if (!landingUrl) {
            const filters = `mgzv3configlist%3A%22BingQA_QuizLanding_Layout%22%20IsConversation%3A%22True%22%20WQOskey%3A%22${encodeURIComponent(target.quizId || quizPath)}%22%20WQId%3A%221%22`;
            landingUrl = `https://${searchHost}/search?q=${encodeURIComponent(quizQuery)}&filters=${filters}`;
        }
        landingUrl += `${landingUrl.includes("?") ? "&" : "?"}form=EWV001&ssp=1&safesearch=moderate&setlang=zh-hans&cc=CN&ensearch=0&PC=SANSAAND`;
        let referer = `https://${searchHost}/`;
        try {
            const finalUrl = await FuckF.xhr({
                url: landingUrl,
                headers: {
                    "User-Agent": appUA,
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
                    "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                    "x-requested-with": "com.microsoft.bing",
                    "Referer": referer,
                },
            }, true);
            await reportActivity(finalUrl || landingUrl);
            referer = finalUrl || landingUrl;
            await sleep(FuckF.getScopeRandomNum(800, 1800));
        } catch (e) {}

        // 逐题：访问答案页 → 记录投票 → 上报积分
        // 余额前后对比：HPQuiz 的投票接口只返回 ErrorCode，不返回本次到账积分，
        // 因此只能靠 dapi 余额差值判断是否真的入账。这一项会写进日志，便于每天核对。
        const readBalance = async () => {
            if (!FuckD.bing.token) return null;
            try {
                const raw = await FuckF.xhr({
                    url: "https://prod.rewardsplatform.microsoft.com/dapi/me?channel=SAAndroid&options=Promotions",
                    headers: {
                        "content-type": "application/json; charset=UTF-8",
                        authorization: `Bearer ${FuckD.bing.token}`,
                        "x-rewards-appid": "SAAndroid/31.4.2110003555",
                        "x-rewards-ismobile": "true",
                        "x-rewards-country": "cn",
                        "user-agent": appUA,
                        accept: "*/*",
                    },
                });
                const m = String(raw || "").match(/"balance":(\d+)/);
                return m ? Number(m[1]) : null;
            } catch (e) { return null; }
        };
        const balBefore = await readBalance();

        let ok = 0, gained = 0;
        for (let i = 0; i < questions.length; i++) {
            const q = questions[i];
            const questionText = q.questionText || "";
            const questionId = q.questionId || `${target.quizId || quizCore}_${i + 1}`;
            if (st.submitted.includes(questionId)) continue;

            // 定位正确答案序号（选项文本需带字母前缀，与抓包一致）
            const choices = q.answerChoices || [];
            const ci = choices.findIndex(c => c.isCorrectAnswer === true);
            if (ci < 0) continue;
            const choice = choices[ci];
            const optionText = `${String.fromCharCode(65 + ci)}. ${choice.displayText || ""}`;

            // 关键：WQSCOREVALUE → 当前累计答对题数（全对即题号），否则第 2 题起不计分
            let scoreUrl = String(choice.requeryUrl || "").replace("WQSCOREVALUE", String(i + 1));
            if (!scoreUrl) scoreUrl = `/search?q=${encodeURIComponent(questionText)}&FORM=HPQUIZ`;
            if (scoreUrl.startsWith("/")) scoreUrl = `https://${searchHost}${scoreUrl}`;
            if (!/[?&]PC=/.test(scoreUrl)) scoreUrl += `${scoreUrl.includes("?") ? "&" : "?"}PC=SANSAAND`;

            try {
                const visitFinal = await FuckF.xhr({
                    url: scoreUrl,
                    headers: {
                        "User-Agent": appUA,
                        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
                        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                        "x-requested-with": "com.microsoft.bing",
                        "Referer": referer,
                    },
                }, true);
                referer = visitFinal || scoreUrl;

                const recRaw = await FuckF.xhr({
                    method: "POST",
                    url: recordUrl,
                    headers: {
                        "Content-Type": "text/plain;charset=UTF-8",
                        "User-Agent": appUA,
                        "x-requested-with": "com.microsoft.bing",
                        "Referer": `https://${searchHost}/`,
                        "Origin": `https://${searchHost}`,
                    },
                    data: JSON.stringify({ PartnerId: "BingQAUX", QuestionText: questionText, OptionText: optionText, UserId: userId }),
                });
                if (recRaw && FuckF.isJSON(recRaw)) {
                    const code = Number(JSON.parse(recRaw).ErrorCode);
                    if (code === 200) ok++;
                    else FuckF.log("🟡", `HPQuiz 第 ${i + 1} 题投票异常 ErrorCode=${code}`);
                }

                await reportActivity(scoreUrl);
                st.submitted.push(questionId);
                save();

                // 题与题之间随机停顿，避免固定节奏
                await sleep(FuckF.getScopeRandomNum(1200, 3000));
            } catch (e) {
                FuckF.log("🟡", `HPQuiz 第 ${i + 1} 题失败：${e.message}`);
            }
        }

        if (st.submitted.length >= questions.length) {
            st.done = true;
            st.key = quizName;
            save();
            FuckF.log("✨", `HPQuiz 今日问答完成（${st.submitted.length}/${questions.length} 题，投票成功 ${ok} 题）`);
        }
        // 余额复核：隔几秒再读，给服务端记账留时间
        if (balBefore != null) {
            await sleep(4000);
            const balAfter = await readBalance();
            if (balAfter != null) {
                const delta = balAfter - balBefore;
                st.point = delta > 0 ? delta : 0;
                save();
                if (delta > 0) {
                    // 入账成功：清零连续未入账计数
                    GM_setValue("Config.quizMiss", 0);
                    FuckF.log("✨", `HPQuiz 入账 +${delta} 分（余额 ${balBefore} → ${balAfter}）`);
                    // 问答是独立通道，此前只有日志没有通知，入账时一并推送
                    FuckD.bing.sendMSG = `📝HPQuiz 入账 +${delta} 分（余额 ${balAfter}）`;
                    FuckF.send(FuckD.wh);
                } else {
                    // 未入账：累计连续失败天数，满 3 天自动停跑，避免长期空转增加风控面
                    const miss = Number(GM_getValue("Config.quizMiss", 0)) + 1;
                    GM_setValue("Config.quizMiss", miss);
                    if (miss >= 3) {
                        GM_setValue("Config.quizDisabled", true);
                        FuckF.log("🟡", `HPQuiz 已连续 ${miss} 天未入账，自动停跑（恢复：清空 Config.quizDisabled 或删除该键）`);
                    } else {
                        FuckF.log("🟡", `HPQuiz 未检测到入账（余额 ${balBefore} → ${balAfter}），连续未入账 ${miss}/3`);
                    }
                }
            }
        }
        return true;
    } catch (e) {
        FuckF.log("🟡", `HPQuiz 异常：${e.message}`);
        return true;
    }
};

// ===== [PATCH] 通用 dapi 任务收割（2026-11-13 线上实测）=====
// 背景：rewards.bing.com 的 Server Action POST 通道已被网关整条拦截（任何 action id 都返回 500），
// 网页端交卷/领取全部失效。而 dapi/me/activities 的 type 101 + offerid 仍然完全可用：
// 服务端即时记账（响应 activity.p 为到账积分）、幂等、无 origin 校验。
//
// ⚠️ 风控设计（这是本补丁的重点，不是「一次跑完」）：
//   1. 跨运行续传：每次 cron 只上报 maxPerRun 个任务，其余留给后续 cron（原 Edge 连签同款模型）。
//      状态存 Config.harvest = { date, done:[offerid], failed:[offerid], notified }。
//   2. 随机停顿：每两个上报之间停 harvestGapMin～harvestGapMax 秒，模拟人逐个点任务。
//   3. 随机顺序：目标列表先洗牌，避免每次都是同一个固定序列。
//   4. 每轮起始随机延迟：0～harvestJitter 秒，错开 cron 整点特征。
//   5. 单轮上限：maxPerRun 默认 2，配合 cron 20 分钟一次 ≈ 每小时最多 6 个，分散到全天。
//   6. 失败退避：失败项记入 failed，当天不再重试（次日清空），避免对同一 id 反复打。
//   7. 任务勾选：Harvest 配置组里逐类开关，关掉的类目完全不发请求。
FuckF.HARVEST_KEY = "Config.harvest";

// 任务分类：按 promotion 名称归类，供配置项分别开关
FuckF.harvestCategory = (name) => {
    if (!name) return "other";
    if (/^Sapphire_AppNewBonus_/i.test(name)) return "sapphire";
    // Evergreen 系列前缀不止 ENstar：实测还有 ZHstar_（中文版）等区域变体，
    // 用 ^ENstar_ 严格匹配会把 ZHstar_ 落到 other 而被默认跳过。这里按「含 Evergreen」判定。
    if (/Rewards_DailyGlobalOffer_Evergreen_/i.test(name)) return "evergreen";
    if (/^Gamification_DailySet_/i.test(name)) return "dailyset";
    if (/DailyCheckIn/i.test(name)) return "checkin";
    return "other";
};

// 拉取 SAAndroid 通道的 profile + promotions（该通道才能看到 Sapphire / Evergreen / 每日任务全集）
FuckF.getMobileProfile = async (region) => {
    try {
        const result = await FuckF.xhr({
            url: "https://prod.rewardsplatform.microsoft.com/dapi/me?channel=SAAndroid&options=Promotions",
            headers: {
                "accept": "*/*",
                "content-type": "application/json; charset=UTF-8",
                "user-agent": FuckD.ua.m,
                "authorization": `Bearer ${FuckD.bing.token}`,
                "x-rewards-appid": "SAAndroid/31.4.2110003555",
                "x-rewards-ismobile": "true",
                "x-rewards-country": region || "cn",
                "x-rewards-partnerid": "startapp",
                "x-rewards-flights": "rwgobig",
            },
        });
        if (result && FuckF.isJSON(result)) {
            const res = JSON.parse(result);
            if (res.code === 0) return res.response || {};
        }
    } catch (e) {
        FuckF.log("🔴", `移动通道资料获取出错！🔛${e.message}`);
    }
    return false;
};

// 读取/初始化当日收割状态（跨运行续传）
FuckF.getHarvestState = (today) => {
    let st = GM_getValue(FuckF.HARVEST_KEY, null);
    if (!st || st.date != today) {
        st = { date: today, done: [], failed: [], notified: false, lastRun: 0, point: 0 };
    }
    if (!Array.isArray(st.done)) st.done = [];
    if (!Array.isArray(st.failed)) st.failed = [];
    return st;
};

// 通用任务收割：每次只做一小批，靠 cron 多次触发逐步完成
let harvestRunning = false;
FuckF.taskHarvest = async () => {
    // 主流程有两处调用（常规分支 + 全完成分支），加锁避免同一次运行内重复收割
    if (harvestRunning) return true;
    if (!FuckD.bing.token) return true;
    harvestRunning = true;
    try {
        return await FuckF.taskHarvestInner();
    } finally {
        harvestRunning = false;
    }
};

FuckF.taskHarvestInner = async () => {
    if (!FuckD.bing.token) return true;

    // 配置项：哪类任务要做
    const enabledCats = {
        sapphire: GM_getValue("Harvest.sapphire", true),
        evergreen: GM_getValue("Harvest.evergreen", true),
        dailyset: GM_getValue("Harvest.dailyset", true),
        checkin: GM_getValue("Harvest.checkin", true),
    };
    const catOn = (c) => (c === "other" ? false : !!enabledCats[c]);   // 未分类的默认不做
    if (!Object.values(enabledCats).some(Boolean)) return true;

    const maxPerRun = Math.max(1, Number(GM_getValue("Harvest.maxPerRun", 2)) || 2);
    const gapMin = Math.max(1, Number(GM_getValue("Harvest.gapMin", 4)) || 4);
    const gapMax = Math.max(gapMin, Number(GM_getValue("Harvest.gapMax", 11)) || 11);
    const jitter = Math.max(0, Number(GM_getValue("Harvest.jitter", 45)) || 0);

    const today = FuckD.bing.dateNowNum;
    const st = FuckF.getHarvestState(today);
    const save = () => GM_setValue(FuckF.HARVEST_KEY, st);

    const region = FuckD.bing.status ? "cn" : (FuckD.bing.region || "").toLowerCase();
    const profile = await FuckF.getMobileProfile(region);
    if (!profile) return false;

    const promos = profile.promotions || [];
    // 不可上报项的判定（均为 2026-11 实测结论）：
    //  · TrialUser：上报后会置 complete=True 但 p=0、余额不变，等于空耗掉一个可能值 200 分的资格，绝不能碰
    //  · AppInstall / AppMigration / Fosbury / HVA：需要真实客户端行为，type101 无效
    //  · Rewards_EdgeUsage：站点已下线的 Edge 用量信息项
    //  · DailyCheckIn_Parent_*：打卡任务的父容器（0/1000），本身不可上报
    //  · Gamification_Sapphire_DailyCheckIn：累计签到计数器（1/11760），不是一次性任务
    //    （2026-11 实测：SAAndroid / web+MSRewards / Bing / edge 四种 appid 组合下 promotion 集合分别为 31/26/26/26 项，
    //     均只下发该计数器与 Gamification_Streak_Counter_Promotion，没有可上报的打卡 child 项，
    //     说明打卡必须在 Bing App 内真实交互，dapi 通道无法完成）
    const skipRe = /TrialUser|AppInstall|AppMigration|^Fosbury_|^HVA_|^Rewards_EdgeUsage_progress_info$|DailyCheckIn_Parent|Gamification_Sapphire_DailyCheckIn/i;
    // 已有专门模块处理的任务：不算「未适配」，否则每天都会在日志里误报
    const handledRe = /readarticle|WW_search_global_NewLevel3|WW_NewLevel3_search/i;

    // 每日任务（Gamification_DailySet_区域_YYYYMMDD_ChildN）会提前一天下发，
    // 对未到日期的项上报只会拿到 p=0。这里按内嵌日期直接跳过，省掉每天 3 次无效请求。
    const offerDate = (oid) => {
        const m = String(oid || "").match(/(20\d{6})/);
        return m ? Number(m[1]) : 0;
    };

    const targets = promos.filter((p) => {
        const a = (p && p.attributes) || {};
        if (!a.offerid) return false;
        if (String(a.complete || "").toLowerCase() === "true") return false;
        const max = Number(a.max), prog = Number(a.progress);
        if (!Number.isFinite(max) || max <= 0) return false;
        if (Number.isFinite(prog) && prog >= max) return false;
        if (skipRe.test(p.name || "") || skipRe.test(a.offerid || "")) return false;
        // 未来日期的每日任务：今日上报不计分，直接跳过（不当失败，次日自然成为当日项）
        const d = offerDate(a.offerid);
        if (d && d > Number(FuckD.bing.dateNowNum)) return false;
        if (!catOn(FuckF.harvestCategory(p.name))) return false;
        if (st.done.includes(a.offerid) || st.failed.includes(a.offerid)) return false;
        return true;
    });

    // 未适配任务检测：有 offerid、未完成、上限有效，但被跳过规则或分类开关排除。
    // 微软新增活动时会在这里主动报出来，不用每次手工翻 30 多项 promotion 全表。
    // 放在「无任务就返回」之前，保证没有可做任务的日子也能收到新任务信号。
    try {
        const unadapted = promos.filter((p) => {
            const a = (p && p.attributes) || {};
            if (!a.offerid) return false;
            if (String(a.complete || "").toLowerCase() === "true") return false;
            const max = Number(a.max), prog = Number(a.progress);
            if (!Number.isFinite(max) || max <= 0) return false;
            if (Number.isFinite(prog) && prog >= max) return false;
            if (handledRe.test(p.name || "") || handledRe.test(a.offerid || "")) return false;
            const skipped = skipRe.test(p.name || "") || skipRe.test(a.offerid || "");
            const disabled = !catOn(FuckF.harvestCategory(p.name));
            return skipped || disabled;
        });
        if (unadapted.length && GM_getValue("Config.unadaptedNotified", 0) != today) {
            GM_setValue("Config.unadaptedNotified", today);
            const brief = unadapted.slice(0, 6).map(x => `${x.name}(${(x.attributes || {}).offerid})`).join("、");
            FuckF.log("🧩", `检测到 ${unadapted.length} 个未适配任务（暂不处理，供后续适配）：${brief}${unadapted.length > 6 ? "…" : ""}`);
        }
    } catch (e) {}

    if (!targets.length) {
        if (!st.notified) {
            st.notified = true;
            save();
            const msg = st.point > 0
                ? `🌐今日任务收割完成：共 +${st.point} 积分（${st.done.length} 个任务）`
                : "🌐今日任务收割完成：无可做任务";
            FuckF.log("🔵", msg, true);
            FuckF.send(FuckD.wh);
        }
        return true;
    }

    // 随机顺序：同样的候选池，每次点选顺序不同
    FuckF.getRandomArr(targets);
    // 每批不同数量：1..maxPerRun，进一步打散节奏
    const batch = targets.slice(0, FuckF.getScopeRandomNum(1, maxPerRun));

    FuckF.log("🌐", `任务收割：本轮处理 ${batch.length} 个（待做 ${targets.length} 个）`);

    // 起始抖动：错开 cron 整点秒级特征
    if (jitter > 0) {
        const wait = FuckF.getScopeRandomNum(0, jitter);
        if (wait > 3) {
            FuckF.log("⏳", `任务收割：随机等待 ${wait} 秒后开始（剩余 ${targets.length} 个）`);
            await new Promise(r => setTimeout(r, wait * 1000));
        }
    }

    const balBefore = await FuckF.readBalance();

    let gained = 0, ok = 0;
    for (let i = 0; i < batch.length; i++) {
        const p = batch[i];
        const a = p.attributes;
        try {
            const raw = await FuckF.reportViaAppChannel({ type: 101, attributes: { offerid: a.offerid }, region });
            let point = 0, dup = false, code = -1;
            if (raw && FuckF.isJSON(raw)) {
                const j = JSON.parse(raw);
                code = j.code;
                dup = !!(j.response && j.response.isDuplicate);
                point = (j.response && j.response.activity && j.response.activity.p) || 0;
            }
            if (code === 0 && !dup) {
                if (point > 0) {
                    ok++; gained += point;
                    st.point = (st.point || 0) + point;
                    st.done.push(a.offerid);
                    FuckF.ledgerAdd(p.name, point);
                    FuckF.log("✨", `${p.name} +${point} 分`);
                } else {
                    // p=0：服务端接受但未记账（多为未到生效日期）。当天不再重复尝试。
                    st.failed.push(a.offerid);
                    FuckF.log("🌐", `${p.name} 未记账（可能未到生效日期），今日不再重试`);
                }
            } else {
                st.failed.push(a.offerid);
                FuckF.log("🟡", `${p.name} 上报未成功（code=${code}${dup ? "，判重" : ""}），今日不再重试`);
            }
        } catch (e) {
            st.failed.push(a.offerid);
            FuckF.log("🟡", `${p.name} 上报异常：${e.message}`);
        }
        st.lastRun = Date.now();
        save();

        // 任务之间的随机停顿：模拟逐个点开的节奏，不做固定间隔
        if (i < batch.length - 1) {
            const gap = FuckF.getScopeRandomNum(gapMin, gapMax);
            FuckF.log("⏳", `任务收割：等待 ${gap} 秒后处理下一个`);
            await new Promise(r => setTimeout(r, gap * 1000));
        }
    }

    // 余额二次校验：接口返回的分值不等于真的到账，靠余额差值确认。
    // 记账有滞后，所以等几秒再读；差值小于声明值时给出提示而不是当成失败（服务端可能滞后补记）。
    if (gained > 0) {
        let delta = null;
        if (balBefore != null) {
            await new Promise(r => setTimeout(r, 4000));
            const balAfter = await FuckF.readBalance();
            if (balAfter != null) delta = balAfter - balBefore;
        }
        if (delta == null) {
            FuckF.log("🟡", `任务收割：本轮声明 +${gained} 分，余额校验不可用`);
        } else if (delta >= gained) {
            FuckF.log("🟢", `任务收割：余额校验通过 +${delta} 分（声明 +${gained}）`);
        } else if (delta > 0) {
            FuckF.log("🟡", `任务收割：余额仅 +${delta} 分，低于声明的 +${gained}（可能记账滞后）`);
        } else {
            FuckF.log("🟡", `任务收割：声明 +${gained} 分但余额未变化，可能服务端延迟记账或已计入当日额度`);
        }
    }

    if (gained > 0) {
        FuckD.bing.sendMSG = `🌐任务收割：本轮 ${ok} 个任务，+${gained} 积分（今日累计 +${st.point}）`;
        FuckF.log("🔵", FuckD.bing.sendMSG, true);
        FuckF.send(FuckD.wh);
    }
    return true;
};

// 每日打卡任务（连续打卡印章，共3项30分）
// 网页端已不下发每日任务数据（2026-08-19起），
// 该活动仅在必应 APP 可见，改走 dapi APP 通道识别；若微软恢复网页端数据则自动让位给活动任务老路线。
// 打卡项结构（dapi 实测 2026-08-20）：offerid 为 Gamification_DailySet_区域_日期_Child序号，type=urlreward。
// 完成方式（2026-08-21 线上实测）：访问 attributes.destination（必应搜索 URL，即便携带 BTDSUOID 跟踪参数与移动 UA）不会记账；
// 正确链路与阅读任务同源：POST dapi/me/activities type 101 + offerid，服务端即时记账（响应 activity.p 为到账积分）、幂等。
FuckF.taskStreak = async () => {
    if (!FuckD.tasks.promos || FuckD.streak.date == FuckD.bing.dateNowNum || FuckD.streak.times > 2 || FuckD.streak.end > 0) {
        FuckD.streak.end++;
        return true;
    }
    try {
        // 弹性双通道：网页端仍有每日任务数据时由 taskPromos 处理，本通道自动让位
        const dashCache = (lastRewardHtml.dash || "").replace(/\\"/g, '"');
        if (dashCache.includes('"dailySetItems":[{')) {
            FuckD.streak.end++;
            if (FuckD.streak.date != FuckD.bing.dateNowNum) {
                FuckD.streak.date = FuckD.bing.dateNowNum;
                GM_setValue("Config.tasks", FuckD.bing.tasks);
                FuckF.log("📅", "网页端已恢复每日任务数据，打卡由活动任务通道处理");
            }
            return true;
        }
        const envStatus = await FuckF.mainlandCheck();
        if (envStatus === 1) {
            FuckD.bing.code = -1;
            return true;
        }
        const promos = await FuckF.getPromotions();
        if (!promos) {
            FuckD.streak.times++;
            return false;
        }
        // 打卡项识别：Gamification_DailySet 前缀 + offerid 内嵌今日日期
        //（精确排除 Sapphire_AppNewBonus_dailyset 新人奖励、Gamification_Sapphire_DailyCheckIn 累计签到等同名活动）
        const isStreakItem = (p) => /^Gamification_DailySet_/.test(p.attributes?.offerid || "");
        const isToday = (p) => {
            const dateMatch = (p.attributes?.offerid || "").match(/(20\d{6})/);
            return !dateMatch || dateMatch[1] == FuckD.bing.dateNowNum;
        };
        const isDone = (p) => {
            const attr = p.attributes || {};
            const progress = parseInt(attr.progress) || 0;
            const max = parseInt(attr.max) || 0;
            return max > 0 ? progress >= max : false;
        };
        const streakItems = promos.filter(p => isStreakItem(p) && isToday(p));
        const pending = streakItems.filter(p => !isDone(p));
        if (FuckD.streak.date != FuckD.bing.dateNowNum) {
            const brief = streakItems.length > 0 ? streakItems.map(p => {
                const attr = p.attributes || {};
                return `${(attr.offerid || "?").replace(/^Gamification_DailySet_\w+_/, "")} ${attr.progress ?? "?"}/${attr.max ?? "?"}`;
            }).join("，") : "无";
            FuckF.log("📅", `APP 通道打卡项（${streakItems.length} 项）：${brief}`);
        }
        let streakPoint = 0;
        if (pending.length > 0) {
            FuckD.streak.date = 0;
            FuckF.log("📅", `识别到 ${pending.length} 个未完成每日打卡项，通过 APP 通道上报完成...`);
            const region = FuckD.bing.status ? "cn" : FuckD.bing.region.toLowerCase();
            const donePoints = (items) => items.filter(isDone).reduce((s, p) => s + (parseInt(p.attributes?.max) || 0), 0);
            // dapi 活动上报（与阅读任务同链路，type 101 + offerid，实测服务端即时记账）；返回实际上账积分，异常返回 null
            const reportViaDapi = async (attr) => {
                const result = await FuckF.xhr({
                    method: "POST",
                    url: "https://prod.rewardsplatform.microsoft.com/dapi/me/activities",
                    headers: {
                        "content-type": "application/json; charset=UTF-8",
                        "user-agent": FuckD.ua.m,
                        "authorization": `Bearer ${FuckD.bing.token}`,
                        "x-rewards-appid": "SAAndroid/31.4.2110003555",
                        "x-rewards-ismobile": "true",
                        "x-rewards-country": region,
                    },
                    data: JSON.stringify({
                        "amount": 1,
                        "country": region,
                        "id": FuckF.getRandomUUID(),
                        "type": 101,
                        "attributes": { "offerid": attr.offerid || "" },
                    }),
                });
                if (result && FuckF.isJSON(result)) {
                    const res = JSON.parse(result);
                    if (res.code === 0 && res.response?.activity) {
                        return parseInt(res.response.activity.p) || 0;
                    }
                }
                return null;
            };
            const pointBefore = donePoints(streakItems);
            for (let i = 0; i < pending.length; i++) {
                const attr = pending[i].attributes || {};
                FuckF.log("📅", `正在完成打卡项 ${i + 1}/${pending.length}：${attr.title || attr.offerid}（+${parseInt(attr.max) || 0} 分）`);
                try {
                    const got = await reportViaDapi(attr);
                    if (got !== null) {
                        streakPoint += got;
                    } else {
                        FuckF.log("🟡", `打卡项 ${i + 1} 上报响应无到账记录（可能已完成过）`);
                    }
                } catch (e) {
                    FuckF.log("🔴", `打卡项 ${i + 1} 上报失败！🔛${e.message}`);
                }
                if (i < pending.length - 1) {
                    await new Promise(resolve => setTimeout(resolve, FuckF.getScopeRandomNum(3000, 6000)));
                }
            }
            // 复核：以服务端进度为最终依据（实测记账即时生效）；复核失败时保留上报响应累计值
            await new Promise(resolve => setTimeout(resolve, 5000));
            const recheck = await FuckF.getPromotions();
            if (recheck) {
                const after = recheck.filter(p => isStreakItem(p) && isToday(p));
                streakPoint = Math.max(0, donePoints(after) - pointBefore);
            }
        }
        FuckD.streak.end++;
        if (FuckD.streak.date != FuckD.bing.dateNowNum) {
            FuckD.streak.date = FuckD.bing.dateNowNum;
            GM_setValue("Config.tasks", FuckD.bing.tasks);
            GM_setValue("Config.streakPoint", streakPoint);
            if (streakPoint > 0) {
                FuckD.bing.sendMSG = `📅每日打卡任务已完成！\n✨今日打卡奖励：${streakPoint}`;
            } else if (pending.length > 0) {
                FuckD.bing.sendMSG = `📅打卡上报已执行但服务端未确认到账，请稍后在必应 APP 核对打卡进度`;
            } else if (streakItems.length > 0) {
                FuckD.bing.sendMSG = `📅每日打卡任务已完成！（APP 通道显示全部完成）`;
            } else {
                FuckD.bing.sendMSG = `📅未在 APP 通道发现每日打卡项，请前往必应 APP 手动完成（约 30 分）`;
            }
            FuckF.log("🔵", FuckD.bing.sendMSG, true);
            FuckF.send(FuckD.wh);
        }
        return true;
    } catch (e) {
        FuckF.log("🔴", `每日打卡任务出错！🔛${e.message}`);
        FuckD.streak.times++;
        return false;
    }
}

// ===== Edge 浏览连签（Browsing Streak on Edge）=====
// 微软新增任务：每天在 Edge 累计浏览满 30 分钟即记账，连续 7 天有额外积分与印章（7 天奖励 5/10/20/30/40/80/120）。
// 机制（参考成熟实现 + dapi edge 通道）：服务端按「每次上报覆盖 report_per_minutes 分钟」累计进度，
// 需分次上报（默认每 5 分钟 1 次、共 6 次），两次上报间隔小于 report_per_minutes 会被判 isDuplicate 不记账，
// 累计满 30 分钟后 promotion.attributes.complete 变为 true。
// ⚠️ ScriptCat service worker 生命周期短，无法在一次运行内保持 30 分钟循环，故改为「每次 cron 触发做 1 次上报」模型：
// 通过 Config.edge={date,count,last,complete,activated,notified} GM 持久化跨运行续传，
// cron 每 20 分钟触发一次，远大于 5 分钟去重窗口，不会被判 isDuplicate，约 2 小时内完成全部 6 次上报。
FuckF.EDGE_TASK_KEY = "edge_browsing_streak_flight";
FuckF.EDGE_ACTIVATE_ID = "edge_flight_1_ww_treatment_eligible";
FuckF.EDGE_REQUIRE_MINUTES = 30;
// 服务端记账存在滞后：实测达到理论次数（30/5=6 次）后 complete 仍可能滞后数小时才刷新，
// 此时不能靠无限加报硬冲。允许在理论次数之上补报若干次，超过硬上限则本日停止上报，避免整夜空转请求。
FuckF.EDGE_REPORT_TIMES = 3;
// 超出理论次数后的补报退避间隔（远大于 cron 20 分钟，每轮最多补报 1 次）
FuckF.EDGE_RECHECK_INTERVAL = 30 * 60 * 1000;

// 拉取 dapi edge 通道资料（含浏览连签 promotion），与 getPromotions 同域不同 channel
FuckF.getEdgeProfile = async (region) => {
    try {
        const result = await FuckF.xhr({
            url: "https://prod.rewardsplatform.microsoft.com/dapi/me?channel=edge&options=Profile,Promotions",
            headers: {
                "accept": "*/*",
                "content-type": "application/json; charset=UTF-8",
                "user-agent": FuckD.ua.pc,
                "authorization": `Bearer ${FuckD.bing.token}`,
                "x-rewards-appid": "EdgeDesktop",
                "x-rewards-partnerid": "EdgeHub",
                "x-rewards-country": region,
                "x-rewards-language": region === "cn" ? "zh-CN" : "en-US",
            },
        });
        if (result && FuckF.isJSON(result)) {
            const res = JSON.parse(result);
            if (res.code === 0) return res.response || {};
        }
    } catch (e) {
        FuckF.log("🔴", `Edge 通道资料获取出错！🔛${e.message}`);
    }
    return false;
};

FuckF.findEdgePromotion = (profile) => {
    const list = (profile && profile.promotions) || [];
    return list.find(p => p && p.name === FuckF.EDGE_TASK_KEY) || null;
};

// Edge 浏览时长上报：dapi/me/activities，type 取 promotion.report_offer_type（默认 714），attributes.offerid 为上报标识
// 返回解析后的响应对象（含 response.isDuplicate）；异常向上抛由调用方处理
FuckF.reportEdgeActivity = async ({ offerid, type, region }) => {
    const result = await FuckF.xhr({
        method: "POST",
        url: "https://prod.rewardsplatform.microsoft.com/dapi/me/activities",
        headers: {
            "accept": "*/*",
            "content-type": "application/json; charset=UTF-8",
            "user-agent": FuckD.ua.pc,
            "authorization": `Bearer ${FuckD.bing.token}`,
            "x-rewards-appid": "EdgeDesktop",
            "x-rewards-partnerid": "EdgeHub",
            "x-rewards-country": region,
            "x-rewards-language": region === "cn" ? "zh-CN" : "en-US",
        },
        data: JSON.stringify({
            amount: 1,
            attributes: { offerid },
            request_user_info: true,
            type,
        }),
    });
    if (result && FuckF.isJSON(result)) return JSON.parse(result);
    return null;
};

// 一次性激活（多数账号已由 Edge 自动激活，promotion 直接存在则不会走到这里）：
// 从网页端 earn 页 React 数据里取 edge 连签的 activationOfferId/activationHash/activationActivityType，
// 复用活动交卷同款 server action（reportActivity）提交激活。返回 activated|already|absent|failed
FuckF.activateEdgeBrowsing = async () => {
    try {
        let html = lastRewardHtml.earn || "";
        if (!html || !html.includes("edge_flight")) {
            html = (await FuckF.xhr({ url: "https://rewards.bing.com/earn?section=streaks" })) || "";
        }
        const clean = html.replace(/\\"/g, '"');
        const idx = clean.indexOf('"activationOfferId":"' + FuckF.EDGE_ACTIVATE_ID);
        if (idx < 0) {
            // 网页端未见 edge 连签锚点：有 edge partner 说明结构变化（failed），否则账号未开通（absent）
            return /"partner":"edge"/.test(clean) ? "failed" : "absent";
        }
        const win = clean.substring(Math.max(0, idx - 600), idx + 500);
        if (/"isEnabled":true/.test(win)) return "already";
        const offerM = win.match(/"activationOfferId":"([^"]+)"/);
        const hashM = win.match(/"activationHash":"([^"]+)"/);
        const typeM = win.match(/"activationActivityType":(\d+)/);
        const offerId = offerM ? offerM[1] : FuckF.EDGE_ACTIVATE_ID;
        const hash = hashM ? hashM[1] : "";
        const actType = typeM ? parseInt(typeM[1]) : 714;
        if (!hash || hash === "$undefined") {
            FuckF.log("🟡", "Edge 浏览连签：未取到激活 hash，请先在 Edge 浏览器打开一次活动页以激活");
            return "failed";
        }
        const actionInfo = await FuckF.getRewardsAction([html]);
        const actionId = actionInfo.ids.reportActivity || "70babbc81d2724f60d29a95c03b3d739cba77cea92";
        const headers = {
            "content-type": "text/plain;charset=UTF-8",
            "next-action": actionId,
            "referer": "https://rewards.bing.com/earn",
            "origin": "https://rewards.bing.com",
            "next-router-state-tree": FuckF.getRouterStateTree("earn"),
        };
        if (actionInfo.dpl) headers["x-deployment-id"] = actionInfo.dpl;
        await FuckF.xhr({
            method: "POST",
            url: "https://rewards.bing.com/earn",
            headers,
            data: JSON.stringify([hash, actType, { offerid: offerId, isPromotional: "$undefined", timezoneOffset: "-480" }]),
        });
        FuckF.log("🟢", "Edge 浏览连签：已提交激活请求");
        return "activated";
    } catch (e) {
        FuckF.log("🟡", `Edge 浏览连签：激活失败 🔛${e.message}`);
        return "failed";
    }
};

FuckF.edgeNotifyDone = (st, save) => {
    if (st.notified) return;
    st.notified = true;
    save();
    FuckD.bing.sendMSG = "🌐Edge 浏览连签任务已完成！（今日 30 分钟浏览已记账）";
    FuckF.log("🔵", FuckD.bing.sendMSG, true);
    FuckF.send(FuckD.wh);
};

let edgeBrowsingRunning = false;
FuckF.taskEdgeBrowsing = async () => {
    if (!FuckD.tasks.edge || edgeBrowsingRunning) return;
    if (!FuckD.bing.token) {
        FuckF.log("🟡", "Edge 浏览连签：暂无可用 Token（需先完成授权码配置），本次跳过");
        return;
    }
    edgeBrowsingRunning = true;
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    try {
        const region = FuckD.bing.status ? "cn" : (FuckD.bing.region || "").toLowerCase();
        const today = FuckD.bing.dateNowNum;
        let st = GM_getValue("Config.edge", false);
        if (!st || st.date != today) {
            st = { date: today, count: 0, last: 0, complete: false, activated: false, notified: false };
        }
        const save = () => GM_setValue("Config.edge", st);
        if (st.complete) return;

        let profile = await FuckF.getEdgeProfile(region);
        let promo = profile && FuckF.findEdgePromotion(profile);

        // promotion 缺失：尝试网页通道一次性激活（每天仅试一次）
        if (!promo && !st.activated) {
            st.activated = true;
            save();
            const act = await FuckF.activateEdgeBrowsing();
            if (act === "absent") {
                FuckF.log("🟡", "Edge 浏览连签：账号未开通该活动，跳过");
                return;
            }
            if (act === "activated" || act === "already") {
                await sleep(FuckF.getScopeRandomNum(3000, 6000));
                profile = await FuckF.getEdgeProfile(region);
                promo = profile && FuckF.findEdgePromotion(profile);
            }
        }
        if (!promo) {
            // [PATCH] 2026-11 实测：edge 通道已无 edge_browsing_streak_flight promotion，
            // 替代品 Rewards_EdgeUsage_progress_info 的 max/progress 均为 -1、无 offerid，无法做时长上报。
            // 该任务已被微软下线，不是脚本缺陷；只在每天第一次运行时说明一次，避免每个 cron 都刷屏。
            const offlineKey = "Config.edgeOffline";
            if (GM_getValue(offlineKey, 0) != today) {
                GM_setValue(offlineKey, today);
                FuckF.log("🟡", "Edge 浏览连签任务已被站点下线（edge 通道无该 promotion，替代项不可上报），跳过");
            }
            st.complete = true;
            save();
            return;
        }

        const attr = promo.attributes || {};
        if (String(attr.complete || "").toLowerCase() === "true") {
            st.complete = true;
            save();
            FuckF.edgeNotifyDone(st, save);
            return;
        }
        const offerid = String(attr.offerid || "").trim();
        const typeRaw = String(attr.report_offer_type || "").trim();
        const type = /^\d+$/.test(typeRaw) ? typeRaw : "714";
        let intervalMin = Number(attr.report_per_minutes);
        if (!Number.isFinite(intervalMin) || intervalMin < 1 || intervalMin > 30) intervalMin = 5;
        if (!offerid) {
            FuckF.log("🟡", "Edge 浏览连签：promotion 缺少 offerid，无法上报");
            return;
        }
        const reportCount = Math.ceil(FuckF.EDGE_REQUIRE_MINUTES / intervalMin);
        const intervalMs = intervalMin * 60000;
        const maxReports = reportCount + FuckF.EDGE_REPORT_TIMES;

        // 跨运行续传：读取持久化状态，检查是否到了下一次上报时间
        const fresh = GM_getValue("Config.edge", st);
        if (fresh && fresh.date == today) st = Object.assign(st, fresh);
        if (st.complete) { save(); return; }

        // 已达硬上限仍未确认完成：本日停止上报，仅保留下一轮的完成状态复核
        if (st.count >= maxReports) {
            FuckF.log("🟡", `Edge 浏览连签：上报已达上限 ${st.count}/${reportCount} 次，服务端仍未确认完成，本日停止上报（可能机制变更或需真实浏览时长）`);
            save();
            return;
        }

        // 理论次数内按 intervalMin 节流；超出后进入低频补报（退避 EDGE_RECHECK_MS），不再每次 cron 都上报
        const overQuota = st.count >= reportCount;
        const minGap = overQuota ? Math.max(intervalMs, FuckF.EDGE_RECHECK_INTERVAL) : intervalMs;
        const elapsed = Date.now() - (st.last || 0);
        if (st.count > 0 && elapsed < minGap) {
            FuckF.log("🌐", `Edge 浏览连签：距上次上报不足 ${Math.round(minGap / 60000)} 分钟，下次 cron 再试（进度 ${st.count}/${reportCount}）`);
            return;
        }

        FuckF.log("🌐", `Edge 浏览连签：目标 ${FuckF.EDGE_REQUIRE_MINUTES} 分钟，每 ${intervalMin} 分钟上报 1 次，共 ${reportCount} 次；当前进度 ${st.count}/${reportCount}，本次执行${overQuota ? "补报" : "上报"}`);

        let dup = false;
        try {
            const res = await FuckF.reportEdgeActivity({ offerid, type, region });
            if (res && res.code === 0) {
                dup = res.response && res.response.isDuplicate === true;
            } else {
                FuckF.log("🟡", `Edge 浏览连签：上报响应异常 code=${res && res.code != null ? res.code : "?"}`);
            }
        } catch (e) {
            FuckF.log("🔴", `Edge 浏览连签：上报失败！🔛${e.message}`);
            return;
        }
        st.last = Date.now();
        if (!dup) st.count++;
        save();
        FuckF.log("🌐", `Edge 浏览连签：第 ${st.count}/${reportCount} 次上报${dup ? "（服务端判重，未记账）" : "已记账"}`);

        // 上报后复核服务端完成状态（complete 为最终依据）
        await sleep(FuckF.getScopeRandomNum(2000, 4000));
        const p2 = await FuckF.getEdgeProfile(region);
        const pr2 = p2 && FuckF.findEdgePromotion(p2);
        if (pr2 && String((pr2.attributes || {}).complete || "").toLowerCase() === "true") {
            st.complete = true;
            save();
        }

        if (st.complete) {
            FuckF.edgeNotifyDone(st, save);
        } else if (st.count >= reportCount) {
            // 上报次数已满但服务端未确认完成：不强制标记，留待下一轮 cron 复核（补报已受硬上限与退避间隔约束）
            // 附带服务端 promotion 关键字段，便于定位"次数够但未完成"是记账滞后还是机制变更
            const diagKeys = ["complete", "progress", "max", "target", "report_per_minutes", "offerid"];
            const brief = diagKeys.filter(k => attr[k] != null).map(k => `${k}=${attr[k]}`).join(" ");
            FuckF.log("🟡", `Edge 浏览连签：已上报 ${st.count}/${reportCount} 次，等待服务端确认完成（下一轮低频复核）${brief ? ` 🔛${brief}` : ""}`);
        }
    } catch (e) {
        FuckF.log("🔴", `Edge 浏览连签任务出错！🔛${e.message}`);
    } finally {
        edgeBrowsingRunning = false;
    }
};

// 自动领取待领积分（搜索打卡等新版奖励会进入待领池，需手动点击领取）
// 领取接口幂等，无可领积分时不执行任何领取动作，不影响主流程
// 新版（dpl=20260818 起）待领数据在 dashboard 页，earn 页仅作兑底
let claimRunning = false;
let lastRewardHtml = { dash: "", earn: "" };
FuckF.taskClaim = async (pages) => {
    if (claimRunning) return;
    if (!FuckD.tasks.promos && !FuckD.tasks.search) return;
    claimRunning = true;
    try {
        for (let attempt = 1; attempt <= 2; attempt++) {
            try {
                // 先检查待领池（dashboard 优先），没有可领积分则不执行后续领取逻辑
                const useCached = attempt === 1 && pages;
                const dashHtml = useCached && pages.dash ? pages.dash : await FuckF.xhr({ url: "https://rewards.bing.com/dashboard" });
                let clean = dashHtml.replace(/\\"/g, '"');
                let claimMatch = clean.match(/"pointClaim":(null|\{|\[)/);
                if (!claimMatch) {
                    const earnHtml = useCached && pages.earn ? pages.earn : await FuckF.xhr({ url: "https://rewards.bing.com/earn" });
                    clean = earnHtml.replace(/\\"/g, '"');
                    claimMatch = clean.match(/"pointClaim":(null|\{|\[)/);
                }
                if (!claimMatch || claimMatch[1] === "null") {
                    // 待领池为空，无需领取
                    return;
                }
                // [PATCH] 领取同样走 rewards.bing.com 的 Server Action，被同一网关策略拦截（必 500）。
                // 站点自 2026-11 起也不再下发 reportClaimAllPoints 动作，页面里没有点领入口。
                // 这里直接跳过，避免每轮 cron 都打两次必然失败的请求、日志刷屏。
                FuckF.log("🟡", "领取通道已被站点下线（页面无领取动作且 Server Action POST 被拦截），跳过领取");
                return;
                const before = parseInt(clean.match(/"balance":(\d+)/)?.[1] || "0");
                const actionInfo = await FuckF.getRewardsAction();
                // 动态提取优先，已知标识兜底（实测跨部署有效）
                const claimId = actionInfo.ids.reportClaimAllPoints || "00491296f1d668ad46b65342c95cb9d72a62c1fa9d";
                const resp = await FuckF.xhr({
                    method: "POST",
                    url: "https://rewards.bing.com/earn",
                    headers: {
                        "content-type": "text/plain;charset=UTF-8",
                        "next-action": claimId,
                        "referer": "https://rewards.bing.com/earn",
                        // 显式覆盖 origin（同交卷）：风控账号的 server action 对非站点同源 origin 抛 500
                        "origin": "https://rewards.bing.com",
                        "next-router-state-tree": FuckF.getRouterStateTree("earn"),
                    },
                    data: JSON.stringify([]),
                });
                if (/^\d+:true\s*$/m.test(resp || "")) {
                    const afterHtml = await FuckF.xhr({ url: "https://rewards.bing.com/earn" });
                    const after = parseInt(afterHtml.replace(/\\"/g, '"').match(/"balance":(\d+)/)?.[1] || "0");
                    if (before > 0 && after > before) {
                        FuckF.log("✨", `已自动领取 ${after - before} 积分（当前余额：${after}）`);
                    } else {
                        FuckF.log("✨", "积分领取请求已成功");
                    }
                } else {
                    FuckF.log("🟡", "积分领取响应异常，可能无可领积分");
                }
                return;
            } catch (e) {
                FuckF.log("🔴", `积分领取出错！🔛${e.message}`);
                if (attempt < 2) {
                    if (e.message.includes("404")) {
                        // 标识已失效，清除缓存重新提取后重试一次
                        FuckF.clearActionCache();
                    } else {
                        // 5xx 等其余错误延时重试一次（领取接口幂等，重试安全）
                        await new Promise(resolve => setTimeout(resolve, 3210));
                    }
                    continue;
                }
                return;
            }
        }
    } catch (e) {
        FuckF.log("🔴", `积分领取出错！🔛${e.message}`);
    } finally {
        claimRunning = false;
    }
}

FuckF.getQueryWord = async () => {
    const keywords = ["天气预报", "今日新闻", "体育赛事", "股票行情", "电影推荐", "科技资讯", "美食食谱", "旅游攻略", "历史上的今天", "健康常识"];
    const baseWord = keywords[FuckF.getRandomNum(keywords.length)];
    const randomSuffix = Math.random().toString(36).slice(2, 6);
    let sentence = `${baseWord} ${randomSuffix}`;
    if (FuckD.api.mode != "offline") {
        if (FuckD.search.word.index < 1 || FuckD.search.word.list.length < 1) {
            const apiHot = FuckF.getRandomApiHot()
            try {
                const result = await FuckF.xhr({ url: FuckD.api.url + apiHot })
                if (result && FuckF.isJSON(result)) {
                    const res = JSON.parse(result)
                    if (res.code == 200) {
                        FuckD.search.word.index = 1
                        for (let i = 0; i < res.data.length; i++) {
                            FuckD.search.word.list.push(res.data[i].title)
                        }
                        FuckD.search.word.list = FuckF.getRandomArr(FuckD.search.word.list)
                        sentence = FuckD.search.word.list[FuckD.search.word.index]
                        sentence = FuckF.getRandomSubstring(sentence)
                        return sentence
                    }
                }
            } catch (e) {
                FuckF.log("🔴", `搜索词获取出错！🔛${e.message}`)
            }
        } else {
            FuckD.search.word.index++
            if (FuckD.search.word.index > FuckD.search.word.list.length - 1) {
                FuckD.search.word.index = 0
            }
            sentence = FuckD.search.word.list[FuckD.search.word.index]
            sentence = FuckF.getRandomSubstring(sentence)
            return sentence
        }
        FuckF.log("🟡", "搜索词接口异常，已临时使用随机搜索词")
    }
    return sentence
}

FuckF.taskSearch = async () => {
    if (!FuckD.tasks.search || FuckD.search.end > 0 || (!GM_getValue("Config.keep", true) && FuckD.search.date == FuckD.bing.dateNowNum)) {
        FuckD.search.end++;
        return true;
    }
    if (FuckD.search.index === 0) {
        const dashboard = await FuckF.getRewardsInfo();
        if (!dashboard) {
            return false;
        }
        const searchInfo = dashboard.userStatus?.counters || {};
        FuckD.search.pc.progress = searchInfo.pcSearch?.[0]?.pointProgress || 0;
        let pcMax = searchInfo.pcSearch?.[0]?.pointProgressMax || 0;
        if (pcMax === 0) pcMax = 60;
        FuckD.search.pc.max = pcMax;
        FuckD.search.m.progress = searchInfo.mobileSearch?.[0]?.pointProgress || 0;
        let mMax = searchInfo.mobileSearch?.[0]?.pointProgressMax || 0;
        if (mMax === 0) mMax = 0;
        FuckD.search.m.max = mMax;
        const currentTotalSearch = FuckD.search.pc.progress + FuckD.search.m.progress;
        const lastTotalSearch = GM_getValue("Config.lastSearchProgress", -1);
        let restrictedTimes = GM_getValue("Config.restrictedTimes", 0);
        if (lastTotalSearch !== -1) {
            if (currentTotalSearch === lastTotalSearch && currentTotalSearch < (pcMax + mMax)) {
                restrictedTimes++;
            } else {
                restrictedTimes = 0;
            }
        }
        GM_setValue("Config.lastSearchProgress", currentTotalSearch);
        GM_setValue("Config.restrictedTimes", restrictedTimes);
        if (restrictedTimes >= 2) {
            FuckD.search.end++;
            GM_setValue("Config.lastSearchProgress", -1);
            GM_setValue("Config.restrictedTimes", 0);
            const pcReport = FuckD.search.pc.max > 0 ? `\n💻电脑端搜索：${FuckD.search.pc.progress}/${FuckD.search.pc.max}` : "";
            const mReport = FuckD.search.m.max > 0 ? `\n📱手机端搜索：${FuckD.search.m.progress}/${FuckD.search.m.max}` : "";
            FuckD.bing.sendMSG = `⚠️积分收入受限或账号异常，已中断今日搜索！${pcReport}${mReport}`;
            FuckF.log("🔴", FuckD.bing.sendMSG, true);
            FuckF.send(FuckD.wh);
            return true;
        }
    }
    if (FuckD.search.pc.progress >= FuckD.search.pc.max && FuckD.search.m.progress >= FuckD.search.m.max) {
        await new Promise(resolve => setTimeout(resolve, 3210));
        const dashboard = await FuckF.getRewardsInfo();
        if (dashboard) {
            const searchInfo = dashboard.userStatus?.counters || {};
            const realPcPro = searchInfo.pcSearch?.[0]?.pointProgress || 0;
            const realMPro = searchInfo.mobileSearch?.[0]?.pointProgress || 0;
            if (realPcPro >= FuckD.search.pc.max && realMPro >= FuckD.search.m.max) {
                FuckD.search.end++;
                if (FuckD.search.date != FuckD.bing.dateNowNum) {
                    FuckD.search.date = FuckD.bing.dateNowNum;
                    GM_setValue("Config.tasks", FuckD.bing.tasks);
                    GM_setValue("Config.lastSearchProgress", -1);
                    GM_setValue("Config.restrictedTimes", 0);
                    const pcReport = FuckD.search.pc.max > 0 ? `\n💻电脑端搜索：${realPcPro}/${FuckD.search.pc.max}` : "";
                    const mReport = FuckD.search.m.max > 0 ? `\n📱手机端搜索：${realMPro}/${FuckD.search.m.max}` : "";
                    FuckD.bing.sendMSG = `🔍搜索任务已完成！${pcReport}${mReport}`;
                    FuckF.log("🔵", FuckD.bing.sendMSG, true);
                    FuckF.send(FuckD.wh);
                }
                return true;
            } else {
                FuckD.search.pc.progress = realPcPro;
                FuckD.search.m.progress = realMPro;
                FuckF.log("🔍", `检测到搜索数据延迟或漏分，开始补搜...`);
            }
        } else {
            FuckD.search.end++;
            return true;
        }
    }
    if (FuckD.search.index >= FuckD.search.limit) {
        FuckD.search.end++;
        const pcReport = FuckD.search.pc.max > 0 ? `\n💻电脑端搜索：${FuckD.search.pc.progress}/${FuckD.search.pc.max}` : "";
        const mReport = FuckD.search.m.max > 0 ? `\n📱手机端搜索：${FuckD.search.m.progress}/${FuckD.search.m.max}` : "";
        FuckD.bing.sendMSG = `本轮运行正常，共搜索 ${FuckD.search.index} 次！${pcReport}${mReport}`;
        FuckF.log("🔍", FuckD.bing.sendMSG);
        FuckF.send(FuckD.wh);
        return true;
    }
    FuckD.search.date = 0;
    let query, params, pcorm, headers, regionMKT = "";
    if (FuckD.search.pc.progress < FuckD.search.pc.max || FuckD.search.m.progress < FuckD.search.m.max) {
        pcorm = Math.random() > 0.6 ? false : true;
        if (FuckD.search.pc.progress >= FuckD.search.pc.max) pcorm = false;
        if (FuckD.search.m.progress >= FuckD.search.m.max) pcorm = true;
    }
    const keyword = await FuckF.getQueryWord();
    try {
        const envStatus = await FuckF.mainlandCheck();
        if (envStatus === 1) {
            FuckD.bing.code = -1;
            return true;
        }
        GM_cookie("delete", { url: "https://bing.com", name: "_EDGE_S" });
        GM_cookie("delete", { url: "https://bing.com", name: "_Rwho" });
        GM_cookie("delete", { url: "https://bing.com", name: "_RwBf" });
        if (FuckD.bing.status) regionMKT = "&mkt=zh-CN";
        params = `q=${encodeURIComponent(keyword)}&form=QBLH${regionMKT}`;
        query = `https://${FuckD.bing.host}/search?${params}`;
        if (pcorm) {
            FuckD.search.device = "Desktop";
            headers = {
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "user-agent": FuckD.ua.pc,
                "cookie": `_Rwho=u=d&ts=${FuckD.bing.dateNowhyphen}`,
            };
        } else {
            FuckD.search.device = "Mobile";
            headers = {
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "user-agent": FuckD.ua.m,
                "cookie": `_Rwho=u=m&ts=${FuckD.bing.dateNowhyphen}`,
            };
        }
        const result = await FuckF.xhr({
            url: query,
            headers: {
                ...headers,
                "referer": `https://${FuckD.bing.host}/?form=QBLH`,
            }
        });
        if (result) {
            const res = result.replace(/\s/g, "");
            const data0 = res.match(/,IG:"([^"]+)"/);
            const guid = data0 ? data0[1] : FuckF.getRandomUUID(true);
            const data = res.match(/class="b_algo(.*?)href="(.*?)"h="ID=(.*?)">(.*?)<\/h2/);
            const ncheader = `https://${FuckD.bing.host}/rewardsapp/ncheader?ver=88888888&IID=SERP.5047&IG=${guid}&ajaxreq=1`;
            const report = `https://${FuckD.bing.host}/rewardsapp/reportActivity?IG=${guid}&IID=SERP.5047&${params}&ajaxreq=1`;
            headers = { ...headers, "referer": query };
            await FuckF.xhr({ method: "POST", url: ncheader, headers: headers, data: "wb=1%3bi%3d1%3bv%3d1" });
            await FuckF.xhr({ method: "POST", url: report, headers: headers, data: `url=${encodeURIComponent(query)}&V=web` });
            if (data) {
                const click = `https://${FuckD.bing.host}/fd/ls/GLinkPingPost.aspx?IG=${guid}&ID=${data[3]}&url=${data[2]}`;
                await FuckF.xhr({ url: click, headers: headers });
            }
            if (pcorm) {
                FuckD.search.pc.progress += 3;
                if (FuckD.search.pc.progress > FuckD.search.pc.max) FuckD.search.pc.progress = FuckD.search.pc.max;
            } else {
                FuckD.search.m.progress += 3;
                if (FuckD.search.m.progress > FuckD.search.m.max) FuckD.search.m.progress = FuckD.search.m.max;
            }
        }
    } catch (e) {
        FuckF.log("🔴", `搜索任务出错！🔛${e.message}`);
    }
    FuckD.search.index++;
    return false;
}

FuckF.mainlandCheck = async () => {
    try {
        const hash = ["g", "e", "o", "i", "s", "a", "m"].join("");
        if (!GM_info.script.header.includes(hash)) {
            FuckD.bing.mainland = -1;
            return 1;
        }
        const result = await FuckF.xhr({
            url: `https://${FuckD.bing.host}/`,
            headers: { "cookie": FuckD.cookie.mkt }
        });
        if (result) {
            const res = result.replace(/\s/g, "");
            const data = res.match(/Region:"(.*?)"(.*?)RevIpCC:"(.*?)"/);
            if (data) {
                const ipcc = data[3].toUpperCase();
                FuckD.bing.region = ipcc;
                if (FuckD.bing.status && ipcc != "CN") {
                    try {
                        const qryResult = await FuckF.xhr({
                            url: "https://disp-qryapi.3g.qq.com/v1/dispatch",
                            headers: { "referer": "https://3g.qq.com/" }
                        });
                        if (qryResult && FuckF.isJSON(qryResult)) {
                            const resJSON = JSON.parse(qryResult);
                            FuckD.bing.ip = (resJSON.code == 0 && resJSON.extra && resJSON.extra.ip) ? resJSON.extra.ip : "";
                            let rawInfo = (resJSON.code == 0 && resJSON.ipInfo) ? String(resJSON.ipInfo) : "";
                            rawInfo = rawInfo.replace(/[#*]+/g, " ").trim();
                            FuckD.bing.ipInfo = rawInfo ? `\n🌏所在地区：${rawInfo}` : "";
                        }
                    } catch {
                        console.debug("获取附加 IP 信息失败");
                    }
                    return 1;
                }
            }
            return 0;
        }
        return 2;
    } catch {
        return 2;
    }
}

FuckF.send = async (webhook) => {
    const now = new Date()
    FuckD.bing.datetimeLocaleStr = now.toLocaleString()
    await Promise.all(webhook.map(async (i) => {
        if (!i.key) return
        let message = `「${i.name}」消息推送`
        const safeKey = String(i.key).trim();
        const targetUrl = safeKey.startsWith("http") ? safeKey : i.url + safeKey;
        try {
            const result = await FuckF.xhr({
                method: "POST",
                url: targetUrl,
                headers: {
                    "content-type": "application/json; charset=UTF-8",
                },
                data: JSON.stringify(i.msg),
            })
            if (result) FuckF.log("🔵", `${message}完成 🔛${result}`)
        } catch (e) {
            FuckF.log("🔴", `消息推送出错！🔛${e.message}`)
        }
    }))
}

window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'AUTH_CODE_RECEIVED') {
        GM_log("收到授权码消息: " + event.data.code.substring(0, 30) + "...");
    }
});

if (typeof GM_registerMenuCommand === 'function') {
    // 打开授权页面：浏览器已登录微软账号时，授权链接会自动跳转到 oauth20_desktop.srf?code=...，
    // 页面上的捕获分支会把 code 写进 Config.code，无需手动复制粘贴。
    GM_registerMenuCommand("🔑 打开授权页面", () => {
        const u = "https://login.live.com/oauth20_authorize.srf?client_id=0000000040170455&response_type=code&scope=service::prod.rewardsplatform.microsoft.com::MBI_SSL&redirect_uri=https://login.live.com/oauth20_desktop.srf";
        try {
            GM_setValue("Config.authFlowAt", Date.now());
            // 记下「等待中的授权」：后台脚本会轮询 Config.code，
            // 一旦登录页捕获到 code，就由后台把标签关掉（菜单所在前台拿不到 GM_openInTab 的 handle）
            GM_setValue("Config.authPending", { at: Date.now(), url: u });
            let tab = null;
            try { tab = GM_openInTab(u, { active: true, insert: true, setParent: true }); }
            catch (e) { tab = GM_openInTab(u, { active: true, insert: true }); }
            // 前台如果能拿到 handle 就自己兜底关（部分环境 GM_openInTab 不返回 handle）
            if (tab && typeof tab.close === "function") {
                GM_setValue("Config.authPending", { at: Date.now(), url: u, hasHandle: true });
            }
            if (GM_getValue("Notice.bro", true)) {
                GM_notification({
                    text: "登录完成后，浏览器地址栏会变成 oauth20_desktop.srf?code=M.xxx…\n请复制整条地址，用脚本菜单「📋 粘贴授权码」粘贴（自动捕获在 login.live.com 上被 CSP 拦截，不可用）。",
                    title: GM_info.script.name,
                    onclick: () => {}
                });
            }
        } catch (e) {
            GM_notification({ text: "无法自动打开，请手动访问：\n" + u, title: GM_info.script.name, onclick: () => {} });
        }
    });

    // 授权状态自检：把当前存储里的关键状态打印到日志，便于判断是「没码」还是「码失效」
    GM_registerMenuCommand("🔍 检查授权状态", () => {
        let text = "";
        try {
            const code = GM_getValue("Config.code", "") || "";
            const token = GM_getValue("Config.token", "") || "";
            const codeM = code.match(/M\.[^&]+/);
            const t = GM_getValue("Config.codeTime", 0);
            const when = t ? new Date(t).toLocaleString() : "未知";
            const err = GM_getValue("Config.lastAuthError", null);
            const errLine = err ? `最近错误: ${err.error} ${String(err.description || "").slice(0, 40)}` : "最近错误: 无";
            const tokErr = GM_getValue("Config.lastTokenError", null);
            const tokErrLine = tokErr
                ? `Token 拒绝: ${tokErr.error} ${String(tokErr.description || "").slice(0, 60)}（${new Date(tokErr.ts).toLocaleTimeString()}）`
                : "Token 拒绝: 无";
            const lines = [
                `授权码: ${codeM ? "有（" + codeM[0].slice(0, 12) + "…）" : "无"}`,
                `获取时间: ${when}`,
                `refresh token: ${token ? "有（" + String(token).length + " 字节）" : "无（下次运行会重新换码）"}`,
                `授权来源: ${GM_getValue("Config.codeManual", false) ? "手动打开" : "脚本打开"}`,
                errLine,
                tokErrLine,
                `脚本版本: ${GM_info.script.version || "?"}`,
            ];
            text = lines.join("\n");
        } catch (e) {
            text = "读取状态失败：" + e.message;
        }
        // 三个通道同时输出：日志（sctl logs 可查）、通知（浏览器可见）、存储（下次运行可回读）
        try { GM_log("[auth] === 授权状态 ===\n" + text); } catch (e) {}
        try { GM_setValue("Config.lastMenuResult", { what: "authStatus", text, ts: Date.now() }); } catch (e) {}
        try { GM_notification({ text, title: GM_info.script.name, onclick: () => {} }); } catch (e) {}
    });

    // 手动解除运行锁：实例被强杀后锁最多残留 3 分钟，急用时可以立刻清掉
    GM_registerMenuCommand("🔓 解除运行锁", () => {
        let info = "";
        try {
            const at = Number(GM_getValue("Config.runLock", 0)) || 0;
            GM_setValue("Config.runLock", 0);
            info = at ? `已清除（原时间 ${new Date(at).toLocaleTimeString()}）` : "当前没有锁";
        } catch (e) {
            info = "解除失败：" + e.message;
        }
        try { GM_log("[lock] " + info); } catch (e) {}
        try { GM_setValue("Config.lastMenuResult", { what: "unlock", text: info, ts: Date.now() }); } catch (e) {}
        try { GM_notification({ text: info, title: GM_info.script.name, onclick: () => {} }); } catch (e) {}
    });

    // 统一的授权码写入逻辑，两个入口（原生输入框 / prompt）共用。
    // ⚠️ 必须区分两种凭证，否则会静默失败：
    //   · authorization code：M.C529_SN1.2.U.…（一次性，换 token 用，几分钟过期）
    //   · refresh token     ：M.C529_BL2.2.U.MsaArtifacts.…（长期，直接刷新 access token）
    // 之前不区分，把 refresh token 写进 Config.code 当 code 用，微软返回 invalid_grant，
    // 用户看到的是「授权码无效」，完全不知道粘错了类型。
    const applyPastedCode = (raw) => {
        const text = String(raw || "").trim();
        if (!text) return "empty";
        const m = text.match(/M\.[^&\s]+/);
        if (!m) return "invalid";
        const value = m[0];
        const isRefresh = /MsaArtifacts/i.test(value);
        const isCode = /SN1\./i.test(value);

        if (isRefresh) {
            // refresh token：直接存进 Config.token，清掉 code（避免下次又拿它当 code 用）
            GM_setValue("Config.token", value);
            GM_setValue("Config.code", "");
            GM_setValue("Config.tokenTime", Date.now());
            GM_setValue("Config.codeManual", true);
            GM_setValue("Config.lastAuthPrompt", 0);
            GM_setValue("Config.lastTokenError", null);
            return "ok-refresh";
        }

        // 授权码（或未知类型，按 code 处理并给出提示）
        const full = /oauth20_desktop\.srf/i.test(text)
            ? text
            : `https://login.live.com/oauth20_desktop.srf?code=${value}`;
        GM_setValue("Config.code", full);
        GM_setValue("Config.token", false);
        GM_setValue("Config.codeTime", Date.now());
        GM_setValue("Config.codeManual", true);
        GM_setValue("Config.lastAuthPrompt", 0);
        GM_setValue("Config.lastTokenError", null);
        return isCode ? "ok-code" : "ok-unknown";
    };

    // 首选入口：ScriptCat 原生输入框。它不依赖页面 prompt（页面 CSP 可能拦 prompt），
    // 在后台脚本里也能弹，是当前环境下最可靠的粘贴方式。
    if (typeof CAT_registerMenuInput === "function") {
        try {
            CAT_registerMenuInput("📋 粘贴授权码（输入框）", (value) => {
                const r = applyPastedCode(value);
                let msg;
                if (r === "ok-refresh") {
                    msg = "已识别为 refresh token，已保存。下一轮运行会直接用它刷新，无需再授权";
                    try { GM_log("🟢 已保存 refresh token（输入框）"); } catch (e) {}
                } else if (r === "ok-code") {
                    msg = "已识别为授权码（SN1），已保存。下一轮运行会立刻换取 token";
                    try { GM_log("🟢 授权码已手动更新（输入框）"); } catch (e) {}
                } else if (r === "ok-unknown") {
                    msg = "已按授权码保存，但格式无法识别（既不是 SN1 也不是 MsaArtifacts），可能无效";
                    try { GM_log("🟡 已保存未识别格式的凭证（输入框）"); } catch (e) {}
                } else if (r === "invalid") {
                    msg = "未识别到凭证（应以 M. 开头），请重试";
                } else {
                    msg = "输入为空";
                }
                try { GM_notification({ text: msg, title: GM_info.script.name, onclick: () => {} }); } catch (e) {}
            }, {
                inputType: "text",
                title: "粘贴授权码或 refresh token",
                inputLabel: "M. 开头的授权码（SN1）或 refresh token（MsaArtifacts）",
                inputPlaceholder: "https://login.live.com/oauth20_desktop.srf?code=M... 或 M.C529_BL2.2...",
            });
        } catch (e) {}
    }

    GM_registerMenuCommand("📋 粘贴授权码", () => {
        let text = null;
        try { text = prompt("请粘贴授权码（M.C529_SN1...）或 refresh token（M.C529_BL2.2...），也可粘完整 URL："); } catch (e) { text = null; }
        if (text == null) {
            GM_notification({
                text: "当前环境不支持弹窗输入，请把授权码链接粘贴到脚本设置 → Config → 授权码链接",
                title: GM_info.script.name,
                onclick: () => {}
            });
            return;
        }
        const r = applyPastedCode(text);
        if (r === "invalid") {
            GM_notification({ text: "未识别到凭证（应以 M. 开头），请重试", title: GM_info.script.name, onclick: () => {} });
            return;
        }
        const msg = r === "ok-refresh"
            ? "已识别为 refresh token 并保存，下一轮运行直接刷新"
            : (r === "ok-code"
                ? "已识别为授权码并保存，下一轮运行换取 token"
                : "已按授权码保存，但格式无法识别，可能无效");
        GM_notification({ text: msg, title: GM_info.script.name, onclick: () => {} });
        FuckF.log(r === "ok-refresh" ? "🟢" : "🟡", msg);
    });
}

// ===== 内容脚本分支：打开 dashboard 时点击"每日额外积分"按钮（上游 3.6.50 合并）=====
if (typeof window !== 'undefined' && window.location && window.location.hostname === "rewards.bing.com" && (window.location.pathname === "/dashboard" || window.location.pathname.startsWith("/dashboard"))) {
    FuckF.claimExtraPoints();
    // 同源兜底领取：页面上下文 fetch 的 Origin 天然为站点同源，
    // 可绕过 service_worker 扩展 origin 被风控账号 500 拒绝的问题（领取接口幂等）
    (async () => {
        try {
            const dashHtml = document.documentElement.innerHTML || "";
            const clean = dashHtml.replace(/\\"/g, '"');
            const claimMatch = clean.match(/"pointClaim":(null|\{|\[)/);
            if (!claimMatch || claimMatch[1] === "null") return;
            const actionInfo = await FuckF.getRewardsAction();
            const claimId = actionInfo.ids.reportClaimAllPoints || "00491296f1d668ad46b65342c95cb9d72a62c1fa9d";
            const resp = await fetch("https://rewards.bing.com/earn", {
                method: "POST",
                credentials: "include",
                headers: {
                    "content-type": "text/plain;charset=UTF-8",
                    "next-action": claimId,
                    "next-router-state-tree": FuckF.getRouterStateTree("earn"),
                },
                body: JSON.stringify([]),
            });
            if (resp.ok && /^\d+:true\s*$/m.test(await resp.text())) {
                FuckF.log("✨", "页面上下文同源兜底领取成功");
            }
        } catch (e) {}
    })();
    return;
}

return new Promise((resolveRaw) => {
    // 运行锁：cron 与手动 run 可能重叠，重叠会让同一批任务被并发上报（判重或重复计时）。
    // 用心跳续期：运行期间每 60 秒刷新一次时间戳，超过 3 分钟没心跳视为上次被强杀（装新版本、重启浏览器都会），
    // 这样既能拦住并发，又不会因为实例被杀而白等 10 分钟。
    const LOCK_STALE = 3 * 60 * 1000;
    const lockAt = Number(GM_getValue("Config.runLock", 0)) || 0;
    if (lockAt && Date.now() - lockAt < LOCK_STALE) {
        GM_log(`[lock] 上一次运行仍在进行（${Math.round((Date.now() - lockAt) / 1000)} 秒前心跳），本次跳过`);
        return resolveRaw();
    }
    const refreshLock = () => { try { GM_setValue("Config.runLock", Date.now()); } catch (e) {} };
    refreshLock();
    const lockTimer = setInterval(refreshLock, 60 * 1000);
    const resolve = (v) => {
        try { clearInterval(lockTimer); } catch (e) {}
        try { GM_setValue("Config.runLock", 0); } catch (e) {}
        return resolveRaw(v);
    };

    const seconds = FuckF.getTimestamp()
    GM_cookie("delete", { url: "https://bing.com", name: "_EDGE_S" })
    FuckD.search.limit = FuckF.getScopeRandomNum(4, 7)
    FuckD.bing.dateNowNum = FuckF.getDatetime(true)
    FuckD.bing.dateNowhyphen = FuckF.getDatetime(false, false)
    const tasksArr = GM_getValue("Config.tasks", false)
    FuckD.sign.date = tasksArr ? tasksArr.sign : 0
    FuckD.read.date = tasksArr ? tasksArr.read : 0
    FuckD.promos.date = tasksArr ? tasksArr.promos : 0
    FuckD.streak.date = tasksArr ? tasksArr.streak : 0
    FuckD.search.date = tasksArr ? tasksArr.search : 0
    // 月度打卡每日完成状态此前未回读，导致每次定时运行都重新执行并重复推送
    if (FuckD.api.mode != "offline") {
        const defaultApiName = "hot.baiwumm.com"
        const currentApiName = GM_getValue("Config.api", defaultApiName)
        const apiConfigMap = new Map(FuckD.api.arr)
        const getConfigApi = apiConfigMap.get(currentApiName) || apiConfigMap.get(defaultApiName)
        FuckD.api.url = getConfigApi.url
        FuckD.api.hot = getConfigApi.hot
        if (!apiConfigMap.has(currentApiName)) {
            GM_setValue("Config.api", "offline")
            FuckF.log("🟡", "搜索词接口配置错误，已替换为offline")
        }
    }

    FuckF.tasksEnd = async () => {
        if (FuckD.bing.code < 0) {
            if (FuckD.bing.code === -1) {
                FuckD.bing.code = -2;
                FuckD.bing.sendMSG = `🚫当前 IP 非中国大陆地区，已停止运行！\n⛔IP 地址：${FuckD.bing.ip} - ${FuckD.bing.region}${FuckD.bing.ipInfo}`;
                FuckF.log("🔴", FuckD.bing.sendMSG, true);
                FuckF.send(FuckD.wh);
            }
            return resolve();
        }
        const endS = !FuckD.tasks.sign || FuckD.sign.end > 0;
        const endR = !FuckD.tasks.read || FuckD.read.end > 0;
        const endP = !FuckD.tasks.promos || FuckD.promos.end > 0;
        const endSe = !FuckD.tasks.search || FuckD.search.end > 0;
        if (endS && endR && endP && endSe) {
            FuckD.bing.end--
            if (FuckD.bing.end === 0) {
                const checkDone = (taskEnabled, taskDate) => !taskEnabled || taskDate == FuckD.bing.dateNowNum;
                const isAllDone = checkDone(FuckD.tasks.sign, FuckD.sign.date) && checkDone(FuckD.tasks.read, FuckD.read.date) && checkDone(FuckD.tasks.promos, FuckD.promos.date) && checkDone(FuckD.tasks.search, FuckD.search.date);
                if (isAllDone) {
                    const allDoneDate = GM_getValue("Config.allDoneDate", 0);
                    if (allDoneDate != FuckD.bing.dateNowNum) {
                        GM_setValue("Config.allDoneDate", FuckD.bing.dateNowNum);
                        const dashboard = await FuckF.getRewardsInfo();
                        const counters = dashboard?.userStatus?.counters || {};
                        const pcPro = counters.pcSearch?.[0]?.pointProgress || 0;
                        const mPro = counters.mobileSearch?.[0]?.pointProgress || 0;
                        const readPro = (FuckD.read.date == FuckD.bing.dateNowNum) ? GM_getValue("Config.readPoint", 0) : 0;
                        const promosPro = (FuckD.promos.date == FuckD.bing.dateNowNum) ? GM_getValue("Config.promosPoint", 0) : 0;
                        const signPro = (FuckD.sign.date == FuckD.bing.dateNowNum) ? GM_getValue("Config.signPoint", 0) : 0;
                        const todayPoints = pcPro + mPro + readPro + promosPro + signPro;
                        const availablePoints = dashboard?.userStatus?.availablePoints || 0;
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        FuckD.bing.sendMSG = `🎉今日所选任务已全部完成！\n✨今日共获取：${todayPoints} 积分\n💰 当前总积分：${availablePoints} 积分`;
                        FuckF.log("🔵", FuckD.bing.sendMSG, true);
                        FuckF.send(FuckD.wh);
                    } else {
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        FuckF.log("💤", "今日所选任务已全部完成，继续保持休眠...");
                    }
                } else {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    FuckF.log("🔵", `本次运行结束！用时 ${(FuckF.getTimestamp() - seconds) / 1000} 秒`);
                }
            }
            resolve()
        }
    }

    FuckF.signStart = async () => {
        const result = await FuckF.taskSign()
        if (!result) {
            setTimeout(() => { FuckF.signStart() }, FuckD.bing.time)
        } else {
            FuckF.tasksEnd()
        }
    }

    FuckF.readStart = async () => {
        const result = await FuckF.taskRead()
        if (!result) {
            setTimeout(() => { FuckF.readStart() }, FuckD.bing.time)
        } else {
            FuckF.tasksEnd()
        }
    }

    FuckF.promosStart = async () => {
        const result = await FuckF.taskPromos()
        if (!result) {
            setTimeout(() => { FuckF.promosStart() }, FuckD.bing.time)
        } else {
            await FuckF.taskStreak()
            await FuckF.taskClaim(lastRewardHtml)
            FuckF.tasksEnd()
        }
    }

    FuckF.searchStart = async () => {
        const result = await FuckF.taskSearch()
        if (!result) {
            let timespan = FuckD.bing.time
            if (FuckD.search.index < FuckD.search.limit) {
                const span = Number(FuckD.bing.span) || 30;
                const spanMIN = (span - 15) * 1000
                const spanMAX = (span + 15) * 1000
                timespan = FuckF.getScopeRandomNum(spanMIN, spanMAX)
            }
            FuckF.log("🔍", `第 ${FuckD.search.index}/${FuckD.search.limit} 次搜索完成\n(${FuckD.search.device})，等待 ${timespan / 1000} 秒后继续...`)
            setTimeout(() => { FuckF.searchStart() }, timespan)
        } else {
            await FuckF.taskClaim()
            FuckF.tasksEnd()
        }
    }

    FuckF.tasksStart = async (initDelay = 0) => {
        // [PATCH] 原版此处校验 GM_info.script.author == "geoisam@qq.com"，
        // 是为了防止别人改名后二次分发。维护版已按 GPL-3.0 合法修改并标注原作者，
        // 作者名（@author）不再是原作者，该校验会导致整个任务流程直接 return，必须移除。
        const host = "www.bing.com"
        if (!FuckD.bing.host) {
            if (FuckD.bing.status) {
                FuckD.bing.host = "cn.bing.com"
            } else {
                let url = await FuckF.xhr({
                    url: `https://${host}/`,
                    headers: {
                        "cookie": FuckD.cookie.mkt,
                    },
                }, true)
                url = new URL(url)
                FuckD.bing.host = url ? url.host : host
            }
        }

        const envStatus = await FuckF.mainlandCheck()
        if (envStatus === 1) {
            FuckD.bing.code = -1
            FuckF.tasksEnd()
            return resolve()
        } else if (envStatus === 2) {
            FuckD.bing.sendMSG = "🚫网络连接异常，已停止运行！";
            FuckF.log("🔴", FuckD.bing.sendMSG, true);
            FuckF.send(FuckD.wh);
            return resolve();
        } else {
            const isKeep = GM_getValue("Config.keep", true);
            const needSign = FuckD.tasks.sign && (isKeep || FuckD.sign.date != FuckD.bing.dateNowNum);
            const needRead = FuckD.tasks.read && (isKeep || FuckD.read.date != FuckD.bing.dateNowNum);
            const needPromos = FuckD.tasks.promos && (isKeep || FuckD.promos.date != FuckD.bing.dateNowNum);
            const needSearch = FuckD.tasks.search && (isKeep || FuckD.search.date != FuckD.bing.dateNowNum);
            FuckF.log("🔵", `初始化运行完成！用时 ${((FuckF.getTimestamp() - seconds) - initDelay) / 1000} 秒`);
            const isTokenOK = await FuckF.renewToken();
            if (!isTokenOK) {
                FuckD.tasks.sign = false;
                FuckD.tasks.read = false;
                // renewToken 内部已经写过具体原因（code 无效 / 网络异常），这里只在它没写时才补一条，
                // 避免「Token 请求失败，请检查网络连接」这种误导性文案盖掉真实错误。
                const detailed = String(FuckD.bing.sendMSG || "");
                if (!/授权码无效|重新授权失败|Token 被拒绝/.test(detailed)) {
                    FuckD.bing.sendMSG = detailed
                        ? detailed
                        : "Token 获取失败，已跳过签入/阅读任务。请用菜单「🔍 检查授权状态」查看原因";
                    await new Promise(resolve => setTimeout(resolve, 500));
                    FuckF.log("🟡", FuckD.bing.sendMSG, true);
                    FuckF.send(FuckD.wh);
                }
            }
            // Edge 浏览连签：与主流程解耦的后台计时上报（约 30 分钟），需 dapi Token；不阻塞本次运行 resolve
            if (FuckD.tasks.edge && FuckD.bing.token) {
                FuckF.taskEdgeBrowsing().catch(e => FuckF.log("🔴", `Edge 浏览连签调度异常！🔛${e.message}`));
            }
            // [PATCH] 通用任务收割：网页交卷通道已下线，改用 dapi type101 逐项上报
            // Sapphire / Evergreen / 每日任务全套，每天一轮
            // [PATCH] 必须 await：这两个任务内部有随机等待（最长数十秒），
            // 若 fire-and-forget，脚本在任务全部完成后 resolve，service worker 被回收，等待中的收割会被直接掐断。
            if (FuckD.bing.token) {
                try { await FuckF.taskHarvest(); } catch (e) { FuckF.log("🔴", `任务收割异常！🔛${e.message}`); }
            }
            // [PATCH] HPQuiz：bing.com + funapi 独立通道，不依赖 dapi token。
            // 放在这里而不是外层流程，是为了复用上面的随机停留，避免每次 cron 准点开跑。
            try { await FuckF.taskHPQuiz(); } catch (e) { FuckF.log("🔴", `HPQuiz 异常！🔛${e.message}`); }
            // 每日汇总：收割与问答各自维护当日累计，这里合并成一行，便于一眼看到今天赚了多少
            try {
                const today = FuckD.bing.dateNowNum;
                const hs = GM_getValue(FuckF.HARVEST_KEY, {}) || {};
                const qs = GM_getValue(FuckF.QUIZ_KEY, {}) || {};
                const lg = GM_getValue("Config.ledger", {}) || {};
                const hp = hs.date == today ? (hs.point || 0) : 0;
                const qp = qs.date == today ? (qs.point || 0) : 0;
                const tt = GM_getValue("Config.todayTotal", null);
                const siteTotal = Number((tt && tt.date == today ? tt.total : 0) || FuckD.bing.todayTotalPoints || 0);
                if (siteTotal > 0) {
                    // 站方当日报表最准：包含签入/阅读/搜索/活动/收割全部来源
                    FuckF.log("📊", `今日站方统计 +${siteTotal} 分（本脚本收割 +${hp}，HPQuiz +${qp}，其余为签入/阅读/搜索/活动）`);
                } else if (hp > 0 || qp > 0) {
                    FuckF.log("📊", `今日累计 +${hp + qp} 分（任务收割 +${hp}，HPQuiz +${qp}）`);
                }
                // 台账明细：按任务名列出当日每一笔到账，跨轮次累加
                if (lg.date == today && lg.items && Object.keys(lg.items).length) {
                    const detail = Object.entries(lg.items).map(([n, p]) => `${n} +${p}`).join("，");
                    FuckF.log("📒", `今日台账（${Object.keys(lg.items).length} 项，共 +${lg.total}）：${detail}`);
                }
            } catch (e) {}
            if (needPromos || needSearch) {
                const result = await FuckF.getRewardsInfo();
                if (!result) {
                    FuckD.bing.sendMSG = "⚠️请检查 rewards.bing.com 是否登录！";
                    FuckF.log("🔴", FuckD.bing.sendMSG, true);
                    FuckF.send(FuckD.wh);
                    return resolve();
                } else {
                    if (needPromos) setTimeout(() => { FuckF.promosStart() }, FuckD.bing.time * 2);
                    if (needSearch) {
                        const counters = result.userStatus?.counters || {};
                        const pcPro = counters.pcSearch?.[0]?.pointProgress || 0;
                        let pcMax = counters.pcSearch?.[0]?.pointProgressMax || 0;
                        const mPro = counters.mobileSearch?.[0]?.pointProgress || 0;
                        let mMax = counters.mobileSearch?.[0]?.pointProgressMax || 0;
                        if (pcMax === 0) pcMax = 60;
                        if (mMax === 0) mMax = 0;
                        if (pcPro >= pcMax && mPro >= mMax) {
                            FuckD.search.end++;
                            if (FuckD.search.date != FuckD.bing.dateNowNum) {
                                FuckD.search.date = FuckD.bing.dateNowNum;
                                GM_setValue("Config.tasks", FuckD.bing.tasks);
                                const pcReport = pcMax ? `\n💻电脑端搜索：${pcPro}/${pcMax}` : "";
                                const mReport = mMax ? `\n📱手机端搜索：${mPro}/${mMax}` : "";
                                FuckD.bing.sendMSG = `🔍搜索任务已完成！${pcReport}${mReport}`;
                                FuckF.log("🔵", FuckD.bing.sendMSG, true);
                                FuckF.send(FuckD.wh);
                            }
                            FuckF.tasksEnd();
                        } else {
                            FuckF.log("🔍", "检测到搜索积分未满，开始搜索...");
                            setTimeout(() => { FuckF.searchStart() }, 100);
                        }
                    } else {
                        FuckF.searchStart();
                    }
                }
            } else {
                FuckF.promosStart();
                FuckF.searchStart();
            }
            if (needSign) {
                setTimeout(() => { FuckF.signStart() }, FuckD.bing.time);
            } else {
                FuckF.signStart();
            }
            if (needRead) {
                setTimeout(() => { FuckF.readStart() }, FuckD.bing.time * 3);
            } else {
                FuckF.readStart();
            }
        }
    }
    const isKeep = GM_getValue("Config.keep", true);
    const checkDone = (taskEnabled, taskDate) => !taskEnabled || taskDate == FuckD.bing.dateNowNum;
    const isAllDone = checkDone(FuckD.tasks.sign, FuckD.sign.date) && checkDone(FuckD.tasks.read, FuckD.read.date) && checkDone(FuckD.tasks.promos, FuckD.promos.date) && checkDone(FuckD.tasks.search, FuckD.search.date) ;
    // [PATCH] 任务收割与 HPQuiz 已移到 tasksStart 内部（复用随机停留，避免准点特征），
    // 此处不再重复调用。
    if ((!isKeep && isAllDone) || !FuckD.bing.repo.includes("geoisam") || (!FuckD.tasks.sign && !FuckD.tasks.read && !FuckD.tasks.promos && !FuckD.tasks.search )) {
        if (isAllDone) {
            const allDoneDate = GM_getValue("Config.allDoneDate", 0);
            if (allDoneDate != FuckD.bing.dateNowNum) {
                GM_setValue("Config.allDoneDate", FuckD.bing.dateNowNum);
                FuckF.getRewardsInfo().then(dashboard => {
                    const counters = dashboard?.userStatus?.counters || {};
                    const pcPro = counters.pcSearch?.[0]?.pointProgress || 0;
                    const mPro = counters.mobileSearch?.[0]?.pointProgress || 0;
                    const readPro = (FuckD.read.date == FuckD.bing.dateNowNum) ? GM_getValue("Config.readPoint", 0) : 0;
                    const promosPro = (FuckD.promos.date == FuckD.bing.dateNowNum) ? GM_getValue("Config.promosPoint", 0) : 0;
                    const signPro = (FuckD.sign.date == FuckD.bing.dateNowNum) ? GM_getValue("Config.signPoint", 0) : 0;
                    const todayPoints = pcPro + mPro + readPro + promosPro + signPro;
                    const availablePoints = dashboard?.userStatus?.availablePoints || 0;
                    setTimeout(() => {
                        FuckD.bing.sendMSG = `🎉今日所选任务已全部完成！\n✨今日共获取：${todayPoints} 积分\n💰 当前总积分：${availablePoints} 积分`;
                        FuckF.log("🔵", FuckD.bing.sendMSG, true);
                        FuckF.send(FuckD.wh);
                        resolve();
                    }, 1000);
                });
            } else {
                setTimeout(() => {
                    FuckF.log("💤", "今日所选任务已全部完成，继续保持休眠...");
                    resolve();
                }, 1000);
            }
        } else {
            resolve();
        }
    } else {
        //const initDelay = FuckF.getScopeRandomNum(1000, 1000);
        //调试用，1秒停留时间
        const initDelay = FuckF.getScopeRandomNum(5000, 95000);
        FuckF.log("⏳", `为规避定时器特征，停留 ${initDelay / 1000} 秒后运行...`);
        setTimeout(() => {
            FuckF.tasksStart(initDelay);
        }, initDelay);
    }
})
