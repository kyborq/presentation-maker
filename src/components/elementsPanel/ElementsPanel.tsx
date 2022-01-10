import { TextForm } from "./forms/TextForm";
import styles from "./ElementsPanel.module.css";
import { TElement } from "../../model/element/ElementTypes";
import { ImageForm } from "./forms/ImageForm";
import { SlideForm } from "./forms/SlideForm";
import { TSlide } from "../../model/slide/SlideTypes";
import { ElementForm } from "./forms/ElementForm";
import { FigureForm } from "./forms/FigureForm";
import { VideoForm } from "./forms/VideoForm";

type ElementsPanelProps = {
  slide?: TSlide;
  width?: number;
  element?: TElement;
};

export const ElementsPanel = ({
  slide,
  element,
  width = 300,
}: ElementsPanelProps) => {
  const data = element?.data || {};

  return (
    <div className={styles.sidePanel} style={{ width }}>
      {"text" in data && <TextForm element={element} slideId={slide?.id} />}
      {"image" in data && <ImageForm element={element} slideId={slide?.id} />}
      {"figure" in data && <FigureForm element={element} slideId={slide?.id} />}
      {"video" in data && <VideoForm />}
      {("image" in data ||
        "text" in data ||
        "figure" in data ||
        "video" in data) && (
        <ElementForm element={element} slideId={slide?.id} />
      )}
      {!(
        "image" in data ||
        "text" in data ||
        "figure" in data ||
        "video" in data
      ) && <SlideForm slide={slide} />}
    </div>
  );
};
