
module.exports = {
  coverageDirectory: "./coverage", // Jest输出覆盖信息文件的目录。
  collectCoverageFrom: ["**/src/**/*.js"], //哪些文件需要收集覆盖率信息
  coveragePathIgnorePatterns: [ // 文件路径匹配
    "/__tests__/",
    "/__mocks__/",
  ],
  coverageReporters: ["json", "lcov", "text", "cobertura"], //覆盖率报告时使用的名称
  projects: [ //所有指定项目中运行测试
    './'
  ],
  globalSetup: './', //自定义全局设置模块，该模块导出一个异步功能
  watchPlugins: [ //自定义监视插件
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
    "jest-watch-select-projects"
  ],
};
