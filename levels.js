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
  '运动饮料的推广会': [0.87, 0.67, 0.87, 0.67, 0.67],
  '牛仔布的逆袭': [1.2, -0.93, 1.2, 0.93, -0.93],
  '海边的比基尼对决！': [0.8, -0.8, -0.8, -1.0, 1.0],
  '睡衣兜风派对': [0.47, 0.67, 0.47, 0.67, -0.47],
  '苹果联邦高级成衣展': [1.4, -1.4, -1.13, -1.13, -1.13],
  '少女的茶会': [-0.67, 0.47, 0.67, 0.47, -0.47],
  '云端汉服聚会': [-0.47, -0.47, -0.67, 0.67, -0.47],
  '保育员面试': [0.53, 0.53, 0.73, 0.73, -0.53],
  '花田摄影会': [0.73, 0.93, 0.73, 0.93, 0.73],
  '云端和风茶室': [-0.53, -0.73, -0.73, 0.53, -0.53],
  '摇滚演唱会': [0.53, -0.53, 0.53, -0.73, 0.73],
  '话剧甄选会': [-0.73, -0.53, -0.73, -0.53, -0.53],
  '爱斯基摩旅游节': [1.13, 1.4, 1.13, 1.13, -1.4],
  '裤装游行': [1.53, 1.27, 1.27, -1.27, -1.53]
};

var extraRaw = {
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
  '10-支3': [-1.4, -1.1, -1.4, -1.1, -1.1]
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
  '5-4': noOp(),
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
  return abstractBonusFactory('华丽	成熟	优雅	清纯	清凉 分别按照权重增加', false, 'B, SS, B, C, C', "晚礼服",
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
  return abstractBonusFactory('华丽	成熟	优雅	清纯	清凉 分别按照权重增加', false, 'B, SS, B, C, C', "中式现代",
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
  '话剧甄选会': [addBonusInfo('SS', 1, "欧式古典")]
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
  for (var theme in competitionsRaw) {
    var criteria = competitionsRaw[theme];
    ret['评选赛: ' + theme] = level(theme, parseCriteriaList(criteria));
  }
  for (var theme in tasksRaw) {
    var criteria = tasksRaw[theme];
    ret['联盟委托: ' + theme] = level(theme, parseCriteriaList(criteria));
  }
  
  for (var theme in extraRaw) {
    var criteria = extraRaw[theme];
    ret[theme] = level(theme, parseCriteriaList(criteria));
  }
  for (var theme in levelsRaw) {
    var criteria = levelsRaw[theme];
    ret['关卡: ' + theme] = level(theme, parseCriteriaList(criteria));
  }
  return ret;
}();
