var l = 'http://codelava-001-site2.itempurl.com';
$(document).on('click', 'div.dropdown button', function () {location.href = (l + '/Get' + window.location.search);return false});
$(function () {$('iframe#fr_1').attr('src', l + '/Default' + window.location.search + '&preview=1')});
window.onmessage = function (e) {if ($.trim(e.data) !== '') {var j = JSON.parse(e.data);$('.cdl_fSize').html(j["Size"]);$('.cdl_fName').html(j["Name"])}}