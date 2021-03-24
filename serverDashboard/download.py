#!/usr/bin/env python3

import sys
import os
import cdsapi
from datetime import datetime
from calendar import monthrange
import calendar
import urllib3
import argparse
import pathlib

from ecmwfapi import ECMWFDataServer
server = ECMWFDataServer()

urllib3.disable_warnings()

var2 = ''
var1 = 'Variable_'
any = 0
vardir = ''

#Functionas are created for each day with default case
def Temp ():

   params['variable']= ['2m_dewpoint_temperature', '2m_temperature',]
   print("Its Temp")
   print(params)
   global var2
   var2 = "Temp"
   global vardir
   vardir = "Temp"

def Wind ():

   params['variable']= ['10m_u_component_of_wind','10m_v_component_of_wind',]
   print("Its Wind")
   print(params)
   global var2
   var2 = "10u10v"
   global vardir
   vardir = "Wind"

def Sp ():

   params['variable']= ['surface_pressure',]
   print("Its Sp")
   global var2
   var2 = "Sp"
   global vardir
   vardir = "Spre"

def Ssr ():

   params['variable']= ['surface_net_solar_radiation',]
   print("Its Ssr")
   global var2
   var2 = "Ssr"
   global vardir
   vardir = "Snsr"

def Tp ():

   params['variable']= ['total_precipitation',]
   print("Its Tp")
   global var2
   var2 = "Tp"
   global vardir
   vardir = "Tpre"

def Fa ():

   params['variable']= ['forecast_albedo',]
   print("Its Fa")
   global var2
   var2 = "Fa"
   global vardir
   vardir = "Falb"

def Default_case ():

   global any
   print("""\
       Wrong variable! The variable should be any of the following: 
       ['10m_u_component_of_wind', '10m_v_component_of_wind', '2m_dewpoint_temperature', '2m_temperature', 'surface_net_solar_radiation', 
        'total_precipitation', 'surface_pressure', 'forecast_albedo', ] """)
#   params['time']=["{:02d}:00".format(i) for i in range(0,24,1)]
   sys.exit(-1)
   any = 1
#   params['variable'] = [args.variable,]
#   print(params)

#Dictionary containing all possible 'cases'
Variable_Dict = {

    "temp": Temp,

    "wind": Wind,

    "sp": Sp,

    "tp": Tp,

    "ssr": Ssr,

    "fa": Fa

}

database = 'reanalysis-era5-land'
params = { 'format': 'netcdf', }
params['time']=["{:02d}:00".format(i) for i in range(0,24,1)]
params['year'] = ['1981',]
params['month'] = ['1',]
d=monthrange(int(params['year'][0]), 2)
params['day'] = d[1]
params['area'] = ['0/28/-16/41',]
params['grid'] = ['0.05/0.05',]
#variable = ['10m_u_component_of_wind', '10m_v_component_of_wind', '2m_dewpoint_temperature',
#            '2m_temperature', 'surface_net_solar_radiation', 'total_precipitation', 'surface_pressure', 'forecast_albedo', ]  # for Utrecht 13/02/2020

##variable = ['10m_u_component_of_wind', '10m_v_component_of_wind', '2m_dewpoint_temperature',
##            '2m_temperature', 'evapotranspiration', 'surface_net_solar_radiation',       
##            'surface_net_thermal_radiation', 'surface_thermal_radiation_downwards', 'total_precipitation',]       # original, up to 13/02/2020
variable = ['10m_v_component_of_wind','10m_v_component_of_wind',]

target ='salida-2dm-t2-198402.nc'

