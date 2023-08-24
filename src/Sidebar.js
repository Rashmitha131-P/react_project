import React, { useState,useEffect } from "react";
import "./App.css";
import axios from 'axios';
import { BsChevronDown } from 'react-icons/bs';
import { BsChevronUp } from 'react-icons/bs';


const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [toggle, settoggle] = useState([]);
  const [payload,setpayload] = useState('');
  const [counter,setcounter] = useState(0)


  useEffect(() => {
    axios.get('https://api.apis.guru/v2/providers.json')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
      if(payload !== []) {
    axios.get(`https://api.apis.guru/v2/${payload}.json`)
      .then(res => {
        settoggle(res.data);
      })
    
      .catch(error => {
        console.error(error);
      });
    }
  }, [payload]);
let results = []
Object.entries(toggle).forEach(element => {
  Object.entries(element[1]).forEach(ele => {
    results.push(
    <div>{ele[1].info.title}</div>  
    )
  })
});

  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };
  const handleClick = (value) => {
    setpayload(value)
    setcounter(counter+1)
  }

  return (
    <div>
    <div className="sidebar">
      {!sidebarOpen ? (
        <div>
          <button className="sidebar_icon" onClick={handleSidebarOpen}>Explore web APIs</button>
        </div>
      ) : (
        <>
          <div>
            <button className="sidebar_icon" onClick={handleSidebarClose}>Explore web APIs</button>
          </div>
          <div className="sidebar_items">
            <div className="select_provider">Select Provider</div>
          {(posts.data).map(post => (
            <div className={post === payload&& counter % 2 !== 0  && "active"}>
              <div className="sidebar_item">
                  <div onClick={e => handleClick(post)}>{post}</div>
                  {(counter %2 !==0 && post === payload) ? (
                 <div className="toggle" onClick={e => handleClick(post)}> <BsChevronUp/></div>
                 ):
                   (
                 <div className="toggle" onClick={e => handleClick(post)}> <BsChevronDown/></div>
                 )}
              </div>
              {post === payload && counter % 2 !== 0 && (
                <div className="result">{results}</div>
              )}
              </div>
            ))}
          
            
            
          </div>
        </>
      )}
    </div>
    </div>
  );
};

export default Sidebar;