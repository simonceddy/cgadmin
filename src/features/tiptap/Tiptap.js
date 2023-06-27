/* eslint-disable no-unused-vars */
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CharacterCount from '@tiptap/extension-character-count';
import Link from '@tiptap/extension-link';
import './Tiptap.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuBar from './MenuBar';
import CustomHeading from './ext/CustomHeadings';
import CustomAlign from './ext/CustomAlign';
import { TipTapCustomImage } from './Image';
import ImageForm from './components/ImageForm';
import { readFileAsDataURL } from './support';
import ImageProps from './components/ImageProps';
import { upload } from '../../util/media';
import Button from '../../components/Button';

// EditorView.prototype.updateState = function updateState(state) {
//   if (!this.docView) return; // This prevents the matchesNode error on hot reloads
//   this.updateStateInner(state, this.state.plugins !== state.plugins);
// };

function Tiptap({
  content, label, setContent, tabIndex, saveData, onClose
}) {
  // const [file, setFile] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [modified, setModified] = useState(false);

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
        style: 'height: 450px;'
      },
    },
    content: content || '',
    onUpdate: ({ editor: e }) => {
      // console.log(e.getText());
      // console.log(e.getHTML(), transaction);
      if (!modified) setModified(true);
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
    // onTransaction: ({ editor: e, transaction }) => {
    //   const img = e.getAttributes('image');
    //   if (img.src) {
    //     // console.log('transaction event', img, transaction);
    //     setSelectedImg(img);
    //   }
    // },
  });

  // const handleUpload = async (f) => {
  //   const result = await readFileAsDataURL(f);

  //   return result;
  // };

  // useEffect(() => {
  //   async function handleImageUpload() {
  //     if (file && editor) {
  //       const src = await handleUpload(file);
  //       console.log({ src });
  //       editor.chain().focus()?.setImage({ src })?.run();
  //     }
  //   }
  //   handleImageUpload();
  // }, [file]);

  const setImageAtrr = (attr = {}) => {
    const newImgNode = editor.schema.nodes.image.create(attr);
    const transaction = editor.view.state.tr.replaceSelectionWith(newImgNode);
    editor.view.dispatch(transaction);
  };

  if (!editor) return <div>An issue prevented the editor from starting</div>;

  // console.log(editor);

  return (
    <>
      {label && (
      <div className="text-lg py-2 font-bold">
        {label}
      </div>
      )}
      {/* <ImageForm
        onInput={(e) => {
          console.log(e.target.files);
        }}
      /> */}
      {selectedImg && (
      <ImageProps
        setImage={({ width, height }) => {
          setImageAtrr({
            ...selectedImg,
            width,
            height
          });
          const img = editor.getAttributes('image');
          if (img.src) {
            setSelectedImg(img);
          }
        }}
        setWidth={(v) => {
          setImageAtrr({
            ...selectedImg,
            width: Number(v)
          });
          const img = editor.getAttributes('image');
          if (img.src) {
            setSelectedImg(img);
          } else {
            console.log('add image');
          }
          // TODO Figure out how to do this
          // editor.chain().focus().setImage({
          //   ...selectedImg,
          //   width: Number(v)
          // }).run();
          // console.log(editor.chain().focus());
        }}
        setHeight={(v) => {
          setImageAtrr({
            ...selectedImg,
            height: Number(v)
          });
          const img = editor.getAttributes('image');
          if (img.src) {
            setSelectedImg(img);
          } else {
            console.log('add image');
          }
          // TODO Figure out how to do this
          // editor.chain().focus().setImage({
          //   ...selectedImg,
          //   width: Number(v)
          // }).run();
          // console.log(editor.chain().focus());
        }}
        onClose={() => setSelectedImg(null)}
        image={selectedImg}
      />
      )}
      <div
        className="border-2 col font-bold border-slate-400 dark:border-slate-600 w-full h-[500px]"
      >
        <div className="col w-full">
          <MenuBar
            setImage={(i) => {
              setSelectedImg(i);
            }}
            editor={editor}
          />
          <EditorContent
            tabIndex={tabIndex}
            editor={editor}
          />
        </div>
        <div className="row w-full mt-3 justify-start items-center border-t">
          <span className="border-r ml-2 p-1">
            {editor.storage.characterCount.characters()} characters
          </span>
          <span className="border-r ml-2 p-1">
            {editor.storage.characterCount.words()} words
          </span>
        </div>
        <div className="row w-full mt-2">
          <Button
            disabled={!modified}
            onClick={() => {
              if (saveData) {
                saveData();
                setModified(false);
              }
            }}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              if (onClose) onClose();
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
}

export default Tiptap;
