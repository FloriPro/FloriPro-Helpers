import os
import json
import base64
import time


def path_to_dict(path):
    if os.path.isdir(path):
        d = {os.path.basename(path): [path_to_dict(
            os.path.join(path, x)) for x in os.listdir(path)]}
    else:
        f = open(path, 'rb')
        #d = {os.path.basename(path): f.read().hex(" ")}
        d = {os.path.basename(path): base64.b64encode(
            f.read()).decode('ascii')}
        f.close()
    return d


def upadte():
    with open("filesys.json", "w") as f:
        json.dump(path_to_dict("./c/"), f)
    print("ok")
# print(json.dumps(path_to_dict('./c/')))


while True:
    time.sleep(1)
    upadte()
