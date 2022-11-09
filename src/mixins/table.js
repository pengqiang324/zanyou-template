/**
 * @author pengqiang
 * @date 2022/08/29 14:00
 * @description 表格初始数据
*/

import { ref, watch } from 'vue' 

export default function() {
    const tableData = ref([])
    const loading = ref(false)
    const total = ref(0)
    const page = ref(1)
    const pageSize = ref(10)
    const doFetch = ref(null) // 请求接口方法

    const request = async (requestName) => {
        if (requestName) doFetch.value = requestName
        loading.value = true
        try {
            // 请求接口
            const res = await doFetch.value()
            total.value = res && +res.total || 0
        } finally {
            loading.value = false
        }
    }

    const handlePageChange = (value) => {
        page.value = value
    }

    const handleSizeChange = (value) => {
        pageSize.value = value
    }

    watch([page, pageSize], () => { request() })
    return {
        tableData,
        loading,
        total,
        page,
        pageSize,
        request,
        handlePageChange,
        handleSizeChange
    }
}

