import { Route, Routes } from "react-router"
import LoginPage from "./screens/login"
import HomeScreen from "./screens/home"
import { ProtectedRoute } from "./components/protected-route";


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<ProtectedRoute><HomeScreen /></ProtectedRoute>} />
    </Routes>
    </>
  )
}

export default App
