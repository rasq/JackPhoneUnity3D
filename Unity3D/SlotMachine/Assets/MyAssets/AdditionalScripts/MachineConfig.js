#pragma strict
import UnityEngine.UI;#pragma strict

public var debug 				: boolean = false;

public var loginT 				: Text;
public var pwdT 				: Text;
public var drvK 				: Text;
public var GO 					: GameObject[];


private var wwwCommunication 	: wwwCommunication;
private var login 				: String = "";
private var password 			: String = "";
private var driverKey 			: String = "";


//----------------------------------------------------------Awake----------------------------------------------------------------------------
function Awake(){
    if(GameObject.FindWithTag("Player")){  
        wwwCommunication = GameObject.FindWithTag("Player").GetComponent.<wwwCommunication>(); 
        GO[0] = GameObject.FindWithTag("Player");
    }
    
    if(GameObject.FindWithTag("UDPClient")){  
        GO[1] = GameObject.FindWithTag("UDPClient");
    }
}
//----------------------------------------------------------Awake----------------------------------------------------------------------------
//----------------------------------------------------------cancel---------------------------------------------------------------------------
function cancel(){
	for (var x = 0; x < GO.Length; x++){
	   Destroy(GO[x]);
	}
	
 	Application.LoadLevel(0);
}
//----------------------------------------------------------cancel---------------------------------------------------------------------------
//----------------------------------------------------------save-----------------------------------------------------------------------------
function save(){
	wwwCommunication.initialMachineSetup(login, password, driverKey);
	
		for (var x = 0; x < GO.Length; x++){
		   Destroy(GO[x]);
		}
	
 	Application.LoadLevel(0);
}
//----------------------------------------------------------save-----------------------------------------------------------------------------
//----------------------------------------------------------getLogin-------------------------------------------------------------------------
function getLogin(){
	login = loginT.text;
}
//----------------------------------------------------------getLogin-------------------------------------------------------------------------
//----------------------------------------------------------getPasswd------------------------------------------------------------------------
function getPasswd(){
	password = pwdT.text;
}
//----------------------------------------------------------getPasswd------------------------------------------------------------------------
//----------------------------------------------------------getPasswd------------------------------------------------------------------------
function getDrvKey(){
	driverKey = drvK.text;
}
//----------------------------------------------------------getPasswd------------------------------------------------------------------------