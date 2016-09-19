#pragma strict

public var debug 				: boolean = false;

public var hoverForceLeft 		: float[];
public var hoverForceUp 		: float[];
public var multiper 			: float[];
public var direction 			: float[];
public var coinModel 			: GameObject;
public var animate 				: boolean = false;
public var prefab 				: String; //coin_gold, coin_standard


private var rb					: Rigidbody;
private var instance 			: GameObject;


//----------------------------------------------------------Awake----------------------------------------------------------------------------
function Awake(){
    Physics.gravity = Vector3(5.0, 0, 0);
}
//----------------------------------------------------------Awake----------------------------------------------------------------------------
//----------------------------------------------------------Start----------------------------------------------------------------------------
function Start () {
    pushCoin();
}
//----------------------------------------------------------Start----------------------------------------------------------------------------
//----------------------------------------------------------pushCoin-------------------------------------------------------------------------
function pushCoin(){
    if (animate){
        rb = coinModel.GetComponent.<Rigidbody>();
        rb.AddForce(Vector3.left * Random.Range(hoverForceLeft[0], hoverForceLeft[1]), ForceMode.Impulse);
        rb.AddForce(Vector3.up * Random.Range(hoverForceUp[0], hoverForceUp[1]) * Random.Range(direction[0], direction[1]) * Random.Range(multiper[0], multiper[1]), ForceMode.Impulse);
    }

    	yield WaitForSeconds (0.05);
    
    cloneCoin();
}
//----------------------------------------------------------pushCoin-------------------------------------------------------------------------
//----------------------------------------------------------cloneCoin------------------------------------------------------------------------
function cloneCoin(){
    if (animate){
        coinModel = Instantiate(Resources.Load(prefab));
        coinModel.transform.position = new Vector3(22.5, 1, -21.86);
        rb = coinModel.GetComponent.<Rigidbody>();
    }
    
    pushCoin();
}
//----------------------------------------------------------cloneCoin------------------------------------------------------------------------
//----------------------------------------------------------startCoinParticles---------------------------------------------------------------
function startCoinParticles(msg : String){
    prefab = msg;
    animate = true;

    	yield WaitForSeconds (1.5);

    stopCoinParticles();
}
//----------------------------------------------------------startCoinParticles---------------------------------------------------------------
//----------------------------------------------------------stopCoinParticles----------------------------------------------------------------
function stopCoinParticles(){
    animate = false;
}
//----------------------------------------------------------stopCoinParticles----------------------------------------------------------------






