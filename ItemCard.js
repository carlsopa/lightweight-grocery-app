import React from 'react';



const Card=(props)=>{

	return (
		<li key={props.value}>
			<div>
				<input type="checkbox" checked={props.cart} onChange={(e)=>{props.cartChange(props.value)}}/>
			</div>
			<div>
				<input id={'product '+props.value} className='update' 
				type='text' value={props.item} 
				onChange={(e)=>props.itemChange(e.target.value,props.value)}
				 />
				<br/>
				<input id='quantityValue' className='update' 
				type='number' value={props.units} 
				onChange={(e)=>props.quantityChange(e.target.value,props.value)}
				 />
				<span id='quantityType' className='update'>{props.unitType}</span>
			</div>
			<div>
				<button id='save-button' type='button' 
				onClick={(e)=>{props.change(props.item,props.units,props.value)}}>&#10003; save</button>
				<button id='delete-button' type='button'>&#10007; delete</button>
			</div>
		</li>
	)
}
export default Card;