// import Header from './Header'
import React,{useState} from 'react'
import { Outlet } from 'react-router-dom'
import Navbaru from './Navbaru'
import Headeru from './Headeru'
// <Link to ="/products"> go to products</Link>  
const Sidebar = ({ name, role, handleDelete,id})=> {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  
  return (
    <>
 

<Navbaru name={name} role={role}  handleDelete={handleDelete} sidebarToggle={sidebarToggle}/> 
<div className={`${sidebarToggle ? "" : "ml-64"} `}>
<Headeru
        sidebarToggle={sidebarToggle} 
        setSidebarToggle={setSidebarToggle}  id={id}
      />

<div className="content-area">
{name}  {id}  
<Outlet context={{ id12:id }} />
        </div>
 
 </div> 
  </>
  )
}
export default Sidebar;
//  <div className="flex-row flex bg-neutral-100 h-screen overflow-hidden ">   

