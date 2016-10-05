//#pragma strict

public var debug 				: boolean = false;

public var IconsXYDimensions 	: float[];
public var buttonManager 		: buttonManager;
public var WinScreen 			: WinScreen;
public var spinNow 				: boolean = false;
public var GameLayer 			: int;
public var HowManyReels 		: int;
public var ReelYPos 			: float;
public var reelsYOffset 		: float;

@Range(0, 5)
public var testWinOnLines 		: int[];

public var onGuiActive 			: boolean = false;

//The coin shower particle effect
public var coinShower 			: ParticlesEmmiter;

//The special audio source.
public var specialAudio 		: AudioSource;

//The object shown when we have free spins
public var scatterObject 		: GameObject;
public var ReelsConstainer 		: GameObject;

//The text object that displays the free spin count
public var scatterCountObject 	: TextMesh;

//Toggle between two different pay line directions
enum PayoutOrder{fromLeft, fromRight};
public var payoutOrder 			: PayoutOrder;

//Amount of symbols on the first reel (Restricted between 3 and 100)
@Range(3, 100)
public var iconsPerReel 		: int;

//How many more symbols each reel should have compared to the previous (Restricted between 3 and 20)
@Range(3, 20)
public var iconsPerReelDifference : int;

//The size of each symbol (Restricted between 0 and 5)
@Range(0, 5)
public var iconSize 			: float;

//The speed at which the reels spin (Restricted between 50 and 200)
@Range(50, 400)
public var spinSpeed 			: float;

//The amount of bounce of a reel when it stops (Restricted between 0 and 5)
@Range(0, 5)
public var reboundAmount 		: int;

//The speed of a bounce of a reel when it stops (Restricted between 0 and 50)
@Range(0, 50)
public var reboundSpeed 		: int;

//The amount of free spins won if 3 symbols appear on screen (Restricted between 0 and 20)
@Range(0, 20)
public var scatterSize 			: int;

//The highest available bet from the list of bet amounts (Restricted between 3 and 17)
@Range(1, 10000)
public var maxBet 				: int;

//The divider for elements - how rare will be each of them (Restricted between 1 and 3)
@Range(1, 3)
public var chanceDivider 		: float = 2.0;

//How much will be winnig to looses
@Range(0, 1)
public var winRate 				: float = 0.8;

//All of the betting amounts from lowest to greatest
public var betAmounts 			: float[] = [0.1, 0.25, 0.5, 1.0, 2.0, 5.0, 10.0, 15.0, 20.0, 25.0, 50.0, 100.0, 150.0, 200.0, 250.0, 300.0, 500.0, 1000.0];

//An array of Symbol information
public var iconInfo 			: IconInfo[];

public var ScattersInfo 		: ScattersInfo[];


//An array of audio information
public var audioInfo 			: AudioInfo[];

//An array of Line information
public var linesInfo 			: LinesInfo;

//An array of button information
public var buttonInfo 			: ButtonInfo[];

//An array of display information
public var displayInfo 			: DisplayInfo[];

//An array of bonus information
public var bonusInfo 			: BonusInfo;

//An array of reel information (Hidden in inspector)
//@HideInInspector
public var reelInfo 			: ReelInfo[];

//The line parent object (Hidden in inspector)
//@HideInInspector
public var lines 				: GameObject;
public var howManyLines 		: int = 1;

//Stores bonus wins until all reels have stopped (Hidden in inspector)
@HideInInspector
public var tempBonusState 		: int = 0;

//Stores scatter wins until all reels have stopped (Hidden in inspector)
@HideInInspector
public var tempScatter 			: int = 0;

//A toggle to notify us that we are spinning (Hidden in inspector)
@HideInInspector
public var spinning 			: boolean = false;

@HideInInspector
public var currentBet 			: float = 1.0;


public var testForWinArray 		: Array = new Array();
public var testForWinArrayXY 	: Array = new Array();

//public var winType 				: int = -1; // 0-random, 1-min, 2-med, 3-max, -1-no instant win
public var valueToWin			: int = 0;
//public var winValues 			: int[]; // values to declare min, med and max win

//The variables below should not be changed and are not available in the inspector
private var userData 			: UserData;
private var linePositions 		: Vector3[] = new Vector3[15];
private var displayWinningEffects : boolean;
private var scatterSpinning 	: boolean;
private var showPayTable 		: boolean;
private var inBonusGame 		: boolean;
private var iconsSet 			: boolean;
private var prevIconCount 		: int;
private var scattersLeft 		: int;
private var bonusWinnings 		: float;
private var lineCount 			: int;
public var prevFaceIcons 		: int[];
public var faceIcons 			: int[];
public var faceSpritesName  	: String[];
public var faceSprites 		: int[];
private var curSpinSpeed 		: float;
private var scatterTimer 		: float;
private var effectsTimer 		: float;
private var totalPayout 		: float;
private var targetPos 			: float;
private var currentCredit 		: float = 0.0;
private var fadeValue 			: float = 1;
private var picks 				: int = 0;
private var jump				: float = 1.5; //i dont remember was it is... maybe for positioning?
private var a					: int = 0;
private var y					: int = 0;
private var tempInt 			: int;
public var linesPoints 		: int[];
public var slotsMatrix 		: int[];

