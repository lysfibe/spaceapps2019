export function bindKeymap(scene, keymap) {
    Object.entries(keymap).forEach(([key, map]) => {
        const idx = `_${ key.toLowerCase() }Key`
        const keyObj = scene.input.keyboard.addKey(key)
        
        Object.entries(map).forEach(([event, listener]) => {
            keyObj.on(event, listener)
        })

        scene[idx] = keyObj
    })
}