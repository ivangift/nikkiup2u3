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
  
var THEAD_SCORE = "<thead><tr>\
  <th>拥有</th>\
  <th>分数</th>\
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
    simple: realRating(csv[5], csv[4], csv[1]),
    cute: realRating(csv[9], csv[8], csv[1]),
    active: realRating(csv[7], csv[6], csv[1]),
    pure: realRating(csv[11], csv[10], csv[1]),
    cool: realRating(csv[12], csv[13], csv[1]),
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
      return [name, type, id, simple[0], simple[1], cute[0], cute[1],
          active[0], active[1], pure[0], pure[1], cool[0],
          cool[1], extra];
    },
    calc: function(filters) {
      var s = 0;
      var self = this;
      for (var i in FEATURES) {
        var f = FEATURES[i];
        if (filters[f] && filters[f] * self[f][2] > 0) {
          s += filters[f] * self[f][2];
        }
      }
      this.tmpScore = Math.round(s);
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

function realRating(a, b, type) {
  real = a ? a : b;
  symbol = a ? 1 : -1;
  score = symbol * getScore(type)[real];
  dev = getDeviation(type)[real];
  return [a, b, score, dev];
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
  if (!isFilteringMode) {
    ret += td(piece.tmpScore);
  }
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
  ret = isFilteringMode ? THEAD : THEAD_SCORE;
  for (var i in rows) {
    ret += row(rows[i]);
  }
  return table(ret);
}

function drawTable(data, div) {
  container = document.getElementById(div);
  container.innerHTML = list(data);
}

function refreshTable() {
  var filters = {};
  for (var i in FEATURES) {
    var f = FEATURES[i];
    var weight = parseFloat(document.getElementById(f + "Weight").value);
    if (!weight) {
      weight = 1;
    }
    for (var j in document.filter_form[f]) {
      var element = document.filter_form[f][j];
      if (element.type == "radio" && element.checked) {
        filters[element.name] = parseInt(element.value) * weight;
      }
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

function byScore(a, b) {
  var cata = category.indexOf(a.type);
  var catb = category.indexOf(b.type);
  return (cata - catb == 0) ? b.tmpScore - a.tmpScore : cata - catb;
}

function filtering(filters) {
  var result = [];
  for (var i in clothes) {
    if (matches(clothes[i], filters)) {
      if (!isFilteringMode) {
        clothes[i].calc(filters);
      }
      result.push(clothes[i]);
    }
  }
  if (!isFilteringMode) {
    result.sort(byScore);
  }
  return result;
}

function matches(c, filters) {
  // only filter by feature when filtering
  if (isFilteringMode) {
    for (var i in FEATURES) {
      var f = FEATURES[i];
      if (filters[f] && filters[f] * c[f][2] < 0) {
        return false;
      }
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
  refreshTable();
}

function drawFilter() {
  cate = document.getElementById("category_div");
  out = "<input type='checkbox' id='allCategory' onClick='selectAllCategories()' checked /> 全选<br/>\n";
  for (var i in category) {
    out += "<input type='checkbox' name='category' value='" + category[i]
        + "'' onClick='refreshTable()' checked />" + category[i] + "\n";
  }
  cate.innerHTML = out;
}

var isFilteringMode = true;
function changeMode(isFiltering) {
  for (var i in FEATURES) {
    var f = FEATURES[i];
    document.getElementById(f + "Weight").disabled = isFiltering;
  }
  document.getElementById("theme").disabled = isFiltering;
  isFilteringMode = isFiltering;
  refreshTable();
}

function changeFilter() {
  var dropdown = document.getElementById("theme");
  dropdown.options[0].selected = true;
  refreshTable();
}

function changeTheme() {
  var dropdown = document.getElementById("theme");
  for (var i in dropdown.options) {
    if (dropdown.options[i].selected) {
      var theme = dropdown.options[i].value;
      if (allThemes[theme]) {
        setFilters(allThemes[theme]);
        break;
      }
    }
  }
}

function setFilters(filters) {
  for (var i in FEATURES) {
    var f = FEATURES[i];
    var weight = filters[f];
    document.getElementById(f + "Weight").value = Math.abs(weight);
    for (var j in document.filter_form[f]) {
      var element = document.filter_form[f][j];
      if (parseInt(element.value) * weight > 0) {
        element.checked = true;
        break;
      }
    }
  }
  refreshTable();
}

function drawTheme() {
  var dropdown = document.getElementById("theme");
  var def = document.createElement('option');
  def.text = '自定义';
  def.value = 'custom' 
  dropdown.add(def);
  for (var theme in allThemes) {
    var option = document.createElement('option');
    option.text = theme;
    option.value = theme;
    dropdown.add(option);
  }
}

function init() {
  loadFromStorage();
  drawFilter();
  drawTheme();
  changeMode(true);
}
