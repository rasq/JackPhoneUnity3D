using UnityEngine;
using System.Collections;

public class VKTrigger : MonoBehaviour {

    VirtualKeyboard vk = new VirtualKeyboard();
    public bool startKeyboard = false;
    bool opened = false;

    void Update() {
        if (startKeyboard == true) {
            if (opened == false) {
                OpenKeyboard();
                opened = true;
            }
        } else {
            if (opened == true) {
                CloseKeyboard();
                opened = false;
            }
        }
    }


    public void OpenKeyboard() {
           vk.ShowTouchKeyboard();
    }

    public void CloseKeyboard() {
            vk.HideTouchKeyboard();
    }
}
