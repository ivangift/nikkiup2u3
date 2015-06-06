// Ivan's Workshop
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
  <th>来源</th>\
  </tr></thead>\n";
  
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
  <th>来源</th>\
  </tr></thead>\n";

var FEATURES = ["simple", "cute", "active", "pure", "cool"];

// for table use
function table(tdata) {
  return "<table>" + tdata + "</table>";
}

function tr(tds) {
  return "<tr>" + tds + "</tr>\n";
}

function td(data, cls) {
  return "<td class='" + cls + "'>" + data + "</td>";
}

function inventoryCheckbox(type, id, own) {
  var ret = "<input type = 'checkbox' name = 'inventory' id = '" + (type + id)
      + "' onClick='toggleInventory(\"" + type + "\",\"" + id + "\")'";
  if (own) {
    ret += "checked";
  }
  ret += "/>";
  return ret;
}

function toggleInventory(type, id) {
  var checked = $('#' + type + id)[0].checked;
  clothesSet[type][id].own = checked;
  saveAndUpdate();
}

function row(piece) {
  var ret = td(inventoryCheckbox(piece.getType(), piece.id, piece.own), "");
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
  ret += "<tbody>";
  for (var i in rows) {
    ret += row(rows[i]);
  }
  ret += "</tbody>";
  return table(ret);
}

function drawTable(data, div) {
  $('#' + div).html(list(data));
}

function refreshTable() {
  var filters = {};
  for (var i in FEATURES) {
    var f = FEATURES[i];
    var weight = parseFloat($('#' + f + "Weight").val());
    if (!weight) {
      weight = 1;
    }
    var checked = $('input[name=' + f + ']:radio:checked');
    if (checked.length) {
      filters[f] = parseInt(checked.val()) * weight;
    }
  }
  
  $('input[name=inventory]:checked').each(function() {
    filters[$(this).val()] = true;
  });
  
  /*
  $('input[name=category]:checked').each(function() {
    filters[$(this).val()] = true;
  });
  */
  filters[currentCategory] = true;
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
  return ((c.own && filters.own) || (!c.own && filters.missing)) && filters[c.getType()];
}

function loadCustomInventory() {
  var myClothes = $("#myClothes").val();
  if (myClothes.indexOf('|') > 0) {
    loadNew(myClothes);
  } else {
    load(myClothes);
  } 
  saveAndUpdate();
  refreshTable();
}

function selectAllCategories() {
  var all = $('#allCategory')[0].checked;
  var x = $('input[name=category]:checkbox');
  x.each(function() {
    this.checked = all;
  });
  refreshTable();
}

var maincate = ['发型', '连衣裙', '外套', '上装', '下装', '袜子', '鞋子', '饰品', '妆容'];
function drawFilter() {
  /*
  var out = "<input type='checkbox' id='allCategory' onClick='selectAllCategories()' checked /> 全选<br/>\n";
  for (var i in category) {
    out += "<input type='checkbox' name='category' value='" + category[i]
        + "'' onClick='refreshTable()' checked />" + category[i] + "\n";
  }
  $('#category_div').html(out);
  */
  out = "<ul class='tabs' id='categoryTab'>";
  for (var i in maincate) {
    out += '<li id="' + maincate[i] + '"><a href="#tab-' + i + '" onClick="switchCate(' + i + ')">' + maincate[i] + '</a></li>';
  }
  out += "</ul>";
  for (var i in maincate) {
    out += '<div id="tab-' + i + '"></div>';
  }
  $('#category_container').html(out);
}

var currentCategory;
function switchCate(i) {
  currentCategory = maincate[i];
  $( "#category_container" ).tabs({
    active: i
  });
  refreshTable();
}

var isFilteringMode = true;
function changeMode(isFiltering) {
  for (var i in FEATURES) {
    var f = FEATURES[i];
    if (isFiltering) {
      $('#' + f + 'WeightContainer').hide();
    } else {
      $('#' + f + 'WeightContainer').show();
    }
  }
  if (isFiltering) {
    $("#theme").hide();
  } else {
    $("#theme").show();
  }
  isFilteringMode = isFiltering;
  refreshTable();
}

function changeFilter() {
  $("#theme")[0].options[0].selected = true;
  refreshTable();
}

function changeTheme() {
  var dropdown = $("#theme")[0];
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
    $('#' + f + 'Weight').val(Math.abs(weight));
    var radios = $('input[name=' + f + ']:radio');
    for (var j in radios) {
      var element = radios[j];
      if (parseInt(element.value) * weight > 0) {
        element.checked = true;
        break;
      }
    }
  }
  refreshTable();
}

function drawTheme() {
  var dropdown = $("#theme")[0];
  var def = document.createElement('option');
  def.text = '自定义关卡';
  def.value = 'custom' 
  dropdown.add(def);
  for (var theme in allThemes) {
    var option = document.createElement('option');
    option.text = theme;
    option.value = theme;
    dropdown.add(option);
  }
}

function drawImport() {
  var dropdown = $("#importCate")[0];
  var def = document.createElement('option');
  def.text = '请选择类别';
  def.value = '';
  dropdown.add(def);
  for (var cate in scoring) {
    var option = document.createElement('option');
    option.text = cate;
    option.value = cate;
    dropdown.add(option);
  }
}

function clearImport() {
  $("#importData").val("");
}

function saveAndUpdate() {
  var mine = save();
  $("#inventoryCount").text('(' + mine.size + ')');
  $("#myClothes").val(mine.serialize());
}

function doImport() {
  var dropdown = $("#importCate")[0];
  var type = dropdown.options[dropdown.selectedIndex].value;
  var raw = $("#importData").val();
  var data = raw.match(/\d+/g);
  var mapping = {}
  for (var i in data) {
    mapping[data[i]] = true;
  }
  var updating = [];
  for (var i in clothes) {
    if (clothes[i].getType() == type && mapping[clothes[i].id]) {
      updating.push(clothes[i].name);
    }
  }
  var names = updating.join(",");
  if (confirm("你将要在>>" + type + "<<中导入：\n" + names)) {
    var myClothes = MyClothes();
    myClothes.filter(clothes);
    if (myClothes.mine[type]) {
      myClothes.mine[type] = myClothes.mine[type].concat(data);
    } else {
      myClothes.mine[type] = data;
    }
    myClothes.update(clothes);
    saveAndUpdate();
    refreshTable();
    clearImport();
  }
}

function init() {
  var mine = loadFromStorage();
  $("#inventoryCount").text('(' + mine.size + ')');
  $("#myClothes").text(mine.serialize());
  drawFilter();
  drawTheme();
  drawImport();
  changeMode(true);
}
$(document).ready(function() {
  init()
});
