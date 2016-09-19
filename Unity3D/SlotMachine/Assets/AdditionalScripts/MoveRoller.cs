using UnityEngine;
using System.Collections;

public class MoveRoller : MonoBehaviour {
    public float rotateAfter = 2.5f;
    public float rotateBy = 3.75f;
    public int intDelay = 5;
    public bool stopNow = false;
    public bool counter = true;

    public bool trigger = false;
    public int click = 0;

    public float resetPos;

    public int skok = 0;
    public int rolka = 0;



    public GameObject[] roller;
    public int[] licznik;
    public int[] MaxNumber;
    public int[] MinNumber;
    /*For phone number there must be:  
      8 8 9 9 9 9 9 9 9 
      5 0 0 0 0 0 0 0 0             */



    float timeLeft = 9.0f;





    void Start() {
        StartCoroutine(Init());
    }

    void Update() {
        if (trigger == true && click == 0) {
            zeroToRotors();
        } else if (trigger == true && click == 1) {
            randNumber();
        }


        if (counter == false) {
            timeLeft -= Time.deltaTime;

            if (timeLeft < 0) {
                trigger = true;
                timeLeft = 2.0f;
            }
        }
    }






    IEnumerator Init() {
        yield return new WaitForSeconds(intDelay);
        initialSetup();
    }


    void initialSetup() {
        //Debug.Log("initialSetup start.");

        for (int x = 0; x < licznik.Length; x++) {
            //Debug.Log("x = " + x + ".");
            if (licznik[x] != MinNumber[x]) {
                //Debug.Log(" Max = " + licznik[x] + " min = " + MinNumber[x] + ".");
                setRotor(x);
            }
        }

        if (counter == true) {
            maintainRandomization();
        } else {
            randNumber();
        }
    }


    void setRotor(int x) {
        float y = 0.0f;
            y = rotateBy * MinNumber[x];
            licznik[x] = MaxNumber[x];
            rotorInit(x, y);
    }


    void maintainRandomization() {
        if (licznik[rolka] < MaxNumber[rolka]) {
            licznik[rolka]++;
            rotor(rolka);
        } else {
            rolka++;
            resetPosF(rolka - 1, 9.0f);
            licznik[rolka-1] = 0;
            if (licznik[rolka] < 9) {
                licznik[rolka]++;
                rotor(rolka);
                rolka--;
            } else {
                resetPosF(rolka, 9.0f);
                licznik[rolka] = 0;
                rolka++;
                rotor(rolka);
                rolka = 0;
            }

        }

    }


    void resetRotorsCounter() {

    }



    void resetRotorsToInit() {
        zeroToRotors();

        if (counter == true) {
            initialSetup();
        } else {
            randNumber();
        }
    }



    void zeroToRotors() {
        float jumpV = 0.0f;
        trigger = false;
        click = 1;

        for (int x = 0; x < licznik.Length; x++) {
            jumpV = (float)licznik[x];
            resetPosF(x, jumpV);
            licznik[x] = 0;
        }
    }



    void randNumber() {
        trigger = false;
        click = 0;

        for (int x = 0; x < licznik.Length; x++) {
            licznik[x] = Random.Range(MinNumber[x], MaxNumber[x]);
            rotorInit(x, rotateBy*(float)licznik[x]);
        }
    }









    void rotor(int i){
        iTween.MoveBy(roller[i], iTween.Hash("y", rotateBy, "easeType", "easeInExpo", "loopType", "none", "delay", rotateAfter, "onComplete", "maintainRandomization", "onCompleteTarget", gameObject));
    }

    void rotorInit(int i, float j) {
        iTween.MoveBy(roller[i], iTween.Hash("y", j, "easeType", "easeInExpo", "loopType", "none", "delay", .1));
    }

    void rotorRandom(int i, float j) {
        iTween.MoveBy(roller[i], iTween.Hash("y", j, "easeType", "easeInExpo", "loopType", "none", "delay", .1, "onComplete", "resetRotorsCounter", "onCompleteTarget", gameObject));
    }

    void resetPosF(int i, float j){
        iTween.MoveBy(roller[i], iTween.Hash("y", -(rotateBy * j), "easeType", "none", "loopType", "none", "delay", .01, "onComplete", "toZero", "onCompleteTarget", gameObject, "oncompleteparams", i));
    }

    void toZero(int i) {
        roller[i].transform.localPosition = new Vector3(0, 0, 0);
    }
}

