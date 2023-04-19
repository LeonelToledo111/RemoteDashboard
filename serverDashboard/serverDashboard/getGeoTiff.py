from cmath import isnan, nan
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os
import glob
import json

import tkinter as tk
from tkinter import ttk
from tkinter import filedialog as fd
from sympy import false, true

import xarray as xr 
import rioxarray
import rasterio
import rasterstats as rstats

import uuid

import pandas as pd
import numpy as np
from scipy.interpolate import Rbf
from affine import Affine
# import geopandas as gpd


path = "/home/temp/"

def gimme_mesh(xmin,ymin,xmax,ymax,dstep):
    x=np.arange(xmin,xmax+dstep/2,dstep)
    y=np.arange(ymax,ymin-dstep/2,-dstep)
    xm,ym=np.meshgrid(x, y)
    return x,y,xm,ym

def selectFiles():
    filetypes = (
        ('netCDF, GeoTiff, CSV, GeoJson ShapeFile', '.nc .nc4 .tif .tiff .csv .json .geojson .shp'),
        ('netCDF', '*.nc *nc4'),
        ('GeoTiff', '*.tif *.tiff'),
        ('CSV', '*.csv'),
        ('GeoJson', '*.json *.geojson'),
        # ('ShapeFile', '*.shp'),
        ('All files', '*.*')
    )
    root = tk.Tk()
    root.withdraw()
    root.title('Select File Dialog')
    files_path = fd.askopenfilenames(
        title='Select file',
        initialdir='/home/date/',
        filetypes=filetypes)
    root.destroy()
    root.mainloop()
    ext_ok=False
    ext0=''
    if files_path:
        ext0=files_path[0].split('.')[-1]
        ext_ok=True
        #print(ext0)
    for file in files_path:
        ext=file.split('.')[-1]
        if ext0 != ext:
            ext_ok=False
            break
        #print(file,":",ext)
    
    if ext_ok:
        return {"ext":ext0, "path":files_path}

# def openSHP(filePath):
#     shpfile=gpd.read_file(filePath)
#     # print(shp)
#     shpfile = shpfile.to_crs(epsg=4326)
#     fileData = {}
#     fileData["shapefile"]=shpfile.to_json()
#     # print(shpfile.geometry)
#     return fileData

# def openSHPs(filesPath):
#     # files={"filesNameTiff":[], "var":'', "vars":[]}
#     files={}
#     cleanTiffs()
#     for index,filePath in enumerate(filesPath):
#         print("openSHPs:",filePath)
#         shpFile=openSHP(filePath)
#         files.update(shpFile)
#     print("***Files:",files)
#     return files

def openGeoJson(filePath):
    print("abriendo GeoJson")
    fileGeoJson={}
    fileGeoJson["filename"]=filePath
    with open(filePath) as f:
        fileGeoJson["dataGeoJson"] = json.loads(f.read())
    return fileGeoJson

def openGeoJsons(filesPath):
    files={"filesGeoJson":[]}
    cleanTiffs()
    for index,filePath in enumerate(filesPath):
        print("openSHPs:",filePath)
        fileGeoJson=openGeoJson(filePath)
        # files.update(fileGeoJson)
        files["filesGeoJson"].append( fileGeoJson )
    return files


#     fileData["shapefile"]=shpfile.to_json()

def openTiff(filePath, band=1):
    print(filePath)
    fileTiff = {}
    fileTiff["filename"]=filePath
    rioFile = rioxarray.open_rasterio(fileTiff["filename"],masked=True)
    #src=rasterio.open(self.fileName)
        #affine = src.transform
        #nodata = src.nodata
        #nodata = nc_var.rio.encoded_nodata

    fileTiff["bandN"] = rioFile["band"].size
    fileTiff["band"] = band
    if fileTiff["band"] > fileTiff["bandN"] :
        fileTiff["band"] = 1
    fileTiff["scale"] = rioFile.attrs["scale_factor"]
    fileTiff["offset"] = rioFile.attrs["add_offset"]
    fileTiff["minRaster"] = float(rioFile.variable[fileTiff["band"]-1].min(skipna=True))
    fileTiff["maxRaster"] = float(rioFile.variable[fileTiff["band"]-1].max(skipna=True))
    fileTiff["min"] = fileTiff["minRaster"]*fileTiff["scale"]+fileTiff["offset"]
    fileTiff["max"] = fileTiff["maxRaster"]*fileTiff["scale"]+fileTiff["offset"]
    print(fileTiff["filename"])
    print("min:",fileTiff["min"],"minRaster:",fileTiff["minRaster"])
    print("max:",fileTiff["max"],"maxRaster:",fileTiff["maxRaster"])
    # fileTiff["min"] = float(rioFile.variable[fileTiff["band"]-1].min())
    # fileTiff["max"] = float(rioFile.variable[fileTiff["band"]-1].max())
    
    # fileTiff["projection"] = "EPSG:3857"
    # fileTiff["projection"] = "epsg:4326"
    # fileTiff["projection"] = "EPSG:4326"
    # fileTiff["projection"] = rioFile.rio.crs
    # print("crs:",rioFile.rio.crs)
    # print("projection:",rioFile.rio.crs.to_proj4())
    fileTiff["palette"]="colorbrewer.diverging.RdYlGn_11"
    # fileTiff["var"]=[1]
    # fileTiff["vars"]=1
    return fileTiff

