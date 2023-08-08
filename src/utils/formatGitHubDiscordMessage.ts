import { GithubWebhookBody } from "../interfaces/GitHubWebhookBody";

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function truncateAndCleanMessage(
  message: string,
  maxLength: number = 50
): string {
  // Remove any line breaks and truncate the message if it's too long
  let cleanedMessage = message.replace(/\r?\n|\r/g, " ").trim();
  if (cleanedMessage.length > maxLength) {
    cleanedMessage = cleanedMessage.substring(0, maxLength - 3) + "...";
  }
  return cleanedMessage;
}

export function formatGitHubDiscordMessage(data: GithubWebhookBody): any {
  const repoName = data.repository.name;
  const pusherName = data.pusher.name;
  const branch = data.ref.split("/").pop();
  const timestamp = new Date(Number(data.repository.pushed_at) * 1000);
  const formattedDate = timestamp.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const dateComponents = formattedDate.split(/[\s,]+/); // Split by spaces and commas
  const capitalizedDate = dateComponents.map(capitalizeFirstLetter).join(" ");
  const commits = data.commits;
  const pusherAvatar = data.sender.avatar_url;

  let commitMessages = "";
  commits.forEach((commit, index) => {
    const cleanedCommitMessage = truncateAndCleanMessage(commit.message);
    commitMessages += `\n**[${index + 1}. ${cleanedCommitMessage}]** (by *${
      commit.author.name
    }*)`;
  });

  if (data.deleted) {
    return {
      embeds: [
        {
          title: "🔥 Branch Deleted",
          url: `https://github.com/${pusherName}/${repoName}`,
          color: 16711680, // Red color for deletion
          author: {
            name: pusherName,
            icon_url: pusherAvatar,
          },
          description: `Branch \`${branch}\` has been deleted.`,
          fields: [
            {
              name: "Repository",
              value: `[${repoName}](https://github.com/${pusherName}/${repoName})`,
              inline: true,
            },
            {
              name: "Time",
              value: capitalizedDate,
              inline: true,
            },
          ],
          thumbnail: {
            url: "https://blog.rapidapi.com/wp-content/uploads/2017/01/octocat.gif",
          },
          footer: {
            text: "Branch deletion event",
          },
          timestamp: new Date().toISOString(),
        },
      ],
    };
  }

  // Use embed format
  const message = {
    embeds: [
      {
        title: "📣 New Push Event",
        url: `https://github.com/${pusherName}/${repoName}`, // Add URL to repository
        color: 3447003,
        author: {
          name: pusherName,
          icon_url: pusherAvatar,
        },
        fields: [
          {
            name: "Repository",
            value: `[${repoName}](https://github.com/${pusherName}/${repoName})`, // Add link to repository
            inline: true,
          },
          {
            name: "Branch",
            value: branch,
            inline: true,
          },
          {
            name: "Time",
            value: capitalizedDate,
            inline: true,
          },
          {
            name: "Commits",
            value: commitMessages,
          },
        ],
        image: {
          url: "https://opensource.com/sites/default/files/styles/image-full-size/public/lead-images/github-universe.jpg?itok=lwRZddXA",
        },
        thumbnail: {
          url: "https://blog.rapidapi.com/wp-content/uploads/2017/01/octocat.gif",
        },
        footer: {
          text: `${data.commits.length} commits in this push`,
        },
        timestamp: new Date().toISOString(),
      },
    ],
  };

  return message;
}
