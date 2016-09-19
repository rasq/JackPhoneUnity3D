#pragma strict

// used to store the aspect ratio of textures
@HideInInspector
var textureRatio : float;

// the keyboard graphic's texture ratio (the virtual screen dimensions are calculated in relation to the keyboard ratio)
@HideInInspector
var keyboardRatio : float;

// the virtual screen
@HideInInspector
var virtualScreenGraphic : Transform;

// the font size of text in the virtual screen
@HideInInspector
var virtualScreenFontSize : int;

// added vertical and horizontal space used in positioning virtual screen objects
@HideInInspector
var buffer : int;
@HideInInspector
var offset : int;

// a reference to the virtual screen's height and width (assists in the positioning of the virtual screen's text)
@HideInInspector
var virtualScreenHeight : int;
@HideInInspector
var virtualScreenWidth : int;

// the virtual screen instruction text (to display the user's virtual keyboard input)
@HideInInspector
var virtualScreenInstructionText : Transform;

// the width and height of the virtual screen's instruction text
@HideInInspector
var virtualScreenInstructionTextWidth : int;
@HideInInspector
var virtualScreenInstructionTextHeight : int;

// the player's input text to be displayed on the virtual screen
@HideInInspector
var virtualScreenInputText : Transform;

// the width and height of the virtual screen's player input text
@HideInInspector
var virtualScreenInputTextWidth : int;
@HideInInspector
var virtualScreenInputTextHeight : int;

// number of lines the guiText takes up in virtual screen display (the individual keys will access to this property to know when the max number of lines has been reached)
@HideInInspector
var numOfInputLines : int = 1;

// maximum number of input lines allowed
@HideInInspector
var maxNumOfInputLines : int = 2;

// the maximum width of text on the virtual screen
@HideInInspector
var maxTextWidth : int;

// the message that's first displayed to the player (i.e. this message initiates a dialog with the player.)
@HideInInspector
var initialMsg : String;

// tracks whether or not enter was pressed on the virtual keyboard (The enter key's controls will trigger this tracking var upon being pressed.)
@HideInInspector
var enterPressed : boolean;

// used to store an empty string
@HideInInspector
var blank : String;

// used to store the player's input
@HideInInspector
var playerInput : String;

// used to cache the virtual screen instruction text
@HideInInspector
var instructionTextCache : String;

// used to track whether or not the virtual keyboard and screen is displaying
@HideInInspector
var isDisplaying : boolean;

// used to track whether or not the player has initiated a dialog
@HideInInspector
var dialogInitiated : boolean;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// Create As Many Custom Message Variables As You Need ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Instruction messages - Create as many custom messages as you need. TIP: Only create one at a time as you progress through your dialog logic.
@HideInInspector
var customMsg1 : String;
@HideInInspector
var customMsg2 : String;
@HideInInspector
var customMsg3 : String;
//@HideInInspector
//var customMsg4 : String; // NOTE: As you create more custom message variables, it's best to follow the current naming convention.
//@HideInInspector
//var customMsg5 : String;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// Create As Many Custom Message Variables As You Need ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Start(){

	// calculating the buffer and offset space for text on the virtual screen
	buffer = Mathf.Round(Screen.height * 0.025);
    offset = Mathf.Round(Screen.width * 0.05);

	// the keyboard graphic's texture ratio
	keyboardRatio = 2.55; // predetermined
	
	// the maximum width of text on the virtual screen
	maxTextWidth = Mathf.Round(((Screen.height * 0.5) * keyboardRatio) - (offset * 2));

	// calculating the font size of the virtual screen's text
	virtualScreenFontSize = Mathf.Round(Screen.height / 21);
    
    //calculating the height and width of the virtual screen
    virtualScreenHeight = Mathf.Round(Screen.height * 0.3);
    virtualScreenWidth = Mathf.Round(virtualScreenHeight * 3.64);

    // initializing...
    initialMsg = "Welcome. Press enter to start.";
    blank = "";
    playerInput = blank;

    // getting a reference to the virtual screen graphic
	virtualScreenGraphic = transform.Find("virtual_screen_graphic");
	
	// determining the aspect ratio of the texture
	textureRatio = 3.33; // predetermined
	
	// calculating the width and height of the texture
	virtualScreenGraphic.GetComponent.<GUITexture>().pixelInset.width = Mathf.Round((Screen.height * 0.5) * keyboardRatio);
	virtualScreenGraphic.GetComponent.<GUITexture>().pixelInset.height = Mathf.Round(virtualScreenGraphic.GetComponent.<GUITexture>().pixelInset.width / textureRatio);

    // calculating the position of the texture
    virtualScreenGraphic.GetComponent.<GUITexture>().pixelInset.x = (Screen.width / 2) - (virtualScreenGraphic.GetComponent.<GUITexture>().pixelInset.width / 2);
    virtualScreenGraphic.GetComponent.<GUITexture>().pixelInset.y = Screen.height - Mathf.Round(virtualScreenGraphic.GetComponent.<GUITexture>().pixelInset.height * 1.08);

    // the virtual screen is disabled by default
    virtualScreenGraphic.GetComponent.<GUITexture>().enabled = false;

	// getting a reference to the virtual screen instruction text
	virtualScreenInstructionText = transform.Find("virtual_screen_instruction_text");
	
	// determining the font size of the gui text
	virtualScreenInstructionText.GetComponent.<GUIText>().fontSize = virtualScreenFontSize;

	// initializing the default instruction text (start with the first custom message.)
	virtualScreenInstructionText.GetComponent.<GUIText>().text = initialMsg;
	
	// calculating the width and height of the text
	virtualScreenInstructionTextWidth = virtualScreenInstructionText.GetComponent.<GUIText>().GetScreenRect().width;
	virtualScreenInstructionTextHeight = virtualScreenInstructionText.GetComponent.<GUIText>().GetScreenRect().height;

	// calculating the position of the gui text
	virtualScreenInstructionText.GetComponent.<GUIText>().pixelOffset.x = virtualScreenGraphic.GetComponent.<GUITexture>().pixelInset.x + Mathf.Round(offset * 0.5);
	virtualScreenInstructionText.GetComponent.<GUIText>().pixelOffset.y = (virtualScreenGraphic.GetComponent.<GUITexture>().pixelInset.y + virtualScreenGraphic.GetComponent.<GUITexture>().pixelInset.height) - Mathf.Round(buffer * 1);

	// the virtual screen and instruction text are disabled by default
	virtualScreenInstructionText.GetComponent.<GUIText>().enabled = false;

	// getting a reference to the virtual screen input text
	virtualScreenInputText = transform.Find("virtual_screen_input_text");
	
	// determining the font size of the gui text
	virtualScreenInputText.GetComponent.<GUIText>().fontSize = virtualScreenFontSize;

	// initializing the default input text
	virtualScreenInputText.GetComponent.<GUIText>().text = blank;
	
	// calculating the width of the text
	virtualScreenInputTextWidth = maxTextWidth;

	// calculating the position of the gui text
	virtualScreenInputText.GetComponent.<GUIText>().pixelOffset.x = virtualScreenInstructionText.GetComponent.<GUIText>().pixelOffset.x;
	virtualScreenInputText.GetComponent.<GUIText>().pixelOffset.y = virtualScreenInstructionText.GetComponent.<GUIText>().pixelOffset.y - Mathf.Round(virtualScreenInstructionTextHeight * 1);

	// the virtual screen and input text are disabled by default
	virtualScreenInputText.GetComponent.<GUIText>().enabled = false;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////// Set The Custom Messages You'd Like To Display During Your Dialog With The Player /////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // NOTE: Edit these to suit your needs, as you expand the dialog logic.)
    customMsg1 = "Excellent! Type your name and press enter >";
    customMsg2 = "Nice to meet you";
    //customMsg3 = ""; // Create all the custom instruction messages you need.
    //customMsg4 = "";
    //customMsg5 = "";
    //...
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////// Set The Custom Messages You'd Like To Display During Your Dialog With The Player /////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}

