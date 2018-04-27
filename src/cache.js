// https://github.com/pamelafox/lscache
// https://github.com/rsms/js-lru
// https://github.com/HQarroum/timed-cache
// https://github.com/isaacs/node-lru-cache


// 实现类似memcache缓存功能，可配置支持以下功能

// 支持配置缓存api fetch-unless-cached
// 支持配置缓存有效时间 lscache
// 支持数据持久化缓存（localStorage ~ 5MB）storage
// 支持最近最少使用原则 js-lru
// 当不能支持时，降级为内存缓存实现
