#pragma strict

public var debug 				: boolean = false;

public var cancelDefaultKey 	: GameObject;
@HideInInspector
public var cancelDefaultKeyC 	: singleButtonManager;

public var oneDefaultKey 		: GameObject;
@HideInInspector
public var oneDefaultKeyC 		: singleButtonManager;

public var twoDefaultKey 		: GameObject;
@HideInInspector
public var twoDefaultKeyC 		: singleButtonManager;

public var threeDefaultKey 		: GameObject;
@HideInInspector
public var threeDefaultKeyC 	: singleButtonManager;

public var fourDefaultKey 		: GameObject;
@HideInInspector
public var fourDefaultKeyC 		: singleButtonManager;

public var fiveDefaultKey 		: GameObject;
@HideInInspector
public var fiveDefaultKeyC 		: singleButtonManager;

public var sixDefaultKey 		: GameObject;
@HideInInspector
public var sixDefaultKeyC 		: singleButtonManager;

public var sevenDefaultKey 		: GameObject;
@HideInInspector
public var sevenDefaultKeyC 	: singleButtonManager;

public var eightDefaultKey 		: GameObject;
@HideInInspector
public var eightDefaultKeyC 	: singleButtonManager;

public var nineDefaultKey 		: GameObject;
@HideInInspector
public var nineDefaultKeyC 		: singleButtonManager;

public var zeroDefaultKey 		: GameObject;
@HideInInspector
public var zeroDefaultKeyC 		: singleButtonManager;

var underscoreDefaultKey 		: GameObject;
@HideInInspector
var underscoreDefaultKeyC 		: singleButtonManager;

public var tabDefaultKey		: GameObject;
@HideInInspector
public var tabDefaultKeyC 		: singleButtonManager;

public var qDefaultKey 			: GameObject;
@HideInInspector
public var qDefaultKeyC 		: singleButtonManager;

public var wDefaultKey 			: GameObject;
@HideInInspector
public var wDefaultKeyC 		: singleButtonManager;

public var eDefaultKey 			: GameObject;
@HideInInspector
public var eDefaultKeyC 		: singleButtonManager;

public var rDefaultKey 			: GameObject;
@HideInInspector
public var rDefaultKeyC 		: singleButtonManager;

public var tDefaultKey			: GameObject;
@HideInInspector
public var tDefaultKeyC 		: singleButtonManager;

public var yDefaultKey 			: GameObject;
@HideInInspector
public var yDefaultKeyC 		: singleButtonManager;

public var uDefaultKey 			: GameObject;
@HideInInspector
public var uDefaultKeyC 		: singleButtonManager;

public var iDefaultKey 			: GameObject;
@HideInInspector
public var iDefaultKeyC 		: singleButtonManager;

public var oDefaultKey 			: GameObject;
@HideInInspector
public var oDefaultKeyC			: singleButtonManager;

public var pDefaultKey 			: GameObject;
@HideInInspector
public var pDefaultKeyC 		: singleButtonManager;

public var backspaceDefaultKey 	: GameObject;
@HideInInspector
public var backspaceDefaultKeyC : singleButtonManager;

public var uppercaseDefaultKey 	: GameObject;
@HideInInspector
public var uppercaseDefaultKeyC : singleButtonManager;

public var aDefaultKey 			: GameObject;
@HideInInspector
public var aDefaultKeyC 		: singleButtonManager;

public var sDefaultKey 			: GameObject;
@HideInInspector
public var sDefaultKeyC 		: singleButtonManager;

public var dDefaultKey 			: GameObject;
@HideInInspector
public var dDefaultKeyC 		: singleButtonManager;

public var fDefaultKey 			: GameObject;
@HideInInspector
public var fDefaultKeyC 		: singleButtonManager;

public var gDefaultKey 			: GameObject;
@HideInInspector
public var gDefaultKeyC 		: singleButtonManager;

