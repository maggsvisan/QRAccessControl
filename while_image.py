# import the necessary packages
from picamera.array import PiRGBArray
from picamera import PiCamera
import time
import cv2
import math
 
# initialize the camera and grab a reference to the raw camera capture
#create Camera Object
camera = PiCamera() 
camera.resolution=(640,480)
camera.framerate=32
rawCapture = PiRGBArray(camera, size=(640,480))

key= cv2.waitKey(1) & 0xFF

# allow the camera to warmup
time.sleep(0.1)

while (True):

    data= int(input("enter a number "))
  #  print "Input data",data
    
    # grab an image from the camera
    if (data == 10):
        camera.capture(rawCapture, format="bgr")
        print ("Taking snap")
        image = rawCapture.array
        # display the image on screen and wait for a keypress
        cv2.imshow("Image",image)
        #save an image to current path
        cv2.imwrite("Snap.jpg",image)
        #clear the stream in preparation for the next frame
        rawCapture.truncate(0)
        
     #   cv2.waitKey(0)

    elif key == ord("q"):
        break
    
    else:
         print ("Enter another number to take snap")
    
    
