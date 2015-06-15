// Ivan's Workshop

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
      for (var i in FEATURES) {
        var f = FEATURES[i];
        if (filters[f] && filters[f] * self[f][2] > 0) {
          s += filters[f] * self[f][2];
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
                this.tmpScore = 0;
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
  return ""
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

function backfillTag() {
  for (var type in clothesSet) {
    var cs = clothesSet[type];
    for (var id in cs) {
      var c = cs[id];
      if (c.source.indexOf("定") >= 0) {
        var origin = c.source.substring(1, 4);
        if (cs[origin]) {
          if (c.tags.length == 0) {
            c.tags = cs[origin].tags;
          }
        } 
      }
    }
  }
}