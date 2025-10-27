import Header from "./Header"
import { useState } from "react"
//import data from "./data"
import Card from "./Card";

export default function App(){
 let [jobdata,setjobdata]= useState([]);
      console.log(jobdata);
     
  async function handlesubmit(event){
          event.preventDefault();
          const formData = new FormData(event.target);
          let title=formData.get("title");
          let location=formData.get("location");
          let experience=formData.get("experience");
          console.log(title+" "+location+" "+experience);
         try{
            let response = await fetch(`http://localhost:8080/jobdetails/${title}/${location}/${experience}`);
            let data=await response.json();
          setjobdata(data);
         }
         catch(err) {
            console.log(err);
         }
   }


  let jobcards=jobdata.map(card =>
     <Card
        key={card.id}
        title={card.title}
        company={card.company}
        location={card.location[0]}
        experience={card.experience}
        salary={card.salary}
        skillset={card.skillset}
        url={card.url}
     />)
 
  return (
    <>
    <Header/>
    <form className="inputData" onSubmit={handlesubmit} >
    <input type="text" name="title" required />
    <input type="text" name="location" required />
    <input type="number" name="experience" defaultValue={0}/>
    <button type="submit" id="submit" >GO!</button>
    </form>
    <div className="jobcards">{jobcards}</div>
    </>
  )
};