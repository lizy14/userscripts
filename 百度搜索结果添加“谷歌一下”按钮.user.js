// ==UserScript==
// @name         百度搜索结果添加“谷歌一下”按钮
// @namespace    200404.xyz
// @version      0.1
// @description  
// @author       200404
// @match        https://www.baidu.com/s?*
// @grant        none
// ==/UserScript==
nodecontainer = document.createElement('span')
node = document.createElement('button')
node.onclick=function(){
    window.location.href=
        'https://www.google.com.hk/search?q='
        +encodeURI($('#kw')[0].value);
        return false;
}
node.classList.add('bg', 's_btn');
node.id='btnGoogle';
node.onmouseover=function(){
    $('#btnGoogle')[0].style.backgroundColor
    ='hsl(3, 79%, 53%)'
}
node.onmouseout=function(){
    $('#btnGoogle')[0].style.backgroundColor
    ='hsl(3, 79%, 56%)'
}
node.style.background='hsl(3, 79%, 56%)';
node.style.marginLeft='1px';
node.style.borderBottomColor='red';
node.appendChild(document.createTextNode('谷歌一下'));
nodecontainer.appendChild(node);
$('.s_btn_wr')[0].parentNode.insertBefore(
    nodecontainer,
    $('.tools')[0]
);
$('#form span.tools')[0].style.display='none';