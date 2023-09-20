"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatNetlifyDiscordMessage = void 0;
function formatNetlifyDiscordMessage(data) {
    const getStatusColor = (state) => {
        switch (state) {
            case 'ready':
                return 3066993; // Green
            case 'error':
                return 16711680; // Red
            case 'building':
                return 16753920; // Orange
            default:
                return 8421504; // Gray
        }
    };
    const getDeployDescription = (state) => {
        switch (state) {
            case 'ready':
                return `The site **[${data.name}](${data.url})** is ready!`;
            case 'error':
                return `There was an error deploying the site **[${data.name}](${data.url})**.`;
            case 'building':
                return `The site **[${data.name}](${data.url})** is currently building.`;
            default:
                return `The site **[${data.name}](${data.url})** is in the state: ${data.state}.`;
        }
    };
    return {
        embeds: [
            {
                title: "Netlify Deploy Update",
                description: getDeployDescription(data.state),
                color: getStatusColor(data.state),
                thumbnail: {
                    url: "https://cdn.dribbble.com/users/1059367/screenshots/2719107/bot_2.gif" // Netlify logo
                },
                author: {
                    name: "Netlify",
                    icon_url: "https://th.bing.com/th/id/OIP.Nsf0nb8nB7JNEQgygk8ezwHaHa?pid=ImgDet&rs=1",
                },
                fields: [
                    {
                        name: "Build Context",
                        value: data.context,
                        inline: true,
                    }
                ],
                footer: {
                    text: "Netlify Deploy Notifications",
                    icon_url: "https://jeancochrane.com/static/images/blog/netlify-identity-dealbreakers/netlify-logo.png"
                },
                timestamp: new Date().toISOString(),
            },
        ],
    };
}
exports.formatNetlifyDiscordMessage = formatNetlifyDiscordMessage;
