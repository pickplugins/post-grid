

const { Component } = wp.element;
import { Button, Dropdown, } from '@wordpress/components'
import { useState, } from '@wordpress/element'
import { applyFilters, doAction, addAction, addFilter } from "@wordpress/hooks";

import { __experimentalInputControl as InputControl, ColorPalette } from '@wordpress/components';



/*postTitle*/
addFilter('PostGridElementHtmlpostTitle', 'post-grid/element', PostGridElementHtmlpostTitle, 10)

function PostGridElementHtmlpostTitle(html, itemData, element) {


  var options = element?.options
  var linkTo = options?.linkTo
  var target = options?.target


  return <div id={`element-${element.id}`} className={`${element.type}`}>
    {linkTo?.length > 0 && (
      <a href={"#"} target={target} onClick={ev => {
        ev.preventDefault();
      }}
      >{itemData.postTitle.titleText}</a>
    )}
    {linkTo?.length == 0 && (
      <>{itemData.postTitle.titleText}</>
    )}




  </div>;
}

/*postId*/
addFilter('PostGridElementHtmlpostId', 'post-grid/element', PostGridElementHtmlpostId, 10)

function PostGridElementHtmlpostId(html, itemData, element) {


  var options = element?.options
  var linkTo = options?.linkTo
  var target = options?.target


  return <div id={`element-${element.id}`} className={`${element.type}`}>
    {linkTo?.length > 0 && (
      <a href={"#"} target={target} onClick={ev => {
        ev.preventDefault();
      }}>{itemData.ID}{itemData.postId.id}</a>
    )}
    {linkTo?.length == 0 && (
      <>{itemData.ID}{itemData.postId.id}</>
    )}




  </div>;
}


/*readMore*/
addFilter('PostGridElementHtmlreadMore', 'post-grid/element', PostGridElementHtmlreadMore, 10)

function PostGridElementHtmlreadMore(html, itemData, element) {

  var options = element.options
  var target = options?.target
  var readMoreText = options?.readMoreText


  return <a id={`element-${element.id}`} className={`${element.type}`} target={target} href={"#"} onClick={ev => {
    ev.preventDefault();
  }}>{readMoreText}</a>;
}
/*customText*/
addFilter('PostGridElementHtmlcustomText', 'post-grid/element', PostGridElementHtmlcustomText, 10)

function PostGridElementHtmlcustomText(html, itemData, element) {

  var options = element.options
  var content = options?.content
  var customTag = options?.customTag
  const CustomTagWrapper = `${customTag}`;


  return <CustomTagWrapper id={`element-${element.id}`} className={`${element.type}`} onClick={ev => {
    ev.preventDefault();
  }}>{content}</CustomTagWrapper>;
}











/*postExcerpt*/
addFilter('PostGridElementHtmlpostExcerpt', 'post-grid/element', PostGridElementHtmlpostExcerpt, 10)

function PostGridElementHtmlpostExcerpt(html, itemData, element) {

  var options = element.options;
  var limitBy = options?.limitBy;
  var limitCount = options?.limitCount;
  var target = options?.target;
  var readMoreText = options?.readMoreText


  var excerptText = itemData.postExcerpt.excerptText


  var count = limitCount > 0 ? limitCount : 999;
  if (limitBy == "character") {
    excerptText = excerptText.substring(0, count)
  } else if (limitBy == "word") {
    setPostExcerptEdited(
      excerptText = excerptText.split(" ").splice(0, count).join(" ")

    );
  }

  return <div id={`element-${element.id}`} className={`${element.type}`} >
    <p className="excerpt-text">
      {excerptText}
    </p>
    {readMoreText?.length > 0 && (
      <a href={"#"} target={target} className="redmore" onClick={ev => {
        ev.preventDefault();
      }}>{readMoreText}</a>
    )}

  </div>;
}

/*postDate*/
addFilter('PostGridElementHtmlpostDate', 'post-grid/element', PostGridElementHtmlpostDate, 10)

function PostGridElementHtmlpostDate(html, itemData, element) {

  var options = element.options;
  var prefixText = options?.prefixText;
  var postfixText = options?.postfixText;
  var linkTo = options?.linkTo;
  var target = options?.target;
  var format = options?.format;
  var icon = options.icon

  var iconSrc = icon?.iconSrc;
  var iconHtml = `<span class="${iconSrc}"></span>`;



  return <div id={`element-${element.id}`} className={`${element.type}`} >
    {prefixText?.length > 0 && (
      <div className="prefix">{prefixText}</div>
    )}

    <span
      className={`icon-wrap`}
      dangerouslySetInnerHTML={{ __html: iconHtml }}
    />

    {linkTo?.length > 0 && (
      <a href={"#"} target={target} className="post-date-label" onClick={ev => {
        ev.preventDefault();
      }}>{itemData.postDate.date}</a>
    )}
    {linkTo?.length == 0 && (
      <div className="post-date-label">{itemData.postDate.date}</div>
    )}

    {postfixText?.length > 0 && (
      <div className="prefix">{postfixText}</div>
    )}

  </div>;
}