def openTiffs(filesPath, band=1):
    filesTiff={"files":[]}
    # for filePath in filesPath:
    #     filesTiff["files"].append( openTiff(filePath, band) )
    filesTiff["files"]=tuple(openTiff(item, band) for item in filesPath)
    filesTiff["min"]=min(x['min'] for x in filesTiff["files"])
    filesTiff["max"]=max(x['max'] for x in filesTiff["files"])
    filesTiff["bandN"]=filesTiff["files"][0]["bandN"]
    filesTiff["band"]=band
    filesTiff["filesGeoJson"]=[]
    # filesTiff["var"]="band:"+str(band)
    for fileTiff in filesTiff["files"]:
        print(fileTiff["filename"])
        print("1 min:",fileTiff["min"],"minRaster:",fileTiff["minRaster"])
        fileTiff["minRasterG"]=(filesTiff['min']-fileTiff["offset"])/fileTiff["scale"]
        print("2 min:",fileTiff["min"],"minRaster:",fileTiff["minRaster"])
        print("1 max:",fileTiff["max"],"maxRaster:",fileTiff["maxRaster"])
        fileTiff["maxRasterG"]=(filesTiff['max']-fileTiff["offset"])/fileTiff["scale"]
        print("2 max:",fileTiff["max"],"maxRaster:",fileTiff["maxRaster"])
    
    print("filesTiff.min",filesTiff["min"]) 
    print("filesTiff.max",filesTiff["max"])
    print("filesTiff.bandN",filesTiff["files"][0]["bandN"])

    return filesTiff

def openFilePort():
    
    filePort = open(path+"port.json", "r")
    dataPort = json.load(filePort)
    return dataPort['port']

def cleanTiffs():
    files = glob.glob(path+'/tiffs/*.tif')
    for f in files:
        print("files:",f)
        try:
            # f.unlink()
            os.remove(f)
        except OSError as e:
            print("Error: %s: %s"%(f,e.strerror))
    files = glob.glob(path+'/tiffs/*.xml')
    for f in files:
        print("files:",f)
        try:
            # f.unlink()
            os.remove(f)
        except OSError as e:
            print("Error: %s: %s"%(f,e.strerror))

def csvs2Tiffs(filesPath, var=''):
    files={"filesNameTiff":[], "var":'', "vars":[]}
    cleanTiffs()
    for index,filePath in enumerate(filesPath):
        print("csvs2Tiffs:",filePath)
        # filesTiff.append( netCDF2Tiff(filePath, var, index) )
        fileCSV2Tiff=csv2Tiff(filePath, var, uuid.uuid4().hex)
        print("fileNetCDF2Tiff",fileCSV2Tiff)
        # filesTiff.append( fileNetCDF2Tiff["fileNameTiff"] )
        files["filesNameTiff"].append( fileCSV2Tiff["fileNameTiff"] )
        # files["var"]=fileCSV2Tiff["var"]
        # files["vars"]=fileCSV2Tiff["vars"]
        files.update(fileCSV2Tiff)
    return files

def csv2Tiff(filePath, var='',id=0):
    fileCSV = {"fileNameTiff":''}
    print("filePath:",filePath)
    columns = list(pd.read_csv(filePath, nrows=1).select_dtypes("number").columns)
    print("var:",var)
    print("columns:",columns)
    columns.remove("lat")
    columns.remove("lon")
    # self.band=1
    colN=len(columns)
    vars=columns
    if var=='' or not(var in columns):
        var=str(columns[0])
    usecols=["lon","lat",var]
    df = pd.read_csv(filePath,usecols=usecols)
    lon=df.lon
    lat=df.lat
    val=df[var]
    rbfi = Rbf(lon, lat, val, epsilon=0.001)
    lon_min=lon.min()
    lon_max=lon.max()
    lat_min=lat.min()
    lat_max=lat.max()
    dstep=0.01
    lonTiff,latTiff,lon_grid,lat_grid=gimme_mesh(lon_min,lat_min,lon_max,lat_max,dstep)
    interpolateXY=rbfi(lon_grid, lat_grid)
    cs = np.array([interpolateXY])
    coords = [[0],latTiff.tolist(),lonTiff.tolist()]
    dims = ["band", "y", "x"]
    xcs = (
        xr.DataArray(cs, coords=coords, dims=dims)
        .astype("float32")
    )
    xcs.rio.crs
    xcs.rio.set_crs("epsg:4326")
    fileNameTiff=path+"/tiffs/GeoTIFF_"+str(id)+".tif"
    xcs.rio.to_raster(fileNameTiff)
    fileCSV["fileNameTiff"]=fileNameTiff
    fileCSV["var"]=var
    fileCSV["vars"]=vars
    return fileCSV

