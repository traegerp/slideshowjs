function SlideShow(){
	//bootstrap the process
	var attribute 	= '[data-slide]';
	var elements  	= document.querySelectorAll(attribute);
	this.length		= elements.length -1;
	this.slides 	= [];
	this.htmlCache 	= '';
	this.cssCache 	= '';
	for(var i = 0; i < elements.length; i++){
		var index = elements[i].getAttribute('data-slide');
		console.log(index)
		this.slides.push({
			index 	: +(index),
			element : elements[i]
		});
	}

	this.slides.sort(function(prev, next){
		return prev.index - next.index;
	});

	var css = {};

	css.closeSymbol = '.data-slideshow-close-symbol{font-size: 3.5em; cursor: pointer;} ';
	css.slide 		= '.data-slideshow-display-slide{ width: 100% !important; height: 90% !important;} ';
	css.right 		= '.data-slideshow-right{right: 15px;} ';	
	css.left 		= '.data-slideshow-left{left: 15px;} ';
	css.floatRight 	= '.data-slideshow-float-right{float: right;} ';	
	css.floatLeft 	= '.data-slideshow-float-left{float: left;} ';
	css.chevron 	= '.data-slideshow-chevron{font-size: 4.5em; cursor: pointer; position: absolute; margin-top: 25%;} ';
	css.chevHover 	= '.data-slideshow-chevron:hover{font-weight: bold; font-size: 5em;} ';
	css.clear 		= '.data-slideshow-clear{float:none; clear:both; width:100%;} ';
	css.view 		= '.data-slide-view{font-size: 1em;} '
	//bootstrap css
	this.css 		= css.closeSymbol + css.slide + css.floatRight + css.floatLeft + css.chevron + css.chevHover +  css.clear + css.right + css.left + css.view;
    var header 		= document.head || document.getElementsByTagName('head')[0];
    var style 		= document.createElement('style');

    style.type 		= 'text/css';

    if(style.styleSheet){
    	style.styleSheet.cssText = this.css;
    }
    else{
    	style.appendChild(document.createTextNode(this.css));
    }

	header.appendChild(style);

	this.index 		= 0;
	this.slide  	= this.slides[this.index];
	this.htmlCache 	= document.body.innerHTML;
	return this;
}

SlideShow.prototype.getControls = function(){
	var controls = {};
	controls.slide 	= '<span class = "data-slideshow-left data-slide-view">viewing slide ' + (this.index + 1) + '</span> ';
	controls.close 	= '<span id = "x84z12slideshowcontrolsclose0c" class = "data-slideshow-close-symbol data-slideshow-float-right">&times;</span>';
	controls.break 	= '<br/><br/>';
	controls.next 	= '<span id = "x84z12slideshowcontrolsnext0n" class = "data-slideshow-chevron data-slideshow-right">&rang;</span>';
	controls.prev 	= '<span id = "x84z12slideshowcontrolsprev0p" class = "data-slideshow-chevron data-slideshow-left">&lang;</span>';
	controls.clear  = '<div class = "data-slideshow-clear"></div>';
	return controls.slide + controls.close + controls.break + controls.prev + controls.next + controls.clear + controls.break;
};

SlideShow.prototype.buildSlide = function(){	
	var element 			= this.slide.element;
	this.cssCache 			= element.className;
	element.className 		= element.className + ' ' + this.css;
	var controls 			= this.getControls();
	var parent 				= document.createElement('div');
	parent.style 			= 'position: relative; width: 95%; margin: 0 auto; padding: 10px;';
	var container 			= document.createElement('div');
	container.style 		= 'width: 85%; margin: 0 auto; height: 100%;';
	container.innerHTML 	= element.innerHTML;
	parent.innerHTML 		= controls;
	parent.appendChild(container);
	document.body.innerHTML = '';
	document.body.appendChild(parent);
};

SlideShow.prototype.open = function(){

	this.buildSlide();
	//attach events to ids
	var close 	= 'x84z12slideshowcontrolsclose0c';
	var prev 	= 'x84z12slideshowcontrolsprev0p';
	var next 	= 'x84z12slideshowcontrolsnext0n';
	var self 	= this;

	document.getElementById(close).addEventListener('click', function(){
		self.close();
	});

	document.getElementById(next).addEventListener('click', function(){
		self.next();
	});

	document.getElementById(prev).addEventListener('click', function(){
		self.prev();
	});

	//attach key events

	document.onkeydown = function(e) {
	    switch (e.keyCode) {
	        case 37:
	        	//left
	        	self.prev();
	            break;
	        case 39:
	        	//right
	        	self.next();
	            break;
	        case 27:
	        	//escape
	        	self.close();
	        	break;
	    }
	};


};

SlideShow.prototype.close = function(){
	document.body.innerHTML = this.htmlCache;
};

SlideShow.prototype.prev = function(){
	if(this.index > 0){
		this.index--;
	}
	else{
		this.index = this.length;
	}
	this.slide = this.slides[this.index];
	this.open();
};

SlideShow.prototype.next = function(){
	if(this.index < this.length){
		this.index++;
	}
	else{
		this.index = 0;
	}
	this.slide = this.slides[this.index];
	this.open();
};



