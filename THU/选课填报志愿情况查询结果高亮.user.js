// ==UserScript==
// @name         THU_选课志愿查询高亮
// @namespace    http://nullspace.cn/
// @version      0.1
// @author       Zhaoyang
// @match        http://zhjwxk.cic.tsinghua.edu.cn/xkBks.xkBksZytjb.do*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

var highlightPrefix = '<span style="color:red;font-weight:bold;">'
var highlightSuffix = '</span>'

$('.trr2').each(function(_, tr){
    //tr = $('.trr2')[0]
    var tds = tr.getElementsByTagName('td');
    var available = parseInt(tds[4].innerText);
    var choices = [];
    [6,7,8].forEach(function(i){
        var numbers = tds[i].innerText.split(',');
        choices = choices.concat(numbers);
    });
    choices.forEach(function(ele, index, arr){
        arr[index] = parseInt(ele);
    })
    
    var highlight;
    var sum = 0;
    choices.forEach(function(ele, index){
        sum += ele;
        if(!highlight){
            if(sum > available){
                highlight = index;
            }
        }
    })
    if(!highlight){
        tds[5].firstChild.style.color='green';
        tds[5].firstChild.style.fontWeight='bold';
    }else{
        tds[5].firstChild.style.color='red';
        tds[5].firstChild.style.fontWeight='bold';
        
        //highlight in range [0,9)
        var group = parseInt(highlight / 3);
        var serial = highlight % 3;
        
        var tdToBeModified = tds[group + 6];
        
        var newHTML = '';
        [0,1,2].forEach(function(i){
            if(i == serial)
                newHTML += highlightPrefix + choices[group * 3 + serial] + highlightSuffix;
            else
                newHTML += choices[group * 3 + i];
            if(i != 2)
                newHTML += ','
        })
        tdToBeModified.firstChild.innerHTML = newHTML;
    }
})
