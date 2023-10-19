


import { Fragment, useEffect, useState } from "react"
import request from "../../server"

import "./AllPosts.scss"
import { Link } from "react-router-dom"
import Loading from "../Loading/Loading"


const AllPosts = () => {

  const [ loading , setLoading] = useState()

  const [active , setActive] = useState(1)

  const [allPosts , SetAllPosts] = useState()
  const [ search , setSearch] = useState("")

  const [totalPaginate , setTotalPaginate] = useState()

  useEffect(()=>{
    const getAllPosts = async ()=>{
      try {
        setLoading(true)
        const {data} = await request.get(`post?limit=8&search=${search}&page=${active}`)
        SetAllPosts(data.data);
        const pages = data.pagination.total / 8
        setTotalPaginate(Math.ceil(pages))
      } catch (err) {
        console.log(err);
      } finally{
        setLoading(false)
      }
    }
    getAllPosts()
  } , [search , active])


  return (
    <main>
      {
        loading ? <Loading /> : <Fragment>
          <section id="search">
            <div className="container">
              <input onChange={(e)=>{setSearch(e.target.value) , setActive(1)}} type="text" placeholder="Search..." />
            </div>
          </section>
          <section>
            <div className="container">
              {
                allPosts?.map((post)=>{
                  const imgTur = post?.photo?.name.split(".")[1]
                  return(
                    <Link key={post?._id} to={`/blog/${post?._id}`}>
                      <div  className="post-card">
                        <div className="post-img">
                          <img src={`https://ap-blog-backend.up.railway.app/upload/${post?.photo._id}.${imgTur}`} alt="" />
                        </div>
                        <div className="post-text">
                          <h5>{post?.category?.name}</h5>
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
        </Fragment>
      }
    </main>
  )
}

export default AllPosts