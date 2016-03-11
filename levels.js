// Ivan's Workshop
var competitionsRaw = {
  '海边派对的搭配': [0.67, 1.33, 1.0, -1.33, 1.33],
  '春天在哪里': [0.67, 1.33, 1.33, 1.33, 1.0],
  '办公室明星': [1.33, -1.33, -1.33, -1.0, 0.67],
  '夏日物语': [1.33, 0.67, -1.33, 1.0, 1.33],
  '圣诞家庭聚会': [1.33, 1.0, 0.67, 1.33, -1.33],
  '年轻的春游': [1.33, 1.33, 1.33, 1.0, 0.67],
  '运动进行时': [1.0, 0.67, 1.33, 1.33, 1.33],
  '金色音乐厅': [-1.33, -1.33, -1.33, -1.0, -0.67],
  '夏季游园会': [1.33, 1.0, 0.67, 1.33, 1.33],
  '女王大人': [-1.0, -1.33, -1.33, -1.33, 0.67],
  '冬天里的一把火': [-0.67, 1.0, 1.33, -1.33, -1.33],
  '大侦探福尔摩斯': [1.33, -1.33, -1.33, 0.67, -1.0],
  '宫廷歌舞会': [-1.33, -1.0, -1.33, -1.33, -0.67],
  '奇幻童话园': [-1.33, 1.33, -1.33, 1.0, 0.67],
  '有女初长成': [0.67, -1.33, -1.33, 1.33, -1.0],
  '绝色无双': [-1.33, -1.0, -1.33, 1.33, -0.67],
  '清秀佳人': [1.33, 0.67, -1.33, 1.33, 1.0]
};

var tasksRaw = {
  'g1-1': [0.47, 0.67, 0.47, 0.67, -0.47],
  'g1-2': [0.87, 0.67, 0.87, 0.67, 0.67],
  'g1-3': [0.8, 0.8, -0.8, 1.0, 1.0],
  'g1-4': [1.13, 1.33, 1.13, 1.13, -1.33],
  'g1-5': [-0.8, 0.8, -0.8, -0.73, 0.73],
  'g1-6': [-1.13, -1.13, -0.93, -0.93, 0.93],
  'g1-7': [-0.67, 0.47, 0.67, 0.47, -0.47],
  'g2-1': [-0.47, -0.47, -0.67, 0.67, -0.47],
  'g2-2': [-1.0, -1.0, -1.0, -1.27, 1.27],
  'g2-3': [-1.4, 1.0, 1.4, 1.0, 1.0],
  'g2-4': [-1.2, -1.2, -1.2, 0.87, 0.87],
  'g2-5': [-0.87, 0.87, -0.6, 0.6, 0.6],
  'g2-6': [1.0, 1.2, 1.0, 1.2, 0.93],
  'g2-7': [0.8, 0.6, -0.8, 0.6, -0.6],
  'g3-1': [-1.07, 1.33, 1.07, -1.33, 1.07],
  'g3-2': [0.6, 0.8, 0.6, -0.6, 0.8],
  'g3-3': [0.8, -1.0, 0.8, -1.0, 0.8],
  'g3-4': [-0.53, 0.73, -0.53, 0.73, 0.53],
  'g3-5': [-1.27, -1.0, -1.27, 1.0, 1.0],
  'g3-6': [1.07, -0.93, -1.07, 0.93, 0.93],
  'g3-7': [-0.87, 0.6, 0.87, -0.6, 0.6],
}

