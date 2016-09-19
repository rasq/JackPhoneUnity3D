var rb: Rigidbody;

function Start() {
	rb = GetComponent.<Rigidbody>();
	//DisableRagdoll();
}


function EnableRagdoll() {
	// Let the rigidbody take control and detect collisions.
	rb.isKinematic = false;
	rb.detectCollisions = true;
}


function DisableRagdoll() {
	// Let animation control the rigidbody and ignore collisions.
	rb.isKinematic = true;
	rb.detectCollisions = false;
}