def netCDFs2Tiffs(filesPath, var='', timei=0, polygon=""):
    files={"filesNameTiff":[], "var":'', "vars":[]}
    cleanTiffs()
    print("***netCDFs2Tiffs var:",var)
    for index,filePath in enumerate(filesPath):
        print("netCDFs2Tiffs:",filePath)
        # filesTiff.append( netCDF2Tiff(filePath, var, index) )
        fileNetCDF2Tiff=netCDF2Tiff(filePath, var=var, id=uuid.uuid4().hex, timei=timei, polygon=polygon)
        print("fileNetCDF2Tiff",fileNetCDF2Tiff)
        # filesTiff.append( fileNetCDF2Tiff["fileNameTiff"] )
        files["filesNameTiff"].append( fileNetCDF2Tiff["fileNameTiff"] )
        # files["var"]=fileNetCDF2Tiff["var"]
        # files["vars"]=fileNetCDF2Tiff["vars"]
        # files["timeN"]=fileNetCDF2Tiff["timeN"]
        # files["timei"]=fileNetCDF2Tiff["timei"]
        files.update(fileNetCDF2Tiff)
    # print(files["filesNameTiff"])
    return files

def netCDF2Tiff(filePath, var='',id=0, polygon="", timei=0):
    print("netCDF2Tiff:",filePath)
    fileNetCDF = {"fileNameTiff":''}
    try:
        xrFile = xr.open_dataset(filePath)
    except:
        xrFile = xr.open_dataset(filePath, decode_times=False)
    
    lon=['longitude','lon']
    lat=['latitude','lat']
    time=['time']
    lon_str=""
    lat_str=""
    time_str=""
    vars=[]
    print("***netCDF2Tiff 1 var:",var)
    for vari in xrFile:
        dims=xrFile[vari].dims
        for dim in dims:
            dim_lower=dim.lower()
            if( dim_lower in lon):
                lon_str=dim
            if( dim_lower in lat):
                lat_str=dim
            if( dim_lower in time):
                time_str=dim
        if( lon_str!="" and lat_str!="" and time_str!=""):
            vars.append(vari)
    print("***netCDF2Tiff 2 var:",var)
    if len(vars)==0 :
        _error = true
        return
    if var=='' or not( var in vars ):
        var=vars[0]
    
    band = 1
    # timei=0
    pr = xrFile[ var ][ timei ]
    datei= str( xrFile.time.data[ timei ] )
    timeN = len( xrFile[ 'time' ] )-1
    min=float(pr.min())
    minRAW=min
    max=float(pr.max())
    maxRAW=max
    print(filePath)
    print("min:",min,"minRAW:",minRAW)
    print("max:",max,"maxRAW:",maxRAW)
    #pr = pr.rio.set_spatial_dims('longitude', 'latitude')
    pr = pr.rio.set_spatial_dims(lon_str, lat_str)
    # pr.rio.crs
    pr.rio.crs
    pr.rio.set_crs("epsg:4326")
    # pr.rio.set_crs("EPSG:3857")
    
    fileNameTiff=path+"/tiffs/GeoTIFF_"+str(id)+".tif"
    pr.rio.to_raster(fileNameTiff)
    dateIni = str(xrFile.time[0].values)
    dateEnd = str(xrFile.time[-1].values)
    print("***********time ini:****"+dateIni)
    print("***********time end:****"+dateEnd)
    #self.datePeriod = int((nc_file.time[1].values - nc_file.time[0].values)/1000000)
    #self.datePeriod = int((nc_file.time[1].values - nc_file.time[0].values)/np.timedelta64(1, "h"))
    #print("********type***",type(nc_file.time[0].values)==np.datetime64)
    if(type(xrFile.time[0].values)==np.datetime64):
        datePeriod = int((xrFile.time[1].values - xrFile.time[0].values)/1000000)
        #self.datePeriod = int((nc_file.time[1].values - nc_file.time[0].values)/np.timedelta64(1, "h"))
    else:
        datePeriod = -1 # int(np.timedelta64(1, "h"))
    fileNetCDF["newPolygon"]=False
    if polygon!="":
        #src=rasterio.open(self.fileName)
        #affine = src.transform
        #nodata = src.nodata
        #nodata = nc_var.rio.encoded_nodata
        lat_start=xrFile[lat_str][0].item()
        lat_end=xrFile[lat_str][xrFile.dims[lat_str]-1].item()
        lon_start=xrFile[lon_str][0].item()
        lon_end=xrFile[lon_str][xrFile.dims[lon_str]-1].item()
        a=abs(lon_end-lon_start)/(xrFile.dims[lon_str]-1)
        e=-abs(lat_end-lat_start)/(xrFile.dims[lat_str]-1)
        b=0
        d=0
        if lon_end-lon_start<0:
            c=lon_end-a/2
            inv_lon=True
        else:
            c=lon_start-a/2
            inv_lon=False
        if lat_end-lat_start>0:
            f=lat_end-e/2
            inv_lat=True
        else:
            f=lat_start-e/2
            inv_lat=False
        
        affine=Affine(a,b,c,d,e,f)
        # print("**********affine:",affine)
        nodata = xrFile[ var ].rio.encoded_nodata
        # print("**********nodata:",nodata)
        #times=nc_file.time.values[:3]
        times=xrFile.time.values
        # print("*********affine",affine)
        # print("*********nodata",nodata)
        # print("*****is None:", nodata==None)
        # print("*********polygon",polygon)
        statsPolygonTime=[]
        statsPolygonMean=[]
        statsPolygonMax=[]
        statsPolygonMin=[]
        stats="mean min max"
        for time in times:
            #print(time)
            nc_arr = xrFile[ var ].sel(time=time)
            nc_arr_vals = nc_arr.values
            if inv_lat:
                nc_arr_vals=np.flip(nc_arr_vals,axis=0)
            if inv_lon:
                nc_arr_vals=np.flip(nc_arr_vals,axis=1)
            zonal_stats = rstats.zonal_stats(polygon, nc_arr_vals,
            affine=affine, nodata=nodata, stats=stats)
            statsPolygonTime.append(str(time))
            statsPolygonMean.append(zonal_stats[0]["mean"])
            statsPolygonMin.append(zonal_stats[0]["min"])
            statsPolygonMax.append(zonal_stats[0]["max"])
        fileNetCDF["statsPolygonTime"]=statsPolygonTime
        fileNetCDF["statsPolygonMean"]=statsPolygonMean
        fileNetCDF["statsPolygonMin"]=statsPolygonMin
        fileNetCDF["statsPolygonMax"]=statsPolygonMax
        fileNetCDF["newPolygon"]=True
        # print("**************statsPolygonTime:",statsPolygonTime)
        # print("**************statsPolygonMean:",statsPolygonMean)
    fileNetCDF["fileNameTiff"]=fileNameTiff
    fileNetCDF["var"]=var
    fileNetCDF["vars"]=vars
    fileNetCDF["timeN"]=timeN
    fileNetCDF["timei"]=timei
    fileNetCDF["datei"]=datei
    
    
    return fileNetCDF
            

