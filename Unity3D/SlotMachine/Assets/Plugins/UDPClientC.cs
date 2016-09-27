using UnityEngine;
using System;
using System.Text;
using System.Net;
using System.Net.Sockets;
using System.Threading;
using UnityEngine.UI;
using System.IO;
using System.Security.Cryptography;


public class UDPClientC : MonoBehaviour {

	public bool 				debug = false;

	public bool 				encryptionON = true;
	public bool 				rawBtnData = false;
	public int 					portListen = 8888;
	public int 					portSend = 4444;
	public GameObject[] 		notifyObjects;
	public string[] 			CurrencyVar;
	public Color[] 				LEDColors;
	public RaycastHit 			hit; 
	public Vector3 				CameraVector = new Vector3(0,0,0); 

	public string 				pathPrefix;
	public string 				driverKey;
	public string 				messageToNotify;
	public string 				ipSend = "255.255.255.255";
	
	
	
	private string 				received = "";
	private string 				receivedDataText = "";
	private UdpClient 			client;
	private Thread 				receiveThread;
	private IPEndPoint 			remoteEndPoint;
	private IPAddress 			ipAddressSend;
	private string 				objectTag;
	private int 				gameTypeTmp = -1; 
	private Ray 				ray;
	private GUIText 			buttonContainer;
	private Camera 				cam; 
	private string 				startChar = "[";
	private string 				endChar = "]";
	private string 				commaChar = ",";
	private string 				TypeOfTouch;
	private string 				menuName = "";
	private string 				stringContainer = "";
	//public int gameType = 0; /*for menu gameType = 0, logowanie gameType = 1, game gameType = 2, loading gameType = 4,*/
	
	
	/*************************************Buttons config**************************************************/
	/*Graj      -> P
    Opcje       -> O
    Stawka +    -> +
    Stawka -    -> -
    Linie +     -> /
    Linie -     -> *
    Lobby       -> L
    Menu        -> M
    Autostart ` -> A
    Dziwiek +   -> Q
    Dzwiek -    -> W
    Pausa -     -> B
    +50z -     -> Z*/
	/*for menu gameType = 0, logowanie gameType = 1, game gameType = 2, loading gameType = 3,*/
	
