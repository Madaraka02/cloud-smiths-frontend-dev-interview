import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { ChevronsUpDown, LogOut, TextAlignEnd } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useUserStore } from "@/data-stores/user-store";
import { Avatar, AvatarFallback } from "./ui/avatar";

const Header = () => {
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState<boolean>(false)
  const isMobile = useIsMobile();
  const userStore = useUserStore();
  const user = userStore.user;

  const handleLogout = () => {
    sessionStorage.removeItem("access-token");
    sessionStorage.removeItem("refresh-token");
    userStore.clearUser();
    navigate("/", { replace: true });
  }
  return (
    <nav className="flex flex-row items-center w-full z-50 px-4 py-3 shadow-sm fixed top-0 backdrop-blur-md">
        <div className={`container flex  w-full ${isMobile ? "flex-col gap-4":"flex-row items-center justify-between mx-auto h-6"} ${navOpen && isMobile && "h-screen"}`}>
          <div className="flex flex-row justify-between gap-4">
            <div>
              <a href={'/#home'} className="font-bold leading-loose tracking-wide text-xl">Dog Breeds.</a>
            </div>
            {isMobile &&
            <Button
            variant="ghost"
            size="icon"
            onClick={() => setNavOpen(!navOpen)}
            >
              <TextAlignEnd/>
            </Button>}
          </div>

          <div className={`${navOpen && isMobile && "flex"} ${!navOpen && isMobile && "hidden"} flex flex-row gap-4 items-center`}>


            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="bg-transparent hover:bg-transparent cursor-pointer
                outline-none ring-0 border-0
                focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none
                data-[state=open]:bg-transparent">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarFallback className="rounded-lg">{user?.firstName?.[0]}{user?.lastName?.[0]}</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate text-[13px] capitalize">{user?.username}</span>
                        <span className="truncate text-xs">{user?.firstName} {user?.lastName}</span>
                    </div>
                    <ChevronsUpDown/>
                    </div>
                </Button>
                </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60" align="start">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuItem>
                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate text-[13px]">{user?.email}</span>
                        <span className="truncate text-xs">{user?.firstName} {user?.lastName}</span>
                    </div>
                    </div>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                <DropdownMenuItem 
                onClick={handleLogout}
                className="flex flex-row items-center gap-1 cursor-pointer">
                    <LogOut/>
                    Log out
                </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
  )
}

export default Header