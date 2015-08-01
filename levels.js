// Ivan's Workshop
var competitionsRaw = {
  '冬天里的一把火': '华丽 活泼 保暖 可爱 性感',
  '圣诞家庭聚会': '清纯 活泼 可爱 简约 保暖',
  '海边派对的搭配': '性感 可爱 清凉 活泼 简约',
  '大侦探福尔摩斯': '简约 优雅 保暖 清纯 成熟',
  '办公室明星': '性感 优雅 简约 成熟 清凉',
  '奇幻童话园': '华丽 优雅 可爱 清纯 清凉',
  '女王大人': '华丽 优雅 清凉 成熟 性感',
  '金色音乐厅': '华丽 优雅 性感 成熟 保暖',
  '夏季游园会': '简约 活泼 可爱 清纯 清凉',
  '有女初长成': '简约 优雅 保暖 成熟 清纯',
  '宫廷歌舞会': '华丽 优雅 成熟 性感 保暖',
  '运动进行时': '简约 清纯 活泼 可爱 清凉',
  '春天在哪里': '简约 活泼 可爱 清凉 清纯',
  '夏日物语': '简约 优雅 可爱 清纯 清凉',
  '穿越进行时': '优雅 简约 清纯 保暖 成熟',
  '艳阳当空照': '简约 优雅 清凉 可爱 清纯',
  '年轻的春游': '简约 活泼 可爱 清纯 清凉',
  '清秀佳人': '简约 优雅 可爱 清纯 清凉',
  '绝色无双': '华丽 优雅 成熟 清纯 保暖'
};

function parseCriteria(criteria) {
  var cs = criteria.split(" ");
  var ret = {};
  for (var i in cs) {
    switch (cs[i]) {
      case '简约': ret['simple'] = 1; break;
      case '华丽': ret['simple'] = -1; break;
      case '可爱': ret['cute'] = 1; break;
      case '成熟': ret['cute'] = -1; break;
      case '活泼': ret['active'] = 1; break;
      case '优雅': ret['active'] = -1; break;
      case '清纯': ret['pure'] = 1; break;
      case '性感': ret['pure'] = -1; break;
      case '清凉': ret['cool'] = 1; break;
      case '保暖': ret['cool'] = -1; break;
    }
  }
  return ret;
}

