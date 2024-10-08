import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './Components/Layout/LandingPage/index.jsx'
import AuthPage from './Components/Layout/Registration/index.jsx'
import DogListing from './Components/Layout/DogsList/index.jsx'
import SingleDogPage from './Components/Layout/DogProfile/index.jsx'
import AddNewDogPage from './Components/Layout/AddDog/index.jsx'
import Profile from './Components/Layout/UserProfile/index.jsx'
import { Provider } from 'react-redux'
import store from './Store/store.js'
import MyDogs from './Components/Layout/YourDogs/index.jsx'
import TokenRefreshPage from './Components/Layout/NewRefreshToken/index.jsx'
import DogNotFound from './Components/Layout/Common/NotFound.jsx'
import { TermsAndConditions } from './Components/Layout/Common/Term_conditaion.jsx'
import { PrivacyPolicy } from './Components/Layout/Common/Policy.jsx'
import AboutSection from './Components/Layout/Common/About.jsx'
import EnhancedChatPage from './Components/Chat/ChatBox.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />
      },
      {
        path: "/userauth",
        element: <AuthPage />
      },
      {
        path: "/dogsList",
        element: < DogListing />
      },
      {
        path: "/DogProfile/:id",
        element: <SingleDogPage />
      },
      {
        path: "/Newdog",
        element: <AddNewDogPage />
      },
      {
        path: "/admin/profile",
        element: <Profile />
      },
      {
        path: "/about",
        element: <AboutSection />
      },
      {
        path: "/admin/dogs",
        element: <MyDogs />
      },
      {
        path: "admin/refreshToken",
        element: <TokenRefreshPage />
      },
      {
        path: "/terms",
        element: <TermsAndConditions />
      },
      {
        path: "policy",
        element: <PrivacyPolicy />
      },
      {
        path: "*",
        element: <DogNotFound />
      },
      {
        path: "/chat/:receiverId",
        element: <EnhancedChatPage />
      },
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <Provider store={store}>

    <RouterProvider router={router} />
  </Provider>
)
