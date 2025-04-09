import { useState , useEffect } from "react";
import { Link } from "react-router-dom";
export default function AppFragrances (props){
    
    const [filterResults,setfilterResults]=useState([
       
    ])
    const [filter,setfilter]=useState("")
    function getSiblings (e) {
        e.style.backgroundColor = "black";
        e.style.color = "white";
        setfilter(e.id);
       
       
        let sibling  = e.parentNode.firstChild;
        
        while (sibling) {
            if (sibling.nodeType === 1 && sibling !== e) {
                sibling.style.removeProperty('background-color');
                sibling.style.removeProperty('color');
            }
            sibling = sibling.nextSibling;
        }
    };
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/api/fragrences`).then((data)=>data.json()).then((data)=>{
            setfilterResults(data)
        }).catch((e)=>{console.log(e)})
    },[])
    
    useEffect(()=>{let array = [...filterResults];
        switch (filter){
            
            case "Name" : {array.sort((a, b) => {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
                }); break;
                }
                case "Latest" : {array.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)
                );
                    break;}
                case "Price" : {
                    setfilterResults(array.sort((a,b)=> a.price - b.price))
                    
                    break;
                }
                default : {array.sort((a, b) => {
                    const nameA = a.name.toUpperCase();
                    const nameB = b.name.toUpperCase();
                    if (nameA < nameB) return -1;
                    if (nameA > nameB) return 1;
                    return 0;
                    }); break;}
                    
        };
        
        setfilterResults([...array]);

    },[filter])
    return (
        <div id="Fragrences" className="flex-col  place-items-center content-center text-black p-12">
            <div className="my-12 w-full flex ">
           <h1 style={{color : "black"}} className="text-7xl max-lg:text-5xl font-bold px-8"> Fragrances</h1>
            </div> 
            <div className="w-full flex flex-wrap justify-between px-12 my-12   ">
                <div id="Name" onClick={(e)=>{ getSiblings(e.target);   }} className="py-2 cursor-pointer text-center px-6 rounded-xl m-2 border-2 border-black  text-lg font-bold" >Name</div>
                <div id="Price" onClick={(e)=>{ getSiblings(e.target);   }} className="py-2 cursor-pointer text-center px-6 rounded-xl m-2 border-2 border-black text-lg font-bold ">Price : Low to High</div>
                <div id="Latest" onClick={(e)=>{ getSiblings(e.target);   }} className="py-2 cursor-pointer text-center px-6 rounded-xl m-2 border-2 border-black text-lg font-bold ">Latest </div>
                 </div>

            
                <div className="flex justify-evenly gap-6 my-12 flex-wrap md:px-32">
                     
               {filterResults.map(((element)=> <div key ={element._id} className="my-8 flex-col place-items-center content-center max-sm:w-32">
               <Link  onClick={()=>{props.setNavProd(true)}} to={`/fragrences/${element._id}`}><img className="h-72 max-sm:h-32 max-sm:w-32 w-72 mb-3 cursor-pointer " src={element.img1} alt="" /></Link>
               
                    <Link  onClick={()=>{props.setNavProd(true)}} className="hover:border-b-2 border-orange-300 hover:text-orange-300 text-xl font-medium" to={`/fragrences/${element._id}`}><span className="block font-semibold text-2xl">{element.name}</span> <span className="text-md">20%off from </span>  <span className="line-through text-xl font-semibold">{parseInt(element.price * 1.2)} DA</span> to <span className="text-red-700 text-2xl font-bold">{element.price} DA</span></Link>
                </div>)) 
               } 
                </div>
        </div>
    )
}