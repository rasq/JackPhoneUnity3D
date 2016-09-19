#pragma strict

var object : GameObject;

var idleAnim : Sprite[];

var anim01 : Sprite[];
var anim02 : Sprite[];
var anim03 : Sprite[];
var anim04 : Sprite[];
var anim05 : Sprite[];
var anim06 : Sprite[];

var frameDelay : float = 0.01;
var anims : int[];
var time : float[];

var i : int = 0;
var j : int = 0;
var leng : int = 0;
var stopNow : boolean = false;
var stopAnim : boolean = false;

private var rand : int = 2;


function Start () {
    functionContainer();
}

function functionContainer(){
    i = 0;
    stopNow = false;
    idleSprite();
}


function switchSpriteAnim() {
    //yield WaitForSeconds(Random.Range (time[0], time[1]));
    j = Random.Range (anims[0], anims[1]);
    
    if (j == 0){
        leng = anim01.Length-2;
    } else if (j == 1){
        leng = anim02.Length-2;
    } else if (j == 2){
        leng = anim03.Length-2;
    } else if (j == 3){
        leng = anim04.Length-2;
    } else if (j == 4){
        leng = anim05.Length-2;
    } else if (j == 5){
        leng = anim06.Length-2;
    }

    StartForward();
}



function StartForward(){
    i = 0;
    stopNow = false;
    animSprite(false);
}


function animSprite(reverse){
    do {
        if (stopNow == false){
            if (j == 0){
                object.GetComponent(SpriteRenderer).sprite = anim01[i];
            } else if (j == 1){
                object.GetComponent(SpriteRenderer).sprite = anim02[i];
            } else if (j == 2){
                object.GetComponent(SpriteRenderer).sprite = anim03[i];
            } else if (j == 3){
                object.GetComponent(SpriteRenderer).sprite = anim04[i];
            } else if (j == 4){
                object.GetComponent(SpriteRenderer).sprite = anim05[i];
            } else if (j == 5){
                object.GetComponent(SpriteRenderer).sprite = anim06[i];
            }

            yield WaitForSeconds(frameDelay);

            i++;  
            
            if (i == leng){
               stopNow = true;
               i = 0;
            }
        } 
    } while(stopNow == false);

    
    rand = Random.Range (1, 4);
    functionContainer();
}



function idleSprite(){
    leng = idleAnim.Length-2;

    do {
        object.GetComponent(SpriteRenderer).sprite = idleAnim[i];
        yield WaitForSeconds(frameDelay);

        i++;  
            
        if (i == leng){
            stopNow = true;
            i = 0;
        }
    } while(stopNow == false);

    i = 0;
    rand--;



    if (rand == 0){
        switchSpriteAnim();
    } else {
        functionContainer();
    }
}