var extraRaw = {
  '婚恋奇迹1': [1.0, 1.33, 1.33, 1.33, 0.67],
  '婚恋奇迹2': [1.33, -1.33, 0.67, -1.33, 1.0],
  '婚恋奇迹3': [-1.33, -1.33, -1.33, -1.0, -0.67],
  '婚恋奇迹4': [-1.33, 0.67, 1.33, 1.33, -1.0],
  '婚恋奇迹5': [1.33, -1.0, -1.33, 1.33, -0.67],

  /*
  '满天繁星: 观星之夜': [1.33, 1.0, 0.67, 1.33, -1.33],
  '满天繁星: 射手座少女': [1.33, 1.33, 1.33, 1.0, 0.67],
  '满天繁星: 玄武女土蝠': [-1.0, -1.33, -1.33, -1.33, 0.67],
  '满天繁星: 喝茶听课': [1.33, 0.67, -1.33, 1.33, 1.0],
  '满天繁星: 星宿侠女': [-1.33, -1.0, 1.33, -1.33, 0.67],
  '满天繁星: 玄武虚日鼠': [0.67, -1.33, -1.33, 1.33, -1.0],
  '满天繁星: 朱雀翼火蛇': [-1.33, -1.0, -1.33, 1.33, -0.67]
  
  '冰雪舞会1': [0.1, 0.2, 0.2, 0.1, -0.3],
  '冰雪舞会2': [1.4, 0.67, -1.4, 2.2, 0.67],
  '冰雪舞会3': [0.8, 1.5, -1.5, 2.33, 0.8],
  '冰雪舞会4': [-0.8, 0.67, 0.67, 0.8, 0.6],
  '冰雪舞会5': [-0.8, -0.8, -0.67, -0.67, 0.67]
  */
};

