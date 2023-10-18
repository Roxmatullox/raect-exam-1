import { useEffect, useState } from "react";
import request from "../../server";
import { Link } from "react-router-dom";
import { Button, Modal } from "antd";

import "./MyPosts.scss"

const MyPostsPage = () => {

  const [allPosts , SetAllPosts] = useState()

  const [deletedPost , setDeletedPost] = useState(null)

  const [active , setActive] = useState(1)

  const [ search , setSearch] = useState("")

  const [totalPaginate , setTotalPaginate] = useState()

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(()=>{
    const getAllPosts = async ()=>{
      try {
        const {data} = await request.get(`post/user?limit=8&search=${search}&page=${active}`)
        SetAllPosts(data.data);
        const pages = data.pagination.total / 8
        setTotalPaginate(Math.ceil(pages))
      } catch (err) {
        console.log(err);
      }
    }
    getAllPosts()
  } , [search , active ,deletedPost ])


  const deletePost = async (id)=>{
    const deleteConfirm = confirm("Bu post ochirilsinmi ?")
    if (deleteConfirm) {
      setDeletedPost(id)
      await request.delete(`post/${id}`)
    }
  }


  const addPost = async (e)=>{
    e.preventDefault()
    const values = {
      title : e.target.title.value,
      description : e.target.description.value,
      tags : e.target.tags.value,
      category : e.target.category.value,
      photo : "6412131483b154fb6bf1199d"
    }
    console.log(values);
    try {
      await request.post("post" , values)
      setOpen(false)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main>
      <section id="search">
        <div className="container">
          <div className="search-container">
            <input onChange={(e)=>{setSearch(e.target.value) , setActive(1)}} type="text" placeholder="Search..." />
            <button className="modal-open" onClick={showModal}>Create post</button>
          </div>
        </div>
      </section>
      <section>
      <section>
        <div className="container">
          {
            allPosts?.map((post)=>{
              const imgTur = post?.photo.name.split(".")[1]
              return(
                  <div key={post._id}  className="post-card">
                    <div className="post-img">
                      <Link to={`/blog/${post._id}`}>
                        <img src={`https://ap-blog-backend.up.railway.app/upload/${post?.photo._id}.${imgTur}`} alt="" />
                      </Link>
                    </div>
                    <div className="post-text">
                      <h5>{post?.category.name}</h5>
                      <h3>{post?.title}</h3>
                      <p>{post?.description.slice(0,100)}</p>
                      <div>
                        <Button onClick={()=>deletePost(post._id)} type="primary">Delete</Button>
                      </div>
                    </div>
                  </div>
              )
            })
          }
        </div>
      </section>
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

      <Modal
        open={open}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={(_, { CancelBtn }) => (
          <>
            <CancelBtn />
          </>
        )}
      >
        <form className="modal-form" onSubmit={addPost} >
            <label htmlFor="title">Title</label>
            <input required placeholder="length should be [5 - 50]" id="title" type="text" />
            <label htmlFor="description">Description</label>
            <input required placeholder="length should be [10 - 1000]" id="description" type="text" />
            <label htmlFor="tags">Tags</label>
            <input required placeholder="" id="tags" type="text" />
            <label htmlFor="category">Category</label>
            <input required placeholder="" id="category" type="text" />
            <button type="submit">Add</button>   
        </form>
      </Modal>
    </main>
  )
}

export default MyPostsPage