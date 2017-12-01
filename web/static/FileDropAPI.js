function addDNDListeners() { 
    var container = document.getElementById("container"); 
    var fileList = document.getElementById("fileList"); 
    // 拖拽进入目标对象时触发
    container.addEventListener("dragenter", function(event) 
    { 
        fileList.innerHTML =''; 
        event.stopPropagation(); 
        event.preventDefault(); 
    }, false); 
    // 拖拽在目标对象上时触发
    container.addEventListener("dragover", function(event) 
    { 
        event.stopPropagation(); 
        event.preventDefault(); 
    }, false); 
    // 拖拽结束时触发
    container.addEventListener("drop", handleDrop, false); 
} 



function handleDrop(event) { 
   // 获取拖拽的文件列表
    var files = event.dataTransfer.files; 
    event.stopPropagation(); 
    event.preventDefault(); 
    var fileList = document.getElementById("fileList"); 
    // 展示文件缩略图，文件名和上传进度，上传文件
    for (var i = 0; i < files.length; i++) { 
        var file = files[i]; 
        var li = document.createElement('li'); 
        var progressbar = document.createElement('div'); 
        var img = document.createElement('img'); 
        var name = document.createElement('span'); 
        progressbar.className = "progressBar"; 
        img.src = files[i].getAsDataURL(); 
        img.width = 32; 
        img.height = 32; 
        name.innerHTML = file.name; 
        li.appendChild(img); 
        li.appendChild(name); 
        li.appendChild(progressbar); 
        fileList.appendChild(li); 
        uploadFile(file, progressbar) 
    } 
}


window.addEventListener("load", addDNDListeners, false);
