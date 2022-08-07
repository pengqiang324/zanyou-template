import { defineStore } from 'pinia'

export const hello = defineStore({
    id: 'helloStore',

    state: () => {
        return {
            title: '测试',
            number: 1
        }
    },

    actions: {
        setTitle(data) {
            this.title = data
            console.log(this.title, data)
        }
    }
})