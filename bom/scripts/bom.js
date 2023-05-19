// Create three variables that hold references to the input, button, and list elements using const.
const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const listEl = document.querySelector('ul');

// Create an click event listener for the Add Chapter button using addEventListener and an anonymous function. 

// In the function block for adding a chapter,
// make sure the input is not blank before doing the following remaining tasks in this list
// create an li element
// create a delete button
// populate the li elements textContent or innerHTML with the input
// populate the button textContent with an ❌
// append the li element with the delete button
// append the list element with the li element just created and appended with text and the delete button
// add an event listener to the delete button that removes the li element when clicked
// send the focus to the input element
// change the input value to nothing or the empty string to clean up the interface for the user.
	
buttonEl.addEventListener('click', () => {
	const inputItem = inputEl.value;
	if (inputItem != '') {
		const listItem = document.createElement('li');
        const listText = document.createElement('span');
        const listBtn = document.createElement('button');
		
		listItem.appendChild(listText);
		listText.textContent = inputItem;
		listItem.appendChild(listBtn);
		listBtn.textContent = '❌';
		listEl.appendChild(listItem);
		
		listBtn.addEventListener('click', () => {
			list.removeChild(listItem);
		});
    inputEl.value = '';
    inputEl.focus();
	};
});