//----------------------------------------------------------Update---------------------------------------------------------------------------
function Update(){
    /*if (spinNow == true){
        spinning = false;
        Spin(currentBet);
    }*/
	
    if(prevIconCount != iconsPerReel){ //If we changed the of symbols per reel
	    GenerateNewReels(); //Generate entirely new reels
	}
		
    for(var obj : SpriteRenderer in bonusInfo.fadeObjects){  //For all of our fading objects
	    if(obj != null){
		    if(obj.color.a != fadeValue){ //If we are supposed to fade in or out
			    obj.color.a = Mathf.MoveTowards(obj.color.a, fadeValue, Time.deltaTime); //Fade in or out
		    }
        }
    }
	
	if(inBonusGame){ //If we are in a bonus game
	    if(bonusInfo.bonusBackground.GetComponent.<AudioSource>().volume != 1 - fadeValue){ //If our bonus game volume has not faded in
	        bonusInfo.bonusBackground.GetComponent.<AudioSource>().volume = Mathf.MoveTowards(bonusInfo.bonusBackground.GetComponent.<AudioSource>().volume, 1 - fadeValue, Time.deltaTime); //Fade in the bonus game volume
		}
	}
	
	if(spinning){ //If we are supposed to be spinning
	    curSpinSpeed = Mathf.Lerp(curSpinSpeed, spinSpeed, Time.deltaTime); //Increase our spin speed over time
		
		for(var i = 0; i < HowManyReels; i++){ //For all the reels
		    if(reelInfo[i].spinning){ //If this reel is supposed to spin
			    reelInfo[i].reel.transform.position.y = Mathf.MoveTowards(reelInfo[i].reel.transform.position.y, reelInfo[i].targetPosition - reboundAmount, curSpinSpeed * Time.deltaTime); //Move this reel as fast as the spin speed
			}
			
			if(reelInfo[i].reel.transform.position.y == reelInfo[i].targetPosition - reboundAmount){ //If our reels position is at it's final destination
			    if(reelInfo[i].spinning){ //If we are still spinning
				    StopReel(i); //Stop this reel
				}
			}
		}
	}
	
	if(displayWinningEffects){ //If we are supposed to be displaying our winning effects
		if(userData.fluxCoins != userData.coins && coinShower.enableEmission == false){ //If our coins should be incrementing
		    coinShower.startCoinParticles("coin_standard"); //Turn on our coin shower effect
		}
		
		if(userData.fluxCoins == userData.coins && coinShower.enableEmission == true){ //If our coins are not supposed to increment
		    coinShower.stopCoinParticles(); //Turn off our coin shower effect
		}
		
		effectsTimer += Time.deltaTime; //Increment our effects timer
		
		for(var line : LineInfo in linesInfo.lineInfo){ //For all of our lines
			if(line.winner){ //If we have a line that we have won on
				if(effectsTimer < 0.75 && !line.lineParent.activeSelf){	//If the effects timer is less than 0.75 and we can't see our line
					line.lineParent.SetActive(true);	//Turn on our line
				}
				
				if(effectsTimer > 0.75){ //If our effects timer is greater than 0.75
					if(line.lineParent.activeSelf) {	//If we can see our line
						line.lineParent.SetActive(false);	//Turn off our line
					}
					
					if(effectsTimer >= 1) {	//If the effects timer is greater or equal to 1
						effectsTimer = 0.0;	//Reset our effects timer and restart
					}
				}
			}
		}
	}
	
	if(scattersLeft > 0){	//If we have free spins
		if(scatterCountObject.text != scattersLeft.ToString()){ //If our free spin text is not the same as our free spins
			scatterCountObject.text = scattersLeft.ToString(); //Make our free spin text the same as our free spins
		}
		
		if(!inBonusGame && tempBonusState == 0){ //If we are not in a bonus game and we not going to get a bonus game
			EngageScatters();	//Continue our free spins
		}
	}
	
	for(var r = 0; r < reelInfo.Length; r++){
		if(!reelInfo[r].spinning){
			if(reelInfo[r].reel.transform.position.y < reelInfo[r].targetPosition){
				reelInfo[r].reel.transform.position.y = Mathf.Lerp(reelInfo[r].reel.transform.position.y, reelInfo[r].targetPosition, reboundSpeed * Time.deltaTime); //Create a bounce effect to stop at our final destination
			}
		}
	}
}
//----------------------------------------------------------Update---------------------------------------------------------------------------
//----------------------------------------------------------startReel------------------------------------------------------------------------
function startReel(){
    spinNow = true;
}
//----------------------------------------------------------startReel------------------------------------------------------------------------
//----------------------------------------------------------CheckForAnimatedIcons------------------------------------------------------------
function CheckForAnimatedIcons(r : int, s : int){ //////////Check a reel for animated symbols//////////
    var info = reelInfo[r].slotOrder[s];
    	
    	if (debug == true) Debug.Log("CheckForAnimatedIcons r - " + r + " s - " + s + " info.canAnimate - " + info.canAnimate);

	if(info.canAnimate){ //If this symbol is a winner
		if(iconInfo[info.ID].spriteAnimation.Length > 0){ //If we have an animation for this symbol
			for(var i = 0; i < iconInfo[info.ID].spriteAnimation.Length; i++){ //coinShower.startCoinParticles("coin_standard");
				if(iconInfo[info.ID].spriteAnimation[i] != null){ //If this image in the animation exists
					if(info.sprite){ //If we have a sprite to change
						info.sprite.GetComponent.<SpriteRenderer>().sprite = iconInfo[info.ID].spriteAnimation[i]; //Change the sprite to the next clip in the animation
					}
				}
				
				if(!spinning){
					yield WaitForSeconds(iconInfo[info.ID].animatedFramesPerSecond);
					
					if(!spinning){ //If still not spinning
						if(i == iconInfo[info.ID].spriteAnimation.Length - 1){ //If we are at the last frame of the animation
							info.sprite.GetComponent.<SpriteRenderer>().sprite = iconInfo[info.ID].spriteAnimation[0]; //Return the sprite back to its original image
							info.canAnimate = false; //And tell the symbol that we should no longer animate
						}
					}
				}
			}
		}
	}
}
//----------------------------------------------------------CheckForAnimatedIcons------------------------------------------------------------
//----------------------------------------------------------CheckForAnimatedIcons------------------------------------------------------------
function UpdateText(){//////////Update our text information//////////
	for(var info : DisplayInfo in displayInfo){	//For all of our text objects
		gameObject.SendMessage("Update" + info.functionType.ToString(), info.textObject);	//Update the information for this text
	}
}
//----------------------------------------------------------CheckForAnimatedIcons------------------------------------------------------------
//----------------------------------------------------------UpdateLineCount------------------------------------------------------------------
function UpdateLineCount(text : TextMesh){//////////Update our line text//////////
	text.text = lineCount.ToString();	//Show our new line text
}
//----------------------------------------------------------UpdateLineCount------------------------------------------------------------------
//----------------------------------------------------------UpdateBetAmount------------------------------------------------------------------
function UpdateBetAmount(text : TextMesh){//////////Update our bet text//////////
	text.text = currentBet.ToString();
}
//----------------------------------------------------------UpdateBetAmount------------------------------------------------------------------
//----------------------------------------------------------PayTable-------------------------------------------------------------------------
function PayTable(){//////////Paytable function//////////
	showPayTable = true; //Display the paytable
}
//----------------------------------------------------------PayTable-------------------------------------------------------------------------
//----------------------------------------------------------UpdateTotalWin-------------------------------------------------------------------
function UpdateTotalWin(text : TextMesh){//////////Update our Total Win information//////////
	if(totalPayout == 0){	//If we did not win anything
		text.text = "";	//Don't show a winning amount
	} else {	//If we did win something
		text.text = totalPayout.ToString();	//Show our winning amount
	}
}
//----------------------------------------------------------UpdateTotalWin-------------------------------------------------------------------
//----------------------------------------------------------UpdateTotalBet-------------------------------------------------------------------
function UpdateTotalBet(text : TextMesh){//////////Update our total bet//////////
	var totalBet = currentBet * lineCount;
	
		text.text = totalBet.ToString();
}
//----------------------------------------------------------UpdateTotalBet-------------------------------------------------------------------
//----------------------------------------------------------DarkenButtons--------------------------------------------------------------------
function DarkenButtons(){//////////Darkening buttons to indicate inactive//////////
	//For all of our buttons
	for(var button : ButtonInfo in buttonInfo){
		//If this button is not paytable, lobby or settings
		if(button.functionType != button.FunctionType.PayTable && button.functionType != button.FunctionType.Lobby && button.functionType != button.FunctionType.Settings){
			//If we have a sprite for this button
			if(button.sprite != null){
				//If the button is not grayed
				if(button.sprite.GetComponent.<SpriteRenderer>()!= null){
					if(button.sprite.GetComponent.<SpriteRenderer>().material.color != Color.gray){
						//Gray out this button
						button.sprite.GetComponent.<SpriteRenderer>().material.color = Color.gray;
					}
				}
			}
		}
	}
}
//----------------------------------------------------------DarkenButtons--------------------------------------------------------------------
//----------------------------------------------------------LightenButtons-------------------------------------------------------------------
function LightenButtons(){ //////////Lighten buttons to indicate that it's active//////////
	//For all of the buttons
	for(var button : ButtonInfo in buttonInfo){
		//If we have a sprite for this button
		if(button.sprite != null){
			//If the button is not lightened
			if(button.sprite.GetComponent.<SpriteRenderer>()!= null){
				if(button.sprite.GetComponent.<SpriteRenderer>().material.color != Color.white){
					//Lighten this button
					button.sprite.GetComponent.<SpriteRenderer>().material.color = Color.white;
				}
			}
		}
	}
}
//----------------------------------------------------------LightenButtons-------------------------------------------------------------------
//----------------------------------------------------------Spin-----------------------------------------------------------------------------
function Spin(Deduction : int){ //////////Spins the reels and deducts the price//////////
	var currentCredits			: int = 0;
	
    spinNow = false;
    hideAllLines();

	//If we are not spinning, in a bonus game, in a free spin and we have user information
		//print("spinning " + spinning + " inBonusGame " + inBonusGame + " scatterSpinning " + scatterSpinning + " userData " + userData);
	if(!spinning && !inBonusGame && !scatterSpinning && userData){
		if(Deduction <= userData.coins){	//If the user has enough coins to bet this amount
			effectsTimer = 0;	//Reset the effects counter
			totalPayout = 0.0;	//Reset total payout
			displayWinningEffects = false;	//Turn off winning effects
			coinShower.stopCoinParticles(); 	//Turn off our coin shower
			//DarkenButtons();	//Darken the buttons
			UpdateText();	//Update the information on our machine
			
				if(audioInfo.Length > 0){	//If the audio information has atleast 1 slot open
					if(audioInfo[0].audioClip){	//If the first slot has an audio clip in it
						GetComponent.<AudioSource>().volume = audioInfo[0].audioVolume;	//Adjust the volume to that which we specified
						GetComponent.<AudioSource>().PlayOneShot(audioInfo[0].audioClip);	//And play the audio clip one time
					}
				}
			
			currentCredits = userData.coins - Deduction;	//Deduct the total bet from the users coins
			buttonManager.subFakeCredits(Deduction);
			
			//And do not increment it over time
			//userData.fluxCoins = userData.coins;
			//buttonManager.setNumbers(0, "0", "win");
			//buttonManager.setNumbers(0, userData.getValue("Coins").ToString(), "coins");
			GenerateNewReels();	//Generate entirely new reels
			CalculatePayout();	//Calculate the payout of this spin
			spinning = true;	//Tell our machine to spin
			
				for(var i = 0; i < HowManyReels; i++){ //For all the reels
					reelInfo[i].spinning = true;	//Tell the reels to spin
					reelInfo[i].reel.GetComponent.<AudioSource>().volume = audioInfo[1].audioVolume;	//Set the volume to our new reels to that which we specified
					reelInfo[i].reel.GetComponent.<AudioSource>().rolloffMode = 1;	//Remove fade over time
					reelInfo[i].reel.GetComponent.<AudioSource>().spatialBlend = 0;	//And let us here the audio clip no matter where the reel is
				}
		}
	}
}
//----------------------------------------------------------Spin-----------------------------------------------------------------------------
//----------------------------------------------------------testForWin-----------------------------------------------------------------------
/*function testForWin(){ //IT WILL TEST if we have double or more this same symbols in line, if yes - then run a function to test if this is money win
    var wins 						: Array = new Array();
    var step 						: int = 0;
    var i 							: int = 0;
    var coord 						: String;
    var cX 							: int;
    var cY 							: int;

    for(var j = 0; j < (testWinOnLines[1]-testWinOnLines[0]+1); j++){
        if(payoutOrder == 0){ //checking from left to right
            wins[step] = new Array(); 
            wins[step][0] = "null";
            wins[step][1] = "0";
            i = 0;

            for(var x = 0; x < HowManyReels-1; x++){
                if(testForWinArray[x][j] == testForWinArray[x+1][j]){ //if two elements in a row are the same , counter is going to grow and name of this element is saved in a array
                    i++;
                    textSplit = testForWinArrayXY[x][j].Split(","[0]);
                        cX = int.Parse(textSplit[0]);
                        cY = int.Parse(textSplit[1]);
                    reelInfo[cX].slotOrder[cY].canAnimate = true;

                    textSplit = testForWinArrayXY[x+1][j].Split(","[0]);
                        cX = int.Parse(textSplit[0]);
                        cY = int.Parse(textSplit[1]);
                    reelInfo[cX].slotOrder[cY].canAnimate = true;

                    wins[step][0] = testForWinArray[0][j];
                    wins[step][1] = i;
                } else if ((testForWinArray[x][j] != testForWinArray[x+1][j]) && (i < 1)){ //if there are not at leas one pair then we are try next element
                    i = 0;
                    break;
                }
            }
            step++;
        } else { //checking from right to left
            wins[step] = new Array();
            wins[step][0] = "null";
            wins[step][1] = "0";
            i = 0;

            for(var y = HowManyReels; y > 0; y--){
                if(testForWinArray[y][j] == testForWinArray[y-1][j]){ //if two elements in a row are the same , counter is going to grow and name of this element is saved in a array
                    i++;

                    textSplit = testForWinArrayXY[y][j].Split(","[0]);
                        cX = int.Parse(textSplit[0]);
                        cY = int.Parse(textSplit[1]);
                    reelInfo[cX].slotOrder[cY].canAnimate = true;

                    textSplit = testForWinArrayXY[y+1][j].Split(","[0]);
                        cX = int.Parse(textSplit[0]);
                        cY = int.Parse(textSplit[1]);
                    reelInfo[cX].slotOrder[cY].canAnimate = true;

                    wins[step][0] = testForWinArray[0][j];
                    wins[step][1] = i;
                } else if ((testForWinArray[y][j] != testForWinArray[y-1][j]) && (i < 1)){ //if there are not at leas one pair then we are try next element
                    i = 0;
                    break;
                }
            }
            step++;
        }
    }

   for (var w = 0; w < wins.length; w++){
       	 	if (debug == true) Debug.Log(wins[w][0] + " - " + wins[w][1]);
       	 	
        testIfIconWon(wins[w][0].ToString(), wins[w][1].ToString(), w); //sending our maybe winnning array to test if we have any values on this elements
   }
}*/
//----------------------------------------------------------testForWin-----------------------------------------------------------------------
//----------------------------------------------------------testIfIconWon--------------------------------------------------------------------
/*function testIfIconWon(nameIco : String, countIco : String, line : int){
    var tmpName;
    var tmpCash;
    var winCash = "";
    var iconType = "";

    for(var x = 0; x < iconInfo.length; x++){
        tmpName = iconInfo[x].Name;
        if(tmpName == nameIco){
            if(countIco == "1"){
                tmpCash = iconInfo[x].xTwo * betAmounts[currentBet];
                winCash = tmpCash.ToString();
            } else if(countIco == "2"){
                tmpCash = iconInfo[x].xThree * betAmounts[currentBet];
                winCash = tmpCash.ToString();
            } else if(countIco == "3"){
                tmpCash = iconInfo[x].xFour * betAmounts[currentBet];
                winCash = tmpCash.ToString();
            } else if(countIco == "4"){
                tmpCash = iconInfo[x].xFive * betAmounts[currentBet];
                winCash = tmpCash.ToString();
            } 

            iconType = iconInfo[x].iconType.ToString();
            displayWinningEffects = true;
            
            	if (debug == true) Debug.Log("HIT!!!! - you won: " + winCash.ToString() + " for countIco: " + countIco + " and: " + tmpName + " iconType: " + iconType + " currentBet: " + betAmounts[currentBet] + ".");

            //userData.coins += System.Int32.Parse(winCash);
            //userData.fluxCoins = userData.coins;//And do not increment it over time

            //buttonManager.setNumbers(0, userData.getValue("Coins").ToString(), "coins");
            //buttonManager.setNumbers(0, winCash, "win");

            if(System.Int32.Parse(winCash) > 0){
                var lineCount:int = 0;

                for(var lineReal : LineInfo in linesInfo.lineInfo){ //For all of our lines
                    if (lineCount == (2-line)){
                        lineReal.lineParent.SetActive(true);
                    }
                    lineCount++;
                } 
                
        		if (debug == true) Debug.Log("cos po wygraniu i dodanie kwoty");
        	
                        if(iconInfo[x].xThree >= winValues[2]){
                            	if (debug == true) Debug.Log("big");
                            
                            WinScreen.UltraWin("");
                        } else if((iconInfo[x].xThree <= winValues[2]) && (iconInfo[x].xThree >= winValues[1])){
                            	if (debug == true) Debug.Log("med");
                            	
                            WinScreen.MegaWin("");*/
                            /*case "revolver"
                            case "shotgun_shells"
                            case "car"*/

                            //WinScreen.MegaWin (msg);
                       /* } else if((iconInfo[x].xThree <= winValues[1]) && (iconInfo[x].xThree >= winValues[0])){
                            	if (debug == true) Debug.Log("low");
                            
							WinScreen.BigWin("");*/
                            /*case "dice"
                            case "cuffs"
                            case "cash"
                            case "badge"*/

                            //WinScreen.BigWin (msg);
                    /*    }
            } else {
                lineCount = 0;
            }
        }
    }

    userData.updateUserData();
}*/
//----------------------------------------------------------testIfIconWon--------------------------------------------------------------------
//----------------------------------------------------------CalculatePayout------------------------------------------------------------------
function CalculatePayout(){
  
}
//----------------------------------------------------------CalculatePayout------------------------------------------------------------------
//----------------------------------------------------------StopReel-------------------------------------------------------------------------
function StopReel(key : int){
	reelInfo[key].spinning = false;
	
	if(audioInfo.Length > 1){
		if(audioInfo[1].audioClip){
			reelInfo[key].reel.GetComponent.<AudioSource>().PlayOneShot(audioInfo[1].audioClip);
		}
	}
	
	if(key == HowManyReels-1){
		spinning = false;
		curSpinSpeed = 0;
		GetComponent.<AudioSource>().Stop();
		
		var payout 				: float;
		
		for(var line : LineInfo in linesInfo.lineInfo){
			if(line.winningValue > 0.0){
				payout += line.winningValue;
			}
			
	        if(line.winner){
				for(var i = 0; i < line.winningIconIDs.Length; i++){
					if(payoutOrder == 0){ //from left to right
						reelInfo[i].slotOrder[reelInfo[i].slotOrder.Length - 1 - line.winningIconIDs[i]].canAnimate = true;
					}
					if(payoutOrder == 1){ //from right to left
						reelInfo[(HowManyReels-1) - i].slotOrder[reelInfo[(HowManyReels-1) - i].slotOrder.Length - 1 - line.winningIconIDs[i]].canAnimate = true;
					}
				}
				line.winningIconIDs = new int[0];
			}
		}
		if(tempScatter > 0){
			scatterTimer = 2;
			scattersLeft += tempScatter;
			tempScatter = 0;
			if(tempBonusState == 0 && specialAudio){
				if(specialAudio.isPlaying){
					specialAudio.Stop();
				}
				specialAudio.volume = audioInfo[2].audioVolume;
				specialAudio.PlayOneShot(audioInfo[2].audioClip);
			}
		}
		if(tempBonusState > 0){
			picks = tempBonusState;
			BonusFade();
		}
		if(payout > 0.0){
			AddCoins(payout, true);
			displayWinningEffects = true;
		}
		if(scattersLeft == 0){
			//LightenButtons();
		}
	

		//testForWin(); //testing for win - new function./*****************************************************************************************************************************/

		for(var a = 0; a < reelInfo.Length; a++){
		    //Debug.Log("reelInfo[a].slotOrder.Length - " + reelInfo[a].slotOrder.Length);
		    // testWinOnLines
		    /*for(var b = 0; b < (testWinOnLines[1]-testWinOnLines[0]); b++){
		        CheckForAnimatedIcons(a, reelInfo[a].slotOrder.Length - (testWinOnLines[b]+1));
		    }*/
		    CheckForAnimatedIcons(a, reelInfo[a].slotOrder.Length - 2);
		    CheckForAnimatedIcons(a, reelInfo[a].slotOrder.Length - 3);
		    CheckForAnimatedIcons(a, reelInfo[a].slotOrder.Length - 4);
		}

		UpdateText();
	}
}
//----------------------------------------------------------StopReel-------------------------------------------------------------------------
//----------------------------------------------------------EngageScatters-------------------------------------------------------------------
function EngageScatters(){
	if(!scatterObject.activeSelf){
		scatterObject.SetActive(true);
	}
	if(!spinning && !inBonusGame){
		scatterTimer -= Time.deltaTime;
	}
	if(spinning && scatterTimer != 3){
		scatterTimer = 3;
	}
	if(scatterTimer < 0){
		Spin(0);
		scatterTimer = 3;
		scattersLeft -= 1;
		if(scattersLeft == 0){
			scatterObject.SetActive(false);
		}
	}
}
//----------------------------------------------------------EngageScatters-------------------------------------------------------------------
//----------------------------------------------------------BonusFade------------------------------------------------------------------------
function BonusFade(){
	inBonusGame = true;
	if(scatterObject.activeSelf){
		scatterObject.SetActive(false);
	}
	bonusInfo.bonusAmountText.text = tempBonusState.ToString();
	bonusInfo.bonusInfoParent.SetActive(true);
	RandomArrangement(bonusInfo.winningAmounts);
	
	if(GetComponent.<AudioSource>().isPlaying){
		GetComponent.<AudioSource>().Stop();
	}
	if(audioInfo.Length > 3){
		specialAudio.PlayOneShot(audioInfo[3].audioClip);
	}
	bonusInfo.bonusText.GetComponent.<Animation>().Play("ShowBonusWord");
	
	yield WaitForSeconds(3.1);
	
	tempBonusState = 0;
	displayWinningEffects = false;
	coinShower.stopCoinParticles(); 
	for(var a = 0; a < linesInfo.lineInfo.Length; a++){
		linesInfo.lineInfo[a].lineParent.SetActive(false);
	}
	fadeValue = 0;
	userData.fluxCoins = userData.coins;
	for(var reel : ReelInfo in reelInfo){
		reel.reel.SetActive(false);
	}
	if(audioInfo.Length > 4){
		specialAudio.PlayOneShot(audioInfo[4].audioClip);
	}
	bonusInfo.bonusBackground.GetComponent.<Animation>().Play("BonusStart");
	if(audioInfo.Length > 5){
		bonusInfo.bonusBackground.GetComponent.<AudioSource>().loop = true;
		bonusInfo.bonusBackground.GetComponent.<AudioSource>().clip = audioInfo[5].audioClip;
		bonusInfo.bonusBackground.GetComponent.<AudioSource>().Play();
	}
	for(var i = 0; i < bonusInfo.bonusItemInfo.Length; i++){
		bonusInfo.bonusItemInfo[i].object.GetComponent.<Renderer>().enabled = true;
		bonusInfo.bonusItemInfo[i].object.GetComponent.<Collider>().enabled = true;
		bonusInfo.bonusItemInfo[i].object.GetComponent.<BonusObjectValue>().Value = bonusInfo.winningAmounts[i] * betAmounts[currentBet];
	}
}
//----------------------------------------------------------BonusFade------------------------------------------------------------------------
//----------------------------------------------------------RandomArrangement----------------------------------------------------------------
function RandomArrangement(values : float[]){
	for(var i = values.Length - 1; i > 0; i--){
		var r = Random.Range(0, i);
		var tmp = values[i];
		values[i] = values[r];
		values[r] = tmp;
	}
}
//----------------------------------------------------------RandomArrangement----------------------------------------------------------------
//----------------------------------------------------------CheckPicks-----------------------------------------------------------------------
function CheckPicks(){
	if(picks == 0){
		yield WaitForSeconds(1);
		EndBonusGame();
	}
}
//----------------------------------------------------------CheckPicks-----------------------------------------------------------------------
//----------------------------------------------------------EndBonusGame---------------------------------------------------------------------
function EndBonusGame(){
	picks = 0;
	bonusInfo.bonusInfoParent.SetActive(false);
	for(var i = 0; i < bonusInfo.bonusItemInfo.Length; i++){
		bonusInfo.bonusItemInfo[i].object.GetComponent.<Renderer>().enabled = false;
		bonusInfo.bonusItemInfo[i].object.GetComponent.<Collider>().enabled = false;
		bonusInfo.bonusItemInfo[i].object.GetComponent.<BonusObjectValue>().displayValue = true;
	}
	
	yield WaitForSeconds(2);
	
	for(var j = 0; j < bonusInfo.bonusItemInfo.Length; j++){
		bonusInfo.bonusItemInfo[j].object.GetComponent.<BonusObjectValue>().displayValue = false;
		bonusInfo.bonusItemInfo[j].valueOpacity = 0;
	}
	/*if(bonusInfo.bonusBackground.animation["BonusEnd"]){
		bonusInfo.bonusBackground.animation.Play("BonusEnd");
	}*/
	if(audioInfo.Length > 7){
		if(audioInfo[7].audioClip){
			specialAudio.GetComponent.<AudioSource>().volume = audioInfo[7].audioVolume;
			specialAudio.GetComponent.<AudioSource>().PlayOneShot(audioInfo[7].audioClip);
		}
	}
	
	inBonusGame = false;
	
	yield WaitForSeconds(1);
	
	fadeValue = 1.0;
	AddCoins(bonusWinnings, true);
	displayWinningEffects = true;
	bonusWinnings = 0;
	UpdateText();
	
	yield WaitForSeconds(1);
	
	if(bonusInfo.bonusBackground.GetComponent.<AudioSource>().isPlaying){
		bonusInfo.bonusBackground.GetComponent.<AudioSource>().Stop();
	}
	
	for(var reel : ReelInfo in reelInfo){
		reel.reel.SetActive(true);
	}
}
//----------------------------------------------------------EndBonusGame---------------------------------------------------------------------
//----------------------------------------------------------retRandInt-----------------------------------------------------------------------
function retRandInt(max : int, min : int) : int{
    var returnValue 			: int = 0;

        returnValue= Random.Range(min, max);    

    return returnValue;
}
//----------------------------------------------------------retRandInt-----------------------------------------------------------------------
//----------------------------------------------------------RepositionReel-------------------------------------------------------------------
function RepositionReel(ID : int, yPos : float){
	reelInfo[ID].reel.transform.position.y = yPos;
}
//----------------------------------------------------------RepositionReel-------------------------------------------------------------------
//----------------------------------------------------------IncreaseLines--------------------------------------------------------------------
function IncreaseLines(){
    if(!spinning && !inBonusGame && !scatterSpinning){
	        if(lineCount < linesInfo.lineInfo.Length){
	            lineCount += 1;
	        } else {
	            lineCount = 1;
	        }
        UpdateText();
    }
}
//----------------------------------------------------------IncreaseLines--------------------------------------------------------------------
//----------------------------------------------------------DecreaseLines--------------------------------------------------------------------
function DecreaseLines(){
    if(!spinning && !inBonusGame && !scatterSpinning){
	        if(lineCount > 1){
	            lineCount -= 1;
	        } else {
	            lineCount = linesInfo.lineInfo.Length;
	        }
        UpdateText();
    }
}
//----------------------------------------------------------DecreaseLines--------------------------------------------------------------------
//----------------------------------------------------------AddCoins-------------------------------------------------------------------------
function AddCoins(amount : float, increment : boolean){
		if(buttonManager){
			buttonManager.addFakeCredits(amount);
		}
		
	totalPayout += amount;
}
//----------------------------------------------------------AddCoins-------------------------------------------------------------------------
//----------------------------------------------------------currentCreditDisplay-------------------------------------------------------------
function currentCreditDisplay(){
	currentCredit = currentCredit + totalPayout;
	totalPayout = 0.0;
	buttonManager.displayInfoUpadate("BetAmount", currentBet.ToString());
	UpdateText();
}
//----------------------------------------------------------currentCreditDisplay-------------------------------------------------------------
//----------------------------------------------------------IncreaseBet----------------------------------------------------------------------
function IncreaseBet(){
    if(!spinning && !inBonusGame && !scatterSpinning){
    		if (userData.coins >= currentBet + 1){
		        if(currentBet == maxBet){
		        	if (userData.coins >= maxBet){
		            	currentBet = maxBet;
		            }
		        } else {
		            currentBet += 1;
		        }
	        } else {
	        	currentBet = userData.coins;
	        }
	        
        buttonManager.displayInfoUpadate("BetAmount", currentBet.ToString());
        UpdateText();
    }
}
//----------------------------------------------------------IncreaseBet----------------------------------------------------------------------
//----------------------------------------------------------DecreaseBet----------------------------------------------------------------------
function DecreaseBet(){
    if(!spinning && !inBonusGame && !scatterSpinning){
	        if(currentBet == 1){
	            currentBet = 1;
	        } else {
	            currentBet -= 1;
	        }
	        
        buttonManager.displayInfoUpadate("BetAmount", currentBet.ToString());
        UpdateText();
    }
}
//----------------------------------------------------------DecreaseBet----------------------------------------------------------------------
//----------------------------------------------------------MaxBet---------------------------------------------------------------------------
function MaxBet(){ //////////Adjusts the bet to max and spins//////////
	if(!spinning && !inBonusGame && !scatterSpinning){ //If we are not spinning, in a bonus game or in a free spin
	    lineCount = linesInfo.lineInfo.Length;//Maximize the line count
		currentBet = maxBet; //Maximize the bet
		Spin(lineCount * currentBet); //And spin with the max amount
	}
}
//----------------------------------------------------------MaxBet---------------------------------------------------------------------------
//----------------------------------------------------------OnGUI----------------------------------------------------------------------------
function OnGUI(){
    //Access all of the lines information
    if(onGuiActive == true){
        for(var l = 0; l < linesInfo.lineInfo.Length; l++){
            	GUI.skin.label.alignment = TextAnchor.MiddleLeft;  //Align the words on the middle left
            
            var screenPos : Vector3 = GetComponent.<Camera>().WorldToScreenPoint(linesInfo.lineInfo[l].lineBoxPosition);  //Store the screen position of the lineBlock
            var guiPos : Vector2 = Vector2(screenPos.x, (Screen.height - screenPos.y) + ReelYPos); //And convert the screen position to gui position
          
	            GUI.color = linesInfo.lineInfo[l].thisColor;  //Make sure that the color is the same as we specified
	            GUI.DrawTexture(Rect(guiPos.x - 15, guiPos.y - 10, 30, 20), linesInfo.lineBlock); //And draw the lineBlock image
           
            var thisLineNumber : int = l + 1; //Then add 1 to our line number so that there is no line 0
           
	            GUI.color = Color.black; //Change the color to black
	            GUI.skin.label.alignment = TextAnchor.MiddleCenter; //Align the words in the center
	            GUI.Label(Rect(guiPos.x - 25, guiPos.y - 25, 50, 50), thisLineNumber.ToString()); //And display the line number on top of the lineBlock image
        }
    }
	
	if(inBonusGame){
		for(var obj : BonusItemInfo in bonusInfo.bonusItemInfo){ //Access all of our clickable bonus objects
			if(obj.object){
				var objScript = obj.object.GetComponent.<BonusObjectValue>(); //And store the script that is attached to it
				
				if(objScript.displayValue){ //If our stored script says that we should display how much it is worth
					var itemScreenPos : Vector3 = bonusInfo.bonusCamera.WorldToScreenPoint(obj.object.transform.position); //Store the position of the clickable object in screen space
					var itemGuiPos : Vector2 = Vector2(itemScreenPos.x + 15, Screen.height - itemScreenPos.y); //And convert that position into gui space
				
						obj.valueOpacity = Mathf.Lerp(obj.valueOpacity, 1, Time.deltaTime);	//Change our fade value
						GUI.color = new Color(1, 1, 1, obj.valueOpacity); //And fade the text
						GUI.Label(Rect(itemGuiPos.x - 25, itemGuiPos.y - 15, 50, 30), objScript.Value.ToString()); //And display our text with our faded amount
				}
			}
		}
	}
	GUI.color = Color.white;
}
//----------------------------------------------------------OnGUI----------------------------------------------------------------------------
//----------------------------------------------------------showLine-------------------------------------------------------------------------
function showLine(ID : int, segments : int){
    var step 					: int = 0;

    for(var line : LineInfo in linesInfo.lineInfo){ //For all of our lines
        if(ID == step){
            line.lineParent.SetActive(true);
        }
        step++;
    }    
}
//----------------------------------------------------------showLine-------------------------------------------------------------------------
//----------------------------------------------------------hideAllLines---------------------------------------------------------------------
function hideAllLines(){
    for(var line : LineInfo in linesInfo.lineInfo){ //For all of our lines
       line.lineParent.SetActive(false);
    }    
}
//----------------------------------------------------------hideAllLines---------------------------------------------------------------------















