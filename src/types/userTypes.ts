export interface RepoProps {
  id: number;
  name: string;
  html_url: string;
  language: string | null;
}

export interface UserDetailProps {
  user: {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
    name?: string;
    bio?: string;
  };
  repos: RepoProps[];
}

export interface UserProps {
  id: number;
  login: string;
  html_url: string;
  avatar_url: string;
  isFavorite?: boolean;
}

export interface UserListProps {
  users: UserProps[];
  toggleFavorite: (id: number) => void;
}
