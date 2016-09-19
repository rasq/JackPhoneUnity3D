#pragma strict

var number : int = 0;
var inOrder : int = 0;

var standard : Sprite[];
var bold : Sprite[];




function Start () {

}

function Update () {

}


function setNumber(x : int){  
    //Debug.Log("BoldNumber " + x);
    this.GetComponent(SpriteRenderer).sprite = standard[x];
}

function setBold(x : int){  
    this.GetComponent(SpriteRenderer).sprite = bold[x];
}
