import { useEffect, useState } from "react"
import React from "react";
export default function AppHome (props){
    const [currentimg,setcurrentimg] = useState('')
    const [imgarr,setimgarr] = useState([
                        "" ,
                        "" ,
                        "" ,
                        "" 
    ])
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/api/Banner`,{headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },credentials: 'include'}).then((res)=>res.json()).then((data)=>{let tab = data.filter((element) => element.selected === true)[0]; let tab2 = [tab.img1,tab.img2,tab.img3,tab.img4]; setimgarr(tab2);seturl(tab.img1)})
       
    },[])
    useEffect(()=>{
        let i=0;
       const interval = setInterval(() => {
        seturl(imgarr[i]);  
        if (i === imgarr.length - 1) {
          i = 0; 
        } else {
          i++; 
        }
      }, 5000);
            return () => clearInterval(interval);
    },[imgarr])
  
    
    
    function getSiblings (e) {
        e.classList.add('h-24')
        e.classList.add('w-24')
        e.classList.add('shadow-lg')
        e.classList.add('shadow-white')
        setcurrentimg(e.id);
       
       
        let sibling  = e.parentNode.firstChild;
        
        while (sibling) {
            if (sibling.nodeType === 1 ) {
                sibling.classList.remove('h-24')
                sibling.classList.remove('w-24')
                sibling.classList.remove('shadow-lg')
                sibling.classList.remove('shadow-white')
            }
            sibling = sibling.nextSibling;
        }
    };
    const [url,seturl]=useState(imgarr[0])
    return (
        <div id="Home" className="flex-col place-content-end place-items-center pb-8 ">
            
           <a className="cursor-pointer block hover:  w-full " href="#Fragrences"><img src={url} alt="" className="cursor-pointer hover:  w-full " ></img>
           </a>
            
            
            <div  style={{backgroundColor: "rgba(220, 220,220, 220.7)"}}  className="h-16 mt-2 rounded-3xl px-3 flex gap-2 items-center ">
               {imgarr.map((element)=> 
             <img  onClick={(e)=>{seturl(e.target.src); getSiblings(e.target)}} className="h-12 cursor-pointer hover:h-16 hover:w-16 hover:shadow-lg transition duration-500  hover:shadow-white w-12 rounded-3xl" src={element} alt="" />
            ) }
            </div>
             
            
            
            

        </div>
    )
    
    
    
}