const queryPrams = [
  { val: ['post'], multiple: false, id: 'postType', label: 'Post Types', description: "Select Post Types to Query" },
  { val: [], multiple: false, id: 'taxQuery', label: 'Tax Query', description: "Taxonomies query arguments", isPro: true },
  { val: 'OR', multiple: false, id: 'taxQueryRelation', label: 'Tax Query Relation', description: "Taxonomies query relation" },

  { val: [], multiple: false, id: 'metaQuery', label: 'Meta Query', description: "Meta field query", isPro: true },
  { val: '', multiple: false, id: 's', label: 'Keyword', description: "Search keyword, ex: hello" },

  { val: [], multiple: false, id: 'postStatus', label: 'Post status', description: "Query post by post status" },
  { val: '', multiple: false, id: 'order', label: 'Order', description: "Post query order" },
  { val: [], multiple: false, id: 'orderby', label: 'Orderby', description: "Post query orderby" },
  { val: '', multiple: false, id: 'metaKey', label: 'Meta fields key', description: "Post query by meta fields key" },


  // Date Parameters
  { val: [], multiple: false, id: 'dateQuery', label: 'Date Query ', description: "Post query by date", isPro: true },
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
  { val: [], multiple: false, id: 'authorIn', label: 'Author In', description: "Post query by Author IDs", isPro: true },
  { val: [], multiple: false, id: 'authorNotIn', label: 'Author Not In', description: "Post query by exluded Author IDs", isPro: true },

  // Category Parameters
  { val: '', multiple: false, id: 'cat', label: 'Category ID', description: "Post query by Category ID" },
  { val: '', multiple: false, id: 'categoryName', label: 'Category Name', description: "Post query by Category Name" },
  { val: [], multiple: false, id: 'categoryAnd', label: 'CategoryAnd', description: "Post query by Category IDs", isPro: true },
  { val: [], multiple: false, id: 'categoryIn', label: 'Category In', description: "Post query by Category IDs", isPro: true },
  { val: [], multiple: false, id: 'categoryNotIn', label: 'Category Not In', description: "Post query by excluded Category IDs", isPro: true },

  // Tag Parameters

  { val: '', multiple: false, id: 'tag', label: 'Tags', description: "Post query by Tag slug" },
  { val: '', multiple: false, id: 'tagId', label: 'Tag Id', description: "Post query by Tag ID" },
  { val: [], multiple: false, id: 'tagAnd', label: 'Tag And', description: "Post query by Tag Ids", isPro: true },
  { val: [], multiple: false, id: 'tagIn', label: 'Tag In', description: "Post query by Tag ids", isPro: true },
  { val: [], multiple: false, id: 'tagNotIn', label: 'Tag Not In', description: "Post query by excluded Tag ids" },
  { val: [], multiple: false, id: 'tagSlugAnd', label: 'Tag Slug And', description: "Post query by Tags slug", isPro: true },
  { val: [], multiple: false, id: 'tagSlugIn', label: 'Tag Slug In', description: "Post query by excluded Tags slug", isPro: true },

  { val: '', multiple: false, id: 'p', label: 'Post id', description: "Post query by single post id" },
  { val: '', multiple: false, id: 'name', label: 'Name', description: "Post query by post slug" },
  { val: '', multiple: false, id: 'pageId', label: 'Page Id', description: "Post query by single page id" },
  { val: '', multiple: false, id: 'pagename', label: 'Page name', description: "Post query by page slug" },
  { val: '', multiple: false, id: 'postParent', label: 'Post Parent', description: "Post query by post parent id", isPro: true },
  { val: [], multiple: false, id: 'postParentIn', label: 'Post Parent In', description: "Post query by post parent ids", isPro: true },
  { val: [], multiple: false, id: 'postParentNotIn', label: 'Post Parent Not In', description: "Post query by excluded post parent ids" },
  { val: [], multiple: false, id: 'postIn', label: 'Post In', description: "Post query by single post id", isPro: true },
  { val: [], multiple: false, id: 'postNotIn', label: 'Post Not In', description: "Post query by excluded post ids", isPro: true },
  { val: [{ slug: '' }], multiple: false, id: 'postNameIn', label: 'Post Name In', description: "Post query by post slugs", isPro: true },

  { val: '', multiple: false, id: 'hasPassword', label: 'Has Password', description: "Post query for posts with passwords" },
  { val: '', multiple: false, id: 'postPassword ', label: 'Post Password', description: "Post query for posts with particular passwords", isPro: true },

  { val: { compare: '=' }, multiple: false, id: 'commentCount', label: 'Comment Count', description: "Post query by comment count" },

  { val: '', multiple: false, id: 'nopaging', label: 'No Paging', description: "Enable show all posts or use pagination" },
  { val: '', multiple: false, id: 'postsPerPage', label: 'Posts Per Page', description: "Number of post to show per page" },
  { val: '', multiple: false, id: 'paged', label: 'Paged', description: "Pagination start with" },
  { val: '', multiple: false, id: 'offset', label: 'Offset', description: "Number of post to displace or pass over" },
  { val: '', multiple: false, id: 'postsPerArchivePage', label: 'Posts Per Archive Page', description: "" },
  { val: '', multiple: false, id: 'ignoreStickyPosts', label: 'Ignore Sticky Posts', description: "Ignore post from post query", isPro: true },

  { val: '', multiple: false, id: 'metaKey', label: 'Meta Key', description: "Post query by custom field key" },
  { val: '', multiple: false, id: 'metaValue', label: 'Meta Value', description: "Post query by custom field value" },
  { val: '', multiple: false, id: 'metaValueNum', label: 'Meta Value Num', description: "Post query by custom field value for number types" },
  { val: '', multiple: false, id: 'metaCompare', label: 'Meta Compare', description: "Meta query compare" },
  { val: [], multiple: false, id: 'metaQuery', label: 'Meta Query', description: "Advance meta fields query" },

  { val: 'readable', multiple: false, id: 'perm', label: 'Perm', description: "User permission parameter" },
  { val: [], multiple: false, id: 'postMimeType', label: 'Post Mime Type', description: "Post query by allwed post mime types" },
  { val: false, multiple: false, id: 'cacheResults', label: 'Cache Results', description: "Enable Post information cache" },
  { val: false, multiple: false, id: 'updatePostMetaCache', label: 'Update Post Meta Cache', description: "Enable Post meta information cache" },
  { val: false, multiple: false, id: 'updatePostTermCache', label: 'Update Post Term Cache', description: "Enable Post term information cache" },

];


export default queryPrams;