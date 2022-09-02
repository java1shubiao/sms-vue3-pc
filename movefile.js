// 为了更符合公共模板和灰度服务取首次必须渲染的js、css，故对主css和js做打包提取，提到dist/projectName外层
// 参数 projectName： String 表示项目名称
class MoveFilePath {
    constructor(options) {
        const { projectName } = options;
        this.projectName = projectName;
    }
    // eslint-disable-next-line class-methods-use-this
    apply(compiler) {
        compiler.hooks.emit.tapAsync('MoveFilePath', (compilation, callback) => {
            compilation.chunkGroups.forEach(chunkGroup => {
                if (chunkGroup.constructor.name === 'Entrypoint') {
                    chunkGroup.chunks.forEach(chunk => {
                        chunk.files.forEach(filename => {
                            const source = compilation.assets[filename].source();
                            delete compilation.assets[filename];
                            // eslint-disable-next-line no-use-before-define
                            const newFileName = getFileName(filename);
                            compilation.assets[`${this.projectName}/${newFileName}`] = {
                                source() {
                                    return source;
                                },
                                size() {
                                    return source.length;
                                }
                            };
                        });
                    });
                }
            });
            callback();
        });
    }
}

// eslint-disable-next-line require-jsdoc
function getFileName(path) {
    const pathMap = path.split('/');
    return pathMap[pathMap.length - 1];
}
module.exports = MoveFilePath;
