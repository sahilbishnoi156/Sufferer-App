import { useQuery } from "@tanstack/react-query";
import { useUser } from "../../providers/PostProvider";
const PORT = "http://192.168.3.72:3000";

//! Get suggestedUsers
export default function useGetSuggestedUsers() {
  const { setSuggestedUsers } = useUser();
  return useQuery({
    queryKey: ["suggestedUsers"],
    queryFn: async () => {
      const response = await fetch(`${PORT}/api/user/suggestedUsers`);
      const data = await response.json();
      Array.isArray(data) ? setSuggestedUsers(data) : setSuggestedUsers([data]);
    },
  });
}
