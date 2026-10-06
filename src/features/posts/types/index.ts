export interface PostAuthor {
  name: string;
  photo?: string | null;
  [key: string]: any;
}

export interface PostComment {
  id: number | string;
  comment: string;
  created_at: string;
  updated_at: string;
  [key: string]: any;
}

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

export interface PostQueryParams {
  is_me?: number | string | boolean;
  [key: string]: any;
}

export interface CreatePostPayload {
  description: string;
}

export interface UpdatePostPayload {
  description: string;
}

export interface AddLikePayload {
  like: 1 | 0;
}

export interface AddCommentPayload {
  comment: string;
}

export interface PostApiResponse<T = any> {
  status?: "success" | "fail" | string;
  message?: string;
  data?: T;
  [key: string]: any;
}
export interface PostsState {
  // Data koleksi
  posts: Post[];
  post: Post | null;
  isPost: boolean;

  // Pelacakan status mutasi aksi (Loading & Success)
  isPostAdd: boolean;
  isPostAdded: boolean;

  isPostChange: boolean;
  isPostChanged: boolean;

  isPostChangeCover: boolean;
  isPostChangedCover: boolean;

  isPostDelete: boolean;
  isPostDeleted: boolean;

  isPostLike: boolean;
  isPostLiked: boolean;

  isPostAddComment: boolean;
  isPostAddedComment: boolean;

  isPostDeleteComment: boolean;
  isPostDeletedComment: boolean;

  isPostDeleteAll: boolean;
  isPostDeletedAll: boolean;

  // Status error & pesan
  error: string | null;
  message: string | null;
}