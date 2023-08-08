export interface GithubWebhookBody {
  repository: {
    name: string;
    pushed_at: string;
  };
  pusher: {
    name: string;
  };
  sender: {
    avatar_url: string; 
  };
  ref: string;
  commits: {
    message: string;
    author: {
      name: string;
    };
  }[];
  deleted: boolean;
  created: boolean;
};