/*postAuthor*/
addFilter('PostGridElementHtmlpostAuthor', 'post-grid/element', PostGridElementHtmlpostAuthor, 10)

function PostGridElementHtmlpostAuthor(html, itemData, element) {

  var options = element.options;
  var prefixText = options?.prefixText;
  var postfixText = options?.postfixText;
  var linkTo = options?.linkTo;
  var target = options?.target;
  var icon = options.icon

  var iconSrc = icon?.iconSrc;
  var iconHtml = `<span class="${iconSrc}"></span>`;


  return <div id={`element-${element.id}`} className={`${element.type}`} >

    <div className="prefix">{prefixText}</div>

    <span
      className={`icon-wrap`}
      dangerouslySetInnerHTML={{ __html: iconHtml }}
    />


    {linkTo?.length > 0 && (
      <a href={"#"} target={target} className="author-name" onClick={ev => {
        ev.preventDefault();
      }}>{itemData.postAuthor.authorName}</a>
    )}
    {linkTo?.length == 0 && (
      <div className="author-name">{itemData.postAuthor.authorName}</div>
    )}
    <div className="postfix">{postfixText}</div>
  </div>;
}

/*postAuthorAvatar*/
addFilter('PostGridElementHtmlpostAuthorAvatar', 'post-grid/element', PostGridElementHtmlpostAuthorAvatar, 10)

function PostGridElementHtmlpostAuthorAvatar(html, itemData, element) {

  var options = element.options;
  var prefixText = options.prefixText;
  var postfixText = options.postfixText;
  var linkTo = options.linkTo;
  var target = options.target;

  return <div id={`element-${element.id}`} className={`${element.type}`} >
    <div className="prefix">{prefixText}</div>

    {linkTo.length > 0 && (
      <a href={"#"} target={target} className="author-link" onClick={ev => {
        ev.preventDefault();
      }}>
        <img className="avatar" src={itemData.postAuthorAvatar.srcUrl} alt="" />
      </a>
    )}
    {linkTo.length == 0 && (
      <img className="avatar" src={itemData.postAuthorAvatar.srcUrl} alt="" />
    )}


    <div className="postfix">{postfixText}</div>

  </div>;
}

/*postCategories*/
addFilter('PostGridElementHtmlpostCategories', 'post-grid/element', PostGridElementHtmlpostCategories, 10)

function PostGridElementHtmlpostCategories(html, itemData, element) {

  var options = element.options
  var maxCount = options?.maxCount
  var prefixText = options?.prefixText
  var postfixText = options?.postfixText
  var target = options?.target
  var postCount = options?.postCount
  var separator = options?.separator

  var categories = [
    { title: 'Category 1', count: 123 },
    { title: 'Category 2', count: 124 },
    { title: 'Category 3', count: 125 },
    { title: 'Category 4', count: 126 },
    { title: 'Category 5', count: 127 },
  ];

  var MaxCategories = categories.slice(0, maxCount);


  return <div id={`element-${element.id}`} className={`${element.type}`} >
    <div className="prefix">{prefixText}</div>
    <div className="terms-items">
      {MaxCategories.map((category, index) => {
        return (
          <div className="term-item">
            <a className="term-link" href="#" target={target} onClick={ev => {
              ev.preventDefault();
            }}>
              <span className="term-title">{category.title}</span>
              {postCount && (
                <span className="post-count" >{`(${category.count})`}</span>
              )}
            </a>

            {MaxCategories.length > (index + 1) && (
              <span className="separator">{separator}</span>
            )}


          </div>
        )
      })}
    </div>
    <div className="postfix">{postfixText}</div>

  </div>;
}

/*postTags*/
addFilter('PostGridElementHtmlpostTags', 'post-grid/element', PostGridElementHtmlpostTags, 10)