// all data are presented in order "simple", "cute", "active", "pure", "cool"
// be careful when you copy it, levels in chapter 7 are stubs only
var levelsRaw = {
  '1-1': [1, 2, 3, 2, 1],
  '1-2': [3, 1.5, -3, 3, -1],
  '1-3': [-2, -1, -3, 2, 1],
  '1-4': [2, -3, -2, -1, -1],
  '1-5': [-1, 3, 2, -2, 1],
  '1-6': [2, 1, -2, 3, 1],
  '1-7': [3, -2, -2, 1, 1],
  '1-8': [-1, -2, -2, -3, 1],
  '1-9': [-1, -2, 2, -3, 1],
  '2-1': [-2, 3, 1, 2, 1],
  '2-2': [3, 1, 2, 2, -1],
  '2-3': [2, -2, -3, -1, -1],
  '2-4': [1, 2, 1, 2, -3],
  '2-5': [2, -2, 3, 1, -1],
  '2-6': [-1, 3, -2, 2, 1],
  '2-7': [1, 2, 2, 1, -3],
  '2-8': [-2, 2, -2, 2, 1],
  '2-9': [-3, -2, -2, -1, 1],
  '2-支1': [-3, -2, -2, -1, -1],
  '2-支2': [2, -2, -3, 1, 1],
  '3-1': [2, -1, -3, 2, 1],
  '3-2': [-4, -1, 2, -2, 1],
  '3-3': [2, -3, -2, 1, -1],
  '3-4': [2, 1, -2, 3, 1],
  '3-5': [2, 1, 3, 1, 2],
  '3-6': [2, 2, 1, -1, 3],
  '3-7': [-2, 2, -2, 1, 1],
  '3-8': [2, 1, 3, 1, 2],
  '3-9': [2, -1, -2, -3, 1],
  '3-10': [-1, 3, 2, 2, 1],
  '3-11': [-3, -2, -2, -2, 1],
  '3-12': [2, 1, 3, 1, -2],
  '3-支1': [-3, -2, -2, 1, -1],
  '3-支2': [-3, -1, -2, -1, 2],
  '4-1': [3, 1, 2, 1, -3],
  '4-2': [0.2, 3, 0.2, 3, 0.2],
  '4-3': [0.2, -3, 0.2, -3, 0.2],
  '4-4': [1, 2, -2, 3, 1],
  '4-5': [2, -1, 2, 1, 3],
  '4-6': [-1, -2, -3, -2, -1],
  '4-7': [-3, -1, -2, 2, -1],
  '4-8': [3, 2, 2, -1, 1],
  '4-9': [2, -1, -3, 2, 1],
  '4-10': [1, 2, 3, 2, 1],
  '4-11': [2, -2, -3, -1, 1],
  '4-12': [2, 3, 3, -2, 1],
  '4-支1': [-1, 3, 2, 2, 1],
  '4-支2': [3, 2, 2, 1, 1],
  '4-支3': [2, 2, 3, -1, -1],
  '5-1': [2, 1, 3, 1, 2],
  '5-2': [3, -2, -2, 1, 1],
  '5-3': [-3, -2, -2, 1, 1],
  '5-4': [-2, -1, -2, -3, 2],
  '5-5': [-3, 2, -2, 1, 1],
  '5-6': [3, 1, -2, 2, -1],
  '5-7': [-1, 1, 2, 2, 1],
  '5-8': [2, -1, -2, 1, -3],
  '5-9': [-3, -2, -2, -1, 1],
  '5-10': [-3, 2, -2, 1, 1],
  '5-11': [2, -1, 3, -2, 1],
  '5-12': [2, 1, -3, 2, -1],
  '5-支1': [1, 2, -1, 2, -3],
  '5-支2': [2, 2, 1, 3, 1],
  '5-支3': [2, 1, -3, -2, 1],
  '6-1': [-2, 3, 1, 2, -1],
  '6-2': [2, -1, -3, 2, 1],
  '6-3': [-1, 2, -1, 3, 2],
  '6-4': [2, 3, 2, 1, -1],
  '6-5': [-2, 3, 2, 1, 1],
  '6-6': [3, 1, 2, 2, 1],
  '6-7': [-1, 3, 2, 2, 1],
  '6-8': [1, -1, -3, -2, 2],
  '6-9': [-1, -2, -3, -2, 1],
  '6-10': [-1, 2, -1, 1, -1],
  '6-11': [2, -1, -3, 2, 1],
  '6-支1': [-2, -2, -1, -3, 1],
  '6-支2': [-1, 2, 2, 1, 3],
  '6-支3': [-2, -1, 2, -3, 1],
  '7-1': [2, -2.5, -3, -2, 1.5],
  '7-2': [-3, -2, -3, 3, -2],
  '7-3': [3, -2.5, 2, -3, 3],
  '7-4': [-1.25, -2, -2, 1.5, -1],
  '7-5': [3, 2, 3, 2, 2],
  '7-6': [-2, -1, -2, 1.5, 1.5],
  '7-7': [-1.8, -1.8, -1.2, -1.2, 0.6],
  '7-8': [2, -1.34, 2, -1.34, 0.66],
  '7-9': [2, -3, 1.5, 2, -3],
  '7-支1': [2, -3, -3, 2, 2],
  '7-支2': [2, 3, -3, 2, 1.5],
  '7-支3': [1, -1, 1, -1, 1],
  '7-支4': [1, 1, -1, 1, 1],
  '7-支5': [1, 1, 1, 1, 1]
};

function tagMatcher(whitelist, clothes) {
  for (var i in clothes.tags) {
    var tag = clothes.tags[i];
    if (tag.length > 0 && whitelist.indexOf(tag) >= 0) {
      return true;
    }
  }
  return false;
}