def main():
  
  # Instantiate the parser
  parser = argparse.ArgumentParser(description='Download viariables from ERA5LandDownload. Optional arguments are: \
       dir_download, variable yearStart, yearEnd, monthStart, and monthEnd. For example, to download evapotranspiration variable in the current directory since January 1981 type: ./ERA5LandDownload.py . evapotranspiration 1981 2019 1 12 ')

  # Optional positional argument: path
  parser.add_argument('dir_download', type=str, nargs='?',
                            help='A dir_download string mandatory argument')
  # Optional positional argument: variable
  parser.add_argument('variable', type=str, nargs='?',
                            help='A variable string mandatory argument')
  # Optional positional argument: yearStart
  parser.add_argument('yearStart', type=int, nargs='?',
                            help='An optional int yearStart positional argument')
  # Optional positional argument: yearEnd
  parser.add_argument('yearEnd', type=int, nargs='?',
                            help='An optional int yearEnd positional argument')
  # Optional positional argument: monthStart
  parser.add_argument('monthStart', type=int, nargs='?',
                            help='An optional int monthStart positional argument')
  # Optional positional argument: monthEnd
  parser.add_argument('monthEnd', type=int, nargs='?',
                            help='An optional int monthEnd positional argument')
  # Optional positional argument: either download or update
  parser.add_argument('update', type=int, nargs='?',
                            help='An optional int flag positional argument')
  # Optional positional argument: either download or update
  parser.add_argument('latmin', type=float, nargs='?',
                            help='A latmin float mandatory argument')
  # Optional positional argument: either download or update
  parser.add_argument('lonmin', type=float, nargs='?',
                            help='A lonmin float mandatory argument')
  # Optional positional argument: either download or update
  parser.add_argument('latmax', type=float, nargs='?',
                            help='A latmax float mandatory argument')
  # Optional positional argument: either download or update
  parser.add_argument('lonmax', type=float, nargs='?',
                            help='A lonmax float mandatory argument')

  args = parser.parse_args()
  print("Argument values:")

  if ((len(sys.argv) < 3 or len(sys.argv) > 12)): 
    print("""\
    At least two arguments must be provided: 
     1: dir_download where the files should be downloaded
     2: ERA5LandDownload variable name

    Usage:  ./ERA5LandDownload.py dir_download variable year_start year_end month_start month_end
    Type ./ERA5LandDownload.py  -h  , for an example
    """)
    sys.exit(-1)

  if args.dir_download is None:
        print ("error parsing stream args.dir_download = ",args.dir_download)
        #args.dir_download = "./" + "Variable_SSR"
        args.dir_download = "."
  else:
        print(args.dir_download)
        cmd = "mkdir -p " + args.dir_download
        pathlib.Path(args.dir_download).mkdir(parents=True, exist_ok=True) 
        print(cmd)
        #os.system(cmd)

  if args.variable is None:
        print ("ERROR!: A variable must be specified ")
        parser.print_help()
        sys.exit()
        #args.variable = "10u10v"
  else:
        print(args.variable)

  if args.yearStart is None:
        print ("missing parsing args.yearStart")
        args.yearStart = 1981
  else:
        print(args.yearStart)

  if args.yearEnd is None:
        print ("missing parsing args.yearEnd")
        currentdate = datetime.today()
        args.yearEnd = currentdate.year
  else: 
        print(args.yearEnd)

  if args.monthStart is None:
        print ("missing parsing args.monthStart")
        args.monthStart = 1
  else:
        print(args.monthStart)

  if args.monthEnd is None:
        print ("missing parsing args.monthEnd")
        currentdate = datetime.today()
        args.monthEnd = currentdate.month
  else:
        print(args.monthEnd)

  if args.update is None:
        print ("missing parsing args.update, so downloading")
        args.update = 0
  else:
        print(args.update)
        cmd = "mkdir -p " + args.dir_download
        print(cmd)
        pathlib.Path(args.dir_download).mkdir(parents=True, exist_ok=True) 
        #os.system(cmd)

  if args.variable is None:
        print(args.variable)
        print ("ERROR!: A variable must be specified ")
        parser.print_help()
        sys.exit()
        #args.variable = "10u10v"
  else:
        print(args.variable)

  if args.yearStart is None:
        print ("missing parsing args.yearStart")
        args.yearStart = 1981
  else:
        print(args.yearStart)

  if args.yearStart > args.yearEnd:
        print("error years")
        sys.exit()

  if args.yearStart == args.yearEnd:
    if args.monthStart > args.monthEnd:
        print("error months")
        sys.exit()

  if args.latmin is None:
        print ("ERROR!: A latmin must be specified ")
        parser.print_help()
        sys.exit()
  else:
        print(args.latmin)

  if args.lonmin is None:
        print ("ERROR!: A lonmin must be specified ")
        parser.print_help()
        sys.exit()
  else:
        print(args.lonmin)

  if args.latmax is None:
        print ("ERROR!: A latmax must be specified ")
        parser.print_help()
        sys.exit()
  else:
        print(args.latmax)

  if args.lonmax is None:
        print ("ERROR!: A lonmax must be specified ")
        parser.print_help()
        sys.exit()
  else:
        print(args.lonmax)

  bb =  str(args.latmin) + '/' + str(args.lonmin) + '/' + str(args.latmax) + '/' + str(args.lonmax)
  print(bb)
  params['area'] = [bb,]
#The switch alternative
  Variable_Dict.get(args.variable,Default_case)()

  if args.update == 0:
    cmd = "mkdir -p " + args.dir_download + '/' + var1 + vardir
    cmd2 = args.dir_download + '/' + var1 + vardir
    pathlib.Path(cmd2).mkdir(parents=True, exist_ok=True) 
    print(cmd)
    #os.system(cmd)

  c = cdsapi.Client()
  for year in list(range(args.yearStart, args.yearEnd+1)):
     for month in list(range(args.monthStart, args.monthEnd + 1)):
          startDate = '%04d%02d%02d' % (year, month, 1)
          numberOfDays = calendar.monthrange(year, month)[1]
          params['day'] = ["{:02d}".format(i) for i in range(1,numberOfDays+1)]
          lastDate = '%04d%02d%02d' % (year, month, numberOfDays)
          if args.update == 0:
            if any == 1:
              params['variable'] = [args.variable,]
              target = args.dir_download + '/' + var1 + vardir + "/ERA5-Land_%s_%04d%02d.nc" % (args.variable,year,month)
            else:
              target = args.dir_download + '/' + var1 + vardir + "/ERA5-Land_%s_%04d%02d.nc" % (var2,year,month)
          else:
            target = args.dir_download + "/ERA5-Land_%s_%04d%02d.nc" % (var2,year,month)
          params['year'] = [year,]
          params['month'] = [month,]
          print(database,params,target)
          print(" \n")
          c.retrieve(database,params,target)

if __name__== "__main__":
  main()
         
