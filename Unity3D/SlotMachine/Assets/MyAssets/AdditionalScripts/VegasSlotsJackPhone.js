public var winNow : boolean = false;

public var maskSize = new Vector2 (18.2f, 2.43f);
public var maskPivot = new Vector2 (0.5f, 3.86f);
    
    
public var IconsXYDimensions : float[];
public var spinNow : boolean = false;

public var GameLayer : int;
public var HowManyReels : int;
public var ReelYPos : float;
public var reelsYOffset : float;
public var xOffset : float;
public var jump : float = 1.5;
	
public var winningNumber : int[];
public var numberToWin : int[];

public var specialAudio : AudioSource;

public var ReelsConstainer : GameObject;


public var lastNumber : lastNumber;
public var MachineNumberControl : MachineNumberControl;

@Range(3, 100)
public var iconsPerReel : int;

@Range(3, 20)
public var iconsPerReelDifference : int;

@Range(0, 5)
public var iconSize : float;

@Range(100, 1000)
public var spinSpeed : float;

@Range(0, 5)
public var reboundAmount : int;

@Range(0, 50)
public var reboundSpeed : int;

@Range(0, 20)
public var scatterSize : int;

public var iconInfo : IconInfo[];

public var audioInfo : AudioInfo[];

public var reelInfo : ReelInfo[];

@HideInInspector
public var tempBonusState : int = 0;

@HideInInspector
public var tempScatter : int = 0;

@HideInInspector
public var spinning : boolean = false;

private var iconsSet : boolean;
private var prevIconCount : int;
private var scattersLeft : int;
private var prevFaceIcons : int[];
private var faceIcons : int[];
private var faceSprites : int[];
private var curSpinSpeed : float;
private var scatterTimer : float;
private var effectsTimer : float;
private var targetPos : float;
private var fadeValue : float = 1;
private var picks : int = 0;


private var muteAudio : boolean = true;

function Awake(){		
	GenerateNewReels();
	
	for(var a = 0; a < reelInfo.Length; a++){
		RepositionReel(a, reelInfo[a].targetPosition);
	}
	iconsSet = true;
	
	fadeValue = 1;
}


function Start(){
    spinNow = true;
}




function startReel(){
    muteAudio = false;
    spinNow = true;
}


function Update(){
    if (spinNow == true){
        spinning = false;
        Spin();
    }

	if(prevIconCount != iconsPerReel){
		GenerateNewReels();
	}
		
	if(spinning){
		curSpinSpeed = Mathf.Lerp(curSpinSpeed, spinSpeed, Time.deltaTime);
		
		for(var i = 0; i < HowManyReels; i++){
			if(reelInfo[i].spinning){
				reelInfo[i].reel.transform.position.y = Mathf.MoveTowards(reelInfo[i].reel.transform.position.y, reelInfo[i].targetPosition - reboundAmount, curSpinSpeed * Time.deltaTime);
			}
			
			if(reelInfo[i].reel.transform.position.y == reelInfo[i].targetPosition - reboundAmount){
				if(reelInfo[i].spinning){
					//print("StopReel " + i);
					StopReel(i);
				}
			}
		}
	}
	
	for(var r = 0; r < reelInfo.Length; r++){
		if(!reelInfo[r].spinning){
			if(reelInfo[r].reel.transform.position.y < reelInfo[r].targetPosition){
				reelInfo[r].reel.transform.position.y = Mathf.Lerp(reelInfo[r].reel.transform.position.y, reelInfo[r].targetPosition, reboundSpeed * Time.deltaTime);
			}
		}
	}
}

function GenerateNewReels(){
	StorePreviousFaceIcons();
	
	RemovePreviousReels();
	
	UpdateAmountOfReels();
	
	UpdateIconsPerReel();
	
	PopulateFaceIcons();
}


var thisGO : GameObject;
var mask:SpriteMask;

function Spin(){
    spinNow = false;

    

    //Debug.Log("startReel");
    


   
        DestroyImmediate(GetComponent (SpriteMask));
        DestroyImmediate(GetComponent (MeshRenderer));
        DestroyImmediate(GetComponent (MeshFilter));


    mask = thisGO.AddComponent.<SpriteMask>();
    mask.type = SpriteMask.Type.Rectangle;
   /* mask.size = new Vector2 (18.2f, 2.43f);
    mask.pivot = new Vector2 (0.5f, 3.86f);*/
	mask.size = maskSize;
    mask.pivot = maskPivot;


	if(!spinning){
		//print("spin");
		GenerateNewReels();
		spinning = true;

		if (muteAudio == false) {
		    GetComponent.<AudioSource>().volume = audioInfo[0].audioVolume;
		    GetComponent.<AudioSource>().rolloffMode = 1;
		    GetComponent.<AudioSource>().spatialBlend = 0;

		    if(audioInfo.Length > 1){
		        if(audioInfo[0].audioClip){
		            GetComponent.<AudioSource>().PlayOneShot(audioInfo[0].audioClip);
		        }
		    }
		}

		for(var i = 0; i < HowManyReels; i++){
		    reelInfo[i].spinning = true;
		    if (muteAudio == false) {
		        reelInfo[i].reel.GetComponent.<AudioSource>().volume = audioInfo[1].audioVolume;
		        reelInfo[i].reel.GetComponent.<AudioSource>().rolloffMode = 1;
		        reelInfo[i].reel.GetComponent.<AudioSource>().spatialBlend = 0;
		    }
		}
	}
}

