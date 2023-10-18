import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import request from "../../server"

import "./categories.scss"

export const CategoryPage = () => {
  const {categoryId} = useParams("categoryId")

  const [active , setActive] = useState(1)

  const [posts , setPosts] = useState()
  const [category , setCategory] = useState()
  const [ search , setSearch] = useState("")

  const [totalPaginate , setTotalPaginate] = useState()


  useEffect(()=>{
    const getCategoryPosts = async ()=>{
      try {
        const {data} = await request.get(`post?search=${search}&page=${active}&limit=4&category=${categoryId}`)
        const category = await request.get(`category/${categoryId}`)
        setPosts(data.data);
        setCategory(category.data);

        const pages = data.pagination.total / 4
        setTotalPaginate(Math.ceil(pages))
      } catch (err) {
        console.log(err);
      }
    }

    getCategoryPosts()
  } , [categoryId , active , search])




  return (
    <main>
      <section id="about-category">
        <div className="container">
          <h2>{category?.name}</h2>
          <p>{category?.description}</p>
          <p><Link to="/" >Home</Link> {">"} <Link>{category?.name}</Link></p>
        </div>
      </section>
      <section id="posts">
        <div className="container">
          <input onChange={(e)=>{setSearch(e.target.value) , setActive(1)}} type="text" placeholder="Search..." />
          {
            posts?.map((post)=>{
              const imgTur = post?.photo.name.split(".")[1]
              return(
                <Link key={post._id} to={`/blog/${post._id}`}>
                  <div  className="post-card">
                    <div className="post-img">
                      <img src={`https://ap-blog-backend.up.railway.app/upload/${post?.photo._id}.${imgTur}`} alt="" />
                    </div>
                    <div className="post-text">
                      <h5>{category?.name}</h5>
                      <h3>{post?.title}</h3>
                      <p>{post?.description.slice(0,100)}</p>
                    </div>
                  </div>
                </Link>
              )
            })
          }
        </div>
      </section>
      {
        totalPaginate > 1 ? <section id="pagination">
        <div className="container">
          <div className="pagination-btns">
            <button disabled={active === 1 ? true : false} onClick={()=>{setActive(active-1)}}>{"<"}</button>
            <span>{active}</span>
            <button disabled={totalPaginate === active ? true : false} onClick={()=>{setActive(active+1)}}>{">"}</button>
          </div>
        </div>
      </section> : null
      }
    </main>
  )
}
