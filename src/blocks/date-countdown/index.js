import { registerBlockType } from "@wordpress/blocks";
import apiFetch from "@wordpress/api-fetch";
import {
  InnerBlocks,
  useBlockProps,
  useInnerBlocksProps,
} from "@wordpress/block-editor";

import { __ } from "@wordpress/i18n";
import { useSelect, select, useDispatch, dispatch } from "@wordpress/data";
import { useEntityRecord } from "@wordpress/core-data";
import {
  createElement,
  useCallback,
  memo,
  useMemo,
  useState,
  useEffect,
} from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";

import {
  PanelBody,
  RangeControl,
  Button,
  Panel,
  PanelRow,
  Dropdown,
  DropdownMenu,
  SelectControl,
  ColorPicker,
  ColorPalette,
  ToolsPanelItem,
  ComboboxControl,
  ToggleControl,
  MenuGroup,
  MenuItem,
  TextareaControl,
  Popover,
  DateTimePicker,
} from "@wordpress/components";
import { __experimentalBoxControl as BoxControl } from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
import { Icon, styles, settings, link, linkOff } from "@wordpress/icons";

import {
  InspectorControls,
  BlockControls,
  AlignmentToolbar,
  RichText,
  __experimentalLinkControl as LinkControl,
} from "@wordpress/block-editor";
import { __experimentalInputControl as InputControl } from "@wordpress/components";
import breakPoints from "../../breakpoints";
const { RawHTML } = wp.element;
import { store } from "../../store";

import IconToggle from "../../components/icon-toggle";
import Typography from "../../components/typography";
import PGMailSubsctibe from "../../components/mail-subscribe";
import PGContactSupport from "../../components/contact-support";
import BreakpointToggle from "../../components/breakpoint-toggle";
import colorsPresets from "../../colors-presets";
import PGDropdown from "../../components/dropdown";
import PGIconPicker from "../../components/icon-picker";
import PGcssDisplay from "../../components/css-display";

import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import PGStyles from "../../components/styles";
import PGCssLibrary from "../../components/css-library";

var myStore = wp.data.select("postgrid-shop");

