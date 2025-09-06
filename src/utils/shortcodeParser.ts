import React from 'react';

export type ShortcodeHandler = (attributes: Record<string, string>, content?: string) => React.ReactNode;

export class ShortcodeParser {
  private handlers: Map<string, ShortcodeHandler> = new Map();

  // Register a shortcode handler
  register(tag: string, handler: ShortcodeHandler) {
    this.handlers.set(tag, handler);
  }

  // Parse shortcodes in content
  parse(content: string): React.ReactNode[] {
    const shortcodeRegex = /\[(\w+)([^\]]*)\](?:(.*?)\[\/\1\])?/g;
    const elements: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = shortcodeRegex.exec(content)) !== null) {
      const [fullMatch, tag, attributesStr, innerContent] = match;
      const matchStart = match.index;

      // Add text before shortcode
      if (matchStart > lastIndex) {
        const textBefore = content.substring(lastIndex, matchStart);
        if (textBefore.trim()) {
          elements.push(textBefore);
        }
      }

      // Parse attributes
      const attributes = this.parseAttributes(attributesStr);
      
      // Get handler and render
      const handler = this.handlers.get(tag);
      if (handler) {
        const element = handler(attributes, innerContent);
        if (element) {
          elements.push(element);
        }
      } else {
        // If no handler, keep original shortcode
        elements.push(fullMatch);
      }

      lastIndex = matchStart + fullMatch.length;
    }

    // Add remaining text
    if (lastIndex < content.length) {
      const remainingText = content.substring(lastIndex);
      if (remainingText.trim()) {
        elements.push(remainingText);
      }
    }

    return elements;
  }

  // Parse shortcode attributes
  private parseAttributes(attributesStr: string): Record<string, string> {
    const attributes: Record<string, string> = {};
    const attrRegex = /(\w+)=["']([^"']*)["']/g;
    let match;

    while ((match = attrRegex.exec(attributesStr)) !== null) {
      const [, key, value] = match;
      attributes[key] = value;
    }

    return attributes;
  }
}

// Global shortcode parser instance
export const shortcodeParser = new ShortcodeParser();
