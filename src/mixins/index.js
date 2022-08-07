import { ref, nextTick } from "vue"

export default function() {
    const tableRef = ref(null)
    const checkListMixin = ref([])
    const checkChange = (checkList) => {
        checkListMixin.value = checkList
        nextTick(() => {
            tableRef.value.doLayout()
        })
    }
    const filterLabel = (label) => {
        return checkListMixin.value.includes(label)
    }
    return {
        tableRef,
        checkChange,
        filterLabel
    }
}