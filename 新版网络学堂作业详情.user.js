// ==UserScript==
// @name         THU_新版网络学堂作业详情
// @description  新版网络学堂“课程作业”列表页，标题tooltip详情，点击打开详情页
// @namespace    http://200404.xyz/
// @version      0.1
// @author       Li Zhaoyang
// @match        http://learn.cic.tsinghua.edu.cn/f/student/homework/*
// ==/UserScript==

var prefix = 'http://learn.cic.tsinghua.edu.cn/b/myCourse/homeworkRecord/getByHomewkIdAndStuId/';

function render(i){
    var resultUrl = icons[i].parentNode.href;
    var id = resultUrl.match(/\d+$/)[0];
    $.get(prefix + id, function(data){
        var html = data.result.courseHomeworkInfo.detail;
        var div = document.createElement('div');
        div.innerHTML = html;
        var text = div.innerText;
        var title = icons[i].parentNode.parentNode.parentNode.querySelector('div.hw-name');
        title.title = text;
        title.onclick = function(){
            window.open(resultUrl.replace('hw_result','hw_detail'));
        };
    })
}

var icons = document.querySelectorAll('div.icon-review');
var i;
for(i=0; i<icons.length; i++){
    render(i);
}
