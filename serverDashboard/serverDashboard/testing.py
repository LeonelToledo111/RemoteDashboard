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

urllib3.disable_warnings()

var2 = ''
var1 = 'Variable_'
any = 0
vardir = ''

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

 # if ((len(sys.argv) < 3 or len(sys.argv) > 12)): 
   # print("""\
    #At least two arguments must be provided: 
    # 1: dir_download where the files should be downloaded
    # 2: ERA5LandDownload variable name

  #  Usage:  ./ERA5LandDownload.py dir_download variable year_start year_end month_start month_end
   # Type ./ERA5LandDownload.py  -h  , for an example
    #""")
    #sys.exit(-1)

  args.dir_download="Y:\Imperial College\DescargasDashboard"
  if args.dir_download is None:
        print ("error parsing stream args.dir_download = ",args.dir_download)
        #args.dir_download = "./" + "Variable_SSR"
        args.dir_download = "."
  else:
        print(args.dir_download)
     #   cmd = "mkdir -p " + args.dir_download
      #  pathlib.Path(args.dir_download).mkdir(parents=True, exist_ok=True) 
      #  print(cmd)
        #os.system(cmd)

  args.variable="ssr"
  if args.variable is None:
        print ("ERROR!: A variable must be specified ")
        parser.print_help()
        sys.exit()
        #args.variable = "10u10v"
  else:
        print(args.variable)

  args.yearStart=2013
  if args.yearStart is None:
        print ("missing parsing args.yearStart")
        args.yearStart = 1981
  else:
        print(args.yearStart)

  args.yearEnd = 2013
  if args.yearEnd is None:
        print ("missing parsing args.yearEnd")
        currentdate = datetime.today()
        args.yearEnd = currentdate.year
  else: 
        print(args.yearEnd)

  args.monthStart=3
  if args.monthStart is None:
        print ("missing parsing args.monthStart")
        args.monthStart = 1
  else:
        print(args.monthStart)

  args.monthEnd=4
  if args.monthEnd is None:
        print ("missing parsing args.monthEnd")
        currentdate = datetime.today()
        args.monthEnd = currentdate.month
  else:
        print(args.monthEnd)

  args.update=0
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

  args.latmin = 0
  if args.latmin is None:
        print ("ERROR!: A latmin must be specified ")
        parser.print_help()
        sys.exit()
  else:
        print(args.latmin)

  args.lonmin=28
  if args.lonmin is None:
        print ("ERROR!: A lonmin must be specified ")
        parser.print_help()
        sys.exit()
  else:
        print(args.lonmin)

  args.latmax=-16
  if args.latmax is None:
        print ("ERROR!: A latmax must be specified ")
        parser.print_help()
        sys.exit()
  else:
        print(args.latmax)

  args.lonmax=41
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

  #if args.update == 0:
   # cmd = "mkdir -p " + args.dir_download + '/' + var1 + vardir
    #cmd2 = args.dir_download + '/' + var1 + vardir
    #pathlib.Path(cmd2).mkdir(parents=True, exist_ok=True) 
    #print(cmd)
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

      
def button(request):
      return render(request, 'index.html')

@csrf_exempt
def buttonCodeTest(request):
      print ("Climate Request")
      if request.method == 'GET':
            print("CLICKED GET")
            return render(request, "scpTest.html")

      if request.method == 'POST':
            print("CLICKED POST")
            
           ## name = request.get('firstName')
            body_u = request.body.decode('utf-8')
            body = json.loads(body_u)
            print (body['lastName'])
            CX1()
            return HttpResponse('This is POST request')
            

            
      return render(request, "index.html")

@csrf_exempt
def buttonCode(request):
      print("Starting")
      x=11
      if request.method == 'GET':
            print("CLICKED GET")
            
            main()
            return HttpResponse(x)
             # ssr ./TNZ/ 2013 2013 3 4 0 0 28 -16 41
            
      if request.method == 'POST':
            print("CLICKED POST")
            print("Data is")
           
          #  return HttpResponse(x)

      print("SOMEONE CLICKED ON ME")

      #main()
      return render(request, "index.html")

