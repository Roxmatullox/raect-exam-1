import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import getCategories from "../../redux/actions/category"
import { Flex, Image, Table } from "antd"
import { Fragment } from "react"

import "./AllCategories.scss"
import { useState } from "react"

const AllCategories = () => {
  const dispatch = useDispatch()
  const {categories , total , loading} = useSelector((state)=>state.category)

  const [search , setSearch] = useState("")

  useEffect(()=>{
    dispatch(getCategories(search))
  } , [dispatch , search])

  

  

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'photo',
      key: 'photo',
      render : (data) =>{
        return <Image height={`https://ap-blog-backend.up.railway.app/upload/${data._id}.${data.name.split(".")[1]}`} src={data.avatar}/>
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
    // {
    //   title: 'Action',
    //   dataIndex: 'id',
    //   key: 'action',
    //   render : () => {
    //     return (<Space size="middle" >
    //       <Button  type="primary" >Edit</Button>
    //       <Button  type="primary" danger >Delete</Button>
    //     </Space>)
    //   }
    // },
  ];

  return (
    <Fragment>
      <div className="search">
        <input onChange={(e)=>setSearch(e.target.value)} placeholder="Search..." type="text" />
      </div>
      <Table loading={loading} className="table"  title={()=>(
        <Flex justify="space-between" align="center">
          <h2>Categories ({total})</h2>
        </Flex>
      )} pagination={{pageSize:3}} dataSource={categories} columns={columns} />
    </Fragment>
  )
}

export default AllCategories