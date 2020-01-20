/*********** 컨트롤러 ***********/
function init() {
	$.ajax({
		url: "http://webmir.co.kr/score/php/score_li.php",
		success: getScore,
		error: err
	});
}

function getScore(res) {

}

function err(xhr) {
	
}






/*********** 프로그램 시작 ***********/
init();