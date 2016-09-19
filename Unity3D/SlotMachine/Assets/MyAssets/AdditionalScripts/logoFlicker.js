#pragma strict

var flickerSpeedMin : float = 0.035;
var flickerSpeedMax : float = 0.35;

var SpriteRendererA;
var guisTex : Texture[];
var guisTexMain : Texture;

private var randomizer : int = 0;
private var x : int = 0;
private var y : int = 0;
private var z : int = 0;

private var stopNow : boolean = false;


function Start(){
    starter();
}


function starter(){
    stopNow = false;
    animate();
}


function animate(){
    do {
        if (randomizer == 0) {
            x = Random.Range (0, guisTex.Length);
            z = Random.Range (0, 10);

            this.GetComponent(MeshRenderer).material.mainTexture  = guisTex[x];
            this.GetComponent(MeshRenderer).material.SetTexture("_MKGlowTex", guisTex[x]);  

            for (y = 0; y <= z; y++){
                this.GetComponent(MeshRenderer).material.mainTexture  = guisTex[x];
                this.GetComponent(MeshRenderer).material.SetTexture("_MKGlowTex", guisTex[x]); 

                yield WaitForSeconds ((Random.Range (flickerSpeedMin/20, flickerSpeedMax/20)));

                this.GetComponent(MeshRenderer).material.mainTexture  = guisTexMain;
                this.GetComponent(MeshRenderer).material.SetTexture("_MKGlowTex", guisTexMain);
            }

        } else {
            this.GetComponent(MeshRenderer).material.mainTexture  = guisTexMain;
            this.GetComponent(MeshRenderer).material.SetTexture("_MKGlowTex", guisTexMain);
        }
 
        randomizer = Random.Range (0, 2);
        yield WaitForSeconds ((Random.Range (flickerSpeedMin, flickerSpeedMax)));
        stopNow = true;

    } while(stopNow == false);

    starter();
}