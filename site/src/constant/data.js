import React from 'react'

import home    from 'icon/icon_home.svg';
import home_c  from 'icon/icon_home_c.svg';
import sys     from 'icon/icon_sys.svg';
import sys_c   from 'icon/icon_sys_c.svg';


export const DATE_FORMAT  = 'YYYY/MM/DD'
export const MONTH_FORMAT = 'YYYY/MM'

export var MENU_MAIN = 
   [{ title:'Home',   icon: home,  iconc: home_c,  path: '/'          , role: 1},
    { title:'System', icon: sys,   iconc: sys_c,   path: '/system/0'  , role: 0}]

export var MENU_SYS = [
    { etl:'Imp Students'    , ctl:'导入学生' },
    { etl:'Mooc Schedule'   , ctl:'慕课计划' },
    { etl:'Mooc Schedule'   , ctl:'批改实验' },
    { etl:'Define Term'     , ctl:'学期起止' },
    { etl:'Add abnormal'    , ctl:'异常休假' },
    { etl:'Question DB'     , ctl:'题库管理' },
    { etl:'Card Result'     , ctl:'打卡统计' },
    { etl:'Answer Result'   , ctl:'答题统计' }]

