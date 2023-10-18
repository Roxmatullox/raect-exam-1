
import { useParams } from "react-router-dom"
import "./BlogPost.scss"
import { useEffect, useState } from "react";
import request from "../../server";
import Loading from "../Loading/Loading";

const BlogPostPage = () => {

  const [ loading , setLoading] = useState()

  const {id} = useParams()

  const [post , setPost] = useState()

  useEffect(()=>{
   const getPost = async () =>{
    try {
      setLoading(true)
      const {data} = await request.get(`post/${id}`)
      setPost(data);
    } catch (err) {
      console.log(err);
    } finally{
      setLoading(false)
    }
   }
   getPost(  )
  }, [id])


  const imgTur = post?.photo.name.split(".")[1]

  const postDate = new Date(post?.createdAt).toString().split(" ").slice(1, 4)


  return (
    <main>
      {
        loading ? <Loading/> : <div className="container">
        <div className="post-container">
          <div className="post-img">
            <img src={`https://ap-blog-backend.up.railway.app/upload/${post?.photo._id}.${imgTur}`} alt="" />
          </div>
          <div className="post-text">
            <div className="post-admin">
              <img src={`https://ap-blog-backend.up.railway.app/upload/${post?.user.photo}`} alt="user-photo" />
              <div>
                <h3>{post?.user.username}</h3>
                <p>Posted on  {`${postDate[0]} ${postDate[1]},  ${postDate[2]}`}</p>
              </div>
            </div>
            <div className="post-title">
              <h2>{post?.title}</h2>
              <h3>Startup( {
                post?.tags.map((tag)=>{
                  return `#${tag}  `
                })
                } )</h3>

                <p>{post?.description}</p>
            </div>
          </div>
        </div>
      </div>
      }
    </main>
  )
}

export default BlogPostPage