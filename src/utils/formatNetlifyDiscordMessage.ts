import { NetlifyWebhookBody } from "../interfaces/NetlifyWebhookBody";

export function formatNetlifyDiscordMessage(data: NetlifyWebhookBody): any {
  return {
    embeds: [
      {
        title: "Netlify Deploy Notification",
        description: `Site: [${data.name}](${data.site_url})`,
        color: data.state === 'deployed' ? 3066993 : 15844367, // Green for deployed, Orange for other states
        fields: [
          {
            name: "Status",
            value: data.state.charAt(0).toUpperCase() + data.state.slice(1), // Capitalize the status
            inline: true,
          },
          {
            name: "Context",
            value: data.context,
            inline: true,
          }
        ],
        timestamp: new Date().toISOString(),
      },
    ],
  };
}