def openFiles(files, var='', band=1, timei=0, polygon=""):
    print("openfiles, files:",files)
    if files["ext"]=='tiff' or files["ext"]=='tif':
        print("Selección tiff")
        filesTiff=openTiffs(files["path"],band)
        filesTiff["var"]="band:"+str(band)
        filesTiff["ext"]="tif"
        # filesTiff["bandN"]=filesTiff["files"]["bandN"]
        return filesTiff
    elif files["ext"]=='nc' or files["ext"]=='nc4':
        print("Selección netcdf")
        filesNetCDFs2Tiffs=netCDFs2Tiffs(files["path"],var=var, timei=timei, polygon=polygon)
        # print("filesNetCDFs2Tiff:",filesNetCDFs2Tiffs)
        filesTiff=openTiffs(filesNetCDFs2Tiffs["filesNameTiff"])
        filesTiff.update(filesNetCDFs2Tiffs)
        # filesTiff["var"]=filesNetCDFs2Tiffs["var"]
        # filesTiff["vars"]=filesNetCDFs2Tiffs["vars"]
        # filesTiff["timeN"]=filesNetCDFs2Tiffs["timeN"]
        # filesTiff["timei"]=filesNetCDFs2Tiffs["timei"]

        # if "statsPolygonTime" in filesNetCDFs2Tiffs:
        #     filesTiff["statsPolygonTime"]=filesNetCDFs2Tiffs["statsPolygonTime"]
        #     filesTiff["statsPolygonMean"]=filesNetCDFs2Tiffs["statsPolygonMean"]
        #     filesTiff["statsPolygonMin"]=filesNetCDFs2Tiffs["statsPolygonMin"]
        #     filesTiff["statsPolygonMax"]=filesNetCDFs2Tiffs["statsPolygonMax"]

        filesTiff["ext"]="nc"
        # filesTiff["bandN"]=filesTiff["files"]["bandN"]
        # print("***************filesTiff:",filesTiff)
        return filesTiff
    elif files["ext"]=='csv':
        print("Selección CSV")
        filesCSVs2Tiffs=csvs2Tiffs(files["path"],var=var)
        print("filesCSVs2Tiffs:",filesCSVs2Tiffs)
        filesTiff=openTiffs(filesCSVs2Tiffs["filesNameTiff"])
        filesTiff["var"]=filesCSVs2Tiffs["var"]
        filesTiff["vars"]=filesCSVs2Tiffs["vars"]
        filesTiff["ext"]="csv"
        # filesTiff["bandN"]=filesTiff["files"]["bandN"]
        return filesTiff
    # elif files["ext"]=='shp':
    #     print("Selección SHP")
    #     filesSHP=openSHPs(files["path"])
    #     filesSHP["ext"]="shp"
    #     return filesSHP
    elif files["ext"]=='json' or  files["ext"]=='geojson':
        print("Selección GeoJson")
        filesGeoJson=openGeoJsons(files["path"])
        filesGeoJson["ext"]="json"
        return filesGeoJson 

    return
    

# class ConfigFile:
#     def __init__(self,bodyJSON):
        
