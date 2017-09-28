# -*- coding: utf-8 -*-
import pymongo
import serial
from picamera.array import PiRGBArray
from picamera import PiCamera
import argparse
import time
import cv2
import math
import numpy as np
from PIL import Image
import zbarlight
import imutils
import RPi.GPIO as GPIO
import time                     # library for sleep function (delay)
from datetime import datetime

from imutils import distance
from imutils import four_point_transform
from imutils import lineEquation
from imutils import lineSlope
from imutils import getSquares
from imutils import updateCorner
from imutils import getVertices
from imutils import updateCornerOr
from imutils import cross
from imutils import getIntersection

#cap = cv2.VideoCapture(0)
camera = PiCamera()
camera.resolution = (640,480)
camera.framerate = 32
rawCapture = PiRGBArray(camera,size=(640,480))
time.sleep(0.1)

GPIO.setmode(GPIO.BCM)
#ADC Inputs
GPIO.setup(2,GPIO.IN)           #Bit 7
GPIO.setup(3,GPIO.IN)           #Bit 6
GPIO.setup(4,GPIO.IN)           #Bit 5
GPIO.setup(17,GPIO.IN)          #Bit 4
GPIO.setup(27,GPIO.IN)          #Bit 3
GPIO.setup(22,GPIO.IN)          #Bit 2
GPIO.setup(10,GPIO.IN)          #Bit 1
GPIO.setup(9,GPIO.IN)           #Bit 0

#pins to test DB
GPIO.setup(12,GPIO.OUT) # pin declared as output
GPIO.output(12, GPIO.LOW)

#Open MongoDB connection
client = pymongo.MongoClient("192.168.62.51", 27017)
db=client.QRapp

#select collection to access
collection = db.profiles
collection2 = db.dashboard

def validateDB(code):
                 
        #Execute mongo query
        result= collection.find({'user_id':code})

        #determine collection elements
        x=[]    
        for document in result:
            x.append(document)

        size= len(x)
        
        if(size > 0):
                post= {'user_id':student_id,
                        'date':datetime.utcnow()}
                GPIO.output(12, GPIO.HIGH)
                post_id= collection2.insert_one(post).inserted_id
                print("Welcome")
                time.sleep(3)
                                
        else:
                GPIO.output(12, GPIO.LOW)
                print ("User not found..")

        time.sleep(1)
        GPIO.output(12, GPIO.LOW)


