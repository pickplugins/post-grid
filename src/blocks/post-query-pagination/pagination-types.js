import { applyFilters } from '@wordpress/hooks';


const paginationTypesBasic = {
  none: { label: 'None', value: 'none', isPro: false },
  normal: { label: 'Normal Pagination', value: 'normal', isPro: false },
  ajax: { label: 'Ajax Pagination', value: 'ajax', /*isPro: false*/ },
  next_previous: { label: 'Next-Previous', value: 'next_previous', /*isPro: false*/ },
  loadmore: { label: 'Load More', value: 'loadmore', /*isPro: false*/ },
  infinite: { label: 'Infinite Load', value: 'infinite', /*isPro: false*/ },
};

let paginationTypes = applyFilters('paginationTypes', paginationTypesBasic);


export default paginationTypes;