function PostGridElementHtmlpostTags(html, itemData, element) {

  var options = element.options
  var maxCount = options?.maxCount
  var prefixText = options?.prefixText
  var postfixText = options?.postfixText
  var target = options?.target
  var postCount = options?.postCount
  var separator = options?.separator

  var tags = [
    { title: 'Tag 1', count: 123 },
    { title: 'Tag 2', count: 124 },
    { title: 'Tag 3', count: 125 },
    { title: 'Tag 4', count: 126 },
    { title: 'Tag 5', count: 127 },

  ];

  var MaxTags = tags.slice(0, maxCount);


  return <div id={`element-${element.id}`} className={`${element.type}`} >
    <div className="prefix">{prefixText}</div>
    <div className="terms-items">
      {MaxTags.map((tag, index) => {
        return (
          <div className="item">
            <a className="term-link" href="#" target={target} onClick={ev => {
              ev.preventDefault();
            }}>
              <span className="term-title">{tag.title}</span>
              {postCount && (
                <span className="post-count" >{`(${tag.count})`}</span>
              )}</a>

            {MaxTags.length > (index + 1) && (
              <span className="separator">{separator}</span>
            )}
          </div>
        )
      })}
    </div>
    <div className="postfix">{postfixText}</div>

  </div>;
}
/*postMeta*/
addFilter('PostGridElementHtmlpostMeta', 'post-grid/element', PostGridElementHtmlpostMeta, 10)

function PostGridElementHtmlpostMeta(html, itemData, element) {

  var options = element.options
  var prefixText = options?.prefixText
  var postfixText = options?.postfixText


  return <div id={`element-${element.id}`} className={`${element.type}`} >
    <div className="prefix">{prefixText}</div>
    <div className="meta-value">
      Post Meta
    </div>
    <div className="postfix">{postfixText}</div>

  </div>;
}



/*commentsCount*/
addFilter('PostGridElementHtmlcommentsCount', 'post-grid/element', PostGridElementHtmlcommentsCount, 10)

function PostGridElementHtmlcommentsCount(html, itemData, element) {
  return <div id={`element-${element.id}`} className={`${element.type}`} >{itemData.commentsCount.count}</div>;
}

/*shareButton*/
addFilter('PostGridElementHtmlshareButton', 'post-grid/element', PostGridElementHtmlshareButton, 10)

function PostGridElementHtmlshareButton(html, itemData, element) {
  return <div id={`element-${element.id}`} className={`${element.type}`} >shareButton</div>;
}

/*postContent*/
addFilter('PostGridElementHtmlpostContent', 'post-grid/element', PostGridElementHtmlpostContent, 10)

function PostGridElementHtmlpostContent(html, itemData, element) {
  return <div id={`element-${element.id}`} className={`${element.type}`} >Affiliate marketers depend heavily on email marketing to drive sales and connect with leads. However, when email lists are not verified, they can lead to higher bounce rates, spam complaints, and even blacklisting by email providers. This section will introduce…

  </div>;
}

/*postThumbnail*/
addFilter('PostGridElementHtmlpostThumbnail', 'post-grid/element', PostGridElementHtmlpostThumbnail, 10)

function PostGridElementHtmlpostThumbnail(html, itemData, element) {

  var elementOptions = element.options;
  var srcUrl = itemData?.postThumbnail?.srcUrl;

  return <div id={`element-${element.id}`} className={`${element.type}`} >
    <img src={srcUrl.length == 0 ? elementOptions.defaultSrcUrl : srcUrl} alt="" />
  </div>;
}























/*wooPrice*/
addFilter('PostGridElementHtmlwooPrice', 'post-grid/element', PostGridElementHtmlwooPrice, 10)

function PostGridElementHtmlwooPrice(html, itemData, element) {


  var options = element?.options
  var currencySymbole = options.currencySymbole
  var currencyPosition = options.currencyPosition
  var separatorText = options.separatorText
  var prefixText = options.prefixText
  var postfixText = options.postfixText


  return <div id={`element-${element.id}`} className={`${element.type}`}>
    {prefixText?.length > 0 && (
      <div className="prefix">{prefixText}</div>
    )}
    <div className="regular">
      <span className="currency">{currencySymbole}</span>
      <span className="price-value">123</span>
    </div>
    <div className="separator">{separatorText}</div>

    <div className="sale-price">
      <span className="currency">{currencySymbole}</span>
      <span className="price-value">250</span>
    </div>
    {postfixText?.length > 0 && (
      <div className="postfix">{postfixText}</div>

    )}
  </div>;
}

/*wooSaleBadge*/
addFilter('PostGridElementHtmlwooSaleBadge', 'post-grid/element', PostGridElementHtmlwooSaleBadge, 10)

function PostGridElementHtmlwooSaleBadge(html, itemData, element) {


  var options = element?.options
  var onSaleText = options.onSaleText
  var prefixText = options.prefixText
  var postfixText = options.postfixText


  return <div id={`element-${element.id}`} className={`${element.type}`}>
    {prefixText?.length > 0 && (
      <div className="prefix">{prefixText}</div>
    )}
    <div className="on-sale-badge">
      {onSaleText}
    </div>
    {postfixText?.length > 0 && (
      <div className="postfix">{postfixText}</div>

    )}
  </div>;
}

