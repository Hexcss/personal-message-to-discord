import { NetlifyWebhookBody } from "../interfaces/NetlifyWebhookBody";

export function formatNetlifyDiscordMessage(data: NetlifyWebhookBody): any {

  const getStatusColor = (state: string) => {
    switch (state) {
      case 'deployed':
        return 3066993; // Green
      case 'error':
        return 16711680; // Red
      case 'building':
        return 16753920; // Orange
      default:
        return 8421504; // Gray
    }
  };

  return {
    embeds: [
      {
        title: "Netlify Deploy Update",
        description: `The site **[${data.name}](${data.site_url})** has been ${data.state}.`,
        color: getStatusColor(data.state),
        thumbnail: {
          url: "https://www.netlify.com/img/press/logos/logomark.png" // Netlify logo
        },
        author: {
          name: "Netlify",
          icon_url: "https://www.netlify.com/img/press/logos/logomark.png",
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
          icon_url: "https://www.netlify.com/img/press/logos/logomark.png"
        },
        timestamp: new Date().toISOString(),
      },
    ],
  };
}
