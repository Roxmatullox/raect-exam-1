import { BrowserRouter, Route, Routes } from "react-router-dom"
import RegisterPage from "./pages/Register-page/RegisterPage"
import { AuthContext } from "./context/AuthContext"
import { useContext } from "react"
import AccountPage from "./pages/Account-page/AccountPage"
import MyPostsPage from "./pages/My-posts-page/MyPostsPage"
import Layout from "./components/Layout/front/Layout"
import HomePage from "./pages/Home-page/HomePage"
import LoginPage from "./pages/Login-page/LoginPage"
import AboutUsPage from "./pages/About-us-page/AboutUsPage"
import BlogPostPage from "./pages/Blog-post-page/BlogPostPage"
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage"
import DashboardPage from "./pages/Dashboard-page/DashboardPage"
import { CategoryPage } from "./pages/Categories-page/CategoryPage"
import AllPosts from "./pages/All-posts-page/AllPostsPage"

function App() {

  const {isAuth , role} = useContext(AuthContext)


  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>} >
          <Route path="" element={<HomePage />} />
          <Route path="all-posts" element={<AllPosts />} />
          <Route path="blog/:id" element={<BlogPostPage />} />
          <Route path="category/:categoryId" element={<CategoryPage />} />
          <Route path="about" element={<AboutUsPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>

        {
          isAuth ? 
            <Route element={<Layout />}>
              <Route path="account" element={<AccountPage />} />
              <Route path="myPosts" element={<MyPostsPage />} /> 
            </Route>
          : null
        }

        {
          isAuth && role === "admin" ? 
            <Route element={<Layout />}>
              <Route path="dashboard" element={<DashboardPage />} />
            </Route>
          : null
        }

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
