

//Our user data that we are going to put in our scene
public var userData : GameObject;
public var data : GameObject;

//Information about all of our levels that we have created
public var slotData : LevelInfo[];
public var level : String[];

//Private variables are not meant to be changed manually and are updated upon conditions
/*public var MenuItiems : GameObject;
public var menuNumber : int;

public var MenuPages : Sprite[];


public var pageOffset : float;
public var pageNumber : float;*/


//////////This information is called before anything else in the scene//////////
function Start(){
    yield WaitForSeconds(0.1);

    //changeMenuItiems(menuNumber); 


	if(GameObject.Find("UserData)")){
		data = GameObject.Find("UserData");
	}

	if(data == null){
		Instantiate(userData, transform.position, transform.rotation);
	}

	Application.LoadLevel(1);
}

/*function Update(){
    if (Input.GetMouseButtonDown(0)) {
        var worldPoint = Camera.main.ScreenToWorldPoint(Input.mousePosition);
        var hit = Physics2D.Raycast(worldPoint, Vector2.zero);

        if (hit.collider != null) {
            Debug.Log(hit.collider.name);
            hitHandling(hit.collider.name);
        }
    }
}


function hitHandling(name : String){
    if(name == "01"){
        loadLevel(0);
    } else if (name == "02"){
        loadLevel(1);
    } else if (name == "03"){
        loadLevel(2);
    } else if (name == "04"){
        loadLevel(3);
    } else if (name == "05"){
        loadLevel(4);
    } else if (name == "06"){
        loadLevel(5);
    } else if (name == "next"){
        changeMenuItiems(menuNumber+1);
    } else if (name == "prev"){
        changeMenuItiems(menuNumber-1);
    } 
}


function changeMenuItiems(number : int){
    if(number >= MenuPages.length){
        number = 0;
    } else if (number < 0) {
        number = MenuPages.length-1;
    }

    MenuItiems.GetComponent(SpriteRenderer).sprite = MenuPages[number];
    menuNumber = number;
}


function loadLevel(number : int){
    number = number + (menuNumber*6);

    if(level[number] == "null"){
        Debug.Log("empty scene");
    } else {
        Application.LoadLevel(level[number]);
    }
}*/


//////////This function is called to display our HUD (Heads Up Display) / GUI (Graphical User Interface)//////////
/*function OnGUI(){
	GUI.skin = menuSkin;
	
	//GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), backgroundImage);
	
	//If we have any level information
	if(slotData.Length > 0){
		//Store how long our levels bar is going to be
		var barWidth : float = 5 * buttonSize.x + 30;
		
		//Start a group that will hold all of our levels
		GUI.BeginGroup(Rect(Screen.width/2 - barWidth/2, 300, barWidth, buttonSize.y + 10), "", "Box");
		
		//Access all the level information
		for(var i = 0; i < slotData.Length; i++){
			//Stores where the level button will be placed
			var rectVector : Vector2 = Vector2(buttonSize.x * i + 5 + i * 5, 5);
			
			//Stores which page the level will be on
			var rectOffset : float = barWidth * pageNumber - pageNumber * 5;
			
			//And creates how many pages we need to display all the levels
			var thisRect : Rect = Rect(rectVector.x - rectOffset, rectVector.y, buttonSize.x, buttonSize.y);
			
			//If we have placed a picture in the icon slot
			if(slotData[i].Icon){
				//If we click on a level button and the level has been unlocked
				if(GUI.Button(thisRect, slotData[i].Icon) && 2 * i + 1 <= PlayerPrefs.GetInt("Level")){
					//If the picture is not our coming soon logo
					if(slotData[i].Icon.name != "ComingSoon Logo"){
						//Load the level
						Application.LoadLevel(slotData[i].sceneName);
					}
				}
				
				//If our level is lower than the level to unlock this level
				if(2 * i + 1 > PlayerPrefs.GetInt("Level")){
					//And if the picture name is not our coming soon logo
					if(slotData[i].Icon.name != "ComingSoon Logo"){
						//Draw our lock picture
						GUI.Label(Rect(rectVector.x - rectOffset + lockOffset.x, rectVector.y + lockOffset.y, lockSize.x, lockSize.y), lockTexture);
						
						//If our cursor is on top of this button
						if(thisRect.Contains(Event.current.mousePosition)){
							//Store the level to unlock this level
							var unlockLevel : int = 2 * i + 1;
							
							//And display what level you must be to unlock this level
							GUI.Label(Rect(rectVector.x - rectOffset, rectVector.y, buttonSize.x, buttonSize.y/2), "Level " + unlockLevel.ToString());
						}
					}
				}
			}
		}
		//And close this group
		GUI.EndGroup();
	}
	
	
	//Draw a button to go back a page
	if(GUI.Button(Rect(75, 90, 40, buttonSize.y + 10), "<")){
		//If we are not on the first page
		if(pageNumber > 0){
			//Go back a page
			pageNumber -= 1;
		}
	}
	
	//Draw a button to go forward a page
	if(GUI.Button(Rect(Screen.width - 115, 90, 40, buttonSize.y + 10), ">")){
		//If we are not on the last page
		if(pageNumber < 4){
			//Go forward a page
			pageNumber += 1;
		}
	}
}

//This lets us see our GUI without having to press play
@script ExecuteInEditMode()
*/