
import { useEffect, useState } from "react"
import "./HomePage.scss"
import request from "../../server"
import imgRequest from "../../server/imgRequest"
import Slider from "react-slick"

const HomePage = () => {
  const [lastOne , setLastOne] = useState()
  const [lastOneImg , setLastOneImg] = useState()

  useEffect(()=>{
    const getLastOne = async () => {
      try {
        const {data} = await request.get("post/lastone")
        setLastOne(data)
        const lastPhoto = await imgRequest.get(`upload/${data.photo._id}.png`)
        setLastOneImg(lastPhoto.request.responseURL);
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
        const {data} = await request.get("post/lastones?limit=3")
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



  return (
    <main>
      <section id="home">
        <img src={lastOneImg} alt="" />
        <div className="lastPost">
          <div className="container">
            <div className="last-post-text">
              <h3>POSTED ON <span>{lastOne?.user.username}</span></h3>
              <h1>{lastOne?.title}</h1>
              <h4>By <span>{lastOne?.user.first_name}</span>  |  {`${lastPostDate[0]} ${lastPostDate[1]},  ${lastPostDate[2]}`} </h4>
              <p>{lastOne?.description}</p>
              <div>
                <button>{"Read More >"}</button>
              </div>
            </div>
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
                  // const imgTur = el.photo.name.split(".")[1]
                  // const requestImg = `upload/${el.photo._id}.${imgTur}`
                  // const getPhoto = async () =>{
                  //   try {
                  //     const img = await imgRequest.get(requestImg)
                  //     let popularPostsPhoto = (img?.request);
                  //     setLastOnesImg(popularPostsPhoto?.responseURL);
                  //   } catch (err) {
                  //     console.log(err);
                  //   }
                  // }
                  // getPhoto()
                  return(
                    <div className="last-posts" key={el._id}>
                      <div className="popular-posts-card">
                        <div className="last-posts-img">
                        </div>
                        <div className="last-posts-text">
                          <h4>By <span>{lastOne?.user.first_name}</span>  |  {`${lastPostsDate[0]} ${lastPostsDate[1]},  ${lastPostsDate[2]}`} </h4>
                          <h1>{el?.title}</h1>
                          <p>{el?.description}</p>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
              
            </Slider>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage