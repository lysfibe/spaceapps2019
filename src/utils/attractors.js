// import EarthSprite from '../sprites/Earth'
// import JunkerSprite from '../sprites/Junker'

function goName(a) { return a.gameObject.constructor.name }

function mag(posA, posB) {
    const x = posB.x - posA.x
    const y = posB.y - posA.y

    return Math.sqrt((x*x) + (y*y))
}

export function earthAttractor(earth, other) {
    return  {
        x: Math.sign(earth.position.x - other.position.x) * 0.0001,
        y: Math.sign(earth.position.y - other.position.y) * 0.0001,
    }
}

export function junkerAttractor(junker, other) {
    if (goName(other) === 'EarthSprite') {
        return 0
    }

    const distance = Math.abs(mag(other.position, junker.position))

    if (distance > 100) {
        return 0
    }

    return {
        x: Math.sign(junker.position.x - other.position.x) * 0.00001,
        y: Math.sign(junker.position.y - other.position.y) * 0.00001,
    }
}

export function calculateAttraction(attractor, attractee) {
    
    console.log("%s attracting %s", goName(attractor), goName(attractee))
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