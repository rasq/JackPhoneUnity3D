#pragma strict

public var debug 				: boolean = false;

public var thisMachineNumber 	: int[];
public var numbersGO 			: BoldNumber[];


//----------------------------------------------------------setMachineNumber-----------------------------------------------------------------
function setMachineNumber(){
    for(var x = 0; x < numbersGO.Length; x++){
        	if (debug == true) Debug.Log(thisMachineNumber[x]);
        	
        numbersGO[x].setNumber(thisMachineNumber[x]);
    }
}
//----------------------------------------------------------setMachineNumber-----------------------------------------------------------------
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
