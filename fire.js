import React from 'react';
import firebase from 'firebase';
import firebaseConfig from 'initfirebase'
import 'firebase/firestore';
function App() {

React.useEffect(()=>{
	console.log('start here')
	const fetch = async() =>{
		//firebase.initializeApp(firebaseconfig)
		const db = firebase.database().ref('grocery/');
		db.on('value',snapshot=>{
			const state = snapshot.val();
			console.log(state)
		})
		//const data = await db.collection('grocery').get();
		//console.log(data.docs.map(data=>({...data.data()})));
		//console.log(state);
	}
	fetch();
},[])
	return(
		<div>
		<h1>Firebase Demo</h1>
		</div>)
	;

}
export default App;