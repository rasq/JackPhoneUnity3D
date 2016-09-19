#pragma strict

public var debug 				: boolean = false;

public var flickerSpeedMin 		: float = 0.035;
public var flickerSpeedMax 		: float = 0.35;
public var glowMin 				: float = 0.01;
public var glowMax 				: float = 0.16;
public var elements 			: Material[];

private var randomizer			: int = 0;
private var x 					: int = 0;
private var y 					: int = 0;
private var z 					: int = 0;
private var num 				: int = 0;
private var stopNow 			: boolean = false;


//----------------------------------------------------------Start----------------------------------------------------------------------------
function Start(){
    starter();
}
//----------------------------------------------------------Start----------------------------------------------------------------------------
//----------------------------------------------------------starter--------------------------------------------------------------------------
function starter(){
    stopNow = false;
    animate();
}
//----------------------------------------------------------starter--------------------------------------------------------------------------
//----------------------------------------------------------animate--------------------------------------------------------------------------
function animate(){
    do {
        if (randomizer == 0) {
            x = Random.Range (0, elements.Length);
            z = Random.Range (0, 10);

            for (num = 0; num < elements.Length; num ++){
                elements[num].SetFloat("_MKGlowPower", Random.Range(glowMin, glowMax));
            }

            for (y = 0; y <= z; y++){
                for (num = 0; num < elements.Length; num ++){
                    elements[num].SetFloat("_MKGlowPower", Random.Range(glowMin, glowMax));
                }

                	yield WaitForSeconds ((Random.Range (flickerSpeedMin/20, flickerSpeedMax/20)));

                for (num = 0; num < elements.Length; num ++){
                    elements[num].SetFloat("_MKGlowPower", Random.Range(glowMin, glowMax));
                }
            }
        } else {
            for (num = 0; num < elements.Length; num ++){
                elements[num].SetFloat("_MKGlowPower", Random.Range(glowMin, glowMax));
            }
        }
 
        randomizer = Random.Range (0, 2);
        
        yield WaitForSeconds ((Random.Range (flickerSpeedMin, flickerSpeedMax)));
        
        stopNow = true;
    } while(stopNow == false);
    starter();
}
//----------------------------------------------------------animate--------------------------------------------------------------------------