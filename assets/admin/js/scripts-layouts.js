jQuery(document).ready(function($){

    $(document).on('click','.import-layout',function(){
        _this = this;
        post_id = $(this).attr('post_id');

        $(_this).addClass('updating-message');

        $.ajax({
            type: 'POST',
            context: _this,
            url:post_grid_ajax.post_grid_ajaxurl,
            data: {
                "action" 		: "post_grid_ajax_fetch_block_hub_by_id",
                "post_grid_ajax_nonce"	: post_grid_ajax.ajax_nonce,
                "post_id" 		: post_id,
            },
            success: function( response ) {
                var data = JSON.parse( response );
                post_data = data['post_data'];
                download_count = data['download_count'];
                is_saved = data['is_saved'];

                console.log(is_saved);

                if(is_saved == 'yes'){
                    $(this).addClass('saved');
                    $(this).text('Saved');
                }else{
                    $(this).addClass('saved');
                    $(this).text('Not Saved');
                }



                $(_this).removeClass('updating-message');
            }
        });

    })

});