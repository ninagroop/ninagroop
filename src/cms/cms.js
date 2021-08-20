import CMS from 'netlify-cms-app';

CMS.registerEditorComponent({
  // Internal id of the component
  id: 'youtube',
  // Visible label
  label: 'Youtube',
  // Fields the user need to fill out when adding an instance of the component
  fields: [{ name: 'id', label: 'Youtube Video ID', widget: 'string' }],
  // Pattern to identify a block as being an instance of this component
  pattern: /^youtube (\S+)$/,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    return {
      id: match[1],
    };
  },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    return 'youtube ' + obj.id;
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(obj) {
    return `<iframe style="width: 100%" src="https://www.youtube.com/embed/${obj.id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  },
});

CMS.registerEditorComponent({
  // Internal id of the component
  id: 'featuredproducts',
  // Visible label
  label: 'Products',
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    {
      name: 'count',
      label: 'Products to Show',
      widget: 'number',
      value_type: 'int',
      default: 3,
    },
    { name: 'featured', label: 'Featured Only', widget: 'boolean' },
    {
      name: 'id',
      label: 'Product ID',
      widget: 'string',
    },
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /^\<featured\-products (.*)\>\<\/featured\-products\>$/,
  // Function to extract data elements from the regexp match
  fromBlock: function(attrs) {
    const count = attrs[1].match(/count=\"(.*?)\"/)?.[1];
    const featured =
      attrs[1].match(/featured=\"(.*?)\"/)?.[1] === 'true' || false;
    const id = attrs[1].match(/id=\"(.*?)\"/)?.[1];
    return {
      count,
      featured,
      id,
    };
  },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    return `<featured-products id="${obj.id ?? ''}" count="${obj.count ??
      ''}" featured="${obj.featured}"></featured-products>`;
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(obj) {
    return `<featured-products id="${obj.id ?? ''}" count="${obj.count ??
      ''}" featured="${obj.featured}"></featured-products>`;
  },
});
