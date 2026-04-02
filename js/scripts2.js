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
      ], input, );
    

    // add "MILO_N:" narration tag
    if ($('input#narration-tag').is(':checked')) {
        output = output.replace(/\n(?!MILO|SABLE|BIANCA|INVESTIGATOR)(\w)/gm, "\nMILO_N: $1")
    }

    var replayInput

    // logic check for if parsing a maddox replay variant
    var regex = />\[!danger] MADDOX\/REPLAY VARIANT/gmi;
    if (regex.test(input)) {
      replayInput = output.match(/>\[!danger] MADDOX\/REPLAY VARIANT(.*)/gms)
      replayInput = replayInput[0];
      output = mreplace([
        [/>\[!danger] MADDOX\/REPLAY VARIANT/gms, ""],
        [/^>(?!\s)/gm, "> "],
        [/> (.*)\s\/\/\s(.*)/gm, "- MADDOX: $1\n\t=>< MADDOX/SCENENAME_???A\n- MADDOX: $2\n\t=>< MADDOX/SCENENAME_???B"],
        [/> A: (.*)> B:(.*)/gms, "~ SCENENAME_???A\nMILO: $1\n=> END\n\n~ SCENENAME_???B\nMILO:$2\n=> END"],
        [/^>(?:\s)(?!"|\n)(?=\w|\s*$)/gm, "MILO: "],
        [/^>(?:\s)"/gm, "MADDOX: \""],
        [/^>\s\s^/gm, ""],
        [/^>\s/gm, ""],
        [/\s\s(?==> END)/gm, "\n"],
        [/^- (.*)(?=\s~ SCENENAME_\?\?\?A)/gms, "########################################\n- $1\n########################################\n"],
      ], replayInput, );
    }

    // capitalisation
    output = mreplace([
        [/i'm/gm, "I'm"],
        [/i'd/gm, "I'd"],
        [/i—/gm, "I—"],
        [/[i](?!\S)/gm, "I"],
        [/[i]((?=,)|(?!\S))/gm, "I"],
        [/milo/gm, "Milo"],
        [/schedar/gm, "Schedar"],
        [/maddox/gm, "Maddox"],
        [/ruchbah/gm, "Ruchbah"],
        [/bianca/gm, "Bianca"],
        [/ortiz/gm, "Ortiz"],
        [/sable/gm, "Sable"],
        [/daigo/gm, "Daigo"],
        [/azrael/gm, "Azrael"],
        [/…/gm, "..."],
      ], output, );
   
    var regexArray = [/(?<=\. )(\w)/gm, /^(\w)/gm, /(?<=MILO_N: )(\w)/gm, /(?<=: \[i\])(\w)/gm, /(?<=: ")(\w)/gm, /(?<=\?\s)(\w)/gm, /(?<=- ")(\w)/gm, /(?<=MILO: )(\w)/gm, /(?<=MADDOX: ")(\w)/gm, /(?<=\.)(\w)/gm,/(?<=^\[i\])(\w)/gm]
    $.each(regexArray, function( i, regex ) {
      output = output.replace(regex, function(x){return x.toUpperCase();});
    });

    // convert italics to maddox's dialogue
    if ($('input#maddox-tag').is(':checked')) {
        output = mreplace([
        [/\[i](.*)\[\/i]/gm, "MADDOX: $1"],
        [/MILO_N:/gm, "MILO:"],
      ], output, );
    }

    // trim extra whitespace before closing italic tags
    output = output.replace(/\s(?=\[\/i\]$)/gm, "")

    $(".res2").text(output);

  });

  new ClipboardJS(".btn")

})
