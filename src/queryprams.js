const queryPrams = [
  { val: ['post', 'product'], multiple: false, id: 'postType', label: 'Post Types', description: "Select Post Types to Query" },
  { val: [], multiple: false, id: 'taxQuery', label: 'Tax Query', description: "Taxonomies query arguments" },
  { val: 'OR', multiple: false, id: 'taxQueryRelation', label: 'Tax Query Relation', description: "Taxonomies query relation" },

  { val: [], multiple: false, id: 'metaQuery', label: 'Meta Query', description: "Meta field query" },
  { val: '', multiple: false, id: 's', label: 'Keyword', description: "Search keyword, ex: hello" },

  { val: [], multiple: false, id: 'postStatus', label: 'Post status', description: "Query post by post status" },
  { val: '', multiple: false, id: 'order', label: 'Order', description: "Post query order" },
  { val: [], multiple: false, id: 'orderby', label: 'Orderby', description: "Post query orderby" },
  { val: '', multiple: false, id: 'metaKey', label: 'Meta fields key', description: "Post query by meta fields key" },


  // Date Parameters
  { val: '', multiple: false, id: 'dateQuery', label: 'Date Query ', description: "Post query by date" },
  { val: '', multiple: false, id: 'year', label: 'Year', description: "Post query by year" },
  { val: '', multiple: false, id: 'monthnum', label: 'Month', description: "Post query by month" },
  { val: '', multiple: false, id: 'w', label: 'Week', description: "Post query by week" },
  { val: '', multiple: false, id: 'day', label: 'Day', description: "Post query by day" },
  { val: '', multiple: false, id: 'hour', label: 'Hour', description: "Post query by hour" },
  { val: '', multiple: false, id: 'minute', label: 'Miniute', description: "Post query by miniute" },
  { val: '', multiple: false, id: 'second', label: 'Second', description: "Post query by second" },
  { val: '', multiple: false, id: 'm', label: 'Month', description: "Post query by month" },

  // Author Parameters
  { val: '', multiple: false, id: 'author', label: 'Author', description: "Post query by Author ID" },
  { val: '', multiple: false, id: 'authorName', label: 'Author Name', description: "Post query by Author Name" },
  { val: [], multiple: false, id: 'authorIn', label: 'Author In', description: "Post query by Author IDs" },
  { val: [], multiple: false, id: 'authorNotIn', label: 'Author Not In', description: "" },

  // Category Parameters
  { val: '', multiple: false, id: 'cat', label: 'Category ID', description: "" },
  { val: '', multiple: false, id: 'categoryName', label: 'Category Name', description: "" },
  { val: [], multiple: false, id: 'categoryAnd', label: 'CategoryAnd', description: "" },
  { val: [], multiple: false, id: 'categoryIn', label: 'Category In', description: "" },
  { val: [], multiple: false, id: 'categoryNotIn', label: 'Category Not In', description: "" },

  // Tag Parameters

  { val: '', multiple: false, id: 'tag', label: 'Tags', description: "" },
  { val: '', multiple: false, id: 'tagId', label: 'Tag Id', description: "" },
  { val: [], multiple: false, id: 'tagAnd', label: 'Tag And', description: "" },
  { val: [], multiple: false, id: 'tagIn', label: 'Tag In', description: "" },
  { val: [], multiple: false, id: 'tagNotIn', label: 'Tag Not In', description: "" },
  { val: [], multiple: false, id: 'tagSlugAnd', label: 'Tag Slug And', description: "" },
  { val: [], multiple: false, id: 'tagSlugIn', label: 'Tag Slug In', description: "" },

  { val: '', multiple: false, id: 'p', label: 'Post id', description: "" },
  { val: '', multiple: false, id: 'name', label: 'Name', description: "" },
  { val: '', multiple: false, id: 'pageId', label: 'Page Id', description: "" },
  { val: '', multiple: false, id: 'pagename', label: 'Page name', description: "" },
  { val: '', multiple: false, id: 'postParent', label: 'Post Parent', description: "" },
  { val: [], multiple: false, id: 'postParentIn', label: 'Post Parent In', description: "" },
  { val: [], multiple: false, id: 'postParentNotIn', label: 'Post Parent Not In', description: "" },
  { val: [], multiple: false, id: 'postIn', label: 'Post In', description: "" },
  { val: [], multiple: false, id: 'postNotIn', label: 'Post Not In', description: "" },
  { val: [{ slug: '' }], multiple: false, id: 'postNameIn', label: 'Post Name In', description: "" },

  { val: '', multiple: false, id: 'hasPassword', label: 'Has Password', description: "" },
  { val: '', multiple: false, id: 'postPassword ', label: 'Post Password', description: "" },

  { val: { compare: '=' }, multiple: false, id: 'commentCount', label: 'Comment Count', description: "" },

  { val: '', multiple: false, id: 'nopaging', label: 'No Paging', description: "" },
  { val: '', multiple: false, id: 'postsPerPage', label: 'Posts Per Page', description: "" },
  { val: '', multiple: false, id: 'paged', label: 'Paged', description: "" },
  { val: '', multiple: false, id: 'offset', label: 'Offset', description: "" },
  { val: '', multiple: false, id: 'postsPerArchivePage', label: 'Posts Per Archive Page', description: "" },
  { val: '', multiple: false, id: 'ignoreStickyPosts', label: 'Ignore Sticky Posts', description: "" },

  { val: '', multiple: false, id: 'metaKey', label: 'Meta Key', description: "" },
  { val: '', multiple: false, id: 'metaValue', label: 'Meta Value', description: "" },
  { val: '', multiple: false, id: 'metaValueNum', label: 'Meta Value Num', description: "" },
  { val: '', multiple: false, id: 'metaCompare', label: 'Meta Compare', description: "" },
  { val: [], multiple: false, id: 'metaQuery', label: 'Meta Query', description: "" },

  { val: 'readable', multiple: false, id: 'perm', label: 'Perm', description: "" },
  { val: [], multiple: false, id: 'postMimeType', label: 'Post Mime Type', description: "" },
  { val: false, multiple: false, id: 'cacheResults', label: 'Cache Results', description: "" },
  { val: false, multiple: false, id: 'updatePostMetaCache', label: 'Update Post Meta Cache', description: "" },
  { val: false, multiple: false, id: 'updatePostTermCache', label: 'Update Post Term Cache', description: "" },

];


export default queryPrams;