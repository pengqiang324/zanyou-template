import { dayjs } from "element-plus";
import { ref } from "vue";
export default function useMaxSpan(num, params) {
  const { unit = 'day', moveNum = 0 } = params || {}
  const tmpStartDay = ref(null);
  const calendarChange = ([_tmpStartDay, _temEndDay]) => {
    tmpStartDay.value = _temEndDay ? null : _tmpStartDay;
  };
  const disabledDateMaxSpan = (day) => {
    const currentDay = dayjs(day);
    const today = dayjs();
    if (currentDay.isAfter(today.subtract(moveNum, 'day'))) {
      return true;
    }
    if (tmpStartDay.value) {
      const aMonthAgo = dayjs(tmpStartDay.value).subtract(num, unit);
      if (currentDay.isBefore(aMonthAgo)) {
        return true;
      }
      const aMonthLater = dayjs(tmpStartDay.value).add(num, unit);
      if (currentDay.isAfter(aMonthLater)) {
        return true;
      }
    }
    return false;
  };

  return {
    calendarChange,
    disabledDateMaxSpan
  };
}