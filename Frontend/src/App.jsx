import { Outlet } from "react-router-dom"
import Header from "./Components/Layout/Common/Header"
import Footer from "./Components/Layout/Common/Footer"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setLoginState } from "@/Store/Slice/Auth.slice"

function App() {
  const dispatch = useDispatch()
  const loginstatus = useSelector((state) => state.auth.isLogin);

  useEffect(() => {
    // Check if the access token is present in localStorage
    const token = localStorage.getItem("accessToken");

    if (token) {
      // If token exists, set the login state to true in Redux
      dispatch(setLoginState(true));
    }
  }, [dispatch]);


  return (
    <>
      <Header loginstatus={loginstatus} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
