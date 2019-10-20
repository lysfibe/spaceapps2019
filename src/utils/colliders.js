import { goName, mag } from './general'

export function earthCollider(scene, a, b) {
    let earth = null
    let other = null

    if (a.gameObject.name === 'earth') {
        earth = a
        other = b
    } else if (b.gameObject.name === 'earth') {
        other = a
        earth = b
    }

    if (earth == null) {
        return false
    }

    if (other.gameObject.name.startsWith('asteroid')) {
        other.gameObject.wreck()
        scene.player.kaching(100)
    } else if (other.gameObject.name === 'junker') {
        scene.onLose()
    }

    return true
}

const isShip = a => a.gameObject.name === 'junker'
const isAsteroid = a => a.gameObject.name.startsWith('asteroid_')
const isEarth = a => a.gameObject.name === 'earth'

export function asteroidShipCollider(scene, a, b) {
    let player = null
    let asteroid = null

    if (isShip(a)) {
        player = a
        if (isAsteroid(b)) {
            asteroid = b
        }
    } else if (isShip(b)) {
        player = b
        if (isAsteroid(a)) {
            asteroid = a
        }
    }

    if (player == null || asteroid == null) {
        return false
    }

    if (player.gameObject.repelObjects(600)) {
        return true
    } else {
        scene.onLose()
        return true
    }
}