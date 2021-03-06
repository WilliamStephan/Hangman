console.log("wheel.js is linked - wheel object");

class Wheel {
    constructor(slots) {
        this.wheel = slots;
        this.weights;
        this.totalWeight;
        this.spinLast = "NEW GAME!"
        this.sText = "";
        this.sValue = 0;
        this.guessMod = 0;
        this.currentDegree = 0;
    }

    spin() {
        var rndSpin = rndWeighted(this.weights); // weighted random spin based on like wheel slot area
        if (isNaN(this.wheel[rndSpin][0])) { // spin is alpha (bankrupt, lose turn or free spin)
            this.sText = this.wheel[rndSpin][0]; // sets wheel object spin values
            this.sValue = 0;
        }
        else { // spin is numeric ($ value)
            this.sText = "";
            this.sValue = parseInt(this.wheel[rndSpin][0]); // sets wheel object spin values
        }
        var subLoc = Math.floor(Math.random() * (this.wheel[rndSpin].length - 1) + 1); // random for multiple same value wheel locations
        var offSet = 360 - this.wheel[rndSpin][subLoc]; // offset to keep the wheel synced 
        this.currentDegree = this.currentDegree + (this.wheel[rndSpin][subLoc] + 1080); // where the spin will land, plus 3 loops
        rotateWheel(wheel.currentDegree.toString()); // spin wheel - took way to long to figure out
        this.currentDegree = this.currentDegree + offSet; // zero wheel position for next spin           
        this.spinLast = this.wheel[rndSpin][0]  // save spin location 
        return this.spinLast;
    }

}

function initWheel() {
    var d2Arr = createArray(wheelItems.length, 1); // d2 Array structure

    for (i = 0; i < wheelItems.length; i++) {
        d2Arr[i][0] = wheelItems[i]; // wheel items (game prizes or punishments)
        for (k = 0; k < slotLocation[i].length; k++) {
            d2Arr[i][k + 1] = slotLocation[i][k]; // location in degrees on wheel (multiple)
        }
    }

    wheel = new Wheel(d2Arr);
    wheel.weights = wheelWeights; // random weighting based on times and size on wheel  
    wheel.totalWeight = arrSum(wheel.weights);
}

function rotateWheel(rotateMe, s = true) {  // rotate wheel function
    if (s) { soundSpin.play() }; // play spin sound
    rotateDeg = (rotateMe)
    Root.style.setProperty('--turn', rotateDeg + "deg") // using CSS variable 
}