from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os
import json

import tkinter as tk
from tkinter import ttk
from tkinter import filedialog as fd
from sympy import false, true

import xarray as xr 

import uuid

import pandas as pd
import numpy as np
from scipy.interpolate import Rbf

from osgeo import gdal

def toTIFF(dfn, name):
    dfn.to_csv(name+".xyz", index = False, header = None, sep = " ")
    demn = gdal.Translate(name+".tif", name+".xyz")
    demn = None

class ConfigFile:
    def __init__(self,body):
        bodyJSON = json.loads(body)
        self.fileName =''
        self.time = 0 #netcdf
        self.timeN = 1
        self.band = 1 #geotiff
        self.bandN = 1
        self.col = 0 #csv
        self.colN = 1
        self.var = '' #netcdf csv
        self.vars = []
        self.ext = ''
        self.error = false
        self.id = uuid.uuid4()
        self.dateIni = ''
        self.dateEnd = ''
        self.datePeriod= 0

        self.path = os.path.expanduser('~')+"/temp/"
        filePort = open(self.path+"port.json", "r")
        dataPort = json.load(filePort)
        self.port=dataPort['port']
        self.fileNameTiff = ''
        
        if 'file' in bodyJSON.keys():
            self.fileName = bodyJSON['file']
        
        if self.fileName == '':
            self.iniSelectFile()

        if 'time' in bodyJSON.keys():
            self.time = int(bodyJSON['time'])
        if 'band' in bodyJSON.keys():
            self.band = int(bodyJSON['band'])
            if self.band<1:
                self.band=1
        if 'col' in bodyJSON.keys():
            self.col = int(bodyJSON['col'])
        if 'var' in bodyJSON.keys():
            self.var = bodyJSON['var']

        # print("self.band:",self.band)


        if self.fileName != '':
            self.ext=self.fileName.split('.')[-1]
        
        if self.ext=='tiff' or self.ext=='tif':
            self.openTiff()
        elif self.ext=='nc':
            self.openNetCDF()
        elif self.ext=='csv':
            self.openCSV()
        
        
        tiff_file = xr.open_dataset(self.fileNameTiff)
        self.minRAW = float(tiff_file['band_data'][self.band-1].min())
        self.maxRAW = float(tiff_file['band_data'][self.band-1].max())
        if (self.ext=="tif"):
            self.min=self.minRAW
            self.max=self.maxRAW
        

    def iniSelectFile(self):
        root = tk.Tk()
        root.title('Select File Dialog')
        root.resizable(False, False)
        root.geometry('300x150')
        self.selectFile(root)
        root.mainloop()
    
    def selectFile(self,root):
        filetypes = (
            ('netCDF, GeoTiff, CSV', '.nc .tif .csv'),
            ('netCDF', '*.nc'),
            ('GeoTiff', '*.tif'),
            ('CSV', '*.csv'),
            ('All files', '*.*'))
        self.fileName = fd.askopenfilename(
            title='Select file',
            initialdir='/media/alex/Datos/',
            filetypes=filetypes)
        root.destroy()

    def openNetCDF(self):
        nc_file = xr.open_dataset(self.fileName)
        # print(nc_file)
        # print('***********')
        # print(nc_file['longitude'])
        
        for var in nc_file:
            dims=nc_file[var].dims
            if( (len(dims)==3) and ("longitude" in dims) and ("latitude" in dims) and ("time" in dims) ):
                self.vars.append(var)
                # print("for *********nameVar",var)
        if len(self.vars)==0 :
            self.error = true
            return

        if self.var=='':
            self.var=self.vars[0]
        
        if not( self.var in self.vars ):
            self.error = true
            return

        self.band = 1

        pr = nc_file[ self.var ][ self.time ]
        datei= str( nc_file.time.data[ self.time ] )
        self.timeN = len( nc_file[ 'time' ] )
        self.min=float(pr.min())
        self.max=float(pr.max())
        pr = pr.rio.set_spatial_dims('longitude', 'latitude')
        pr.rio.crs
        self.fileNameTiff=self.path+"GeoTIFF"+str(self.id)+".tif"
        pr.rio.to_raster(self.fileNameTiff)

        self.dateIni = str(nc_file.time[0].values)
        self.dateEnd = str(nc_file.time[-1].values)
        self.datePeriod = int((nc_file.time[1].values - nc_file.time[0].values)/1000000)

    def openCSV(self):
        columns = list(pd.read_csv(self.fileName, nrows=1).select_dtypes("number").columns)
        columns.remove("lat")
        columns.remove("lon")
        self.band=1
        self.colN=len(columns)
        self.vars=columns
        if( self.col >= self.colN ):
            self.col=0
        
        # print("columns:", columns )
        # print("***col:", self.col )

        if self.var=='':
            self.var=str(columns[self.col])

        if not(self.var in columns):
            self.var=str(columns[0])
        

        # self.var='phase1.trigger'
        # print("var:", self.var )
        usecols=["lon","lat",self.var]
        df = pd.read_csv(self.fileName,usecols=usecols)
        lon=df.lon
        lat=df.lat
        val=df[self.var]
        # print("lon: ",lon)
        # print("lat: ",lat)
        # print("var: ",val)
        rbfi = Rbf(lon, lat, val, epsilon=0.001)
        # print("rbfi")
        lon_min=lon.min()
        lon_max=lon.max()
        lat_min=lat.min()
        lat_max=lat.max()
        # print("lon_min: ",lon_min)
        dstep=0.01
        lonTiff = np.arange(lon_min,lon_max+dstep/2,dstep)
        latTiff = np.arange(lat_min,lat_max+dstep/2,dstep)
        Nlon = len(lonTiff)
        Nlat = len(latTiff)
        x = np.tile(lonTiff, Nlat)
        y = np.repeat(latTiff, Nlon)
        interpolateXY=rbfi(x, y)
        # print("interpolate")
        self.min=interpolateXY.min()
        self.max=interpolateXY.max()
        # print("self.min: ",self.min)
        dfn = pd.DataFrame({"x":x, "y":y, "value":interpolateXY})
        # print("dfn")
        data = dfn.sort_values(by = ["y", "x"], ascending = [False, True])
        # print("sort")
        name=self.path+"GeoTIFF"+str(self.id)
        # print("name:",name)
        toTIFF(data, name)
        # print("toTIFF")
        self.fileNameTiff=name+".tif"
        self.ext="tif"
    
    def openTiff(self):
        # print("openTiff")
        self.fileNameTiff=self.fileName
        self.var="band"+str(self.band)





