var arr 		 = document.querySelectorAll('.js-buttons button'),

	contentTitle = document.querySelector('.js-content-h2'),
	contentList  = document.querySelector('.js-content-ul'),
	
	innerContentTitle = document.querySelector('.js-inner-content-h2'),
	innerContentData  = document.querySelector('.js-inner-content');
	console.log(contentTitle.innerHTML, 'asdfasdf');



// events for buttons
for (var i = 0; i < arr.length; i++) {
	arr[i].onclick = function() {
		var id = this.getAttribute('data-id');
		console.log(id);
		contentTitle.innerHTML = id + ':';
		loadData('https://swapi.co/api/' + id + '/', renderList); // ajax
	};
}


function loadData(url, callbackFunc) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url);
	xhr.onload = function() {
		var out = JSON.parse(xhr.responseText);
		console.log("out:", out);
		callbackFunc(out);
	};
	xhr.send();
}


function renderList(data) {
	console.log("data1", data);
	data = data.results;
	console.log("data:", data);
	// console.log(data.results[0]);
	var htmlListFromA = '',
		// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/in
		prop = 'name' in data[0] ? 'name' : 'title'
		// arr = [];

	data.sort(function(a, b) {
		console.log()
		if(a[prop][0] < b[prop][0]) {
			return -1;
		} else if(a[prop][0] > b[prop][0]) {
			return 1;
		} else {
			return 0;
		}
	});


	for (i = 0; i < data.length; i++) {
		htmlListFromA += '<li><a href="' + data[i].url + '" class="js-load-data">' + data[i][prop] + '</a></li>';
	}

	contentList.innerHTML = htmlListFromA;

	updateEventsForLinks( document.querySelectorAll('.js-load-data') );

	// console.log(contentTitle);
	// console.log(contentList);
}


function updateEventsForLinks(arr) {
	for (var i = 0; i < arr.length; i++) {
		arr[i].onclick = function(e) {
			console.log('a clicked', e);
			console.log("this:", this);
			e.preventDefault();
			var url = this.getAttribute('href');
			loadData(url, renderDataFromLink); // ajax
		};
	}
}
function renderDataFromLink(data) {
	var strOfData = '';
	innerContentTitle.innerHTML = 'title' in data ? data.title : data.name;

	for(var key in data) {
		if(Array.isArray(data[key])) {
			strOfData += '<hr />';
			strOfData += key + ':<br />';
			for (var i = 0; i < data[key].length; i++) {
				var link = data[key][i];
				if(data[key][i].indexOf('http') !== -1) {
					link = '<a href="' + data[key][i] + '" target="_blank">' + data[key][i] + '</a>';
				}
				strOfData += link + '<br />';
			}
			strOfData += '<hr />';
		} else if(key !== 'title') strOfData += key + ' -> ' + data[key] + '<br />';
	}
	innerContentData.innerHTML = strOfData;
}


function searchFunction() {
	var input, filter, ul, li, a, i;
	input = document.getElementById('searchInput');
	filter = input.value.toUpperCase();
	ul = document.getElementsByClassName('ul-content');
	li = document.getElementsByTagName('li');

	for(i = 0; i < li.length; i++) {
		a = li[i].getElementsByTagName('a')[0];
		if(a.innerHTML.toUpperCase().indexOf(filter) > -1) {
			li[i].style.display = "";
		}

		else {
			li[i].style.display = "none";
		}
	}
}
