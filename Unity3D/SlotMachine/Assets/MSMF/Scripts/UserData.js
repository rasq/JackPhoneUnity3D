#pragma strict

public var debug 				: boolean = false;

public var CreditText 			: TextMesh;
public var levelText 			: TextMesh;
public var expText 				: TextMesh;
public var expBar 				: SpriteRenderer;
public var audioInfo 			: AudioInfo[];
public var coins 				: int = 0;
public var fluxCoins 			: int = 0;

@HideInInspector
public var level 				: int;
@HideInInspector
public var experience 			: float;
@HideInInspector
public var lastLevelExperience 	: float;
@HideInInspector
public var experienceToLevel 	: float;
@HideInInspector
public var incrementMuliplier 	: int;
@HideInInspector
public var initBet 				: int = 1;
@HideInInspector //how many games was played in total
public var numberOfGames 		: int;
@HideInInspector //how many players was loged in on this machine
public var numberOfPlayers 		: int;
@HideInInspector //how many money was inserted into this machine
public var totalCoinIn 			: int;
@HideInInspector //how many money was payed from this machine
public var totalCoinOut 		: int;
@HideInInspector //how many money was saved for online on this machine
public var totalCoinOnline 		: int;
@HideInInspector //money for jackphone
public var jackphone 			: float;
@HideInInspector //money for jackpot
public var jackpot 				: float;

private var UDPClientC 			: UDPClientC;


