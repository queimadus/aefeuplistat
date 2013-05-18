  
var animate=false;
$('nav a').on('click', function(event) 
{
	event.preventDefault();	
	if(history.pushState) {
	    history.pushState(null, this.dataset.content, this.getAttribute("href"));
	}
	else {
	    window.location.hash = this.getAttribute("href");;
	}
	if(!(/^main-/).test(this.parentNode.id))
		if(this.innerText=="Lista T")
	  		document.title = "Lista T";
	  	else
			document.title = this.innerText+" - Lista T";
    tabs.call($(this));
});


$('link[type*=icon]').detach().appendTo('head');
$(".navigation").sticky({topSpacing:31});

function tabs()
{     
    var parent = $(this).parent();
    if(!animate&&!parent.hasClass("active"))
    {
    	animate=true;
    	$('.navigation .active, .navigation .parentactive')
    		.removeClass("active parentactive");
    	parent.addClass("active");

    	var mainparent = parent.filter('[class^="sub-"]');
    	if(mainparent.length){
			var type = mainparent.attr("class").split("-")[1].split(" ")[0];
            $('.navigation li[id$='+type+']').addClass("parentactive");
		}
    	var parentid=parent.attr("id");
    	if($('.navigation .active[id^="main-"]').length){
    		animate=false;
    	} else {
		    var id = $(this).attr("data-content"),
		    $toSlide= $(".content#"+id),
		    $fromSlide= $('.content.active');
		        
		    if (!($toSlide.hasClass("active")))
		    {   
		        $fromSlide.animate({"left":"-100%"},300,'linear')
		        $toSlide.animate({"left":"0%"},300,'linear',function()
		        {    
		          $fromSlide.css("left","100%");

		          $fromSlide.removeClass("active");  
		          $toSlide.addClass("active");
		          animate=false;     
		        });

		    }
		}
	}
}
/*
 function bootstraptabsfix(){
	  if(location.hash) {
		$('a[href=' + location.hash + ']').tab('show');
	  }
	
	  $(document.body).on("click", "a[data-toggle]", function(event) {
		location.hash = this.getAttribute("href");
	  });
}
*/
$(window).on('popstate', function() {
	  var anchor = location.hash || "#";
	  if(anchor != null){
	  	var t = $('a[href=' + anchor + ']');
	  	if(t.text()=="Lista T")
	  		document.title = "Lista T";
	  	else
	  		document.title = t.text()+" - Lista T";
	  	tabs.call(t);
	  }
	  //$('a[href=' + anchor + ']').tab('show');
});

    