function Update(){

	// if virtual keyboard and screen are currently being displayed
	if(isDisplaying){

		// Once the player presses enter to initiate a dialog, you can have your logic take over from here to create a custom dialog. This is often useful to relay and/or collect information.
		if(!dialogInitiated && enterPressed && virtualScreenInstructionText.GetComponent.<GUIText>().text == initialMsg){

			// store the player's response
			playerInput = virtualScreenInputText.GetComponent.<GUIText>().text;
			
			// reset input text
			virtualScreenInputText.GetComponent.<GUIText>().text = blank;

			// display your first custom message
			virtualScreenInstructionText.GetComponent.<GUIText>().text = customMsg1;

			//disable highlighted enter key
			//GameObject.Find("keyboard").GetComponent(keyboard_scr).enterHighlightedKey.GetComponent.<GUITexture>().enabled = false;
			
			// reset tracking var
			enterPressed = false;

			// update tracking var
			dialogInitiated = true;

		}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// Extend This Logic To Have A Custom Dialog With The Player ////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		// If the player has responded to the initial message... (I.E. The player is ready for a custom dialog!) 
		if(enterPressed && virtualScreenInstructionText.GetComponent.<GUIText>().text == customMsg1){

			// store the player's response
			playerInput = virtualScreenInputText.GetComponent.<GUIText>().text;

			// Verify the player's input is suitable for your needs. Apply your custom logic here.
			if(playerInput != blank){

				// create logic to verify that playerInput is a valid response to your instruction/inquiry.

				// update the instruction text with the next custom message (NOTE: Once you've verified playerInput, you can respond with a personalized message and/or the next inquiry.)
				virtualScreenInstructionText.GetComponent.<GUIText>().text = customMsg2 + " " +  playerInput + "! [Next instruction can go here]";

				// reset input text
				virtualScreenInputText.GetComponent.<GUIText>().text = blank;

				// Congratulations, you got your first player response! 
				// NOTE: Continue your dialog logic from here, in order to best suit your needs. 
				// If you or your programming team is unable to achieve a custom dialog logic to suit your needs, you can email tim@lucasthegame.com. Explain the type of dialog you hope to accomplish, and you may receive a quote for a custom dialog logic. (i.e. Timothy Courtney may be able to write you a custom virtual_screen_scr suited to your needs.)
			
			}
		
		}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// Extend This Logic To Have A Custom Dialog With The Player ////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		// update cache (i.e. what instruction is being displayed?)
		instructionTextCache = virtualScreenInstructionText.GetComponent.<GUIText>().text;

		// reset tracking var
		enterPressed = false;
	
	}

}