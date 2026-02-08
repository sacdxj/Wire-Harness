/**
 * SRI (Subresource Integrity) 哈希生成工具
 *
 * 使用方法:
 * 1. 下载外部脚本文件
 * 2. 运行此脚本生成 SRI 哈希
 * 3. 将哈希值添加到 CMScript.astro
 */

import { createHash } from 'crypto';

/**
 * 生成文件的 SHA-384 哈希值（SRI 格式）
 * @param {string} filePath - 文件路径
 * @returns {string} SRI 哈希值
 */
function generateSRI(filePath) {
  const fs = require('fs');
  const crypto = require('crypto');

  const fileContent = fs.readFileSync(filePath);
  const hash = crypto.createHash('sha384').update(fileContent).digest('base64');

  return `sha384-${hash}`;
}

/**
 * 为 CDN 资源生成 SRI
 * 需要先下载文件到本地
 */
async function generateCDNSRI() {
  const https = require('https');
  const fs = require('fs');
  const crypto = require('crypto');
  const path = require('path');

  const CDN_URL = 'https://unpkg.com/decap-cms@3.1.0/dist/decap-cms.js';
  const TEMP_FILE = path.join(process.cwd(), 'temp-decap-cms.js');

  console.log('📥 下载 Decap CMS 文件...');

  // 下载文件
  await new Promise((resolve, reject) => {
    https.get(CDN_URL, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`下载失败: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(TEMP_FILE);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log('✅ 下载完成\n');
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(TEMP_FILE, () => {}); // 清理临时文件
        reject(err);
      });
    });
  });

  // 生成 SRI
  console.log('🔐 生成 SRI 哈希...');
  const fileContent = fs.readFileSync(TEMP_FILE);
  const hash = createHash('sha384').update(fileContent).digest('base64');
  const sri = `sha384-${hash}`;

  // 清理临时文件
  fs.unlinkSync(TEMP_FILE);

  console.log('\n' + '='.repeat(60));
  console.log('✅ SRI 哈希生成完成！');
  console.log('='.repeat(60));
  console.log('\n在 src/components/CMScript.astro 中使用:\n');
  console.log(`const CMS_SRI = '${sri}';\n`);
  console.log('='.repeat(60) + '\n');

  // 验证说明
  console.log('📝 说明:');
  console.log('1. SRI 哈希确保文件未被篡改');
  console.log('2. 浏览器会自动验证文件完整性');
  console.log('3. 如果文件不匹配，浏览器拒绝加载\n');
}

// 主函数
if (import.meta.url === `file://${process.argv[1]}`) {
  generateCDNSRI().catch(console.error);
}

export { generateSRI };
