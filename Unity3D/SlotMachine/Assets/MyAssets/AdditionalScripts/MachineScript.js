#pragma strict

public var debug 				: boolean = false;

public var network 				: GameObject;
public var problem 				: GameObject;
public var login 				: GameObject;
public var logged 				: GameObject;
public var loginProblem 		: GameObject;
public var administrative 		: GameObject;
public var logout 				: GameObject;
public var newUser 				: GameObject;
public var textFields 			: GameObject;
public var transition 			: GameObject;
public var textGO 				: Text;
public var textGOC 				: InputField;

public var onScreenKeyboard 	: GameObject;

public var tmpString 			: String = "";

public var pswdFNGO 			: GameObject;
public var logintoFNGO 			: GameObject;

private var machineScreen 		: int = 0;
private var wwwCommunication 	: wwwCommunication;
private var loginV 				: String;
private var pswdV 				: String;


//----------------------------------------------------------Awake----------------------------------------------------------------------------
function Awake(){
	if(GameObject.FindWithTag("Player")){   //If we an object in the scene with the tag Player
        wwwCommunication = GameObject.FindWithTag("Player").GetComponent.<wwwCommunication>();   
    }
}
//----------------------------------------------------------Awake----------------------------------------------------------------------------
//----------------------------------------------------------Start----------------------------------------------------------------------------
function Start () {
    disableAll();
}
//----------------------------------------------------------Start----------------------------------------------------------------------------
//----------------------------------------------------------disableAll-----------------------------------------------------------------------
function disableAll(){
    if (network != null) network.SetActive(false);
    if (problem != null) problem.SetActive(false);
    if (login != null) login.SetActive(false);
    if (logged != null) logged.SetActive(false);
    if (loginProblem != null) loginProblem.SetActive(false);
    if (administrative != null) administrative.SetActive(false);
    if (logout != null) logout.SetActive(false);
    if (newUser != null)  newUser.SetActive(false);
    if (pswdFNGO != null) pswdFNGO.SetActive(false);
	if (logintoFNGO != null) logintoFNGO.SetActive(false);
	if (transition != null) transition.SetActive(false);
    if (textFields != null) textFields.SetActive(false);
   	if (onScreenKeyboard != null) onScreenKeyboard.SetActive(false);
}
//----------------------------------------------------------disableAll-----------------------------------------------------------------------
//----------------------------------------------------------loginFN--------------------------------------------------------------------------
function loginFN(){
	transition.SetActive(true);
	
	yield FadeIn();

	machineScreen = 3;
	
		login.SetActive(true);
		textFields.SetActive(true);
    	pswdFNGO.SetActive(true);
		logintoFNGO.SetActive(false);
		onScreenKeyboard.SetActive(true);

	yield FadeOut();
	
		transition.SetActive(false);
	
	pswdV = "";
}
//----------------------------------------------------------loginFN--------------------------------------------------------------------------
//----------------------------------------------------------logintoFNClose-------------------------------------------------------------------
function logintoFNClose(){
	transition.SetActive(true);
	
	yield FadeIn();

	machineScreen = 0;
	
		 disableAll();

	yield FadeOut();
	
		transition.SetActive(false);
	
	pswdV = "";
	loginV = "";
}
//----------------------------------------------------------logintoFNClose-------------------------------------------------------------------
//----------------------------------------------------------pswdFN---------------------------------------------------------------------------
function pswdFN(){
	transition.SetActive(true);
	
	yield FadeIn();
	
	machineScreen = 4;

		login.SetActive(true);
		textFields.SetActive(true);
    	pswdFNGO.SetActive(false);
		logintoFNGO.SetActive(true);
	
	yield FadeOut();
	
		transition.SetActive(false);
	
	wwwCommunication.setUser(loginV, "");
	wwwCommunication.ifUserExist();
}
//----------------------------------------------------------pswdFN---------------------------------------------------------------------------
//----------------------------------------------------------logintoFN------------------------------------------------------------------------
function logintoFN(){
	transition.SetActive(true);
	
	yield FadeIn();
	
	wwwCommunication.setUser(loginV, pswdV);
	wwwCommunication.LoginUser();
	
		if (wwwCommunication.UToken != "" && wwwCommunication.UToken != "0"){
			logged.SetActive(true);
			textFields.SetActive(false);
    		pswdFNGO.SetActive(false);
			logintoFNGO.SetActive(false);
			loginV = "";
		} else {
			disableAll();
			loginProblem.SetActive(true);
			loginV = "";
		}
		
	yield FadeOut();
	
	transition.SetActive(false);
}
//----------------------------------------------------------logintoFN------------------------------------------------------------------------
//----------------------------------------------------------networkProblem-------------------------------------------------------------------
function networkProblem(msg:boolean){
	disableAll();
	transition.SetActive(true);
	
	yield FadeIn();
	
		network.SetActive(msg);
	
	yield FadeOut();
	
	transition.SetActive(false);
}
//----------------------------------------------------------networkProblem-------------------------------------------------------------------
//----------------------------------------------------------admininstratiwe------------------------------------------------------------------
function admininstratiwe(msg:boolean){
	disableAll();
	transition.SetActive(true);
	
	yield FadeIn();
	
		administrative.SetActive(msg);
	
	yield FadeOut();
	
	transition.SetActive(false);
}
//----------------------------------------------------------admininstratiwe------------------------------------------------------------------
//----------------------------------------------------------changeString---------------------------------------------------------------------
function changeString(){
	tmpString = textGOC.text;
	
	if (debug == true) Debug.Log("changeString: " + tmpString);
	
		if (machineScreen == 3){
			loginV = tmpString;
			tmpString = "";
		} else if (machineScreen == 4){
			pswdV = tmpString;
			tmpString = "";
		}
}
//----------------------------------------------------------changeString---------------------------------------------------------------------
//----------------------------------------------------------FadeIn---------------------------------------------------------------------------
function FadeIn() {
	if (debug == true) Debug.Log("FadeIn");
	
	var progress 				: float  = 0.0;
    var tmp 					: Color;
         
        tmp = transition.GetComponent.<SpriteRenderer>().color;
        tmp.a = 0;
         	
        transition.GetComponent.<SpriteRenderer>().color = tmp;
 
	         while (progress < 1) {
	            transition.GetComponent.<SpriteRenderer>().color.a = progress; 
	            progress += Time.deltaTime * 1.8;
	           	yield;
	         }
}
//----------------------------------------------------------FadeIn---------------------------------------------------------------------------
//----------------------------------------------------------FadeOut--------------------------------------------------------------------------
function FadeOut() {
	if (debug == true) Debug.Log("FadeOut");

   	var progress 				: float  = 0.0;
   	var tmp 					: Color;
         
      	tmp = transition.GetComponent.<SpriteRenderer>().color;
     	tmp.a = 1;
         	
       	transition.GetComponent.<SpriteRenderer>().color = tmp;
 
	         while ((1-progress) > 0) {
	             transition.GetComponent.<SpriteRenderer>().color.a = 1-progress ; 
	             progress += Time.deltaTime * 1.8f;
	             yield;
	         }
}
//----------------------------------------------------------FadeOut--------------------------------------------------------------------------