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
  id: 'featuredProducts',
  // Visible label
  label: 'Products',
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    { name: 'count', label: 'Products to Show', widget: 'string' },
    { name: 'featured', label: 'Featured Only', widget: 'boolean' },
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /^featuredProducts (\S+)$/,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    console.log('~match', match);
    debugger;
    return {
      // TOOD: pull from dynamic regex match
      // count: match[1],
      count: '3',
      featured: true,
    };
  },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    return `featuredProducts count:${obj.count} featured:${obj.featured}`;
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(obj) {
    return (
      '<img src="http://img.youtube.com/vi/' +
      obj.id +
      '/maxresdefault.jpg" alt="Youtube Video"/>'
    );
  },
});
