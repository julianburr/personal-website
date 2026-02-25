import { h } from 'hastscript';
import { visit } from 'unist-util-visit';

export function remarkDirectiveToHast() {
  return (tree: any) => {
    visit(tree, (node: any) => {
      const isDirective =
        node.type === 'leafDirective' ||
        node.type === 'containerDirective' ||
        node.type === 'textDirective';

      if (isDirective) {
        const data = node.data || (node.data = {});
        const hast = h(node.name, node.attributes || {}) as any;
        data.hName = hast.tagName;
        data.hProperties = hast.properties;
      }
    });
  };
}