//**************************************************************newAlgoritm******************************************************************

//----------------------------------------------------------Awake----------------------------------------------------------------------------
function Awake(){
    if(GameObject.FindWithTag("Player")){ 
        userData = GameObject.FindWithTag("Player").GetComponent.<UserData>(); 
    }

    for (var h = 0; h < HowManyReels; h++){
        testForWinArray[h] = new Array();
        testForWinArrayXY[h] = new Array();
    }
	
	    scatterObject.SetActive(false); //Turn off our scatter display
	    bonusInfo.bonusInfoParent.SetActive(false); //Turn off our bonus information display
	    coinShower.stopCoinParticles();  //Turn off the coin shower effect
	    GenerateNewReels(); //Generate entirely new reels
	
	
    for(var a = 0; a < reelInfo.Length; a++){ //For all the reels
        RepositionReel(a, reelInfo[a].targetPosition); //Position each reel at the starting position
	}
	
	    lineCount = linesInfo.lineInfo.Length; //Start with max lines
	    UpdateText(); //Update interface text
	    iconsSet = true; //Notify the system that we are ready
	    fadeValue = 1; //Ensure we can see the reels
	    hideAllLines();
}
//----------------------------------------------------------Awake----------------------------------------------------------------------------
//----------------------------------------------------------GenerateNewReels-----------------------------------------------------------------
function GenerateNewReels(){ //////////Generate entirely new reels//////////
	GenerateLinesInfo();
    StorePreviousFaceIcons();//Store the previous icons that were on the screen
    RemovePreviousReels();//Remove the Reels
    UpdateAmountOfReels();//And create new Reels
    UpdateIconsPerReel();//Update the new symbols
    PopulateFaceIcons();//And create a list of symbols that will display on the screen
}
//----------------------------------------------------------GenerateNewReels-----------------------------------------------------------------
//----------------------------------------------------------StorePreviousFaceIcons-----------------------------------------------------------
function StorePreviousFaceIcons(){ //////////Stores the previous symbols that was on the screen//////////
	System.Array.Resize.<int>(prevFaceIcons, reelInfo.Length * 3); //Resize our list of previous symbols to the amount of symbols that can fit on screen
	
	if(iconsSet){ //If the symbols have been set
		prevFaceIcons = faceIcons;//The previous symbols on the screen is the same as the ones on the screen right now
	}
}
//----------------------------------------------------------StorePreviousFaceIcons-----------------------------------------------------------
//----------------------------------------------------------RemovePreviousReels--------------------------------------------------------------
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
//----------------------------------------------------------RemovePreviousReels--------------------------------------------------------------
//----------------------------------------------------------UpdateAmountOfReels--------------------------------------------------------------
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
//----------------------------------------------------------UpdateAmountOfReels--------------------------------------------------------------
//----------------------------------------------------------UpdateIconsPerReel---------------------------------------------------------------
function UpdateIconsPerReel(){    
	var step 					: int = 0;
	var tmpName 				: String;
	var b						: int;
	var j						: int;
	var jz						: int;
	var x						: int;
	var winning					: boolean = false;
	var y						: int;
	var lastY					: int = -1;
	var scattersID 				: int = -1;
				
		scattersID = getScattersSettinsID(valueToWin);
		
	for(a = 0; a < reelInfo.Length; a++){
		if (a == 0){
			jump = 1.5;
		} else if (a == 1){
			jump = 1.05;
		} else if (a == 2){
			jump = 0.6;
		}  
		
		var extraIcons = a * iconsPerReelDifference;
		System.Array.Resize.<SlotInfo>(reelInfo[a].slotOrder, iconsPerReel + extraIcons);
		
		for(var i = 0; i < iconsPerReel + extraIcons; i++){
			var newSprite = new GameObject();
				reelInfo[a].slotOrder[i] = new SlotInfo();
				reelInfo[a].slotOrder[i].sprite = newSprite;
				reelInfo[a].slotOrder[i].sprite.transform.localScale = Vector3(iconSize, iconSize, 1);
				newSprite.AddComponent.<SpriteRenderer>();
				newSprite.name = "Slot " + i.ToString();
				newSprite.layer = GameLayer;

			if(iconInfo.Length > 0){
				var randomIcon : int;
				for(;;){
				        randomIcon = Random.Range(0, iconInfo.Length - 1);
				    var dividend = parseFloat(iconInfo[randomIcon].frequency);
				        dividend = dividend * chanceDivider;
					var randomValue = Random.value;
					var test = 1/dividend > randomValue;

					if(test) {
						break;
					}
				}

				if(!iconsSet){
					reelInfo[a].slotOrder[i].ID = randomIcon;
				}

				if(iconsSet){
				    if(i < HowManyReels){ //HowManyReels was 3
				        var row = (HowManyReels-1) - i;
							reelInfo[a].slotOrder[i].ID = prevFaceIcons[a * HowManyReels + row];
					} else {
						reelInfo[a].slotOrder[i].ID = randomIcon;
					}
				}
				
					reelInfo[a].slotOrder[i].sprite.GetComponent.<SpriteRenderer>().sprite = iconInfo[reelInfo[a].slotOrder[i].ID].sprite;
					reelInfo[a].slotOrder[i].size = Vector2(reelInfo[a].slotOrder[i].sprite.GetComponent.<SpriteRenderer>().bounds.extents.x * 2, reelInfo[a].slotOrder[i].sprite.GetComponent.<SpriteRenderer>().bounds.extents.y * 2);
					reelInfo[a].slotOrder[i].sprite.transform.position = Vector3(a * IconsXYDimensions[0] - IconsXYDimensions[0] * jump, reelInfo[a].reel.transform.position.y + i * IconsXYDimensions[1], 0);
					
						if (debug == true) Debug.Log("reelInfo[a].slotOrder[i].size.y - " + reelInfo[a].slotOrder[i].size.y);
			}
			newSprite.transform.parent = reelInfo[a].reel.transform;
		}
		var offset = iconsPerReel + extraIcons - 2;
			RepositionReel(a, -IconsXYDimensions[1]);
			reelInfo[a].targetPosition = IconsXYDimensions[1] * (-offset) + reelsYOffset;

				if (debug == true) Debug.Log("reelInfo[a].slotOrder[0].size.y - " + reelInfo[a].slotOrder[0].size.y);
	}
	
	applyRandomID(scattersID);
	
	prevIconCount = iconsPerReel;
	valueToWin = 0; //reset nex game win to no interfere
}
//----------------------------------------------------------UpdateIconsPerReel---------------------------------------------------------------
//----------------------------------------------------------PopulateFaceIcons----------------------------------------------------------------
function PopulateFaceIcons(){ //////////Create a list of symbols that will show up on the screen//////////		
	var step 					: int = 0 ;
	
    	System.Array.Resize.<int>(faceIcons, reelInfo.Length * 3); //Resize the list of symbols on screen to the amount that will show up
    	System.Array.Resize.<int>(faceSprites, reelInfo.Length * 3); //Resize the list of sprites on screen to the amount that will show up
    	System.Array.Resize.<String>(faceSpritesName, reelInfo.Length * 3); //Resize the list of sprites on screen to the amount that will show up
    	
							    
						for(var b = 0; b < reelInfo.Length; b++){ 
							    for(var j = 0; j < reelInfo[b].slotOrder.Length; j++){
							        if(j < (reelInfo[b].slotOrder.Length - testWinOnLines[0]) && j >= (reelInfo[b].slotOrder.Length - (testWinOnLines[1]+1))){
							        		faceIcons[step] = reelInfo[b].slotOrder[j].ID;
											faceSpritesName[step] = reelInfo[b].slotOrder[j].sprite.GetComponent.<SpriteRenderer>().sprite.name;	
											faceSprites[step] = j;						        	
							           	step++;
							        }
							    }
						}
			
			if (debug == true) Debug.Log("HML: " + ((testWinOnLines[1] - testWinOnLines[0] + 1)));
			
		if (debug == true) {	
			for (var z = 0; z < faceSpritesName.Length; z++){
				Debug.Log("faceSpritesName[" + z + "] " + faceSpritesName[z]);
			}
		}
}


