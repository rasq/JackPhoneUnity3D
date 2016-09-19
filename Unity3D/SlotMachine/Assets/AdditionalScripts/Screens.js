#pragma strict

var loading : GameObject[];
var loadingMask : GameObject;

var animatedElement : GameObject[];

var loadingMaskPos : float[];


var UDPClientC : UDPClientC;
var MachineScript : MachineScript;


function Awake(){
    if(GameObject.FindWithTag("UDPClient")){   //If we an object in the scene with the tag Player
        UDPClientC = GameObject.FindWithTag("UDPClient").GetComponent.<UDPClientC>();    //Store that object as our users information object
    }
}


function Start () {
    toLoad();
    loadMask();
}

function Update () {
    for(var x = 0; x < animatedElement.Length; x++){
        animatedElement[x].transform.Rotate(0, 0, -(Time.deltaTime)*4.0);
    }
}



function loadMask(){
    iTween.MoveBy(loadingMask, iTween.Hash("y", -(loadingMaskPos[0]-loadingMaskPos[1]), "easeType", "easeInExpo", "loopType", "none", "delay", 3.0, "onComplete", "loaded", "onCompleteTarget", gameObject));
}


function loaded(){
   	MachineScript.transition.SetActive(true);
   	yield MachineScript.FadeIn();
   	
    for(var x = 0; x < loading.Length; x++){
        loading[x].SetActive(false);
    }
    loadingMask.transform.localPosition.y = loadingMaskPos[0];	
    loadingMask.SetActive(false);
    
   	yield MachineScript.FadeOut();
  	MachineScript.transition.SetActive(false);

    //UDPClientC.initBMPButtons(0); //change buttons to game mode (changing bmp from loading to other bmps)
}


function toLoad(){
    for(var x = 0; x < loading.Length; x++){
        loading[x].SetActive(true);
    }
    loadingMask.transform.localPosition.y = loadingMaskPos[0];
    loadingMask.SetActive(true);
}


