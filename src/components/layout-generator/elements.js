import { applyFilters } from '@wordpress/hooks';
import { separator } from '@wordpress/icons';
var elements = {

  postTitle: {
    type: "postTitle",
    label: "Post Title",
    placeholder: "New Study Reveals Top 5 Marketing Tactics Fueling Brand Growth in 2025",
    options: { linkTo: '', target: '' },

    cssSelectors: {
      wrapper: { handle: "", label: 'Post Title Wrapper', styles: { "fontSize": { "Desktop": "16px" } } },
      a: { handle: "a", label: 'Post Title Link', styles: {} },
    },
    category: ['general']
  },
  postExcerpt: {
    type: "postExcerpt",
    label: "Post Excerpt",
    placeholder: "A recent industry report has uncovered the five most effective marketing strategies driving exponential brand growth this year. Experts say these tactics, including AI-powered personalization and micro-influencer partnerships, are reshaping how companies connect with consumers. Marketers are urged to adapt quickly or risk falling behind.",

    options: {
      limitBy: "",
      limitCount: 20,
      readMoreText: "Read More",
      target: "",
    },

    cssSelectors: {
      wrapper: {
        handle: "", label: 'Excerpt Wrapper', styles: {}
      },
      'excerpt-text': { handle: ".excerpt-text", label: 'Excerpt Text', styles: { "fontSize": { "Desktop": "16px" } } },
      redmore: { handle: ".redmore", label: 'Redmore Text', styles: { "fontSize": { "Desktop": "18px" } } },
    },
    category: ['general']
  },
  postDate: {
    type: "postDate",
    label: "Post Date",
    placeholder: "12/05/2025",
    options: {
      prefixText: 'Post Date: ', postfixText: "", format: "", linkTo: 'postUrl', target: '_blank', icon: {
        library: "fontAwesome",
        srcType: "class",
        iconSrc: "",
      }
    },
    category: ['general'],
    cssSelectors: {
      wrapper: {
        handle: "", label: 'Post Author Wrapper', styles: {
          "display": {
            "Desktop": "flex"
          }, "gap": { "Desktop": "1em" }, "justifyContent": { "Desktop": "start" },
        }
      },
      prefix: { handle: ".prefix", label: 'Prefix', styles: {} },
      postfix: { handle: ".postfix", label: 'postfix', styles: {} },
    },
  },
  postAuthor: {
    type: "postAuthor",
    label: "Post Author",
    options: { prefixText: 'Author: ', postfixText: "", linkTo: 'postUrl', target: '_blank' },
    category: ['general'],
    cssSelectors: {
      wrapper: {
        handle: "", label: 'Post Author Wrapper', styles: {
          "display": {
            "Desktop": "flex"
          }, "gap": { "Desktop": "1em" }, "justifyContent": { "Desktop": "start" },
        }
      },
      prefix: { handle: ".prefix", label: 'Prefix', styles: {} },
      postfix: { handle: ".postfix", label: 'postfix', styles: {} },
    },
  },
  postAuthorAvatar: {
    type: "postAuthorAvatar",
    label: "Post Author Avatar",
    options: { prefixText: 'Author: ', postfixText: "", linkTo: 'postUrl', target: '_blank' },
    category: ['general'],
    cssSelectors: {
      wrapper: {
        handle: "", label: 'Post Author Wrapper', styles: {
          "display": {
            "Desktop": "flex"
          },
          "gap": {
            "Desktop": "1em"
          },
          "justifyContent": {
            "Desktop": "start"
          },
          "alignItems": {
            "Desktop": "center"
          }
        }
      },
      'avatar': {
        handle: ".avatar", label: 'Prefix', styles: {
          "width": {
            "Desktop": "50px"
          },
          "borderRadius": {
            "Desktop": "4px 4px 4px 4px"
          }
        }
      },
      prefix: { handle: ".prefix", label: 'Prefix', styles: {} },
      postfix: { handle: ".postfix", label: 'postfix', styles: {} },
    },
  },


  postCategories: {
    type: "postCategories",
    label: "Post Categories",
    placeholder: "Morgan Tate",
    category: ['general'],
    options: { maxCount: 3, postCount: false, separator: ', ', prefixText: 'Categories: ', postfixText: "", linkTo: 'postUrl', target: '_blank' },

    cssSelectors: {
      wrapper: {
        handle: "", label: 'Post Categories Wrapper', styles: {
          "display": {
            "Desktop": "flex"
          }, "gap": { "Desktop": "1em" }, "justifyContent": { "Desktop": "start" },
        }
      },
      items: {
        handle: ".terms-items", label: 'Items Wrap', styles: {
          "display": {
            "Desktop": "flex"
          }, "gap": { "Desktop": "1em" }, "justifyContent": { "Desktop": "start" },
        }
      },
      item: { handle: ".term-item", label: 'Item Wrap', styles: {} },
      'term-link': { handle: ".term-link", label: 'Term Link', styles: {} },
      'term-title': { handle: ".term-title", label: 'Term Title', styles: {} },
      'post-count': { handle: ".post-count", label: 'Post Count', styles: {} },
      separator: { handle: ".separator", label: 'Separator', styles: {} },
      prefix: { handle: ".prefix", label: 'Prefix', styles: {} },
      postfix: { handle: ".postfix", label: 'postfix', styles: {} },
    },
  },

  postTags: {
    type: "postTags",
    label: "Post Tags",
    placeholder: "Morgan Tate",
    category: ['general'],
    options: { maxCount: 3, postCount: false, separator: ', ', prefixText: 'Tags: ', postfixText: "", linkTo: 'postUrl', target: '_blank' },

    cssSelectors: {
      wrapper: {
        handle: "", label: 'Post Tags Wrapper', styles: {
          "display": {
            "Desktop": "flex"
          }, "gap": { "Desktop": "1em" }, "justifyContent": { "Desktop": "start" },
        }
      },
      items: {
        handle: ".terms-items", label: 'Items Wrap', styles: {
          "display": {
            "Desktop": "flex"
          }, "gap": { "Desktop": "1em" }, "justifyContent": { "Desktop": "start" },
        }
      },
      item: { handle: ".term-item", label: 'Item Wrap', styles: {} },
      'term-link': { handle: ".term-link", label: 'Term Link', styles: {} },
      'term-title': { handle: ".term-title", label: 'Term Title', styles: {} },
      'post-count': { handle: ".post-count", label: 'Post Count', styles: {} },
      separator: { handle: ".separator", label: 'Separator', styles: {} },
      prefix: { handle: ".prefix", label: 'Prefix', styles: {} },
      postfix: { handle: ".postfix", label: 'postfix', styles: {} },
    },
  },
  postTerms: {
    type: "postTerms",
    label: "Post Terms",
    placeholder: "Morgan Tate",
    isPro: true,
    category: ['general'],
    options: { maxCount: 3, postCount: false, separator: ', ', prefixText: 'Categories: ', postfixText: "", linkTo: 'postUrl', target: '_blank' },

    cssSelectors: {
      wrapper: {
        handle: "", label: 'Post Categories Wrapper', styles: {
          "display": {
            "Desktop": "flex"
          }, "gap": { "Desktop": "1em" }, "justifyContent": { "Desktop": "start" },
        }
      },
      items: {
        handle: ".terms-items", label: 'Items Wrap', styles: {
          "display": {
            "Desktop": "flex"
          }, "gap": { "Desktop": "1em" }, "justifyContent": { "Desktop": "start" },
        }
      },
      item: { handle: ".term-item", label: 'Item Wrap', styles: {} },
      'term-link': { handle: ".term-link", label: 'Term Link', styles: {} },
      'term-title': { handle: ".term-title", label: 'Term Title', styles: {} },
      'post-count': { handle: ".post-count", label: 'Post Count', styles: {} },
      separator: { handle: ".separator", label: 'Separator', styles: {} },
      prefix: { handle: ".prefix", label: 'Prefix', styles: {} },
      postfix: { handle: ".postfix", label: 'postfix', styles: {} },
    },
  },

  postMeta: {
    type: "postMeta",
    label: "Post Meta",
    isPro: true,
    category: ['general'],
    options: {
      class: "",
      wrapperTag: "div",
      metaKey: "",
      callback: "",
      returnPrams: [],
      customFieldSrc: "acf",
      prefixText: '',
      postfixText: "",
    },

    cssSelectors: {
      wrapper: {
        handle: "", label: 'Wrapper', styles: {}
      },
      item: { handle: ".item", label: 'Item Wrap', styles: {} },
      prefix: { handle: ".prefix", label: 'Prefix', styles: {} },
      postfix: { handle: ".postfix", label: 'postfix', styles: {} },
    },
  },












  wooPrice: {
    type: "wooPrice",
    label: "Product Price",
    isPro: true,

    options: {
      currencySymbole: "$",
      currencyPosition: "",
      separatorText: '-',
      prefixText: '',
      postfixText: '',
    },
    cssSelectors: {
      wrapper: { handle: "", label: 'Wrapper', styles: {} },
      currency: { handle: ".currency", label: 'Currency', styles: {} },
      regular: { handle: ".regular", label: 'Regular Price', styles: {} },
      'sale-price': { handle: ".sale-price", label: 'Sale Price', styles: {} },
      separator: { handle: ".separator", label: 'Separator', styles: {} },
      prefix: { handle: ".prefix", label: 'Prefix', styles: {} },
      postfix: { handle: ".postfix", label: 'Postfix', styles: {} },
    },
    category: ['wooCommerce']
  },

  wooAddToCart: {
    type: "wooAddToCart",
    label: "Add To Cart Button",
    isPro: true,
    options: {
      addToCartText: 'Add To Cart',
      quantityEnable: false,
      prefixText: '',
      postfixText: '',
      iconPosition: '',
      icon: {
        library: "fontAwesome",
        srcType: "class",
        iconSrc: "",
      }
    },
    cssSelectors: {
      wrapper: { handle: "", label: 'Wrapper', styles: {} },
      viewCartLink: { handle: ".viewCartLink", label: 'viewCartLink', styles: {} },
      'cart-button': { handle: ".cart-button", label: 'Cart Btn', styles: {} },
      quantityWrap: { handle: ".quantityWrap", label: 'Quantity Wrap', styles: {} },
      quantityInput: { handle: ".quantityInput", label: 'Quantity Input', styles: {} },
      quantityIncrease: { handle: ".quantityIncrease", label: 'Quantity Increase', styles: {} },
      quantityDecrease: { handle: ".quantityDecrease", label: 'Quantity Decrease', styles: {} },
      'icon-wrap': { handle: ".icon-wrap", label: 'Icon wrap', styles: {} },
      prefix: { handle: ".prefix", label: 'Prefix', styles: {} },
      postfix: { handle: ".postfix", label: 'Postfix', styles: {} },
    },
    category: ['wooCommerce']
  },

  wooSaleBadge: {
    type: "wooSaleBadge",
    label: "Product Sale Badge",
    isPro: true,
    options: {
      onSaleText: 'On Sale',
      prefixText: '',
      postfixText: '',
    },
    cssSelectors: {
      wrapper: { handle: "", label: 'Wrapper', styles: {} },
      'on-sale-badge': { handle: ".on-sale-badge", label: 'On Sale', styles: {} },
      prefix: { handle: ".prefix", label: 'Prefix', styles: {} },
      postfix: { handle: ".postfix", label: 'Postfix', styles: {} },
    },
    category: ['wooCommerce']
  },

  wooTotalSales: {
    type: "wooTotalSales",
    label: "Total Sales",
    isPro: true,
    options: {
      defaultSaleCount: '123',
      prefixText: '',
      postfixText: '',
    },
    cssSelectors: {
      wrapper: { handle: "", label: 'Wrapper', styles: {} },
      'sale-count': { handle: ".sale-count", label: 'Sale Count', styles: {} },
      prefix: { handle: ".prefix", label: 'Prefix', styles: {} },
      postfix: { handle: ".postfix", label: 'Postfix', styles: {} },
    },
    category: ['wooCommerce']
  },

  wooSKU: {
    type: "wooSKU",
    label: "Product SKU",
    isPro: true,
    options: {
      dafaultSKUText: 'T-SHIRT-XL',
      prefixText: '',
      postfixText: '',
    },
    cssSelectors: {
      wrapper: { handle: "", label: 'Wrapper', styles: {} },
      sku: { handle: ".sku", label: 'SKU Text', styles: {} },
      prefix: { handle: ".prefix", label: 'Prefix', styles: {} },
      postfix: { handle: ".postfix", label: 'Postfix', styles: {} },
    },
    category: ['wooCommerce']
  },
  wooStockQuantity: {
    type: "wooStockQuantity",
    label: "Product Stock Quantity",
    isPro: true,
    options: {
      dafultQuantity: '1',
      prefixText: '',
      postfixText: '',
    },
    cssSelectors: {
      wrapper: { handle: "", label: 'Wrapper', styles: {} },
      'stock-quantity': { handle: ".stock-quantity", label: 'Stock Quantity', styles: {} },
      prefix: { handle: ".prefix", label: 'Prefix', styles: {} },
      postfix: { handle: ".postfix", label: 'Postfix', styles: {} },
    },
    category: ['wooCommerce']
  },
  wooInStock: {
    type: "wooInStock",
    label: "Product In Stock",
    isPro: true,
    options: {
      "inStockText": "In Stock",
      "outOfStockText": "Out of Stock",
      "backOrderText": "Backorder Enabled",
      prefixText: '',
      postfixText: '',
    },
    cssSelectors: {
      wrapper: { handle: "", label: 'Wrapper', styles: {} },
      inStockText: { handle: ".instock", label: 'In Stock Text', styles: {} },
      outOfStockText: { handle: ".outofstock", label: 'Out Of Stock Text', styles: {} },
      backOrderText: { handle: ".onbackorder", label: 'BackOrder Text', styles: {} },
      prefix: { handle: ".prefix", label: 'Prefix', styles: {} },
      postfix: { handle: ".postfix", label: 'Postfix', styles: {} },
    },
    category: ['wooCommerce']
  },
  wooProductRatings: {
    type: "wooProductRatings",
    label: "Product Ratings",
    isPro: true,
    options: {
      iconsIdle: {
        library: "fontAwesome",
        srcType: "class",
        iconSrc: "",
      },
      iconsFilled: {
        library: "fontAwesome",
        srcType: "class",
        iconSrc: "",
      },

      defaultRating: '4.5',
      summaryType: '',
      summaryTypeCustom: '',
      summaryLinkTo: '',
      prefixText: '',
      postfixText: '',
    },
    cssSelectors: {
      wrapper: { handle: "", label: 'Wrapper', styles: {} },
      iconsWrap: { handle: ".icons-wrap", label: 'Icons Wrap', styles: {} },
      iconsIdle: { handle: ".icons-idle", label: 'Icons Idle', styles: {} },
      iconsFilled: { handle: ".icons-filled", label: 'Icons Filled', styles: {} },
      prefix: { handle: ".prefix", label: 'Prefix', styles: {} },
      postfix: { handle: ".postfix", label: 'Postfix', styles: {} },
    },
    category: ['wooCommerce']
  },
  wooCategories: {
    type: "wooCategories",
    label: "Product Categories",
    placeholder: "Morgan Tate",
    isPro: true,
    category: ['wooCommerce'],
    options: { maxCount: 3, postCount: false, separator: ', ', prefixText: 'Categories: ', postfixText: "", linkTo: 'postUrl', target: '_blank' },

    cssSelectors: {
      wrapper: {
        handle: "", label: 'Post Categories Wrapper', styles: {
          "display": {
            "Desktop": "flex"
          }, "gap": { "Desktop": "1em" }, "justifyContent": { "Desktop": "start" },
        }
      },
      items: {
        handle: ".terms-items", label: 'Items Wrap', styles: {
          "display": {
            "Desktop": "flex"
          }, "gap": { "Desktop": "1em" }, "justifyContent": { "Desktop": "start" },
        }
      },
      item: { handle: ".term-item", label: 'Item Wrap', styles: {} },
      'term-link': { handle: ".term-link", label: 'Term Link', styles: {} },
      'term-title': { handle: ".term-title", label: 'Term Title', styles: {} },
      'post-count': { handle: ".post-count", label: 'Post Count', styles: {} },
      separator: { handle: ".separator", label: 'Separator', styles: {} },
      prefix: { handle: ".prefix", label: 'Prefix', styles: {} },
      postfix: { handle: ".postfix", label: 'postfix', styles: {} },
    },
  },

  wooTags: {
    type: "wooTags",
    label: "Product Tags",
    placeholder: "Morgan Tate",
    isPro: true,
    category: ['wooCommerce'],
    options: { maxCount: 3, postCount: false, separator: ', ', prefixText: 'Tags: ', postfixText: "", linkTo: 'postUrl', target: '_blank' },

    cssSelectors: {
      wrapper: {
        handle: "", label: 'Post Tags Wrapper', styles: {
          "display": {
            "Desktop": "flex"
          }, "gap": { "Desktop": "1em" }, "justifyContent": { "Desktop": "start" },
        }
      },
      items: {
        handle: ".terms-items", label: 'Items Wrap', styles: {
          "display": {
            "Desktop": "flex"
          }, "gap": { "Desktop": "1em" }, "justifyContent": { "Desktop": "start" },
        }
      },
      item: { handle: ".term-item", label: 'Item Wrap', styles: {} },
      'term-link': { handle: ".term-link", label: 'Term Link', styles: {} },
      'term-title': { handle: ".term-title", label: 'Term Title', styles: {} },
      'post-count': { handle: ".post-count", label: 'Post Count', styles: {} },
      separator: { handle: ".separator", label: 'Separator', styles: {} },
      prefix: { handle: ".prefix", label: 'Prefix', styles: {} },
      postfix: { handle: ".postfix", label: 'postfix', styles: {} },
    },
  },


  readMore: {
    type: "readMore",
    label: "Read More",
    options: { readMoreText: 'Read More', linkTo: 'postUrl', target: '_blank' },
    category: ['general'],
    cssSelectors: {
      wrapper: { handle: "", label: 'ReadMore', styles: {} },

    },
  },
  postThumbnail: {
    type: "postThumbnail",
    label: "Post Thumbnail",
    category: ['general'],

    options: { thumbnailSize: "full", defaultSrcId: "", defaultSrcUrl: '', linkTo: 'postUrl' },
    styles: {
      width: {
        Desktop: "100px",
      },
      height: {
        Desktop: "auto",
      },
    },
    cssSelectors: {
      wrapper: { handle: "", label: 'Featured Image Wrapper', styles: {} },
      img: { handle: "img", label: 'Image', styles: { "width": { "Desktop": "100%" } } },
      a: { handle: "a", label: 'Link', styles: {} },
    },
  },
  // postId: {
  //   type: "postId",
  //   label: "Post Id",
  //   options: { prefix: "" },
  //   category: ['general'],
  // },
  // postMeta: {
  //   type: "postMeta",
  //   label: "postMeta",
  //   options: { metaKey: '', format: '', callback: null },

  // },
  customText: {
    type: "customText",
    label: "Custom Text",
    options: { content: "", customTag: "div" },
    category: ['general'],
    cssSelectors: {
      wrapper: { handle: "", label: 'Custom Text', styles: {} },

    },
  },


  // productPrice: {
  //   type: "productPrice",
  //   label: "Product Price",
  //   options: { prefix: "" },
  //   
  // },
  // productSaleCount: {
  //   type: "productSaleCount",
  //   label: "Product Sale Count",
  //   options: { prefix: "" },
  //   
  // },
  // productSaleBadge: {
  //   type: "productSaleBadge",
  //   label: "Product Sale Badge",
  //   options: { prefix: "" },
  //   
  // },
  // productFeaturedBadge: {
  //   type: "productFeaturedBadge",
  //   label: "Product Featured Badge",
  //   options: { prefix: "" },
  //   
  // },
  // productOnsaleBadge: {
  //   type: "productOnsaleBadge",
  //   label: "Product On-sale Badge",
  //   options: { prefix: "" },
  //   
  // },
  // productAddToCart: {
  //   type: "productAddToCart",
  //   label: "Product Add To Cart",
  //   options: {},
  //   
  // },
  // productRating: {
  //   type: "productRating",
  //   label: "Product Price",
  //   options: { prefix: "" },
  //   
  // },

  // postTaxonomies: {
  //   type: "postTaxonomies",
  //   label: "Post Taxonomies",
  //   options: { taxonomy: "", maxCount: "", separator: "" },
  //   
  // },

  // termTitle: {
  //   type: "termTitle",
  //   label: "termTitle",
  //   options: { linkTo: "" },
  //   
  // },
  // termDescription: {
  //   type: "termDescription",
  //   label: "termDescription",
  //   options: {},
  //   
  // },
  // termThumbnail: {
  //   type: "termThumbnail",
  //   label: "termThumbnail",
  //   options: { size: "" },
  //   
  // },
  // termPostCount: {
  //   type: "termPostCount",
  //   label: "termPostCount",
  //   options: { prefix: "" },
  //   
  // },
  // termSlug: {
  //   type: "termSlug",
  //   label: "termSlug",
  //   options: { prefix: "" },
  //   
  // },


  container: {
    type: "container",
    label: "Container",
    children: [],
    options: { animateOn: {} },
    category: ['general'],
    cssSelectors: {
      "wrapper": { handle: "", label: 'Container Wrapper', styles: {} },
    },
  },
  layer: {
    type: "layer",
    label: "Layer",
    children: [],
    options: { animateOn: {} },
    category: ['general'],
    cssSelectors: {
      "wrapper": { handle: "", label: 'Layer Wrapper', styles: {} },
    },
  },



  root: {
    type: "root",
    label: "Root",
    hidden: true,
    children: [],
    // category: ['general']

  },
};
elements = applyFilters('PostGridBuilderElements', elements);
export default elements;