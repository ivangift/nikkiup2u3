var types = ["头发", "连衣裙", "外套", "上装", "下装", "袜子", "鞋子", "饰品", "妆容"];

// Clothes: name, type, simple, gorgeous, cute, mature, active, elegant, pure, sexy, cool, warm，extra
var raw = [
  ["默认粉毛", 0, "S", "", "A", "", "A", "", "A", "", "", "A", ""]
];

var clothes = function() {
	var ret = [];
  for (var i in raw) {
  	ret.push(Clothes(clothes[i]));
  }
  return ret;
}();

function rating(a, b) {
	realRating = a ? a : b;
	switch (realRating) {
		case "SS": return 5;
		case "S": return 4;
		case "A": return 3;
		case "B": return 2;
		case "C": return 1;
	}
}

// parses a csv row into object
Clothes = function(csv) {
	return {
		name: csv[0],
		type: types[csv[1]],
		simple: rating(csv[2], csv[3]),
		cute: rating(csv[4], csv[5]),
		active: rating(csv[6], csv[7]),
		pure: rating(csv[8], csv[9]),
		cool: rating(csv[10], csv[11]),
		extra: csv[12],
		toCsv = function() {
			
		}
	};
}

// for table use
function table(tdata) {
	return "<table>" + tdata + "</table>";
}

function tr(tds) {
	return "<tr>" + tds + "</tr>";
}

function td(data) {
	return "<td>" + data + "</td>";
}

function row(piece) {
	ret = ""
	for (var i in piece) {
		ret += td(piece[i]);
	}
	return tr(ret);
}

function list(rows) {
	ret = ""
	for (var i in rows) {
		ret += row(rows[i]);
	}
	return table(ret);
}

function drawTable(data, div) {
  container = document.getElementById(div);
  container.innerHTML = list(data);
}

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
