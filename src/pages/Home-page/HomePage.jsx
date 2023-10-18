
import { useEffect, useState } from "react"
import "./HomePage.scss"
import request from "../../server"
import Slider from "react-slick"
import { Link } from "react-router-dom"

const HomePage = () => {
  const [lastOne , setLastOne] = useState()
  const [lastOneImg , setLastOneImg] = useState()

  useEffect(()=>{
    const getLastOne = async () => {
      try {
        const {data} = await request.get("post/lastone")
        setLastOne(data)
        const imgTur = data?.photo?.name.split(".")[1]
        const lastImg = `https://ap-blog-backend.up.railway.app/upload/${data?.photo?._id}.${imgTur}`
        setLastOneImg(lastImg)
      } catch (err) {
        console.log(err);
      }
    }
    getLastOne()
  },[])

  const lastPostDate = new Date(lastOne?.createdAt).toString().split(" ").slice(1, 4)



  const [lastOnes , setLastOnes] = useState()

  useEffect(()=>{
    const getLastOnes = async ()=>{
      try {
        const {data} = await request.get("post/lastones")
        setLastOnes(data)
      } catch (err) {
        console.log(err);
      }
    }

    getLastOnes()
  } ,[])


  function SampleNextArrow() {
    return (
      <div
        style={{display: "none", background: "red" }}
      />
    );
  }

  function SamplePrevArrow() {
    return (
      <div
        style={{ display: "none", background: "green" }}
      />
    );
  }
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };



  const [categories , setCategories] = useState()


  useEffect(()=>{
    const getCategories = async ()=>{
      try {
        const {data} = await request.get("category")
        setCategories(data.data);
      } catch (err) {
        console.log(err);
      }
    }

    getCategories()
  } , [])




  var settings2 = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };



  return (
    <main>
      <section id="home">
        {
          lastOne?.photo ? <img src={lastOneImg} alt="" /> : <img className="secondaryImg" src="" alt="" />
        }
        <div className="lastPost">
          <div className="container">
           {
            lastOne? <div className="last-post-text">
            <h3>POSTED ON <span>{lastOne?.user.username}</span></h3>
            <h1>{lastOne?.title}</h1>
            <h4>By <span>{lastOne?.user.first_name}</span>  |  {`${lastPostDate[0]} ${lastPostDate[1]},  ${lastPostDate[2]}`} </h4>
            <p>{lastOne?.description}</p>
            <div>
              <Link to={`/blog/${lastOne._id}`}>
              <button>{"Read More >"}</button>
              </Link>
            </div>
          </div>:<></>
           }
          </div>
        </div>
      </section>
      <section id="last-ones">
        <div className="container">
          <div>
            <h2>Popular blogs</h2>
            <Slider className="owl-carousel" {...settings}>
              {
                lastOnes?.map((el)=>{
                  const lastPostsDate = new Date(el?.createdAt).toString().split(" ").slice(1, 4)
                  const imgTur = el?.photo?.name.split(".")[1]
                  return(
                    <Link key={el._id} to={`/blog/${el._id}`}>
                      <div className="last-posts" key={el._id}>
                        <div className="popular-posts-card">
                          <div className="last-posts-img">
                            {
                              el.photo ? <img src={`https://ap-blog-backend.up.railway.app/upload/${el.photo._id}.${imgTur}`} alt="" /> : <img src="" alt="" />
                            }
                          </div>
                          <div className="last-posts-text">
                            <h4>By <span>{el?.user.first_name}</span>  |  {`${lastPostsDate[0]} ${lastPostsDate[1]},  ${lastPostsDate[2]}`} </h4>
                            <h1>{el?.title}</h1>
                            <p>{el?.description.slice(0,80)}...</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })
              }
              
            </Slider>
          </div>
        </div>
      </section>
      <div className="container">
        <hr />
      </div>
      <section id="categories">
        <div className="container">
          <h2>Choose A Catagory</h2>
          <Slider className="owl-carousel" {...settings2}>
            {
              categories?.map((category)=>{
                return(
                  <div key={category._id}>
                    <Link to={`category/${category._id}`} >
                      <div className="category-card">
                        <img alt="logo" />
                        <h4>{category.name}</h4>
                        <p>{category.description.slice(0,60)}</p>
                      </div>
                    </Link>
                  </div>
                )
              })
            }
          </Slider>
        </div>
      </section>
    </main>
  )
}

export default HomePage