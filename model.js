// Ivan's Workshop

var FEATURES = ["simple", "cute", "active", "pure", "cool"];

var global = {
  float: null,
  floating: true
};

// parses a csv row into object
// Clothes: name, type, id, stars, gorgeous, simple, elegant, active, mature, cute, sexy, pure, cool, warm，extra
//          0     1     2   3      4         5       6        7       8       9     10    11    12    13    14
Clothes = function(csv) {
  var theType = typeInfo[csv[1]];
  return {
    own: false,
    name: csv[0],
    type: theType,
    id: csv[2],
    stars: csv[3],
    simple: realRating(csv[5], csv[4], theType),
    cute: realRating(csv[9], csv[8], theType),
    active: realRating(csv[7], csv[6], theType),
    pure: realRating(csv[11], csv[10], theType),
    cool: realRating(csv[12], csv[13], theType),
    tags: csv[14].split(','),
    source: csv[15],
    toCsv: function() {
      name = this.name;
      type = this.type;
      id = this.id;
      simple = this.simple;
      cute = this.cute;
      active = this.active;
      pure = this.pure;
      cool = this.cool;
      extra = this.tags.join(',');
      source = this.source;
      return [name, type.type, id, simple[0], simple[1], cute[0], cute[1],
          active[0], active[1], pure[0], pure[1], cool[0],
          cool[1], extra, source];
    },
    calc: function(filters) {
      var s = 0;
      var self = this;
      this.tmpScoreByCategory = ScoreByCategory();
      for (var i in FEATURES) {
        var f = FEATURES[i]; 
        if (filters[f]) {
          var sub = filters[f] * self[f][2];
          if (filters[f] > 0) {
            if (sub > 0) {
              this.tmpScoreByCategory.record(f, sub, 0); // matched with major
            } else {
              this.tmpScoreByCategory.record(f, 0, sub); // mismatch with minor
            }
          } else {
            if (sub > 0) {
              this.tmpScoreByCategory.record(f, 0, sub); // matched with minor
            } else {
              this.tmpScoreByCategory.record(f, sub, 0); // mismatch with major
            }
            
          }
          if (sub > 0) {
            s += sub;
          }
        }
      }

      this.tmpScore = Math.round(s);
      if (currentLevel != null) {
        if (currentLevel.bonus) {
          var total = 0;
          for (var i in currentLevel.bonus) {
            var bonus = currentLevel.bonus[i];
            var result = bonus.filter(this);
            if (result > 0) {
              // result > 0 means match
              total += result;
              if (bonus.replace) {
                this.tmpScore /= 10;
              }
            }
          }
          this.tmpScore += total;
        }
        
        /* TODO: uncomment this when F mechanism is fully understood
        if (this.type.needFilter() && currentLevel.filter) {
          currentLevel.filter.filter(this);
        }*/
      } 
      this.tmpScore = Math.round(this.tmpScore);   
    }
  };
}

function ScoreByCategory() {
  var initial = {};
  for (var c in FEATURES) {
    initial[FEATURES[c]] = [0, 0];
  }
  return {
    scores: initial,
    // score: positive - matched, negative - no matched
    record: function(category, major, minor) {
      this.scores[category] = [major, minor];
    },
    add: function(other) {
      for (var c in other.scores) {
        this.scores[c][0] += other.scores[c][0];
        this.scores[c][1] += other.scores[c][1];
      }
    },
    round: function() {
      for (var c in this.scores) {
        this.scores[c][0] = Math.round(this.scores[c][0]);
        this.scores[c][1] = Math.round(this.scores[c][1]);
      }
    }
  };
}

function MyClothes() {
  return {
    mine: {},
    size: 0,
    filter: function(clothes) {
      this.mine = {}
      this.size = 0;
      for (var i in clothes) {
        if (clothes[i].own) {
          var type = clothes[i].type.mainType;
          if (!this.mine[type]) {
            this.mine[type] = [];
          }
          this.mine[type].push(clothes[i].id);
          this.size ++;
        }
      }
    },
    serialize: function() {
      var txt = "";
      for (var type in this.mine) {
        txt += type + ":" + this.mine[type].join(',') + "|";
      }
      return txt;
    },
    deserialize: function(raw) {
      var sections = raw.split('|');
      this.mine = {};
      this.size = 0;
      for (var i in sections) {
        if (sections[i].length < 1) {
          continue;
        }
        var section = sections[i].split(':');
        var type = section[0];
        this.mine[type] = section[1].split(',');
        this.size += this.mine[type].length;
      }
    },
    update: function(clothes) {
      var x = {};
      for (var type in this.mine) {
        x[type] = {};
        for (var i in this.mine[type]) {
          var id = this.mine[type][i];
          x[type][id] = true;
        }
      }
      for (var i in clothes) {
        clothes[i].own = false;
        var t = clothes[i].type.mainType;
        var id = clothes[i].id
        if (x[t] && x[t][clothes[i].id]) {
          clothes[i].own = true;
        }
      }
    }
  };
}

