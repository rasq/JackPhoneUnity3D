#pragma strict

var frameDelay : float = 0.01;

var dir01 : String[];
var dir02 : String[];
var dir03 : String[];
var dir04 : String[];
var dir05 : String[];
var dir06 : String[];
var dir07 : String[];
var dir08 : String[];
var dir09 : String[];
var dir10 : String[];
var dir11 : String[];
var dir12 : String[];
var dir13 : String[];
var dir14 : String[];


var anim01 : Texture[];

private var animNumber : int = 0;
private var i : int = 0;
private var x : int = 0;
private var maxElement : int = 0;
private var stopNow : boolean = false;
private var dir : String;
private var file : String;
private var fileB : String;


function starter(){
    var maps : Object[] = Resources.LoadAll(dir);

    anim01 = new Array (maps.Length);

    for (x = 0; x < maps.Length; x++){
        anim01[x] = Resources.Load(dir + file + x.ToString()) as Texture;

        if (x >= 100) {
            anim01[x] = Resources.Load(dir + fileB + x.ToString()) as Texture;
        }
    }
    
    Resources.UnloadUnusedAssets();

    stopNow = false;
    i = 0;
    animate();
}



function startAnim(msg){
    switch (msg){
        case 1:
            if(dir01.Length >= 3){
                dir = dir01[0];
                file = dir01[1];
                fileB = dir01[2]; 
            }
            break;
        case 2:
            if(dir02.Length >= 3){
                dir = dir02[0];
                file = dir02[1];
                fileB = dir02[2]; 
            }
            break;
        case 3:
            if(dir03.Length >= 3){
                dir = dir03[0];
                file = dir03[1];
                fileB = dir03[2]; 
            }
            break;
        case 4:
            if(dir04.Length >= 3){
                dir = dir04[0];
                file = dir04[1];
                fileB = dir04[2]; 
            }
            break;
        case 5:
            if(dir05.Length >= 3){
                dir = dir05[0];
                file = dir05[1];
                fileB = dir05[2]; 
            }
            break;
        case 6:
            if(dir06.Length >= 3){
                dir = dir06[0];
                file = dir06[1];
                fileB = dir06[2]; 
            }
            break;
        case 7:
            if(dir07.Length >= 3){
                dir = dir07[0];
                file = dir07[1];
                fileB = dir07[2]; 
            }
            break;
        
        case 8:
            if(dir08.Length >= 3){
                dir = dir08[0];
                file = dir08[1];
                fileB = dir08[2]; 
            }
            break;
        case 9:
            if(dir09.Length >= 3){
                dir = dir09[0];
                file = dir09[1];
                fileB = dir09[2]; 
            }
            break;
        case 10:
            if(dir10.Length >= 3){
                dir = dir10[0];
                file = dir10[1];
                fileB = dir10[2]; 
            }
            break;
        case 11:
            if(dir11.Length >= 3){
                dir = dir11[0];
                file = dir11[1];
                fileB = dir11[2]; 
            }
            break;
        case 12:
            if(dir12.Length >= 3){
                dir = dir12[0];
                file = dir12[1];
                fileB = dir12[2]; 
            }
            break;
        case 13:
            if(dir13.Length >= 3){
                dir = dir13[0];
                file = dir13[1];
                fileB = dir13[2]; 
            }
            break;
        case 14:
            if(dir14.Length >= 3){
                dir = dir14[0];
                file = dir14[1];
                fileB = dir14[2]; 
            }
            break;
        default:
            break;
    }
    starter();
}




function Start () {
}


function StarterS(){
    dir = dir01[0];
    file = dir01[1];
    fileB = dir01[2];
    starter();
}



function Update () {

}




function animate () {
    do { 
        this.GetComponent(MeshRenderer).material.mainTexture  = anim01[i];
        this.GetComponent(MeshRenderer).material.SetTexture("_MKGlowTex", anim01[i]);

        yield WaitForSeconds (frameDelay);

        if(i >= anim01.Length - 1){
            stopNow = true;
            this.GetComponent(MeshRenderer).material.mainTexture  = anim01[anim01.Length - 1];
            this.GetComponent(MeshRenderer).material.SetTexture("_MKGlowTex", anim01[anim01.Length - 1]);
        }

        i++;
    } while(stopNow == false);
}


function setAnim (msg:int) {
    animNumber = msg;
}