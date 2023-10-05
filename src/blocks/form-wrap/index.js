import { registerBlockType } from "@wordpress/blocks";
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
  Spinner,
  Tooltip,
  DateTimePicker,
  DatePicker,
} from "@wordpress/components";
import { __experimentalBoxControl as BoxControl } from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
import apiFetch from "@wordpress/api-fetch";
import {
  InnerBlocks,
  useBlockProps,
  useInnerBlocksProps,
  store as blockEditorStore,
} from "@wordpress/block-editor";
import { createBlocksFromInnerBlocksTemplate } from "@wordpress/blocks";
import { applyFilters } from "@wordpress/hooks";

import { Icon, styles, settings, link, linkOff, close } from "@wordpress/icons";
import { __experimentalBlockVariationPicker as BlockVariationPicker } from "@wordpress/block-editor";

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
import { __experimentalScrollable as Scrollable } from "@wordpress/components";

import IconToggle from "../../components/icon-toggle";
import Typography from "../../components/typography";
import PGMailSubsctibe from "../../components/mail-subscribe";
import PGContactSupport from "../../components/contact-support";
import BreakpointToggle from "../../components/breakpoint-toggle";
import colorsPresets from "../../colors-presets";
import variations from "./variations";
import PGDropdown from "../../components/dropdown";

import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import PGStyles from "../../components/styles";
import PGCssLibrary from "../../components/css-library";
import PGIconPicker from "../../components/icon-picker";

var myStore = wp.data.select("postgrid-shop");

