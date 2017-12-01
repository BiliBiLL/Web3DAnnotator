import os
import sys
from flask import Flask, make_response, render_template, request, json, send_file, jsonify
import numpy as np
import cv2
from PIL import Image
from io import *


app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True

@app.route('/',methods=['GET','POST'])
def gohome():
    return render_template('index.html')
    
    
@app.route('/handle_data',methods=['POST'])
def handle_data():
    file = request.data
    #print file
    
    return "good"
    
if __name__ == "__main__":
    extra_dirs = ['../static']
    extra_files = extra_dirs[:]
    app.run(extra_files=extra_files)
