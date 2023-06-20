/* eslint-disable no-unused-vars */
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CharacterCount from '@tiptap/extension-character-count';
import Link from '@tiptap/extension-link';
import './Tiptap.scss';
import { useEffect, useState } from 'react';
import MenuBar from './MenuBar';
import CustomHeading from './ext/CustomHeadings';
import CustomAlign from './ext/CustomAlign';
import { TipTapCustomImage } from './Image';
import ImageForm from './components/ImageForm';
import { readFileAsDataURL } from './support';
import { MEDIA_URL } from '../../consts';

// EditorView.prototype.updateState = function updateState(state) {
//   if (!this.docView) return; // This prevents the matchesNode error on hot reloads
//   this.updateStateInner(state, this.state.plugins !== state.plugins);
// };

function srcUrl(src) {
  return `${MEDIA_URL}/get/${src}`;
}

async function upload(file) {
  const formData = new FormData();
  formData.append(file.name || 'file', file);
  const res = await fetch(`${MEDIA_URL}upload`, {
    method: 'POST',
    body: formData
  });
  const json = await res.json();
  console.log(file, json);
  return json.src ? srcUrl(json.src) : null;
}

function Tiptap({
  content, label, setContent, tabIndex
}) {
  const [file, setFile] = useState(null);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        horizontalRule: {
          HTMLAttributes: {
            // TODO update colour classes
            class: 'h-px my-8 bg-black border-0'
          }
        }
      }),
      Link.configure({
        HTMLAttributes: {
          class: 'hover:underline cursor-pointer'
        }
      }),
      CustomHeading,
      CustomAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      // Image,
      TipTapCustomImage(upload),
      CharacterCount,
    ],
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none whitespace-pre-wrap overflow-y-scroll w-full',
        style: 'height: 400px;'
      },
    },
    content: content || '',
    onUpdate: ({ editor: e }) => {
      // console.log(e.getText());
      // console.log(e.getHTML(), transaction);
      if (setContent) setContent(e.getHTML());
    },
    // onBeforeCreate: ({ editor: e }) => {
    //   console.log(e.getJSON(), 'before create event');
    // },
    // onCreate: ({ editor: e }) => {
    //   // console.log('create event');
    //   // e.setOptions({ content: content || '' });
    // },
    // onSelectionUpdate: () => {
    //   // console.log('selection update event');
    // },
    // onTransaction: ({ editor: e, transaction: t }) => {
    //   // console.log('transaction event');
    // },
  });

  const handleUpload = async (f) => {
    const result = await readFileAsDataURL(f);

    return result;
  };

  useEffect(() => {
    async function handleImageUpload() {
      if (file && editor) {
        const src = await handleUpload(file);
        console.log({ src });
        editor.chain().focus()?.setImage({ src })?.run();
      }
    }
    handleImageUpload();
  }, [file]);

  if (!editor) return <div>An issue prevented the editor from starting</div>;

  // console.log(editor);

  return (
    <>
      {label && (
      <div className="text-lg py-2 font-bold">
        {label}
      </div>
      )}
      <ImageForm
        onInput={(e) => {
          console.log(e.target.files);
        }}
      />
      <div
        className="border-2 col font-bold border-slate-400 dark:border-slate-600 w-full"
      >
        <MenuBar editor={editor} />
        <EditorContent
          tabIndex={tabIndex}
          editor={editor}
        />
        <div className="row w-full justify-start items-center border-t">
          <span className="border-r ml-2 p-1">
            {editor.storage.characterCount.characters()} characters
          </span>
          <span className="border-r ml-2 p-1">
            {editor.storage.characterCount.words()} words
          </span>
        </div>
      </div>
    </>
  );
}

export default Tiptap;
