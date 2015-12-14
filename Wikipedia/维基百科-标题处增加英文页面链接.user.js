// ==UserScript==
// @name          维基百科优化
// @description   标题添加英文，删除编辑段落的链接
// @author        Zhaoyang - http://200404.sinaapp.com/
// @namespace     200404_Wiki_Eng
// @version       0.0.1
// @include       https://zh.wikipedia.org/wiki/*
// @include       http://zh.wikipedia.org/wiki/*
// ==/UserScript==


setTimeout(function render(){
    var a=document.querySelector('li.interwiki-en a');
    var title = a.title.replace(' – 英文','');
    var link=a.href;
    
    $('#firstHeading').append('<a href="'+link+'" style="margin-left: 10px;font-size: 20px;">'+title+'</a>')
    
}, 500)
