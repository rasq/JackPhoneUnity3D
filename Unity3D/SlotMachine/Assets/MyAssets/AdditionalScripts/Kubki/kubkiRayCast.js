#pragma strict

public var bonusGame : bonusGame;

function Start () {

}

function Update () {
    if(Input.GetMouseButtonDown(0)){
        Click(Input.mousePosition, null);
    }
}


function Click(position : Vector3, objectG : Transform){
    var ray : Ray = GetComponent.<Camera>().ScreenPointToRay(position);
	
    var hit : RaycastHit;
	
    if (objectG == null){
        if(Physics.Raycast(ray, hit, 100)){
            //playFunction(hit.collider.gameObject.name);
            Debug.Log("Kubki game hit: " + hit.collider.gameObject.name);
            getProperButton(hit.collider.gameObject.name);
        }
    }
}



function getProperButton(msg:String){
    switch (msg){
        case "150":
            bonusGame.setRisc(1, 0.5);
            break;
        case "1100":
            bonusGame.setRisc(1, 1.0);
            break;
        case "250":
            bonusGame.setRisc(2, 0.5);
            break;
        case "2100":
            bonusGame.setRisc(2, 1.0);
            break;
        case "350":
            bonusGame.setRisc(3, 0.5);
            break;
        case "3100":
            bonusGame.setRisc(3, 1.0);
            break;
        case "backGamble":
            bonusGame.disableBonusGame();
            break;
        case "startGamble":
            bonusGame.assesRisc();
            break;
        default:
            break;
    }
}