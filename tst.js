import React from 'react'
import People from './components/test/people'
import Header from './components/test/grocery/top/header'
import List from './components/test/grocery/list'
import {GroceryDataProvider} from './context/test/DataContext'

function App() {
	return(
		<div>
		<h1>React Testing App</h1>
		<GroceryDataProvider>
		<Header/>
		<List/>
		</GroceryDataProvider>
		</div>)
}
export default App;