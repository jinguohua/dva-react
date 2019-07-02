import Address from '../../../location';
//面包屑 跳转路由
export const userBreadcrumb = [
    {
        name: 'Home',
        link: '',
        isLink: false
    }, {
        name: '后台管理',
        link: '',
        isLink: false
    }, {
        name: '用户管理',
        link: '',
        isLink: false
    }
];

export const userRoleBreadcrumb = [
    {
        name: '后台管理',
        link: '',
        isLink: false
    }, {
        name: '用户管理',
        link: '',
        isLink: false
    }, {
        name: '用户角色',
        link: '',
        isLink: false
    }
];

export const userRightBreadcrumb = [
    {
        name: '后台管理',
        link: '',
        isLink: false
    }, {
        name: '用户管理',
        link: '',
        isLink: false
    }, {
        name: '角色权限',
        link: '',
        isLink: false
    }
];

export const roleBreadcrumb = [
    {
        name: 'Home',
        link: '',
        isLink: false
    }, {
        name: '后台管理',
        link: '',
        isLink: false
    }, {
        name: '角色管理',
        link: '',
        isLink: false
    }
];

export const roleuserBreadcrumb = [
    {
        name: '后台管理',
        link: '',
        isLink: false
    }, {
        name: '角色管理',
        link: '',
        isLink: false
    }, {
        name: '用户列表',
        link: '',
        isLink: false
    }
];

export const rightBreadcrumb = [
    {
        name: 'Home',
        link: '',
        isLink: false
    }, {
        name: '后台管理',
        link: '',
        isLink: false
    }, {
        name: '权限列表',
        link: '',
        isLink: false
    }
];

export const uploadProps = {
    fileProps: {
        name: 'file',
        action: Address.ajaxPath + '/ajax/aliencode/verify/readExcel.html',
        headers: {
            authorization: 'authorization-text',
        }
    }
}

export const systemOption = [
    { key: '', value: '全部系统' },
    { key: 'caibeike-tps', value: '财务系统' },
    { key: 'caibeike-crm', value: '客户关系管理系统' },
    { key: 'caibeike-ops', value: '运营系统' },
    { key: 'caibeike-bs', value: '商户后台系统' },
]

export const systemOptionNoAll = [
    { key: 'caibeike-tps', value: '财务系统' },
    { key: 'caibeike-crm', value: '客户关系管理系统' },
    { key: 'caibeike-ops', value: '运营系统' },
    { key: 'caibeike-bs', value: '商户后台系统' },
]

export const resOption = [
    { key: '', value: '全部类型' },
    { key: 1, value: '菜单' },
    { key: 2, value: '界面' },
    { key: 3, value: '按钮' },
]

export const resTypeOption = [
    { key: 'L1', value: '最大风险' },
    { key: 'L2', value: '较高风险' },
    { key: 'L3', value: '中风险' },
    { key: 'L4', value: '中偏低风险' },
    { key: 'L5', value: '低风险' },
]

export const resTypeObj = {
    'L1': '最大风险',
    'L2': '较高风险',
    'L3': '中风险',
    'L4': '中偏低风险',
    'L5': '低风险',
}
