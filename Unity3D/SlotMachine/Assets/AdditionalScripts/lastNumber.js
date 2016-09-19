#pragma strict

var roller : GameObject[];
var number : int[];
var rotateBy : float = 0.0;

private var y : float = 0.0;


function toZero(i : int) {
    roller[i].transform.localPosition = new Vector3(0, 0, 0);
    toNumber(i);
}


function toNumber(i : int) {
    roller[i].transform.localPosition = new Vector3(0, (rotateBy * number[i]), 0);
    //Debug.Log(number[i]);
}

function setNumber(){
    for (var x = 0; x < number.Length; x++){
        toZero(x);
    }
}

function setDataNumber(i : int, n : int){
    number[i] = n;
}