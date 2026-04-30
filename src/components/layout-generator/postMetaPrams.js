var postMetaPrams = {
  // wrapper: { label: "Add Wrapper", value: "wrapper", "children": [], options: {} },
  string: { label: "Display String", outputType: "string", enableShortcodes: true, enableEmbeds: true },
  strToNumber: { label: "String To Number", outputType: "strToNumber", thousandSeparator: ',', decimalSeparator: ".", decimals: 2 },

  idToImage: { label: "Attachment Id to Image", outputType: "idToImage", linkTo: "", linkToUrl: "", target: "", enableSrcSet: true, thumbSize: "full" },
  strToLink: { label: "String To Link", outputType: "strToLink", target: "", protocol: "" },
  strToDateTime: { label: "String To DateTime", outputType: "strToDateTime", format: "" },
  arrayLoop: {
    label: "Array Loop", outputType: "arrayLoop",
    itemTag: "li",
    itemClass: "",


  }

};
export default postMetaPrams;