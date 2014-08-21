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
				
				var temp=data;
				console.log(data);
				for(var i = 0; i<5; ++i){
					var towrite = document.getElementsByTagName('ul')[0].innerHTML += "<li><img src=\""+temp.items[i].media.m+"\" alt /></li>";
					towrite = '<!DOCTYPE html><html><body><ul>' + towrite + '</ul></body></html>';
				};
				for(var i = 0; i<5; ++i){
					tosend += temp.items[i].media.m + "\n";
				};

				$.ajax({
					url: '/save',
					data: JSON.stringify(temp),
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