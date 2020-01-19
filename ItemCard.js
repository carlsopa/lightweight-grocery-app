import React, {useState,useEffect} from 'react';



const Card=(props)=>{
	const [Product, setProduct] = useState([]);
	const [Quantity, setQuantity] = useState([]);
	
	useEffect(()=>{
		setProduct(props.item)
		setQuantity(props.units)
	},[])
	
	return (
		<li key={props.value}>
			<div>
				<input type="checkbox"/>
			</div>
			<div>
				<input id={'product '+props.value} className='update' 
				type='text' value={Product} 
				onChange={(e)=>setProduct(e.target.value)}
				 />
				<br/>
				<input id='quantityValue' className='update' 
				type='number' value={Quantity} 
				onChange={(e)=>setQuantity(e.target.value)}
				 />
				<span id='quantityType' className='update'>{props.unitType}</span>
			</div>
			<div>
				<button id='save-button' type='button' 
				onClick={(e)=>{props.change(Product,Quantity,props.value)}}>&#10003; save</button>
				<button id='delete-button' type='button'>&#10007; delete</button>
			</div>
		</li>
	)
}
export default Card;