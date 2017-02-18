define(['jquery'], function($){
	return {
		list : function(options){
			var settings = {
				obj:'#company',
				liClass:'',
		        company2IputClass:'',
		        company2LabelClass:''
			};
			$.extend(settings,options);
			var $company = $(settings.obj);
			var $tip =$('<div class="tip2">请输入列表中公司或其他</div>');
			var $companyList = $('<ul id="company_list"><li class="other '+settings.liClass+'" data-id="0" style="">其他</li></ul>');
			$tip.insertAfter($company);
			$companyList.insertAfter($tip);

			$company.on('keyup', function() {
				$tip.hide();
				$('.com').remove();
				var companyName = $(this).val();
				if (companyName !='其他') {
						$company2.remove();
						$tip.hide();
				}
				if (companyName && companyName != " ") {
					$companyList.show();
					$.post("user/company", {
						company: companyName
					}, function(data) {
						for (var i = 0; i < data.length; i++) {
							// var menu = data[i];
							var $list = $('<li class="com '+settings.liClass+'" data-id ="' + data[i].com_id + '">' + data[i].company + '</li>');
							// $list.data('kinds',menu.kinds);
							$list.prependTo($companyList);
						}
					}, 'json');
				} else {
					$companyList.hide();
				}

			});
			var $company2 = $('<div id="company2"><label for="company" class="'+settings.company2LabelClass+'">请输入公司名称</label><span class="i">*</span><input type="text" class="'+settings.company2IputClass+'" autocomplete="off" name="company2" class="form-control"></div>');

			$company.on('blur', function() {
				setTimeout(function() {
					$companyList.hide();
					var companyName = $(this).val();
					if (companyName =='其他') {
						$company2.remove();
						$company.after($company2);
					}else{
						$.post("user/companyName", {
							company: companyName
						}, function(data) {
							var newData = data.replace(/\s/g, '');
							if (newData == "success") {
							}else{
								$tip.show();
							
							}

						}, 'text');
					}
							
						
					
				}.bind(this), 100);//???????


			});
			$companyList.on('click', 'li', function() {
				// console.log($(this).data('id'));
				$company.val($(this).html());
				$companyList.hide();

			});
			
		}
	}
	
});