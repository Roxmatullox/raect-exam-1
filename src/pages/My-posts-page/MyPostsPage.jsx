import { Fragment, useContext, useEffect, useState } from "react";
import request from "../../server";
import { Link } from "react-router-dom";
import { Button, Modal, Upload } from "antd";

import "./MyPosts.scss"
import Loading from "../Loading/Loading";
import { AuthContext } from "../../context/AuthContext";


const MyPostsPage = () => {

  const {getUser} = useContext(AuthContext)

  const [selected , setSelected] = useState(null)

  const [postPhoto , setPostPhoto] = useState(null)

  const [ photo , setPhoto] = useState()

  const [ loading , setLoading] = useState()

  const [ loadingPosts , setLoadingPosts] = useState()

  const [allPosts , SetAllPosts] = useState()

  const [values , setValues] = useState({
    title : "",
    description : "",
    tags : "",
    category : "",
  }  )

  const [deletedPost , setDeletedPost] = useState(null)

  const [ refresh , setRefresh] = useState(false)

  const [active , setActive] = useState(1)

  const [ search , setSearch] = useState("")

  const [totalPaginate , setTotalPaginate] = useState()

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setValues({
      title : "",
      description : "",
      tags : "",
      category : "",
    })
    setSelected(null)
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
    try {
      setLoading(true)
      if (selected === null) {
        await request.post("post" , {...values , photo : photo})
      } else {
        await request.put(`post/${selected}` , {...values , photo : photo})
      }
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


  const formValues = (e)=>{
    setValues({...values , 
      [e.target.name]:e.target.value
    })
  }



  const editPost = async (id)=>{
    setOpen(true)
    setSelected(id)
    try {
      const {data} = await request.get(`post/${id}`)
      console.log(data);
      setValues({
        title : data?.title,
        description : data?.description,
        tags : data?.tags,
        category : data?.category._id,
      })
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
                            <Button style={{
                              marginRight:"10px",
                              backgroundColor:"red"
                            }} onClick={()=>deletePost(post._id)} type="primary">Delete</Button>
                            <Button onClick={()=>editPost(post._id)} type="primary">Edit</Button>
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
            <form onChange={formValues} className="modal-form" onSubmit={addPost} >
                <label htmlFor="title">Title</label>
                <input value={values.title} required placeholder="length should be [5 - 50]" name="title" type="text" />
                <label htmlFor="description">Description</label>
                <input value={values.description} required placeholder="length should be [10 - 1000]" name="description" type="text" />
                <label htmlFor="tags">Tags</label>
                <input value={values.tags} required placeholder="" name="tags" type="text" />
                <label htmlFor="category">Category</label>
                <input value={values.category} required placeholder="" name="category" type="text" />
                <button type="submit">Add</button>   
            </form>
          </Modal>
        </Fragment>
      }
    </main>
  )
}

export default MyPostsPage