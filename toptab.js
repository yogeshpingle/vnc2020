<!--
function FP_swapImg() {//v1.0
 var doc=document,args=arguments,elm,n; doc.$imgSwaps=new Array(); for(n=2; n<args.length;
 n+=2) { elm=FP_getObjectByID(args[n]); if(elm) { doc.$imgSwaps[doc.$imgSwaps.length]=elm;
 elm.$src=elm.src; elm.src=args[n+1]; } }
}

function FP_preloadImgs() {//v1.0
 var d=document,a=arguments; if(!d.FP_imgs) d.FP_imgs=new Array();
 for(var i=0; i<a.length; i++) { d.FP_imgs[i]=new Image; d.FP_imgs[i].src=a[i]; }
}

function FP_getObjectByID(id,o) {//v1.0
 var c,el,els,f,m,n; if(!o)o=document; if(o.getElementById) el=o.getElementById(id);
 else if(o.layers) c=o.layers; else if(o.all) el=o.all[id]; if(el) return el;
 if(o.id==id || o.name==id) return o; if(o.childNodes) c=o.childNodes; if(c)
 for(n=0; n<c.length; n++) { el=FP_getObjectByID(id,c[n]); if(el) return el; }
 f=o.forms; if(f) for(n=0; n<f.length; n++) { els=f[n].elements;
 for(m=0; m<els.length; m++){ el=FP_getObjectByID(id,els[n]); if(el) return el; } }
 return null;
}

var aryImages = new Array(2);

aryImages[0] = "images/menu_right.gif";
aryImages[1] = "images/menu_top.gif";

for (i=0; i < aryImages.length; i++) {
	var preload = new Image();
	preload.src = aryImages[i];
}

function swap(strImage) {
	if ( (document[strImage].src).indexOf("right") != -1 )
		document[strImage].src = aryImages[1];
	else if ( (document[strImage].src).indexOf("top") != -1)
		document[strImage].src = aryImages[0];
}
  
function toggleMenu(menuItem)
{
	//alert(menuItem + verb);
	switch (menuItem)
	{
		case "home" : 
			toggleDisplay("subMenuHome");
			swap('imgSubMenuHome');
			break;
		case "guidelines" : 
			toggleDisplay("subMenuGuidelines");
			swap('imgSubMenuGuidelines');
			break;
		case "contactsAndInfo" : 
			toggleDisplay("subMenuContactsAndInfo")
			swap('imgSubMenuContactsAndInfo');
			break;
		case "committee" :
			toggleDisplay("subMenuCommittee")
			swap('imgSubMenuCommittee');
			break;
	}
}

function toggleDisplay(strItem)
{
	if (document.getElementById(strItem).style.display == "none")
		document.getElementById(strItem).style.display = "block";
	else
		document.getElementById(strItem).style.display = "none";
}
// -->