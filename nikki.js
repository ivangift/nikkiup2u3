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
  /*
  if (!isShoppingCart) {
    ret += "<th>拥有</th>";
  }*/
  if (score) {
    ret += "<th class='score'>分数</th>";
  }
  
  ret += "<th class='name'>名称</th>\
  <th class='category'>类别</th>\
  <th>编号</th>\
  <th>心级</th>\
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
  <th>来源</th>";
  if (!isShoppingCart) {
    ret += "<th><span class='paging'></span></th><th class='top'></th>";
  } else {
    ret += "<th>&nbsp;</th>";
  }
  return ret + "</tr>\n";
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
  var checked = !clothesSet[type][id].own;
  clothesSet[type][id].own = checked;
  //$('#' + type + id)[0].checked = checked;
  $('#clickable-' + type + id).toggleClass('own');
  saveAndUpdate();
}

function clickableTd(piece) {
  var name = piece.name;
  var type = piece.type.mainType;
  var id = piece.id;
  var own = piece.own;
  var deps = piece.getDeps('');
  var tooltip = '';
  var cls = 'name';
  if (deps && deps.length > 0) {
    tooltip = "tooltip='" + deps + "'";
    if (deps.indexOf('(缺)') > 0) {
      cls += ' deps';
    }
  }
  cls += own ? ' own' : '';
  return "<td id='clickable-" + (type + id) + "' class='" + cls
      + "'><a href='#dummy' class='button' " + tooltip
      + "onClick='toggleInventory(\"" + type + "\",\"" + id + "\")'>"
      + name + "</a></td>";
}

function row(piece, isShoppingCart) {
  //var ret = isShoppingCart ? "" : td(inventoryCheckbox(piece.type.mainType, piece.id, piece.own), "");
  var ret = "";
  if (!isFilteringMode) {
    ret += td(piece.tmpScore);
  }
  if (isShoppingCart) {
    ret += td(piece.name, '');
  } else {
    ret += clickableTd(piece);
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
    if (isShoppingCart) {
      $('#' + div).html("<table><thead></thead><tbody></tbody></table>");
    } else {
      $('#' + div).html("<table class='mainTable'><thead></thead><tbody></tbody></table>");
    }
  }
  $('#' + div + ' table thead').html(thead(isShoppingCart, !isFilteringMode));
  $('#' + div + ' table tbody').html(list(data, isShoppingCart));
  if (!isShoppingCart) {
    $('span.paging').html("<button class='destoryFloat'></button>");
    redrawThead();
    $('button.destoryFloat').click(function() {
      //var $label = $(this);
      if (global.floating) {
        //$label.text('打开浮动');
        global.float.floatThead('destroy');
        global.floating = false;
      } else {
        //$label.text('关闭浮动');
        global.floating = true;
        global.float.floatThead({
          useAbsolutePositioning: false
        });
      }
      redrawThead();
    });
  }
  if (global.floating) {
    $('#clothes table').floatThead('reflow');
  }
}

function redrawThead() {
  $('button.destoryFloat').text(global.floating ? '关闭浮动' : '打开浮动');
  $('th.top').html(global.floating ? "<a href='#filtersTop'>回到顶部</a>" : "");
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
  tagToBonus(criteria, 'tag1');
  tagToBonus(criteria, 'tag2');
  if (global.additionalBonus && global.additionalBonus.length > 0) {
    criteria.bonus = global.additionalBonus;
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

function tagToBonus(criteria, id) {
  var tag = $('#' + id).val();
  var bonus = null;
  if (tag.length > 0) {
    var base = $('#' + id + 'base :selected').text();
    var weight = parseFloat($('#' + id + 'weight').val());
    if ($('input[name=' + id + 'method]:radio:checked').val() == 'replace') {
      bonus = replaceScoreBonusFactory(base, weight, tag)(criteria);
    } else {
      bonus = addScoreBonusFactory(base, weight, tag)(criteria);
    }
    if (!criteria.bonus) {
      criteria.bonus = [];
    }
    criteria.bonus.push(bonus);
  }
}

function clearTag(id) {
  $('#' + id).val('');
  $('#' + id + 'base').val('SS');
  $('#' + id + 'weight').val('1');
  $('input[name=' + id + 'method]:radio').get(0).checked = true;
}

function bonusToTag(idx, info) {
  $('#tag' + idx).val(info.tag);
  if (info.replace) {
    $('input[name=tag' + idx + 'method]:radio').get(1).checked = true;
  } else {
    $('input[name=tag' + idx + 'method]:radio').get(0).checked = true;
  }
  $('#tag' + idx + 'base').val(info.base);
  $('#tag' + idx + 'weight').val(info.weight);
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
    if (currentLevel.additionalBonus) {
      for (var i in currentLevel.additionalBonus) {
        var bonus = currentLevel.additionalBonus[i];
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
  if (isFilteringMode && criteria.bonus) {
    var matchedTag = false;
    for (var i in criteria.bonus) {
      if (tagMatcher(criteria.bonus[i].tagWhitelist, c)) {
        matchedTag = true;
        break;
      }
    }
    if (!matchedTag) {
      return false;
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
    $(".tagContainer").hide();
  } else {
    $("#theme").show();
    $("#tagInfo").show();
    $(".tagContainer").show();
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
  currentLevel = null;
  global.additionalBonus = null;
  for (var i in dropdown.options) {
    if (dropdown.options[i].selected) {
      var theme = dropdown.options[i].value;
      if (allThemes[theme]) {
        setFilters(allThemes[theme]);
        break;
      }
    }
  }
  onChangeCriteria();
}

var currentLevel; // used for post filtering.
function setFilters(level) {
  currentLevel = level;
  global.additionalBonus = currentLevel.additionalBonus;
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
  clearTag('tag1');
  clearTag('tag2');
  if (level.bonus) {
    for (var i in level.bonus) {
      bonusToTag(parseInt(i)+1, level.bonus[i]);
    }
  }
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
  calcDependencies();
  drawFilter();
  drawTheme();
  drawImport();
  changeMode(true);
  switchCate(category[0]);
  updateSize(mine);
  refreshShoppingCart();

  global.float = $('table.mainTable');
  global.float.floatThead({
    useAbsolutePositioning: false
  });
}
$(document).ready(function() {
  init()
});
