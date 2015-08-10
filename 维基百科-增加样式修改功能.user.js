// ==UserScript==
// @name          维基百科样式修改
// @description   隐藏正文所有链接
// @author        Zhaoyang - http://200404.sinaapp.com/
// @namespace     200404_Wiki_HideLinks
// @version       0.0.1
// @include       https://*.wikipedia.org/*
// @include       http://*.wikipedia.org/*
// ==/UserScript==
setTimeout(function render(){


    $('#firstHeading').append('<a style="float:right;font-size:10px;margin-right: 10px;" onclick="$(\'body\').append(\'<style>#mw-content-text a{color:black!important}</style>\');"> 隐藏链接</a>')
    $('#firstHeading').append('<a style="float:right;font-size:10px;margin-right: 10px;" onclick="$(\'body\').append(\'<style>#mw-content-text {font-family:monospace!important}</style>\');"> 定宽字体</a>')
    $('#firstHeading').append('<a style="float:right;font-size:10px;margin-right: 10px;" onclick="$(\'body style\').remove()">恢复原状 </a>')
    
},500);