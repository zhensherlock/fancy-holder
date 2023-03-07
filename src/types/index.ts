export type ContentTypeType = 'text' | 'multi-line-text' | 'rich-text'

export type TextType = 'fill' | 'stroke'

export interface FancyHolderOptions {
  target: Element | string;
  contentType: ContentTypeType;
  content: string;
  textType: TextType;
  mutationObserve: boolean;
}