// all data are presented in order "simple", "cute", "active", "pure", "cool"
var levelsRaw = {
  '1-1': [1, 2, 3, 2, 1],
  '1-2': [3, 1.5, -3, 3, -1],
  '1-3': [-2, -1, -3, 2, 1],
  '1-4': [2, -3, -2, -1, -1],
  '1-5': [-1, 3, 2, -2, 1],
  '1-6': [2, 1, -2, 3, 1],
  '1-7': [3, -2, -2, 1, 1],
  '1-8': [-1, -2, -2, -4, 1],
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
  '5-4': [-1.2, -0.75, -1.25, -2, 0.75],
  '5-5': [-3, 2, -2, 1, 1],
  '5-6': [3, 1, -2, 2, -1],
  '5-7': [-1, 1, 2, 2, 1],
  '5-8': [2, -1, -2, 1, -3],
  '5-9': [-3, -2, -2, -1, 1],
  '5-10': [-3, 3, -4, 1.5, 1.5],
  '5-11': [2, -1, 3, -2, 1],
  '5-12': [2, 1.125, -3.375, 2, -1.35],
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
  '7-支3': [3, -3, 2, -2, 2],
  '7-支4': [2, 2.5, -2, 2.5, 1.75],
  '7-支5': [2.5, 2, 2.5, 2, 1.75],
  '8-1': [2, 2.5, 2.5, 2, 1.5],
  '8-2': [-2.5, -2, 2.5, -2, 1.5],
  '8-3': [2.7, 2, -2, 2.7, -1.66],
  '8-4': [2, -2.5, -2.5, 1.5, -2],
  '8-5': [1.25, 1.25, -2, 1.25, 1.25],
  '8-6': [-2, -1.25, -2, -1.25, 1.25],
  '8-7': [2.5, 2, 2.5, 2, 1.75],
  '8-8': [-3, -2.5, -2.5, -2.5, 3],
  '8-9': [-2.5, 2.5, -2, 2, 1.5],
  '8-支1': [2.5, -1.75, 2, -2.5, 2],
  '8-支2': [2, 2, -2.5, 2.5, -1.5],
  '8-支3': [-2.5, -2, -2.5, -2, 1.75],
  '9-1': [2.75, 2, 2.75, 2, 1.75],
  '9-2': [-1.75, 1.33, -1.75, -1.33, 1.25],
  '9-3': [1.5, -1.5, -2, 1.5, -2],
  '9-4': [-1, -1.5, -1.5, -1, -1],
  '9-5': [2, 2.25, 2.25, 2, 2.25],
  '9-6-1': [2, -1.25, -2, 1.25, 1.25],
  '9-6-2': [1.4, -2, -2.25, -1.4, 1.2],
  '9-7': [1.6, 1.4, 1.4, -1.5, 1.25],
  '9-8': [1.75, 1.5, 1.75, 1.5, -1.5],
  '9-9-1': [-2, 1, 1.4, -1, 1],
  '9-9-2': [-2.5, 2, 2, -2.4, 1.5],
  '9-9-3': [-2.5, -2, -2.5, 1.75, 1.5],
  '9-支1': [1.5, 1.5, 2, 1.5, 2],
  '9-支2': [-1.5, 1.5, -1.8, 2, 1.6],
  '9-支3': [2, -2.5, 2, -2.5, 1.75],
  '10-1': [-1.33, 1.33, 1.67, 1.67, -1.67],
  '10-2': [1.5, -1.1, -1.1, 1.5, -1.1],
  '10-3': [1.33, 1.0, 1.33, 1.0, 1.0],
  '10-4': [1.0, -1.33, -1.67, -1.33, -3.0],
  '10-5': [1.67, -1.33, -1.67, -1.33, 1.33],
  '10-6': [-1.6, 1.9, 1.9, -1.6, 1.6],
  '10-7': [-1.5, 1.2, 1.2, 1.5, -1.5],
  '10-8': [1.67, -1.33, -1.67, 1.6, -1.6],
  '10-9-1': [-1.9, 2.5, 2.5, -1.9, 1.9],
  '10-9-2': [1.2, -1.9, -1.9, 1.2, 1.2],
  '10-支1': [1.7, 1.4, 1.7, 1.4, 1.4],
  '10-支2': [1.4, 1.7, 1.4, 1.4, 1.7],
  '10-支3': [-1.4, -1.1, -1.4, -1.1, -1.1],
  '11-1': [2.6, 2.0, 2.6, 2.0, 1.33],
  '11-2': [2.3, 2.9, 2.9, -2.3, 1.6],
  '11-3': [2.0, 2.0, -2.67, 2.67, -1.33],
  '11-4': [2.9, 1.5, -2.2, 2.2, -2.9],
  '11-5': [-2.67, -2.0, -2.67, -2.0, -1.33],
  '11-6': [2.2, -2.9, 1.5, -2.9, 2.2],
  '11-7': [-1.33, -2.67, -2.0, -2.67, -2.0],
  '11-8': [-2.0, 2.0, 2.67, 2.67, 1.33],
  '11-9': [2.6, 1.33, 2.6, 2.0, 2.0],
  '11-支1': [2.7, -2.0, -2.7, 2.0, 1.33],
  '11-支2': [2.3, 1.6, -2.3, 1.6, 1.1],
  '11-支3': [2.3, 2.9, 2.9, -1.6, 2.3],
  '12-1': [-2.2, -2.2, 3, -1.5, -3],
  '12-2': [1.9, -2.5, -2.5, -1.9, 1.33],
  '12-3': [-1.9, 1.0, -1.9, 1.0, 1.0],
  '12-4': [2.1, 2.8, -2.1, 2.8, -1.33],
  '12-5': [3.0, 2.33, 3.0, -2.33, 1.67],
  '12-6': [-1.2, -0.67, -2.1, 1.2, 0.67],
  '12-7': [1.5, 1.1, 2.33, 1.1, 1.0],
  '12-8': [-2.33, 2.33, 1.67, -1.67, 1.0],
  '12-9': [1.3, 0.67, -1.3, 0.67, 0.67],
  '12-支1': [-1.9, -1.3, -1.9, 1.3, -0.67],
  '12-支2': [1.33, 1.67, 1.33, 1.67, 1.67],
  '12-支3': [2.3, 1.0, 2.3, 1.67, 1.0],
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

function noOp() {
  return {
    filter: function() {
      return;
    }
  };
}

function blacklistFilter() {
  return {
    lvlList: {},
    add: function(category, id) {
      if (!this.lvlList[category]) {
        this.lvlList[category] = {};
      }
      this.lvlList[category][id] = 1;
    },
    matches: function(c) {
      return this.lvlList[c.type.mainType] && this.lvlList[c.type.mainType][c.id];
    },
    filter: function(c) {
      if (this.matches(c)) {
        c.tmpScore /= 10;
        c.tmpScoreByCategory.f();
        c.bonusByCategory.f();
      }
    }
  }
}

// Note: filters decides which clothes will be penalized (usually 1/10 of the score)
// Only applicable to dresses, coats, tops and bottoms
var levelFilters = function() {
  var ret = {};
  for (var i in blacklist) {
    var black = blacklist[i];
    if (!ret[black[0]]) {
      ret[black[0]] = blacklistFilter();
    }
    ret[black[0]].add(black[1], black[2]);
  }
  return ret;
}();

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
        return [0, {}];
      }
    }
  };
}

