import Modal from '../../../components/Modal';

function ImageProps({
  image, setWidth, setHeight, onClose
}) {
  console.log(image);
  return (
    <Modal>
      <div
        className="col p-2 rounded-lg bg-aqua-spring border-2 border-cornflower-blue z-50"
      >
        <label
          className="row w-full my-2 justify-between items-center"
          htmlFor="img-props-width"
        >
          <span>
            Width:
          </span>
          <input
            className="p-1 rounded-md border border-cornflower-blue font-sans focus:border-pastel-green"
            type="number"
            value={image?.width || ''}
            min={0}
            id="img-props-width"
            name="img-props-width"
            onChange={(e) => {
              if (setWidth) setWidth(e.target.value);
            }}
          />
          <span>
            px
          </span>
        </label>
        <label
          className="row w-full my-2 justify-between items-center"
          htmlFor="img-props-height"
        >
          <span>
            Height:
          </span>
          <input
            className="p-1 rounded-md border border-cornflower-blue font-sans focus:border-pastel-green"
            type="number"
            value={image?.height || ''}
            min={0}
            id="img-props-height"
            name="img-props-height"
            onChange={(e) => {
              if (setHeight) setHeight(e.target.value);
            }}
          />
          <span>
            px
          </span>
        </label>
        {}
        <button type="button" onClick={onClose}>
          OK
        </button>
      </div>
    </Modal>
  );
}

export default ImageProps;
