#pragma strict

// determines whether or not to make sure other highlighted keys are disabled
var disableOtherHighlightKeys : boolean;

// reference to the keyboard controls
@HideInInspector
var keyboardControls : keyboard_scr;

function Start(){

	// setting default value
	disableOtherHighlightKeys = false;
	keyboardControls = GameObject.Find("keyboard").GetComponent(keyboard_scr);

}

function Update(){

	if(disableOtherHighlightKeys){
	
		// making sure other nearby highlighted keys are disabled (for cases when the player hovers quickly over multiple buttons)
		/*keyboardControls.cancelHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.oneHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.twoHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.threeHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.fourHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.fiveHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.sixHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.sevenHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.eightHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.nineHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.zeroHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.underscoreHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.tabHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.qHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.wHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		//keyboardControls.eHighlightedKey.guiTexture.enabled = false;
		keyboardControls.rHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.tHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.yHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.uHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.iHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.oHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.pHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.backspaceHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.uppercaseHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.aHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.sHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.dHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.fHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.gHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.hHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.jHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.kHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.lHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.enterHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.deleteHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.zHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.xHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.cHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.vHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.bHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.nHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.mHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.exclamationHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.periodHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.forwardSlashHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.hyphenHighlightedKey.GetComponent.<GUITexture>().enabled = false;
		keyboardControls.spacebarHighlightedKey.GetComponent.<GUITexture>().enabled = false;	*/
	
		// resetting tracking var
		disableOtherHighlightKeys = false;
	
	}

}

function OnMouseOver(){

	// display highlighted button
	//keyboardControls.eHighlightedKey.GetComponent.<GUITexture>().enabled = true;
	
	// making sure other highlighted keys are disabled
	disableOtherHighlightKeys = true;

}