function featureBasedScoringFactory(bonus, multiplier){
  return function(criteria, clothes) {
    var total = 0;
    var byFeature = {};
    for (var i in FEATURES) {
      var f = FEATURES[i];
      var addon = Math.abs(criteria[f] * clothes.type.score[bonus] * multiplier);
      byFeature[f] = addon;
      total += addon;
    }
    return [total, byFeature];
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
        var byFeature = {};
        for (var i in onlyFeatures) {
          var f = onlyFeatures[i];
          var addon = Math.abs(criteria[f] * clothes.type.score['SS']);
          byFeature[f] = addon;
          total += addon;
        }
        return [total, byFeature];
  });
}

function specialFactory76A() {
  return abstractBonusFactory('华丽 成熟  优雅  清纯  清凉 分别按照权重增加', false, 'B, SS, B, C, C', "晚礼服",
      null, function(criteria, clothes) {
        var total = 0;
        var byFeature = {};
        byFeature['simple'] = Math.abs(criteria['simple'] * clothes.type.score['B']);
        byFeature['cute'] = Math.abs(criteria['cute'] * clothes.type.score['SS']);
        byFeature['active'] = Math.abs(criteria['active'] * clothes.type.score['B']);
        byFeature['pure'] = Math.abs(criteria['pure'] * clothes.type.score['C']);
        byFeature['cool'] = Math.abs(criteria['cool'] * clothes.type.score['C']);
        
        total += byFeature['simple'];
        total += byFeature['cute'];
        total += byFeature['active'];
        total += byFeature['pure'];
        total += byFeature['cool'];
        return [total, byFeature];
  });
}

function specialFactory76B() {
  return abstractBonusFactory('华丽 成熟  优雅  清纯  清凉 分别按照权重增加', false, 'B, SS, B, C, C', "中式现代",
      null, function(criteria, clothes) {
        var total = 0;
        var byFeature = {};
        byFeature['simple'] = Math.abs(criteria['simple'] * clothes.type.score['B']);
        byFeature['cute'] = Math.abs(criteria['cute'] * clothes.type.score['SS']);
        byFeature['active'] = Math.abs(criteria['active'] * clothes.type.score['B']);
        byFeature['pure'] = Math.abs(criteria['pure'] * clothes.type.score['C']);
        byFeature['cool'] = Math.abs(criteria['cool'] * clothes.type.score['C']);
        
        total += byFeature['simple'];
        total += byFeature['cute'];
        total += byFeature['active'];
        total += byFeature['pure'];
        total += byFeature['cool'];
        return [total, byFeature];
  });
}

function bonusInfo(base, weight, tag, replace) {
  return {
    base: base,
    weight: weight,
    tag: tag,
    replace: replace
  }
}

function replaceBonusInfo(base, weight, tag) {
  return bonusInfo(base, weight, tag, true);
}

