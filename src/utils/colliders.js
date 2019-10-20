import { goName, mag } from './general'

export function earthCollider(scene, a, b) {
    let earth = null
    let other = null

    if (goName(a) === 'EarthSprite') {
        earth = a
        other = b
    } else if (goName(b) === 'EarthSprite') {
        other = a
        earth = b
    }

    if (earth == null) {
        return false
    } else {
        console.log('ERF')
    }

    if (goName(other) === 'AsteroidSprite') {
        console.log("Asteroid Collected", other)
        other.gameObject.wreck()
        scene.player.kaching(100)
    } else if (goName(other) === 'JunkerSprite') {
        alert('OH NO!')
        other.destroy()
    }

    return true
}