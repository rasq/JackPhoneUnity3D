#pragma strict

// used to store the aspect ratio of textures
@HideInInspector
var textureRatio : float;

// the calculated horizontal offset, based off of screen dimensions
@HideInInspector
var offset : int;

// the calculated space between keyboard keys
@HideInInspector
var keyOffset : int;

// the calculated vertical space between items, based off of screen dimensions
@HideInInspector
var buffer : int;

// the keyboard graphic
@HideInInspector
var keyboardGraphic : Transform;

// the keyboard's default keys (buttons)
//@HideInInspector
var cancelDefaultKey : Transform;
//@HideInInspector
var oneDefaultKey : Transform;
//@HideInInspector
var twoDefaultKey : Transform;
//@HideInInspector
var threeDefaultKey : Transform;
//@HideInInspector
var fourDefaultKey : Transform;
//@HideInInspector
var fiveDefaultKey : Transform;
//@HideInInspector
var sixDefaultKey : Transform;
//@HideInInspector
var sevenDefaultKey : Transform;
//@HideInInspector
var eightDefaultKey : Transform;
//@HideInInspector
var nineDefaultKey : Transform;
//@HideInInspector
var zeroDefaultKey : Transform;
//@HideInInspector
var underscoreDefaultKey : Transform;
//@HideInInspector
var tabDefaultKey : Transform;
//@HideInInspector
var qDefaultKey : Transform;
//@HideInInspector
var wDefaultKey : Transform;
//@HideInInspector
var eDefaultKey : Transform;
//@HideInInspector
var rDefaultKey : Transform;
//@HideInInspector
var tDefaultKey : Transform;
//@HideInInspector
var yDefaultKey : Transform;
//@HideInInspector
var uDefaultKey : Transform;
//@HideInInspector
var iDefaultKey : Transform;
//@HideInInspector
var oDefaultKey : Transform;
//@HideInInspector
var pDefaultKey : Transform;
//@HideInInspector
var backspaceDefaultKey : Transform;
//@HideInInspector
var uppercaseDefaultKey : Transform;
//@HideInInspector
var aDefaultKey : Transform;
//@HideInInspector
var sDefaultKey : Transform;
//@HideInInspector
var dDefaultKey : Transform;
//@HideInInspector
var fDefaultKey : Transform;
//@HideInInspector
var gDefaultKey : Transform;
//@HideInInspector
var hDefaultKey : Transform;
//@HideInInspector
var jDefaultKey : Transform;
//@HideInInspector
var kDefaultKey : Transform;
//@HideInInspector
var lDefaultKey : Transform;
//@HideInInspector
var enterDefaultKey : Transform;
//@HideInInspector
var deleteDefaultKey : Transform;
//@HideInInspector
var zDefaultKey : Transform;
//@HideInInspector
var xDefaultKey : Transform;
//@HideInInspector
var cDefaultKey : Transform;
//@HideInInspector
var vDefaultKey : Transform;
//@HideInInspector
var bDefaultKey : Transform;
//@HideInInspector
var nDefaultKey : Transform;
//@HideInInspector
var mDefaultKey : Transform;
//@HideInInspector
var exclamationDefaultKey : Transform;
//@HideInInspector
var periodDefaultKey : Transform;
//@HideInInspector
var forwardSlashDefaultKey : Transform;
//@HideInInspector
var hyphenDefaultKey : Transform;
//@HideInInspector
var spacebarDefaultKey : Transform;


