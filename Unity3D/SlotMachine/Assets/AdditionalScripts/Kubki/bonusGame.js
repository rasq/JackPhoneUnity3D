#pragma strict

public var debug 				: boolean = false;

public var cameraGO				: GameObject;
public var background			: GameObject;
public var cups					: GameObject;
public var studio				: GameObject;
public var BG					: GameObject;
public var endGameAnims			: GameObject;

public var winBG 				: Texture[];
//var win:GameObject;
//var lose:GameObject;

public var TextAnimS 			: winAnimations;
public var buttonManager 		: buttonManager;

public var panels				: GameObject[];
public var pFull				: GameObject[];
public var pHalf				: GameObject[];

public var active 				: boolean = false;

private var hideDelay 			: float = 6.5;
private var selectedCup 		: int = 0;
private var winValue 			: float = 0;
private var tmpCash 			: int = 0;
private var blockGamble 		: boolean = false;

//----------------------------------------------------------Start----------------------------------------------------------------------------
function Start () {
    disableBonusGame();
}
//----------------------------------------------------------Start----------------------------------------------------------------------------
//----------------------------------------------------------Update---------------------------------------------------------------------------
function Update () {
	if (cups.GetComponent.<Animation>().IsPlaying("mieszanie") == true){
		blockGamble = true;
	} else {
		blockGamble = false;
	}
}
//----------------------------------------------------------Update---------------------------------------------------------------------------
//----------------------------------------------------------setRisc--------------------------------------------------------------------------
function setRisc(cup : int, val : float){
    var x 						: int = 0;

    for(x = 0; x < panels.Length; x++){
        if (x != (cup-1)){
            panels[x].SetActive(false);
        } else {
            panels[x].SetActive(true);
        }
    }

    for(x = 0; x < pFull.Length; x++){
        pFull[x].SetActive(false);
    }

    for(x = 0; x < pHalf.Length; x++){
        pHalf[x].SetActive(false);
    }

    if (val == 0.5){
        pHalf[cup-1].SetActive(true);
    } else if (val == 1.0){
        pFull[cup-1].SetActive(true);
    }

    selectedCup = cup;
    winValue = val;
}
//----------------------------------------------------------setRisc--------------------------------------------------------------------------
//----------------------------------------------------------assesRisc------------------------------------------------------------------------
function assesRisc(){
    var randomCup				: int = Random.Range(0, 4);
    
    if (randomCup == selectedCup){
    	randomCup = Random.Range(0, 4);
    }
    	
    	if (debug == true) Debug.Log("randomCup: " + randomCup + ", selectedCup: " + selectedCup);
    	
    if (randomCup == selectedCup){
        tmpCash = tmpCash * winValue;
        endGame(true);
    } else {
        endGame(false);
    }
}
//----------------------------------------------------------assesRisc------------------------------------------------------------------------
//----------------------------------------------------------disableBonusGame-----------------------------------------------------------------
function disableBonusGame(){
    var x						: int =  0;

    for(x = 0; x < panels.Length; x++){
        panels[x].SetActive(false);
    }

    for(x = 0; x < pFull.Length; x++){
        pFull[x].SetActive(false);
    }

    for(x = 0; x < pHalf.Length; x++){
        pHalf[x].SetActive(false);
    }

    cameraGO.SetActive(false);
    background.SetActive (false);
    cups.SetActive (false);
    studio.SetActive (false);
    BG.SetActive (false);
    endGameAnims.SetActive (false);
    
    buttonManager.isBonusGame(false);
    
    cups.GetComponent.<Animation>().Rewind("mieszanie");
    cups.GetComponent.<Animation>().Stop("mieszanie");
}
//----------------------------------------------------------disableBonusGame-----------------------------------------------------------------
//----------------------------------------------------------startGame------------------------------------------------------------------------
function startGame(){
    cameraGO.SetActive (true);
    background.SetActive (true);
    cups.SetActive (true);
    studio.SetActive (true);
    BG.SetActive (false);
    endGameAnims.SetActive (false);
    
    buttonManager.isBonusGame(true);
    
    cups.GetComponent.<Animation>().Play("mieszanie");
}
//----------------------------------------------------------startGame------------------------------------------------------------------------
//----------------------------------------------------------endGame--------------------------------------------------------------------------
function endGame(isWin:boolean){
    	if (debug == true) Debug.Log("Starting endGame, isWin: " + isWin);

    endGameAnims.SetActive (true);
    cameraGO.SetActive (false);

	    if (isWin == true){
	        UltraWin ();
	    } else {
	        LoosAnim ();
	    }
	    
    background.SetActive (false);
    cups.SetActive (false);
    studio.SetActive (false);
    BG.SetActive (true);
}
//----------------------------------------------------------endGame--------------------------------------------------------------------------
//----------------------------------------------------------UltraWin-------------------------------------------------------------------------
function UltraWin (){
     	if (debug == true) Debug.Log("Starting UltraWin");
     
	BG.GetComponent(MeshRenderer).material.mainTexture  = winBG[1];
    BG.GetComponent(MeshRenderer).material.SetTexture("_EmissionMap", winBG[1]);
        
    TextAnimS.startAnim(1);

    yield WaitForSeconds (hideDelay);

    active = false;
    disableBonusGame();
}
//----------------------------------------------------------UltraWin-------------------------------------------------------------------------
//----------------------------------------------------------LoosAnim-------------------------------------------------------------------------
function LoosAnim (){
    	if (debug == true) Debug.Log("Starting LoosAnim");
	
	BG.GetComponent(MeshRenderer).material.mainTexture  = winBG[0];
    BG.GetComponent(MeshRenderer).material.SetTexture("_EmissionMap", winBG[0]);
        
    TextAnimS.startAnim(2);

    yield WaitForSeconds (hideDelay);

    active = false;
    disableBonusGame();
}
//----------------------------------------------------------LoosAnim-------------------------------------------------------------------------