#pragma strict

public var debug 				: boolean = false;

public var thisMachineNumber 	: int[];
public var numbersGO 			: GameObject[];
public var numbers 				: BoldNumberGlow[];
public var jackPhoneNumber 		: int[];

private var counter 				: int = 0;
private var WinScreen 			: WinScreen;
private var VegasSlotsJackPhone : VegasSlotsJackPhone;

//----------------------------------------------------------Awake----------------------------------------------------------------------------
function Awake(){
    if(VegasSlotsJackPhone == null && GameObject.FindWithTag("JPCamera")){ 
    	VegasSlotsJackPhone = GameObject.FindWithTag("JPCamera").GetComponent.<VegasSlotsJackPhone>();   
    }
    
    if(WinScreen == null && GameObject.FindWithTag("WinScreen")){ 
    	WinScreen = GameObject.FindWithTag("WinScreen").GetComponent.<WinScreen>();   
    }
}
//----------------------------------------------------------Awake----------------------------------------------------------------------------
//----------------------------------------------------------Start----------------------------------------------------------------------------
function Start () {
    setMachineNumber();
}
//----------------------------------------------------------Start----------------------------------------------------------------------------
//----------------------------------------------------------Update---------------------------------------------------------------------------
function Update () {
    if(VegasSlotsJackPhone == null && GameObject.FindWithTag("JPCamera")){ 
    	VegasSlotsJackPhone = GameObject.FindWithTag("JPCamera").GetComponent.<VegasSlotsJackPhone>();   
    }
    
    if(WinScreen == null && GameObject.FindWithTag("WinScreen")){ 
    	WinScreen = GameObject.FindWithTag("WinScreen").GetComponent.<WinScreen>();   
    }
}
//----------------------------------------------------------Update---------------------------------------------------------------------------
//----------------------------------------------------------setMachineNumber-----------------------------------------------------------------
function setMachineNumber(){
    for(var x = 0; x < numbers.Length; x++){
        	if (debug == true) Debug.Log(thisMachineNumber[x]);
        	
        numbers[x].setNumber(thisMachineNumber[x]);
        VegasSlotsJackPhone.numberToWin[x] = thisMachineNumber[x];
    }
}
//----------------------------------------------------------setMachineNumber-----------------------------------------------------------------
//----------------------------------------------------------setDataNumber--------------------------------------------------------------------
function setDataNumber(i : int, n : int){
    jackPhoneNumber[(numbers.Length-1) - i] = n;

    if (jackPhoneNumber[(numbers.Length-1) - i] == thisMachineNumber[(numbers.Length-1) - i]){
        numbers[(numbers.Length-1) - i].setBold(thisMachineNumber[(numbers.Length-1) - i]);
        counter++;
    } else {
        numbers[(numbers.Length-1) - i].setNumber(thisMachineNumber[(numbers.Length-1) - i]);
    }
    
    if (counter == 9){
    		if (debug == true) Debug.Log("Jackphone win. counter - " + counter);
    		
    	WinScreen.Jackphone ();
    }
    
    if (i == numbers.Length-1){
    	counter = 0;
    	
    		if (debug == true) Debug.Log("Reseting counter.");
    }
}
//----------------------------------------------------------setDataNumber--------------------------------------------------------------------
//----------------------------------------------------------machineNumberReciver-------------------------------------------------------------
public function machineNumberReciver(msg : String){
	var yChars : String[]  = new String[msg.Length];
	 	
	 	for (var i = 0; i < msg.Length; i++) {
            yChars[i] = msg[i].ToString();
	 		thisMachineNumber[i] = System.Int32.Parse(yChars[i]);
	 		
	 			if (debug == true) Debug.Log("Numer telefonu znak: " + i + " = " + yChars[i]);
	 			if (debug == true) Debug.Log("thisMachineNumber: " + i + " = " + thisMachineNumber[i]);
        }
	 	setMachineNumber();
}
//----------------------------------------------------------machineNumberReciver-------------------------------------------------------------
