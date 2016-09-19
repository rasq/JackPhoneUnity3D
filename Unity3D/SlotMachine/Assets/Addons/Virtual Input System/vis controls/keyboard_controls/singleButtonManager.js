#pragma strict

var onOut : Sprite;
var onIn : Sprite;

var images : Sprite[];

var isOn : boolean = false;




function Update () {
    if (isOn == false){
        GetComponent(SpriteRenderer).sprite = onOut;
    } else {
        GetComponent(SpriteRenderer).sprite = onIn;
    }
}



function setSet(msg : int){
    var tmp : int = (2*msg)-1;

    if (images.Length >= tmp){
        onOut = images[tmp-1];
        onIn = images[tmp];
    }
}



function setOut(){
    isOn = false;
}

function setIn(){
    isOn = true;
}