import { DocumentEditorWebComponent, DocumentEditor } from "../component";
import React from "react";
import {
  // toolbarItem,
  canvasClass,
  handleChange,
  handleSelectedText,
  toolbarClass,
  defaultText,
} from "../component/src/utils/document-editor-props";

export default {
  component: DocumentEditor,
  title: "DocumentEditor",
};

DocumentEditorWebComponent({
  // toolbar: toolbarItem,
  toolbar_class: toolbarClass,
  canvas_class: canvasClass,
  on_change: handleChange,
  on_select: handleSelectedText,
  value: defaultText,
});

export const test = () => (
  <div id='document-editor'></div>
  /* <DocumentEditor
    // toolbar={toolbarItem}
    toolbar_class={toolbarClass}
    canvas_class={canvasClass}
    on_change={handleChange}
    on_select={handleSelectedText}
    value={defaultText}
  />*/
);

export const LineSpacingTest = () => (
  <DocumentEditor
    toolbar_class={toolbarClass}
    canvas_class={canvasClass}
    on_change={handleChange}
    on_select={handleSelectedText}
    value="Select this text and use the line spacing button in the toolbar to change spacing. Try presets (1, 1.15, 1.5, 2) or enter a custom value like 1.07."
  />
);

export const ParagraphSpacingTest = () => (
  <DocumentEditor
    toolbar_class={toolbarClass}
    canvas_class={canvasClass}
    on_change={handleChange}
    on_select={handleSelectedText}
    value={JSON.stringify([
      { value: "First paragraph — click here, then use the toolbar indent button to apply paragraph spacing." },
      { value: "​" },
      { value: "Second paragraph — spacing before/after should shift this down or up." },
      { value: "​" },
      { value: "Third paragraph — verify spacing propagates correctly between paragraphs." }
    ])}
  />
);
