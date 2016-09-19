#pragma strict

public var debug 				: boolean = false;

public var animatedElement 		: GameObject;
public var introObjects 		: GameObject[];
public var pathPrefix 			: String;

private var UDPClientC 			: UDPClientC;
private var userData 			: GameObject;
private var data 				: GameObject;
private var buttonsInit 		: boolean = false;

//----------------------------------------------------------Awake----------------------------------------------------------------------------
function Awake(){
    if(GameObject.FindWithTag("UDPClient")){ 
        UDPClientC = GameObject.FindWithTag("UDPClient").GetComponent.<UDPClientC>();    
    }
    
    	UDPClientC.changePath(pathPrefix);
    
    if(GameObject.FindWithTag("Player")){   
        userData = GameObject.FindWithTag("Player");
        data = GameObject.FindWithTag("Player");    
    }
}
//----------------------------------------------------------Awake----------------------------------------------------------------------------
//----------------------------------------------------------Start----------------------------------------------------------------------------
function Start(){
    yield WaitForSeconds(0.1);

		if(data == null){
			Instantiate(userData, transform.position, transform.rotation);
		}
		
    UDPClientC.changePath(pathPrefix);
}
//----------------------------------------------------------Start----------------------------------------------------------------------------
//----------------------------------------------------------Update---------------------------------------------------------------------------
function Update(){
    animatedElement.transform.Rotate(0, 0, -(Time.deltaTime)*4.0);
    
    if(UDPClientC != null && UDPClientC != "null" && buttonsInit == false){
        UDPClientC.initBMPButtons(4);
        buttonsInit = true;
        
        	if (debug == true) Debug.Log("buttonsInit");
    }
}
//----------------------------------------------------------Update---------------------------------------------------------------------------
//----------------------------------------------------------loadScene------------------------------------------------------------------------
function loadScene(){
    var x 						: int = 0;

	    for(x = 0; x < introObjects.length; x++){
	        introObjects[x].SetActive(false);
	    }

    	yield WaitForSeconds(1);

    var i						: int = Application.loadedLevel;
 	
 	Application.LoadLevelAsync(i + 1);
}
//----------------------------------------------------------loadScene------------------------------------------------------------------------