import { userInfo } from '@/store/modules/userInfo'

/**
 * 控制按钮是否显示
 *
 * @author pengqiang
 * @date 2021/07/26 13:59
 */
 export function hasBtnPermission (permission) {
   const userInfoStore = userInfo()
   const myBtns = userInfoStore.buttons
   const admintype = userInfoStore.admintype
   // eslint-disable-next-line eqeqeq
   if (admintype == '1') {
      // 超级管理员
      return true
   }
   return myBtns.indexOf(permission) > -1
  }
