document.getElementById('myForm').addEventListener("submit", saveBookmark);

function saveBookmark(e){
	//Get form values
	var siteName= document.getElementById('siteName').value;
	var siteUrl= document.getElementById('siteUrl').value;

	//we want to get an object ready to save to local storage
	var bookmark = {
		name: siteName,
		url: siteUrl
	}
	console.log(JSON.stringify(bookmark));

	if(localStorage.getItem('bookmarks') === null){
		//initialize or init array
		var bookmarks=[];
		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
		// Local Storage is a funny feature it works when the page is refreshed .
		// You have to reload to get the Local Storage Value Again!
		//console.log(localStorage.getItem('HELLO'+bookmarks));	
		//console.log(localStorage.getItem('bookmarks'));	

	}

 	//prevent form from submitting	 
	 	fetchBookmarks(); // Updates the SPA.

	e.preventDefault();
}

function deleteBookmark(url){

	var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
	for(var i=0; i <bookmarks.length; i++){
		if (bookmarks[i].url == url){
			bookmarks.splice(i,1);
		}
	}
	localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	fetchBookmarks(); // Updates the SPA.
}


function fetchBookmarks(){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	// fetches string of bookmarks from local storage
	console.log(bookmarks); //shows current object of bookmarks if it exists
	//Now we want to display each bookmarks to front end. 
	
	//get output id
	var bookmarksResults = document.getElementById('bookmarksResults');

	//Build Output
	bookmarksResults.innerHTML = '';
	for(var i=0; i<bookmarks.length;i++){

		var name=bookmarks[i].name;
		var url=bookmarks[i].url;

		bookmarksResults.innerHTML += '<div class="well">'+
									  '<h3>'+name+ 					//target="_blank" means it will lead to a blank pointer and open new tab in Chrome!
									  ' <a class="btn btn-default" target="_blank" href="'+"http://"+url+'">Visit</a> '+ //visit has target attribute but we don't know where it's visiting!
									  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> '+
									  '</h3>'+
									  '</div>';	
	}

}
