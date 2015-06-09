// Ivan's Workshop

var FEATURES = ["simple", "cute", "active", "pure", "cool"];

var CATEGORY_HIERARCHY = function() {
  var ret = {};
  for (var i in category) {
    var type = category[i].split('-')[0];
    if (!ret[type]) {
      ret[type] = [];
    }
    ret[type].push(category[i]);
  }
  return ret;
}();

// for table use
function thead(simple, score) {
  var ret = "<thead><tr>";
  if (!simple) {
    ret += "<th>拥有</th>";
  }
  if (score) {
    ret += "<th>分数</th>";
  }
  return ret + "<th>名称</th>\
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
}

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

function row(piece, simple) {
  var ret = simple ? "" : td(inventoryCheckbox(piece.getType(), piece.id, piece.own), "");
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

function list(rows, simple) {
  ret = thead(simple, !isFilteringMode);
  ret += "<tbody>";
  for (var i in rows) {
    ret += row(rows[i], simple);
  }
  ret += "</tbody>";
  return table(ret);
}

function drawTable(data, div, simple) {
  $('#' + div).html(list(data, simple));
}

function refreshTable() {
  var filters = {};
  var accfilters = {}
  for (var i in FEATURES) {
    var f = FEATURES[i];
    var weight = parseFloat($('#' + f + "Weight").val());
    if (!weight) {
      weight = 1;
    }
    var checked = $('input[name=' + f + ']:radio:checked');
    if (checked.length) {
      filters[f] = parseInt(checked.val()) * weight;
      accfilters[f] = parseInt(checked.val()) * weight;
    }
  }
  
  $('input[name=inventory]:checked').each(function() {
    filters[$(this).val()] = true;
  });

  if (currentCategory) {
    if (CATEGORY_HIERARCHY[currentCategory].length > 1) {
      $('input[name=category-' + currentCategory + ']:checked').each(function() {
        filters[$(this).val()] = true;
      });
    } else {
      filters[currentCategory] = true;
    }
  }
  if (!isFilteringMode) {
    // show top accessories
    $('#topAccessories').show();
    drawTable(filterTopAccessories(accfilters), "topAccessoriesTable", true);
  } else {
    $('#topAccessories').hide();
  }

  drawTable(filtering(filters), "clothes", false);
}

function byCategoryAndScore(a, b) {
  var cata = category.indexOf(a.type);
  var catb = category.indexOf(b.type);
  return (cata - catb == 0) ? b.tmpScore - a.tmpScore : cata - catb;
}

function byScore(a, b) {
  return b.tmpScore - a.tmpScore;
}

function filterTopAccessories(filters) {
  filters['own'] = true;
  var accCate = CATEGORY_HIERARCHY['饰品'];
  for (var i in accCate) {
    filters[accCate[i]] = true;
  }
  var result = {};
  for (var i in clothes) {
    if (matches(clothes[i], filters)) {
      if (!isFilteringMode) {
        clothes[i].calc(filters);
        if (!result[clothes[i].type]) {
          result[clothes[i].type] = clothes[i];
        } else if (clothes[i].tmpScore > result[clothes[i].type].tmpScore) {
          result[clothes[i].type] = clothes[i];
        }
      }
    }
  }
  var toSort = [];
  for (var c in result) {
    toSort.push(result[c]);
  }
  toSort.sort(byScore);
  var total = 0;
  var i;
  for (i = 0; i < toSort.length; i++) {
    realScoreBefore = accScore(total, i-1);
    realScore = accScore(total + toSort[i].tmpScore, i);
    if (realScore < realScoreBefore) {
      break;
    }
    total += toSort[i].tmpScore;
  }
  return toSort.slice(0, i);
}

function accScore(total, items) {
  if (items <= 3) {
    return total;
  }
  return total * (1 - 0.06 * (items-3)); 
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
    result.sort(byCategoryAndScore);
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

function drawFilter() {
  out = "<ul class='tabs' id='categoryTab'>";
  for (var c in CATEGORY_HIERARCHY) {
    out += '<li id="' + c + '"><a href="#dummy" onClick="switchCate(\'' + c + '\')">' + c + '</a></li>';
  }
  out += "</ul>";
  for (var c in CATEGORY_HIERARCHY) {
    out += '<div id="category-' + c + '">';
    if (CATEGORY_HIERARCHY[c].length > 1) {
      // draw sub categories
      for (var i in CATEGORY_HIERARCHY[c]) {
        out += "<input type='checkbox' name='category-" + c + "' value='" + CATEGORY_HIERARCHY[c][i]
            + "'' onClick='refreshTable()' checked />" + CATEGORY_HIERARCHY[c][i] + "\n";
      }
    }
    out += '</div>';
  }
  $('#category_container').html(out);
}

var currentCategory;
function switchCate(c) {
  currentCategory = c;
  $("ul.tabs li").removeClass("active");
  $("#category_container div").removeClass("active");
  $("#" + c).addClass("active");
  $("#category-" + c).addClass("active");
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
  updateSize(mine);
}

function updateSize(mine) {
  $("#inventoryCount").text('(' + mine.size + ')');
  $("#myClothes").val(mine.serialize());
  var subcount = {};
  for (c in mine.mine) {
    var type = c.split('-')[0];
    if (!subcount[type]) {
      subcount[type] = 0;
    }
    subcount[type] += mine.mine[type].length;
  }
  for (c in subcount) {
    $("#" + c + ">a").text(c + "(" + subcount[c] + ")");
  }
}

function doImport() {
  var dropdown = $("#importCate")[0];
  var type = dropdown.options[dropdown.selectedIndex].value;
  var raw = $("#importData").val();
  var data = raw.match(/\d+/g);
  var mapping = {}
  for (var i in data) {
    while (data[i].length < 3) {
      data[i] = "0" + data[i];
    }
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
  drawFilter();
  drawTheme();
  drawImport();
  changeMode(true);
  switchCate(category[0]);
  updateSize(mine);
}
$(document).ready(function() {
  init()
});
