// 基本信息更新+新增 、查询
export const HOMEMEUNS = 'HOMEMEUNS';

export const setHomeMenus = json => {
    return {
        type: HOMEMEUNS,
        json
    };
};
