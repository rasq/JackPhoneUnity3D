var sprites : Sprite[];
var stopAnim = false;
var i = 0;
var loop = false;

var startDelay : float = 4.0;
var frameDelay : float = 0.01;

private var stopNow = false;



function Update(){
}


function Start() {
    Init();
}

function Init() {
    yield WaitForSeconds(startDelay);
    StartForward();
}



function animSprite(reverse){
    do {
        if(reverse == true){
            if (i <= 0){
                if (stopAnim == true){
                    stopNow = true;
                } else if (i > sprites.Length-1) {
                    i = sprites.Length;
                }
            }
        } else {
            if (i > sprites.Length-1){
                if (stopAnim == true){
                    stopNow = true;
                } else if (i <= 0) {
                    i = 0;
                }
            }
        }

        if (i == sprites.Length-1){
            reverse = true;
        } else if (i == 1){
            reverse = false;
        } 

        if (stopNow == false){
            Debug.Log(i);
            GetComponent("SpriteRenderer").sprite = sprites[i];
            yield WaitForSeconds(frameDelay);
                if (reverse == true){
                    i--;
                } else {
                    i++; 
                }   
        } 
    } while(stopNow == false);

    //Debug.Log(i);

    if (loop == true){
        if (i == 0){
            StartForward();
        } else {
            StartReverse();
        }
    }
}

function StartReverse(){
    //Debug.Log("reverse");
    i = sprites.Length - 1;
    stopNow = false;
    animSprite(true);
}

function StartForward(){
   // Debug.Log("forward");
    i = 0;
    stopNow = false;
    animSprite(false);
}
