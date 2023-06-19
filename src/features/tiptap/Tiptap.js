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

// EditorView.prototype.updateState = function updateState(state) {
//   if (!this.docView) return; // This prevents the matchesNode error on hot reloads
//   this.updateStateInner(state, this.state.plugins !== state.plugins);
// };

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
            class: 'h-px my-8 bg-gray-200 border-0 dark:bg-gray-700'
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
      TipTapCustomImage((v) => {
        console.log(v);
      }),
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

  console.log(editor);

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
        className="border-2 font-bold border-slate-400 dark:border-slate-600 w-full"
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
