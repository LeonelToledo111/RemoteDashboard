from django.shortcuts import render
from django.http import HttpResponse
from paramiko import SSHClient
from paramiko import AutoAddPolicy
from scp import SCPClient
from datetime import date
from django.views.decorators.csrf import csrf_exempt

import sys
import os
import cdsapi
from datetime import datetime
from calendar import monthrange
import calendar
import urllib3
import argparse
import pathlib
import json
import subprocess

urllib3.disable_warnings()

var2 = ''
var1 = 'Variable_'
any = 0
vardir = ''

#Functions are created for each variable with default case
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

def Efbs ():

   params['variable']= ['evaporation_from_bare_soil',]
   print("Its Es")
   global var2
   var2 = "Es"
   global vardir
   vardir = "Efbs"

def Eowsxo ():

   params['variable']= ['evaporation_from_open_water_surfaces_excluding_oceans',]
   print("Its Eowsxo")
   global var2
   var2 = "Eowsxo"
   global vardir
   vardir = "Eowsxo"

def Eftc ():

   params['variable']= ['evaporation_from_the_top_of_canopy',]
   print("Its Eftc")
   global var2
   var2 = "Eftc"
   global vardir
   vardir = "Eftc"

def Efvt ():

   params['variable']= ['evaporation_from_vegetation_transpiration',]
   print("Its Efvt")
   global var2
   var2 = "Efvt"
   global vardir
   vardir = "Efvt"

def Lbt ():

   params['variable']= ['lake_bottom_temperature',]
   print("Its Lbt")
   global var2
   var2 = "Lbt"
   global vardir
   vardir = "Lbt"

def Lid ():

   params['variable']= ['lake_ice_depth',]
   print("Its Lid")
   global var2
   var2 = "Lid"
   global vardir
   vardir = "Lid"

def Lit ():

   params['variable']= ['lake_ice_temperature',]
   print("Its Lit")
   global var2
   var2 = "Lit"
   global vardir
   vardir = "Lit"

def Lmld ():

   params['variable']= ['lake_mix_layer_depth',]
   print("Its Lmld")
   global var2
   var2 = "Lmld"
   global vardir
   vardir = "Lmld"

def Lmlt ():

   params['variable']= ['lake_mix_layer_temperature',]
   print("Its Lmlt")
   global var2
   var2 = "Lmlt"
   global vardir
   vardir = "Lmlt"

def Lsf ():

   params['variable']= ['lake_shape_factor',]
   print("Its Lsf")
   global var2
   var2 = "Lsf"
   global vardir
   vardir = "Lsf"

def Ltlt ():

   params['variable']= ['lake_total_layer_temperature',]
   print("Its Ltlt")
   global var2
   var2 = "Ltlt"
   global vardir
   vardir = "Ltlt"

def Laihv ():

   params['variable']= ['leaf_area_index_high_vegetation',]
   print("Its Laihv")
   global var2
   var2 = "Laihv"
   global vardir
   vardir = "Laihv"

def Lailv ():

   params['variable']= ['leaf_area_index_low_vegetation',]
   print("Its Lailv")
   global var2
   var2 = "Lailv"
   global vardir
   vardir = "Lailv"

def Pe ():

   params['variable']= ['potential_evaporation',]
   print("Its Pe")
   global var2
   var2 = "Pe"
   global vardir
   vardir = "Pe"

def Ro ():

   params['variable']= ['runoff',]
   print("Its Ro")
   global var2
   var2 = "Ro"
   global vardir
   vardir = "Ro"

def Src ():

   params['variable']= ['skin_reservoir_content',]
   print("Its Src")
   global var2
   var2 = "Src"
   global vardir
   vardir = "Src"

def St ():

   params['variable']= ['skin_temperature',]
   print("Its St")
   global var2
   var2 = "St"
   global vardir
   vardir = "St"

def Sa ():

   params['variable']= ['snow_albedo',]
   print("Its Sa")
   global var2
   var2 = "Sa"
   global vardir
   vardir = "Sa"

def Sc ():

   params['variable']= ['snow_cover',]
   print("Its Sc")
   global var2
   var2 = "Sc"
   global vardir
   vardir = "Sc"

def Sd ():

   params['variable']= ['snow_density',]
   print("Its Sd")
   global var2
   var2 = "Sd"
   global vardir
   vardir = "Sd"

def Sdh ():

   params['variable']= ['snow_depth',]
   print("Its Sdh")
   global var2
   var2 = "Sdh"
   global vardir
   vardir = "Sdh"

