$(document).ready(function () {

  function mreplace(replacements, str) {
    let result = str
    for (let [x, y] of replacements) result = result.replace(x, y)
    return result
  }
    
  $("button.replaceTool").click(function () {
    
    let input = $(".input").val()
    let output = mreplace([
        [/\*{2}(.*?)\*{2}/gm, "[b]$1[/b]"],
        [/\*{1}(.*?)\*{1}/gm, "[i]$1[/i]"],
        [/^(.*: )\*(.*)(?!\*)$/gm, "$1[i]$2[/i]"],
        [/^M:/gm, "MILO:"],
        [/^S:/gm, "SABLE:"],
        [/^B:/gm, "BIANCA:"],
        [/i'm/gm, "I'm"],
        [/[i](?!\S)/gm, "I"],
        [/[i]((?=,)|(?!\S))/gm, "I"],
        [/milo/gm, "Milo"],
        [/schedar/gm, "Schedar"],
      ], input, );
    
    if ($('input#narration-tag').is(':checked')) {
        output = output.replace(/\n(?!MILO|SABLE|BIANCA|INVESTIGATOR)(\w)/gm, "\nMILO_N: $1")
    }
    
    var regexArray = [/(?<=\. )(\w)/gm, /^(\w)/gm, /(?<=MILO_N: )(\w)/gm, /(?<=: \[i\])(\w)/gm, /(?<=: ")(\w)/gm, /(?<=\?\s)(\w)/gm]
    $.each(regexArray, function( i, regex ) {
      output = output.replace(regex, function(x){return x.toUpperCase();});
    });

    // trim extra whitespace before closing italic tags
    output = output.replace(/\s(?=\[\/i\]$)/gm, "")

    $(".res2").text(output);

  });

  new ClipboardJS(".btn")

})
