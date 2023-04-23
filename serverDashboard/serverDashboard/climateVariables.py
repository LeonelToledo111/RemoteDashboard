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

def ClimateVariablesCX1():
    ssh = SSHClient()
    ssh.load_system_host_keys()
    pwd ="Churubusco2114@"
     # passwd = input(" Enter the passwd: ")
    passwd = pwd
   # print(passwd)
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


def climateVariablesScript():
      print()

@csrf_exempt
def handle(request):
      if request.method == 'GET':
            print("CLICKED GET")
            return render(request, "scpTest.html")

      if request.method == 'POST':
            print("CLICKED POST")
            print("CLIMATE VARIABLES RUNNING")
            
           ## name = request.get('firstName')
            body_u = request.body.decode('utf-8')
            body = json.loads(body_u)
            print (body['lastName'])
            climateVariablesScript()
            return HttpResponse('This is POST request')
            

            
      return render(request, "index.html")