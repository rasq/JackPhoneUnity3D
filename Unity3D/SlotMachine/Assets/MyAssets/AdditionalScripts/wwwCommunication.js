#pragma strict

import System;
import System.IO;
import System.Xml;
import System.Text;

/*
www.gambling.silentus.pl/app_dev.php/

linki do api wysłałem w mailu:
www.gambling.silentus.pl/app_dev.php/api/auth?email=[adres_email] - sprawdza czy istnieje dany user
www.gambling.silentus.pl/app_dev.php/api/auth?phone=[telefon] - j.w
www.gambling.silentus.pl/app_dev.php/api/auth?phone=[telefon]&password=[haslo] - loguje
www.gambling.silentus.pl/app_dev.php/api/auth?email=[telefon]&password=[haslo] - j.w


pozniej dalsza komunikacja potrzebuje hash czyli dodaje sie &access_token=[token]

rejestracja usera
www.gambling.silentus.pl/app_dev.php/api/register?email=[email]&access_token=[token]
www.gambling.silentus.pl/app_dev.php/api/register?phone=[email]&access_token=[token]


www.gambling.silentus.pl/app_dev.php/api/bilans?amount=500&type=plus&access_token=[token]
www.gambling.silentus.pl/app_dev.php/api/bilans?amount=500&type=minus&access_token=[token]

zmiana bilansu:
www.gambling.silentus.pl/app_dev.php/api/user?bilans=[+/-kwota]&access_token=[token]

*/

public var debug 				: boolean = false;
public var debugGUI 			: boolean = false;

public var APIIP 				: String = "45.120.148.82";
public var urlAPI 				: String = "";
public var urlAPIDev 			: String = "http://jackphone.pl/app_dev.php/api/";
public var urlAPIProd 			: String = "http://jackphone.pl/api/";
public var devBuild 			: boolean = false;

@HideInInspector
public var MachinePassword 		: String = ""; //password
@HideInInspector
public var MachinePhone 		: String = ""; //phone
@HideInInspector
public var fLogin 				: String = ""; //login (email or phone)
@HideInInspector
public var fPassword 			: String = ""; //password
@HideInInspector
public var MTokenField 			: String = "";
@HideInInspector
public var UTokenField 			: String = "";
@HideInInspector
public var USaldoField 			: String = "";
@HideInInspector
public var GameConfigField 		: String = "";

public var checkFMachine 		: boolean = false;
public var checkSMachine 		: boolean = false;
public var checkTMachine 		: boolean = false;

@HideInInspector
public var UBilans 				: int = 0; //user current all bids
@HideInInspector
public var MBilans 				: int = 0; //machine current all bids
@HideInInspector
public var MToken 				: String = ""; //logged machine token
@HideInInspector
public var USaldo 				: String = "";
@HideInInspector
public var MSaldo 				: String = "";
@HideInInspector
public var GameConfig 			: String = "";
@HideInInspector
public var MachineStatus 		: String = "";
@HideInInspector
public var HashValue 			: String = "";
@HideInInspector
public var UToken 				: String = ""; //current user token
@HideInInspector

//game configurations
public var jackphoneV 			: String = "";
public var jackphoneAddV		: String = "";
public var nextWinV 			: String = "";
public var bonusWinV 			: String = "";
public var jackphoneToWinV 		: String = "";
public var configIDV 			: String = "";
public var dataG 				: String[];
//machine status
public var configMV 			: String= "";
@HideInInspector
public var autoupdateMV 		: String= "";
@HideInInspector
public var gameURLMV 			: String= "";
@HideInInspector
public var gameHashMV 			: String= "";
@HideInInspector
public var playableMV 			: String= "";
@HideInInspector
public var phonePrefixMV 		: String= "";

public var dataM 				: String[];
//other not cool stuff
public var phoneNumberToSet 	: String = "";

