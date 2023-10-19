import { Flex, Table } from "antd";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getUsers from "../../redux/actions/users"
import { useState } from "react";


const AllUsers = () => {

  const [active , setActive] = useState(1)
  const [totalPaginate , setTotalPaginate] = useState()

  const dispatch = useDispatch()
  const {users , total , loading} = useSelector((state)=>state.users)

  useEffect(()=>{
    setTotalPaginate(total / 10)
    dispatch(getUsers(active))
  } , [dispatch , active ,total ])

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Firstname',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Lastname',
      dataIndex: 'last_name',
      key: 'last_name',
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
      <Table loading={loading} className="table"  title={()=>(
        <Flex justify="space-between" align="center">
          <h2>Users ({total})</h2>
        </Flex>
      )} pagination={false} dataSource={users} columns={columns} />
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
  )
}

export default AllUsers