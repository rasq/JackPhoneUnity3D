#pragma strict

var col : Color;
var SpriteRendererA : SpriteRenderer;

function Start () {

}

function Update () {
   // Debug.Log(this.transform.position.x);
}


function alfaHide(msg){
    SpriteRendererA = this.GetComponent(SpriteRenderer);
    col = SpriteRendererA.color;

    if(msg == true){
        col.a = 0.0; 
    } else {
        col.a = 1.0; 
    }

    SpriteRendererA.color = col;
}



function OnTriggerEnter2D(coll: Collider2D) {
    Debug.Log(coll.gameObject.name);
    if (coll.gameObject.tag == "rolki") {
        Debug.Log("colizja");
    }
}