#         self.fileName =''
        # self.time = 0 #netcdf
        # self.timeN = 1
        # self.band = 1 #geotiff
        # self.bandN = 1
        # self.col = 0 #csv
        # self.colN = 1
        # self.var = '' #netcdf csv
        # self.vars = []
        # self.ext = ''
        # self.error = false
        # self.id = uuid.uuid4().hex
        # self.dateIni = ''
        # self.dateEnd = ''
        # self.datePeriod= 0
        # self.min=0
        # self.minRAW=0
        # self.max=0
        # self.maxRAW=0
        # self.dataJson={}
        # self.polygon=""
        # self.stats="mean min max"
        # self.statsPolygonTime=[]
        # self.statsPolygonMean=[]
        # self.statsPolygonMin=[]
        # self.statsPolygonMax=[]

        # # self.path = os.path.expanduser('~')+"/temp/"
        # self.path = "/home/temp/"
        # filePort = open(self.path+"port.json", "r")
        # dataPort = json.load(filePort)
        # self.port=dataPort['port']

        # filePort_terracotta = open(self.path+"port_terracotta.json", "r")
        # dataPort_terracotta = json.load(filePort_terracotta)
        # self.port_terracotta=dataPort_terracotta['port']

        # self.fileNameTiff = ''
        
    #     if 'file' in bodyJSON.keys():
    #         self.fileName = bodyJSON['file']
        
    #     if self.fileName == '':
    #         self.iniSelectFile()

    #     if 'time' in bodyJSON.keys():
    #         self.time = int(bodyJSON['time'])
    #     if 'band' in bodyJSON.keys():
    #         self.band = int(bodyJSON['band'])
    #         if self.band<1:
    #             self.band=1
    #     if 'col' in bodyJSON.keys():
    #         self.col = int(bodyJSON['col'])
    #     if 'var' in bodyJSON.keys():
    #         self.var = bodyJSON['var']
        
    #     if 'selectedPolygon' in bodyJSON.keys() and \
    #         'points' in bodyJSON['selectedPolygon'].keys():
    #         print("size:",len(bodyJSON['selectedPolygon']['points']) )
    #         print("---------selectedPolygon-----------")
    #         print("selectedPolygon:", bodyJSON['selectedPolygon'])
    #         self.polygon="POLYGON (("+str(bodyJSON['selectedPolygon']['points'][0]['lng'])
    #         self.polygon+=" "+str(bodyJSON['selectedPolygon']['points'][0]['lat'])
    #         for i in range( 1,len(bodyJSON['selectedPolygon']['points']) ):
    #             self.polygon+=", "
    #             self.polygon+=str(bodyJSON['selectedPolygon']['points'][i]['lng'])
    #             self.polygon+=" "
    #             self.polygon+=str(bodyJSON['selectedPolygon']['points'][i]['lat'])
    #         self.polygon+="))"
    #         print("polygon:",self.polygon)
        

    #     if self.fileName != '':
    #         self.ext=self.fileName.split('.')[-1]
        
    #     if self.ext=='tiff' or self.ext=='tif':
    #         self.openTiff()
    #     elif self.ext=='nc':
    #         self.openNetCDF()
    #     elif self.ext=='csv':
    #         self.openCSV()
    #     elif self.ext=='geojson':
    #         self.openGeoJson()
        

    # def iniSelectFile(self):
    #     root = tk.Tk()
    #     root.title('Select File Dialog')
    #     root.resizable(False, False)
    #     root.geometry('300x150')
    #     self.selectFile(root)
    #     root.mainloop()
    
    # def selectFile(self,root):
    #     filetypes = (
    #         ('netCDF, GeoTiff, CSV, GeoJson', '.nc .nc4 .tif .csv .json .geojson'),
    #         ('netCDF', '*.nc *nc4'),
    #         ('GeoTiff', '*.tif'),
    #         ('CSV', '*.csv'),
    #         ('GeoJson', '*.json *.geojson'),
    #         ('All files', '*.*'))
    #     self.fileName = fd.askopenfilename(
    #         title='Select file',
    #         initialdir='/home/temp/',
    #         filetypes=filetypes)
    #     root.destroy()

    # def openGeoJson(self):
    #     print("abriendo GeoJson")
    #     with open(self.fileName) as f:
    #         self.dataJson = json.loads(f.read())

    # def openNetCDF(self):
    #     print("0---------------------")
    #     try:
    #         nc_file = xr.open_dataset(self.fileName)
    #         print("1---------------------")
    #     except:
    #         nc_file = xr.open_dataset(self.fileName, decode_times=False)
    #         print("3---------------------")    
    #     print("2---------------------")
        
    #     lon=['longitude','lon']
    #     lat=['latitude','lat']
    #     time=['time']
    #     lon_str=""
    #     lat_str=""
    #     time_str=""

    #     for var in nc_file:
    #         dims=nc_file[var].dims
    #         for dim in dims:
    #             dim_lower=dim.lower()
    #             if( dim_lower in lon):
    #                 lon_str=dim
    #             if( dim_lower in lat):
    #                 lat_str=dim
    #             if( dim_lower in time):
    #                 time_str=dim
    #         if( lon_str!="" and lat_str!="" and time_str!=""):
    #             self.vars.append(var)

        
    #     if len(self.vars)==0 :
    #         self.error = true
    #         return

    #     if self.var=='':
    #         self.var=self.vars[0]
        
    #     if not( self.var in self.vars ):
    #         self.var=self.vars[0]
        
    #     self.band = 1
    #     pr = nc_file[ self.var ][ self.time ]
    #     datei= str( nc_file.time.data[ self.time ] )
    #     self.timeN = len( nc_file[ 'time' ] )
    #     self.min=float(pr.min())
    #     self.minRAW=self.min
    #     self.max=float(pr.max())
    #     self.maxRAW=self.max
    #     #pr = pr.rio.set_spatial_dims('longitude', 'latitude')
    #     pr = pr.rio.set_spatial_dims(lon_str, lat_str)
    #     # pr.rio.crs
    #     pr.rio.crs
    #     pr.rio.set_crs("epsg:4326")
    #     self.fileNameTiff=self.path+"GeoTIFF_"+str(self.id)+".tif"
    #     pr.rio.to_raster(self.fileNameTiff)

    #     self.dateIni = str(nc_file.time[0].values)
    #     self.dateEnd = str(nc_file.time[-1].values)
    #     print("***********time ini:****"+self.dateIni)
    #     print("***********time end:****"+self.dateEnd)
    #     #self.datePeriod = int((nc_file.time[1].values - nc_file.time[0].values)/1000000)
    #     #self.datePeriod = int((nc_file.time[1].values - nc_file.time[0].values)/np.timedelta64(1, "h"))
    #     #print("********type***",type(nc_file.time[0].values)==np.datetime64)
    #     if(type(nc_file.time[0].values)==np.datetime64):
    #         self.datePeriod = int((nc_file.time[1].values - nc_file.time[0].values)/1000000)
    #         #self.datePeriod = int((nc_file.time[1].values - nc_file.time[0].values)/np.timedelta64(1, "h"))
    #     else:
    #         self.datePeriod = -1 # int(np.timedelta64(1, "h"))
    #     if self.polygon!="":
    #         #src=rasterio.open(self.fileName)
    #         #affine = src.transform
    #         #nodata = src.nodata
    #         #nodata = nc_var.rio.encoded_nodata
    #         lat_start=nc_file[lat_str][0].item()
    #         lat_end=nc_file[lat_str][nc_file.dims[lat_str]-1].item()
    #         lon_start=nc_file[lon_str][0].item()
    #         lon_end=nc_file[lon_str][nc_file.dims[lon_str]-1].item()
    #         a=abs(lon_end-lon_start)/(nc_file.dims[lon_str]-1)
    #         e=-abs(lat_end-lat_start)/(nc_file.dims[lat_str]-1)
    #         b=0
    #         d=0
    #         if lon_end-lon_start<0:
    #             c=lon_end-a/2
    #             inv_lon=True
    #         else:
    #             c=lon_start-a/2
    #             inv_lon=False
    #         if lat_end-lat_start>0:
    #             f=lat_end-e/2
    #             inv_lat=True
    #         else:
    #             f=lat_start-e/2
    #             inv_lat=False
            
    #         affine=Affine(a,b,c,d,e,f)
    #         print("**********affine:",affine)
    #         nodata = nc_file[ self.var ].rio.encoded_nodata
    #         print("**********nodata:",nodata)

    #         #times=nc_file.time.values[:3]
    #         times=nc_file.time.values
    #         print("*********affine",affine)
    #         print("*********nodata",nodata)
    #         print("*****is None:", nodata==None)
    #         print("*********polygon",self.polygon)
    #         for time in times:
    #             #print(time)
    #             nc_arr = nc_file[ self.var ].sel(time=time)
    #             nc_arr_vals = nc_arr.values
    #             if inv_lat:
    #                 nc_arr_vals=np.flip(nc_arr_vals,axis=0)
    #             if inv_lon:
    #                 nc_arr_vals=np.flip(nc_arr_vals,axis=1)
    #             zonal_stats = rstats.zonal_stats(self.polygon, nc_arr_vals,
    #             affine=affine, nodata=nodata, stats=self.stats)
    #             self.statsPolygonTime.append(str(time))
    #             self.statsPolygonMean.append(str(zonal_stats[0]["mean"]))
    #             self.statsPolygonMin.append(str(zonal_stats[0]["min"]))
    #             self.statsPolygonMax.append(str(zonal_stats[0]["max"]))
    #         print("*******statsPolygonTime:",self.statsPolygonTime)
    #         print("*******statsPolygonMean:",self.statsPolygonMean)
            
        
        


    # def openCSV(self):
    #     columns = list(pd.read_csv(self.fileName, nrows=1).select_dtypes("number").columns)
    #     columns.remove("lat")
    #     columns.remove("lon")
    #     self.band=1
    #     self.colN=len(columns)
    #     self.vars=columns
    #     if( self.col >= self.colN ):
    #         self.col=0
        
    #     if self.var=='':
    #         self.var=str(columns[self.col])

    #     if not(self.var in columns):
    #         self.var=str(columns[0])
        

    #     usecols=["lon","lat",self.var]
    #     df = pd.read_csv(self.fileName,usecols=usecols)
    #     lon=df.lon
    #     lat=df.lat
    #     val=df[self.var]
    #     rbfi = Rbf(lon, lat, val, epsilon=0.001)
    #     lon_min=lon.min()
    #     lon_max=lon.max()
    #     lat_min=lat.min()
    #     lat_max=lat.max()
    #     dstep=0.01
    #     lonTiff,latTiff,lon_grid,lat_grid=gimme_mesh(lon_min,lat_min,lon_max,lat_max,dstep)
    #     interpolateXY=rbfi(lon_grid, lat_grid)

    #     cs = np.array([interpolateXY])
    #     coords = [[0],latTiff.tolist(),lonTiff.tolist()]
    #     dims = ["band", "y", "x"]
    #     xcs = (
    #         xr.DataArray(cs, coords=coords, dims=dims)
    #         .astype("float32")
    #     )
    #     xcs.rio.crs
    #     xcs.rio.set_crs("epsg:4326")
    #     self.fileNameTiff=self.path+"GeoTIFF_"+str(self.id)+".tif"
    #     xcs.rio.to_raster(self.fileNameTiff)

    #     self.min=interpolateXY.min()
    #     self.minRAW=self.min
    #     self.max=interpolateXY.max()
    #     self.maxRAW=self.max
    #     self.ext="tif"
    
    # def openTiff(self):

    #     self.fileNameTiff=self.fileName

    #     tiff_file = rioxarray.open_rasterio(self.fileNameTiff)
    #     self.bandN = tiff_file.band.size
    #     print("1****",self.var, self.band)

    #     if self.var.isnumeric():
    #         self.band=int(self.var)
    #     else:
    #         self.band=1
        
    #     if self.band>self.bandN :
    #         self.band=1

    #     self.var=str(self.band)
    #     print("2****",self.var, self.band)

    #     for i in range( self.bandN ):
    #         self.vars.append( str(i+1) )
    #         # self.vars.append( 'band'+str(i+1) )
    #     scale=tiff_file.attrs["scale_factor"]
    #     offset=tiff_file.attrs["add_offset"]
    #     self.minRAW = float(tiff_file.variable[self.band-1].min())
    #     self.maxRAW = float(tiff_file.variable[self.band-1].max())
    #     self.min=self.minRAW*scale+offset
    #     self.max=self.maxRAW*scale+offset
        