def Sdwe ():

   params['variable']= ['snow_depth_water_equivalent',]
   print("Its Sdwe")
   global var2
   var2 = "Sdwe"
   global vardir
   vardir = "Sdwe"

def Se ():

   params['variable']= ['snow_evaporation',]
   print("Its Se")
   global var2
   var2 = "Se"
   global vardir
   vardir = "Se"

def Sf ():

   params['variable']= ['snowfall',]
   print("Its Sf")
   global var2
   var2 = "Sf"
   global vardir
   vardir = "Sf"

def Sm ():

   params['variable']= ['snowmelt',]
   print("Its Sm")
   global var2
   var2 = "Sm"
   global vardir
   vardir = "Sm"

def Stl1 ():

   params['variable']= ['soil_temperature_level_1',]
   print("Its Stl1")
   global var2
   var2 = "Stl1"
   global vardir
   vardir = "Stl1"

def Stl2 ():

   params['variable']= ['soil_temperature_level_2',]
   print("Its Stl2")
   global var2
   var2 = "Stl2"
   global vardir
   vardir = "Stl2"

def Stl3 ():

   params['variable']= ['soil_temperature_level_3',]
   print("Its Stl3")
   global var2
   var2 = "Stl3"
   global vardir
   vardir = "Stl3"

def Stl4 ():

   params['variable']= ['soil_temperature_level_4',]
   print("Its Stl4")
   global var2
   var2 = "Stl4"
   global vardir
   vardir = "Stl4"

def Ssrf ():

   params['variable']= ['sub_surface_runoff',]
   print("Its Ssrf")
   global var2
   var2 = "Ssrf"
   global vardir
   vardir = "Ssrf"

def Slhf ():

   params['variable']= ['surface_latent_heat_flux',]
   print("Its Slhf")
   global var2
   var2 = "Slhf"
   global vardir
   vardir = "Slhf"

def Sntr ():

   params['variable']= ['surface_net_thermal_radiation',]
   print("Its Sntr")
   global var2
   var2 = "Sntr"
   global vardir
   vardir = "Sntr"

def Sr ():

   params['variable']= ['surface_runoff',]
   print("Its Sr")
   global var2
   var2 = "Sr"
   global vardir
   vardir = "Sr"

def Sshf ():

   params['variable']= ['surface_sensible_heat_flux',]
   print("Its Sshf")
   global var2
   var2 = "Sshf"
   global vardir
   vardir = "Sshf"

def Ssrd ():

   params['variable']= ['surface_solar_radiation_downwards',]
   print("Its Ssrd")
   global var2
   var2 = "Ssrd"
   global vardir
   vardir = "Ssrd"

def Strd ():

   params['variable']= ['surface_thermal_radiation_downwards',]
   print("Its Strd")
   global var2
   var2 = "Strd"
   global vardir
   vardir = "Strd"

def Tsl ():

   params['variable']= ['temperature_of_snow_layer',]
   print("Its Tsl")
   global var2
   var2 = "Tsl"
   global vardir
   vardir = "Tsl"

def Te ():

   params['variable']= ['total_evaporation',]
   print("Its Te")
   global var2
   var2 = "Te"
   global vardir
   vardir = "Te"

def Vswl1 ():

   params['variable']= ['volumetric_soil_water_layer_1',]
   print("Its Vswl1")
   global var2
   var2 = "Vswl1"
   global vardir
   vardir = "Vswl1"

def Vswl2 ():

   params['variable']= ['volumetric_soil_water_layer_2',]
   print("Its Vswl2")
   global var2
   var2 = "Vswl2"
   global vardir
   vardir = "Vswl2"

def Vswl3 ():

   params['variable']= ['volumetric_soil_water_layer_3',]
   print("Its Vswl3")
   global var2
   var2 = "Vswl3"
   global vardir
   vardir = "Vswl3"

def Vswl4 ():

   params['variable']= ['volumetric_soil_water_layer_4',]
   print("Its Vswl4")
   global var2
   var2 = "Vswl4"
   global vardir
   vardir = "Vswl4"

