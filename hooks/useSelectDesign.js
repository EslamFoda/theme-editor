import { useDispatch } from "react-redux";
import { selectAboutDesign } from "../features/about-section";
import { selectHeroDesign } from "../features/hero";
import { selectFeaturedDesign } from "../features/featured-section";
import { selectServicesDesign } from "../features/servies-section";
import { selectTeamDesign } from "../features/team-section";
import { selectClientsDesign } from "../features/clients-section";
import { selectgalleryDesign } from "../features/gallery-section";
import { selectTestimonialsDesign } from "../features/testimonials-section";
import { selectFooterDesign } from "../features/footer-section";
const useSelectDesign = (compName) => {
  const dispatch = useDispatch();

  const handleSelectDesign = (i) => {
    if (compName === "hero") {
      dispatch(selectHeroDesign(i + 1));
    } else if (compName === "about") {
      dispatch(selectAboutDesign(i + 1));
    } else if (compName === "featured") {
      dispatch(selectFeaturedDesign(i + 1));
    } else if (compName === "services") {
      dispatch(selectServicesDesign(i + 1));
    } else if (compName === "team") {
      dispatch(selectTeamDesign(i + 1));
    } else if (compName === "clients") {
      dispatch(selectClientsDesign(i + 1));
    } else if (compName === "gallery") {
      dispatch(selectgalleryDesign(i + 1));
    } else if (compName === "testimonials") {
      dispatch(selectTestimonialsDesign(i + 1));
    } else if (compName === "footer") {
      dispatch(selectFooterDesign(i + 1));
    }
  };

  return { handleSelectDesign };
};

export default useSelectDesign;