function nameMatcher(whitelist, clothes) {
  var names = whitelist.split('/');
  for (var i in names) {
    if (clothes.name.indexOf(names[i]) >= 0) {
      return true;
    }
  }
  return false;
}

function weightedFilter(tagWhitelist, nameWhitelist, weight) {
  return {
    tagWhitelist: tagWhitelist,
    nameWhitelist: nameWhitelist,
    filter: function(clothes) {
      if (tagWhitelist && tagMatcher(tagWhitelist, clothes)) {
        return;
      }
      if (nameWhitelist && nameMatcher(nameWhitelist, clothes)) {
        return;
      }
      clothes.tmpScore /= weight;
    }
  }
}

function normalFilter(tagWhitelist, nameWhitelist) {
  return weightedFilter(tagWhitelist, nameWhitelist, 10);
}

function noOp() {
  return {
    filter: function() {
      return;
    }
  };
}

// Note: filters decides which clothes will be penalized (usually 1/10 of the score)
// Only applicable to dresses, coats, tops and bottoms
var levelFilters = {
  '1-1': noOp(),
  '1-2': noOp(),
  '1-3': normalFilter("中式古典/中式现代/旗袍/民国服饰"),
  '1-4': noOp(),
  '1-5': noOp(),
  '1-6': noOp(),
  '1-7': normalFilter("中性风"),
  '1-8': noOp(),
  '1-9': noOp(),
  '2-1': noOp(),
  '2-2': noOp(),
  '2-3': noOp(),
  '2-4': noOp(),
  '2-5': noOp(),
  '2-6': normalFilter("和风"),
  '2-7': normalFilter("睡衣"),
  '2-8': noOp(),
  '2-9': normalFilter("欧式古典/晚礼服/女神系/波西米亚"),
  '2-支1': normalFilter(""), // TODO: check
  '2-支2': normalFilter("中性风"),
  '3-1': normalFilter("英伦", "名媛连衣裙"),
  '3-2': normalFilter("摇滚风"),
  '3-3': noOp(),
  '3-4': normalFilter("森女系列"),
  '3-5': normalFilter("运动系", "运动"),
  '3-6': weightedFilter("沐浴/和风", null, 160),
  '3-7': normalFilter("运动系"), // TODO: double check
  '3-8': noOp(),
  '3-9': normalFilter("侠客联盟/摇滚风"),
  '3-10': noOp(),
  '3-11': normalFilter("欧式古典/晚礼服/女神系/波西米亚"),
  '3-12': noOp(),
  '3-支1': normalFilter("欧式古典/晚礼服/女神系/波西米亚"),
  '3-支2': normalFilter("婚纱"),
  '4-1': noOp(),
  '4-2': weightedFilter("泳装", null, 32),
  '4-3': weightedFilter("泳装", null, 32),
  '4-4': noOp(),
  '4-5': noOp(),
  '4-6': normalFilter("OL"),
  '4-7': normalFilter("欧式古典/晚礼服/女神系/波西米亚"),
  '4-8': normalFilter("医务使者"),
  '4-9': normalFilter("中式古典/中式现代/旗袍/民国服饰"),
  '4-10': noOp(),
  '4-11': noOp(),
  '4-12': normalFilter("兔女郎"),
  '4-支1': noOp(),
  '4-支2': normalFilter("围裙"),
  '4-支3': normalFilter("围裙"),
  '5-1': normalFilter("运动系", "运动"),
  '5-2': noOp(),
  '5-3': noOp(),
  '5-4': normalFilter(null, "鬼姬冥花/枫女忍"),
  '5-5': noOp(),
  '5-6': normalFilter("民国服饰"),
  '5-7': normalFilter("波西米亚"),
  '5-8': noOp(),
  '5-9': noOp(),
  '5-10': noOp(),
  '5-11': normalFilter("侠客联盟"),
  '5-12': normalFilter("中式古典/中式现代/旗袍/民国服饰"),
  '5-支1': noOp(),
  '5-支2': normalFilter("运动系"), // TODO: double check,
  '5-支3': normalFilter("医务使者"),
  '6-1': noOp(),
  '6-2': normalFilter("中式古典/中式现代/旗袍/民国服饰"),
  '6-3': normalFilter("和风"),
  '6-4': noOp(),
  '6-5': noOp(),
  '6-6': normalFilter("中性风"),
  '6-7': noOp(),
  '6-8': normalFilter("中式现代/泳装"),
  '6-9': normalFilter("旗袍"),
  '6-10': normalFilter("中式现代/冬装"),
  '6-11': normalFilter("中式古典/中式现代/旗袍/民国服饰"),
  '6-支1': noOp(), // Not tested yet, not eligible for this level yet
  '6-支2': noOp(), // Not tested yet, not eligible for this level yet
  '6-支3': noOp(), // Not tested yet, not eligible for this level yet
  '7-1': noOp(),
  '7-2': noOp(),
  '7-3': noOp(),
  '7-4': noOp(),
  '7-5': noOp(),
  '7-6': noOp(),
  '7-7': noOp(),
  '7-8': noOp(),
  '7-9': noOp(),
  '7-支1': noOp(),
  '7-支2': noOp(),
  '7-支3': noOp(),
  '7-支4': noOp(),
  '7-支5': noOp(),
  '仲夏夜之梦1': noOp(),
  '仲夏夜之梦2': noOp(),
  '仲夏夜之梦3': noOp(),
  '仲夏夜之梦4': noOp(),
  '仲夏夜之梦5': noOp()
};

