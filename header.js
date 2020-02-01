import React, {useContext,useEffect,useState} from 'react';
import {DataContext} from '../../../../context/test/DataContext'

const UserSelect = () => {
const {userList} = useContext(DataContext);
const {ChangeUser} = useContext(DataContext);
	return(
		<div>
			<select defaultValue={'default'} onChange={(e)=>ChangeUser(e.target.value)}>
			<option value='default' disabled>Select a user</option>
			{userList.map(user=>(
				<option key={user.id} value={user.id}>{user.name}</option>
				))}
			</select>
		</div>
	)
}
const ListSelect = () => {
	const {GetUserList} = useContext(DataContext);
	const {userGroceryList} = useContext(DataContext);
	const {userId} = useContext(DataContext);
	const {ChangeList} = useContext(DataContext);
	const {WriteData} = useContext(DataContext);
	useEffect(()=>{
		GetUserList();
		//console.log(userId);
	},[userId])

	return (
		<div>
			<select defaultValue={'default'} onChange={(e)=>{ChangeList(e.target.value)}}>
				<option value='default' disabled >Select a grocery list</option>
				{userGroceryList.map(list=>(
					<option key={list.listId} value={list.listId}>{list.title}</option>))}
			</select>
		</div>
	)
}
const ListAdd = () => {
	const {WriteItem} = useContext(DataContext);
	const {WriteList} = useContext(DataContext);
	const {userId} = useContext(DataContext);
	const {userTypeList} = useContext(DataContext);
	const [item, setItem] = useState('');
	const [list, setList] = useState('');

	const [product, setProduct] = useState('');
	const [quantity, setQuantity] = useState('');
	const [category, setCategory] = useState('');
	const [type, setType] = useState('');

	let measureCategory = ['Each', 'Lb', 'Oz', 'Fl Oz']
	let dataCategory = ['Other','Beverages', 'Bakery', 'Canned Goods', 'Dairy', 'Baking Goods', 'Frozen Foods', 'Meat', 'Produce', 'Snacks'];


	return (
		<div>
			<div>
				<input id="list" type="text" value={item} onChange={(e)=>setItem(e.target.value)}/>
				<button type="button" onClick={(e)=>{WriteList(item)}}>New List</button>
			</div>
			<div>
				<input type="text" value={product} onChange={(e)=>setProduct(e.target.value)}/>
				<select defaultValue={'default'} onChange={(e)=>{setCategory(e.target.value)}}>
				<option value='default' disabled >Select a category</option>
				{userTypeList.map(ul=>ul.id===parseInt(userId)?(ul.categories.map((uc,index)=><option key={index} value={uc}>{uc}</option>)):null)}</select>
				<br/>
				<input type="number" value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
				<select defaultValue={'default'} onChange={(e)=>{setType(e.target.value)}}>
				<option value='default' disabled >Select a unit</option>
				{measureCategory.map((mc,index)=><option key={index} value={mc}>{mc}</option>)}</select>
				<button type="button" onClick={(e)=>{WriteItem(product,category,quantity,type)}}>New Item</button>
			</div>
		</div>
	)
}
const Header = () => {
	return (
		<div>
			<div>
				<UserSelect/>
			</div>
			<div>
				<ListSelect/>
			</div>
			<div>
				<ListAdd/>
			</div>
		</div>
	)
}
export default Header;