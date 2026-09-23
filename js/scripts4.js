$(document).ready(function () {
    getTheme();

    timeSetup();

    setInterval(function() {
        var d = new Date();
        updateClock(d);
        setTime(d);
    }, 1000);

});

function timeSetup() {
    var d = new Date();
    updateClock(d);
    setTime(d);
}


function setTime(d) {
	var h = d.getHours();
	var m = d.getMinutes();
	var s = d.getSeconds();
	
	var hour 	 = 360 * (h / 12);
	var minute = 360 * (m / 60);
	var second = 360 * (s / 60);
	
	document.getElementById("hour").style.transform = 'rotate(' + hour + 'deg)';
	document.getElementById("minute").style.transform = 'rotate(' + minute + 'deg)';
	document.getElementById("second").style.transform = 'rotate(' + second + 'deg)';
}


var singleNumber = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

var tenPlus = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

var tens = ['twenty', 'thirty', 'forty', 'fifty'];

function num2word(str, isMin) {
    str = str.toString().replace(/[\, ]/g, '');

    if (str != parseFloat(str)) {
        return 'not a number';
    }

    var strLength = str.indexOf('.');
    if (strLength == -1) {
        strLength = str.length;
    }

    var n = str.split('');
    var result = '';
    var skip = 0;
    for (var i = 0; i < strLength; i++) {

        if (strLength == 1 && isMin && n[i] != 0) {
            result += "o'" + singleNumber[n[i]];
        }
        else if ((strLength - i) % 3 == 2) {
            if (n[i] == '1') {
                result += tenPlus[Number(n[i + 1])] + ' ';
                i++;
                skip = 1;
            } else if (n[i] != 0) {
                result += tens[n[i] - 2] + ' ';
                skip = 1;
            }
        } else if (n[i] != 0) {
            result += singleNumber[n[i]] + ' ';
        }
    }

    return result.replace(/\s+/g, ' ');
}

var hour = $('.time .hour'),
    min = $('.time .min'),
    sec = $('.time .sec'),
    ampm = $('.time .ampm');

function updateClock(d) {
  var hours = ((d.getHours() + 11) % 12 + 1),
      minutes = d.getMinutes(),
      period = (d.getHours() < 12) ? "am" : "pm";
      //console.log(minutes);
    
  hour[0].innerHTML = num2word(hours, false);
  min[0].innerHTML = num2word(minutes, true);
  ampm[0].innerHTML = period;
}


$("span#mode_toggle").on("click", function() {
    var t;
    $("body#birdzone").toggleClass("night");
    if ( $("body#birdzone").hasClass("night") ) {
        t = 'dark';
    } else {
        t = 'light';
    }
    localStorage.setItem('theme', t);
});


function getTheme() {
    const theme = localStorage.getItem('theme');
    if ( theme == "dark" ) {
        $("body#birdzone").addClass("night");
    }
}