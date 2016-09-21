#pragma strict

public var debug 				: boolean = false;

public var games				: int;
public var sceneList			: int[];
public var loadingScreen 		: GameObject;
public var NumbersScript 		: NumbersScript;

private var buttonContainer 	: GUIText;
private var UDPClientC 			: UDPClientC;
private var MachineScript 		: MachineScript;
private var userData 			: UserData;
private var wwwCommunication 	: wwwCommunication;


//----------------------------------------------------------Awake----------------------------------------------------------------------------
function Awake(){
	Screen.SetResolution(3440, 1440, true);
    buttonContainer = gameObject.GetComponent("GUIText");
    
	    if(GameObject.FindWithTag("Player")){   
	        userData = GameObject.FindWithTag("Player").GetComponent.<UserData>();
	        wwwCommunication = GameObject.FindWithTag("Player").GetComponent.<wwwCommunication>();   
	    }
    
	    if (buttonContainer == null){
	    	buttonContainer = gameObject.AddComponent.<GUIText>();
	    }
	    
	    if(GameObject.FindWithTag("UDPClient")){   
	        UDPClientC = GameObject.FindWithTag("UDPClient").GetComponent.<UDPClientC>();    
	    }
	    
	    if(GameObject.FindWithTag("MachineScreens")){  
	        MachineScript = GameObject.FindWithTag("MachineScreens").GetComponent.<MachineScript>(); 
	    }
}
//----------------------------------------------------------Awake----------------------------------------------------------------------------
//----------------------------------------------------------Start----------------------------------------------------------------------------
function Start(){
    yield WaitForSeconds(2.5);
    
    MachineScript.transition.SetActive(true);
    
    yield MachineScript.FadeIn();
    
    	loadingScreen.SetActive(false);
    
    yield MachineScript.FadeOut();
    
    MachineScript.transition.SetActive(false);
    
    upddateCoins();
}
//----------------------------------------------------------Start----------------------------------------------------------------------------
//----------------------------------------------------------Update---------------------------------------------------------------------------
function Update(){
    if(Input.GetMouseButtonDown(0)){
        Click(Input.mousePosition);
    }
    
    if(buttonContainer.text != "as12"){
    	if (debug == true) Debug.Log("buttonContainer.text: " + buttonContainer.text);
    		parseInput(buttonContainer.text);
    		buttonContainer.text = "as12";
    }
}
//----------------------------------------------------------Update---------------------------------------------------------------------------
//----------------------------------------------------------Click----------------------------------------------------------------------------
function Click(position : Vector3){
    var ray 					: Ray = GetComponent.<Camera>().ScreenPointToRay(position);
    var hit 					: RaycastHit;
	
    if(Physics.Raycast(ray, hit, 100)){
        if (debug == true) Debug.Log("Lobby hit: " + hit.collider.gameObject.name);
	        if (hit.collider.gameObject.name != "prev" && hit.collider.gameObject.name != "next" && hit.collider.gameObject.name != "login"){
	             parseInput("BTN," + hit.collider.gameObject.name);
	        } else {
	        	if (hit.collider.gameObject.name == "login"){
	        	
	        	}
	        }
    }
}
//----------------------------------------------------------Click----------------------------------------------------------------------------
//----------------------------------------------------------serviceMenu----------------------------------------------------------------------
function serviceMenu(){
	Application.LoadLevelAsync("21_9_MachineConfig");
}
//----------------------------------------------------------serviceMenu----------------------------------------------------------------------
//----------------------------------------------------------loadScene------------------------------------------------------------------------
function loadScene(msg:String){
  	var tmpInt 					: int = System.Int32.Parse(msg);

        if (tmpInt > games){
           	if (debug == true) Debug.Log("This game doesent exist.");
        } else {
    		MachineScript.transition.SetActive(true);
    		
    		yield MachineScript.FadeIn();
    		
        		loadingScreen.SetActive(true);
        	
        	yield MachineScript.FadeOut();
        	
    		MachineScript.transition.SetActive(false);
            
            UDPClientC.changePath("0" + msg + "\\");
            Application.LoadLevelAsync(tmpInt);
            
            MachineScript.transition.SetActive(true);
    		
    		yield MachineScript.FadeIn();
        }
}
//----------------------------------------------------------loadScene-------------------------------------------------------------------------
//----------------------------------------------------------upddateCoins----------------------------------------------------------------------
function upddateCoins(){
	NumbersScript.setNumber(0, userData.getValue("Coins").ToString());
}
//----------------------------------------------------------upddateCoins----------------------------------------------------------------------
//----------------------------------------------------------parseInput------------------------------------------------------------------------
function parseInput(msg:String){
	var strArr					: String[];
	var sceneNumber				: int;
	var scene					: int;
	var sceneS					: String;
	var separator 				: char[] = [","[0]];
	 	
	 	strArr = msg.Split(separator);
	
	switch (strArr[0]) {
		case "BTN":
				sceneNumber = System.Int32.Parse(strArr[1]);
			if (sceneNumber < sceneList.Length){
				scene = sceneList[sceneNumber];
				sceneS = scene.ToString();
				loadScene(sceneS);
			}
			break;
		case "SK":
			if (strArr[2] == "ON"){
	            serviceMenu();
			} else {
		
			}
			break;
		default:
			if (debug == true) Debug.Log("Bad input.");
			break;
	}
}
//----------------------------------------------------------parseInput------------------------------------------------------------------------