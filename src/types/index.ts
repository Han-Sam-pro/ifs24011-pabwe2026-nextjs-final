/**
 * Interface Penulis Postingan
 */
export interface PostAuthor {
  id?: number | string;
  name: string;
  email?: string;
  photo?: string | null;
  avatar?: string | null;
  [key: string]: any;
}

/**
 * Interface Komentar Postingan
 */
export interface PostComment {
  id: number | string;
  post_id?: number | string;
  user_id?: number | string;
  comment: string;
  created_at: string;
  updated_at: string;
  user?: PostAuthor;
  [key: string]: any;
}

/**
 * Interface Entitas Postingan
 */
export interface Post {
  id: number | string;
  user_id: number | string;
  cover?: string | null;
  description: string;
  created_at: string;
  updated_at: string;
  author: PostAuthor;
  likes: (number | string)[];
  comments: (PostComment | number | string)[];
  my_comment?: PostComment | null;
  [key: string]: any;
}

/**
 * Interface Model Pengguna (User)
 */
export interface User {
  id: number | string;
  name: string;
  email: string;
  username?: string;
  photo?: string | null;
  avatar?: string | null;
  created_at?: string;
  updated_at?: string;
  [key: string]: any;
}

/**
 * Interface Respon Standar REST API Delcom
 */
export interface ApiResult<T = any> {
  status?: "success" | "fail" | "error" | string;
  message?: string;
  data?: T;
  [key: string]: any;
}