public var hDefaultKey 			: GameObject;
@HideInInspector
public var hDefaultKeyC 		: singleButtonManager;

public var jDefaultKey 			: GameObject;
@HideInInspector
public var jDefaultKeyC 		: singleButtonManager;

public var kDefaultKey 			: GameObject;
@HideInInspector
public var kDefaultKeyC 		: singleButtonManager;

public var lDefaultKey 			: GameObject;
@HideInInspector
public var lDefaultKeyC 		: singleButtonManager;

public var enterDefaultKey 		: GameObject;
@HideInInspector
public var enterDefaultKeyC 	: singleButtonManager;

public var deleteDefaultKey 	: GameObject;
@HideInInspector
public var deleteDefaultKeyC 	: singleButtonManager;

public var zDefaultKey 			: GameObject;
@HideInInspector
public var zDefaultKeyC 		: singleButtonManager;

public var xDefaultKey 			: GameObject;
@HideInInspector
public var xDefaultKeyC 		: singleButtonManager;

public var cDefaultKey 			: GameObject;
@HideInInspector
public var cDefaultKeyC 		: singleButtonManager;

public var vDefaultKey 			: GameObject;
@HideInInspector
public var vDefaultKeyC 		: singleButtonManager;

public var bDefaultKey 			: GameObject;
@HideInInspector
public var bDefaultKeyC 		: singleButtonManager;

public var nDefaultKey 			: GameObject;
@HideInInspector
public var nDefaultKeyC 		: singleButtonManager;

public var mDefaultKey 			: GameObject;
@HideInInspector
public var mDefaultKeyC 		: singleButtonManager;

public var exclamationDefaultKey : GameObject;
@HideInInspector
public var exclamationDefaultKeyC : singleButtonManager;

public var periodDefaultKey 	: GameObject;
@HideInInspector
public var periodDefaultKeyC 	: singleButtonManager;

public var forwardSlashDefaultKey : GameObject;
@HideInInspector
public var forwardSlashDefaultKeyC : singleButtonManager;

public var hyphenDefaultKey 	: GameObject;
@HideInInspector
public var hyphenDefaultKeyC 	: singleButtonManager;

public var spacebarDefaultKey 	: GameObject;
@HideInInspector
public var spacebarDefaultKeyC 	: singleButtonManager;

public var virtualKeyboard 		: GameObject;
@HideInInspector
public var virtualKeyboardControls : keyboard_scr;
public var virtualScreen 		: GameObject;
@HideInInspector
public var virtualScreenControls: virtual_screen_scr;


public var virtualScreenGraphic : GameObject;
public var virtualScreenFontSize : int;
public var virtualScreenInstructionText : GameObject;
public var virtualScreenInputText : InputField;


private var initialMsg 			: String = "";
private var keyboardMode 		: int = 1;


