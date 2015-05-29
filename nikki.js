
var THEAD = "<thead><tr>\
  <th>拥有</th>\
  <th>名称</th>\
  <th>类别</th>\
  <th>编号</th>\
  <th>简约</th>\
  <th>华丽</th>\
  <th>可爱</th>\
  <th>成熟</th>\
  <th>活泼</th>\
  <th>优雅</th>\
  <th>清纯</th>\
  <th>性感</th>\
  <th>清凉</th>\
  <th>保暖</th>\
  <th>特殊属性</th>\
  </tr></thead>";

var FEATURES = ["simple", "cute", "active", "pure", "cool"];

// parses a csv row into object
// Clothes: name, type, id, stars, gorgeous, simple, elegant, active, mature, cute, sexy, pure, cool, warm，extra
//          0     1     2   3      4         5       6        7       8       9     10    11    12    13    14
Clothes = function(csv) {
	return {
		own: false,
		name: csv[0],
		type: csv[1],
		id: csv[2],
		stars: csv[3],
		simple: normalizeRating(csv[5], csv[4]),
		cute: normalizeRating(csv[9], csv[8]),
		active: normalizeRating(csv[7], csv[6]),
		pure: normalizeRating(csv[11], csv[10]),
		cool: normalizeRating(csv[12], csv[13]),
		extra: csv[14],
		toCsv: function() {
			name = this.name;
			type = this.type;
			id = this.id;
			simple = this.simple;
			cute = this.cute;
			active = this.active;
			pure = this.pure;
			cool = this.cool;
			extra = this.extra;
			return [name, type, id, rating(simple), rating(-simple), rating(cute), rating(-cute),
			    rating(active), rating(-active), rating(pure), rating(-pure), rating(cool),
			    rating(-cool), extra];
		}
	};
}

var clothes = function() {
	var ret = [];
  for (var i in wardrobe) {
  	ret.push(Clothes(wardrobe[i]));
  }
  return ret;
}();

var clothesSet = function() {
	var ret = {};
	for (var i in clothes) {
		ret[clothes[i].name] = clothes[i];
	}
	return ret;
}();

function normalizeRating(a, b) {
	realRating = a ? a : b;
	symbol = a ? 1 : -1;
	switch (realRating) {
		case "SS": return 5 * symbol;
		case "S": return 4 * symbol;
		case "A": return 3 * symbol;
		case "B": return 2 * symbol;
		case "C": return 1 * symbol;
	}
}

function rating(num) {
	switch (num) {
		case 1: return "C";
		case 2: return "B";
		case 3: return "A";
		case 4: return "S";
		case 5: return "SS";
		default: return "-";
	}
}

// for table use
function table(tdata) {
	return "<table>" + tdata + "</table>";
}

function tr(tds) {
	return "<tr>" + tds + "</tr>";
}

function td(data, cls) {
	return "<td class='" + cls + "'>" + data + "</td>";
}

function inventoryCheckbox(id, own) {
	var ret = "<input type = 'checkbox' name = 'inventory' id = '" + id
	    + "' onClick='toggleInventory(\"" + id + "\")'";
	if (own) {
		ret += "checked";
	}
	ret += "/>";
	return ret;
}

function toggleInventory(id) {
	var checked = document.getElementById(id).checked;
	clothesSet[id].own = checked;
	save();
}

function row(piece) {
	var ret = td(inventoryCheckbox(piece.name, piece.own), "");
	var csv = piece.toCsv();
	for (var i in csv) {
		ret += td(csv[i], getStyle(csv[i]));
	}
	return tr(ret);
}

function getStyle(rating) {
	switch (rating) {
		case "SS": return 'S';
		case "S": return 'S';
		case "A": return 'A';
		case "B": return 'B';
		case "C": return 'C';
		default: return ""
	}
}

function list(rows) {
	ret = THEAD;
	for (var i in rows) {
		ret += row(rows[i]);
	}
	return table(ret);
}

function drawTable(data, div) {
  container = document.getElementById(div);
  container.innerHTML = list(data);
}

function filter() {
	var filters = {};
	for (var i in document.filter_form.elements) {
		var element = document.filter_form.elements[i];
		if (element.type == "radio" && element.checked) {
			filters[element.name] = parseInt(element.value);
		}
	}
	for (var i in document.filter_form.inventory) {
		var element = document.filter_form.inventory[i];
		if (element.checked) {
			filters[element.value] = true;
		}
	}
	for (var i in document.filter_form.category) {
		var element = document.filter_form.category[i];
		if (element.checked) {
			filters[element.value] = true;
		}
	}
	drawTable(filtering(filters), "clothes");
}

function filtering(filters) {
	var result = [];
	for (var i in clothes) {
		if (matches(clothes[i], filters)) {
			result.push(clothes[i]);
		}
	}
	return result;
}

function matches(c, filters) {
	for (var i in FEATURES) {
		var f = FEATURES[i];
		if (filters[f] && filters[f] * c[f] < 0) {
			return false;
		}
	}
	return ((c.own && filters.own) || (!c.own && filters.missing)) && filters[c.type];
}

function getMyClothes() {
	var mine = [];
	for (var i in clothes) {
		if (clothes[i].own) {
			mine.push(clothes[i].name);
		}
	}
	return mine.join(",");
}

function save() {
	var myClothes = getMyClothes();
	document.getElementById("myClothes").innerText = myClothes;
	if (localStorage) {
		localStorage.myClothes = myClothes;
	} else {
		setCookie("mine", myClothes, 3650);
	}
}

function load(myClothes) {
	var cs = myClothes.split(",");
	for (var i in clothes) {
		clothes[i].own = false;
	}
	for (var i in cs) {
		if (clothesSet[cs[i]]) {
			clothesSet[cs[i]].own = true;
		}
	}
	for (var i in clothes) {
		var checkBox = document.getElementById(clothes[i].name);
		if (checkBox) {
			checkBox.checked = clothes[i].own;
		}
	}
	document.getElementById("myClothes").innerText = myClothes;
}

function loadFromStorage() {
	var myClothes;
	if (localStorage) {
		myClothes = localStorage.myClothes;
	} else {
		myClothes = getCookie("mine");
	}
	if (myClothes) {
    load(myClothes);
	}
}

function loadCustomInventory() {
	var myClothes = document.getElementById("myClothes").value;
  load(myClothes);
  save();
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

function selectAllCategories() {
	var all = document.getElementById('allCategory');
	for (var i in document.filter_form.category) {
		var element = document.filter_form.category[i];
		element.checked = all.checked;
	}
	filter();
}

function drawFilter() {
	cate = document.getElementById("category_div");
	out = "<input type='checkbox' id='allCategory' onClick='selectAllCategories()' checked /> 全选<br/>\n";
	for (var i in category) {
		out += "<input type='checkbox' name='category' value='" + category[i]
		    + "'' onClick='filter()' checked />" + category[i] + "\n";
	}
	cate.innerHTML = out;
}

function init() {
	loadFromStorage();
	drawFilter();
}
