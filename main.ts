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
function Wait_While (boolean: boolean) {
    while (boolean) {
    	
    }
}
function PoliceLedOn () {
    while (autonomous == 1) {
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
}
function GoForward () {
    hummingbird.setRotationServo(FourPort.One, 100)
    hummingbird.setRotationServo(FourPort.Two, -55)
}
function Turn (motor1: number, motor2: number) {
    hummingbird.setRotationServo(FourPort.One, motor1)
    hummingbird.setRotationServo(FourPort.Two, motor2)
    basic.pause(1000)
    hummingbird.setRotationServo(FourPort.One, 0)
    hummingbird.setRotationServo(FourPort.Two, 0)
}
function Autonomous () {
    if (autonomous == 0) {
        PoliceLedOn()
        autonomous = 1
        while (autonomous == 1) {
            if (hummingbird.getSensor(SensorType.Distance, ThreePort.One) < 3.5) {
                Go_Backward()
                basic.pause(700)
                Stop()
                if (randint(1, 2) == 1) {
                    Turn(0, randint(10, 100))
                } else {
                    Turn(randint(10, 100), 0)
                }
            } else if (hummingbird.getSensor(SensorType.Light, ThreePort.Two) < 35) {
                GoForward()
                basic.pause(700)
                Stop()
                if (randint(1, 2) == 1) {
                    Turn(0, randint(10, 100))
                } else {
                    Turn(randint(10, 100), 0)
                }
            }
        }
    }
}
function Go_Backward () {
    hummingbird.setRotationServo(FourPort.One, -100)
    hummingbird.setRotationServo(FourPort.Two, 55)
}
function Stop () {
    // Right Wheel
    hummingbird.setRotationServo(FourPort.One, 0)
    // Left Wheel
    hummingbird.setRotationServo(FourPort.Two, 0)
}
// direction: -1: backward, 0: stop, 1: forward
// LED 1: left front yellow light
// LED 2: right front yellow light
// .................................................................................
// The LEDs are:
// 1: left front yellow light
// 2: right front yellow light
// 3: left back red light
// 1: right back red light
// 2: red/blue tri-led at the top of the car(police lights)
// .................................................................................
// The sensors are:
// 
let autonomous = 0
hummingbird.startHummingbird()
Stop()
let direction = 0
autonomous = 0
hummingbird.setLED(ThreePort.One, 100)
hummingbird.setLED(ThreePort.Two, 100)
// If the 
basic.forever(function () {
    if (hummingbird.getSensor(SensorType.Light, ThreePort.Two) < 30 && !(hummingbird.getSensor(SensorType.Distance, ThreePort.One) < 12)) {
        if (autonomous == 0) {
            Stop()
            GoForward()
            direction = 1
        }
    }
})
// If the car stops, then turn on the back red LEDs
basic.forever(function () {
    if (direction == 0) {
        hummingbird.setLED(ThreePort.Three, 100)
        hummingbird.setTriLED(
        TwoPort.One,
        255,
        0,
        0
        )
    } else {
        hummingbird.setLED(ThreePort.Three, 0)
        hummingbird.setTriLED(
        TwoPort.One,
        0,
        0,
        0
        )
    }
})
// temporary
basic.forever(function () {
    basic.showNumber(hummingbird.getSensor(SensorType.Light, ThreePort.Two))
})
// Autonomous code:
// Will run if both sensors detect something close to them
basic.forever(function () {
    if (hummingbird.getSensor(SensorType.Light, ThreePort.Two) < 25 && hummingbird.getSensor(SensorType.Distance, ThreePort.Two) < 2.5) {
        Wait_While(hummingbird.getSensor(SensorType.Light, ThreePort.Two) < 35 && hummingbird.getSensor(SensorType.Distance, ThreePort.Two) < 3.5)
        Autonomous()
        Wait_While(!(hummingbird.getSensor(SensorType.Light, ThreePort.Two) < 35 && hummingbird.getSensor(SensorType.Distance, ThreePort.Two) < 3.5))
        autonomous = 0
        PoliceLedOff()
        Stop()
    }
})
basic.forever(function () {
    if (hummingbird.getSensor(SensorType.Distance, ThreePort.One) < 12 && !(hummingbird.getSensor(SensorType.Light, ThreePort.Two) < 30)) {
        if (autonomous == 0) {
            Stop()
            Go_Backward()
            direction = -1
        }
    }
})