var clothes = function() {
  var ret = [];
  for (var i in wardrobe) {
    ret.push(Clothes(wardrobe[i]));
  }
  return ret;
}();

var clothesSet = function() {
  var ret = {};
  for (var i in clothes) {
    var t = clothes[i].type.mainType;
    if (!ret[t]) {
      ret[t] = {};
    }
    ret[t][clothes[i].id] = clothes[i];
  }
  return ret;
}();

var shoppingCart = {
  cart: {},
  totalScore: fakeClothes(this.cart),
  clear: function() {
    this.cart = {};
  },
  contains: function(c) {
    return this.cart[c.type.type] == c;
  },
  remove: function(c) {
    delete this.cart[c];
  },
  putAll: function(clothes) {
    for (var i in clothes) {
      this.put(clothes[i]);
    }
  },
  put: function(c) {
    this.cart[c.type.type] = c;
  },
  toList: function(sortBy) {
    var ret = [];
    for (var t in this.cart) {
      ret.push(this.cart[t]);
    }
    return ret.sort(sortBy);
  },
  calc: function(criteria) {
    for (var c in this.cart) {
      this.cart[c].calc(criteria);
    }
    // fake a clothes
    this.totalScore = fakeClothes(this.cart);
  }
};

function accScore(total, items) {
  if (items <= 3) {
    return total;
  }
  return total * (1 - 0.06 * (items-3)); 
}

function fakeClothes(cart) {
  var totalScore = 0;
  var totalAccessories = 0;
  var totalScoreByCategory = ScoreByCategory();
  var totalAccessoriesByCategory = ScoreByCategory();
  var numAccessories = 0;
  for (var c in cart) {
    if (c.split('-')[0] == "饰品") {
      totalAccessories += cart[c].tmpScore;
      totalAccessoriesByCategory.add(cart[c].tmpScoreByCategory);
      numAccessories ++;
    } else {
      totalScore += cart[c].tmpScore;
      totalScoreByCategory.add(cart[c].tmpScoreByCategory);
    }
  }
  totalScore += accScore(totalAccessories, numAccessories);
  for (var c in totalAccessoriesByCategory.scores) {
    totalAccessoriesByCategory.scores[c][0] = accScore(totalAccessoriesByCategory.scores[c][0],
        numAccessories);
    totalAccessoriesByCategory.scores[c][1] = accScore(totalAccessoriesByCategory.scores[c][1],
        numAccessories);
  }
  totalScoreByCategory.add(totalAccessoriesByCategory);
  totalScoreByCategory.round();
  
  var scores = totalScoreByCategory.scores;
  return {
    name: '总分',
    tmpScore: Math.round(totalScore),
    toCsv: function() {
      return [this.name, '', '', scores.simple[0], scores.simple[1], scores.cute[0], scores.cute[1],
          scores.active[0], scores.active[1], scores.pure[0], scores.pure[1], scores.cool[0],
          scores.cool[1], '', ''];
    }
  };
}

function realRating(a, b, type) {
  real = a ? a : b;
  symbol = a ? 1 : -1;
  score = symbol * type.score[real];
  dev = type.deviation[real];
  return [a, b, score, dev];
}

function load(myClothes) {
  var cs = myClothes.split(",");
  for (var i in clothes) {
    clothes[i].own = false;
    if (cs.indexOf(clothes[i].name) >= 0) {
      clothes[i].own = true;
    }
  }
  var mine = MyClothes();
  mine.filter(clothes);
  return mine;
}

function loadNew(myClothes) {
  var mine = MyClothes();
  mine.deserialize(myClothes);
  mine.update(clothes);
  return mine;
}

function loadFromStorage() {
  var myClothes;
  var myClothesNew;
  if (localStorage) {
    myClothesNew = localStorage.myClothesNew;
    myClothes = localStorage.myClothes;
  } else {
    myClothesNew = getCookie("mine2");
    myClothes = getCookie("mine");
  }
  if (myClothesNew) {
    return loadNew(myClothesNew);
  } else if (myClothes) {
    return load(myClothes);
  }
  return MyClothes();
}

function getCookie(c_name) {
  if (document.cookie.length>0) { 
    c_start=document.cookie.indexOf(c_name + "=")
    if (c_start!=-1) { 
      c_start=c_start + c_name.length+1 
      c_end=document.cookie.indexOf(";",c_start)
      if (c_end==-1) {
        c_end=document.cookie.length
      }
      return unescape(document.cookie.substring(c_start,c_end))
    }
  }
  return "";
}

function setCookie(c_name,value,expiredays) {
  var exdate=new Date()
  exdate.setDate(exdate.getDate()+expiredays)
  document.cookie=c_name+ "=" +escape(value)+
  ((expiredays==null) ? "" : "; expires="+exdate.toGMTString())
}

function save() {
  var myClothes = MyClothes();
  myClothes.filter(clothes);
  var txt = myClothes.serialize();
  if (localStorage) {
    localStorage.myClothesNew = txt;
  } else {
    setCookie("mine2", txt, 3650);
  }
  return myClothes;
}