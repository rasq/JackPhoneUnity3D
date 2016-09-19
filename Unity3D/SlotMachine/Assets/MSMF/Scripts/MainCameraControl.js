#pragma strict


private var VegasSlots : VegasSlots;
private var CoinShower : CoinShower;
private var qualityLVL : int = 1;
private var QualityNames : String[];

public var buttons : Transform[];
public var UIElements : GameObject[];


function Awake(){
	QualityNames = QualitySettings.names;
	//If we an object in the scene with the tag GameScreenCamera
	if(GameObject.FindWithTag("GameScreenCamera")){
		//Store that object as our users information object
		VegasSlots = GameObject.FindWithTag("GameScreenCamera").GetComponent.<VegasSlots>();
	}
	
	if(GameObject.Find("/CoinShower")){
		//Store that object as our users information object
		CoinShower = GameObject.Find("/CoinShower").GetComponent.<CoinShower>();
	}
}	


	
function Start () {

}

function Update () {
	//If we left click
	/*if(Input.GetMouseButtonDown(0)){
		//If we are not in a bonus game
			//Check for a button
			Click(Input.mousePosition, "left");
	}
	
	if(Input.GetMouseButtonDown(1)){
		//If we are not in a bonus game
			//Check for a button
			Click(Input.mousePosition, "right");
	}*/
	//Xone controller A buttton or keyboard S button for start Spin function
	/*if (Input.GetKeyUp (KeyCode.JoystickButton0) || Input.GetKeyUp (KeyCode.P)){
		VegasSlots.ReciveClick(buttons[0], "left", Vector3(0.0,0.0,0.0));
	}*/
	//Xone controller A buttton or keyboard S button for start Spin function
	/*if (Input.GetKeyUp (KeyCode.LeftBracket)){
		CoinShower.startPayoff();
	}*/
	
	
	
	
	//] button for FOV change 
	if (Input.GetKeyUp (KeyCode.RightBracket)){
		if(Camera.main.fieldOfView == 90.0){
			Camera.main.fieldOfView = 60.0;
			UIElements[0].transform.localPosition = Vector3(0.0, 0.0, 86.95);
			//UIElements[0].transform.localScale = Vector3(-0.4, 0.4, 0.4);
		} else if(Camera.main.fieldOfView == 60.0){
			Camera.main.fieldOfView = 90.0;
			UIElements[0].transform.localPosition = Vector3(0.0, 0.0, 49.4);
			//UIElements[0].transform.localScale = Vector3(-0.65, 0.65, 0.65);
		} 
	}
	
	
	
	
	//\ button for FOV change 
	if (Input.GetKeyUp (KeyCode.Backslash)){
		if(qualityLVL == 0){
			QualitySettings.SetQualityLevel (1, true);
			qualityLVL = 1;
		} else if(qualityLVL == 1){
			QualitySettings.SetQualityLevel (0, true);
			qualityLVL = 0;
		} 
	}
}




//////////Left mouse click / Finger push function with a position parameter to check for buttons//////////
function Click(position : Vector3, button : String){
	//Ray that is drawn based on the click/touch position and our main camera
	var ray : Ray = GetComponent.<Camera>().ScreenPointToRay(position);
	
	//The hit of the ray
	var hit : RaycastHit;
	
	//If the ray hit anything within 100 units away
	if(Physics.Raycast(ray, hit, 100)){
			print("hit.transform " + hit.transform + " button " + button + " position " + position);
            //VegasSlots.ReciveClick(hit.transform, button, position);
	}
}

