import { Fragment, useContext, useEffect, useState } from "react";
import request from "../../server";
import { Link } from "react-router-dom";
import { Button, Modal, Upload } from "antd";

import "./MyPosts.scss"
import Loading from "../Loading/Loading";
import { AuthContext } from "../../context/AuthContext";

const MyPostsPage = () => {

  const {getUser} = useContext(AuthContext)


  const [postPhoto , setPostPhoto] = useState(null)

  const [ photo , setPhoto] = useState()

  const [ loading , setLoading] = useState()

  const [ loadingPosts , setLoadingPosts] = useState()

  const [allPosts , SetAllPosts] = useState()

  const [deletedPost , setDeletedPost] = useState(null)

  const [ refresh , setRefresh] = useState(false)

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
        setLoadingPosts(true)
        const {data} = await request.get(`post/user?limit=8&search=${search}&page=${active}`)
        SetAllPosts(data.data);
        const pages = data.pagination.total / 8
        setTotalPaginate(Math.ceil(pages))
      } catch (err) {
        console.log(err);
      } finally{
        setLoadingPosts(false)
      }
    }
    getAllPosts()
  } , [search , active ,deletedPost , refresh ])


  const deletePost = async (id)=>{
    const deleteConfirm = confirm("Bu post ochirilsinmi ?")
    if (deleteConfirm) {
      try {
        setLoading(true)
        await request.delete(`post/${id}`)
      } catch (err) {
        console.log(err);
      }finally{
        setDeletedPost(id)
        setLoading(false)
      }
    }
  }


  const addPost = async (e)=>{
    e.preventDefault()
    const values = {
      title : e.target.title.value,
      description : e.target.description.value,
      tags : e.target.tags.value,
      category : e.target.category.value,
      photo : photo || "6412131483b154fb6bf1199d"
    }
    try {
      setLoading(true)
      await request.post("post" , values)
      setOpen(false)
    } catch (err) {
      console.log(err);
    } finally{
      setRefresh(!refresh)
      setLoading(false)
    }
  }


  const getImg = async(e)=>{
    const formData = new FormData()
    formData.append('file' , e.file.originFileObj )
    try {
      const {data} = await request.post(`upload` , formData)
      setPhoto(`${data._id}`)
      setPostPhoto(`${data._id}.${data.name.split(".")[1]}`) 
      getUser()
    } catch (err) {
      console.log(err);
    } 
  }


  return (
    <main>
      {
        loading? <Loading></Loading> : <Fragment>
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
                loadingPosts ? <Loading /> : allPosts?.map((post)=>{
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
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  // beforeUpload={beforeUpload}
                  onChange={getImg}
                >
                  {postPhoto ? (
                    <img
                      src={`https://ap-blog-backend.up.railway.app/upload/${postPhoto}`}
                      alt="avatar"
                      style={{
                        height: '100%',
                        width : "100%"
                      }}
                    />
                  ) : (
                    <p>Upload</p>
                  )}
                </Upload>
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
        </Fragment>
      }
    </main>
  )
}

export default MyPostsPage