// import EarthSprite from '../sprites/Earth'
// import JunkerSprite from '../sprites/Junker'

import { goName, mag } from './general'

export function earthAttractor(earth, other) {
    const distance = Math.abs(mag(other.position, earth.position))
    const d = distance
    const gravity = 0.02/(d*Math.PI*2)
    // console.log(gravity)
    return  {
        x: Math.sign(earth.position.x - other.position.x) * gravity,
        y: Math.sign(earth.position.y - other.position.y) * gravity,
    }
}

export function junkerAttractor(junker, other) {
    if (goName(other) === 'EarthSprite') {
        return 0
    }

    const distance = Math.abs(mag(other.position, junker.position))
    const d = distance
    const magnetism = junker.gameObject.magnetStrength / (Math.PI * d)

    // Out of range
    if (distance > 100) {
        return 0
    }

    if (junker.gameObject.repelModifier < 0 && distance < 30){
        other.velocity=({x:0,y:0})
        return {
            x: Math.sign(junker.position.x - other.position.x) * -0.0001,
            y: Math.sign(junker.position.y - other.position.y) * -0.0001,
        }
    }

    // Pull towards
    if (junker.gameObject.magnetOn){
        return {
            x: Math.sign(junker.position.x - other.position.x) * magnetism,
            y: Math.sign(junker.position.y - other.position.y) * magnetism,
        }
    }
}

export function calculateAttraction(attractor, attractee) {
    if (goName(attractor) === 'EarthSprite') {
        return {
            x: Math.sign(attractor.position.x - attractee.position.x) * 0.00001,
            y: Math.sign(attractor.position.y - attractee.position.y) * 0.00001,
        }
    }

    if (goName(attractor) === 'EarthSprite') {
        return  {
            x: Math.sign(attractor.position.x - attractee.position.x) * 0.0001,
            y: Math.sign(attractor.position.y - attractee.position.y) * 0.0001,
        }
    }

    return 0
}