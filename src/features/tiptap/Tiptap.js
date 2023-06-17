/* eslint-disable no-unused-vars */
import { useEditor, EditorContent } from '@tiptap/react';
// import { EditorView } from 'prosemirror-view';
import StarterKit from '@tiptap/starter-kit';
// import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import './Tiptap.scss';
import MenuBar from './MenuBar';
import CustomHeading from './ext/CustomHeadings';
import CustomAlign from './ext/CustomAlign';
import { TipTapCustomImage } from './Image';

// EditorView.prototype.updateState = function updateState(state) {
//   if (!this.docView) return; // This prevents the matchesNode error on hot reloads
//   this.updateStateInner(state, this.state.plugins !== state.plugins);
// };

function Tiptap({
  content, label, setContent, tabIndex
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        horizontalRule: {
          HTMLAttributes: {
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

  // console.log(editor);

  return (
    <>
      {label && (
      <div className="text-lg py-2 font-bold">
        {label}
      </div>
      )}
      <div
        className="border-2 font-bold border-slate-400 dark:border-slate-600 w-full"
      >
        <MenuBar editor={editor} />
        <EditorContent
          tabIndex={tabIndex}
          editor={editor}
          style={{
            height: '120px'
          }}
        />
      </div>
    </>
  );
}

export default Tiptap;
