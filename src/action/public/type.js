// 基本信息更新+新增 、查询
export const USERNAME = 'USERNAME';

export const getUserMessage = json => {
    return {
        type: USERNAME,
        json
    };
};
