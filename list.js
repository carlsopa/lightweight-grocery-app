import React, {useContext,useEffect} from 'react';
import {DataContext} from '../../../context/test/DataContext'
import Card from './ItemCard';

const update=(x)=>{
	console.log(x)
}

const List = () =>{
	const {listId} = useContext(DataContext);
	const {userItemList} = useContext(DataContext);
	const {GetItemList} = useContext(DataContext);
	const {ListSplit} = useContext(DataContext);
	const {foundList} = useContext(DataContext);
	const {findList} = useContext(DataContext);
	const {Updater} = useContext(DataContext);
	useEffect(()=>{
		GetItemList();
	},[listId])
	useEffect(()=>{
		ListSplit();
	},[userItemList])

	return(
		<div>
			<p>To find:</p>
			<ul>
			{findList.map((item,index)=><Card key={item.listItemId} index={index}
				value={item.listItemId} item={item.product} 
				units={item.quantity} unitType={item.unit} 
				change={Updater} />)}
			</ul>
			<p>Found:</p>
			<ul>
			{foundList.map((item,index)=><Card key={item.listItemId} index={index}
				value={item.listItemId} item={item.product} 
				units={item.quantity} unitType={item.unit} 
				change={Updater} />)}
			</ul>
		</div>
	)
}
export default List;