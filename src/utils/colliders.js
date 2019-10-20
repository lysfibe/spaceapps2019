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
        alert('OH NO!')
        other.gameObject.wreck()
    }

    return true
}