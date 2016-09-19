function Start () {
    //var download = AssetBundle.CreateFromFile ("F:/Streamed-02_MainGame.unity3d");
    var download = WWW.LoadFromCacheOrDownload ("file:///f|/Streamed-02_MainGame.unity3d", 5);
    yield download;
		
    // Handle error
    if (download.error != null)
    {
        Debug.LogError(download.error);
        return;
    }
		
    // In order to make the scene available from LoadLevel, we have to load the asset bundle.
    // The AssetBundle class also lets you force unload all assets and file storage once it is no longer needed.
    var bundle = download.assetBundle;
		
    // Load the level we have just downloaded
   // Application.LoadLevel ("Level1");
}