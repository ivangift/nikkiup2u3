# -*- coding: utf-8 -*- 
# Ivan's Workshop
import csv
PATH = 'raw'

header = """// Clothes: name, type, id, gorgeous, simple, elegant, active, mature, cute, sexy, pure, cool, warm，extra, source
// credits to jillhx@tieba
"""

files = {
  '下装': ('bottoms.csv', 2),
  '外套':  ('coat.csv', 2),
  '连衣裙': ('dress.csv', 2),
  '发型': ('hair.csv', 2),
  '妆容': ('makeup.csv', 2),
  '鞋子': ('shoes.csv', 2),
  '袜子': ('socks.csv', 2),
  '上装': ('tops.csv', 2),
  '饰品': ('accessories.csv', 2),
}

pattern = 'pattern.csv'

fileorder = ['发型', '连衣裙', '外套', '上装', '下装', '袜子', '鞋子', '饰品', '妆容']

suborder = ['袜子-袜套','袜子-袜子','饰品-头饰','饰品-耳饰','饰品-颈饰',
  '饰品-颈饰*项链','饰品-颈饰*围巾','饰品-手饰','饰品-手饰*左',
  '饰品-手饰*右','饰品-手饰*双','饰品-手持*左','饰品-手持*右',
  '饰品-腰饰','饰品-特殊*脸部','饰品-特殊*颈部','饰品-特殊*纹身',
  '饰品-特殊*挎包']

def subkey(key):
  if key in suborder:
    return suborder.index(key)
  return key

mapping = {
  '2': 'C',
  '3': 'B',
  '4': 'A',
  '5': 'S',
  '6': 'SS',
}

clothes = {}

def add_clothes(key, name, id):
  if name not in clothes:
    clothes[name] = []
  clothes[name].append((key, id))

def process(name, file, skip = 2):
  reader = csv.reader(open(PATH + "/" + file))
  for i in xrange(skip):
    reader.next()
  out = {}
  for row in reader:
    if len(row[0]) == 0:
      continue # skip empty rows
    key = name
    if len(row[3]) > 0:
      key = key + "-" + row[3]
    add_clothes(key, row[0], row[1])
    row.pop(3)
    if key not in out:
      out[key] = []
    for i in xrange(3,13):
      if row[i] in mapping:
        row[i] = mapping[row[i]]
    if len(row) > 14 and len(row[14]) > 0:
      row[13] = row[13] + "," + row[14]
    tbd = row[:14]
    if len(row) > 15:
      tbd.append(row[15])
    out[key].append(tbd)
  for k in out:
    print k, len(out[k])
  return out
  
def find_name(name, hint):
  if name not in clothes:
    name = name.replace('·', '*')
  if name not in clothes:
    print 'Warning! name not found:', name
    return None
  if len(clothes[name]) > 1:
    for item in clothes[name]:
      if item[0].find(hint)>=0:
        return item;
    print 'Warning! two names matched:', name
    return None
  return clothes[name][0]

writer = open('wardrobe.js', 'w');
category = []
writer.write(header)
writer.write("var wardrobe = [\n")
for f in fileorder:
  out = process(f, files[f][0], files[f][1])
  for key in sorted(out, key = subkey):
    if key not in category:
      category.append(key)
    for row in out[key]:
      # output in forms of name, *type*, id, stars, features....
      newrow = [row[0]] + [key] + row[1:]
      writer.write("  [%s],\n" % (','.join(["'" + i + "'" for i in newrow])))
writer.write("];\n");
writer.write("var category = [%s];\n" % (','.join(["'" + i + "'" for i in category])))
writer.close()

reader = csv.reader(open(PATH + "/" + pattern))
reader.next()
writer = open('pattern.js', 'w');
writer.write("var pattern = [\n")
for row in reader:
  hint = row[2]
  target = row[3]
  source = row[5]
  if row[5] == '/':
    continue
  x = find_name(target, hint)
  if not x:
    print 'Target missing: ', target
  y = find_name(source, hint)
  if not y:
    print 'Source missing: ', source
  writer.write("  ['%s', '%s', '%s', '%s'],\n" % (x[0].split('-')[0], x[1], y[0].split('-')[0], y[1]))
writer.write("];")
writer.close()