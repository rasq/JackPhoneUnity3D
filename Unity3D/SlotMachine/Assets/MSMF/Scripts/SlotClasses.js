////////////////////This script will not need to be in the scene////////////////////


//////////All the information needed for the reels//////////
class ReelInfo{
	var reel : GameObject;	//The reel object this belongs to
	var slotOrder : SlotInfo[];	//A list of icons on this reel in from center to bottom, top to center
	var spinning : boolean;	//Determines whether or not this reel should be spinning
	
	//The offset position this reel is going to spin to (HIDDEN IN THE INSPECTOR)
	@HideInInspector
	var targetPosition : float;
}


//////////All the information needed for the icons position//////////
class SlotInfo{
	var ID : int;
	var sprite : GameObject;
	var size : Vector2;
	var canAnimate : boolean;
	var animating : boolean;
}


//////////All the information needed for the icon//////////
class IconInfo{
	//The name of this icon
	var Name : String;
	var sprite : Sprite;
	var spriteAnimation : Sprite[];
	var animatedFramesPerSecond : float;
	
	enum IconType{Normal, Bonus, Scatter, Wild}
	var iconType : IconType;
	
	enum Frequency{MostCommon, Common, LessCommon, Uncommon, Rare, Sparse}
	var frequency : Frequency;
	
	//How much is two icons on a line worth
	@Range(0, 1000000)
	var xTwo : int;
	
	//How much is three icons on a line worth
	@Range(0, 1000000)
	var xThree : int;
	
	//How much is four icons on a line worth
	@Range(0, 1000000)
	var xFour : int;
	
	//How much is five icons on a line worth
	@Range(0, 1000000)
	var xFive : int;
}

class MultiDimensionalInt {
  	var intArray 	: int[];
}
  
//////////All the information needed for the icon//////////
class ScattersInfo{
	var Name 		: String;
	var ID 			: int;
	var isWin 		: boolean;
	var lineNumber 	: int;
	var icoID 		: MultiDimensionalInt[];
}



class LineInfo{ //////////All the information needed for the lines//////////
	var LineNumbers : LineNumbersInfo; //The positions in list that make up this line (REFER TO THE REFERENCE DIAGRAM PROVIDED)
	var lineBoxPosition : Vector3;	//The position of the box that will display our line number
	var lineParent : GameObject;	//Which line object that this line belongs to
	var thisColor : Color;	//Which color our line will be
	
	//How much we have won on this line (HIDDEN IN THE INSPECTOR)
	//@HideInInspector
	var winningValue : float;
	
	//Defines if we have won on this line (HIDDEN IN THE INSPECTOR)
	//@HideInInspector
	var winner : boolean;
	
	//@HideInInspector
	var lineNumbers : int[];
	
	//@HideInInspector
	var winningIconID : int;
	
	//@HideInInspector
	var winningIconIDs : int[];
}

class LineNumbersInfo{
	enum slot{Top, Middle, Bottom}
	var firstReel : slot;
	var secondReel : slot;
	var thirdReel : slot;
	//var forthReel : slot;
	//var fifthReel : slot;
}

class LinesInfo{
	var lineBlock : Texture;
	var lineShader : Shader;
	var lineWidth : float;
	var lineInfo : LineInfo[];
}


//////////All the information needed for the bonus items//////////
class BonusItemInfo{
	//The object that we will be able to click
	var object : GameObject;
	
	//And the opacity of the worth value
	@HideInInspector
	var valueOpacity : float;
}

class BonusInfo{
	var bonusText : GameObject;
	var bonusBackground : GameObject;
	var bonusInfoParent : GameObject;
	var bonusAmountText : TextMesh;
	var bonusCamera : Camera;
	var bonusItemInfo : BonusItemInfo[];
	var winningAmounts : float[];
	var fadeObjects : SpriteRenderer[];
}


//////////All the information needed for the rooms//////////
class LevelInfo{
	//This picture that will be displayed on the main menu to represent this room
	var Icon : Texture;
	
	var sceneName : String;
	
	//To let us know if we have unlocked this level
	@HideInInspector
	var Locked : boolean;
}


//////////All the information needed for the audio//////////
class AudioInfo{
	//The name of the audio clip
	var clipName : String;
	
	//And what volume should we play it at
	@Range(0, 100)
	var audioVolume : float;
	
	//The audio clip itself
	var audioClip : AudioClip;
}

class ButtonInfo{
	var sprite : GameObject;
	
	enum FunctionType{Spin, DecreaseLines, IncreaseLines, DecreaseBet, IncreaseBet, PayTable, MaxBet, Settings, Lobby}
	var functionType : FunctionType;
}

class DisplayInfo{
	var textObject : TextMesh;
	
	enum FunctionType{LineCount, BetAmount, TotalBet, TotalWin}
	var functionType : FunctionType;
}

class PayoutInfo{
	var amount : int;
	var ID : int;
}