export interface GithubWebhookBody {
  repository: {
    name: string;
    pushed_at: string;
  };
  pusher: {
    name: string;
    avatar_url: string; // Optional avatar URL
  };
  ref: string;
  commits: {
    message: string;
    author: {
      name: string;
    };
  }[];
};
