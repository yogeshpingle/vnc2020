// JavaScript Document
function oldGetXmlHttpObject()
{
var xmlHttp=null;
try
  {
  // Firefox, Opera 8.0+, Safari
  xmlHttp = new XMLHttpRequest();
  }
catch (e)
  {
  // Internet Explorer > 6.0
  try
    {
    xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
    }
  catch (e)
    {
    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
  }
return xmlHttp;
}



function GetXmlHttpObject() {
	var xmlHttp = false;

	// branch for native XMLHttpRequest object
	if(window.XMLHttpRequest && !(window.ActiveXObject)) {
		try {
			xmlHttp = new XMLHttpRequest();
		} catch(e) {
			xmlHttp = false;
		}

	// branch for IE/Windows ActiveX version
	} else if(window.ActiveXObject) {
		try {
			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch(e) {
			try {
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			} catch(e) {
				xmlHttp = false;
			}
		}
	}

	return xmlHttp;
/*	if(req) {
		req.onreadystatechange = processReqChange;
		req.open("GET", url, true);
		req.send("");
	}
*/
}