/*wooSKU*/
addFilter('PostGridElementHtmlwooSKU', 'post-grid/element', PostGridElementHtmlwooSKU, 10)

function PostGridElementHtmlwooSKU(html, itemData, element) {


  var options = element?.options
  var dafaultSKUText = options.dafaultSKUText
  var prefixText = options.prefixText
  var postfixText = options.postfixText


  return <div id={`element-${element.id}`} className={`${element.type}`}>
    {prefixText?.length > 0 && (
      <div className="prefix">{prefixText}</div>
    )}
    <div className="sku">
      {dafaultSKUText}
    </div>
    {postfixText?.length > 0 && (
      <div className="postfix">{postfixText}</div>

    )}

  </div>;
}

/*wooStockQuantity*/
addFilter('PostGridElementHtmlwooStockQuantity', 'post-grid/element', PostGridElementHtmlwooStockQuantity, 10)

function PostGridElementHtmlwooStockQuantity(html, itemData, element) {


  var options = element?.options
  var dafultQuantity = options.dafultQuantity
  var prefixText = options.prefixText
  var postfixText = options.postfixText


  return <div id={`element-${element.id}`} className={`${element.type}`}>
    {prefixText?.length > 0 && (
      <div className="prefix">{prefixText}</div>
    )}
    <div className="stock-quantity">
      {dafultQuantity}
    </div>
    {postfixText?.length > 0 && (
      <div className="postfix">{postfixText}</div>

    )}


  </div>;
}

/*wooInStock*/
addFilter('PostGridElementHtmlwooInStock', 'post-grid/element', PostGridElementHtmlwooInStock, 10)

function PostGridElementHtmlwooInStock(html, itemData, element) {


  var options = element?.options
  var inStockText = options.inStockText
  var outOfStockText = options.outOfStockText
  var backOrderText = options.backOrderText
  var prefixText = options.prefixText
  var postfixText = options.postfixText
  var previewFor = options.previewFor


  return <div id={`element-${element.id}`} className={`${element.type}`}>
    {prefixText?.length > 0 && (
      <div className="prefix">{prefixText}</div>
    )}

    {previewFor == 'inStockText' && (
      <div className="instock">
        {inStockText}
      </div>
    )}
    {previewFor == 'outOfStockText' && (
      <div className="outofstock">
        {outOfStockText}
      </div>
    )}
    {previewFor == 'backOrderText' && (
      <div className="onbackorder">
        {backOrderText}
      </div>
    )}


    {postfixText?.length > 0 && (
      <div className="postfix">{postfixText}</div>

    )}

  </div>;
}

/*wooTotalSales*/
addFilter('PostGridElementHtmlwooTotalSales', 'post-grid/element', PostGridElementHtmlwooTotalSales, 10)

function PostGridElementHtmlwooTotalSales(html, itemData, element) {


  var options = element?.options
  var defaultSaleCount = options.defaultSaleCount
  var prefixText = options.prefixText
  var postfixText = options.postfixText


  return <div id={`element-${element.id}`} className={`${element.type}`}>
    {prefixText?.length > 0 && (
      <div className="prefix">{prefixText}</div>
    )}
    <div className="sale-count">
      {defaultSaleCount}
    </div>
    {postfixText?.length > 0 && (
      <div className="postfix">{postfixText}</div>

    )}

  </div>;
}

/*wooProductRatings*/
addFilter('PostGridElementHtmlwooProductRatings', 'post-grid/element', PostGridElementHtmlwooProductRatings, 10)