//----------------------------------------------------------Start----------------------------------------------------------------------------
function Start () {
	cancelDefaultKeyC = cancelDefaultKey.GetComponent.<singleButtonManager>();
	oneDefaultKeyC = oneDefaultKey.GetComponent.<singleButtonManager>();
	twoDefaultKeyC = twoDefaultKey.GetComponent.<singleButtonManager>();
	threeDefaultKeyC = threeDefaultKey.GetComponent.<singleButtonManager>();
	fourDefaultKeyC = fourDefaultKey.GetComponent.<singleButtonManager>();
	fiveDefaultKeyC = fiveDefaultKey.GetComponent.<singleButtonManager>();
	sixDefaultKeyC = sixDefaultKey.GetComponent.<singleButtonManager>();
	sevenDefaultKeyC = sevenDefaultKey.GetComponent.<singleButtonManager>();
	eightDefaultKeyC = eightDefaultKey.GetComponent.<singleButtonManager>();
	nineDefaultKeyC = nineDefaultKey.GetComponent.<singleButtonManager>();
	zeroDefaultKeyC = zeroDefaultKey.GetComponent.<singleButtonManager>();
	underscoreDefaultKeyC = underscoreDefaultKey.GetComponent.<singleButtonManager>();
	tabDefaultKeyC = tabDefaultKey.GetComponent.<singleButtonManager>();
	qDefaultKeyC = qDefaultKey.GetComponent.<singleButtonManager>();
	wDefaultKeyC = wDefaultKey.GetComponent.<singleButtonManager>();
 	eDefaultKeyC = eDefaultKey.GetComponent.<singleButtonManager>();
	rDefaultKeyC = rDefaultKey.GetComponent.<singleButtonManager>();
	tDefaultKeyC = tDefaultKey.GetComponent.<singleButtonManager>();
	yDefaultKeyC = yDefaultKey.GetComponent.<singleButtonManager>();
	uDefaultKeyC = uDefaultKey.GetComponent.<singleButtonManager>();
	iDefaultKeyC = iDefaultKey.GetComponent.<singleButtonManager>();
	oDefaultKeyC = oDefaultKey.GetComponent.<singleButtonManager>();
	pDefaultKeyC = pDefaultKey.GetComponent.<singleButtonManager>();
	backspaceDefaultKeyC = backspaceDefaultKey.GetComponent.<singleButtonManager>();
	uppercaseDefaultKeyC = uppercaseDefaultKey.GetComponent.<singleButtonManager>();
	aDefaultKeyC = aDefaultKey.GetComponent.<singleButtonManager>();
	sDefaultKeyC = sDefaultKey.GetComponent.<singleButtonManager>();
	dDefaultKeyC = dDefaultKey.GetComponent.<singleButtonManager>();
	fDefaultKeyC = fDefaultKey.GetComponent.<singleButtonManager>();
	gDefaultKeyC = gDefaultKey.GetComponent.<singleButtonManager>();
	hDefaultKeyC = hDefaultKey.GetComponent.<singleButtonManager>();
	jDefaultKeyC = jDefaultKey.GetComponent.<singleButtonManager>();
	kDefaultKeyC = kDefaultKey.GetComponent.<singleButtonManager>();
	lDefaultKeyC = lDefaultKey.GetComponent.<singleButtonManager>();
	enterDefaultKeyC = enterDefaultKey.GetComponent.<singleButtonManager>();
	deleteDefaultKeyC = deleteDefaultKey.GetComponent.<singleButtonManager>();
	zDefaultKeyC = zDefaultKey.GetComponent.<singleButtonManager>();
	xDefaultKeyC = xDefaultKey.GetComponent.<singleButtonManager>();
	cDefaultKeyC = cDefaultKey.GetComponent.<singleButtonManager>();
	vDefaultKeyC = vDefaultKey.GetComponent.<singleButtonManager>();
	bDefaultKeyC = bDefaultKey.GetComponent.<singleButtonManager>();
	nDefaultKeyC = nDefaultKey.GetComponent.<singleButtonManager>();
	mDefaultKeyC = mDefaultKey.GetComponent.<singleButtonManager>();
	exclamationDefaultKeyC = exclamationDefaultKey.GetComponent.<singleButtonManager>();
	periodDefaultKeyC = periodDefaultKey.GetComponent.<singleButtonManager>();
	forwardSlashDefaultKeyC = forwardSlashDefaultKey.GetComponent.<singleButtonManager>();
	hyphenDefaultKeyC = hyphenDefaultKey.GetComponent.<singleButtonManager>();
	spacebarDefaultKeyC = spacebarDefaultKey.GetComponent.<singleButtonManager>();


	virtualKeyboardControls = virtualKeyboard.GetComponent.<keyboard_scr>();
	virtualScreenControls = virtualScreen.GetComponent.<virtual_screen_scr>();

    virtualScreenInputText.text = initialMsg;
}
//----------------------------------------------------------Start----------------------------------------------------------------------------
//----------------------------------------------------------Update---------------------------------------------------------------------------
function Update () {
    if(Input.GetMouseButtonDown(0)){
        var pos : Vector3 = Camera.main.ScreenToWorldPoint (Input.mousePosition);
        var hit : RaycastHit2D  = Physics2D.Raycast(pos, Vector2.zero);

        if (hit != null && hit.collider != null) {
            setChar(hit.collider.name);
        }
    }
}
//----------------------------------------------------------Update---------------------------------------------------------------------------
//----------------------------------------------------------inputBoxSet----------------------------------------------------------------------
function inputBoxSet(msg : String){
    var tmpString 				: String = virtualScreenInputText.text;
    var toConvert 				: String;
        
    if (msg == "backspace"){
        if (tmpString.Length > 0){
        	virtualScreenInputText.text = tmpString.Substring(0, tmpString.Length - 1);
        }
    } else if (msg == "uppercase"){
        keyboardMode = keyboardMode + 1;
        if (keyboardMode == 3){
            keyboardMode = 1;
        }
        keyboardModeSet(keyboardMode);
    } else {
        if (keyboardMode == 1){
            toConvert = msg.ToUpper ();
        } else {
            toConvert = msg.ToLower ();
        }

        if (tmpString == initialMsg){
            virtualScreenInputText.text = toConvert;
        }
        virtualScreenInputText.text = tmpString + toConvert;
    }

    allOut();
}
//----------------------------------------------------------inputBoxSet----------------------------------------------------------------------
//----------------------------------------------------------setChar--------------------------------------------------------------------------
function setChar(msg){
    switch (msg) {
        case "e_default_key":
            eDefaultKeyC.setIn();
            inputBoxSet("E");
            break;
        case "w_default_key":
            wDefaultKeyC.setIn();
            inputBoxSet("W");
            break;
        case "q_default_key":
            qDefaultKeyC.setIn();
            inputBoxSet("Q");
            break;
        case "tab_default_key":
            tabDefaultKeyC.setIn();
            break;
        case "underscore_default_key":
            underscoreDefaultKeyC.setIn();
            inputBoxSet("_");
            break;
        case "zero_default_key":
            zeroDefaultKeyC.setIn();
            inputBoxSet("0");
            break;
        case "nine_default_key":
            nineDefaultKeyC.setIn();
            inputBoxSet("9");
            break;
        case "eight_default_key":
            eightDefaultKeyC.setIn();
            inputBoxSet("8");
            break;
        case "seven_default_key":
            inputBoxSet("7");
            break;
        case "six_default_key":
            sixDefaultKeyC.setIn();
            inputBoxSet("6");
            break;
        case "five_default_key":
            fiveDefaultKeyC.setIn();
            inputBoxSet("5");
            break;
        case "four_default_key":
            fourDefaultKeyC.setIn();
            inputBoxSet("4");
            break;
        case "three_default_key":
            threeDefaultKeyC.setIn();
            inputBoxSet("3");
            break;
        case "two_default_key":
            twoDefaultKeyC.setIn();
            inputBoxSet("2");
            break;
        case "one_default_key":
            oneDefaultKeyC.setIn();
            inputBoxSet("1");
            break;
        case "cancel_default_key":
            cancelDefaultKeyC.setIn();
            break;
        case "r_default_key":
            rDefaultKeyC.setIn();
            inputBoxSet("R");
            break;
        case "t_default_key":
            tDefaultKeyC.setIn();
            inputBoxSet("T");
            break;
        case "y_default_key":
            yDefaultKeyC.setIn();
            inputBoxSet("Y");
            break;
        case "u_default_key":
            uDefaultKeyC.setIn();
            inputBoxSet("U");
            break;
        case "i_default_key":
            iDefaultKeyC.setIn();
            inputBoxSet("I");
            break;
        case "o_default_key":
            oDefaultKeyC.setIn();
            inputBoxSet("O");
            break;
        case "p_default_key":
            pDefaultKeyC.setIn();
            inputBoxSet("P");
            break;
        case "backspace_default_key":
            backspaceDefaultKeyC.setIn();
            inputBoxSet("backspace");
            break;
        case "uppercase_default_key":
            uppercaseDefaultKeyC.setIn();
            inputBoxSet("uppercase");
            break;
        case "a_default_key":
            aDefaultKeyC.setIn();
            inputBoxSet("A");
            break;
        case "s_default_key":
            sDefaultKeyC.setIn();
            inputBoxSet("S");
            break;
        case "d_default_key":
            dDefaultKeyC.setIn();
            inputBoxSet("D");
            break;
        case "f_default_key":
            fDefaultKeyC.setIn();
            inputBoxSet("F");
            break;
        case "g_default_key":
            gDefaultKeyC.setIn();
            inputBoxSet("G");
            break;
        case "h_default_key":
            hDefaultKeyC.setIn();
            inputBoxSet("H");
            break;
        case "j_default_key":
            jDefaultKeyC.setIn();
            inputBoxSet("J");
            break;
        case "k_default_key":
            kDefaultKeyC.setIn();
            inputBoxSet("K");
            break;
        case "l_default_key":
            lDefaultKeyC.setIn();
            inputBoxSet("L");
            break;
        case "enter_default_key":
            enterDefaultKeyC.setIn();
            break;
        case "delete_default_key":
            deleteDefaultKeyC.setIn();
            break;
        case "z_default_key":
            zDefaultKeyC.setIn();
            inputBoxSet("Z");
            break;
        case "x_default_key":
            xDefaultKeyC.setIn();
            inputBoxSet("X");
            break;
        case "c_default_key":
            cDefaultKeyC.setIn();
            inputBoxSet("C");
            break;
        case "v_default_key":
            vDefaultKeyC.setIn();
            inputBoxSet("V");
            break;
        case "b_default_key":
            bDefaultKeyC.setIn();
            inputBoxSet("B");
            break;
        case "n_default_key":
            nDefaultKeyC.setIn();
            inputBoxSet("N");
            break;
        case "m_default_key":
            mDefaultKeyC.setIn();
            inputBoxSet("M");
            break;
        case "exclamation_default_key":
            exclamationDefaultKeyC.setIn();
            inputBoxSet("!");
            break;
        case "period_default_key":
            periodDefaultKeyC.setIn();
            inputBoxSet(".");
            break;
        case "forward_slash_default_key":
            break;
        case "hyphen_default_key":
            hyphenDefaultKeyC.setIn();
            inputBoxSet("-");
            break;
        case "spacebar_default_key":
            spacebarDefaultKeyC.setIn();
            inputBoxSet(" ");
            break;
        default:
            break;
    }
}
//----------------------------------------------------------setChar--------------------------------------------------------------------------
//----------------------------------------------------------allOut---------------------------------------------------------------------------
function allOut(){
    yield WaitForSeconds (0.25);

    cancelDefaultKeyC.setOut();
    oneDefaultKeyC.setOut();
    twoDefaultKeyC.setOut();
    threeDefaultKeyC.setOut();
    fourDefaultKeyC.setOut();
    fiveDefaultKeyC.setOut();
    sixDefaultKeyC.setOut();
    sevenDefaultKeyC.setOut();
    eightDefaultKeyC.setOut();
    nineDefaultKeyC.setOut();
    zeroDefaultKeyC.setOut();
    underscoreDefaultKeyC.setOut();
    tabDefaultKeyC.setOut();
    qDefaultKeyC.setOut();
    wDefaultKeyC.setOut();
    eDefaultKeyC.setOut();
    rDefaultKeyC.setOut();
    tDefaultKeyC.setOut();
    yDefaultKeyC.setOut();
    uDefaultKeyC.setOut();
    iDefaultKeyC.setOut();
    oDefaultKeyC.setOut();
    pDefaultKeyC.setOut();
    backspaceDefaultKeyC.setOut();
    uppercaseDefaultKeyC.setOut();
    aDefaultKeyC.setOut();
    sDefaultKeyC.setOut();
    dDefaultKeyC.setOut();
    fDefaultKeyC.setOut();
    gDefaultKeyC.setOut();
    hDefaultKeyC.setOut();
    jDefaultKeyC.setOut();
    kDefaultKeyC.setOut();
    lDefaultKeyC.setOut();
    enterDefaultKeyC.setOut();
    deleteDefaultKeyC.setOut();
    zDefaultKeyC.setOut();
    xDefaultKeyC.setOut();
    cDefaultKeyC.setOut();
    vDefaultKeyC.setOut();
    bDefaultKeyC.setOut();
    nDefaultKeyC.setOut();
    mDefaultKeyC.setOut();
    exclamationDefaultKeyC.setOut();
    periodDefaultKeyC.setOut();
    forwardSlashDefaultKeyC.setOut();
    hyphenDefaultKeyC.setOut();
    spacebarDefaultKeyC.setOut();
}
//----------------------------------------------------------allOut---------------------------------------------------------------------------
//----------------------------------------------------------keyboardModeSet------------------------------------------------------------------
function keyboardModeSet(msg){
    cancelDefaultKeyC.setSet(msg);
    oneDefaultKeyC.setSet(msg);
    twoDefaultKeyC.setSet(msg);
    threeDefaultKeyC.setSet(msg);
    fourDefaultKeyC.setSet(msg);
    fiveDefaultKeyC.setSet(msg);
    sixDefaultKeyC.setSet(msg);
    sevenDefaultKeyC.setSet(msg);
    eightDefaultKeyC.setSet(msg);
    nineDefaultKeyC.setSet(msg);
    zeroDefaultKeyC.setSet(msg);
    underscoreDefaultKeyC.setSet(msg);
    tabDefaultKeyC.setSet(msg);
    qDefaultKeyC.setSet(msg);
    wDefaultKeyC.setSet(msg);
    eDefaultKeyC.setSet(msg);
    rDefaultKeyC.setSet(msg);
    tDefaultKeyC.setSet(msg);
    yDefaultKeyC.setSet(msg);
    uDefaultKeyC.setSet(msg);
    iDefaultKeyC.setSet(msg);
    oDefaultKeyC.setSet(msg);
    pDefaultKeyC.setSet(msg);
    backspaceDefaultKeyC.setSet(msg);
    uppercaseDefaultKeyC.setSet(msg);
    aDefaultKeyC.setSet(msg);
    sDefaultKeyC.setSet(msg);
    dDefaultKeyC.setSet(msg);
    fDefaultKeyC.setSet(msg);
    gDefaultKeyC.setSet(msg);
    hDefaultKeyC.setSet(msg);
    jDefaultKeyC.setSet(msg);
    kDefaultKeyC.setSet(msg);
    lDefaultKeyC.setSet(msg);
    enterDefaultKeyC.setSet(msg);
    deleteDefaultKeyC.setSet(msg);
    zDefaultKeyC.setSet(msg);
    xDefaultKeyC.setSet(msg);
    cDefaultKeyC.setSet(msg);
    vDefaultKeyC.setSet(msg);
    bDefaultKeyC.setSet(msg);
    nDefaultKeyC.setSet(msg);
    mDefaultKeyC.setSet(msg);
    exclamationDefaultKeyC.setSet(msg);
    periodDefaultKeyC.setSet(msg);
    forwardSlashDefaultKeyC.setSet(msg);
    hyphenDefaultKeyC.setSet(msg);
    spacebarDefaultKeyC.setSet(msg);
}
//----------------------------------------------------------keyboardModeSet------------------------------------------------------------------