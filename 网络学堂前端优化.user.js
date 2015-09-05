// ==UserScript==
// @name          THU_网络学堂优化
// @description   优化清华网络学堂前端界面, By Zhaoyang
// @author        Zhaoyang - http://200404.sinaapp.com/
// @namespace     200404_Learn_Website
// @version       0.5.0
// @include       http://learn.tsinghua.edu.cn/*
// @require       http://lib.sinaapp.com/js/jquery/1.8.3/jquery.min.js
// ==/UserScript==


 function removeNode(node){
	 node.parentNode.removeChild(node);
 }
 

//未登录？
btn=document.querySelector('input');

if(btn && btn.value=="重新登录网络学堂"){
    var xml = new XMLHttpRequest(); 
    xml.open('POST', '/MultiLanguage/lesson/teacher/loginteacher.jsp', true); 
    xml.setRequestHeader("Content-type","application/x-www-form-urlencoded"); 
    xml.onreadystatechange = function(){window.location.reload();};  
    xml.send('leixin1=student&userid=***your_id_here***&userpass=***your_password_here***'); 
    //WARNING: 此处有明文密码
    
}


var hwList=new Array();
 
//优化首页
if(0===document.location.href.indexOf('http://learn.tsinghua.edu.cn/MultiLanguage/lesson/student/MyCourse.jsp')){
	//删除废话
	removeNode(document.querySelector('table#info_2'));
	//简化标签页标题
	var tab;
	//tab=document.querySelectorAll('table#e_menu td')[1];
	//if(tab.querySelector('a'))tab=tab.querySelector('a');
	//tab.innerText="当前学期课程";
	tab=document.querySelectorAll('table#e_menu td')[5];
	if(tab.querySelector('a'))tab=tab.querySelector('a');
	tab.innerText="以前学期课程";
    //TODO: 将以前课程的学期列表显示
    
    //删掉隐藏标签页
    if(document.querySelectorAll('table#e_menu td')[3].innerText.trim()){
    }else{
        removeNode(document.querySelectorAll('table#e_menu td')[3]);
        removeNode(document.querySelectorAll('table#e_menu td')[3]);
    }
}	
	
//优化页面标题
var pageTitle=document.querySelector('td.info_title')?document.querySelector('td.info_title').innerText.trim():"";
var pageGroup;
if(0===document.location.href.indexOf('http://learn.tsinghua.edu.cn/MultiLanguage/lesson/student/download.jsp'))
	pageGroup="文件";
else if(0===document.location.href.indexOf('http://learn.tsinghua.edu.cn/MultiLanguage/lesson/student/hom_wk_brw.jsp'))
	pageGroup='作业';
else if(0===document.location.href.indexOf('http://learn.tsinghua.edu.cn/MultiLanguage/public/bbs/note_list_student.jsp'))
	pageGroup='公告';
else
	pageGroup = document.title;
document.title = pageGroup + (pageGroup&&pageTitle?" - ":"") + pageTitle;

