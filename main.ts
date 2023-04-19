function PoliceLedOff () {
    hummingbird.setTriLED(
    TwoPort.Two,
    0,
    0,
    0
    )
    hummingbird.setTriLED(
    TwoPort.Two,
    0,
    0,
    0
    )
}
function PoliceLedOn () {
    hummingbird.setTriLED(
    TwoPort.Two,
    255,
    0,
    0
    )
    basic.pause(300)
    hummingbird.setTriLED(
    TwoPort.Two,
    0,
    0,
    255
    )
    basic.pause(300)
}
function GoForward () {
    hummingbird.setRotationServo(FourPort.One, 100)
    hummingbird.setRotationServo(FourPort.Two, -55)
}
function Go_Backward () {
    hummingbird.setRotationServo(FourPort.One, -100)
    hummingbird.setRotationServo(FourPort.Two, 55)
}
function RandomTurn () {
    LeftOrRight = randint(1, 2)
    if (LeftOrRight == 1) {
    	
    } else {
    	
    }
}
function Stop () {
    hummingbird.setRotationServo(FourPort.One, 0)
    hummingbird.setRotationServo(FourPort.Two, 0)
}
let LeftOrRight = 0
hummingbird.startHummingbird()
Stop()
let direction = 0
let autonomous = 0
basic.forever(function () {
    if (hummingbird.getSensor(SensorType.Light, ThreePort.Two) < 25 && hummingbird.getSensor(SensorType.Distance, ThreePort.Two) < 2.5) {
        PoliceLedOn()
        autonomous = 1
    }
})
basic.forever(function () {
    if (direction == 0) {
        hummingbird.setLED(ThreePort.One, 100)
        hummingbird.setLED(ThreePort.Two, 100)
    } else {
        hummingbird.setLED(ThreePort.One, 0)
        hummingbird.setLED(ThreePort.Two, 0)
    }
})
basic.forever(function () {
    if (hummingbird.getSensor(SensorType.Distance, ThreePort.One) < 12) {
        Go_Backward()
        direction = -1
    }
})
basic.forever(function () {
    if (hummingbird.getSensor(SensorType.Light, ThreePort.Two) > 30.1 && hummingbird.getSensor(SensorType.Distance, ThreePort.One) > 12.1) {
        GoForward()
        direction = 1
    }
})
basic.forever(function () {
    if (hummingbird.getSensor(SensorType.Light, ThreePort.Two) < 30) {
        GoForward()
        direction = 1
    }
})
