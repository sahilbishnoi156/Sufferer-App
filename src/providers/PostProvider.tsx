import React, { PropsWithChildren, createContext, useContext } from "react";

//! Types
//* Post interface
type PostContextType = {
  postData: any;
  commentRef: any;
  setCommentRef: any;
  setPostData: (value: any) => void;
  allPosts: any;
  setAllPosts: (value: any) => void;
};

//* User interface
type UserContextType = {
  suggestedUsers: any;
  setSuggestedUsers: (value: any) => void;
};

const PostContext = createContext<PostContextType>({
  commentRef: null,
  setCommentRef: null,
  postData: {},
  setPostData: (value: any) => {},
  allPosts: [],
  setAllPosts: (value: any) => {},
});
const PORT = "http://192.168.3.72:3000";

export default function PostProvider({ children }: PropsWithChildren) {
  const [allPosts, setAllPosts] = React.useState([]);
  const [postData, setPostData] = React.useState({});
  const [commentRef, setCommentRef] = React.useState<any>();

  return (
    <PostContext.Provider
      value={{
        postData,
        setPostData,
        setCommentRef,
        commentRef,
        allPosts,
        setAllPosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
export const usePost = () => useContext(PostContext);

const UserContext = createContext<UserContextType>({
  suggestedUsers: [],
  setSuggestedUsers: () => {},
});
export function UserProvider({ children }: PropsWithChildren) {
  const [suggestedUsers, setSuggestedUsers] = React.useState([]);

  return (
    <UserContext.Provider value={{ suggestedUsers, setSuggestedUsers }}>
      {children}
    </UserContext.Provider>
  );
}
export const useUser = () => useContext(UserContext);
