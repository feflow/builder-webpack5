import webpack from 'webpack';
import Builder from './builder';
import Config from './config';
import Server from './server';
export interface BaseConfig {
    [propName: string]: any;
}

const builderOptions = Config.getBuildConfig();
const devConfig: BaseConfig = Builder.createDevConfig(builderOptions);
const prodConfig: BaseConfig = Builder.createProdConfig(builderOptions);

function builderWebpack4 (cmd: string) {
  if (cmd === 'dev') {
      Server(devConfig);
  } else if (cmd === 'build') {
    webpack(prodConfig, (err: any, stats: any) => {
      if (err) console.log(err);
      console.log(stats.toString({
        chunks: false,
        colors: true,
        children: false
      }));
    });
  }
}
export default builderWebpack4;
exports.default.devConfig = devConfig;
exports.default.prodConfig = prodConfig;
module.exports = exports.default;