function abstractBonusFactory(note, replace, param, tagWhitelist, nameWhitelist, callback) {
  return function(criteria) {
    return {
      tagWhitelist: tagWhitelist,
      nameWhitelist: nameWhitelist,
      note: note,
      replace: replace,
      param: param,
      filter: function(clothes) {
        if ((tagWhitelist && tagMatcher(tagWhitelist, clothes))
            || (nameWhitelist && nameMatcher(nameWhitelist, clothes))) {
          return callback(criteria, clothes);
        }
        return 0;
      }
    }
  };
}

function featureBasedScoringFactory(bonus, multiplier){
  return function(criteria, clothes) {
    var total = 0;
    for (var i in FEATURES) {
      var f = FEATURES[i];
      total += Math.abs(criteria[f] * clothes.type.score[bonus] * multiplier);
    }
    return total;
  }
}

function addScoreBonusFactory(bonus, multiplier, tagWhitelist, nameWhitelist) {
  return abstractBonusFactory('各属性依权重加分', false, bonus + " * " + multiplier, tagWhitelist,
      nameWhitelist, featureBasedScoringFactory(bonus, multiplier));
}

function replaceScoreBonusFactory(bonus, multiplier, tagWhitelist, nameWhitelist) {
  return abstractBonusFactory('各属性均视为相符，且替换为', true, bonus + " * " + multiplier,
      tagWhitelist, nameWhitelist, featureBasedScoringFactory(bonus, multiplier));
}

function swimsuitFactory() {
  return abstractBonusFactory('仅可爱/成熟与清纯/性感依权重加分', false, 'SS', "泳装",
      null, function(criteria, clothes) {
        var total = 0;
        var onlyFeatures = ['cute', 'pure'];
        for (var i in onlyFeatures) {
          var f = onlyFeatures[i];
          total += Math.abs(criteria[f] * clothes.type.score['SS']);
        }
        return total;
  });
}

function specialFactory76A() {
  return abstractBonusFactory('华丽	成熟	优雅	清纯	清凉 分别按照权重增加', false, 'B, SS, B, C, C', "晚礼服",
      null, function(criteria, clothes) {
        var total = 0;
        total += Math.abs(criteria['simple'] * clothes.type.score['B']);
        total += Math.abs(criteria['cute'] * clothes.type.score['SS']);
        total += Math.abs(criteria['active'] * clothes.type.score['B']);
        total += Math.abs(criteria['pure'] * clothes.type.score['C']);
        total += Math.abs(criteria['cool'] * clothes.type.score['C']);
        return total;
  });
}