//课程列表页“未交作业”“未读公告”“新文件”：隐藏任何"0个"，增加直接跳转链接
var table=document.getElementById('info_1');
if(typeof table === 'undefined'||(String(table) == "null")){}else{
var spans=table.getElementsByTagName('span');
for(i=0; i<spans.length; i++){
	
	var N = parseInt(spans[i].innerHTML);
	
	//跳过非数值
	if(isNaN(N))
		continue;
	
	//类型识别
	var type='null';
	if (spans[i].parentNode.innerHTML.indexOf('新文件')!=-1)
		type='file';
	else if (spans[i].parentNode.innerHTML.indexOf('未交作业')!=-1)
		type='homework';
	else if (spans[i].parentNode.innerHTML.indexOf('未读公告')!=-1)
		type='notice';
	
	//跳过类型不明的
	if(type=='null')
		continue;
	
	//与本地存储对比，计算差值，更新本地存储
	var key = spans[i].parentNode.parentNode.getElementsByTagName('a')[0].innerText + '-' + type;
	var oldN = parseInt(localStorage.getItem(key)); if(isNaN(oldN))oldN=0;
	var delta = N - oldN;
	if(delta != 0)
		localStorage.setItem(key, N);
	
	//设置数字显示格式

	var cssDelta ='text-decoration: none; padding: 2px 4px; color: red; white-space: nowrap; background-color: #f7f7f9; border: 1px solid #e1e1e8; -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px;';
	var cssDeltaDecrease  ='text-decoration: none; padding: 2px 4px; color: blue; white-space: nowrap; background-color: #f7f7f9; border: 1px solid #e1e1e8; -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px;';
	var cssOld='text-decoration: none; color: orange';
	var NHTML='';
	if(N == 0){
		NHTML = '';
	}else{
		
		if(delta > 0){
			NHTML = '<b style="' + cssDelta + '">+' + delta + '</b>';
		}else if(delta < 0){
			NHTML = '<b style="' + cssDeltaDecrease + '">' + delta + '</b>';
		}
		if(oldN != 0)
			NHTML = '<b style="' + cssOld +'">' + oldN +'</b> ' + NHTML;
	}
	
	//生成链接
	var aHTML='';
	var href='';
	if (type=='file'){
		//learn.tsinghua.edu.cn/MultiLanguage/lesson/student/course_locate.jsp?course_id=123919
		//learn.cic.tsinghua.edu.cn/f/student/coursehome/2014-2015-2-00701271-90
		
		//learn.tsinghua.edu.cn/MultiLanguage/lesson/student/download.jsp?course_id=123919
		//learn.cic.tsinghua.edu.cn/f/student/courseware/2014-2015-2-00701271-90
		href=spans[i].parentNode.parentNode.getElementsByTagName('a')[0].href.replace('course_locate','download').replace('coursehome','courseware');
		aHTML='<a href="javascript:window.open(\'' + href + '\')">文件';
	}else if (type=='homework'){
		//learn.tsinghua.edu.cn/MultiLanguage/lesson/student/hom_wk_brw.jsp?course_id=123919
		//learn.cic.tsinghua.edu.cn/f/student/homework/2014-2015-2-00701271-90
		href=spans[i].parentNode.parentNode.getElementsByTagName('a')[0].href.replace('course_locate','hom_wk_brw').replace('coursehome','homework');
		aHTML='<a href="javascript:window.open(\''  + href + '\')">作业';
		hwList.push(href);
	}else if (type=='notice'){
		//learn.tsinghua.edu.cn/MultiLanguage/public/bbs/getnoteid_student.jsp?course_id=122360
		//learn.tsinghua.edu.cn/MultiLanguage/public/bbs/note_list_student.jsp?bbs_id=8330624&course_id=123919
		//learn.cic.tsinghua.edu.cn/f/student/coursenotice/2014-2015-2-00701271-90
		href=spans[i].parentNode.parentNode.getElementsByTagName('a')[0].href.replace('lesson/student/course_locate.jsp','public/bbs/getnoteid_student.jsp').replace('coursehome','coursenotice');
		aHTML='<a href="javascript:window.open(\''+ href + '\')">公告';
	}
	
	//最后一步
	spans[i].parentNode.innerHTML = aHTML +' <span>'+ NHTML +'</span>' + '</a>';
}
}


//隐藏公告页面所有"已读"
var table=document.getElementById('table_box');
if(typeof table === 'undefined'||(String(table) == "null")){}else{
var tds=table.getElementsByTagName('td');
for(i=0;i<tds.length;i++){
	if(tds[i].innerHTML.indexOf('已读')!=-1)tds[i].innerHTML='';
}
}

//文件列表页显示拓展名
function getExt(a){
	return a.substring(a.lastIndexOf('.')+1);
}

var as=document.querySelectorAll('a[target=_top]');

