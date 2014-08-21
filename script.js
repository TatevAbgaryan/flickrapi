(function($) {
	var form = document.getElementsByTagName('form')[0],
		searchField = form.search,
	    input = document.getElementsByTagName('input')[0],
	    timer,
	    tosend = "";

// o.O input != $("#searchInput") ????
	
	$("#searchInput").keyup(function(){
		clearTimeout(timer);
		timer = setTimeout( function(){searchFlickr(searchField.value)}, 3000);
		//alert( input.value );

	});
	form.onsubmit = function(e) {
		clearTimeout(timer);
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
				$.ajax({
					url: '/save',
					data: data,
					type: 'POST',
					dataType:'json',
					contentType: "application/json",
					jsonpCallback: 'callback', // this is not relevant to the POST anymore
					success: function (data) {
						console.log('Success: ')
					},
					error: function (xhr, status, error) {
						console.log('Error: ' + error);
					},
				});
			},
			error: function(data) {
				alert(JSON.stringify(data));
			}
		});

	}
})(jQuery);