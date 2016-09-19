#pragma strict

public var debug 				: boolean = false;

public var Background 			: GameObject;
public var seq 					: int = 0;
public var active 				: boolean = false;

private var hideDelay 			: float = 6.5;
private var CoinsEmmiterS 		: ParticlesEmmiter;
private var TextAnimS 			: winAnimations;
private var ObjAnimS 			: winAnimations;
private var bonusGame 			: bonusGame;
private var CoinsEmmiter 		: GameObject;
private var TextAnim 			: GameObject;
private var ObjAnim 			: GameObject;
private var MachineScript 		: MachineScript;


//----------------------------------------------------------Awake----------------------------------------------------------------------------
function Awake () {
    if(GameObject.FindWithTag("Particles")){   
		CoinsEmmiterS = GameObject.FindWithTag("Particles").GetComponent.<ParticlesEmmiter>();    
	}
	
    if(GameObject.FindWithTag("Particles")){   
		CoinsEmmiter = GameObject.FindWithTag("Particles");    
	}
	
    if(GameObject.FindWithTag("TextAnim")){   
		TextAnimS = GameObject.FindWithTag("TextAnim").GetComponent.<winAnimations>();  
		TextAnim = GameObject.FindWithTag("TextAnim");   
	}
	
    if(GameObject.FindWithTag("ObjAnim")){   
		ObjAnimS = GameObject.FindWithTag("ObjAnim").GetComponent.<winAnimations>();   
		ObjAnim = GameObject.FindWithTag("ObjAnim"); 
	}
	
    if(GameObject.FindWithTag("Bonus")){   
		bonusGame = GameObject.FindWithTag("Bonus").GetComponent.<bonusGame>();    
	}
	
    if(GameObject.FindWithTag("MachineScreens")){   
		MachineScript = GameObject.FindWithTag("MachineScreens").GetComponent.<MachineScript>();    
	}
}
//----------------------------------------------------------Awake----------------------------------------------------------------------------
//----------------------------------------------------------Start----------------------------------------------------------------------------
function Start () {
    TextAnimS.StarterS();
    ObjAnimS.StarterS();
    
    active = false;
    setActiveGO();
}
//----------------------------------------------------------Start----------------------------------------------------------------------------
//----------------------------------------------------------setActiveGO----------------------------------------------------------------------
function setActiveGO(){
    if (active == false){
        if (TextAnim.activeSelf == true){
            TextAnim.SetActive(false);
        }
        if (ObjAnim.activeSelf == true){
            ObjAnim.SetActive(false);
        }
        if (Background.activeSelf == true){
            Background.SetActive(false);
        }
    } else {
        if (TextAnim.activeSelf == false){
            TextAnim.SetActive(true);
        }
        if (ObjAnim.activeSelf == false){
            ObjAnim.SetActive(true);
        }
        if (Background.activeSelf == false){
            Background.SetActive(true);
            //UltraWin ("dice");
        }
    }
}
//----------------------------------------------------------setActiveGO----------------------------------------------------------------------
//----------------------------------------------------------BigWin---------------------------------------------------------------------------
function BigWin (msg){
    yield WaitForSeconds (hideDelay/2.0);
	
		MachineScript.transition.SetActive(true);
	
    yield MachineScript.FadeIn();
    	
   	 	active = true;
    	setActiveGO();

	yield MachineScript.FadeOut();
    
    	MachineScript.transition.SetActive(false);
    	CoinsEmmiterS.startCoinParticles("coin_standard");
    	TextAnimS.startAnim(1);
    
    if (msg == ""){
    	msg = "dice";
    }
    
    switch (msg){
        case "dice":
            ObjAnimS.startAnim(9); //dice
            break;
        case "cuffs":
            ObjAnimS.startAnim(8);//cuffs
            break;
        case "cash":
            ObjAnimS.startAnim(6);//cash
            break;
        case "badge":
            ObjAnimS.startAnim(1);//badge
            break;
        default:
            break;
    }

    yield WaitForSeconds (hideDelay);
	
		MachineScript.transition.SetActive(true);
		
    yield MachineScript.FadeIn();
    		
    	active = false;
    	setActiveGO();

	yield MachineScript.FadeOut();
    
    	MachineScript.transition.SetActive(false);
   	 	bonusGame.startGame();
}
//----------------------------------------------------------BigWin---------------------------------------------------------------------------
//----------------------------------------------------------MegaWin--------------------------------------------------------------------------
function MegaWin (msg){
    yield WaitForSeconds (hideDelay/1.5);

    	MachineScript.transition.SetActive(true);
    	
    yield MachineScript.FadeIn();
    
    	active = true;
    	setActiveGO();

	yield MachineScript.FadeOut();
	
    	MachineScript.transition.SetActive(false);
    	CoinsEmmiterS.startCoinParticles("coin_standard");
    	TextAnimS.startAnim(5);
    
    if (msg == ""){
    	msg = "car";
    }
    switch (msg){
        case "revolver":
            ObjAnimS.startAnim(11); //revolver
            break;
        case "shotgun_shells":
            ObjAnimS.startAnim(12);//shotgun
            break;
        case "car":
            ObjAnimS.startAnim(4);//car
            break;
        default:
            break;
    }

    yield WaitForSeconds (hideDelay);

    	MachineScript.transition.SetActive(true);
    
    yield MachineScript.FadeIn();
    
    	active = false;
    	setActiveGO();

	yield MachineScript.FadeOut();
	
    	MachineScript.transition.SetActive(false);
    	bonusGame.startGame();
}
//----------------------------------------------------------MegaWin--------------------------------------------------------------------------
//----------------------------------------------------------UltraWin-------------------------------------------------------------------------
function UltraWin (msg){    
    yield WaitForSeconds (hideDelay/1.5);

    	MachineScript.transition.SetActive(true);
    	
    yield MachineScript.FadeIn();
    
    	active = true;
    	setActiveGO();

	yield MachineScript.FadeOut();
    
    	MachineScript.transition.SetActive(false);
    	CoinsEmmiterS.startCoinParticles("coin_gold");
    	TextAnimS.startAnim(6);
    	ObjAnimS.startAnim(10); //me

    yield WaitForSeconds (hideDelay);

    	active = false;
    	setActiveGO();

	yield MachineScript.FadeOut();
	
    	MachineScript.transition.SetActive(false);
   		bonusGame.startGame();
}
//----------------------------------------------------------UltraWin-------------------------------------------------------------------------
//----------------------------------------------------------BonusGame------------------------------------------------------------------------
function BonusGame (msg){
    yield WaitForSeconds (hideDelay/1.5);

    	MachineScript.transition.SetActive(true);
    
    yield MachineScript.FadeIn();
    
    	active = true;
    	setActiveGO();
    
	yield MachineScript.FadeOut();
	
    	MachineScript.transition.SetActive(false);
    	TextAnimS.startAnim(2);
    //ObjAnimS.startAnim(10); //me

    yield WaitForSeconds (hideDelay);

    	MachineScript.transition.SetActive(true);
    	
    yield MachineScript.FadeIn();
    
    	active = false;
    	setActiveGO();

	yield MachineScript.FadeOut();
	
    	MachineScript.transition.SetActive(false);
}
//----------------------------------------------------------BonusGame------------------------------------------------------------------------
//----------------------------------------------------------Jackphone------------------------------------------------------------------------
function Jackphone (){
    yield WaitForSeconds (hideDelay/6.0);

    	MachineScript.transition.SetActive(true);
    
    yield MachineScript.FadeIn();
    
    	active = true;
    	setActiveGO();

	yield MachineScript.FadeOut();
	
    	MachineScript.transition.SetActive(false);
    
    	TextAnimS.startAnim(3);
    	ObjAnimS.startAnim(13);

    yield WaitForSeconds (hideDelay);

   	 	MachineScript.transition.SetActive(true);
    
    yield MachineScript.FadeIn();
    
    	active = false;
    	setActiveGO();

	yield MachineScript.FadeOut();
	
    	MachineScript.transition.SetActive(false);
}
//----------------------------------------------------------Jackphone------------------------------------------------------------------------