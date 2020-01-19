import React, {useContext,useEffect} from 'react';
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
	useEffect(()=>{
		GetUserList();
	},[userId])

	return (
		<div>
			<select defaultValue={'default'} onChange={(e)=>ChangeList(e.target.value)}>
				<option value='default' disabled >Select a grocery list</option>
				{userGroceryList.map(list=>(
					<option key={list.listId} value={list.listId}>{list.title}</option>))}
			</select>
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
		</div>
	)
}
export default Header;