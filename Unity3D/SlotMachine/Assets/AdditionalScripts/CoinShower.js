#pragma strict

public var coin : GameObject; 
public var pay : boolean;
public var payout : int;

private var blockade : boolean;

function Start () {

}

function Update () {
	if(pay == true){
		payoff(payout);
		pay = false;
	}
}

function startPayoff(){
	if (blockade == false){
		pay = true;
	}
}


function payoff(x : int){
	var clone : GameObject;
	blockade = true;
	
	for (var i: int = 0; i < x; i++) {
		clone = Instantiate(coin, this.transform.position, this.transform.rotation);
		clone.GetComponent.<Rigidbody>().isKinematic = false;
		clone.GetComponent.<Rigidbody>().detectCollisions = true;
		clone.GetComponent.<Rigidbody>().velocity = transform.TransformDirection (Vector3.forward * 10.0f);
		yield WaitForSeconds (0.6f);
	}
	
	blockade = false;
}