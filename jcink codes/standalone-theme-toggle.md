# minimal mode toggle

one-click toggle between the standard skin display and a "minimal" mode. saves & loads setting from last visit in local storage. probably won't work out of the box; requires configuration.

# code
## toggle

this goes wherever you want to put the toggle button, ideally somewhere at the bottom of the board wrapper.

```html
<div id="minimal-toggle">■</div>
```

## script

goes in a script tag at the bottom of the board wrapper, after `</body>` but before `</html>`.

```html
<script>
//===================================
// STANDALONE MINIMAL THEME TOGGLE
//===================================
$( "#minimal-toggle" ).on( "click", function() { 
	$("body").toggleClass("minimal"); 
	if ( $("body").hasClass("minimal") ) {
		localStorage.setItem("minimalThemeSetting", "enabled");
	} else {
		localStorage.setItem("minimalThemeSetting", "disabled");
	}
});

$(function() {
	if (localStorage.getItem("minimalThemeSetting") == "enabled") {
		$("body").addClass("minimal");
	}
});
</script>
```

## css styles

goes in your stylesheet. will need configuration according to the site skin to actually work, i.e. there has to be a "minimal" theme that you want to toggle on and off.

```css
/* ===================================
* STANDALONE MINIMAL THEME TOGGLE 
=================================== */

/* TOGGLE BUTTON */
body {
  & #minimal-toggle {
    font-size:24px;
    line-height:1;
    position:fixed;
    bottom:16px;
    right:16px;
    opacity:0.25;
    transition:0.5s ease;
    cursor:pointer;
    &:hover { opacity:1; }
  }
  &:is(.minimal) {
    & #minimal-toggle {
      color: blue;
    }
  }
}


/* CSS FOR MINIMAL THEME */
body.minimal {
  & .post-normal .miniprofile { display:none; }
}
```

