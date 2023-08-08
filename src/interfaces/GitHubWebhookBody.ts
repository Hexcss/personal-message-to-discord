export interface GithubWebhookBody {
  repository: {
    name: string;
    pushed_at: string;
  };
  pusher: {
    name: string;
  };
  ref: string;
  commits: {
    message: string;
    author: {
      name: string;
    };
  }[];
};
