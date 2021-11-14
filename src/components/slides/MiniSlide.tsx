import React, { MouseEvent } from "react";
import { Element } from "../../model/element/ElementTypes";
import { Background } from "../../model/slide/SlideTypes";

import styles from "./MiniSlide.module.css";

type MiniSlideProps = {
  elements?: Element[];
  background?: Background;
  index?: number;
  selected?: boolean;
  onSelect?: () => void;
  onMultiSelect?: () => void;
};

export function MiniSlide({
  index,
  selected,
  onSelect,
  onMultiSelect,
  elements,
  background,
}: MiniSlideProps) {
  return (
    <div
      className={`${styles.slidePreview} ${
        selected && styles.slidePreviewActive
      }`}
      onClick={(event) => {
        if (event.ctrlKey) {
          onMultiSelect && onMultiSelect();
        } else {
          onSelect && onSelect();
        }
      }}
    >
      <span className={styles.slideIndex}>{index}</span>
      <div className={styles.slideMiniature}></div>
    </div>
  );
}