function PostGridElementHtmlwooProductRatings(html, itemData, element) {


  var options = element?.options
  var iconsIdle = options.iconsIdle
  var iconsFilled = options.iconsFilled
  var defaultRating = options.defaultRating
  var summaryType = options.summaryType
  var summaryTypeCustom = options.summaryTypeCustom
  var summaryLinkTo = options.summaryLinkTo
  var prefixText = options.prefixText
  var postfixText = options.postfixText


  var iconsIdleHtml = `<span class="${iconsIdle.iconSrc}"></span>`;
  var iconsFilledHtml = `<span class="${iconsFilled.iconSrc}"></span>`;

  function replaceAll(str, correction) {
    Object.keys(correction).forEach((key) => {
      str = str.replaceAll(key, correction[key]);
    });
    return str;
  }

  var map = {
    "{rating_count}": "",
    "{review_count}": "",
    "{average_rating}": "",
    "{product_title}": "",
  };

  const [ratingMap, setratingMap] = useState(map);
  var filledStyles = { width: "60%" }


  return <div id={`element-${element.id}`} className={`${element.type}`}>
    {prefixText?.length > 0 && (
      <div className="prefix">{prefixText}</div>
    )}
    <div className="icons-wrap">
      <div className="icons-idle">
        <span
          className={``}
          dangerouslySetInnerHTML={{ __html: iconsIdleHtml }}
        />
        <span
          className={``}
          dangerouslySetInnerHTML={{ __html: iconsIdleHtml }}
        />
        <span
          className={``}
          dangerouslySetInnerHTML={{ __html: iconsIdleHtml }}
        />
        <span
          className={``}
          dangerouslySetInnerHTML={{ __html: iconsIdleHtml }}
        />
        <span
          className={``}
          dangerouslySetInnerHTML={{ __html: iconsIdleHtml }}
        />
        <div className="icons-filled" style={filledStyles}>
          <span
            className={``}
            dangerouslySetInnerHTML={{ __html: iconsFilledHtml }}
          />
          <span
            className={``}
            dangerouslySetInnerHTML={{ __html: iconsFilledHtml }}
          />
          <span
            className={``}
            dangerouslySetInnerHTML={{ __html: iconsFilledHtml }}
          />
          <span
            className={``}
            dangerouslySetInnerHTML={{ __html: iconsFilledHtml }}
          />
          <span
            className={``}
            dangerouslySetInnerHTML={{ __html: iconsFilledHtml }}
          />
        </div>
      </div>
    </div>
    <div className="summary">
      {summaryType !== "custom" &&
        summaryType !== null && (
          <>{replaceAll(summaryType, ratingMap)}</>
        )}
      {summaryType == "custom" &&
        summaryTypeCustom.length > 0 && (
          <>{replaceAll(summaryTypeCustom, ratingMap)}</>
        )}
    </div>
    {postfixText?.length > 0 && (
      <div className="postfix">{postfixText}</div>

    )}

  </div>;
}





/*wooAddToCart*/
addFilter('PostGridElementHtmlwooAddToCart', 'post-grid/element', PostGridElementHtmlwooAddToCart, 10)

function PostGridElementHtmlwooAddToCart(html, itemData, element) {


  var options = element?.options
  var addToCartText = options.addToCartText
  var quantityEnable = options.quantityEnable
  var icon = options.icon
  var iconPosition = options.iconPosition
  var prefixText = options.prefixText
  var postfixText = options.postfixText

  var iconSrc = icon?.iconSrc;


  var iconHtml = `<span class="${iconSrc}"></span>`;


  return <div id={`element-${element.id}`} className={`${element.type}`}>
    {iconPosition == "beforePrefix" && (
      <span
        className={`icon-wrap`}
        dangerouslySetInnerHTML={{ __html: iconHtml }}
      />
    )}
    {prefixText?.length > 0 && (
      <div className="prefix">{prefixText}</div>
    )}
    {iconPosition == "afterPrefix" && (
      <span
        className={`icon-wrap`}
        dangerouslySetInnerHTML={{ __html: iconHtml }}
      />
    )}
    <a
      className="cartBtn"
      onClick={ev => { ev.preventDefault() }}
      href="?add-to-cart=1399"
      data-quantity="1"
      data-product_id="1399"
      data-product_sku="woo-polo"
      aria-label="Add “Polo” to your cart"
      aria-describedby=""
      rel="nofollow">
      {iconPosition == "beforeCartText" && (
        <span
          className="icon-wrap"
          dangerouslySetInnerHTML={{ __html: iconHtml }}
        />
      )}
      {addToCartText}
      {iconPosition == "afterCartText" && (
        <span
          className="icon-wrap"
          dangerouslySetInnerHTML={{ __html: iconHtml }}
        />
      )}
    </a>
    {quantityEnable && (
      <div className='quantityWrap'>
        <div className="quantityIncrease">+</div>
        <input size="3"
          type="text"
          inputMode="numeric" className="quantityInput"
          placeholder='1'
          value={'3'}
        />
        <div className="quantityDecrease">-</div>
      </div>
    )}

    {iconPosition == "beforePostfix" && (
      <span
        className={`icon-wrap`}
        dangerouslySetInnerHTML={{ __html: iconHtml }}
      />
    )}
    {postfixText?.length > 0 && (
      <div className="postfix">{postfixText}</div>

    )}
    {iconPosition == "afterPostfix" && (
      <span
        className={`icon-wrap`}
        dangerouslySetInnerHTML={{ __html: iconHtml }}
      />
    )}

  </div>;
}
