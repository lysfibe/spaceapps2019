export function goName(a) { return a.gameObject.constructor.name }

export function mag(posA, posB) {
    const x = posB.x - posA.x
    const y = posB.y - posA.y

    return Math.sqrt((x*x) + (y*y))
}