function specialFactory76B() {
  return abstractBonusFactory('华丽	成熟	优雅	清纯	清凉 分别按照权重增加', false, 'B, SS, B, C, C', "中式现代",
      null, function(criteria, clothes) {
        var total = 0;
        total += Math.abs(criteria['simple'] * clothes.type.score['B']);
        total += Math.abs(criteria['cute'] * clothes.type.score['SS']);
        total += Math.abs(criteria['active'] * clothes.type.score['B']);
        total += Math.abs(criteria['pure'] * clothes.type.score['C']);
        total += Math.abs(criteria['cool'] * clothes.type.score['C']);
        return total;
  });
}


/*
 * There are three major types of bonus:
 *  - Add a fixed number to each feature (weight applied)
 *  - Replace current clothes features to another one
 *  - Special rules
 */
var levelBonus = {
  "1-1": [],
  "1-2": [],
  "1-3": [addScoreBonusFactory('B', 0.25, "中式古典")],
  "1-4": [],
  "1-5": [],
  "1-6": [],
  "1-7": [addScoreBonusFactory('B', 0.25, "中性风")],
  "1-8": [],
  "1-9": [],
  "2-1": [],
  "2-2": [],
  "2-3": [],
  "2-4": [],
  "2-5": [],
  "2-6": [addScoreBonusFactory('B', 0.25, "和风")],
  "2-7": [replaceScoreBonusFactory('SS', 1, "睡衣")],
  "2-8": [],
  "2-9": [addScoreBonusFactory('B', 0.25, "欧式古典")],
  "2-支1": [],
  "2-支2": [addScoreBonusFactory('A', 1, "中性风")],
  "3-1": [addScoreBonusFactory('B', 0.25, "英伦", "名媛连衣裙")],
  "3-2": [addScoreBonusFactory('B', 1, "摇滚风")],
  "3-3": [],
  "3-4": [addScoreBonusFactory('B', 0.25, "森女系列")],
  "3-5": [],
  "3-6": [replaceScoreBonusFactory('SS', 1, '沐浴'), replaceScoreBonusFactory('S', 1, '和风')],
  "3-7": [],
  "3-8": [],
  "3-9": [addScoreBonusFactory('B', 0.25, "侠客联盟")],
  "3-10": [addScoreBonusFactory('B', 0.25, "小动物")],
  "3-11": [addScoreBonusFactory('B', 1, "欧式古典")],
  "3-12": [addScoreBonusFactory('B', 1, "运动系")],
  "3-支1": [addScoreBonusFactory('B', 1, "欧式古典")],
  "3-支2": [replaceScoreBonusFactory('SS', 1, '婚纱')],
  "4-1": [],
  "4-2": [swimsuitFactory()],
  "4-3": [swimsuitFactory()],
  "4-4": [],
  "4-5": [addScoreBonusFactory('B', 0.25, "防晒")],
  "4-6": [],
  "4-7": [],
  "4-8": [replaceScoreBonusFactory('S', 1, "医务使者")],
  "4-9": [addScoreBonusFactory('B', 1, "中式古典")],
  "4-10": [],
  "4-11": [],
  "4-12": [replaceScoreBonusFactory('SS', 1, "兔女郎")],
  "4-支1": [],
  "4-支2": [addScoreBonusFactory('B', 0.25, "围裙")],
  "4-支3": [addScoreBonusFactory('B', 0.25, "围裙")],
  "5-1": [],
  "5-2": [],
  "5-3": [],
  "5-4": [addScoreBonusFactory('SS', 1, null, "鬼姬冥花/枫女忍")],
  "5-5": [addScoreBonusFactory('A', 1, "女仆装")],
  "5-6": [],
  "5-7": [replaceScoreBonusFactory('SS', 1, "波西米亚")],
  "5-8": [],
  "5-9": [],
  "5-10": [],
  "5-11": [replaceScoreBonusFactory('SS', 1, "侠客联盟")],
  "5-12": [addScoreBonusFactory('SS', 1, "民国服饰")],
  "5-支1": [addScoreBonusFactory('B', 0.25, "冬装")],
  "5-支2": [],
  "5-支3": [replaceScoreBonusFactory('SS', 1, "医务使者")],
  "6-1": [addScoreBonusFactory('B', 0.25, "碎花")],
  "6-2": [addScoreBonusFactory('B', 0.25, "中式古典")],
  "6-3": [addScoreBonusFactory('B', 0.5, "和风")],
  "6-4": [],
  "6-5": [],
  "6-6": [],
  "6-7": [addScoreBonusFactory('S', 0.25, "中式现代")],
  "6-8": [replaceScoreBonusFactory('SS', 1, "泳装"), replaceScoreBonusFactory('B', 1, "中式现代")],
  "6-9": [addScoreBonusFactory('B', 1, "旗袍")],
  "6-10": [addScoreBonusFactory('SS', 1, "中式现代"), addScoreBonusFactory('S', 1, "冬装")],
  "6-11": [addScoreBonusFactory('B', 1, "中式古典")],
  "6-支1": [],
  "6-支2": [],
  "6-支3": [replaceScoreBonusFactory('A', 2, "舞者"), addScoreBonusFactory('A', 1, "印度服饰")], 
  '7-1': [],
  '7-2': [],
  '7-3': [],
  '7-4': [addScoreBonusFactory('B', 1, "中式古典")],
  '7-5': [],
  '7-6': [specialFactory76A(), specialFactory76B()],
  '7-7': [replaceScoreBonusFactory('SS', 1, "欧式古典"), replaceScoreBonusFactory('SS', 1, "晚礼服")],
  '7-8': [replaceScoreBonusFactory('S', 1, "中式古典"), replaceScoreBonusFactory('SS', 1, "侠客联盟")],
  '7-9': [addScoreBonusFactory('A', 1, "冬装")],
  '7-支1': [],
  '7-支2': [],
  '7-支3': [], // Not tested yet, not eligible for this level yet
  '7-支4': [], // Not tested yet, not eligible for this level yet
  '7-支5': [], // Not tested yet, not eligible for this level yet
  '仲夏夜之梦1': [addScoreBonusFactory('S', 1, "童话系")],
  '仲夏夜之梦2': [replaceScoreBonusFactory('SS', 1, "和风")],
  '仲夏夜之梦3': [],
  '仲夏夜之梦4': [replaceScoreBonusFactory('S', 1, "摇滚风")],
  '仲夏夜之梦5': [replaceScoreBonusFactory('S', 1, "睡衣"), replaceScoreBonusFactory('A', 1, "小动物")]
};

function parseCriteriaList(criteria) {
  return {
    'simple': criteria[0],
    'cute': criteria[1],
    'active': criteria[2],
    'pure': criteria[3],
    'cool': criteria[4]
  }
}

function level(name, criteria) {
  var filter = null;
  if (levelFilters[name]) {
    filter = levelFilters[name];
  }
  var bonusFilter = [];
  if (levelBonus[name]) {
    for (var i in levelBonus[name]) {
      bonusFilter.push(levelBonus[name][i](criteria));
    }
  }
  return {
    name: name, // useful?
    weight: criteria,
    filter: filter,
    bonus: bonusFilter
  }
}

allThemes = function() {
  var ret = {};
  for (var theme in competitionsRaw) {
    var criteria = competitionsRaw[theme];
    ret['评选赛: ' + theme] = level(theme, parseCriteria(criteria));
  }
  for (var theme in levelsRaw) {
    var criteria = levelsRaw[theme];
    ret['关卡: ' + theme] = level(theme, parseCriteriaList(criteria));
  }
  return ret;
}();
