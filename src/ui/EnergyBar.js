import UI from './UI'

export default class EnergyBar extends UI {
    get name() {
        return 'healthbar'
    }

    create() {
        this.bar = document.createElement('div')
        this.bar.classList.add('healthbar')
        return this.bar
    }

    update(value) {
        this.bar.style.width = `${ value }px`
        if (value < 25) this.bar.style.backgroundColor = 'red';
    }
}