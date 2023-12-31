import type { MarkedExtension } from 'marked';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import markdown from 'highlight.js/lib/languages/markdown';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import scss from 'highlight.js/lib/languages/scss';
import diff from 'highlight.js/lib/languages/diff';
import json from 'highlight.js/lib/languages/json';
import yaml from 'highlight.js/lib/languages/yaml';
import shell from 'highlight.js/lib/languages/shell';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('diff', diff);
hljs.registerLanguage('json', json);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('shell', shell);

export const codeBlock = {
  renderer: {
    code(code, info = '', escaped) {
      const [language, fileName = ''] = info.split(':');
      const highlighted = language
        ? hljs.highlight(code, { language }).value
        : code;

      return `
        <div class="code-block">
          ${
            fileName
              ? `<div class="label">${fileName}</div>`
              : '<!-- plain text -->'
          }
          <div class="scroller">
            <div class="gap"></div>
            <pre><code>${highlighted}</code></pre>
            <div class="gap"></div>
          </div>
        </div>
      `;
    },
  },
} satisfies MarkedExtension;
