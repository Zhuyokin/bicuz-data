// 请求响应参数（不包含data）
export interface Result {
  code: string
  msg: string
}

// 请求响应参数（包含data）
export interface ResultData<T = any> extends Result {
  data: T
}

// 分页响应参数
export interface ResPage<T> {
  list: T[]
  pageNum: number
  pageSize: number
  total: number
}

// 分页请求参数
export interface ReqPage {
  pageNum: number
  pageSize: number
}

// 文件上传模块
export namespace Upload {
  export interface ResFileUrl {
    fileUrl: string
  }
}

// 登录模块
export namespace Login {
  export interface ReqLoginForm {
    phone?: string
    code?: string
    version?: string
    agent?: string
    device_id?: string
  }
  export interface ResLogin {
    token: string
    [key: string]: any
  }
  export interface ResAuthButtons {
    [key: string]: string[]
  }
}

// 用户管理模块
export namespace User {
  export interface ReqUserParams extends ReqPage {
    username: string
    gender: number
    idCard: string
    email: string
    address: string
    createTime: string[]
    status: number
  }
  export interface ResUserList {
    id: string
    username: string
    gender: number
    user: { detail: { age: number } }
    idCard: string
    email: string
    address: string
    createTime: string
    status: number
    avatar: string
    photo: any[]
    children?: ResUserList[]
  }
  export interface ResStatus {
    userLabel: string
    userValue: number
  }
  export interface ResGender {
    genderLabel: string
    genderValue: number
  }
  export interface ResDepartment {
    id: string
    name: string
    children?: ResDepartment[]
  }
  export interface ResRole {
    id: string
    name: string
    children?: ResDepartment[]
  }
}

// 拍拍关系模块
export namespace Couple {
  export interface ResConfList {
    id: number
    name: string
    tree_price: string
  }
  export interface ResDescribe {
    anim_list?: ResConfList[]
    conf_list?: ResConfList[]
  }
}

// 公会模块
export namespace Guild {
  export interface ResGuild {
    [key: string]: any
  }
  export interface ReqGuildApply {
    [key: string]: any
  }
}

// 邀请模块
export namespace Invite {
  export interface ReqInvite {
    [key: string]: any
  }
  export interface ResInvite {
    [key: string]: any
  }
}

// 礼物模块
export namespace Gift {
  export interface ReqGift {
    [key: string]: any
  }
  export interface ResGift {
    [key: string]: any
  }
  export interface ReqGiftBoxDetail {
    box_id: number
  }
  export interface GiftItem {
    id: number
    gift_name: string
    gift_photo: string
    gift_diamond: number
  }
  export interface ResGiftBoxDetail {
    id: number
    name: string
    icon: string
    gift_list: GiftItem[]
  }
}

// 宠物模块
export namespace Pet {
  export interface ReqPet {
    [key: string]: any
  }
  export interface ResPet {
    [key: string]: any
  }
  export interface ReqGiftBoxDetail {
    box_id: number
  }
  export interface GiftItem {
    id: number
    gift_name: string
    gift_photo: string
    gift_diamond: number
  }
  export interface ResGiftBoxDetail {
    id: number
    name: string
    icon: string
    gift_list: GiftItem[]
  }
}

// 充值活动模块
export namespace Recharge {
  export interface ReqRecharge {
    [key: string]: any
  }
  export interface ResRecharge {
    [key: string]: any
  }
}
// 活动模块
export namespace Activity {
  export interface ReqActivity {
    [key: string]: any
  }
  export interface ResActivity {
    [key: string]: any
  }
  export interface GiftItem {
    id: number
    gift_name: string
    gift_photo: string
    gift_diamond: number
  }
  export interface ResActivityInfo {
    id: number
    title: string
    start_time: number
    end_time: number
    gift_list: GiftItem[]
  }

  export interface RankingItem {
    user_ranking: number;
    user_id: number;
    user_nickname: string;
    user_face: string;
    live_user_id: number;
    live_user_nickname: string;
    live_user_face: string;
    value: number;
    desc: string;
  }

  export interface ResActivityRanking {
    list: RankingItem[];
    my: RankingItem;
  }
}

// 周星活动模块
export namespace WeekStar {
  export interface ReqWeekStar {
    [key: string]: any
  }
  export interface ResWeekStar {
    [key: string]: any
  }
}

// 通用模块
export namespace Common {
  export interface ReqCommon {
    [key: string]: any
  }
  export interface ResCommon {
    [key: string]: any
  }
}