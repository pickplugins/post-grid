

const { Component } = wp.element;
import { Button, Dropdown, } from '@wordpress/components'
import { useState, } from '@wordpress/element'
import { applyFilters, doAction, addAction, addFilter } from "@wordpress/hooks";

import { __experimentalInputControl as InputControl, ColorPalette } from '@wordpress/components';


/*postTitle*/
addFilter('PostGridElementHtmlPreviewpostTitle', 'post-grid/element', PostGridElementHtmlPreviewpostTitle, 10)

function PostGridElementHtmlPreviewpostTitle(html, block, setCurretnElement) {

  var options = block.options
  var target = options.target
  var linkTo = options.linkTo

  return <div
    id={`element-${block.id}`}
    className={`${block.type}`}
    onClick={(ev) => {
      setCurretnElement(block.id);
    }}
  >
    {linkTo?.length > 0 && (
      <a onClick={ev => { ev.preventDefault() }} href={"#"} target={target} >How to Get the Best Deals on Email Verification Services</a>
    )}
    {linkTo?.length == 0 && (
      <>How to Get the Best Deals on Email Verification Services</>
    )}

  </div>;
}

/*postId*/
addFilter('PostGridElementHtmlPreviewpostId', 'post-grid/element', PostGridElementHtmlPreviewpostId, 10)

function PostGridElementHtmlPreviewpostId(html, block, setCurretnElement) {

  var options = block.options
  var target = options.target
  var linkTo = options.linkTo

  return <div
    id={`element-${block.id}`}
    className={`${block.type}`}
    onClick={(ev) => {
      setCurretnElement(block.id);
    }}
  >
    {linkTo?.length > 0 && (
      <a onClick={ev => { ev.preventDefault() }} href={"#"} target={target}>{block.id}</a>
    )}
    {linkTo?.length == 0 && (
      <>{block.id}</>
    )}

  </div>;
}


/*readMore*/
addFilter('PostGridElementHtmlPreviewreadMore', 'post-grid/element', PostGridElementHtmlPreviewreadMore, 10)

function PostGridElementHtmlPreviewreadMore(html, block, setCurretnElement) {

  var options = block.options
  var target = options.target
  var readMoreText = options.readMoreText

  return <a onClick={ev => { ev.preventDefault() }} id={`element-${block.id}`} onClick={(ev) => {
    setCurretnElement(block.id);
  }} target={target} href={"#"}>
    {readMoreText}
  </a>;
}
/*customText*/
addFilter('PostGridElementHtmlPreviewcustomText', 'post-grid/element', PostGridElementHtmlPreviewcustomText, 10)

function PostGridElementHtmlPreviewcustomText(html, block, setCurretnElement) {

  var options = block.options
  var tag = options.tag
  var content = options.content
  const CustomTagWrapper = `${tag}`;

  return <CustomTagWrapper onClick={ev => { ev.preventDefault() }} id={`element-${block.id}`} onClick={(ev) => {
    setCurretnElement(block.id);
  }}>
    {content}
  </CustomTagWrapper>;
}









/*postExcerpt*/
addFilter('PostGridElementHtmlPreviewpostExcerpt', 'post-grid/element', PostGridElementHtmlPreviewpostExcerpt, 10)

function PostGridElementHtmlPreviewpostExcerpt(html, block, setCurretnElement) {

  var options = block.options;
  var limitBy = options.limitBy;
  var limitCount = options.limitCount;
  var target = options.target;
  var readMoreText = options.readMoreText

  var excerptText = "In todays digital landscape, email marketing remains one of the most effective ways to engage customers and drive conversions. However, sending emails to invalid or unverified addresses can lead to spam complaints, high bounce rates, and even blacklisting. This not…"


  var count = limitCount > 0 ? limitCount : 999;
  if (limitBy == "character") {
    excerptText = excerptText.substring(0, count)
  } else if (limitBy == "word") {
    setPostExcerptEdited(
      excerptText = excerptText.split(" ").splice(0, count).join(" ")

    );
  }



  return <div id={`element-${block.id}`} onClick={(ev) => {
    setCurretnElement(block.id);
  }} >
    <p className="excerpt-text">
      {excerptText}
    </p>
    {readMoreText.length > 0 && (
      <a onClick={ev => { ev.preventDefault() }} href={"#"} target={target} className="redmore">{readMoreText}</a>
    )}
  </div>;
}

