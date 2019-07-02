let Address: any = {};

if (process.env.NODE_LOCATION === 'development') {
    Address.path = '//172.10.2.154:3202';
    Address.ajaxPath = '/backend';
    Address.originPath = '/rms'
}

if (process.env.NODE_LOCATION === 'dev') {
    Address.path = '//dev.caibeike.net';
    Address.ajaxPath = '/backend';
    Address.originPath = '/rms'
}

if (process.env.NODE_LOCATION === 'pre') {
    Address.path = '//pre.caibeike.net';
    Address.ajaxPath = '/backend';
    Address.originPath = '/rms'
}

if (process.env.NODE_LOCATION === 'production') {
    Address.path = '//ops.caibeike.com';
    Address.ajaxPath = '/backend';
    Address.originPath = ''
}

export default Address;