def CX1():
      ssh = SSHClient()
      ssh.load_system_host_keys()
      pwd ="Churubusco2114@"
     # passwd = input(" Enter the passwd: ")
      passwd = pwd
      print(passwd)
      ssh.load_system_host_keys()
      ssh.set_missing_host_key_policy(AutoAddPolicy())
      ssh.connect('login.hpc.ic.ac.uk',22,'ec407',passwd)
      scp = SCPClient(ssh.get_transport())
      #scp.put('/home/cafe/CAFE/Miztli','/rds/general/user/ec407/home/Miztli-cafe')
      #scp.put('/home/cafe/CAFE/Miztli','test1-cafe-bis')

      #ssh_stdin, ssh_stdout, ssh_stderr = ssh.exec_command("python -V")
      ssh_stdin, ssh_stdout, ssh_stderr = ssh.exec_command("hostname")
      print("")
      print("1st command answer (hostname) = ", ssh_stdout.readlines(), ssh_stderr.readlines())

      #ssh_stdin, ssh_stdout, ssh_stderr = ssh.exec_command("nohup ~/ECMWF-srcs/ERA5LandDownload.py ./TNZ/ ssr  2013 2013 7 8 0 0 28 -16 41 > ~/SCRATCH/era5_downloads 2>&1 &")
      #print("")
      #print("2nd command answer  = ", ssh_stdout.readlines(), ssh_stderr.readlines())

      ssh_stdin, ssh_stdout, ssh_stderr = ssh.exec_command('date')
      print("")
      print("3rd command answer (date) = ", ssh_stdout.readlines(), ssh_stderr.readlines())
      print("")

      today = date.today()
      # ddmmYY
      d1 = today.strftime("%d%m%Y")
      out_filename = "hadgem2-ao-"+d1+".sh"
      esgf_node = "esgf-node.ipsl.upmc.fr"
      cli_vars = "ps,rlut,sfcWind,psl,ua,va,uas,vas,wap"
      cli_prj = "CMIP5"
      cli_mdl = "HadGEM2-AO"
      cli_tmf = "day"
      cli_exps = "rcp26"
      cli_lim = "10000"
      cli_str = "project,model,experiment,variable"
      print("")

      #target = args.dir_download + '/' + var1 + vardir + "/ERA5-Land_%s_%04d%02d.nc" % (var2,year,month)
      #cmd = "nohup wget -O " + out_filename + " 'https://" + esgf_node + '/esg-search/wget?variable=' + cli_vars + '&project=' + cli_prj + '&model=' + cli_mdl + '&time_frequency=' + cli_tmf + '&experiment=' + cli_exps + '&limit=' + cli_lim + '&download_structure=' + cli_str + "'" 
      #print(cmd)
      #ssh_stdin, ssh_stdout, ssh_stderr = ssh.exec_command("nohup wget -O out_filename 'https://esgf-node.ipsl.upmc.fr/esg-search/wget?variable=tas&project=CMIP5&model=HadGEM2-AO&time_frequency=day&experiment=rcp26,rcp45,rcp85&limit=10000&download_structure=project,model,experiment,variable'")
      #ssh_stdin, ssh_stdout, ssh_stderr = ssh.exec_command(cmd)
      #print("")
      #print("5th command answer (CLIMATE nohup wget -O ...) = ", ssh_stdout.readlines(), ssh_stderr.readlines())

      #cmd = "chmod +x " + out_filename
      #ssh_stdin, ssh_stdout, ssh_stderr = ssh.exec_command(cmd)
      #print("")
      #print(cmd)
      #print("")
      #print("6th command answer  ( chmod ) = ", ssh_stdout.readlines(), ssh_stderr.readlines())

      #cmd = "nohup ~/" + out_filename + " -iTs &"
      #cmd = " nohup ~/" + "hadgem2-ao-06102020.sh > /dev/null 2>&1 & "
      cmd = " nohup ~/" + "hadgem2-ao-06102020.sh -n > sal-hadgem2-ao-06102020 2>&1 & "
      transport = ssh.get_transport()
      channel = transport.open_session()
      #ssh_stdin, ssh_stdout, ssh_stderr = channel.exec_command(cmd)
      channel.exec_command(cmd)
      print("")
      print(cmd)
      print("")
      print("7th command answer  ( executing CLIMATE downloading script) = ", ssh_stdout.readlines(), ssh_stderr.readlines())

