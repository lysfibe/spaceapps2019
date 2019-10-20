import UI from './UI'

export default class Leaderboard extends UI {
    get name() {
        return 'leaderboard'
    }

    create() {
        const leaderboardFromStore = localStorage.getItem('leaderboard')
        this.records = leaderboardFromStore
            ? JSON.parse(leaderboardFromStore)
            : new Array(10).fill(0).map(_ => 0)

        this.leaderboard = document.createElement('ul')
        this.leaderboard.classList.add('leaderboard')

        this.items = this.records.map((value, position) => {
            const item = document.createElement('li')
            const place = document.createElement('span')
            place.textContent = position + 1
            const score = document.createElement('span')
            score.textContent = String(value)
            item.appendChild(place)
            item.appendChild(score)
            
            this.leaderboard.appendChild(item)
            return [item, place, score]
        })

        return this.leaderboard
    }

    update() {
        this.items.map(([_, __, score], idx) => {
            score.textContent = this.records[idx]
        })
    }

    add(value) {
        let isNewRecord = false
        for (let i = 0; i < 10; i++) {
            if (value > this.records[i]) {
                this.records.splice(i, 0, value)
                this.records = this.records.slice(0, 9)
                this.save()
                this.update()
                isNewRecord = true
                break;
            }
        }
    
        return isNewRecord
    }

    save() {
        localStorage.setItem('leaderboard', JSON.stringify(this.records))
    }
}