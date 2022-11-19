import { useState, useRef, useCallback, useContext } from "react";
import { BiCrop } from "react-icons/bi";
import { MdPublishedWithChanges } from "react-icons/md";
import Cropper from "react-easy-crop";
import * as Popover from "@radix-ui/react-popover";
import { HiCamera } from "react-icons/hi";
import { useDispatch } from "react-redux";
import getCroppedImg from "./cropImg";
import * as Slider from "@radix-ui/react-slider";
import { CompsContext } from "../../../../context/compsContext";
import {
  editImgOn,
  getCompIndex,
  getItemIndex,
} from "../../../../features/edit-image";
import { addSectionTurnOff } from "../../../../features/edit-sections";
import { selectCompName } from "../../../../features/comp-name";
import { closeColors } from "../../../../features/colors";
import { filesOff } from "../../../../features/my-files";
const ImageEditor = ({ service, index, comp, compIndex }) => {
  const dispatch = useDispatch();
  const btn = useRef(null);
  const [open, setOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const { comps, setComps } = useContext(CompsContext);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        service.pic,
        croppedAreaPixels,
        rotation
      );
      setCroppedImage(croppedImage);
      const formData = new FormData();
      formData.append("file", croppedImage);
      formData.append("upload_preset", "my-upload");
      const data = await fetch(
        "https://api.cloudinary.com/v1_1/dxrdyke2n/image/upload",
        {
          method: "POST",
          body: formData,
        }
      ).then((r) => r.json());
      comp.compData.items[index].pic = data.secure_url;
      setComps([...comps]);
      setOpen(false);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
    setOpen(false);
  }, []);

  const handleSubmit = (event) => {
    // 👇️ prevent page refresh
    event.preventDefault();

    console.log("form submitted ✅");
  };

  const handleChangeImg = () => {
    dispatch(editImgOn());
    dispatch(getCompIndex(compIndex));
    dispatch(getItemIndex(index));
    dispatch(addSectionTurnOff());
    dispatch(selectCompName(""));
    dispatch(closeColors());
    dispatch(filesOff());
  };

  return (
    <>
      {open ? (
        <div className=" relative  h-72 w-full">
          <Cropper
            image={service.pic}
            crop={crop}
            zoom={zoom}
            showGrid={false}
            aspect={3 / 2}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
          <div className="absolute w-full bg-[#353f4b] px-1 py-2 shadow-md  bottom-0 left-0">
            <form onSubmit={handleSubmit} className="flex justify-between">
              <Slider.Root
                className="SliderRoot"
                defaultValue={[0]}
                min={1}
                max={3}
                step={0.1}
                value={[zoom]}
                aria-label="Zoom"
                onValueChange={(e) => {
                  setZoom(e[0]);
                }}
              >
                <Slider.Track className="SliderTrack">
                  <Slider.Range className="SliderRange" />
                </Slider.Track>
                <Slider.Thumb className="SliderThumb" />
              </Slider.Root>

              <button
                onClick={onClose}
                className="border-white border  text-white rounded-full h-6 w-14 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={showCroppedImage}
                className="bg-[#23cba5] text-white rounded-full h-6 w-14 text-sm"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div
          style={{ backgroundImage: `url(${service.pic})` }}
          className="bg-no-repeat relative service-img bg-center bg-cover   h-72 w-full"
        >
          <Popover.Root>
            <Popover.Trigger asChild>
              <div ref={btn} className="absolute camera-icon  top-4 left-4">
                <HiCamera size={30} />
              </div>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                avoidCollisions={false}
                onMouseLeave={() => {
                  btn.current.style.display = "none";
                }}
                onMouseEnter={() => (btn.current.style.display = "block")}
                hideWhenDetached
                className="w-52 overflow-hidden rounded-xl "
                sideOffset={5}
                align="start"
              >
                <div className="bg-[#202b39] flex justify-between rounded-t-xl items-center p-3 text-white ">
                  <span className="text-sm">image settings</span>
                </div>

                <div
                  onClick={handleChangeImg}
                  className="flex bg-white cursor-pointer hover:bg-slate-200 px-3 py-2 gap-2 items-center"
                >
                  <MdPublishedWithChanges size={18} />
                  <span className="text-md">change image</span>
                </div>
                <div
                  onClick={() => {
                    setOpen(true);
                  }}
                  className="flex bg-white cursor-pointer hover:bg-slate-200 px-3 py-2 gap-2  items-center"
                >
                  <BiCrop size={18} />
                  <span className="text-md">Crop image</span>
                </div>

                <Popover.Arrow
                  color="#202b39"
                  className="PopoverArrow fill-[#202b39]"
                />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>
      )}
      {/* <Image src={service.pic} width='200' height='200'/> */}
    </>
  );
};

export default ImageEditor;
