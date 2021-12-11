async function webhookSendError(errorData,id) {
    const
        {WebhookClient} = require("discord.js"),
        webClient = new WebhookClient({url: process.env.URL});
    webClient.send({
        embeds: [{
            title: `${errorData.status_code} - Error!`,
            description: `Error Appeared at: \`\`\`${errorData[0].date}\`\`\`\nError ID:\`\`\`${id}\`\`\`\nStatus Text:\`\`\`${errorData[0].status_text}\`\`\`\nResult Json: \`\`\`${errorData[0].result_json}\`\`\``,
            color: "RANDOM",
            author: {iconURL: "https://cdn.discordapp.com/avatars/778408564494565396/851ed4259c30981420114f509997e97f.png", name: "SteamLogin - Error Appeared!"},
        }]
    })
}

module.exports = {webhookSendError}