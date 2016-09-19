using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class Timer : MonoBehaviour {
	public float startTime;
	private string currentTime;
	
	Text text;
	
	public GUISkin skin;
	
	
	void Awake () {
		text = GetComponent<Text>();
	}
	
	// Update is called once per frame
	void Update (){
		startTime -= Time.deltaTime;
		currentTime = string.Format("{0:0.0}",startTime);
		print(currentTime);
		
		text.text = "Time Left: "+currentTime;
		
		if (startTime <= 0){
			startTime = 0;
			print("GAME OVER!");
		}
	}
	
	//void OnGUI()
	//{
	//  GUI.Label(new Rect(10, 10, 200, 45), currentTime);
	// }
}