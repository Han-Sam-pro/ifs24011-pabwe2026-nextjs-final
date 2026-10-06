import { createSlice } from "@reduxjs/toolkit";
import { PostsState } from "../types";
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
} from "./action";

const initialState: PostsState = {
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

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // Reset seluruh status mutasi aksi & error
    resetPostStatus: (state) => {
      state.isPostAdd = false;
      state.isPostAdded = false;

      state.isPostChange = false;
      state.isPostChanged = false;

      state.isPostChangeCover = false;
      state.isPostChangedCover = false;

      state.isPostDelete = false;
      state.isPostDeleted = false;

      state.isPostLike = false;
      state.isPostLiked = false;

      state.isPostAddComment = false;
      state.isPostAddedComment = false;

      state.isPostDeleteComment = false;
      state.isPostDeletedComment = false;

      state.isPostDeleteAll = false;
      state.isPostDeletedAll = false;

      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // 1. Get Posts
    builder
      .addCase(asyncGetPosts.pending, (state) => {
        state.isPost = true;
        state.error = null;
      })
      .addCase(asyncGetPosts.fulfilled, (state, action) => {
        state.isPost = false;
        state.posts = action.payload;
      })
      .addCase(asyncGetPosts.rejected, (state, action) => {
        state.isPost = false;
        state.error = action.payload as string;
      });

    // 2. Get Post By ID
    builder
      .addCase(asyncGetPostById.pending, (state) => {
        state.isPost = true;
        state.error = null;
      })
      .addCase(asyncGetPostById.fulfilled, (state, action) => {
        state.isPost = false;
        state.post = action.payload;
      })
      .addCase(asyncGetPostById.rejected, (state, action) => {
        state.isPost = false;
        state.error = action.payload as string;
      });

    // 3. Create Post
    builder
      .addCase(asyncCreatePost.pending, (state) => {
        state.isPostAdd = true;
        state.isPostAdded = false;
        state.error = null;
      })
      .addCase(asyncCreatePost.fulfilled, (state) => {
        state.isPostAdd = false;
        state.isPostAdded = true;
      })
      .addCase(asyncCreatePost.rejected, (state, action) => {
        state.isPostAdd = false;
        state.isPostAdded = false;
        state.error = action.payload as string;
      });

    // 4. Update Post
    builder
      .addCase(asyncUpdatePost.pending, (state) => {
        state.isPostChange = true;
        state.isPostChanged = false;
        state.error = null;
      })
      .addCase(asyncUpdatePost.fulfilled, (state) => {
        state.isPostChange = false;
        state.isPostChanged = true;
      })
      .addCase(asyncUpdatePost.rejected, (state, action) => {
        state.isPostChange = false;
        state.isPostChanged = false;
        state.error = action.payload as string;
      });

    // 5. Change Cover
    builder
      .addCase(asyncUploadPostCover.pending, (state) => {
        state.isPostChangeCover = true;
        state.isPostChangedCover = false;
        state.error = null;
      })
      .addCase(asyncUploadPostCover.fulfilled, (state) => {
        state.isPostChangeCover = false;
        state.isPostChangedCover = true;
      })
      .addCase(asyncUploadPostCover.rejected, (state, action) => {
        state.isPostChangeCover = false;
        state.isPostChangedCover = false;
        state.error = action.payload as string;
      });

    // 6. Delete Post
    builder
      .addCase(asyncDeletePost.pending, (state) => {
        state.isPostDelete = true;
        state.isPostDeleted = false;
        state.error = null;
      })
      .addCase(asyncDeletePost.fulfilled, (state, action) => {
        state.isPostDelete = false;
        state.isPostDeleted = true;
        state.posts = state.posts.filter((p) => p.id !== action.payload.id);
      })
      .addCase(asyncDeletePost.rejected, (state, action) => {
        state.isPostDelete = false;
        state.isPostDeleted = false;
        state.error = action.payload as string;
      });

    // 7. Toggle Like
    builder
      .addCase(asyncToggleLikePost.pending, (state) => {
        state.isPostLike = true;
        state.isPostLiked = false;
        state.error = null;
      })
      .addCase(asyncToggleLikePost.fulfilled, (state) => {
        state.isPostLike = false;
        state.isPostLiked = true;
      })
      .addCase(asyncToggleLikePost.rejected, (state, action) => {
        state.isPostLike = false;
        state.isPostLiked = false;
        state.error = action.payload as string;
      });

    // 8. Add Comment
    builder
      .addCase(asyncAddPostComment.pending, (state) => {
        state.isPostAddComment = true;
        state.isPostAddedComment = false;
        state.error = null;
      })
      .addCase(asyncAddPostComment.fulfilled, (state) => {
        state.isPostAddComment = false;
        state.isPostAddedComment = true;
      })
      .addCase(asyncAddPostComment.rejected, (state, action) => {
        state.isPostAddComment = false;
        state.isPostAddedComment = false;
        state.error = action.payload as string;
      });

    // 9. Delete Comment
    builder
      .addCase(asyncDeletePostComment.pending, (state) => {
        state.isPostDeleteComment = true;
        state.isPostDeletedComment = false;
        state.error = null;
      })
      .addCase(asyncDeletePostComment.fulfilled, (state) => {
        state.isPostDeleteComment = false;
        state.isPostDeletedComment = true;
      })
      .addCase(asyncDeletePostComment.rejected, (state, action) => {
        state.isPostDeleteComment = false;
        state.isPostDeletedComment = false;
        state.error = action.payload as string;
      });

    // 10. Delete All Posts
    builder
      .addCase(asyncDeleteAllPosts.pending, (state) => {
        state.isPostDeleteAll = true;
        state.isPostDeletedAll = false;
        state.error = null;
      })
      .addCase(asyncDeleteAllPosts.fulfilled, (state) => {
        state.isPostDeleteAll = false;
        state.isPostDeletedAll = true;
        state.posts = [];
      })
      .addCase(asyncDeleteAllPosts.rejected, (state, action) => {
        state.isPostDeleteAll = false;
        state.isPostDeletedAll = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetPostStatus } = postsSlice.actions;
export default postsSlice.reducer;