public var buttonManager 		: buttonManager;
private var MachineNumberControl: MachineNumberControl;
private var tempDrvKey 			: String = "";
private var driverKeyS 			: String = "";
private var tempUser 			: String = "";
private var tempPassword 		: String = "";
private var token 				: String = "";
private var saldo 				: String = "";
private var gameVersion 		: String = "1";
private var gameID 				: String = "1";
private var xmlPath 			: String = "Assets/machines.xml";
private var checkPhone 			: boolean = false; //phone
private var checkEmail 			: boolean = false; //email
private var RC 					: int = 0;
private var APIIPPing 			: Ping;
private var www					: WWW;
private var UDPClientC 			: UDPClientC;
private var VegasSlots 			: VegasSlots;
private var MachineScript 		: MachineScript;

private var gPing 				: int = 0;
private var bPing 				: int = 0;
private var pingTime 			: int = 15;

  #if UNITY_EDITOR
		xmlPath = "Assets/machines.xml";
  #endif
  
  #if UNITY_STANDALONE_WIN
		xmlPath = "machines.xml";
  #endif 


//----------------------------------------------------------Awake----------------------------------------------------------------------------
function Awake(){  
		if (debug == true) Debug.Log("xmlPath: " + xmlPath);
	
	if (devBuild == true){
		urlAPI = urlAPIDev;
	} else {
		urlAPI = urlAPIProd;
	}
}
//----------------------------------------------------------Awake----------------------------------------------------------------------------
//----------------------------------------------------------Start----------------------------------------------------------------------------
function Start() {
    	if (debug == true) Debug.Log("Starting www API");
    
    pingSystem();
}
//----------------------------------------------------------Start----------------------------------------------------------------------------
//----------------------------------------------------------Update---------------------------------------------------------------------------
function Update() {
    if(MachineNumberControl == null){
		if(GameObject.FindWithTag("MachineNumberControl")){  
		    MachineNumberControl = GameObject.FindWithTag("MachineNumberControl").GetComponent.<MachineNumberControl>();    
		   	MachineNumberControl.machineNumberReciver(phoneNumberToSet);
		}
    }
    
    if(GameObject.FindWithTag("MainCamera")){  
        buttonManager = GameObject.FindWithTag("MainCamera").GetComponent.<buttonManager>();  
    }
    
	if(GameObject.FindWithTag("UDPClient")){   
	    UDPClientC = GameObject.FindWithTag("UDPClient").GetComponent.<UDPClientC>();    
	}
    
	if(GameObject.FindWithTag("VegasSlots")){   
	    VegasSlots = GameObject.FindWithTag("VegasSlots").GetComponent.<VegasSlots>();    
	}
    
	if(GameObject.FindWithTag("MachineScreens")){   
	    MachineScript = GameObject.FindWithTag("MachineScreens").GetComponent.<MachineScript>();    
	}
}
//----------------------------------------------------------Update---------------------------------------------------------------------------
//----------------------------------------------------------OnGUI----------------------------------------------------------------------------
function OnGUI() {
	if (debugGUI == true){
	    GUI.Label( Rect (10, 183, 120, 30), "Login:" );
	    fLogin = GUI.TextField ( Rect (90, 180, 150, 25), fLogin );

	    if ( GUI.Button ( Rect (250, 183, 100, 20) , "Check" ) ){
	        ifUserExist();
	    }

	    GUI.Label( Rect (10, 210, 120, 30), "Password:" );
	    fPassword = GUI.TextField ( Rect (90, 210, 150, 25), fPassword );

	    if ( GUI.Button ( Rect (90, 240, 100, 20) , "Log in" ) ){
	        LoginUser();
	        CheckMachines();
	    }

	    if ( GUI.Button ( Rect (320, 55, 80, 80) , "This Machine" ) ){
	        LogThisMachine(); 
	    }

	    //bilans GUI
	    GUI.Label (Rect (500, 10, 100, 20), "Stawka: " + UBilans);

	    if ( GUI.Button ( Rect (500, 40, 80, 20) , "Add 20" ) ){
	        Add20();
	    }

	    if ( GUI.Button ( Rect (600, 40, 80, 20) , "Add 40" ) ){
	        Add40();
	    }

	    if ( GUI.Button ( Rect (700, 40, 80, 20) , "Add 100" ) ){
	        Add100();
	    }

	    if ( GUI.Button ( Rect (500, 70, 80, 20) , "Sub 20" ) ){
	        Sub20();
	    }

	    if ( GUI.Button ( Rect (600, 70, 80, 20) , "Sub 40" ) ){
	        Sub40();
	    }

	    if ( GUI.Button ( Rect (700, 70, 80, 20) , "Sub 100" ) ){
	        Sub100();
	    }

	    //play & logout GUI
	    if ( GUI.Button ( Rect (500, 130, 130, 50) , "GRAJ" ) ){
	        DisplayUSaldo();
	        //GameConfiguration();
	        //WinGame();
	    }

	    if ( GUI.Button ( Rect (500, 220, 130, 40) , "WYLOGUJ" ) ){
	        LogOut();
	    }

	    GUI.Label (Rect (650, 125, 150, 25), "Twoje saldo: ");
	    USaldoField = GUI.TextField ( Rect (650, 150, 150, 30), USaldo);

	    GUI.Label (Rect (20, 415, 150, 20), "Token Maszyny: ");
	    MTokenField = GUI.TextField ( Rect (20, 440, 250, 25), MToken );

	    GUI.Label (Rect (20, 465, 150, 20), "Token Usera: ");
	    UTokenField = GUI.TextField ( Rect (20, 485, 250, 25), UToken );

	    GUI.Label (Rect (20, 510, 150, 20), "Konfiguracja gry i dostępność maszyny: ");
	    GameConfigField = GUI.TextField ( Rect (20, 530, 750, 85), GameConfig + "\n" + MachineStatus );
    }
}
//----------------------------------------------------------OnGUI----------------------------------------------------------------------------
//----------------------------------------------------------initialMachineSetup--------------------------------------------------------------
function initialMachineSetup(login:String, password:String, drvKey:String){
	var pullData 				: String = "";
	var writer 					: XmlWriter  = XmlWriter.Create(xmlPath);
	
		tempUser = login;
		tempPassword = password;
		tempDrvKey = drvKey;
		
			yield getDataWWW("m/driverkey?DK=" + tempDrvKey + "&MT=" + MToken);

			pullData = www.text;
			
			if (pullData == "-2"){
				if (debug == true) Debug.Log("initialMachineSetup, driverkey update faild. Bad MToken.");
			} else if (pullData == "0"){
				if (debug == true) Debug.Log("initialMachineSetup, driverkey update success.");
			} else {
				if (debug == true) Debug.Log("initialMachineSetup, driverkey update faild. Other error.");
			}
			
	    UDPClientC.driverKey = tempDrvKey;
			       
			writer.WriteStartDocument();
			writer.WriteStartElement("machines");
		
			writer.WriteStartElement("machine");
			writer.WriteAttributeString("id", "1");
				writer.WriteStartElement("phone");
					writer.WriteString(tempUser);
				writer.WriteEndElement();
				writer.WriteStartElement("password");
					writer.WriteString(tempPassword);
				writer.WriteEndElement();
				writer.WriteStartElement("driverKey");
					writer.WriteString(tempDrvKey);
				writer.WriteEndElement();
			writer.WriteEndElement();
			       
			               
			writer.WriteEndElement();
			writer.WriteEndDocument();
			       
			writer.Close();
}
//----------------------------------------------------------initialMachineSetup--------------------------------------------------------------
//----------------------------------------------------------LogThisMachine-------------------------------------------------------------------
function LogThisMachine() {
	var pullData 				: String = "";
	
    yield getDataWWW("m/login?M=" + MachinePhone + "&P=" + MachinePassword);
    
    	MToken = www.text.Replace('"', "");
    
	    if(MToken != "-3") {
	        checkFMachine = true;
    		if (debug == true) Debug.Log("(1) Token zalogowanej maszyny: " + MToken);
	    } else {
	    	if (debug == true) Debug.Log("Machine login error, wrong password or/and phone number.");
	    }
    
    token = MToken;
    phoneNumberToSet = MachinePhone;
    
     	yield DisplayMSaldo();
	    
	    if (MSaldo == "" || MSaldo == null){
	    	MSaldo = "0";
	    }   
	    
		saldo = MSaldo;
		
			if (debug == true) Debug.Log("LogThisMachine saldo to game: " + saldo);
		
		buttonManager.setInitCredit(System.Int32.Parse(saldo));
    
    setMachineNumber();
}
//----------------------------------------------------------LogThisMachine-------------------------------------------------------------------
//----------------------------------------------------------MachinesLogin--------------------------------------------------------------------
function MachinesLogin() {
    var readerMF 				: XmlReader = XmlReader.Create(xmlPath);
    
    if(readerMF != null) {
        while(readerMF.Read()) {
            if(readerMF.Name == "phone") {
               	MachinePhone = readerMF.ReadString();
              	if (debug == true) Debug.Log(readerMF.Name + " = " + readerMF.ReadString());
            }

            if(readerMF.Name == "password") {
                MachinePassword = readerMF.ReadString();
                if (debug == true) Debug.Log(readerMF.Name + " = " + readerMF.ReadString());
            }

            if(readerMF.Name == "driverKey") {
                driverKeyS = readerMF.ReadString();
                UDPClientC.driverKey = driverKeyS;
                if (debug == true) Debug.Log(readerMF.Name + " = " + readerMF.ReadString());
            }			
        } 
    }
    
    LogThisMachine();
}
//----------------------------------------------------------MachinesLogin--------------------------------------------------------------------
//----------------------------------------------------------GameConfiguration----------------------------------------------------------------
function GameConfiguration() {
	var pullData 				: String = "";
	
	if (debug == true) Debug.Log("GameConfiguration");
	
    yield getDataWWW("g/config?UT="+ UToken + "&MT=" + MToken);    
    
    	pullData = www.text;
    
    	if (debug == true) Debug.Log("g/config?UT="+ UToken + "&MT=" + MToken);
    		
    	if (pullData != "-1" && pullData != "-2") {
	    	GameConfig = pullData;

		    if(GameConfig != null) {
		    	if (debug == true) Debug.Log(GameConfig);
		    
		        var reader			:XmlTextReader = new XmlTextReader(new StringReader(GameConfig));
		        
		        while(reader.Read()) {
		            dataG = new String[4];
		            if(reader.IsStartElement("config")) {
		                dataG[1] = reader.ReadString();
		                	if (debug == true) Debug.Log(reader.Name + " = " + reader.GetAttribute("id"));
		                configIDV = reader.ReadString();
		            }

		            if(reader.Name == "jackphone") {
		                jackphoneV = reader.ReadString();
		                	if (debug == true) Debug.Log(reader.Name + " = " + jackphoneV);
		            }

		            if(reader.Name == "jackphoneAdd") {
		                jackphoneAddV = reader.ReadString();
		                	if (debug == true) Debug.Log(reader.Name + " = " + jackphoneAddV);
		            }

		            if(reader.Name == "nextWin") {
		                nextWinV = reader.ReadString();
		                	if (debug == true) Debug.Log(reader.Name + " = " + nextWinV);
		            }

		            if(reader.Name == "bonusWin") {
		                bonusWinV = reader.ReadString();
		                	if (debug == true) Debug.Log(reader.Name + " = " + bonusWinV);
		            }

		            if(reader.Name == "jackphoneToWin") {
		                jackphoneToWinV = reader.ReadString();
		                	if (debug == true) Debug.Log(reader.Name + " = " + jackphoneToWinV);
		            } 
		        } 
		    }
		} else {
			if (debug == true) Debug.Log("GameConfiguration download error, bad Token.");
		}

    yield getDataWWW("m/config?MT="+ MToken + "&V=" + gameVersion + "&ID=" + gameID); //machine chceck in
    
    	pullData = www.text;
    
    	if (pullData != "-2") {
	    	MachineStatus = pullData;

		    if(MachineStatus != null) {
		        var readerM			: XmlTextReader = new XmlTextReader(new StringReader(MachineStatus));
		        
		        while(readerM.Read()) {
		            dataM = new String[2];
		            if(readerM.IsStartElement("machineConfig")) {
		                dataM[1] = readerM.ReadString();
		                	if (debug == true) Debug.Log(readerM.Name + " = " + readerM.GetAttribute("id"));
		                configMV = readerM.ReadString();
		            }

		            if(readerM.Name == "autoupdate") {
		                autoupdateMV = readerM.ReadString();
		                	if (debug == true) Debug.Log(readerM.Name + " = " + autoupdateMV);
		            }

		            if(readerM.Name == "gameURL") {
		                gameURLMV = readerM.ReadString();
		                	if (debug == true) Debug.Log(readerM.Name + " = " + gameURLMV);
		            }

		            if(readerM.Name == "gameHash") {
		                gameHashMV = readerM.ReadString();
		                	if (debug == true) Debug.Log(readerM.Name + " = " + gameHashMV);
		            }

		            if(readerM.Name == "playable") {
		                playableMV = readerM.ReadString();
		                	if (debug == true) Debug.Log(readerM.Name + " = " + playableMV);
		            }

		            if(readerM.Name == "phonePrefix") {
		                phonePrefixMV = readerM.ReadString();
		                	if (debug == true) Debug.Log(readerM.Name + " = " + phonePrefixMV);
		            }
		        } 
		    }
		} else {
			if (debug == true) Debug.Log("Machine checkin error, bad Token.");
		}
}
//----------------------------------------------------------GameConfiguration----------------------------------------------------------------
//----------------------------------------------------------ifUserExist----------------------------------------------------------------------
function ifUserExist() {
    checkEmail = VerifyEmailAddress();
    checkPhone = VerifyPhoneNumber();

    if(checkEmail == true) {
        	if (debug == true) Debug.Log("Email address entered. Checking if email address exist..."); 
        
        yield getDataWWW("check?email=" + fLogin);

        if(www.text == "0") {
            if (debug == true) Debug.Log("Email exist...");
            if (debug == true) Debug.Log("Enter your password");
        } else {
            if (debug == true) Debug.Log("Email does not exist...");
            if (debug == true) Debug.Log("Please enter your phone number");
        }
    } else if(checkPhone == true) {
        	if (debug == true) Debug.Log("Phone number entered. Checking if phone exist..."); 
        
        yield getDataWWW("check?tel=" + fLogin);

        if(www.text == "0") {
            if (debug == true) Debug.Log("Phone exist...");
            if (debug == true) Debug.Log("Enter your password");
        } else {
            if (debug == true) Debug.Log("Phone does not exist...");
            if (debug == true) Debug.Log("Creating an account...");
        }
    } else {
        if (debug == true) Debug.Log("Wrong login. Please enter proper value.");
    }
}
//----------------------------------------------------------ifUserExist----------------------------------------------------------------------
//----------------------------------------------------------setUser--------------------------------------------------------------------------
function setUser(login:String, pswd:String){
		if (debug == true) Debug.Log("setUser: " + login + " - " + pswd);
	
	fLogin = login;
	fPassword = pswd;
}
//----------------------------------------------------------setUser--------------------------------------------------------------------------
//----------------------------------------------------------LoginUser------------------------------------------------------------------------
function LoginUser() {
	var pullData 				: String = "";
	
    if(fLogin == "" || fPassword == "") {
        if (debug == true) Debug.Log("Fill all fields");
    }
    
    if(checkEmail == true) {
        yield getDataWWW("login?U=" + fLogin + "&P=" + fPassword + "&MT=" + MToken);
    } else if (checkPhone == true) {
        yield getDataWWW("login?U=48" + fLogin + "&P=" + fPassword + "&MT=" + MToken);
    }
    
    	pullData = www.text; 

    if(pullData != "-2" && pullData != "-3") {
        HashValue = pullData;
        UToken = HashValue.Replace('"', "");
        	
        	if (debug == true) Debug.Log("User Token: " + UToken);
       
        GameConfiguration();
        token = UToken;
	    phoneNumberToSet = fLogin;
	    setMachineNumber();
	    
	    DisplayUSaldo();
	    
		    if (USaldo == "" || USaldo == null){
		    	USaldo = "0";
		    }   
	    
		saldo = USaldo;
		buttonManager.setInitCredit(System.Int32.Parse(saldo));
    } else if(pullData == "-2") {
        if (debug == true) Debug.Log("Wrong MToken.");
    } else if(pullData == "-3") {
        if (debug == true) Debug.Log("Wrong user passwrd.");
    } else {
        if (debug == true) Debug.Log("Other error.");
    }
}
//----------------------------------------------------------LoginUser------------------------------------------------------------------------
//----------------------------------------------------------LogOut---------------------------------------------------------------------------
function LogOut() {
	var pullData 				: String = "";
	
	if (UToken != ""){
    	yield getDataWWW("u/logout?UT=" + UToken);
    	
    	pullData = www.text; 
    
	    if(pullData == "0") {     
		    UToken = "";
		    USaldo = "";
		    GameConfig = "";
		    fLogin = "";
		    fPassword = "";
		    UBilans = 0;
		    
		    	if (debug == true) Debug.Log("Wylogowano");
		    
		    MachinesLogin();
	    } else {
	    	if (debug == true) Debug.Log("Logout error.");
	    }
    }
}
//----------------------------------------------------------LogOut---------------------------------------------------------------------------
//----------------------------------------------------------LogOut---------------------------------------------------------------------------
function MachineLogOut() {
	if (MToken != ""){
    	yield getDataWWW("m/logout?MT=" + MToken);
    } 
    
    if(www.text != '0') {     
	    MToken = "";
	    MSaldo = "";
	    GameConfig = "";
	    fLogin = "";
	    fPassword = "";
	    MBilans = 0;
	    
	    	if (debug == true) Debug.Log("Wylogowano");
	    
    } else {
    	if (debug == true) Debug.Log("Logout error.");
    }
}
//----------------------------------------------------------LogOut---------------------------------------------------------------------------
//----------------------------------------------------------DisplayUSaldo--------------------------------------------------------------------
function DisplayUSaldo() {
    yield getDataWWW("u/bilans/get?UT=" + UToken);
    
    if (www.text != "-1"){
    	USaldo = www.text;
    		
    		if (debug == true) Debug.Log("Saldo = " + USaldo);
    		
    	saldo = USaldo;
		buttonManager.setInitCredit(System.Int32.Parse(saldo));
    } else {
    	if (debug == true) Debug.Log("Wrong UToken.");
    }
}
//----------------------------------------------------------DisplayUSaldo--------------------------------------------------------------------
//----------------------------------------------------------DisplayMSaldo--------------------------------------------------------------------
function DisplayMSaldo() {
    yield getDataWWW("m/bilans/get?MT=" + MToken);
    
    if (www.text != "-1"){
    	MSaldo = www.text;
    		
    		if (debug == true) Debug.Log("Saldo = " + MSaldo);
    		
    	saldo = MSaldo;
		buttonManager.setInitCredit(System.Int32.Parse(saldo));
    } else {
    	if (debug == true) Debug.Log("Wrong MToken in DisplayMSaldo.");
    }
}
//----------------------------------------------------------DisplayMSaldo--------------------------------------------------------------------
//----------------------------------------------------------MachineCashRegisterStatus--------------------------------------------------------
function MachineCashRegisterStatus(msg:int) {
	var pullData 				: String = "";
	
	yield getDataWWW("m/credit?MT" + MToken + "&R=" + msg);
		
		pullData = www.text;
		
	if (pullData == "0"){
		if (debug == true) Debug.Log("MachineCashRegisterStatus update success.");
	} else if (pullData == "-2"){
		if (debug == true) Debug.Log("MachineCashRegisterStatus update error, bad Token.");
	} else {
		if (debug == true) Debug.Log("MachineCashRegisterStatus update other error.");
	}
}
//----------------------------------------------------------MachineCashRegisterStatus--------------------------------------------------------
//----------------------------------------------------------AddCoins-------------------------------------------------------------------------
function AddCoins(msg:int) {
	var pullData 				: String = "";
	
	if (msg > 0){
		if (UToken != ""){
	    	yield getDataWWW("u/bilans?UT=" + UToken + "&amount=" + msg + "&type=add");
	    } else {
			yield getDataWWW("m/bilans?MT=" + MToken + "&amount=" + msg + "&type=add");
		}
		
		pullData = www.text;
		
		if (pullData != "0"){
			if (pullData == "-1"){
				if (debug == true) Debug.Log("Wrong UToken.");
			} else if (pullData == "-2") {
				if (debug == true) Debug.Log("Wrong MToken.");
			}
		} else if (pullData == "-4"){
			if (UToken != ""){
				if (debug == true) Debug.Log("User saldo error.");
			} else {
				if (debug == true) Debug.Log("Machine saldo error.");
			}
		} else if (pullData == "0"){
			if (debug == true) Debug.Log("Saldo update success.");
		}
	} else {
		if (debug == true) Debug.Log("AddCoins, msg = 0");
	}
}
//----------------------------------------------------------AddCoins-------------------------------------------------------------------------
//----------------------------------------------------------SubCoins-------------------------------------------------------------------------
function SubCoins(msg:int) {
	if (msg > 0){
		if (UToken != ""){
		    yield getDataWWW("u/bilans?UT=" + UToken + "&amount=" + msg + "&type=sub");
		} else {
			yield getDataWWW("m/bilans?MT=" + MToken + "&amount=" + msg + "&type=sub");
		}
		
		if (www.text == "1"){
			if (UToken != ""){
				if (debug == true) Debug.Log("Wrong UToken.");
			} else {
				if (debug == true) Debug.Log("Wrong MToken.");
			}
		} else if (www.text == "2"){
			if (UToken != ""){
				if (debug == true) Debug.Log("User saldo error.");
			} else {
				if (debug == true) Debug.Log("Machine saldo error.");
			}
		} else if (www.text == "0"){
			if (debug == true) Debug.Log("Saldo update success.");
		}
	} else {
		if (debug == true) Debug.Log("SubCoins, msg = 0");
	}
}
//----------------------------------------------------------SubCoins-------------------------------------------------------------------------
//----------------------------------------------------------WinGame--------------------------------------------------------------------------
function WinGame() {
    yield getDataWWW("u/bilans?UT=" + UToken + "&amount=" + UBilans + "&type=add");
    	
    	if (debug == true) Debug.Log("Wygrales!!!");
}
//----------------------------------------------------------WinGame--------------------------------------------------------------------------
//----------------------------------------------------------setMachineNumber-----------------------------------------------------------------
function setMachineNumber(){
 	if(MachineNumberControl == null){
		if(GameObject.FindWithTag("MachineNumberControl")){  
		    MachineNumberControl = GameObject.FindWithTag("MachineNumberControl").GetComponent.<MachineNumberControl>();    
		   	MachineNumberControl.machineNumberReciver(phoneNumberToSet);
		}
    } else {
    	MachineNumberControl.machineNumberReciver(phoneNumberToSet);
    }
}
//----------------------------------------------------------setMachineNumber-----------------------------------------------------------------
//----------------------------------------------------------playButtonReleased---------------------------------------------------------------
function playButtonReleased(msg:int){
	yield GameConfiguration();
	yield DisplayMSaldo();
	
	if (MSaldo == "" || MSaldo == null) {
		yield DisplayUSaldo(); 
		
		saldo = USaldo;
	} else {
		saldo = MSaldo;
	}
}
//----------------------------------------------------------playButtonReleased---------------------------------------------------------------
//----------------------------------------------------------VerifyPhoneNumber----------------------------------------------------------------
function VerifyPhoneNumber(){
    var plusCharacter			: String[];
    var numberCharacter			: String[];
    var tmpString				: String = "";
    var count 					: int = 0;
   		plusCharacter = fLogin.Split("+"[0]);
   
    if(plusCharacter.Length == 2){
        	if (debug == true) Debug.Log(plusCharacter[0] + " + " + plusCharacter[1]);
        	
        tmpString = plusCharacter[1];

        if(tmpString.Length == 11){
            	if (debug == true) Debug.Log("Correct phone number");
            
            return true;
        } else {
            return false;
        }
    } else {
        if(fLogin.Length == 9){
            	if (debug == true) Debug.Log("Correct phone number");
            	
            return true;
        } else {
            return false;
        }
    }
}
//----------------------------------------------------------VerifyPhoneNumber----------------------------------------------------------------
//----------------------------------------------------------VerifyEmailAddress---------------------------------------------------------------
function VerifyEmailAddress(){
    var atCharacter				: String[];
    var dotCharacter			: String[];
    var chars					: String[];
   		atCharacter = fLogin.Split("@"[0]);
        
    if(atCharacter.Length == 2){
        dotCharacter = atCharacter[1].Split("."[0]);
            
        if(dotCharacter.Length >= 2){
            if(dotCharacter[dotCharacter.Length - 1].Length == 0){
                return false;
            } else {
               	 	if (debug == true) Debug.Log("Correct email address");
               	 	
                return true;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}
//----------------------------------------------------------VerifyEmailAddress---------------------------------------------------------------
//----------------------------------------------------------getDataWWW-----------------------------------------------------------------------
function getDataWWW(param : String){
	if (buttonManager) buttonManager.playBlockade = true;

	    www = new WWW(urlAPI + param);
	    
			if (debug == true) Debug.Log("Zapytanie: " + urlAPI + param);
			
			
			 
	    yield www;
	    
		while (!www.isDone) {}
	
	if (buttonManager) buttonManager.playBlockade = false;
}
//----------------------------------------------------------getDataWWW-----------------------------------------------------------------------
//----------------------------------------------------------pingSystem-----------------------------------------------------------------------
function pingSystem(){
	var getPing 				: String = "";
	
	 	if (debug == true) Debug.Log("starting ping");	 
	 
	yield getDataWWW("m/ping?phone=" + MachinePhone);
		
		getPing = www.text;
	
		if (getPing == "0" || getPing == "-3"){
			gPing = gPing + 1;
			bPing = 0;
			
			if (gPing < 4){
				pingTime = 5;
			} else if (gPing >10){
				pingTime = 15;
			} 
			
			if (gPing > 4){
				MachineScript.networkProblem(false);
			}
			if (debug == true) Debug.Log("Internet connection active.");
		} else {
			gPing = 0;
			bPing = bPing + 1;
			
			if (bPing < 4){
				pingTime = 5;
				MachineScript.networkProblem(true);
			} else if (bPing >10){
				pingTime = 15;
			} 
			
			if (bPing > 4){
				MachineScript.networkProblem(true);
			}
			if (debug == true) Debug.Log("Internet connection problem.");
		}
	
	yield WaitForSeconds (pingTime);
	
	loopPing();
}

function loopPing(){
	pingSystem();
}
//----------------------------------------------------------pingSystem-----------------------------------------------------------------------
//----------------------------------------------------------dbgFunctions---------------------------------------------------------------------
function CheckMachines() {
    if(checkFMachine == true) {
        if (debug == true) Debug.Log("(1) Włączona");
    }
    if(checkSMachine == true) {
        if (debug == true) Debug.Log("(2) Włączona");
    }
    if(checkTMachine == true) {
        if (debug == true) Debug.Log("(3) Włączona");
    }
}

function Add20() {
    UBilans = UBilans + 20;
    	if (debug == true) Debug.Log("Bilans +20");
}

function Add40() {
    UBilans = UBilans + 40;
    	if (debug == true) Debug.Log("Bilans +40");
}

function Add100() {
    UBilans = UBilans + 100;
    	if (debug == true) Debug.Log("Bilans +100");
}

function Sub100() {
    UBilans = UBilans - 100;
    	if (debug == true) Debug.Log("Bilans -100");
}

function Sub40() {
    UBilans = UBilans - 40;
    	if (debug == true) Debug.Log("Bilans -40");
}

function Sub20() {
    UBilans = UBilans - 20;
    	if (debug == true) Debug.Log("Bilans -20");
}
//----------------------------------------------------------dbgFunctions---------------------------------------------------------------------
