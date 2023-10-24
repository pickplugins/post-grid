/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { applyFilters } from "@wordpress/hooks";

let isProFeature = applyFilters("isProFeature", true);

/**
 * Template option choices for predefined columns layouts.
 */
const variations = [
	{
		name: "contact-form-1",
		title: __("Contact Form"),
		description: __("Contact Form"),

		isPro: false,
		atts: {
			form: {
				type: "contactForm",
				styles: {
					gridTemplateColumns: { Desktop: "1fr " },
					gap: { Desktop: "1em" },
					display: { Desktop: "grid" },
				},
				options: { type: "contactForm" },
			},
			wrapper: {
				options: { tag: "div", class: "" },
				styles: { gridTemplateColumns: {}, gap: {}, display: {} },
			},
			visible: {},
			onSubmit: {
				0: { id: "validation", messages: [] },
				1: { id: "submitConfirm", messages: [] },
			},
			onProcess: {
				0: {
					id: "sendMail",
					mailTo: "",
					bcc: "",
					footer: "",
					subject: "",
					showOnResponse: true,
				},
				3: { id: "createEntry", message: "", showOnResponse: false },
			},
			afterSubmit: { 0: { id: "showResponse", message: "" } },
			blockId: "pg9d6a07354523",
			blockCssY: {
				items: {
					".pg9d6a07354523": {
						"grid-template-columns": {},
						gap: {},
						display: {},
					},
					".pg9d6a07354523 form": {
						"grid-template-columns": { Desktop: "1fr " },
						gap: { Desktop: "1em" },
						display: { Desktop: "grid" },
					},
				},
			},
		},

		innerBlocks: [
			[
				"post-grid/form-field-input",
				{
					wrapper: { options: { tag: "div", class: "" } },
					labelWrap: { options: { tag: "div", enable: true, class: "" } },
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: true,
							text: "Your Name",
							class: "pg-form-field-label",
						},
					},
					input: {
						options: {
							type: "text",
							placeholder: "Write your name",
							value: "",
							name: "full_name",
							required: false,
							disabled: false,
							size: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							step: null,
							pattern: null,
							patternCustom: "",
							max: null,
							min: null,
							checked: false,
							autocomplete: false,
							id: "",
							class: "pg-form-field-input",
							position: "afterLabel",
						},
						styles: {
							border: { Desktop: "1px solid #b5b5b5" },
							borderRadius: { Desktop: "0px 0px 0px 0px" },
							padding: { Desktop: "5px 10px 5px 10px" },
							backgroundColor: { Desktop: "#ececec" },
							width: { Desktop: "100%" },
							maxWidth: { Desktop: "100%" },
						},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "Name should not empty",
							position: "afterInput",
							class: "",
						},
						styles: {
							color: { Desktop: "#c02121" },
							marginTop: { Desktop: "10px" },
						},
					},
					blockId: "pg8539be28243d",
					blockCssY: {
						items: {
							".pg8539be28243d input": {
								"background-color": { Desktop: "#ececec" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								border: { Desktop: "1px solid #b5b5b5" },
								"max-width": { Desktop: "100%" },
								width: { Desktop: "100%" },
							},
							".pg8539be28243d .error-wrap": {
								color: { Desktop: "#c02121" },
								"margin-top": { Desktop: "10px" },
							},
						},
					},
				},
			],
			[
				"post-grid/form-field-input",
				{
					wrapper: { options: { tag: "div", class: "" } },
					labelWrap: { options: { tag: "div", enable: true, class: "" } },
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: true,
							text: "Your Email",
							class: "pg-form-field-label",
						},
					},
					input: {
						options: {
							type: "text",
							placeholder: "Write your mail address",
							value: "",
							name: "email",
							required: false,
							disabled: false,
							size: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							step: null,
							pattern: null,
							patternCustom: "",
							max: null,
							min: null,
							checked: false,
							autocomplete: false,
							id: "",
							class: "pg-form-field-input",
							position: "afterLabel",
						},
						styles: {
							border: { Desktop: "1px solid #b5b5b5" },
							borderRadius: { Desktop: "0px 0px 0px 0px" },
							padding: { Desktop: "5px 10px 5px 10px" },
							backgroundColor: { Desktop: "#ececec" },
							width: { Desktop: "100%" },
							maxWidth: { Desktop: "100%" },
						},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "Email should not empty",
							position: "afterInput",
							class: "",
						},
						styles: {
							color: { Desktop: "#c02121" },
							marginTop: { Desktop: "10px" },
						},
					},
					blockId: "pg9a328fd54a2e",
					blockCssY: {
						items: {
							".pg8539be28243d input": {},
							".pg9a328fd54a2e input": {
								border: { Desktop: "1px solid #b5b5b5" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"background-color": { Desktop: "#ececec" },
								width: { Desktop: "100%" },
								"max-width": { Desktop: "100%" },
							},
							".pg9a328fd54a2e .error-wrap": {
								color: { Desktop: "#c02121" },
								"margin-top": { Desktop: "10px" },
							},
						},
					},
				},
			],
			[
				"post-grid/form-field-input",
				{
					wrapper: { options: { tag: "div", class: "" } },
					labelWrap: { options: { tag: "div", enable: true, class: "" } },
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: true,
							text: "Mail Subject",
							class: "pg-form-field-label",
						},
					},
					input: {
						options: {
							type: "text",
							placeholder: "Write your subject",
							value: "",
							name: "subject",
							required: false,
							disabled: false,
							size: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							step: null,
							pattern: null,
							patternCustom: "",
							max: null,
							min: null,
							checked: false,
							autocomplete: false,
							id: "",
							class: "pg-form-field-input",
							position: "afterLabel",
						},
						styles: {
							border: { Desktop: "1px solid #b5b5b5" },
							borderRadius: { Desktop: "0px 0px 0px 0px" },
							padding: { Desktop: "5px 10px 5px 10px" },
							backgroundColor: { Desktop: "#ececec" },
							width: { Desktop: "100%" },
							maxWidth: { Desktop: "100%" },
						},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "Subject should not empty",
							position: "afterInput",
							class: "",
						},
						styles: {
							color: { Desktop: "#c02121" },
							marginTop: { Desktop: "10px" },
						},
					},
					blockId: "pgfe443c9f4725",
					blockCssY: {
						items: {
							".pgfe443c9f4725 .error-wrap": {
								color: { Desktop: "#c02121" },
								"margin-top": { Desktop: "10px" },
							},
							".pgfe443c9f4725 input": {
								border: { Desktop: "1px solid #b5b5b5" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"background-color": { Desktop: "#ececec" },
								width: { Desktop: "100%" },
								"max-width": { Desktop: "100%" },
							},
						},
					},
				},
			],
			[
				"post-grid/form-field-textarea",
				{
					wrapper: { options: { tag: "div", class: "" }, styles: {} },
					labelWrap: {
						options: { tag: "div", enable: true, class: "" },
						styles: {},
					},
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: true,
							text: "Write Your Message",
							class: "pg-form-field-label",
						},
						styles: {},
					},
					input: {
						options: {
							type: "text",
							placeholder: "Write your name",
							value: "",
							name: "message",
							required: false,
							disabled: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							cols: null,
							rows: 3,
							autocomplete: false,
							autofocus: false,
							wrap: false,
							spellcheck: false,
							autocorrect: false,
							id: "",
							class: "",
							position: "afterLabel",
						},
						styles: {
							border: { Desktop: "1px solid #b5b5b5" },
							borderRadius: { Desktop: "0px 0px 0px 0px" },
							padding: { Desktop: "5px 10px 5px 10px" },
							backgroundColor: { Desktop: "#ececec" },
							width: { Desktop: "100%" },
							maxWidth: { Desktop: "100%" },
						},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "Message should not empty",
							position: "afterInput",
							class: "",
						},
						styles: {
							color: { Desktop: "#c02121" },
							marginTop: { Desktop: "10px" },
						},
					},
					blockId: "pg434b1c8af09e",
					blockCssY: {
						items: {
							".pg434b1c8af09e textarea": {
								border: { Desktop: "1px solid #b5b5b5" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"background-color": { Desktop: "#ececec" },
								width: { Desktop: "100%" },
								"max-width": { Desktop: "100%" },
							},
						},
					},
				},
			],
			[
				"post-grid/form-field-input",
				{
					wrapper: { options: { tag: "div", class: "" } },
					labelWrap: { options: { tag: "div", enable: true, class: "" } },
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: false,
							text: "Your Name",
							class: "pg-form-field-label",
						},
					},
					input: {
						options: {
							type: "submit",
							placeholder: "Write your name",
							value: "Submit",
							name: "",
							required: false,
							disabled: false,
							size: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							step: null,
							pattern: null,
							patternCustom: "",
							max: null,
							min: null,
							checked: false,
							autocomplete: false,
							id: "",
							class: "pg-form-field-input",
							position: "afterLabel",
						},
						styles: {
							border: { Desktop: "1px solid #b5b5b5" },
							borderRadius: { Desktop: "0px 0px 0px 0px" },
							padding: { Desktop: "5px 10px 5px 10px" },
							backgroundColor: { Desktop: "#51557E" },
							width: { Desktop: "100%" },
							maxWidth: { Desktop: "100%" },
							color: { Desktop: "#ffffff" },
						},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "",
							position: "afterInput",
							class: "",
						},
					},
					blockId: "pg4670520d9df5",
					blockCssY: {
						items: {
							".pg8539be28243d input": {},
							".pg4670520d9df5 input": {
								border: { Desktop: "1px solid #b5b5b5" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"background-color": { Desktop: "#51557E" },
								width: { Desktop: "100%" },
								"max-width": { Desktop: "100%" },
								color: { Desktop: "#ffffff" },
							},
						},
					},
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 365.15 244.63">
				<rect
					fill="#bcbec0"
					x="2.57"
					y="4.63"
					width="360"
					height="33.44"
					rx="2.2"
				/>
				<path
					fill="#343738"
					d="M360.38,39.07H4.77a3.2,3.2,0,0,1-3.2-3.19V6.83a3.21,3.21,0,0,1,3.2-3.2H360.38a3.2,3.2,0,0,1,3.19,3.2V35.88A3.19,3.19,0,0,1,360.38,39.07ZM4.77,5.63a1.2,1.2,0,0,0-1.2,1.2V35.88a1.19,1.19,0,0,0,1.2,1.19H360.38a1.19,1.19,0,0,0,1.19-1.19V6.83a1.19,1.19,0,0,0-1.19-1.2Z"
				/>
				<rect
					fill="#bcbec0"
					x="2.57"
					y="53.1"
					width="360"
					height="33.44"
					rx="2.2"
				/>
				<path
					fill="#343738"
					d="M360.38,87.54H4.77a3.2,3.2,0,0,1-3.2-3.2v-29a3.2,3.2,0,0,1,3.2-3.2H360.38a3.19,3.19,0,0,1,3.19,3.2v29A3.19,3.19,0,0,1,360.38,87.54ZM4.77,54.1a1.2,1.2,0,0,0-1.2,1.2v29a1.2,1.2,0,0,0,1.2,1.2H360.38a1.19,1.19,0,0,0,1.19-1.2v-29a1.19,1.19,0,0,0-1.19-1.2Z"
				/>
				<rect
					fill="#bcbec0"
					x="2.57"
					y="100.74"
					width="360"
					height="86.66"
					rx="2.2"
				/>
				<path
					fill="#343738"
					d="M360.38,188.4H4.77a3.21,3.21,0,0,1-3.2-3.2V102.93a3.2,3.2,0,0,1,3.2-3.19H360.38a3.19,3.19,0,0,1,3.19,3.19V185.2A3.2,3.2,0,0,1,360.38,188.4ZM4.77,101.74a1.19,1.19,0,0,0-1.2,1.19V185.2a1.2,1.2,0,0,0,1.2,1.2H360.38a1.19,1.19,0,0,0,1.19-1.2V102.93a1.19,1.19,0,0,0-1.19-1.19Z"
				/>
				<path
					fill="#231f20"
					d="M20.78,21.08H17.64V24h3.5v.87H16.6V16.79H21v.88H17.64v2.55h3.14Z"
				/>
				<path
					fill="#231f20"
					d="M22.46,20.64c0-.6,0-1.09,0-1.57h.92l.05.94h0a2,2,0,0,1,1.83-1.07,1.71,1.71,0,0,1,1.64,1.16h0a2.42,2.42,0,0,1,.65-.75,2,2,0,0,1,1.28-.41c.77,0,1.91.5,1.91,2.52v3.41h-1V21.59c0-1.12-.41-1.79-1.26-1.79a1.38,1.38,0,0,0-1.25,1,2.11,2.11,0,0,0-.08.53v3.58h-1V21.4c0-.93-.41-1.6-1.21-1.6a1.45,1.45,0,0,0-1.31,1.06,1.4,1.4,0,0,0-.08.51v3.5h-1Z"
				/>
				<path
					fill="#231f20"
					d="M35.69,24.87l-.09-.73h0a2.17,2.17,0,0,1-1.78.87A1.65,1.65,0,0,1,32,23.34c0-1.4,1.24-2.17,3.49-2.16v-.12a1.2,1.2,0,0,0-1.32-1.34,2.9,2.9,0,0,0-1.51.43l-.24-.7a3.6,3.6,0,0,1,1.9-.51c1.78,0,2.21,1.21,2.21,2.37v2.17a7.31,7.31,0,0,0,.1,1.39Zm-.16-3c-1.15,0-2.46.18-2.46,1.31a.94.94,0,0,0,1,1,1.45,1.45,0,0,0,1.4-1,1,1,0,0,0,.06-.34Z"
				/>
				<path
					fill="#231f20"
					d="M39.43,17.44a.62.62,0,0,1-.67.65.63.63,0,0,1-.64-.65.65.65,0,0,1,.66-.66A.63.63,0,0,1,39.43,17.44Zm-1.17,7.43v-5.8h1.05v5.8Z"
				/>
				<path fill="#231f20" d="M41.06,16.36h1.06v8.51H41.06Z" />
				<path
					fill="#231f20"
					d="M16.45,72.07a3.68,3.68,0,0,0,1.87.53C19.39,72.6,20,72,20,71.22s-.43-1.19-1.52-1.61c-1.32-.47-2.13-1.15-2.13-2.29A2.32,2.32,0,0,1,19,65.13a3.73,3.73,0,0,1,1.79.39l-.29.85A3.24,3.24,0,0,0,18.94,66c-1.11,0-1.53.66-1.53,1.21,0,.76.49,1.13,1.61,1.56,1.37.53,2.06,1.19,2.06,2.37s-.92,2.33-2.83,2.33A4.25,4.25,0,0,1,16.19,73Z"
				/>
				<path
					fill="#231f20"
					d="M27.33,71.76c0,.6,0,1.13.05,1.58h-.93l-.06-1h0a2.16,2.16,0,0,1-1.92,1.08c-.91,0-2-.5-2-2.54V67.54H23.5v3.21c0,1.1.33,1.85,1.29,1.85a1.52,1.52,0,0,0,1.39-1,1.57,1.57,0,0,0,.1-.54V67.54h1Z"
				/>
				<path
					fill="#231f20"
					d="M29,73.34c0-.39.05-1,.05-1.5v-7h1v3.64h0a2.14,2.14,0,0,1,2-1.06c1.44,0,2.46,1.19,2.45,3,0,2.07-1.31,3.1-2.6,3.1A2.06,2.06,0,0,1,30,72.38h0l-.05,1ZM30.13,71a2.3,2.3,0,0,0,.05.39,1.63,1.63,0,0,0,1.58,1.23c1.11,0,1.77-.9,1.77-2.23,0-1.16-.6-2.16-1.73-2.16a1.7,1.7,0,0,0-1.61,1.3,2.34,2.34,0,0,0-.06.43Z"
				/>
				<path
					fill="#231f20"
					d="M34.5,75a1.75,1.75,0,0,0,1.15-.44c.29-.34.4-.79.4-2.19V67.54H37.1V72.8a3.22,3.22,0,0,1-.69,2.39,2.68,2.68,0,0,1-1.8.66Zm2.72-9.11a.61.61,0,0,1-.66.64.63.63,0,0,1-.64-.64.64.64,0,0,1,.67-.66A.62.62,0,0,1,37.22,65.91Z"
				/>
				<path
					fill="#231f20"
					d="M39.42,70.63a1.86,1.86,0,0,0,2,2,4,4,0,0,0,1.61-.3l.18.75a4.67,4.67,0,0,1-1.93.36,2.69,2.69,0,0,1-2.86-2.92c0-1.76,1-3.13,2.72-3.13a2.45,2.45,0,0,1,2.4,2.73,4.68,4.68,0,0,1,0,.49Zm3.09-.76a1.49,1.49,0,0,0-1.46-1.71,1.75,1.75,0,0,0-1.62,1.71Z"
				/>
				<path
					fill="#231f20"
					d="M49,73.13a3.94,3.94,0,0,1-1.66.33,2.76,2.76,0,0,1-2.9-3,3,3,0,0,1,3.12-3.08,3.45,3.45,0,0,1,1.47.3l-.24.81a2.54,2.54,0,0,0-1.23-.27,2.19,2.19,0,0,0,0,4.36,2.86,2.86,0,0,0,1.29-.29Z"
				/>
				<path
					fill="#231f20"
					d="M51.65,65.87v1.67h1.51v.8H51.65v3.13c0,.72.2,1.13.79,1.13a2.68,2.68,0,0,0,.61-.07l.05.79a2.73,2.73,0,0,1-.94.14A1.47,1.47,0,0,1,51,73a2.15,2.15,0,0,1-.4-1.51V68.34h-.9v-.8h.9V66.15Z"
				/>
				<path
					fill="#231f20"
					d="M23.41,115.34c-.06-1.13-.13-2.48-.12-3.49h0c-.27,1-.61,2-1,3.07l-1.42,3.92H20L18.71,115c-.39-1.14-.71-2.18-.94-3.14h0c0,1-.09,2.36-.16,3.57l-.21,3.47h-1l.56-8.08h1.34l1.38,3.91c.33,1,.61,1.88.81,2.72h0c.2-.82.49-1.7.85-2.72l1.44-3.91h1.33l.5,8.08h-1Z"
				/>
				<path
					fill="#231f20"
					d="M26.87,116.18a1.85,1.85,0,0,0,2,2,3.83,3.83,0,0,0,1.61-.3l.18.76a4.72,4.72,0,0,1-1.94.36,2.7,2.7,0,0,1-2.85-2.93c0-1.75,1-3.13,2.72-3.13a2.46,2.46,0,0,1,2.4,2.74,4.88,4.88,0,0,1,0,.49Zm3.09-.76a1.5,1.5,0,0,0-1.46-1.71,1.74,1.74,0,0,0-1.62,1.71Z"
				/>
				<path
					fill="#231f20"
					d="M32.15,117.81a2.79,2.79,0,0,0,1.39.42c.77,0,1.13-.38,1.13-.86s-.3-.78-1.08-1.07c-1.05-.37-1.54-1-1.54-1.64a1.8,1.8,0,0,1,2-1.71,2.9,2.9,0,0,1,1.42.36l-.26.77a2.32,2.32,0,0,0-1.19-.33c-.62,0-1,.36-1,.79s.35.69,1.1,1c1,.38,1.53.89,1.53,1.75,0,1-.8,1.74-2.17,1.74a3.34,3.34,0,0,1-1.64-.4Z"
				/>
				<path
					fill="#231f20"
					d="M36.9,117.81a2.79,2.79,0,0,0,1.39.42c.77,0,1.13-.38,1.13-.86s-.3-.78-1.08-1.07c-1-.37-1.54-1-1.54-1.64a1.8,1.8,0,0,1,2-1.71,2.9,2.9,0,0,1,1.42.36l-.26.77a2.32,2.32,0,0,0-1.19-.33c-.62,0-1,.36-1,.79s.35.69,1.1,1c1,.38,1.53.89,1.53,1.75,0,1-.79,1.74-2.17,1.74a3.27,3.27,0,0,1-1.63-.4Z"
				/>
				<path
					fill="#231f20"
					d="M45,118.89l-.08-.73h0a2.17,2.17,0,0,1-1.77.86,1.66,1.66,0,0,1-1.78-1.66c0-1.41,1.25-2.18,3.49-2.16v-.12a1.2,1.2,0,0,0-1.32-1.35,2.93,2.93,0,0,0-1.51.43l-.24-.69a3.64,3.64,0,0,1,1.91-.52c1.77,0,2.2,1.21,2.2,2.38v2.17a8.4,8.4,0,0,0,.1,1.39Zm-.16-3c-1.15,0-2.45.18-2.45,1.31a.93.93,0,0,0,1,1,1.43,1.43,0,0,0,1.4-1,1,1,0,0,0,.06-.33Z"
				/>
				<path
					fill="#231f20"
					d="M52.58,113.09c0,.41,0,.88,0,1.59v3.37a3.35,3.35,0,0,1-.82,2.65,3.08,3.08,0,0,1-2.11.7,3.79,3.79,0,0,1-1.94-.48l.27-.81a3.25,3.25,0,0,0,1.7.46c1.08,0,1.87-.56,1.87-2v-.65h0a2.09,2.09,0,0,1-1.85,1A2.6,2.6,0,0,1,47.16,116,2.79,2.79,0,0,1,49.78,113a2,2,0,0,1,1.81,1h0l0-.87Zm-1.09,2.29a1.44,1.44,0,0,0-.06-.48A1.53,1.53,0,0,0,50,113.78c-1,0-1.72.85-1.72,2.2,0,1.14.57,2.08,1.71,2.08A1.54,1.54,0,0,0,51.41,117a1.81,1.81,0,0,0,.08-.56Z"
				/>
				<path
					fill="#231f20"
					d="M54.88,116.18a1.85,1.85,0,0,0,2,2,3.75,3.75,0,0,0,1.6-.3l.18.76a4.63,4.63,0,0,1-1.93.36,2.7,2.7,0,0,1-2.85-2.93c0-1.75,1-3.13,2.72-3.13a2.46,2.46,0,0,1,2.4,2.74,2.81,2.81,0,0,1,0,.49Zm3.09-.76a1.5,1.5,0,0,0-1.46-1.71,1.74,1.74,0,0,0-1.62,1.71Z"
				/>
				<rect
					fill="#414042"
					x="2.57"
					y="204.92"
					width="180"
					height="35.07"
					rx="3.24"
				/>
				<path
					fill="#fff"
					d="M75.27,224.71a3.68,3.68,0,0,0,1.87.53c1.07,0,1.69-.57,1.69-1.38s-.43-1.19-1.52-1.61c-1.32-.47-2.14-1.15-2.14-2.29a2.33,2.33,0,0,1,2.62-2.19,3.77,3.77,0,0,1,1.79.39l-.29.85a3.33,3.33,0,0,0-1.54-.38c-1.1,0-1.52.66-1.52,1.21,0,.76.49,1.13,1.61,1.56,1.36.53,2.06,1.19,2.06,2.38s-.92,2.32-2.83,2.32a4.25,4.25,0,0,1-2.06-.51Z"
				/>
				<path
					fill="#fff"
					d="M86.15,224.4c0,.6,0,1.13,0,1.58h-.94L85.2,225h0a2.2,2.2,0,0,1-1.92,1.07c-.91,0-2-.5-2-2.54v-3.39h1v3.21c0,1.11.34,1.85,1.3,1.85a1.52,1.52,0,0,0,1.39-1,1.57,1.57,0,0,0,.09-.54v-3.56h1.06Z"
				/>
				<path
					fill="#fff"
					d="M87.86,226c0-.39,0-1,0-1.5v-7h1v3.64h0a2.16,2.16,0,0,1,2-1.06c1.44,0,2.46,1.2,2.45,3,0,2.07-1.31,3.1-2.6,3.1a2.07,2.07,0,0,1-2-1.09h0l0,1ZM89,223.66a1.58,1.58,0,0,0,0,.38,1.62,1.62,0,0,0,1.58,1.23c1.1,0,1.76-.9,1.76-2.23,0-1.16-.6-2.16-1.72-2.16a1.69,1.69,0,0,0-1.61,1.3,1.71,1.71,0,0,0-.06.43Z"
				/>
				<path
					fill="#fff"
					d="M94.73,221.75c0-.6,0-1.09,0-1.57h.93l0,.93h0a2,2,0,0,1,1.83-1.06,1.71,1.71,0,0,1,1.64,1.16h0a2.35,2.35,0,0,1,.65-.76,2,2,0,0,1,1.28-.4c.77,0,1.91.5,1.91,2.51V226h-1V222.7c0-1.12-.41-1.79-1.26-1.79a1.36,1.36,0,0,0-1.25,1,1.64,1.64,0,0,0-.08.53V226h-1V222.5c0-.92-.41-1.59-1.21-1.59A1.45,1.45,0,0,0,95.85,222a1.5,1.5,0,0,0-.09.52V226h-1Z"
				/>
				<path
					fill="#fff"
					d="M105.92,218.55a.66.66,0,0,1-1.31,0,.64.64,0,0,1,.66-.66A.63.63,0,0,1,105.92,218.55ZM104.74,226v-5.8h1.06V226Z"
				/>
				<path
					fill="#fff"
					d="M108.82,218.51v1.67h1.51v.8h-1.51v3.13c0,.72.2,1.13.79,1.13a2.6,2.6,0,0,0,.61-.07l0,.79a2.67,2.67,0,0,1-.93.14,1.44,1.44,0,0,1-1.14-.44,2.15,2.15,0,0,1-.41-1.51V221h-.9v-.8h.9v-1.39Z"
				/>
			</svg>
		),
	},

	{
		name: "appointment-form-1",
		title: __("Appointment Form"),
		description: __("Appointment Form"),

		isPro: false,
		atts: {
			wrapper: {
				options: { tag: "div", class: "" },
				styles: { gridTemplateColumns: {}, gap: {}, display: {} },
			},
			form: {
				type: "appointmentForm",
				styles: {
					gridTemplateColumns: { Desktop: "1fr " },
					gap: { Desktop: "1em" },
					display: { Desktop: "grid" },
				},
				options: { type: "appointmentForm" },
			},
			visible: {},
			onSubmit: {
				0: { id: "validation", messages: [] },
				1: { id: "submitConfirm", messages: [] },
			},
			onProcess: {
				0: {
					id: "sendMail",
					mailTo: "",
					bcc: "",
					footer: "",
					subject: "",
					showOnResponse: true,
				},
				3: { id: "createEntry", message: "", showOnResponse: false },
			},
			afterSubmit: { 0: { id: "showResponse", message: "" } },
			blockId: "pge431be43ba93",
			customCss: {},
			blockCssY: {
				items: {
					".pg9d6a07354523": {
						"grid-template-columns": {},
						gap: {},
						display: {},
					},
					".pg9d6a07354523 form": {
						"grid-template-columns": { Desktop: "1fr " },
						gap: { Desktop: "1em" },
						display: { Desktop: "grid" },
					},
					".pge431be43ba93": {
						"grid-template-columns": {},
						gap: {},
						display: {},
					},
					".pge431be43ba93 form": {
						"grid-template-columns": { Desktop: "1fr " },
						gap: { Desktop: "1em" },
						display: { Desktop: "grid" },
					},
				},
			},
		},

		innerBlocks: [
			[
				"post-grid/form-field-input",
				{
					wrapper: { options: { tag: "div", class: "" } },
					labelWrap: { options: { tag: "div", enable: true, class: "" } },
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: true,
							text: "Your Name",
							class: "pg-form-field-label",
						},
					},
					input: {
						options: {
							type: "text",
							placeholder: "Write your name",
							value: "",
							name: "full_name",
							required: false,
							disabled: false,
							size: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							step: null,
							pattern: null,
							patternCustom: "",
							max: null,
							min: null,
							checked: false,
							autocomplete: false,
							id: "",
							class: "pg-form-field-input",
							position: "afterLabel",
						},
						styles: {
							border: { Desktop: "1px solid #b5b5b5" },
							borderRadius: { Desktop: "0px 0px 0px 0px" },
							padding: { Desktop: "5px 10px 5px 10px" },
							backgroundColor: { Desktop: "#ececec" },
							width: { Desktop: "100%" },
							maxWidth: { Desktop: "100%" },
						},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "Name should not empty",
							position: "afterInput",
							class: "",
						},
						styles: {
							color: { Desktop: "#c02121" },
							marginTop: { Desktop: "10px" },
						},
					},
					blockId: "pg8539be28243d",
					blockCssY: {
						items: {
							".pg8539be28243d input": {
								"background-color": { Desktop: "#ececec" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								border: { Desktop: "1px solid #b5b5b5" },
								"max-width": { Desktop: "100%" },
								width: { Desktop: "100%" },
							},
							".pg8539be28243d .error-wrap": {
								color: { Desktop: "#c02121" },
								"margin-top": { Desktop: "10px" },
							},
						},
					},
				},
			],
			[
				"post-grid/form-field-input",
				{
					wrapper: { options: { tag: "div", class: "" } },
					labelWrap: { options: { tag: "div", enable: true, class: "" } },
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: true,
							text: "Your Email",
							class: "pg-form-field-label",
						},
					},
					input: {
						options: {
							type: "text",
							placeholder: "Write your mail address",
							value: "",
							name: "email",
							required: false,
							disabled: false,
							size: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							step: null,
							pattern: null,
							patternCustom: "",
							max: null,
							min: null,
							checked: false,
							autocomplete: false,
							id: "",
							class: "pg-form-field-input",
							position: "afterLabel",
						},
						styles: {
							border: { Desktop: "1px solid #b5b5b5" },
							borderRadius: { Desktop: "0px 0px 0px 0px" },
							padding: { Desktop: "5px 10px 5px 10px" },
							backgroundColor: { Desktop: "#ececec" },
							width: { Desktop: "100%" },
							maxWidth: { Desktop: "100%" },
						},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "Email should not empty",
							position: "afterInput",
							class: "",
						},
						styles: {
							color: { Desktop: "#c02121" },
							marginTop: { Desktop: "10px" },
						},
					},
					blockId: "pg9a328fd54a2e",
					blockCssY: {
						items: {
							".pg8539be28243d input": {},
							".pg9a328fd54a2e input": {
								border: { Desktop: "1px solid #b5b5b5" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"background-color": { Desktop: "#ececec" },
								width: { Desktop: "100%" },
								"max-width": { Desktop: "100%" },
							},
							".pg9a328fd54a2e .error-wrap": {
								color: { Desktop: "#c02121" },
								"margin-top": { Desktop: "10px" },
							},
						},
					},
				},
			],
			[
				"post-grid/form-field-textarea",
				{
					wrapper: { options: { tag: "div", class: "" }, styles: {} },
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: true,
							text: "Write Your Message",
							class: "pg-form-field-label",
						},
						styles: {},
					},
					input: {
						options: {
							type: "text",
							placeholder: "Write your name",
							value: "",
							name: "message",
							required: false,
							disabled: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							cols: null,
							rows: 3,
							autocomplete: false,
							autofocus: false,
							wrap: false,
							spellcheck: false,
							autocorrect: false,
							id: "",
							class: "",
							position: "afterLabel",
						},
						styles: {
							border: { Desktop: "1px solid #b5b5b5" },
							borderRadius: { Desktop: "0px 0px 0px 0px" },
							padding: { Desktop: "5px 10px 5px 10px" },
							backgroundColor: { Desktop: "#ececec" },
							width: { Desktop: "100%" },
							maxWidth: { Desktop: "100%" },
						},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					labelWrap: {
						options: { tag: "div", enable: true, class: "" },
						styles: {},
					},
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "Message should not empty",
							position: "afterInput",
							class: "",
						},
						styles: {
							color: { Desktop: "#c02121" },
							marginTop: { Desktop: "10px" },
						},
					},
					blockId: "pg434b1c8af09e",
					blockCssY: {
						items: {
							".pg434b1c8af09e textarea": {
								border: { Desktop: "1px solid #b5b5b5" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"background-color": { Desktop: "#ececec" },
								width: { Desktop: "100%" },
								"max-width": { Desktop: "100%" },
							},
						},
					},
				},
			],
			[
				"post-grid/form-field-input",
				{
					wrapper: { options: { tag: "div", class: "" } },
					labelWrap: { options: { tag: "div", enable: true, class: "" } },
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: false,
							text: "Your Name",
							class: "pg-form-field-label",
						},
					},
					input: {
						options: {
							type: "submit",
							placeholder: "Write your name",
							value: "Submit",
							name: "",
							required: false,
							disabled: false,
							size: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							step: null,
							pattern: null,
							patternCustom: "",
							max: null,
							min: null,
							checked: false,
							autocomplete: false,
							id: "",
							class: "pg-form-field-input",
							position: "afterLabel",
						},
						styles: {
							border: { Desktop: "1px solid #b5b5b5" },
							borderRadius: { Desktop: "0px 0px 0px 0px" },
							padding: { Desktop: "5px 10px 5px 10px" },
							backgroundColor: { Desktop: "#51557E" },
							width: { Desktop: "100%" },
							maxWidth: { Desktop: "100%" },
							color: { Desktop: "#ffffff" },
						},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "",
							position: "afterInput",
							class: "",
						},
					},
					blockId: "pg4670520d9df5",
					blockCssY: {
						items: {
							".pg8539be28243d input": {},
							".pg4670520d9df5 input": {
								border: { Desktop: "1px solid #b5b5b5" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"background-color": { Desktop: "#51557E" },
								width: { Desktop: "100%" },
								"max-width": { Desktop: "100%" },
								color: { Desktop: "#ffffff" },
							},
						},
					},
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 365.15 244.63">
				<rect
					fill="#bcbec0"
					x="2.57"
					y="4.63"
					width="360"
					height="33.44"
					rx="2.2"
				/>
				<path
					fill="#343738"
					d="M360.38,39.07H4.77a3.2,3.2,0,0,1-3.2-3.19V6.83a3.21,3.21,0,0,1,3.2-3.2H360.38a3.2,3.2,0,0,1,3.19,3.2V35.88A3.19,3.19,0,0,1,360.38,39.07ZM4.77,5.63a1.2,1.2,0,0,0-1.2,1.2V35.88a1.19,1.19,0,0,0,1.2,1.19H360.38a1.19,1.19,0,0,0,1.19-1.19V6.83a1.19,1.19,0,0,0-1.19-1.2Z"
				/>
				<rect
					fill="#bcbec0"
					x="2.57"
					y="53.1"
					width="360"
					height="33.44"
					rx="2.2"
				/>
				<path
					fill="#343738"
					d="M360.38,87.54H4.77a3.2,3.2,0,0,1-3.2-3.2v-29a3.2,3.2,0,0,1,3.2-3.2H360.38a3.19,3.19,0,0,1,3.19,3.2v29A3.19,3.19,0,0,1,360.38,87.54ZM4.77,54.1a1.2,1.2,0,0,0-1.2,1.2v29a1.2,1.2,0,0,0,1.2,1.2H360.38a1.19,1.19,0,0,0,1.19-1.2v-29a1.19,1.19,0,0,0-1.19-1.2Z"
				/>
				<rect
					fill="#bcbec0"
					x="2.57"
					y="100.74"
					width="360"
					height="86.66"
					rx="2.2"
				/>
				<path
					fill="#343738"
					d="M360.38,188.4H4.77a3.21,3.21,0,0,1-3.2-3.2V102.93a3.2,3.2,0,0,1,3.2-3.19H360.38a3.19,3.19,0,0,1,3.19,3.19V185.2A3.2,3.2,0,0,1,360.38,188.4ZM4.77,101.74a1.19,1.19,0,0,0-1.2,1.19V185.2a1.2,1.2,0,0,0,1.2,1.2H360.38a1.19,1.19,0,0,0,1.19-1.2V102.93a1.19,1.19,0,0,0-1.19-1.19Z"
				/>
				<path
					fill="#231f20"
					d="M20.78,21.08H17.64V24h3.5v.87H16.6V16.79H21v.88H17.64v2.55h3.14Z"
				/>
				<path
					fill="#231f20"
					d="M22.46,20.64c0-.6,0-1.09,0-1.57h.92l.05.94h0a2,2,0,0,1,1.83-1.07,1.71,1.71,0,0,1,1.64,1.16h0a2.42,2.42,0,0,1,.65-.75,2,2,0,0,1,1.28-.41c.77,0,1.91.5,1.91,2.52v3.41h-1V21.59c0-1.12-.41-1.79-1.26-1.79a1.38,1.38,0,0,0-1.25,1,2.11,2.11,0,0,0-.08.53v3.58h-1V21.4c0-.93-.41-1.6-1.21-1.6a1.45,1.45,0,0,0-1.31,1.06,1.4,1.4,0,0,0-.08.51v3.5h-1Z"
				/>
				<path
					fill="#231f20"
					d="M35.69,24.87l-.09-.73h0a2.17,2.17,0,0,1-1.78.87A1.65,1.65,0,0,1,32,23.34c0-1.4,1.24-2.17,3.49-2.16v-.12a1.2,1.2,0,0,0-1.32-1.34,2.9,2.9,0,0,0-1.51.43l-.24-.7a3.6,3.6,0,0,1,1.9-.51c1.78,0,2.21,1.21,2.21,2.37v2.17a7.31,7.31,0,0,0,.1,1.39Zm-.16-3c-1.15,0-2.46.18-2.46,1.31a.94.94,0,0,0,1,1,1.45,1.45,0,0,0,1.4-1,1,1,0,0,0,.06-.34Z"
				/>
				<path
					fill="#231f20"
					d="M39.43,17.44a.62.62,0,0,1-.67.65.63.63,0,0,1-.64-.65.65.65,0,0,1,.66-.66A.63.63,0,0,1,39.43,17.44Zm-1.17,7.43v-5.8h1.05v5.8Z"
				/>
				<path fill="#231f20" d="M41.06,16.36h1.06v8.51H41.06Z" />
				<path
					fill="#231f20"
					d="M16.45,72.07a3.68,3.68,0,0,0,1.87.53C19.39,72.6,20,72,20,71.22s-.43-1.19-1.52-1.61c-1.32-.47-2.13-1.15-2.13-2.29A2.32,2.32,0,0,1,19,65.13a3.73,3.73,0,0,1,1.79.39l-.29.85A3.24,3.24,0,0,0,18.94,66c-1.11,0-1.53.66-1.53,1.21,0,.76.49,1.13,1.61,1.56,1.37.53,2.06,1.19,2.06,2.37s-.92,2.33-2.83,2.33A4.25,4.25,0,0,1,16.19,73Z"
				/>
				<path
					fill="#231f20"
					d="M27.33,71.76c0,.6,0,1.13.05,1.58h-.93l-.06-1h0a2.16,2.16,0,0,1-1.92,1.08c-.91,0-2-.5-2-2.54V67.54H23.5v3.21c0,1.1.33,1.85,1.29,1.85a1.52,1.52,0,0,0,1.39-1,1.57,1.57,0,0,0,.1-.54V67.54h1Z"
				/>
				<path
					fill="#231f20"
					d="M29,73.34c0-.39.05-1,.05-1.5v-7h1v3.64h0a2.14,2.14,0,0,1,2-1.06c1.44,0,2.46,1.19,2.45,3,0,2.07-1.31,3.1-2.6,3.1A2.06,2.06,0,0,1,30,72.38h0l-.05,1ZM30.13,71a2.3,2.3,0,0,0,.05.39,1.63,1.63,0,0,0,1.58,1.23c1.11,0,1.77-.9,1.77-2.23,0-1.16-.6-2.16-1.73-2.16a1.7,1.7,0,0,0-1.61,1.3,2.34,2.34,0,0,0-.06.43Z"
				/>
				<path
					fill="#231f20"
					d="M34.5,75a1.75,1.75,0,0,0,1.15-.44c.29-.34.4-.79.4-2.19V67.54H37.1V72.8a3.22,3.22,0,0,1-.69,2.39,2.68,2.68,0,0,1-1.8.66Zm2.72-9.11a.61.61,0,0,1-.66.64.63.63,0,0,1-.64-.64.64.64,0,0,1,.67-.66A.62.62,0,0,1,37.22,65.91Z"
				/>
				<path
					fill="#231f20"
					d="M39.42,70.63a1.86,1.86,0,0,0,2,2,4,4,0,0,0,1.61-.3l.18.75a4.67,4.67,0,0,1-1.93.36,2.69,2.69,0,0,1-2.86-2.92c0-1.76,1-3.13,2.72-3.13a2.45,2.45,0,0,1,2.4,2.73,4.68,4.68,0,0,1,0,.49Zm3.09-.76a1.49,1.49,0,0,0-1.46-1.71,1.75,1.75,0,0,0-1.62,1.71Z"
				/>
				<path
					fill="#231f20"
					d="M49,73.13a3.94,3.94,0,0,1-1.66.33,2.76,2.76,0,0,1-2.9-3,3,3,0,0,1,3.12-3.08,3.45,3.45,0,0,1,1.47.3l-.24.81a2.54,2.54,0,0,0-1.23-.27,2.19,2.19,0,0,0,0,4.36,2.86,2.86,0,0,0,1.29-.29Z"
				/>
				<path
					fill="#231f20"
					d="M51.65,65.87v1.67h1.51v.8H51.65v3.13c0,.72.2,1.13.79,1.13a2.68,2.68,0,0,0,.61-.07l.05.79a2.73,2.73,0,0,1-.94.14A1.47,1.47,0,0,1,51,73a2.15,2.15,0,0,1-.4-1.51V68.34h-.9v-.8h.9V66.15Z"
				/>
				<path
					fill="#231f20"
					d="M23.41,115.34c-.06-1.13-.13-2.48-.12-3.49h0c-.27,1-.61,2-1,3.07l-1.42,3.92H20L18.71,115c-.39-1.14-.71-2.18-.94-3.14h0c0,1-.09,2.36-.16,3.57l-.21,3.47h-1l.56-8.08h1.34l1.38,3.91c.33,1,.61,1.88.81,2.72h0c.2-.82.49-1.7.85-2.72l1.44-3.91h1.33l.5,8.08h-1Z"
				/>
				<path
					fill="#231f20"
					d="M26.87,116.18a1.85,1.85,0,0,0,2,2,3.83,3.83,0,0,0,1.61-.3l.18.76a4.72,4.72,0,0,1-1.94.36,2.7,2.7,0,0,1-2.85-2.93c0-1.75,1-3.13,2.72-3.13a2.46,2.46,0,0,1,2.4,2.74,4.88,4.88,0,0,1,0,.49Zm3.09-.76a1.5,1.5,0,0,0-1.46-1.71,1.74,1.74,0,0,0-1.62,1.71Z"
				/>
				<path
					fill="#231f20"
					d="M32.15,117.81a2.79,2.79,0,0,0,1.39.42c.77,0,1.13-.38,1.13-.86s-.3-.78-1.08-1.07c-1.05-.37-1.54-1-1.54-1.64a1.8,1.8,0,0,1,2-1.71,2.9,2.9,0,0,1,1.42.36l-.26.77a2.32,2.32,0,0,0-1.19-.33c-.62,0-1,.36-1,.79s.35.69,1.1,1c1,.38,1.53.89,1.53,1.75,0,1-.8,1.74-2.17,1.74a3.34,3.34,0,0,1-1.64-.4Z"
				/>
				<path
					fill="#231f20"
					d="M36.9,117.81a2.79,2.79,0,0,0,1.39.42c.77,0,1.13-.38,1.13-.86s-.3-.78-1.08-1.07c-1-.37-1.54-1-1.54-1.64a1.8,1.8,0,0,1,2-1.71,2.9,2.9,0,0,1,1.42.36l-.26.77a2.32,2.32,0,0,0-1.19-.33c-.62,0-1,.36-1,.79s.35.69,1.1,1c1,.38,1.53.89,1.53,1.75,0,1-.79,1.74-2.17,1.74a3.27,3.27,0,0,1-1.63-.4Z"
				/>
				<path
					fill="#231f20"
					d="M45,118.89l-.08-.73h0a2.17,2.17,0,0,1-1.77.86,1.66,1.66,0,0,1-1.78-1.66c0-1.41,1.25-2.18,3.49-2.16v-.12a1.2,1.2,0,0,0-1.32-1.35,2.93,2.93,0,0,0-1.51.43l-.24-.69a3.64,3.64,0,0,1,1.91-.52c1.77,0,2.2,1.21,2.2,2.38v2.17a8.4,8.4,0,0,0,.1,1.39Zm-.16-3c-1.15,0-2.45.18-2.45,1.31a.93.93,0,0,0,1,1,1.43,1.43,0,0,0,1.4-1,1,1,0,0,0,.06-.33Z"
				/>
				<path
					fill="#231f20"
					d="M52.58,113.09c0,.41,0,.88,0,1.59v3.37a3.35,3.35,0,0,1-.82,2.65,3.08,3.08,0,0,1-2.11.7,3.79,3.79,0,0,1-1.94-.48l.27-.81a3.25,3.25,0,0,0,1.7.46c1.08,0,1.87-.56,1.87-2v-.65h0a2.09,2.09,0,0,1-1.85,1A2.6,2.6,0,0,1,47.16,116,2.79,2.79,0,0,1,49.78,113a2,2,0,0,1,1.81,1h0l0-.87Zm-1.09,2.29a1.44,1.44,0,0,0-.06-.48A1.53,1.53,0,0,0,50,113.78c-1,0-1.72.85-1.72,2.2,0,1.14.57,2.08,1.71,2.08A1.54,1.54,0,0,0,51.41,117a1.81,1.81,0,0,0,.08-.56Z"
				/>
				<path
					fill="#231f20"
					d="M54.88,116.18a1.85,1.85,0,0,0,2,2,3.75,3.75,0,0,0,1.6-.3l.18.76a4.63,4.63,0,0,1-1.93.36,2.7,2.7,0,0,1-2.85-2.93c0-1.75,1-3.13,2.72-3.13a2.46,2.46,0,0,1,2.4,2.74,2.81,2.81,0,0,1,0,.49Zm3.09-.76a1.5,1.5,0,0,0-1.46-1.71,1.74,1.74,0,0,0-1.62,1.71Z"
				/>
				<rect
					fill="#414042"
					x="2.57"
					y="204.92"
					width="180"
					height="35.07"
					rx="3.24"
				/>
				<path
					fill="#fff"
					d="M75.27,224.71a3.68,3.68,0,0,0,1.87.53c1.07,0,1.69-.57,1.69-1.38s-.43-1.19-1.52-1.61c-1.32-.47-2.14-1.15-2.14-2.29a2.33,2.33,0,0,1,2.62-2.19,3.77,3.77,0,0,1,1.79.39l-.29.85a3.33,3.33,0,0,0-1.54-.38c-1.1,0-1.52.66-1.52,1.21,0,.76.49,1.13,1.61,1.56,1.36.53,2.06,1.19,2.06,2.38s-.92,2.32-2.83,2.32a4.25,4.25,0,0,1-2.06-.51Z"
				/>
				<path
					fill="#fff"
					d="M86.15,224.4c0,.6,0,1.13,0,1.58h-.94L85.2,225h0a2.2,2.2,0,0,1-1.92,1.07c-.91,0-2-.5-2-2.54v-3.39h1v3.21c0,1.11.34,1.85,1.3,1.85a1.52,1.52,0,0,0,1.39-1,1.57,1.57,0,0,0,.09-.54v-3.56h1.06Z"
				/>
				<path
					fill="#fff"
					d="M87.86,226c0-.39,0-1,0-1.5v-7h1v3.64h0a2.16,2.16,0,0,1,2-1.06c1.44,0,2.46,1.2,2.45,3,0,2.07-1.31,3.1-2.6,3.1a2.07,2.07,0,0,1-2-1.09h0l0,1ZM89,223.66a1.58,1.58,0,0,0,0,.38,1.62,1.62,0,0,0,1.58,1.23c1.1,0,1.76-.9,1.76-2.23,0-1.16-.6-2.16-1.72-2.16a1.69,1.69,0,0,0-1.61,1.3,1.71,1.71,0,0,0-.06.43Z"
				/>
				<path
					fill="#fff"
					d="M94.73,221.75c0-.6,0-1.09,0-1.57h.93l0,.93h0a2,2,0,0,1,1.83-1.06,1.71,1.71,0,0,1,1.64,1.16h0a2.35,2.35,0,0,1,.65-.76,2,2,0,0,1,1.28-.4c.77,0,1.91.5,1.91,2.51V226h-1V222.7c0-1.12-.41-1.79-1.26-1.79a1.36,1.36,0,0,0-1.25,1,1.64,1.64,0,0,0-.08.53V226h-1V222.5c0-.92-.41-1.59-1.21-1.59A1.45,1.45,0,0,0,95.85,222a1.5,1.5,0,0,0-.09.52V226h-1Z"
				/>
				<path
					fill="#fff"
					d="M105.92,218.55a.66.66,0,0,1-1.31,0,.64.64,0,0,1,.66-.66A.63.63,0,0,1,105.92,218.55ZM104.74,226v-5.8h1.06V226Z"
				/>
				<path
					fill="#fff"
					d="M108.82,218.51v1.67h1.51v.8h-1.51v3.13c0,.72.2,1.13.79,1.13a2.6,2.6,0,0,0,.61-.07l0,.79a2.67,2.67,0,0,1-.93.14,1.44,1.44,0,0,1-1.14-.44,2.15,2.15,0,0,1-.41-1.51V221h-.9v-.8h.9v-1.39Z"
				/>
			</svg>
		),
	},

	{
		name: "login-form-1",
		title: __("Login Form"),
		description: __("Login Form"),
		atts: {
			form: {
				styles: {
					gridTemplateColumns: { Desktop: "1fr " },
					gap: { Desktop: "1em" },
					display: { Desktop: "grid" },
				},
				options: { type: "loginForm" },
			},
			wrapper: {
				options: { tag: "div", class: "" },
				styles: { gridTemplateColumns: {}, gap: {}, display: {} },
			},
			visible: {},
			onSubmit: {
				0: { id: "validation", messages: [] },
				1: { id: "submitConfirm", messages: [] },
			},
			onProcess: {
				0: { id: "loggedInUser", message: "", showOnResponse: true },
				1: { id: "createEntry", message: "" },
			},
			afterSubmit: { 1: { id: "redirectToURL", value: "" } },
			blockId: "pg9d6a07354523",
			blockCssY: {
				items: {
					".pg9d6a07354523": {
						"grid-template-columns": {},
						gap: {},
						display: {},
					},
					".pg9d6a07354523 form": {
						"grid-template-columns": { Desktop: "1fr " },
						gap: { Desktop: "1em" },
						display: { Desktop: "grid" },
					},
				},
			},
		},
		isPro: false,

		innerBlocks: [
			[
				"post-grid/form-field-input",
				{
					wrapper: { options: { tag: "div", class: "" } },
					labelWrap: {
						options: { tag: "div", enable: true, class: "" },
						styles: { margin: { Desktop: "0px 0px 10px 0px" } },
					},
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: true,
							text: "Username/Email",
							class: "pg-form-field-label",
						},
					},
					input: {
						options: {
							type: "text",
							placeholder: "",
							value: "admin",
							name: "username",
							required: false,
							disabled: false,
							size: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							step: null,
							pattern: null,
							patternCustom: "",
							max: null,
							min: null,
							checked: false,
							autocomplete: false,
							id: "",
							class: "pg-form-field-input",
							position: "afterLabel",
						},
						styles: {
							border: { Desktop: "1px solid #b5b5b5" },
							borderRadius: { Desktop: "0px 0px 0px 0px" },
							padding: { Desktop: "5px 10px 5px 10px" },
							backgroundColor: { Desktop: "#ececec" },
							width: { Desktop: "100%" },
							maxWidth: { Desktop: "100%" },
						},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "Email should not empty",
							position: "afterInput",
							class: "",
						},
						styles: {
							color: { Desktop: "#c02121" },
							marginTop: { Desktop: "10px" },
						},
					},
					blockId: "pg9a328fd54a2e",
					blockCssY: {
						items: {
							".pg8539be28243d input": {},
							".pg9a328fd54a2e input": {
								border: { Desktop: "1px solid #b5b5b5" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"background-color": { Desktop: "#ececec" },
								width: { Desktop: "100%" },
								"max-width": { Desktop: "100%" },
							},
							".pg9a328fd54a2e .error-wrap": {
								color: { Desktop: "#c02121" },
								"margin-top": { Desktop: "10px" },
							},
							".pg9a328fd54a2e .label-wrap": {
								margin: { Desktop: "0px 0px 10px 0px" },
							},
						},
					},
				},
			],
			[
				"post-grid/form-field-input",
				{
					wrapper: { options: { tag: "div", class: "" } },
					labelWrap: {
						options: { tag: "div", enable: true, class: "" },
						styles: { margin: { Desktop: "0px 0px 10px 0px" } },
					},
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: true,
							text: "Password",
							class: "pg-form-field-label",
						},
					},
					input: {
						options: {
							type: "password",
							placeholder: "",
							value: "123456",
							name: "password",
							required: false,
							disabled: false,
							size: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							step: null,
							pattern: null,
							patternCustom: "",
							max: null,
							min: null,
							checked: false,
							autocomplete: false,
							id: "",
							class: "pg-form-field-input",
							position: "afterLabel",
						},
						styles: {
							border: { Desktop: "1px solid #b5b5b5" },
							borderRadius: { Desktop: "0px 0px 0px 0px" },
							padding: { Desktop: "5px 10px 5px 10px" },
							backgroundColor: { Desktop: "#ececec" },
							width: { Desktop: "100%" },
							maxWidth: { Desktop: "100%" },
						},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "Name should not empty",
							position: "afterInput",
							class: "",
						},
						styles: {
							color: { Desktop: "#c02121" },
							marginTop: { Desktop: "10px" },
						},
					},
					blockId: "pg8539be28243d",
					blockCssY: {
						items: {
							".pg8539be28243d input": {
								"background-color": { Desktop: "#ececec" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								border: { Desktop: "1px solid #b5b5b5" },
								"max-width": { Desktop: "100%" },
								width: { Desktop: "100%" },
							},
							".pg8539be28243d .error-wrap": {
								color: { Desktop: "#c02121" },
								"margin-top": { Desktop: "10px" },
							},
							".pg8539be28243d .label-wrap": {
								margin: { Desktop: "0px 0px 10px 0px" },
							},
						},
					},
				},
			],
			[
				"post-grid/form-field-input",
				{
					wrapper: {
						options: { tag: "div", class: "" },
						styles: { display: { Desktop: "flex" } },
					},
					labelWrap: {
						options: { tag: "div", enable: true, class: "" },
						styles: {
							order: { Desktop: "10" },
							margin: { Desktop: "0px 0px 0px 10px" },
						},
					},
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: true,
							text: "Remember?",
							class: "pg-form-field-label",
						},
					},
					input: {
						options: {
							type: "checkbox",
							placeholder: "Write your name",
							value: "",
							name: "remember",
							required: false,
							disabled: false,
							size: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							step: null,
							pattern: null,
							patternCustom: "",
							max: null,
							min: null,
							checked: false,
							autocomplete: false,
							id: "",
							class: "pg-form-field-input",
							position: "afterLabel",
						},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "",
							position: "afterInput",
							class: "",
						},
					},
					blockId: "pgfaeb744b8370",
					blockCssY: {
						items: {
							".pgfaeb744b8370": { display: { Desktop: "flex" } },
							".pgfaeb744b8370 .label-wrap": {
								order: { Desktop: "10" },
								margin: { Desktop: "0px 0px 0px 10px" },
							},
						},
					},
				},
			],
			[
				"post-grid/form-field-input",
				{
					wrapper: { options: { tag: "div", class: "" } },
					labelWrap: { options: { tag: "div", enable: true, class: "" } },
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: false,
							text: "Your Name",
							class: "pg-form-field-label",
						},
					},
					input: {
						options: {
							type: "submit",
							placeholder: "Write your name",
							value: "Login",
							name: "",
							required: false,
							disabled: false,
							size: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							step: null,
							pattern: null,
							patternCustom: "",
							max: null,
							min: null,
							checked: false,
							autocomplete: false,
							id: "",
							class: "pg-form-field-input",
							position: "afterLabel",
						},
						styles: {
							border: { Desktop: "1px solid #b5b5b5" },
							borderRadius: { Desktop: "0px 0px 0px 0px" },
							padding: { Desktop: "5px 10px 5px 10px" },
							backgroundColor: { Desktop: "#ececec" },
							width: { Desktop: "100%" },
							maxWidth: { Desktop: "100%" },
						},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "",
							position: "afterInput",
							class: "",
						},
					},
					blockId: "pg4670520d9df5",
					blockCssY: {
						items: {
							".pg8539be28243d input": {},
							".pg4670520d9df5 input": {
								border: { Desktop: "1px solid #b5b5b5" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"background-color": { Desktop: "#ececec" },
								width: { Desktop: "100%" },
								"max-width": { Desktop: "100%" },
							},
						},
					},
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 368.13 244.63">
				<rect
					fill="#bcbec0"
					x="4.06"
					y="55.12"
					width="360"
					height="33.44"
					rx="2.2"
				/>
				<path
					fill="#343738"
					d="M361.87,89.55H6.26a3.19,3.19,0,0,1-3.19-3.19v-29a3.19,3.19,0,0,1,3.19-3.19H361.87a3.19,3.19,0,0,1,3.19,3.19V86.36A3.19,3.19,0,0,1,361.87,89.55ZM6.26,56.12a1.19,1.19,0,0,0-1.19,1.19V86.36a1.19,1.19,0,0,0,1.19,1.19H361.87a1.19,1.19,0,0,0,1.19-1.19v-29a1.19,1.19,0,0,0-1.19-1.19Z"
				/>
				<rect
					fill="#bcbec0"
					x="4.06"
					y="103.58"
					width="360"
					height="33.44"
					rx="2.2"
				/>
				<path
					fill="#343738"
					d="M361.87,138H6.26a3.19,3.19,0,0,1-3.19-3.2v-29a3.19,3.19,0,0,1,3.19-3.2H361.87a3.19,3.19,0,0,1,3.19,3.2v29A3.19,3.19,0,0,1,361.87,138ZM6.26,104.58a1.19,1.19,0,0,0-1.19,1.2v29A1.19,1.19,0,0,0,6.26,136H361.87a1.19,1.19,0,0,0,1.19-1.2v-29a1.19,1.19,0,0,0-1.19-1.2Z"
				/>
				<path
					fill="#231f20"
					d="M22.27,71.57H19.13v2.91h3.5v.88H18.09V67.27h4.36v.88H19.13V70.7h3.14Z"
				/>
				<path
					fill="#231f20"
					d="M24,71.12c0-.6,0-1.09-.05-1.57h.92l.05.94h0a2,2,0,0,1,1.82-1.07,1.71,1.71,0,0,1,1.64,1.16h0a2.39,2.39,0,0,1,.64-.75,2,2,0,0,1,1.29-.41c.76,0,1.9.5,1.9,2.52v3.42h-1V72.07c0-1.11-.41-1.79-1.26-1.79a1.37,1.37,0,0,0-1.24,1,1.73,1.73,0,0,0-.09.53v3.59h-1V71.88c0-.92-.41-1.6-1.21-1.6a1.45,1.45,0,0,0-1.31,1.06,1.4,1.4,0,0,0-.08.51v3.51H24Z"
				/>
				<path
					fill="#231f20"
					d="M37.18,75.36l-.09-.74h0a2.16,2.16,0,0,1-1.78.87,1.65,1.65,0,0,1-1.77-1.67c0-1.4,1.25-2.17,3.49-2.16v-.12a1.19,1.19,0,0,0-1.32-1.34,2.93,2.93,0,0,0-1.51.43l-.24-.69a3.52,3.52,0,0,1,1.91-.52c1.77,0,2.2,1.21,2.2,2.37V74a8.44,8.44,0,0,0,.1,1.4Zm-.16-3c-1.15,0-2.46.18-2.46,1.31a.94.94,0,0,0,1,1,1.43,1.43,0,0,0,1.4-1A1,1,0,0,0,37,73.4Z"
				/>
				<path
					fill="#231f20"
					d="M40.92,67.92a.62.62,0,0,1-.67.65.63.63,0,0,1-.63-.65.64.64,0,0,1,.66-.66A.62.62,0,0,1,40.92,67.92Zm-1.17,7.44V69.55h1v5.81Z"
				/>
				<path fill="#231f20" d="M42.56,66.84h1v8.52h-1Z" />
				<path
					fill="#231f20"
					d="M53.18,72.41a2.84,2.84,0,0,1-2.89,3.08,2.76,2.76,0,0,1-2.78-3,2.83,2.83,0,0,1,2.88-3.08A2.74,2.74,0,0,1,53.18,72.41Zm-4.6.06c0,1.27.73,2.23,1.76,2.23s1.77-1,1.77-2.26c0-1-.5-2.23-1.74-2.23S48.58,71.36,48.58,72.47Z"
				/>
				<path
					fill="#231f20"
					d="M54.52,71.36c0-.68,0-1.27-.05-1.81h.93l0,1.14h0a1.74,1.74,0,0,1,1.61-1.27,1,1,0,0,1,.3,0v1a1.88,1.88,0,0,0-.36,0,1.49,1.49,0,0,0-1.42,1.36,3.37,3.37,0,0,0,0,.49v3.1h-1Z"
				/>
				<path
					fill="#231f20"
					d="M62.07,67.27v4.79c0,1.81.8,2.58,1.88,2.58s2-.8,2-2.58V67.27h1V72c0,2.48-1.3,3.5-3.06,3.5S61,74.54,61,72V67.27Z"
				/>
				<path
					fill="#231f20"
					d="M68.54,74.28a2.79,2.79,0,0,0,1.39.42c.76,0,1.12-.39,1.12-.87s-.3-.78-1.08-1.06c-1-.38-1.53-1-1.53-1.65a1.79,1.79,0,0,1,2-1.7,2.91,2.91,0,0,1,1.43.36l-.26.77a2.22,2.22,0,0,0-1.19-.34c-.63,0-1,.36-1,.79s.34.7,1.1,1c1,.38,1.52.88,1.52,1.75,0,1-.79,1.74-2.17,1.74a3.33,3.33,0,0,1-1.63-.4Z"
				/>
				<path
					fill="#231f20"
					d="M74,72.65a1.85,1.85,0,0,0,2,2,3.8,3.8,0,0,0,1.61-.3l.18.76a4.84,4.84,0,0,1-1.93.36A2.7,2.7,0,0,1,73,72.55c0-1.75,1-3.13,2.72-3.13a2.46,2.46,0,0,1,2.4,2.73,4.92,4.92,0,0,1,0,.5Zm3.09-.76a1.5,1.5,0,0,0-1.46-1.72A1.75,1.75,0,0,0,74,71.89Z"
				/>
				<path
					fill="#231f20"
					d="M79.44,71.36c0-.68,0-1.27,0-1.81h.92l0,1.14h0A1.75,1.75,0,0,1,82,69.42a1,1,0,0,1,.3,0v1a1.88,1.88,0,0,0-.36,0,1.5,1.5,0,0,0-1.42,1.36,3.47,3.47,0,0,0,0,.49v3.1h-1Z"
				/>
				<path
					fill="#231f20"
					d="M83.42,71.12c0-.6,0-1.09,0-1.57h.93l.06,1h0a2.13,2.13,0,0,1,1.92-1.09c.8,0,2,.48,2,2.47v3.47H87.3V72c0-.94-.35-1.72-1.34-1.72a1.51,1.51,0,0,0-1.42,1.08,1.55,1.55,0,0,0-.07.5v3.49h-1Z"
				/>
				<path
					fill="#231f20"
					d="M93.29,75.36l-.08-.74h0a2.16,2.16,0,0,1-1.78.87,1.65,1.65,0,0,1-1.77-1.67c0-1.4,1.25-2.17,3.49-2.16v-.12a1.19,1.19,0,0,0-1.32-1.34,2.93,2.93,0,0,0-1.51.43L90,69.94A3.55,3.55,0,0,1,92,69.42c1.77,0,2.2,1.21,2.2,2.37V74a8.44,8.44,0,0,0,.1,1.4Zm-.16-3c-1.15,0-2.45.18-2.45,1.31a.93.93,0,0,0,1,1,1.43,1.43,0,0,0,1.4-1,1,1,0,0,0,.06-.34Z"
				/>
				<path
					fill="#231f20"
					d="M95.86,71.12c0-.6,0-1.09,0-1.57h.92l0,.94h0a2,2,0,0,1,1.82-1.07,1.71,1.71,0,0,1,1.64,1.16h0a2.42,2.42,0,0,1,.65-.75,1.93,1.93,0,0,1,1.28-.41c.77,0,1.91.5,1.91,2.52v3.42h-1V72.07c0-1.11-.4-1.79-1.25-1.79a1.38,1.38,0,0,0-1.25,1,1.73,1.73,0,0,0-.09.53v3.59h-1V71.88c0-.92-.4-1.6-1.21-1.6A1.45,1.45,0,0,0,97,71.34a1.4,1.4,0,0,0-.08.51v3.51h-1Z"
				/>
				<path
					fill="#231f20"
					d="M106.46,72.65a1.85,1.85,0,0,0,2,2,3.75,3.75,0,0,0,1.6-.3l.18.76a4.8,4.8,0,0,1-1.93.36,2.69,2.69,0,0,1-2.85-2.93c0-1.75,1-3.13,2.72-3.13a2.46,2.46,0,0,1,2.4,2.73,4.36,4.36,0,0,1,0,.5Zm3.09-.76a1.51,1.51,0,0,0-1.46-1.72,1.75,1.75,0,0,0-1.62,1.72Z"
				/>
				<path
					fill="#231f20"
					d="M18.09,115.83a12.57,12.57,0,0,1,2-.15,3.34,3.34,0,0,1,2.27.67,2.18,2.18,0,0,1,.71,1.69,2.38,2.38,0,0,1-.63,1.73,3.34,3.34,0,0,1-2.47.89,3.58,3.58,0,0,1-.84-.08v3.24h-1Zm1,3.9a3.52,3.52,0,0,0,.87.09c1.25,0,2-.61,2-1.73s-.75-1.58-1.9-1.58a4.36,4.36,0,0,0-1,.08Z"
				/>
				<path
					fill="#231f20"
					d="M27.34,123.82l-.08-.73h0a2.15,2.15,0,0,1-1.78.86,1.65,1.65,0,0,1-1.77-1.66c0-1.41,1.25-2.17,3.49-2.16V120a1.2,1.2,0,0,0-1.32-1.35,2.84,2.84,0,0,0-1.51.44l-.24-.7a3.61,3.61,0,0,1,1.91-.51c1.77,0,2.2,1.21,2.2,2.37v2.17a8.32,8.32,0,0,0,.1,1.39Zm-.16-3c-1.15,0-2.46.18-2.46,1.31a.93.93,0,0,0,1,1,1.42,1.42,0,0,0,1.4-1,.92.92,0,0,0,.06-.33Z"
				/>
				<path
					fill="#231f20"
					d="M29.76,122.74a2.76,2.76,0,0,0,1.4.42c.76,0,1.12-.38,1.12-.86s-.3-.78-1.08-1.07c-1-.37-1.53-1-1.53-1.64a1.78,1.78,0,0,1,2-1.7,2.83,2.83,0,0,1,1.43.36l-.27.76a2.25,2.25,0,0,0-1.18-.33c-.63,0-1,.36-1,.79s.34.69,1.1,1c1,.39,1.52.89,1.52,1.75,0,1-.79,1.74-2.17,1.74a3.33,3.33,0,0,1-1.63-.39Z"
				/>
				<path
					fill="#231f20"
					d="M34.52,122.74a2.69,2.69,0,0,0,1.39.42c.77,0,1.12-.38,1.12-.86s-.29-.78-1.07-1.07c-1.05-.37-1.54-1-1.54-1.64a1.79,1.79,0,0,1,2-1.7,2.81,2.81,0,0,1,1.43.36l-.26.76a2.32,2.32,0,0,0-1.19-.33c-.62,0-1,.36-1,.79s.35.69,1.1,1c1,.39,1.52.89,1.52,1.75,0,1-.79,1.74-2.17,1.74a3.33,3.33,0,0,1-1.63-.39Z"
				/>
				<path
					fill="#231f20"
					d="M39.83,118l.77,3c.17.65.32,1.25.43,1.85h0c.13-.59.32-1.22.51-1.84l1-3h.89l.9,2.9c.21.7.38,1.31.51,1.9h0a19.29,19.29,0,0,1,.44-1.89l.83-2.91h1l-1.87,5.8h-1l-.88-2.77a17.16,17.16,0,0,1-.52-1.9h0a19.58,19.58,0,0,1-.53,1.91l-.94,2.76h-1L38.75,118Z"
				/>
				<path
					fill="#231f20"
					d="M53.38,120.87A2.83,2.83,0,0,1,50.49,124a2.76,2.76,0,0,1-2.79-3,2.84,2.84,0,0,1,2.88-3.08A2.75,2.75,0,0,1,53.38,120.87Zm-4.61.06c0,1.27.73,2.23,1.76,2.23s1.77-.94,1.77-2.25c0-1-.49-2.23-1.74-2.23S48.77,119.83,48.77,120.93Z"
				/>
				<path
					fill="#231f20"
					d="M54.71,119.83c0-.68,0-1.27-.05-1.81h.93l0,1.14h.05a1.75,1.75,0,0,1,1.61-1.27,1.39,1.39,0,0,1,.3,0v1a1.32,1.32,0,0,0-.36,0,1.5,1.5,0,0,0-1.42,1.36,3.47,3.47,0,0,0,0,.49v3.09h-1Z"
				/>
				<path
					fill="#231f20"
					d="M63.53,115.31v7c0,.52,0,1.11,0,1.5h-.95l-.05-1h0a2.16,2.16,0,0,1-2,1.13c-1.4,0-2.48-1.18-2.48-3,0-1.93,1.18-3.11,2.6-3.11a1.94,1.94,0,0,1,1.75.88h0v-3.46Zm-1.06,5.07a2.18,2.18,0,0,0,0-.44,1.56,1.56,0,0,0-1.53-1.23c-1.09,0-1.74,1-1.74,2.25s.58,2.14,1.72,2.14a1.6,1.6,0,0,0,1.55-1.26,2.09,2.09,0,0,0,0-.45Z"
				/>
				<rect
					fill="#414042"
					x="4.06"
					y="154.44"
					width="180"
					height="35.07"
					rx="3.24"
				/>
				<path fill="#fff" d="M80.88,167.42h1.05v7.2h3.45v.88h-4.5Z" />
				<path
					fill="#fff"
					d="M91.6,172.55a2.83,2.83,0,0,1-2.89,3.08,2.76,2.76,0,0,1-2.79-3,2.84,2.84,0,0,1,2.88-3.09A2.76,2.76,0,0,1,91.6,172.55Zm-4.61.06c0,1.27.73,2.23,1.76,2.23s1.77-1,1.77-2.25c0-1-.49-2.23-1.74-2.23S87,171.51,87,172.61Z"
				/>
				<path
					fill="#fff"
					d="M97.93,169.7c0,.42-.05.88-.05,1.59v3.37a3.35,3.35,0,0,1-.82,2.65A3.08,3.08,0,0,1,95,178a3.79,3.79,0,0,1-1.94-.48l.27-.81a3.25,3.25,0,0,0,1.7.46c1.08,0,1.87-.56,1.87-2v-.64h0a2.09,2.09,0,0,1-1.85,1,2.6,2.6,0,0,1-2.47-2.83,2.79,2.79,0,0,1,2.62-3.09,2,2,0,0,1,1.81,1h0l.05-.87ZM96.84,172a1.44,1.44,0,0,0-.06-.48,1.53,1.53,0,0,0-1.47-1.12c-1,0-1.73.85-1.73,2.2,0,1.14.57,2.08,1.71,2.08a1.54,1.54,0,0,0,1.47-1.08,1.81,1.81,0,0,0,.08-.56Z"
				/>
				<path
					fill="#fff"
					d="M100.74,168.06a.62.62,0,0,1-.67.65.65.65,0,0,1,0-1.3A.62.62,0,0,1,100.74,168.06Zm-1.17,7.44v-5.8h1.05v5.8Z"
				/>
				<path
					fill="#fff"
					d="M102.37,171.27c0-.6,0-1.09,0-1.57h.93l.06,1h0a2.12,2.12,0,0,1,1.92-1.1c.8,0,2,.48,2,2.48v3.46h-1.06v-3.35c0-.93-.35-1.71-1.34-1.71a1.5,1.5,0,0,0-1.42,1.08,1.45,1.45,0,0,0-.07.49v3.49h-1.06Z"
				/>
			</svg>
		),
	},

	{
		name: "registration-form-1",
		title: __("Registration Form"),
		description: __("Registration Form"),
		atts: {
			form: {
				styles: {
					gridTemplateColumns: { Desktop: "1fr " },
					gap: { Desktop: "1em" },
					display: { Desktop: "grid" },
				},
				options: { type: "registerForm" },
			},
			wrapper: {
				options: { tag: "div", class: "" },
				styles: { gridTemplateColumns: {}, gap: {}, display: {} },
			},
			visible: {},
			onSubmit: {
				0: { id: "validation", messages: [] },
				1: { id: "submitConfirm", messages: [] },
			},
			onProcess: {
				0: { id: "registerUser", message: "", showOnResponse: true },
				1: { id: "createEntry", message: "", showOnResponse: false },
			},
			afterSubmit: { 0: { id: "showResponse", message: "" } },
			blockId: "pg9d6a07354523",
			blockCssY: {
				items: {
					".pg9d6a07354523": {
						"grid-template-columns": {},
						gap: {},
						display: {},
					},
					".pg9d6a07354523 form": {
						"grid-template-columns": { Desktop: "1fr " },
						gap: { Desktop: "1em" },
						display: { Desktop: "grid" },
					},
				},
			},
		},
		isPro: false,

		innerBlocks: [
			[
				"post-grid/form-field-input",
				{
					wrapper: { options: { tag: "div", class: "" } },
					labelWrap: {
						options: { tag: "div", enable: true, class: "" },
						styles: { margin: { Desktop: "0px 0px 10px 0px" } },
					},
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: true,
							text: "Email ",
							class: "pg-form-field-label",
						},
					},
					input: {
						options: {
							type: "text",
							placeholder: "",
							value: "admin",
							name: "email",
							required: false,
							disabled: false,
							size: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							step: null,
							pattern: null,
							patternCustom: "",
							max: null,
							min: null,
							checked: false,
							autocomplete: false,
							id: "",
							class: "pg-form-field-input",
							position: "afterLabel",
						},
						styles: {
							border: { Desktop: "1px solid #b5b5b5" },
							borderRadius: { Desktop: "0px 0px 0px 0px" },
							padding: { Desktop: "5px 10px 5px 10px" },
							backgroundColor: { Desktop: "#ececec" },
							width: { Desktop: "100%" },
							maxWidth: { Desktop: "100%" },
						},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "Email should not empty",
							position: "afterInput",
							class: "",
						},
						styles: {
							color: { Desktop: "#c02121" },
							marginTop: { Desktop: "10px" },
						},
					},
					blockId: "pg9a328fd54a2e",
					blockCssY: {
						items: {
							".pg8539be28243d input": {},
							".pg9a328fd54a2e input": {
								border: { Desktop: "1px solid #b5b5b5" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"background-color": { Desktop: "#ececec" },
								width: { Desktop: "100%" },
								"max-width": { Desktop: "100%" },
							},
							".pg9a328fd54a2e .error-wrap": {
								color: { Desktop: "#c02121" },
								"margin-top": { Desktop: "10px" },
							},
							".pg9a328fd54a2e .label-wrap": {
								margin: { Desktop: "0px 0px 10px 0px" },
							},
						},
					},
				},
			],
			[
				"post-grid/form-field-input",
				{
					wrapper: { options: { tag: "div", class: "" } },
					labelWrap: {
						options: { tag: "div", enable: true, class: "" },
						styles: { margin: { Desktop: "0px 0px 10px 0px" } },
					},
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: true,
							text: "Password",
							class: "pg-form-field-label",
						},
					},
					input: {
						options: {
							type: "password",
							placeholder: "",
							value: "123456",
							name: "password",
							required: false,
							disabled: false,
							size: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							step: null,
							pattern: null,
							patternCustom: "",
							max: null,
							min: null,
							checked: false,
							autocomplete: false,
							id: "",
							class: "pg-form-field-input",
							position: "afterLabel",
						},
						styles: {
							border: { Desktop: "1px solid #b5b5b5" },
							borderRadius: { Desktop: "0px 0px 0px 0px" },
							padding: { Desktop: "5px 10px 5px 10px" },
							backgroundColor: { Desktop: "#ececec" },
							width: { Desktop: "100%" },
							maxWidth: { Desktop: "100%" },
						},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "Name should not empty",
							position: "afterInput",
							class: "",
						},
						styles: {
							color: { Desktop: "#c02121" },
							marginTop: { Desktop: "10px" },
						},
					},
					blockId: "pg8539be28243d",
					blockCssY: {
						items: {
							".pg8539be28243d input": {
								"background-color": { Desktop: "#ececec" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								border: { Desktop: "1px solid #b5b5b5" },
								"max-width": { Desktop: "100%" },
								width: { Desktop: "100%" },
							},
							".pg8539be28243d .error-wrap": {
								color: { Desktop: "#c02121" },
								"margin-top": { Desktop: "10px" },
							},
							".pg8539be28243d .label-wrap": {
								margin: { Desktop: "0px 0px 10px 0px" },
							},
						},
					},
				},
			],
			[
				"post-grid/form-field-input",
				{
					wrapper: { options: { tag: "div", class: "" } },
					labelWrap: {
						options: { tag: "div", enable: true, class: "" },
						styles: { margin: { Desktop: "0px 0px 10px 0px" } },
					},
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: true,
							text: "Confirm Password",
							class: "pg-form-field-label",
						},
					},
					input: {
						options: {
							type: "password",
							placeholder: "",
							value: "",
							name: "password_confirm",
							required: false,
							disabled: false,
							size: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							step: null,
							pattern: null,
							patternCustom: "",
							max: null,
							min: null,
							checked: false,
							autocomplete: false,
							id: "",
							class: "pg-form-field-input",
							position: "afterLabel",
						},
						styles: {
							border: { Desktop: "1px solid #b5b5b5" },
							borderRadius: { Desktop: "0px 0px 0px 0px" },
							padding: { Desktop: "5px 10px 5px 10px" },
							backgroundColor: { Desktop: "#ececec" },
							width: { Desktop: "100%" },
							maxWidth: { Desktop: "100%" },
						},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "Name should not empty",
							position: "afterInput",
							class: "",
						},
						styles: {
							color: { Desktop: "#c02121" },
							marginTop: { Desktop: "10px" },
						},
					},
					blockId: "pg8539be28243a",
					blockCssY: {
						items: {
							".pg8539be28243a input": {
								"background-color": { Desktop: "#ececec" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								border: { Desktop: "1px solid #b5b5b5" },
								"max-width": { Desktop: "100%" },
								width: { Desktop: "100%" },
							},
							".pg8539be28243a .error-wrap": {
								color: { Desktop: "#c02121" },
								"margin-top": { Desktop: "10px" },
							},
							".pg8539be28243a .label-wrap": {
								margin: { Desktop: "0px 0px 10px 0px" },
							},
						},
					},
				},
			],
			[
				"post-grid/form-field-input",
				{
					wrapper: { options: { tag: "div", class: "" } },
					labelWrap: { options: { tag: "div", enable: true, class: "" } },
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: false,
							text: "Your Name",
							class: "pg-form-field-label",
						},
					},
					input: {
						options: {
							type: "submit",
							placeholder: "",
							value: "Register",
							name: "",
							required: false,
							disabled: false,
							size: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							step: null,
							pattern: null,
							patternCustom: "",
							max: null,
							min: null,
							checked: false,
							autocomplete: false,
							id: "",
							class: "pg-form-field-input",
							position: "afterLabel",
						},
						styles: {
							border: { Desktop: "1px solid #b5b5b5" },
							borderRadius: { Desktop: "0px 0px 0px 0px" },
							padding: { Desktop: "5px 10px 5px 10px" },
							backgroundColor: { Desktop: "#ececec" },
							width: { Desktop: "100%" },
							maxWidth: { Desktop: "100%" },
						},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "",
							position: "afterInput",
							class: "",
						},
					},
					blockId: "pg4670520d9df5",
					blockCssY: {
						items: {
							".pg8539be28243d input": {},
							".pg4670520d9df5 input": {
								border: { Desktop: "1px solid #b5b5b5" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"background-color": { Desktop: "#ececec" },
								width: { Desktop: "100%" },
								"max-width": { Desktop: "100%" },
							},
						},
					},
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 368.13 244.63">
				<rect
					fill="#bcbec0"
					x="4.06"
					y="32.08"
					width="360"
					height="33.44"
					rx="2.2"
				/>
				<path
					fill="#414042"
					d="M361.87,66.52H6.26a3.21,3.21,0,0,1-3.2-3.2v-29a3.2,3.2,0,0,1,3.2-3.2H361.87a3.19,3.19,0,0,1,3.19,3.2v29A3.2,3.2,0,0,1,361.87,66.52ZM6.26,33.08a1.2,1.2,0,0,0-1.2,1.2v29a1.2,1.2,0,0,0,1.2,1.2H361.87a1.19,1.19,0,0,0,1.19-1.2v-29a1.19,1.19,0,0,0-1.19-1.2Z"
				/>
				<rect
					fill="#bcbec0"
					x="4.06"
					y="80.55"
					width="360"
					height="33.44"
					rx="2.2"
				/>
				<path
					fill="#414042"
					d="M361.87,115H6.26a3.2,3.2,0,0,1-3.2-3.19V82.74a3.2,3.2,0,0,1,3.2-3.19H361.87a3.19,3.19,0,0,1,3.19,3.19v29.05A3.19,3.19,0,0,1,361.87,115ZM6.26,81.55a1.19,1.19,0,0,0-1.2,1.19v29.05A1.19,1.19,0,0,0,6.26,113H361.87a1.19,1.19,0,0,0,1.19-1.19V82.74a1.19,1.19,0,0,0-1.19-1.19Z"
				/>
				<rect
					fill="#414042"
					x="4.27"
					y="177.48"
					width="180"
					height="35.07"
					rx="3.24"
				/>
				<path
					fill="#231f20"
					d="M22.27,48.53H19.13v2.92h3.5v.87H18.09V44.24h4.36v.87H19.13v2.56h3.14Z"
				/>
				<path
					fill="#231f20"
					d="M24,48.09c0-.6,0-1.09-.05-1.57h.92l.05.93h0a2,2,0,0,1,1.82-1.07,1.71,1.71,0,0,1,1.64,1.17h0a2.33,2.33,0,0,1,.64-.76,2,2,0,0,1,1.29-.41c.76,0,1.9.51,1.9,2.52v3.42h-1V49c0-1.11-.41-1.78-1.26-1.78a1.35,1.35,0,0,0-1.24,1,1.61,1.61,0,0,0-.09.52v3.59h-1V48.84c0-.92-.41-1.59-1.21-1.59a1.45,1.45,0,0,0-1.31,1,1.49,1.49,0,0,0-.08.52v3.5H24Z"
				/>
				<path
					fill="#231f20"
					d="M37.18,52.32l-.08-.73h0a2.19,2.19,0,0,1-1.78.86,1.65,1.65,0,0,1-1.77-1.66c0-1.41,1.25-2.18,3.49-2.16v-.12a1.2,1.2,0,0,0-1.32-1.35,2.84,2.84,0,0,0-1.51.44l-.24-.7a3.61,3.61,0,0,1,1.91-.52c1.77,0,2.2,1.22,2.2,2.38v2.17a8.4,8.4,0,0,0,.1,1.39Zm-.16-3c-1.15,0-2.46.18-2.46,1.31a.93.93,0,0,0,1,1,1.44,1.44,0,0,0,1.4-1,1,1,0,0,0,.06-.33Z"
				/>
				<path
					fill="#231f20"
					d="M40.92,44.88a.62.62,0,0,1-.67.65.63.63,0,0,1-.63-.65.63.63,0,0,1,.66-.65A.62.62,0,0,1,40.92,44.88Zm-1.17,7.44v-5.8h1v5.8Z"
				/>
				<path fill="#231f20" d="M42.56,43.81h1v8.51h-1Z" />
				<path
					fill="#231f20"
					d="M18.09,92.8a12.38,12.38,0,0,1,2-.16,3.29,3.29,0,0,1,2.27.68A2.18,2.18,0,0,1,23.07,95a2.36,2.36,0,0,1-.63,1.72,3.34,3.34,0,0,1-2.47.89,3.61,3.61,0,0,1-.84-.07v3.24h-1Zm1,3.9a3.58,3.58,0,0,0,.87.08c1.25,0,2-.61,2-1.73s-.75-1.58-1.9-1.58a4.21,4.21,0,0,0-1,.09Z"
				/>
				<path
					fill="#231f20"
					d="M27.34,100.79l-.08-.73h0a2.19,2.19,0,0,1-1.78.86,1.65,1.65,0,0,1-1.77-1.67c0-1.4,1.25-2.17,3.49-2.16V97a1.19,1.19,0,0,0-1.32-1.34,2.93,2.93,0,0,0-1.51.43l-.24-.69A3.52,3.52,0,0,1,26,94.85c1.77,0,2.2,1.21,2.2,2.38V99.4a8.4,8.4,0,0,0,.1,1.39Zm-.16-3c-1.15,0-2.46.18-2.46,1.31a.94.94,0,0,0,1,1,1.43,1.43,0,0,0,1.4-1,1,1,0,0,0,.06-.34Z"
				/>
				<path
					fill="#231f20"
					d="M29.76,99.71a2.86,2.86,0,0,0,1.4.42c.76,0,1.12-.39,1.12-.87s-.3-.78-1.08-1.06c-1-.38-1.53-1-1.53-1.65a1.79,1.79,0,0,1,2-1.7,2.94,2.94,0,0,1,1.43.36l-.27.77a2.15,2.15,0,0,0-1.18-.34c-.63,0-1,.36-1,.79s.34.7,1.1,1c1,.38,1.52.88,1.52,1.75s-.79,1.74-2.17,1.74a3.33,3.33,0,0,1-1.63-.4Z"
				/>
				<path
					fill="#231f20"
					d="M34.52,99.71a2.79,2.79,0,0,0,1.39.42c.77,0,1.12-.39,1.12-.87s-.3-.78-1.07-1.06c-1.05-.38-1.54-1-1.54-1.65a1.79,1.79,0,0,1,2-1.7,2.91,2.91,0,0,1,1.43.36l-.26.77a2.22,2.22,0,0,0-1.19-.34c-.62,0-1,.36-1,.79s.35.7,1.1,1c1,.38,1.52.88,1.52,1.75s-.79,1.74-2.17,1.74a3.33,3.33,0,0,1-1.63-.4Z"
				/>
				<path
					fill="#231f20"
					d="M39.83,95l.77,3c.17.65.32,1.25.43,1.85h0c.13-.59.32-1.21.51-1.84l1-3h.89l.9,2.9c.21.7.38,1.31.51,1.9h0a18.49,18.49,0,0,1,.44-1.88L46.14,95h1l-1.87,5.81h-1L43.47,98A17.33,17.33,0,0,1,43,96.11h0A19.79,19.79,0,0,1,42.4,98l-.94,2.76h-1L38.75,95Z"
				/>
				<path
					fill="#231f20"
					d="M53.38,97.84a2.84,2.84,0,0,1-2.89,3.08,2.77,2.77,0,0,1-2.79-3,2.84,2.84,0,0,1,2.88-3.08A2.75,2.75,0,0,1,53.38,97.84Zm-4.61.06c0,1.27.73,2.23,1.76,2.23s1.77-.95,1.77-2.26c0-1-.49-2.23-1.74-2.23S48.77,96.79,48.77,97.9Z"
				/>
				<path
					fill="#231f20"
					d="M54.71,96.79c0-.68,0-1.27-.05-1.81h.93l0,1.14h.05a1.75,1.75,0,0,1,1.61-1.27,1,1,0,0,1,.3,0v1a1.94,1.94,0,0,0-.36,0A1.49,1.49,0,0,0,55.8,97.2a3.6,3.6,0,0,0,0,.49v3.1h-1Z"
				/>
				<path
					fill="#231f20"
					d="M63.53,92.27v7c0,.51,0,1.1,0,1.5h-.95l-.05-1h0a2.15,2.15,0,0,1-2,1.14c-1.4,0-2.48-1.19-2.48-3,0-1.93,1.18-3.12,2.6-3.12a1.93,1.93,0,0,1,1.75.89h0V92.27Zm-1.06,5.08a2.22,2.22,0,0,0,0-.45,1.56,1.56,0,0,0-1.53-1.22c-1.09,0-1.74,1-1.74,2.24s.58,2.15,1.72,2.15a1.6,1.6,0,0,0,1.55-1.26,2.25,2.25,0,0,0,0-.46Z"
				/>
				<rect
					fill="#bcbec0"
					x="4.06"
					y="129.01"
					width="360"
					height="33.44"
					rx="2.2"
				/>
				<path
					fill="#414042"
					d="M361.87,163.45H6.26a3.2,3.2,0,0,1-3.2-3.2v-29a3.21,3.21,0,0,1,3.2-3.2H361.87a3.2,3.2,0,0,1,3.19,3.2v29A3.19,3.19,0,0,1,361.87,163.45ZM6.26,130a1.2,1.2,0,0,0-1.2,1.2v29a1.2,1.2,0,0,0,1.2,1.2H361.87a1.19,1.19,0,0,0,1.19-1.2v-29a1.19,1.19,0,0,0-1.19-1.2Z"
				/>
				<path
					fill="#231f20"
					d="M18.09,141.27a11.33,11.33,0,0,1,2-.16,3.34,3.34,0,0,1,2.27.67,2.19,2.19,0,0,1,.71,1.69,2.38,2.38,0,0,1-.63,1.73,3.34,3.34,0,0,1-2.47.89,4.25,4.25,0,0,1-.84-.07v3.23h-1Zm1,3.89a3.52,3.52,0,0,0,.87.09c1.25,0,2-.61,2-1.73s-.75-1.58-1.9-1.58a4.36,4.36,0,0,0-1,.08Z"
				/>
				<path
					fill="#231f20"
					d="M27.34,149.25l-.08-.73h0a2.17,2.17,0,0,1-1.78.87,1.65,1.65,0,0,1-1.77-1.67c0-1.41,1.25-2.17,3.49-2.16v-.12a1.19,1.19,0,0,0-1.32-1.34,2.84,2.84,0,0,0-1.51.43l-.24-.7a3.61,3.61,0,0,1,1.91-.51c1.77,0,2.2,1.21,2.2,2.37v2.17a8.24,8.24,0,0,0,.1,1.39Zm-.16-3c-1.15,0-2.46.18-2.46,1.31a.94.94,0,0,0,1,1,1.42,1.42,0,0,0,1.4-1,.92.92,0,0,0,.06-.33Z"
				/>
				<path
					fill="#231f20"
					d="M29.76,148.17a2.76,2.76,0,0,0,1.4.42c.76,0,1.12-.38,1.12-.86s-.3-.78-1.08-1.07c-1-.37-1.53-.94-1.53-1.64a1.78,1.78,0,0,1,2-1.7,2.83,2.83,0,0,1,1.43.36l-.27.76a2.25,2.25,0,0,0-1.18-.33c-.63,0-1,.36-1,.79s.34.7,1.1,1c1,.39,1.52.89,1.52,1.75,0,1-.79,1.74-2.17,1.74A3.33,3.33,0,0,1,29.5,149Z"
				/>
				<path
					fill="#231f20"
					d="M34.52,148.17a2.69,2.69,0,0,0,1.39.42c.77,0,1.12-.38,1.12-.86s-.3-.78-1.07-1.07c-1.05-.37-1.54-.94-1.54-1.64a1.79,1.79,0,0,1,2-1.7,2.81,2.81,0,0,1,1.43.36l-.26.76a2.32,2.32,0,0,0-1.19-.33c-.62,0-1,.36-1,.79s.35.7,1.1,1c1,.39,1.52.89,1.52,1.75,0,1-.79,1.74-2.17,1.74a3.33,3.33,0,0,1-1.63-.39Z"
				/>
				<path
					fill="#231f20"
					d="M39.83,143.45l.77,3c.17.65.32,1.25.43,1.85h0c.13-.59.32-1.22.51-1.84l1-3h.89l.9,2.9c.21.7.38,1.31.51,1.9h0a19.29,19.29,0,0,1,.44-1.89l.83-2.91h1l-1.87,5.8h-1l-.88-2.77a16.58,16.58,0,0,1-.52-1.9h0a19.58,19.58,0,0,1-.53,1.91l-.94,2.76h-1l-1.75-5.8Z"
				/>
				<path
					fill="#231f20"
					d="M53.38,146.3a2.84,2.84,0,0,1-2.89,3.09,2.77,2.77,0,0,1-2.79-3,2.84,2.84,0,0,1,2.88-3.08A2.75,2.75,0,0,1,53.38,146.3Zm-4.61.06c0,1.27.73,2.23,1.76,2.23s1.77-.94,1.77-2.25c0-1-.49-2.23-1.74-2.23S48.77,145.26,48.77,146.36Z"
				/>
				<path
					fill="#231f20"
					d="M54.71,145.26c0-.68,0-1.27-.05-1.81h.93l0,1.14h.05a1.75,1.75,0,0,1,1.61-1.27,1.39,1.39,0,0,1,.3,0v1a1.32,1.32,0,0,0-.36,0,1.5,1.5,0,0,0-1.42,1.36,3.47,3.47,0,0,0,0,.49v3.09h-1Z"
				/>
				<path
					fill="#231f20"
					d="M63.53,140.74v7c0,.52,0,1.11,0,1.5h-.95l-.05-1h0a2.17,2.17,0,0,1-2,1.14c-1.4,0-2.48-1.19-2.48-2.95,0-1.94,1.18-3.12,2.6-3.12a1.94,1.94,0,0,1,1.75.88h0v-3.46Zm-1.06,5.07a2.18,2.18,0,0,0,0-.44,1.57,1.57,0,0,0-1.53-1.23c-1.09,0-1.74,1-1.74,2.25s.58,2.14,1.72,2.14a1.59,1.59,0,0,0,1.55-1.26,2.09,2.09,0,0,0,0-.45Z"
				/>
				<path
					fill="#231f20"
					d="M73.51,149a5.2,5.2,0,0,1-2.13.38,3.78,3.78,0,0,1-4-4.09A4,4,0,0,1,71.61,141a4.2,4.2,0,0,1,1.91.36l-.25.85a3.8,3.8,0,0,0-1.63-.34,3,3,0,0,0-3.15,3.34,2.94,2.94,0,0,0,3.1,3.25,4.1,4.1,0,0,0,1.71-.34Z"
				/>
				<path
					fill="#231f20"
					d="M79.91,146.3A2.84,2.84,0,0,1,77,149.39a2.76,2.76,0,0,1-2.78-3,2.83,2.83,0,0,1,2.87-3.08A2.75,2.75,0,0,1,79.91,146.3Zm-4.61.06c0,1.27.74,2.23,1.77,2.23s1.76-.94,1.76-2.25c0-1-.49-2.23-1.74-2.23S75.3,145.26,75.3,146.36Z"
				/>
				<path
					fill="#231f20"
					d="M81.24,145c0-.6,0-1.09,0-1.57h.93l.06,1h0a2.13,2.13,0,0,1,1.92-1.09c.8,0,2,.48,2,2.47v3.46H85.13v-3.34c0-.94-.35-1.72-1.34-1.72a1.5,1.5,0,0,0-1.42,1.08,1.45,1.45,0,0,0-.07.49v3.49H81.24Z"
				/>
				<path
					fill="#231f20"
					d="M88,149.25v-5H87.2v-.8H88v-.31a2.32,2.32,0,0,1,2.53-2.53A2.88,2.88,0,0,1,92,141l-.3.8a2.23,2.23,0,0,0-1.23-.33c-1.11,0-1.43.78-1.43,1.7v.29h3.37v5.8H91.38v-5H89.06v5Z"
				/>
				<path
					fill="#231f20"
					d="M94.18,145.26c0-.68,0-1.27-.05-1.81h.93l0,1.14h0a1.74,1.74,0,0,1,1.61-1.27,1.39,1.39,0,0,1,.3,0v1a1.32,1.32,0,0,0-.36,0,1.49,1.49,0,0,0-1.42,1.36,3.37,3.37,0,0,0,0,.49v3.09h-1Z"
				/>
				<path
					fill="#231f20"
					d="M98.15,145c0-.6,0-1.09-.05-1.57H99l0,.93h0a2,2,0,0,1,1.82-1.06,1.72,1.72,0,0,1,1.65,1.16h0a2.46,2.46,0,0,1,.65-.76,2,2,0,0,1,1.28-.4c.77,0,1.91.5,1.91,2.52v3.41h-1V146c0-1.12-.41-1.79-1.26-1.79a1.36,1.36,0,0,0-1.25,1,1.69,1.69,0,0,0-.08.53v3.58h-1v-3.48c0-.92-.41-1.59-1.22-1.59a1.44,1.44,0,0,0-1.3,1.06,1.4,1.4,0,0,0-.09.51v3.5h-1Z"
				/>
				<path
					fill="#fff"
					d="M77.11,190.56a10.58,10.58,0,0,1,2-.17,3.36,3.36,0,0,1,2.34.66,2,2,0,0,1,.63,1.54,2.13,2.13,0,0,1-1.52,2.06v0a2,2,0,0,1,1.19,1.63,12.89,12.89,0,0,0,.62,2.22H81.29a11,11,0,0,1-.54-1.94c-.24-1.11-.67-1.53-1.62-1.57h-1v3.51h-1Zm1,3.68h1.07c1.11,0,1.82-.61,1.82-1.53s-.76-1.5-1.86-1.51a4.3,4.3,0,0,0-1,.09Z"
				/>
				<path
					fill="#fff"
					d="M84.16,195.82a1.87,1.87,0,0,0,2,2,3.8,3.8,0,0,0,1.61-.3l.18.76a4.84,4.84,0,0,1-1.93.36,2.7,2.7,0,0,1-2.86-2.93c0-1.75,1-3.13,2.73-3.13a2.46,2.46,0,0,1,2.4,2.73,4,4,0,0,1,0,.49Zm3.1-.75a1.51,1.51,0,0,0-1.47-1.72,1.77,1.77,0,0,0-1.62,1.72Z"
				/>
				<path
					fill="#fff"
					d="M94.59,192.73c0,.42,0,.89,0,1.6v3.37a3.36,3.36,0,0,1-.83,2.65,3.11,3.11,0,0,1-2.11.69,3.78,3.78,0,0,1-1.93-.48l.26-.8a3.32,3.32,0,0,0,1.71.45c1.08,0,1.87-.56,1.87-2v-.65h0a2.05,2.05,0,0,1-1.84,1,2.59,2.59,0,0,1-2.47-2.83,2.78,2.78,0,0,1,2.61-3.08,1.92,1.92,0,0,1,1.81,1h0l0-.88ZM93.5,195a1.8,1.8,0,0,0-.06-.48A1.53,1.53,0,0,0,92,193.43c-1,0-1.73.85-1.73,2.19,0,1.14.58,2.09,1.72,2.09a1.54,1.54,0,0,0,1.46-1.08,1.88,1.88,0,0,0,.09-.57Z"
				/>
				<path
					fill="#fff"
					d="M97.4,191.1a.66.66,0,0,1-1.31,0,.65.65,0,0,1,.66-.66A.63.63,0,0,1,97.4,191.1Zm-1.18,7.44v-5.81h1.06v5.81Z"
				/>
				<path
					fill="#fff"
					d="M98.89,197.46a2.79,2.79,0,0,0,1.39.42c.76,0,1.12-.39,1.12-.87s-.3-.78-1.07-1.07c-1-.37-1.54-.94-1.54-1.64a1.79,1.79,0,0,1,2-1.7,2.91,2.91,0,0,1,1.43.36l-.26.77a2.22,2.22,0,0,0-1.19-.34c-.63,0-1,.36-1,.79s.34.7,1.1,1c1,.38,1.52.88,1.52,1.75,0,1-.79,1.74-2.17,1.74a3.33,3.33,0,0,1-1.63-.4Z"
				/>
				<path
					fill="#fff"
					d="M105.05,191.06v1.67h1.51v.8h-1.51v3.13c0,.72.21,1.13.8,1.13a2.26,2.26,0,0,0,.61-.07l0,.79a2.39,2.39,0,0,1-.93.15,1.46,1.46,0,0,1-1.14-.45,2.15,2.15,0,0,1-.41-1.51v-3.17h-.9v-.8h.9v-1.39Z"
				/>
				<path
					fill="#fff"
					d="M111,198.54l-.09-.74h0a2.17,2.17,0,0,1-1.78.87A1.65,1.65,0,0,1,107.3,197c0-1.4,1.25-2.17,3.49-2.16v-.12a1.19,1.19,0,0,0-1.32-1.34,2.93,2.93,0,0,0-1.51.43l-.24-.7a3.6,3.6,0,0,1,1.9-.51c1.78,0,2.21,1.21,2.21,2.37v2.17a7.49,7.49,0,0,0,.1,1.4Zm-.16-3c-1.15,0-2.46.18-2.46,1.31a.94.94,0,0,0,1,1,1.45,1.45,0,0,0,1.4-1,1,1,0,0,0,.06-.34Z"
				/>
				<path
					fill="#fff"
					d="M113.54,194.54c0-.68,0-1.27-.05-1.81h.92l0,1.14h0a1.74,1.74,0,0,1,1.6-1.27,1.32,1.32,0,0,1,.3,0v1a1.71,1.71,0,0,0-.36,0,1.48,1.48,0,0,0-1.41,1.36,2.38,2.38,0,0,0,0,.49v3.1h-1Z"
				/>
			</svg>
		),
	},

	{
		name: "comment-form-1",
		title: __("Comment Form"),
		description: __("Comment Form"),
		atts: {
			form: {
				type: "commentSubmit",
				styles: {
					gridTemplateColumns: { Desktop: "1fr " },
					gap: { Desktop: "1em" },
					display: { Desktop: "grid" },
				},
			},
			wrapper: {
				options: { tag: "div", class: "" },
				styles: { gridTemplateColumns: {}, gap: {}, display: {} },
			},
			visible: {},
			onSubmit: {
				0: { id: "validation", messages: [] },
				1: { id: "submitConfirm", messages: [] },
			},
			onProcess: {
				0: {
					id: "commentSubmit",
					postType: "",
					showOnResponse: true,
					successMessage: "",
					errorMessage: "",
					status: "0",
				},
				1: { id: "createEntry", message: "" },
			},
			afterSubmit: { 0: { id: "showResponse", message: "" } },
			blockId: "pg9d6a07354523",
			blockCssY: {
				items: {
					".pg9d6a07354523": {
						"grid-template-columns": {},
						gap: {},
						display: {},
					},
					".pg9d6a07354523 form": {
						"grid-template-columns": { Desktop: "1fr " },
						gap: { Desktop: "1em" },
						display: { Desktop: "grid" },
					},
				},
			},
		},
		isPro: false,

		innerBlocks: [
			[
				"post-grid/form-field-input",
				{
					wrapper: { options: { tag: "div", class: "" } },
					labelWrap: { options: { tag: "div", enable: true, class: "" } },
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: true,
							text: "Your Name",
							class: "pg-form-field-label",
						},
					},
					input: {
						options: {
							type: "text",
							placeholder: "Write your name",
							value: "",
							name: "name",
							required: false,
							disabled: false,
							size: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							step: null,
							pattern: null,
							patternCustom: "",
							max: null,
							min: null,
							checked: false,
							autocomplete: false,
							id: "",
							class: "pg-form-field-input",
							position: "afterLabel",
						},
						styles: {
							border: { Desktop: "1px solid #b5b5b5" },
							borderRadius: { Desktop: "0px 0px 0px 0px" },
							padding: { Desktop: "5px 10px 5px 10px" },
							backgroundColor: { Desktop: "#ededed" },
							width: { Desktop: "100%" },
							maxWidth: { Desktop: "100%" },
						},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "",
							position: "afterInput",
							class: "",
						},
						styles: {
							color: { Desktop: "#c02121" },
							marginTop: { Desktop: "10px" },
						},
					},
					blockId: "pge76e79d1e452",
					blockCssY: {
						items: {
							".pge76e79d1e452 input": {
								border: { Desktop: "1px solid #b5b5b5" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"background-color": { Desktop: "#ededed" },
								width: { Desktop: "100%" },
								"max-width": { Desktop: "100%" },
							},
							".pge76e79d1e452 .error-wrap": {
								color: { Desktop: "#c02121" },
								"margin-top": { Desktop: "10px" },
							},
						},
					},
				},
			],
			[
				"post-grid/form-field-input",
				{
					wrapper: { options: { tag: "div", class: "" } },
					labelWrap: { options: { tag: "div", enable: true, class: "" } },
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: true,
							text: "Your Email",
							class: "pg-form-field-label",
						},
						styles: {},
					},
					input: {
						options: {
							type: "text",
							placeholder: "Write your mail address",
							value: "",
							name: "email",
							required: false,
							disabled: false,
							size: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							step: null,
							pattern: null,
							patternCustom: "",
							max: null,
							min: null,
							checked: false,
							autocomplete: false,
							id: "",
							class: "pg-form-field-input",
							position: "afterLabel",
						},
						styles: {
							border: { Desktop: "1px solid #b5b5b5" },
							borderRadius: { Desktop: "0px 0px 0px 0px" },
							padding: { Desktop: "5px 10px 5px 10px" },
							backgroundColor: { Desktop: "#ededed" },
							width: { Desktop: "99%" },
							maxWidth: { Desktop: "100%" },
						},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "Email should not empty",
							position: "afterInput",
							class: "",
						},
						styles: {
							color: { Desktop: "#c02121" },
							marginTop: { Desktop: "10px" },
						},
					},
					blockId: "pg9a328fd54a2e",
					blockCssY: {
						items: {
							".pg8539be28243d input": {},
							".pg9a328fd54a2e input": {
								border: { Desktop: "1px solid #b5b5b5" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"background-color": { Desktop: "#ededed" },
								width: { Desktop: "99%" },
								"max-width": { Desktop: "100%" },
							},
							".pg9a328fd54a2e .error-wrap": {
								color: { Desktop: "#c02121" },
								"margin-top": { Desktop: "10px" },
							},
						},
					},
				},
			],
			[
				"post-grid/form-field-input",
				{
					wrapper: { options: { tag: "div", class: "" } },
					labelWrap: { options: { tag: "div", enable: true, class: "" } },
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: true,
							text: "Website URL",
							class: "pg-form-field-label",
						},
						styles: {},
					},
					input: {
						options: {
							type: "text",
							placeholder: "",
							value: "",
							name: "url",
							required: false,
							disabled: false,
							size: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							step: null,
							pattern: null,
							patternCustom: "",
							max: null,
							min: null,
							checked: false,
							autocomplete: false,
							id: "",
							class: "pg-form-field-input",
							position: "afterLabel",
						},
						styles: {
							border: { Desktop: "1px solid #b5b5b5" },
							borderRadius: { Desktop: "0px 0px 0px 0px" },
							padding: { Desktop: "5px 10px 5px 10px" },
							backgroundColor: { Desktop: "#ededed" },
							width: { Desktop: "100%" },
							maxWidth: { Desktop: "100%" },
						},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "Website URL should not empty",
							position: "afterInput",
							class: "",
						},
						styles: {
							color: { Desktop: "#c02121" },
							marginTop: { Desktop: "10px" },
						},
					},
					blockId: "pg8539be28243d",
					blockCssY: {
						items: {
							".pg8539be28243d input": {
								"background-color": { Desktop: "#ededed" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								border: { Desktop: "1px solid #b5b5b5" },
								"max-width": { Desktop: "100%" },
								width: { Desktop: "100%" },
							},
							".pg8539be28243d .error-wrap": {
								color: { Desktop: "#c02121" },
								"margin-top": { Desktop: "10px" },
							},
						},
					},
				},
			],
			[
				"post-grid/form-field-textarea",
				{
					wrapper: { options: { tag: "div", class: "" }, styles: {} },
					labelWrap: {
						options: { tag: "div", enable: true, class: "" },
						styles: {},
					},
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: true,
							text: "Comment",
							class: "pg-form-field-label",
						},
						styles: {},
					},
					input: {
						options: {
							type: "text",
							placeholder: "",
							value: "",
							name: "comment",
							required: false,
							disabled: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							cols: null,
							rows: 3,
							autocomplete: false,
							autofocus: false,
							wrap: false,
							spellcheck: false,
							autocorrect: false,
							id: "",
							class: "",
							position: "afterLabel",
						},
						styles: {
							border: { Desktop: "1px solid #b5b5b5" },
							borderRadius: { Desktop: "0px 0px 0px 0px" },
							padding: { Desktop: "5px 10px 5px 10px" },
							backgroundColor: { Desktop: "#ededed" },
							width: { Desktop: "100%" },
							maxWidth: { Desktop: "100%" },
						},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "Comment should not empty",
							position: "afterInput",
							class: "",
						},
						styles: {
							color: { Desktop: "#c02121" },
							marginTop: { Desktop: "10px" },
						},
					},
					blockId: "pgeeea0720d517",
					blockCssY: {
						items: {
							".pgd6ed3e1cdfbd textarea": {
								border: { Desktop: "1px solid #b5b5b5" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"background-color": { Desktop: "#ececec" },
								width: { Desktop: "100%" },
								"max-width": { Desktop: "100%" },
							},
							".pgd6ed3e1cdfbd .error-wrap": {
								color: { Desktop: "#c02121" },
								"margin-top": { Desktop: "10px" },
							},
							".pgeeea0720d517 textarea": {
								border: { Desktop: "1px solid #b5b5b5" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"background-color": { Desktop: "#ededed" },
								width: { Desktop: "100%" },
								"max-width": { Desktop: "100%" },
							},
						},
					},
				},
			],
			[
				"post-grid/form-field-input",
				{
					wrapper: { options: { tag: "div", class: "" } },
					labelWrap: { options: { tag: "div", enable: true, class: "" } },
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: false,
							text: "Your Name",
							class: "pg-form-field-label",
						},
						styles: {},
					},
					input: {
						options: {
							type: "submit",
							placeholder: "Write your name",
							value: "Submit",
							name: "",
							required: false,
							disabled: false,
							size: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							step: null,
							pattern: null,
							patternCustom: "",
							max: null,
							min: null,
							checked: false,
							autocomplete: false,
							id: "",
							class: "pg-form-field-input",
							position: "afterLabel",
						},
						styles: {
							border: { Desktop: "1px solid #b5b5b5" },
							borderRadius: { Desktop: "0px 0px 0px 0px" },
							padding: { Desktop: "5px 10px 5px 10px" },
							backgroundColor: { Desktop: "#51557E" },
							width: { Desktop: "100%" },
							maxWidth: { Desktop: "99%" },
							color: { Desktop: "#ffffff" },
						},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "",
							position: "afterInput",
							class: "",
						},
					},
					blockId: "pg4670520d9df5",
					blockCssY: {
						items: {
							".pg8539be28243d input": {},
							".pg4670520d9df5 input": {
								border: { Desktop: "1px solid #b5b5b5" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"background-color": { Desktop: "#51557E" },
								width: { Desktop: "100%" },
								"max-width": { Desktop: "99%" },
								color: { Desktop: "#ffffff" },
							},
						},
					},
				},
			],
			[
				"post-grid/form-field-input",
				{
					wrapper: { options: { tag: "div", class: "" } },
					labelWrap: { options: { tag: "div", enable: true, class: "" } },
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: false,
							text: "",
							class: "pg-form-field-label",
						},
					},
					input: {
						options: {
							type: "hidden",
							placeholder: "Write your name",
							value: "",
							name: "post_id",
							required: false,
							disabled: false,
							size: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							step: null,
							pattern: null,
							patternCustom: "",
							includeMailBody: true,
							max: null,
							min: null,
							checked: false,
							autocomplete: false,
							id: "",
							class: "pg-form-field-input",
							position: "afterLabel",
							valueSource: "postID",
						},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "",
							position: "afterInput",
							class: "",
						},
					},
					blockId: "pg614afd61f278",
					blockCssY: { items: {} },
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 368.13 299.66">
				<rect
					fill="#bcbec0"
					x="4.07"
					y="8.02"
					width="360"
					height="33.44"
					rx="2.2"
				/>
				<path
					fill="#343738"
					d="M361.87,42.46H6.26a3.2,3.2,0,0,1-3.2-3.19V10.22A3.21,3.21,0,0,1,6.26,7H361.87a3.2,3.2,0,0,1,3.19,3.2V39.27A3.19,3.19,0,0,1,361.87,42.46ZM6.26,9a1.2,1.2,0,0,0-1.2,1.2V39.27a1.19,1.19,0,0,0,1.2,1.19H361.87a1.19,1.19,0,0,0,1.19-1.19V10.22A1.19,1.19,0,0,0,361.87,9Z"
				/>
				<rect
					fill="#bcbec0"
					x="4.07"
					y="104.96"
					width="360"
					height="33.44"
					rx="2.2"
				/>
				<path
					fill="#343738"
					d="M361.87,139.39H6.26a3.2,3.2,0,0,1-3.2-3.19v-29A3.2,3.2,0,0,1,6.26,104H361.87a3.19,3.19,0,0,1,3.19,3.19v29A3.19,3.19,0,0,1,361.87,139.39ZM6.26,106a1.19,1.19,0,0,0-1.2,1.19v29a1.19,1.19,0,0,0,1.2,1.19H361.87a1.19,1.19,0,0,0,1.19-1.19v-29a1.19,1.19,0,0,0-1.19-1.19Z"
				/>
				<rect
					fill="#bcbec0"
					x="4.07"
					y="152.59"
					width="360"
					height="86.66"
					rx="2.2"
				/>
				<path
					fill="#343738"
					d="M361.87,240.25H6.26a3.2,3.2,0,0,1-3.2-3.19V154.79a3.21,3.21,0,0,1,3.2-3.2H361.87a3.2,3.2,0,0,1,3.19,3.2v82.27A3.19,3.19,0,0,1,361.87,240.25ZM6.26,153.59a1.2,1.2,0,0,0-1.2,1.2v82.27a1.19,1.19,0,0,0,1.2,1.19H361.87a1.19,1.19,0,0,0,1.19-1.19V154.79a1.19,1.19,0,0,0-1.19-1.2Z"
				/>
				<path
					fill="#231f20"
					d="M19.89,28.27V24.84l-2.56-4.66h1.19l1.14,2.23c.31.61.55,1.11.8,1.67h0c.23-.53.5-1.06.81-1.67l1.17-2.23h1.18l-2.71,4.64v3.45Z"
				/>
				<path
					fill="#231f20"
					d="M28.89,25.32A2.84,2.84,0,0,1,26,28.4a2.76,2.76,0,0,1-2.79-3,2.83,2.83,0,0,1,2.88-3.08A2.75,2.75,0,0,1,28.89,25.32Zm-4.61.05c0,1.28.73,2.24,1.76,2.24s1.77-.95,1.77-2.26c0-1-.5-2.23-1.74-2.23S24.28,24.27,24.28,25.37Z"
				/>
				<path
					fill="#231f20"
					d="M35.08,26.68c0,.6,0,1.13.05,1.59h-.94l-.06-.95h0a2.19,2.19,0,0,1-1.92,1.08c-.91,0-2-.51-2-2.55V22.46h1.06v3.22c0,1.1.34,1.84,1.3,1.84A1.47,1.47,0,0,0,34,26V22.46h1.06Z"
				/>
				<path
					fill="#231f20"
					d="M36.83,24.27c0-.68,0-1.27,0-1.81h.93l0,1.14h0a1.75,1.75,0,0,1,1.61-1.27,1.39,1.39,0,0,1,.3,0v1a1.88,1.88,0,0,0-.36,0,1.5,1.5,0,0,0-1.42,1.36,3.47,3.47,0,0,0,0,.49v3.1H36.83Z"
				/>
				<path
					fill="#231f20"
					d="M43.34,28.27V20.18h1.13l2.6,4.09a23.83,23.83,0,0,1,1.45,2.63h0c-.1-1.08-.12-2.07-.12-3.33V20.18h1v8.09h-1l-2.57-4.11a27.32,27.32,0,0,1-1.51-2.69h0c.06,1,.08,2,.08,3.33v3.46Z"
				/>
				<path
					fill="#231f20"
					d="M54.41,28.27l-.08-.74h0a2.15,2.15,0,0,1-1.77.87,1.66,1.66,0,0,1-1.78-1.67c0-1.4,1.25-2.17,3.49-2.16v-.12a1.19,1.19,0,0,0-1.32-1.34,2.93,2.93,0,0,0-1.51.43l-.24-.7a3.63,3.63,0,0,1,1.91-.51c1.77,0,2.2,1.21,2.2,2.37v2.17a8.44,8.44,0,0,0,.1,1.4Zm-.16-3c-1.15,0-2.45.18-2.45,1.31a.93.93,0,0,0,1,1,1.43,1.43,0,0,0,1.4-1,1,1,0,0,0,.06-.34Z"
				/>
				<path
					fill="#231f20"
					d="M57,24c0-.6,0-1.09,0-1.57h.93l0,.94h0a2,2,0,0,1,1.82-1.07,1.74,1.74,0,0,1,1.65,1.16h0a2.42,2.42,0,0,1,.65-.75,2,2,0,0,1,1.28-.41c.77,0,1.91.5,1.91,2.52v3.42h-1V25c0-1.12-.41-1.79-1.26-1.79a1.38,1.38,0,0,0-1.25,1,1.74,1.74,0,0,0-.08.53v3.59h-1V24.79c0-.93-.4-1.6-1.21-1.6a1.43,1.43,0,0,0-1.3,1.06,1.4,1.4,0,0,0-.09.51v3.51H57Z"
				/>
				<path
					fill="#231f20"
					d="M67.58,25.56a1.85,1.85,0,0,0,2,2,3.75,3.75,0,0,0,1.6-.3l.18.76a4.8,4.8,0,0,1-1.93.36,2.7,2.7,0,0,1-2.85-2.93c0-1.75,1-3.13,2.72-3.13a2.46,2.46,0,0,1,2.4,2.73,2.85,2.85,0,0,1,0,.5Zm3.09-.76a1.51,1.51,0,0,0-1.46-1.72,1.75,1.75,0,0,0-1.62,1.72Z"
				/>
				<rect
					fill="#bcbec0"
					x="4.07"
					y="56.49"
					width="360"
					height="33.44"
					rx="2.2"
				/>
				<path
					fill="#343738"
					d="M361.87,90.93H6.26a3.2,3.2,0,0,1-3.2-3.2v-29a3.2,3.2,0,0,1,3.2-3.2H361.87a3.19,3.19,0,0,1,3.19,3.2v29A3.19,3.19,0,0,1,361.87,90.93ZM6.26,57.49a1.2,1.2,0,0,0-1.2,1.2v29a1.2,1.2,0,0,0,1.2,1.2H361.87a1.19,1.19,0,0,0,1.19-1.2v-29a1.19,1.19,0,0,0-1.19-1.2Z"
				/>
				<path
					fill="#231f20"
					d="M22.27,72.94H19.13v2.92h3.5v.87H18.09V68.65h4.36v.87H19.13v2.56h3.14Z"
				/>
				<path
					fill="#231f20"
					d="M24,72.5c0-.6,0-1.09-.05-1.57h.92l.05.93h0a2,2,0,0,1,1.82-1.07A1.71,1.71,0,0,1,28.38,72h0a2.33,2.33,0,0,1,.64-.76,2,2,0,0,1,1.29-.41c.76,0,1.9.51,1.9,2.52v3.42h-1V73.45c0-1.12-.41-1.79-1.26-1.79a1.35,1.35,0,0,0-1.24,1,1.63,1.63,0,0,0-.09.53v3.58h-1V73.25c0-.92-.41-1.59-1.21-1.59a1.45,1.45,0,0,0-1.31,1,1.49,1.49,0,0,0-.08.52v3.5H24Z"
				/>
				<path
					fill="#231f20"
					d="M37.18,76.73,37.1,76h0a2.16,2.16,0,0,1-1.78.86,1.65,1.65,0,0,1-1.77-1.66C33.51,73.79,34.76,73,37,73v-.12a1.2,1.2,0,0,0-1.32-1.35,2.84,2.84,0,0,0-1.51.44l-.24-.7a3.61,3.61,0,0,1,1.91-.52c1.77,0,2.2,1.22,2.2,2.38v2.17a8.32,8.32,0,0,0,.1,1.39Zm-.16-3c-1.15,0-2.46.18-2.46,1.31a.93.93,0,0,0,1,1,1.44,1.44,0,0,0,1.4-1,1,1,0,0,0,.06-.33Z"
				/>
				<path
					fill="#231f20"
					d="M40.92,69.3a.65.65,0,0,1-1.3,0,.64.64,0,0,1,.66-.66A.62.62,0,0,1,40.92,69.3Zm-1.17,7.43v-5.8h1v5.8Z"
				/>
				<path fill="#231f20" d="M42.56,68.22h1v8.51h-1Z" />
				<path
					fill="#231f20"
					d="M49.27,74.19l-.83,2.54H47.36l2.74-8.08h1.26l2.76,8.08H53l-.87-2.54Zm2.66-.82-.8-2.32c-.18-.53-.3-1-.42-1.48h0c-.12.48-.25,1-.41,1.46l-.79,2.34Z"
				/>
				<path
					fill="#231f20"
					d="M60.14,68.22v7c0,.52,0,1.11,0,1.5h-.94l0-1h0a2.14,2.14,0,0,1-2,1.14c-1.4,0-2.48-1.18-2.48-3,0-1.93,1.19-3.12,2.6-3.12a2,2,0,0,1,1.76.89h0V68.22Zm-1,5.07a1.65,1.65,0,0,0-.05-.44,1.54,1.54,0,0,0-1.52-1.23c-1.09,0-1.74,1-1.74,2.25S56.35,76,57.49,76A1.59,1.59,0,0,0,59,74.75a1.64,1.64,0,0,0,.05-.45Z"
				/>
				<path
					fill="#231f20"
					d="M66.91,68.22v7c0,.52,0,1.11,0,1.5H66l0-1h0a2.14,2.14,0,0,1-2,1.14c-1.4,0-2.48-1.18-2.48-3,0-1.93,1.19-3.12,2.6-3.12a1.93,1.93,0,0,1,1.75.89h0V68.22Zm-1,5.07a1.65,1.65,0,0,0,0-.44,1.55,1.55,0,0,0-1.52-1.23c-1.09,0-1.74,1-1.74,2.25S63.12,76,64.26,76a1.59,1.59,0,0,0,1.55-1.26,1.64,1.64,0,0,0,0-.45Z"
				/>
				<path
					fill="#231f20"
					d="M68.67,72.74c0-.69,0-1.27,0-1.81h.92l0,1.14h0a1.75,1.75,0,0,1,1.6-1.28,1.28,1.28,0,0,1,.3,0v1a1.23,1.23,0,0,0-.36,0,1.47,1.47,0,0,0-1.41,1.36,2.38,2.38,0,0,0-.05.49v3.09h-1Z"
				/>
				<path
					fill="#231f20"
					d="M73.06,74a1.86,1.86,0,0,0,2,2,4,4,0,0,0,1.61-.3l.18.75a4.67,4.67,0,0,1-1.93.36,2.7,2.7,0,0,1-2.86-2.93c0-1.75,1-3.13,2.72-3.13a2.46,2.46,0,0,1,2.4,2.74,4.68,4.68,0,0,1,0,.49Zm3.09-.75a1.49,1.49,0,0,0-1.46-1.72,1.75,1.75,0,0,0-1.62,1.72Z"
				/>
				<path
					fill="#231f20"
					d="M78.34,75.65a2.69,2.69,0,0,0,1.39.42c.77,0,1.13-.38,1.13-.86s-.3-.78-1.08-1.07c-1-.37-1.54-1-1.54-1.64a1.8,1.8,0,0,1,2-1.71,2.9,2.9,0,0,1,1.42.36l-.26.77a2.32,2.32,0,0,0-1.19-.33c-.62,0-1,.36-1,.79s.35.69,1.1,1c1,.39,1.53.89,1.53,1.75,0,1-.79,1.74-2.17,1.74a3.27,3.27,0,0,1-1.63-.39Z"
				/>
				<path
					fill="#231f20"
					d="M83.09,75.65a2.72,2.72,0,0,0,1.39.42c.77,0,1.13-.38,1.13-.86s-.3-.78-1.08-1.07c-1-.37-1.53-1-1.53-1.64a1.79,1.79,0,0,1,2-1.71,2.94,2.94,0,0,1,1.43.36l-.27.77A2.29,2.29,0,0,0,85,71.59c-.62,0-1,.36-1,.79s.35.69,1.11,1c1,.39,1.52.89,1.52,1.75,0,1-.79,1.74-2.17,1.74a3.3,3.3,0,0,1-1.63-.39Z"
				/>
				<path
					fill="#231f20"
					d="M19.41,125.2l-2.05-8.09h1.1l1,4.09c.24,1,.46,2,.6,2.8h0c.14-.81.39-1.76.66-2.81l1.08-4.08h1.09l1,4.11c.23,1,.44,1.91.56,2.77h0c.17-.89.4-1.79.65-2.8l1.07-4.08h1.07l-2.29,8.09H23.85l-1-4.21a23.2,23.2,0,0,1-.53-2.64h0a24.73,24.73,0,0,1-.62,2.64L20.5,125.2Z"
				/>
				<path
					fill="#231f20"
					d="M28.4,122.49a1.85,1.85,0,0,0,2,2,3.75,3.75,0,0,0,1.6-.3l.18.76a4.63,4.63,0,0,1-1.93.36,2.7,2.7,0,0,1-2.85-2.93c0-1.75,1-3.13,2.72-3.13a2.46,2.46,0,0,1,2.4,2.74,2.81,2.81,0,0,1,0,.49Zm3.09-.76A1.5,1.5,0,0,0,30,120a1.74,1.74,0,0,0-1.62,1.71Z"
				/>
				<path
					fill="#231f20"
					d="M33.77,125.2c0-.4,0-1,0-1.5v-7h1v3.65h0a2.15,2.15,0,0,1,2-1.07c1.44,0,2.46,1.2,2.44,3,0,2.08-1.3,3.11-2.6,3.11a2.06,2.06,0,0,1-1.94-1.09h0l0,1Zm1.09-2.33a2.32,2.32,0,0,0,0,.38,1.63,1.63,0,0,0,1.59,1.24c1.1,0,1.76-.9,1.76-2.23,0-1.16-.6-2.16-1.73-2.16a1.69,1.69,0,0,0-1.61,1.3,2.34,2.34,0,0,0-.06.43Z"
				/>
				<path
					fill="#231f20"
					d="M40.5,124.12a2.86,2.86,0,0,0,1.4.42c.76,0,1.12-.39,1.12-.87s-.3-.78-1.08-1.06c-1-.37-1.53-1-1.53-1.65a1.79,1.79,0,0,1,2-1.7,2.91,2.91,0,0,1,1.43.36l-.27.77a2.15,2.15,0,0,0-1.18-.34c-.63,0-1,.36-1,.79s.34.7,1.1,1c1,.38,1.52.89,1.52,1.75,0,1-.79,1.74-2.17,1.74a3.33,3.33,0,0,1-1.63-.4Z"
				/>
				<path
					fill="#231f20"
					d="M46.58,117.76a.63.63,0,0,1-.68.65.63.63,0,0,1-.63-.65.64.64,0,0,1,.66-.66A.63.63,0,0,1,46.58,117.76ZM45.4,125.2v-5.81h1.06v5.81Z"
				/>
				<path
					fill="#231f20"
					d="M49.48,117.73v1.66H51v.81H49.48v3.13c0,.72.2,1.12.79,1.12a2.15,2.15,0,0,0,.61-.07l0,.79a2.42,2.42,0,0,1-.93.15,1.45,1.45,0,0,1-1.14-.45,2.13,2.13,0,0,1-.41-1.51V120.2h-.9v-.81h.9V118Z"
				/>
				<path
					fill="#231f20"
					d="M52.7,122.49a1.85,1.85,0,0,0,2,2,3.75,3.75,0,0,0,1.6-.3l.18.76a4.63,4.63,0,0,1-1.93.36,2.7,2.7,0,0,1-2.85-2.93c0-1.75,1-3.13,2.72-3.13a2.46,2.46,0,0,1,2.4,2.74,2.81,2.81,0,0,1,0,.49Zm3.09-.76A1.5,1.5,0,0,0,54.33,120a1.74,1.74,0,0,0-1.62,1.71Z"
				/>
				<path
					fill="#231f20"
					d="M61.74,117.11v4.79c0,1.81.81,2.58,1.89,2.58s2-.79,2-2.58v-4.79h1.06v4.72c0,2.48-1.31,3.5-3.06,3.5s-2.9-1-2.9-3.45v-4.77Z"
				/>
				<path
					fill="#231f20"
					d="M68.46,117.22a10.77,10.77,0,0,1,2-.17,3.36,3.36,0,0,1,2.34.66,2.05,2.05,0,0,1,.63,1.54,2.12,2.12,0,0,1-1.52,2.06v0A2,2,0,0,1,73.1,123a13,13,0,0,0,.63,2.22H72.65a11.07,11.07,0,0,1-.54-1.93c-.24-1.12-.67-1.54-1.62-1.57h-1v3.5H68.46Zm1.05,3.68h1.06c1.12,0,1.83-.61,1.83-1.53s-.76-1.5-1.86-1.51a4.84,4.84,0,0,0-1,.09Z"
				/>
				<path fill="#231f20" d="M74.92,117.11h1v7.21h3.46v.88h-4.5Z" />
				<path
					fill="#231f20"
					d="M19.41,170.75l-2.05-8.09h1.1l1,4.09c.24,1,.46,2,.6,2.8h0c.14-.81.39-1.77.66-2.81l1.08-4.08h1.09l1,4.1c.23,1,.44,1.92.56,2.78h0c.17-.89.4-1.79.65-2.8l1.07-4.08h1.07l-2.29,8.09H23.85l-1-4.21a23.2,23.2,0,0,1-.53-2.64h0a24.73,24.73,0,0,1-.62,2.64l-1.15,4.21Z"
				/>
				<path
					fill="#231f20"
					d="M28,166.75c0-.68,0-1.27-.05-1.81h.93l0,1.14h0a1.75,1.75,0,0,1,1.61-1.27,1,1,0,0,1,.3,0v1a1.94,1.94,0,0,0-.36,0,1.49,1.49,0,0,0-1.42,1.35,3.47,3.47,0,0,0,0,.49v3.1H28Z"
				/>
				<path
					fill="#231f20"
					d="M33.16,163.31a.62.62,0,0,1-.67.65.63.63,0,0,1-.64-.65.65.65,0,0,1,.66-.66A.63.63,0,0,1,33.16,163.31ZM32,170.75v-5.81H33v5.81Z"
				/>
				<path
					fill="#231f20"
					d="M36.06,163.28v1.66h1.51v.81H36.06v3.13c0,.72.21,1.12.79,1.12a2.29,2.29,0,0,0,.62-.07l.05.79a2.48,2.48,0,0,1-.94.15,1.46,1.46,0,0,1-1.14-.45,2.13,2.13,0,0,1-.41-1.51v-3.16h-.9v-.81H35v-1.39Z"
				/>
				<path
					fill="#231f20"
					d="M39.28,168a1.86,1.86,0,0,0,2,2,3.8,3.8,0,0,0,1.61-.3l.18.76a4.84,4.84,0,0,1-1.93.36,2.7,2.7,0,0,1-2.86-2.93c0-1.75,1-3.13,2.72-3.13a2.46,2.46,0,0,1,2.4,2.73,4.92,4.92,0,0,1,0,.5Zm3.09-.76a1.49,1.49,0,0,0-1.46-1.71,1.75,1.75,0,0,0-1.62,1.71Z"
				/>
				<path
					fill="#231f20"
					d="M48.53,170.75v-3.43L46,162.66h1.18l1.14,2.23c.31.62.55,1.11.81,1.67h0c.23-.53.5-1.05.82-1.67l1.16-2.23H52.3l-2.71,4.64v3.45Z"
				/>
				<path
					fill="#231f20"
					d="M57.53,167.8a2.84,2.84,0,0,1-2.89,3.08,2.76,2.76,0,0,1-2.78-3,2.83,2.83,0,0,1,2.87-3.08A2.75,2.75,0,0,1,57.53,167.8Zm-4.61.06c0,1.27.74,2.23,1.77,2.23s1.76-1,1.76-2.26c0-1-.49-2.23-1.74-2.23S52.92,166.75,52.92,167.86Z"
				/>
				<path
					fill="#231f20"
					d="M63.72,169.16c0,.6,0,1.13.05,1.59h-.94l-.06-.95h0a2.19,2.19,0,0,1-1.92,1.08c-.91,0-2-.51-2-2.54v-3.4h1.05v3.22c0,1.1.34,1.84,1.3,1.84a1.52,1.52,0,0,0,1.39-1,1.49,1.49,0,0,0,.1-.54v-3.56h1Z"
				/>
				<path
					fill="#231f20"
					d="M65.48,166.75c0-.68,0-1.27,0-1.81h.92l0,1.14h0a1.74,1.74,0,0,1,1.6-1.27.91.91,0,0,1,.3,0v1a1.86,1.86,0,0,0-.36,0,1.47,1.47,0,0,0-1.41,1.35,2.38,2.38,0,0,0,0,.49v3.1h-1Z"
				/>
				<path
					fill="#231f20"
					d="M77.63,170.48a5.18,5.18,0,0,1-2.14.39,3.78,3.78,0,0,1-4-4.09,4,4,0,0,1,4.22-4.25,4.4,4.4,0,0,1,1.92.36l-.25.85a3.85,3.85,0,0,0-1.63-.33,3,3,0,0,0-3.16,3.33A2.94,2.94,0,0,0,75.71,170a4.22,4.22,0,0,0,1.7-.33Z"
				/>
				<path
					fill="#231f20"
					d="M84,167.8a2.84,2.84,0,0,1-2.89,3.08,2.76,2.76,0,0,1-2.78-3,2.83,2.83,0,0,1,2.88-3.08A2.74,2.74,0,0,1,84,167.8Zm-4.6.06c0,1.27.73,2.23,1.76,2.23s1.77-1,1.77-2.26c0-1-.5-2.23-1.74-2.23S79.42,166.75,79.42,167.86Z"
				/>
				<path
					fill="#231f20"
					d="M85.36,166.51c0-.6,0-1.09,0-1.57h.93l0,.94h0a2,2,0,0,1,1.82-1.07A1.74,1.74,0,0,1,89.79,166h0a2.42,2.42,0,0,1,.65-.75,2,2,0,0,1,1.28-.41c.77,0,1.91.5,1.91,2.52v3.42h-1v-3.29c0-1.11-.41-1.79-1.26-1.79a1.38,1.38,0,0,0-1.25,1,1.74,1.74,0,0,0-.08.53v3.59H89v-3.48c0-.92-.4-1.6-1.21-1.6a1.45,1.45,0,0,0-1.31,1.06,1.67,1.67,0,0,0-.08.52v3.5h-1Z"
				/>
				<path
					fill="#231f20"
					d="M95.37,166.51c0-.6,0-1.09-.05-1.57h.92l.05.94h0a2,2,0,0,1,1.82-1.07A1.71,1.71,0,0,1,99.79,166h0a2.29,2.29,0,0,1,.65-.75,1.93,1.93,0,0,1,1.28-.41c.77,0,1.91.5,1.91,2.52v3.42h-1v-3.29c0-1.11-.4-1.79-1.26-1.79a1.38,1.38,0,0,0-1.24,1,1.73,1.73,0,0,0-.09.53v3.59H99v-3.48c0-.92-.41-1.6-1.21-1.6a1.45,1.45,0,0,0-1.31,1.06,1.42,1.42,0,0,0-.08.52v3.5h-1Z"
				/>
				<path
					fill="#231f20"
					d="M106,168a1.86,1.86,0,0,0,2,2,3.76,3.76,0,0,0,1.61-.3l.18.76a4.84,4.84,0,0,1-1.93.36,2.69,2.69,0,0,1-2.85-2.93c0-1.75,1-3.13,2.72-3.13a2.46,2.46,0,0,1,2.4,2.73,4.36,4.36,0,0,1,0,.5Zm3.1-.76a1.5,1.5,0,0,0-1.47-1.71,1.76,1.76,0,0,0-1.62,1.71Z"
				/>
				<path
					fill="#231f20"
					d="M111.39,166.51c0-.6,0-1.09,0-1.57h.94l.06,1h0a2.14,2.14,0,0,1,1.92-1.09c.8,0,2,.48,2,2.47v3.47h-1.06V167.4c0-.94-.34-1.71-1.34-1.71a1.48,1.48,0,0,0-1.41,1.07,1.54,1.54,0,0,0-.08.5v3.49h-1Z"
				/>
				<path
					fill="#231f20"
					d="M119.27,163.28v1.66h1.51v.81h-1.51v3.13c0,.72.2,1.12.79,1.12a2.15,2.15,0,0,0,.61-.07l0,.79a2.42,2.42,0,0,1-.93.15,1.46,1.46,0,0,1-1.14-.45,2.13,2.13,0,0,1-.41-1.51v-3.16h-.9v-.81h.9v-1.39Z"
				/>
				<rect
					fill="#414042"
					x="4.07"
					y="256.56"
					width="180"
					height="35.07"
					rx="3.24"
				/>
				<path
					fill="#fff"
					d="M50.47,276.35a3.72,3.72,0,0,0,1.88.53c1.06,0,1.69-.57,1.69-1.38s-.44-1.19-1.53-1.61c-1.32-.47-2.13-1.15-2.13-2.29A2.32,2.32,0,0,1,53,269.41a3.73,3.73,0,0,1,1.79.39l-.29.85a3.24,3.24,0,0,0-1.53-.38c-1.11,0-1.53.66-1.53,1.21,0,.76.5,1.13,1.61,1.56,1.37.53,2.06,1.19,2.06,2.37s-.92,2.33-2.83,2.33a4.25,4.25,0,0,1-2.06-.51Z"
				/>
				<path
					fill="#fff"
					d="M61.36,276c0,.6,0,1.13,0,1.58h-.93l-.06-.95h0a2.16,2.16,0,0,1-1.91,1.08c-.92,0-2-.5-2-2.54v-3.39h1.06V275c0,1.1.33,1.85,1.29,1.85a1.52,1.52,0,0,0,1.39-1,1.37,1.37,0,0,0,.1-.54v-3.56h1.06Z"
				/>
				<path
					fill="#fff"
					d="M63.06,277.62c0-.39,0-1,0-1.5v-7h1v3.64h0a2.15,2.15,0,0,1,2-1.06c1.44,0,2.46,1.19,2.44,3,0,2.07-1.3,3.1-2.6,3.1a2.06,2.06,0,0,1-1.94-1.09h0l0,1Zm1.09-2.33a2.3,2.3,0,0,0,0,.39,1.64,1.64,0,0,0,1.59,1.23c1.1,0,1.76-.9,1.76-2.23,0-1.16-.6-2.16-1.73-2.16a1.7,1.7,0,0,0-1.61,1.3,2.34,2.34,0,0,0-.06.43Z"
				/>
				<path
					fill="#fff"
					d="M69.94,273.39c0-.6,0-1.09,0-1.57h.92l0,.93h0a2,2,0,0,1,1.82-1.06,1.7,1.7,0,0,1,1.64,1.16h0a2.35,2.35,0,0,1,.65-.76,2,2,0,0,1,1.28-.4c.77,0,1.91.5,1.91,2.51v3.42h-1v-3.28c0-1.12-.4-1.79-1.26-1.79a1.36,1.36,0,0,0-1.24,1,1.63,1.63,0,0,0-.09.53v3.58h-1v-3.48c0-.92-.41-1.59-1.21-1.59a1.45,1.45,0,0,0-1.31,1.05,1.49,1.49,0,0,0-.08.52v3.5h-1Z"
				/>
				<path
					fill="#fff"
					d="M81.12,270.19a.62.62,0,0,1-.67.64.63.63,0,0,1-.64-.64.64.64,0,0,1,.66-.66A.62.62,0,0,1,81.12,270.19ZM80,277.62v-5.8h1v5.8Z"
				/>
				<path
					fill="#fff"
					d="M84,270.15v1.67h1.51v.8H84v3.13c0,.72.2,1.13.79,1.13a2.68,2.68,0,0,0,.61-.07l0,.79a2.73,2.73,0,0,1-.94.14,1.45,1.45,0,0,1-1.14-.44,2.15,2.15,0,0,1-.41-1.51v-3.17H82.1v-.8H83v-1.39Z"
				/>
				<path
					fill="#fff"
					d="M95,277.36a5.29,5.29,0,0,1-2.14.38,3.77,3.77,0,0,1-4-4.09,4,4,0,0,1,4.22-4.24,4.26,4.26,0,0,1,1.92.36l-.25.85a3.85,3.85,0,0,0-1.64-.34,3,3,0,0,0-3.15,3.34A2.94,2.94,0,0,0,93,276.87a4.24,4.24,0,0,0,1.7-.34Z"
				/>
				<path
					fill="#fff"
					d="M101.35,274.67a2.83,2.83,0,0,1-2.89,3.08,2.76,2.76,0,0,1-2.78-3,2.83,2.83,0,0,1,2.88-3.08A2.75,2.75,0,0,1,101.35,274.67Zm-4.6.06c0,1.27.73,2.23,1.76,2.23s1.76-.95,1.76-2.25c0-1-.49-2.23-1.74-2.23S96.75,273.63,96.75,274.73Z"
				/>
				<path
					fill="#fff"
					d="M102.69,273.39c0-.6,0-1.09,0-1.57h.92l0,.93h0a2,2,0,0,1,1.82-1.06,1.7,1.7,0,0,1,1.64,1.16h0a2.33,2.33,0,0,1,.64-.76,2,2,0,0,1,1.29-.4c.76,0,1.9.5,1.9,2.51v3.42h-1v-3.28c0-1.12-.41-1.79-1.26-1.79a1.35,1.35,0,0,0-1.24,1,1.63,1.63,0,0,0-.09.53v3.58h-1v-3.48c0-.92-.41-1.59-1.21-1.59a1.45,1.45,0,0,0-1.31,1.05,1.49,1.49,0,0,0-.08.52v3.5h-1Z"
				/>
				<path
					fill="#fff"
					d="M112.69,273.39c0-.6,0-1.09,0-1.57h.92l.05.93h0a2,2,0,0,1,1.83-1.06,1.7,1.7,0,0,1,1.64,1.16h0a2.35,2.35,0,0,1,.65-.76,2,2,0,0,1,1.28-.4c.77,0,1.91.5,1.91,2.51v3.42h-1v-3.28c0-1.12-.41-1.79-1.26-1.79a1.36,1.36,0,0,0-1.25,1,2,2,0,0,0-.08.53v3.58h-1v-3.48c0-.92-.41-1.59-1.21-1.59a1.45,1.45,0,0,0-1.31,1.05,1.5,1.5,0,0,0-.09.52v3.5h-1Z"
				/>
				<path
					fill="#fff"
					d="M123.29,274.91a1.86,1.86,0,0,0,2,2,4,4,0,0,0,1.61-.3l.18.75a4.67,4.67,0,0,1-1.93.36,2.69,2.69,0,0,1-2.86-2.92c0-1.76,1-3.13,2.72-3.13a2.45,2.45,0,0,1,2.4,2.73,4.68,4.68,0,0,1,0,.49Zm3.09-.75a1.49,1.49,0,0,0-1.46-1.72,1.75,1.75,0,0,0-1.62,1.72Z"
				/>
				<path
					fill="#fff"
					d="M128.71,273.39c0-.6,0-1.09,0-1.57h.93l.06,1h0a2.09,2.09,0,0,1,1.91-1.09c.81,0,2.06.47,2.06,2.47v3.46H132.6v-3.34c0-.94-.35-1.72-1.34-1.72a1.5,1.5,0,0,0-1.42,1.08,1.45,1.45,0,0,0-.07.49v3.49h-1.06Z"
				/>
				<path
					fill="#fff"
					d="M136.6,270.15v1.67h1.51v.8H136.6v3.13c0,.72.2,1.13.79,1.13a2.68,2.68,0,0,0,.61-.07l.05.79a2.73,2.73,0,0,1-.94.14,1.45,1.45,0,0,1-1.14-.44,2.15,2.15,0,0,1-.4-1.51v-3.17h-.9v-.8h.9v-1.39Z"
				/>
			</svg>
		),
	},
	{
		name: "term-submit-form-1",
		title: __("Term Submission Form"),
		description: __("Term Submission Form"),
		atts: {
			form: {
				styles: {
					gridTemplateColumns: { Desktop: "1fr " },
					gap: { Desktop: "1em" },
					display: { Desktop: "grid" },
				},
				options: { type: "termSubmitForm" },
			},
			wrapper: {
				options: { tag: "div", class: "" },
				styles: { gridTemplateColumns: {}, gap: {}, display: {} },
			},
			visible: {},
			onSubmit: {
				0: { id: "validation", messages: [] },
				1: { id: "submitConfirm", messages: [] },
			},
			onProcess: {
				0: {
					id: "termSubmit",
					postType: "",
					showOnResponse: true,
					taxonomy: "category",
				},
				1: { id: "createEntry", message: "" },
			},
			afterSubmit: {
				0: { id: "showResponse", message: "" },
				1: { id: "clearForm", message: "" },
			},
			blockId: "pg9d6a07354523",
			blockCssY: {
				items: {
					".pg9d6a07354523": {
						"grid-template-columns": {},
						gap: {},
						display: {},
					},
					".pg9d6a07354523 form": {
						"grid-template-columns": { Desktop: "1fr " },
						gap: { Desktop: "1em" },
						display: { Desktop: "grid" },
					},
				},
			},
		},
		isPro: false,

		innerBlocks: [
			[
				"post-grid/form-field-input",
				{
					wrapper: { options: { tag: "div", class: "" } },
					labelWrap: { options: { tag: "div", enable: true, class: "" } },
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: true,
							text: "Term Title",
							class: "pg-form-field-label",
						},
					},
					input: {
						options: {
							type: "text",
							placeholder: "",
							value: "",
							name: "term_title",
							required: false,
							disabled: false,
							size: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							step: null,
							pattern: null,
							patternCustom: "",
							max: null,
							min: null,
							checked: false,
							autocomplete: false,
							id: "",
							class: "pg-form-field-input",
							position: "afterLabel",
						},
						styles: {
							border: { Desktop: "1px solid #b5b5b5" },
							borderRadius: { Desktop: "0px 0px 0px 0px" },
							padding: { Desktop: "5px 10px 5px 10px" },
							backgroundColor: { Desktop: "#ececec" },
							width: { Desktop: "100%" },
							maxWidth: { Desktop: "100%" },
						},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "Term title should not empty",
							position: "afterInput",
							class: "",
						},
						styles: {
							color: { Desktop: "#c02121" },
							marginTop: { Desktop: "10px" },
						},
					},
					blockId: "pg8539be28243d",
					blockCssY: {
						items: {
							".pg8539be28243d input": {
								"background-color": { Desktop: "#ececec" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								border: { Desktop: "1px solid #b5b5b5" },
								"max-width": { Desktop: "100%" },
								width: { Desktop: "100%" },
							},
							".pg8539be28243d .error-wrap": {
								color: { Desktop: "#c02121" },
								"margin-top": { Desktop: "10px" },
							},
						},
					},
				},
			],
			[
				"post-grid/form-field-input",
				{
					wrapper: { options: { tag: "div", class: "" } },
					labelWrap: { options: { tag: "div", enable: true, class: "" } },
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: true,
							text: "Term Slug",
							class: "pg-form-field-label",
						},
					},
					input: {
						options: {
							type: "text",
							placeholder: "",
							value: "",
							name: "term_slug",
							required: false,
							disabled: false,
							size: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							step: null,
							pattern: null,
							patternCustom: "",
							max: null,
							min: null,
							checked: false,
							autocomplete: false,
							id: "",
							class: "pg-form-field-input",
							position: "afterLabel",
						},
						styles: {
							border: { Desktop: "1px solid #b5b5b5" },
							borderRadius: { Desktop: "0px 0px 0px 0px" },
							padding: { Desktop: "5px 10px 5px 10px" },
							backgroundColor: { Desktop: "#ececec" },
							width: { Desktop: "100%" },
							maxWidth: { Desktop: "100%" },
						},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "",
							position: "afterInput",
							class: "",
						},
					},
					blockId: "pgbba272b1931d",
					blockCssY: {
						items: {
							".pgbba272b1931d input": {
								border: { Desktop: "1px solid #b5b5b5" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"background-color": { Desktop: "#ececec" },
								width: { Desktop: "100%" },
								"max-width": { Desktop: "100%" },
							},
						},
					},
				},
			],
			[
				"post-grid/form-field-input",
				{
					wrapper: { options: { tag: "div", class: "" }, styles: {} },
					labelWrap: {
						options: { tag: "div", enable: true, class: "" },
						styles: {},
					},
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: true,
							text: "Term Description",
							class: "pg-form-field-label",
						},
						styles: {},
					},
					input: {
						options: {
							type: "text",
							placeholder: "",
							value: "",
							name: "term_description",
							required: false,
							disabled: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							cols: null,
							rows: 3,
							autocomplete: false,
							autofocus: false,
							wrap: false,
							spellcheck: false,
							autocorrect: false,
							id: "",
							class: "",
							position: "afterLabel",
						},
						styles: {
							border: { Desktop: "1px solid #b5b5b5" },
							borderRadius: { Desktop: "0px 0px 0px 0px" },
							padding: { Desktop: "5px 10px 5px 10px" },
							backgroundColor: { Desktop: "#ececec" },
							width: { Desktop: "100%" },
							maxWidth: { Desktop: "100%" },
						},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "Term description should not empty",
							position: "afterInput",
							class: "",
						},
						styles: {
							color: { Desktop: "#c02121" },
							marginTop: { Desktop: "10px" },
						},
					},
					blockCssY: {
						items: {
							".pgd6ed3e1cdfbd textarea": {
								border: { Desktop: "1px solid #b5b5b5" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"background-color": { Desktop: "#ececec" },
								width: { Desktop: "100%" },
								"max-width": { Desktop: "100%" },
							},
							".pgd6ed3e1cdfbd .error-wrap": {
								color: { Desktop: "#c02121" },
								"margin-top": { Desktop: "10px" },
							},
						},
					},
				},
			],
			[
				"post-grid/form-field-textarea",
				{
					wrapper: { options: { tag: "div", class: "" } },
					labelWrap: { options: { tag: "div", enable: true, class: "" } },
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: true,
							text: "Your Email",
							class: "pg-form-field-label",
						},
						styles: {},
					},
					input: {
						options: {
							type: "text",
							placeholder: "Write your mail address",
							value: "",
							name: "email",
							required: false,
							disabled: false,
							size: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							step: null,
							pattern: null,
							patternCustom: "",
							max: null,
							min: null,
							checked: false,
							autocomplete: false,
							id: "",
							class: "pg-form-field-input",
							position: "afterLabel",
						},
						styles: {
							border: { Desktop: "1px solid #b5b5b5" },
							borderRadius: { Desktop: "0px 0px 0px 0px" },
							padding: { Desktop: "5px 10px 5px 10px" },
							backgroundColor: { Desktop: "#ececec" },
							width: { Desktop: "100%" },
							maxWidth: { Desktop: "100%" },
						},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "Email should not empty",
							position: "afterInput",
							class: "",
						},
						styles: {
							color: { Desktop: "#c02121" },
							marginTop: { Desktop: "10px" },
						},
					},
					blockId: "pg9a328fd54a2e",
					blockCssY: {
						items: {
							".pg8539be28243d input": {},
							".pg9a328fd54a2e input": {
								border: { Desktop: "1px solid #b5b5b5" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"background-color": { Desktop: "#ececec" },
								width: { Desktop: "100%" },
								"max-width": { Desktop: "100%" },
							},
							".pg9a328fd54a2e .error-wrap": {
								color: { Desktop: "#c02121" },
								"margin-top": { Desktop: "10px" },
							},
							".pg9a328fd54a2e textarea": {
								border: { Desktop: "1px solid #b5b5b5" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"background-color": { Desktop: "#ececec" },
								width: { Desktop: "100%" },
								"max-width": { Desktop: "100%" },
							},
						},
					},
				},
			],
			[
				"post-grid/form-field-input",
				{
					wrapper: { options: { tag: "div", class: "" } },
					labelWrap: { options: { tag: "div", enable: true, class: "" } },
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: false,
							text: "Your Name",
							class: "pg-form-field-label",
						},
					},
					input: {
						options: {
							type: "submit",
							placeholder: "Write your name",
							value: "Submit",
							name: "",
							required: false,
							disabled: false,
							size: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							step: null,
							pattern: null,
							patternCustom: "",
							max: null,
							min: null,
							checked: false,
							autocomplete: false,
							id: "",
							class: "pg-form-field-input",
							position: "afterLabel",
						},
						styles: {
							border: { Desktop: "1px solid #b5b5b5" },
							borderRadius: { Desktop: "0px 0px 0px 0px" },
							padding: { Desktop: "5px 10px 5px 10px" },
							backgroundColor: { Desktop: "#51557E" },
							width: { Desktop: "100%" },
							maxWidth: { Desktop: "100%" },
							color: { Desktop: "#ffffff" },
						},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "",
							position: "afterInput",
							class: "",
						},
					},
					blockId: "pg4670520d9df5",
					blockCssY: {
						items: {
							".pg8539be28243d input": {},
							".pg4670520d9df5 input": {
								border: { Desktop: "1px solid #b5b5b5" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"background-color": { Desktop: "#51557E" },
								width: { Desktop: "100%" },
								"max-width": { Desktop: "100%" },
								color: { Desktop: "#ffffff" },
							},
						},
					},
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 368.13 244.63">
				<rect
					fill="#bcbec0"
					x="4.06"
					y="4.63"
					width="360"
					height="33.44"
					rx="2.2"
				/>
				<path
					fill="#343738"
					d="M361.87,39.07H6.26a3.19,3.19,0,0,1-3.19-3.19V6.83a3.2,3.2,0,0,1,3.19-3.2H361.87a3.2,3.2,0,0,1,3.19,3.2V35.88A3.19,3.19,0,0,1,361.87,39.07ZM6.26,5.63a1.19,1.19,0,0,0-1.19,1.2V35.88a1.19,1.19,0,0,0,1.19,1.19H361.87a1.19,1.19,0,0,0,1.19-1.19V6.83a1.19,1.19,0,0,0-1.19-1.2Z"
				/>
				<rect
					fill="#bcbec0"
					x="4.06"
					y="53.1"
					width="360"
					height="33.44"
					rx="2.2"
				/>
				<path
					fill="#343738"
					d="M361.87,87.54H6.26a3.2,3.2,0,0,1-3.19-3.2v-29a3.19,3.19,0,0,1,3.19-3.2H361.87a3.19,3.19,0,0,1,3.19,3.2v29A3.2,3.2,0,0,1,361.87,87.54ZM6.26,54.1a1.19,1.19,0,0,0-1.19,1.2v29a1.19,1.19,0,0,0,1.19,1.2H361.87a1.19,1.19,0,0,0,1.19-1.2v-29a1.19,1.19,0,0,0-1.19-1.2Z"
				/>
				<rect
					fill="#bcbec0"
					x="4.06"
					y="100.74"
					width="360"
					height="86.66"
					rx="2.2"
				/>
				<path
					fill="#343738"
					d="M361.87,188.4H6.26a3.2,3.2,0,0,1-3.19-3.2V102.93a3.19,3.19,0,0,1,3.19-3.19H361.87a3.19,3.19,0,0,1,3.19,3.19V185.2A3.2,3.2,0,0,1,361.87,188.4ZM6.26,101.74a1.19,1.19,0,0,0-1.19,1.19V185.2a1.19,1.19,0,0,0,1.19,1.2H361.87a1.19,1.19,0,0,0,1.19-1.2V102.93a1.19,1.19,0,0,0-1.19-1.19Z"
				/>
				<rect
					fill="#414042"
					x="4.27"
					y="204.92"
					width="180"
					height="35.07"
					rx="3.24"
				/>
				<path
					fill="#231f20"
					d="M19.62,17.68H17.16v-.89h6v.89H20.68v7.2H19.62Z"
				/>
				<path
					fill="#231f20"
					d="M23.75,22.16a1.87,1.87,0,0,0,2,2,3.8,3.8,0,0,0,1.61-.3l.18.76A4.84,4.84,0,0,1,25.6,25a2.7,2.7,0,0,1-2.86-2.93c0-1.75,1-3.13,2.73-3.13a2.46,2.46,0,0,1,2.4,2.73,4,4,0,0,1,0,.49Zm3.1-.75a1.51,1.51,0,0,0-1.47-1.72,1.77,1.77,0,0,0-1.62,1.72Z"
				/>
				<path
					fill="#231f20"
					d="M29.18,20.88c0-.68,0-1.27-.05-1.81h.92l0,1.14h.05a1.74,1.74,0,0,1,1.6-1.27,1.32,1.32,0,0,1,.3,0v1a1.79,1.79,0,0,0-.36,0,1.48,1.48,0,0,0-1.41,1.36,2.38,2.38,0,0,0-.05.49v3.1h-1Z"
				/>
				<path
					fill="#231f20"
					d="M33.15,20.64c0-.6,0-1.09,0-1.57H34l0,.94h0a2,2,0,0,1,1.82-1.07,1.71,1.71,0,0,1,1.64,1.16h0a2.42,2.42,0,0,1,.65-.75,1.93,1.93,0,0,1,1.28-.41c.77,0,1.91.5,1.91,2.52v3.42h-1V21.59c0-1.12-.4-1.79-1.26-1.79a1.38,1.38,0,0,0-1.24,1,1.73,1.73,0,0,0-.09.53v3.59h-1V21.4c0-.93-.41-1.6-1.21-1.6a1.45,1.45,0,0,0-1.31,1.06,1.4,1.4,0,0,0-.08.51v3.51h-1Z"
				/>
				<path fill="#231f20" d="M46.78,17.68H44.32v-.89h6v.89H47.83v7.2h-1Z" />
				<path
					fill="#231f20"
					d="M52.2,17.44a.62.62,0,0,1-.67.65.63.63,0,0,1-.63-.65.64.64,0,0,1,.66-.66A.62.62,0,0,1,52.2,17.44ZM51,24.88V19.07h1v5.81Z"
				/>
				<path
					fill="#231f20"
					d="M55.11,17.4v1.67h1.51v.8H55.11V23c0,.72.2,1.13.79,1.13a2.15,2.15,0,0,0,.61-.07l.05.79a2.48,2.48,0,0,1-.94.15,1.47,1.47,0,0,1-1.14-.45,2.15,2.15,0,0,1-.4-1.51V19.87h-.9v-.8h.9V17.68Z"
				/>
				<path fill="#231f20" d="M57.81,16.36h1v8.52h-1Z" />
				<path
					fill="#231f20"
					d="M61.23,22.16a1.86,1.86,0,0,0,2,2,3.83,3.83,0,0,0,1.61-.3l.18.76a4.9,4.9,0,0,1-1.94.36,2.7,2.7,0,0,1-2.85-2.93c0-1.75,1-3.13,2.72-3.13a2.46,2.46,0,0,1,2.4,2.73,4.49,4.49,0,0,1,0,.49Zm3.09-.75a1.5,1.5,0,0,0-1.46-1.72,1.75,1.75,0,0,0-1.62,1.72Z"
				/>
				<path
					fill="#231f20"
					d="M19.62,66.15H17.16v-.89h6v.89H20.68v7.19H19.62Z"
				/>
				<path
					fill="#231f20"
					d="M23.75,70.63a1.87,1.87,0,0,0,2,2,4,4,0,0,0,1.61-.3l.18.75a4.67,4.67,0,0,1-1.93.36,2.7,2.7,0,0,1-2.86-2.93c0-1.75,1-3.13,2.73-3.13a2.47,2.47,0,0,1,2.4,2.74,4.15,4.15,0,0,1,0,.49Zm3.1-.75a1.51,1.51,0,0,0-1.47-1.72,1.76,1.76,0,0,0-1.62,1.72Z"
				/>
				<path
					fill="#231f20"
					d="M29.18,69.35c0-.69,0-1.27-.05-1.81h.92l0,1.14h.05a1.75,1.75,0,0,1,1.6-1.28,1.28,1.28,0,0,1,.3,0v1a1.28,1.28,0,0,0-.36,0,1.47,1.47,0,0,0-1.41,1.36,2.38,2.38,0,0,0-.05.49v3.09h-1Z"
				/>
				<path
					fill="#231f20"
					d="M33.15,69.11c0-.6,0-1.09,0-1.57H34l0,.93h0a2,2,0,0,1,1.82-1.07,1.71,1.71,0,0,1,1.64,1.17h0a2.35,2.35,0,0,1,.65-.76,2,2,0,0,1,1.28-.41c.77,0,1.91.51,1.91,2.52v3.42h-1V70.06c0-1.12-.4-1.79-1.26-1.79a1.36,1.36,0,0,0-1.24,1,1.63,1.63,0,0,0-.09.53v3.58h-1V69.86c0-.92-.41-1.59-1.21-1.59a1.45,1.45,0,0,0-1.31,1,1.49,1.49,0,0,0-.08.52v3.5h-1Z"
				/>
				<path
					fill="#231f20"
					d="M45.59,72.07a3.68,3.68,0,0,0,1.87.53c1.07,0,1.69-.57,1.69-1.38s-.43-1.19-1.52-1.61c-1.32-.47-2.13-1.15-2.13-2.29a2.32,2.32,0,0,1,2.61-2.19,3.73,3.73,0,0,1,1.79.39l-.29.85A3.25,3.25,0,0,0,48.07,66c-1.1,0-1.52.66-1.52,1.21,0,.76.49,1.13,1.61,1.56,1.37.53,2.06,1.19,2.06,2.37s-.92,2.33-2.83,2.33A4.25,4.25,0,0,1,45.33,73Z"
				/>
				<path fill="#231f20" d="M51.62,64.83h1.05v8.51H51.62Z" />
				<path
					fill="#231f20"
					d="M59.31,71.76c0,.6,0,1.13,0,1.58h-.93l-.06-1h0a2.16,2.16,0,0,1-1.92,1.08c-.91,0-2-.5-2-2.54V67.54h1.06v3.21c0,1.1.33,1.85,1.29,1.85a1.52,1.52,0,0,0,1.39-1,1.57,1.57,0,0,0,.1-.54V67.54h1.06Z"
				/>
				<path
					fill="#231f20"
					d="M66.06,67.54c0,.42,0,.88,0,1.59V72.5a3.35,3.35,0,0,1-.82,2.65,3.09,3.09,0,0,1-2.12.7,3.78,3.78,0,0,1-1.93-.48l.27-.81a3.25,3.25,0,0,0,1.7.46c1.08,0,1.87-.56,1.87-2v-.64h0a2.08,2.08,0,0,1-1.85,1,2.6,2.6,0,0,1-2.47-2.83,2.79,2.79,0,0,1,2.61-3.09,2,2,0,0,1,1.82,1h0l0-.87ZM65,69.83a1.44,1.44,0,0,0-.06-.48,1.53,1.53,0,0,0-1.48-1.12c-1,0-1.72.85-1.72,2.2,0,1.14.57,2.08,1.71,2.08a1.54,1.54,0,0,0,1.47-1.08,1.81,1.81,0,0,0,.08-.56Z"
				/>
				<path
					fill="#231f20"
					d="M19.62,111.69H17.16v-.88h6v.88H20.68v7.2H19.62Z"
				/>
				<path
					fill="#231f20"
					d="M23.75,116.18a1.86,1.86,0,0,0,2,2,3.8,3.8,0,0,0,1.61-.3l.18.76a4.67,4.67,0,0,1-1.93.36,2.7,2.7,0,0,1-2.86-2.93c0-1.75,1-3.13,2.73-3.13a2.47,2.47,0,0,1,2.4,2.74,4.35,4.35,0,0,1,0,.49Zm3.1-.76a1.5,1.5,0,0,0-1.47-1.71,1.76,1.76,0,0,0-1.62,1.71Z"
				/>
				<path
					fill="#231f20"
					d="M29.18,114.9c0-.69,0-1.27-.05-1.81h.92l0,1.13h.05a1.75,1.75,0,0,1,1.6-1.27,1.28,1.28,0,0,1,.3,0v1a1.86,1.86,0,0,0-.36,0,1.47,1.47,0,0,0-1.41,1.35,2.57,2.57,0,0,0-.05.5v3.09h-1Z"
				/>
				<path
					fill="#231f20"
					d="M33.15,114.66c0-.6,0-1.1,0-1.57H34l0,.93h0A2,2,0,0,1,35.93,113a1.71,1.71,0,0,1,1.64,1.17h0a2.35,2.35,0,0,1,.65-.76,2,2,0,0,1,1.28-.41c.77,0,1.91.51,1.91,2.52v3.42h-1V115.6c0-1.11-.4-1.78-1.26-1.78a1.36,1.36,0,0,0-1.24,1,1.61,1.61,0,0,0-.09.52v3.59h-1v-3.48c0-.92-.41-1.59-1.21-1.59a1.44,1.44,0,0,0-1.31,1.05,1.49,1.49,0,0,0-.08.52v3.5h-1Z"
				/>
				<path
					fill="#231f20"
					d="M45.74,110.91a15.77,15.77,0,0,1,2.21-.16,4.65,4.65,0,0,1,3.28,1,3.74,3.74,0,0,1,1.14,2.91,4.25,4.25,0,0,1-1.17,3.14A5,5,0,0,1,47.63,119a16.84,16.84,0,0,1-1.89-.09Zm1,7.15a6.32,6.32,0,0,0,1,.06,3.11,3.11,0,0,0,3.45-3.43c0-1.9-1.07-3.12-3.28-3.12a5.89,5.89,0,0,0-1.22.11Z"
				/>
				<path
					fill="#231f20"
					d="M54.33,116.18a1.85,1.85,0,0,0,2,2,3.83,3.83,0,0,0,1.61-.3l.18.76a4.72,4.72,0,0,1-1.94.36,2.69,2.69,0,0,1-2.85-2.93c0-1.75,1-3.13,2.72-3.13a2.46,2.46,0,0,1,2.4,2.74,4.88,4.88,0,0,1,0,.49Zm3.09-.76A1.5,1.5,0,0,0,56,113.71a1.74,1.74,0,0,0-1.62,1.71Z"
				/>
				<path
					fill="#231f20"
					d="M59.61,117.81a2.79,2.79,0,0,0,1.39.42c.77,0,1.13-.38,1.13-.86s-.3-.78-1.08-1.07c-1-.37-1.54-1-1.54-1.64a1.79,1.79,0,0,1,2-1.71,2.91,2.91,0,0,1,1.43.36l-.26.77a2.32,2.32,0,0,0-1.19-.33c-.62,0-1,.36-1,.79s.35.69,1.1,1c1,.38,1.53.89,1.53,1.75,0,1-.8,1.74-2.18,1.74a3.33,3.33,0,0,1-1.63-.4Z"
				/>
				<path
					fill="#231f20"
					d="M68.64,118.67A3.78,3.78,0,0,1,67,119a2.76,2.76,0,0,1-2.89-3A3,3,0,0,1,67.2,113a3.45,3.45,0,0,1,1.47.3l-.24.81a2.53,2.53,0,0,0-1.23-.28,2,2,0,0,0-2,2.2,2,2,0,0,0,2,2.17,3,3,0,0,0,1.29-.29Z"
				/>
				<path
					fill="#231f20"
					d="M69.88,114.9c0-.69,0-1.27,0-1.81h.93l0,1.13h0A1.75,1.75,0,0,1,72.45,113a1.36,1.36,0,0,1,.3,0v1a1.94,1.94,0,0,0-.36,0A1.47,1.47,0,0,0,71,115.3a3.68,3.68,0,0,0,0,.5v3.09h-1Z"
				/>
				<path
					fill="#231f20"
					d="M75,111.45a.66.66,0,0,1-1.31,0,.65.65,0,0,1,.66-.66A.63.63,0,0,1,75,111.45Zm-1.18,7.44v-5.8h1.06v5.8Z"
				/>
				<path
					fill="#231f20"
					d="M76.66,115c0-.74,0-1.34,0-1.89h1l0,1h0A2.28,2.28,0,0,1,79.69,113c1.41,0,2.46,1.19,2.46,3,0,2.09-1.27,3.12-2.64,3.12a2,2,0,0,1-1.78-.91h0v3.15h-1Zm1,1.55a2.82,2.82,0,0,0,0,.43,1.63,1.63,0,0,0,1.58,1.23c1.12,0,1.77-.91,1.77-2.24,0-1.16-.61-2.16-1.73-2.16a1.7,1.7,0,0,0-1.6,1.31,2,2,0,0,0-.07.43Z"
				/>
				<path
					fill="#231f20"
					d="M84.76,111.42v1.67h1.51v.8H84.76V117c0,.72.2,1.13.79,1.13a2.08,2.08,0,0,0,.61-.08l0,.8a2.69,2.69,0,0,1-.94.14,1.5,1.5,0,0,1-1.14-.44,2.22,2.22,0,0,1-.4-1.51v-3.17h-.9v-.8h.9v-1.4Z"
				/>
				<path
					fill="#231f20"
					d="M88.63,111.45a.62.62,0,0,1-.67.65.63.63,0,0,1-.63-.65.64.64,0,0,1,.66-.66A.62.62,0,0,1,88.63,111.45Zm-1.17,7.44v-5.8h1.05v5.8Z"
				/>
				<path
					fill="#231f20"
					d="M95.52,115.94A2.83,2.83,0,0,1,92.63,119a2.76,2.76,0,0,1-2.78-3A2.84,2.84,0,0,1,92.73,113,2.75,2.75,0,0,1,95.52,115.94Zm-4.61.06c0,1.27.74,2.23,1.77,2.23s1.76-1,1.76-2.25c0-1-.49-2.23-1.74-2.23S90.91,114.9,90.91,116Z"
				/>
				<path
					fill="#231f20"
					d="M96.86,114.66c0-.6,0-1.1,0-1.57h.93l.06,1h0A2.13,2.13,0,0,1,99.75,113c.8,0,2,.48,2,2.47v3.47h-1.06v-3.35c0-.93-.35-1.71-1.34-1.71A1.5,1.5,0,0,0,98,114.91a1.45,1.45,0,0,0-.07.49v3.49h-1Z"
				/>
				<path
					fill="#fff"
					d="M77,224.71a3.68,3.68,0,0,0,1.87.53c1.07,0,1.69-.57,1.69-1.38s-.43-1.19-1.52-1.61c-1.32-.47-2.13-1.15-2.13-2.29a2.32,2.32,0,0,1,2.61-2.19,3.73,3.73,0,0,1,1.79.39L81,219a3.25,3.25,0,0,0-1.54-.38c-1.1,0-1.52.66-1.52,1.21,0,.76.49,1.13,1.61,1.56,1.37.53,2.06,1.19,2.06,2.37s-.92,2.33-2.83,2.33a4.25,4.25,0,0,1-2.06-.51Z"
				/>
				<path
					fill="#fff"
					d="M87.84,224.4c0,.6,0,1.13,0,1.58H87L86.9,225h0A2.18,2.18,0,0,1,85,226.11c-.91,0-2-.5-2-2.54v-3.39H84v3.21c0,1.1.33,1.85,1.29,1.85a1.52,1.52,0,0,0,1.39-1,1.57,1.57,0,0,0,.1-.54v-3.56h1Z"
				/>
				<path
					fill="#fff"
					d="M89.55,226c0-.39,0-1,0-1.5v-7h1v3.64h0a2.15,2.15,0,0,1,2-1.07c1.44,0,2.46,1.2,2.45,3,0,2.07-1.31,3.1-2.6,3.1A2.06,2.06,0,0,1,90.55,225h0l-.05,1Zm1.09-2.33a2.3,2.3,0,0,0,0,.39,1.63,1.63,0,0,0,1.58,1.23c1.11,0,1.77-.9,1.77-2.23,0-1.16-.6-2.16-1.73-2.16a1.7,1.7,0,0,0-1.61,1.3,2.34,2.34,0,0,0-.06.43Z"
				/>
				<path
					fill="#fff"
					d="M96.43,221.75c0-.6,0-1.09-.05-1.57h.92l0,.93h0A2,2,0,0,1,99.21,220a1.71,1.71,0,0,1,1.64,1.17h0a2.21,2.21,0,0,1,.64-.76,2,2,0,0,1,1.29-.41c.76,0,1.9.51,1.9,2.52V226h-1v-3.29c0-1.11-.41-1.78-1.26-1.78a1.34,1.34,0,0,0-1.24,1,1.63,1.63,0,0,0-.09.53V226h-1V222.5c0-.92-.41-1.59-1.21-1.59A1.45,1.45,0,0,0,97.54,222a1.49,1.49,0,0,0-.08.52V226h-1Z"
				/>
				<path
					fill="#fff"
					d="M107.61,218.55a.62.62,0,0,1-.67.64.63.63,0,0,1-.64-.64.64.64,0,0,1,.66-.66A.62.62,0,0,1,107.61,218.55ZM106.43,226v-5.8h1.06V226Z"
				/>
				<path
					fill="#fff"
					d="M110.51,218.51v1.67H112v.8h-1.51v3.13c0,.72.21,1.13.79,1.13a2.78,2.78,0,0,0,.62-.07l0,.79a2.73,2.73,0,0,1-.94.14,1.49,1.49,0,0,1-1.14-.44,2.15,2.15,0,0,1-.41-1.51V221h-.9v-.8h.9v-1.39Z"
				/>
			</svg>
		),
	},

	{
		name: "post-submission-form",
		title: __("Post Submission Form"),
		description: __("Post Submission Form"),

		isPro: false,
		atts: {
			form: {
				styles: {
					gridTemplateColumns: { Desktop: "1fr " },
					gap: { Desktop: "1em" },
					display: { Desktop: "grid" },
				},
				options: { type: "postSubmitForm" },
			},
			wrapper: {
				options: { tag: "div", class: "" },
				styles: { gridTemplateColumns: {}, gap: {}, display: {} },
			},
			visible: {},
			onSubmit: {
				0: { id: "validation", messages: [] },
				1: { id: "submitConfirm", messages: [] },
			},
			onProcess: {
				0: {
					id: "postSubmit",
					postType: "post",
					showOnResponse: true,
					postStatus: "pending",
					commentStatus: "closed",
					pingStatus: "closed",
					authorByEmail: true,
				},
				1: { id: "createEntry", message: "" },
			},
			afterSubmit: {
				0: { id: "showResponse", message: "" },
				1: { id: "refreshPage", delay: "2000" },
			},
			blockId: "pg9d6a07354523",
			blockCssY: {
				items: {
					".pg9d6a07354523": {
						"grid-template-columns": {},
						gap: {},
						display: {},
					},
					".pg9d6a07354523 form": {
						"grid-template-columns": { Desktop: "1fr " },
						gap: { Desktop: "1em" },
						display: { Desktop: "grid" },
					},
				},
			},
		},

		innerBlocks: [
			[
				"post-grid/form-field-input",
				{
					wrapper: { options: { tag: "div", class: "" } },
					labelWrap: { options: { tag: "div", enable: true, class: "" } },
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: true,
							text: "Post Title",
							class: "pg-form-field-label",
						},
					},
					input: {
						options: {
							type: "text",
							placeholder: "",
							value: "",
							name: "post_title",
							required: false,
							disabled: false,
							size: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							step: null,
							pattern: null,
							patternCustom: "",
							max: null,
							min: null,
							checked: false,
							autocomplete: false,
							id: "",
							class: "pg-form-field-input",
							position: "afterLabel",
						},
						styles: {
							border: { Desktop: "1px solid #b5b5b5" },
							borderRadius: { Desktop: "0px 0px 0px 0px" },
							padding: { Desktop: "5px 10px 5px 10px" },
							backgroundColor: { Desktop: "#ececec" },
							width: { Desktop: "100%" },
							maxWidth: { Desktop: "100%" },
						},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "Post title should not empty",
							position: "afterInput",
							class: "",
						},
						styles: {
							color: { Desktop: "#c02121" },
							marginTop: { Desktop: "10px" },
						},
					},
					blockId: "pg8539be28243d",
					blockCssY: {
						items: {
							".pg8539be28243d input": {
								"background-color": { Desktop: "#ececec" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								border: { Desktop: "1px solid #b5b5b5" },
								"max-width": { Desktop: "100%" },
								width: { Desktop: "100%" },
							},
							".pg8539be28243d .error-wrap": {
								color: { Desktop: "#c02121" },
								"margin-top": { Desktop: "10px" },
							},
						},
					},
				},
			],
			[
				"post-grid/form-field-textarea",
				{
					wrapper: { options: { tag: "div", class: "" } },
					labelWrap: { options: { tag: "div", enable: true, class: "" } },
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: true,
							text: "Your Email",
							class: "pg-form-field-label",
						},
						styles: {},
					},
					input: {
						options: {
							type: "text",
							placeholder: "Write your mail address",
							value: "",
							name: "email",
							required: false,
							disabled: false,
							size: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							step: null,
							pattern: null,
							patternCustom: "",
							max: null,
							min: null,
							checked: false,
							autocomplete: false,
							id: "",
							class: "pg-form-field-input",
							position: "afterLabel",
						},
						styles: {
							border: { Desktop: "1px solid #b5b5b5" },
							borderRadius: { Desktop: "0px 0px 0px 0px" },
							padding: { Desktop: "5px 10px 5px 10px" },
							backgroundColor: { Desktop: "#ececec" },
							width: { Desktop: "100%" },
							maxWidth: { Desktop: "100%" },
						},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "Email should not empty",
							position: "afterInput",
							class: "",
						},
						styles: {
							color: { Desktop: "#c02121" },
							marginTop: { Desktop: "10px" },
						},
					},
					blockId: "pg9a328fd54a2e",
					blockCssY: {
						items: {
							".pg8539be28243d input": {},
							".pg9a328fd54a2e input": {
								border: { Desktop: "1px solid #b5b5b5" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"background-color": { Desktop: "#ececec" },
								width: { Desktop: "100%" },
								"max-width": { Desktop: "100%" },
							},
							".pg9a328fd54a2e .error-wrap": {
								color: { Desktop: "#c02121" },
								"margin-top": { Desktop: "10px" },
							},
							".pg9a328fd54a2e textarea": {
								border: { Desktop: "1px solid #b5b5b5" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"background-color": { Desktop: "#ececec" },
								width: { Desktop: "100%" },
								"max-width": { Desktop: "100%" },
							},
						},
					},
				},
			],
			[
				"post-grid/form-field-checkbox",
				{
					wrapper: { options: { tag: "div", class: "" }, styles: {} },
					labelWrap: { options: { tag: "div", enable: true, class: "" } },
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: true,
							text: "Post Category",
							class: "pg-form-field-label",
						},
						styles: {},
					},
					input: {
						options: {
							value: null,
							name: "post_categories",
							required: false,
							disabled: false,
							multiple: false,
							autofocus: null,
							readonly: false,
							args: {
								0: { label: "Category 1", value: "category1", readonly: false },
								1: { label: "Category 2", value: "category2", readonly: false },
								2: { label: "Category 3", value: "category3", readonly: false },
							},
							argsSrc: { src: "taxonomy" },
							id: "",
							class: "pg-form-field-checkbox",
							position: "afterLabel",
						},
						styles: {},
					},
					inputWrap: {
						options: { tag: "div", enable: true, class: "" },
						styles: {},
					},
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "",
							position: "afterInput",
							class: "",
						},
						styles: {},
					},
					blockId: "pgd631f4eba415",
					blockCssY: { items: {} },
				},
			],
			[
				"post-grid/form-field-input",
				{
					wrapper: { options: { tag: "div", class: "" } },
					labelWrap: { options: { tag: "div", enable: true, class: "" } },
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: true,
							text: "Post Tags",
							class: "pg-form-field-label",
						},
					},
					input: {
						options: {
							type: "text",
							placeholder: "comma separate, ex: Tag 1, Tag 2",
							value: "",
							name: "post_tags",
							required: false,
							disabled: false,
							size: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							step: null,
							pattern: null,
							patternCustom: "",
							max: null,
							min: null,
							checked: false,
							autocomplete: false,
							id: "",
							class: "pg-form-field-input",
							position: "afterLabel",
						},
						styles: {
							border: { Desktop: "1px solid #b5b5b5" },
							borderRadius: { Desktop: "0px 0px 0px 0px" },
							padding: { Desktop: "5px 10px 5px 10px" },
							backgroundColor: { Desktop: "#ececec" },
							width: { Desktop: "100%" },
							maxWidth: { Desktop: "100%" },
						},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "",
							position: "afterInput",
							class: "",
						},
					},
					blockId: "pgbba272b1931d",
					blockCssY: {
						items: {
							".pgbba272b1931d input": {
								border: { Desktop: "1px solid #b5b5b5" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"background-color": { Desktop: "#ececec" },
								width: { Desktop: "100%" },
								"max-width": { Desktop: "100%" },
							},
						},
					},
				},
			],
			[
				"post-grid/form-field-file",
				{
					wrapper: { options: { tag: "div", class: "" }, styles: {} },
					labelWrap: {
						options: { tag: "div", enable: true, class: "" },
						styles: {},
					},
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: true,
							text: "Post Featured Image",
							class: "pg-form-field-label",
						},
						styles: {},
					},
					input: {
						options: {
							type: "text",
							placeholder: "Write your name",
							value: "",
							name: "post_thumbnail",
							required: false,
							disabled: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							multiple: false,
							maxCount: 3,
							maxSize: null,
							fileTypes: [".jpg", ".jpeg", ".png", ".gif", ".pdf"],
							id: "",
							class: "pg-form-field-file",
							position: "afterLabel",
						},
						styles: {},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "",
							position: "afterInput",
							class: "",
						},
						styles: {},
					},
					blockId: "pg95dcb32704af",
					blockCssY: { items: {} },
				},
			],
			[
				"post-grid/form-field-textarea",
				{
					wrapper: { options: { tag: "div", class: "" } },
					labelWrap: { options: { tag: "div", enable: true, class: "" } },
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: true,
							text: "Your Email",
							class: "pg-form-field-label",
						},
						styles: {},
					},
					input: {
						options: {
							type: "text",
							placeholder: "Write your mail address",
							value: "",
							name: "email",
							required: false,
							disabled: false,
							size: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							step: null,
							pattern: null,
							patternCustom: "",
							max: null,
							min: null,
							checked: false,
							autocomplete: false,
							id: "",
							class: "pg-form-field-input",
							position: "afterLabel",
						},
						styles: {
							border: { Desktop: "1px solid #b5b5b5" },
							borderRadius: { Desktop: "0px 0px 0px 0px" },
							padding: { Desktop: "5px 10px 5px 10px" },
							backgroundColor: { Desktop: "#ececec" },
							width: { Desktop: "100%" },
							maxWidth: { Desktop: "100%" },
						},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "Email should not empty",
							position: "afterInput",
							class: "",
						},
						styles: {
							color: { Desktop: "#c02121" },
							marginTop: { Desktop: "10px" },
						},
					},
					blockId: "pg9a328fd54a2e",
					blockCssY: {
						items: {
							".pg8539be28243d input": {},
							".pg9a328fd54a2e input": {
								border: { Desktop: "1px solid #b5b5b5" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"background-color": { Desktop: "#ececec" },
								width: { Desktop: "100%" },
								"max-width": { Desktop: "100%" },
							},
							".pg9a328fd54a2e .error-wrap": {
								color: { Desktop: "#c02121" },
								"margin-top": { Desktop: "10px" },
							},
						},
					},
				},
			],

			[
				"post-grid/form-field-input",
				{
					wrapper: { options: { tag: "div", class: "" } },
					labelWrap: { options: { tag: "div", enable: true, class: "" } },
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: false,
							text: "Your Name",
							class: "pg-form-field-label",
						},
					},
					input: {
						options: {
							type: "submit",
							placeholder: "Write your name",
							value: "Submit",
							name: "",
							required: false,
							disabled: false,
							size: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							step: null,
							pattern: null,
							patternCustom: "",
							max: null,
							min: null,
							checked: false,
							autocomplete: false,
							id: "",
							class: "pg-form-field-input",
							position: "afterLabel",
						},
						styles: {
							border: { Desktop: "1px solid #b5b5b5" },
							borderRadius: { Desktop: "0px 0px 0px 0px" },
							padding: { Desktop: "5px 10px 5px 10px" },
							backgroundColor: { Desktop: "#51557E" },
							width: { Desktop: "100%" },
							maxWidth: { Desktop: "100%" },
							color: { Desktop: "#ffffff" },
						},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "",
							position: "afterInput",
							class: "",
						},
					},
					blockId: "pg4670520d9df5",
					blockCssY: {
						items: {
							".pg8539be28243d input": {},
							".pg4670520d9df5 input": {
								border: { Desktop: "1px solid #b5b5b5" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"background-color": { Desktop: "#51557E" },
								width: { Desktop: "100%" },
								"max-width": { Desktop: "100%" },
								color: { Desktop: "#ffffff" },
							},
						},
					},
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 368.13 299.66">
				<rect
					fill="#bcbec0"
					x="4.07"
					y="8.02"
					width="360"
					height="33.44"
					rx="2.2"
				/>
				<path
					fill="#343738"
					d="M361.87,42.46H6.26a3.2,3.2,0,0,1-3.2-3.19V10.22A3.21,3.21,0,0,1,6.26,7H361.87a3.2,3.2,0,0,1,3.19,3.2V39.27A3.19,3.19,0,0,1,361.87,42.46ZM6.26,9a1.2,1.2,0,0,0-1.2,1.2V39.27a1.19,1.19,0,0,0,1.2,1.19H361.87a1.19,1.19,0,0,0,1.19-1.19V10.22A1.19,1.19,0,0,0,361.87,9Z"
				/>
				<rect
					fill="#bcbec0"
					x="4.07"
					y="104.96"
					width="360"
					height="33.44"
					rx="2.2"
				/>
				<path
					fill="#343738"
					d="M361.87,139.39H6.26a3.2,3.2,0,0,1-3.2-3.19v-29A3.2,3.2,0,0,1,6.26,104H361.87a3.19,3.19,0,0,1,3.19,3.19v29A3.19,3.19,0,0,1,361.87,139.39ZM6.26,106a1.19,1.19,0,0,0-1.2,1.19v29a1.19,1.19,0,0,0,1.2,1.19H361.87a1.19,1.19,0,0,0,1.19-1.19v-29a1.19,1.19,0,0,0-1.19-1.19Z"
				/>
				<rect
					fill="#bcbec0"
					x="4.07"
					y="152.59"
					width="360"
					height="86.66"
					rx="2.2"
				/>
				<path
					fill="#343738"
					d="M361.87,240.25H6.26a3.2,3.2,0,0,1-3.2-3.19V154.79a3.21,3.21,0,0,1,3.2-3.2H361.87a3.2,3.2,0,0,1,3.19,3.2v82.27A3.19,3.19,0,0,1,361.87,240.25ZM6.26,153.59a1.2,1.2,0,0,0-1.2,1.2v82.27a1.19,1.19,0,0,0,1.2,1.19H361.87a1.19,1.19,0,0,0,1.19-1.19V154.79a1.19,1.19,0,0,0-1.19-1.2Z"
				/>
				<path
					fill="#231f20"
					d="M18.09,20.28a11.33,11.33,0,0,1,2-.16,3.34,3.34,0,0,1,2.27.67,2.19,2.19,0,0,1,.71,1.69,2.37,2.37,0,0,1-.63,1.73A3.34,3.34,0,0,1,20,25.1a3.61,3.61,0,0,1-.84-.07v3.24h-1Zm1,3.9a3.58,3.58,0,0,0,.87.08c1.25,0,2-.61,2-1.73S21.27,21,20.12,21a5.05,5.05,0,0,0-1,.08Z"
				/>
				<path
					fill="#231f20"
					d="M29.39,25.32A2.84,2.84,0,0,1,26.5,28.4a2.76,2.76,0,0,1-2.78-3,2.83,2.83,0,0,1,2.88-3.08A2.75,2.75,0,0,1,29.39,25.32Zm-4.61.06c0,1.27.74,2.23,1.77,2.23s1.76-.95,1.76-2.26c0-1-.49-2.23-1.74-2.23S24.78,24.27,24.78,25.38Z"
				/>
				<path
					fill="#231f20"
					d="M30.58,27.19a2.79,2.79,0,0,0,1.39.42c.77,0,1.13-.39,1.13-.87S32.8,26,32,25.68c-1-.38-1.54-.95-1.54-1.65a1.8,1.8,0,0,1,2-1.7,2.9,2.9,0,0,1,1.42.36l-.26.77a2.22,2.22,0,0,0-1.19-.34c-.62,0-1,.36-1,.79s.35.7,1.11,1c1,.38,1.52.88,1.52,1.75,0,1-.79,1.74-2.17,1.74a3.27,3.27,0,0,1-1.63-.4Z"
				/>
				<path
					fill="#231f20"
					d="M36.75,20.79v1.67h1.51v.8H36.75v3.13c0,.72.2,1.13.79,1.13a2.21,2.21,0,0,0,.61-.07l.05.79a2.48,2.48,0,0,1-.94.15,1.47,1.47,0,0,1-1.14-.45,2.15,2.15,0,0,1-.4-1.51V23.26h-.9v-.8h.9V21.07Z"
				/>
				<path
					fill="#231f20"
					d="M43.07,21.07H40.61v-.89h6v.89H44.13v7.2H43.07Z"
				/>
				<path
					fill="#231f20"
					d="M48.5,20.83a.63.63,0,0,1-.68.65.63.63,0,0,1-.63-.65.64.64,0,0,1,.66-.66A.63.63,0,0,1,48.5,20.83Zm-1.18,7.44V22.46h1.06v5.81Z"
				/>
				<path
					fill="#231f20"
					d="M51.4,20.79v1.67h1.51v.8H51.4v3.13c0,.72.2,1.13.79,1.13a2.15,2.15,0,0,0,.61-.07l.05.79a2.42,2.42,0,0,1-.93.15,1.45,1.45,0,0,1-1.14-.45,2.15,2.15,0,0,1-.41-1.51V23.26h-.9v-.8h.9V21.07Z"
				/>
				<path fill="#231f20" d="M54.1,19.75h1.06v8.52H54.1Z" />
				<path
					fill="#231f20"
					d="M57.52,25.55a1.86,1.86,0,0,0,2,2,3.8,3.8,0,0,0,1.61-.3l.18.76a4.84,4.84,0,0,1-1.93.36,2.7,2.7,0,0,1-2.86-2.93c0-1.75,1-3.13,2.72-3.13a2.46,2.46,0,0,1,2.4,2.73,4.49,4.49,0,0,1,0,.49Zm3.09-.75a1.5,1.5,0,0,0-1.46-1.72,1.76,1.76,0,0,0-1.62,1.72Z"
				/>
				<rect
					fill="#bcbec0"
					x="4.07"
					y="56.49"
					width="360"
					height="33.44"
					rx="2.2"
				/>
				<path
					fill="#343738"
					d="M361.87,90.93H6.26a3.2,3.2,0,0,1-3.2-3.2v-29a3.2,3.2,0,0,1,3.2-3.2H361.87a3.19,3.19,0,0,1,3.19,3.2v29A3.19,3.19,0,0,1,361.87,90.93ZM6.26,57.49a1.2,1.2,0,0,0-1.2,1.2v29a1.2,1.2,0,0,0,1.2,1.2H361.87a1.19,1.19,0,0,0,1.19-1.2v-29a1.19,1.19,0,0,0-1.19-1.2Z"
				/>
				<path
					fill="#231f20"
					d="M17.94,75.46a3.72,3.72,0,0,0,1.88.53c1.06,0,1.69-.57,1.69-1.38S21.07,73.42,20,73c-1.32-.47-2.13-1.15-2.13-2.29a2.32,2.32,0,0,1,2.61-2.19,3.73,3.73,0,0,1,1.79.39l-.29.85a3.24,3.24,0,0,0-1.53-.38c-1.11,0-1.53.66-1.53,1.21,0,.76.5,1.13,1.61,1.56,1.37.53,2.06,1.19,2.06,2.37s-.92,2.33-2.83,2.33a4.25,4.25,0,0,1-2.06-.51Z"
				/>
				<path
					fill="#231f20"
					d="M24.63,74a1.86,1.86,0,0,0,2,2,4,4,0,0,0,1.61-.3l.18.75a4.72,4.72,0,0,1-1.94.36,2.69,2.69,0,0,1-2.85-2.92c0-1.76,1-3.13,2.72-3.13a2.45,2.45,0,0,1,2.4,2.73,4.68,4.68,0,0,1,0,.49Zm3.09-.76a1.5,1.5,0,0,0-1.46-1.71,1.74,1.74,0,0,0-1.62,1.71Z"
				/>
				<path fill="#231f20" d="M30.05,68.22h1.06v8.51H30.05Z" />
				<path
					fill="#231f20"
					d="M33.47,74a1.87,1.87,0,0,0,2,2,4,4,0,0,0,1.61-.3l.18.75a4.67,4.67,0,0,1-1.93.36,2.69,2.69,0,0,1-2.86-2.92c0-1.76,1-3.13,2.73-3.13a2.46,2.46,0,0,1,2.4,2.73,4.15,4.15,0,0,1,0,.49Zm3.1-.76a1.5,1.5,0,0,0-1.47-1.71,1.76,1.76,0,0,0-1.62,1.71Z"
				/>
				<path
					fill="#231f20"
					d="M43,76.52a3.9,3.9,0,0,1-1.66.33,2.76,2.76,0,0,1-2.89-3,2.94,2.94,0,0,1,3.12-3.08,3.44,3.44,0,0,1,1.46.3l-.24.81a2.5,2.5,0,0,0-1.22-.27,2.18,2.18,0,0,0,0,4.36,2.86,2.86,0,0,0,1.29-.29Z"
				/>
				<path
					fill="#231f20"
					d="M45.7,69.26v1.67h1.51v.8H45.7v3.13c0,.72.2,1.13.79,1.13a2.6,2.6,0,0,0,.61-.07l0,.79a2.67,2.67,0,0,1-.93.14,1.44,1.44,0,0,1-1.14-.44,2.15,2.15,0,0,1-.41-1.51V71.73h-.9v-.8h.9V69.54Z"
				/>
				<path
					fill="#231f20"
					d="M56.63,76.47a5.25,5.25,0,0,1-2.14.38,3.78,3.78,0,0,1-4-4.09,4,4,0,0,1,4.22-4.24,4.26,4.26,0,0,1,1.92.36l-.25.85a3.84,3.84,0,0,0-1.63-.34,3,3,0,0,0-3.16,3.34A2.94,2.94,0,0,0,54.71,76a4.21,4.21,0,0,0,1.7-.34Z"
				/>
				<path
					fill="#231f20"
					d="M61,76.73,61,76h0a2.13,2.13,0,0,1-1.77.86,1.65,1.65,0,0,1-1.78-1.66c0-1.41,1.25-2.17,3.49-2.16v-.12a1.2,1.2,0,0,0-1.32-1.35A2.84,2.84,0,0,0,58,72l-.24-.7a3.63,3.63,0,0,1,1.91-.51c1.78,0,2.21,1.21,2.21,2.37v2.17A8.39,8.39,0,0,0,62,76.73Zm-.15-3c-1.15,0-2.46.18-2.46,1.31a.93.93,0,0,0,1,1,1.45,1.45,0,0,0,1.41-1,1.36,1.36,0,0,0,.06-.33Z"
				/>
				<path
					fill="#231f20"
					d="M64.83,69.26v1.67h1.51v.8H64.83v3.13c0,.72.2,1.13.79,1.13a2.68,2.68,0,0,0,.61-.07l0,.79a2.73,2.73,0,0,1-.94.14,1.45,1.45,0,0,1-1.14-.44,2.15,2.15,0,0,1-.4-1.51V71.73h-.9v-.8h.9V69.54Z"
				/>
				<path
					fill="#231f20"
					d="M68,74a1.87,1.87,0,0,0,2,2,3.92,3.92,0,0,0,1.61-.3l.18.75a4.67,4.67,0,0,1-1.93.36A2.69,2.69,0,0,1,67,73.93c0-1.76,1-3.13,2.72-3.13a2.46,2.46,0,0,1,2.4,2.73,4.15,4.15,0,0,1,0,.49Zm3.1-.76a1.5,1.5,0,0,0-1.47-1.71,1.74,1.74,0,0,0-1.61,1.71Z"
				/>
				<path
					fill="#231f20"
					d="M78.47,70.93c0,.42,0,.88,0,1.59v3.37a3.31,3.31,0,0,1-.83,2.65,3.06,3.06,0,0,1-2.11.7,3.78,3.78,0,0,1-1.93-.48l.26-.81a3.31,3.31,0,0,0,1.71.46c1.08,0,1.87-.56,1.87-2v-.64h0a2.08,2.08,0,0,1-1.85,1,2.6,2.6,0,0,1-2.47-2.83,2.78,2.78,0,0,1,2.61-3.08,1.92,1.92,0,0,1,1.81,1h0l0-.87Zm-1.09,2.29a1.44,1.44,0,0,0-.06-.48,1.53,1.53,0,0,0-1.48-1.12c-1,0-1.73.85-1.73,2.2,0,1.14.58,2.08,1.72,2.08a1.52,1.52,0,0,0,1.46-1.08,1.82,1.82,0,0,0,.09-.56Z"
				/>
				<path
					fill="#231f20"
					d="M85.43,73.78a2.83,2.83,0,0,1-2.89,3.08,2.76,2.76,0,0,1-2.78-3,2.83,2.83,0,0,1,2.87-3.08A2.75,2.75,0,0,1,85.43,73.78Zm-4.61.06c0,1.27.74,2.23,1.77,2.23s1.76-.95,1.76-2.25c0-1-.49-2.23-1.74-2.23S80.82,72.74,80.82,73.84Z"
				/>
				<path
					fill="#231f20"
					d="M86.76,72.74c0-.69,0-1.27,0-1.81h.92l0,1.14h0a1.75,1.75,0,0,1,1.61-1.27,1.39,1.39,0,0,1,.3,0v1a1.32,1.32,0,0,0-.36,0,1.49,1.49,0,0,0-1.42,1.36,3.47,3.47,0,0,0,0,.49v3.09h-1Z"
				/>
				<path
					fill="#231f20"
					d="M91.91,69.3a.62.62,0,0,1-.67.64.63.63,0,0,1-.64-.64.64.64,0,0,1,.66-.66A.62.62,0,0,1,91.91,69.3Zm-1.18,7.43v-5.8h1.06v5.8Z"
				/>
				<path
					fill="#231f20"
					d="M93.4,75.65a2.69,2.69,0,0,0,1.39.42c.77,0,1.13-.38,1.13-.86s-.3-.78-1.08-1.07c-1-.37-1.54-1-1.54-1.64a1.79,1.79,0,0,1,2-1.7,2.9,2.9,0,0,1,1.42.35l-.26.77a2.32,2.32,0,0,0-1.19-.33c-.62,0-1,.36-1,.79s.35.69,1.1,1c1,.39,1.53.89,1.53,1.75,0,1-.79,1.74-2.17,1.74a3.27,3.27,0,0,1-1.63-.39Z"
				/>
				<path
					fill="#231f20"
					d="M22.27,121.41H19.13v2.91h3.5v.88H18.09v-8.09h4.36V118H19.13v2.55h3.14Z"
				/>
				<path
					fill="#231f20"
					d="M24,121c0-.6,0-1.09-.05-1.57h.92l.05.94h0a2,2,0,0,1,1.82-1.07,1.71,1.71,0,0,1,1.64,1.16h0a2.39,2.39,0,0,1,.64-.75,2,2,0,0,1,1.29-.41c.76,0,1.9.5,1.9,2.52v3.42h-1v-3.29c0-1.11-.41-1.79-1.26-1.79a1.37,1.37,0,0,0-1.24,1,1.73,1.73,0,0,0-.09.53v3.59h-1v-3.48c0-.92-.41-1.6-1.21-1.6A1.56,1.56,0,0,0,25,121.7v3.5H24Z"
				/>
				<path
					fill="#231f20"
					d="M37.18,125.2l-.08-.73h0a2.19,2.19,0,0,1-1.78.86,1.65,1.65,0,0,1-1.77-1.67c0-1.4,1.25-2.17,3.49-2.16v-.12A1.19,1.19,0,0,0,35.68,120a2.93,2.93,0,0,0-1.51.43l-.24-.69a3.52,3.52,0,0,1,1.91-.52c1.77,0,2.2,1.21,2.2,2.38v2.17a8.4,8.4,0,0,0,.1,1.39Zm-.16-3c-1.15,0-2.46.18-2.46,1.3a.94.94,0,0,0,1,1,1.44,1.44,0,0,0,1.4-1,1,1,0,0,0,.06-.34Z"
				/>
				<path
					fill="#231f20"
					d="M40.92,117.76a.62.62,0,0,1-.67.65.63.63,0,0,1-.63-.65.64.64,0,0,1,.66-.66A.62.62,0,0,1,40.92,117.76Zm-1.17,7.44v-5.81h1v5.81Z"
				/>
				<path fill="#231f20" d="M42.56,116.68h1v8.52h-1Z" />
				<path
					fill="#231f20"
					d="M49.27,122.66l-.83,2.54H47.36l2.74-8.09h1.26l2.76,8.09H53l-.87-2.54Zm2.66-.82-.8-2.33c-.18-.52-.3-1-.42-1.47h0c-.12.48-.25,1-.41,1.46l-.79,2.34Z"
				/>
				<path
					fill="#231f20"
					d="M60.14,116.68v7c0,.51,0,1.1,0,1.5h-.94l0-1h0a2.14,2.14,0,0,1-2,1.14c-1.4,0-2.48-1.19-2.48-3,0-1.93,1.19-3.12,2.6-3.12a2,2,0,0,1,1.76.89h0v-3.47Zm-1,5.08a1.68,1.68,0,0,0-.05-.45,1.54,1.54,0,0,0-1.52-1.22c-1.09,0-1.74,1-1.74,2.24s.57,2.15,1.71,2.15A1.59,1.59,0,0,0,59,123.22a1.71,1.71,0,0,0,.05-.46Z"
				/>
				<path
					fill="#231f20"
					d="M66.91,116.68v7c0,.51,0,1.1,0,1.5H66l0-1h0a2.14,2.14,0,0,1-2,1.14c-1.4,0-2.48-1.19-2.48-3,0-1.93,1.19-3.12,2.6-3.12a1.93,1.93,0,0,1,1.75.89h0v-3.47Zm-1,5.08a1.68,1.68,0,0,0,0-.45,1.55,1.55,0,0,0-1.52-1.22c-1.09,0-1.74,1-1.74,2.24s.57,2.15,1.71,2.15a1.59,1.59,0,0,0,1.55-1.26,1.71,1.71,0,0,0,0-.46Z"
				/>
				<path
					fill="#231f20"
					d="M68.67,121.2c0-.68,0-1.27,0-1.81h.92l0,1.14h0a1.74,1.74,0,0,1,1.6-1.27.91.91,0,0,1,.3,0v1a1.79,1.79,0,0,0-.36,0,1.47,1.47,0,0,0-1.41,1.35,2.46,2.46,0,0,0-.05.49v3.1h-1Z"
				/>
				<path
					fill="#231f20"
					d="M73.06,122.49a1.86,1.86,0,0,0,2,2,3.8,3.8,0,0,0,1.61-.3l.18.76a4.67,4.67,0,0,1-1.93.36,2.7,2.7,0,0,1-2.86-2.93c0-1.75,1-3.13,2.72-3.13a2.46,2.46,0,0,1,2.4,2.74,4.88,4.88,0,0,1,0,.49Zm3.09-.76A1.49,1.49,0,0,0,74.69,120a1.75,1.75,0,0,0-1.62,1.71Z"
				/>
				<path
					fill="#231f20"
					d="M78.34,124.12a2.79,2.79,0,0,0,1.39.42c.77,0,1.13-.39,1.13-.86s-.3-.79-1.08-1.07c-1-.37-1.54-1-1.54-1.65a1.8,1.8,0,0,1,2-1.7,2.9,2.9,0,0,1,1.42.36l-.26.77a2.22,2.22,0,0,0-1.19-.34c-.62,0-1,.36-1,.79s.35.7,1.1,1c1,.38,1.53.89,1.53,1.75,0,1-.79,1.74-2.17,1.74a3.27,3.27,0,0,1-1.63-.4Z"
				/>
				<path
					fill="#231f20"
					d="M83.09,124.12a2.82,2.82,0,0,0,1.39.42c.77,0,1.13-.39,1.13-.86s-.3-.79-1.08-1.07c-1-.37-1.53-1-1.53-1.65a1.79,1.79,0,0,1,2-1.7,2.94,2.94,0,0,1,1.43.36l-.27.77a2.19,2.19,0,0,0-1.19-.34c-.62,0-1,.36-1,.79s.35.7,1.11,1c1,.38,1.52.89,1.52,1.75,0,1-.79,1.74-2.17,1.74a3.3,3.3,0,0,1-1.63-.4Z"
				/>
				<path
					fill="#231f20"
					d="M18.09,162.76a12.38,12.38,0,0,1,2-.16,3.34,3.34,0,0,1,2.27.67,2.22,2.22,0,0,1,.71,1.7,2.36,2.36,0,0,1-.63,1.72,3.34,3.34,0,0,1-2.47.89,3.61,3.61,0,0,1-.84-.07v3.24h-1Zm1,3.9a3.58,3.58,0,0,0,.87.08c1.25,0,2-.61,2-1.73s-.75-1.58-1.9-1.58a5.05,5.05,0,0,0-1,.08Z"
				/>
				<path
					fill="#231f20"
					d="M29.39,167.8a2.84,2.84,0,0,1-2.89,3.08,2.76,2.76,0,0,1-2.78-3,2.83,2.83,0,0,1,2.88-3.08A2.75,2.75,0,0,1,29.39,167.8Zm-4.61.06c0,1.27.74,2.23,1.77,2.23s1.76-1,1.76-2.26c0-1-.49-2.23-1.74-2.23S24.78,166.75,24.78,167.86Z"
				/>
				<path
					fill="#231f20"
					d="M30.58,169.67a2.79,2.79,0,0,0,1.39.42c.77,0,1.13-.39,1.13-.87s-.3-.78-1.08-1.06c-1-.38-1.54-.95-1.54-1.65a1.8,1.8,0,0,1,2-1.7,2.9,2.9,0,0,1,1.42.36l-.26.77a2.22,2.22,0,0,0-1.19-.34c-.62,0-1,.36-1,.79s.35.7,1.11,1c1,.38,1.52.88,1.52,1.75,0,1-.79,1.74-2.17,1.74a3.27,3.27,0,0,1-1.63-.4Z"
				/>
				<path
					fill="#231f20"
					d="M36.75,163.27v1.67h1.51v.81H36.75v3.13c0,.72.2,1.12.79,1.12a2.21,2.21,0,0,0,.61-.07l.05.79a2.48,2.48,0,0,1-.94.15,1.47,1.47,0,0,1-1.14-.45,2.13,2.13,0,0,1-.4-1.51v-3.16h-.9v-.81h.9v-1.39Z"
				/>
				<path
					fill="#231f20"
					d="M47.68,170.48a5.05,5.05,0,0,1-2.14.39,3.77,3.77,0,0,1-4-4.09,4,4,0,0,1,4.22-4.25,4.4,4.4,0,0,1,1.92.36l-.25.85a3.85,3.85,0,0,0-1.63-.33,3,3,0,0,0-3.16,3.33A2.94,2.94,0,0,0,45.76,170a4.25,4.25,0,0,0,1.7-.33Z"
				/>
				<path
					fill="#231f20"
					d="M54.07,167.8a2.84,2.84,0,0,1-2.89,3.08,2.76,2.76,0,0,1-2.78-3,2.83,2.83,0,0,1,2.88-3.08A2.74,2.74,0,0,1,54.07,167.8Zm-4.6.06c0,1.27.73,2.23,1.76,2.23s1.76-1,1.76-2.26c0-1-.49-2.23-1.74-2.23S49.47,166.75,49.47,167.86Z"
				/>
				<path
					fill="#231f20"
					d="M55.41,166.51c0-.6,0-1.09,0-1.57h.94l.06,1h0a2.14,2.14,0,0,1,1.92-1.09c.8,0,2.05.48,2.05,2.47v3.47H59.29V167.4c0-.93-.34-1.71-1.34-1.71a1.5,1.5,0,0,0-1.41,1.07,1.54,1.54,0,0,0-.08.5v3.49H55.41Z"
				/>
				<path
					fill="#231f20"
					d="M63.29,163.27v1.67H64.8v.81H63.29v3.13c0,.72.21,1.12.79,1.12a2.15,2.15,0,0,0,.61-.07l0,.79a2.39,2.39,0,0,1-.93.15,1.46,1.46,0,0,1-1.14-.45,2.13,2.13,0,0,1-.41-1.51v-3.16h-.9v-.81h.9v-1.39Z"
				/>
				<path
					fill="#231f20"
					d="M66.51,168a1.85,1.85,0,0,0,2,2,3.83,3.83,0,0,0,1.61-.3l.18.76a4.72,4.72,0,0,1-1.94.36,2.7,2.7,0,0,1-2.85-2.93c0-1.75,1-3.13,2.72-3.13a2.46,2.46,0,0,1,2.4,2.73,4.92,4.92,0,0,1,0,.5Zm3.09-.76a1.5,1.5,0,0,0-1.46-1.71,1.74,1.74,0,0,0-1.62,1.71Z"
				/>
				<path
					fill="#231f20"
					d="M71.93,166.51c0-.6,0-1.09-.05-1.57h.94l.06,1h0a2.14,2.14,0,0,1,1.92-1.09c.81,0,2.05.48,2.05,2.47v3.47H75.82V167.4c0-.93-.35-1.71-1.35-1.71a1.5,1.5,0,0,0-1.41,1.07,1.55,1.55,0,0,0-.07.5v3.49H71.93Z"
				/>
				<path
					fill="#231f20"
					d="M79.81,163.27v1.67h1.52v.81H79.81v3.13c0,.72.21,1.12.8,1.12a2.21,2.21,0,0,0,.61-.07l0,.79a2.48,2.48,0,0,1-.94.15,1.46,1.46,0,0,1-1.14-.45,2.13,2.13,0,0,1-.41-1.51v-3.16h-.9v-.81h.9v-1.39Z"
				/>
				<rect
					fill="#414042"
					x="4.07"
					y="256.56"
					width="180"
					height="35.07"
					rx="3.24"
				/>
				<path
					fill="#fff"
					d="M64.79,276.35a3.68,3.68,0,0,0,1.87.53c1.07,0,1.69-.57,1.69-1.38s-.43-1.19-1.52-1.61c-1.32-.47-2.14-1.15-2.14-2.29a2.33,2.33,0,0,1,2.62-2.19,3.73,3.73,0,0,1,1.79.39l-.29.85a3.29,3.29,0,0,0-1.54-.38c-1.1,0-1.52.66-1.52,1.21,0,.76.49,1.13,1.61,1.56,1.36.53,2.06,1.19,2.06,2.37s-.92,2.33-2.83,2.33a4.13,4.13,0,0,1-2.06-.52Z"
				/>
				<path
					fill="#fff"
					d="M75.67,276c0,.6,0,1.13,0,1.58h-.94l-.06-.95h0a2.19,2.19,0,0,1-1.92,1.08c-.91,0-2-.5-2-2.54v-3.39h1V275c0,1.1.34,1.85,1.3,1.85a1.52,1.52,0,0,0,1.39-1,1.57,1.57,0,0,0,.1-.54v-3.56h1Z"
				/>
				<path
					fill="#fff"
					d="M77.38,277.62c0-.4.05-1,.05-1.5v-7h1v3.64h0a2.18,2.18,0,0,1,2-1.07c1.44,0,2.46,1.2,2.45,3,0,2.07-1.31,3.1-2.6,3.1a2.08,2.08,0,0,1-1.95-1.09h0l0,1Zm1.09-2.33a1.6,1.6,0,0,0,0,.39,1.62,1.62,0,0,0,1.58,1.23c1.1,0,1.76-.9,1.76-2.23,0-1.16-.6-2.16-1.72-2.16a1.7,1.7,0,0,0-1.61,1.3,2.34,2.34,0,0,0-.06.43Z"
				/>
				<path
					fill="#fff"
					d="M84.25,273.39c0-.6,0-1.09,0-1.57h.92l.05.93h0A2,2,0,0,1,87,271.68a1.71,1.71,0,0,1,1.64,1.17h0a2.35,2.35,0,0,1,.65-.76,2,2,0,0,1,1.28-.41c.77,0,1.91.51,1.91,2.52v3.42h-1v-3.28c0-1.12-.41-1.79-1.26-1.79a1.36,1.36,0,0,0-1.25,1,2,2,0,0,0-.08.53v3.58h-1v-3.48c0-.92-.41-1.59-1.21-1.59a1.45,1.45,0,0,0-1.31,1.05,1.49,1.49,0,0,0-.08.52v3.5h-1Z"
				/>
				<path
					fill="#fff"
					d="M95.44,270.18a.66.66,0,0,1-1.31,0,.64.64,0,0,1,.66-.65A.62.62,0,0,1,95.44,270.18Zm-1.18,7.44v-5.8h1.06v5.8Z"
				/>
				<path
					fill="#fff"
					d="M98.34,270.15v1.67h1.51v.8H98.34v3.13c0,.72.21,1.13.79,1.13a2.6,2.6,0,0,0,.61-.07l.05.79a2.63,2.63,0,0,1-.93.14,1.45,1.45,0,0,1-1.14-.44,2.15,2.15,0,0,1-.41-1.51v-3.17h-.9v-.8h.9v-1.39Z"
				/>
				<path
					fill="#fff"
					d="M103.62,269.63a12.81,12.81,0,0,1,2-.15,3.31,3.31,0,0,1,2.26.67,2.15,2.15,0,0,1,.71,1.69,2.42,2.42,0,0,1-.62,1.73,3.4,3.4,0,0,1-2.47.88,3.56,3.56,0,0,1-.84-.07v3.24h-1Zm1,3.9a3.38,3.38,0,0,0,.86.09c1.26,0,2-.62,2-1.73s-.76-1.59-1.91-1.59a4.11,4.11,0,0,0-1,.09Z"
				/>
				<path
					fill="#fff"
					d="M114.92,274.67a2.83,2.83,0,0,1-2.89,3.08,2.76,2.76,0,0,1-2.78-3,2.84,2.84,0,0,1,2.88-3.09A2.75,2.75,0,0,1,114.92,274.67Zm-4.6.06c0,1.27.73,2.23,1.76,2.23s1.76-.95,1.76-2.25c0-1-.49-2.23-1.74-2.23S110.32,273.63,110.32,274.73Z"
				/>
				<path
					fill="#fff"
					d="M116.11,276.54a2.76,2.76,0,0,0,1.4.42c.76,0,1.12-.38,1.12-.86s-.3-.78-1.08-1.07c-1-.37-1.53-.95-1.53-1.64a1.79,1.79,0,0,1,2-1.71,2.94,2.94,0,0,1,1.43.36l-.27.77a2.25,2.25,0,0,0-1.18-.33c-.63,0-1,.36-1,.79s.34.69,1.1,1c1,.39,1.52.89,1.52,1.75,0,1-.79,1.74-2.17,1.74a3.33,3.33,0,0,1-1.63-.39Z"
				/>
				<path
					fill="#fff"
					d="M122.28,270.15v1.67h1.51v.8h-1.51v3.13c0,.72.2,1.13.79,1.13a2.6,2.6,0,0,0,.61-.07l0,.79a2.67,2.67,0,0,1-.93.14,1.45,1.45,0,0,1-1.14-.44,2.15,2.15,0,0,1-.41-1.51v-3.17h-.9v-.8h.9v-1.39Z"
				/>
			</svg>
		),
	},

	// {
	//     name: 'reviews-form-1',
	//     title: __('Reviews Form'),
	//     description: __('Reviews Form'),

	//     isPro: false,

	//     innerBlocks: [
	//         ['post-grid/form-field-input', {}],
	//         ['post-grid/form-field-input', {}],

	//     ],
	//     scope: ['block'],
	//     icon: (

	//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 368.13 299.66"><rect fill="#bcbec0" x="4.06" y="47.99" width="360" height="33.44" rx="2.2" /><path fill="#343738" d="M361.87,82.42H6.26a3.19,3.19,0,0,1-3.19-3.19V50.18A3.19,3.19,0,0,1,6.26,47H361.87a3.2,3.2,0,0,1,3.2,3.19V79.23A3.2,3.2,0,0,1,361.87,82.42ZM6.26,49a1.19,1.19,0,0,0-1.19,1.19V79.23a1.19,1.19,0,0,0,1.19,1.19H361.87a1.19,1.19,0,0,0,1.2-1.19V50.18a1.19,1.19,0,0,0-1.2-1.19Z" /><path fill="#231f20" d="M19.89,68.23V64.8l-2.56-4.66h1.19l1.14,2.23c.31.61.55,1.11.8,1.67h0c.23-.53.5-1.06.81-1.67l1.17-2.23h1.18l-2.71,4.64v3.45Z" /><path fill="#231f20" d="M28.89,65.28A2.84,2.84,0,0,1,26,68.36a2.76,2.76,0,0,1-2.79-3,2.84,2.84,0,0,1,2.88-3.08A2.75,2.75,0,0,1,28.89,65.28Zm-4.61.06c0,1.27.73,2.23,1.76,2.23s1.77-.95,1.77-2.26c0-1-.49-2.23-1.74-2.23S24.28,64.23,24.28,65.34Z" /><path fill="#231f20" d="M35.08,66.64c0,.6,0,1.13.05,1.59h-.94l-.06-1h0a2.19,2.19,0,0,1-1.92,1.08c-.91,0-2-.51-2-2.54v-3.4h1v3.22c0,1.1.34,1.84,1.3,1.84a1.53,1.53,0,0,0,1.39-1A1.49,1.49,0,0,0,34,66V62.42h1.06Z" /><path fill="#231f20" d="M36.83,64.23c0-.68,0-1.27,0-1.81h.93l0,1.14h0a1.75,1.75,0,0,1,1.61-1.27,1,1,0,0,1,.3,0v1a1.88,1.88,0,0,0-.36,0,1.5,1.5,0,0,0-1.42,1.36,3.47,3.47,0,0,0,0,.49v3.1H36.83Z" /><path fill="#231f20" d="M43.34,68.23V60.14h1.14l2.59,4.09a23.83,23.83,0,0,1,1.45,2.63h0c-.09-1.08-.12-2.07-.12-3.33V60.14h1v8.09H48.35l-2.57-4.11a27.32,27.32,0,0,1-1.51-2.69h0c.06,1,.08,2,.08,3.33v3.46Z" /><path fill="#231f20" d="M54.41,68.23l-.08-.74h0a2.15,2.15,0,0,1-1.77.87,1.66,1.66,0,0,1-1.78-1.67c0-1.4,1.25-2.17,3.49-2.16v-.12a1.19,1.19,0,0,0-1.32-1.34,2.93,2.93,0,0,0-1.51.43l-.24-.69a3.55,3.55,0,0,1,1.91-.52c1.77,0,2.2,1.21,2.2,2.37v2.17a8.44,8.44,0,0,0,.1,1.4Zm-.16-3c-1.15,0-2.45.18-2.45,1.31a.93.93,0,0,0,1,1,1.45,1.45,0,0,0,1.41-1,1.33,1.33,0,0,0,0-.34Z" /><path fill="#231f20" d="M57,64c0-.6,0-1.09,0-1.57h.93l0,.94h0a2,2,0,0,1,1.82-1.07,1.72,1.72,0,0,1,1.65,1.16h0a2.42,2.42,0,0,1,.65-.75,2,2,0,0,1,1.28-.41c.77,0,1.91.5,1.91,2.52v3.42h-1V64.94c0-1.12-.41-1.79-1.26-1.79a1.38,1.38,0,0,0-1.25,1,1.74,1.74,0,0,0-.08.53v3.59h-1V64.75c0-.93-.41-1.6-1.22-1.6a1.43,1.43,0,0,0-1.3,1.06,1.4,1.4,0,0,0-.09.51v3.51H57Z" /><path fill="#231f20" d="M67.58,65.52a1.85,1.85,0,0,0,2,2,3.75,3.75,0,0,0,1.6-.3l.18.76a4.8,4.8,0,0,1-1.93.36,2.7,2.7,0,0,1-2.85-2.93c0-1.75,1-3.13,2.72-3.13A2.46,2.46,0,0,1,71.69,65a2.85,2.85,0,0,1,0,.5Zm3.09-.76A1.5,1.5,0,0,0,69.21,63a1.75,1.75,0,0,0-1.62,1.72Z" /><rect fill="#bcbec0" x="4.06" y="96.45" width="360" height="33.44" rx="2.2" /><path fill="#343738" d="M361.87,130.89H6.26a3.19,3.19,0,0,1-3.19-3.2v-29a3.19,3.19,0,0,1,3.19-3.2H361.87a3.2,3.2,0,0,1,3.2,3.2v29A3.2,3.2,0,0,1,361.87,130.89ZM6.26,97.45a1.19,1.19,0,0,0-1.19,1.2v29a1.19,1.19,0,0,0,1.19,1.2H361.87a1.2,1.2,0,0,0,1.2-1.2v-29a1.2,1.2,0,0,0-1.2-1.2Z" /><path fill="#231f20" d="M22.28,112.9H19.13v2.92h3.5v.87H18.09v-8.08h4.36v.87H19.13V112h3.15Z" /><path fill="#231f20" d="M24,112.46c0-.6,0-1.09-.05-1.57h.92l.05.93h0a2,2,0,0,1,1.82-1.06,1.71,1.71,0,0,1,1.64,1.16h0a2.44,2.44,0,0,1,.64-.76,2,2,0,0,1,1.29-.4c.77,0,1.9.5,1.9,2.51v3.42h-1v-3.28c0-1.12-.4-1.79-1.26-1.79a1.35,1.35,0,0,0-1.24,1,1.63,1.63,0,0,0-.09.53v3.58h-1v-3.48c0-.92-.41-1.59-1.21-1.59a1.45,1.45,0,0,0-1.31,1,1.49,1.49,0,0,0-.08.52v3.5H24Z" /><path fill="#231f20" d="M37.18,116.69,37.1,116h0a2.15,2.15,0,0,1-1.78.86,1.65,1.65,0,0,1-1.77-1.66c0-1.41,1.25-2.17,3.49-2.16v-.12a1.19,1.19,0,0,0-1.32-1.34,2.84,2.84,0,0,0-1.51.43l-.24-.7a3.61,3.61,0,0,1,1.91-.51c1.77,0,2.2,1.21,2.2,2.37v2.17a8.32,8.32,0,0,0,.1,1.39Zm-.16-3c-1.15,0-2.45.18-2.45,1.31a.93.93,0,0,0,1,1,1.43,1.43,0,0,0,1.4-1,.92.92,0,0,0,.06-.33Z" /><path fill="#231f20" d="M40.92,109.26a.65.65,0,0,1-1.3,0,.64.64,0,0,1,.66-.66A.62.62,0,0,1,40.92,109.26Zm-1.17,7.43v-5.8h1v5.8Z" /><path fill="#231f20" d="M42.56,108.18h1v8.51h-1Z" /><path fill="#231f20" d="M49.28,114.15l-.84,2.54H47.36l2.74-8.08h1.26l2.76,8.08H53l-.87-2.54Zm2.65-.82-.8-2.32a15.27,15.27,0,0,1-.41-1.48h0c-.12.48-.25,1-.41,1.47l-.79,2.33Z" /><path fill="#231f20" d="M60.15,108.18v7c0,.52,0,1.11,0,1.5h-.94l0-1h0a2.13,2.13,0,0,1-2,1.14c-1.41,0-2.49-1.18-2.49-2.95,0-1.93,1.19-3.11,2.61-3.11a2,2,0,0,1,1.75.88h0v-3.46Zm-1.06,5.07a1.65,1.65,0,0,0-.05-.44,1.54,1.54,0,0,0-1.52-1.23c-1.09,0-1.74,1-1.74,2.25S56.36,116,57.5,116a1.67,1.67,0,0,0,1.59-1.71Z" /><path fill="#231f20" d="M66.91,108.18v7c0,.52,0,1.11,0,1.5H66l0-1h0a2.14,2.14,0,0,1-2,1.14c-1.4,0-2.48-1.18-2.48-2.95,0-1.93,1.19-3.11,2.6-3.11a1.94,1.94,0,0,1,1.75.88h0v-3.46Zm-1,5.07a1.65,1.65,0,0,0,0-.44,1.54,1.54,0,0,0-1.52-1.23c-1.09,0-1.74,1-1.74,2.25s.57,2.14,1.71,2.14a1.67,1.67,0,0,0,1.6-1.71Z" /><path fill="#231f20" d="M68.67,112.7c0-.68,0-1.27,0-1.81h.92l0,1.14h0a1.74,1.74,0,0,1,1.61-1.27,1.23,1.23,0,0,1,.29,0v1a1.2,1.2,0,0,0-.35,0,1.47,1.47,0,0,0-1.42,1.36,3.37,3.37,0,0,0-.05.49v3.09h-1Z" /><path fill="#231f20" d="M73.06,114a1.86,1.86,0,0,0,2,2,4,4,0,0,0,1.61-.3l.18.75a4.67,4.67,0,0,1-1.93.36,2.69,2.69,0,0,1-2.86-2.92c0-1.76,1-3.13,2.73-3.13a2.45,2.45,0,0,1,2.39,2.73,4.68,4.68,0,0,1,0,.49Zm3.1-.75a1.51,1.51,0,0,0-1.47-1.72,1.75,1.75,0,0,0-1.62,1.72Z" /><path fill="#231f20" d="M78.34,115.61a2.69,2.69,0,0,0,1.39.42c.77,0,1.13-.38,1.13-.86s-.3-.78-1.08-1.07c-1-.37-1.54-.95-1.54-1.64a1.79,1.79,0,0,1,2-1.7,2.83,2.83,0,0,1,1.43.36l-.27.76a2.32,2.32,0,0,0-1.19-.33c-.62,0-1,.36-1,.79s.35.69,1.11,1c1,.39,1.52.89,1.52,1.75,0,1-.79,1.74-2.17,1.74a3.3,3.3,0,0,1-1.63-.39Z" /><path fill="#231f20" d="M83.09,115.61a2.75,2.75,0,0,0,1.39.42c.77,0,1.13-.38,1.13-.86s-.3-.78-1.08-1.07c-1-.37-1.53-.95-1.53-1.64a1.78,1.78,0,0,1,2-1.7,2.83,2.83,0,0,1,1.43.36l-.27.76a2.25,2.25,0,0,0-1.18-.33c-.63,0-1,.36-1,.79s.35.69,1.11,1c1,.39,1.52.89,1.52,1.75,0,1-.79,1.74-2.17,1.74a3.3,3.3,0,0,1-1.63-.39Z" /><rect fill="#bcbec0" x="4.06" y="147.2" width="360" height="86.66" rx="2.2" /><path fill="#343738" d="M361.87,234.86H6.26a3.2,3.2,0,0,1-3.19-3.2V149.39a3.19,3.19,0,0,1,3.19-3.19H361.87a3.2,3.2,0,0,1,3.2,3.19v82.27A3.21,3.21,0,0,1,361.87,234.86ZM6.26,148.2a1.19,1.19,0,0,0-1.19,1.19v82.27a1.19,1.19,0,0,0,1.19,1.2H361.87a1.2,1.2,0,0,0,1.2-1.2V149.39a1.2,1.2,0,0,0-1.2-1.19Z" /><path fill="#231f20" d="M19.41,165.35l-2.05-8.08h1.1l1,4.09c.24,1,.46,2,.6,2.79h0c.14-.8.39-1.76.66-2.8l1.08-4.08h1.09l1,4.1c.23,1,.44,1.92.56,2.77h0c.16-.89.39-1.79.64-2.79l1.07-4.08h1.07l-2.29,8.08H23.85l-1-4.21a22.78,22.78,0,0,1-.53-2.64h0a26.42,26.42,0,0,1-.63,2.64l-1.15,4.21Z" /><path fill="#231f20" d="M28,161.36c0-.69,0-1.27,0-1.81h.92l0,1.14h0a1.76,1.76,0,0,1,1.61-1.28,1.36,1.36,0,0,1,.3,0v1a1.32,1.32,0,0,0-.36,0,1.47,1.47,0,0,0-1.41,1.36,2.38,2.38,0,0,0-.05.49v3.09H28Z" /><path fill="#231f20" d="M33.16,157.91a.62.62,0,0,1-.67.65.63.63,0,0,1-.64-.65.64.64,0,0,1,.66-.65A.62.62,0,0,1,33.16,157.91ZM32,165.35v-5.8H33v5.8Z" /><path fill="#231f20" d="M36.06,157.88v1.67h1.52v.8H36.06v3.13c0,.72.21,1.13.8,1.13a2.68,2.68,0,0,0,.61-.07l.05.79a2.73,2.73,0,0,1-.94.14,1.45,1.45,0,0,1-1.14-.44,2.15,2.15,0,0,1-.41-1.51v-3.17h-.9v-.8H35v-1.39Z" /><path fill="#231f20" d="M39.28,162.64a1.86,1.86,0,0,0,2,2,4,4,0,0,0,1.61-.3l.18.75a4.67,4.67,0,0,1-1.93.36,2.7,2.7,0,0,1-2.86-2.93c0-1.75,1-3.13,2.73-3.13a2.46,2.46,0,0,1,2.39,2.74,4.68,4.68,0,0,1,0,.49Zm3.09-.76a1.49,1.49,0,0,0-1.46-1.71,1.75,1.75,0,0,0-1.62,1.71Z" /><path fill="#231f20" d="M48.53,165.35v-3.43L46,157.27h1.18l1.14,2.23c.32.61.56,1.1.81,1.67h0c.23-.53.51-1.06.82-1.67l1.16-2.23H52.3l-2.71,4.64v3.44Z" /><path fill="#231f20" d="M57.53,162.4a2.83,2.83,0,0,1-2.89,3.08,2.76,2.76,0,0,1-2.78-3,2.84,2.84,0,0,1,2.88-3.09A2.76,2.76,0,0,1,57.53,162.4Zm-4.61.06c0,1.27.74,2.23,1.77,2.23s1.76-.95,1.76-2.25c0-1-.49-2.23-1.74-2.23S52.92,161.36,52.92,162.46Z" /><path fill="#231f20" d="M63.72,163.77c0,.6,0,1.13.05,1.58h-.94l0-.95h0a2.19,2.19,0,0,1-1.92,1.08c-.91,0-2-.5-2-2.54v-3.39h1.05v3.21c0,1.1.34,1.85,1.3,1.85a1.52,1.52,0,0,0,1.39-1,1.57,1.57,0,0,0,.1-.54v-3.56h1Z" /><path fill="#231f20" d="M65.48,161.36c0-.69,0-1.27,0-1.81h.92l0,1.14h0a1.75,1.75,0,0,1,1.6-1.28,1.28,1.28,0,0,1,.3,0v1a1.23,1.23,0,0,0-.36,0,1.47,1.47,0,0,0-1.41,1.36,2.38,2.38,0,0,0,0,.49v3.09h-1Z" /><path fill="#231f20" d="M77.63,165.09a5.2,5.2,0,0,1-2.13.38,3.78,3.78,0,0,1-4-4.09,4,4,0,0,1,4.22-4.24,4.22,4.22,0,0,1,1.92.36l-.25.85a3.84,3.84,0,0,0-1.63-.34,3,3,0,0,0-3.15,3.34,2.94,2.94,0,0,0,3.1,3.25,4.21,4.21,0,0,0,1.7-.34Z" /><path fill="#231f20" d="M84,162.4a2.83,2.83,0,0,1-2.89,3.08,2.76,2.76,0,0,1-2.79-3,2.84,2.84,0,0,1,2.88-3.09A2.76,2.76,0,0,1,84,162.4Zm-4.61.06c0,1.27.73,2.23,1.76,2.23s1.77-.95,1.77-2.25c0-1-.5-2.23-1.74-2.23S79.42,161.36,79.42,162.46Z" /><path fill="#231f20" d="M85.36,161.12c0-.6,0-1.09,0-1.57h.93l0,.93h0a2,2,0,0,1,1.82-1.07,1.72,1.72,0,0,1,1.65,1.17h0a2.35,2.35,0,0,1,.65-.76,2,2,0,0,1,1.28-.41c.77,0,1.91.51,1.91,2.52v3.42h-1v-3.28c0-1.12-.41-1.79-1.26-1.79a1.36,1.36,0,0,0-1.25,1,1.64,1.64,0,0,0-.08.53v3.58H89v-3.48c0-.92-.41-1.59-1.22-1.59a1.43,1.43,0,0,0-1.3,1.05,1.5,1.5,0,0,0-.09.52v3.5h-1Z" /><path fill="#231f20" d="M95.37,161.12c0-.6,0-1.09-.05-1.57h.92l.05.93h0a2,2,0,0,1,1.82-1.07,1.71,1.71,0,0,1,1.64,1.17h0a2.35,2.35,0,0,1,.65-.76,2,2,0,0,1,1.28-.41c.77,0,1.91.51,1.91,2.52v3.42h-1v-3.28c0-1.12-.4-1.79-1.25-1.79a1.36,1.36,0,0,0-1.25,1,1.63,1.63,0,0,0-.09.53v3.58H99v-3.48c0-.92-.4-1.59-1.21-1.59a1.45,1.45,0,0,0-1.31,1.05,1.49,1.49,0,0,0-.08.52v3.5h-1Z" /><path fill="#231f20" d="M106,162.64a1.87,1.87,0,0,0,2,2,3.92,3.92,0,0,0,1.61-.3l.18.75a4.63,4.63,0,0,1-1.93.36,2.69,2.69,0,0,1-2.85-2.93c0-1.75,1-3.13,2.72-3.13a2.47,2.47,0,0,1,2.4,2.74,4.15,4.15,0,0,1,0,.49Zm3.1-.76a1.5,1.5,0,0,0-1.46-1.71,1.74,1.74,0,0,0-1.62,1.71Z" /><path fill="#231f20" d="M111.39,161.12c0-.6,0-1.09,0-1.57h.94l.06,1h0a2.13,2.13,0,0,1,1.92-1.1c.8,0,2,.48,2,2.47v3.47h-1V162c0-.93-.35-1.71-1.35-1.71a1.5,1.5,0,0,0-1.41,1.08,1.45,1.45,0,0,0-.07.49v3.49h-1.06Z" /><path fill="#231f20" d="M119.27,157.88v1.67h1.51v.8h-1.51v3.13c0,.72.21,1.13.79,1.13a2.78,2.78,0,0,0,.62-.07l0,.79a2.63,2.63,0,0,1-.93.14,1.45,1.45,0,0,1-1.14-.44,2.15,2.15,0,0,1-.41-1.51v-3.17h-.9v-.8h.9v-1.39Z" /><rect fill="#414042" x="4.06" y="251.17" width="180" height="35.07" rx="3.24" /><path fill="#fff" d="M50.48,271a3.75,3.75,0,0,0,1.87.52c1.06,0,1.69-.56,1.69-1.38s-.43-1.18-1.52-1.6c-1.32-.47-2.14-1.16-2.14-2.29A2.33,2.33,0,0,1,53,264a3.6,3.6,0,0,1,1.79.4l-.29.85a3.11,3.11,0,0,0-1.53-.39c-1.1,0-1.52.66-1.52,1.22,0,.75.49,1.12,1.6,1.55,1.37.53,2.07,1.19,2.07,2.38s-.93,2.33-2.83,2.33a4.18,4.18,0,0,1-2.07-.52Z" /><path fill="#fff" d="M61.36,270.64c0,.6,0,1.13,0,1.59h-.94l-.06-1h0a2.19,2.19,0,0,1-1.92,1.08c-.91,0-2-.51-2-2.54v-3.4h1.06v3.22c0,1.1.34,1.84,1.29,1.84a1.54,1.54,0,0,0,1.4-1,1.49,1.49,0,0,0,.09-.54v-3.56h1.06Z" /><path fill="#fff" d="M63.06,272.23c0-.4,0-1,0-1.5v-7h1v3.65h0a2.15,2.15,0,0,1,2-1.07c1.44,0,2.46,1.2,2.45,3,0,2.08-1.31,3.11-2.61,3.11a2.07,2.07,0,0,1-1.94-1.09h0l0,1Zm1.1-2.33a2.33,2.33,0,0,0,0,.38,1.65,1.65,0,0,0,1.59,1.24c1.1,0,1.76-.9,1.76-2.23,0-1.17-.6-2.16-1.73-2.16a1.69,1.69,0,0,0-1.61,1.29,2.55,2.55,0,0,0,0,.44Z" /><path fill="#fff" d="M69.94,268c0-.6,0-1.09,0-1.57h.92l0,.94h0a2,2,0,0,1,1.82-1.07,1.74,1.74,0,0,1,1.65,1.16h0a2.42,2.42,0,0,1,.65-.75,1.93,1.93,0,0,1,1.28-.41c.77,0,1.91.5,1.91,2.52v3.42h-1v-3.29c0-1.11-.41-1.79-1.26-1.79a1.38,1.38,0,0,0-1.25,1,1.74,1.74,0,0,0-.08.53v3.59h-1v-3.48c0-.92-.4-1.6-1.21-1.6a1.45,1.45,0,0,0-1.31,1.06,1.4,1.4,0,0,0-.08.51v3.51h-1Z" /><path fill="#fff" d="M81.12,264.79a.65.65,0,1,1-1.3,0,.64.64,0,0,1,.66-.66A.62.62,0,0,1,81.12,264.79ZM80,272.23v-5.81h1v5.81Z" /><path fill="#fff" d="M84,264.75v1.67h1.51v.8H84v3.14c0,.72.2,1.12.79,1.12a2.21,2.21,0,0,0,.61-.07l0,.79a2.48,2.48,0,0,1-.94.15,1.47,1.47,0,0,1-1.14-.45,2.13,2.13,0,0,1-.4-1.51v-3.17h-.9v-.8H83V265Z" /><path fill="#fff" d="M89.31,264.25a10.66,10.66,0,0,1,2-.17,3.32,3.32,0,0,1,2.34.66,2,2,0,0,1,.63,1.54,2.13,2.13,0,0,1-1.52,2.06v0A2,2,0,0,1,94,270a12.89,12.89,0,0,0,.62,2.22H93.49a11,11,0,0,1-.54-1.94c-.24-1.11-.67-1.53-1.62-1.57h-1v3.51h-1Zm1,3.68h1.07c1.11,0,1.82-.61,1.82-1.53s-.75-1.5-1.86-1.51a4.3,4.3,0,0,0-1,.09Z" /><path fill="#fff" d="M99.09,272.23,99,271.5h0a2.16,2.16,0,0,1-1.77.86,1.65,1.65,0,0,1-1.77-1.67c0-1.4,1.24-2.17,3.49-2.16v-.12a1.2,1.2,0,0,0-1.32-1.34,3,3,0,0,0-1.52.43l-.24-.69a3.55,3.55,0,0,1,1.91-.52c1.78,0,2.21,1.21,2.21,2.37v2.17a8.52,8.52,0,0,0,.09,1.4Zm-.16-3c-1.15,0-2.46.18-2.46,1.31a.94.94,0,0,0,1,1,1.45,1.45,0,0,0,1.4-1,1,1,0,0,0,.06-.34Z" /><path fill="#fff" d="M102.88,264.75v1.67h1.51v.8h-1.51v3.14c0,.72.2,1.12.79,1.12a2.15,2.15,0,0,0,.61-.07l0,.79a2.44,2.44,0,0,1-.94.15,1.47,1.47,0,0,1-1.14-.45,2.13,2.13,0,0,1-.4-1.51v-3.17H101v-.8h.9V265Z" /><path fill="#fff" d="M106.75,264.79a.62.62,0,0,1-.67.65.63.63,0,0,1-.63-.65.64.64,0,0,1,.66-.66A.62.62,0,0,1,106.75,264.79Zm-1.17,7.44v-5.81h1v5.81Z" /><path fill="#fff" d="M108.39,268c0-.6,0-1.09,0-1.57h.94l0,1h0a2.14,2.14,0,0,1,1.92-1.09c.8,0,2,.48,2,2.47v3.47h-1.06v-3.35c0-.94-.34-1.72-1.34-1.72a1.51,1.51,0,0,0-1.42,1.08,1.89,1.89,0,0,0-.07.5v3.49h-1Z" /><path fill="#fff" d="M120.05,266.42c0,.42,0,.89,0,1.6v3.37a3.32,3.32,0,0,1-.83,2.65,3.06,3.06,0,0,1-2.11.69,3.68,3.68,0,0,1-1.93-.48l.26-.8a3.31,3.31,0,0,0,1.71.46c1.08,0,1.87-.57,1.87-2v-.65h0a2.08,2.08,0,0,1-1.85,1,2.59,2.59,0,0,1-2.47-2.83,2.79,2.79,0,0,1,2.61-3.08,1.92,1.92,0,0,1,1.81,1h0l0-.88ZM119,268.71a1.47,1.47,0,0,0-.06-.48,1.53,1.53,0,0,0-1.48-1.11c-1,0-1.73.85-1.73,2.19,0,1.14.58,2.09,1.72,2.09a1.54,1.54,0,0,0,1.46-1.08,1.82,1.82,0,0,0,.09-.56Z" /><path fill="#f2ba65" d="M13.69,13.92l1.62,5a.72.72,0,0,0,.69.49h5.23a.73.73,0,0,1,.43,1.31l-4.24,3.07a.73.73,0,0,0-.26.81l1.62,5a.72.72,0,0,1-1.11.8l-4.24-3.07a.69.69,0,0,0-.84,0L8.35,30.36a.72.72,0,0,1-1.11-.8l1.62-5a.73.73,0,0,0-.26-.81L4.36,20.7a.73.73,0,0,1,.43-1.31H10a.73.73,0,0,0,.69-.49l1.62-5A.71.71,0,0,1,13.69,13.92Z" /><path fill="#f2ba65" d="M39,13.92l1.62,5a.71.71,0,0,0,.68.49h5.24A.72.72,0,0,1,47,20.7l-4.24,3.07a.74.74,0,0,0-.26.81l1.62,5a.72.72,0,0,1-1.11.8l-4.23-3.07a.71.71,0,0,0-.85,0l-4.24,3.07a.71.71,0,0,1-1.1-.8l1.62-5a.74.74,0,0,0-.26-.81L29.67,20.7a.72.72,0,0,1,.42-1.31h5.24A.71.71,0,0,0,36,18.9l1.62-5A.72.72,0,0,1,39,13.92Z" /><path fill="#f2ba65" d="M64.3,13.92l1.62,5a.72.72,0,0,0,.69.49h5.23a.73.73,0,0,1,.43,1.31L68,23.77a.73.73,0,0,0-.26.81l1.62,5a.72.72,0,0,1-1.11.8L64,27.29a.69.69,0,0,0-.84,0L59,30.36a.72.72,0,0,1-1.11-.8l1.62-5a.73.73,0,0,0-.26-.81L55,20.7a.73.73,0,0,1,.43-1.31h5.23a.72.72,0,0,0,.69-.49l1.62-5A.71.71,0,0,1,64.3,13.92Z" /><path fill="#f2ba65" d="M89.61,13.92l1.62,5a.71.71,0,0,0,.68.49h5.24a.72.72,0,0,1,.42,1.31l-4.24,3.07a.74.74,0,0,0-.26.81l1.62,5a.71.71,0,0,1-1.1.8l-4.24-3.07a.71.71,0,0,0-.85,0l-4.23,3.07a.72.72,0,0,1-1.11-.8l1.62-5a.74.74,0,0,0-.26-.81L80.28,20.7a.72.72,0,0,1,.42-1.31h5.24a.71.71,0,0,0,.68-.49l1.62-5A.72.72,0,0,1,89.61,13.92Z" /><path fill="#f2ba65" d="M114.91,13.92l1.62,5a.73.73,0,0,0,.69.49h5.23a.73.73,0,0,1,.43,1.31l-4.24,3.07a.73.73,0,0,0-.26.81l1.62,5a.72.72,0,0,1-1.11.8l-4.24-3.07a.69.69,0,0,0-.84,0l-4.24,3.07a.72.72,0,0,1-1.11-.8l1.62-5a.73.73,0,0,0-.26-.81l-4.24-3.07a.73.73,0,0,1,.43-1.31h5.23a.72.72,0,0,0,.69-.49l1.62-5A.71.71,0,0,1,114.91,13.92Z" /></svg>
	//     ),

	// },

	// {
	//     name: 'form-10',
	//     title: __('Job Application Form'),
	//     description: __('Job Application Form'),

	//     isPro: false,

	//     innerBlocks: [
	//         ['post-grid/form-field-input', {}],
	//         ['post-grid/form-field-input', {}],

	//     ],
	//     scope: ['block'],
	//     icon: (
	//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80"><rect fill="#1d4ed8" x="41.67" y="13.33" width="76.67" height="23.34" /><rect fill="#1d4ed8" x="41.67" y="43.33" width="76.67" height="23.34" /></svg>
	//     ),

	// },

	{
		name: "form-11",
		title: __("OptIn form"),
		description: __("OptIn form"),

		isPro: false,
		atts: {
			form: {
				type: "optInForm",
				styles: {
					gridTemplateColumns: { Desktop: "1fr " },
					gap: { Desktop: "1em" },
					display: { Desktop: "grid" },
				},
				options: { type: "optInForm" },
			},
			wrapper: {
				options: { tag: "div", class: "" },
				styles: { gridTemplateColumns: {}, gap: {}, display: {} },
			},
			visible: {},
			onSubmit: {
				0: { id: "validation", messages: [] },
				1: { id: "submitConfirm", messages: [] },
			},
			onProcess: {
				0: {
					id: "fluentcrmAddContact",
					lists: [],
					tags: [],
					message: "",
					showOnResponse: false,
				},
			},
			afterSubmit: { 0: { id: "showMessage", message: "" } },
			blockId: "pg9d6a07354523",
			blockCssY: {
				items: {
					".pg9d6a07354523": {
						"grid-template-columns": {},
						gap: {},
						display: {},
					},
					".pg9d6a07354523 form": {
						"grid-template-columns": { Desktop: "1fr " },
						gap: { Desktop: "1em" },
						display: { Desktop: "grid" },
					},
				},
			},
		},

		innerBlocks: [
			[
				"post-grid/form-field-input",
				{
					wrapper: { options: { tag: "div", class: "" } },
					labelWrap: { options: { tag: "div", enable: true, class: "" } },
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: true,
							text: "Your Email",
							class: "pg-form-field-label",
						},
						styles: {},
					},
					input: {
						options: {
							type: "text",
							placeholder: "Write your mail address",
							value: "",
							name: "email",
							required: false,
							disabled: false,
							size: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							step: null,
							pattern: null,
							patternCustom: "",
							max: null,
							min: null,
							checked: false,
							autocomplete: false,
							id: "",
							class: "pg-form-field-input",
							position: "afterLabel",
						},
						styles: {
							border: { Desktop: "1px solid #b5b5b5" },
							borderRadius: { Desktop: "0px 0px 0px 0px" },
							padding: { Desktop: "5px 10px 5px 10px" },
							backgroundColor: { Desktop: "#ececec" },
							width: { Desktop: "100%" },
							maxWidth: { Desktop: "100%" },
						},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "Email should not empty",
							position: "afterInput",
							class: "",
						},
						styles: {
							color: { Desktop: "#c02121" },
							marginTop: { Desktop: "10px" },
						},
					},
					blockId: "pg9a328fd54a2e",
					blockCssY: {
						items: {
							".pg8539be28243d input": {},
							".pg9a328fd54a2e input": {
								border: { Desktop: "1px solid #b5b5b5" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"background-color": { Desktop: "#ececec" },
								width: { Desktop: "100%" },
								"max-width": { Desktop: "100%" },
							},
							".pg9a328fd54a2e .error-wrap": {
								color: { Desktop: "#c02121" },
								"margin-top": { Desktop: "10px" },
							},
						},
					},
				},
			],
			[
				"post-grid/form-field-input",
				{
					wrapper: { options: { tag: "div", class: "" } },
					labelWrap: { options: { tag: "div", enable: true, class: "" } },
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: true,
							text: "Your Name",
							class: "pg-form-field-label",
						},
					},
					input: {
						options: {
							type: "text",
							placeholder: "",
							value: "",
							name: "first_name",
							required: false,
							disabled: false,
							size: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							step: null,
							pattern: null,
							patternCustom: "",
							max: null,
							min: null,
							checked: false,
							autocomplete: false,
							id: "",
							class: "pg-form-field-input",
							position: "afterLabel",
						},
						styles: {
							border: { Desktop: "1px solid #b5b5b5" },
							borderRadius: { Desktop: "0px 0px 0px 0px" },
							padding: { Desktop: "5px 10px 5px 10px" },
							backgroundColor: { Desktop: "#ececec" },
							width: { Desktop: "100%" },
							maxWidth: { Desktop: "100%" },
						},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "Name should not empty",
							position: "afterInput",
							class: "",
						},
						styles: {
							color: { Desktop: "#c02121" },
							marginTop: { Desktop: "10px" },
						},
					},
					blockId: "pg8539be28243d",
					blockCssY: {
						items: {
							".pg8539be28243d input": {
								"background-color": { Desktop: "#ececec" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								border: { Desktop: "1px solid #b5b5b5" },
								"max-width": { Desktop: "100%" },
								width: { Desktop: "100%" },
							},
							".pg8539be28243d .error-wrap": {
								color: { Desktop: "#c02121" },
								"margin-top": { Desktop: "10px" },
							},
						},
					},
				},
			],

			[
				"post-grid/form-field-input",
				{
					wrapper: { options: { tag: "div", class: "" } },
					labelWrap: { options: { tag: "div", enable: true, class: "" } },
					label: {
						options: {
							tag: "label",
							for: "label",
							enable: false,
							text: "Your Name",
							class: "pg-form-field-label",
						},
					},
					input: {
						options: {
							type: "submit",
							placeholder: "Write your name",
							value: "Submit",
							name: "",
							required: false,
							disabled: false,
							size: false,
							minLength: null,
							maxLength: null,
							readonly: false,
							step: null,
							pattern: null,
							patternCustom: "",
							max: null,
							min: null,
							checked: false,
							autocomplete: false,
							id: "",
							class: "pg-form-field-input",
							position: "afterLabel",
						},
						styles: {
							border: { Desktop: "1px solid #b5b5b5" },
							borderRadius: { Desktop: "0px 0px 0px 0px" },
							padding: { Desktop: "5px 10px 5px 10px" },
							backgroundColor: { Desktop: "#51557E" },
							width: { Desktop: "100%" },
							maxWidth: { Desktop: "100%" },
							color: { Desktop: "#ffffff" },
						},
					},
					inputWrap: { options: { tag: "div", enable: true, class: "" } },
					errorWrap: {
						options: {
							tag: "div",
							enable: true,
							text: "",
							position: "afterInput",
							class: "",
						},
					},
					blockId: "pg4670520d9df5",
					blockCssY: {
						items: {
							".pg8539be28243d input": {},
							".pg4670520d9df5 input": {
								border: { Desktop: "1px solid #b5b5b5" },
								"border-radius": { Desktop: "0px 0px 0px 0px" },
								padding: { Desktop: "5px 10px 5px 10px" },
								"background-color": { Desktop: "#51557E" },
								width: { Desktop: "100%" },
								"max-width": { Desktop: "100%" },
								color: { Desktop: "#ffffff" },
							},
						},
					},
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 368.13 244.63">
				<rect
					fill="#bcbec0"
					x="4.06"
					y="55.12"
					width="360"
					height="33.44"
					rx="2.2"
				/>
				<path
					fill="#343738"
					d="M361.87,89.55H6.26a3.2,3.2,0,0,1-3.2-3.19v-29a3.2,3.2,0,0,1,3.2-3.19H361.87a3.19,3.19,0,0,1,3.19,3.19V86.36A3.19,3.19,0,0,1,361.87,89.55ZM6.26,56.12a1.19,1.19,0,0,0-1.2,1.19V86.36a1.19,1.19,0,0,0,1.2,1.19H361.87a1.19,1.19,0,0,0,1.19-1.19v-29a1.19,1.19,0,0,0-1.19-1.19Z"
				/>
				<rect
					fill="#bcbec0"
					x="4.06"
					y="103.58"
					width="360"
					height="33.44"
					rx="2.2"
				/>
				<path
					fill="#343738"
					d="M361.87,138H6.26a3.2,3.2,0,0,1-3.2-3.2v-29a3.2,3.2,0,0,1,3.2-3.2H361.87a3.19,3.19,0,0,1,3.19,3.2v29A3.19,3.19,0,0,1,361.87,138ZM6.26,104.58a1.2,1.2,0,0,0-1.2,1.2v29a1.2,1.2,0,0,0,1.2,1.2H361.87a1.19,1.19,0,0,0,1.19-1.2v-29a1.19,1.19,0,0,0-1.19-1.2Z"
				/>
				<path
					fill="#231f20"
					d="M18.09,67.27h4.35v.88H19.13v2.68h3.06v.87H19.13v3.66h-1Z"
				/>
				<path
					fill="#231f20"
					d="M28.33,73.77c0,.6,0,1.13.05,1.59h-.93l-.06-1h0a2.16,2.16,0,0,1-1.92,1.08c-.91,0-2-.51-2-2.54v-3.4H24.5v3.22c0,1.1.33,1.84,1.29,1.84a1.52,1.52,0,0,0,1.39-1,1.49,1.49,0,0,0,.1-.54V69.55h1Z"
				/>
				<path fill="#231f20" d="M30.09,66.84h1.05v8.52H30.09Z" />
				<path fill="#231f20" d="M32.92,66.84H34v8.52H32.92Z" />
				<path
					fill="#231f20"
					d="M38.33,75.36V67.27h1.14l2.59,4.09A22.28,22.28,0,0,1,43.51,74h0c-.1-1.08-.12-2.07-.12-3.33V67.27h1v8.09h-1l-2.57-4.11a25.42,25.42,0,0,1-1.51-2.69h0c.06,1,.09,2,.09,3.33v3.46Z"
				/>
				<path
					fill="#231f20"
					d="M49.41,75.36l-.09-.74h0a2.17,2.17,0,0,1-1.78.87,1.65,1.65,0,0,1-1.77-1.67c0-1.4,1.24-2.17,3.49-2.16v-.12a1.2,1.2,0,0,0-1.32-1.34,2.9,2.9,0,0,0-1.51.43l-.24-.69a3.51,3.51,0,0,1,1.9-.52c1.78,0,2.21,1.21,2.21,2.37V74a7.49,7.49,0,0,0,.1,1.4Zm-.16-3c-1.15,0-2.46.18-2.46,1.31a.94.94,0,0,0,1,1,1.45,1.45,0,0,0,1.4-1,1,1,0,0,0,.06-.34Z"
				/>
				<path
					fill="#231f20"
					d="M52,71.12c0-.6,0-1.09,0-1.57h.92l0,.94h0a2,2,0,0,1,1.82-1.07,1.71,1.71,0,0,1,1.64,1.16h0a2.39,2.39,0,0,1,.64-.75,2,2,0,0,1,1.29-.41c.76,0,1.9.5,1.9,2.52v3.42h-1V72.07c0-1.11-.41-1.79-1.26-1.79a1.37,1.37,0,0,0-1.24,1,1.73,1.73,0,0,0-.09.53v3.59h-1V71.88c0-.92-.41-1.6-1.21-1.6a1.45,1.45,0,0,0-1.31,1.06,1.4,1.4,0,0,0-.08.51v3.51H52Z"
				/>
				<path
					fill="#231f20"
					d="M62.57,72.65a1.86,1.86,0,0,0,2,2,3.8,3.8,0,0,0,1.61-.3l.18.76a4.84,4.84,0,0,1-1.93.36,2.7,2.7,0,0,1-2.86-2.93c0-1.75,1-3.13,2.73-3.13a2.46,2.46,0,0,1,2.4,2.73,4.36,4.36,0,0,1,0,.5Zm3.1-.76a1.51,1.51,0,0,0-1.47-1.72,1.77,1.77,0,0,0-1.62,1.72Z"
				/>
				<path
					fill="#231f20"
					d="M22.27,120H19.13V123h3.5v.87H18.09v-8.08h4.36v.87H19.13v2.56h3.14Z"
				/>
				<path
					fill="#231f20"
					d="M24,119.59c0-.6,0-1.09-.05-1.57h.92l.05.93h0a2,2,0,0,1,1.82-1.06,1.71,1.71,0,0,1,1.64,1.16h0a2.44,2.44,0,0,1,.64-.76,2,2,0,0,1,1.29-.4c.76,0,1.9.5,1.9,2.51v3.42h-1v-3.28c0-1.12-.41-1.79-1.26-1.79a1.35,1.35,0,0,0-1.24,1,1.63,1.63,0,0,0-.09.53v3.58h-1v-3.48c0-.92-.41-1.59-1.21-1.59a1.45,1.45,0,0,0-1.31,1,1.49,1.49,0,0,0-.08.52v3.5H24Z"
				/>
				<path
					fill="#231f20"
					d="M37.18,123.82l-.08-.73h0a2.15,2.15,0,0,1-1.78.86,1.65,1.65,0,0,1-1.77-1.66c0-1.41,1.25-2.17,3.49-2.16V120a1.2,1.2,0,0,0-1.32-1.35,2.84,2.84,0,0,0-1.51.44l-.24-.7a3.61,3.61,0,0,1,1.91-.51c1.77,0,2.2,1.21,2.2,2.37v2.17a8.32,8.32,0,0,0,.1,1.39Zm-.16-3c-1.15,0-2.46.18-2.46,1.31a.93.93,0,0,0,1,1,1.42,1.42,0,0,0,1.4-1,.92.92,0,0,0,.06-.33Z"
				/>
				<path
					fill="#231f20"
					d="M40.92,116.39a.65.65,0,0,1-1.3,0,.64.64,0,0,1,.66-.66A.62.62,0,0,1,40.92,116.39Zm-1.17,7.43V118h1v5.8Z"
				/>
				<path fill="#231f20" d="M42.56,115.31h1v8.51h-1Z" />
				<path
					fill="#231f20"
					d="M49.28,121.28l-.84,2.54H47.36l2.74-8.08h1.26l2.76,8.08H53l-.87-2.54Zm2.65-.82-.8-2.32c-.18-.53-.3-1-.42-1.48h0c-.12.48-.25,1-.41,1.47l-.79,2.33Z"
				/>
				<path
					fill="#231f20"
					d="M60.15,115.31v7c0,.52,0,1.11,0,1.5h-.94l0-1h0a2.14,2.14,0,0,1-2,1.13c-1.41,0-2.49-1.18-2.49-3,0-1.93,1.19-3.11,2.6-3.11a2,2,0,0,1,1.76.88h0v-3.46Zm-1.06,5.07a1.65,1.65,0,0,0-.05-.44,1.54,1.54,0,0,0-1.52-1.23c-1.09,0-1.74,1-1.74,2.25s.58,2.14,1.72,2.14a1.67,1.67,0,0,0,1.59-1.71Z"
				/>
				<path
					fill="#231f20"
					d="M66.91,115.31v7c0,.52,0,1.11,0,1.5H66l0-1h0A2.15,2.15,0,0,1,64,124c-1.4,0-2.48-1.18-2.48-3,0-1.93,1.19-3.11,2.6-3.11a1.94,1.94,0,0,1,1.75.88h0v-3.46Zm-1,5.07a1.65,1.65,0,0,0,0-.44,1.55,1.55,0,0,0-1.52-1.23c-1.09,0-1.74,1-1.74,2.25s.57,2.14,1.71,2.14a1.67,1.67,0,0,0,1.6-1.71Z"
				/>
				<path
					fill="#231f20"
					d="M68.67,119.83c0-.68,0-1.27,0-1.81h.92l0,1.14h0a1.74,1.74,0,0,1,1.6-1.27,1.32,1.32,0,0,1,.3,0v1a1.23,1.23,0,0,0-.36,0,1.48,1.48,0,0,0-1.41,1.36,3.37,3.37,0,0,0-.05.49v3.09h-1Z"
				/>
				<path
					fill="#231f20"
					d="M73.06,121.11a1.86,1.86,0,0,0,2,2,3.8,3.8,0,0,0,1.61-.3l.18.75a4.67,4.67,0,0,1-1.93.36A2.69,2.69,0,0,1,72.05,121c0-1.76,1-3.13,2.72-3.13a2.45,2.45,0,0,1,2.4,2.73,4.68,4.68,0,0,1,0,.49Zm3.09-.75a1.49,1.49,0,0,0-1.46-1.72,1.75,1.75,0,0,0-1.62,1.72Z"
				/>
				<path
					fill="#231f20"
					d="M78.34,122.74a2.69,2.69,0,0,0,1.39.42c.77,0,1.13-.38,1.13-.86s-.3-.78-1.08-1.07c-1-.37-1.54-1-1.54-1.64a1.79,1.79,0,0,1,2-1.7,2.79,2.79,0,0,1,1.42.36l-.26.76a2.32,2.32,0,0,0-1.19-.33c-.62,0-1,.36-1,.79s.35.69,1.11,1c1,.39,1.52.89,1.52,1.75,0,1-.79,1.74-2.17,1.74a3.27,3.27,0,0,1-1.63-.39Z"
				/>
				<path
					fill="#231f20"
					d="M83.09,122.74a2.72,2.72,0,0,0,1.39.42c.77,0,1.13-.38,1.13-.86s-.3-.78-1.08-1.07c-1-.37-1.53-1-1.53-1.64a1.78,1.78,0,0,1,2-1.7,2.83,2.83,0,0,1,1.43.36l-.27.76a2.28,2.28,0,0,0-1.18-.33c-.63,0-1,.36-1,.79s.35.69,1.11,1c1,.39,1.52.89,1.52,1.75,0,1-.79,1.74-2.17,1.74a3.3,3.3,0,0,1-1.63-.39Z"
				/>
				<rect
					fill="#414042"
					x="4.06"
					y="154.44"
					width="180"
					height="35.07"
					rx="3.24"
				/>
				<path
					fill="#fff"
					d="M70.28,174.23a3.68,3.68,0,0,0,1.87.53c1.07,0,1.69-.57,1.69-1.38s-.43-1.19-1.52-1.61c-1.32-.47-2.13-1.15-2.13-2.29a2.32,2.32,0,0,1,2.61-2.19,3.73,3.73,0,0,1,1.79.39l-.29.85a3.25,3.25,0,0,0-1.54-.38c-1.1,0-1.52.66-1.52,1.21,0,.76.49,1.13,1.61,1.56,1.36.53,2.06,1.19,2.06,2.37s-.92,2.33-2.83,2.33A4.13,4.13,0,0,1,70,175.1Z"
				/>
				<path
					fill="#fff"
					d="M81.16,173.92c0,.6,0,1.12,0,1.58h-.94l-.06-.95h0a2.19,2.19,0,0,1-1.92,1.08c-.91,0-2-.5-2-2.54V169.7h1v3.21c0,1.1.34,1.85,1.3,1.85a1.52,1.52,0,0,0,1.39-1,1.57,1.57,0,0,0,.1-.54V169.7h1Z"
				/>
				<path
					fill="#fff"
					d="M82.87,175.5c0-.4,0-1,0-1.5v-7h1v3.64h0a2.18,2.18,0,0,1,2-1.07c1.44,0,2.46,1.2,2.45,3,0,2.07-1.31,3.1-2.6,3.1a2.08,2.08,0,0,1-2-1.09h0l0,1ZM84,173.17a1.6,1.6,0,0,0,.05.39,1.62,1.62,0,0,0,1.58,1.23c1.1,0,1.76-.9,1.76-2.23,0-1.16-.6-2.16-1.72-2.16A1.7,1.7,0,0,0,84,171.7a2.34,2.34,0,0,0-.06.43Z"
				/>
				<path
					fill="#fff"
					d="M89.6,174.42a2.79,2.79,0,0,0,1.39.42c.77,0,1.13-.38,1.13-.86s-.3-.78-1.08-1.07c-1-.37-1.54-.95-1.54-1.64a1.8,1.8,0,0,1,2-1.71,2.87,2.87,0,0,1,1.42.36l-.26.77a2.32,2.32,0,0,0-1.19-.33c-.62,0-1,.36-1,.79s.35.69,1.11,1c1,.38,1.52.89,1.52,1.75,0,1-.79,1.74-2.17,1.74a3.27,3.27,0,0,1-1.63-.4Z"
				/>
				<path
					fill="#fff"
					d="M98.63,175.29a3.9,3.9,0,0,1-1.66.33,2.76,2.76,0,0,1-2.89-3,2.94,2.94,0,0,1,3.12-3.08,3.44,3.44,0,0,1,1.46.3l-.24.81a2.48,2.48,0,0,0-1.22-.28,2.19,2.19,0,0,0,0,4.37,3,3,0,0,0,1.29-.29Z"
				/>
				<path
					fill="#fff"
					d="M99.87,171.51c0-.69,0-1.27-.05-1.81h.93l0,1.13h0a1.76,1.76,0,0,1,1.61-1.27,1.36,1.36,0,0,1,.3,0v1a1.32,1.32,0,0,0-.36,0,1.49,1.49,0,0,0-1.42,1.35,3.75,3.75,0,0,0,0,.5v3.09h-1Z"
				/>
				<path
					fill="#fff"
					d="M105,168.06a.62.62,0,0,1-.67.65.65.65,0,0,1,0-1.3A.62.62,0,0,1,105,168.06Zm-1.18,7.44v-5.8h1.06v5.8Z"
				/>
				<path
					fill="#fff"
					d="M106.6,175.5c0-.4.05-1,.05-1.5v-7h1v3.64h0a2.15,2.15,0,0,1,2-1.07c1.44,0,2.46,1.2,2.45,3,0,2.07-1.31,3.1-2.61,3.1a2.06,2.06,0,0,1-1.94-1.09h0l0,1Zm1.1-2.33a2.34,2.34,0,0,0,0,.39,1.64,1.64,0,0,0,1.59,1.23c1.1,0,1.76-.9,1.76-2.23,0-1.16-.6-2.16-1.73-2.16a1.68,1.68,0,0,0-1.6,1.3,1.71,1.71,0,0,0-.06.43Z"
				/>
				<path
					fill="#fff"
					d="M114.07,172.79a1.85,1.85,0,0,0,2,2,3.83,3.83,0,0,0,1.61-.3l.18.76a4.72,4.72,0,0,1-1.94.36,2.69,2.69,0,0,1-2.85-2.93c0-1.75,1-3.13,2.72-3.13a2.46,2.46,0,0,1,2.4,2.74,4.88,4.88,0,0,1,0,.49Zm3.09-.76a1.5,1.5,0,0,0-1.46-1.71,1.74,1.74,0,0,0-1.62,1.71Z"
				/>
			</svg>
		),
	},

	//  {
	//         name: 'form-12',
	//         title: __('File Upload form'),
	//         description: __('File Upload form'),

	//         isPro: false,
	//         atts: {
	//             wrapper: { "options": { "tag": "div", "class": "" }, "styles": { "gridTemplateColumns": { "Desktop": "1fr " }, "gap": { "Desktop": "1em" }, "display": { "Desktop": "flex" }, "borderRadius": { "Desktop": "50px 50px 50px 50px" }, "backgroundColor": { "Desktop": "#774360" }, "color": { "Desktop": "#ffffff" }, "padding": {}, "alignItems": { "Desktop": "center" }, "justifyContent": { "Desktop": "space-between" } } }, visible: {}, onSubmit: { "0": { "id": "validation", "messages": [] }, "1": { "id": "submitConfirm", "messages": [] } }, onProcess: { "0": { "id": "newsletterSubmit", "message": "", "showOnResponse": true }, "1": { "id": "createEntry", "message": "" } }, afterSubmit: { "0": { "id": "showMessage", "message": "" } }, blockId: "pg7e7c9a6760f3", blockCssY: { "items": { ".pg9d6a07354523 form": { "grid-template-columns": { "Desktop": "1fr " }, "gap": { "Desktop": "1em" }, "display": { "Desktop": "grid" } }, ".pg7e7c9a6760f3": { "grid-template-columns": { "Desktop": "1fr " }, "gap": { "Desktop": "1em" }, "display": { "Desktop": "flex" }, "background-color": { "Desktop": "#774360" }, "border-radius": { "Desktop": "50px 50px 50px 50px" }, "color": { "Desktop": "#ffffff" }, "padding": {}, "align-items": { "Desktop": "center" }, "justify-content": { "Desktop": "space-between" } } } },

	//         },

	//         innerBlocks: [
	//             ['post-grid/form-field-input', {
	//                 wrapper: { "options": { "tag": "div", "class": "" }, "styles": { "margin": { "Desktop": "0px 0px 0px 30px" } } }, labelWrap: { "options": { "tag": "div", "enable": true, "class": "" } }, label: { "options": { "tag": "label", "for": "label", "enable": false, "text": "Your Email", "class": "pg-form-field-label" } }, input: { "options": { "type": "text", "placeholder": "Write your mail address", "value": "", "name": "email", "required": false, "disabled": false, "size": false, "minLength": null, "maxLength": null, "readonly": false, "step": null, "pattern": null, "patternCustom": "", "max": null, "min": null, "checked": false, "autocomplete": false, "id": "", "class": "pg-form-field-input", "position": "afterLabel" }, "styles": { "border": { "Desktop": "0px solid #b5b5b5" }, "borderRadius": { "Desktop": "0px 0px 0px 0px" }, "padding": { "Desktop": "10px 20px 10px 20px" }, "backgroundColor": { "Desktop": "#774360" }, "width": {}, "maxWidth": {}, "color": { "Desktop": "#ffffff" } }, "focus": { "backgroundColor": { "Desktop": "#774360" }, "color": { "Desktop": "#ffffff" } } }, inputWrap: { "options": { "tag": "div", "enable": true, "class": "" } }, errorWrap: { "options": { "tag": "div", "enable": true, "text": "Email should not empty", "position": "", "class": "" }, "styles": { "color": { "Desktop": "#c02121" }, "marginTop": { "Desktop": "10px" } } },

	//             }],
	//             ['post-grid/form-field-input', {
	//                 wrapper: { "options": { "tag": "div", "class": "" } }, labelWrap: { "options": { "tag": "div", "enable": true, "class": "" } }, label: { "options": { "tag": "label", "for": "label", "enable": false, "text": "Your Name", "class": "pg-form-field-label" } }, input: { "options": { "type": "submit", "placeholder": "Write your name", "value": "Submit", "name": "", "required": false, "disabled": false, "size": false, "minLength": null, "maxLength": null, "readonly": false, "step": null, "pattern": null, "patternCustom": "", "max": null, "min": null, "checked": false, "autocomplete": false, "id": "", "class": "pg-form-field-input", "position": "afterLabel" }, "styles": { "border": { "Desktop": "0px solid #b5b5b5" }, "borderRadius": { "Desktop": "50px 50px 50px 50px" }, "padding": { "Desktop": "13px 50px 13px 50px" }, "backgroundColor": { "Desktop": "#DFBB9D" }, "width": { "Desktop": "100%" }, "maxWidth": { "Desktop": "100%" }, "color": { "Desktop": "#ffffff" } } }, inputWrap: { "options": { "tag": "div", "enable": true, "class": "" } }, errorWrap: { "options": { "tag": "div", "enable": true, "text": "", "position": "afterInput", "class": "" } },

	//             }],

	//         ],
	//         scope: ['block'],
	//         icon: (
	//             <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 368.13 244.63"><rect fill="#bcbec0" x="4.07" y="4.63" width="360" height="33.44" rx="2.2"/><path fill="#343738" d="M361.87,39.07H6.26a3.2,3.2,0,0,1-3.2-3.19V6.83a3.21,3.21,0,0,1,3.2-3.2H361.87a3.2,3.2,0,0,1,3.19,3.2V35.88A3.19,3.19,0,0,1,361.87,39.07ZM6.26,5.63a1.2,1.2,0,0,0-1.2,1.2V35.88a1.19,1.19,0,0,0,1.2,1.19H361.87a1.19,1.19,0,0,0,1.19-1.19V6.83a1.19,1.19,0,0,0-1.19-1.2Z"/><rect fill="#bcbec0" x="4.07" y="53.1" width="360" height="33.44" rx="2.2"/><path fill="#343738" d="M361.87,87.54H6.26a3.21,3.21,0,0,1-3.2-3.2v-29a3.2,3.2,0,0,1,3.2-3.2H361.87a3.19,3.19,0,0,1,3.19,3.2v29A3.2,3.2,0,0,1,361.87,87.54ZM6.26,54.1a1.2,1.2,0,0,0-1.2,1.2v29a1.2,1.2,0,0,0,1.2,1.2H361.87a1.19,1.19,0,0,0,1.19-1.2v-29a1.19,1.19,0,0,0-1.19-1.2Z"/><rect fill="#bcbec0" x="4.07" y="100.74" width="360" height="86.66" rx="2.2"/><path fill="#343738" d="M361.87,188.4H6.26a3.21,3.21,0,0,1-3.2-3.2V102.93a3.2,3.2,0,0,1,3.2-3.19H361.87a3.19,3.19,0,0,1,3.19,3.19V185.2A3.2,3.2,0,0,1,361.87,188.4ZM6.26,101.74a1.19,1.19,0,0,0-1.2,1.19V185.2a1.2,1.2,0,0,0,1.2,1.2H361.87a1.19,1.19,0,0,0,1.19-1.2V102.93a1.19,1.19,0,0,0-1.19-1.19Z"/><rect fill="#414042" x="4.27" y="204.92" width="180" height="35.07" rx="3.24"/><rect fill="#414042" x="269.6" y="59.23" width="86.61" height="21.4" rx="3.24"/><path fill="#231f20" d="M24.9,21.32c-.06-1.12-.13-2.48-.12-3.48h0c-.27.94-.61,1.95-1,3.07L22.3,24.83h-.79L20.2,21c-.38-1.14-.71-2.19-.94-3.14h0c0,1-.08,2.36-.16,3.57l-.21,3.47h-1l.57-8.09h1.33l1.38,3.91c.33,1,.61,1.88.81,2.72h0c.2-.81.49-1.7.85-2.72l1.44-3.91h1.33l.5,8.09h-1Z"/><path fill="#231f20" d="M28.36,22.16a1.86,1.86,0,0,0,2,2,3.8,3.8,0,0,0,1.61-.3l.18.76a4.84,4.84,0,0,1-1.93.36,2.7,2.7,0,0,1-2.86-2.93c0-1.75,1-3.13,2.72-3.13a2.46,2.46,0,0,1,2.4,2.73,4.49,4.49,0,0,1,0,.49Zm3.09-.75A1.5,1.5,0,0,0,30,19.69a1.76,1.76,0,0,0-1.62,1.72Z"/><path fill="#231f20" d="M38.8,16.36v7c0,.51,0,1.1,0,1.5H37.9l0-1h0a2.16,2.16,0,0,1-2,1.14c-1.41,0-2.49-1.19-2.49-3,0-1.93,1.19-3.12,2.61-3.12a2,2,0,0,1,1.75.89h0V16.36Zm-1.06,5.07a1.65,1.65,0,0,0-.05-.44,1.54,1.54,0,0,0-1.52-1.22c-1.09,0-1.74,1-1.74,2.24s.58,2.15,1.72,2.15a1.59,1.59,0,0,0,1.54-1.26,1.71,1.71,0,0,0,.05-.46Z"/><path fill="#231f20" d="M41.73,17.44a.66.66,0,0,1-1.31,0,.65.65,0,0,1,.66-.66A.63.63,0,0,1,41.73,17.44Zm-1.18,7.44V19.07h1.06v5.81Z"/><path fill="#231f20" d="M46.57,24.88l-.08-.74h0a2.14,2.14,0,0,1-1.77.87,1.66,1.66,0,0,1-1.78-1.67c0-1.4,1.25-2.17,3.49-2.16v-.12a1.19,1.19,0,0,0-1.31-1.34,3,3,0,0,0-1.52.43l-.24-.7a3.63,3.63,0,0,1,1.91-.51c1.78,0,2.21,1.21,2.21,2.37v2.17a8.52,8.52,0,0,0,.09,1.4Zm-.15-3c-1.15,0-2.46.18-2.46,1.31a.94.94,0,0,0,1,1,1.45,1.45,0,0,0,1.41-1,1.35,1.35,0,0,0,.06-.34Z"/><path fill="#231f20" d="M52.77,17.68H50.31v-.89h6v.89H53.82v7.2h-1Z"/><path fill="#231f20" d="M58.19,17.44a.62.62,0,0,1-.67.65.63.63,0,0,1-.64-.65.65.65,0,0,1,.66-.66A.63.63,0,0,1,58.19,17.44ZM57,24.88V19.07h1v5.81Z"/><path fill="#231f20" d="M61.1,17.4v1.67h1.51v.8H61.1V23c0,.72.2,1.13.79,1.13a2.21,2.21,0,0,0,.61-.07l0,.79a2.48,2.48,0,0,1-.94.15,1.46,1.46,0,0,1-1.14-.45A2.15,2.15,0,0,1,60.06,23V19.87h-.9v-.8h.9V17.68Z"/><path fill="#231f20" d="M63.8,16.36h1v8.52h-1Z"/><path fill="#231f20" d="M67.22,22.16a1.86,1.86,0,0,0,2,2,3.75,3.75,0,0,0,1.6-.3l.18.76a4.8,4.8,0,0,1-1.93.36,2.69,2.69,0,0,1-2.85-2.93c0-1.75,1-3.13,2.72-3.13a2.46,2.46,0,0,1,2.4,2.73,4,4,0,0,1,0,.49Zm3.09-.75a1.51,1.51,0,0,0-1.46-1.72,1.75,1.75,0,0,0-1.62,1.72Z"/><path fill="#231f20" d="M23.74,73.08a5.25,5.25,0,0,1-2.14.38,3.77,3.77,0,0,1-4-4.09,4,4,0,0,1,4.22-4.24,4.26,4.26,0,0,1,1.92.36l-.25.85A3.84,3.84,0,0,0,21.87,66a3,3,0,0,0-3.16,3.34,2.94,2.94,0,0,0,3.11,3.25,4.24,4.24,0,0,0,1.7-.34Z"/><path fill="#231f20" d="M25,64.83h1.06v3.62h0a2,2,0,0,1,.76-.75,2.16,2.16,0,0,1,1.08-.3c.78,0,2,.48,2,2.49v3.45H28.9V70c0-.94-.35-1.73-1.34-1.73a1.51,1.51,0,0,0-1.42,1.06,1.26,1.26,0,0,0-.07.5v3.5H25Z"/><path fill="#231f20" d="M36.93,70.39A2.83,2.83,0,0,1,34,73.47a2.76,2.76,0,0,1-2.79-3,2.84,2.84,0,0,1,2.88-3.09A2.76,2.76,0,0,1,36.93,70.39Zm-4.61.06c0,1.27.73,2.23,1.76,2.23s1.77-1,1.77-2.25c0-1-.5-2.23-1.74-2.23S32.32,69.35,32.32,70.45Z"/><path fill="#231f20" d="M38.12,72.26a2.69,2.69,0,0,0,1.39.42c.77,0,1.12-.38,1.12-.86s-.3-.78-1.07-1.07c-1.05-.37-1.54-1-1.54-1.64a1.79,1.79,0,0,1,2-1.71,2.91,2.91,0,0,1,1.43.36l-.26.77A2.32,2.32,0,0,0,40,68.2c-.62,0-1,.36-1,.79s.35.69,1.1,1c1,.39,1.52.89,1.52,1.75,0,1-.79,1.74-2.17,1.74a3.33,3.33,0,0,1-1.63-.39Z"/><path fill="#231f20" d="M42.87,72.26a2.69,2.69,0,0,0,1.39.42c.77,0,1.13-.38,1.13-.86s-.3-.78-1.08-1.07c-1.05-.37-1.54-1-1.54-1.64a1.8,1.8,0,0,1,2-1.71,2.9,2.9,0,0,1,1.42.36l-.26.77a2.32,2.32,0,0,0-1.19-.33c-.62,0-1,.36-1,.79s.35.69,1.1,1c1,.39,1.53.89,1.53,1.75,0,1-.8,1.74-2.17,1.74a3.34,3.34,0,0,1-1.64-.39Z"/><path fill="#231f20" d="M48.35,70.63a1.87,1.87,0,0,0,2,2,4,4,0,0,0,1.61-.3l.18.75a4.67,4.67,0,0,1-1.93.36,2.7,2.7,0,0,1-2.86-2.93c0-1.75,1-3.13,2.73-3.13a2.47,2.47,0,0,1,2.4,2.74,4.15,4.15,0,0,1,0,.49Zm3.1-.75A1.51,1.51,0,0,0,50,68.16a1.76,1.76,0,0,0-1.62,1.72Z"/><path fill="#231f20" d="M56.36,65.26h4.35v.87H57.4v2.69h3.06v.86H57.4v3.66h-1Z"/><path fill="#231f20" d="M63,65.91a.66.66,0,0,1-1.31,0,.64.64,0,0,1,.66-.66A.62.62,0,0,1,63,65.91Zm-1.18,7.43v-5.8h1.06v5.8Z"/><path fill="#231f20" d="M64.66,64.83h1.06v8.51H64.66Z"/><path fill="#231f20" d="M68.08,70.63a1.86,1.86,0,0,0,2,2,4,4,0,0,0,1.61-.3l.18.75a4.67,4.67,0,0,1-1.93.36,2.7,2.7,0,0,1-2.86-2.93c0-1.75,1-3.13,2.72-3.13a2.46,2.46,0,0,1,2.4,2.74,4.68,4.68,0,0,1,0,.49Zm3.09-.75a1.49,1.49,0,0,0-1.46-1.72,1.75,1.75,0,0,0-1.62,1.72Z"/><path fill="#231f20" d="M24.9,115.34c-.06-1.13-.13-2.48-.12-3.49h0c-.28,1-.62,2-1,3.07l-1.43,3.92h-.79L20.2,115c-.38-1.14-.71-2.18-.94-3.14h0c0,1-.08,2.36-.16,3.57l-.21,3.47h-1l.57-8.08h1.33l1.38,3.91c.33,1,.61,1.88.81,2.72h0c.2-.82.49-1.7.85-2.72l1.44-3.91h1.33l.5,8.08h-1Z"/><path fill="#231f20" d="M28.36,116.18a1.85,1.85,0,0,0,2,2,3.8,3.8,0,0,0,1.61-.3l.18.76a4.67,4.67,0,0,1-1.93.36,2.7,2.7,0,0,1-2.86-2.93c0-1.75,1-3.13,2.73-3.13a2.46,2.46,0,0,1,2.39,2.74,4.88,4.88,0,0,1,0,.49Zm3.09-.76A1.49,1.49,0,0,0,30,113.71a1.75,1.75,0,0,0-1.62,1.71Z"/><path fill="#231f20" d="M38.8,110.38v7c0,.52,0,1.1.05,1.5h-1l0-1h0a2.16,2.16,0,0,1-2,1.14c-1.41,0-2.49-1.18-2.49-3,0-1.93,1.19-3.12,2.61-3.12a2,2,0,0,1,1.75.89h0v-3.46Zm-1.06,5.07a1.77,1.77,0,0,0-.05-.45,1.54,1.54,0,0,0-1.52-1.22c-1.09,0-1.74,1-1.74,2.24s.58,2.15,1.72,2.15a1.59,1.59,0,0,0,1.54-1.26,1.64,1.64,0,0,0,.05-.45Z"/><path fill="#231f20" d="M41.73,111.45a.66.66,0,0,1-1.31,0,.65.65,0,0,1,.66-.66A.63.63,0,0,1,41.73,111.45Zm-1.18,7.44v-5.8h1.06v5.8Z"/><path fill="#231f20" d="M46.57,118.89l-.08-.73h0a2.16,2.16,0,0,1-1.77.86,1.66,1.66,0,0,1-1.78-1.66c0-1.41,1.25-2.18,3.49-2.16v-.12a1.2,1.2,0,0,0-1.31-1.35,3,3,0,0,0-1.52.43l-.24-.69a3.64,3.64,0,0,1,1.91-.52c1.78,0,2.21,1.21,2.21,2.38v2.17a8.47,8.47,0,0,0,.09,1.39Zm-.15-3c-1.15,0-2.46.18-2.46,1.3a.94.94,0,0,0,1,1,1.45,1.45,0,0,0,1.4-1,1.36,1.36,0,0,0,.06-.33Z"/><path fill="#231f20" d="M51.72,110.91a16,16,0,0,1,2.22-.16,4.65,4.65,0,0,1,3.28,1,3.74,3.74,0,0,1,1.14,2.91,4.25,4.25,0,0,1-1.17,3.14A5,5,0,0,1,53.62,119a17.16,17.16,0,0,1-1.9-.09Zm1.05,7.15a6.25,6.25,0,0,0,1,.06,3.11,3.11,0,0,0,3.45-3.43c0-1.9-1.07-3.12-3.28-3.12a5.82,5.82,0,0,0-1.22.11Z"/><path fill="#231f20" d="M60.32,116.18a1.85,1.85,0,0,0,2,2,3.75,3.75,0,0,0,1.6-.3l.18.76a4.63,4.63,0,0,1-1.93.36,2.69,2.69,0,0,1-2.85-2.93c0-1.75,1-3.13,2.72-3.13a2.46,2.46,0,0,1,2.4,2.74,2.81,2.81,0,0,1,0,.49Zm3.09-.76A1.5,1.5,0,0,0,62,113.71a1.74,1.74,0,0,0-1.62,1.71Z"/><path fill="#231f20" d="M65.6,117.81a2.79,2.79,0,0,0,1.39.42c.76,0,1.12-.38,1.12-.86s-.3-.78-1.07-1.07c-1.05-.37-1.54-1-1.54-1.64a1.79,1.79,0,0,1,2-1.71,2.91,2.91,0,0,1,1.43.36l-.26.77a2.32,2.32,0,0,0-1.19-.33c-.63,0-1,.36-1,.79s.34.69,1.1,1c1,.38,1.52.89,1.52,1.75,0,1-.79,1.74-2.17,1.74a3.33,3.33,0,0,1-1.63-.4Z"/><path fill="#231f20" d="M74.63,118.67A3.81,3.81,0,0,1,73,119a2.76,2.76,0,0,1-2.89-3A3,3,0,0,1,73.19,113a3.4,3.4,0,0,1,1.46.3l-.24.81a2.45,2.45,0,0,0-1.22-.28,2,2,0,0,0-2,2.2,2,2,0,0,0,2,2.17,3,3,0,0,0,1.3-.29Z"/><path fill="#231f20" d="M75.87,114.9c0-.69,0-1.27-.05-1.81h.92l0,1.13h0a1.75,1.75,0,0,1,1.6-1.27,1.28,1.28,0,0,1,.3,0v1a1.79,1.79,0,0,0-.36,0A1.47,1.47,0,0,0,77,115.3a2.57,2.57,0,0,0,0,.5v3.09h-1Z"/><path fill="#231f20" d="M81,111.45a.63.63,0,0,1-.68.65.63.63,0,0,1-.63-.65.64.64,0,0,1,.66-.66A.63.63,0,0,1,81,111.45Zm-1.18,7.44v-5.8H80.9v5.8Z"/><path fill="#231f20" d="M82.65,115c0-.74,0-1.34-.05-1.89h1l0,1h0A2.27,2.27,0,0,1,85.68,113c1.4,0,2.46,1.19,2.46,3,0,2.09-1.27,3.12-2.64,3.12a2,2,0,0,1-1.79-.91h0v3.15h-1Zm1,1.55a2,2,0,0,0,0,.43,1.63,1.63,0,0,0,1.58,1.23c1.12,0,1.76-.91,1.76-2.24,0-1.16-.61-2.16-1.72-2.16a1.7,1.7,0,0,0-1.6,1.31,2,2,0,0,0-.07.43Z"/><path fill="#231f20" d="M90.75,111.42v1.67h1.51v.8H90.75V117c0,.72.2,1.13.79,1.13a2.13,2.13,0,0,0,.61-.08l0,.8a2.73,2.73,0,0,1-.94.14,1.49,1.49,0,0,1-1.14-.44,2.17,2.17,0,0,1-.4-1.51v-3.17h-.9v-.8h.9v-1.4Z"/><path fill="#231f20" d="M94.62,111.45a.65.65,0,1,1-1.3,0,.64.64,0,0,1,.66-.66A.62.62,0,0,1,94.62,111.45Zm-1.17,7.44v-5.8h1v5.8Z"/><path fill="#231f20" d="M101.51,115.94A2.83,2.83,0,0,1,98.62,119a2.76,2.76,0,0,1-2.78-3A2.83,2.83,0,0,1,98.71,113,2.75,2.75,0,0,1,101.51,115.94ZM96.9,116c0,1.27.73,2.23,1.77,2.23s1.76-1,1.76-2.25c0-1-.49-2.23-1.74-2.23S96.9,114.9,96.9,116Z"/><path fill="#231f20" d="M102.84,114.66c0-.6,0-1.1,0-1.57h.93l.06,1h0a2.14,2.14,0,0,1,1.92-1.09c.81,0,2,.48,2,2.47v3.47h-1v-3.35c0-.93-.35-1.71-1.34-1.71a1.5,1.5,0,0,0-1.42,1.08,1.45,1.45,0,0,0-.07.49v3.49h-1.06Z"/><path fill="#fff" d="M77,224.71a3.68,3.68,0,0,0,1.87.53c1.07,0,1.69-.57,1.69-1.38s-.43-1.19-1.52-1.61c-1.32-.47-2.13-1.15-2.13-2.29a2.32,2.32,0,0,1,2.61-2.19,3.73,3.73,0,0,1,1.79.39L81,219a3.25,3.25,0,0,0-1.54-.38c-1.1,0-1.52.66-1.52,1.21,0,.76.49,1.13,1.61,1.56,1.37.53,2.06,1.19,2.06,2.37s-.92,2.33-2.83,2.33a4.25,4.25,0,0,1-2.06-.51Z"/><path fill="#fff" d="M87.84,224.4c0,.6,0,1.13,0,1.58H87L86.9,225h0A2.18,2.18,0,0,1,85,226.11c-.91,0-2-.5-2-2.54v-3.39H84v3.21c0,1.1.33,1.85,1.29,1.85a1.52,1.52,0,0,0,1.39-1,1.57,1.57,0,0,0,.1-.54v-3.56h1Z"/><path fill="#fff" d="M89.55,226c0-.39,0-1,0-1.5v-7h1v3.64h0a2.15,2.15,0,0,1,2-1.07c1.44,0,2.46,1.2,2.45,3,0,2.07-1.31,3.1-2.6,3.1A2.06,2.06,0,0,1,90.55,225h0l-.05,1Zm1.09-2.33a2.3,2.3,0,0,0,0,.39,1.63,1.63,0,0,0,1.58,1.23c1.11,0,1.77-.9,1.77-2.23,0-1.16-.6-2.16-1.73-2.16a1.7,1.7,0,0,0-1.61,1.3,2.34,2.34,0,0,0-.06.43Z"/><path fill="#fff" d="M96.43,221.75c0-.6,0-1.09-.05-1.57h.92l0,.93h0A2,2,0,0,1,99.21,220a1.71,1.71,0,0,1,1.64,1.17h0a2.33,2.33,0,0,1,.64-.76,2,2,0,0,1,1.29-.41c.76,0,1.9.51,1.9,2.52V226h-1v-3.29c0-1.11-.41-1.78-1.26-1.78a1.34,1.34,0,0,0-1.24,1,1.63,1.63,0,0,0-.09.53V226h-1V222.5c0-.92-.41-1.59-1.21-1.59A1.45,1.45,0,0,0,97.54,222a1.49,1.49,0,0,0-.08.52V226h-1Z"/><path fill="#fff" d="M107.61,218.55a.62.62,0,0,1-.67.64.63.63,0,0,1-.64-.64.64.64,0,0,1,.66-.66A.62.62,0,0,1,107.61,218.55ZM106.43,226v-5.8h1.06V226Z"/><path fill="#fff" d="M110.51,218.51v1.67H112v.8h-1.51v3.13c0,.72.21,1.13.8,1.13a2.76,2.76,0,0,0,.61-.07l0,.79a2.63,2.63,0,0,1-.93.14,1.49,1.49,0,0,1-1.14-.44,2.15,2.15,0,0,1-.41-1.51V221h-.9v-.8h.9v-1.39Z"/><path fill="#fff" d="M285.85,65.37v4.78c0,1.81.8,2.58,1.88,2.58s2-.79,2-2.58V65.37h1.06v4.71c0,2.48-1.31,3.5-3.06,3.5s-2.91-1-2.91-3.45V65.37Z"/><path fill="#fff" d="M292.53,69.54c0-.74,0-1.34,0-1.9h.94l.05,1h0a2.27,2.27,0,0,1,2.06-1.13c1.4,0,2.46,1.19,2.46,2.95,0,2.09-1.27,3.12-2.64,3.12a2,2,0,0,1-1.79-.91h0v3.15h-1.05Zm1.05,1.55a2,2,0,0,0,.05.43,1.62,1.62,0,0,0,1.58,1.23c1.11,0,1.76-.91,1.76-2.24,0-1.16-.61-2.16-1.73-2.16a1.68,1.68,0,0,0-1.59,1.31,1.55,1.55,0,0,0-.07.43Z"/><path fill="#fff" d="M299.36,64.93h1.06v8.52h-1.06Z"/><path fill="#fff" d="M307.45,70.5a2.83,2.83,0,0,1-2.89,3.08,2.77,2.77,0,0,1-2.79-3,2.84,2.84,0,0,1,2.88-3.08A2.75,2.75,0,0,1,307.45,70.5Zm-4.61.06c0,1.27.73,2.23,1.76,2.23s1.77-1,1.77-2.26c0-1-.49-2.23-1.74-2.23S302.84,69.46,302.84,70.56Z"/><path fill="#fff" d="M312,73.45l-.09-.73h0a2.19,2.19,0,0,1-1.78.86,1.65,1.65,0,0,1-1.77-1.67c0-1.4,1.24-2.17,3.49-2.15v-.12a1.21,1.21,0,0,0-1.32-1.35,2.9,2.9,0,0,0-1.51.43l-.24-.69a3.6,3.6,0,0,1,1.9-.52c1.78,0,2.21,1.21,2.21,2.38v2.17a7.44,7.44,0,0,0,.1,1.39Zm-.16-3c-1.15,0-2.46.18-2.46,1.3a.94.94,0,0,0,1,1,1.45,1.45,0,0,0,1.4-1,1,1,0,0,0,.06-.34Z"/><path fill="#fff" d="M319.58,64.93v7c0,.52,0,1.1.05,1.5h-.95l-.05-1h0a2.15,2.15,0,0,1-2,1.14c-1.4,0-2.48-1.19-2.48-3,0-1.93,1.18-3.12,2.6-3.12a1.93,1.93,0,0,1,1.75.89h0V64.93ZM318.52,70a2.35,2.35,0,0,0,0-.45A1.56,1.56,0,0,0,317,68.34c-1.09,0-1.74,1-1.74,2.24s.58,2.15,1.72,2.15a1.6,1.6,0,0,0,1.55-1.26,2.19,2.19,0,0,0,0-.46Z"/><path fill="#fff" d="M337.48,66.46l1.08-1.1v4.56a.48.48,0,0,0,.48.47.47.47,0,0,0,.47-.47V65.36l1.09,1.1a.48.48,0,0,0,.67,0h0a.47.47,0,0,0,0-.67h0l-1.9-1.9a.56.56,0,0,0-.15-.1.55.55,0,0,0-.36,0l-.16.1-1.9,1.9a.48.48,0,1,0,.68.68Zm5.83,3a.48.48,0,0,0-.48.48v1.9a.47.47,0,0,1-.47.47h-6.64a.47.47,0,0,1-.48-.47v-1.9a.48.48,0,1,0-.95,0v1.9a1.43,1.43,0,0,0,1.43,1.42h6.64a1.42,1.42,0,0,0,1.42-1.42v-1.9A.47.47,0,0,0,343.31,69.44Z"/></svg>
	//         ),

	//     },
];

export default variations;
