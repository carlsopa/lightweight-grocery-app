import React from 'react';

export default function ControlBar() {
	return (
		<div>
			<select id="titleList">
	            <option>Select a grocery list</option>
	        </select><br />
	        <input id="newItemName" type="text" />
	        <select id="newItemCategory"></select>
	        <input id="newItemQuantity" class="num" type="number" value="1" min="1"/>
	        <select id="newItemUnit"></select>
	        <button id="foodButton" type="button">Add food</button>
        </div>
	);

}
// export default ControlBar;