def Default_case ():

   global any
   print("""\
       Wrong variable! The variable should be any of the following: 
       ['10m_u_component_of_wind', '10m_v_component_of_wind', '2m_dewpoint_temperature', '2m_temperature', 'surface_net_solar_radiation', 
        'total_precipitation', 'surface_pressure', 'forecast_albedo', 'evaporation_from_bare_soil', 'evaporation_from_open_water_surfaces_excluding_oceans',
        'evaporation_from_the_top_of_canopy', 'evaporation_from_vegetation_transpiration', 'lake_bottom_temperature', 'lake_ice_depth',
        'lake_ice_temperature', 'lake_mix_layer_depth', 'lake_mix_layer_temperature', 'lake_shape_factor', 'lake_total_layer_temperature',
        'leaf_area_index_high_vegetation', 'leaf_area_index_low_vegetation', 'potential_evaporation', 'runoff', 'skin_reservoir_content',
        'skin_temperature', 'snow_albedo', 'snow_cover', 'snow_density', 'snow_depth', 'snow_depth_water_equivalent', 'snow_evaporation',
        'snowfall', 'snowmelt', 'soil_temperature_level_1', 'soil_temperature_level_2', 'soil_temperature_level_3', 'soil_temperature_level_4',
        'sub_surface_runoff', 'surface_latent_heat_flux', 'surface_net_thermal_radiation', 'surface_runoff', 'surface_sensible_heat_flux',
        'surface_solar_radiation_downwards', 'surface_thermal_radiation_downwards', 'temperature_of_snow_layer', 'total_evaporation',
        'volumetric_soil_water_layer_1', 'volumetric_soil_water_layer_2', 'volumetric_soil_water_layer_3', 'volumetric_soil_water_layer_4', ] """)
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

    "fa": Fa,

    "efbs": Efbs,

    "eowsxo": Eowsxo,

    "eftc": Eftc,

    "efvt": Efvt,

    "lbt": Lbt,

    "lid": Lid,

    "lit": Lit,

    "lmld": Lmld,

    "lmlt": Lmlt,

    "lsf": Lsf,

    "ltlt": Ltlt,

    "laihv": Laihv,

    "lailv": Lailv,

    "pe": Pe,

    "ro": Ro,

    "src": Src,

    "st": St,

    "sa": Sa,

    "sc": Sc,

    "sd": Sd,

    "sdh": Sdh,

    "sdwe": Sdwe,

    "se": Se,

    "sf": Sf,

    "sm": Sm,

    "stl1": Stl1,

    "stl2": Stl2,

    "stl3": Stl3,

    "stl4": Stl4,

    "ssrf": Ssrf,

    "slhf": Slhf,

    "sntr": Sntr,

    "sr": Sr,

    "sshf": Sshf,

    "ssrd": Ssrd,

    "strd": Strd,

    "tsl": Tsl,

    "te": Te,

    "vswl1": Vswl1,

    "vswl2": Vswl2,

    "vswl3": Vswl3,

    "vswl4": Vswl4

}

database = 'reanalysis-era5-land'
params = { 'format': 'netcdf', }
params['time']=["{:02d}:00".format(i) for i in range(0,24,1)]
params['year'] = ['1981',]
params['month'] = ['1',]
d=monthrange(int(params['year'][0]), 2)
params['day'] = d[1]
params['area'] = ['0/28/-16/41',]   #  example for Tanzania
params['grid'] = ['0.05/0.05',]
#variable       ['10m_u_component_of_wind', '10m_v_component_of_wind', '2m_dewpoint_temperature', '2m_temperature', 'surface_net_solar_radiation', 
#        'total_precipitation', 'surface_pressure', 'forecast_albedo', 'evaporation_from_bare_soil', 'evaporation_from_open_water_surfaces_excluding_oceans',
#        'evaporation_from_the_top_of_canopy', 'evaporation_from_vegetation_transpiration', 'lake_bottom_temperature', 'lake_ice_depth',
#        'lake_ice_temperature', 'lake_mix_layer_depth', 'lake_mix_layer_temperature', 'lake_shape_factor', 'lake_total_layer_temperature',
#        'leaf_area_index_high_vegetation', 'leaf_area_index_low_vegetation', 'potential_evaporation', 'runoff', 'skin_reservoir_content',
#        'skin_temperature', 'snow_albedo', 'snow_cover', 'snow_density', 'snow_depth', 'snow_depth_water_equivalent', 'snow_evaporation',
#        'snowfall', 'snowmelt', 'soil_temperature_level_1', 'soil_temperature_level_2', 'soil_temperature_level_3', 'soil_temperature_level_4',
#        'sub_surface_runoff', 'surface_latent_heat_flux', 'surface_net_thermal_radiation', 'surface_runoff', 'surface_sensible_heat_flux',
#        'surface_solar_radiation_downwards', 'surface_thermal_radiation_downwards', 'temperature_of_snow_layer', 'total_evaporation',
#        'volumetric_soil_water_layer_1', 'volumetric_soil_water_layer_2', 'volumetric_soil_water_layer_3', 'volumetric_soil_water_layer_4', ] """)   # all vars 27/10/2020
#variable = ['10m_u_component_of_wind', '10m_v_component_of_wind', '2m_dewpoint_temperature',
#            '2m_temperature', 'surface_net_solar_radiation', 'total_precipitation', 'surface_pressure', 'forecast_albedo', ]  # for Utrecht 13/02/2020

