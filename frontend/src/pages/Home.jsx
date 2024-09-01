import React from 'react'
import Hero from "../components/Hero"
import Biography from "../components/Biography"
import Departments from "../components/Departments"
import MessageForm from "../components/MessageForm"

const Home = () => {
  return (
    <>

    <Hero 
    title={"Welcome to Medical Institute of Uttrakhand | Excellence care Technology"} 
    imageurl={"/hero.png"}/>
    <Biography imageurl={"/whoweare.png"}/>
    <Departments/>
    <MessageForm/>
      
    </>
  )
}

export default Home
