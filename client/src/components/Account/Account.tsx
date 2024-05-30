import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../../api/User";
import { Loader } from "../Loader";
import { AuthForm } from "../AuthForm";
import { queryClient } from "../../api/queryClient";
import { LogoutButton } from "../LogoutButton";

export const Account = () => {
  const meQuery = useQuery(
    {
      queryFn: () => fetchMe(),
      queryKey: ['users', 'me'],
    },
    queryClient
  );

  switch (meQuery.status) {
    case "pending":
      return <Loader />;

    case "error":
      return <AuthForm />;

    case "success":
      return <LogoutButton />;
  }
};