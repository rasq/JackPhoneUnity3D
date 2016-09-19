Virtual Input System
by Timothy Courtney

Thanks for incorporating Virtual Input System (VIS) into your Unity project. Please read this guide and watch the demo video to see how easy it is to get started. You can find the demo video on YouTube by searching "Virtual Input System (for Unity)" or by visiting https://youtube.com/watch?v=MqxR5dsj4ak.

SKILLS NEEDED
The VIS is customizable, flexible, and easy to get started with. However, writing custom dialog logic will require some knowledge of UnityScript or C#. 

TIP: There may be opensource dialog scripts available following the online documentation: http://goo.gl/q8yBHr. (Ask how you can contribute!)

PREMISE
The VIS was created to be used in Lucas the Game, and optimized to safely collect data from the player, data which would then be submitted into an online database. Soon after, the potential for the VIS to be used in other custom ways became apparent.

CURRENT PURPOSE
The VIS is currently more optimized and generalized. It's now ready to be quickly extended by you, for your specific dialog needs. You can incorporate the VIS into your Unity project, extend the logic in a few places, and create your own customized dialog with the player.

The VIS package is created so that you can drag and drop the essential files into your Hierachy window to quickly have a functioning on-screen input system. By default, the VIS and it's scripts do not alter any of your project's files. However, you can program the VIS to alter your project in any way you need to.

THE LOOK
You can even change the look of the VIS by replacing textures with your own. For example, change the color of the virtual keyboard's keys; Edit the hue value of the textures in your image manipulation program of choice, and replace the original red keys with your new colored keys. There is really no limit to how you can use the VIS in new and powerful ways.

NOTE: You can change the background texture in the game object called vis_bg; Add your own 2D background. If you'd rather have the core VIS display over the top of your own scene, you can completely remove the vis_bg game object. If you remove the default bg object, ensure layering and sorting orders of the VIS work synchronously with your existing scene.

SETUP
Setup is minimal. Everything has been placed in a single folder, called Virtual Input System. Once you've imported the package, you'll see this folder in your Project Window. Open it up to find it contains a few essential directories, and a couple prefabs.
To get a basic setup going, drag and drop the prefab, called Main_Camera into your Hierarchy window. Also drag and drop the prefab, called Virtual Input System. 

NOTE: You don't have to use the camera prefab available to you. You can use an existing camera instead, but ensure sure the X, Y, Z positions are set to 0, 0, -10, respectively. Also, ensure the projection is set to Orthographic. Review the available camera prefab to see what a working setup looks like.
Click play. The VIS should appear. You can test it out, and engage in a dialog. Once you have typed your name and pressed enter, you will see that this is where you would start extending the logic. In the next section, you'll learn where and how to do this.

NOTE: Once the cancel key is pressed on the virtual keyboard, you will see that the VIS becomes hidden. Press the V key on your physical keyboard to bring it back up. This is another customization opportunity; Extend the logic to have the VIS brought up by any trigger or circumstance you'd like. Learn more about this in the next section.
	
SCRIPTS OVERVIEW / EXTENDING THE DIALOG
The power of the VIS comes from your ability to make it your own. In this section, you will be shown several essential scripts you'll want to initially focus on, in order to extend the dialog with the player. If you are more experienced and ambitious, you can extend the logic anywhere in any of the script components. You can even add your own scripts to interface with and control the VIS.

[1] virtual_screen_scr.js (component of game object called virtual_screen) 
REQUIRED: Open up this script in your editor. Scroll down to the bottom of Awake, where you will see a section already set aside for creating as many custom message variables as you need. Scroll down to the bottom of Start, you will see a section set aside for initializing your custom message variables. This is where you create the messages that will be displayed on the virtual screen. Last, scroll down into Update, you will see a section that controls the dialog logic. This is where all your main customization will happen. Extend this logic in any way you need, to have a unique dialog with the player. Collect the information you need from the player.

[2] vis_controls.js (component of game object called Virtual Input System) 
OPTIONAL: In the Inspector, you can uncheck 'On Start Display VIS', but this will require you to create your own logic to bring up the VIS when you need it to be displayed. The current control key to do so is 'V', which you can also customize from within this script.
Open up this script in your editor. Scroll down into Update, and you will see a command variable in use called enableVirtualInputSystem. You can create any logic you like to trigger this command; I.E. Set the command variable to true when some condition is met. Bring up the VIS on your own custom terms.

[3] cancel_highlighted_key_scr.js (component of game object called cancel_highlighted_key; child of the game object called keyboard) 
OPTIONAL: Open up this script in your editor. Scroll down into Update where you'll see a command variable in use called cancel. You can create any logic you like to trigger this command; I.E. Set the command variable to true when some condition is met. NOTE: This command initiates a series of instructions which not only hides the VIS, but resets it for the next possible use.

MINIMAL REQUIREMENTS
You don't need to do everything this text document says. The goal is for you to make the VIS your own, so to speak. Minimally, you will want to extend the dialog logic within virtual_screen_scr.js - From there, you can change the look and behaviour of the VIS in as many or as few ways as you like. 

CLOSING
Many of you will want to make it look custom to your project. Please send screenshots to tim@lucasthegame.com - I'd love to see your creations, and hear about how you're using the VIS! If you have any questions, please let me know. Thank you.

Copyright 2015 Timothy Courtney