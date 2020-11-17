/*
*   2.3.6
*/
function lfjint(script) {
    $.ajax({
        url: script,
        dataType: "script",
        async: false, 
        success: function () {
          console.log('lfj script loaded~');
        },
        error: function () {
            throw new Error("Could not load script " + script);
        }
    });
}
