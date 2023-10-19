import { useSelector } from "react-redux"

const DashboardPage = () => {
  const category = useSelector((state)=>state.category)
  const users = useSelector((state)=>state.users)
  return (
    <div style={{
      padding:"20px",
      textAlign:"center",
      border:"1px solid black",
      borderRadius:"10px"
    }}>
      <h1 style={{
        marginBottom:"20px",
        color:"greenyellow"
      }}>Categories : ({category.total})</h1>
      <h1 style={{
        color:"orangered"
      }}>Users : ({users.total})</h1>
    </div>
  )
}

export default DashboardPage