function addBonusInfo(base, weight, tag) {
  return bonusInfo(base, weight, tag, false);
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
  "1-3": [addBonusInfo('B', 0.25, "中式古典")],
  "1-4": [],
  "1-5": [],
  "1-6": [],
  "1-7": [addBonusInfo('B', 0.25, "中性风")],
  "1-8": [],
  "1-9": [],
  "2-1": [],
  "2-2": [],
  "2-3": [],
  "2-4": [],
  "2-5": [],
  "2-6": [addBonusInfo('B', 0.25, "和风")],
  "2-7": [replaceBonusInfo('SS', 1, "睡衣")],
  "2-8": [],
  "2-9": [addBonusInfo('B', 0.25, "欧式古典")],
  "2-支1": [],
  "2-支2": [addBonusInfo('A', 1, "中性风")],
  "3-1": [addBonusInfo('B', 0.25, "英伦")],
  "3-2": [addBonusInfo('B', 1, "摇滚风")],
  "3-3": [],
  "3-4": [addBonusInfo('B', 0.25, "森女系列")],
  "3-5": [],
  "3-6": [replaceBonusInfo('SS', 1, '沐浴'), replaceBonusInfo('S', 1, '和风')],
  "3-7": [],
  "3-8": [],
  "3-9": [addBonusInfo('B', 0.25, "侠客联盟")],
  "3-10": [addBonusInfo('B', 0.25, "小动物")],
  "3-11": [addBonusInfo('B', 1, "欧式古典")],
  "3-12": [addBonusInfo('B', 1, "运动系")],
  "3-支1": [addBonusInfo('B', 1, "欧式古典")],
  "3-支2": [replaceBonusInfo('SS', 1, '婚纱')],
  "4-1": [],
  "4-4": [],
  "4-5": [addBonusInfo('S', 0.25, "防晒")],
  "4-6": [],
  "4-7": [],
  "4-8": [replaceBonusInfo('S', 1, "医务使者")],
  "4-9": [addBonusInfo('B', 1, "中式古典")],
  "4-10": [],
  "4-11": [],
  "4-12": [replaceBonusInfo('SS', 1, "兔女郎")],
  "4-支1": [],
  "4-支2": [addBonusInfo('B', 0.25, "围裙")],
  "4-支3": [addBonusInfo('B', 0.25, "围裙")],
  "5-1": [],
  "5-2": [],
  "5-3": [],
  "5-4": [addBonusInfo('S', 2, "和风"), addBonusInfo('SS', 1, "舞者")],
  "5-5": [addBonusInfo('A', 1, "女仆装")],
  "5-6": [],
  "5-7": [replaceBonusInfo('SS', 1, "波西米亚")],
  "5-8": [],
  "5-9": [],
  "5-10": [],
  "5-11": [replaceBonusInfo('SS', 1, "侠客联盟")],
  "5-12": [addBonusInfo('A', 1, "民国服饰"), addBonusInfo('A', 1, "中式现代")],
  "5-支1": [addBonusInfo('B', 0.25, "冬装")],
  "5-支2": [],
  "5-支3": [replaceBonusInfo('SS', 1, "医务使者")],
  "6-1": [addBonusInfo('B', 0.25, "碎花")],
  "6-2": [addBonusInfo('B', 0.25, "中式古典")],
  "6-3": [addBonusInfo('B', 0.5, "和风")],
  "6-4": [],
  "6-5": [],
  "6-6": [],
  "6-7": [addBonusInfo('S', 0.25, "中式现代")],
  "6-8": [replaceBonusInfo('SS', 1, "泳装"), replaceBonusInfo('B', 1, "中式现代")],
  "6-9": [addBonusInfo('B', 1, "旗袍")],
  "6-10": [addBonusInfo('SS', 1, "中式现代"), addBonusInfo('S', 1, "冬装")],
  "6-11": [addBonusInfo('B', 1, "中式古典")],
  "6-支1": [],
  "6-支2": [],
  "6-支3": [replaceBonusInfo('A', 2, "舞者"), addBonusInfo('A', 1, "印度服饰")], 
  '7-1': [],
  '7-2': [],
  '7-3': [],
  '7-4': [addBonusInfo('B', 1, "中式古典")],
  '7-5': [],
  '7-7': [replaceBonusInfo('SS', 1, "欧式古典"), replaceBonusInfo('SS', 1, "晚礼服")],
  '7-8': [replaceBonusInfo('S', 1, "中式古典"), replaceBonusInfo('SS', 1, "侠客联盟")],
  '7-9': [addBonusInfo('A', 1, "冬装")],
  '7-支1': [],
  '7-支2': [],
  '7-支3': [replaceBonusInfo('SS', 1, "军装")],
  '7-支4': [addBonusInfo('A', 0.5, "中式现代")],
  '7-支5': [addBonusInfo('S', 0.25, "运动系"), addBonusInfo('S', 0.25, "海军风")],
  '8-1': [addBonusInfo('A', 0.5, "小动物")],
  '8-2': [addBonusInfo('S', 0.5, "摇滚风")],
  '8-3': [addBonusInfo('A', 0.5, "中式古典")],
  '8-4': [addBonusInfo('A', 0.5, "中性风")],
  '8-5': [addBonusInfo('B', 1, "中式古典")],
  '8-6': [addBonusInfo('S', 1, "中式现代")],
  '8-7': [addBonusInfo('A', 0.5, "中性风")],
  '8-8': [],
  '8-9': [addBonusInfo('A', 0.5, "童话系")],
  '8-支1': [addBonusInfo('A', 0.5, "侠客联盟")],
  '8-支2': [],
  '8-支3': [addBonusInfo('A', 0.5, "欧式古典")],
  '9-1': [],
  '9-2': [addBonusInfo('S', 1, "哥特风")],
  '9-3': [addBonusInfo('C', 1, "冬装")],
  '9-4': [addBonusInfo('A', 1, "中式古典")],
  '9-5': [addBonusInfo('A', 1, "中式现代")],
  '9-6-1': [],
  '9-6-2': [],
  '9-7': [addBonusInfo('S', 1, "未来系")],
  '9-8': [addBonusInfo('B', 1, "森女系列")],
  '9-9-1': [addBonusInfo('SS', 1, "侠客联盟")],
  '9-9-2': [],
  '9-9-3': [],
  '9-支1': [addBonusInfo('A', 1, "泳装")],
  '9-支2': [addBonusInfo('A', 1, "旗袍")],
  '9-支3': [],
  '10-1': [addBonusInfo('B', 1, "森女系列")],
  '10-2': [addBonusInfo('A', 1, "中式古典")],
  '10-3': [addBonusInfo('A', 2, "中式现代")],
  '10-4': [addBonusInfo('A', 1, "军装")],
  '10-5': [addBonusInfo('B', 1, "晚礼服")],
  '10-6': [addBonusInfo('S', 1, "民族风")],
  '10-7': [addBonusInfo('B', 1, "洛丽塔")],
  '10-8': [addBonusInfo('SS', 1, "学院系")],
  '10-9-1': [addBonusInfo('A', 1, "原宿系")],
  '10-9-2': [],
  '10-支1': [addBonusInfo('A', 1, "运动系")],
  '10-支2': [addBonusInfo('A', 1, "碎花")],
  '10-支3': [addBonusInfo('A', 1, "欧式古典")],
  '11-4': [addBonusInfo('A', 0.1, "冬装")],
  '11-7': [addBonusInfo('A', 0.5, "欧式古典")],
  '11-支2': [addBonusInfo('C', 1, "中性风")],
  '12-3': [addBonusInfo('A', 0.5, "侠客联盟"), addBonusInfo('A', 0.5, "童话系")],
  '12-5': [addBonusInfo('A', 0.25, "原宿系")],
  '12-6': [addBonusInfo('A', 1, "中式古典")],
  '12-7': [addBonusInfo('S', 1, "运动系")],
  '12-8': [addBonusInfo('B', 1, "未来系")],
  '12-9': [addBonusInfo('SS', 1.5, "波西米亚")],
  '12-支1': [addBonusInfo('B', 1, "中式古典")],
  '12-支2': [addBonusInfo('A', 1, "居家服"), addBonusInfo('A', 1, "睡衣")],
  '12-支3': [addBonusInfo('B', 1, "运动系")],
  '月下舞会3': [addBonusInfo('S', 1, "欧式古典")],
  '仲夏夜之梦1': [addBonusInfo('S', 1, "童话系")],
  '仲夏夜之梦2': [replaceBonusInfo('SS', 1, "和风")],
  '仲夏夜之梦3': [],
  '仲夏夜之梦4': [replaceBonusInfo('S', 1, "摇滚风")],
  '仲夏夜之梦5': [replaceBonusInfo('S', 1, "睡衣"), replaceBonusInfo('A', 1, "小动物")],
  '清秀佳人': [addBonusInfo('A', 1, "中式现代")],
  '绝色无双': [addBonusInfo('A', 1, "中式现代")],
  '保育员面试': [addBonusInfo('S', 1, "小动物")],
  '海边的比基尼对决！': [addBonusInfo('A', 1, "泳装")],
  '少女的茶会': [addBonusInfo('SS', 1, "洛丽塔")],
  '摇滚演唱会': [addBonusInfo('S', 1, "摇滚风")],
  '花田摄影会': [addBonusInfo('A', 1, "碎花")],
  '牛仔布的逆袭': [addBonusInfo('B', 1, "牛仔布")],
  '云端和风茶室': [addBonusInfo('S', 1, "和风")],
  '运动饮料的推广会': [addBonusInfo('S', 1, "运动系")],
  '睡衣兜风派对': [addBonusInfo('SS', 1, "睡衣"), addBonusInfo('SS', 1, "居家服")],
  '云端汉服聚会': [addBonusInfo('SS', 1, "中式古典")],
  '话剧甄选会': [addBonusInfo('SS', 1, "欧式古典")],
  'g1-1': [addBonusInfo('SS', 1, "睡衣"), addBonusInfo('SS', 1, "居家服")],
  'g1-2': [addBonusInfo('S', 1, "运动系")],
  'g1-3': [addBonusInfo('A', 1, "泳装")],
  'g1-5': [addBonusInfo('A', 1, "哥特风")],
  'g1-6': [addBonusInfo('B', 0.25, "欧式古典")],
  'g1-7': [addBonusInfo('SS', 1, "洛丽塔")],
  'g2-1': [addBonusInfo('SS', 1, "中式古典")],
  'g2-4': [addBonusInfo('B', 0.25, "哥特风")],
  'g2-5': [addBonusInfo('S', 1, "女仆装")],
  'g2-6': [addBonusInfo('B', 0.25, "海军风")],
  'g2-7': [addBonusInfo('S', 1, "中式现代")],
  'g3-2': [addBonusInfo('A', 2, "沐浴")],
  'g3-3': [addBonusInfo('S', 1, "泳装")],
  'g3-4': [addBonusInfo('SS', 1, "和风")],
  'g3-6': [addBonusInfo('A', 0.5, "中性风")],
  'g3-7': [addBonusInfo('A', 1, "侠客联盟"), addBonusInfo('S', 0.25, "欧式古典")],
  '满天繁星: 喝茶听课': [addBonusInfo('A', 1, "中式古典"), addBonusInfo('A', 1, "中式现代")],
  '满天繁星: 星宿侠女': [addBonusInfo('A', 1, "侠客联盟")],
  '满天繁星: 朱雀翼火蛇': [addBonusInfo('A', 1, "中式古典"), addBonusInfo('A', 1, "中式现代")],
  '冰雪舞会1': [addBonusInfo('A', 4, "居家服"), addBonusInfo('A', 10, "睡衣")],
  '冰雪舞会2': [addBonusInfo('S', 0.25, "森女系列")],
  '冰雪舞会4': [addBonusInfo('S', 1, "童话系")],
  '冰雪舞会5': [addBonusInfo('S', 1, "欧式古典")],
  '婚恋奇迹3': [addBonusInfo('A', 1, "晚礼服")],
  '婚恋奇迹4': [addBonusInfo('A', 1, "洛丽塔")],
  '婚恋奇迹5': [addBonusInfo('A', 1, "中式现代"), addBonusInfo('A', 1, "中式古典")],

 };

