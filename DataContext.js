import React, {useState, createContext,useEffect} from 'react';
import firebase from 'firebase';
import firebaseConfig from '../../initfirebase'
import 'firebase/firestore';
export const DataContext = createContext();

export const GroceryDataProvider =(props)=>{
	const [groceryList, setGroceryList] = useState([]);
	const [userList, setUserList] = useState([]);
	const [userGroceryList, setUserGroceryList] = useState([]);
	const [userItemList, setUserItemList] = useState([]);
	const [listId, setListId] = useState([]);
	const [userId, setUserId] = useState([]);

	const [findList, setFindList] = useState([]);
	const [foundList, setFoundList] = useState([]);
	const [product, setProduct] = useState([]);
	const [quantity, setQuantity] = useState([]);

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
	useEffect(()=>{
		WriteData();
	},[listId])
	const ChangeUser=(x)=>{
		setUserId(x);
	}
	const GetUserList=()=>{
		setUserGroceryList([]);
		groceryList.forEach(gl=>gl.userId===parseInt(userId)?setUserGroceryList(list=>[...list,gl]):null)	 	 
	}
	const ChangeList=(x)=>{
		setListId(x);
	}
	const GetItemList=()=>{
		setUserItemList([])
		userGroceryList.forEach(ul=>ul.listId===parseInt(listId)?
			(ul.items.forEach(product=>setUserItemList(list=>[...list,product]))):null);

	}
	const ListSplit=()=>{
		setFindList([]);
		setFoundList([]);
		userItemList.forEach(item=>item.cart===false?setFindList(list=>[...list,item]):setFoundList(list=>[...list,item]))

	}
	const Updater=(pr,qu,index)=>{
		const itemIndex = userItemList.findIndex(u=>{
			return u.listItemId === parseInt(index)})
		const item = {...userItemList[itemIndex]}
		const items = [...userItemList]
		item.product = pr;
		item.quantity = qu;
		items[itemIndex] = item;
		setUserItemList(items);
	}
	const WriteData= ()=>{
		console.log('write data');
		userGroceryList.forEach(ul=>ul.listId===parseInt(listId)?
			(console.log(ul.items),
			ul.items=userItemList):null);
		const groceryIndex = groceryList.findIndex(g=>{
			return g.listId === parseInt(listId);
		})
		console.log(groceryIndex);

		let db = firebase.database().ref('grocery/'+groceryIndex);
			db.on('value',snapshot=>{
				console.log(snapshot.val())
			})
	}

	return( 
		<DataContext.Provider value={{groceryList,userList,userGroceryList,userItemList,listId,userId,findList,foundList,product,quantity,
			setGroceryList,setUserList,setListId,setUserId,setProduct,setQuantity,
			ChangeUser,GetUserList,ChangeList,GetItemList,ListSplit,Updater,WriteData}}>
			{props.children}
		</DataContext.Provider>
	)
}