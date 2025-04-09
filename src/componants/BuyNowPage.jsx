import { useState } from "react"


export default function BuyNowPage (){ 
    const [promocode,setpromocode]=useState("")
    const [promoapp,setpromoapp]=useState(false)
    const [total,settotal] = useState(0)
    const [livraisonarray,setlivraisonarray]= useState([
        {
            state : "blida",
            price : 50
        },
        {
            state : "alger",
            price : 300
        }
    ])
    const [selected,setselected]=useState({
        state : "blida",
        price : 100
    })
    return (
        <div className="w-full flex items-center justify-center">
            <div style={{background: "rgb(26, 26, 29)"}} action="" className="lg:w-4/6  py-4 px-12 flex-col place-items-center content-center rounded-md my-16 text-white ">
                <h1 className="text-3xl font-bold my-9">Order Form</h1>
                
            <form className="w-2/4 max-sm:w-full max-2xl:w-3/4 " action="">
            <div className="my-12">
                <div className="my-4 flex justify-between content-center max-lg:flex-col max-lg:place-items-center" >
                    <label htmlFor="FullName" className="font-medium text-xl ">Full Name</label> 
                    <input onChange={(e)=>{}} type="text" name="FullName" id="FullName" className="h-10 w-96 rounded-md max-sm:w-full px-4 text-black"/>
                    </div>
                    <div className="my-4 flex justify-between content-center max-lg:flex-col max-lg:place-items-center">
                    <label className="font-medium text-xl " htmlFor="PhoneNumber">Phone Number</label>
                    <input onChange={(e)=>{}} type="number" name="PhoneNumber" id="PhoneNumber" className="h-10 w-96 max-sm:w-full rounded-md px-4 text-black" />
                    </div>
                <div className="my-4 flex justify-between content-center max-lg:flex-col max-lg:place-items-center">
                    <label className="font-medium text-xl " htmlFor="adresse">Adresse</label>
                    <input id="adresse" name="adresse" type="text" className="h-10 w-96 max-sm:w-full rounded-md px-4 text-black" /> 
                </div>
                <div className="my-4 flex justify-evenly content-center max-lg:flex-col max-lg:place-items-center">
                    
                   <div className="flex justify-center items-center"><h3 >shipping price : {selected.price} DA</h3></div> 
                    <select onChange={(e)=>{setselected(livraisonarray.find((element)=>element.state===e.target.value)); }} name="algerian-states" id="algerian-states "  className="h-10 w-96 max-sm:w-full rounded-md px-4 text-black">
                        <option className="hidden"  value="" disabled selected>Select a state</option>
                        {
                            livraisonarray.map((element)=>
                        <option value={element.state}>{element.state}</option>
                            )
                        }
                    </select>

                </div> 
                </div>
                <form 
                  
                  onSubmit={(e)=>{
                    e.preventDefault()
                      if (promocode ==="F09" && !promoapp)  {settotal((currentstate)=>currentstate*0.15); setpromoapp(true)}
                      else if (promoapp) window.alert("code already applied !")
                      else window.alert("wrong code , or not existing.")
                  }}
                  action="">  <div  style={{background :"rgb(10, 14, 19)"}} className="px-12 py-4 rounded-lg  max-sm:flex-col flex justify-center gap-4 items-center">
                        
                        <span className="text-orange-300">Add Code Promo</span>
                              <input value={promocode} onChange={(e)=>{setpromocode(e.target.value)}} className="rounded-full max-sm:w-48 text-black px-4 py-2" type="text" />
                        
                        <button type="submit" className="px-3 py-2 rounded-lg hover:bg-orange-300 hover:text-black border-2 border-orange-300">submit</button>

                        
                    </div></form>
                    <div className="my-4 flex justify-center content-center">
                    <button type="submit" className="h-16 w-64 bg-orange-400 rounded-md text-black">Submit</button>
                    </div>
               
                

                
            </form>
        </div>
        </div>
    )
}