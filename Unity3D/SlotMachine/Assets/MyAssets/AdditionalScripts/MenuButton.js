#pragma strict

public var debug 				: boolean = false;

public var buttonTexture 		: Sprite[];


//----------------------------------------------------------standardButton-------------------------------------------------------------------
function standardButton(){
    if(buttonTexture[0] != null){
        this.GetComponent(SpriteRenderer).sprite  = buttonTexture[0];
    }
}
//----------------------------------------------------------standardButton-------------------------------------------------------------------
//----------------------------------------------------------onButton-------------------------------------------------------------------------
function onButton(){
    if(buttonTexture[1] != null){
        this.GetComponent(SpriteRenderer).sprite  = buttonTexture[1];
    }
}
//----------------------------------------------------------onButton-------------------------------------------------------------------------