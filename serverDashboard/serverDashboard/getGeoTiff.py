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
#import rioxarray

import uuid

import pandas as pd
import numpy as np
from scipy.interpolate import Rbf

#from osgeo import gdal

def toTIFF(dfn, name):
    dfn.to_csv(name+".xyz", index = False, header = None, sep = " ")
 #   demn = gdal.Translate(name+".tif", name+".xyz")
    demn = None

class ConfigFile:
    def __init__(self,bodyJSON):
        
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
        self.min=0
        self.minRAW=0
        self.max=0
        self.maxRAW=0

        # self.path = os.path.expanduser('~')+"/temp/"
        self.path = "/home/temp/"
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
        # print("self.var:",self.var)


        if self.fileName != '':
            self.ext=self.fileName.split('.')[-1]
        
        if self.ext=='tiff' or self.ext=='tif':
            self.openTiff()
        elif self.ext=='nc':
            self.openNetCDF()
        elif self.ext=='csv':
            self.openCSV()

        
        

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
            # initialdir='/media/alex/Datos/',
            initialdir='/home/temp/',
            filetypes=filetypes)
        root.destroy()

    def openNetCDF(self):
        nc_file = xr.open_dataset(self.fileName)
        # print(nc_file)
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
            self.var=self.vars[0]

        

        self.band = 1

        pr = nc_file[ self.var ][ self.time ]
        datei= str( nc_file.time.data[ self.time ] )
        self.timeN = len( nc_file[ 'time' ] )
        self.min=float(pr.min())
        self.minRAW=self.min
        self.max=float(pr.max())
        self.maxRAW=self.max
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
        self.minRAW=self.min
        self.max=interpolateXY.max()
        self.maxRAW=self.max
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

        # if self.var=='band1':
        #     self.band=1
        # elif self.var=='band2':
        #     self.band=2
        # elif self.var=='band3':
        #     self.band=3
        # temp=self.var.replace("band", "", 1)

        # print("*****",self.var,"->",temp)
        # self.var="band"+str(self.band)
        
        # tiff_file = xr.open_dataset(self.fileNameTiff)
        tiff_file = xr.open_dataset(self.fileNameTiff)

        # print("***********",tiff_file.attrs['long_name'])
        self.bandN=len(tiff_file['band_data'])

        print("1****",self.var, self.band)

        if self.var.isnumeric():
            self.band=int(self.var)
        else:
            self.band=1
        
        if self.band>self.bandN :
            self.band=1

        self.var=str(self.band)
        print("2****",self.var, self.band)

        # self.var=str(self.band)
        for i in range( self.bandN ):
            self.vars.append( str(i+1) )
            # self.vars.append( 'band'+str(i+1) )
        self.minRAW = float(tiff_file['band_data'][self.band-1].min())
        self.maxRAW = float(tiff_file['band_data'][self.band-1].max())
        self.min=self.minRAW
        self.max=self.maxRAW
        





@csrf_exempt
def handle(request):

      if request.method == 'POST':
            body = request.body.decode('utf-8')
            bodyJSON = json.loads(body)
            response={}
            files=[]
            list_files=[]
            print("---------Path-----------")
            if 'path' in bodyJSON.keys():
                print("path: ",bodyJSON['path'])
                list_files = os.listdir(path=bodyJSON['path'])
                print("list: ",list_files)
            elif 'file' in bodyJSON.keys():
                list_files.append(bodyJSON['file'])

            for file in list_files:
                # print("bodyJSON: ",bodyJSON)
                # print("file: ",bodyJSON['path']+"/"+list_files[0])
                if 'path' in bodyJSON.keys():
                    bodyJSON['file']=bodyJSON['path']+"/"+file
                # print("---------ConfigFile-----------")
                # if(body.file)
                conf=ConfigFile(bodyJSON)
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

                # tiff_file = xr.open_dataset(conf.fileNameTiff)
                
                # print("***********",tiff_file[0])
                # print("***********",tiff_file[0][0][0])
                # nodatavals = tiff_file.attrs["nodatavals"][0]
                # print("nodatavals:",nodatavals)
                                # nodatavals = -1000
                # print([data for data in tiff_file[0][0] if data != nodatavals])
                # maxData=max([data for data in tiff_file[0][0] if data != nodatavals] )
                # print("***max: ",maxData)
                
                dataFile={}
                dataFile['fileName']=conf.fileName
                dataFile['fileNameTiff']=conf.fileNameTiff
                dataFile['port']=conf.port
                dataFile['timeN']=conf.timeN
                dataFile['time']=conf.time
                dataFile['var']=str(conf.var)
                dataFile['vars']=conf.vars
                dataFile['min']=conf.min
                dataFile['max']=conf.max
                dataFile['minRAW']=conf.minRAW
                dataFile['maxRAW']=conf.maxRAW
                dataFile['ext']=conf.ext
                dataFile['band']=conf.band
                dataFile['bandN']=conf.bandN
                dataFile['dateIni']=conf.dateIni
                dataFile['dateEnd']=conf.dateEnd
                dataFile['datePeriod']=conf.datePeriod
                files.append(dataFile)

            allmin=min(file['min'] for file in files)
            allmax=max(file['max'] for file in files)
            
            for file in files:
                file['min']=allmin
                file['max']=allmax
                # file['minRAW']=allminRAW
                # file['maxRAW']=allmaxRAW
                # tiff_file = xr.open_rasterio(file['fileNameTiff'])
                # print("***********",tiff_file.attrs['long_name'])
                # print("***********",tiff_file.attrs["transform"])
                # print("***********",tiff_file.attrs["scales"])
                # print("***********",tiff_file.attrs["offsets"])
                # print("***********",tiff_file.sizes['x'])
                # scale=tiff_file.attrs["scales"][0]
                # offset=tiff_file.attrs["offsets"][0]

                tiff_file = rioxarray.open_rasterio(file['fileNameTiff'])
                scale=tiff_file.attrs["scale_factor"]
                offset=tiff_file.attrs["add_offset"]
                bounds=tiff_file.rio.bounds()
                file['longitudeE']=bounds[0]
                file['latitudeS']=bounds[1]
                file['longitudeW']=bounds[2]
                file['latitudeN']=bounds[3]
                # print("***********scale:",scale)
                # print("***********offset:",offset)
                file['minRAW']=(file['min']-offset)/scale
                file['maxRAW']=(file['max']-offset)/scale
                # bounds=tiff_file.rio.bounds()
                # print(bounds[0])


            response['files']=files

            return JsonResponse(response)

           
            
      return render(request, "index.html")