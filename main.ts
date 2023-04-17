function GoForward () {
    hummingbird.setRotationServo(FourPort.One, 100)
    hummingbird.setRotationServo(FourPort.Two, -55)
}
function PoliceLED () {
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
function Go_Backward () {
    hummingbird.setRotationServo(FourPort.One, -100)
    hummingbird.setRotationServo(FourPort.Two, 55)
}
function Stop () {
    hummingbird.setRotationServo(FourPort.One, 0)
    hummingbird.setRotationServo(FourPort.Two, 0)
}
hummingbird.startHummingbird()
Stop()
let direction = 0
hummingbird.setLED(ThreePort.Two, 100)
basic.forever(function () {
    PoliceLED()
})
basic.forever(function () {
    if (hummingbird.getSensor(SensorType.Light, ThreePort.One) < 30) {
        if (direction == 1) {
            Stop()
            direction = 0
        } else {
            GoForward()
            direction = 1
        }
    } else if (hummingbird.getSensor(SensorType.Light, ThreePort.One) > 35 && direction == -1) {
    	
    }
})
basic.forever(function () {
    if (hummingbird.getSensor(SensorType.Distance, ThreePort.One) < 12) {
        if (direction == -1) {
            Stop()
            direction = 0
        } else {
            Go_Backward()
            direction = -1
        }
    } else if (hummingbird.getSensor(SensorType.Distance, ThreePort.One) > 15 && direction == -1) {
        Stop()
        direction = 0
    }
})
