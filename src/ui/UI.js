export default class UI {
    constructor(name = this.name) {
        this.container = document.createElement('div')
        this.container.classList.add('ui-container', `${ name }-container`)

        const components = this.create()
        if (Array.isArray(components)) {
            components.filter(Boolean).forEach(c => this.container.appendChild(c))
        } else if (components instanceof Node) {
            this.container.appendChild(components)
        }
    }

    create() {
        return null
    }

    update() {}

    mount(container) {
        container.appendChild(this.container)
    }
    unmount() {
        this.container.parentElement.removeChild(this.container)
    }
}