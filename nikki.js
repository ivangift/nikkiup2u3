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

var global = {
  float: null,
  floating: true,
  isFilteringMode: true,
  boostType: 1,
};

// for table use
function thead(isShoppingCart, score) {
  var ret = "<tr>";
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
  refreshShoppingCart(null, null);
  refreshRanking();
}

function removeShoppingCart(type) {
  shoppingCart.remove(type);
  refreshShoppingCart(null, null);
  refreshRanking();
}

function clearShoppingCart() {
  shoppingCart.clear();
  refreshShoppingCart(null, null);
  refreshRanking();
}

function toggleInventory(type, id) {
  var checked = !clothesSet[type][id].own;
  clothesSet[type][id].own = checked;
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
  var ret = "";
  if (!global.isFilteringMode) {
    ret += td(/*piece.tmpScore*/piece.totalScore);
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
  if (rating.charAt(0) == '-') {
    return rating.substring(1);
  }
  return rating;
}

function getStyle(rating) {
  if (rating.charAt(0) == '-') {
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
      $('#' + div).html("<table id='cartTable'><thead></thead><tbody></tbody></table>");
    } else {
      $('#' + div).html("<table class='mainTable'><thead></thead><tbody></tbody></table>");
    }
  }
  $('#' + div + ' table thead').html(thead(isShoppingCart, !global.isFilteringMode));
  $('#' + div + ' table tbody').html(list(data, isShoppingCart));
  if (isShoppingCart) {
    if (global.boostType == 1) {
      $("#cartTable").removeClass("warning");
    } else {
      $("#cartTable").addClass("warning");
    }
  } else {
    $('span.paging').html("<button class='destoryFloat'></button>");
    redrawThead();
    $('button.destoryFloat').click(function() {
      if (global.floating) {
        global.float.floatThead('destroy');
        global.floating = false;
      } else {
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
  if (!global.isFilteringMode) {
    refreshBoost(criteria);
    setBoost(criteria, global.boostType);
  }
  calculateScore(criteria);
}

function changeBoost(boostType) {
  var criteria = {};
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
  if (boostType == 1) {
    $("#accessoriesPanel").show();
    $("#accessoriesWarning").hide();
  } else {
    $("#accessoriesPanel").hide();
    $("#accessoriesWarning").show();
  }
  shoppingCart.clear();
  setBoost(criteria, boostType);
  calculateScore(criteria);
}

function setBoost(criteria, boostType) {
  global.boostType = boostType;
  $(".boost").text("");
  switch(global.boostType) {
    case 2: // global
      criteria.boost1 = global.extreme.boost1;
      criteria.boost2 = global.extreme.boost2;
      $("#" + criteria.boost1 + "Boost").text("<-暖暖的微笑");
      $("#" + criteria.boost2 + "Boost").text("<-迷人飞吻+暖暖的微笑");
      shoppingCart.clear();
      if (global.extreme.shoppingCart) {
        for (var i in global.extreme.shoppingCart.cart) {
          shoppingCart.put(global.extreme.shoppingCart.cart[i][2]);
        }
      }
      break;
    case 3: // own
      criteria.boost1 = global.extremeOwn.boost1;
      criteria.boost2 = global.extremeOwn.boost2;
      $("#" + criteria.boost1 + "Boost").text("<-暖暖的微笑");
      $("#" + criteria.boost2 + "Boost").text("<-迷人飞吻+暖暖的微笑");
      shoppingCart.clear();
      if (global.extremeOwn.shoppingCart) {
        for (var i in global.extremeOwn.shoppingCart.cart) {
          shoppingCart.put(global.extremeOwn.shoppingCart.cart[i][2]);
        }
      }
      break;
    default:
      criteria.boost1 = null;
      criteria.boost2 = null;
  }
}

function refreshBoost(criteria) {
  var totalMax = 0;
  var totalOwnMax = 0;
  var totalConfig = {};
  var totalOwnConfig = {};
  criteria.boost1 = null;
  criteria.boost2 = null;
  calcClothes(criteria);
  for (var i in FEATURES) {
    for (var j in FEATURES) {
      if (i == j) {
        continue;
      }
      var b1 = FEATURES[i];
      var b2 = FEATURES[j];
      var total = MaxTable();
      var totalOwn = MaxTable();
      for (var cate in clothesRanking) {
        var currentTop = 0;
        var currentTopOwn = 0;
        for (var k in clothesRanking[cate]) {
          var c = clothesRanking[cate][k];
          if (c.tmpScore * 1.778 < currentTopOwn) {
            // short cut, no hope to become the new winner
            break;
          }
          var score = c.boost(b1, b2);
          currentTop = total.put(c, cate, score[0], score[1]);
          if (c.own) {
            currentTopOwn = totalOwn.put(c, cate, score[0], score[1]);
          }
        }
      }

      total.decide();
      totalOwn.decide();

      if (total.total() > totalMax) {
        totalMax = total.total();
        totalConfig.boost1 = b1;
        totalConfig.boost2 = b2;
        totalConfig.shoppingCart = total;
      }
      if (totalOwn.total() > totalOwnMax) {
        totalOwnMax = totalOwn.total();
        totalOwnConfig.boost1 = b1;
        totalOwnConfig.boost2 = b2;
        totalOwnConfig.shoppingCart = totalOwn;
      }
    }
  }
  global.extreme = totalConfig;
  global.extremeOwn = totalOwnConfig;
}


function byFirst(a, b) {
  return b[0] - a[0];
}

function MaxTable() {
  return {
    cart: {},
    put: function(c, category, baseScore, bonusScore) {
      if (score == 0) {
        return 0;
      }
      var total = baseScore + bonusScore;
      if (!this.cart[category]) {
        this.cart[category] = [total, bonusScore, c];
      } else {
        var otherTotal = this.cart[category][0];
        if ((c.type.mainType == "饰品" && accScore(total, bonusScore, 20) > accScore(otherTotal, this.cart[category][1], 20))
            || (c.type.mainType != "饰品" && total > otherTotal)) {
          this.cart[category][0] = total;
          this.cart[category][1] = bonusScore;
          this.cart[category][2] = c;
        }
      }
      return this.cart[category][0];
    },
    decide: function() {
      if (this.cart['连衣裙'] && this.cart['上衣'] && this.cart['下装']) {
        if (this.cart['连衣裙'][0] > this.cart['上衣'][0] + this.cart['下装'][0]) {
          delete this.cart['上衣'];
          delete this.cart['下装'];
        } else {
          delete this.cart['连衣裙'];
        }
      }
    },
    total: function() {
      var sum = 0;
      var sumAcc = 0;
      var bonusAcc = 0;
      var numAcc = 0;
      for (var i in this.cart) {
        var c = this.cart[i][2].type.mainType;
        if (c == "饰品") {
          sumAcc += this.cart[i][0];
          bonusAcc += this.cart[i][1];
          numAcc ++;
        } else {
          sum += this.cart[i][0];
        }
      }
      return sum + accScore(sumAcc, bonusAcc, numAcc);
    }
  };
}

function decide(cart) {
  if (cart.getScore('连衣裙') > cart.getScore('上衣') + cart.getScore('下装')) {
    delete cart.cart['上衣'];
    delete cart.cart['下装'];
  } else {
    delete cart.cart['连衣裙'];
  }
}

function calculateScore(criteria) {
  if (!global.isFilteringMode) {
    calcClothes(criteria);
    if ($('#accessoriesHelper')[0].checked && global.boostType == 1) {
      chooseAccessories();
    } else {
      refreshShoppingCart(criteria.boost1, criteria.boost2);
    }
  }
  refreshTable(criteria);
  refreshRanking();
}

function calcClothes(criteria) {
  for (var i in clothes) {
    clothes[i].calc(criteria);
  }
  for (var i in clothesRanking) {
    clothesRanking[i].sort(byScore);
  }
}

function tagToBonus(criteria, id) {
  var tag = $('#' + id).val();
  var bonus = null;
  if (tag.length > 0) {
    var base = $('#' + id + 'base :selected').text();
    var weight = parseFloat($('#' + id + 'weight').val());
    bonus = addScoreBonusFactory(base, weight, tag)(criteria);
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
  refreshTable(criteria);
}

function refreshTable(criteria) {
  drawTable(filtering(criteria, uiFilter), "clothes", false, null);
}

function chooseAccessories() {
  var accCate = CATEGORY_HIERARCHY['饰品'];
  for (var i in accCate) {
    shoppingCart.remove(accCate[i]);
  }
  shoppingCart.putAll(filterTopAccessories(true));
  refreshShoppingCart(null, null);
}

function refreshShoppingCart(boost1, boost2) {
  shoppingCart.calc(boost1, boost2);
  drawTable(shoppingCart.toList(byCategoryAndScore), "shoppingCart", true);
}

function byCategoryAndScore(a, b) {
  var cata = category.indexOf(a.type.type);
  var catb = category.indexOf(b.type.type);
  return (cata - catb == 0) ? byScore(a, b) : cata - catb;
}

function byScore(a, b) {
  return b.totalScore - a.totalScore == 0 ? byId(a, b) : b.totalScore - a.totalScore;
}

function byId(a, b) {
  var ida = parseInt(a.id);
  var idb = parseInt(b.id);
  return ida - idb;
}

function byBonusScore(a, b) {
  return accScore(b.totalScore, b.totalBonus, 20) - accScore(a.totalScore, a.totalBonus, 20);
}

function filterTopAccessories(own) {
  var accCate = CATEGORY_HIERARCHY['饰品'];
  var toSort = [];
  for (var i in accCate) {
    var cate = accCate[i]
    for (var j in clothesRanking[cate]) {
      if ((own && clothesRanking[cate][j].own) || !own) {
        toSort.push(clothesRanking[cate][j]);
        break;
      }
    }
  }

  toSort.sort(byBonusScore);
  var total = 0;
  var totalBonus = 0;
  var maxTotal = 0;
  var maxIdx = -1;
  for (var i = 0; i < toSort.length; i++) {
    total += toSort[i].tmpScore;
    totalBonus += toSort[i].tmpBonus;
    realScore = accScore(total, totalBonus, i+1);
    if (maxTotal  < realScore) {
      maxTotal = realScore;
      maxIdx = i;
    }
  }
  return toSort.slice(0, maxIdx+1);
}

function filtering(criteria, filters) {
  var result = [];
  for (var i in clothes) {
    if (matches(clothes[i], criteria, filters)) {
      result.push(clothes[i]);
    }
  }
  if (global.isFilteringMode) {
    result.sort(byId);
  } else {
    result.sort(byCategoryAndScore);
  } 
  return result;
}

function matches(c, criteria, filters) {
  // only filter by feature when filtering
  if (global.isFilteringMode) {
    for (var i in FEATURES) {
      var f = FEATURES[i];
      if (criteria[f] && criteria[f] * c[f][2] < 0) {
        return false;
      }
    }
  }
  if (global.isFilteringMode && criteria.bonus) {
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
  refreshTable(criteria);
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

function changeMode(isFiltering) {
  for (var i in FEATURES) {
    var f = FEATURES[i];
    if (isFiltering) {
      $('#' + f + 'WeightContainer').hide();
      $('#' + f + 'Boost').hide();
    } else {
      $('#' + f + 'WeightContainer').show();
      $('#' + f + 'Boost').show();
    }
  }
  if (isFiltering) {
    $("#theme").hide();
    $(".tagContainer").hide();
    $("#summary").hide();
  } else {
    $("#theme").show();
    $(".tagContainer").show();
    $("#summary").show();
  }
  global.isFilteringMode = isFiltering;
  onChangeCriteria();
}

function changeFilter() {
  $("#theme")[0].options[0].selected = true;
  currentLevel = null;
  $("#drawSkill").empty();
  onChangeCriteria();
}

function changeTheme() {
  currentLevel = null;
  global.additionalBonus = null;
  var theme = $("#theme").val();
  if (allThemes[theme]) {
    setFilters(allThemes[theme]);
    drawSkill(allThemes[theme].name);
  }
  onChangeCriteria();
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

function drawSkill(currentLevel) {
  var variations = ['', '少', '公'];
  $("#skills").empty();
  for (var i in variations) {
    var s = currentLevel + variations[i];
    if (npc[s]) {
      var $section = $("<div>");
      $section.html("<b>" + s +"</b>&nbsp;对方技能：");
      var dummySkill = PlayerSkill();
      for (var i in npc[s]) {
        dummySkill.put(skillSet[npc[s][i]]);
        $section.append(npc[s][i] + "&nbsp;&nbsp;");
      }
      var suggestion = skillSuggestion(dummySkill.skills);
      var plan = [];
      for (var i in suggestion) {
        plan.push(suggestion[i].name);
      }
      $section.append("<br/>&nbsp;&nbsp;无伤技能顺序: ");
      $section.append(plan.join("&nbsp;&nbsp;"));
      $section.append("&nbsp;&nbsp;<a href='../nikkisim/index.html#npc=" + s + "&skills=" + plan.join(",") + "' target='_blank'>计算概率</a>");
      $("#skills").append($section);
    }
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
    refreshTable(criteria);
    clearImport();
  }
}

function refreshRanking() {
  $("#ranking").empty();
  if (!global.isFilteringMode) {
    $("#ranking").html("<table id='rankingTableMain' class='ranking'><tbody></tbody></table>");
    $("#ranking").append("<hr style='border-top:dashed 1px #999'>");
    $("#ranking").append("<table id='rankingTableAcc' class='ranking'><tbody></tbody></table>");
    for (var i in category) {
      var cate = category[i];
      var cateName = cate;
      if (cate.indexOf('-') >= 0) {
        cateName = cate.split('-')[1];
      }
      var tr = $("<tr>");
      tr.append("<td class='category'>【" + cateName + "】</td>");
      var ranking = $("<td>");
      for (var i = 0; i < 5; i++) {
        var x = renderRanking(cate, i);
        if (x) {
          ranking.append(x);
        } else {
          break;
        }
      }
      if (clothesRanking[cate].length > 5) {
        ranking.append(moreLink(cate));
      }
      tr.append(ranking);
      if (cate.indexOf("饰品")>=0) {
        $("#rankingTableAcc tbody").append(tr);
      } else {
        $("#rankingTableMain tbody").append(tr);
      }
    }
  }
}

function renderRanking(cate, ranking) {
  if (clothesRanking[cate].length > ranking) {
    var c = clothesRanking[cate][ranking];
    var cls = "";
    if (shoppingCart.contains(c)) {
      cls = "class='blue'";
    } else if (ranking == 0 || c.totalScore == clothesRanking[cate][0].totalScore)  {
      cls = "class='red'";
    }
    var ret = "<span " + cls + ">" + c.name + "(" + c.source.compact() + c.totalScore + ")" + "</span>";
    if (ranking > 0) {
      if (clothesRanking[cate][ranking].totalScore < clothesRanking[cate][ranking-1].totalScore) {
        ret = "<span>&gt;<span>" + ret;
      } else {
        ret = "<span>=<span>" + ret;
      }
    }
    return $(ret);
  } else {
    return null;
  }
}

function moreLink(cate) {
  var link = $("<span class='more'>&nbsp;| More...</a>");
  link.attr("num", 5);
  link.click(function() {
    var num = parseInt($(this).attr("num"));
    for (var i = 0; i < 5; i++) {
      var x = renderRanking(cate, num+i);
      if (x) {
        x.insertBefore($(this));
      } else {
        break;
      }
    }
    if (clothesRanking[cate].length > num + 5) {
      link.attr("num", num + 5);
    } else {
      $(this).remove();
    }
  });
  return link;
}

function setupSearch() {
  $('#searchitem').autoComplete({
    minChars: 1,
    cache: false,
    source: function(term, suggest){
      var matches = [];
      for (var i in clothes) {
        if (clothes[i].name.indexOf(term) >= 0 || clothes[i].id.indexOf(term) >= 0) {
          matches.push(clothes[i]);
        }
        if (matches.length > 10) {
          break;
        }
      }
      suggest(matches);
    },
    renderItem: function (item, search) {
      return "<div class='autocomplete-suggestion' data-type='" + item.type.mainType + "' data-id='" + item.id + "'>"
          + item.type.type + " " + item.id + " " + item.name + "</div>";
    },
    onSelect: function(e, term, item){
      addShoppingCart(item.data('type'), item.data('id'));
    }
  });
}

function init() {
  var mine = loadFromStorage();
  calcDependencies();
  drawFilter();
  drawTheme();
  drawImport();
  changeMode(false);
  switchCate(category[0]);
  updateSize(mine);
  setupSearch();
  refreshShoppingCart(null, null);

  global.float = $('table.mainTable');
  global.float.floatThead({
    useAbsolutePositioning: false
  });
  $("#summary").collapse({});
}
$(document).ready(function() {
  init()
});
