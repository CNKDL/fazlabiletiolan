$(document).ready(function(){
	$(".menu-list ul li a").click(function(){
		var windowWidth = $(window).width();
		if (windowWidth > 767)
		{
			$("nav ul").slideUp(100);
			$(".menu-list ul li a").each(function(){
				$(this).removeClass("active");
			});
				
			$(this).addClass("active");
			return false;
		}
		else
		{
			$(".menu-list").hide(500);
		}
	});
	
	$(".mobile-menu").click(function(){
		$(this).toggleClass("open");
		$("nav ul").slideToggle();
	});
	
	$(window).resize(function(){
		var windowWidth = $(this).width();
		if (windowWidth > 767)
		{
			$("nav ul").slideUp(100);
		}
		
		fixCommentContentWidth();
		fixHeaderHeight();
		fixPostBoxSizing();
		fixVRLineHeight();
	});
	
	$(".filter").click(function(){
		$(".menu-list").show(500);
	});
	
	$(".reply, .send-message, .btn-login").click(function(){
		$(".mask, .unmask").fadeIn(500);
		return false;
	});
	
	$(".unmask").click(function(e){
		if (!$(e.target).is('.popup-window') && !$(e.target).is(".popup-window *"))
		{
			$(".mask, .unmask").fadeOut(500);
		}
	});
	
	$(".popup-window a").click(function(){
		//burda ajax islemi yapilacak.success'inde sagidaki kod olacak.
		$(".mask, .unmask").fadeOut(500);
	});
	
	$(".rate-user i").mouseenter(function(e){
		var index = $(this).index();
		$(".rate-user i").removeClass("fa-star").addClass("fa-star-o");
		$(".rate-user i").each(function(indexNo){
			if (indexNo <= index)
			{
				$(this).removeClass("fa-star-o").addClass("fa-star");
			}
		});
	});
	
	$(".rate-user a").click(function(){
		return false;
	});
	
	//login
	$("#loginform h1").click(function(){
		var index = $(this).index();
		$("#loginform h1").removeClass("active").eq(index-1).addClass("active");
		$("#loginform div.tab").hide().eq(index-1).fadeIn(500);
	});
	
	$("#register-form").on("submit",function(e){
		e.preventDefault();
		var value = $("#register-form input").val();
		
		if($.trim(value) !== '') {
			$("#loginform").fadeOut(500);
			$("#login-content").addClass("flipped");
		}
		else {
			$("#register-form span").text("Geçerli bir e-mail adresi giriniz.");
		}
	});
	
	$("#registerform .dropdown-button").click(function(e){
		var which = $(this).attr("id");
		which = which.replace("btn","menu");
		$("#registerform #" + which).toggleClass("open");
		return false;
	});
	
	$("#registerform input").keyup(function(){
		var msgField = $(this).parent().next().find(".msg");
		
		if(msgField.text().indexOf("tekrar") == -1) {
			if($(this).val() !== '') {
				msgField.addClass("valid");
				var newText = msgField.text().replace("boş", "dolu");
				msgField.text(newText);
			}
			else {
				msgField.removeClass("valid");
				var newText = msgField.text().replace("dolu", "boş");
				msgField.text(newText);
			}
		}
		else {
			var pass = $("#registerform #password").val();
			if($(this).val() !== '' && $(this).val() === pass) {
				msgField.addClass("valid");
				var newText = msgField.text().replace("uyuşmuyor", "uyuşuyor");
				msgField.text(newText);
			}
			else {
				msgField.removeClass("valid");
				var newText = msgField.text().replace("uyuşuyor", "uyuşmuyor");
				msgField.text(newText);
			}
		}
	});
	
	/*$("#registerform input").focus(function(){
		$(this).parent().parent().addClass("focus-elem");
	});
	
	$("#registerform input").blur(function(){
		$(this).parent().parent().removeClass("focus-elem");
	});*/
	
	//dropdown start
	$('#select-default').bind("click", toggle);

	$('.option').bind("click", select);

	collapse();
	//dropdown end
	
	fixCommentContentWidth();
	fixHeaderHeight();
	fixPostBoxSizing();
	fixVRLineHeight();
	
	addEventsToPopupFormElements();
});

//dropdown functions
function toggle() {
	if ($('#select-dropdown').hasClass('open')) {
		collapse();
	} else {
		expand();
	}
}
function expand() {
	$('#select-dropdown').removeClass('closed').addClass('open');

	options = $('.select');

	options.each(function(index) {
		var layer = options.length - index;
		$(this).css("top", 40 * index + "px");
		$(this).css("width", 230);
		$(this).css("margin-left", -115);
	});
}
function collapse() {
	$('#select-dropdown').removeClass('open').addClass('closed');

	options = $('.select');

	options.each(function(index) {
		var layer = options.length - index;
		$(this).css("z-index", layer);
		$(this).css("top", 4 * index + "px");
		$(this).css("width", 230 - 4 * index);
		$(this).css("margin-left", -115 + (2 * index));
	});
}
function select() {
	if ($('#select-dropdown').hasClass('open')) {
		var selection = $(this).text();
		$('#select-default').text(selection);
		var data = $(this).data("id");

		window.dropdown = data;
		console.log(window.dropdown);

		collapse();
	} else {
		expand();
	}
}

//header height
function fixHeaderHeight() {
	var windowHeight = $(window).outerHeight();
	var contentHeight = $("section.content").outerHeight();
	var header = $("header.leftside");
	
	if(windowHeight > contentHeight)
	{
		header.css('height',windowHeight-40);
	}
	else
	{
		header.css('height',contentHeight);
	}
}

//post-box sizing
function fixPostBoxSizing() {
	$(".post-box").each(function(){
		var info = $(this).find(".info");
		
		var postBoxHeight = $(this).outerWidth();
		var infoWidth = info.outerWidth();
		var detailsWidth = $(this).find(".details").outerWidth();
		
		if (postBoxHeight > (infoWidth + detailsWidth))
		{
			info.removeAttr('style');
			info.find("ul").removeAttr('style');
		}
		else
		{
			info.css('float', 'left').css('text-align' , 'left');
			info.find("ul").css('margin-left', '20px');
		}
	});
}

// vr-line height
function fixVRLineHeight() {
	var vrLine = $(".vr-line");
	if (vrLine.length != 0)
	{
		var height = $(".post-box").height();
		vrLine.css('height', height);
	}
}

//fix comment-content width
function fixCommentContentWidth() {
	$(".comment-content").each(function(){
		var commentBoxWidth = $(this).parent(".comment-box").width();
		var commentContentWidth = $(this).outerWidth();
		
		$(this).css('width', commentBoxWidth - 101);
		
	});
}

//popup-form
function addEventsToPopupFormElements() {
	$(".popup-window div").each(function(){
		var elem = $(this).children()[1];
		
		elem.addEventListener('focus', function(){
			elem.parentNode.classList.add('focus');
		}, false);
		
		elem.addEventListener('blur', function(){
			elem.parentNode.classList.remove('focus');
			if (elem.value.length > 0)
			{
				elem.parentNode.classList.add('filled');
			}
			else
			{
				elem.parentNode.classList.remove('filled');
			}
		}, false);
	});
}

//rating
function findRatingValue(index) {
	
}