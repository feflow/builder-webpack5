
import fs from 'fs';
import path from 'path';

class Config {
    /**
     * @function getPath
     * @desc     Find feflow.json file
     */
    static getPath(filename: string): string {
        let currDir: string = process.cwd();

        while (!fs.existsSync(path.join(currDir, filename))) {
            currDir = path.join(currDir, '../');

            // unix跟目录为/， win32系统根目录为 C:\\格式的
            if (currDir === '/' || /^[a-zA-Z]:\\$/.test(currDir)) {
                return '';
            }
        }

        return currDir;
    }

    /**
     * @function getBuildConfig
     * @desc     Find builder type in feflow.json
     */
    static getBuildConfig(){
        let builderOptions;

        if (Config.getPath('feflow.json')) {
            const jsonConfigFile = path.join(Config.getPath('feflow.json'), './feflow.json');
            const fileContent = fs.readFileSync(jsonConfigFile, 'utf-8');

            let feflowCfg;

            try {
                feflowCfg = JSON.parse(fileContent);
            } catch (ex) {
                console.error('请确保feflow.json配置是一个Object类型，并且含有builderOptions字段');
            }

            builderOptions = feflowCfg.builderOptions;

            if (!builderOptions) {
                console.error('请确保feflow.js配置包含builderOptions字段，且内容不为空');
                return {};
            }

            return builderOptions;
        } else if (Config.getPath('feflow.js')) {
            const jsConfigFile = path.join(Config.getPath('feflow.js'), './feflow.js');

            let feflowCfg = require(jsConfigFile);

            builderOptions = feflowCfg.builderOptions;

            if (!builderOptions) {
              console.error('请确保feflow.js配置包含builderOptions字段，且内容不为空');
                return {};
            }
            return builderOptions;
        } else {
            console.error('未找到 feflow 配置文件 feflow.json 或者 feflow.js');
            return {};
        }
    }
}

export default Config;