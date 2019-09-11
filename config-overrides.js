const { addWebpackAlias,override, fixBabelImports, addLessLoader,addDecoratorsLegacy } = require('customize-cra');

 module.exports = override(
       fixBabelImports('import', {
             libraryName: 'antd',
         libraryDirectory: 'es',
           style: true,
       }),
     addLessLoader({
            javascriptEnabled: true,
       modifyVars: { '@primary-color': '#1DA57A' },
 }),
     // 添加babel插件支持 装饰器 语法：简化高阶组件使用
     addDecoratorsLegacy(),
     // 配置路径别名：简化路径(问题：路径没有提示)
     addWebpackAlias({

     })
 );