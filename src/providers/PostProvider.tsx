import React, { PropsWithChildren, createContext, useContext } from "react";

type PostContextType = {
  creator: any;
  setCreator: (value: any) => void;
};
const PostContext = createContext<PostContextType>({
  creator: {},
  setCreator: (value: any) => {},
});
const PORT = "http://192.168.3.72:3000";

export default function PostProvider({ children }: PropsWithChildren) {
  const [creator, setCreator] = React.useState(false);

  return (
    <PostContext.Provider value={{ creator, setCreator }}>
      {children}
    </PostContext.Provider>
  );
}
export const usePost = () => useContext(PostContext);