@csrf_exempt
def handle(request):

      if request.method == 'POST':
            body = request.body.decode('utf-8')
            # print("---------ConfigFile-----------")
            conf=ConfigFile(body)

            # print("conf.fileName: ",conf.fileName)
            # print('fileNameTiff',conf.fileNameTiff)
            # print('port',conf.port)
            # print('timeN',conf.timeN)
            # print('time',conf.time)
            # print('var',str(conf.var))
            # print('min',conf.min)
            # print('max',conf.max)
            # print('minRAW',conf.minRAW)
            # print('maxRAW',conf.maxRAW)
            # print('ext',conf.ext)
            # print('band',conf.band)
            # print('bandN',conf.bandN)

            response={}
            response['fileName']=conf.fileName
            response['fileNameTiff']=conf.fileNameTiff
            response['port']=conf.port
            response['timeN']=conf.timeN
            response['time']=conf.time
            response['var']=str(conf.var)
            response['vars']=conf.vars
            response['min']=conf.min
            response['max']=conf.max
            response['minRAW']=conf.minRAW
            response['maxRAW']=conf.maxRAW
            response['ext']=conf.ext
            response['band']=conf.band
            response['bandN']=conf.bandN
            response['dateIni']=conf.dateIni
            response['dateEnd']=conf.dateEnd
            response['datePeriod']=conf.datePeriod
            return JsonResponse(response)

           
            
      return render(request, "index.html")