function StorePreviousFaceIcons(){
	System.Array.Resize.<int>(prevFaceIcons, reelInfo.Length * 3);
	
	if(iconsSet){
		prevFaceIcons = faceIcons;
	}
}

function PopulateFaceIcons(){
	System.Array.Resize.<int>(faceIcons, reelInfo.Length * 3);
	System.Array.Resize.<int>(faceSprites, reelInfo.Length * 3);
	
	for(var a = 0; a < reelInfo.Length; a++){
		var extraIcons = a * iconsPerReelDifference;
		
		faceIcons[a * 3] = reelInfo[a].slotOrder[iconsPerReel + extraIcons - 1].ID;
		faceSprites[a * 3] = iconsPerReel + extraIcons - 1;
			
		faceIcons[a * 3 + 1] = reelInfo[a].slotOrder[iconsPerReel + extraIcons - 2].ID;
		faceSprites[a * 3 + 1] = iconsPerReel + extraIcons - 2;
			
		faceIcons[a * 3 + 2] = reelInfo[a].slotOrder[iconsPerReel + extraIcons - 3].ID;
		faceSprites[a * 3 + 2] = iconsPerReel + extraIcons - 3;
	}
}


function StopReel(key : int){
	var numberTmp : int = 0;
	reelInfo[key].spinning = false;
	
	if(audioInfo.Length > 1){
	    if(audioInfo[1].audioClip && muteAudio == false){
			reelInfo[key].reel.GetComponent.<AudioSource>().PlayOneShot(audioInfo[1].audioClip);
		}
	}
	
	if(key == HowManyReels-1){
	    var posNumber : int = 0;
		spinning = false;
		curSpinSpeed = 0;
		GetComponent.<AudioSource>().Stop();
		
		var payout : float;
		
	
		if(tempScatter > 0){
			scatterTimer = 2;
			scattersLeft += tempScatter;
			tempScatter = 0;
			if(tempBonusState == 0 && specialAudio && muteAudio == false){
				if(specialAudio.isPlaying){
					specialAudio.Stop();
				}
				specialAudio.volume = audioInfo[2].audioVolume;
				specialAudio.PlayOneShot(audioInfo[2].audioClip);
			}
		}
		
		
		
		if (winNow == true){ //force winning number
			for(var s = 0; s < reelInfo.Length; s++){
			    posNumber = reelInfo[s].slotOrder.Length-2;
			    numberTmp = numberToWin[(numberToWin.Length-1) - s];
			    //Debug.Log("ico number to set: " + numberTmp);
			   	reelInfo[s].slotOrder[posNumber].sprite.GetComponent.<SpriteRenderer>().sprite = iconInfo[numberTmp].sprite;
			   	winningNumber[(winningNumber.Length-1) - s] = numberTmp;
			   	
			   	if (MachineNumberControl != null){
			        MachineNumberControl.setDataNumber(s, numberTmp);
			    }
			}
			
			winNow = false;
		} else {
			for(var a = 0; a < reelInfo.Length; a++){
			    posNumber = reelInfo[a].slotOrder.Length-2;
			    //Debug.Log(reelInfo[a].slotOrder[posNumber].ID);
			    winningNumber[(winningNumber.Length-1) - a] = reelInfo[a].slotOrder[posNumber].ID;

			    if (MachineNumberControl != null){
			        MachineNumberControl.setDataNumber(a, reelInfo[a].slotOrder[posNumber].ID);
			    }
			}
		}
	}


	lastNumber.setNumber();
	SetLastNumber();
}



function SetLastNumber(){
    for(var a = 0; a < reelInfo.Length; a++){
        lastNumber.setDataNumber(a, winningNumber[a]);
    }
}



function RandomArrangement(values : float[]){
	for(var i = values.Length - 1; i > 0; i--){
		var r = Random.Range(0, i);
		var tmp = values[i];
		values[i] = values[r];
		values[r] = tmp;
	}
}



function UpdateAmountOfReels(){
    System.Array.Resize.<ReelInfo>(reelInfo, HowManyReels);

	for(var i = 0; i < HowManyReels; i++){
		reelInfo[i] = new ReelInfo();
		reelInfo[i].reel = new GameObject();
		reelInfo[i].reel.name = "Reel " + i.ToString();
		reelInfo[i].reel.transform.parent = ReelsConstainer.transform;
		reelInfo[i].reel.AddComponent.<AudioSource>();
		reelInfo[i].reel.GetComponent.<AudioSource>().playOnAwake = false;
	}
}