//----------------------------------------------------------PopulateFaceIcons----------------------------------------------------------------
//----------------------------------------------------------FindWinningIcon------------------------------------------------------------------
function FindWinningIcon(){ 
	var winIcoID				: String = ""; 
	var hManyIcoWin				: int = 0;
	var iconInfoID				: int = 0;
	
	for(var x = 0; x < iconInfo.length; x++){
        if(valueToWin == iconInfo[x].xTwo){
        	winIcoID = iconInfo[x].sprite.name;
        	hManyIcoWin = 2;
        	iconInfoID = x;
        } else if (valueToWin == iconInfo[x].xThree) {  
        	winIcoID = iconInfo[x].sprite.name;
        	hManyIcoWin = 3;
        	iconInfoID = x;
        } else if (valueToWin == iconInfo[x].xFour) {  
        	winIcoID = iconInfo[x].sprite.name;
        	hManyIcoWin = 4;
        	iconInfoID = x;
        } else if (valueToWin == iconInfo[x].xFive) {  
        	winIcoID = iconInfo[x].sprite.name;
        	hManyIcoWin = 5;
        	iconInfoID = x;
        }           
 	}
	
		if (debug == true) Debug.Log("--------------------------------FindWinningIcon " + winIcoID + ";" + hManyIcoWin + ";" + iconInfoID);
	
    return winIcoID + ";" + hManyIcoWin + ";" + iconInfoID;
}
//----------------------------------------------------------FindWinningIcon------------------------------------------------------------------
//----------------------------------------------------------GenerateLinesInfo----------------------------------------------------------------
function GenerateLinesInfo(){ 
	var jj						: int = 0;
	var bb 						: int = 0;
	var step 					: int = 0 ;
	
		System.Array.Resize.<int>(linesPoints, reelInfo.Length * (testWinOnLines[1] - testWinOnLines[0] + 1)); 
		System.Array.Resize.<int>(slotsMatrix, reelInfo.Length * (testWinOnLines[1] - testWinOnLines[0] + 1)); 
																			
		for(bb = 0; bb < reelInfo.Length; bb++){ 
			for(jj = 0; jj < reelInfo[bb].slotOrder.Length; jj++){
				if(jj < (reelInfo[bb].slotOrder.Length - testWinOnLines[0]) && jj >= (reelInfo[bb].slotOrder.Length - (testWinOnLines[1]+1))){
					linesPoints[step] = reelInfo[bb].slotOrder[jj].ID;
					slotsMatrix[step] = jj;
						step++;
				}
			 }
		}
}
//----------------------------------------------------------GenerateLinesInfo----------------------------------------------------------------
//----------------------------------------------------------getScattersSettinsID-------------------------------------------------------------
function getScattersSettinsID(msg : int){
	var i						: int = 0;
	var j 						: int = 0;
	var step 					: int = 0;
	var randomizedID 			: int[];
	var scattersID 				: int = -1;
	var almostWin				: boolean = false;
	
		if (msg == 0) {
			step = retRandInt(0, 10);
			
				if (step > 5){
					step = retRandInt(0, 10);
					if (step > 5){
						almostWin = true;
					} else {
						almostWin = false;
					}
				} else {
					almostWin = false;
				}
				
			Debug.Log("almostWin " + almostWin);
				
			if (almostWin == true){
				j = 0;
				i = 0;
					for (i = 0; i < ScattersInfo.Length; i++) {
						if ((howManyLines - 1) < ScattersInfo[i].lineNumber){
							j++;
						}
					}
					
				System.Array.Resize.<int>(randomizedID, j); 
				j = 0;
				i = 0;
						
					for (i = 0; i < ScattersInfo.Length; i++) {
						if ((howManyLines - 1) < ScattersInfo[i].lineNumber){
							randomizedID[j] = i;
							j++;
						}
					}
			} else {
				j = 0;
				i = 0;
					for (i = 0; i < ScattersInfo.Length; i++) {
						if ((howManyLines - 1) < ScattersInfo[i].lineNumber && ScattersInfo[i].ID == 0){
							j++;
						}
					}
					
				System.Array.Resize.<int>(randomizedID, j); 
				j = 0;
				i = 0;
						
					for (i = 0; i < ScattersInfo.Length; i++) {
						if ((howManyLines - 1) < ScattersInfo[i].lineNumber && ScattersInfo[i].ID == 0){
							randomizedID[j] = i;
							j++;
						}
					}
			}
		} else {
			j = 0;
			i = 0;
				for (i = 0; i < ScattersInfo.Length; i++) {
					if (((howManyLines - 1) >= ScattersInfo[i].lineNumber) && msg == ScattersInfo[i].ID){
						j++;
					}
				}
			
			System.Array.Resize.<int>(randomizedID, j); 
			j = 0;
			i = 0;
				
				for (i = 0; i < ScattersInfo.Length; i++) {
					if (((howManyLines - 1) >= ScattersInfo[i].lineNumber) && msg == ScattersInfo[i].ID){
						randomizedID[j] = i;
						j++;
					}
				}
		}
		
		
			step = retRandInt(0, j - 1);
			
				Debug.Log("scattersID[step] " + randomizedID[step]);
		
		return randomizedID[step];
}
//----------------------------------------------------------getScattersSettinsID-------------------------------------------------------------
//----------------------------------------------------------applyRandomID--------------------------------------------------------------------
function applyRandomID(msg : int){
	var step 					: int = 0;
 		
 		for (var x = 0; x < ScattersInfo[msg].icoID.Length; x++){
	 		for (var y = 0; y < ScattersInfo[msg].icoID[x].intArray.Length; y++){
	 			reelInfo[x].slotOrder[slotsMatrix[step]].sprite.GetComponent.<SpriteRenderer>().sprite = iconInfo[ScattersInfo[msg].icoID[x].intArray[y]].sprite;
				reelInfo[x].slotOrder[slotsMatrix[step]].ID = ScattersInfo[msg].icoID[x].intArray[y];
	 			linesPoints[step] = ScattersInfo[msg].icoID[x].intArray[y];		 			
		 			step++;
	 		}
 		}
}
//----------------------------------------------------------applyRandomID--------------------------------------------------------------------








@script ExecuteInEditMode()