//----------------------------------------------------------Awake----------------------------------------------------------------------------
function Awake(){
	var lastDividend 			: float = experience - lastLevelExperience;
	var expDividend 			: float = experienceToLevel - lastLevelExperience;
	
		if(GameObject.FindWithTag("UDPClient")){   //If we an object in the scene with the tag Player
		    UDPClientC = GameObject.FindWithTag("UDPClient").GetComponent.<UDPClientC>();    //Store that object as our users information object
		}
		
	    DontDestroyOnLoad(transform.gameObject);

	    initializeStandardVariables();
	    initializeStatsVariables();

		fluxCoins = coins;
		
		UpdateUserInfo();
}
//----------------------------------------------------------Awake----------------------------------------------------------------------------
//----------------------------------------------------------Update---------------------------------------------------------------------------
function Update(){
	if(fluxCoins < coins){
		fluxCoins = Mathf.MoveTowards(fluxCoins, coins, incrementMuliplier * Time.deltaTime);
		CreditText.text = fluxCoins.ToString("n2");
		
		if(!GetComponent.<AudioSource>().isPlaying){
			if(audioInfo.Length > 0){
				if(GetComponent.<AudioSource>().clip != audioInfo[0].audioClip){
					GetComponent.<AudioSource>().clip = audioInfo[0].audioClip;
					GetComponent.<AudioSource>().volume = audioInfo[0].audioVolume;
				}
			}
			GetComponent.<AudioSource>().Play();
		}
	}
	
	if(fluxCoins > coins){
		fluxCoins = coins;
	}
	
	if(fluxCoins == coins && GetComponent.<AudioSource>().loop){
		GetComponent.<AudioSource>().loop = false;
	}
}
//----------------------------------------------------------Update---------------------------------------------------------------------------
//----------------------------------------------------------AddCoins-------------------------------------------------------------------------
function AddCoins(amount : int, increment : boolean, speed : int){
	coins = coins + amount;
	
	PlayerPrefs.SetInt("Coins", coins);

		if(!increment){
			fluxCoins = coins;
		}
	
	UpdateUserInfo();
}
//----------------------------------------------------------AddCoins-------------------------------------------------------------------------
//----------------------------------------------------------SubCoins-------------------------------------------------------------------------
function SubCoins(amount : int, increment : boolean, speed : int){
	coins = coins - amount;
	
	PlayerPrefs.SetInt("Coins", coins);

		if(!increment){
			fluxCoins = coins;
		}
	
	UpdateUserInfo();
}
//----------------------------------------------------------SubCoins-------------------------------------------------------------------------
//----------------------------------------------------------InitCoins------------------------------------------------------------------------
function InitCoins(amount : int){
	coins = amount;
	
	PlayerPrefs.SetInt("Coins", coins);
	
		if (debug == true) Debug.Log("InitCoins, setting coins - " + coins);
	
	coins = amount;
	fluxCoins = coins;
	UpdateUserInfo();
}
//----------------------------------------------------------InitCoins------------------------------------------------------------------------
//----------------------------------------------------------UpdateUserInfo-------------------------------------------------------------------
function UpdateUserInfo(){
	CreditText.text = fluxCoins.ToString("n2");
	levelText.text = level.ToString();
	expText.text = experience.ToString("n0") + " / " + experienceToLevel.ToString("n0");
}
//----------------------------------------------------------UpdateUserInfo-------------------------------------------------------------------
//----------------------------------------------------------getValue-------------------------------------------------------------------------
function getValue(valName : String) : int {
    var returnValue 			: int = 0;

    switch (valName){
        case "numberOfGames":
            returnValue = numberOfGames;
            break;
        case "numberOfPlayers":
            returnValue = numberOfPlayers;
            break;
        case "totalCoinIn":
            returnValue = totalCoinIn;
            break;
        case "totalCoinOut":
            returnValue = totalCoinOut;
            break;
        case "totalCoinOnline":
            returnValue = totalCoinOnline;
            break;
        case "jackphone":
            returnValue = jackphone;
            break;
        case "jackpot":
            returnValue = jackpot;
            break;
        case "Coins":
            returnValue = coins;
            break;
        case "Level":
            returnValue = level;
            break;
        case "Experience":
            returnValue = experience;
            break;
        case "LastLevelExperience":
            returnValue = lastLevelExperience;
            break;
        case "ExperienceToLevel":
            returnValue = experienceToLevel;
            break;
        default:
            break;
    }

    return returnValue;
}
//----------------------------------------------------------getValue-------------------------------------------------------------------------
//----------------------------------------------------------setValue-------------------------------------------------------------------------
function setValue(valName : String, valAmout : float){
    switch (valName){
        case "numberOfGames":
            numberOfGames = valAmout;
            break;
        case "numberOfPlayers":
            numberOfPlayers = valAmout;
            break;
        case "totalCoinIn":
            totalCoinIn = valAmout;
            break;
        case "totalCoinOut":
            totalCoinOut = valAmout;
            break;
        case "totalCoinOnline":
            totalCoinOnline = valAmout;
            break;
        case "jackphone":
            jackphone = valAmout;
            break;
        case "jackpot":
            jackpot = valAmout;
            break;
        case "Coins":
            coins = valAmout;
            break;
        case "Level":
            level = valAmout;
            break;
        case "Experience":
            experience = valAmout;
            break;
        case "LastLevelExperience":
            lastLevelExperience = valAmout;
            break;
        case "ExperienceToLevel":
            experienceToLevel = valAmout;
            break;
        default:
            break;
    }
}
//----------------------------------------------------------setValue-------------------------------------------------------------------------
//----------------------------------------------------------initializeStandardVariables------------------------------------------------------
function initializeStandardVariables(){
    if(!PlayerPrefs.HasKey("Coins")){
        PlayerPrefs.SetInt("Coins", 0);
        PlayerPrefs.SetInt("Level", 1);
        
        PlayerPrefs.SetFloat("Experience", 0);
        PlayerPrefs.SetFloat("LastLevelExperience", 0);
        PlayerPrefs.SetFloat("ExperienceToLevel", 1000);
    }
	
    coins = PlayerPrefs.GetInt("Coins");
    level = PlayerPrefs.GetInt("Level");
    
    experience = PlayerPrefs.GetFloat("Experience");
    lastLevelExperience = PlayerPrefs.GetFloat("LastLevelExperience");
    experienceToLevel = PlayerPrefs.GetFloat("ExperienceToLevel");
}
//----------------------------------------------------------initializeStandardVariables------------------------------------------------------
//----------------------------------------------------------initializeStatsVariables---------------------------------------------------------
function initializeStatsVariables(){
    if(!PlayerPrefs.HasKey("numberOfGames")){
        PlayerPrefs.SetInt("numberOfGames", 0);
        PlayerPrefs.SetInt("numberOfPlayers", 0);
        PlayerPrefs.SetInt("totalCoinIn", 0);
        PlayerPrefs.SetInt("totalCoinOut", 0);
        PlayerPrefs.SetInt("totalCoinOnline", 0);
        
        PlayerPrefs.SetFloat("jackphone", 0.0);
        PlayerPrefs.SetFloat("jackpot", 0.0);
    }
    
    numberOfGames = PlayerPrefs.GetInt("numberOfGames");
    numberOfPlayers = PlayerPrefs.GetInt("numberOfPlayers");
    totalCoinIn = PlayerPrefs.GetInt("totalCoinIn");
    totalCoinOut = PlayerPrefs.GetInt("totalCoinOut");
    totalCoinOnline = PlayerPrefs.GetInt("totalCoinOnline");
    
    jackphone = PlayerPrefs.GetFloat("jackphone");
    jackpot = PlayerPrefs.GetFloat("jackpot");
}
//----------------------------------------------------------initializeStatsVariables---------------------------------------------------------
//----------------------------------------------------------updateUserData-------------------------------------------------------------------
function updateUserData(){
    PlayerPrefs.SetInt("numberOfGames", numberOfGames);
    PlayerPrefs.SetInt("numberOfPlayers", numberOfPlayers);
    PlayerPrefs.SetInt("totalCoinIn", totalCoinIn);
    PlayerPrefs.SetInt("totalCoinOut", totalCoinOut);
    PlayerPrefs.SetInt("Coins", coins);
    PlayerPrefs.SetInt("Level", level);
    PlayerPrefs.SetInt("totalCoinOnline", totalCoinOnline);
    
    PlayerPrefs.SetFloat("jackphone", jackphone);
    PlayerPrefs.SetFloat("jackpot", jackpot);
    PlayerPrefs.SetFloat("Experience", experience);
    PlayerPrefs.SetFloat("LastLevelExperience", lastLevelExperience);
    PlayerPrefs.SetFloat("ExperienceToLevel", experienceToLevel);
}
//----------------------------------------------------------updateUserData-------------------------------------------------------------------
//----------------------------------------------------------AddExperience--------------------------------------------------------------------
function AddExperience(amount : float){
	experience += amount;
	PlayerPrefs.SetFloat("Experience", experience);
	
	if(experience >= experienceToLevel){
		level += 1;
		lastLevelExperience = experienceToLevel;
		experienceToLevel = experienceToLevel * 2;
		
		PlayerPrefs.SetInt("Level", level);
		PlayerPrefs.SetFloat("LastLevelExperience", lastLevelExperience);
		PlayerPrefs.SetFloat("ExperienceToLevel", experienceToLevel);
	}
	
	UpdateUserInfo();
	
	var lastDividend 			: float = experience - lastLevelExperience;
	var expDividend 			: float = experienceToLevel - lastLevelExperience;
	
	expBar.transform.localScale.x = lastDividend/expDividend * 148.5;
}
//----------------------------------------------------------AddExperience--------------------------------------------------------------------

@script ExecuteInEditMode()