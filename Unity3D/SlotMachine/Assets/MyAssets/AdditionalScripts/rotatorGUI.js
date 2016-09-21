#pragma strict


function Update () {
	this.transform.Rotate(0, 0, -(Time.deltaTime)*4.0);
}