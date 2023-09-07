import { useFieldExtension } from '../hooks/useFieldExtension';
import { Range, type editor } from 'monaco-editor';
import { Editor as MonacoEditor } from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';

type Props = {
  workerURL: string;
};

export const Editor: React.FC<Props> = ({ workerURL }) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor>();
  const { message, postData } = useFieldExtension<string | undefined>();
  const [data, setData] = useState('');

  /** フィアルアップロードを実行する */
  const onPasteImage = async (file: File) => {
    console.log('try file upload', file);

    const url = new URL(workerURL);

    url.pathname = '/gyazo/upload';

    const res = await fetch(url, {
      method: 'put',
      body: new Blob([file], { type: file.type }),
    });

    console.log(res);

    if (!res.ok) throw new Error('failed to upload');

    const { url: imageUrl } = await res.json();
    console.log('upload complete', imageUrl);
    const editor = editorRef.current;
    const position = editor?.getPosition();

    console.log('check exists', editor, position);

    if (!position || !editor) return;

    editor.executeEdits('', [
      {
        range: new Range(
          position.lineNumber,
          position.column,
          position.lineNumber,
          position.column,
        ),
        text: `\n![image](${imageUrl})\n\n`,
      },
    ]);
  };

  useEffect(() => {
    editorRef.current?.setValue(message?.data ?? '');
  }, [message]);

  /** エディタにペーストイベントを仕込む */
  useEffect(() => {
    const callback = (e: ClipboardEvent) => {
      if (!e.clipboardData?.items) return;

      for (const item of e.clipboardData.items) {
        console.log(item.type);

        if (item.type.startsWith('image/')) {
          e.preventDefault();
          e.stopPropagation();

          const file = item.getAsFile();

          if (file) {
            onPasteImage(file);
          }
        }
      }
    };

    editorRef.current
      ?.getContainerDomNode()
      .addEventListener('paste', callback, true);

    return () =>
      editorRef.current
        ?.getContainerDomNode()
        .removeEventListener('paste', callback, true);
  }, [editorRef.current]);

  return (
    <div>
      <div className="border-sumi-300 overflow-hidden rounded border">
        <MonacoEditor
          height={500}
          defaultLanguage="markdown"
          defaultValue={message?.data ?? ''}
          options={{
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            renderLineHighlight: 'none',
          }}
          onMount={(editor) => {
            editorRef.current = editor;
          }}
          onChange={(value = '') => {
            postData({ data: value });
            setData(value);
          }}
        />
      </div>
      <p className="mt-1 text-right text-xs text-gray-400">{data.length}</p>
    </div>
  );
};