registerBlockType("post-grid/form-wrap", {
  apiVersion: 2,
  title: "Form Wrap",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: "#fff",
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: "#fff",
    // Specifying an icon for the block
    src: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
        <rect
          fill="#8db1ff"
          x="4.28"
          y="1.77"
          width="27.45"
          height="6.34"
          rx="0.5"
        />
        <path
          fill="#1d4ed8"
          d="M31.15,8.68H4.85A1.14,1.14,0,0,1,3.7,7.53V2.34A1.15,1.15,0,0,1,4.85,1.19h26.3A1.15,1.15,0,0,1,32.3,2.34V7.53A1.14,1.14,0,0,1,31.15,8.68Zm0-1.16v0Zm0-5.18H4.85V7.53H31.14Z"
        />
        <rect
          fill="#8db1ff"
          x="4.28"
          y="14.73"
          width="27.45"
          height="7.06"
          rx="0.5"
        />
        <path
          fill="#1d4ed8"
          d="M31.15,22.38H4.85A1.15,1.15,0,0,1,3.7,21.22V15.31a1.15,1.15,0,0,1,1.15-1.16h26.3a1.15,1.15,0,0,1,1.15,1.16v5.91A1.15,1.15,0,0,1,31.15,22.38Zm0-1.16v0Zm0-5.91H4.85v5.91H31.14Z"
        />
        <rect
          fill="#1d4ed8"
          x="4.28"
          y="28.06"
          width="27.45"
          height="7.06"
          rx="0.5"
        />
        <path
          fill="#fff"
          d="M20.86,31.54a.26.26,0,0,0-.05-.12L19.1,29.71a.25.25,0,1,0-.35.35L20,31.35H14.17a.25.25,0,1,0,0,.49H20l-1.29,1.29a.24.24,0,0,0,0,.35.23.23,0,0,0,.17.07.26.26,0,0,0,.18-.07l1.71-1.71a.29.29,0,0,0,.07-.18h0S20.86,31.56,20.86,31.54Z"
        />
      </svg>
    ),
  },

  attributes: {
    wrapper: {
      type: "object",
      default: {
        options: {
          tag: "div",
          class: "",
        },

        styles: {},
      },
    },

    form: {
      type: "object",
      default: {
        options: {
          class: "",
          type: "contactForm",
        },
        styles: {},
      },
    },

    visible: {
      type: "object",
      default: {},
    },

    onSubmit: {
      type: "object",
      default: {},
    },

    onProcess: {
      type: "object",
      default: {},
    },

    afterSubmit: {
      type: "object",
      default: {},
    },

    blockId: {
      type: "string",
      default: "",
    },
    customCss: {
      type: "string",
      default: "",
    },
    blockCssY: {
      type: "object",
      default: { items: {} },
    },
  },
  usesContext: ["post-grid/popupId"],
  providesContext: {
    "post-grid/formId": "blockId",
  },
  supports: {
    align: ["wide", "full"],
  },
  category: "post-grid",

  edit: function (props) {
    var attributes = props.attributes;
    var setAttributes = props.setAttributes;
    var context = props.context;
    var clientId = props.clientId;

    var blockId = attributes.blockId;

    var blockIdX = attributes.blockId
      ? attributes.blockId
      : "pg" + clientId.split("-").pop();
    var blockClass = "." + blockIdX;

    var wrapper = attributes.wrapper;
    var form = attributes.form;

    var visible = attributes.visible;
    var onSubmit = attributes.onSubmit;
    var onProcess = attributes.onProcess;
    var afterSubmit = attributes.afterSubmit;

    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;

    //const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    var breakPointX = myStore.getBreakPoint();
    let isProFeature = applyFilters("isProFeature", true);

    var [userRoles, setuserRoles] = useState({});
    var [postTypes, setpostTypes] = useState({});
    var [postStatuses, setpostStatuses] = useState({});
    var [enableDatePicker, setenableDatePicker] = useState(false);

    var [fluentcrmLists, setfluentcrmLists] = useState(null);
    var [fluentcrmTags, setfluentcrmTags] = useState(null);

    // Wrapper CSS Class Selectors
    var wrapperSelector = blockClass;
    var formSelector = blockClass + " form";

    const { replaceInnerBlocks } = useDispatch(blockEditorStore);

    const hasInnerBlocks = useSelect(
      (select) => select(blockEditorStore).getBlocks(clientId).length > 0,
      [clientId]
    );

    //console.log(JSON.stringify(wp.data.select(blockEditorStore).getBlocks(clientId)));

    var visbleArgsBasic = {
      userLogged: {
        label: "User Logged",
        description: "Show when user logged-in(any user)",
        args: { id: "userLogged", value: "" },
      },
      userNotLogged: {
        label: "User Not Logged",
        description: "Show when user Not logged-in.",
        args: { id: "userNotLogged", value: "" },
      },
      userRoles: {
        label: "User Roles",
        description: "Show when user has specific roles.",
        args: { id: "userRoles", roles: [] },
      },

      isYears: {
        label: "is Years",
        description: "Show when specific Years",
        args: { id: "isYears", value: "", values: "", compare: "=" },
        isPro: true,
      },
      isMonths: {
        label: "is Months",
        description: "Show when specific months",
        args: { id: "isMonths", value: "", values: [], compare: "=" },
        isPro: true,
      },
      weekDays: {
        label: "is Week day",
        description: "Show when specific week days",
        args: { id: "weekDays", value: "", values: [], compare: "=" },
        isPro: true,
      },
      isHours: {
        label: "is Hours",
        description: "Show when specific hours",
        args: { id: "isHours", value: "", values: [], compare: "=" },
        isPro: true,
      },
      //isMinutes: { label: 'is Minutes', description: 'Show when specific Minutes', args: { id: 'isMinutes', value: '', values: [], compare: '=' }, isPro:true },
      isDate: {
        label: "is Date",
        description: "Show when specific date",
        args: { id: "isDate", value: "", values: [], compare: "=" },
        isPro: true,
      },

      // submitCount: { label: 'Submit Count', description: 'Visible under specific submit count', args: { id: 'submitCount', value: '' }, isPro:true },
    };

    let visbleArgs = applyFilters("pgFormvisbleArgs", visbleArgsBasic);

    var onSubmitArgs = {
      validation: {
        label: "Validation",
        description: "Validate form fields",
        args: { id: "validation", messages: [] },
      },
      submitConfirm: {
        label: "Submit Confirm",
        description: "confirm form submit",
        args: { id: "submitConfirm", messages: [] },
      },

      //sendMail: { label: 'Send Mail', description: 'Send Mail', args: { id: 'sendMail', mailTo: '', bcc: '', fromEmail: '', fromName: '', replyTo: "", replyToName: '', successMessage: '', failedMessage: '', } },

      // createUser: { label: 'Create User', description: 'Create User', args: { id: 'createUser', value: '' } },
      // loginUser: { label: 'Login User', description: 'Login User', args: { id: 'loginUser', value: '' } },

      // createPostTerm: { label: 'Create Post Term', description: 'Create Post Term', args: { id: 'createPostTerm', postId: '', postType: '', taxonomy: '', hierarchical: '', } },
      // updatePostMeta: { label: 'Create Post Thumbnail', description: 'Create Post Thumbnail', args: { id: 'updatePostMeta', postId: '', } },

      // updateOption: { label: 'Update Option', description: 'Update Option', args: { id: 'updateOption', value: '' } },
      // redirectToURL: { label: 'Update Option', description: 'Update Option', args: { id: 'updateOption', value: '' } },
      // redirectToPost: { label: 'Update Option', description: 'Update Option', args: { id: 'updateOption', value: '' } },
    };

    //let onSubmitArgs = applyFilters('post-grid/form-wrap/onSubmitArgs', onSubmitArgsBasic);

    var afterSubmitArgs = {
      showResponse: {
        label: "Show Response",
        description: "Show Response Message",
        args: { id: "showResponse", message: "" },
      },
      redirectToURL: {
        label: "Redirect To URL",
        description: "Redirect To URL",
        args: { id: "redirectToURL", value: "" },
      },
      refreshPage: {
        label: "Refresh Page",
        description: "Refresh Page",
        args: { id: "refreshPage", delay: "" },
      },

      //loggedOut: { label: 'Logged Out', description: 'Logged out current user', args: { id: 'loggedOut', message: '' } },
      //loggedIn: { label: 'Logged In', description: 'Logged in user', args: { id: 'loggedIn', message: '' } },
      loggedOut: {
        label: "Logged Out",
        description: "Logged out current user",
        args: { id: "loggedOut", redirect: "" },
      },

      hideForm: {
        label: "Hide Form",
        description: "Hide Form",
        args: { id: "hideForm", message: "" },
      },
      clearForm: {
        label: "Clear Form",
        description: "Clear Form",
        args: { id: "clearForm", message: "" },
      },
      hidePopup: {
        label: "Hide Popup",
        description: "Hide Popup",
        args: { id: "hidePopup", message: "" },
      },

      //delay: { label: 'Delay', description: 'Delay', args: { id: 'delay', delay: 1000 } },
    };

    var onProcessArgs = {
      // Contact Form
      sendMail: {
        label: "Send Mail",
        description: "Send Mail",
        args: { id: "sendMail", mailTo: "", bcc: "" },
      },
      emailBcc: {
        label: "Send BCC",
        description: "Send BCC",
        args: { id: "emailBcc", message: "" },
      },
      emailCopyUser: {
        label: "Email Copy User",
        description: "Email Copy User",
        args: { id: "emailCopyUser", message: "" },
      },
      autoReply: {
        label: "Auto Reply",
        description: "Auto Reply",
        args: { id: "autoReply", message: "" },
      },

      // Login Form
      loggedInUser: {
        label: "Logged in user",
        description: "Logged in user",
        args: { id: "loggedInUser", message: "" },
      },

      // Register Form
      registerUser: {
        label: "Register user",
        description: "Register user",
        args: { id: "registerUser", message: "" },
      },
      //registerUserMail: { label: 'Register user mail', description: 'Register user mail', args: { id: 'registerUserMail', mailTo: '', bcc: '', } },

      // Post Submit form
      postSubmit: {
        label: "Create Post",
        description: "Create Post",
        args: { id: "postSubmit", postType: "" },
      },
      commentSubmit: {
        label: "Comment Submit",
        description: "Comment Submit",
        args: { id: "commentSubmit", loginRequired: false },
      },
      termSubmit: {
        label: "Term Submit",
        description: "Term Submit",
        args: { id: "termSubmit", postType: "" },
      },

      // For All type form
      createEntry: {
        label: "Create Entry",
        description: "Create Entry",
        args: { id: "createEntry", message: "" },
      },
      newsletterSubmit: {
        label: "Newsletter Submit",
        description: "Newsletter Submit",
        args: { id: "newsletterSubmit", message: "" },
      },

      // third-parties
      fluentcrmAddContact: {
        label: "Fluentcrm - Add Contact",
        description: "Add to Fluentcrm Contacts list",
        args: { id: "fluentcrmAddContact", lists: [], tags: [], message: "" },
      },
    };

    var formTypeArgs = {
      contactForm: {
        label: "Contact Form",
        description: "Contact Form",
        args: { id: "contactForm" },
      },
      loginForm: {
        label: "Login Form",
        description: "Login Form",
        args: { id: "loginForm" },
      },
      registerForm: {
        label: "Register Form",
        description: "Register Form",
        args: { id: "registerForm" },
      },

      postSubmitForm: {
        label: "Post Submit Form",
        description: "Post Submit Form",
        args: { id: "postSubmitForm" },
      },
      // postUpdateForm: { label: 'Post Update Form', description: 'Post Update Form', args: { id: 'postUpdateForm', } },
      termSubmitForm: {
        label: "Term Submit Form",
        description: "Term Submit Form",
        args: { id: "termSubmitForm" },
      },
      // termUpdateForm: { label: 'Term Update Form', description: 'Term Update Form', args: { id: 'termUpdateForm', } },
      // postMetaUpdate: { label: 'Post Meta Update', description: 'Post Meta Update', args: { id: 'postMetaUpdate', } },
      commentSubmit: {
        label: "Comment Submit Form",
        description: "Post Comment Submit Form",
        args: { id: "commentSubmit" },
      },
      // postCommentUpdateForm: { label: 'Post Comment Update Form', description: 'Post Comment Update Form', args: { id: 'postCommentUpdateForm', } },
      // fileUploadForm: { label: 'File Upload Form', description: 'File Upload Form', args: { id: 'fileUploadForm', } },
      //newsletterForm: { label: 'Newsletter Form', description: 'Newsletter Form', args: { id: 'newsletterForm', } },
      optInForm: {
        label: "Opt-In Form",
        description: "Opt-In Form",
        args: { id: "optInForm" },
      },

      postFilter: {
        label: "Post Filter",
        description: "Post Filter",
        args: { id: "postFilter" },
      },
      appointmentForm: {
        label: "Appointment Form",
        description: "Appointment Form",
        args: { id: "appointmentForm" },
      },
    };

    var monthsNum = {
      1: { label: "January", value: 1 },
      2: { label: "February", value: 2 },
      3: { label: "March", value: 3 },
      4: { label: "April", value: 4 },
      5: { label: "May", value: 5 },
      6: { label: "June", value: 6 },
      7: { label: "July", value: 7 },
      8: { label: "August", value: 8 },
      9: { label: "September", value: 9 },
      10: { label: "October", value: 10 },
      11: { label: "November", value: 11 },
      12: { label: "December", value: 12 },
    };

    var weekDayNumn = {
      0: { label: "Sunday", value: 0 },
      1: { label: "Monday", value: 1 },
      2: { label: "Tuesday", value: 2 },
      3: { label: "Wednesday", value: 3 },
      4: { label: "Thursday", value: 4 },
      5: { label: "Friday", value: 5 },
      6: { label: "Saturday", value: 6 },
    };

    var hoursNum = {
      0: { label: "12AM", value: 0 },
      1: { label: "1AM", value: 1 },
      2: { label: "2AM", value: 2 },
      3: { label: "3AM", value: 3 },
      4: { label: "4AM", value: 4 },
      5: { label: "5AM", value: 5 },
      6: { label: "6AM", value: 6 },
      7: { label: "7AM", value: 7 },
      8: { label: "8AM", value: 8 },
      9: { label: "9AM", value: 9 },
      10: { label: "10AM", value: 10 },
      11: { label: "11AM", value: 11 },
      12: { label: "12PM", value: 12 },
      13: { label: "1PM", value: 13 },
      14: { label: "2PM", value: 14 },
      15: { label: "3PM", value: 15 },
      16: { label: "4PM", value: 16 },
      17: { label: "5PM", value: 17 },
      18: { label: "6PM", value: 18 },
      19: { label: "7PM", value: 19 },
      20: { label: "8PM", value: 20 },
      21: { label: "9PM", value: 21 },
      22: { label: "10PM", value: 22 },
      23: { label: "11PM", value: 23 },
    };

    useEffect(() => {
      setAttributes({ blockId: blockIdX });

      myStore.generateBlockCss(blockCssY.items, blockId, customCss);

      apiFetch({
        path: "/post-grid/v2/user_roles_list",
        method: "POST",
        data: {},
      }).then((res) => {
        var roles = res.roles == undefined ? [] : res.roles;
        var rolesX = {};
        Object.entries(roles).map((role) => {
          var index = role[0];
          var val = role[1];
          rolesX[index] = { label: val, value: index };
        });
        setuserRoles(rolesX);
      });

      apiFetch({
        path: "/post-grid/v2/post_types",
        method: "POST",
        data: {},
      }).then((res) => {
        var types = [];
        Object.entries(res).map((x) => {
          var postTypeId = x[0];
          var postTypeLabel = x[1];
          types.push({ label: postTypeLabel, value: postTypeId });
        });

        setpostTypes(types);
      });

      apiFetch({
        path: "/post-grid/v2/get_post_statuses",
        method: "POST",
        data: {},
      }).then((res) => {
        var types = [];
        Object.entries(res).map((x) => {
          var postTypeId = x[0];
          var postTypeLabel = x[1];
          types.push({ label: postTypeLabel, value: postTypeId });
        });

        setpostStatuses(types);
      });

      apiFetch({
        path: "/post-grid/v2/fluentcrm_lists",
        method: "POST",
        data: {},
      }).then((res) => {
        var lists = {};
        Object.entries(res).map((x) => {
          var id = x[0];
          var listData = x[1];

          lists[listData.slug] = {
            label: listData.title,
            slug: listData.slug,
            id: id,
          };
        });

        console.log(lists);

        setfluentcrmLists(lists);
      });

      apiFetch({
        path: "/post-grid/v2/fluentcrm_tags",
        method: "POST",
        data: {},
      }).then((res) => {
        var tags = {};
        Object.entries(res).map((x) => {
          var id = x[0];
          var listData = x[1];

          tags[listData.slug] = {
            label: listData.title,
            slug: listData.slug,
            id: id,
          };
        });

        setfluentcrmTags(tags);
      });
    }, [clientId]);

    useEffect(() => {
      setAttributes({ customCss: customCss });

      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [customCss]);

    useEffect(() => {
      myStore.generateBlockCss(blockCssY.items, blockId, customCss);
    }, [blockCssY]);

    function onFormSubmit(ev) {
      console.log(ev);

      ev.preventDefault();

      return false;
    }

    var RemoveVisibleGroup = function ({ title, index }) {
      return (
        <>
          <span
            className="cursor-pointer inline-block hover:bg-red-500 hover:text-white px-1 py-1"
            onClick={(ev) => {
              var visibleX = { ...visible };
              delete visibleX[index];
              setAttributes({ visible: visibleX });
            }}
          >
            <Icon icon={close} />
          </span>
          <span>{title}</span>
        </>
      );
    };

    var RemoveVisibleArg = function ({ title, index, groupId }) {
      return (
        <>
          <span
            className="cursor-pointer inline-block hover:bg-red-500 hover:text-white px-1 py-1"
            onClick={(ev) => {
              var visibleX = { ...visible };
              visibleX[groupId].args.splice(index, 1);
              setAttributes({ visible: visibleX });
            }}
          >
            <Icon icon={close} />
          </span>
          <span>{title}</span>
        </>
      );
    };

    var RemoveOnSubmitArg = function ({ title, index }) {
      return (
        <>
          <span
            className="cursor-pointer inline-block hover:bg-red-500 hover:text-white px-1 py-1"
            onClick={(ev) => {
              var onSubmitX = { ...onSubmit };
              delete onSubmitX[index];
              setAttributes({ onSubmit: onSubmitX });
            }}
          >
            <Icon icon={close} />
          </span>
          <span>{title}</span>
        </>
      );
    };

    var RemoveonProcessArg = function ({ title, index }) {
      return (
        <>
          <span
            className="cursor-pointer inline-block hover:bg-red-500 hover:text-white px-1 py-1"
            onClick={(ev) => {
              var onProcessX = { ...onProcess };
              delete onProcessX[index];
              setAttributes({ onProcess: onProcessX });
            }}
          >
            <Icon icon={close} />
          </span>
          <span>{title}</span>
        </>
      );
    };

    var RemoveAfterSubmitArg = function ({ title, index }) {
      return (
        <>
          <span
            className="cursor-pointer inline-block hover:bg-red-500 hover:text-white px-1 py-1"
            onClick={(ev) => {
              var afterSubmitX = { ...afterSubmit };
              delete afterSubmitX[index];
              setAttributes({ afterSubmit: afterSubmitX });
            }}
          >
            <Icon icon={close} />
          </span>
          <span>{title}</span>
        </>
      );
    };

    // var breakPointList = [{ label: 'Select..', icon: '', value: '' }];

    // for (var x in breakPoints) {

    //   var item = breakPoints[x];
    //   breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    // }

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

    function onBulkAddWrapper(sudoScource, cssObj) {
      // var path = [sudoScource, attr, breakPointX]s
      let obj = Object.assign({}, wrapper);
      obj[sudoScource] = cssObj;

      setAttributes({ wrapper: obj });

      var selector = myStore.getElementSelector(sudoScource, wrapperSelector);
      var stylesObj = {};

      Object.entries(cssObj).map((args) => {
        var attr = args[0];
        var cssPropty = myStore.cssAttrParse(attr);

        if (stylesObj[selector] == undefined) {
          stylesObj[selector] = {};
        }

        if (stylesObj[selector][cssPropty] == undefined) {
          stylesObj[selector][cssPropty] = {};
        }

        stylesObj[selector][cssPropty] = args[1];
      });

      var cssItems = { ...blockCssY.items };
      var cssItemsX = { ...cssItems, ...stylesObj };

      setAttributes({ blockCssY: { items: cssItemsX } });
    }

    function onChangeStyleForm(sudoScource, newVal, attr) {
      var path = [sudoScource, attr, breakPointX];
      let obj = Object.assign({}, form);
      const object = myStore.updatePropertyDeep(obj, path, newVal);

      setAttributes({ form: object });

      var elementSelector = myStore.getElementSelector(
        sudoScource,
        formSelector
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

    function onRemoveStyleForm(sudoScource, key) {
      var object = myStore.deletePropertyDeep(form, [
        sudoScource,
        key,
        breakPointX,
      ]);
      setAttributes({ form: object });

      var elementSelector = myStore.getElementSelector(
        sudoScource,
        formSelector
      );
      var cssPropty = myStore.cssAttrParse(key);
      var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
        elementSelector,
        cssPropty,
        breakPointX,
      ]);
      setAttributes({ blockCssY: { items: cssObject } });
    }

    function onAddStyleForm(sudoScource, key) {
      var path = [sudoScource, key, breakPointX];
      let obj = Object.assign({}, form);
      const object = myStore.addPropertyDeep(obj, path, "");
      setAttributes({ form: object });
    }

    function onBulkAddForm(sudoScource, cssObj) {
      // var path = [sudoScource, attr, breakPointX]
      let obj = Object.assign({}, form);
      obj[sudoScource] = cssObj;

      setAttributes({ form: obj });

      var selector = myStore.getElementSelector(sudoScource, formSelector);
      var stylesObj = {};

      Object.entries(cssObj).map((args) => {
        var attr = args[0];
        var cssPropty = myStore.cssAttrParse(attr);

        if (stylesObj[selector] == undefined) {
          stylesObj[selector] = {};
        }

        if (stylesObj[selector][cssPropty] == undefined) {
          stylesObj[selector][cssPropty] = {};
        }

        stylesObj[selector][cssPropty] = args[1];
      });

      var cssItems = { ...blockCssY.items };
      var cssItemsX = { ...cssItems, ...stylesObj };

      setAttributes({ blockCssY: { items: cssItemsX } });
    }

    const ALLOWED_BLOCKS = [];

    const MY_TEMPLATE = [["form-field-input", {}]];

    const blockProps = useBlockProps({
      className: ` ${blockId} pg-form-wrap `,
    });

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
      //allowedBlocks: ALLOWED_BLOCKS,
      //template: MY_TEMPLATE,
      orientation: "horizontal",
      templateInsertUpdatesSelection: true,
      renderAppender: InnerBlocks.ButtonBlockAppender,
    });

    return (
      <>
        <InspectorControls>
          <div className="p-3">
            <PanelRow>
              <label for="">Choose Form Type</label>
              <PGDropdown
                position="bottom right"
                variant="secondary"
                buttonTitle={
                  formTypeArgs[
                    form.options == undefined ? form.type : form.options.type
                  ] == undefined
                    ? "Form Type"
                    : formTypeArgs[
                        form.options == undefined
                          ? form.type
                          : form.options.type
                      ].label
                }
                options={formTypeArgs}
                onChange={(option, index) => {
                  //setAttributes({ form: { ...form, type: index } });

                  var options = { ...form.options, type: index };
                  setAttributes({ form: { ...form, options: options } });

                  //console.log(wp.data.select(blockEditorStore).getBlocks(clientId));
                }}
                values=""
              ></PGDropdown>
            </PanelRow>
          </div>

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

                      console.log(wrapper);
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
                  onBulkAdd={onBulkAddWrapper}
                />
              </PGtab>
            </PGtabs>
          </PanelBody>

          <PanelBody title="Form Wrap" initialOpen={false}>
            <PGtabs
              activeTab="styles"
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
              ]}
            >
              <PGtab name="options"></PGtab>
              <PGtab name="styles">
                <PGStyles
                  obj={form}
                  onChange={onChangeStyleForm}
                  onAdd={onAddStyleForm}
                  onRemove={onRemoveStyleForm}
                  onBulkAdd={onBulkAddForm}
                />
              </PGtab>
            </PGtabs>
          </PanelBody>

          <PanelBody title="Visiblity" initialOpen={false}>
            <div
              className="bg-blue-500 p-2 px-4 text-white inline-block cursor-pointer rounded-sm"
              onClick={(ev) => {
                var visibleX = { ...visible };

                var index = Object.entries(visibleX).length;

                visibleX[index] = { logic: "OR", title: "", args: [] };

                setAttributes({ visible: visibleX });
              }}
            >
              Add Group
            </div>

            <div class="my-4">
              {Object.entries(visible).map((group, groupIndex) => {
                var groupId = group[0];
                var groupData = group[1];

                return (
                  <PanelBody
                    title={
                      <RemoveVisibleGroup title={groupIndex} index={groupId} />
                    }
                    initialOpen={false}
                  >
                    <PanelRow className="my-3">
                      {/* <label>Logic?</label>
                      <PGDropdown position="bottom right" variant="secondary" buttonTitle={(groupData['logic'] == undefined) ? 'Choose' : groupData['logic']} options={[
                        { label: 'OR', value: 'OR' },
                        { label: 'AND', value: 'AND' }
                      ]}
                        onChange={(option, index) => {
                          var visibleX = { ...visible, }
                          visibleX[groupId]['logic'] = option.value;
                          setAttributes({ visible: visibleX });
                        }} values=""></PGDropdown> */}

                      <PGDropdown
                        position="bottom right"
                        variant="secondary"
                        buttonTitle={"Add Condition"}
                        options={visbleArgs}
                        onChange={(option, index) => {
                          var visibleX = { ...visible };

                          visibleX[groupId]["args"].push(option.args);
                          setAttributes({ visible: visibleX });
                        }}
                        values=""
                      ></PGDropdown>
                    </PanelRow>

                    {visible[groupId]["args"] != undefined &&
                      visible[groupId]["args"].map((item, index) => {
                        var id = item.id;

                        //console.log(item);

                        return (
                          <>
                            <PanelBody
                              title={
                                <RemoveVisibleArg
                                  title={
                                    visbleArgs[id] == undefined
                                      ? id
                                      : visbleArgs[id].label
                                  }
                                  index={id}
                                  groupId={groupId}
                                />
                              }
                              initialOpen={false}
                            >
                              {id == "userLogged" && (
                                <div>
                                  No Option available for this condition.
                                </div>
                              )}

                              {id == "userNotLogged" && (
                                <div>
                                  No Option available for this condition.
                                </div>
                              )}

                              {id == "userRoles" && (
                                <div>
                                  <PGDropdown
                                    position="bottom right"
                                    variant="secondary"
                                    buttonTitle={"Add Role"}
                                    options={userRoles}
                                    onChange={(option, i) => {
                                      var visibleX = { ...visible };

                                      var roles = item.roles;
                                      roles.push(option.value);
                                      visibleX[groupId]["args"][index].roles =
                                        roles;
                                      setAttributes({ visible: visibleX });
                                    }}
                                    value={item.roles}
                                  ></PGDropdown>

                                  <div>
                                    {Object.entries(item.roles).map((x, k) => {
                                      var roleId = x[1];

                                      console.log(k);

                                      return (
                                        <PanelRow className="mb-4">
                                          <div>{roleId}</div>

                                          <span
                                            className="bg-red-500 p-1 cursor-pointer"
                                            onClick={(ev) => {
                                              var visibleX = { ...visible };

                                              //var roles = item.roles;
                                              //roles.push(option.value);
                                              visibleX[groupId]["args"][
                                                index
                                              ].roles.splice(k, 1);
                                              setAttributes({
                                                visible: visibleX,
                                              });
                                            }}
                                          >
                                            <Icon fill="#fff" icon={close} />
                                          </span>
                                        </PanelRow>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}

                              {id == "userCapabilities" && (
                                <div>
                                  No Option available for this condition.
                                </div>
                              )}

                              {(id == "isYears" || id == "isMinutes") && (
                                <>
                                  <PanelRow className="mb-4">
                                    <label for="">From</label>
                                    <InputControl
                                      className="mr-2"
                                      value={item.from}
                                      onChange={(newVal) => {
                                        var visibleX = { ...visible };
                                        visibleX[groupId]["args"][index][
                                          "from"
                                        ] = newVal;
                                        setAttributes({ visible: visibleX });
                                      }}
                                    />
                                  </PanelRow>

                                  {item.compare == "between" && (
                                    <>
                                      <p> Please use comma separate values </p>
                                      <code>Ex: 2022,2023</code>
                                    </>
                                  )}

                                  {item.compare == "exist" && (
                                    <>
                                      <p> Please use comma separate values </p>
                                      <code>Ex: 2022,2023,2025</code>
                                    </>
                                  )}

                                  <PanelRow>
                                    <label for="">Compare</label>
                                    <SelectControl
                                      label=""
                                      value={item.compare}
                                      options={[
                                        { label: "=", value: "=" },
                                        { label: "!=", value: "!=" },
                                        { label: ">", value: ">" },
                                        { label: "<", value: "<" },
                                        { label: ">=", value: ">=" },
                                        { label: "<=", value: "<=" },
                                        { label: "between", value: "between" },
                                        { label: "exist", value: "exist" },
                                      ]}
                                      onChange={(newVal) => {
                                        var visibleX = { ...visible };
                                        visibleX[groupId]["args"][index][
                                          "compare"
                                        ] = newVal;
                                        setAttributes({ visible: visibleX });
                                      }}
                                    />
                                  </PanelRow>
                                </>
                              )}

                              {id == "isMonths" && (
                                <>
                                  <PanelRow>
                                    <label for="">Compare</label>
                                    <SelectControl
                                      label=""
                                      value={item.compare}
                                      options={[
                                        { label: "=", value: "=" },
                                        { label: "!=", value: "!=" },
                                        { label: ">", value: ">" },
                                        { label: "<", value: "<" },
                                        { label: ">=", value: ">=" },
                                        { label: "<=", value: "<=" },
                                        { label: "between", value: "between" },
                                        { label: "exist", value: "exist" },
                                      ]}
                                      onChange={(newVal) => {
                                        var visibleX = { ...visible };
                                        visibleX[groupId]["args"][index][
                                          "compare"
                                        ] = newVal;
                                        setAttributes({ visible: visibleX });
                                      }}
                                    />
                                  </PanelRow>

                                  {(item.compare == "=" ||
                                    item.compare == "!=" ||
                                    item.compare == ">" ||
                                    item.compare == "<" ||
                                    item.compare == ">=" ||
                                    item.compare == "<=") && (
                                    <>
                                      <PanelRow className="mb-4">
                                        <label for="">Values</label>
                                        <PGDropdown
                                          position="bottom right"
                                          variant="secondary"
                                          buttonTitle={
                                            item.value.length == 0
                                              ? "Choose Month"
                                              : monthsNum[item.value].label
                                          }
                                          options={monthsNum}
                                          onChange={(option, optionIndex) => {
                                            var visibleX = { ...visible };
                                            visibleX[groupId]["args"][index][
                                              "value"
                                            ] = option.value;
                                            setAttributes({
                                              visible: visibleX,
                                            });
                                          }}
                                          value={item.value}
                                        ></PGDropdown>
                                      </PanelRow>
                                    </>
                                  )}

                                  {(item.compare == "between" ||
                                    item.compare == "exist") && (
                                    <>
                                      <PanelRow className="mb-4">
                                        <label for="">Values</label>
                                        <PGDropdown
                                          position="bottom right"
                                          variant="secondary"
                                          buttonTitle={"Choose Month"}
                                          options={monthsNum}
                                          onChange={(option, optionIndex) => {
                                            var visibleX = { ...visible };

                                            visibleX[groupId]["args"][index][
                                              "values"
                                            ].push(option.value);
                                            setAttributes({
                                              visible: visibleX,
                                            });
                                          }}
                                          value={item.values}
                                        ></PGDropdown>
                                      </PanelRow>

                                      <div>
                                        {item.values.map((x, i) => {
                                          return (
                                            <div className="flex justify-between my-1">
                                              <span>{monthsNum[x].label}</span>
                                              <span
                                                className="bg-red-500 text-white p-1 cursor-pointer hover:"
                                                onClick={(ev) => {
                                                  var visibleX = { ...visible };
                                                  item.values.splice(i, 1);

                                                  visibleX[groupId]["args"][
                                                    index
                                                  ]["values"] = item.values;
                                                  setAttributes({
                                                    visible: visibleX,
                                                  });
                                                }}
                                              >
                                                <Icon
                                                  fill="#fff"
                                                  icon={close}
                                                />
                                              </span>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </>
                                  )}
                                </>
                              )}

                              {id == "weekDays" && (
                                <>
                                  <PanelRow>
                                    <label for="">Compare</label>
                                    <SelectControl
                                      label=""
                                      value={item.compare}
                                      options={[
                                        { label: "=", value: "=" },
                                        { label: "!=", value: "!=" },
                                        { label: ">", value: ">" },
                                        { label: "<", value: "<" },
                                        { label: ">=", value: ">=" },
                                        { label: "<=", value: "<=" },
                                        { label: "between", value: "between" },
                                        { label: "exist", value: "exist" },
                                      ]}
                                      onChange={(newVal) => {
                                        var visibleX = { ...visible };
                                        visibleX[groupId]["args"][index][
                                          "compare"
                                        ] = newVal;
                                        setAttributes({ visible: visibleX });
                                      }}
                                    />
                                  </PanelRow>

                                  {(item.compare == "=" ||
                                    item.compare == "!=" ||
                                    item.compare == ">" ||
                                    item.compare == "<" ||
                                    item.compare == ">=" ||
                                    item.compare == "<=") && (
                                    <>
                                      <PanelRow className="mb-4">
                                        <label for="">Values</label>
                                        <PGDropdown
                                          position="bottom right"
                                          variant="secondary"
                                          buttonTitle={
                                            item.value.length == 0
                                              ? "Choose Day"
                                              : weekDayNumn[item.value].label
                                          }
                                          options={weekDayNumn}
                                          onChange={(option, optionIndex) => {
                                            var visibleX = { ...visible };
                                            visibleX[groupId]["args"][index][
                                              "value"
                                            ] = option.value;
                                            setAttributes({
                                              visible: visibleX,
                                            });
                                          }}
                                          value={item.value}
                                        ></PGDropdown>
                                      </PanelRow>
                                    </>
                                  )}

                                  {(item.compare == "between" ||
                                    item.compare == "exist") && (
                                    <>
                                      <PanelRow className="mb-4">
                                        <label for="">Values</label>
                                        <PGDropdown
                                          position="bottom right"
                                          variant="secondary"
                                          buttonTitle={"Choose Days"}
                                          options={weekDayNumn}
                                          onChange={(option, optionIndex) => {
                                            var visibleX = { ...visible };

                                            visibleX[groupId]["args"][index][
                                              "values"
                                            ].push(option.value);
                                            setAttributes({
                                              visible: visibleX,
                                            });
                                          }}
                                          value={item.values}
                                        ></PGDropdown>
                                      </PanelRow>

                                      <div>
                                        {item.values.map((x, i) => {
                                          return (
                                            <div className="flex justify-between my-1">
                                              <span>
                                                {weekDayNumn[x].label}
                                              </span>
                                              <span
                                                className="bg-red-500 text-white p-1 cursor-pointer hover:"
                                                onClick={(ev) => {
                                                  var visibleX = { ...visible };
                                                  item.values.splice(i, 1);

                                                  visibleX[groupId]["args"][
                                                    index
                                                  ]["values"] = item.values;
                                                  setAttributes({
                                                    visible: visibleX,
                                                  });
                                                }}
                                              >
                                                <Icon
                                                  fill="#fff"
                                                  icon={close}
                                                />
                                              </span>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </>
                                  )}
                                </>
                              )}

                              {id == "isHours" && (
                                <>
                                  <PanelRow>
                                    <label for="">Compare</label>
                                    <SelectControl
                                      label=""
                                      value={item.compare}
                                      options={[
                                        { label: "=", value: "=" },
                                        { label: "!=", value: "!=" },
                                        { label: ">", value: ">" },
                                        { label: "<", value: "<" },
                                        { label: ">=", value: ">=" },
                                        { label: "<=", value: "<=" },
                                        { label: "between", value: "between" },
                                        { label: "exist", value: "exist" },
                                      ]}
                                      onChange={(newVal) => {
                                        var visibleX = { ...visible };
                                        visibleX[groupId]["args"][index][
                                          "compare"
                                        ] = newVal;
                                        setAttributes({ visible: visibleX });
                                      }}
                                    />
                                  </PanelRow>

                                  {(item.compare == "=" ||
                                    item.compare == "!=" ||
                                    item.compare == ">" ||
                                    item.compare == "<" ||
                                    item.compare == ">=" ||
                                    item.compare == "<=") && (
                                    <>
                                      <PanelRow className="mb-4">
                                        <label for="">Values</label>
                                        <PGDropdown
                                          position="bottom right"
                                          variant="secondary"
                                          buttonTitle={
                                            item.value.length == 0
                                              ? "Choose Hours"
                                              : hoursNum[item.value].label
                                          }
                                          options={hoursNum}
                                          onChange={(option, optionIndex) => {
                                            var visibleX = { ...visible };
                                            visibleX[groupId]["args"][index][
                                              "value"
                                            ] = option.value;
                                            setAttributes({
                                              visible: visibleX,
                                            });
                                          }}
                                          value={item.value}
                                        ></PGDropdown>
                                      </PanelRow>
                                    </>
                                  )}

                                  {(item.compare == "between" ||
                                    item.compare == "exist") && (
                                    <>
                                      <PanelRow className="mb-4">
                                        <label for="">Values</label>
                                        <PGDropdown
                                          position="bottom right"
                                          variant="secondary"
                                          buttonTitle={"Choose Month"}
                                          options={hoursNum}
                                          onChange={(option, optionIndex) => {
                                            var visibleX = { ...visible };

                                            visibleX[groupId]["args"][index][
                                              "values"
                                            ].push(option.value);
                                            setAttributes({
                                              visible: visibleX,
                                            });
                                          }}
                                          value={item.values}
                                        ></PGDropdown>
                                      </PanelRow>

                                      <div>
                                        {item.values.map((x, i) => {
                                          return (
                                            <div className="flex justify-between my-1">
                                              <span>{hoursNum[x].label}</span>
                                              <span
                                                className="bg-red-500 text-white p-1 cursor-pointer hover:"
                                                onClick={(ev) => {
                                                  var visibleX = { ...visible };
                                                  item.values.splice(i, 1);

                                                  visibleX[groupId]["args"][
                                                    index
                                                  ]["values"] = item.values;
                                                  setAttributes({
                                                    visible: visibleX,
                                                  });
                                                }}
                                              >
                                                <Icon
                                                  fill="#fff"
                                                  icon={close}
                                                />
                                              </span>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </>
                                  )}
                                </>
                              )}

                              {id == "isDate" && (
                                <>
                                  <PanelRow>
                                    <label for="">Compare</label>
                                    <SelectControl
                                      label=""
                                      value={item.compare}
                                      options={[
                                        { label: "=", value: "=" },
                                        { label: "!=", value: "!=" },
                                        { label: ">", value: ">" },
                                        { label: "<", value: "<" },
                                        { label: ">=", value: ">=" },
                                        { label: "<=", value: "<=" },
                                        { label: "between", value: "between" },
                                        { label: "exist", value: "exist" },
                                      ]}
                                      onChange={(newVal) => {
                                        var visibleX = { ...visible };
                                        visibleX[groupId]["args"][index][
                                          "compare"
                                        ] = newVal;
                                        setAttributes({ visible: visibleX });
                                      }}
                                    />
                                  </PanelRow>

                                  {(item.compare == "=" ||
                                    item.compare == "!=" ||
                                    item.compare == ">" ||
                                    item.compare == "<" ||
                                    item.compare == ">=" ||
                                    item.compare == "<=") && (
                                    <>
                                      <PanelRow className="mb-4">
                                        <label for="">Values</label>

                                        <Button
                                          className={
                                            enableDatePicker
                                              ? "!bg-gray-400"
                                              : ""
                                          }
                                          onClick={(ev) => {
                                            setenableDatePicker(
                                              (prev) => !prev
                                            );
                                          }}
                                        >
                                          {item.value.length == 0
                                            ? "Choose Date"
                                            : item.value}
                                        </Button>
                                      </PanelRow>

                                      {enableDatePicker && (
                                        <Popover position="bottom left ">
                                          <div className="p-4">
                                            <DatePicker
                                              onChange={(newDate) => {
                                                console.log(newDate);

                                                const dateFull = new Date(
                                                  newDate
                                                );
                                                let day = dateFull.getDate();
                                                let month =
                                                  dateFull.getMonth() + 1;
                                                let year =
                                                  dateFull.getFullYear();

                                                var dateStr =
                                                  year +
                                                  "-" +
                                                  month +
                                                  "-" +
                                                  day;

                                                var visibleX = { ...visible };

                                                visibleX[groupId]["args"][
                                                  index
                                                ]["value"] = dateStr;
                                                setAttributes({
                                                  visible: visibleX,
                                                });
                                              }}
                                              is12Hour={true}
                                            />
                                          </div>
                                        </Popover>
                                      )}
                                    </>
                                  )}

                                  {(item.compare == "between" ||
                                    item.compare == "exist") && (
                                    <>
                                      <PanelRow className="mb-4">
                                        <label for="">Values</label>

                                        <Button
                                          className={
                                            enableDatePicker
                                              ? "!bg-gray-400"
                                              : ""
                                          }
                                          onClick={(ev) => {
                                            setenableDatePicker(
                                              (prev) => !prev
                                            );
                                          }}
                                        >
                                          Choose Date
                                        </Button>
                                      </PanelRow>

                                      {enableDatePicker && (
                                        <Popover position="bottom left ">
                                          <div className="p-4">
                                            <DatePicker
                                              onChange={(newDate) => {
                                                console.log(newDate);

                                                const dateFull = new Date(
                                                  newDate
                                                );
                                                let day = dateFull.getDate();
                                                let month =
                                                  dateFull.getMonth() + 1;
                                                let year =
                                                  dateFull.getFullYear();

                                                var dateStr =
                                                  year +
                                                  "-" +
                                                  month +
                                                  "-" +
                                                  day;
                                                console.log(dateStr);

                                                var visibleX = { ...visible };

                                                visibleX[groupId]["args"][
                                                  index
                                                ]["values"].push(dateStr);
                                                setAttributes({
                                                  visible: visibleX,
                                                });
                                              }}
                                              is12Hour={true}
                                            />
                                          </div>
                                        </Popover>
                                      )}

                                      <div>
                                        {item.values.map((x, i) => {
                                          return (
                                            <div className="flex justify-between my-1">
                                              <span>{x}</span>
                                              <span
                                                className="bg-red-500 text-white p-1 cursor-pointer hover:"
                                                onClick={(ev) => {
                                                  var visibleX = { ...visible };
                                                  item.values.splice(i, 1);

                                                  visibleX[groupId]["args"][
                                                    index
                                                  ]["values"] = item.values;
                                                  setAttributes({
                                                    visible: visibleX,
                                                  });
                                                }}
                                              >
                                                <Icon
                                                  fill="#fff"
                                                  icon={close}
                                                />
                                              </span>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </>
                                  )}
                                </>
                              )}

                              {id == "submitCount" && (
                                <div>
                                  No Option available for this condition.
                                </div>
                              )}
                            </PanelBody>
                          </>
                        );
                      })}
                  </PanelBody>
                );
              })}
            </div>
          </PanelBody>

          <PanelBody title="On Submit" initialOpen={false}>
            <PanelRow className="my-3">
              <PGDropdown
                position="bottom right"
                variant="secondary"
                buttonTitle={"Add Action"}
                options={onSubmitArgs}
                onChange={(option, index) => {
                  var onSubmitX = { ...onSubmit };
                  var index = Object.entries(onSubmitX).length;
                  onSubmitX[index] = option.args;

                  setAttributes({ onSubmit: onSubmitX });
                }}
                values=""
              ></PGDropdown>
            </PanelRow>
            <div class="my-4">
              {Object.entries(onSubmit).map((group) => {
                var groupIndex = group[0];
                var groupData = group[1];
                var id = groupData.id;

                return (
                  <PanelBody
                    title={
                      <RemoveOnSubmitArg
                        title={
                          onSubmitArgs[id] == undefined
                            ? id
                            : onSubmitArgs[id].label
                        }
                        index={groupIndex}
                      />
                    }
                    initialOpen={false}
                  >
                    <>
                      {id == "validation" && (
                        <div>No Option available for this condition.</div>
                      )}

                      {id == "submitConfirm" && (
                        <div>No Option available for this condition.</div>
                      )}
                    </>
                  </PanelBody>
                );
              })}
            </div>
          </PanelBody>

          <PanelBody title="On Process" initialOpen={false}>
            <PanelRow className="my-3">
              <PGDropdown
                position="bottom right"
                variant="secondary"
                buttonTitle={"Add Action"}
                options={onProcessArgs}
                onChange={(option, index) => {
                  var onProcessX = { ...onProcess };
                  var index = Object.entries(onProcessX).length;
                  onProcessX[index] = option.args;

                  setAttributes({ onProcess: onProcessX });
                }}
                values=""
              ></PGDropdown>
            </PanelRow>
            <div class="my-4">
              {Object.entries(onProcess).map((group) => {
                var groupIndex = group[0];
                var groupData = group[1];
                var id = groupData.id;

                return (
                  <PanelBody
                    title={
                      <RemoveonProcessArg
                        title={
                          onProcessArgs[id] == undefined
                            ? id
                            : onProcessArgs[id].label
                        }
                        index={groupIndex}
                      />
                    }
                    initialOpen={false}
                  >
                    <>
                      {id == "sendMail" && (
                        <>
                          <PanelRow className="mb-4">
                            <label for="">Subject</label>
                            <InputControl
                              className="mr-2"
                              value={groupData.subject}
                              onChange={(newVal) => {
                                var onProcessX = { ...onProcess };
                                onProcessX[groupIndex]["subject"] = newVal;

                                setAttributes({ onProcess: onProcessX });
                              }}
                            />
                          </PanelRow>

                          <PanelRow className="mb-4">
                            <label for="">Mail To</label>
                            <InputControl
                              className="mr-2"
                              value={groupData.mailTo}
                              onChange={(newVal) => {
                                var onProcessX = { ...onProcess };
                                onProcessX[groupIndex]["mailTo"] = newVal;

                                setAttributes({ onProcess: onProcessX });
                              }}
                            />
                          </PanelRow>

                          <PanelRow className="mb-4">
                            <label for="">BCC</label>
                            <InputControl
                              className="mr-2"
                              value={groupData.bcc}
                              onChange={(newVal) => {
                                var onProcessX = { ...onProcess };
                                onProcessX[groupIndex]["bcc"] = newVal;

                                setAttributes({ onProcess: onProcessX });
                              }}
                            />
                          </PanelRow>

                          <div className="mb-4">
                            <label for="">Email Footer</label>
                            <TextareaControl
                              value={groupData.footer}
                              onChange={(newVal) => {
                                var onProcessX = { ...onProcess };
                                onProcessX[groupIndex]["footer"] = newVal;

                                setAttributes({ onProcess: onProcessX });
                              }}
                            />
                          </div>

                          <ToggleControl
                            label="Show On Response?"
                            help={
                              groupData.showOnResponse ? "Enabled" : "Disabled."
                            }
                            checked={groupData.showOnResponse ? true : false}
                            onChange={(e) => {
                              var onProcessX = { ...onProcess };
                              onProcessX[groupIndex]["showOnResponse"] =
                                groupData.showOnResponse ? false : true;
                              setAttributes({ onProcess: onProcessX });
                            }}
                          />
                          {groupData.showOnResponse && (
                            <>
                              <label for="">Success Message</label>
                              <TextareaControl
                                value={groupData.successMessage}
                                onChange={(newVal) => {
                                  var onProcessX = { ...onProcess };
                                  onProcessX[groupIndex]["successMessage"] =
                                    newVal;

                                  setAttributes({ onProcess: onProcessX });
                                }}
                              />

                              <label for="">Error Message</label>
                              <TextareaControl
                                value={groupData.errorMessage}
                                onChange={(newVal) => {
                                  var onProcessX = { ...onProcess };
                                  onProcessX[groupIndex]["errorMessage"] =
                                    newVal;

                                  setAttributes({ onProcess: onProcessX });
                                }}
                              />
                            </>
                          )}
                        </>
                      )}

                      {id == "emailBcc" && (
                        <>
                          <PanelRow className="mb-4">
                            <label for="">Mail To</label>
                            <InputControl
                              className="mr-2"
                              value={groupData.mailTo}
                              onChange={(newVal) => {
                                var onProcessX = { ...onProcess };
                                onProcessX[groupIndex]["mailTo"] = newVal;

                                setAttributes({ onProcess: onProcessX });
                              }}
                            />
                          </PanelRow>

                          <PanelRow className="mb-4">
                            <label for="">Mail from</label>
                            <InputControl
                              className="mr-2"
                              value={groupData.fromEmail}
                              onChange={(newVal) => {
                                var onProcessX = { ...onProcess };
                                onProcessX[groupIndex]["fromEmail"] = newVal;

                                setAttributes({ onProcess: onProcessX });
                              }}
                            />
                          </PanelRow>
                          <PanelRow className="mb-4">
                            <label for="">Mail From Name</label>
                            <InputControl
                              className="mr-2"
                              value={groupData.fromName}
                              onChange={(newVal) => {
                                var onProcessX = { ...onProcess };
                                onProcessX[groupIndex]["fromName"] = newVal;

                                setAttributes({ onProcess: onProcessX });
                              }}
                            />
                          </PanelRow>
                          <PanelRow className="mb-4">
                            <label for="">Reply To Email</label>
                            <InputControl
                              className="mr-2"
                              value={groupData.replyTo}
                              onChange={(newVal) => {
                                var onProcessX = { ...onProcess };
                                onProcessX[groupIndex]["replyTo"] = newVal;

                                setAttributes({ onProcess: onProcessX });
                              }}
                            />
                          </PanelRow>
                          <PanelRow className="mb-4">
                            <label for="">Reply To Name</label>
                            <InputControl
                              className="mr-2"
                              value={groupData.replyToName}
                              onChange={(newVal) => {
                                var onProcessX = { ...onProcess };
                                onProcessX[groupIndex]["replyToName"] = newVal;

                                setAttributes({ onProcess: onProcessX });
                              }}
                            />
                          </PanelRow>
                          <div className="mb-4">
                            <label for="">Email Footer</label>
                            <TextareaControl
                              value={groupData.footer}
                              onChange={(newVal) => {
                                var onProcessX = { ...onProcess };
                                onProcessX[groupIndex]["footer"] = newVal;

                                setAttributes({ onProcess: onProcessX });
                              }}
                            />
                          </div>

                          <ToggleControl
                            label="Show On Response?"
                            help={
                              groupData.showOnResponse ? "Enabled" : "Disabled."
                            }
                            checked={groupData.showOnResponse ? true : false}
                            onChange={(e) => {
                              var onProcessX = { ...onProcess };
                              onProcessX[groupIndex]["showOnResponse"] =
                                groupData.showOnResponse ? false : true;
                              setAttributes({ onProcess: onProcessX });
                            }}
                          />
                          {groupData.showOnResponse && (
                            <>
                              <label for="">Success Message</label>
                              <TextareaControl
                                value={groupData.successMessage}
                                onChange={(newVal) => {
                                  var onProcessX = { ...onProcess };
                                  onProcessX[groupIndex]["successMessage"] =
                                    newVal;

                                  setAttributes({ onProcess: onProcessX });
                                }}
                              />

                              <label for="">Error Message</label>
                              <TextareaControl
                                value={groupData.errorMessage}
                                onChange={(newVal) => {
                                  var onProcessX = { ...onProcess };
                                  onProcessX[groupIndex]["errorMessage"] =
                                    newVal;

                                  setAttributes({ onProcess: onProcessX });
                                }}
                              />
                            </>
                          )}
                        </>
                      )}

                      {id == "emailCopyUser" && (
                        <>
                          <PanelRow className="mb-4">
                            <label for="">Mail from</label>
                            <InputControl
                              className="mr-2"
                              value={groupData.fromEmail}
                              onChange={(newVal) => {
                                var onProcessX = { ...onProcess };
                                onProcessX[groupIndex]["fromEmail"] = newVal;

                                setAttributes({ onProcess: onProcessX });
                              }}
                            />
                          </PanelRow>
                          <PanelRow className="mb-4">
                            <label for="">Mail From Name</label>
                            <InputControl
                              className="mr-2"
                              value={groupData.fromName}
                              onChange={(newVal) => {
                                var onProcessX = { ...onProcess };
                                onProcessX[groupIndex]["fromName"] = newVal;

                                setAttributes({ onProcess: onProcessX });
                              }}
                            />
                          </PanelRow>
                          <PanelRow className="mb-4">
                            <label for="">Reply To Email</label>
                            <InputControl
                              className="mr-2"
                              value={groupData.replyTo}
                              onChange={(newVal) => {
                                var onProcessX = { ...onProcess };
                                onProcessX[groupIndex]["replyTo"] = newVal;

                                setAttributes({ onProcess: onProcessX });
                              }}
                            />
                          </PanelRow>
                          <PanelRow className="mb-4">
                            <label for="">Reply To Name</label>
                            <InputControl
                              className="mr-2"
                              value={groupData.replyToName}
                              onChange={(newVal) => {
                                var onProcessX = { ...onProcess };
                                onProcessX[groupIndex]["replyToName"] = newVal;

                                setAttributes({ onProcess: onProcessX });
                              }}
                            />
                          </PanelRow>
                          <div className="mb-4">
                            <label for="">Email Footer</label>
                            <TextareaControl
                              value={groupData.footer}
                              onChange={(newVal) => {
                                var onProcessX = { ...onProcess };
                                onProcessX[groupIndex]["footer"] = newVal;

                                setAttributes({ onProcess: onProcessX });
                              }}
                            />
                          </div>

                          <ToggleControl
                            label="Show On Response?"
                            help={
                              groupData.showOnResponse ? "Enabled" : "Disabled."
                            }
                            checked={groupData.showOnResponse ? true : false}
                            onChange={(e) => {
                              var onProcessX = { ...onProcess };
                              onProcessX[groupIndex]["showOnResponse"] =
                                groupData.showOnResponse ? false : true;
                              setAttributes({ onProcess: onProcessX });
                            }}
                          />
                          {groupData.showOnResponse && (
                            <>
                              <label for="">Success Message</label>
                              <TextareaControl
                                value={groupData.successMessage}
                                onChange={(newVal) => {
                                  var onProcessX = { ...onProcess };
                                  onProcessX[groupIndex]["successMessage"] =
                                    newVal;

                                  setAttributes({ onProcess: onProcessX });
                                }}
                              />

                              <label for="">Error Message</label>
                              <TextareaControl
                                value={groupData.errorMessage}
                                onChange={(newVal) => {
                                  var onProcessX = { ...onProcess };
                                  onProcessX[groupIndex]["errorMessage"] =
                                    newVal;

                                  setAttributes({ onProcess: onProcessX });
                                }}
                              />
                            </>
                          )}
                        </>
                      )}

                      {id == "createEntry" && (
                        <>
                          <ToggleControl
                            label="Show On Response?"
                            help={
                              groupData.showOnResponse ? "Enabled" : "Disabled."
                            }
                            checked={groupData.showOnResponse ? true : false}
                            onChange={(e) => {
                              var onProcessX = { ...onProcess };
                              onProcessX[groupIndex]["showOnResponse"] =
                                groupData.showOnResponse ? false : true;
                              setAttributes({ onProcess: onProcessX });
                            }}
                          />
                          {groupData.showOnResponse && (
                            <>
                              <label for="">Success Message</label>
                              <TextareaControl
                                value={groupData.successMessage}
                                onChange={(newVal) => {
                                  var onProcessX = { ...onProcess };
                                  onProcessX[groupIndex]["successMessage"] =
                                    newVal;

                                  setAttributes({ onProcess: onProcessX });
                                }}
                              />

                              <label for="">Error Message</label>
                              <TextareaControl
                                value={groupData.errorMessage}
                                onChange={(newVal) => {
                                  var onProcessX = { ...onProcess };
                                  onProcessX[groupIndex]["errorMessage"] =
                                    newVal;

                                  setAttributes({ onProcess: onProcessX });
                                }}
                              />
                            </>
                          )}
                        </>
                      )}

                      {id == "autoReply" && (
                        <>
                          <PanelRow className="mb-4">
                            <label for="">Mail from</label>
                            <InputControl
                              className="mr-2"
                              value={groupData.fromEmail}
                              onChange={(newVal) => {
                                var onProcessX = { ...onProcess };
                                onProcessX[groupIndex]["fromEmail"] = newVal;

                                setAttributes({ onProcess: onProcessX });
                              }}
                            />
                          </PanelRow>
                          <PanelRow className="mb-4">
                            <label for="">Mail From Name</label>
                            <InputControl
                              className="mr-2"
                              value={groupData.fromName}
                              onChange={(newVal) => {
                                var onProcessX = { ...onProcess };
                                onProcessX[groupIndex]["fromName"] = newVal;

                                setAttributes({ onProcess: onProcessX });
                              }}
                            />
                          </PanelRow>
                          <PanelRow className="mb-4">
                            <label for="">Reply To Email</label>
                            <InputControl
                              className="mr-2"
                              value={groupData.replyTo}
                              onChange={(newVal) => {
                                var onProcessX = { ...onProcess };
                                onProcessX[groupIndex]["replyTo"] = newVal;

                                setAttributes({ onProcess: onProcessX });
                              }}
                            />
                          </PanelRow>
                          <PanelRow className="mb-4">
                            <label for="">Reply To Name</label>
                            <InputControl
                              className="mr-2"
                              value={groupData.replyToName}
                              onChange={(newVal) => {
                                var onProcessX = { ...onProcess };
                                onProcessX[groupIndex]["replyToName"] = newVal;

                                setAttributes({ onProcess: onProcessX });
                              }}
                            />
                          </PanelRow>

                          <PanelRow className="mb-4">
                            <label for="">Message</label>
                            <TextareaControl
                              value={groupData.message}
                              onChange={(newVal) => {
                                var onProcessX = { ...onProcess };
                                onProcessX[groupIndex]["message"] = newVal;

                                setAttributes({ onProcess: onProcessX });
                              }}
                            />
                          </PanelRow>

                          <div className="mb-4">
                            <label for="">Email Footer</label>
                            <TextareaControl
                              value={groupData.footer}
                              onChange={(newVal) => {
                                var onProcessX = { ...onProcess };
                                onProcessX[groupIndex]["footer"] = newVal;

                                setAttributes({ onProcess: onProcessX });
                              }}
                            />
                          </div>

                          <ToggleControl
                            label="Show On Response?"
                            help={
                              groupData.showOnResponse ? "Enabled" : "Disabled."
                            }
                            checked={groupData.showOnResponse ? true : false}
                            onChange={(e) => {
                              var onProcessX = { ...onProcess };
                              onProcessX[groupIndex]["showOnResponse"] =
                                groupData.showOnResponse ? false : true;
                              setAttributes({ onProcess: onProcessX });
                            }}
                          />

                          {groupData.showOnResponse && (
                            <>
                              <label for="">Success Message</label>
                              <TextareaControl
                                value={groupData.successMessage}
                                onChange={(newVal) => {
                                  var onProcessX = { ...onProcess };
                                  onProcessX[groupIndex]["successMessage"] =
                                    newVal;

                                  setAttributes({ onProcess: onProcessX });
                                }}
                              />

                              <label for="">Error Message</label>
                              <TextareaControl
                                value={groupData.errorMessage}
                                onChange={(newVal) => {
                                  var onProcessX = { ...onProcess };
                                  onProcessX[groupIndex]["errorMessage"] =
                                    newVal;

                                  setAttributes({ onProcess: onProcessX });
                                }}
                              />
                            </>
                          )}
                        </>
                      )}

                      {id == "loggedInUser" && (
                        <>
                          <ToggleControl
                            label="Show On Response?"
                            help={
                              groupData.showOnResponse ? "Enabled" : "Disabled."
                            }
                            checked={groupData.showOnResponse ? true : false}
                            onChange={(e) => {
                              var onProcessX = { ...onProcess };
                              onProcessX[groupIndex]["showOnResponse"] =
                                groupData.showOnResponse ? false : true;
                              setAttributes({ onProcess: onProcessX });
                            }}
                          />

                          {groupData.showOnResponse && (
                            <>
                              <label for="">Success Message</label>
                              <TextareaControl
                                value={groupData.successMessage}
                                onChange={(newVal) => {
                                  var onProcessX = { ...onProcess };
                                  onProcessX[groupIndex]["successMessage"] =
                                    newVal;

                                  setAttributes({ onProcess: onProcessX });
                                }}
                              />

                              <label for="">Error Message</label>
                              <TextareaControl
                                value={groupData.errorMessage}
                                onChange={(newVal) => {
                                  var onProcessX = { ...onProcess };
                                  onProcessX[groupIndex]["errorMessage"] =
                                    newVal;

                                  setAttributes({ onProcess: onProcessX });
                                }}
                              />
                            </>
                          )}
                        </>
                      )}

                      {id == "registerUser" && (
                        <>
                          <ToggleControl
                            label="Show On Response?"
                            help={
                              groupData.showOnResponse ? "Enabled" : "Disabled."
                            }
                            checked={groupData.showOnResponse ? true : false}
                            onChange={(e) => {
                              var onProcessX = { ...onProcess };
                              onProcessX[groupIndex]["showOnResponse"] =
                                groupData.showOnResponse ? false : true;
                              setAttributes({ onProcess: onProcessX });
                            }}
                          />

                          {groupData.showOnResponse && (
                            <>
                              <label for="">Success Message</label>
                              <TextareaControl
                                value={groupData.successMessage}
                                onChange={(newVal) => {
                                  var onProcessX = { ...onProcess };
                                  onProcessX[groupIndex]["successMessage"] =
                                    newVal;

                                  setAttributes({ onProcess: onProcessX });
                                }}
                              />

                              <label for="">Error Message</label>
                              <TextareaControl
                                value={groupData.errorMessage}
                                onChange={(newVal) => {
                                  var onProcessX = { ...onProcess };
                                  onProcessX[groupIndex]["errorMessage"] =
                                    newVal;

                                  setAttributes({ onProcess: onProcessX });
                                }}
                              />
                            </>
                          )}
                        </>
                      )}

                      {id == "postSubmit" && (
                        <>
                          <PanelRow>
                            <label for="">Post Type</label>
                            <SelectControl
                              label=""
                              value={groupData.postType}
                              options={postTypes}
                              onChange={(newVal) => {
                                var onProcessX = { ...onProcess };
                                onProcessX[groupIndex]["postType"] = newVal;
                                setAttributes({ onProcess: onProcessX });
                              }}
                            />
                          </PanelRow>

                          <PanelRow>
                            <label for="">Post Status</label>
                            <SelectControl
                              label=""
                              value={groupData.postStatus}
                              options={postStatuses}
                              onChange={(newVal) => {
                                var onProcessX = { ...onProcess };
                                onProcessX[groupIndex]["postStatus"] = newVal;
                                setAttributes({ onProcess: onProcessX });
                              }}
                            />
                          </PanelRow>

                          <PanelRow>
                            <label for="">Comment Status</label>
                            <SelectControl
                              label=""
                              value={groupData.commentStatus}
                              options={[
                                { label: "Open", value: "open" },
                                { label: "Closed", value: "closed" },
                              ]}
                              onChange={(newVal) => {
                                var onProcessX = { ...onProcess };
                                onProcessX[groupIndex]["commentStatus"] =
                                  newVal;
                                setAttributes({ onProcess: onProcessX });
                              }}
                            />
                          </PanelRow>

                          <PanelRow>
                            <label for="">Ping Status</label>
                            <SelectControl
                              label=""
                              value={groupData.pingStatus}
                              options={[
                                { label: "Open", value: "open" },
                                { label: "Closed", value: "closed" },
                              ]}
                              onChange={(newVal) => {
                                var onProcessX = { ...onProcess };
                                onProcessX[groupIndex]["pingStatus"] = newVal;
                                setAttributes({ onProcess: onProcessX });
                              }}
                            />
                          </PanelRow>

                          <ToggleControl
                            label="Create Author by Email?"
                            help={
                              groupData.authorByEmail ? "Enabled" : "Disabled."
                            }
                            checked={groupData.authorByEmail ? true : false}
                            onChange={(e) => {
                              var onProcessX = { ...onProcess };
                              onProcessX[groupIndex]["authorByEmail"] =
                                groupData.authorByEmail ? false : true;
                              setAttributes({ onProcess: onProcessX });
                            }}
                          />

                          <ToggleControl
                            label="Show On Response?"
                            help={
                              groupData.showOnResponse ? "Enabled" : "Disabled."
                            }
                            checked={groupData.showOnResponse ? true : false}
                            onChange={(e) => {
                              var onProcessX = { ...onProcess };
                              onProcessX[groupIndex]["showOnResponse"] =
                                groupData.showOnResponse ? false : true;
                              setAttributes({ onProcess: onProcessX });
                            }}
                          />
                          {groupData.showOnResponse && (
                            <>
                              <label for="">Success Message</label>
                              <TextareaControl
                                value={groupData.successMessage}
                                onChange={(newVal) => {
                                  var onProcessX = { ...onProcess };
                                  onProcessX[groupIndex]["successMessage"] =
                                    newVal;

                                  setAttributes({ onProcess: onProcessX });
                                }}
                              />

                              <label for="">Error Message</label>
                              <TextareaControl
                                value={groupData.errorMessage}
                                onChange={(newVal) => {
                                  var onProcessX = { ...onProcess };
                                  onProcessX[groupIndex]["errorMessage"] =
                                    newVal;

                                  setAttributes({ onProcess: onProcessX });
                                }}
                              />
                            </>
                          )}
                        </>
                      )}

                      {id == "commentSubmit" && (
                        <>
                          <PanelRow>
                            <label for="">Status</label>
                            <SelectControl
                              label=""
                              value={groupData.status}
                              options={[
                                { label: "Approve", value: "1" },
                                { label: "Hold", value: "0" },
                                { label: "Spam", value: "spam" },
                                { label: "Trash", value: "trash" },
                              ]}
                              onChange={(newVal) => {
                                var onProcessX = { ...onProcess };
                                onProcessX[groupIndex]["status"] = newVal;
                                setAttributes({ onProcess: onProcessX });
                              }}
                            />
                          </PanelRow>

                          <PanelRow>
                            <label for="">Type</label>
                            <InputControl
                              className="mr-2"
                              value={
                                groupData.type == undefined ||
                                groupData.type.length == 0
                                  ? "comment"
                                  : groupData.type
                              }
                              onChange={(newVal) => {
                                var onProcessX = { ...onProcess };
                                onProcessX[groupIndex]["type"] = newVal;

                                setAttributes({ onProcess: onProcessX });
                              }}
                            />
                          </PanelRow>

                          <ToggleControl
                            label="Login Required?"
                            help={
                              groupData.loginRequired ? "Enabled" : "Disabled."
                            }
                            checked={groupData.loginRequired ? true : false}
                            onChange={(e) => {
                              var onProcessX = { ...onProcess };
                              onProcessX[groupIndex]["loginRequired"] =
                                groupData.loginRequired ? false : true;
                              setAttributes({ onProcess: onProcessX });
                            }}
                          />

                          <ToggleControl
                            label="Show On Response?"
                            help={
                              groupData.showOnResponse ? "Enabled" : "Disabled."
                            }
                            checked={groupData.showOnResponse ? true : false}
                            onChange={(e) => {
                              var onProcessX = { ...onProcess };
                              onProcessX[groupIndex]["showOnResponse"] =
                                groupData.showOnResponse ? false : true;
                              setAttributes({ onProcess: onProcessX });
                            }}
                          />
                          {groupData.showOnResponse && (
                            <>
                              <label for="">Success Message</label>
                              <TextareaControl
                                value={groupData.successMessage}
                                onChange={(newVal) => {
                                  var onProcessX = { ...onProcess };
                                  onProcessX[groupIndex]["successMessage"] =
                                    newVal;

                                  setAttributes({ onProcess: onProcessX });
                                }}
                              />

                              <label for="">Error Message</label>
                              <TextareaControl
                                value={groupData.errorMessage}
                                onChange={(newVal) => {
                                  var onProcessX = { ...onProcess };
                                  onProcessX[groupIndex]["errorMessage"] =
                                    newVal;

                                  setAttributes({ onProcess: onProcessX });
                                }}
                              />
                            </>
                          )}
                        </>
                      )}
                      {id == "termSubmit" && (
                        <>
                          <PanelRow>
                            <label for="">Taxonomy</label>
                            <InputControl
                              className="mr-2"
                              value={groupData.taxonomy}
                              onChange={(newVal) => {
                                var onProcessX = { ...onProcess };
                                onProcessX[groupIndex]["taxonomy"] = newVal;

                                setAttributes({ onProcess: onProcessX });
                              }}
                            />
                          </PanelRow>

                          <ToggleControl
                            label="Show On Response?"
                            help={
                              groupData.showOnResponse ? "Enabled" : "Disabled."
                            }
                            checked={groupData.showOnResponse ? true : false}
                            onChange={(e) => {
                              var onProcessX = { ...onProcess };
                              onProcessX[groupIndex]["showOnResponse"] =
                                groupData.showOnResponse ? false : true;
                              setAttributes({ onProcess: onProcessX });
                            }}
                          />
                          {groupData.showOnResponse && (
                            <>
                              <label for="">Success Message</label>
                              <TextareaControl
                                value={groupData.successMessage}
                                onChange={(newVal) => {
                                  var onProcessX = { ...onProcess };
                                  onProcessX[groupIndex]["successMessage"] =
                                    newVal;

                                  setAttributes({ onProcess: onProcessX });
                                }}
                              />

                              <label for="">Error Message</label>
                              <TextareaControl
                                value={groupData.errorMessage}
                                onChange={(newVal) => {
                                  var onProcessX = { ...onProcess };
                                  onProcessX[groupIndex]["errorMessage"] =
                                    newVal;

                                  setAttributes({ onProcess: onProcessX });
                                }}
                              />
                            </>
                          )}
                        </>
                      )}

                      {id == "fluentcrmAddContact" && (
                        <>
                          <PanelRow>
                            <label for="">Fluent-CRM Lists</label>
                            <PGDropdown
                              position="bottom right"
                              variant="secondary"
                              buttonTitle={"Choose"}
                              options={fluentcrmLists}
                              onChange={(option, index) => {
                                var onProcessX = { ...onProcess };
                                onProcessX[groupIndex]["lists"].push({
                                  slug: option.slug,
                                  id: option.id,
                                });
                                setAttributes({ onProcess: onProcessX });
                              }}
                              values=""
                            ></PGDropdown>
                          </PanelRow>

                          {Object.entries(onProcess[groupIndex]["lists"]).map(
                            (x, i) => {
                              var listIndex = x[0];
                              var listData = x[1];
                              var slug = x[1].slug;
                              return (
                                <div className="border my-3 flex items-center">
                                  <span
                                    className="cursor-pointer inline-block hover:bg-red-500 hover:text-white px-1 py-1"
                                    onClick={(ev) => {
                                      var onProcessX = { ...onProcess };
                                      delete onProcessX[groupIndex][
                                        "lists"
                                      ].splice(i, 1);
                                      setAttributes({ onProcess: onProcessX });
                                    }}
                                  >
                                    <Icon icon={close} />
                                  </span>

                                  <span>
                                    {fluentcrmLists == null
                                      ? ""
                                      : fluentcrmLists[slug].label}
                                  </span>
                                </div>
                              );
                            }
                          )}

                          <PanelRow>
                            <label for="">Fluent-CRM Tags</label>
                            <PGDropdown
                              position="bottom right"
                              variant="secondary"
                              buttonTitle={"Choose"}
                              options={fluentcrmTags}
                              onChange={(option, index) => {
                                var onProcessX = { ...onProcess };
                                onProcessX[groupIndex]["tags"].push({
                                  slug: option.slug,
                                  id: option.id,
                                });
                                setAttributes({ onProcess: onProcessX });
                              }}
                              values=""
                            ></PGDropdown>
                          </PanelRow>

                          {Object.entries(onProcess[groupIndex]["tags"]).map(
                            (x, i) => {
                              var listIndex = x[0];
                              var listData = x[1];
                              var slug = x[1].slug;
                              return (
                                <div className="border my-3 flex items-center">
                                  <span
                                    className="cursor-pointer inline-block hover:bg-red-500 hover:text-white px-1 py-1"
                                    onClick={(ev) => {
                                      var onProcessX = { ...onProcess };
                                      delete onProcessX[groupIndex][
                                        "tags"
                                      ].splice(i, 1);
                                      setAttributes({ onProcess: onProcessX });
                                    }}
                                  >
                                    <Icon icon={close} />
                                  </span>

                                  <span>
                                    {fluentcrmTags == null
                                      ? ""
                                      : fluentcrmTags[slug].label}
                                  </span>
                                </div>
                              );
                            }
                          )}

                          <ToggleControl
                            label="Show On Response?"
                            help={
                              groupData.showOnResponse ? "Enabled" : "Disabled."
                            }
                            checked={groupData.showOnResponse ? true : false}
                            onChange={(e) => {
                              var onProcessX = { ...onProcess };
                              onProcessX[groupIndex]["showOnResponse"] =
                                groupData.showOnResponse ? false : true;
                              setAttributes({ onProcess: onProcessX });
                            }}
                          />
                          {groupData.showOnResponse && (
                            <>
                              <label for="">Success Message</label>
                              <TextareaControl
                                value={groupData.successMessage}
                                onChange={(newVal) => {
                                  var onProcessX = { ...onProcess };
                                  onProcessX[groupIndex]["successMessage"] =
                                    newVal;

                                  setAttributes({ onProcess: onProcessX });
                                }}
                              />

                              <label for="">Error Message</label>
                              <TextareaControl
                                value={groupData.errorMessage}
                                onChange={(newVal) => {
                                  var onProcessX = { ...onProcess };
                                  onProcessX[groupIndex]["errorMessage"] =
                                    newVal;

                                  setAttributes({ onProcess: onProcessX });
                                }}
                              />
                            </>
                          )}
                        </>
                      )}

                      {id == "newsletterSubmit" && (
                        <>
                          <ToggleControl
                            label="Show On Response?"
                            help={
                              groupData.showOnResponse ? "Enabled" : "Disabled."
                            }
                            checked={groupData.showOnResponse ? true : false}
                            onChange={(e) => {
                              var onProcessX = { ...onProcess };
                              onProcessX[groupIndex]["showOnResponse"] =
                                groupData.showOnResponse ? false : true;
                              setAttributes({ onProcess: onProcessX });
                            }}
                          />
                          {groupData.showOnResponse && (
                            <>
                              <label for="">Success Message</label>
                              <TextareaControl
                                value={groupData.successMessage}
                                onChange={(newVal) => {
                                  var onProcessX = { ...onProcess };
                                  onProcessX[groupIndex]["successMessage"] =
                                    newVal;

                                  setAttributes({ onProcess: onProcessX });
                                }}
                              />

                              <label for="">Error Message</label>
                              <TextareaControl
                                value={groupData.errorMessage}
                                onChange={(newVal) => {
                                  var onProcessX = { ...onProcess };
                                  onProcessX[groupIndex]["errorMessage"] =
                                    newVal;

                                  setAttributes({ onProcess: onProcessX });
                                }}
                              />
                            </>
                          )}
                        </>
                      )}
                    </>
                  </PanelBody>
                );
              })}
            </div>
          </PanelBody>

          <PanelBody title="After Submit" initialOpen={false}>
            <PanelRow className="my-3">
              <PGDropdown
                position="bottom right"
                variant="secondary"
                buttonTitle={"Add Action"}
                options={afterSubmitArgs}
                onChange={(option, index) => {
                  var afterSubmitX = { ...afterSubmit };
                  var index = Object.entries(afterSubmitX).length;
                  afterSubmitX[index] = option.args;

                  setAttributes({ afterSubmit: afterSubmitX });
                }}
                values=""
              ></PGDropdown>
            </PanelRow>
            <div class="my-4">
              {Object.entries(afterSubmit).map((group) => {
                var groupIndex = group[0];
                var groupData = group[1];
                var id = groupData.id;

                return (
                  <PanelBody
                    title={
                      <RemoveAfterSubmitArg
                        title={
                          afterSubmitArgs[id] == undefined
                            ? id
                            : afterSubmitArgs[id].label
                        }
                        index={groupIndex}
                      />
                    }
                    initialOpen={false}
                  >
                    <>
                      {id == "showResponse" && <>Show response messages.</>}

                      {id == "loggedOut" && (
                        <>
                          <div className="mb-4">Logged out current user</div>
                        </>
                      )}

                      {id == "redirectToURL" && (
                        <>
                          <div className="mb-4">
                            <label for="">Redirect URL</label>
                            <TextareaControl
                              value={groupData.url}
                              onChange={(newVal) => {
                                var afterSubmitX = { ...afterSubmit };
                                afterSubmitX[groupIndex]["url"] = newVal;
                                setAttributes({ afterSubmit: afterSubmitX });
                              }}
                            />
                          </div>
                        </>
                      )}

                      {id == "refreshPage" && (
                        <>
                          <div className="mb-4">
                            <label for="">Delay</label>

                            <InputControl
                              className="mr-2"
                              type="number"
                              value={groupData.delay}
                              onChange={(newVal) => {
                                var afterSubmitX = { ...afterSubmit };
                                afterSubmitX[groupIndex]["delay"] = newVal;

                                setAttributes({ afterSubmit: afterSubmitX });
                              }}
                            />
                          </div>
                        </>
                      )}

                      {id == "delay" && (
                        <>
                          <PanelRow className="mb-4">
                            <label for="">Delay</label>

                            <InputControl
                              className="mr-2"
                              type="number"
                              value={groupData.time}
                              onChange={(newVal) => {
                                var afterSubmitX = { ...afterSubmit };
                                afterSubmitX[groupIndex]["time"] = newVal;

                                setAttributes({ afterSubmit: afterSubmitX });
                              }}
                            />
                          </PanelRow>
                        </>
                      )}
                    </>
                  </PanelBody>
                );
              })}
            </div>
          </PanelBody>

          <PanelBody title="Custom Style" initialOpen={false}>
            <p className="">
              Please use following class selector to apply your custom CSS
            </p>

            <div className="my-3">
              <p className="font-bold">Text </p>
              <p>
                <code>
                  {wrapperSelector}
                  {"{}"}{" "}
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

          <div className="px-2">
            <PGMailSubsctibe />
            <PGContactSupport
              utm={{
                utm_source: "BlockText",
                utm_campaign: "PostGridCombo",
                utm_content: "BlockOptions",
              }}
            />
          </div>
        </InspectorControls>

        <>
          {!hasInnerBlocks && (
            <div {...innerBlocksProps}>
              <div className="border p-5">
                <div className="flex justify-between mb-5">
                  <div className="text-xl rounded-sm">
                    Click to pick a variation
                  </div>

                  <div
                    className="bg-orange-400  hover:bg-orange-300 px-4 py-1 text-white cursor-pointer"
                    onClick={(ev) => {
                      replaceInnerBlocks(
                        clientId,
                        createBlocksFromInnerBlocksTemplate([
                          ["post-grid/text", {}],
                        ]),
                        true
                      );
                    }}
                  >
                    Skip
                  </div>
                </div>

                <div className="">
                  {variations.map((variation) => {
                    return (
                      <div
                        className="text-center inline-block m-4 w-32 align-top p-4 pb-8  cursor-pointer bg-gray-200 hover:bg-gray-400 relative"
                        onClick={(ev) => {
                          if (variation.isPro) {
                            alert(
                              "Sorry this variation only vailable in pro version"
                            );
                            return false;
                          }

                          var atts = variation.atts;

                          var form = { ...atts.form };

                          var wrapper = { ...atts.wrapper };
                          var visible = { ...atts.visible };
                          var onSubmit = { ...atts.onSubmit };
                          var onProcess = { ...atts.onProcess };
                          var afterSubmit = { ...atts.afterSubmit };

                          var blockCssY = { ...atts.blockCssY };
                          var customCss = { ...atts.customCss };

                          var blockCssObj = {};

                          blockCssObj[wrapperSelector] = wrapper;
                          blockCssObj[formSelector] = form;

                          setAttributes({
                            form: form,
                            wrapper: wrapper,
                            visible: visible,
                            onSubmit: onSubmit,
                            onProcess: onProcess,
                            afterSubmit: afterSubmit,
                            customCss: customCss,
                          });

                          var blockCssRules =
                            myStore.getBlockCssRules(blockCssObj);

                          console.log(blockCssRules);

                          var items = { ...blockCssY.items, ...blockCssRules };

                          setAttributes({ blockCssY: { items: items } });

                          replaceInnerBlocks(
                            clientId,
                            createBlocksFromInnerBlocksTemplate(
                              variation.innerBlocks
                            ),
                            true
                          );
                        }}
                      >
                        <div>{variation.icon}</div>
                        <div className="absolute bottom-0 left-0 py-3 w-full text-center">
                          {variation.title}
                        </div>

                        {variation.isPro && (
                          <span className="bg-amber-400 rounded-sm text-sm inline-block  bg-opacity-90 text-white hover:text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <a
                              target="_blank"
                              className="block px-3"
                              href={
                                "https://pickplugins.com/post-grid/?utm_source=dropdownComponent&utm_term=proFeature&utm_campaign=pluginPostGrid&utm_medium=" +
                                x.label
                              }
                            >
                              Pro
                            </a>
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {hasInnerBlocks && (
            <div {...innerBlocksProps}>
              <form onSubmit={onFormSubmit}>{innerBlocksProps.children}</form>
            </div>
          )}
        </>
      </>
    );
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file

    var attributes = props.attributes;
    var wrapper = attributes.wrapper;

    var blockId = attributes.blockId;

    const blockProps = useBlockProps.save({
      className: ` ${blockId} pg-form-wrap`,
    });

    return <InnerBlocks.Content />;

    //return null;
  },
});
