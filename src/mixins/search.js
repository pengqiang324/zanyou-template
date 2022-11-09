
/**
 * @author pengqiang
 * @date 2022/08/29 14:00
 * @description 搜索表单初始数据
*/

import { ref } from 'vue'
import baseTable from './table'


export default function() {
    const { request, loading, total } = baseTable()
    const searchForm = ref(null)

    const resetTable = () => {
        if (!searchForm.value) return
        searchForm.value.resetFields() // 清空表单
    }

    const searchData = async (doFetch) => {
        await searchForm.value.validate(async (valid) => {
            if (valid) {
                await request(doFetch)
            }
        })
    }

    return {
        searchForm,
        resetTable,
        searchData,
        loading,
        total
    }
}