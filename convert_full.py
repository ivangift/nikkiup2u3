# -*- coding: utf-8 -*- 
# Ivan's Workshop
# A version works for amy's full version
import csv
PATH = 'raw'

header = """// Clothes: name, type, id, gorgeous, simple, elegant, active, mature, cute, sexy, pure, cool, warm，extra, source
// credits to jillhx@tieba
"""

full_file = 'full.csv'

pattern = 'pattern.csv'

suborder = ['发型', '连衣裙', '外套', '上衣', '下装', '袜子', 
  '袜子-袜套','袜子-袜子','鞋子','饰品-头饰','饰品-耳饰','饰品-颈饰',
  '饰品-颈饰·项链','饰品-颈饰·围巾','饰品-手饰','饰品-手饰·左',
  '饰品-手饰·右','饰品-手饰·双','饰品-手持·左','饰品-手持·右',
  '饰品-腰饰','饰品-特殊·脸部','饰品-特殊·颈部','饰品-特殊·纹身',
  '饰品-特殊·挎包', '妆容']

def subkey(key):
  if key in suborder:
    return suborder.index(key)
  return key

clothes = {}

def add_clothes(key, name, id):
  if name not in clothes:
    clothes[name] = []
  clothes[name].append((key, id))

def process(file):
  reader = csv.reader(open(PATH + "/" + file))
  reader.next()
  out = {}
  for row in reader:
    key = row[18]
    if row[19] != key or row[19] == '袜子':
      key = key + "-" + row[19]
    add_clothes(key, row[0], row[1])
    if key not in out:
      out[key] = []
    if len(row[15]) > 0:
      row[14] = row[14] + "," + row[15]
    tbd = row[:2] + row[3:15] + row[16:17]
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

def compatibility(name):
  if name == '上衣':
    return '上装'
  return name

writer = open('wardrobe.js', 'w');
category = []
writer.write(header)
writer.write("var wardrobe = [\n")
out = process(full_file)
for key in sorted(out, key = subkey):
  if key not in category:
    category.append(key)
  for row in out[key]:
    # output in forms of name, *type*, id, stars, features....
    thetype = key
    newrow = [row[0]] + [compatibility(key)] + row[1:]
    writer.write("  [%s],\n" % (','.join(["'" + i + "'" for i in newrow])))
writer.write("];\n");
writer.write("var category = [%s];\n" % (','.join(["'" + compatibility(i) + "'" for i in category])))
writer.close()

reader = csv.reader(open(PATH + "/" + pattern))
reader.next()
writer = open('pattern.js', 'w');
writer.write("var pattern = [\n")
for row in reader:
  target = row[0]
  hint_target = row[1]
  source = row[3]
  hint_source = row[4]
  if source == '/':
    continue
  x = find_name(target, hint_target)
  if not x:
    print 'Target missing: ', target
    continue
  y = find_name(source, hint_source)
  if not y:
    print 'Source missing: ', source
    continue
  writer.write("  ['%s', '%s', '%s', '%s'],\n" % (compatibility(x[0].split('-')[0]), x[1], compatibility(y[0].split('-')[0]), y[1]))
writer.write("];")
writer.close()