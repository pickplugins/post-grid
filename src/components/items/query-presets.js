var queryPresets = [
	{
		label: "Latest Posts by Publish Date",
		key: "preset1",
		isPro: false,
		prams: {
			postType: { value: ["post"], id: "postType" },
			postStatus: { value: ["publish"], id: "postStatus" },
			order: { value: "DESC", id: "order" },
			orderby: { value: ["date"], id: "orderby" },
			postsPerPage: { value: "10", id: "postsPerPage" }
		}
	},
	{
		label: "Oldest Posts by Publish Date",
		key: "preset2",
		isPro: false,
		prams: {
			postType: { value: ["post"], id: "postType" },
			postStatus: { value: ["publish"], id: "postStatus" },
			order: { value: "ASC", id: "order" },
			orderby: { value: ["date"], id: "orderby" },
			postsPerPage: { value: "10", id: "postsPerPage" }
		}
	},
	{
		label: "Latest Posts by Modified Date",
		key: "preset3",
		isPro: false,
		prams: {
			postType: { value: ["post"], id: "postType" },
			postStatus: { value: ["publish"], id: "postStatus" },
			order: { value: "DESC", id: "order" },
			orderby: { value: ["modified"], id: "orderby" },
			postsPerPage: { value: "10", id: "postsPerPage" }
		}
	},
	{
		label: "Oldest Posts by Modified Date",
		key: "preset4",
		isPro: false,
		prams: {
			postType: { value: ["post"], id: "postType" },
			postStatus: { value: ["publish"], id: "postStatus" },
			order: { value: "ASC", id: "order" },
			orderby: { value: ["modified"], id: "orderby" },
			postsPerPage: { value: "10", id: "postsPerPage" }
		}
	},
	{
		label: "Alphabetical Order A-Z",
		key: "preset5",
		isPro: false,
		prams: {
			postType: { value: ["post"], id: "postType" },
			postStatus: { value: ["publish"], id: "postStatus" },
			order: { value: "ASC", id: "order" },
			orderby: { value: ["name"], id: "orderby" },
			postsPerPage: { value: "10", id: "postsPerPage" }
		}
	},
	{
		label: "Alphabetical Order Z-A",
		key: "preset6",
		isPro: false,
		prams: {
			postType: { value: ["post"], id: "postType" },
			postStatus: { value: ["publish"], id: "postStatus" },
			order: { value: "DESC", id: "order" },
			orderby: { value: ["name"], id: "orderby" },
			postsPerPage: { value: "10", id: "postsPerPage" }
		}
	},
	{
		label: "Most Commented Posts",
		key: "preset7",
		isPro: false,
		prams: {
			postType: { value: ["post"], id: "postType" },
			postStatus: { value: ["publish"], id: "postStatus" },
			order: { value: "DESC", id: "order" },
			orderby: { value: ["name"], id: "comment_count" },
			postsPerPage: { value: "10", id: "postsPerPage" }
		}
	},
	{
		label: "Random 10 Posts",
		key: "preset8",
		isPro: false,
		prams: {
			postType: { value: ["post"], id: "postType" },
			postStatus: { value: ["publish"], id: "postStatus" },
			order: { value: "DESC", id: "order" },
			orderby: { value: ["rand"], id: "orderby" },
			postsPerPage: { value: "10", id: "postsPerPage" }
		}
	}
];

export default queryPresets;
