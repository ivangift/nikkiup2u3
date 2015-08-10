// Ivan's Workshop

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
function thead(isShoppingCart, score) {
  var ret = "<tr>";
  if (!isShoppingCart) {
    ret += "<th>拥有</th>";
  }
  if (score) {
    ret += "<th class='score'>分数</th>";
  }
  
  return ret + "<th class='name'>名称</th>\
  <th class='category'>类别</th>\
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
  <th>&nbsp;</th>\
  </tr>\n";
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

function shoppingCartButton(type, id) {
  return "<button onClick='addShoppingCart(\"" + type + "\",\"" + id
      + "\")'>加入购物车</button>";
}

function removeShoppingCartButton(detailedType) {
  return "<button onClick='removeShoppingCart(\"" + detailedType + "\")'>删除</button>";
}

function addShoppingCart(type, id) {
  shoppingCart.put(clothesSet[type][id]);
  refreshShoppingCart();
}

function removeShoppingCart(type) {
  shoppingCart.remove(type);
  refreshShoppingCart();
}

function clearShoppingCart() {
  shoppingCart.clear();
  refreshShoppingCart();
}

function toggleInventory(type, id) {
  var checked = $('#' + type + id)[0].checked;
  clothesSet[type][id].own = checked;
  saveAndUpdate();
}

function row(piece, isShoppingCart) {
  var ret = isShoppingCart ? "" : td(inventoryCheckbox(piece.type.mainType, piece.id, piece.own), "");
  if (!isFilteringMode) {
    ret += td(piece.tmpScore);
  }
  var csv = piece.toCsv();
  for (var i in csv) {
    ret += td(render(csv[i]), getStyle(csv[i]));
  }
  if (isShoppingCart) {
    // use id to detect if it is a fake clothes
    if (piece.id) {
      ret += td(removeShoppingCartButton(piece.type.type), '');
    }
  } else {
    ret += td(shoppingCartButton(piece.type.mainType, piece.id), '');
  }
  return tr(ret);
}

function render(rating) {
  if (rating < 0) {
    return -rating;
  }
  return rating;
}

function getStyle(rating) {
  if (rating < 0) {
    return 'negative';
  }
  switch (rating) {
    case "SS": return 'S';
    case "S": return 'S';
    case "A": return 'A';
    case "B": return 'B';
    case "C": return 'C';
    default: return "";
  }
}

function list(rows, isShoppingCart) {
  ret = "";
  for (var i in rows) {
    ret += row(rows[i], isShoppingCart);
  }
  if (isShoppingCart) {
    ret += row(shoppingCart.totalScore, isShoppingCart);
  }
  return ret;
}

function drawTable(data, div, isShoppingCart) {
  if ($('#' + div + ' table').length == 0) {
    $('#' + div).html("<table><thead></thead><tbody></tbody></table>");
    if (!isShoppingCart) {
      $('#clothes table').floatThead({
        useAbsolutePositioning: false
      });
    }
  }
  $('#' + div + ' table thead').html(thead(isShoppingCart, !isFilteringMode));
  $('#' + div + ' table tbody').html(list(data, isShoppingCart));
  $('#clothes table').floatThead('reflow');
}

var criteria = {};
function onChangeCriteria() {
  criteria = {};
  for (var i in FEATURES) {
    var f = FEATURES[i];
    var weight = parseFloat($('#' + f + "Weight").val());
    if (!weight) {
      weight = 1;
    }
    var checked = $('input[name=' + f + ']:radio:checked');
    if (checked.length) {
      criteria[f] = parseInt(checked.val()) * weight;
    }
  }
  if (!isFilteringMode){
    if ($('#accessoriesHelper')[0].checked) {
      chooseAccessories(criteria);
    } else {
      refreshShoppingCart();
    }
  }
  drawLevelInfo();
  refreshTable();
}

var uiFilter = {};
function onChangeUiFilter() {
  uiFilter = {};
  $('input[name=inventory]:checked').each(function() {
    uiFilter[$(this).val()] = true;
  });

  if (currentCategory) {
    if (CATEGORY_HIERARCHY[currentCategory].length > 1) {
      $('input[name=category-' + currentCategory + ']:checked').each(function() {
        uiFilter[$(this).val()] = true;
      });
    } else {
      uiFilter[currentCategory] = true;
    }
  }
  refreshTable();
}

function refreshTable() {
  drawTable(filtering(criteria, uiFilter), "clothes", false);
}

function chooseAccessories(accfilters) {
  var accCate = CATEGORY_HIERARCHY['饰品'];
  for (var i in accCate) {
    shoppingCart.remove(accCate[i]);
  }
  shoppingCart.putAll(filterTopAccessories(accfilters));
  refreshShoppingCart();
}

function refreshShoppingCart() {
  shoppingCart.calc(criteria);
  drawTable(shoppingCart.toList(byCategoryAndScore), "shoppingCart", true);
}

function drawLevelInfo() {
  var info = "";
  if (currentLevel) {
    var log = [];
    if (currentLevel.filter) {
      if (currentLevel.filter.tagWhitelist) {
        log.push("tag允许: [" + currentLevel.filter.tagWhitelist + "]");
      }
      if (currentLevel.filter.nameWhitelist) {
        log.push("名字含有: [" + currentLevel.filter.nameWhitelist + "]");
      }
    }
    if (currentLevel.bonus) {
      for (var i in currentLevel.bonus) {
        var bonus = currentLevel.bonus[i];
        var match = "(";
        if (bonus.tagWhitelist) {
          match += "tag符合: " + bonus.tagWhitelist + " ";
        }
        if (bonus.nameWhitelist) {
          match += "名字含有: " + bonus.nameWhitelist;
        }
        match += ")";
        log.push(match + ": [" + bonus.note + " " + bonus.param + "]");
      }
    }
    info = log.join(" ");
  }
  $("#tagInfo").text(info);
}

function byCategoryAndScore(a, b) {
  var cata = category.indexOf(a.type.type);
  var catb = category.indexOf(b.type.type);
  return (cata - catb == 0) ? b.tmpScore - a.tmpScore : cata - catb;
}

function byScore(a, b) {
  return b.tmpScore - a.tmpScore;
}

function byId(a, b) {
  return a.id < b.id ? -1 : (a.id > b.id ? 1 : 0);
}

function filterTopAccessories(filters) {
  filters['own'] = true;
  var accCate = CATEGORY_HIERARCHY['饰品'];
  for (var i in accCate) {
    filters[accCate[i]] = true;
  }
  var result = {};
  for (var i in clothes) {
    if (matches(clothes[i], {}, filters)) {
      if (!isFilteringMode) {
        clothes[i].calc(filters);
        if (!result[clothes[i].type.type]) {
          result[clothes[i].type.type] = clothes[i];
        } else if (clothes[i].tmpScore > result[clothes[i].type.type].tmpScore) {
          result[clothes[i].type.type] = clothes[i];
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
    realScoreBefore = accScore(total, i);
    realScore = accScore(total + toSort[i].tmpScore, i+1);
    if (realScore < realScoreBefore) {
      break;
    }
    total += toSort[i].tmpScore;
  }
  return toSort.slice(0, i);
}

function filtering(criteria, filters) {
  var result = [];
  for (var i in clothes) {
    if (matches(clothes[i], criteria, filters)) {
      if (!isFilteringMode) {
        clothes[i].calc(criteria);
      }
      result.push(clothes[i]);
    }
  }
  if (isFilteringMode) {
    result.sort(byId);
  } else {
    result.sort(byCategoryAndScore);
  } 
  return result;
}

function matches(c, criteria, filters) {
  // only filter by feature when filtering
  if (isFilteringMode) {
    for (var i in FEATURES) {
      var f = FEATURES[i];
      if (criteria[f] && criteria[f] * c[f][2] < 0) {
        return false;
      }
    }
  } 
  return ((c.own && filters.own) || (!c.own && filters.missing)) && filters[c.type.type];
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

function toggleAll(c) {
  var all = $('#all-' + c)[0].checked;
  var x = $('input[name=category-' + c + ']:checkbox');
  x.each(function() {
    this.checked = all;
  });
  onChangeUiFilter();
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
      // draw a select all checkbox...
      out += "<input type='checkbox' id='all-" + c + "' onClick='toggleAll(\"" + c + "\")' checked>"
          + "<label for='all-" + c + "'>全选</label><br/>";
      // draw sub categories
      for (var i in CATEGORY_HIERARCHY[c]) {
        out += "<input type='checkbox' name='category-" + c + "' value='" + CATEGORY_HIERARCHY[c][i]
            + "'' id='" + CATEGORY_HIERARCHY[c][i] + "' onClick='onChangeUiFilter()' checked /><label for='"
            + CATEGORY_HIERARCHY[c][i] + "'>" + CATEGORY_HIERARCHY[c][i] + "</label>\n";
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
  onChangeUiFilter();
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
    $("#tagInfo").hide();
  } else {
    $("#theme").show();
    $("#tagInfo").show();
  }
  isFilteringMode = isFiltering;
  onChangeCriteria();
}

function changeFilter() {
  $("#theme")[0].options[0].selected = true;
  currentLevel = null;
  onChangeCriteria();
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

var currentLevel; // used for post filtering.
function setFilters(level) {
  currentLevel = level;
  var weights = level.weight;
  for (var i in FEATURES) {
    var f = FEATURES[i];
    var weight = weights[f];
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
  onChangeCriteria();
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
    if (clothes[i].type.mainType == type && mapping[clothes[i].id]) {
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
  refreshShoppingCart();
}
$(document).ready(function() {
  init()
});