/*postDate*/
addFilter('PostGridElementHtmlPreviewpostDate', 'post-grid/element', PostGridElementHtmlPreviewpostDate, 10)

function PostGridElementHtmlPreviewpostDate(html, block, setCurretnElement) {

  var options = block.options;
  var prefixText = options.prefixText;
  var postfixText = options.postfixText;
  var linkTo = options.linkTo;
  var target = options.target;

  var icon = options.icon
  var iconSrc = icon?.iconSrc;
  var iconHtml = `<span class="${iconSrc}"></span>`;


  return <div id={`element-${block.id}`} onClick={(ev) => {
    setCurretnElement(block.id);
  }} >
    <div className="prefix">{prefixText}</div>
    <span
      className={`icon-wrap`}
      dangerouslySetInnerHTML={{ __html: iconHtml }}
    />
    {linkTo.length > 0 && (
      <a onClick={ev => { ev.preventDefault() }} href={"#"} target={target} className="post-date-label">12/05/2025</a>
    )}
    {linkTo.length == 0 && (
      <div className="post-date-label">12/05/2025</div>
    )}
    <div className="postfix">{postfixText}</div>
  </div>;
}

/*postAuthor*/
addFilter('PostGridElementHtmlPreviewpostAuthor', 'post-grid/element', PostGridElementHtmlPreviewpostAuthor, 10)

function PostGridElementHtmlPreviewpostAuthor(html, block, setCurretnElement) {

  var options = block.options;
  var prefixText = options.prefixText;
  var postfixText = options.postfixText;
  var linkTo = options.linkTo;
  var target = options.target;


  return <div id={`element-${block.id}`} onClick={(ev) => {
    setCurretnElement(block.id);
  }} >
    <div className="prefix">{prefixText}</div>
    {linkTo.length > 0 && (
      <a onClick={ev => { ev.preventDefault() }} href={"#"} target={target} className="author-name">PickPlugins</a>
    )}
    {linkTo.length == 0 && (
      <div className="author-name">PickPlugins</div>
    )}
    <div className="postfix">{postfixText}</div>
  </div>;
}

/*postAuthorAvatar*/
addFilter('PostGridElementHtmlPreviewpostAuthorAvatar', 'post-grid/element', PostGridElementHtmlPreviewpostAuthorAvatar, 10)

function PostGridElementHtmlPreviewpostAuthorAvatar(html, block, setCurretnElement) {


  var options = block.options;
  var prefixText = options.prefixText;
  var postfixText = options.postfixText;
  var linkTo = options.linkTo;
  var target = options.target;


  return <div id={`element-${block.id}`} onClick={(ev) => {
    setCurretnElement(block.id);
  }} >
    <div className="prefix">{prefixText}</div>

    {linkTo.length > 0 && (
      <a onClick={ev => { ev.preventDefault() }} href={"#"} target={target} className="author-link">
        <img className="avatar" src="https://pickplugins.com/wp-content/litespeed/avatar/60b037d2fe05ceb39acb7f02dbd29bd8.jpg?ver=1744938018" alt="" />
      </a>
    )}
    {linkTo.length == 0 && (
      <img className="avatar" src="https://pickplugins.com/wp-content/litespeed/avatar/60b037d2fe05ceb39acb7f02dbd29bd8.jpg?ver=1744938018" alt="" />
    )}


    <div className="postfix">{postfixText}</div>
  </div>;
}

/*postCategories*/
addFilter('PostGridElementHtmlPreviewpostCategories', 'post-grid/element', PostGridElementHtmlPreviewpostCategories, 10)

function PostGridElementHtmlPreviewpostCategories(html, block, setCurretnElement) {

  var options = block?.options
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


  return <div id={`element-${block.id}`} onClick={(ev) => {
    setCurretnElement(block.id);
  }} >
    <div className="prefix">{prefixText}</div>
    <div className="terms-items">
      {MaxCategories.map((category, index) => {
        return (
          <div className="term-item">
            <a onClick={ev => { ev.preventDefault() }} className="term-link" href="#" target={target}>
              <span className="term-title">{category.title}</span>
              {postCount && (
                <span className="post-count" >{`(${category.count})`}</span>
              )}
            </a>
            {MaxCategories.length > (index + 1) && (
              <span className="separator">{separator}</span>
            )}          </div>
        )
      })}
    </div>
    <div className="postfix">{postfixText}</div>

  </div>;
}

