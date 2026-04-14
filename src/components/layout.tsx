import { Outlet } from "react-router"
import Header from "./header"
import { useLoggedInUserQuery } from "@/queries/use-me";
import { useUserStore } from "@/data-stores/user-store";
import { useEffect } from "react";

const MainLayout = () => {
  const { data: user } = useLoggedInUserQuery();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (user) setUser(user);
  }, [user, setUser]);

  return (
    <div className="w-full h-full">
        <div className="flex flex-col gap-2 w-full h-full">
            <Header/>
        </div>
        <div className="min-h-full flex flex-col font-sans py-16 px-4">
        <Outlet />
        </div>
    </div>
  )
}

export default MainLayout