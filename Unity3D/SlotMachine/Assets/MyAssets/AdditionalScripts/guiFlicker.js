var minFlickerIntensity : float = 0.5;
var maxFlickerIntensity : float = 1.0;
var flickerSpeedMin : float = 0.035;
var flickerSpeedMax : float = 0.35;

var col : Color;
var SpriteRendererA : SpriteRenderer;
 
private var randomizer : int = 0;

var guisGO : GameObject[];
  
while (true) {
    if (randomizer == 0) {
        for (var x = 0; x < guisGO.Length; x++){
            SpriteRendererA = guisGO[x].GetComponent(SpriteRenderer);
            col = SpriteRendererA.color;
            col.a = (Random.Range (minFlickerIntensity, maxFlickerIntensity)); 
            SpriteRendererA.color = col;
        }
    } else {
        for (var y = 0; y < guisGO.Length; y++){
            SpriteRendererA = guisGO[y].GetComponent(SpriteRenderer);
            col = SpriteRendererA.color;
            col.a = (Random.Range (minFlickerIntensity, maxFlickerIntensity)); 
            SpriteRendererA.color = col;
        }
    }
 
    randomizer = Random.Range (0, 2);
    yield WaitForSeconds ((Random.Range (flickerSpeedMin, flickerSpeedMax)));
    yield WaitForSeconds ((Random.Range (flickerSpeedMin, flickerSpeedMax)));
}