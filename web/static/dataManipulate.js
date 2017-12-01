function disovleData(reader){
    var buffer = reader.result;
    var dv = new DataView(buffer);
    var data = [];
    offset = 0;
    
    while(offset < dv.byteLength){
        var row = viewReader("int",dv,1);
        var col = viewReader("int",dv,1);
        viewReader("double",dv,9);
        viewReader("double",dv,3);
        var view = {
            "nrow":row,
            "ncol":col,
            "position":Create2DArray(row,col),
            "color":Create2DArray(row,col),
            "intensity":Create2DArray(row,col),
            "label":Create2DArray(row,col),
        }
        
        for(var i=0;i<col;i++){
            for(var j=0;j<row;j++){
                view.position[j][i] = viewReader("float",dv,3);
                view.color[j][i] = viewReader("int",dv,3);
                view.intensity[j][i] = viewReader("float",dv,1);
                view.label[j][i] = viewReader("int",dv,1);
            }
        }
        data.push(view);
    }
    
    return data;
}

function Create2DArray(rows,columns) {
   var x = new Array(rows);
   for (var i = 0; i < rows; i++) {
       x[i] = new Array(columns);
   }
   return x;
}

function viewReader(method,dv,size){
    var result = [];
    if(method === "int"){
        for(var i=0;i<size;i++){
            result[i] = dv.getInt32(offset,true);
            offset += 4;
        }
        if(size == 1){
            return result[0];
        }
        return result;
    }
    else if(method === "float"){
        for(var i=0;i<size;i++){
            result[i] = dv.getFloat32(offset,true);
            offset += 4;
        }
        if(size == 1){
            return result[0];
        }
        return result;
    }
    else if(method === "double"){
        for(var i=0;i<size;i++){
            result[i] = dv.getFloat64(offset,true);
            offset += 8;
        }
        if(size == 1){
            return result[0];
        }
        return result;
    }
    else{
        console.log("TypeEror!");
        return [];
    }
}
/* matlab code
clear;
%This program is to read the ptb segment result file
FileId = fopen('Cov017_seg.ptb','r');
i=1;
dim = fread(FileId,[1:2],'int');
while(not(isempty(dim)))
    
    fread(FileId,9,'double'); %skip the M_rotate
    fread(FileId,3,'double'); %skip the V_trans
    scan(i).nrow = dim(1);
    scan(i).ncol = dim(2);
    scan(i).position = zeros(dim(1),dim(2),3);
    scan(i).color = zeros(dim(1),dim(2),3);
    scan(i).intensity = zeros(dim(1),dim(2));
    scan(i).label = zeros(dim(1),dim(2));
    
    for j = 1:dim(2)
        for k = 1:dim(1)
            scan(i).position(k,j,:) = fread(FileId,[1,3],'float');
            scan(i).color(k,j,:) = fread(FileId,[1,3],'int');
            scan(i).intensity(k,j) = fread(FileId,1,'float');
            scan(i).label(k,j) = fread(FileId,1,'int');
        end
    end
    i= i+1;
    dim = fread(FileId,[1:2],'int');
end

panoramic = scan.color;
panoramic = imrotate(panoramic,180);
panoramic = panoramic/max(max(max(panoramic)));

figure;
imshow(panoramic);

label = scan.label;
label(label == -1) = 0;
label = imrotate(label,180);
catagory = labeloverlay(panoramic,label);

figure;
imshow(catagory);

*/
