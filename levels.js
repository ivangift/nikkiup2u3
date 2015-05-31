competitionsRaw = {
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
  '年轻的春游': '简约 活泼 可爱 清纯 清凉'
,}

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
maidenRaw = {
  '1-1': [1, 2, 3, 2, 1],
  '1-2': [3, 1.5, -3, 3, -1],
}

function parseCriteriaList(criteria) {
  return {
    'simple': criteria[0],
    'cute': criteria[1],
    'active': criteria[2],
    'pure': criteria[3],
    'cool': criteria[4],
  }
}

allThemes = function() {
  var ret = {};
  for (var theme in competitionsRaw) {
    var criteria = competitionsRaw[theme];
    ret['评选赛: ' + theme] = parseCriteria(criteria);
  }
  for (var theme in maidenRaw) {
    var criteria = maidenRaw[theme];
    ret['少女: ' + theme] = parseCriteriaList(criteria);
  }
  return ret;
}();
