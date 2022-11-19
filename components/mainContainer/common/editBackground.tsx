import React, { useState } from "react";
import { IoImagesOutline } from "react-icons/io5";
import { MdOutlineInvertColors } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { PopoverColor } from "../../ui/colorPicker/popoverColor";
import { GrPowerReset } from "react-icons/gr";
import * as Popover from "@radix-ui/react-popover";
const EditBackground = ({ setColor }) => {
  const [currentColor, setCurretColor] = useState({
    rgb: {
      r: "255",
      g: "255",
      b: "255",
      a: "1",
    },
  });

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

  return (
    <>
      <Popover.Root>
        <Popover.Trigger asChild>
          <div className="absolute z-50  top-20 left-5 transform -translate-x-1/2 -translate-y-1/2 ">
            <div className="expand-container">
              <div className="icon-container">
                <span className="expand-icon">
                  <IoImagesOutline size={20} />
                </span>
                <span className="text">Edit Background</span>
              </div>
            </div>
          </div>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className="PopoverContent "
            collisionPadding={{ left: 20 }}
            avoidCollisions={false}
            align="start"
            sideOffset={60}
          >
            <div className="bg-white shadow-custom w-80 rounded-xl ">
              <div className="bg-[#202b39] flex justify-between rounded-t-xl items-center p-4 text-white ">
                <h3 className="font-bold text-lg">Background settings</h3>
                <Popover.Close className="PopoverClose" aria-label="Close">
                  <div className="cursor-pointer" onClick={close}>
                    <IoClose />
                  </div>
                </Popover.Close>
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
                    <span>
                        {/* @ts-ignore */}
                      {currentColor.hex ? currentColor.hex : "#FFFFFF"}
                    </span>
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
          
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </>
  );
};

export default EditBackground;