function UpdateIconsPerReel(){
    var tmpJump = jump;

    for(var a = 0; a < reelInfo.Length; a++){
        //Debug.Log("a: " + a + ".");

        tmpJump = jump * (a*1.441);
		
		var extraIcons = a * iconsPerReelDifference;
		System.Array.Resize.<SlotInfo>(reelInfo[a].slotOrder, iconsPerReel + extraIcons);

		for(var i = 0; i < iconsPerReel + extraIcons; i++){
			reelInfo[a].slotOrder[i] = new SlotInfo();
			var newSprite = new GameObject();
			newSprite.AddComponent.<SpriteRenderer>();
			newSprite.name = "Slot " + i.ToString();
			newSprite.layer = GameLayer;
			reelInfo[a].slotOrder[i].sprite = newSprite;
			reelInfo[a].slotOrder[i].sprite.transform.localScale = Vector3(iconSize, iconSize, 1);
			//reelInfo[a].slotOrder[i].sprite.sortingOrder = 1;

			if(iconInfo.Length > 0){
				var randomIcon : int;
				for(;;){
				    var dividend;
				    var randomValue;

				    if (a != 7 && a != 8 ) {
				        randomIcon = Random.Range(0, iconInfo.Length - 1);
				        dividend = parseFloat(iconInfo[randomIcon].frequency) + 1;
				        randomValue = Random.value;
				        if(1/dividend > randomValue) {
				            break;
				        }
				    }
                    if (a == 7){
				        randomIcon = Random.Range(0, 8);
				        dividend = parseFloat(iconInfo[randomIcon].frequency) + 1;
				        randomValue = Random.value;
				        if(1/dividend > randomValue) {
				            break;
				        }
                    }
                    if (a == 8){
				        randomIcon = Random.Range(5, 8);
				        dividend = parseFloat(iconInfo[randomIcon].frequency) + 1;
				        randomValue = Random.value;
				        if(1/dividend > randomValue) {
				            break;
				        }
				    }
				}

				if(!iconsSet){
				   // Debug.Log("randomIcon: " + randomIcon + ", i: " + i + ".");
					reelInfo[a].slotOrder[i].ID = randomIcon;
				}

				if(iconsSet){
					if(i < 3){
						var row = 2 - i;
						reelInfo[a].slotOrder[i].ID = prevFaceIcons[a * 3 + row];
					} else {
						reelInfo[a].slotOrder[i].ID = randomIcon;
					}
				}
				reelInfo[a].slotOrder[i].sprite.GetComponent.<SpriteRenderer>().sprite = iconInfo[reelInfo[a].slotOrder[i].ID].sprite;
				reelInfo[a].slotOrder[i].size = Vector2(reelInfo[a].slotOrder[i].sprite.GetComponent.<SpriteRenderer>().bounds.extents.x * 2, reelInfo[a].slotOrder[i].sprite.GetComponent.<SpriteRenderer>().bounds.extents.y * 2);
				
				reelInfo[a].slotOrder[i].sprite.transform.position = Vector3(a * IconsXYDimensions[0]/*reelInfo[a].slotOrder[i].size.x*/ - IconsXYDimensions[0]/*reelInfo[a].slotOrder[i].size.x*/ * jump, reelInfo[a].reel.transform.position.y + i * IconsXYDimensions[1]/*reelInfo[a].slotOrder[i].size.y*/, 0);
			    //reelInfo[a].slotOrder[i].sprite.transform.position = Vector3((a * reelInfo[a].slotOrder[i].size.x - reelInfo[a].slotOrder[i].size.x * tmpJump) + xOffset, (reelInfo[a].reel.transform.position.y + i * reelInfo[a].slotOrder[i].size.y), 0);
				reelInfo[a].slotOrder[i].sprite.GetComponent.<SpriteRenderer>().sortingOrder = 1;
			    //reelInfo[a].slotOrder[i].sprite.sortingOrder = 1;
			}
			newSprite.transform.parent = reelInfo[a].reel.transform;
		}
		//RepositionReel(a, -reelInfo[a].slotOrder[0].size.y);
		//var offset = iconsPerReel + extraIcons - 2;
		//reelInfo[a].targetPosition = reelInfo[a].slotOrder[0].size.y * (-offset) + reelsYOffset;
		RepositionReel(a, -/*reelInfo[a].slotOrder[0].size.y*/IconsXYDimensions[1]);
		var offset = iconsPerReel + extraIcons - 2;
		reelInfo[a].targetPosition = IconsXYDimensions[1]/*reelInfo[a].slotOrder[0].size.y*/ * (-offset) + reelsYOffset;
	}
	prevIconCount = iconsPerReel;
}

function RepositionReel(ID : int, yPos : float){
	reelInfo[ID].reel.transform.position.y = yPos;
}

function CreateLine(){
	generatingLine = true;
}

function RemovePreviousReels(){
	if(reelInfo.Length > 0){
		for(var info : ReelInfo in reelInfo){
			if(info.slotOrder.Length > 0){
				for(var i = 0; i < info.slotOrder.Length; i++){
					DestroyImmediate(info.slotOrder[i].sprite);
				}
			}
			DestroyImmediate(info.reel);
		}
	}
}



function OnGUI(){	
	GUI.color = Color.white;
}

@script ExecuteInEditMode()