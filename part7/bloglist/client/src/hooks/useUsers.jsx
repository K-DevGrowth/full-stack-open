import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/users";

const useUsers = () => {
  const result = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  return {
    users: result.data,
    isPending: result.isPending,
    isError: result.isError,
  };
};

export default useUsers;