	public string[] 		BTNno00; //left,    left,       bet-,   null,   loading, 	1		15
	public string[] 		BTNno01; //up,      up,         line+,  null,   loading,	2		110	
	public string[] 		BTNno02; //down,    down,       line-,  null,   loading,	3		25
	public string[] 		BTNno03; //right,   right,      bet+,   null,   loading,	4		210
	public string[] 		BTNno04; //ok,      ok,         game,   null,   loading,	null	35
	public string[] 		BTNno05; //null,    correct,    lobby,  null,   loading,	null	310
	public string[]			BTNno06; //null,    enter,      login,  null,   loading,	null	null
	public string[] 		BTNno07; //null,    back,       menu,   null,   loading,	null	null
	public string[] 		BTNno08; //null,    null,       null,   null,   loading,	null	null
	public string[] 		BTNno09; //null,    null,       null,   null,   loading,	null	null
	public string[] 		BTNno10; //null,    null,       null,   null,   loading,	null	null
	public string[] 		BTNno11; //null,    null,       null,   null,   loading,	null	null
	
	
	//----------------------------------------------------------Awake----------------------------------------------------------------------------
	public void Awake() {
		DontDestroyOnLoad(transform.gameObject);
		
			if (notifyObjects.Length > 0 && notifyObjects[0] != null) {
				objectTag = notifyObjects[0].tag;

					cam = notifyObjects[0].GetComponent<Camera>();
					buttonContainer = notifyObjects[0].GetComponent<GUIText>();
			}
		
		IPAddress ip;

			if (IPAddress.TryParse(ipSend, out ip)) {
				remoteEndPoint = new IPEndPoint(ip, portSend);
			} else {
				remoteEndPoint = new IPEndPoint(IPAddress.Broadcast, portSend);
			}
		
		client = new UdpClient(portListen);
		
		receiveThread = new Thread(new ThreadStart(ReceiveData));
		receiveThread.IsBackground = true;
		receiveThread.Start();
	}
	//----------------------------------------------------------Awake----------------------------------------------------------------------------
	//----------------------------------------------------------Start----------------------------------------------------------------------------
	public void Start() {
		initBMPButtons(5);

		Debug.Log ("EiN9U4sbCrGSIUvT+Dyf8Q== " + encryptDecrypt.DecryptString ("EiN9U4sbCrGSIUvT+Dyf8Q=="));
	}
	//----------------------------------------------------------Start----------------------------------------------------------------------------
	//----------------------------------------------------------Update---------------------------------------------------------------------------
	void Update() {
		if (notifyObjects.Length > 0 && notifyObjects[0] == null) {
				if (debug == true) Debug.Log("No object to notify.");

			if (GameObject.FindWithTag(objectTag)) {
				notifyObjects[0] = GameObject.FindWithTag(objectTag);
			}
		}
		
		if (cam == null) {
			cam = notifyObjects[0].GetComponent<Camera>();
		}
		
		if (buttonContainer == null) {
			buttonContainer = notifyObjects[0].GetComponent<GUIText>();
		}


		if(CameraVector != new Vector3(0,0,0)){
			ray = cam.ScreenPointToRay(CameraVector);

			if (Physics.Raycast(ray, out hit, 100)){
					if (debug == true) Debug.Log("Hit something!");
				
				buttonContainer.text = "" + hit.transform.gameObject;
			}

				if (debug == true) Debug.Log(ray);
			CameraVector= new Vector3(0,0,0);
		}
		
		if (receivedDataText != "") {
			if (receivedDataText != "0" && receivedDataText != "1") {
					if (debug == true) Debug.Log("UDPClient: message received \'" + receivedDataText + "\'");

				foreach (GameObject g in notifyObjects) {
					g.SendMessage(messageToNotify, receivedDataText, SendMessageOptions.DontRequireReceiver);
				}
			}
			receivedDataText = "";
		}
		
		
		if (received != "") {
				if (debug == true) Debug.Log("UDPClient: message received \'" + received + "\'");
			
			getData(received);
			received = "";
		}
	}
	//----------------------------------------------------------Update---------------------------------------------------------------------------
	//----------------------------------------------------------initBMPButtons-------------------------------------------------------------------
	public void initBMPButtons(int msg) {
		int 				gameType = msg;  /*for menu gameType = 0, logowanie gameType = 1, game gameType = 2, loading gameType = 4, lobby gameType = 5*/

		if (gameTypeTmp != gameType) {
			gameTypeTmp = gameType;
			
				if (debug == true) Debug.Log ("initBMPButtons(" + msg + ")");
			
			int 			btnNumer = 0;
			
			btnNumer = 0; //***************************** BTNno00*******************************************
			if (BTNno00.Length > 0 && BTNno00.Length >= gameType) {
				if (BTNno00 [gameType] != null && BTNno00 [gameType] != "null") {
					btnOn (btnNumer);
					btnOledBMPSend (btnNumer, BTNno00 [gameType]);
				} else {
					btnOff (btnNumer);
				}
			} else {
				btnOff (btnNumer);
			}
			
			btnNumer = 1; //***************************** BTNno01*******************************************
			if (BTNno01.Length > 0 && BTNno01.Length >= gameType) {
				if (BTNno01 [gameType] != null && BTNno01 [gameType] != "null") {
					btnOn (btnNumer);
					btnOledBMPSend (btnNumer, BTNno01 [gameType]);
				} else {
					btnOff (btnNumer);
				}
			} else {
				btnOff (btnNumer);
			}
			
			btnNumer = 2; //***************************** BTNno02*******************************************
			if (BTNno02.Length > 0 && BTNno02.Length >= gameType) {
				if (BTNno02 [gameType] != null && BTNno02 [gameType] != "null") {
					btnOn (btnNumer);
					btnOledBMPSend (btnNumer, BTNno02 [gameType]);
				} else {
					btnOff (btnNumer);
				}
			} else {
				btnOff (btnNumer);
			}
			
			btnNumer = 3; //***************************** BTNno03*******************************************
			if (BTNno03.Length > 0 && BTNno03.Length >= gameType) {
				if (BTNno03 [gameType] != null && BTNno03 [gameType] != "null") {
					btnOn (btnNumer);
					btnOledBMPSend (btnNumer, BTNno03 [gameType]);
				} else {
					btnOff (btnNumer);
				}
			} else {
				btnOff (btnNumer);
			}
			
			btnNumer = 4; //***************************** BTNno04*******************************************
			if (BTNno04.Length > 0 && BTNno04.Length >= gameType) {
				if (BTNno04 [gameType] != null && BTNno04 [gameType] != "null") {
					btnOn (btnNumer);
					btnOledBMPSend (btnNumer, BTNno04 [gameType]);
				} else {
					btnOff (btnNumer);
				}
			} else {
				btnOff (btnNumer);
			}
			
			btnNumer = 5; //***************************** BTNno05*******************************************
			if (BTNno05.Length > 0 && BTNno05.Length >= gameType) {
				if (BTNno05 [gameType] != null && BTNno05 [gameType] != "null") {
					btnOn (btnNumer);
					btnOledBMPSend (btnNumer, BTNno05 [gameType]);
				} else {
					btnOff (btnNumer);
				}
			} else {
				btnOff (btnNumer);
			}
			
			btnNumer = 6; //***************************** BTNno06*******************************************
			if (BTNno06.Length > 0 && BTNno06.Length >= gameType) {
				if (BTNno06 [gameType] != null && BTNno06 [gameType] != "null") {
					btnOn (btnNumer);
					btnOledBMPSend (btnNumer, BTNno06 [gameType]);
				} else {
					btnOff (btnNumer);
				}
			} else {
				btnOff (btnNumer);
			}
			
			btnNumer = 7; //***************************** BTNno07*******************************************
			if (BTNno07.Length > 0 && BTNno07.Length >= gameType) {
				if (BTNno07 [gameType] != null && BTNno07 [gameType] != "null") {
					btnOn (btnNumer);
					btnOledBMPSend (btnNumer, BTNno07 [gameType]);
				} else {
					btnOff (btnNumer);
				}
			} else {
				btnOff (btnNumer);
			}
			
			btnNumer = 8; //***************************** BTNno08*******************************************
			if (BTNno08.Length > 0 && BTNno08.Length >= gameType) {
				if (BTNno08 [gameType] != null && BTNno08 [gameType] != "null") {
					btnOn (btnNumer);
					btnOledBMPSend (btnNumer, BTNno08 [gameType]);
				} else {
					btnOff (btnNumer);
				}
			} else {
				btnOff (btnNumer);
			}
			
			btnNumer = 9; //***************************** BTNno09*******************************************
			if (BTNno09.Length > 0 && BTNno09.Length >= gameType) {
				if (BTNno09 [gameType] != null && BTNno09 [gameType] != "null") {
					btnOn (btnNumer);
					btnOledBMPSend (btnNumer, BTNno09 [gameType]);
				} else {
					btnOff (btnNumer);
				}
			} else {
				btnOff (btnNumer);
			}
			
			btnNumer = 10; //***************************** BTNno10*******************************************
			if (BTNno10.Length > 0 && BTNno10.Length >= gameType) {
				if (BTNno10 [gameType] != null && BTNno10 [gameType] != "null") {
					btnOn (btnNumer);
					btnOledBMPSend (btnNumer, BTNno10 [gameType]);
				} else {
					btnOff (btnNumer);
				}
			} else {
				btnOff (btnNumer);
			}
			
			btnNumer = 11; //***************************** BTNno11*******************************************
			if (BTNno11.Length > 0 && BTNno11.Length >= gameType) {
				if (BTNno11 [gameType] != null && BTNno10 [gameType] != "null") {
					btnOn (btnNumer);
					btnOledBMPSend (btnNumer, BTNno11 [gameType]);
				} else {
					btnOff (btnNumer);
				}
			} else {
				btnOff (btnNumer);
			}
		}
	}
	//----------------------------------------------------------initBMPButtons-------------------------------------------------------------------
	//----------------------------------------------------------changePath-----------------------------------------------------------------------
	public void changePath(String msg){
		pathPrefix = msg;
	}
	//----------------------------------------------------------changePath-----------------------------------------------------------------------
	//----------------------------------------------------------sendString-----------------------------------------------------------------------
	void sendString(){
		if (stringContainer != "") {
			buttonContainer.text = stringContainer;
				
				if (debug == true) Debug.Log ("Sending udp string.");

			stringContainer = "";
		}
	}
	//----------------------------------------------------------sendString-----------------------------------------------------------------------
	//----------------------------------------------------------SendValue------------------------------------------------------------------------
	public void SendValue(string valueToSend) {
		string 				encryptedData = encryptDecrypt.EncryptString (valueToSend);

		if (encryptionON == true) {
			valueToSend = encryptedData;
		}
			 
		try {
			if (valueToSend != "") {
				byte[] 		data = Encoding.UTF8.GetBytes(valueToSend);

				client.Send(data, data.Length, remoteEndPoint);

					if (debug == true) Debug.Log ("UDPClient: send \'" + valueToSend + "\'");

				valueToSend = "";
			}
		} catch (Exception err) {
			if (debug == true) Debug.LogError("Error udp send : " + err.Message);
		}
	}
	//----------------------------------------------------------SendValue------------------------------------------------------------------------
	//----------------------------------------------------------ReceiveData----------------------------------------------------------------------
	public void ReceiveData() {
		while (true) {
			try {
				IPEndPoint 	anyIP = new IPEndPoint(IPAddress.Any, 0);
				byte[] 		data = client.Receive(ref anyIP);
				string 		text = "";

					text = Encoding.UTF8.GetString(data);

					if (encryptionON == true){
						text = encryptDecrypt.DecryptString (text);
					}

				received = text;
				getData(received);
			} catch (Exception err) {
				if (debug == true) Debug.Log("Error:" + err.ToString());
			}
		}
	}
	//----------------------------------------------------------ReceiveData----------------------------------------------------------------------
	//----------------------------------------------------------btnOledBMPSend-------------------------------------------------------------------
	public void btnOledBMPSend(int BTN, string BMP) {
		string 				command = "OLED" + startChar + BTN + endChar + startChar + pathPrefix  + BMP + endChar + startChar + driverKey + endChar; //do sciezki w katalogu
		
			SendValue(command);
	}
	//----------------------------------------------------------btnOledBMPSend-------------------------------------------------------------------
	//----------------------------------------------------------btnOledFill----------------------------------------------------------------------
	public void btnOledFill(int BTN, string color) {
		string 				command = "OLEDFILL" + startChar + BTN + endChar + startChar + color + endChar + startChar + driverKey + endChar;
		
			SendValue(command);
	}
	//----------------------------------------------------------btnOledFill----------------------------------------------------------------------
	//----------------------------------------------------------btnOledInvert--------------------------------------------------------------------
	public void btnOledInvert(int BTN) {
		string 				command = "INVERT" + startChar + BTN + endChar + startChar + driverKey + endChar;
		
			SendValue(command);
	}
	//----------------------------------------------------------btnOledInvert--------------------------------------------------------------------
	//----------------------------------------------------------btnOledNormal--------------------------------------------------------------------
	public void btnOledNormal(int BTN) {
		string 				command = "NORMAL" + startChar + BTN + endChar + startChar + driverKey + endChar;
		
			SendValue(command);
	}
	//----------------------------------------------------------btnOledNormal--------------------------------------------------------------------
	//----------------------------------------------------------btnOff---------------------------------------------------------------------------
	public void btnOff(int BTN) {
		string 				command = "OFF" + startChar + BTN + endChar + startChar + driverKey + endChar;
		
			SendValue(command);
	}
	//----------------------------------------------------------btnOff---------------------------------------------------------------------------
	//----------------------------------------------------------btnOn----------------------------------------------------------------------------
	public void btnOn(int BTN) {
		string 				command = "ON" + startChar + BTN + endChar + startChar + driverKey + endChar;
		
			SendValue(command);
	}
	//----------------------------------------------------------btnOn----------------------------------------------------------------------------
	//----------------------------------------------------------driverReset----------------------------------------------------------------------
	public void driverReset() {
		string 				command = "RESET" + startChar + driverKey + endChar;
		
			SendValue(command);
	}
	//----------------------------------------------------------driverReset----------------------------------------------------------------------
	//----------------------------------------------------------cashOUT--------------------------------------------------------------------------
	public void cashOUT(int amount) {
		string 				command = "CASHOUT" + startChar + amount + endChar + startChar + driverKey + endChar;
		
			SendValue(command);
	}
	//----------------------------------------------------------cashOUT--------------------------------------------------------------------------
	//----------------------------------------------------------cashSTAT-------------------------------------------------------------------------
	public void cashSTAT() {
		string 				command = "CASHSTAT" + startChar + driverKey + endChar;
		
			SendValue(command);
	}
	//----------------------------------------------------------cashSTAT-------------------------------------------------------------------------
	//----------------------------------------------------------cashINON-------------------------------------------------------------------------
	public void cashINON() {
		string 				command = "CASHINON" + startChar + driverKey + endChar;
		
			SendValue(command);
	}
	//----------------------------------------------------------cashINON-------------------------------------------------------------------------
	//----------------------------------------------------------cashINOFF------------------------------------------------------------------------
	public void cashINOFF() {
		string 				command = "CASHINOFF" + startChar + driverKey + endChar;
		
			SendValue(command);
	}
	//----------------------------------------------------------cashINOFF------------------------------------------------------------------------
	//----------------------------------------------------------RGB------------------------------------------------------------------------------
	public void RGB(int color) {
		string 				command = "RGB" + commaChar + Mathf.FloorToInt(LEDColors[color].r*255) + commaChar + Mathf.FloorToInt(LEDColors[color].g*255) + commaChar + Mathf.FloorToInt(LEDColors[color].b*255) + startChar + driverKey + endChar;
		
			SendValue(command);
	}
	//----------------------------------------------------------RGB------------------------------------------------------------------------------
	//----------------------------------------------------------RGBreset-------------------------------------------------------------------------
	public void RGBreset() {
		string 				command = "RGB" + startChar + "0" + endChar + startChar + "0" + endChar + startChar + "0" + endChar + startChar + driverKey + endChar;
		
			SendValue(command);
	}
	//----------------------------------------------------------RGBreset-------------------------------------------------------------------------
	//----------------------------------------------------------RGBrand--------------------------------------------------------------------------
	public void RGBrand() {
		string 				command = "RGBRAND" + startChar + driverKey + endChar;
		
			SendValue(command);
	}
	//----------------------------------------------------------RGBrand--------------------------------------------------------------------------
	//----------------------------------------------------------btnToFunction--------------------------------------------------------------------
	public string btnToFunction (string msg, string fn){
		string 				toReturn = "";
		
		switch (msg) {
			case "0":
				toReturn = BTNno00[gameTypeTmp];
				break;
			case "1":
				toReturn = BTNno01[gameTypeTmp];
				break;
			case "2":
				toReturn = BTNno02[gameTypeTmp];
				break;
			case "3":
				toReturn = BTNno03[gameTypeTmp];
				break;
			case "4":
				toReturn = BTNno04[gameTypeTmp];
				break;
			case "5":
				toReturn = BTNno05[gameTypeTmp];
				break;
			case "6":
				toReturn = BTNno06[gameTypeTmp];
				break;
			case "7":
				toReturn = BTNno07[gameTypeTmp];
				break;
			case "8":
				toReturn = BTNno08[gameTypeTmp];
				break;
			case "9":
				toReturn = BTNno09[gameTypeTmp];
				break;
			case "10":
				toReturn = BTNno10[gameTypeTmp];
				break;
			case "11":
				toReturn = BTNno11[gameTypeTmp];
				break;
			default:
					if (debug == true) Debug.Log("Bad input.");
				break;
		}
		
		return toReturn;
	}
	//----------------------------------------------------------btnToFunction--------------------------------------------------------------------
	//----------------------------------------------------------getData--------------------------------------------------------------------------
	public void getData(string command) {
		int 				x = 0;
		int 				cashValue = 0;
		int 				RCode = 0;
		int 				oledID = 0;
		int 				btnNumber = 0;
		int 				screenWidth = Screen.width;////////////////////PP
		int 				screenHeight = Screen.height;/////////////////PP
		String[] 			firstSplit;
		String[] 			secoundSplit;
		bool 				rotate = false; ///////////////////////////PP true/false
		float 				xPos; /////////////////PP 0-1 --Pawe
		float 				yPos; /////////////////PP 0-1 --Pawe
		float 				rayX; ////////////////////////////////////PP
		float 				rayY; ////////////////////////////////////PP
		
			if (debug == true) Debug.Log ("getData: " + command);
		
		if (command.Contains (driverKey)) {
			if (command.Contains ("CASHIN")) {
				if (command.Contains (",")) {
					firstSplit = command.Split ("," [0]);
					cashValue = int.Parse (firstSplit [1]);

					for (x = 0; x < CurrencyVar.Length; x++) {
						if (command.Contains (CurrencyVar [x])) {
								if (debug == true) Debug.Log ("Currency: " + CurrencyVar [x]);

							stringContainer = "CASHIN," + CurrencyVar [x];
						} else {
							stringContainer = "CASHIN," + firstSplit [1];
						}
					}
				} else if (command.Contains ("[")) {
					firstSplit = command.Split ("[" [0]);
					secoundSplit = firstSplit [1].Split ("]" [0]);
					cashValue = int.Parse (secoundSplit [0]);
					stringContainer = "CASHIN," + secoundSplit [0];
				}

				sendString ();
			} else if (command.Contains ("CASHSTAT")) {
				firstSplit = command.Split ("," [0]);
				cashValue = int.Parse (firstSplit [1]);
				stringContainer = "CASHSTAT," + firstSplit [1];

				sendString ();
			} else if (command.Contains ("CASHOUT")) {
				firstSplit = command.Split ("," [0]);
				cashValue = int.Parse (firstSplit [2]);
				RCode = int.Parse (firstSplit [1]);
				stringContainer = "CASHOUT," + firstSplit[1] + "," + firstSplit[2];

				sendString ();
			} else if (command.Contains ("CASHINON")) {
				firstSplit = command.Split ("," [0]);
				RCode = int.Parse (firstSplit [1]);
				stringContainer = "CASHINON," + firstSplit[1];

				sendString ();
			} else if (command.Contains ("CASHINOFF")) {
				firstSplit = command.Split ("," [0]);
				RCode = int.Parse (firstSplit [1]);
				stringContainer = "CASHINOFF," + firstSplit[1];

				sendString ();
			} else if (command.Contains ("OLED")) {
				firstSplit = command.Split ("," [0]);
				oledID = int.Parse (firstSplit [1]);
				RCode = int.Parse (firstSplit [2]);
				stringContainer = "OLED," + firstSplit[1] + "," + firstSplit[2];

				sendString ();
			} else if (command.Contains ("BUTTON")) {
				firstSplit = command.Split ("," [0]);
				btnNumber = int.Parse (firstSplit [1]);

				if (command.Contains ("TGL")) {
					btnOledInvert (btnNumber);
					btnOledNormal (btnNumber);
					receivedDataText = btnToFunction (firstSplit [1], "TGL");

						if (debug == true) Debug.Log (receivedDataText);

						if (rawBtnData == true) {
							stringContainer = "BTN," + btnNumber + ",TGL";///PP
						} else {
							stringContainer = "BTN," + receivedDataText;
						}
				} else if (command.Contains ("HOLD")) {
					btnOledInvert (btnNumber);
					receivedDataText = btnToFunction (firstSplit [1], "HOLD");

						if (debug == true) Debug.Log (receivedDataText);

						if (rawBtnData == true) {
							stringContainer = "BTN," + btnNumber + ",HOLD";///PP
						} else {
							stringContainer = "BTN," + receivedDataText;
						}
				}
				
				sendString ();
			} else if (command.Contains ("SERVICE_KEY")) {
				firstSplit = command.Split ("," [0]);
				btnNumber = int.Parse (firstSplit [1]);

				if (command.Contains ("ON")) {
					receivedDataText = btnToFunction (firstSplit [1], "ON");

						if (debug == true) Debug.Log (receivedDataText);

						if (rawBtnData == true) {
							stringContainer = "SK," + btnNumber + ",ON";///PP
						} else {
							stringContainer = "SK," + receivedDataText + ",ON";
						}
				} else if (command.Contains ("OFF")) {
					btnOledInvert (btnNumber);
					receivedDataText = btnToFunction (firstSplit [1], "OFF");

						if (debug == true) Debug.Log (receivedDataText);

						if (rawBtnData == true) {
							stringContainer = "SK," + btnNumber + ",OFF";///PP
						} else {
							stringContainer = "SK," + receivedDataText + ",OFF";
						}
				}
				
				sendString ();
			} else if (command.Contains ("T1")) { /////////////////////////////////////////PawelP START
				firstSplit = command.Split ("," [0]);
				xPos = float.Parse (firstSplit [1]);
				yPos = float.Parse (firstSplit [2]);

					if (!rotate) {
						rayX = screenWidth * xPos;
						rayY = screenHeight * yPos;
					} else {
						rayY = screenWidth * xPos;
						rayX = screenHeight * yPos;
					}
				
					if (debug == true) Debug.Log ("T1," + xPos + "," + yPos);

				CameraVector = new Vector3 (rayX, rayY, 0);
				TypeOfTouch = "T1";
				//cam = notifyObjects[0].GetComponent<Camera>();
			} else if (command.Contains ("T0")) { //Pawele
				firstSplit = command.Split ("," [0]);
				xPos = float.Parse (firstSplit [1]);
				yPos = float.Parse (firstSplit [2]);

					if (!rotate) {
						rayX = screenWidth * xPos;
						rayY = screenHeight * yPos;
					} else {
						rayY = screenWidth * xPos;
						rayX = screenHeight * yPos;
					}
				//uzupeniakcje dla T1
				//cam = notifyObjects[0].GetComponent<Camera>();
				
					if (debug == true) Debug.Log ("T0," + xPos + "," + yPos);
				
				CameraVector = new Vector3 (rayX, rayY, 0);
				TypeOfTouch = "T0";
			} else if (command.Contains ("T2")) { //Pawele
				firstSplit = command.Split ("," [0]);
				xPos = float.Parse (firstSplit [1]);
				yPos = float.Parse (firstSplit [2]);

					if (!rotate) {
						rayX = screenWidth * xPos;
						rayY = screenHeight * yPos;
					} else {
						rayY = screenWidth * xPos;
						rayX = screenHeight * yPos;
					}
				//uzupni akcje dla T1
				//cam = notifyObjects[0].GetComponent<Camera>();
				
					if (debug == true) Debug.Log ("T2," + xPos + "," + yPos);
				
				CameraVector = new Vector3 (rayX, rayY, 0);
				TypeOfTouch = "T2";
			} else if (command.Contains ("READY")) { 
				if (debug == true) Debug.Log ("Driver READY");
			}
		}
	}
	//----------------------------------------------------------getData--------------------------------------------------------------------------
	//----------------------------------------------------------OnDisable------------------------------------------------------------------------
	public void OnDisable() {
		if (receiveThread != null) {
			receiveThread.Abort();
			receiveThread = null;
		}

		client.Close();

			if (debug == true) Debug.Log("UDPClient: exit");
	}
	//----------------------------------------------------------OnDisable------------------------------------------------------------------------
	//----------------------------------------------------------updateDrvKey---------------------------------------------------------------------
	public void updateDrvKey(string key) {
		driverKey = key;
		
		if (debug == true) Debug.Log("driverKey = " + driverKey);
	}
	//----------------------------------------------------------updateDrvKey---------------------------------------------------------------------
}