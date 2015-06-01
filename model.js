// parses a csv row into object
// Clothes: name, type, id, stars, gorgeous, simple, elegant, active, mature, cute, sexy, pure, cool, warm，extra
//          0     1     2   3      4         5       6        7       8       9     10    11    12    13    14
Clothes = function(csv) {
  return {
    own: false,
    name: csv[0],
    type: csv[1],
    id: csv[2],
    stars: csv[3],
    simple: realRating(csv[5], csv[4], csv[1]),
    cute: realRating(csv[9], csv[8], csv[1]),
    active: realRating(csv[7], csv[6], csv[1]),
    pure: realRating(csv[11], csv[10], csv[1]),
    cool: realRating(csv[12], csv[13], csv[1]),
    extra: csv[14],
    toCsv: function() {
      name = this.name;
      type = this.type;
      id = this.id;
      simple = this.simple;
      cute = this.cute;
      active = this.active;
      pure = this.pure;
      cool = this.cool;
      extra = this.extra;
      return [name, type, id, simple[0], simple[1], cute[0], cute[1],
          active[0], active[1], pure[0], pure[1], cool[0],
          cool[1], extra];
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
    },
    getType: function() {
      return this.type.split('-')[0];
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
          var type = clothes[i].getType();
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
        if (x[clothes[i].getType()][clothes[i].id]) {
          clothes[i].own = true;
        }
      }
    },
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
    ret[clothes[i].name] = clothes[i];
  }
  return ret;
}();

function realRating(a, b, type) {
  real = a ? a : b;
  symbol = a ? 1 : -1;
  score = symbol * getScore(type)[real];
  dev = getDeviation(type)[real];
  return [a, b, score, dev];
}

function load(myClothes) {
  var cs = myClothes.split(",");
  for (var i in clothes) {
    clothes[i].own = false;
  }
  for (var i in cs) {
    if (clothesSet[cs[i]]) {
      clothesSet[cs[i]].own = true;
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