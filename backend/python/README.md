1. Download requirements.txt
   
   ($ pip install -r requirements.txt)
   
   or
   
   ($ pip3 install -r requirements.txt)


2. Edit the path in faceRecognition.py
```buildoutcfg
line 27 : face_cascade = cv2.CascadeClassifier('/Users/yejoonko/git/Project/smart_mirror_small_test/api/python/opencv/haarcascade_frontalface_default.xml')
line 33 : filePath="/Users/yejoonko/git/Project/smart_mirror_small_test/api/python/data/"
line 65 : cv2.imwrite("/Users/yejoonko/git/Project/smart_mirror_small_test/api/python/data/" + str(i) + ".png", frame)
line 67 : imgArr.append('/Users/yejoonko/git/Project/smart_mirror_small_test/api/python/data/'+str(i)+'.png')
```

3. Add .env file
```buildoutcfg
FACE_API_KEY = YOUR_KEY
FACE_END_POINT = YOUR_END_POINT (I think this is not necessary)
```

4. 