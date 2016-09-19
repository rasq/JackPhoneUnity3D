#pragma strict

import UnityEngine.UI;

public var debug 				: boolean = false;

public var enableKYBControl 	: boolean = false;
public var pathPrefix 			: String;

public var jackpot 				: NumbersScript;
public var stawka 				: NumbersScript;
public var wygrana 				: NumbersScript;
public var kredyt 				: NumbersScript;

public var jackpotI 			: int;
public var stawkaI 				: int;
public var wygranaI 			: int;
public var kredytI 				: int;
public var jackpotF 			: int;
public var stawkaF 				: int;
public var wygranaF 			: int;
public var kredytF 				: int;

public var tmpKey 				: String = "";

public var buttonContainer 		: GUIText;

public var iconsPerReelS 		: Slider;
public var iconsPerReelDiffS 	: Slider;
public var spinSpeedS 			: Slider;
public var reboundAmountS 		: Slider;
public var reboundSpeedS 		: Slider;
public var scatterSizeS 		: Slider;
public var maxBetS 				: Slider;
public var chanceDividerS 		: Slider;
public var winRateS 			: Slider;


@HideInInspector
public var iconsPerReel 		: int = 0;
@HideInInspector
public var iconsPerReelDiff 	: int = 0;
@HideInInspector
public var spinSpeed 			: int = 0;
@HideInInspector
public var reboundAmount 		: int = 0;
@HideInInspector
public var reboundSpeed 		: int = 0;
@HideInInspector
public var scatterSize 			: int = 0;
@HideInInspector
public var maxBet 				: int = 0;
@HideInInspector
public var chanceDivider 		: float = 0.0;
@HideInInspector
public var winRate 				: float = 0.0;
@HideInInspector
public var iconsPerReelTmp 		: int = 0;
@HideInInspector
public var iconsPerReelDiffTmp 	: int = 0;
@HideInInspector
public var spinSpeedTmp 		: int = 0;
@HideInInspector
public var reboundAmountTmp		: int = 0;
@HideInInspector
public var reboundSpeedTmp 		: int = 0;
@HideInInspector
public var scatterSizeTmp 		: int = 0;
@HideInInspector
public var maxBetTmp 			: int = 0;
@HideInInspector
public var chanceDividerTmp 	: float = 0.0;
@HideInInspector
public var winRateTmp 			: float = 0.0;

public var playBlockade			: boolean = false;

private var userData 			: UserData;
private var buttonsInit 		: boolean = false;
private var bonusGame 			: boolean = false;
private var VegasSlotsJackPhone : VegasSlotsJackPhone;
private var VegasSlots 			: VegasSlots;
private var UDPClientC 			: UDPClientC;
private var wwwCommunication 	: wwwCommunication;
private var MachineScript 		: MachineScript;
private var tmpString 			: String = "";
private var buttonsBlockade 	: boolean = false;
private var isPause 			: boolean = false;
public var Opcje 				: GameObject;

