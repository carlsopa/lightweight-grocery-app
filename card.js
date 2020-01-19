import React from 'react';
import '../../tst.css'

const Card = props=>{
	return(
		<div className='card'>
		<input type="checkbox" onChange={()=>props.check(props.id)}/>
		<p>Name: <input type="text" value={props.name} onChange={(e)=>props.update(e.target.value, props.index)}/></p>
		<p>Age: {props.age}</p>
		<p>Occupation: <input type="text" value={props.occupation} onChange={(e)=>props.update(e.target.value, props.index)}/></p>
		</div>)
}
export default Card;