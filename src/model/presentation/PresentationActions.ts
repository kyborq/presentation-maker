import { COLORS } from "../../colors";
import { at, uuid4 } from "../../utils";
import { Editor } from "../editor/EditorTypes";
import { Slide } from "../slide/SlideTypes";

export function createSlide(editor: Editor): Editor {
  const { presentation } = editor;
  const { slideList } = presentation;

  const newSlide: Slide = {
    id: uuid4(),
    elementList: [],
    background: {
      color: COLORS.white,
    },
  };

  const newEditor: Editor = {
    ...editor,
    presentation: {
      ...presentation,
      slideList: [...slideList, newSlide],
      selectedSlidesIds: [newSlide.id],
    },
  };

  return newEditor;
}

export function deleteSlides(editor: Editor, slideIds: string[]): Editor {
  const { presentation } = editor;
  const { slideList } = presentation;

  const newSlideList = slideList.filter(
    (slide) => !slideIds.some((id) => id === slide.id) && slide
  );

  const newSelectedSlides = at(newSlideList, -1)?.id;

  const newEditor: Editor = {
    ...editor,
    presentation: {
      ...presentation,
      slideList: newSlideList,
      selectedSlidesIds: newSelectedSlides ? [newSelectedSlides] : [],
    },
  };

  return newEditor;
}

// TODO: Переписать функцию для перемещения слайдов местами
export function moveSlide(
  editor: Editor,
  indexFrom: number,
  indexTo: number
): Editor {
  const { presentation } = editor;
  const { slideList } = presentation;

  const mySlide = slideList[indexFrom];
  const swapSlide = slideList[indexTo];

  const newSlideList = slideList.map((slide, index) => {
    if (index === indexFrom) return swapSlide;
    if (index === indexTo) return mySlide;
    return slide;
  });

  const newEditor: Editor = {
    ...editor,
    presentation: {
      ...presentation,
      slideList: newSlideList,
    },
  };

  return newEditor;
}

export function selectSlides(editor: Editor, slideIds: string[]): Editor {
  const { presentation } = editor;

  const newEditor: Editor = {
    ...editor,
    presentation: {
      ...presentation,
      selectedSlidesIds: slideIds,
    },
  };

  return newEditor;
}
