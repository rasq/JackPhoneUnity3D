
var rotAngle : float = 0;

private var pivotPoint : Vector2;


function OnGUI () {   
    pivotPoint = Vector2(Screen.width/2,Screen.height/2);
    GUIUtility.RotateAroundPivot (rotAngle, pivotPoint); 
    //this.GuiText.RotateAroundPivot (rotAngle, pivotPoint); 
    //if(GUI.Button(Rect(Screen.width/2-25, Screen.height/2-25, 50, 50),"Rotate"))
    //   rotAngle += 10;


    GUI.Label(new Rect(10, 10, 150, 20), "This text is not rotated.");
    GUIUtility.RotateAroundPivot(-90, new Vector2(160, 30));
    GUI.Label(new Rect(10, 30, 150, 20), "This text is rotated.");
}