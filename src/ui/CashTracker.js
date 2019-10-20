import UI from './UI'

export default class CashTracker extends UI {
    get name() {
        return 'cashmoney'
    }

    create() {
        this.cash = document.createElement('span')
        this.cash.classList.add('cashmoney')
        this.cash.textContent = '¥0'

        return this.cash
    }

    update(value) {
        this.cash.textContent = `¥${ value }`
    }
}