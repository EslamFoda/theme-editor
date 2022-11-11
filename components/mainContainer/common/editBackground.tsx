import React, { useState } from "react";
import { IoImagesOutline } from "react-icons/io5";
import { useLayer } from "react-laag";
import { MdOutlineInvertColors } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { PopoverColor } from "../../ui/colorPicker/popoverColor";
import { GrPowerReset } from "react-icons/gr";
const EditBackground = ({ setColor }) => {
  const [currentColor, setCurretColor] = useState({
    rgb: {
      r: "255",
      g: "255",
      b: "255",
      a: "1",
    },
  });
  const [isOpen, setOpen] = useState(false);
  const close = () => {
    setOpen(false);
  };

  const handleApplyColor = () => {
    setColor(currentColor);
  };

  const handleReset = () => {
    setCurretColor({
      rgb: {
        r: "255",
        g: "255",
        b: "255",
        a: "1",
      },
    });
  };

  const { renderLayer, triggerProps, layerProps } = useLayer({
    isOpen,
    placement: "bottom-start",
    triggerOffset: 60,
    arrowOffset: 0,
    onDisappear: close, // close the menu when the menu gets scrolled out of sight
  });
  return (
    <>
      <div
        {...triggerProps}
        onClick={() => setOpen(!isOpen)}
        className="absolute z-50  top-10 left-5 transform -translate-x-1/2 -translate-y-1/2 "
      >
        <div className="expand-container">
          <div className="icon-container">
            <span className="expand-icon">
              <IoImagesOutline size={20} />
            </span>
            <span className="text">Edit Background</span>
          </div>
        </div>
      </div>

      {renderLayer(
        <>
          {isOpen && (
            <div
              className="bg-white shadow-custom w-80 rounded-md "
              {...layerProps}
            >
              <div className="bg-[#202b39] flex justify-between rounded-t-md items-center p-4 text-white ">
                <h3 className="font-bold text-lg">Background settings</h3>
                <div className="cursor-pointer" onClick={close}>
                  <IoClose />
                </div>
              </div>
              <div className="flex p-2 items-center gap-2">
                <div className="flex items-center justify-center p-2 cursor-pointer rounded-full border border-gray  gap-2 bg-[#0e9384] w-full text-white">
                  <MdOutlineInvertColors size={23} />
                  <span className="font-bold">Color</span>
                </div>
                <div className="flex text-[#667085] items-center gap-2 p-2 cursor-pointer rounded-full justify-center  border border-gray bg-white w-full ">
                  <IoImagesOutline size={20} />
                  <span className="font-bold">Images</span>
                </div>
              </div>
              <div className="space-y-8 p-4">
                <div>
                  <span>Background Color</span>
                  <div className="flex mt-2 items-center gap-4 w-full border border-gray rounded-md p-1 px-2">
                    <PopoverColor
                      color={currentColor}
                      onChange={setCurretColor}
                    />
                    {/* @ts-ignore */}
                    <span>{currentColor.hex ? currentColor.hex : "#FFFFFF"}</span>
                  </div>
                </div>
                <div
                  onClick={handleReset}
                  className="inline-flex items-center cursor-pointer font-bold gap-2"
                >
                  <GrPowerReset scale={10} size={20} />
                  <span>Reset Background Color</span>
                </div>
                <div className="flex justify-between items-center">
                  <span
                    onClick={close}
                    className="cursor-pointer font-semibold"
                  >
                    Cancel
                  </span>
                  <span
                    onClick={handleApplyColor}
                    className="bg-[#0e9384] px-6 py-1 cursor-pointer rounded-full text-white"
                  >
                    Apply
                  </span>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default EditBackground;