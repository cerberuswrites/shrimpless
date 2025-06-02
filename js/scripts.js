$(document).ready(function () {
  function mreplace(replacements, str) {
    let result = str
    for (let [x, y] of replacements) result = result.replace(x, y)
    return result
  }
    
  $("button.replaceTool").click(function () {
    
    document.addEventListener("click", shiftClick);
    
    let input = $(".input").val()
    let output = mreplace([
        [/[*~]{4}(.*?)[*~]{4}/gm, '<b style="--accent:var(--grade-b);">$1</b>'],
        [/\*{2}(.*?)\*{2}/gm, "<b>$1</b>"],
        [/\*{1}(.*?)\*{1}/gm, "<i>$1</i>"],
        [/```(.*)\n/gm, ""],
        [/<\/s-info>`\n*/gm, "</s-info>"],
        [/`/gm, ""],
        [/~{2}(.*?)~{2}/gm, '<span style="color:var(--grade-b);">$1</span>'],
        [/<span style="color:var\(--grade-b\);"><i>(.*)<\/i><\/span>/gm, '<i style="--accent:var(--grade-b);">$1</i>'],
        [/<i><span style="color:var\(--grade-b\);">(.*)<\/span><\/i>/gm, '<i style="--accent:var(--grade-b);">$1</i>'],
      ], input, );
    
    // markdown lists
    output = mreplace([
        [/^- /gm, "[*]"],
        [/\[\*\]/m, "[list]\n[*]"],
        [/\[\*\](?!(?s:.*)\[\*\])(.*)$/gm, "[*]$1\n[/list]"],
      ], output, );
    
    // markdown headers
    output = mreplace([
        [/#{4}\s(.*)$/gm, "<h4>$1</h4>"],
        [/#{3}\s(.*)$/gm, "<h3>$1</h3>"],
        [/#{2}\s(.*)$/gm, "<h2>$1</h2>"],
        [/#{1}\s(.*)$/gm, "<h1>$1</h1>"],
      ], output, );

    
      if ($('#br-tags').is(":checked")) {
      // <br> tags enabled
      output = mreplace([
          [/\n/gm, "\n<br>\n"],
      [/(?:\n<br>\n){2}/gm, "\n\n<br><br>\n\n"],
        ], output, )
    }

    if ($('#hr-tags').is(":checked")) {
      // <hr> tags enabled
      output = mreplace([
          [/-{3}/gm, "<hr>"],
      [/<br><br>\n\n<hr>\n\n<br><br>/gm, "<hr>"],
        ], output, )
    }

    if ($('#vr-tags').is(":checked")) {
      // vertical dividers enabled
      output = mreplace([
          [/\/{3}/gm, '<vr><\/vr>'],
      [/<br><br>\n\n<vr><\/vr>\n\n<br><br>/gm, '<vr><\/vr>'],
        [/<\/vr>\n/gm, '</vr>'],
        ], output, )
    }

    if ($('#right-tags').is(":checked")) {
      // text-align:right enabled
      output = mreplace([
          [/^\/{2} (.*)$/gm, '<div style="text-align:right;">$1</div>'],
        [/<\/div>\n{2}<br><br>/gm, '<\/div>\n\n<br>'],
        [/<\/div>\n/gm, '<\/div>'],
        ], output, )
    }
    if ($('#post-template').is(":checked")) {
      // wrap in post template (elysium)

      var template1b = '[dohtml]<div class="shrimp-fried-rice"><div class="details">location, 300 E.E.</div>\n\n';
      var template2b = '\n\n<div class="tagged">@TAG</div> \n <div class="egg"></div><div class="rice"></div> \n </div><link rel="stylesheet" href="https://dl.dropbox.com/scl/fi/tjr5i0jznj7zasxtv11j0/elysium-post-template.css?rlkey=5s8dbbsffmbwkp2qck5lp96b3&st=59115gu9">[/dohtml]';
      output = template1b + output + template2b;
    }
    if ($('#post-template2').is(":checked")) {
      // wrap in post template (sunstrike)

      var template1b = '[dohtml][post2]';
      var template2b = '[/post2][/dohtml]';
      output = template1b + output + template2b;
    }
    
    function shiftClick(e) {
        if ( e.shiftKey ) {
          $( "#br-tags" ).prop( "checked", true );
          $( "#hr-tags" ).prop( "checked", true );
          $( "#vr-tags" ).prop( "checked", true );
          $( "#right-tags" ).prop( "checked", true );
          $( "#post-template2" ).prop( "checked", true );
          $( ".replaceTool" ).trigger( "click" );
        }
      }
    
    $(".res2").text(output);

  })

  new ClipboardJS(".btn");
    

})
