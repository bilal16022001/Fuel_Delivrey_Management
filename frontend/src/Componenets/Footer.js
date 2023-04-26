import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import CopyrightIcon from '@mui/icons-material/Copyright';
import axios from 'axios';

function Footer() {

    const [Contact,setContact]=useState([]);
    const [About,setAbout]=useState([]);

    useEffect(() => {
      PageContact();
      PageAbout();
    },[]);

   const PageContact = () => {
      axios.get("http://127.0.0.1:8000/api/PageContact/").then(res => {
      setContact(res.data);
    }).catch(err => {
         console.log(err);
    });
  }
  const PageAbout = () => {
    axios.get("http://127.0.0.1:8000/api/PageAbout/").then(res => {
    setAbout(res.data);
  }).catch(err => {
       console.log(err);
  });
}

  return (
    <div>
        <Content>
            <div className='container'>
            <div className='p-3 row '>
               <div className='col-md-6'>
                {Contact.map(item => (
                    <div>
                       <h3>{item.Title}</h3>
                        <p className='w-1'>{item.Description}</p>
                        <p>Phone : {item.Phone}</p>
                        <p>Email : {item.Email}</p>
                        <p><CopyrightIcon/> {item.Copyright}</p>
                    </div>
                ))}
                 
               </div>
               <div className='col-md-6'>
                {About.map(item => (
                   <>
                      <h3>{item.Title}</h3>
                      <p>{item.Description}</p>
                   </>
                ))}
                 
               </div>
            </div>
            </div>
        </Content>
    </div>
  )
}

export default Footer

const Content = styled.div`
    background-color:black;
    color:#fff;
`