	var countdown,
		countDownDate = new Date("Jan 01, 1970 00:00:00").getTime();

	function beautifyCountdown(num){
		return num < 10 ? ('0' + num).toString() : num.toString();
	}

	function beautifyCountdownText(num,i){
		return num === 1 ? ['Day','Hour','Minute','Second'][i] : ['Days','Hours','Minutes','Seconds'][i]
	}

	function setCountdown(){
		countdown = setInterval(function() {
			var now = new Date().getTime(),
				interval = countDownDate - now,
				days = Math.floor(interval / (1000 * 60 * 60 * 24)),
				hours = Math.floor((interval % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
				minutes = Math.floor((interval % (1000 * 60 * 60)) / (1000 * 60)),
				seconds = Math.floor((interval % (1000 * 60)) / 1000);
			if (interval <= 0) {
				clearInterval(countdown);
			}
			else {
				$('.timer_days .value').text(beautifyCountdown(days));
				$('.timer_hours .value').text(beautifyCountdown(hours));
				$('.timer_minutes .value').text(beautifyCountdown(minutes));
				$('.timer_seconds .value').text(beautifyCountdown(seconds));
				$('.timer_days .text').text(beautifyCountdownText(days,0));
				$('.timer_hours .text').text(beautifyCountdownText(hours,1));
				$('.timer_minutes .text').text(beautifyCountdownText(minutes,2));
				$('.timer_seconds .text').text(beautifyCountdownText(seconds,3));
			}
		}, 1000);
	}
	setCountdown();

	$("[type='number']").keypress(function (e) {
		e.preventDefault();
	})

	$('.set_time > *').change(function(){
		if ($('#s_date').val() && $('#s_time').val()){
			countDownDate = new Date(""+$('#s_date').val() +" "+ $('#s_time').val()+"").getTime();
		}
		else {
			countDownDate = new Date("Jan 01, 2020 00:00:00").getTime();
		}
		clearInterval(countdown);
		setCountdown();
	});

	$('#s_theme').change(function (){
		$('.s_countdown').removeClass('s_light s_dark').addClass(''+$(this).val()+'');
	});

	$('#s_size').change(function (){
		$('.s_countdown').removeClass('s_big s_medium s_small').addClass(''+$(this).val()+'');
	});

	$('#s_assemble').click(function(){
		$('.s_wrapper').append('<script>var countdown; var countDownDate = '+countDownDate+';</script>');
		$('#s_output').val($('#wrap').html());
	});

	$('#s_copy').click(function () {
		var toCopy = $('#s_output')[0];
		toCopy.select();
		toCopy.setSelectionRange(0, 99999);
		document.execCommand("copy");
	});

	$('#s_bg').on('keypress focusout', function(){
		$('.s_countdown').css({
			'background': 'url("'+$(this).val()+'") no-repeat center top',
			'background-size':'cover'});
	});

	$('#s_head').on('keypress focusout', function(){
		$('.timer_header').text($(this).val());
	});

	$(document).ready(function(){
		$('input').val('');
		$('textarea').val('');
	});