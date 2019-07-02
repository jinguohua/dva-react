import React from 'react';
import './index.less';
import { Error } from '@/components/index';

export const Loading = ({ pastDelay, timedOut, error }) => {
    console.log(pastDelay, timedOut, error)
    if (pastDelay) {
        return '加载中';
    } else if (timedOut) {
        return <Error />;
    } else if (error) {
        return <Error />;
    }
    return null;
};