##variable = ['10m_u_component_of_wind', '10m_v_component_of_wind', '2m_dewpoint_temperature',
##            '2m_temperature', 'evapotranspiration', 'surface_net_solar_radiation',       
##            'surface_net_thermal_radiation', 'surface_thermal_radiation_downwards', 'total_precipitation',]       # original, up to 13/02/2020
variable = ['10m_v_component_of_wind','10m_v_component_of_wind',]

target ='salida-2dm-t2-198402.nc'



def meteorologicalVariablesDownload():
      # Instantiate the parser
  parser = argparse.ArgumentParser(description='Download viariables from ERA5LandDownload. Positional arguments are: \
       dir_download, variable, yearStart, yearEnd, monthStart, monthEnd 0 lat_max lon_min lat_min lon_max . For example, to download total_precipitation variable in the current directory since January 1981 for Tanzania type: ./ERA5LandDownload.py . tp 1981 2019 1 12 0 0 28 -16 41 ')

  # Positional argument: path
  parser.add_argument('dir_download', type=str, nargs='?',
                            help='A dir_download string mandatory argument')
  # Positional argument: variable
  parser.add_argument('variable', type=str, nargs='?',
                            help='A variable name, string mandatory argument')
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
  # Positional argument: either download or update
  parser.add_argument('latmin', type=float, nargs='?',
                            help='A latmin float mandatory argument')
  # Positional argument: either download or update
  parser.add_argument('lonmin', type=float, nargs='?',
                            help='A lonmin float mandatory argument')
  # Positional argument: either download or update
  parser.add_argument('latmax', type=float, nargs='?',
                            help='A latmax float mandatory argument')
  # Positional argument: either download or update
  parser.add_argument('lonmax', type=float, nargs='?',
                            help='A lonmax float mandatory argument')
  # Optional argument:  Provide information names of all the variables to download
  parser.add_argument('-i', action="store_true", default=None,
                            help='List all the variable names to download')

  args = parser.parse_args()

  if args.i:
    print()
    print(datetime.now())
    print()
    print("The available ERA5Land key variable names are:")
    print()
    for key, value in sorted(Variable_Dict.items()):
      print(key, end = '\t, ')
    print()
    print()
    sys.exit(-1)

  print("Argument values:")
  if ((len(sys.argv) < 3 or len(sys.argv) > 12)): 
    print("""\
    At least two arguments must be provided: 
     1: dir_download where the files should be downloaded
     2: ERA5LandDownload variable name
    Usage:  ./ERA5LandDownload.py dir_download variable year_start year_end month_start month_end 0 lat_max lon_min lat_min lon_max
    Type ./ERA5LandDownload.py  -h  , for an example
    """)
    sys.exit(-1)

  args.latmin =-11.7
  args.latmax = 0.833
  args.lonmin = 29.58
  args.lonmax = 40.43
  args.variable = "tp"


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

@csrf_exempt
def handle(request):
      if request.method == 'GET':
            print("CLICKED GET")
            return render(request, "scpTest.html")

      if request.method == 'POST':
            print("CLICKED POST")
            print("I AM METVAR!!!!")
            
           ## name = request.get('firstName')
            body_u = request.body.decode('utf-8')
            body = json.loads(body_u)
           # print (body)
         #   print (body['volumetric_soil_water_layer_4'])
         #   meteorologicalVariablesDownload()
             os.system("sbatch  --export='Cty=MX,Var=tp,SY=1981,EY=1982,SM=1,EM=12,U=0,latm=16,lonm=99,LatM=17,LonM=100'    /mnt/SLURM_SCRIPTS/meteo-download.slurm") 
          #  completed = subprocess.call(["sbatch  --export='Cty=MX,Var=tp,SY=1981,EY=1982,SM=1,EM=12,U=0,latm=16,lonm=99,LatM=17,LonM=100'    /mnt/SLURM_SCRIPTS/meteo-download.slurm"])
            return HttpResponse('This is POST request from Met Var')
            

            
      return render(request, "index.html")