function Start(){
	
///////////////////////////////////////////////////// keyboard graphic /////////////////////////////////////////////////////

    // getting a reference to the keyboard graphic
	keyboardGraphic = transform.Find("keyboard_graphic");


////////////////////////////////////////////////// end of keyboard graphic /////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////// default keyboard keys ///////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // getting a reference to the default cancel key
	cancelDefaultKey = transform.Find("cancel_default_key");
	
    // getting a reference to the default one key
	oneDefaultKey = transform.Find("one_default_key");
	
    // getting a reference to the default two key
	twoDefaultKey = transform.Find("two_default_key");

    // getting a reference to the default three key
	threeDefaultKey = transform.Find("three_default_key");

    // getting a reference to the default four key
	fourDefaultKey = transform.Find("four_default_key");

    // getting a reference to the default five key
	fiveDefaultKey = transform.Find("five_default_key");

    // getting a reference to the default six key
	sixDefaultKey = transform.Find("six_default_key");

    // getting a reference to the default seven key
	sevenDefaultKey = transform.Find("seven_default_key");

    // getting a reference to the default eight key
	eightDefaultKey = transform.Find("eight_default_key");

    // getting a reference to the default nine key
	nineDefaultKey = transform.Find("nine_default_key");

    // getting a reference to the default zero key
	zeroDefaultKey = transform.Find("zero_default_key");

    // getting a reference to the default underscore key
	underscoreDefaultKey = transform.Find("underscore_default_key");

    // getting a reference to the default tab key
	tabDefaultKey = transform.Find("tab_default_key");

    // getting a reference to the default q key
	qDefaultKey = transform.Find("q_default_key");

    // getting a reference to the default w key
	wDefaultKey = transform.Find("w_default_key");

    // getting a reference to the default e key
	eDefaultKey = transform.Find("e_default_key");

    // getting a reference to the default r key
	rDefaultKey = transform.Find("r_default_key");

    // getting a reference to the default t key
	tDefaultKey = transform.Find("t_default_key");

    // getting a reference to the default y key
	yDefaultKey = transform.Find("y_default_key");

    // getting a reference to the default u key
	uDefaultKey = transform.Find("u_default_key");

    // getting a reference to the default i key
	iDefaultKey = transform.Find("i_default_key");

    // getting a reference to the default o key
	oDefaultKey = transform.Find("o_default_key");

    // getting a reference to the default p key
	pDefaultKey = transform.Find("p_default_key");

    // getting a reference to the default backspace key
	backspaceDefaultKey = transform.Find("backspace_default_key");

    // getting a reference to the default uppercase key
	uppercaseDefaultKey = transform.Find("uppercase_default_key");

    // getting a reference to the default a key
	aDefaultKey = transform.Find("a_default_key");

    // getting a reference to the default s key
	sDefaultKey = transform.Find("s_default_key");

    // getting a reference to the default d key
	dDefaultKey = transform.Find("d_default_key");

    // getting a reference to the default f key
	fDefaultKey = transform.Find("f_default_key");

    // getting a reference to the default g key
	gDefaultKey = transform.Find("g_default_key");

    // getting a reference to the default h key
	hDefaultKey = transform.Find("h_default_key");

    // getting a reference to the default j key
	jDefaultKey = transform.Find("j_default_key");

    // getting a reference to the default k key
	kDefaultKey = transform.Find("k_default_key");

    // getting a reference to the default l key
	lDefaultKey = transform.Find("l_default_key");

    // getting a reference to the default enter key
	enterDefaultKey = transform.Find("enter_default_key");

    // getting a reference to the default delete key
	deleteDefaultKey = transform.Find("delete_default_key");

    // getting a reference to the default z key
	zDefaultKey = transform.Find("z_default_key");

    // getting a reference to the default x key
	xDefaultKey = transform.Find("x_default_key");

    // getting a reference to the default c key
	cDefaultKey = transform.Find("c_default_key");

    // getting a reference to the default v key
	vDefaultKey = transform.Find("v_default_key");

    // getting a reference to the default b key
	bDefaultKey = transform.Find("b_default_key");

    // getting a reference to the default n key
	nDefaultKey = transform.Find("n_default_key");

    // getting a reference to the default m key
	mDefaultKey = transform.Find("m_default_key");

    // getting a reference to the default exclamation key
	exclamationDefaultKey = transform.Find("exclamation_default_key");

    // getting a reference to the default period key
	periodDefaultKey = transform.Find("period_default_key");

    // getting a reference to the default forward slash key
	forwardSlashDefaultKey = transform.Find("forward_slash_default_key");

    // getting a reference to the default hyphen key
	hyphenDefaultKey = transform.Find("hyphen_default_key");

    // getting a reference to the default spacebar key
	spacebarDefaultKey = transform.Find("spacebar_default_key");
	

//////////////////////////////////////////////// end of default spacebar key ///////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// end of default keyboard keys ///////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}