import cv2
import datetime
import requests
from io import BytesIO
from PIL import Image, ImageDraw
import cognitive_face as CF
import os
import sys
from dotenv import load_dotenv
load_dotenv()

cap = cv2.VideoCapture(0)


KEY = os.getenv('FACE_API_KEY')
CF.Key.set(KEY)

BASE_URL = 'https://koreacentral.api.cognitive.microsoft.com/face/v1.0/'
CF.BaseUrl.set(BASE_URL)


cnt=0
i=0

face_cascade = cv2.CascadeClassifier('/Users/yejoonko/git/Project/smartmirror-web/backend/python/opencv/haarcascade_frontalface_default.xml')
arr=[1,2,3,4,5]
imgArr=[]
emoArr=[]

emoName=['anger','contempt','disgust','fear','happiness','neutral','sadness','surprise']
filePath="/Users/yejoonko/git/Project/smartmirror-web/backend/python/data/"
def removeAllFile(filePath):
    if os.path.exists(filePath):
        for file in os.scandir(filePath):
            os.remove(file.path)
        return "Remove All File"
    else:
        return "Directory Not Found"
removeAllFile(filePath);

while(True):
    # frame 별로 capture 한다
    ret, frame = cap.read()
    # 좌우 반전은 1, 상하반전은 0
    frame = cv2.flip(frame,1)
    # 프레임이 제대로 읽어지지 않은 경우
    if not ret:
        print("Can't receive frame (stream end?). Exiting ...")
        break


    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    #detectMultiScale (InputArray image, std::vector< Rect > &objects, double scaleFactor=1.1, int minNeighbors=3, int flags=0, Size minSize=Size(), Size maxSize=Size())
    faces = face_cascade.detectMultiScale(gray, 1.2, 5)

    # 빨간 사각형으로 인식된 얼굴은 표시한다.
    #if len(faces)>0:
    #for (x,y,w,h) in faces:
    #cv2.rectangle(frame,(x,y),(x+w,y+h),(0,0,255),2)
    #i+=1
    if i<6:
        cv2.IMREAD_UNCHANGED
        cv2.imwrite("/Users/yejoonko/git/Project/smartmirror-web/backend/python/data/" + str(i) + ".png", frame)
        #img_url = 'C:/Users/Hong Sumin/Desktop/4-1/capture/1.png' # 이미지 파일의 경로
        imgArr.append('/Users/yejoonko/git/Project/smartmirror-web/backend/python/data/'+str(i)+'.png')
        i+=1

    # openCV에서 얼굴이 인식되었더라도 azure에서는 인식되지 않을 수 있음.
    if i==6:
        emoArr=[0,0,0,0,0,0,0,0]
        for j in imgArr:
            faces = CF.face.detect(j,True,False,'age,gender,emotion') # 중요!
            for face in faces:
                emoArr[0]+=face['faceAttributes']['emotion']['anger'];
                emoArr[1]+=face['faceAttributes']['emotion']['contempt'];
                emoArr[2]+=face['faceAttributes']['emotion']['disgust'];
                emoArr[3]+=face['faceAttributes']['emotion']['fear'];
                emoArr[4]+=face['faceAttributes']['emotion']['happiness'];
                emoArr[5]+=face['faceAttributes']['emotion']['neutral'];
                emoArr[6]+=face['faceAttributes']['emotion']['sadness'];
                emoArr[7]+=face['faceAttributes']['emotion']['surprise'];
        #print("faces!!!",face['faceAttributes']['emotion']['anger']) # 터미널 창에 속성값들을 출력

        # print("Max !!",emoName[emoArr.index(max(emoArr))])
        break
     

    #print("faces!!!",faces)
    #webCamera라는 이름으로 실시간 화면을 보여준다.

    #cv2.imshow('webCamera',frame)
    # q를 누르면 종료되도록 하는 코드이다.
    if cv2.waitKey(1) == ord('q'):
        break

# 메모리를 해제시켜준다.
cap.release()
cv2.destroyAllWindows()



# 데이터 node.js로 전송 (http://localhost:3001)
data = {'emotion' : emoName[emoArr.index(max(emoArr))]}
print(emoName[emoArr.index(max(emoArr))])

# import requests
# requests.get(url='http://localhost:3000/')