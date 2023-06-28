inject();

async function inject() {
    const bot = await fetch("/api/bot").then((res) => res.json());

    // scan for all text node
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
        {
            acceptNode: (node) => {
                if (node.nodeType === Node.TEXT_NODE) {
                    return NodeFilter.FILTER_ACCEPT;
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    if (node.tagName === "INPUT" || node.tagName === "TEXTAREA") {
                        return NodeFilter.FILTER_ACCEPT;
                    }
                }
                return NodeFilter.FILTER_SKIP;
            },
        },
    );

    const texts = [];
    while (walker.nextNode()) {
        texts.push(walker.currentNode);
    }

    // replace all text node
    for (const node of texts) {
        const content = node.textContent;
        if (content.match(/{.+?}/g) === null) {
            continue;
        }

        const replaced = content.replace(/{(.+?)}/g, (_, key) => {
            const value = resolve({ bot }, key);
            if (value === undefined) {
                return `{${key}}`;
            } else if (typeof value === "object") {
                return JSON.stringify(value, null, 4);
            } else {
                return value;
            }
        });

        node.parentElement.dataset.raw = content;
        node.textContent = replaced;
    }

    const elements = [...document.querySelectorAll("body *")];
    for (const elm of elements) {
        for (const attr of elm.getAttributeNames()) {
            const value = elm.getAttribute(attr);
            if (attr.startsWith("data-") || value.match(/{.+?}/g) === null) {
                continue;
            }

            const replaced = value.replace(/{(.+?)}/g, (_, key) => {
                const value = resolve({ bot }, key);
                if (value === undefined) {
                    return `{${key}}`;
                } else {
                    return value;
                }
            });

            elm.dataset[`r${attr}`] = value;
            elm.setAttribute(attr, replaced);
        }
    }

    const src = new EventSource("/api/log");
    await new Promise((resolve) => setTimeout(resolve, 200));

    const messsages = document.querySelector(".messages");
    const template = messsages.innerHTML;
    messsages.innerHTML = "";

    src.addEventListener("message", (e) => {
        const msg = JSON.parse(e.data);
        const guild = bot.guilds.find((guild) => guild.id === msg.guild);
        msg.guild = guild.name;
        msg.channel = guild.channels.find((channel) => channel.id === msg.channel).name;

        const html = template.replace(/{(.+?)}/g, (_, key) => {
            const value = resolve({ msg, bot }, key);
            if (value === undefined) {
                return `{${key}}`;
            } else if (typeof value === "object") {
                return JSON.stringify(value, null, 4);
            } else {
                return value;
            }
        });

        messsages.insertAdjacentHTML("beforeend", html);
    });
}

function resolve(obj, path) {
    try {
        return path.split(".").reduce((obj, key) => obj[key], obj);
    } catch {
        return undefined;
    }
}
