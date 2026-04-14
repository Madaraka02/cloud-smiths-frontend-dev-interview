import { Outlet } from "react-router"
import Header from "./header"

const MainLayout = () => {
  return (
    <div className="w-full h-full">
        <div className="flex flex-col gap-2 w-full h-full">
            <Header/>
        </div>
        <div className="min-h-full flex flex-col font-sans">
        <Outlet />
        </div>
    </div>
  )
}

export default MainLayout