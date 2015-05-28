function getCookie(c_name) {
	if (document.cookie.length>0) { 
		c_start=document.cookie.indexOf(c_name + "=")
		if (c_start!=-1) { 
			c_start=c_start + c_name.length+1 
			c_end=document.cookie.indexOf(";",c_start)
			if (c_end==-1) {
				c_end=document.cookie.length
			}
		  return unescape(document.cookie.substring(c_start,c_end))
		}
	}
	return ""
}

function setCookie(c_name,value,expiredays) {
	var exdate=new Date()
	exdate.setDate(exdate.getDate()+expiredays)
	document.cookie=c_name+ "=" +escape(value)+
	((expiredays==null) ? "" : "; expires="+exdate.toGMTString())
}

function updateCookie() {
	var mine=document.getElementById("cookie").value;
	setCookie('mine', mine, 3650);
	
	//cookie = "mine=" + mine + "; expires=" + (new Date("December 31, 2020").toGMTString());
	//document.cookie=cookie;
}

function loadCookie() {
	return getCookie("mine");
	/*
	var cookies = document.cookie.split(";");
	for (var i in cookies) {
	  var c = cookies[i].trim();
		var name = "mine=";
	  if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
	}
	return "";
	*/
}