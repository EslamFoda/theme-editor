import { useDispatch } from "react-redux";
import { getNextIndex } from "../../../features/add-section";
import { selectCompName } from "../../../features/comp-name";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
const ControlBtns = ({ i, comp, comps, setComps }) => {
  const dispatch = useDispatch();
  const moveInArray = function (arr, from, to, compsName) {
    // Make sure a valid array is provided
    if (Object.prototype.toString.call(arr) !== "[object Array]") {
      throw new Error("Please provide a valid array");
    }

    // Delete the item from it's current position
    const item = arr.splice(from, 1);

    // Make sure there's an item to move
    if (!item.length) {
      throw new Error("There is no item in the array at index " + from);
    }

    // Move the item to its new position
    arr.splice(to, 0, item[0]);
    dispatch(selectCompName(compsName));
    dispatch(getNextIndex(to));
    setComps([...arr]);
  };
  return (
    <div className="absolute space-y-16 top-1/2 left-5 transform -translate-x-1/2  -translate-y-1/2 ">
      {i === 0 ? null : (
        <div
          onClick={() => {
            const { compName } = comp;
            moveInArray(comps, i, i - 1, compName);
          }}
          className="expand-container"
        >
          <div className="icon-container">
            <span className="expand-icon">
              <FaArrowUp size={20} />
            </span>
            <span className="text">move up</span>
          </div>
        </div>
      )}
      {comps.lastIndexOf(comps[comps.length - 1]) === i ? null : (
        <div
          onClick={() => {
            const { compName } = comp;
            moveInArray(comps, i, i + 1, compName);
          }}
          className="expand-container"
        >
          <div className="icon-container">
            <span className="expand-icon">
              <FaArrowDown size={20} />
            </span>
            <span className="text">Move Down</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlBtns;
