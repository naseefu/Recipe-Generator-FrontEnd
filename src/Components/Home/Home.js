import React from 'react'
import './home.css'
import Header from '../Commons/Header'
import pantry from '../Images/pantry1.png'
import ai from '../Images/ai.png'
import expire from '../Images/expire1.png'
import storage from '../Images/storage.jpg'
import PantryFeatures from '../FoodItems/PantryFeatures'
import FeatureShowcase from '../FoodItems/FeatureShowCase'
import CommunityComponent from '../FoodItems/CommunityComponent'
import Footer from '../Commons/Footer'
import { useUser } from '../Context/UserContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const {user} = useUser()

  const works = [{
    id: 1,
    name:'Track What’s in Your Pantry',
    path:'/inventory',
    description:"Keep an organized inventory of all your food items. Whether it’s produce, dairy, grains, or snacks, FreshSaver lets you quickly log items with important details like purchase date, quantity, and expiration date. Say goodbye to forgotten foods!",
    image:`${pantry}`
  },
  {
    id: 2,
    name:'Get Expiration Alerts',
    path:'/inventory',
    description:"Stay ahead of food spoilage with timely notifications. FreshSaver will remind you when items are close to expiring, so you can plan meals and use up ingredients before they go bad",
    image:`${expire}`
  },
  {
    id:3,
    name:'AI-Powered Recipe Suggestions',
    path:'/recipe',
    description:'FreshSaver’s intelligent recipe recommendations will inspire you to create delicious meals from the ingredients you already have. No more scrambling for last-minute meal ideas – FreshSaver has you covered with recipes tailored to your pantry',
    image:`${ai}`
  },
  {
    id:4,
    name:' Optimize Storage for Freshness',
    path:'/dashboard',
    description:"Not sure how to store a specific food item? FreshSaver offers personalized storage tips to help you keep items fresh for as long as possible. Maximize your food’s shelf life and reduce waste with our expert guidance.",
    image:`${storage}`
  }

]

const navigate = useNavigate()

  return (
    <div className='home-main'>
      <div>
      <div style={{height:'fit-content'}}>
        <Header/>
      </div>
        <div className='home-1 relative flex flex-col justify-center items-center' style={{height:'80vh',width:'100%',minHeight:"300px",maxHeight:"700px",
        backgroundPosition:'center',backgroundSize:'cover'}}>
          <video autoPlay muted loop playsInline src='https://videos.pexels.com/video-files/4252297/4252297-uhd_2732_1440_25fps.mp4' className='h-full w-full absolute' style={{objectFit:'cover'}}/>
          <h1 style={{zIndex:'1'}} className='text-5xl text-white font-bold md:text-6xl lg:text-8xl xl:8xl pr-3 pl-3'>Discover Culinary Magic with Zervings</h1>
        </div>
        <div className='bg-black text-white pt-5 pb-5'>
        <div className='flex flex-col lg:grid lg:grid-cols-2 lg:gap-8 md:mt-6 ' style={{width:"90%",margin:'40px auto'}}>
        <div className='text-start flex flex-col gap-5 p-5 pt-10 lg:p-10'>
          <h1 className='font-bold text-3xl md:text-5xl lg:text-5xl xl:text-6xl'>Why FreshSaver?</h1>
          <p style={{maxWidth:"900px"}} className='text-gray-500'>Every year, millions of tons of food go to waste, affecting our wallets and the planet. 
            FreshSaver is here to help you take control of your kitchen, reduce waste, and make the most of your groceries. 
            With FreshSaver, you’ll never let food go bad again – saving you money and helping protect the environment.</p>
        </div>
        <div className='text-start flex flex-col gap-5 p-5 pt-10 pb-10  lg:p-10'>
          <h1 className='font-bold text-3xl md:text-5xl lg:text-5xl xl:text-6xl'>How It Works</h1>
          <p style={{maxWidth:"900px"}} className='text-gray-500'>FreshSaver is a simple yet powerful tool to manage your food inventory. By tracking what you have, when it expires, 
            and how to use it, FreshSaver helps you make smarter grocery choices and reduce waste.</p>
        </div>
        </div></div>
        <div className='flex flex-col gap-8 p-4 pb-10 mb-10 mt-10 lg:grid lg:grid-cols-2 lg:gap-8'>
          {works && works.map((w,index)=>(<div key={index} className='how-cards flex flex-col items-center gap-5 pt-10 pb-0 '>
            <h1 className='font-bold text-3xl md:text-5xl lg:text-5xl xl:text-6xl pl-2 pr-2 pb-2 pt-6'>{w.name}</h1>
            <p className='text-gray-500 p-5'>{w.description}</p>
            <div>
              <button onClick={()=>navigate(`${w.path}`)} className='text-white transition-all duration-1000 ease-linear bg-blue-500 p-2 pr-4 pl-4 border rounded-xl hover:bg-blue-600'>Learn More</button>
            </div>
            <img src={w.image} alt='img' className='mt-4' style={{height:"300px",width:w.id===4&&'100%',objectFit:'cover'}} />
          </div>))}
        </div>
        <div>
          <PantryFeatures/>
        </div>
        <div>
          <FeatureShowcase/>
        </div>
        <div>
          <CommunityComponent/>
        </div>
        <div>
          <Footer/>
        </div>
      </div>
    </div>
  )
}

export default Home
