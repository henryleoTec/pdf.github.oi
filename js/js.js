document.querySelector('div.dropdown').addEventListener('click', function () { $('input#up_file').click() });
$(function () { $('body').append('<form method="post" enctype="multipart/form-data"><input id="up_file" type="file" style="display:none" accept="' + g('accept') + '" data-conv="' + g('conv') + '" /></form>') });
var $f = "";
$(document).on('change', 'input#up_file', function (e) {
    var o = $(this),
        fm = o.attr('accept').replace(/\./g, '').split(','),
        ex = o.val().substring(o.val().lastIndexOf(".") + 1, o.val().length).toLowerCase();
    if ($.inArray(ex, fm) === -1) {
        alert('Invalid File. Please upload a File with extension: ' + fm.join()); o.val("");
        return
    }
    $f = o.val().split('\\').pop();
    swal({ title: 'Converting...', icon: 'info', text: 'Please wait' });
    base64(o, function (d) {
        document.getElementById('fr_1').contentWindow.postMessage(d.base64 + '[EXT].' + ex, '*')
    })
});
function base64(file, callback) {
    var coolFile = {}; function readerOnload(e) { var base64 = btoa(e.target.result); coolFile.base64 = base64; callback(coolFile) }; var reader = new FileReader(); reader.onload = readerOnload; var file = file[0].files[0]; coolFile.filetype = file.type; coolFile.size = file.size; coolFile.filename = file.name; reader.readAsBinaryString(file)
}
function g(a) { var QS = new Array(); if (QS.length == 0) { var as = document.getElementById('fr_1').src.split('?')[1].split('&'); for (var i = 0; i < as.length; i++) { var key = as[i].split('=')[0]; var value = decodeURIComponent(as[i].split('=')[1]); QS[key] = value } } return QS[a].replace(/[+]/g, " ") }
window.onmessage = function (e) { if ($(e.data) !== '' && $f !== '') { window.location.replace('result.html?file=' + e.data + '&prev=' + $f) } }