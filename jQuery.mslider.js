

/* jQuery mSlider - TODO: Description
 * TODO: usage
 * 
 * Copyright (c) 2013 Mateus das C. Moura
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

$.fn.mslider = function(settings){
	var defaults = {
			autotroca: true,
			setas: true,
			indice: true,
			largura: 960,
			duracao: 5000
		},
		settings = $.extend({}, defaults, settings||{});

	function onDivs(divs, time, left, prev){
		var vp = defaults.largura;

		divs.css({
			position: "absolute",
			left: prev != undefined ? -vp : vp
		}).show();

		divs.animate({
			left: 0//divs.parents("section").is(".sliderBox") ? 47 : 0
		}, 500, function(){
			$("body").css("overflow-x", "auto");
		});

		$("div.move", divs).each(function(i){
			var b = i + 1;

			$(this).animate({
				left: 0
			}, time - ( b * 100 ), function(){
				b == 1 && setTimeout(function(){
					divs.addClass("ativo");
					$(".noClick", divs.parents("section")).removeClass("noClick");
				}, 400 );
			});
		});
	};

	function offDivs(divs, time, left, prev){
		var vp = defaults.largura;

		$("div.move", divs).each(function(i){
			var b = i + 1;

			$(this).animate({
				left: prev != undefined ? left * b :  -( left * b )
			}, time - ( b * 10 ) );
		});

		divs.animate({
			left: prev != undefined ? vp : -vp
		}, 1000, function(){
			divs.hide().removeClass("ativo");
		});
	};

	function actNav( $bt, $div, $obj, $ind ){
		$("body").css("overflow-x", "hidden");

		$(".bt-anterior, .bt-proximo", $div ).addClass("noClick");

		if($bt.hasClass("bt-proximo")){
			offDivs($obj.ativo, 800, 1000);
			onDivs($obj.nxt, 1200, 0);

			!$obj.nxt.next().length && $bt.addClass("inativo");
			$(".bt-anterior", $div).removeClass("inativo");

			if( $div.hasClass("highBox") ){
				$ind == undefined && $("li.ativo", $("ul.indice", $div) ).removeClass("ativo").next("li").addClass("ativo");
			}else{
				$("li.ativo", index).animate({
					backgroundPosition: 0
				}, 1000, function(){
					$(this).removeClass("ativo");
				}).next("li").css("background-position", "-480px 0").animate({
					backgroundPosition: "-240px"
				}, 1000, function(){
					$(this).addClass("ativo");
				});
			}
		}else{
			offDivs($obj.ativo, 800, 1000, true);
			onDivs($obj.nxt, 1200, 0, true);

			!$obj.nxt.prev().length && $bt.addClass("inativo");
			$(".bt-proximo", $div ).removeClass("inativo");
			if( $div.hasClass("highBox") ){
				$ind == undefined && $("li.ativo", $("ul.indice", $div) ).removeClass("ativo").prev("li").addClass("ativo");
			}else{
				$("li.ativo", index).animate({
					backgroundPosition: -480
				}, 1000, function(){
					$(this).css("background-position", "0 0").removeClass("ativo");
				}).prev("li").animate({
					backgroundPosition: "-240px"
				}, 1000, function(){
					$(this).addClass("ativo");
				});
			}
		}
	};

	actionsSlider function($mSlider){
		$(".bt-anterior, .bt-proximo", $mSlider ).unbind().click(function(){
			var $bt = $(this),
				$obj = {
					ativo: $("article.ativo", $mSlider),
					nxt: $bt.hasClass("bt-proximo") ? $("article.ativo", $mSlider).next() : $("article.ativo", $mSlider).prev()
				};

			if($bt.hasClass("inativo") || $bt.hasClass("noClick")){
				return false;
			}

			actNav($bt, $mSlider, $obj);

			return false;
		});

		$("ul.indice", $high).each(function(){
			$(this).width($("li", $(this)).length * 21)
		});
		
		$("article.passo3 div.move:last", $mSlider).add($("article.passo4 div.move:last", $mSlider)).addClass("last");
	}


	return $(this).each(function(i){
		var $this = $(this),
			$indice = $('<div class="indice"><ul></ul></div>');


		for (var i = $('article', $this).length - 1; i >= 0; i--) {
			$('article', $this)[i];
		};

		

	});
}