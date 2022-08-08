import { defineStore } from 'pinia'

export const userInfo = defineStore('userInfo', {
    state: () => {
        return {
            token: '',
            buttons: [], // 按钮权限
            admintype: '', // 是否是超管
        }
    },

    actions: {
        GetInfo (data) {
            this.admintype = data.adminType
            this.buttons = data.permissions
        },

        // 设置用户token
        SetToken (data) {
            this.token = data
        }
    }
})