
import { useParams } from "react-router-dom"
import "./BlogPost.scss"
import { useEffect, useState } from "react";
import request from "../../server";

const BlogPostPage = () => {

  const {id} = useParams()

  const [post , setPost] = useState()

  useEffect(()=>{
   const getPost = async () =>{
    try {
      const {data} = await request.get(`post/${id}`)
      setPost(data);
    } catch (err) {
      console.log(err);
    }
   }
   getPost(  )
  }, [id])

  console.log(post);

  const imgTur = post?.photo.name.split(".")[1]

  const postDate = new Date(post?.createdAt).toString().split(" ").slice(1, 4)


  return (
    <main>
      <div className="container">
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
              <h1>{post?.title}</h1>
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
    </main>
  )
}

export default BlogPostPage