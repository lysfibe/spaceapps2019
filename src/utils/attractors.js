// import EarthSprite from '../sprites/Earth'
// import JunkerSprite from '../sprites/Junker'

import { goName, mag } from './general'

export function earthAttractor(earth, other) {
    const distance = Math.abs(mag(other.position, earth.position))
    const d2 = distance^2
    return  {
        x: Math.sign(earth.position.x - other.position.x) * 0.001/d2,
        y: Math.sign(earth.position.y - other.position.y) * 0.001/d2,
    }
}

export function junkerAttractor(junker, other) {
    if (goName(other) === 'EarthSprite') {
        return 0
    }

    const distance = Math.abs(mag(other.position, junker.position))
    const d2 = distance^2

    // Out of range
    if (distance > 100) {
        return 0
    }


    // Push away
    else if( distance < junker.shape.radius + 10){
        return {
            x: -Math.sign(junker.position.x - other.position.x) * 0.000001,
            y: -Math.sign(junker.position.y - other.position.y) * 0.000001,
        }
    }

    // Pull towards
    else{
        return {
            x: Math.sign(junker.position.x - other.position.x) * 0.0005/d2,
            y: Math.sign(junker.position.y - other.position.y) * 0.0005/d2,
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