var additionalLevelInfo = {
  "4-2": [swimsuitFactory()],
  "4-3": [swimsuitFactory()],
  '7-6': [specialFactory76A(), specialFactory76B()]
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
      bonusFilter.push(levelBonus[name][i]);
    }
  }
  var additionalBonus = [];
  if (additionalLevelInfo[name]) {
    for (var i in additionalLevelInfo[name]) {
      additionalBonus.push(additionalLevelInfo[name][i](criteria));
    }
  }
  return {
    name: name, // useful?
    weight: criteria,
    filter: filter,
    bonus: bonusFilter,
    additionalBonus: additionalBonus
  }
}

allThemes = function() {
  var ret = {};
  for (var theme in extraRaw) {
    var criteria = extraRaw[theme];
    ret[theme] = level(theme, parseCriteriaList(criteria));
  }
  for (var theme in competitionsRaw) {
    var criteria = competitionsRaw[theme];
    ret['竞技场: ' + theme] = level(theme, parseCriteriaList(criteria));
  }
  for (var theme in tasksRaw) {
    var criteria = tasksRaw[theme];
    ret['联盟委托: ' + theme] = level(theme, parseCriteriaList(criteria));
  }
  for (var theme in levelsRaw) {
    var criteria = levelsRaw[theme];
    ret['关卡: ' + theme] = level(theme, parseCriteriaList(criteria));
  }
  return ret;
}();
