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

def ClimateIndicesCX1():
    print("Testing Climate Indices")
    ssh = SSHClient()
    ssh.load_system_host_keys()
    pwd ="Churubusco2114@"
     # passwd = input(" Enter the passwd: ")
    passwd = pwd
 #   print(passwd)
    ssh.load_system_host_keys()
    ssh.set_missing_host_key_policy(AutoAddPolicy())
    ssh.connect('login.hpc.ic.ac.uk',22,'ec407',passwd)
    scp = SCPClient(ssh.get_transport())
    ssh_stdin, ssh_stdout, ssh_stderr = ssh.exec_command("hostname")
    print("")
    print("1st command answer (hostname) = ", ssh_stdout.readlines(), ssh_stderr.readlines())
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

    cmd = "conda activate conda-R363-climate ; module load cdo/1.9.0 ; cd /rds/general/project/arise/live/Climate/scripts ; nohup Rscript /rds/general/project/arise/live/Climate/scripts/climate_index_calculation-bis.r 2 1 4  > ~/logs/output-test-dci-remotely 2>&1 & "
    transport = ssh.get_transport()
    channel = transport.open_session()
    channel.exec_command(cmd)
    print("")
    print(cmd)
    print("")
    print("7th command answer  ( executing CLIMATE downloading script) = ", ssh_stdout.readlines(), ssh_stderr.readlines())

@csrf_exempt
def handle(request):
      if request.method == 'GET':
            print("CLICKED GET")
            return render(request, "scpTest.html")

      if request.method == 'POST':
            print("CLICKED POST")
            print("CLIMATE INDICES RUNNING")
            
            body_u = request.body.decode('utf-8')
            body = json.loads(body_u)
            print (body['lastName'])
            ClimateIndicesCX1()
            return HttpResponse('This is POST request')
            

            
      return render(request, "index.html")