registerBlockType("post-grid/date-countdown", {
  apiVersion: 2,
  title: "Date Countdown",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: "#fff",
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: "#fff",
    // Specifying an icon for the block
    src: (
      <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 36 36"
      >
        <path
          fill="#8db1ff"
          d="M19.4,10.05V9.24l1-1C22.91,5.89,24,4.64,24,3.18a1.73,1.73,0,0,0-1.92-1.9,3.33,3.33,0,0,0-2.06.82l-.42-.92a4.24,4.24,0,0,1,2.74-1,2.73,2.73,0,0,1,3,2.82c0,1.79-1.3,3.24-3.34,5.2l-.77.72V9h4.35v1.09Z"
        />
        <path
          fill="#1d4ed8"
          d="M3.33,14.39h0l-1.69.91-.25-1,2.11-1.13H4.6v9.69H3.33Z"
        />
        <path
          fill="#1d4ed8"
          d="M9.65,22.86v-.81l1-1c2.47-2.35,3.59-3.6,3.6-5.07a1.72,1.72,0,0,0-1.92-1.89,3.33,3.33,0,0,0-2.06.82L9.89,14a4.22,4.22,0,0,1,2.74-1,2.72,2.72,0,0,1,3,2.82c0,1.79-1.29,3.23-3.33,5.2l-.78.72v0h4.35v1.09Z"
        />
        <path
          fill="#1d4ed8"
          d="M19.83,21.41A4.36,4.36,0,0,0,22,22c1.69,0,2.21-1.07,2.2-1.88,0-1.35-1.24-1.94-2.51-1.94h-.73v-1h.73c1,0,2.16-.49,2.16-1.64,0-.77-.49-1.46-1.7-1.46a3.51,3.51,0,0,0-1.93.64l-.35-.95a4.64,4.64,0,0,1,2.54-.75c1.9,0,2.77,1.14,2.77,2.31a2.41,2.41,0,0,1-1.79,2.28v0a2.53,2.53,0,0,1,2.16,2.49c0,1.55-1.21,2.91-3.53,2.91a4.86,4.86,0,0,1-2.52-.66Z"
        />
        <path
          fill="#8db1ff"
          d="M22.93,35.81V33.17h-4.5V32.3l4.32-6.18h1.42v6h1.35v1H24.17v2.64Zm0-3.67V28.9c0-.5,0-1,0-1.52h0c-.3.57-.54,1-.81,1.43l-2.37,3.3v0Z"
        />
        <path
          fill="#1d4ed8"
          d="M32.05,13.41,34.63,16l-.42.42-1.82-1.83,0,0v8h-.63V14.61L29.9,16.46,29.46,16Z"
        />
      </svg>
    ),
  },

  attributes: {
    wrapper: {
      type: "object",
      default: {
        options: { tag: "div", class: "" },

        styles: {
          color: { Desktop: "" },
          backgroundColor: { Desktop: "" },
        },
      },
    },

    setting: {
      type: "object",
      default: {
        options: {
          startDate: "",
          endDate: "",
          // start: "0",
          // end: "500",
          // duration: 1000,
          // class: "number-count",
        },
      },
    },
    second: {
      type: "object",
      default: {
        options: {
          tag: "div",
          class: "second-countdown",
          label: "",
          prefix: "",
          prefix: "",
        },

        styles: {
          color: { Desktop: "" },
          fontSize: { Desktop: "" },
        },
      },
    },
    minute: {
      type: "object",
      default: {
        options: {
          tag: "div",
          class: "minute-countdown",
          label: "",
          prefix: "",
          prefix: "",
        },

        styles: {
          color: { Desktop: "" },
          fontSize: { Desktop: "" },
        },
      },
    },
    hour: {
      type: "object",
      default: {
        options: {
          tag: "div",
          class: "hour-countdown",
          label: "",
          prefix: "",
          prefix: "",
        },

        styles: {
          color: { Desktop: "" },
          fontSize: { Desktop: "" },
        },
      },
    },
    day: {
      type: "object",
      default: {
        options: {
          tag: "div",
          class: "day-countdown",
          label: "",
          prefix: "",
          prefix: "",
        },

        styles: {
          color: { Desktop: "" },
          fontSize: { Desktop: "" },
        },
      },
    },
    numberCount: {
      type: "object",
      default: {
        options: {
          tag: "div",
          start: 0,
          end: 500,
          duration: 1000,
          class: "number-count",
        },

        styles: {
          color: { Desktop: "" },
          fontSize: { Desktop: "" },
        },
      },
    },
    icon: {
      type: "object",
      default: {
        options: {
          library: "fontAwesome",
          srcType: "class",
          /*class, html, img, svg */ iconSrc: "far fa-calendar-alt",
          position: "beforeCommentCount",
          /*before, after, prefix, postfix */ class: "number-count-icon",
        },

        styles: {
          color: { Desktop: "" },
          backgroundColor: { Desktop: "" },
          fontSize: { Desktop: "" },
        },
      },
    },

    label: {
      type: "object",
      default: {
        options: { text: "", class: "label" },
        styles: {
          color: { Desktop: "" },
          backgroundColor: { Desktop: "" },
        },
      },
    },

    prefix: {
      type: "object",
      default: {
        options: { text: "", class: "prefix" },
        styles: {
          color: { Desktop: "" },
          backgroundColor: { Desktop: "" },
        },
      },
    },

    postfix: {
      type: "object",
      default: {
        options: { text: "", class: "postfix" },
        styles: {
          color: { Desktop: "" },
          backgroundColor: { Desktop: "" },
        },
      },
    },

    customCss: {
      type: "string",
      default: "",
    },

    blockId: {
      type: "string",
      default: "",
    },
    blockCssY: {
      type: "object",
      default: { items: {} },
    },
  },
  usesContext: [],

  supports: {
    align: ["wide", "full"],
  },
  category: "post-grid",

  edit: function (props) {
    var attributes = props.attributes;
    var setAttributes = props.setAttributes;
    var context = props.context;
    var clientId = props.clientId;

    let setting = attributes.setting;
    let day = attributes.day;
    let hour = attributes.hour;
    let minute = attributes.minute;
    let second = attributes.second;
    let numberCount = attributes.numberCount;
    var wrapper = attributes.wrapper;
    var blockId = attributes.blockId;

    var blockIdX = attributes.blockId
      ? attributes.blockId
      : "pg" + clientId.split("-").pop();
    var blockClass = "." + blockIdX;
    var icon = attributes.icon;

    var label = attributes.label;
    var prefix = attributes.prefix;
    var postfix = attributes.postfix;
    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;

    //const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    var breakPointX = myStore.getBreakPoint();

    const [linkPickerPosttitle, setLinkPickerPosttitle] = useState(false);

    var [commentCountEdited, setcommentCountEdited] = useState(
      numberCount.options.start
    );

    // Wrapper CSS Class Selectors
    const wrapperSelector = blockClass;
    var commentCountSelector = blockClass + " .number-count";
    var secondSelector = blockClass + " .second-countdown";
    var minuteSelector = blockClass + " .minute-countdown";
    var hourSelector = blockClass + " .hour-countdown";
    var daySelector = blockClass + " .day-countdown";
    const labelSelector = blockClass + " .label";
    const prefixSelector = blockClass + " .prefix";
    const postfixSelector = blockClass + " .postfix";
    const iconSelector = blockClass + " .number-count-icon";

    // day hours minutes seconds

    const [remindTime, setRemindTime] = useState(0);
    const [remindDay, setRemindDay] = useState(0);
    const [remindHour, setRemindHour] = useState(0);
    const [remindMinute, setRemindMinute] = useState(0);
    const [remindSecond, setRemindSecond] = useState(0);
    // const [remindMiliSecond, setRemindMiliSecond] = useState(0);

    useEffect(() => {
      const dateInput1 = setting.options.startDate;
      const dateInput2 = setting.options.endDate;
      const currentDate = new Date();
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      const formattedDate = currentDate.toLocaleDateString(undefined, options);
      console.log(formattedDate);

      const date1 = new Date(dateInput1);
      const date2 = new Date(dateInput2);

      const startDate = currentDate > date1 ? currentDate : date1;

      const timeDifference = Math.abs(date2 - startDate);
      setRemindTime(timeDifference);

      // Check if current date is less than date1
      if (currentDate < date1) {
        // If current date is less, set remindTime to 0 to prevent countdown
        setRemindTime(0);
      }
    }, [clientId, setting.options.startDate, setting.options.endDate]);

    // Use the useEffect hook to update the remaining time every second
    useEffect(() => {
      if (remindTime > 0) {
        const intervalId = setInterval(() => {
          const remindTimeX = remindTime - 1000;
          setRemindTime(remindTimeX);
          const days = Math.floor(remindTimeX / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (remindTimeX % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (remindTimeX % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((remindTimeX % (1000 * 60)) / 1000);
          const formattedDays = String(days).padStart(2, "0");
          const formattedHours = String(hours).padStart(2, "0");
          const formattedMinutes = String(minutes).padStart(2, "0");
          const formattedSeconds = String(seconds).padStart(2, "0");

          setRemindDay(formattedDays);
          setRemindHour(formattedHours);
          setRemindMinute(formattedMinutes);
          setRemindSecond(formattedSeconds);
          if (remindTimeX <= 0) {
            clearInterval(intervalId);
          }
        }, 1000);

        return () => clearInterval(intervalId);
      }
    }, [remindTime, setting.options.startDate, setting.options.endDate]);

    // day hours minutes seconds

    const counterAnim = (qSelector, start = 0, end, duration = 1000) => {
      const target = document.querySelector(qSelector);
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        target.innerText = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    useEffect(() => {
      var start = parseInt(numberCount.options.start);
      var end = parseInt(numberCount.options.end);
      var duration = parseInt(numberCount.options.duration);

      counterAnim(commentCountSelector, start, end, duration);
    }, [numberCount]);

    function onChangeIcon(arg) {
      var options = {
        ...icon.options,
        srcType: arg.srcType,
        library: arg.library,
        iconSrc: arg.iconSrc,
      };
      setAttributes({ icon: { ...icon, options: options } });
    }

    function onPickCssLibraryWrapper(args) {
      Object.entries(args).map((x) => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        wrapper[sudoScource] = sudoScourceArgs;
      });

      var wrapperX = Object.assign({}, wrapper);
      setAttributes({ wrapper: wrapperX });

      var styleObj = {};

      Object.entries(args).map((x) => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(
          sudoScource,
          wrapperSelector
        );

        var sudoObj = {};
        Object.entries(sudoScourceArgs).map((y) => {
          var cssPropty = y[0];
          var cssProptyVal = y[1];
          var cssProptyKey = myStore.cssAttrParse(cssPropty);
          sudoObj[cssProptyKey] = cssProptyVal;
        });

        styleObj[elementSelector] = sudoObj;
      });

      var cssItems = Object.assign(blockCssY.items, styleObj);
      setAttributes({ blockCssY: { items: cssItems } });
    }

    function onPickCssLibrarySecondCountdown(args) {
      Object.entries(args).map((x) => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        second[sudoScource] = sudoScourceArgs;
      });

      var secondX = Object.assign({}, second);
      setAttributes({ second: secondX });

      var styleObj = {};

      Object.entries(args).map((x) => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(
          sudoScource,
          secondSelector
        );

        var sudoObj = {};
        Object.entries(sudoScourceArgs).map((y) => {
          var cssPropty = y[0];
          var cssProptyVal = y[1];
          var cssProptyKey = myStore.cssAttrParse(cssPropty);
          sudoObj[cssProptyKey] = cssProptyVal;
        });

        styleObj[elementSelector] = sudoObj;
      });

      var cssItems = Object.assign(blockCssY.items, styleObj);
      setAttributes({ blockCssY: { items: cssItems } });
    }

    function onPickCssLibraryMinuteCountdown(args) {
      Object.entries(args).map((x) => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        minute[sudoScource] = sudoScourceArgs;
      });

      var minuteX = Object.assign({}, minute);
      setAttributes({ minute: minuteX });

      var styleObj = {};

      Object.entries(args).map((x) => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(
          sudoScource,
          minuteSelector
        );

        var sudoObj = {};
        Object.entries(sudoScourceArgs).map((y) => {
          var cssPropty = y[0];
          var cssProptyVal = y[1];
          var cssProptyKey = myStore.cssAttrParse(cssPropty);
          sudoObj[cssProptyKey] = cssProptyVal;
        });

        styleObj[elementSelector] = sudoObj;
      });

      var cssItems = Object.assign(blockCssY.items, styleObj);
      setAttributes({ blockCssY: { items: cssItems } });
    }

    function onPickCssLibraryHourCountdown(args) {
      Object.entries(args).map((x) => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        hour[sudoScource] = sudoScourceArgs;
      });

      var hourX = Object.assign({}, hour);
      setAttributes({ hour: hourX });

      var styleObj = {};

      Object.entries(args).map((x) => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(
          sudoScource,
          hourSelector
        );

        var sudoObj = {};
        Object.entries(sudoScourceArgs).map((y) => {
          var cssPropty = y[0];
          var cssProptyVal = y[1];
          var cssProptyKey = myStore.cssAttrParse(cssPropty);
          sudoObj[cssProptyKey] = cssProptyVal;
        });

        styleObj[elementSelector] = sudoObj;
      });

      var cssItems = Object.assign(blockCssY.items, styleObj);
      setAttributes({ blockCssY: { items: cssItems } });
    }

    function onPickCssLibraryDayCountdown(args) {
      Object.entries(args).map((x) => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        day[sudoScource] = sudoScourceArgs;
      });

      var dayX = Object.assign({}, day);
      setAttributes({ day: dayX });

      var styleObj = {};

      Object.entries(args).map((x) => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(
          sudoScource,
          daySelector
        );

        var sudoObj = {};
        Object.entries(sudoScourceArgs).map((y) => {
          var cssPropty = y[0];
          var cssProptyVal = y[1];
          var cssProptyKey = myStore.cssAttrParse(cssPropty);
          sudoObj[cssProptyKey] = cssProptyVal;
        });

        styleObj[elementSelector] = sudoObj;
      });

      var cssItems = Object.assign(blockCssY.items, styleObj);
      setAttributes({ blockCssY: { items: cssItems } });
    }

    function onPickCssLibraryCommentCount(args) {
      Object.entries(args).map((x) => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        numberCount[sudoScource] = sudoScourceArgs;
      });

      var commentCountX = Object.assign({}, numberCount);
      setAttributes({ numberCount: commentCountX });

      var styleObj = {};

      Object.entries(args).map((x) => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(
          sudoScource,
          commentCountSelector
        );

        var sudoObj = {};
        Object.entries(sudoScourceArgs).map((y) => {
          var cssPropty = y[0];
          var cssProptyVal = y[1];
          var cssProptyKey = myStore.cssAttrParse(cssPropty);
          sudoObj[cssProptyKey] = cssProptyVal;
        });

        styleObj[elementSelector] = sudoObj;
      });

      var cssItems = Object.assign(blockCssY.items, styleObj);
      setAttributes({ blockCssY: { items: cssItems } });
    }

    function onPickCssLibraryIcon(args) {
      Object.entries(args).map((x) => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        icon[sudoScource] = sudoScourceArgs;
      });

      var iconX = Object.assign({}, icon);
      setAttributes({ icon: iconX });

      var styleObj = {};

      Object.entries(args).map((x) => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(
          sudoScource,
          iconSelector
        );

        var sudoObj = {};
        Object.entries(sudoScourceArgs).map((y) => {
          var cssPropty = y[0];
          var cssProptyVal = y[1];
          var cssProptyKey = myStore.cssAttrParse(cssPropty);
          sudoObj[cssProptyKey] = cssProptyVal;
        });

        styleObj[elementSelector] = sudoObj;
      });

      var cssItems = Object.assign(blockCssY.items, styleObj);
      setAttributes({ blockCssY: { items: cssItems } });
    }

    function onPickCssLibraryLabel(args) {
      Object.entries(args).map((x) => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        label[sudoScource] = sudoScourceArgs;
      });

      var labelX = Object.assign({}, label);
      setAttributes({ label: labelX });

      var styleObj = {};

      Object.entries(args).map((x) => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(
          sudoScource,
          labelSelector
        );

        var sudoObj = {};
        Object.entries(sudoScourceArgs).map((y) => {
          var cssPropty = y[0];
          var cssProptyVal = y[1];
          var cssProptyKey = myStore.cssAttrParse(cssPropty);
          sudoObj[cssProptyKey] = cssProptyVal;
        });

        styleObj[elementSelector] = sudoObj;
      });

      var cssItems = Object.assign(blockCssY.items, styleObj);
      setAttributes({ blockCssY: { items: cssItems } });
    }
    function onPickCssLibraryPrefix(args) {
      Object.entries(args).map((x) => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        prefix[sudoScource] = sudoScourceArgs;
      });

      var prefixX = Object.assign({}, prefix);
      setAttributes({ prefix: prefixX });

      var styleObj = {};

      Object.entries(args).map((x) => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(
          sudoScource,
          prefixSelector
        );

        var sudoObj = {};
        Object.entries(sudoScourceArgs).map((y) => {
          var cssPropty = y[0];
          var cssProptyVal = y[1];
          var cssProptyKey = myStore.cssAttrParse(cssPropty);
          sudoObj[cssProptyKey] = cssProptyVal;
        });

        styleObj[elementSelector] = sudoObj;
      });

      var cssItems = Object.assign(blockCssY.items, styleObj);
      setAttributes({ blockCssY: { items: cssItems } });
    }

    function onPickCssLibraryPostfix(args) {
      Object.entries(args).map((x) => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        postfix[sudoScource] = sudoScourceArgs;
      });

      var postfixX = Object.assign({}, postfix);
      setAttributes({ postfix: postfixX });

      var styleObj = {};

      Object.entries(args).map((x) => {
        var sudoScource = x[0];
        var sudoScourceArgs = x[1];
        var elementSelector = myStore.getElementSelector(
          sudoScource,
          postfixSelector
        );

        var sudoObj = {};
        Object.entries(sudoScourceArgs).map((y) => {
          var cssPropty = y[0];
          var cssProptyVal = y[1];
          var cssProptyKey = myStore.cssAttrParse(cssPropty);
          sudoObj[cssProptyKey] = cssProptyVal;
        });

        styleObj[elementSelector] = sudoObj;
      });

      var cssItems = Object.assign(blockCssY.items, styleObj);
      setAttributes({ blockCssY: { items: cssItems } });
    }

    function onChangeStyleWrapper(sudoScource, newVal, attr) {
      var path = [sudoScource, attr, breakPointX];
      let obj = Object.assign({}, wrapper);
      const object = myStore.updatePropertyDeep(obj, path, newVal);

      setAttributes({ wrapper: object });

      var elementSelector = myStore.getElementSelector(
        sudoScource,
        wrapperSelector
      );
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX];
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

      setAttributes({ blockCssY: { items: cssItems } });
    }

    function onRemoveStyleWrapper(sudoScource, key) {
      var object = myStore.deletePropertyDeep(wrapper, [
        sudoScource,
        key,
        breakPointX,
      ]);
      setAttributes({ wrapper: object });

      var elementSelector = myStore.getElementSelector(
        sudoScource,
        wrapperSelector
      );
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
        elementSelector,
        cssPropty,
        breakPointX,
      ]);
      setAttributes({ blockCssY: { items: cssObject } });
    }

    function onAddStyleWrapper(sudoScource, key) {
      var path = [sudoScource, key, breakPointX];
      let obj = Object.assign({}, wrapper);
      const object = myStore.addPropertyDeep(obj, path, "");
      setAttributes({ wrapper: object });
    }

    // Css edit

    function onChangeStyleSecondCountdown(sudoScource, newVal, attr) {
      var path = [sudoScource, attr, breakPointX];
      let obj = Object.assign({}, second);
      const object = myStore.updatePropertyDeep(obj, path, newVal);

      setAttributes({ second: object });

      var elementSelector = myStore.getElementSelector(
        sudoScource,
        secondSelector
      );
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX];
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

      setAttributes({ blockCssY: { items: cssItems } });
    }

    function onRemoveStyleSecondCountdown(sudoScource, key) {
      var object = myStore.deletePropertyDeep(second, [
        sudoScource,
        key,
        breakPointX,
      ]);
      setAttributes({ second: object });

      var elementSelector = myStore.getElementSelector(
        sudoScource,
        secondSelector
      );
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
        elementSelector,
        cssPropty,
        breakPointX,
      ]);
      setAttributes({ blockCssY: { items: cssObject } });
    }

    function onAddStyleSecondCountdown(sudoScource, key) {
      var path = [sudoScource, key, breakPointX];
      let obj = Object.assign({}, second);
      const object = myStore.addPropertyDeep(obj, path, "");
      setAttributes({ second: object });
    }

    function onChangeStyleMinuteCountdown(sudoScource, newVal, attr) {
      var path = [sudoScource, attr, breakPointX];
      let obj = Object.assign({}, minute);
      const object = myStore.updatePropertyDeep(obj, path, newVal);

      setAttributes({ minute: object });

      var elementSelector = myStore.getElementSelector(
        sudoScource,
        minuteSelector
      );
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX];
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

      setAttributes({ blockCssY: { items: cssItems } });
    }

    function onRemoveStyleMinuteCountdown(sudoScource, key) {
      var object = myStore.deletePropertyDeep(minute, [
        sudoScource,
        key,
        breakPointX,
      ]);
      setAttributes({ minute: object });

      var elementSelector = myStore.getElementSelector(
        sudoScource,
        minuteSelector
      );
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
        elementSelector,
        cssPropty,
        breakPointX,
      ]);
      setAttributes({ blockCssY: { items: cssObject } });
    }

    function onAddStyleMinuteCountdown(sudoScource, key) {
      var path = [sudoScource, key, breakPointX];
      let obj = Object.assign({}, minute);
      const object = myStore.addPropertyDeep(obj, path, "");
      setAttributes({ minute: object });
    }

    function onChangeStyleHourCountdown(sudoScource, newVal, attr) {
      var path = [sudoScource, attr, breakPointX];
      let obj = Object.assign({}, hour);
      const object = myStore.updatePropertyDeep(obj, path, newVal);

      setAttributes({ hour: object });

      var elementSelector = myStore.getElementSelector(
        sudoScource,
        hourSelector
      );
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX];
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

      setAttributes({ blockCssY: { items: cssItems } });
    }

    function onRemoveStyleHourCountdown(sudoScource, key) {
      var object = myStore.deletePropertyDeep(hour, [
        sudoScource,
        key,
        breakPointX,
      ]);
      setAttributes({ hour: object });

      var elementSelector = myStore.getElementSelector(
        sudoScource,
        hourSelector
      );
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
        elementSelector,
        cssPropty,
        breakPointX,
      ]);
      setAttributes({ blockCssY: { items: cssObject } });
    }

    function onAddStyleHourCountdown(sudoScource, key) {
      var path = [sudoScource, key, breakPointX];
      let obj = Object.assign({}, hour);
      const object = myStore.addPropertyDeep(obj, path, "");
      setAttributes({ hour: object });
    }

    function onChangeStyleDayCountdown(sudoScource, newVal, attr) {
      var path = [sudoScource, attr, breakPointX];
      let obj = Object.assign({}, day);
      const object = myStore.updatePropertyDeep(obj, path, newVal);

      setAttributes({ day: object });

      var elementSelector = myStore.getElementSelector(
        sudoScource,
        daySelector
      );
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX];
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

      setAttributes({ blockCssY: { items: cssItems } });
    }

    function onRemoveStyleDayCountdown(sudoScource, key) {
      var object = myStore.deletePropertyDeep(day, [
        sudoScource,
        key,
        breakPointX,
      ]);
      setAttributes({ day: object });

      var elementSelector = myStore.getElementSelector(
        sudoScource,
        daySelector
      );
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
        elementSelector,
        cssPropty,
        breakPointX,
      ]);
      setAttributes({ blockCssY: { items: cssObject } });
    }

    function onAddStyleDayCountdown(sudoScource, key) {
      var path = [sudoScource, key, breakPointX];
      let obj = Object.assign({}, day);
      const object = myStore.addPropertyDeep(obj, path, "");
      setAttributes({ day: object });
    }

    // Css edit

    function onChangeStyleCommentCount(sudoScource, newVal, attr) {
      var path = [sudoScource, attr, breakPointX];
      let obj = Object.assign({}, numberCount);
      const object = myStore.updatePropertyDeep(obj, path, newVal);

      setAttributes({ numberCount: object });

      var elementSelector = myStore.getElementSelector(
        sudoScource,
        commentCountSelector
      );
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX];
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

      setAttributes({ blockCssY: { items: cssItems } });
    }

    function onRemoveStyleCommentCount(sudoScource, key) {
      var object = myStore.deletePropertyDeep(numberCount, [
        sudoScource,
        key,
        breakPointX,
      ]);
      setAttributes({ frontText: object });

      var elementSelector = myStore.getElementSelector(
        sudoScource,
        commentCountSelector
      );
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
        elementSelector,
        cssPropty,
        breakPointX,
      ]);
      setAttributes({ blockCssY: { items: cssObject } });
    }

    function onAddStyleCommentCount(sudoScource, key) {
      var path = [sudoScource, key, breakPointX];
      let obj = Object.assign({}, numberCount);
      const object = myStore.addPropertyDeep(obj, path, "");
      setAttributes({ numberCount: object });
    }

    function onChangeStyleIcon(sudoScource, newVal, attr) {
      var path = [sudoScource, attr, breakPointX];
      let obj = Object.assign({}, icon);
      const object = myStore.updatePropertyDeep(obj, path, newVal);

      setAttributes({ icon: object });

      var elementSelector = myStore.getElementSelector(
        sudoScource,
        iconSelector
      );
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX];
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

      setAttributes({ blockCssY: { items: cssItems } });
    }

    function onRemoveStyleIcon(sudoScource, key) {
      var object = myStore.deletePropertyDeep(icon, [
        sudoScource,
        key,
        breakPointX,
      ]);
      setAttributes({ icon: object });

      var elementSelector = myStore.getElementSelector(
        sudoScource,
        iconSelector
      );
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
        elementSelector,
        cssPropty,
        breakPointX,
      ]);
      setAttributes({ blockCssY: { items: cssObject } });
    }

    function onAddStyleIcon(sudoScource, key) {
      var path = [sudoScource, key, breakPointX];
      let obj = Object.assign({}, icon);
      const object = myStore.addPropertyDeep(obj, path, "");
      setAttributes({ icon: object });
    }

    function onChangeStyleLabel(sudoScource, newVal, attr) {
      var path = [sudoScource, attr, breakPointX];
      let obj = Object.assign({}, label);
      const object = myStore.updatePropertyDeep(obj, path, newVal);

      setAttributes({ label: object });

      var elementSelector = myStore.getElementSelector(
        sudoScource,
        labelSelector
      );
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX];
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

      setAttributes({ blockCssY: { items: cssItems } });
    }

    function onRemoveStyleLabel(sudoScource, key) {
      var object = myStore.deletePropertyDeep(label, [
        sudoScource,
        key,
        breakPointX,
      ]);
      setAttributes({ label: object });

      var elementSelector = myStore.getElementSelector(
        sudoScource,
        labelSelector
      );
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
        elementSelector,
        cssPropty,
        breakPointX,
      ]);
      setAttributes({ blockCssY: { items: cssObject } });
    }

    function onAddStyleLabel(sudoScource, key) {
      var path = [sudoScource, key, breakPointX];
      let obj = Object.assign({}, label);
      const object = myStore.addPropertyDeep(obj, path, "");
      setAttributes({ label: object });
    }
    function onChangeStylePrefix(sudoScource, newVal, attr) {
      var path = [sudoScource, attr, breakPointX];
      let obj = Object.assign({}, prefix);
      const object = myStore.updatePropertyDeep(obj, path, newVal);

      setAttributes({ prefix: object });

      var elementSelector = myStore.getElementSelector(
        sudoScource,
        prefixSelector
      );
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX];
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

      setAttributes({ blockCssY: { items: cssItems } });
    }

    function onRemoveStylePrefix(sudoScource, key) {
      var object = myStore.deletePropertyDeep(prefix, [
        sudoScource,
        key,
        breakPointX,
      ]);
      setAttributes({ prefix: object });

      var elementSelector = myStore.getElementSelector(
        sudoScource,
        prefixSelector
      );
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
        elementSelector,
        cssPropty,
        breakPointX,
      ]);
      setAttributes({ blockCssY: { items: cssObject } });
    }

    function onAddStylePrefix(sudoScource, key) {
      var path = [sudoScource, key, breakPointX];
      let obj = Object.assign({}, prefix);
      const object = myStore.addPropertyDeep(obj, path, "");
      setAttributes({ prefix: object });
    }

    function onChangeStylePostfix(sudoScource, newVal, attr) {
      var path = [sudoScource, attr, breakPointX];
      let obj = Object.assign({}, postfix);
      const object = myStore.updatePropertyDeep(obj, path, newVal);

      setAttributes({ postfix: object });

      var elementSelector = myStore.getElementSelector(
        sudoScource,
        postfixSelector
      );
      var cssPropty = myStore.cssAttrParse(attr);

      let itemsX = Object.assign({}, blockCssY.items);

      if (itemsX[elementSelector] == undefined) {
        itemsX[elementSelector] = {};
      }

      var cssPath = [elementSelector, cssPropty, breakPointX];
      const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

      setAttributes({ blockCssY: { items: cssItems } });
    }

    function onRemoveStylePostfix(sudoScource, key) {
      var object = myStore.deletePropertyDeep(postfix, [
        sudoScource,
        key,
        breakPointX,
      ]);
      setAttributes({ postfix: object });

      var elementSelector = myStore.getElementSelector(
        sudoScource,
        postfixSelector
      );
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
        elementSelector,
        cssPropty,
        breakPointX,
      ]);
      setAttributes({ blockCssY: { items: cssObject } });
    }

    function onAddStylePostfix(sudoScource, key) {
      var path = [sudoScource, key, breakPointX];
      let obj = Object.assign({}, postfix);
      const object = myStore.addPropertyDeep(obj, path, "");
      setAttributes({ postfix: object });
    }

    String.prototype.strtr = function (dic) {
      const str = this.toString(),
        makeToken = (inx) => `{{###~${inx}~###}}`,
        tokens = Object.keys(dic).map((key, inx) => ({
          key,
          val: dic[key],
          token: makeToken(inx),
        })),
        tokenizedStr = tokens.reduce(
          (carry, entry) =>
            carry.replace(new RegExp(entry.key, "g"), entry.token),
          str
        );

      return tokens.reduce(
        (carry, entry) =>
          carry.replace(new RegExp(entry.token, "g"), entry.val),
        tokenizedStr
      );
    };

    const [iconHtml, setIconHtml] = useState("");

    useEffect(() => {
      var iconSrc = icon.options.iconSrc;

      var iconHtml = `<span class="${iconSrc}"></span>`;

      setIconHtml(iconHtml);
    }, [icon]);

    useEffect(() => {
      setAttributes({ blockId: blockIdX });

      // setAttributes({ numberCount: numberCount });
      // setAttributes({ wrapper: wrapper });

      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [clientId]);

    // var breakPointList = [{ label: 'Select..', icon: '', value: '' }];

    // for (var x in breakPoints) {

    //   var item = breakPoints[x];
    //   breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    // }

    var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.

    useEffect(() => {
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [blockCssY]);

    useEffect(() => {
      setAttributes({ customCss: customCss });

      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [customCss]);

    useEffect(() => {}, [numberCount]);

    const CustomTag = `${wrapper.options.tag}`;
    const CustomTagPostTitle = `${numberCount.options.tag}`;

    const blockProps = useBlockProps({
      className: ` ${blockId} pg-date-countdown`,
    });

    return (
      <>
        <InspectorControls>
          <div className="px-3">
            <PanelBody title="Wrapper" initialOpen={false}>
              <PGtabs
                activeTab="options"
                orientation="horizontal"
                activeClass="active-tab"
                onSelect={(tabName) => {}}
                tabs={[
                  {
                    name: "options",
                    title: "Options",
                    icon: settings,
                    className: "tab-settings",
                  },
                  {
                    name: "styles",
                    title: "Styles",
                    icon: styles,
                    className: "tab-style",
                  },
                  {
                    name: "css",
                    title: "CSS Library",
                    icon: styles,
                    className: "tab-css",
                  },
                ]}
              >
                <PGtab name="options">
                  <PanelRow>
                    <label for="">Wrapper Tag</label>
                    <SelectControl
                      label=""
                      value={wrapper.options.tag}
                      options={[
                        { label: "Choose", value: "" },
                        { label: "H1", value: "h1" },
                        { label: "H2", value: "h2" },
                        { label: "H3", value: "h3" },
                        { label: "H4", value: "h4" },
                        { label: "H5", value: "h5" },
                        { label: "H6", value: "h6" },
                        { label: "SPAN", value: "span" },
                        { label: "DIV", value: "div" },
                        { label: "P", value: "p" },
                      ]}
                      onChange={(newVal) => {
                        var options = { ...wrapper.options, tag: newVal };
                        setAttributes({
                          wrapper: { ...wrapper, options: options },
                        });
                      }}
                    />
                  </PanelRow>
                </PGtab>
                <PGtab name="styles">
                  <PGStyles
                    obj={wrapper}
                    onChange={onChangeStyleWrapper}
                    onAdd={onAddStyleWrapper}
                    onRemove={onRemoveStyleWrapper}
                  />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary
                    blockId={blockId}
                    obj={wrapper}
                    onChange={onPickCssLibraryWrapper}
                  />
                </PGtab>
              </PGtabs>
            </PanelBody>

            <PanelBody title="Setting" initialOpen={false}>
              <PGtabs
                activeTab="options"
                orientation="horizontal"
                activeClass="active-tab"
                onSelect={(tabName) => {}}
                tabs={[
                  {
                    name: "options",
                    title: "Options",
                    icon: settings,
                    className: "tab-settings",
                  },
                  {
                    name: "styles",
                    title: "Styles",
                    icon: styles,
                    className: "tab-style",
                  },
                  {
                    name: "css",
                    title: "CSS Library",
                    icon: styles,
                    className: "tab-css",
                  },
                ]}
              >
                <PGtab name="options">
                  <PanelRow className="block mb-4">
                    <label for="" className="font-bold mb-2 ">
                      Start Date?
                    </label>
                    <br />
                    <InputControl
                      type="datetime-local"
                      className="b-2"
                      value={setting.options.startDate}
                      onChange={(newVal) => {
                        var options = { ...setting.options, startDate: newVal };
                        setAttributes({
                          setting: { ...setting, options: options },
                        });
                      }}
                    />
                    {/* <DateTimePicker
                      
                      onChange={(newVal) => {
                        var options = { ...setting.options, startDate: newVal };
                        setAttributes({
                          setting: { ...setting, options: options },
                        });
                      }}
                      is12Hour={true}
                    />
                    {setting.options.startDate} */}
                  </PanelRow>
                  <PanelRow className="block mb-2">
                    <label for="" className="font-bold mb-2 ">
                      End Date?
                    </label>
                    <InputControl
                      type="datetime-local"
                      className="mr-2"
                      value={setting.options.endDate}
                      onChange={(newVal) => {
                        var options = { ...setting.options, endDate: newVal };
                        setAttributes({
                          setting: { ...setting, options: options },
                        });
                      }}
                    />
                    {/* <DateTimePicker
                      
                      onChange={(newVal) => {
                        var options = { ...setting.options, endDate: newVal };
                        setAttributes({
                          setting: { ...setting, options: options },
                        });
                      }}
                      is12Hour={true}
                    /> */}
                  </PanelRow>

                  {/* <PanelRow>
                    <label for="">Start?</label>
                    <InputControl
                      type="number"
                      className="mr-2"
                      value={numberCount.options.start}
                      onChange={(newVal) => {
                        var options = { ...numberCount.options, start: newVal };
                        setAttributes({
                          numberCount: { ...numberCount, options: options },
                        });
                      }}
                    />
                  </PanelRow>

                  <PanelRow>
                    <label for="">End?</label>
                    <InputControl
                      type="number"
                      className="mr-2"
                      value={numberCount.options.end}
                      onChange={(newVal) => {
                        var options = { ...numberCount.options, end: newVal };
                        setAttributes({
                          numberCount: { ...numberCount, options: options },
                        });
                      }}
                    />
                  </PanelRow>

                  <PanelRow>
                    <label for="">Duration?</label>
                    <InputControl
                      type="number"
                      className="mr-2"
                      value={numberCount.options.duration}
                      onChange={(newVal) => {
                        var options = {
                          ...numberCount.options,
                          duration: newVal,
                        };
                        setAttributes({
                          numberCount: { ...numberCount, options: options },
                        });
                      }}
                    />
                  </PanelRow>

                  <ToggleControl
                    label="onScroll?"
                    help={
                      numberCount.options.onScroll
                        ? "Play on scroll"
                        : "Play on page load"
                    }
                    checked={numberCount.options.onScroll ? true : false}
                    onChange={(e) => {
                      var options = {
                        ...numberCount.options,
                        onScroll: numberCount.options.onScroll ? false : true,
                      };
                      setAttributes({
                        numberCount: { ...numberCount, options: options },
                      });
                    }}
                  /> */}
                </PGtab>
                <PGtab name="styles">
                  <PGStyles
                    obj={numberCount}
                    onChange={onChangeStyleCommentCount}
                    onAdd={onAddStyleCommentCount}
                    onRemove={onRemoveStyleCommentCount}
                  />
                </PGtab>

                <PGtab name="css">
                  <PGCssLibrary
                    blockId={blockId}
                    obj={numberCount}
                    onChange={onPickCssLibraryCommentCount}
                  />
                </PGtab>
              </PGtabs>
            </PanelBody>

            <PanelBody title="Second Count" initialOpen={false}>
              <PGtabs
                activeTab="options"
                orientation="horizontal"
                activeClass="active-tab"
                onSelect={(tabName) => {}}
                tabs={[
                  {
                    name: "options",
                    title: "Options",
                    icon: settings,
                    className: "tab-settings",
                  },
                  {
                    name: "styles",
                    title: "Styles",
                    icon: styles,
                    className: "tab-style",
                  },
                  {
                    name: "css",
                    title: "CSS Library",
                    icon: styles,
                    className: "tab-css",
                  },
                ]}
              >
                <PGtab name="options">
                  <PanelRow>
                    <label for="">Label: </label>
                    <InputControl
                      value={second.options.label}
                      onChange={(newVal) => {
                        var options = { ...second.options, label: newVal };
                        setAttributes({
                          second: { styles: second.styles, options: options },
                        });
                      }}
                    />
                  </PanelRow>
                  <PanelRow>
                    <label for="">Prefix: </label>
                    <InputControl
                      value={second.options.prefix}
                      onChange={(newVal) => {
                        var options = { ...second.options, prefix: newVal };
                        setAttributes({
                          second: { styles: second.styles, options: options },
                        });
                      }}
                    />
                  </PanelRow>
                  <PanelRow>
                    <label for="">Postfix: </label>
                    <InputControl
                      value={second.options.postfix}
                      onChange={(newVal) => {
                        var options = { ...second.options, postfix: newVal };
                        setAttributes({
                          second: { styles: second.styles, options: options },
                        });
                      }}
                    />
                  </PanelRow>
                </PGtab>
                <PGtab name="styles">
                  <PGStyles
                    obj={second}
                    onChange={onChangeStyleSecondCountdown}
                    onAdd={onAddStyleSecondCountdown}
                    onRemove={onRemoveStyleSecondCountdown}
                  />
                </PGtab>

                <PGtab name="css">
                  <PGCssLibrary
                    blockId={blockId}
                    obj={second}
                    onChange={onPickCssLibrarySecondCountdown}
                  />
                </PGtab>
              </PGtabs>
            </PanelBody>
            <PanelBody title="Minute Count" initialOpen={false}>
              <PGtabs
                activeTab="options"
                orientation="horizontal"
                activeClass="active-tab"
                onSelect={(tabName) => {}}
                tabs={[
                  {
                    name: "options",
                    title: "Options",
                    icon: settings,
                    className: "tab-settings",
                  },
                  {
                    name: "styles",
                    title: "Styles",
                    icon: styles,
                    className: "tab-style",
                  },
                  {
                    name: "css",
                    title: "CSS Library",
                    icon: styles,
                    className: "tab-css",
                  },
                ]}
              >
                <PGtab name="options">
                  <PanelRow>
                    <label for="">Label: </label>
                    <InputControl
                      value={minute.options.label}
                      onChange={(newVal) => {
                        var options = { ...minute.options, label: newVal };
                        setAttributes({
                          minute: { styles: minute.styles, options: options },
                        });
                      }}
                    />
                  </PanelRow>
                  <PanelRow>
                    <label for="">Prefix: </label>
                    <InputControl
                      value={minute.options.prefix}
                      onChange={(newVal) => {
                        var options = { ...minute.options, prefix: newVal };
                        setAttributes({
                          minute: { styles: minute.styles, options: options },
                        });
                      }}
                    />
                  </PanelRow>
                  <PanelRow>
                    <label for="">Postfix: </label>
                    <InputControl
                      value={minute.options.postfix}
                      onChange={(newVal) => {
                        var options = { ...minute.options, postfix: newVal };
                        setAttributes({
                          minute: { styles: minute.styles, options: options },
                        });
                      }}
                    />
                  </PanelRow>
                </PGtab>
                <PGtab name="styles">
                  <PGStyles
                    obj={minute}
                    onChange={onChangeStyleMinuteCountdown}
                    onAdd={onAddStyleMinuteCountdown}
                    onRemove={onRemoveStyleMinuteCountdown}
                  />
                </PGtab>

                <PGtab name="css">
                  <PGCssLibrary
                    blockId={blockId}
                    obj={minute}
                    onChange={onPickCssLibraryMinuteCountdown}
                  />
                </PGtab>
              </PGtabs>
            </PanelBody>
            <PanelBody title="Hour Count" initialOpen={false}>
              <PGtabs
                activeTab="options"
                orientation="horizontal"
                activeClass="active-tab"
                onSelect={(tabName) => {}}
                tabs={[
                  {
                    name: "options",
                    title: "Options",
                    icon: settings,
                    className: "tab-settings",
                  },
                  {
                    name: "styles",
                    title: "Styles",
                    icon: styles,
                    className: "tab-style",
                  },
                  {
                    name: "css",
                    title: "CSS Library",
                    icon: styles,
                    className: "tab-css",
                  },
                ]}
              >
                <PGtab name="options">
                  <PanelRow>
                    <label for="">Label: </label>
                    <InputControl
                      value={hour.options.label}
                      onChange={(newVal) => {
                        var options = { ...hour.options, label: newVal };
                        setAttributes({
                          hour: { styles: hour.styles, options: options },
                        });
                      }}
                    />
                  </PanelRow>
                  <PanelRow>
                    <label for="">Prefix: </label>
                    <InputControl
                      value={hour.options.prefix}
                      onChange={(newVal) => {
                        var options = { ...hour.options, prefix: newVal };
                        setAttributes({
                          hour: { styles: hour.styles, options: options },
                        });
                      }}
                    />
                  </PanelRow>
                  <PanelRow>
                    <label for="">Postfix: </label>
                    <InputControl
                      value={hour.options.postfix}
                      onChange={(newVal) => {
                        var options = { ...hour.options, postfix: newVal };
                        setAttributes({
                          hour: { styles: hour.styles, options: options },
                        });
                      }}
                    />
                  </PanelRow>
                </PGtab>
                <PGtab name="styles">
                  <PGStyles
                    obj={hour}
                    onChange={onChangeStyleHourCountdown}
                    onAdd={onAddStyleHourCountdown}
                    onRemove={onRemoveStyleHourCountdown}
                  />
                </PGtab>

                <PGtab name="css">
                  <PGCssLibrary
                    blockId={blockId}
                    obj={hour}
                    onChange={onPickCssLibraryHourCountdown}
                  />
                </PGtab>
              </PGtabs>
            </PanelBody>
            <PanelBody title="Day Count" initialOpen={false}>
              <PGtabs
                activeTab="options"
                orientation="horizontal"
                activeClass="active-tab"
                onSelect={(tabName) => {}}
                tabs={[
                  {
                    name: "options",
                    title: "Options",
                    icon: settings,
                    className: "tab-settings",
                  },
                  {
                    name: "styles",
                    title: "Styles",
                    icon: styles,
                    className: "tab-style",
                  },
                  {
                    name: "css",
                    title: "CSS Library",
                    icon: styles,
                    className: "tab-css",
                  },
                ]}
              >
                <PGtab name="options">
                  <PanelRow>
                    <label for="">Label: </label>
                    <InputControl
                      value={day.options.label}
                      onChange={(newVal) => {
                        var options = { ...day.options, label: newVal };
                        setAttributes({
                          day: { styles: day.styles, options: options },
                        });
                      }}
                    />
                  </PanelRow>
                  <PanelRow>
                    <label for="">Prefix: </label>
                    <InputControl
                      value={day.options.prefix}
                      onChange={(newVal) => {
                        var options = { ...day.options, prefix: newVal };
                        setAttributes({
                          day: { styles: day.styles, options: options },
                        });
                      }}
                    />
                  </PanelRow>
                  <PanelRow>
                    <label for="">Postfix: </label>
                    <InputControl
                      value={day.options.postfix}
                      onChange={(newVal) => {
                        var options = { ...day.options, postfix: newVal };
                        setAttributes({
                          day: { styles: day.styles, options: options },
                        });
                      }}
                    />
                  </PanelRow>
                </PGtab>
                <PGtab name="styles">
                  <PGStyles
                    obj={day}
                    onChange={onChangeStyleDayCountdown}
                    onAdd={onAddStyleDayCountdown}
                    onRemove={onRemoveStyleDayCountdown}
                  />
                </PGtab>

                <PGtab name="css">
                  <PGCssLibrary
                    blockId={blockId}
                    obj={day}
                    onChange={onPickCssLibraryDayCountdown}
                  />
                </PGtab>
              </PGtabs>
            </PanelBody>

            <PanelBody title="Number Count" initialOpen={false}>
              <PGtabs
                activeTab="options"
                orientation="horizontal"
                activeClass="active-tab"
                onSelect={(tabName) => {}}
                tabs={[
                  {
                    name: "options",
                    title: "Options",
                    icon: settings,
                    className: "tab-settings",
                  },
                  {
                    name: "styles",
                    title: "Styles",
                    icon: styles,
                    className: "tab-style",
                  },
                  {
                    name: "css",
                    title: "CSS Library",
                    icon: styles,
                    className: "tab-css",
                  },
                ]}
              >
                <PGtab name="options">
                  <PanelRow>
                    <label for="">Start?</label>
                    <InputControl
                      type="number"
                      className="mr-2"
                      value={numberCount.options.start}
                      onChange={(newVal) => {
                        var options = { ...numberCount.options, start: newVal };
                        setAttributes({
                          numberCount: { ...numberCount, options: options },
                        });
                      }}
                    />
                  </PanelRow>

                  <PanelRow>
                    <label for="">End?</label>
                    <InputControl
                      type="number"
                      className="mr-2"
                      value={numberCount.options.end}
                      onChange={(newVal) => {
                        var options = { ...numberCount.options, end: newVal };
                        setAttributes({
                          numberCount: { ...numberCount, options: options },
                        });
                      }}
                    />
                  </PanelRow>

                  <PanelRow>
                    <label for="">Duration?</label>
                    <InputControl
                      type="number"
                      className="mr-2"
                      value={numberCount.options.duration}
                      onChange={(newVal) => {
                        var options = {
                          ...numberCount.options,
                          duration: newVal,
                        };
                        setAttributes({
                          numberCount: { ...numberCount, options: options },
                        });
                      }}
                    />
                  </PanelRow>

                  <ToggleControl
                    label="onScroll?"
                    help={
                      numberCount.options.onScroll
                        ? "Play on scroll"
                        : "Play on page load"
                    }
                    checked={numberCount.options.onScroll ? true : false}
                    onChange={(e) => {
                      var options = {
                        ...numberCount.options,
                        onScroll: numberCount.options.onScroll ? false : true,
                      };
                      setAttributes({
                        numberCount: { ...numberCount, options: options },
                      });
                    }}
                  />
                </PGtab>
                <PGtab name="styles">
                  <PGStyles
                    obj={numberCount}
                    onChange={onChangeStyleCommentCount}
                    onAdd={onAddStyleCommentCount}
                    onRemove={onRemoveStyleCommentCount}
                  />
                </PGtab>

                <PGtab name="css">
                  <PGCssLibrary
                    blockId={blockId}
                    obj={numberCount}
                    onChange={onPickCssLibraryCommentCount}
                  />
                </PGtab>
              </PGtabs>
            </PanelBody>

            <PanelBody title="Icon" initialOpen={false}>
              <PGtabs
                activeTab="options"
                orientation="horizontal"
                activeClass="active-tab"
                onSelect={(tabName) => {}}
                tabs={[
                  {
                    name: "options",
                    title: "Options",
                    icon: settings,
                    className: "tab-settings",
                  },
                  {
                    name: "styles",
                    title: "Styles",
                    icon: styles,
                    className: "tab-style",
                  },
                  {
                    name: "css",
                    title: "CSS Library",
                    icon: styles,
                    className: "tab-css",
                  },
                ]}
              >
                <PGtab name="options">
                  <PanelRow>
                    <label for="">Choose Icon</label>

                    <PGIconPicker
                      library={icon.options.library}
                      srcType={icon.options.srcType}
                      iconSrc={icon.options.iconSrc}
                      onChange={onChangeIcon}
                    />
                  </PanelRow>

                  <PanelRow>
                    <label for="">Icon position</label>

                    <SelectControl
                      label=""
                      value={icon.options.position}
                      options={[
                        { label: "Choose Position", value: "" },
                        { label: "Before Prefix", value: "beforePrefix" },
                        { label: "After Prefix", value: "afterPrefix" },
                        { label: "Before Postfix", value: "beforePostfix" },
                        { label: "After Postfix", value: "afterPostfix" },
                      ]}
                      onChange={(newVal) => {
                        var options = { ...icon.options, position: newVal };
                        setAttributes({ icon: { ...icon, options: options } });
                      }}
                    />
                  </PanelRow>
                </PGtab>
                <PGtab name="styles">
                  <PGStyles
                    obj={icon}
                    onChange={onChangeStyleIcon}
                    onAdd={onAddStyleIcon}
                    onRemove={onRemoveStyleIcon}
                  />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary
                    blockId={blockId}
                    obj={icon}
                    onChange={onPickCssLibraryIcon}
                  />
                </PGtab>
              </PGtabs>
            </PanelBody>

            <PanelBody title="Label" initialOpen={false}>
              <PGtabs
                activeTab="options"
                orientation="horizontal"
                activeClass="active-tab"
                onSelect={(tabName) => {}}
                tabs={[
                  {
                    name: "options",
                    title: "Options",
                    icon: settings,
                    className: "tab-settings",
                  },
                  {
                    name: "styles",
                    title: "Styles",
                    icon: styles,
                    className: "tab-style",
                  },
                  {
                    name: "css",
                    title: "CSS Library",
                    icon: styles,
                    className: "tab-css",
                  },
                ]}
              >
                <PGtab name="options">
                  <PanelRow>
                    <label for="">Label</label>

                    <InputControl
                      value={label.options.text}
                      onChange={(newVal) => {
                        var options = { ...label.options, text: newVal };
                        setAttributes({
                          label: { styles: label.styles, options: options },
                        });

                        // setAttributes({ prefix: { text: newVal, class: prefix.options.class, color: prefix.color, backgroundColor: prefix.backgroundColor } })
                      }}
                    />
                  </PanelRow>
                </PGtab>
                <PGtab name="styles">
                  <PGStyles
                    obj={label}
                    onChange={onChangeStyleLabel}
                    onAdd={onAddStyleLabel}
                    onRemove={onRemoveStyleLabel}
                  />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary
                    blockId={blockId}
                    obj={label}
                    onChange={onPickCssLibraryLabel}
                  />
                </PGtab>
              </PGtabs>
            </PanelBody>

            <PanelBody title="Prefix" initialOpen={false}>
              <PGtabs
                activeTab="options"
                orientation="horizontal"
                activeClass="active-tab"
                onSelect={(tabName) => {}}
                tabs={[
                  {
                    name: "options",
                    title: "Options",
                    icon: settings,
                    className: "tab-settings",
                  },
                  {
                    name: "styles",
                    title: "Styles",
                    icon: styles,
                    className: "tab-style",
                  },
                  {
                    name: "css",
                    title: "CSS Library",
                    icon: styles,
                    className: "tab-css",
                  },
                ]}
              >
                <PGtab name="options">
                  <PanelRow>
                    <label for="">Prefix</label>

                    <InputControl
                      value={prefix.options.text}
                      onChange={(newVal) => {
                        var options = { ...prefix.options, text: newVal };
                        setAttributes({
                          prefix: { styles: prefix.styles, options: options },
                        });

                        // setAttributes({ prefix: { text: newVal, class: prefix.options.class, color: prefix.color, backgroundColor: prefix.backgroundColor } })
                      }}
                    />
                  </PanelRow>
                </PGtab>
                <PGtab name="styles">
                  <PGStyles
                    obj={prefix}
                    onChange={onChangeStylePrefix}
                    onAdd={onAddStylePrefix}
                    onRemove={onRemoveStylePrefix}
                  />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary
                    blockId={blockId}
                    obj={prefix}
                    onChange={onPickCssLibraryPrefix}
                  />
                </PGtab>
              </PGtabs>
            </PanelBody>

            <PanelBody title="Postfix" initialOpen={false}>
              <PGtabs
                activeTab="options"
                orientation="horizontal"
                activeClass="active-tab"
                onSelect={(tabName) => {}}
                tabs={[
                  {
                    name: "options",
                    title: "Options",
                    icon: settings,
                    className: "tab-settings",
                  },
                  {
                    name: "styles",
                    title: "Styles",
                    icon: styles,
                    className: "tab-style",
                  },
                  {
                    name: "css",
                    title: "CSS Library",
                    icon: styles,
                    className: "tab-css",
                  },
                ]}
              >
                <PGtab name="options">
                  <PanelRow>
                    <label for="">Postfix</label>

                    <InputControl
                      value={postfix.options.text}
                      onChange={(newVal) => {
                        var options = { ...postfix.options, text: newVal };
                        setAttributes({
                          postfix: { ...postfix, options: options },
                        });

                        // setAttributes({ postfix: { text: newVal, class: prefix.options.class, color: postfix.color, backgroundColor: postfix.backgroundColor } })
                      }}
                    />
                  </PanelRow>
                </PGtab>
                <PGtab name="styles">
                  <PGStyles
                    obj={postfix}
                    onChange={onChangeStylePostfix}
                    onAdd={onAddStylePostfix}
                    onRemove={onRemoveStylePostfix}
                  />
                </PGtab>
                <PGtab name="css">
                  <PGCssLibrary
                    blockId={blockId}
                    obj={postfix}
                    onChange={onPickCssLibraryPostfix}
                  />
                </PGtab>
              </PGtabs>
            </PanelBody>

            <PanelBody title="Custom Style" initialOpen={false}>
              <p>
                Please use following class selector to apply your custom CSS
              </p>
              <div className="my-3">
                <p className="font-bold">Title Wrapper</p>
                <p>
                  <code>
                    {wrapperSelector}
                    {"{/* your CSS here*/}"}
                  </code>
                </p>
              </div>

              <div className="my-3">
                <p className="font-bold">Title link</p>
                <p>
                  <code>
                    {commentCountSelector}
                    {"{/* your CSS here*/}"}{" "}
                  </code>
                </p>
              </div>

              <div className="my-3">
                <p className="font-bold">Prefix</p>
                <p>
                  <code>
                    {prefixSelector}
                    {"{/* your CSS here*/}"}{" "}
                  </code>
                </p>
              </div>

              <div className="my-3">
                <p className="font-bold">Postfix</p>
                <p>
                  <code>
                    {postfixSelector}
                    {"{/* your CSS here*/}"}{" "}
                  </code>
                </p>
              </div>

              <TextareaControl
                label="Custom CSS"
                help="Do not use 'style' tag"
                value={customCss}
                onChange={(value) => {
                  setAttributes({ customCss: value });
                }}
              />
            </PanelBody>

            <PGMailSubsctibe />
            <PGContactSupport
              utm={{
                utm_source: "BlockPostTitle",
                utm_campaign: "PostGridCombo",
                utm_content: "BlockOptions",
              }}
            />
          </div>
        </InspectorControls>

        <>
          {wrapper.options.tag && (
            <CustomTag {...blockProps}>
              {icon.options.position == "beforePrefix" && (
                <span
                  className={icon.options.class}
                  dangerouslySetInnerHTML={{ __html: iconHtml }}
                />
              )}
              {prefix.options.text && (
                <span className={prefix.options.class}>
                  {prefix.options.text}
                </span>
              )}
              {icon.options.position == "afterPrefix" && (
                <span
                  className={icon.options.class}
                  dangerouslySetInnerHTML={{ __html: iconHtml }}
                />
              )}
              {icon.options.position == "beforeCommentCount" && (
                <span
                  className={icon.options.class}
                  dangerouslySetInnerHTML={{ __html: iconHtml }}
                />
              )}
              <div>
                <span className={label.options.class}>{day.options.label}</span>
                <span className={day.options.class}>
                  <span className={prefix.options.class}>
                    {day.options.prefix}
                  </span>
                  {remindDay}
                  <span className={postfix.options.class}>
                    {day.options.postfix}
                  </span>
                </span>
              </div>
              <div>
                <span className={label.options.class}>
                  {hour.options.label}
                </span>
                <span className={hour.options.class}>
                  <span className={prefix.options.class}>
                    {hour.options.prefix}
                  </span>
                  {remindHour}
                  <span className={postfix.options.class}>
                    {hour.options.postfix}
                  </span>
                </span>
              </div>
              <div>
                <span className={label.options.class}>
                  {minute.options.label}
                </span>
                <span className={minute.options.class}>
                  <span className={prefix.options.class}>
                    {minute.options.prefix}
                  </span>
                  {remindMinute}
                  <span className={postfix.options.class}>
                    {minute.options.postfix}
                  </span>
                </span>
              </div>
              <div>
                <span className={label.options.class}>
                  {second.options.label}
                </span>
                <span className={second.options.class}>
                  <span className={prefix.options.class}>
                    {second.options.prefix}
                  </span>
                  {remindSecond}
                  <span className={postfix.options.class}>
                    {second.options.postfix}
                  </span>
                </span>
              </div>
              {/* <span className={numberCount.options.class}>
                {commentCountEdited}
              </span> */}
              {icon.options.position == "afterCommentCount" && (
                <span
                  className={icon.options.class}
                  dangerouslySetInnerHTML={{ __html: iconHtml }}
                />
              )}
              {icon.options.position == "beforePostfix" && (
                <span
                  className={icon.options.class}
                  dangerouslySetInnerHTML={{ __html: iconHtml }}
                />
              )}
              {postfix.options.text && (
                <span className={postfix.options.class}>
                  {postfix.options.text}
                </span>
              )}
              {icon.options.position == "afterPostfix" && (
                <span
                  className={icon.options.class}
                  dangerouslySetInnerHTML={{ __html: iconHtml }}
                />
              )}
            </CustomTag>
          )}
        </>
      </>
    );
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;
  },
});
