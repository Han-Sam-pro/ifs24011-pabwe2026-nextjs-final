import { describe, it, expect } from "vitest";
import postsReducer, { resetPostStatus } from "../reducer";
import {
  asyncGetPosts,
  asyncGetPostById,
  asyncCreatePost,
  asyncUpdatePost,
  asyncUploadPostCover,
  asyncDeletePost,
  asyncToggleLikePost,
  asyncAddPostComment,
  asyncDeletePostComment,
  asyncDeleteAllPosts,
} from "../action";
import { PostsState } from "../../types";

describe("features/posts/states/postsReducer", () => {
  const initial: PostsState = {
    posts: [],
    post: null,
    isPost: false,
    isPostAdd: false,
    isPostAdded: false,
    isPostChange: false,
    isPostChanged: false,
    isPostChangeCover: false,
    isPostChangedCover: false,
    isPostDelete: false,
    isPostDeleted: false,
    isPostLike: false,
    isPostLiked: false,
    isPostAddComment: false,
    isPostAddedComment: false,
    isPostDeleteComment: false,
    isPostDeletedComment: false,
    isPostDeleteAll: false,
    isPostDeletedAll: false,
    error: null,
    message: null,
  };

  it("harus mengembalikan state awal jika aksi tidak dikenal", () => {
    expect(postsReducer(undefined, { type: "UNKNOWN" })).toEqual(initial);
  });

  it("resetPostStatus harus mereset semua flag aksi dan error", () => {
    const dirtyState: PostsState = {
      ...initial,
      isPostAdded: true,
      isPostChanged: true,
      error: "Sample error",
    };
    const state = postsReducer(dirtyState, resetPostStatus());
    expect(state.isPostAdded).toBe(false);
    expect(state.isPostChanged).toBe(false);
    expect(state.error).toBeNull();
  });

  it("menangani alur asyncGetPosts (pending, fulfilled, rejected)", () => {
    let state = postsReducer(initial, { type: asyncGetPosts.pending.type });
    expect(state.isPost).toBe(true);

    const mockPosts = [{ id: 1, description: "Hello", author: { name: "John" }, likes: [], comments: [] }];
    state = postsReducer(state, { type: asyncGetPosts.fulfilled.type, payload: mockPosts });
    expect(state.isPost).toBe(false);
    expect(state.posts).toEqual(mockPosts);

    state = postsReducer(state, { type: asyncGetPosts.rejected.type, payload: "Error fetching" });
    expect(state.isPost).toBe(false);
    expect(state.error).toBe("Error fetching");
  });

  it("menangani alur asyncGetPostById", () => {
    let state = postsReducer(initial, { type: asyncGetPostById.pending.type });
    expect(state.isPost).toBe(true);

    const mockPost = { id: 1, description: "Detail", author: { name: "John" }, likes: [], comments: [] };
    state = postsReducer(state, { type: asyncGetPostById.fulfilled.type, payload: mockPost });
    expect(state.isPost).toBe(false);
    expect(state.post).toEqual(mockPost);

    state = postsReducer(state, { type: asyncGetPostById.rejected.type, payload: "Not found" });
    expect(state.isPost).toBe(false);
    expect(state.error).toBe("Not found");
  });

  it("menangani alur asyncCreatePost", () => {
    let state = postsReducer(initial, { type: asyncCreatePost.pending.type });
    expect(state.isPostAdd).toBe(true);
    expect(state.isPostAdded).toBe(false);

    state = postsReducer(state, { type: asyncCreatePost.fulfilled.type });
    expect(state.isPostAdd).toBe(false);
    expect(state.isPostAdded).toBe(true);

    state = postsReducer(state, { type: asyncCreatePost.rejected.type, payload: "Fail create" });
    expect(state.isPostAdd).toBe(false);
    expect(state.isPostAdded).toBe(false);
    expect(state.error).toBe("Fail create");
  });

  it("menangani alur asyncUpdatePost", () => {
    let state = postsReducer(initial, { type: asyncUpdatePost.pending.type });
    expect(state.isPostChange).toBe(true);

    state = postsReducer(state, { type: asyncUpdatePost.fulfilled.type });
    expect(state.isPostChange).toBe(false);
    expect(state.isPostChanged).toBe(true);

    state = postsReducer(state, { type: asyncUpdatePost.rejected.type, payload: "Fail update" });
    expect(state.isPostChange).toBe(false);
    expect(state.error).toBe("Fail update");
  });

  it("menangani alur asyncUploadPostCover", () => {
    let state = postsReducer(initial, { type: asyncUploadPostCover.pending.type });
    expect(state.isPostChangeCover).toBe(true);

    state = postsReducer(state, { type: asyncUploadPostCover.fulfilled.type });
    expect(state.isPostChangeCover).toBe(false);
    expect(state.isPostChangedCover).toBe(true);

    state = postsReducer(state, { type: asyncUploadPostCover.rejected.type, payload: "Fail cover" });
    expect(state.isPostChangeCover).toBe(false);
    expect(state.error).toBe("Fail cover");
  });

  it("menangani alur asyncDeletePost", () => {
    const withPostsState: PostsState = {
      ...initial,
      posts: [{ id: 1, description: "A" } as any, { id: 2, description: "B" } as any],
    };

    let state = postsReducer(withPostsState, { type: asyncDeletePost.pending.type });
    expect(state.isPostDelete).toBe(true);

    state = postsReducer(state, { type: asyncDeletePost.fulfilled.type, payload: { id: 1 } });
    expect(state.isPostDelete).toBe(false);
    expect(state.isPostDeleted).toBe(true);
    expect(state.posts.length).toBe(1);
    expect(state.posts[0].id).toBe(2);

    state = postsReducer(state, { type: asyncDeletePost.rejected.type, payload: "Fail delete" });
    expect(state.isPostDelete).toBe(false);
    expect(state.error).toBe("Fail delete");
  });

  it("menangani alur asyncToggleLikePost", () => {
    let state = postsReducer(initial, { type: asyncToggleLikePost.pending.type });
    expect(state.isPostLike).toBe(true);

    state = postsReducer(state, { type: asyncToggleLikePost.fulfilled.type });
    expect(state.isPostLike).toBe(false);
    expect(state.isPostLiked).toBe(true);

    state = postsReducer(state, { type: asyncToggleLikePost.rejected.type, payload: "Fail like" });
    expect(state.isPostLike).toBe(false);
    expect(state.error).toBe("Fail like");
  });

  it("menangani alur asyncAddPostComment dan asyncDeletePostComment", () => {
    // Add Comment
    let state = postsReducer(initial, { type: asyncAddPostComment.pending.type });
    expect(state.isPostAddComment).toBe(true);
    state = postsReducer(state, { type: asyncAddPostComment.fulfilled.type });
    expect(state.isPostAddComment).toBe(false);
    expect(state.isPostAddedComment).toBe(true);
    state = postsReducer(state, { type: asyncAddPostComment.rejected.type, payload: "Fail add comment" });
    expect(state.isPostAddComment).toBe(false);
    expect(state.error).toBe("Fail add comment");

    // Delete Comment
    state = postsReducer(initial, { type: asyncDeletePostComment.pending.type });
    expect(state.isPostDeleteComment).toBe(true);
    state = postsReducer(state, { type: asyncDeletePostComment.fulfilled.type });
    expect(state.isPostDeleteComment).toBe(false);
    expect(state.isPostDeletedComment).toBe(true);
    state = postsReducer(state, { type: asyncDeletePostComment.rejected.type, payload: "Fail del comment" });
    expect(state.isPostDeleteComment).toBe(false);
    expect(state.error).toBe("Fail del comment");
  });

  it("menangani alur asyncDeleteAllPosts", () => {
    const withPostsState: PostsState = {
      ...initial,
      posts: [{ id: 1 } as any, { id: 2 } as any],
    };

    let state = postsReducer(withPostsState, { type: asyncDeleteAllPosts.pending.type });
    expect(state.isPostDeleteAll).toBe(true);

    state = postsReducer(state, { type: asyncDeleteAllPosts.fulfilled.type });
    expect(state.isPostDeleteAll).toBe(false);
    expect(state.isPostDeletedAll).toBe(true);
    expect(state.posts).toEqual([]);

    state = postsReducer(state, { type: asyncDeleteAllPosts.rejected.type, payload: "Fail delete all" });
    expect(state.isPostDeleteAll).toBe(false);
    expect(state.error).toBe("Fail delete all");
  });
});