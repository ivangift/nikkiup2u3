# -*- coding: utf-8 -*- 
# Ivan's Workshop
import csv
PATH = 'raw'

attributes = ['简约', '可爱', '活泼', '清纯', '清凉']

writer = open('tmplevels.js', 'w');
writer.write("var levelsRaw = {\n")
reader = csv.reader(open(PATH + "/" + 'levels.csv'))

reader.next()
for header in reader:
  level = header[0]
  scores = reader.next()
  out = []
  for i in xrange(len(attributes)):
    if header[i + 1] == attributes[i]:
      out.append(scores[i+1])
    else:
      out.append("-%s" % scores[i+1])
  writer.write("  '%s': [%s],\n" % (level, ', '.join([d for d in out])))
writer.write("};\n");
writer.close()
