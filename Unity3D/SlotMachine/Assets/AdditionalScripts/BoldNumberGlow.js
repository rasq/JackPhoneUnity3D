#pragma strict

public var debug 				: boolean = false;

public var number 				: int = 0;
public var inOrder 				: int = 0;
public var standard 			: Texture[];
public var bold 				: Texture[];

//----------------------------------------------------------setNumber------------------------------------------------------------------------
function setNumber(x : int){  
    	if (debug == true) Debug.Log("setNumber " + x);
    	
    this.GetComponent(MeshRenderer).material.mainTexture  = standard[x];
    this.GetComponent(MeshRenderer).material.SetTexture("_MKGlowTex", standard[x]);
}
//----------------------------------------------------------setNumber------------------------------------------------------------------------
//----------------------------------------------------------setBold--------------------------------------------------------------------------
function setBold(x : int){  
    	if (debug == true) Debug.Log("setBold " + x);
    	
    this.GetComponent(MeshRenderer).material.mainTexture  = bold[x];
    this.GetComponent(MeshRenderer).material.SetTexture("_MKGlowTex", bold[x]);
}
//----------------------------------------------------------setBold--------------------------------------------------------------------------
