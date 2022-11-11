import os

def readAllFiles (filePath):
    path_list = []
    fileList = os.listdir(filePath)
    for file in fileList:
        path = os.path.join(filePath, file)
        path_list.append(path)
    return path_list
