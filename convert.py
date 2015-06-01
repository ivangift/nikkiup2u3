# -*- coding: utf-8 -*- 
import csv
PATH = 'raw'

header = """// Clothes: name, type, id, gorgeous, simple, elegant, active, mature, cute, sexy, pure, cool, warm，extra
// credits to jillhx@tieba
"""

files = {
  '下装': ('bottoms.csv', None),
  '外套':  ('coat.csv', None),
  '连衣裙': ('dress.csv', None),
  '发型': ('hair.csv', None),
  '妆容': ('makeup.csv', None),
  '鞋子': ('shoes.csv', None),
  '袜子': ('socks.csv', None),
  '上装': ('tops.csv', None),
  '饰品': ('accessories.csv', 3),
}

fileorder = ['发型', '连衣裙', '外套', '上装', '下装', '袜子', '鞋子', '饰品', '妆容']

special = "accessories.csv"

mapping = {
  '2': 'C',
  '3': 'B',
  '4': 'A',
  '5': 'S',
  '6': 'SS',
}
def process(name, file, subtype = None):
  reader = csv.reader(open(PATH + "/" + file))
  reader.next()
  reader.next()
  out = {}
  for row in reader:
    key = name
    if subtype:
      key = key + "-" + row[subtype]
      row.pop(subtype)
    if key not in out:
      out[key] = []
    for i in xrange(3,13):
      if row[i] in mapping:
        row[i] = mapping[row[i]]
    if len(row) > 14 and len(row[14]) > 0:
      row[13] = row[13] + "," + row[14]
    out[key].append(row[:14])
  for k in out:
    print k, len(out[k])
  return out

writer = open('tmp.js', 'w');
category = []
writer.write(header)
writer.write("var wardrobe = [\n")
for f in fileorder:
  out = process(f, files[f][0], files[f][1])
  for key in out:
    for row in out[key]:
      if key not in category:
        category.append(key)
      # output in forms of name, *type*, id, stars, features....
      newrow = [row[0]] + [key] + row[1:]
      writer.write("  [%s],\n" % (','.join(["'" + i + "'" for i in newrow])))
writer.write("];\n");
writer.write("var category = [%s];\n" % (','.join(["'" + i + "'" for i in category])))
writer.close()
