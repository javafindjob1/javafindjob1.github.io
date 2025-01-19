(function(exports, document, undefined){
	var confirm = document.getElementById('confirm'),
		confirm_message = confirm.querySelector('#confirm_message'),
		btn_close = confirm.querySelector('#btn_close'),
		btn_confirm = confirm.querySelector('#btn_confirm'),
		mask = document.getElementById('mask'),
		confirm_handler = null;

    exports.show_confirm = function(message, confirm_handler){
		confirm_message.innerHTML = message || '';
		confirm_handler = confirm_handler || hide_confirm;

		exports.hide_confirm = function(){
            confirm.style.display = 'none';
            mask.style.display = 'none';
            mask.removeEventListener('click', hide_confirm, false);
            btn_close.removeEventListener('click', hide_confirm, false);
            btn_confirm.removeEventListener('click', confirm_handler, false);
        };
		
		confirm.style.display = 'block';
		mask.style.display = 'block';
		mask.addEventListener('click', hide_confirm, false);
		btn_close.addEventListener('click', hide_confirm, false);
		btn_confirm.addEventListener('click', confirm_handler, false);

        
	};
   
})(window, document);