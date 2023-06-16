var status1 = "";
var objects = [];

function preload(){
    video= createVideo("video.mp4");
    video.hide();
}
function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
}
function start(){
    objectDetector=ml5.objectDetector("cocossd",modelLoad());
    document.getElementById("status").innerHTML="detectando objetos";
}
function modelLoad(){
    console.log("Modelo Carregado!");
    status1 = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResult(error,result){
    if(error){
        console.log(error);
    }
        objects=result;
}
function draw(){
    image(video,0,0,480,380);
    if (status1 != ""){
        objectDetector.detect(video,gotResult())
        for (var i = 0; i<objects.length; i++){
            document.getElementById("status").innerHTML="status: detectado";
            document.getElementById("numberO").innerHTML="quantidade de objetos detectados: " + objects.length;
            fill("#FF0000");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+ " " + percent + "%" ,objects[i].x+15,objects[i].y+15);
            nofill();
            stroke("#FF0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
        }

    }
}