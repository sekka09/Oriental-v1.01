import { useEffect, useState } from "react";
export default function FragrancePage (props){
  const [pathname,setpathname] = useState(window.location.pathname)
  const [promocode,setpromocode]=useState("")
  const [promoapp,setpromoapp]=useState(false)
  const [showpromobtn,setshowpromobtn] = useState(false)
  const [total,settotal] = useState(0)
  const [filteredArray,setfilteredArray]=useState()
  const [orderdone,setorderdone]= useState(false)
  const [ordersuccess,setordersuccess]= useState(false)
  const [promocodes,setpromocodes]=useState()
  const [livraisonarray,setlivraisonarray]= useState([
      {
          state : "blida",
          price : 500 
      },
      {
          state : "alger",
          price : 800
      }
  ])
  const [name,setname]=useState("");
  const [pn,setpn]=useState("");
  const [adresse,setadresse]=useState("");
  const [selected,setselected]=useState({
      willaya : "N/A",
      PrixB : 0,
      PrixAD : 0
  })
  const [fragrance,setfragrance]= useState({
    name : "",
    img : "",
  })
    const [filter,setfilter]=useState({
        ml : "50",
        price : "3600"
    })
    const [livraison,setlivraison]= useState("B")
    const [filterResults,setfilterResults]=useState([
        {
            id : "0",
            img : "",
         
        },
        {
            id : "1",
            img : "",
           
        },
        {
            id : "3",
            img : "",
           
        }
    ])
    const [imgdisplayed,setimgdisplayed]= useState("") 
    function getSiblings (e) {
        e.classList.add('bg-black');
        e.classList.add('text-white');
        if (e.id==="50") setfilter({ml : "50", price :3600});  else setfilter({ml : "100", price :fragrance.price});
       
       
        let sibling  = e.parentNode.firstChild;
        
        while (sibling) {
            if (sibling.nodeType === 1 && sibling !== e) {
                sibling.classList.remove('bg-black');
                sibling.classList.remove('text-white');
            }
            sibling = sibling.nextSibling;
        }
    };
    function getSiblings2 (e) {
        e.classList.add('bg-black');
        e.classList.add('text-white');
        if (e.id==="AD") setlivraison("AD");  else setlivraison("B");
       
       
        let sibling  = e.parentNode.firstChild;
        
        while (sibling) {
            if (sibling.nodeType === 1 && sibling !== e) {
                sibling.classList.remove('bg-black');
                sibling.classList.remove('text-white');
            }
            sibling = sibling.nextSibling;
        }
    };
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/api/CodesPromo`,
            {credentials: 'include'})
            .then((response)=> response.json())
        .then((data)=>{ setpromocodes(data) })
        .catch((e)=>console.log(e))
        
    },[])
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/api/Shipping`,{headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },credentials: 'include'}).then((res)=>res.json()).then((data)=>{setlivraisonarray(data)})
          
    },[])
    useEffect( ()=>{
        let newString = pathname
         setpathname(newString)
        
        fetch(`${process.env.REACT_APP_API_URL}/api${pathname}`,
            {credentials: 'include'})
            .then((data)=>data.json())
        .then((data)=> { setfragrance(data); setimgdisplayed(data.img1) ; setfilterResults([{id : "0", img : data.img1},{id : "1", img : data.img2},{id : "2", img : data.img3 }])})
        .catch((e)=>console.log(e)) 
        
    },[])
    useEffect(()=>{ if (livraison === "B")
        settotal(parseFloat(filter.price)+parseFloat(selected.PrixB)); else settotal(parseFloat(filter.price)+parseFloat(selected.PrixAD))
    },[filter,selected,livraison])
    useEffect(()=>
        {
            setpromoapp(false)
        },[filter.ml])
       function codeused(id,sells){
            fetch(`${process.env.REACT_APP_API_URL}/api/CodesPromo/${id}`,{
                headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },credentials: 'include', method : "PATCH", body : JSON.stringify({
                    sells: sells,
                  })})
                .then((response)=> response.json())
            .then((data)=>{ })
            .catch((e)=>console.log(e))
        }
    return (
        <div className="flex-col place-items-center content-center">
            <div className="flex w-10/12 my-12 max-xl:w-full max-lg:flex-col justify-evenly items-center flew-wrap p-12 gap-4">
                <div className="lg:w-1/6 max-lg:hidden flex-col place-items-center">
                   {filterResults.map((element)=><img onClick={(e)=> {setimgdisplayed(e.target.src)}} className="h-12 hover:h-24 hover:w-24 w-12 my-6 rounded-lg cursor-pointer" src={element.img} alt="" />
                   ) }
                </div>
                <div className="lg:w-3/6 flex justify-center">
                    <img className="lg:max-h-96 rounded-lg"  src={imgdisplayed}  alt="" />
                </div>
                <div className="lg:w-1/6 lg:hidden flex gap-4 justify-between"> 
                   {filterResults.map((element)=><img key={element.id} onClick={(e)=> {setimgdisplayed(e.target.src)}} className="h-12 w-12 my-6 rounded-lg bg-gray-500 cursor-pointer" src={element.img} alt="" />) }
                </div>  

                <div style={{backgroundColor: "#fffafa "}}  className="lg:w-2/6 max-lg:w-full h-96 border-2 border-black  p-2 flex-col text-black rounded-md ">
               <div className="h-1/4 p-2"><h1  className="font-bold text-2xl">{fragrance.name}</h1>
                <span className="text-gray-400">{filter.ml} ml</span>
                <h1 className="text-xl font-medium">Price : {filter.price} </h1>
                </div> 
                <div className="flex h-2/4 justify-center items-center flex-wrap gap-4">
                    <div id="50" onClick={(e)=>{getSiblings(e.target)}} className="h-20 w-20 p-2 flex justify-center items-center border-2 rounded-lg cursor-pointer hover:bg-black  hover:text-white  border-black font-medium">50ml</div>
                    <div id="100" onClick={(e)=>{getSiblings(e.target)}} className="h-20 w-20 p-2 flex justify-center items-center border-2 rounded-lg cursor-pointer  hover:bg-black hover:text-white  border-black font-medium">100ml</div>
                </div>
                <div className="h-1/4 flex justify-center items-center">
                    <a href="#OrderForm">
 <div 
                 className="w-48 shadow-md flex justify-center items-center shadow-black hover:bg-white bg-black h-12 text-white hover:text-black font-bold text-xl rounded-xl" 
                    
                 ><span >Order Now</span></div>
                    </a>
               
                </div>


                </div>

            </div>
            <div className="flex max-md:flex-col justify-evenly my-12 p-4 w-10/12">
                <div style={{backgroundColor: "#fffafa"}}  className="p-8 border-2 border-black w-2/5 max-md:w-full max-md:my-4 rounded-xl">
                <p className="text-black">
                    <h1 className="text-xl font-bold mb-1 ">Description :</h1> 
                    {fragrance.description}     
                    </p>
                </div>
                <div style={{backgroundColor: "#fffafa"}}  className="p-8 border-2 border-black w-2/5 max-md:w-full max-md:my-4 rounded-xl">
                    <p className="text-black">
                    <h1 className="text-xl font-bold mb-1 ">Delivery Type :</h1> 
                                    <span className="font-medium text-lg">Standard Delivery / توصيل عادي (الى المكتب)  </span>  <br />
                                    Delivery within 24-48h / 24-48h التسليم خلال
                                     <br />
                                    <span className="font-medium text-lg">Express Delivery</span>  <br />
                                    Home delivery./توصيل الطلبات للمنازل <br />        
                    </p>
                </div>
            </div>
            {! orderdone && <form id="OrderForm" className="w-full flex items-center justify-center">
            <div style={{backgroundColor: "#fffafa"}}  action="" className="lg:w-4/6 border-2 border-black  py-4 px-12 flex-col place-items-center content-center rounded-md my-16 text-black ">
                <h1 className="text-3xl font-bold my-9">Order Form</h1>
                
            <div className="w-2/4 max-sm:w-full max-2xl:w-3/4 " action="">
            <div className="mt-12">
                <div className="my-4 flex justify-between content-center max-lg:flex-col max-lg:place-items-center" >
                    <label htmlFor="FullName" className="font-medium text-xl ">Full Name / الاسم و اللقب</label> 
                    <input required value = {name} onChange={(e)=>{setname(e.target.value)}} type="text" name="FullName" id="FullName" className="h-10 w-96 rounded-md max-sm:w-full px-4 border-2 border-black text-black"/>
                    </div>
                    <div className="my-4 flex justify-between content-center max-lg:flex-col max-lg:place-items-center">
                    <label className="font-medium text-xl " htmlFor="PhoneNumber">Phone Number / رقم الهاتف</label>
                    <input required value = {pn} onChange={(e)=>{setpn(e.target.value)}} type="number" name="PhoneNumber" id="PhoneNumber" className="h-10 w-96 max-sm:w-full rounded-md px-4 border-2 border-black text-black" />
                    </div>
                <div className="my-4 flex justify-between content-center max-lg:flex-col max-lg:place-items-center">
                    <label className="font-medium text-xl " htmlFor="adresse">Adresse /العنوان</label>
                    <input required value = {adresse} onChange={(e)=>{setadresse(e.target.value)}} id="adresse" name="adresse" type="text" className="h-10 w-96 max-sm:w-full rounded-md px-4 border-2 border-black text-black" /> 
                </div>
                <div className="my-4 gap-5 flex flex-wrap justify-between content-center max-lg:flex-col max-lg:place-items-center">
                    <label className="font-medium text-xl " htmlFor="adresse"> parfum's volume :  <span> {filter.ml} ml </span> </label>
                   < div className="flex justify-center gap-3 w-full">   <div id="50" onClick={(e)=>{getSiblings(e.target)}} className="h-20 w-20 p-2 flex justify-center items-center border-2 rounded-lg cursor-pointer hover:bg-black  hover:text-white  border-black font-medium">50ml</div>
                    <div id="100" onClick={(e)=>{getSiblings(e.target)}} className="h-20 w-20 p-2 flex justify-center items-center border-2 rounded-lg cursor-pointer  hover:bg-black hover:text-white  border-black font-medium">100ml</div>
                </div></div>
                <div className="my-4 flex justify-evenly content-center max-lg:flex-col max-lg:place-items-center">
                    
                <div className="flex justify-center flex-wrap gap-3 items-center">  <div className="flex justify-center flex-wrap gap-3 items-center"> <div id="B" onClick={(e)=>{getSiblings2(e.target)}} className="h-20 w-20 p-2 flex justify-center items-center border-2 rounded-lg cursor-pointer hover:bg-black  hover:text-black hover:text-white border-black font-medium">Desk / المكتب</div>
                    <div id="AD" onClick={(e)=>{getSiblings2(e.target)}} className="h-20 w-20 p-2 flex justify-center items-center border-2 rounded-lg cursor-pointer  hover:bg-black hover:text-white  border-black font-medium">Home / المنزل</div>
                    </div>  <select  onChange={(e)=>{setselected(livraisonarray.find((element)=>element.willaya===e.target.value)); }} name="algerian-states" id="algerian-states "  className="h-10 border-2 border-black w-96 max-sm:w-full rounded-md px-4 text-black">
                        <option className="hidden"    disabled selected>اختر الولاية</option>
                        {
                            livraisonarray.map((element)=>
                        <option value={element.willaya}>{element.willaya}</option>
                            )
                        }
                    </select>
            <h3 className="text-xl font-bold"> سعر الشحن : {livraison === "B" ? selected.PrixB : selected.PrixAD} دج</h3>
            
            </div>
                   

                </div> 
                </div>
                <div className="my-4 flex justify-center content-center">
                        <h1 className="text-3xl font-bold"> المجموع : {total} دج</h1>
                    </div>
                <div 
                  
                 
                  action=""> {!showpromobtn  && <span className="font-bold cursor-pointer text-center block my-8" onClick={()=>{setshowpromobtn((currentstate)=>!currentstate)}}>Do you have Promo Code ? <span className="text-orange-400 text-xl">Click Here</span>  </span> }{showpromobtn && <div  style={{background :"rgb(10, 14, 19)"}} className="px-12 my-8 py-4 rounded-lg  max-sm:flex-col flex justify-center gap-4 items-center">
                        
                        <span className="text-gray-300">Add Code Promo</span>
                              <input value={promocode} onChange={(e)=>{setpromocode(e.target.value)}} className="rounded-full max-sm:w-48 text-black px-4 py-2" type="text" />
                        
                        <button type="submit" className="px-3 py-2 rounded-lg hover:bg-white hover:text-black border-2 text-white border-white"  onClick={async(e)=>{
                    e.preventDefault();
                    
                            const fa = promocodes.filter(obj => obj.code === promocode)
                            
                         await setfilteredArray(fa[0]) ;
                            
                        const containsValue = fa.length > 0;
                        
                           
                      if (containsValue && !promoapp)  {setfilter({...filter, price :  parseFloat(filter.price) - parseFloat(filter.price)*fa[0].reduction}); setpromoapp(true)}
                      else if (promoapp) window.alert("code already applied !")
                      else window.alert("wrong code , or not existing.")
                  }}>تأكيد</button>

                  
                    </div>}</div>
                    
                    <div className="flex justify-center items-center"><button type="submit" className="h-16 w-64 bg-black border-2 border-black  rounded-md hover:bg-white hover:text-black text-2xl font-bold text-white" onClick={(e)=>{
                        e.preventDefault()
                        
                        if (! (name==''||!pn||selected.willaya =="N/A" || adresse=='')){
                        setorderdone(true)
                        fetch(`${process.env.REACT_APP_API_URL}/api/Order`,
                            {method : "post",headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                              },
                                credentials: 'include',
                                body : JSON.stringify({
                                name : name,
                                phonenumber : pn,
                                adresse :adresse,
                                shipping : livraison,
                                wilaya : selected.willaya,
                                volume : filter.ml,
                                total : total,
                                parfum : fragrance.name
                                }),  
                            })
                            .then(()=>{setordersuccess(true); if (promoapp) codeused(filteredArray._id,filteredArray.sells+1)})
                        .catch((e)=>console.log(e))}
                            else window.alert("Please Make a valide order")

                    }}>تأكيد الطلب</button></div>
                    
                    
               
                

                
            </div>
        </div>
        </form>}
        {orderdone && <div style={{background : "rgb(26, 26, 29)"}} className="text-white rounded-xl max-sm:w-10/12 sm:w-5/6 ">
           {ordersuccess && <div>
            <div className="py-4 px-2 text-2xl  font-semibold">
                <h1 className="text-center">Order sent ✔️, we will reach out soon ./. تم إرسال الطلب ✔️ ، وسوف نتصل بك قريبا. </h1>
            </div>
            <div className="flex justify-center items-center ">
                <p className="text-xl font-medium flex-row gap-y-2 flex-wrap content-center justify-items-center">
              <div className="py-2 flex justify-between w-10/12"><span> Full Name / الاسم و اللقب :</span> <span>{name}</span> <br />
                </div> 
                <div className="py-2 flex justify-evenly w-10/12"> <span>Phone Number / رقم الهاتف :</span> <span> {pn}</span> <br /> </div>
                <div className="py-2 flex justify-evenly w-10/12"> <span>Adresse /العنوان :</span> <span></span>{adresse} <br /></div>
                <div className="py-2 flex justify-evenly w-10/12"> <span> parfum's volume  /حجم العطر :</span>{filter.ml} ml<span></span> <br /></div>
                <div className="py-2 flex justify-evenly w-10/12">  <span> shipping price : </span> <span>{livraison === "B"? selected.PrixB : selected.PrixAD} DA</span> <br /></div>
                <div className="py-2 flex justify-evenly w-10/12"> <span>  total : </span> <span>{total} DA</span> <br /></div>

                </p> 
               
            </div>
            <div className="flex items-center justify-center py-4"> <div onClick={()=>{
                window.location.href = '/#Fragrences';
            }} className="bg-white py-2 px-1 cursor-pointer hover:bg-black hover:text-white hover:border-4 border-white text-black rounded-xl ">check other products</div></div>
                </div>}
                {!ordersuccess && <div>
                    <div className="loader">Charging...</div>
                </div>}
        </div> }
        </div>
        
    )
}