@csrf_exempt
def handle(request):

    if request.method == 'POST':
        body = request.body.decode('utf-8')
        bodyJSON = json.loads(body)
        response={}
        files=[]
        list_files=[]
        print("---------Path-----------")
        print("bodyJSON:")
        print(bodyJSON)
        print("--------------------")
        selectedOption=bodyJSON['selectedOption']
        var=bodyJSON['var']
        band=bodyJSON['band']
        timei=bodyJSON['timei']
        polygon=""
        print("selectedOption:")
        print(selectedOption)
        print("--------------------")
        list_files=[]
        if selectedOption=="selectFile":
            print("selectFile")
            list_files=selectFiles()
            print("resultado de selectFiles()")
            print(list_files)
        else:
            print("*********polygon inicio**********")
            if "polygon" in bodyJSON.keys() and len(bodyJSON["polygon"])>0:
                print("polygon:",bodyJSON["polygon"][0]["lat"])
                polygon="POLYGON (("+str(bodyJSON["polygon"][0]['lng'])
                polygon+=" "+str(bodyJSON["polygon"][0]['lat'])
                for i in range( 1,len(bodyJSON["polygon"]) ):
                    polygon+=", "
                    polygon+=str(bodyJSON["polygon"][i]['lng'])
                    polygon+=" "
                    polygon+=str(bodyJSON["polygon"][i]['lat'])
                polygon+="))"
            print("*********polygon final**********")
            list_files=bodyJSON["filesIn"]

        if list_files:
            print("var:",var)
            tiffs=openFiles(list_files,var=var,band=band,timei=timei,polygon=polygon)
            tiffs["port"]=openFilePort()
            tiffs["filesIn"]=list_files
            if selectedOption=="selectFile":
                tiffs["newPolygon"]=True
            print("******tiffFiles:")
            # print(tiffs)
            print("******Fin tiffFiles:")
            print("******JsonResponse(tiffs):",JsonResponse(tiffs))
            return JsonResponse(tiffs)
        else:
            return
    return render(request, "index.html")

        # elif selectedOption=="setFile":
        #     print("setFile")
        # elif selectedOption=="setTime":
        #     print("setTime")
        # elif selectedOption=="setVariable":
        #     print("setVariable")
        # elif selectedOption=="setPolygon":
        #     print("setPolygon")
        
        
        # if 'path' in bodyJSON.keys():
        #     print("path: ",bodyJSON['path'])
        #     list_files = os.listdir(path=bodyJSON['path'])
        #     print("list: ",list_files)
        # elif 'file' in bodyJSON.keys():
        #     print("file: ",bodyJSON['file'])
        #     list_files.append(bodyJSON['file'])
        #     print("list: ",list_files)
            
        # for file in list_files:
        #     if 'path' in bodyJSON.keys():
        #         bodyJSON['file']=bodyJSON['path']+"/"+file
        #     conf=ConfigFile(bodyJSON)
            
        #     dataFile={}
        #     dataFile['fileName']=conf.fileName
        #     dataFile['fileNameTiff']=conf.fileNameTiff
        #     dataFile['id']=str(conf.id)
        #     dataFile['port']=conf.port
        #     dataFile['port_terracotta']=conf.port_terracotta
        #     dataFile['timeN']=conf.timeN
        #     dataFile['time']=conf.time
        #     dataFile['var']=str(conf.var)
        #     dataFile['vars']=conf.vars
        #     dataFile['min']=conf.min
        #     dataFile['max']=conf.max
        #     dataFile['minRAW']=conf.minRAW
        #     dataFile['maxRAW']=conf.maxRAW
        #     dataFile['ext']=conf.ext
        #     dataFile['band']=conf.band
        #     dataFile['bandN']=conf.bandN
        #     dataFile['dateIni']=conf.dateIni
        #     dataFile['dateEnd']=conf.dateEnd
        #     dataFile['datePeriod']=conf.datePeriod
        #     if bool(conf.statsPolygonTime):
        #         dataFile['statsPolygonTime']=conf.statsPolygonTime
        #         dataFile['statsPolygonMean']=conf.statsPolygonMean
        #         dataFile['statsPolygonMin']=conf.statsPolygonMin
        #         dataFile['statsPolygonMax']=conf.statsPolygonMax
        #     if bool(conf.dataJson):
        #         dataFile['dataJson']=conf.dataJson
        #     files.append(dataFile)
        
        # allmin=min(file['min'] for file in files)
        # allmax=max(file['max'] for file in files)
        
        # for file in files:
        #     if 'dataJson' not in file.keys():
        #         print("No hay dataJson")
        #         file['min']=allmin
        #         file['max']=allmax
        #         tiff_file = rioxarray.open_rasterio(file['fileNameTiff'])
        #         scale=tiff_file.attrs["scale_factor"]
        #         offset=tiff_file.attrs["add_offset"]
        #         bounds=tiff_file.rio.bounds()
        #         file['longitudeE']=bounds[0]
        #         file['latitudeS']=bounds[1]
        #         file['longitudeW']=bounds[2]
        #         file['latitudeN']=bounds[3]
        #         file['minRAW']=(file['min']-offset)/scale
        #         file['maxRAW']=(file['max']-offset)/scale
        # response['files']=files
        # print("FINAL")
        # print("response:",response)
        # return JsonResponse(response)
       
        
    # return render(request, "index.html")
