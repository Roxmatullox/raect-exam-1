import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import getCategories, { controlModal, deleteCategory, editCategory, sendCategory, uploadImg } from "../../redux/actions/category"
import { Button, Flex, Form, Input, Modal, Space, Table, Upload } from "antd"
import { Fragment } from "react"

import "./AllCategories.scss"
import { useState } from "react"
import { useForm } from "antd/es/form/Form"

const AllCategories = () => {
  const dispatch = useDispatch()
  const {categories , total , loading , isModalOpen , imgData , selected} = useSelector((state)=>state.category)

  const [search , setSearch] = useState("")

  const [refresh , setRefresh] = useState(false)

  useEffect(()=>{
    dispatch(getCategories(search))
  } , [dispatch , search , refresh])

  
  const [form] = useForm()
  

  

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'photo',
      key: 'photo',
      render : (data) =>{
        return(
          <img style={{
            width:"50px"
          }} src={`https://ap-blog-backend.up.railway.app/upload/${data._id}.${data.name.split(".")[1]}`} alt="" />
        )
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render : (data)=>{
        return <p>{data.slice(0,40)}</p>
      }
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: '_id',
      render : (data) => {
        return (<Space size="middle" >
          <Button onClick={()=>editData(data)} type="primary" >Edit</Button>
          <Button onClick={()=>deleteData(data)} type="primary" danger >Delete</Button>
        </Space>)
      }
    },
  ];

  const showModal = ()=>{
    form.resetFields()
    dispatch(controlModal(true))
  }

  const handleCancel = () => {
    dispatch(controlModal(false))
  };

  const getImg = (e)=>{
    dispatch(uploadImg(e.file.originFileObj))
  }

  const handleOk = async ()=>{
    try{
      const values = await form.validateFields()
      values.photo = imgData._id
      dispatch(sendCategory(selected , values , search))
      dispatch(controlModal(false))
    } finally{
      setRefresh(!refresh)
    }
  }

  const deleteData = async (id) =>{
    const deleteConfirm = confirm("Bu category ochirilsinmi?")
    if (deleteConfirm) {
      try{
        dispatch(deleteCategory(id , search))
      } finally{
        setRefresh(!refresh)
      }
    }
  }

  const editData = (id)=>{
    dispatch(editCategory(id , form))
    dispatch(controlModal(true))
  }

  return (
    <Fragment>
      <section id="search">
        <div className="container">
          <div className="search-container">
            <input onChange={(e)=>setSearch(e.target.value)} type="text" placeholder="Search..." />
            <button className="modal-open" onClick={showModal}>Create post</button>
          </div>
        </div>
      </section>            
      <Table loading={loading} className="table"  title={()=>(
        <Flex justify="space-between" align="center">
          <h2>Categories ({total})</h2>
        </Flex>
      )} pagination={{pageSize:3}} dataSource={categories} columns={columns} />
          <Modal
            open={isModalOpen}
            title="Title"
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
                  {imgData ? (
                    <img
                      src={`https://ap-blog-backend.up.railway.app/upload/${imgData?._id}.${imgData?.name?.split(".")[1]}`}
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
                <Form
                    name="basic"
                    labelCol={{
                      span: 24,
                    }}
                    wrapperCol={{
                      span: 24,
                    }}
                    style={{
                      maxWidth: 600,
                    }}
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={handleOk}
                    autoComplete="off"
                    form={form}
                  >
                    <Form.Item
                      label="Name"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: 'Please input category name!',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Descriprion"
                      name="description"
                      rules={[
                        {
                          required: true,
                          message: 'Please input category description!',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      wrapperCol={{
                        span: 24,
                      }}
                    >
                      <Button style={{
                        width:"100%"
                      }} type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
          </Modal>
    </Fragment>
  )
}

export default AllCategories