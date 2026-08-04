$(document).ready(function () {

  function mreplace(replacements, str) {
    let result = str
    for (let [x, y] of replacements) result = result.replace(x, y)
    return result
  }
    
  $("button.replaceTool").click(function () {
    
    let input = $(".input").val()
    let output = mreplace([
        [/\*{2}(.*?)\*{2}/gm, '[b]$1[/b]'],
        [/\*{1}(.*?)\*{1}/gm, '[i]$1[/i]'],
        [/\/\/\//gm, '[vr]'],
        [/---/gm, '[hr]'],
        [/\/{2} (.*)$/gm, '[div align="right"]$1[/div]'],
        [/\[\/div\]\n/gm, '[/div]'],
      ], input, );
    
    let template1b = '[blockquote]';
    let template2b = '[/blockquote]';
    
      $('.res2').text(output);
      $('.res2').prepend(document.createTextNode(template1b));
      $('.res2').append(document.createTextNode(template2b));

  });

  new ClipboardJS(".btn")

})
