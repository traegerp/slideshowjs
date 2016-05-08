
#SlideShowJS

###Description
Turn your HTML into a slide show presentation much like PowerPoint with SlideShowJS. No CSS or external
libraries required. Just plug and play. 

###Getting Started

Add script to html page:

'''
	<script type="text/javascript" src = "slideshow.js"></script>
'''

###Usage

Add html5 attribute to containing element that you want to turn into a slide:

```
<div data-slide = "1">
	<h1> My First Slide </h1>
</div>
```

Add the JavaScript that will automatically bootstrap and detect your elements:

```javascript
var slides = new SlideShow();
```

Create a button or html element to open the slide show:

'''
	<button onclick = "slides.open()">View Presentation</button>
'''

You are done! That's it. 