/*!
*
* codyNiceBox jQuery plugin
* Version 1.0.0
* Codychat Version 3.6
* Copyright (c) 2022 BlackCorsair Developer
* Licensed under the MIT License
* Please dont remove this
*
*/

(function( $ ) {

    $.fn.codyNiceBox = function(config) {
        return new $.codyNiceBox(this, config || {});
    };

    $.codyNiceBox = function (element, options) {
        options = options || {};
        this.options = $.extend({}, $.fn.codyNiceBox.defaults, options);
        if(options.str) {
            this.options.str = $.extend({}, $.fn.codyNiceBox.defaults.str, options.str);
        }
        $.fn.codyNiceBox.defaults = this.options;
        elm = $(element);
        return this.init();
    };
	
    $.fn.codyNiceBox.defaults = {
		'autoplay': 0,
		'type': '',
		'drag': 1,
		'src': '',
		'html': '',
		'prefix': '',
		'resize': 0,
		'icon': "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8' standalone='no'%3F%3E%3Csvg width='256px' height='256px' viewBox='0 0 256 256' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' preserveAspectRatio='xMidYMid'%3E%3Cg%3E%3Cpath d='M213.564,256 L42.436,256 C18.999,256 0,237.001 0,213.564 L0,42.436 C0,18.999 18.999,0 42.436,0 L213.564,0 C237.001,0 256,18.999 256,42.436 L256,213.564 C256,237.001 237.001,256 213.564,256' fill='%2300AEEF'%3E%3C/path%3E%3Cpath d='M131.02,107.786 C117.701,107.786 106.111,115.278 100.274,126.277 C94.435,115.278 82.851,107.786 69.523,107.786 C61.697,107.786 54.467,110.375 48.633,114.747 L48.633,85.424 C48.564,81.635 45.474,78.602 41.672,78.602 C37.87,78.602 34.81,81.635 34.723,85.424 L34.723,143.166 L34.73,143.166 C35.037,162.125 50.487,177.398 69.523,177.398 C82.851,177.398 94.435,169.899 100.274,158.911 C106.111,169.899 117.701,177.398 131.02,177.398 C150.236,177.398 165.824,161.816 165.824,142.585 C165.824,123.364 150.236,107.786 131.02,107.786 M69.523,163.463 C57.992,163.463 48.633,154.122 48.633,142.59 C48.633,131.062 57.992,121.72 69.523,121.72 C81.053,121.72 90.392,131.062 90.392,142.585 C90.392,154.119 81.053,163.463 69.523,163.463 M131.02,163.463 C119.486,163.463 110.134,154.119 110.134,142.585 C110.134,131.062 119.486,121.72 131.02,121.72 C142.549,121.72 151.896,131.062 151.896,142.585 C151.896,154.119 142.549,163.463 131.02,163.463' fill='%23FFFFFF'%3E%3C/path%3E%3Cpath d='M219.83,165.745 L200.912,142.54 L219.853,119.29 C222.248,116.223 221.561,111.94 218.255,109.665 C214.945,107.37 210.301,107.958 207.74,110.934 L207.74,110.93 L191.444,130.902 L175.163,110.93 L175.163,110.934 C172.628,107.958 167.955,107.37 164.655,109.665 C161.355,111.942 160.665,116.223 163.072,119.29 L163.065,119.29 L181.973,142.54 L163.065,165.745 L163.072,165.745 C160.665,168.822 161.355,173.091 164.655,175.376 C167.955,177.661 172.628,177.079 175.163,174.099 L191.444,154.155 L207.717,174.099 C210.281,177.079 214.923,177.661 218.233,175.376 C221.54,173.091 222.23,168.822 219.83,165.745' fill='%23FFFFFF'%3E%3C/path%3E%3C/g%3E%3C/svg%3E",
    };

    $.codyNiceBox.prototype = {

        init : function(){
            var nb = this;
            var prefix = $.fn.codyNiceBox.defaults.prefix;
			var trigger = $(this);
            
			elm.each(function() { 
				
				$.fn.codyNiceBox.defaults.type = $(this).attr('nb-type');
				$.fn.codyNiceBox.defaults.src = $(this).attr('nb-link');

				nb.resetNiceBox();
				nb.openNiceBox();
				
				$('.'+prefix+'_nicebox_nb_minimize').click(function(event) { // on minimize
					$.fn.codyNiceBox.defaults.prefix = $(this).data('box');
					nb.minimizeNiceBox();
					return false;
				});
						
				$('.'+prefix+'_nicebox_nb_close').click(function(event) { // on close
				    $.fn.codyNiceBox.defaults.prefix = $(this).data('box');
					nb.closeNiceBox();
					return false;
				});
				
				$('.'+prefix+'_nicebox_nb_show').click(function(event) { // on close
				    $.fn.codyNiceBox.defaults.prefix = $(this).data('box');
					nb.maximizeNiceBox();
					return false;
				});
				
	        });
			
            return this;
        },

		openNiceBox: function() {
			hideModal();
			hideOver();
			this.removeNiceBox();
			this.createNiceBox();
			this.setNiceBoxType();
			this.createIconBar();
			this.setNiceBoxDrag();
        },
		
		showNiceBox: function() {
			var prefix = $.fn.codyNiceBox.defaults.prefix;
			$('#'+prefix+'_nicebox_container_stream').removeClass(prefix+'_nicebox_streamout');
			$('#'+prefix+'_nicebox_container_stream').css('z-index', '171'); 
        },
		
		createNiceBox: function() {
			var prefix = $.fn.codyNiceBox.defaults.prefix;
			if(!$('#'+prefix+'_nicebox_style').length){
			$('head').append(
			$('<style id="'+prefix+'_nicebox_style">#'+prefix+'_nicebox_container_stream { width: 560px; height: 355px; z-index: 170; position: fixed; top: 100px; left: 50%; margin-left: -240px; margin-top: 0px; display: none; } .'+prefix+'_nicebox_background_stream { background-color: rgba(0,0,0,0.9); } #'+prefix+'_nicebox_stream_header { width: 100%; height: 30px; } .'+prefix+'_nicebox_vidopt { height: 40px; width: 40px; font-size: 21px !important; color: #fff; text-align: center; cursor: pointer; } #'+prefix+'_nicebox_mstream_img { display: block; margin: 0 auto; width: 30px; height: 30px; border-radius: 50%; } #'+prefix+'_nicebox_move_video { cursor: pointer; } .'+prefix+'_nicebox_streamhide { display: none !important; } #'+prefix+'_nicebox_wrap_stream { width:560px; height:315px; border-top:1px solid #333; } #'+prefix+'_nicebox_wrap_stream iframe { width:100%; height:100%; border:none; padding:0; margin:0; } #'+prefix+'_nicebox_wrap_stream video { width:100%; height:100%; border:none; padding:0; margin:0; } #'+prefix+'_nicebox_container_stream { width:560px; height:355px; z-index:170; position:fixed; top:100px; left:50%; margin-left:-240px; margin-top:0px; display:none; } .'+prefix+'_nicebox_vidopt { height:40px; width:40px; font-size:21px !important; color:#fff; text-align:center; cursor:pointer; } #'+prefix+'_nicebox_mstream_img { display:block; margin:0 auto; width:30px; height:30px; border-radius:50%; } .'+prefix+'_nicebox_streamhide { display:none !important; } .'+prefix+'_nicebox_streamout { left:-10000px !important; } #'+prefix+'_nicebox_wrap_stream_audio { width:300px; height:auto; border-top:1px solid #333; } #'+prefix+'_nicebox_wrap_stream_audio audio { width:100%; border:none; padding:0; margin:0; } #'+prefix+'_nicebox_container_stream_audio { width:300px; height:auto; z-index:170; position:fixed; top:100px; left:50%; margin-left:-150px; margin-top:0px; display:none; } .'+prefix+'_nicebox_over_stream { z-index:1100 !important; } @media screen and (max-width:1024px){ #'+prefix+'_nicebox_wrap_stream { width:400px; height:225px; } #'+prefix+'_nicebox_container_stream { top:100px; width:400px; height:265px; margin-left:-200px; margin-top:0px; } } @media only screen and (max-width : 480px) { #'+prefix+'_nicebox_wrap_stream { width:320px; height:180px; } #'+prefix+'_nicebox_container_stream { top:60px; width:320px; height:220px; margin-left:-160px; margin-top:0px; } }</style>'),
		    );
		    }

			$('body').prepend(
				'<div id="'+prefix+'_nicebox_container_stream" class="nice_box '+prefix+'_nicebox_streamers '+prefix+'_nicebox_vidstream '+prefix+'_nicebox_background_stream"><div class="btable nicebox_stream_header"><div id="'+prefix+'_nicebox_move_video" class="bcell_mid"></div><div data-box="'+prefix+'" class="'+prefix+'_nicebox_nb_minimize bcell_mid '+prefix+'_nicebox_vidminus '+prefix+'_nicebox_vidopt"><i class="fa fa-minus"></i></div><div data-box="'+prefix+'" class="'+prefix+'_nicebox_nb_close bcell_mid '+prefix+'_nicebox_vidopt"><i class="fa fa-times"></i></div></div><div id="'+prefix+'_nicebox_wrap_stream"></div></div>'
			);
			$('#'+prefix+'_nicebox_container_stream').removeClass(prefix+'_nicebox_streamout').fadeIn(300);
		    $('#'+prefix+'_nicebox_mstream').addClass(prefix+'_nicebox_streamhide');
			$('#'+prefix+'_nicebox_container_stream').css('z-index', '171');
        },
		
		resetNiceBox: function() {
			$('.nice_box').each(function(event) { // on minimize
				$('.nice_box').css('z-index', '170'); 
			}); 
        },
		
		hideNiceBox: function() {
			var prefix = $.fn.codyNiceBox.defaults.prefix;
			$('#'+prefix+'_nicebox_container_stream').addClass(prefix+'_nicebox_streamout'); 
        },
		
		minimizeNiceBox: function() {
			this.hideNiceBox();
			this.showIconBar();
        },
		
		maximizeNiceBox: function() {
			this.resetNiceBox();
			this.showNiceBox();
			this.hideIconBar();
        },
		
		closeNiceBox: function() {
			var prefix = $.fn.codyNiceBox.defaults.prefix;
			$('#'+prefix+'_nicebox_wrap_stream').html('');
		    $('#'+prefix+'_nicebox_container_stream').hide();
		    $('.'+prefix+'_nicebox_vidstream').removeClass(prefix+'_nicebox_over_stream');
            this.removeNiceBox();
            this.removeIconBar();			
        },
		
		removeNiceBox: function() {
			var prefix = $.fn.codyNiceBox.defaults.prefix;
			$('#'+prefix+'_nicebox_container_stream').remove();
		    $('#'+prefix+'_nicebox_mstream').remove();
        },
		
        createIconBar: function() {
			var prefix = $.fn.codyNiceBox.defaults.prefix;
			var icon = $.fn.codyNiceBox.defaults.icon;
			this.removeIconBar();
			$('<div id="'+prefix+'_nicebox_mstream" data-box="'+prefix+'" class="'+prefix+'_nicebox_nb_show chat_footer_item '+prefix+'_nicebox_streamhide"><img id="'+prefix+'_nicebox_mstream_img" src="'+icon+'"></div>').insertAfter('#dpriv');
        },
		
        showIconBar: function() {
			var prefix = $.fn.codyNiceBox.defaults.prefix;
			$('#'+prefix+'_nicebox_mstream').removeClass(prefix+'_nicebox_streamhide');
        },
		
        hideIconBar: function() {
			var prefix = $.fn.codyNiceBox.defaults.prefix;
			$('#'+prefix+'_nicebox_mstream').addClass(prefix+'_nicebox_streamhide'); 
        },
		
        removeIconBar: function() {
			var prefix = $.fn.codyNiceBox.defaults.prefix;
			$('#'+prefix+'_nicebox_mstream').remove();
        },
		
        setNiceBoxType: function() {
			var type = $.fn.codyNiceBox.defaults.type;
			var src = $.fn.codyNiceBox.defaults.src;
			if(type == 'video'){
			   this.createVideo(); 
		    }
			if(type == 'audio'){
			    this.createAudio();
		    }
			if(type == 'url'){
			   this.createLink();
		    }
			if(type == 'html'){
			   this.createHtml();
		    }
        },
		
        setNiceBoxDrag: function() {
			var drag = $.fn.codyNiceBox.defaults.drag;
			var resize = $.fn.codyNiceBox.defaults.resize;
			var prefix = $.fn.codyNiceBox.defaults.prefix;
			if(drag == 1){
			    $( '#'+prefix+'_nicebox_container_stream' ).draggable({
				    handle: '#'+prefix+'_nicebox_move_video',
				    containment: "document",
			    }); 
		    }
			if(resize == 1){
			    $( '#'+prefix+'_nicebox_container_stream' ).resizable({
                    alsoResize: '#'+prefix+'_nicebox_wrap_stream'
                });
		    }
        },
		
		createLink : function() {
			var src = $.fn.codyNiceBox.defaults.src;
			var prefix = $.fn.codyNiceBox.defaults.prefix;
			$('#'+prefix+'_nicebox_wrap_stream').html('<iframe src="'+src+'" allowfullscreen scrolling="" frameborder=""></iframe>');
		},
		
		createVideo : function() {
			var autoplay = $.fn.codyNiceBox.defaults.autoplay;
			var src = $.fn.codyNiceBox.defaults.src;
			var prefix = $.fn.codyNiceBox.defaults.prefix;
			if(autoplay == 1){
				$('#'+prefix+'_nicebox_wrap_stream').html('<video autoplay src="'+src+'" controls></video>');
			} else {
				$('#'+prefix+'_nicebox_wrap_stream').html('<video src="'+src+'" controls></video>');
			}
			if($('.modal_in:visible').length){
			    $('.'+prefix+'_nicebox_vidstream').addClass(prefix+'_nicebox_over_stream');
		    }  
		},
		
		createAudio : function() {
			var src = $.fn.codyNiceBox.defaults.src;
			var prefix = $.fn.codyNiceBox.defaults.prefix;
			if($.fn.codyNiceBox.defaults.autoplay == 1){
				$('#'+prefix+'_nicebox_wrap_stream').html('<audio autoplay src="'+src+'" controls></audio>');
			} else {
				$('#'+prefix+'_nicebox_wrap_stream').html('<audio preload="none" src="'+src+'" controls></audio>');
			}
		},
		
		createHtml : function() {
			var src = $.fn.codyNiceBox.defaults.src;
			var html = $.fn.codyNiceBox.defaults.html;
			var prefix = $.fn.codyNiceBox.defaults.prefix;
			$('#'+prefix+'_nicebox_wrap_stream').html(html);
		}
		
    };
	
	
}( jQuery ));
