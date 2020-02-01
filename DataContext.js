import React, {useState, createContext,useEffect} from 'react';
import firebase from 'firebase';
import firebaseConfig from '../initfirebase'
import 'firebase/firestore';
export const DataContext = createContext();

export const GroceryDataProvider = (props)=>{
	const [groceryList, setGroceryList] = useState([]);
	const [userList, setUserList] = useState([])
	console.log('firebase');
	useEffect(()=>{
		const fetch = async()=>{
			let db = firebase.database().ref('grocery');
			db.on('value',snapshot=>{
				console.log(snapshot.val())
				setGroceryList(snapshot.val());
			})
			db = firebase.database().ref('users/');
			db.on('value',snapshot=>{
				setUserList(snapshot.val());
			})
		}
		fetch();
	},[])

	const getAllLists= () => {
		return groceryList;
	}
	const getList= (x) => {
		console.log(groceryList);
		return null;
	}
	const setList= () => {
		return null;
	}
	const updateList= () => {
		return null;
	}
	const getUsers= () => {
		return null;
	}
	return( 
		<DataContext.Provider value={{groceryList,userList,getAllLists,getList,setList,updateList,getUsers}}>
		{props.children}
		</DataContext.Provider>
	)
}