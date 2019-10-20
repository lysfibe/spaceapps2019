export function goName(a) { return a.gameObject.constructor.name }

export function ownMagnitude({ x, y }) { 
    return Math.sqrt((x*x) + (y*y))
}

export function mag(posA, posB) {
    const x = posB.x - posA.x
    const y = posB.y - posA.y

    return Math.sqrt((x*x) + (y*y))
}

export function dotProd({ x: x1, y: y1 }, { x: x2, y: y2 }) {
    return (x1 * x2) + (y1 * y2)
}

export function angleBetween(vec1, vec2) {
    return dotProd(vec1, vec2) / (ownMagnitude(vec1) * ownMagnitude(vec2))
}