//----------------------------------------------------------Awake----------------------------------------------------------------------------
function Awake(){
    if(GameObject.FindWithTag("Player")){   
        userData = GameObject.FindWithTag("Player").GetComponent.<UserData>();
        wwwCommunication = GameObject.FindWithTag("Player").GetComponent.<wwwCommunication>();   
    }

    if(GameObject.FindWithTag("UDPClient")){  
        UDPClientC = GameObject.FindWithTag("UDPClient").GetComponent.<UDPClientC>(); 
    }

    if(GameObject.FindWithTag("MachineScreens")){ 
        MachineScript = GameObject.FindWithTag("MachineScreens").GetComponent.<MachineScript>(); 
    }

    if(GameObject.FindWithTag("JPCamera")){ 
        VegasSlotsJackPhone = GameObject.FindWithTag("JPCamera").GetComponent.<VegasSlotsJackPhone>(); 
    }

    if(GameObject.FindWithTag("VegasSlots")){ 
        VegasSlots = GameObject.FindWithTag("VegasSlots").GetComponent.<VegasSlots>(); 
    }

    if(GameObject.FindWithTag("Opcje")){ 
        Opcje = GameObject.FindWithTag("Opcje"); 
    }
    
    	buttonContainer = gameObject.GetComponent("GUIText");
    
    
    iconsPerReelFN();
    iconsPerReelDiffFN();
    spinSpeedFN();
    reboundAmountFN();
    reboundSpeedFN();
    scatterSizeFN();
    maxBetFN();
    chanceDividerFN();
}
//----------------------------------------------------------Awake----------------------------------------------------------------------------
//----------------------------------------------------------Start----------------------------------------------------------------------------
function Start () {
    Opcje.SetActive (false);
    setDefault();
    resetTextNumbers();
    
    UDPClientC.changePath(pathPrefix);
    wwwCommunication.MachinesLogin();
}
//----------------------------------------------------------Start----------------------------------------------------------------------------
//----------------------------------------------------------Update---------------------------------------------------------------------------
function Update () {
    if(Input.GetMouseButtonDown(0)){
        Click(Input.mousePosition, null);
    }

    if(UDPClientC != null && UDPClientC != "null" && buttonsInit == false){
        UDPClientC.initBMPButtons(2);
        buttonsInit = true;
        
        	if (debug == true) Debug.Log("buttonsInit");
    }
   
    if(buttonContainer.text != ""){
    	tmpString = buttonContainer.text;
    	buttonContainer.text = "";
    	
    			if (debug == true) Debug.Log("buttonContainer.text: " + tmpString);
    			
    	parseInput(tmpString);
		buttonContainer.text = "";
    }
}
//----------------------------------------------------------Update---------------------------------------------------------------------------
//----------------------------------------------------------OnGUI----------------------------------------------------------------------------
function OnGUI() { 
    tmpKey = Event.current.keyCode.ToString();
    
    if(tmpKey != null && tmpKey != "None"){
    	if (tmpKey == "F1"){
    		instantMinWin(true);
    	} else if (tmpKey == "F2"){
    		instantMedWin(true);
    	} else if (tmpKey == "F3"){
    		instantMaxWin(true);
    	} else if (tmpKey == "F4"){
    		instantJackPhoneWin(true);
    	}
   	}
    
    if (enableKYBControl == true){
	    if(tmpKey != null && tmpKey != "None"){
	    
	        	if (debug == true) Debug.Log(Event.current.keyCode);
	        
	        if(buttonsBlockade == false){
	            checkKey(tmpKey);
	        }
	        buttonsBlockade = true;
	    } else {
	        buttonsBlockade = false;
	    }
    }
}
//----------------------------------------------------------OnGUI----------------------------------------------------------------------------
//----------------------------------------------------------Click----------------------------------------------------------------------------
function Click(position : Vector3, objectG : Transform){
    var ray						: Ray = GetComponent.<Camera>().ScreenPointToRay(position);
    var hit 					: RaycastHit;
	
    if (objectG == null){
        if(Physics.Raycast(ray, hit, 100)){
            playFunction(hit.collider.gameObject.name);
        }
    }
}
//----------------------------------------------------------Click----------------------------------------------------------------------------
//----------------------------------------------------------parseInput-----------------------------------------------------------------------
function parseInput(msg:String){
		if (debug == true) Debug.Log("parseInput recived: " + msg);
	
	
	var strArr					:String[];
	var separator 				: char[] = [","[0]];
	 	strArr = msg.Split(separator);
	 	
	if (strArr[0] == "BTN") {	
		switch (strArr[1]) {
			case "betM":
				playFunction("stawkaD");
				break;
			case "betP":
				playFunction("stawkaU");
				break;
			case "lineM":
	            playFunction("linieD");
				break;
			case "lineP":
	            playFunction("linieU");
				break;
			case "null":
				break;
			case "loading":
				break;
			case "arrow_L":
				break;
			case "arrow_U":
				break;
			case "arrow_D":
				break;
			case "arrow_R":
				break;
			case "game":
	            playFunction("graj");
				break;
			case "correct":
				break;
			case "enter":
				break;
			case "ok":
				break;
			case "login":
				playFunction("login");
				break;
			case "back":
				break;
			case "menu":
	            playFunction("menu");
				break;	
			case "lobby":
	            playFunction("lobby");
				break;
			default:
				Debug.Log("Bad input.");
				break;
		}
	} else if (strArr[0] == "SK"){
		if (strArr[2] == "ON"){
	            playFunction("serviceMenu");
		} else {
		
		}
	} else if (strArr[0] == "CASHIN"){
		addFakeCredits(System.Int32.Parse(strArr[1]));
	} else if (strArr[0] == "CASHOUT"){
		subFakeCredits(System.Int32.Parse(strArr[1]));
	} else if (strArr[0] == "CASHSTAT") {
		wwwCommunication.MachineCashRegisterStatus(System.Int32.Parse(strArr[1]));
	}
}
//----------------------------------------------------------parseInput-----------------------------------------------------------------------
//----------------------------------------------------------serviceMenu----------------------------------------------------------------------
function serviceMenu(){
	Application.LoadLevelAsync("21_9_MachineConfig");
}
//----------------------------------------------------------serviceMenu----------------------------------------------------------------------
//----------------------------------------------------------resetTextNumbers-----------------------------------------------------------------
function resetTextNumbers(){
    setNumbers(0, "0", "jackpot");
    setNumbers(0, "1", "bet");
    setNumbers(0, "0", "win");
    setNumbers(0, userData.getValue("Coins").ToString(), "coins");
}
//----------------------------------------------------------resetTextNumbers-----------------------------------------------------------------
//----------------------------------------------------------checkKey-------------------------------------------------------------------------
function checkKey(key){
    /*
        Graj        -> P 
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
        +50zł -     -> Z
    */
	
    switch (key){
        case "B":
            playFunction("pausa");
            break;
        case "P":
            playFunction("graj");
            break;
        case "O":
            playFunction("opcje");
            break;
        case "KeypadPlus":
            playFunction("stawkaU");
            break;
        case "KeypadMinus":
            playFunction("stawkaD");
            break;
        case "KeypadDivide":
            playFunction("linieU");
            break;
        case "KeypadMultiply":
            playFunction("linieD");
            break;
        case "L":
            playFunction("lobby");
            break;
        case "M":
            playFunction("menu");
            break;
        case "A":
            playFunction("autostart");
            break;
        case "Q":
            playFunction("glosnoscU");
            break;
        case "W":
            playFunction("glosnoscD");
            break;
        case "Z":
            playFunction("fakeMoney");
            break;
        default:
            break;
    }
}
//----------------------------------------------------------checkKey-------------------------------------------------------------------------
//----------------------------------------------------------playFunction---------------------------------------------------------------------
function playFunction(button : String){
    if (button != "1" && button != "0" && button != "loading" && button != "null"){
    
        	if (debug == true) Debug.Log("Przycisk: " + button);
		
		if (bonusGame == false){
	        switch (button) {
	            case "pausa":
	                pausaFN();
	                break;
	            case "opcje":
	                opcjeFN();
	                break;
	            case "linieU":
	                VegasSlots.IncreaseLines();
	                break;
	            case "linieD":
	                VegasSlots.DecreaseLines();
	                break;
	            case "stawkaU":
	                VegasSlots.IncreaseBet();
	                break;
	            case "stawkaD":
	                VegasSlots.DecreaseBet();
	                break;
	            case "menu":
	                menuFN();
	                break;
	            case "graj":
	                grajFN();
	                break;
	            case "play":
	                grajFN();
	                break;
	            case "lobby":
	                lobbyFN();
	                break;
	            case "glosnoscU":
	                glosnoscFN(10);
	                break;
	            case "glosnoscD":
	                glosnoscFN(-10);
	                break;
	            case "wyplata":
	                break;
	            case "login":
	            	loginUser();
	                break;
	            case "info":
	                break;
	            case "ryzyko":
	                break;
	            case "autostart":
	                break;
	            case "fakeMoney":
	                addFakeCredits(10);
	                break;
	            case "serviceMenu":
	                serviceMenu();
	                break;
	            case "clear":
	                break;
	            case "pswdFN":
	            	pswdFN();
	                break;
	            case "logintoFN":
	            	logintoFN();
	                break;
	            case "cancelLogin":
	            	logintoFNClose();
	                break;
	            default:
	                if (debug == true) Debug.Log ("Bad collider.");
	                break;
	        }
        } else {
        
        }
    } else {
        if (debug == true) Debug.Log("Not buttons calls.");
    }
}
//----------------------------------------------------------playFunction---------------------------------------------------------------------
//----------------------------------------------------------loginUser------------------------------------------------------------------------
function loginUser(){
		if (debug == true) Debug.Log("loginUser");
		
	MachineScript.loginFN();
}
//----------------------------------------------------------loginUser------------------------------------------------------------------------
//----------------------------------------------------------pswdFN---------------------------------------------------------------------------
function pswdFN(){
		if (debug == true) Debug.Log("pswdFN");
		
	MachineScript.pswdFN();
}
//----------------------------------------------------------pswdFN---------------------------------------------------------------------------
//----------------------------------------------------------logintoFN------------------------------------------------------------------------
function logintoFN(){
		if (debug == true) Debug.Log("logintoFN");
		
	MachineScript.logintoFN();
}
//----------------------------------------------------------logintoFN------------------------------------------------------------------------
//----------------------------------------------------------logintoFNClose-------------------------------------------------------------------
function logintoFNClose(){
		if (debug == true) Debug.Log("logintoFNClose");
		
	MachineScript.logintoFNClose();
}
//----------------------------------------------------------logintoFNClose-------------------------------------------------------------------
//----------------------------------------------------------addFakeCredits-------------------------------------------------------------------
function addFakeCredits(credits : int){
	if (credits > 0){
	    userData.AddCoins(credits, true, 0);
	    setNumbers(0, userData.getValue("Coins").ToString(), "coins");
	    wwwCommunication.AddCoins(credits);
    } else {
    	if (debug == true) Debug.Log("addFakeCredits, credits = 0");
    }
}
//----------------------------------------------------------addFakeCredits-------------------------------------------------------------------
//----------------------------------------------------------subFakeCredits-------------------------------------------------------------------
function subFakeCredits(credits : int){
	if (credits > 0){
	    userData.SubCoins(credits, true, 0);
	    setNumbers(0, userData.getValue("Coins").ToString(), "coins");
	    wwwCommunication.SubCoins(credits);
    } else {
    	if (debug == true) Debug.Log("subFakeCredits, credits = 0");
    }
}
//----------------------------------------------------------subFakeCredits-------------------------------------------------------------------
//----------------------------------------------------------setInitCredit--------------------------------------------------------------------
function setInitCredit(credits : int){
	userData.InitCoins(credits);
    setNumbers(0, userData.getValue("Coins").ToString(), "coins");
}
//----------------------------------------------------------setInitCredit--------------------------------------------------------------------
//----------------------------------------------------------setNumbers-----------------------------------------------------------------------
function setNumbers(x : int, y : String, name : String){
        switch (name) {
            case "jackpot":
                jackpot.setNumber(x, y);
                break;
            case "bet":
                stawka.setNumber(x, y);
                break;
            case "win":
                wygrana.setNumber(x, y);
                break;
            case "coins":
                kredyt.setNumber(x, y);
                break;
            default:
                if (debug == true) Debug.Log ("Bad data.");
                break;
        }
}
//----------------------------------------------------------setNumbers-----------------------------------------------------------------------
//----------------------------------------------------------grajFN---------------------------------------------------------------------------
function grajFN(){
	if (playBlockade == false){
	    	if (debug == true) Debug.Log ("startReel()");
	    	if (debug == true) Debug.Log ("VegasSlots.currentBet " + VegasSlots.currentBet + " userData.coins " + userData.coins);
	    	
	    if(VegasSlots.spinning == false && VegasSlots.currentBet <= userData.coins && userData.coins > 0){
	    	wwwCommunication.playButtonReleased(VegasSlots.currentBet);
	        VegasSlots.Spin(VegasSlots.currentBet);
	        VegasSlots.spinning = true;
	        VegasSlotsJackPhone.startReel();
	    }
    }
}
//----------------------------------------------------------grajFN---------------------------------------------------------------------------
//----------------------------------------------------------isBonusGame----------------------------------------------------------------------
function isBonusGame(msg : boolean){
    bonusGame = msg;
    
    if (bonusGame == false){
   		UDPClientC.initBMPButtons(2);
   	} else {
   		UDPClientC.initBMPButtons(6);
   	}
}
//----------------------------------------------------------isBonusGame----------------------------------------------------------------------
//----------------------------------------------------------glosnoscFN-----------------------------------------------------------------------
function glosnoscFN(setVolume:int){ //it doesent work :/ why?????
    var actualVolume 			: float = AudioListener.volume;

    AudioListener.volume += (1/setVolume);

    	if (debug == true) Debug.Log("Volume: " + AudioListener.volume);
}
//----------------------------------------------------------glosnoscFN-----------------------------------------------------------------------
//----------------------------------------------------------menuFN---------------------------------------------------------------------------
function menuFN(){

}
//----------------------------------------------------------menuFN---------------------------------------------------------------------------
//----------------------------------------------------------lobbyFN--------------------------------------------------------------------------
function lobbyFN(){
    if(VegasSlots.spinning == false){
        Destroy(GameObject.FindWithTag("UDPClient"));
        Destroy(GameObject.FindWithTag("Player"));

        Application.LoadLevel(0);
    }
}
//----------------------------------------------------------lobbyFN--------------------------------------------------------------------------
//----------------------------------------------------------opcjeFN--------------------------------------------------------------------------
function opcjeFN(){
    Opcje.SetActive (true); 
}
//----------------------------------------------------------opcjeFN--------------------------------------------------------------------------
//----------------------------------------------------------closeOpcje-----------------------------------------------------------------------
function closeOpcje(){
    Opcje.SetActive (false);
}
//----------------------------------------------------------closeOpcje-----------------------------------------------------------------------
//----------------------------------------------------------pausaFN--------------------------------------------------------------------------
function pausaFN(){
    if (isPause == false){
        OnApplicationPause(true);
        Time.timeScale = 0 ;
    } else {
        OnApplicationPause(false);
        Time.timeScale = 1.0 ;
    }
}
//----------------------------------------------------------pausaFN--------------------------------------------------------------------------
//----------------------------------------------------------OnApplicationPause---------------------------------------------------------------
function OnApplicationPause(pauseStatus: boolean) {
    isPause = pauseStatus;
}
//----------------------------------------------------------OnApplicationPause---------------------------------------------------------------
//----------------------------------------------------------saveSettings---------------------------------------------------------------------
function saveSettings(){
    VegasSlots.iconsPerReel = iconsPerReel;
    VegasSlots.iconsPerReelDifference = iconsPerReelDiff;
    VegasSlots.spinSpeed = spinSpeed;
    VegasSlots.reboundAmount = reboundAmount;
    VegasSlots.reboundSpeed = reboundSpeed;
    VegasSlots.scatterSize = scatterSize;
    VegasSlots.maxBet = maxBet;
    VegasSlots.chanceDivider = chanceDivider;
    VegasSlots.winRate = winRate;
}
//----------------------------------------------------------saveSettings---------------------------------------------------------------------
//----------------------------------------------------------restoreDefault-------------------------------------------------------------------
function restoreDefault(){
    VegasSlots.iconsPerReel = iconsPerReelTmp;
    iconsPerReelS.value = iconsPerReelTmp;

    VegasSlots.iconsPerReelDifference = iconsPerReelDiffTmp;
    iconsPerReelDiffS.value = iconsPerReelDiffTmp;

    VegasSlots.spinSpeed = spinSpeedTmp;
    spinSpeedS.value = spinSpeedTmp;

    VegasSlots.reboundAmount = reboundAmountTmp;
    reboundAmountS.value = reboundAmountTmp;

    VegasSlots.reboundSpeed = reboundSpeedTmp;
    reboundSpeedS.value = reboundSpeedTmp;

    VegasSlots.scatterSize = scatterSizeTmp;
    scatterSizeS.value = scatterSizeTmp;

    VegasSlots.maxBet = maxBetTmp;
    maxBetS.value = maxBetTmp;

    VegasSlots.chanceDivider = chanceDividerTmp;
    chanceDividerS.value = chanceDividerTmp;

    VegasSlots.winRate = winRateTmp;
    winRateS.value = winRateTmp;
}
//----------------------------------------------------------restoreDefault-------------------------------------------------------------------
//----------------------------------------------------------setDefault-----------------------------------------------------------------------
function setDefault(){
    iconsPerReelTmp = VegasSlots.iconsPerReel;
    iconsPerReelDiffTmp = VegasSlots.iconsPerReelDifference;
    spinSpeedTmp = VegasSlots.spinSpeed;
    reboundAmountTmp = VegasSlots.reboundAmount;
    reboundSpeedTmp = VegasSlots.reboundSpeed;
    scatterSizeTmp = VegasSlots.scatterSize;
    maxBetTmp = VegasSlots.maxBet;
    chanceDividerTmp = VegasSlots.chanceDivider;
    winRateTmp = VegasSlots.winRate;
}
//----------------------------------------------------------setDefault-----------------------------------------------------------------------
//----------------------------------------------------------iconsPerReelFN-------------------------------------------------------------------
function iconsPerReelFN(){ //Function to override original game setting - iconsPerReel
    iconsPerReel = iconsPerReelS.value;
}
//----------------------------------------------------------iconsPerReelFN-------------------------------------------------------------------
//----------------------------------------------------------iconsPerReelDiffFN---------------------------------------------------------------
function iconsPerReelDiffFN(){ //Function to override original game setting - iconsPerReelDiff
    iconsPerReelDiff = iconsPerReelDiffS.value;
}
//----------------------------------------------------------iconsPerReelDiffFN---------------------------------------------------------------
//----------------------------------------------------------spinSpeedFN----------------------------------------------------------------------
function spinSpeedFN(){ //Function to override original game setting - spinSpeed
    spinSpeed = spinSpeedS.value;
}
//----------------------------------------------------------spinSpeedFN----------------------------------------------------------------------
//----------------------------------------------------------reboundAmountFN------------------------------------------------------------------
function reboundAmountFN(){ //Function to override original game setting - reboundAmount
    reboundAmount = reboundAmountS.value;
}
//----------------------------------------------------------reboundAmountFN------------------------------------------------------------------
//----------------------------------------------------------reboundSpeedFN-------------------------------------------------------------------
function reboundSpeedFN(){ //Function to override original game setting - reboundSpeed
    reboundSpeed = reboundSpeedS.value;
}
//----------------------------------------------------------reboundSpeedFN-------------------------------------------------------------------
//----------------------------------------------------------scatterSizeFN--------------------------------------------------------------------
function scatterSizeFN(){ //Function to override original game setting - scatterSize
    scatterSize = scatterSizeS.value;
}
//----------------------------------------------------------scatterSizeFN--------------------------------------------------------------------
//----------------------------------------------------------maxBetFN-------------------------------------------------------------------------
function maxBetFN(){ //Function to override original game setting - maxBet
    maxBet = maxBetS.value;
}
//----------------------------------------------------------maxBetFN-------------------------------------------------------------------------
//----------------------------------------------------------chanceDividerFN------------------------------------------------------------------
function chanceDividerFN(){
    chanceDivider = chanceDividerS.value;
    
    	if (debug == true) Debug.Log("maxBetFN: " + maxBet);
}
//----------------------------------------------------------chanceDividerFN------------------------------------------------------------------
//----------------------------------------------------------winRateFN------------------------------------------------------------------------
function winRateFN(){
    winRate = winRateS.value;
    
    	if (debug == true) Debug.Log("winRateFN: " + winRate);
}
//----------------------------------------------------------winRateFN------------------------------------------------------------------------
//----------------------------------------------------------instantJackPhoneWin--------------------------------------------------------------
function instantJackPhoneWin(isOn : boolean){ //it will set instant max win in next game
    if (isOn) {
    
    		if (debug == true) Debug.Log("instantJackPhoneWin");
    	
        VegasSlotsJackPhone.winNow = isOn;
    }
}
//----------------------------------------------------------instantJackPhoneWin--------------------------------------------------------------
//----------------------------------------------------------instantMaxWin--------------------------------------------------------------------
function instantMaxWin(isOn : boolean){ //it will set instant max win in next game
    if (isOn) {
    
    		if (debug == true) Debug.Log("instantMaxWin");
    		
        VegasSlots.winType = 3;
    }
}
//----------------------------------------------------------instantMaxWin--------------------------------------------------------------------
//----------------------------------------------------------instantMedWin--------------------------------------------------------------------
function instantMedWin(isOn : boolean){ //it will set instant medium win in next game
    if (isOn) {
    
    		if (debug == true)  Debug.Log("instantMedWin");
    		
        VegasSlots.winType = 2;
    }
}
//----------------------------------------------------------instantMedWin--------------------------------------------------------------------
//----------------------------------------------------------instantMinWin--------------------------------------------------------------------
function instantMinWin(isOn : boolean){ //it will set instant minimum win in next game
    if (isOn) {
    
    		if (debug == true) Debug.Log("instantMinWin");
    		
        VegasSlots.winType = 1;
    }
}
//----------------------------------------------------------instantMinWin--------------------------------------------------------------------
//----------------------------------------------------------randWin--------------------------------------------------------------------------
function randWin(isOn : boolean){ //it will set instant random win game in next game from min, med and max win
    if (isOn) {
    
    		if (debug == true) Debug.Log("randWin");
    		
        VegasSlots.winType = 0;
    }
}
//----------------------------------------------------------randWin--------------------------------------------------------------------------
//----------------------------------------------------------noRandWin------------------------------------------------------------------------
function noRandWin(isOn : boolean){ //it will set a standard random game
    if (isOn) {
    
    		if (debug == true) Debug.Log("noRandWin");
    		
        VegasSlots.winType = -1;
    }
}
//----------------------------------------------------------noRandWin------------------------------------------------------------------------
//----------------------------------------------------------noWin----------------------------------------------------------------------------
function noWin(isOn : boolean){ //it will set instant non win game in next game
    if (isOn) {
    
    		if (debug == true) Debug.Log("noWin");
    		
        VegasSlots.winType = -2;
    }
}
//----------------------------------------------------------noWin----------------------------------------------------------------------------
//----------------------------------------------------------displayInfoUpadate---------------------------------------------------------------
function displayInfoUpadate(functionName : String, functionValue : String){
    	if (debug == true) Debug.Log("functionName: " + functionName + " functionValue: " + functionValue);
    	
    switch (functionName){
        case "LineCount":
            break;
        case "BetAmount":
            setNumbers(0, "0", "bet");
            setNumbers(0, functionValue, "bet");
            break;
        case "TotalWin":
            setNumbers(0, "0", "win");
            setNumbers(0, functionValue, "win");
            break;
        case "TotalBet":
            break;
        default:
            break;
    }
}
//----------------------------------------------------------displayInfoUpadate---------------------------------------------------------------
