function start() {
   new mq('m1');
//   new mq('m2');
   mqRotate(mqr); // must come last
}
window.onload = start;


// Continuous text Vertical Scroller with stop/start button
// copyright 14th August 2010 by Stephen Chapman
// http://javascript.about.com
// permission to use this Javascript on your web page is granted
// provided that all of the code below in this script (including these
// comments) is used without any alteration
function startstopchange(m,txt) 
{
	for (var j=m.length - 1; j > -1; j--) document.getElementById('ss'+m[j].id).value = txt;
}  
function startstop(m,n) 
{
	var ss = document.createElement('form');
	var sd = document.createElement('div');
	ss.appendChild(sd);
	var sb = document.createElement('input');
	sb.type='button';
	sd.appendChild(sb);
	sb.id = 'ss'+n.id;
	sb.value = 'STOP'; 
	sb.onclick = function() 
	{
		if (this.value == 'STOP') 
		{
			clearTimeout(m[0].TO); 
			startstopchange(m,'START');
		} 
		else 
		{
			mqRotate(m); 
			startstopchange(m,'STOP');
		}
	}; 
	n.parentNode.insertBefore(ss,n);
}   

function objHeight(obj) 
{
	if(obj.offsetHeight) 
		return  obj.offsetHeight; 
	if (obj.clip) 
		return obj.clip.height; 
	return 0;
} 

var mqr = []; 

function mq(id)
{
	this.mqo=document.getElementById(id); 
	var ht = objHeight(this.mqo.getElementsByTagName('div')[0])+ 5; 
	var fulht = objHeight(this.mqo); 
	var txt = this.mqo.getElementsByTagName('div')[0].innerHTML; 
	this.mqo.innerHTML = ''; 
	var wid = this.mqo.style.width; 
	this.mqo.onmouseout=function() 
	{
		mqRotate(mqr);
//		startstopchange(mqr,'STOP');
	}; 
	this.mqo.onmouseover=function() 
	{
		clearTimeout(mqr[0].TO); 
//		startstopchange(mqr,'START');
	}; 
	this.mqo.ary=[]; 
	var maxw = Math.ceil(fulht/ht)+1; 
	for (var i=0;i < maxw;i++)
	{
		this.mqo.ary[i]=document.createElement('div'); 
		this.mqo.ary[i].innerHTML = txt; 
		this.mqo.ary[i].style.position = 'absolute'; 
		this.mqo.ary[i].style.top = (ht*i)+'px'; 
		this.mqo.ary[i].style.height = ht+'px'; 
		this.mqo.ary[i].style.width = wid; 
		this.mqo.appendChild(this.mqo.ary[i]);
	} 
	mqr.push(this.mqo);
//	startstop(mqr,this.mqo);
} 
	
function mqRotate(mqr)
{
	if (!mqr) return; 
	for (var j=mqr.length - 1; j > -1; j--) 
	{
		maxa = mqr[j].ary.length; 
		for (var i=0;i<maxa;i++)
		{
			var x = mqr[j].ary[i].style;  
			x.top=(parseInt(x.top,10)-1)+'px';
		} 
		var y = mqr[j].ary[0].style; 
		if (parseInt(y.top,10)+parseInt(y.height,10)<0) 
		{
			var z = mqr[j].ary.shift(); 
			z.style.top = (parseInt(z.style.top) + parseInt(z.style.height)*maxa) + 'px'; mqr[j].ary.push(z);
		}
	} 
	mqr[0].TO=setTimeout('mqRotate(mqr)',200);
}