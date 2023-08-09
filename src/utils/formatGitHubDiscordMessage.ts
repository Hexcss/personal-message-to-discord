import { GithubWebhookBody } from "../interfaces/GitHubWebhookBody";
import { getCommonVariables, truncateAndCleanMessage } from "./functions";

function branchCreatedEmbed(data: GithubWebhookBody): any {
  const { repoName, pusherName, branch, capitalizedDate, pusherAvatar } = getCommonVariables(data);

  return {
    embeds: [
      {
        title: "🌱 New Branch Created",
        url: `https://github.com/${pusherName}/${repoName}`,
        color: 65280, // Green color for branch creation
        author: {
          name: pusherName,
          icon_url: pusherAvatar,
        },
        description: `Branch \`${branch}\` has been created.`,
        fields: [
          {
            name: "Repository",
            value: `[${repoName}](https://github.com/${pusherName}/${repoName})`,
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
        ],
        thumbnail: {
          url: "https://blog.rapidapi.com/wp-content/uploads/2017/01/octocat.gif",
        },
        footer: {
          text: "Branch creation event",
        },
        timestamp: new Date().toISOString(),
      },
    ],
  };
}

function branchDeletedEmbed(data: GithubWebhookBody): any {
  const { repoName, pusherName, branch, capitalizedDate, pusherAvatar } = getCommonVariables(data);

  return {
    embeds: [
      {
        title: "🔥 Branch Deleted",
        url: `https://github.com/${pusherName}/${repoName}`,
        color: 16711680, // Red color for branch deletion
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
            name: "Branch",
            value: branch,
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

function pushEventEmbed(data: GithubWebhookBody): any {
  const { repoName, pusherName, branch, capitalizedDate, pusherAvatar } = getCommonVariables(data);
  const commits = data.commits;

  let commitMessages = "";
  commits.forEach((commit, index) => {
    const cleanedCommitMessage = truncateAndCleanMessage(commit.message);
    commitMessages += `\n**[${index + 1}. ${cleanedCommitMessage}]** (by *${
      commit.author.name
    }*)`;
  });

  return {
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
}

export function formatGitHubDiscordMessage(data: GithubWebhookBody): any {
  if (data.deleted) return branchDeletedEmbed(data);
  if (data.created) return branchCreatedEmbed(data);
  return pushEventEmbed(data);
}
