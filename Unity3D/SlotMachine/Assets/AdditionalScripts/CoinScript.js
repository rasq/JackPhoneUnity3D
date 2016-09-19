#pragma strict


private var rb: Rigidbody;
public var amount : float[];
public var rotate : float[];

private var X : float;
private var Y: float;
private var Z : float;
private var direction : int;

function Start () {
    if (Random.Range(rotate[0], rotate[1]) >= 0){
        direction = 1;
    } else {
        direction = -1;
    }

    rb = GetComponent.<Rigidbody>();
    X = 1.0 * Random.Range(amount[0], amount[1]) * -0.5 * direction;
    Y = 1.0 * Random.Range(amount[0], amount[1]) * -0.5 * direction;
    Z = 1.0 * Random.Range(amount[0], amount[1]) * -0.5 * direction;
}

function Update () {
    var screenPosition = Camera.main.WorldToScreenPoint(transform.position);
    if (screenPosition.y > Screen.height || screenPosition.y < 0 || screenPosition.x > Screen.width || screenPosition.x < 0) {
        Destroy(this.gameObject);
    }
}





function FixedUpdate() {
    rb.AddTorque(Vector3(X, Y, Z));
}