on = 1
GPIO.output(12, GPIO.LOW)
while(True):
        s = 0
        for t in range(0,500):
                val = 0
                bit7 = GPIO.input(2)
                bit6 = GPIO.input(3)
                bit5 = GPIO.input(4)
                bit4 = GPIO.input(17)
                bit3 = GPIO.input(27)
                bit2 = GPIO.input(22)
                bit1 = GPIO.input(10)
                bit0 = GPIO.input(9)
                val = (128*bit7)+(64*bit6)+(32*bit5)+(16*bit4)+(8*bit3)+(4*bit2)+(2*bit1)+(1*bit0)
                s = s + val
        val = s/501
        #print val

        if val > 110:
                if on == 0:
                        camera = PiCamera()
                        camera.resolution = (640,480)
                        camera.framerate = 32
                        rawCapture = PiRGBArray(camera,size=(640,480))
                        time.sleep(0.1)

                camera.capture(rawCapture,format="bgr")
                image = rawCapture.array
                on = 1

                img = image
                img2 = img
                #show the image
                #wait until some key is pressed to procced
                edges = cv2.Canny(img,100,200)
                _,contours,hierarchy = cv2.findContours(edges,cv2.RETR_TREE,cv2.CHAIN_APPROX_SIMPLE)
                #cv2.drawContours(img2, contours, -1, (0, 210, 210), 1)
                mu = []
                mc = []
                mark = 0
                for x in range(0,len(contours)):
                        mu.append(cv2.moments(contours[x]))

                for m in mu:
                        if m['m00'] != 0:
                                mc.append((m['m10']/m['m00'],m['m01']/m['m00']))
                        else:
                                mc.append((0,0))

                for x in range(0,len(contours)):
                        k = x
                        c = 0
                        while(hierarchy[0][k][2] != -1):
                                k = hierarchy[0][k][2]
                                c = c + 1
                        if hierarchy[0][k][2] != -1:
                                c = c + 1

                        if c >= 5:                          #Determines the Contours that have many child contours The Big Squares
                                if mark == 0:
                                        A = x
                                elif mark == 1:
                                        B = x
                                elif mark == 2:
                                        C = x
                                mark = mark+1

                if mark >2 :
                        AB = distance(mc[A],mc[B])
                        BC = distance(mc[B],mc[C])
                        AC = distance(mc[A],mc[C])

                        if(AB>BC and AB>AC):
                                outlier = C
                                median1 = A
                                median2 = B
                        elif(AC>AB and AC>BC):
                                outlier = B
                                median1 = A 
                                median2 = C 
                        elif(BC>AB and BC>AC):
                                outlier = A 
                                median1 = B
                                median2 = C

                        top = outlier
                        
                        dist = lineEquation(mc[median1],mc[median2],mc[outlier])
                        slope,align = lineSlope(mc[median1],mc[median2])

                        if align == 0:
                                bottom = median1
                                right = median2
                        elif(slope < 0 and dist < 0):
                                bottom = median1
                                right = median2
                                orientation = 0
                        elif(slope > 0 and dist < 0):
                                right = median1
                                bottom = median2
                                orientation = 1
                        elif(slope < 0 and dist > 0):
                                right = median1
                                bottom = median2
                                orientation = 2
                        elif(slope > 0 and dist > 0):
                                bottom = median1
                                right = median2
                                orientation = 3

                        areatop = 0.0
                        arearight = 0.0
                        areabottom = 0.0
                        if(top < len(contours) and right < len(contours) and bottom < len(contours) and cv2.contourArea(contours[top]) > 10 and cv2.contourArea(contours[right]) > 10 and cv2.contourArea(contours[bottom]) > 10):
                                tempL = []
                                tempM = []
                                tempO = []
                                src = []
                                N = (0,0)
                                tempL = getVertices(contours,top,slope,tempL)
                                tempM = getVertices(contours,right,slope,tempM)
                                tempO = getVertices(contours,bottom,slope,tempO)
                                L = updateCornerOr(orientation,tempL)
                                M = updateCornerOr(orientation,tempM)
                                O = updateCornerOr(orientation,tempO)
                                
                                iflag,N = getIntersection(M[1],M[2],O[3],O[2],N)
                                src.append(L[0])
                                src.append(M[1])
                                src.append(N)
                                src.append(O[3])
                                src = np.asarray(src,np.float32)
                                warped = four_point_transform(img,src)
                                #cv2.imshow("warped",warped)
                                cv2.circle(img,N,1,(0,0,255),2)
                                cv2.drawContours(img,contours,top,(255,0,0),2)
                                cv2.drawContours(img,contours,right,(0,255,0),2)
                                cv2.drawContours(img,contours,bottom,(0,0,255),2)
                                warped = cv2.cvtColor(warped,cv2.COLOR_BGR2GRAY)
                                cv2.imwrite('userTest.png',warped)
                                file_path = 'userTest.png'
                
                                with open(file_path, 'rb') as image_file:
                                        image = Image.open(image_file)
                                        image.load()
                                        codes = zbarlight.scan_codes('qrcode', image)
                                        print('QR codes: %s' % codes[0])
                                        student_id= codes[0]
                                        validateDB(student_id)
                                        #print('QR codes: %s' % student_name)
                rawCapture.truncate(0)
                #cv2.imshow("rect",img)
                #cv2.imshow("Test",img2)
                GPIO.output(12, GPIO.LOW)
                time.sleep(0.25)

        else:
                x = 1
                on = 0
                camera.close()
                
                
        key = cv2.waitKey(1) & 0xFF
	if key == ord("q"):
                GPIO.output(12, GPIO.LOW)
                time.sleep(0.25)
                camera.close()
		break
	
GPIO.cleanup()

