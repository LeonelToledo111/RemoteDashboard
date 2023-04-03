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

def slurmWrapper(data):

   call = '/home/admin/PRODUCTION/Run/run  -c "me" -l "0" -m "28" -n "-16" -o "41" -v "e" -s "1981" -e "1982" -a "1" -b "12" -u "0" -r ""'
   base = '/home/admin/PRODUCTION/Run/run -c'

   startDate =data['_startDate']
   start = startDate.split("-")
   endDate = data ['_endDate']
   end = endDate.split("-")

   variableValue=""
   Region =""
   Country =data['_cCode']
   Start_year=start[0]
   End_year=end[0]
   Start_month=start[1]
   End_month=end[1]
   Update = "0"
   Latitude_min=data['_minLat']
   Latitude_max =data['_maxLat']
   Longitude_min=data['_minLon']
   Longitude_max=data['_maxLon']

   fCountry = Country[1:]
   print(Country +"Delimiter")

   base = '/home/admin/PRODUCTION/Run/run -c ' + '"'+fCountry+'" ' +'-l ' + '"'+str(Longitude_min)+'" '
   base += '-m ' + '"'+str(Longitude_max)+'" '
   base += '-n ' + '"'+str(Latitude_min)+'" '
   base += '-o ' + '"'+str(Latitude_max)+'" '

   secondPart='-s ' + '"'+Start_year+'" '
   secondPart+='-e ' + '"'+End_year+'" '
   secondPart+='-a ' + '"'+Start_month+'" '
   secondPart+='-b ' + '"'+End_month+'" '
   secondPart+='-u ' + '"'+Update+'" '
   secondPart+='-r ' + '"'+Region+'"'

   variableString=""

  # -l Longitude_min
  # -m Longitude_max
  # -n Latitude_min
  # -o Latitude_max
  # -v variable
  # -s start year
  # -e end year
  # -a Start_month
  # -b End_month
  # -u Update
  # -r region



   print (call)
   print (base)

   if(data['m_u_component_of_wind']==True ):
      variableValue="10u"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['m_v_component_of_wind']==True ):
      variableValue="10v"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['m_dewpoint_temperature']==True ):
      variableValue="2d"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['m_temperature']==True ):
      variableValue="2t"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['evaporation_from_bare_soil']==True ):
      variableValue="Es"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['evaporation_from_open_water_surfaces_excluding_oceans']==True ):
      variableValue="Eowsxo"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['evaporation_from_the_top_of_canopy']==True ):
      variableValue="Eftc"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['evaporation_from_vegetation_transpiration']==True ):
      variableValue="Efvt"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['forecast_albedo']==True ):
      variableValue="Fa"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['lake_bottom_temperature']==True ):
      variableValue="Lbt"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['lake_ice_depth']==True ):
      variableValue="Lid"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['lake_ice_temperature']==True ):
      variableValue="Lit"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['lake_mix_layer_depth']==True ):
      variableValue="Lmld"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['lake_mix_layer_temperature']==True ):
      variableValue="Lmlt"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['lake_shape_factor']==True ):
      variableValue="Lsf"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['lake_total_layer_temperature']==True ):
      variableValue="Ltlt"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['leaf_area_index_high_vegetation']==True ):
      variableValue="Laihv"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['leaf_area_index_low_vegetation']==True ):
      variableValue="Lailv"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['potential_evaporation']==True ):
      variableValue="Pe"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['runoff']==True ):
      variableValue="Ro"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['skin_reservoir_content']==True ):
      variableValue="Src"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['skin_temperature']==True ):
      variableValue="St"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['snow_albedo']==True ):
      variableValue="Sa"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['snow_cover']==True ):
      variableValue="Sc"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['snow_density']==True ):
      variableValue="Sd"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['snow_depth']==True ):
      variableValue="Sdh"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['snow_depth_water_equivalent']==True ):
      variableValue="Sdwe"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['snow_evaporation']==True ):
      variableValue="Se"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['snowfall']==True ):
      variableValue="Sf"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['snowmelt']==True ):
      variableValue="Sm"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['soil_temperature_level_1']==True ):
      variableValue="Stl1"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['soil_temperature_level_2']==True ):
      variableValue="Stl2"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['soil_temperature_level_3']==True ):
      variableValue="Stl3"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['soil_temperature_level_4']==True ):
      variableValue="Stl4"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['sub_surface_runoff']==True ):
      variableValue="Ssrf"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['surface_latent_heat_flux']==True ):
      variableValue="Slhf"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['surface_net_thermal_radiation']==True ):
      variableValue="Sntr"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['surface_pressure']==True ):
      variableValue="Sp"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['surface_runoff']==True ):
      variableValue="Sr"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['surface_sensible_heat_flux']==True ):
      variableValue="Sshf"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['surface_net_solar_radiation']==True ):
      variableValue="Ssr"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['surface_solar_radiation_downwards']==True ):
      variableValue="Ssrd"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['surface_thermal_radiation_downwards']==True ):
      variableValue="Strd"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['temperature_of_snow_layer']==True ):
      variableValue="Tsl"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['total_evaporation']==True ):
      variableValue="Te"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['total_precipitation']==True ):
      variableValue="Tp"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['volumetric_soil_water_layer_1']==True ):
      variableValue="Vswl1"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['volumetric_soil_water_layer_2']==True ):
      variableValue="Vswl2"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if(data['volumetric_soil_water_layer_3']==True ):
      variableValue="Vswl3"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)
   if (data['volumetric_soil_water_layer_4']==True ):
      variableValue="Vswl4"
      slurmJob = base + '-v ' + '"'+variableValue+'" ' + secondPart
      os.system(slurmJob)
      print(slurmJob)

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
            print (body)
        #    print (body['volumetric_soil_water_layer_4'])
            slurmWrapper(body)
         #   print (body['volumetric_soil_water_layer_4'])
         #   meteorologicalVariablesDownload()
           #  os.system("sbatch  --export='Cty=MX,Var=tp,SY=1981,EY=1982,SM=1,EM=12,U=0,latm=16,lonm=99,LatM=17,LonM=100'    /mnt/SLURM_SCRIPTS/meteo-download.slurm") 
           # subprocess.run([sys.executable, "batch.py"])
           # completed = subprocess.call(["sbatch  --export='Cty=MX,Var=tp,SY=1981,EY=1982,SM=1,EM=12,U=0,latm=16,lonm=99,LatM=17,LonM=100'    /mnt/SLURM_SCRIPTS/meteo-download.slurm"])
            return HttpResponse('This is POST request from Met Var')  
      return render(request, "index.html")