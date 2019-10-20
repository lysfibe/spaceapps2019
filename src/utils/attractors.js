// import EarthSprite from '../sprites/Earth'
// import JunkerSprite from '../sprites/Junker'

import { goName, mag } from './general'

export function earthAttractor(earth, other) {
    const distance = Math.abs(mag(other.position, earth.position))
    const gravity = 0.0015/(2 * Math.PI * distance)
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
    const magnetism = 0.05/(2 * Math.PI * distance*distance)

    // Out of range
    if (distance > 100) {
        return 0
    }

    // Push away
    else if( distance < junker.shape.radius + 10){
        return {
            x: -Math.sign(junker.position.x - other.position.x) * magnetism/distance,
            y: -Math.sign(junker.position.y - other.position.y) * magnetism/distance,
        }
    }

    // Pull towards
    else{
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