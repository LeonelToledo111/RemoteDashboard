from sys import argv
from os.path import exists
import simplejson as json

script, in_file, out_file = argv

data = json.load(open(in_file))

geojson = [
    {
    "YIELD" : d["yield"], 
    "COORDINATES": [d["lon"], d["lat"]],
    }for d in data
]

output = open(out_file,'w')

json.dump(geojson,output)

#print (geojson)
