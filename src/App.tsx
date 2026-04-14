import { Route, Routes } from "react-router"
import LoginPage from "./screens/login"
import HomeScreen from "./screens/home"
import { ProtectedRoute } from "./components/protected-route";
import MainLayout from "./components/layout";
import FavsScreen from "./screens/favs";


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/favourites" element={<FavsScreen />} />

      </Route>
    </Routes>
    </>
  )
}

export default App
