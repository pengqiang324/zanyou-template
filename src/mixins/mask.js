import { ref, watch } from "vue"
import { MASK } from 'application-message-plus'
export default function() {
    const dialogVisible = ref(false)
    watch(dialogVisible, (val) => {
        MASK(val)
    })
    const handleBeforeClose = (done) => {
        MASK(false)
        done()
    }
    return {
        dialogVisible,
        handleBeforeClose
    }
}