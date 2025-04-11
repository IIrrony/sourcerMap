import axios from 'axios';
import sourceMap from 'source-map-js';

const getSourceMapUrl = async (url: string) => {
  // 获取map文件的url
  const res = await axios.get(url);
  return res;
}

const findCodeBySourceMap = async (stackFrame: any) => {
  // 获取map文件
  // url + '存放map文件的服务器地址' + stackFrame.fileName + '.map'
  const sourceMapFile = await getSourceMapUrl(stackFrame.fileName + '.map');
  // 获取map文件
  const fileContent = sourceMapFile.data;
  // 解析map文件
  const consumer = await new sourceMap.SourceMapConsumer(fileContent);
  // 获取原始代码报错位置
  const originalPosition = consumer.originalPositionFor({
    line: stackFrame.lineNumber,
    column: stackFrame.columnNumber,
  });

  const code = consumer.sourceContentFor(originalPosition.source)

  console.log('还原之后的code', code);

}


export { findCodeBySourceMap }
