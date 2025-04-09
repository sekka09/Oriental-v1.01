import AppHeader from './componants/AppHeader';
import './output.css'
import './App.css'
import 'animate.css';
import AppHome from './componants/AppHome';
import AppFragrances from './componants/AppFragrances';
import AppFooter from './componants/AppFooter';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom'; 

function App() {
  const [NavProd,setNavProd]=useState(false)
  const [NavBN,setNavBN]= useState(false)
  const [pathname,setpathname] = useState(window.location.pathname)
  const navigate = useNavigate();
    const location = useLocation(); 
    

    
    useEffect(() => {
     
      setpathname( window.location.pathname)
    }, [location]);
  
  useEffect(()=>{
    if (pathname.includes("/fragrences")){ setNavProd(true); setNavBN(false)}
    if (pathname.includes("/BuyNow")){ setNavProd(false); setNavBN(true)}
    else if (pathname==="/") { setNavProd(false); setNavBN(false) }
  },[NavProd,pathname])
  return (
    <div className="App relative">
       <AppHeader></AppHeader>
      {!NavProd &&!NavBN  &&<AppHome></AppHome>}
       {!NavProd &&!NavBN &&<AppFragrances setNavProd={setNavProd}></AppFragrances>}
      { (NavProd|| NavBN) && <Outlet />}
      <AppFooter></AppFooter> 
      
    </div>
  );
}

export default App;
export const API_URL = process.env.REACT_APP_API_URL;