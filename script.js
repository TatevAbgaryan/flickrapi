(function($) {
	var form = document.getElementsByTagName('form')[0],
		searchField = form.search,
	    input = document.getElementsByTagName('input')[0];

// o.O input != $("#searchInput") ????
	
	$("#searchInput").keyup(function(){
		setTimeout( function(){searchFlickr(searchField.value)}, 10000);
		//alert( input.value );

	});
	form.onsubmit = function(e) {
		searchFlickr(searchField.value);
		return false;
	};

	function searchFlickr(searchTerm) {
		$.ajax({
			url: "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
			type: 'get',
			dataType: 'json',
			data: {
				tags: searchTerm,
				tagmode: "any",
				format: "json"
			},
			success: function(data) {
				
				var temp=data;
				document.getElementsByTagName('ul')[0].innerHTML= "<li><img src=\""+temp.items[0].media.m+"\" alt /></li><li>"+temp.items[0].author+"</li><li>"+temp.items[0].title+"</li>";

			},
			error: function(data) {
				alert(JSON.stringify(data));
			}
		});
	}




})(jQuery);