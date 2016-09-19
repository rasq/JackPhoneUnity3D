#pragma strict

// determines whether or not the enable/display the virtual input system
//@HideInInspector
var enableVirtualInputSystem : boolean;

// reference to the keyboard
//@HideInInspector
var virtualKeyboard : GameObject;

// reference to controls
//@HideInInspector
var virtualKeyboardControls : keyboard_scr;

// reference to the virtual screen
//@HideInInspector
var virtualScreen : GameObject;

// reference to the virtual screen controls
//@HideInInspector
var virtualScreenControls : virtual_screen_scr;

// control for bringing up the input system (the VIS control key)
//@HideInInspector
var inputSystemControl : KeyCode;

// (if set in the inspector) VIS will automatically be displayed on startup, as opposed to being hidden until the VIS control key is pressed.
var onStartDisplayVIS : boolean; // REMEMBER: Set this in the inspector if you would like the VIS automatically displayed upon start.

function Start(){
	// initializing...
	enableVirtualInputSystem = false;
	virtualKeyboard = GameObject.Find("keyboard");
	virtualKeyboardControls = virtualKeyboard.GetComponent(keyboard_scr);
	virtualScreen = GameObject.Find("virtual_screen");
	virtualScreenControls = virtualScreen.GetComponent(virtual_screen_scr);
	inputSystemControl = KeyCode.V;
}


function Update(){
	// if it's time to bring up the virtual input system...
	if(!enableVirtualInputSystem && !virtualScreenControls.isDisplaying && (onStartDisplayVIS || Input.GetKey(inputSystemControl))){

		// reset instruction text (for cases when the player cancels a dialog, and then re-enters the virtual input system.)
		virtualScreenControls.virtualScreenInstructionText.GetComponent.<GUIText>().text = virtualScreenControls.initialMsg;

		// inform virtual screen controls
		virtualScreenControls.isDisplaying = true;
		
		// reset command
		onStartDisplayVIS = false;

		// display the virtual input system
		enableVirtualInputSystem = true;
	
	}

	// enabling the virtual input system
	if(enableVirtualInputSystem){

		// enabling the virtual screen and text
		//virtualScreenControls.virtualScreenGraphic.GetComponent.<SpriteRenderer>().enabled = true;
		virtualScreenControls.virtualScreenInstructionText.GetComponent.<GUIText>().enabled = true;
		virtualScreenControls.virtualScreenInputText.GetComponent.<GUIText>().enabled = true;
		virtualScreenControls.virtualScreenInputText.GetComponent.<GUIText>().text = "";
		
		// making sure the number of input lines is reset (for cases of player returning to virtual keyboard)
		virtualScreenControls.numOfInputLines = 1;

		// making sure the uppercase key is reset (for cases of player returning to virtual keyboard)
		GameObject.Find("uppercase_default_key").GetComponent(uppercase_default_key_scr).uppercaseEnabled = false;

		// enabling keyboard components
		virtualKeyboardControls.keyboardGraphic.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.cancelDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.oneDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.twoDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.threeDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.fourDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.fiveDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.sixDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.sevenDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.eightDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.nineDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.zeroDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.underscoreDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.tabDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.qDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.wDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.eDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.rDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.tDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.yDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.uDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.iDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.oDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.pDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.backspaceDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.uppercaseDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.aDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.sDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.dDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.fDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.gDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.hDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.jDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.kDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.lDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.enterDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.deleteDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.zDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.xDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.cDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.vDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.bDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.nDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.mDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.exclamationDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.periodDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.forwardSlashDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.hyphenDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;
		virtualKeyboardControls.spacebarDefaultKey.GetComponent.<SpriteRenderer>().enabled = true;

		// resetting the enable virtual keyboard tracking var
		enableVirtualInputSystem = false;
	
	}

}