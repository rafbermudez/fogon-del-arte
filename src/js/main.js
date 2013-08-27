var jq = jQuery.noConflict();
var myInterval;
var estaInterval = false;

/*********************************************** SECCIÓN DE FUNCIONES ********************************************************/
function resizeWindow() {
	if (parseInt(jq(window).width()) < 800) {
		jq('#main-section header img').attr('src', '../images/logo_inline.png');

		clearInterval(myInterval);
		estaInterval = false;
		jq('body').css('background-image', 'none');
	
	} else {
		jq('#main-section header img').attr('src', '../images/logo.png');
		if (!estaInterval) {
			jq('body').css('background-image', changeBackgroundImageUrl());
			myInterval = setInterval(function() { jq('body').css('background-image', changeBackgroundImageUrl())}, 6000);
			estaInterval = true;
		}
	}
}

function selectSection(id, changeImage) {
	jq('#' + id + '-li').css('font-weight', '900');
	jq('#' + id).addClass('selected');
	jq('#' + id).removeClass('hide');
	jq('#' + id).css('display', 'block');
}

function unselectAllSections() {
	jq('nav.public ul li').css('font-weight', 'normal');
	jq('.content-section').removeClass('selected');
	jq('.content-section').addClass('hide');
	jq('.content-section').css('display', 'none');
}

function changeBackgroundImageUrl(){

var myImages=new Array();
myImages[0]="inside_restaurant.jpg";      
myImages[1]="salmon.jpg";
myImages[2]="outdoor_restaurant.jpg";
myImages[3]="fruit.jpg";

var s = "";
if (myImages.length>0) s = "url(../images/" + myImages[0]+")";

for (var i=0;i<myImages.length;i++)
{
	if (jq('body').css('background-image').indexOf(myImages[i]) >= 0) {
		if (i < myImages.length-1) s = "url(../images/" + myImages[i+1]+")";
		else s = "url(../images/" + myImages[0]+")";
		break;
	}
}
  return s;
}

function changeToggleImage(){
	if (jq('#switch').css('background-image').indexOf('circle.png') >=0) {
		jq('#switch').css('background-image',"url(../images/x.png)");
	}else {
			jq('#switch').css('background-image',"url(../images/circle.png)");
		}

}

/******************************************** DOCUMENT READY *********************************************/

jq(document).ready(function() {
	resizeWindow();

	jq('#wrap-dd-menu').prepend('<div id="menu-trigger">Menu</div>');		
	jq("#menu-trigger").on("click", function(){
		jq("#dd-menu").slideToggle();
	});

	jq('#myprofile-li').css('font-weight', '900');
    
    jq("#switch").on('click',function() {
   		jq('section.selected').animate({width: 'toggle'},1000, function() {changeToggleImage();});
    });

    jq('nav.public ul li').on('click', function() {
    	jq('#login article.register').hide();
		jq('#login article.login').show();

		if (jq("#menu-trigger").css('display') != 'none') {
    			jq("#dd-menu").slideToggle();
    		}

    	// Ninguno está abierto
    	var n = 0;
    	len = jq('.content-section').size();
    	jq.each(jq('.content-section'),  function() {
    		if (jq(this).css('display') == 'none') {
    			n = n + 1;
    		}
    	})
		if (n == len) {
			changeToggleImage();
		}

    	unselectAllSections();
    	
    	id = jq(this).attr('id').replace('-li', '');
    	selectSection(id);
    });

    jq(window).resize(function() {
    	resizeWindow();
    });

    jq('.register-lnk').on('click', function() {
    	jq('#login article.login').hide();
		jq('#login article.register').show();    	
    });
 });