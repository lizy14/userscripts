// ==UserScript==
// @name          ά���ٿ���ʽ�޸�
// @description   ����������������
// @author        Zhaoyang - http://200404.sinaapp.com/
// @namespace     200404_Wiki_HideLinks
// @version       0.0.1
// @include       https://*.wikipedia.org/*
// @include       http://*.wikipedia.org/*
// ==/UserScript==
setTimeout(function render(){


    $('#firstHeading').append('<a style="float:right;font-size:10px;margin-right: 10px;" onclick="$(\'body\').append(\'<style>#mw-content-text a{color:black!important}</style>\');"> ��������</a>')
    $('#firstHeading').append('<a style="float:right;font-size:10px;margin-right: 10px;" onclick="$(\'body\').append(\'<style>#mw-content-text {font-family:monospace!important}</style>\');"> ��������</a>')
    $('#firstHeading').append('<a style="float:right;font-size:10px;margin-right: 10px;" onclick="$(\'body style\').remove()">�ָ�ԭ״ </a>')
    
},500);