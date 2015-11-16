// Ivan's Workshop
// in pairs of lower bound, upper bound
var hairScoring = {
  'SS': [1250, 1250], // est
  'S': [950, 1150],
  'A': [750, 900],
  'B': [550, 750],
  'C': [550, 550]  // est
};

var dressScoring = {
  'SS': [5000, 5200], // est
  'S': [3800, 4200],
  'A': [3000, 3800],
  'B': [2500, 3000],
  'C': [1900, 2500]  // est
};

var coatScoring = {
  'SS': [490, 520], // based on dianashusy's data
  'S': [370, 450],
  'A': [300, 360],
  'B': [230, 280],
  'C': [190, 210]  // highly est
};

var topScoring = {
  'SS': [2725, 2725], // est
  'S': [1750, 2100],
  'A': [1400, 1700],
  'B': [1250, 1400],
  'C': [800, 1200]  // est
};

var bottomScoring = {
  'SS': [2725, 2725], // est
  'S': [1800, 2100],
  'A': [1400, 1800],
  'B': [1250, 1400],
  'C': [800, 1200]  // est
};

var sockScoring = {
  'SS': [860, 860], // based on dianashusy's data
  'S': [570, 650],
  'A': [440, 550],
  'B': [400, 440],
  'C': [270, 300]  // ased on dianashusy's data
};

var shoeScoring = {
  'SS': [1000, 1200], // highly est
  'S': [770, 950],
  'A': [640, 750],
  'B': [530, 580],
  'C': [380, 450]  // est
};

var accessoriesScoring = {
  'SS': [470, 500], // est
  'S': [370, 450],
  'A': [290, 370],
  'B': [220, 280],
  'C': [190, 210]  // est
};

var makeupScoring = {
  'SS': [250, 280], // est
  'S': [190, 190], // est
  'A': [130, 130], // est
  'B': [120, 120], // est
  'C': [100, 100]  // no data, purely mocking
};

// a normalized model for all clothes
var standardScoring = {
  'SS': [240, 300], //est
  'S': [180, 240],
  'A': [150, 180],
  'B': [113, 150],
  'C': [75, 113] //est
};

var scoreWeight = {
  '发型': 5,
  '连衣裙': 20,
  '外套': 2,
  '上装': 10,
  '下装': 10,
  '袜子': 3,
  '鞋子': 4,
  '饰品': 2,
  '妆容': 1
};

function avg(score) {
  ret = {};
  for (s in score) {
    ret[s] = (score[s][0] + score[s][1]) / 2;
  }
  return ret;
}

function sigma(score) {
  ret = {};
  for (s in score) {
    ret[s] = (score[s][0] - score[s][1]) / 2;
  }
  return ret;
}

function weighted(score, weight) {
  ret = {};
  for (s in score) {
    ret[s] = score[s] * weight;
  }
  return ret;
}

/*
var scoring = {
  '发型': avg(hairScoring),
  '连衣裙': avg(dressScoring),
  '外套': avg(coatScoring),
  '上装': avg(topScoring),
  '下装': avg(bottomScoring),
  '袜子': avg(sockScoring),
  '鞋子': avg(shoeScoring),
  '饰品': avg(accessoriesScoring),
  '妆容': avg(makeupScoring)
}*/

std = avg(standardScoring);

var scoring = {
  '发型': weighted(std, scoreWeight['发型']),
  '连衣裙': weighted(std, scoreWeight['连衣裙']),
  '外套': weighted(std, scoreWeight['外套']),
  '上装': weighted(std, scoreWeight['上装']),
  '下装': weighted(std, scoreWeight['下装']),
  '袜子': weighted(std, scoreWeight['袜子']),
  '鞋子': weighted(std, scoreWeight['鞋子']),
  '饰品': weighted(std, scoreWeight['饰品']),
  '妆容': weighted(std, scoreWeight['妆容'])
}

var deviation = {
  '发型': sigma(hairScoring),
  '连衣裙': sigma(dressScoring),
  '外套': sigma(coatScoring),
  '上装': sigma(topScoring),
  '下装': sigma(bottomScoring),
  '袜子': sigma(sockScoring),
  '鞋子': sigma(shoeScoring),
  '饰品': sigma(accessoriesScoring),
  '妆容': sigma(makeupScoring)
}

function getScore(clothesType) {
  if (scoring[clothesType]) {
    return scoring[clothesType];
  }
  if (scoring[clothesType.split('-')[0]]) {
    return scoring[clothesType.split('-')[0]];
  }
  return {};
}

function getDeviation(clothesType) {
  if (deviation[clothesType]) {
    return deviation[clothesType];
  }
  if (deviation[clothesType.split('-')[0]]) {
    return deviation[clothesType.split('-')[0]];
  }
  return {};
}

var typeInfo = function() {
  var ret = {};
  for (var i in category) {
    var name = category[i];
    ret[name] = {
      type: name,
      mainType: name.split('-')[0],
      score: getScore(name),
      deviation: getDeviation(name),
      needFilter: function() {
        return this.mainType == "连衣裙"
            || this.mainType == "外套"
            || this.mainType == "上装"
            || this.mainType == "下装";
      }
    }
  }
  return ret;
}();
