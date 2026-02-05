#!/usr/bin/env node

/**
 * React Compatibility Checker
 * Verifies React 18 installation and Decap CMS compatibility
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';

const PACKAGE_JSON = 'package.json';
const REACT_VERSION_RANGE = '^18.0.0';

console.log('🔍 Checking React compatibility...\n');

try {
  const packagePath = resolve(PACKAGE_JSON);
  const pkg = JSON.parse(readFileSync(packagePath, 'utf-8'));

  const reactVersion = pkg.dependencies?.react;
  const reactDOMVersion = pkg.dependencies?.['react-dom'];
  const astroReactVersion = pkg.dependencies?.['@astrojs/react'];

  // Check React installation
  if (!reactVersion) {
    console.error('❌ React not found in dependencies');
    console.log('   Run: npm install react@^18.3.1 react-dom@^18.3.1');
    process.exit(1);
  }

  // Check React version
  if (!reactVersion.startsWith('18')) {
    console.error(`❌ Wrong React version: ${reactVersion}`);
    console.log('   Expected: React 18.x for Decap CMS compatibility');
    console.log('   Current: ' + reactVersion);
    console.log('\n   ⚠️  Decap CMS 3.x requires React 18');
    console.log('   ⚠️  Do NOT upgrade to React 19 until Decap CMS supports it');
    console.log('\n   To fix: npm install react@^18.3.1 react-dom@^18.3.1');
    process.exit(1);
  }

  console.log('✅ React version:', reactVersion);
  console.log('✅ React DOM version:', reactDOMVersion);
  console.log('✅ Astro React integration:', astroReactVersion || 'Not installed');

  // Check for React 19 conflicts
  if (reactVersion.startsWith('19')) {
    console.warn('\n⚠️  WARNING: React 19 detected');
    console.warn('   Decap CMS 3.x may not be compatible with React 19');
    console.warn('   Recommended: Downgrade to React 18.3.1');
    console.warn('\n   npm install react@^18.3.1 react-dom@^18.3.1');
  }

  // Check type definitions
  const typesReact = pkg.devDependencies?.['@types/react'];
  const typesReactDOM = pkg.devDependencies?.['@types/react-dom'];

  if (!typesReact || !typesReactDOM) {
    console.warn('\n⚠️  TypeScript type definitions missing');
    console.warn('   Recommended: npm install -D @types/react@^18 @types/react-dom@^18');
  } else {
    console.log('✅ @types/react:', typesReact);
    console.log('✅ @types/react-dom:', typesReactDOM);
  }

  console.log('\n✅ All checks passed! React 18 is properly configured.\n');
  console.log('📚 For more information, see REACT_COMPATIBILITY.md\n');

} catch (error) {
  console.error('❌ Error reading package.json:', error.message);
  process.exit(1);
}
