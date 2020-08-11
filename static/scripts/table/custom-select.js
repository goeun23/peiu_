$(document).ready(function(){
	$('.sel').customSelect();//커스텀 셀렉트
});
$.fn.customSelect = function(){//셀렉트박스 커스터마이징 스크립트
	var zIdx = 3;
	function getRandomID() {
		var timeStamp = new Date().getTime();
		var randomStr = (Math.floor(Math.random() * timeStamp)).toString();

		return randomStr;
	}

	function getElementID( $obj ) {
		var objId = $obj.attr('id');

		if( !objId ) {
			objId = getRandomID();
			$obj.attr('id', objId);
		}
		return objId;
	}

	this.each(function(idx) {
		var $select = $(this),
			$option = $select.children('option'),
			selectedText = '', optionHtml = '', _html = '',
			elId = getElementID( $select ),
			eventId = '.evtId_' + elId,
			$dsSelectBox, $selectText, $ul, $li;
		

		(function makeCustomSelectHtml() {
			$.each($option, function() {
				var $thisOptionItem = $(this),
					name = $thisOptionItem.text() || '',
					value = $thisOptionItem.val(),
					isSelected = $thisOptionItem.prop('selected') || false,
					isDisabled = $thisOptionItem.prop('disabled') || false,
					className = isDisabled ? 'disabled' : isSelected ? 'selected' : '';

				optionHtml += '<li class="' + className + '" data-value="' + value + '">' + name + '</li>';
			});

			if( selectedText === '' && $option.length > 0 ){
				
				//selectedText = $option.eq(0).text();
				$option.each(function(){
					if($(this).prop('selected') == true){
						selectedText = $(this).text();
					}
				});
			}
			if($select.hasClass("typ2")){
				_html  = '<div class="dsSelectBox typ2">';
				_html += '<div class="selectedText typ2">' + selectedText + '</div>';
				_html += '<ul style="z-index:' + (999 - idx) + '" class="typ2">' + optionHtml + '</ul>';
				_html += '</div>';
			}else{
				_html  = '<div class="dsSelectBox">';
				_html += '<div class="selectedText">' + selectedText + '</div>';
				_html += '<ul style="z-index:' + (999 - idx) + '">' + optionHtml + '</ul>';
				_html += '</div>';
			}

			$select.next('.dsSelectBox').remove();
			$select.after(_html);
			$select.hide();

			$dsSelectBox = $select.next('.dsSelectBox');
			$dsSelectBox.width($select.outerWidth(true));

			$selectText	= $dsSelectBox.children('.selectedText');
			$ul			= $dsSelectBox.children('ul');
			$li			= $ul.children('li');
		})();

		(function initEvent() {
			$selectText.off(eventId).on('mousedown' + eventId, function(){
				$('div.dsSelectBox').children('ul').not($ul).slideUp(100,'swing');
				
				if($ul.css("display") == "block"){						
					$ul.slideUp(100,'swing');
				}else{
					$ul.slideDown(100,'swing');
					$(this).closest(".dsSelectBox").css("z-index",zIdx++);
				}
				
			});

			$ul.children('li:not(.disabled)').off(eventId).on('click' + eventId, function(){
				var $this		= $(this);
				var thisValue	= $this.attr('data-value');
				var thisText	= $this.html();

				$li.removeClass('selected');
				$this.addClass('selected');
				$ul.slideUp(100,'swing');
				$selectText.html(thisText);
				$select.val(thisValue);
				$this.parent('ul').parent('div').prev('select').children('option').each(function(){
					var selTxt = '';
					selTxt = $(this).text();
					if(selTxt == thisText){
						var thisOnChange = '';
						$(this).trigger('onchange');
					}else{
						$(this).removeAttr('selected');
					}
				});
			});

			$select.off(eventId).on('change' + eventId, function(){
				var $this	= $(this);
				var index	= $this.children('option:selected').index();

				$li.eq( index ).trigger('click');
			});

			$select.on('click' + eventId, function(){
				$dsSelectBox.trigger('mousedown');
			});

			$('body').off(eventId).on('mouseup' + eventId, function(e){
				if( $dsSelectBox.size() === 0 ){
					$ul.slideUp(100,'swing');
				}
			});

			// 셀렉트 레이어 이외의 다른것을 click 시 열려있는 select 레이어 닫기
			$(document).off(eventId).on('click' + eventId, function(e) {
				var $target = $(e.target);

				if( !$target.hasClass('selectedText') ) {
					$ul.slideUp(100,'swing');
				}
			});
		})();
	});
};