#pragma strict

public var debug 				: boolean = false;

public var useSecColor 			: boolean = false;
public var numbers 				: GameObject[];
public var numbersSprite 		: Sprite[];
public var numbersRSprite 		: Sprite[];

public var val 					: int;
public var tens 				: int;


//----------------------------------------------------------setNumber------------------------------------------------------------------------
function setNumber(x : int, y : String){
    var yChars 					: String[]  = new String[y.Length];

	setZero();
	
    numbers[1].GetComponent(SpriteRenderer).sprite = numbersSprite[x];

    if(y != "0"){
        for (var i = 0; i < y.Length; i++) {
            yChars[i] = y[i].ToString();
            if (useSecColor == true) {
	            numbers[(y.Length-i)+1].GetComponent(SpriteRenderer).sprite = numbersRSprite[int.Parse(yChars[i])];
    		} else {
	            numbers[(y.Length-i)+1].GetComponent(SpriteRenderer).sprite = numbersSprite[int.Parse(yChars[i])];
    		}
    		
	    	numbers[1].GetComponent(SpriteRenderer).sprite = numbersSprite[x];
        }
    } else {
        setZero();
    }

}
//----------------------------------------------------------setNumber------------------------------------------------------------------------
//----------------------------------------------------------setZero--------------------------------------------------------------------------
function setZero(){
    for(var a = 0; a < numbers.Length; a++){
         numbers[a].GetComponent(SpriteRenderer).sprite = numbersSprite[0];
    }
}
//----------------------------------------------------------setZero--------------------------------------------------------------------------