//cache elements

var $menu = $('#menu');
var $backBtn = $('#menu .backBtn').hide();
var $home = $('#menu .category');
var depth;
var currentDepth = 1;

//clicks
$('li', '#menu').on('click', slideMenu);

function slideMenu(e) {

  var menuType = $(this).parent().attr('class');
  var target = e.target.tagName;
  var categoryName;
  
  //check if element clicked on is a LI and check if element has a data depth attribute
  if (target === 'LI' && !isNaN($(e.target).attr('data-depth'))) {
    depth = parseInt($(e.target).attr('data-depth'));
    console.log('depth = ' + depth);

    //keep track of currentDepth
    currentDepth++;
    console.log('currentDepth = ' + currentDepth);

    //find the current
    if (currentDepth === 2) {
      $(e.currentTarget).find('.tier2').show();
    }

    if (currentDepth === 3) {
      $(e.currentTarget).find('.tier3').show();
    }

    //remove click event listener
    $('li', '#menu').off('click');

    //only move the menu to the set depth
    if (currentDepth <= depth) {
      $backBtn.show();

      //populate menu header with category
      categoryName = $(e.target).children('a').attr('data-cat');
      $('.category', $menu).html('Category');
      //$('.menu-catgories', $menu).hide();
      $('.' + categoryName, $menu).show();

      //move secondary menu to the left;
      $('.menu-container', $menu)
        .velocity({
          translateX: '+=-300'
        }, {
          duration: 250,
          ease: 'ease-in',
          complete: function() {
            $('li', '#menu').on('click', slideMenu);
          }
        })
        .addClass('2nd').removeClass('1st').removeClass('3rd');
    }

  }
}
$home.on('click', function() {
  $('.tier2').hide();
  $('.tier3').hide();
  currentDepth = 0;
  $('.menu-container', $menu)
    .velocity({
      translateX: '0'
    }, {
      duration: 350,
      ease: 'ease-in-out'
    });
  $backBtn.hide();
  $(this).html('menu');
});

$backBtn.on('click', function() {
  currentDepth--;

  $('.menu-container', $menu).velocity({
    translateX: '+=300px'
  }, {
    duration: 200,
    complete: function() {
      //if depth === 1 hide all levels (reset)
      if (currentDepth === 1) {
        $('.tier2').hide();
        $('.tier3').hide();
        $backBtn.hide();
      }
    }
  });
  $('.category', $menu).html('Menu');
  //$backBtn.hide();
});
