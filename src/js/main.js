//cache elements

var $menu =  $('#menu');
var $backBtn = $('#menu .backBtn');



//clicks 
$('li', '#menu').on('click', function(e){

	var menuType = $(this).parent().attr('class');
	var target = e.target.tagName;
	
	if (menuType === 'primary' && target === 'A') {
		$backBtn.show();
		//populate menu header with category
		var categoryName = $(e.target).attr('data-cat');
		$('.category', $menu).html(categoryName);
		$('.menu-catgories', $menu).hide();
		$('.'+categoryName, $menu).show();


		//move secondary menu to the left;
		$('.menu-container', $menu).velocity({translateX : '-300px'}, {duration: 350, ease: 'ease-in-out'});

		
		
	}

	if (menuType === 'secondLevel') {
		//move secondary menu to the left;
		$('.menu-container', $menu).velocity({translateX : '-600px'}, {duration: 350, ease: 'ease-in-out'});
	}

	return false;
});

$backBtn.on('click', function(){
	$('.menu-container', $menu).velocity({translateX : '0px'}, {duration: 200});
	$('.category', $menu).html('Menu');
	$backBtn.hide();
});