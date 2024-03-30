import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { usePost } from "../../providers/PostProvider";
const PORT = "http://192.168.3.72:3000";

//! Helper Function
const fetchPosts = async (props: any) => {
  try {
    const response = await fetch(`${PORT}/api/mobileApp/posts?_page=${props.pageParam}`)
    return response.json();
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error("Something went wrong.");
  }
};

export function usePosts() {
  return useInfiniteQuery({
    queryKey: ["feed"],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage;
    },
  });
}

//! Get Posts
export default function usePostsList() {
  const { setAllPosts } = usePost();
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const postsResponse = await fetch(`${PORT}/api/posts/allposts`);
      const postsData = await postsResponse.json();
      setAllPosts(postsData.posts);
      return postsData;
    },
  });
}



//! Get Post with id
export const useGetPost = (id: number) => {
  return useQuery({
    queryKey: ["posts", { postId: id }],
    queryFn: async () => {
      const response = await fetch(`${PORT}/api/posts/${id}`);
      const data = await response.json();
      return data;
    },
  });
};

const uploadImage = async (imageUrl: string) => {
  const formData = new FormData();
  formData.append("file", imageUrl);
  formData.append("upload_preset", "gmgscbus");
  const ImageResponse = await fetch(
    "https://api.cloudinary.com/v1_1/dlhxapeva/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );
  const imageJsonData = await ImageResponse.json();
  var usrCldImage = imageJsonData.url;
  return usrCldImage;
};

//! Upload Post
export const useUploadPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(post: any) {
      const image = await uploadImage(post.image);
      const response = await fetch(`${PORT}/api/posts/action/createNew`, {
        method: "POST",
        body: JSON.stringify({
          caption: post.caption,
          image: image,
        }),
      });
      return await response.json();
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

//! Update Post
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(post: any) {
      const image = await uploadImage(post.image);
      const response = await fetch(`${PORT}/api/posts/${post.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          caption: post.caption,
          image: image,
        }),
      });
      return await response.json();
    },
    async onSuccess(_, post) {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      await queryClient.invalidateQueries({
        queryKey: ["post", { postId: post.id }],
      });
    },
  });
};

//! Delete Post
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(id: string) {
      await fetch(`${PORT}/api/posts/${id}`, {
        method: "DELETE",
      });
    },
    async onSuccess(_, id) {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
