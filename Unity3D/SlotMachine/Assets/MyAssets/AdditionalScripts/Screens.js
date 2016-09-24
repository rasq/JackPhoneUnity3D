#pragma strict

public var debug 				: boolean = false;

public var loading 				: GameObject[];
public var loadingMask 			: GameObject;
public var animatedElement 		: GameObject[];
public var loadingMaskPos 		: float[];

private var UDPClientC 			: UDPClientC;
private var MachineScript 		: MachineScript;


//----------------------------------------------------------Awake----------------------------------------------------------------------------
function Awake(){
    if(GameObject.FindWithTag("UDPClient")){   
        UDPClientC = GameObject.FindWithTag("UDPClient").GetComponent.<UDPClientC>();   
    }
    
	if(GameObject.FindWithTag("MachineScreens")){   
	    MachineScript = GameObject.FindWithTag("MachineScreens").GetComponent.<MachineScript>();    
	}
}
//----------------------------------------------------------Awake----------------------------------------------------------------------------
//----------------------------------------------------------Start----------------------------------------------------------------------------
function Start () {
    toLoad();
    loadMask();
}
//----------------------------------------------------------Start----------------------------------------------------------------------------
//----------------------------------------------------------Update---------------------------------------------------------------------------
function Update () {
    for(var x = 0; x < animatedElement.Length; x++){
        animatedElement[x].transform.Rotate(0, 0, -(Time.deltaTime)*4.0);
    }
}
//----------------------------------------------------------Update---------------------------------------------------------------------------
//----------------------------------------------------------loadMask-------------------------------------------------------------------------
function loadMask(){
    iTween.MoveBy(loadingMask, iTween.Hash("y", -(loadingMaskPos[0]-loadingMaskPos[1]), "easeType", "easeInExpo", "loopType", "none", "delay", 3.0, "onComplete", "loaded", "onCompleteTarget", gameObject));
}
//----------------------------------------------------------loadMask-------------------------------------------------------------------------
//----------------------------------------------------------loaded---------------------------------------------------------------------------
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
}
//----------------------------------------------------------loaded---------------------------------------------------------------------------
//----------------------------------------------------------toLoad---------------------------------------------------------------------------
function toLoad(){
    for(var x = 0; x < loading.Length; x++){
        loading[x].SetActive(true);
    }
    
    loadingMask.transform.localPosition.y = loadingMaskPos[0];
    loadingMask.SetActive(true);
}
//----------------------------------------------------------toLoad---------------------------------------------------------------------------