/*postTags*/
addFilter('PostGridElementHtmlPreviewpostTags', 'post-grid/element', PostGridElementHtmlPreviewpostTags, 10)

function PostGridElementHtmlPreviewpostTags(html, block, setCurretnElement) {

  var options = block?.options
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

  ];

  var MaxTags = tags.slice(0, maxCount);


  return <div id={`element-${block.id}`} onClick={(ev) => {
    setCurretnElement(block.id);
  }} >
    <div className="prefix">{prefixText}</div>
    <div className="terms-items">
      {MaxTags.map((tag, index) => {
        return (
          <div className="term-item">
            <a onClick={ev => { ev.preventDefault() }} className="term-link" href="#" target={target}>
              <span className="term-title">{tag.title}</span>
              {postCount && (
                <span className="post-count" >{`(${tag.count})`}</span>
              )}
            </a>
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
addFilter('PostGridElementHtmlPreviewpostMeta', 'post-grid/element', PostGridElementHtmlPreviewpostMeta, 10)

function PostGridElementHtmlPreviewpostMeta(html, block, setCurretnElement) {

  var options = block?.options
  var prefixText = options?.prefixText
  var postfixText = options?.postfixText




  return <div id={`element-${block.id}`} onClick={(ev) => {
    setCurretnElement(block.id);
  }} >
    <div className="prefix">{prefixText}</div>
    <div className="meta-value">
      Post Meta
    </div>
    <div className="postfix">{postfixText}</div>

  </div>;
}



/*commentsCount*/
addFilter('PostGridElementHtmlPreviewcommentsCount', 'post-grid/element', PostGridElementHtmlPreviewcommentsCount, 10)

function PostGridElementHtmlPreviewcommentsCount(html, block, setCurretnElement) {
  return <div id={`element-${block.id}`} onClick={(ev) => {
    setCurretnElement(block.id);
  }} >commentsCount</div>;
}
/*wooProductRatings*/
addFilter('PostGridElementHtmlPreviewwooProductRatings', 'post-grid/element', PostGridElementHtmlPreviewwooProductRatings, 10)

function PostGridElementHtmlPreviewwooProductRatings(html, block, setCurretnElement) {

  var options = block?.options
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

  var filledValue = parseFloat(defaultRating) * 20 + "%"

  var filledStyles = { width: filledValue }

  return <div id={`element-${block.id}`} onClick={(ev) => {
    setCurretnElement(block.id);
  }} >
    {prefixText.length > 0 && (
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
    {postfixText.length > 0 && (
      <div className="postfix">{postfixText}</div>

    )}

  </div>;
}


/*shareButton*/
addFilter('PostGridElementHtmlPreviewshareButton', 'post-grid/element', PostGridElementHtmlPreviewshareButton, 10)

function PostGridElementHtmlPreviewshareButton(html, block, setCurretnElement) {
  return <div id={`element-${block.id}`} onClick={(ev) => {
    setCurretnElement(block.id);
  }} >shareButton</div>;
}

/*postContent*/
addFilter('PostGridElementHtmlPreviewpostContent', 'post-grid/element', PostGridElementHtmlPreviewpostContent, 10)

function PostGridElementHtmlPreviewpostContent(html, block, setCurretnElement) {
  return <div id={`element-${block.id}`} onClick={(ev) => {
    setCurretnElement(block.id);
  }} >Affiliate marketers depend heavily on email marketing to drive sales and connect with leads. However, when email lists are not verified, they can lead to higher bounce rates, spam complaints, and even blacklisting by email providers. This section will introduce…

  </div>;
}

/*postThumbnail*/
addFilter('PostGridElementHtmlPreviewpostThumbnail', 'post-grid/element', PostGridElementHtmlPreviewpostThumbnail, 10)

function PostGridElementHtmlPreviewpostThumbnail(html, block, setCurretnElement) {

  var elementOptions = block.options;


  return <div id={`element-${block.id}`} onClick={(ev) => {
    setCurretnElement(block.id);
  }} >
    <img src={elementOptions.defaultSrcUrl} alt="" />
  </div>;
}







/*wooPrice*/
addFilter('PostGridElementHtmlPreviewwooPrice', 'post-grid/element', PostGridElementHtmlPreviewwooPrice, 10)

function PostGridElementHtmlPreviewwooPrice(html, block, setCurretnElement) {

  var options = block.options
  var currencySymbole = options.currencySymbole
  var currencyPosition = options.currencyPosition
  var separatorText = options.separatorText
  var prefixText = options.prefixText
  var postfixText = options.postfixText
  var previewFor = options.previewFor ?? 'simple';

  return <div
    id={`element-${block.id}`}
    className={`${block.type}`}
    onClick={(ev) => {
      setCurretnElement(block.id);
    }}
  >
    <div className="prefix">{prefixText}</div>

    {previewFor == 'simple' && (
      <>

        <div className="regular">
          <span className="currency">{currencySymbole}</span>
          <span className="price-value">123</span>
        </div>
        <div className="sale-price">
          <span className="currency">{currencySymbole}</span>
          <span className="price-value">250</span>
        </div>

      </>
    )}
    {previewFor == 'variable' && (
      <>
        <div className="regular">
          <span className="currency">{currencySymbole}</span>
          <span className="price-value">123</span>
        </div>
        <div className="separator">{separatorText}</div>
        <div className="sale-price">
          <span className="currency">{currencySymbole}</span>
          <span className="price-value">250</span>
        </div>
      </>
    )}
    {previewFor == 'grouped' && (
      <>
        <div className="regular">
          <span className="currency">{currencySymbole}</span>
          <span className="price-value">123</span>
        </div>
        <div className="separator">{separatorText}</div>
        <div className="sale-price">
          <span className="currency">{currencySymbole}</span>
          <span className="price-value">250</span>
        </div>
      </>
    )}
    {previewFor == 'external' && (
      <></>
    )}



    <div className="postfix">{postfixText}</div>


  </div>;
}


/*wooSaleBadge*/
addFilter('PostGridElementHtmlPreviewwooSaleBadge', 'post-grid/element', PostGridElementHtmlPreviewwooSaleBadge, 10)

function PostGridElementHtmlPreviewwooSaleBadge(html, block, setCurretnElement) {

  var options = block.options
  var onSaleText = options.onSaleText
  var prefixText = options.prefixText
  var postfixText = options.postfixText

  return <div
    id={`element-${block.id}`}
    className={`${block.type}`}
    onClick={(ev) => {
      setCurretnElement(block.id);
    }}
  >
    <div className="prefix">{prefixText}</div>
    <div className="on-sale-badge">
      {onSaleText}
    </div>
    <div className="postfix">{postfixText}</div>


  </div>;
}

/*wooSKU*/
addFilter('PostGridElementHtmlPreviewwooSKU', 'post-grid/element', PostGridElementHtmlPreviewwooSKU, 10)

function PostGridElementHtmlPreviewwooSKU(html, block, setCurretnElement) {

  var options = block.options
  var dafaultSKUText = options.dafaultSKUText
  var prefixText = options.prefixText
  var postfixText = options.postfixText

  return <div
    id={`element-${block.id}`}
    className={`${block.type}`}
    onClick={(ev) => {
      setCurretnElement(block.id);
    }}
  >
    <div className="prefix">{prefixText}</div>
    <div className="sku">
      {dafaultSKUText}
    </div>
    <div className="postfix">{postfixText}</div>


  </div>;
}

/*wooStockQuantity*/
addFilter('PostGridElementHtmlPreviewwooStockQuantity', 'post-grid/element', PostGridElementHtmlPreviewwooStockQuantity, 10)

function PostGridElementHtmlPreviewwooStockQuantity(html, block, setCurretnElement) {

  var options = block.options
  var dafultQuantity = options.dafultQuantity
  var prefixText = options.prefixText
  var postfixText = options.postfixText

  return <div
    id={`element-${block.id}`}
    className={`${block.type}`}
    onClick={(ev) => {
      setCurretnElement(block.id);
    }}
  >
    <div className="prefix">{prefixText}</div>
    <div className="stock-quantity">
      {dafultQuantity}
    </div>
    <div className="postfix">{postfixText}</div>


  </div>;
}

/*wooInStock*/
addFilter('PostGridElementHtmlPreviewwooInStock', 'post-grid/element', PostGridElementHtmlPreviewwooInStock, 10)

function PostGridElementHtmlPreviewwooInStock(html, block, setCurretnElement) {

  var options = block.options
  var inStockText = options.inStockText
  var outOfStockText = options.outOfStockText
  var backOrderText = options.backOrderText
  var prefixText = options.prefixText
  var postfixText = options.postfixText
  var previewFor = options.previewFor ?? 'inStockText';

  return <div
    id={`element-${block.id}`}
    className={`${block.type}`}
    onClick={(ev) => {
      setCurretnElement(block.id);
    }}
  >
    <div className="prefix">{prefixText}</div>

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







    <div className="postfix">{postfixText}</div>


  </div>;
}

/*wooTotalSales*/
addFilter('PostGridElementHtmlPreviewwooTotalSales', 'post-grid/element', PostGridElementHtmlPreviewwooTotalSales, 10)

function PostGridElementHtmlPreviewwooTotalSales(html, block, setCurretnElement) {

  var options = block.options
  var defaultSaleCount = options.defaultSaleCount
  var prefixText = options.prefixText
  var postfixText = options.postfixText

  return <div
    id={`element-${block.id}`}
    className={`${block.type}`}
    onClick={(ev) => {
      setCurretnElement(block.id);
    }}
  >
    <div className="prefix">{prefixText}</div>
    <div className="sale-count">
      {defaultSaleCount}
    </div>
    <div className="postfix">{postfixText}</div>


  </div>;
}




/*wooAddToCart*/
addFilter('PostGridElementHtmlPreviewwooAddToCart', 'post-grid/element', PostGridElementHtmlPreviewwooAddToCart, 10)

function PostGridElementHtmlPreviewwooAddToCart(html, block, setCurretnElement) {

  var options = block.options
  var addToCartText = options.addToCartText
  var quantityEnable = options.quantityEnable
  var icon = options.icon
  var iconPosition = options.iconPosition
  var prefixText = options.prefixText
  var postfixText = options.postfixText

  var iconSrc = icon?.iconSrc;
  var iconHtml = `<span class="${iconSrc}"></span>`;


  return <div
    id={`element-${block.id}`}
    className={`${block.type}`}
    onClick={(ev) => {
      setCurretnElement(block.id);
    }}
  >
    {iconPosition == "beforePrefix" && (
      <span
        className={`icon-wrap`}
        dangerouslySetInnerHTML={{ __html: iconHtml }}
      />
    )}
    <div className="prefix">{prefixText}</div>
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
    <div className="postfix">{postfixText}</div>
    {iconPosition == "afterPostfix" && (
      <span
        className={`icon-wrap`}
        dangerouslySetInnerHTML={{ __html: iconHtml }}
      />
    )}


  </div>;
}




/*wooCategories*/
addFilter('PostGridElementHtmlPreviewwooCategories', 'post-grid/element', PostGridElementHtmlPreviewwooCategories, 10)

function PostGridElementHtmlPreviewwooCategories(html, block, setCurretnElement) {

  var options = block?.options
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


  return <div id={`element-${block.id}`} onClick={(ev) => {
    setCurretnElement(block.id);
  }} >
    <div className="prefix">{prefixText}</div>
    <div className="terms-items">
      {MaxCategories.map((category, index) => {
        return (
          <div className="term-item">
            <a onClick={ev => { ev.preventDefault() }} className="term-link" href="#" target={target}>
              <span className="term-title">{category.title}</span>
              {postCount && (
                <span className="post-count" >{`(${category.count})`}</span>
              )}
            </a>
            {MaxCategories.length > (index + 1) && (
              <span className="separator">{separator}</span>
            )}          </div>
        )
      })}
    </div>
    <div className="postfix">{postfixText}</div>

  </div>;
}

/*wooTags*/
addFilter('PostGridElementHtmlPreviewwooTags', 'post-grid/element', PostGridElementHtmlPreviewwooTags, 10)

function PostGridElementHtmlPreviewwooTags(html, block, setCurretnElement) {

  var options = block?.options
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

  ];

  var MaxTags = tags.slice(0, maxCount);


  return <div id={`element-${block.id}`} onClick={(ev) => {
    setCurretnElement(block.id);
  }} >
    <div className="prefix">{prefixText}</div>
    <div className="terms-items">
      {MaxTags.map((tag, index) => {
        return (
          <div className="term-item">
            <a onClick={ev => { ev.preventDefault() }} className="term-link" href="#" target={target}>
              <span className="term-title">{tag.title}</span>
              {postCount && (
                <span className="post-count" >{`(${tag.count})`}</span>
              )}
            </a>
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
