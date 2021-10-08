video="";
Status="";
objects=[];

function preload(){
    video=createVideo('video.mp4');
    video.hide();
    
}

function setup(){
canvas=createCanvas(350,300);
canvas.center();
}

function draw(){
    image(video,0,0,350,300);
    if(Status!= ""){
        objectDetector.detect(video, gotResult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML="Number of objects detected are: " + objects.length;

            fill("#e35f59");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#e35f59");
            rect(objects[i].x + 10, objects[i].y + 10, objects[i].width, objects[i].height);
        }
    }
}

function start(){
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function modelLoaded(){
console.log("model is loaded");
Status=true;
video.loop();
video.speed(1.0);
video.volume(0.0);
}

function gotResult(error, results){
if(error){
    console.error(error);
}
else{
    console.log(results);
    objects=results;
}
}