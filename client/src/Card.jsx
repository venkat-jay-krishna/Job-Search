import Skill from "./Skill"
export default function Card(props){
    let skilltags=props.skillset.map((skil,index) =><Skill key={index}skill={skil} /> )
    return(
       <div className="jobcard">
        <h3><a href={props.url}>{props.title}</a></h3>
        <h4>{props.company}</h4>
        <section>
        <p>exp: {props.experience}</p>
        <p>| salary: {props.salary}</p>
        <p>| {props.location}</p>
        </section>
        <div className="skilltags">{skilltags}</div>
       </div>
    )
}