for(i=0; i<as.length; i++){
	var ele = document.createElement("a");
	as[i].parentNode.align="left";
	var fileName =  as[i].parentNode.parentNode.innerHTML.match(/getfilelink=([^&]+)\&id=/)[1];
	as[i].innerHTML = as[i].innerHTML.replace(/\&nbsp;/g,'').trim();
	ele.innerHTML ='<div class="fileExt"><span class="fileExt ' + getExt(fileName) + '"><small>[' + getExt(fileName)+ ']</small></span></div>';
	ele.title=fileName;
	ele.href=as[i].href;
	as[i].parentNode.insertBefore(ele,as[i]);
}
var styles = document.createElement('style');
styles.innerHTML="div.fileExt{font-family:monospace;width:40px;float:left}.fileExt{color:gray}.fileExt.ppt{color:orange}.fileExt.pptx{color:orange}.fileExt.doc{color:blue}.fileExt.docx{color:blue}.fileExt.pdf{color:red}.fileExt.zip{color:purple}.fileExt.rar{color:purple}.fileExt.xls{color:green}.fileExt.xlsx{color:green}";
document.body.appendChild(styles);

//高亮作业页面的“尚未提交”
//不要问我为什么用这么蛋疼的办法，网络学堂一个页面里id相同的元素有好多才蛋疼
//document.body.innerHTML = document.body.innerHTML.replace(/尚未提交/g,'<span style="color: red">尚未提交</span>');


if(document.location.href=='http://learn.tsinghua.edu.cn/MultiLanguage/lesson/student/mainstudent.jsp'){
}

 
if(document.location.href=='http://learn.tsinghua.edu.cn/MultiLanguage/lesson/student/MyCourse.jsp?language=cn'){
//制作ddl列表
var ddlListDisplayToggle = document.createElement('a');
ddlListDisplayToggle.innerHTML="Deadlines"
ddlListDisplayToggle.onclick=function(){
	var div=document.getElementById('ddlListDisplay');
	window.open('data:text/html;charset=utf-8,' + (div.innerHTML));
}
document.body.appendChild(ddlListDisplayToggle);

var ddlListDisplay = document.createElement('div');
ddlListDisplay.id='ddlListDisplay';
ddlListDisplay.style.display='none';
ddlListDisplay.style.marginLeft='20px';
document.body.appendChild(ddlListDisplay);

var ddlList=new Array();

function render(){
	ddlList.sort(function(a,b){
            return (Date.parse(a[2])-Date.parse(b[2]))});
	var html='Oncoming Deadlines<table>';
	var today=parseInt(Date.now()/86400000)*86400000;
	ddlList.forEach(function(item){
		if(today-Date.parse(item[2])<=0)
			html += ('<tr><td style="color:' + ((today-Date.parse(item[2])>0)?'blue':'orange') + '">' + item[2] + '</td><td style="color:' + ((item[3]=='尚未提交')?'red':'green') + '">' + item[3] +'</td><td><a style="text-decoration: none;" href="' + item[4] + '">' + item[0] + '</a></td><td>' + item[1] +  '</td></tr>');
	})
	html += '</table>Past Deadlines<table>';
	ddlList.sort(function(a,b){
            return -(Date.parse(a[2])-Date.parse(b[2]))});
	ddlList.forEach(function(item){
		if(today-Date.parse(item[2])>0)
			html += ('<tr><td style="color:' + ((today-Date.parse(item[2])>0)?'blue':'orange') + '">' + item[2] + '</td><td style="color:' + ((item[3]=='尚未提交')?'red':'green') + '">' + item[3] +'</td><td><a style="text-decoration: none;" href="' + item[4] + '">' + item[0] + '</a></td><td>' + item[1] +  '</td></tr>');
	})
	html += '</table>';
	document.getElementById('ddlListDisplay').innerHTML = html;
	
}
//0：课程名，1：作业名，2：ddl
var loading=0;
hwList.forEach(function(hwPageURL){
	loading++;
	$.get(hwPageURL,function(data){
		loading--;
		var html=data;
		var x=document.createElement('div')
		x.innerHTML=html
		links=x.querySelectorAll('link')
		for(i=0;i<links.length;i++)removeNode(links[i])
		x.style.display='none'
		var courseName=x.querySelector('td.info_title').innerText.trim();
		var hws=x.querySelectorAll('tr.tr1, tr.tr2');
		for(i=0;i<hws.length;i++){
			ddlList.push(Array(courseName,hws[i].childNodes[1].innerText.trim(),hws[i].childNodes[5].innerText.trim(),hws[i].childNodes[7].innerText.trim(),hwPageURL));
		}
		render();
		//document.body.appendChild(x)
		//removeNode(x)
	})

})
}