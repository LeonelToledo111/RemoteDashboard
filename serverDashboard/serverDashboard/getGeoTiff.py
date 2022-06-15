from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os
import json

import tkinter as tk
from tkinter import ttk
from tkinter import filedialog as fd

import xarray as xr 

import uuid


# https://ajaxhispano.com/ask/como-puedo-realizar-interpolacion-bidimensional-usando-scipy-24306/
def select_file():
    filetypes = (
        ('netCDF', '*.nc'),
        ('GeoTiff', '*.tif'),
        ('All files', '*.*')
    )

    global fileNameNetCDF
    fileNameNetCDF = fd.askopenfilename(
        title='Open a file',
        #initialdir='/media/alex/Datos/netcdf/',
        filetypes=filetypes)
    # showinfo(
    #     title='Selected File',
    #     message=filename
    # )

@csrf_exempt
def handle(request):

      if request.method == 'POST':
            #body contiene las coordenadas del poligono y el nombre del archivo Tiff a procesar
            body = request.body.decode('utf-8')
            bodyJSON = json.loads(body)
            
            print("********************")
            print("*****serverTiff*****")
            print("********************")
            print("bodyJSON:",bodyJSON)
            # filename=bodyJSON['file']
            
            
            global fileNameNetCDF
            fileNameNetCDF = bodyJSON['file']
            timei = int(bodyJSON['timei'])
            path = os.path.expanduser('~')+"/temp/"

            # create the root window
            if( bodyJSON['selectFile'] ):
                root = tk.Tk()
                root.title('Tkinter Open File Dialog')
                root.resizable(False, False)
                root.geometry('300x150')

                open_button = ttk.Button(
                    root,
                    text='Open a File',
                    command=select_file
                )

                open_button.pack(expand=True)
                root.mainloop()
            
            ext=fileNameNetCDF.split('.')[-1]
            timeN=1
            datei=''
            fileNameTiff=''
            nameVar=''
            min=0
            max=0
            if( ext=="nc" ):
                nc_file = xr.open_dataset(fileNameNetCDF)
                print(nc_file)
                print('***********')
                print(nc_file['longitude'])
                nameVar=list(nc_file.data_vars)[0]
                print("*****data_vars",nameVar)
                pr = nc_file[ nameVar ][timei]
                datei= str( nc_file.time.data[timei] )
                timeN = len( nc_file[ 'time' ] )
                min=float(pr.min())
                max=float(pr.max())
                print(pr)
                pr = pr.rio.set_spatial_dims('longitude', 'latitude')

                #Check for the CRS
                pr.rio.crs

                #(Optional) If your CRS is not discovered, you should be able to add it like so:
                #pr.rio.set_crs("epsg:4326")

                #Saving the file
                id = uuid.uuid4()
                fileNameTiff=path+"GeoTIFF"+str(id)+".tif"
                pr.rio.to_raster(fileNameTiff)
            else:
                fileNameTiff=fileNameNetCDF
                nameVar="band1"
                
            tiff_file = xr.open_dataset(fileNameTiff)
            minRAW = float(tiff_file['band_data'][0].min())
            maxRAW = float(tiff_file['band_data'][0].max())
            if (ext=="tif"):
                min=minRAW
                max=maxRAW


            filePort = open(path+"port.json", "r")
            data = json.load(filePort)
            
            response={}
            response['fileNameNetCDF']=fileNameNetCDF
            response['fileNameTiff']=fileNameTiff
            response['port']=data['port']
            response['timeN']=timeN
            response['datei']=datei
            response['nameVar']=nameVar
            response['min']=min
            response['max']=max
            response['minRAW']=minRAW
            response['maxRAW']=maxRAW
            response['ext']=ext
            # response['band']=band1.max()
            #se envía la respuesta

            return JsonResponse(response)
            
      return render(request, "index.html")