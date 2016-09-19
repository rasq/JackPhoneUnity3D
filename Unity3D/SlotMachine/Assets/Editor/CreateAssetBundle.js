

	@MenuItem ("Build/BuildWebWindows")
static function MyBuild(){
    var levels : String[] = ["Assets/MyAssets/MyGames/21_9/MafiaEmpire/02_MainGame.unity"];
        
    BuildPipeline.BuildStreamedSceneAssetBundle( levels, "Streamed-02_MainGame.unity3d", BuildTarget.WebPlayer);
}


	@MenuItem ("Build/BuildStandaloneWindows")
static function MyBuild1(){
    var levels : AssetBundleBuild[] = new AssetBundleBuild[1];
        levels[0].assetBundleName = "Streamed-02_MainGame";

    var newAsset: String[] = new String[1];
        newAsset[0] = "Assets/MyAssets/MyGames/21_9/MafiaEmpire/Streamed-02_MainGame.unity";

        levels[0].assetNames = newAsset;
        //"Assets/MyAssets/MyGames/21_9/MafiaEmpire/02_MainGame.unity"];
        
    BuildPipeline.BuildAssetBundles("Assets/MyAssets/MyGames/21_9/MafiaEmpire", levels, BuildAssetBundleOptions.UncompressedAssetBundle, BuildTarget.StandaloneWindows);
}