"""    
@csrf_exempt
def handle(request):

    if request.method == 'POST':
        body = request.body.decode('utf-8')
        bodyJSON = json.loads(body)
        response={}
        files=[]
        list_files=[]
        print("---------Path-----------")
        print("bodyJSON:")
        print(bodyJSON)
        print("--------------------")
        selectedOption=bodyJSON['selectedOption']
        if selectedOption=="selectFile":
            print("selectFile")
            SelectFile()
            return
        elif selectedOption=="setFile":
            print("setFile")
        elif selectedOption=="setTime":
            print("setTime")
        elif selectedOption=="setVariable":
            print("setVariable")
        elif selectedOption=="setPolygon":
            print("setPolygon")
        
        
        if 'path' in bodyJSON.keys():
            print("path: ",bodyJSON['path'])
            list_files = os.listdir(path=bodyJSON['path'])
            print("list: ",list_files)
        elif 'file' in bodyJSON.keys():
            print("file: ",bodyJSON['file'])
            list_files.append(bodyJSON['file'])
            print("list: ",list_files)
            
        for file in list_files:
            if 'path' in bodyJSON.keys():
                bodyJSON['file']=bodyJSON['path']+"/"+file
            conf=ConfigFile(bodyJSON)
            
            dataFile={}
            dataFile['fileName']=conf.fileName
            dataFile['fileNameTiff']=conf.fileNameTiff
            dataFile['id']=str(conf.id)
            dataFile['port']=conf.port
            dataFile['port_terracotta']=conf.port_terracotta
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
            if bool(conf.statsPolygonTime):
                dataFile['statsPolygonTime']=conf.statsPolygonTime
                dataFile['statsPolygonMean']=conf.statsPolygonMean
                dataFile['statsPolygonMin']=conf.statsPolygonMin
                dataFile['statsPolygonMax']=conf.statsPolygonMax
            if bool(conf.dataJson):
                dataFile['dataJson']=conf.dataJson
            files.append(dataFile)
        
        allmin=min(file['min'] for file in files)
        allmax=max(file['max'] for file in files)
        
        for file in files:
            if 'dataJson' not in file.keys():
                print("No hay dataJson")
                file['min']=allmin
                file['max']=allmax
                tiff_file = rioxarray.open_rasterio(file['fileNameTiff'])
                scale=tiff_file.attrs["scale_factor"]
                offset=tiff_file.attrs["add_offset"]
                bounds=tiff_file.rio.bounds()
                file['longitudeE']=bounds[0]
                file['latitudeS']=bounds[1]
                file['longitudeW']=bounds[2]
                file['latitudeN']=bounds[3]
                file['minRAW']=(file['min']-offset)/scale
                file['maxRAW']=(file['max']-offset)/scale
        response['files']=files
        print("FINAL")
        print("response:",response)
        return JsonResponse(response)
       
        
    return render(request, "index.html")
"""