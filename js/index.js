/*********** 컨트롤러 ***********/
function init() {
	$.ajax({
		url: "http://webmir.co.kr/score/php/score_li.php",
		data: {user: 'booldook'},
		dataType: "json",
		success: getScore,
		error: err
	});
}

function getScore(res) {
	console.log(res);
	var html = '';
	for(var i in res.student) {
		html += '<tr>';
		html += '<td>'+res.student[i].id+'</td>';
		html += '<td>'+res.student[i].stdname+'</td>';
		html += '<td>'+res.student[i].kor+'</td>';
		html += '<td>'+res.student[i].eng+'</td>';
		html += '<td>'+res.student[i].math+'</td>';
		html += '<td>235</td>';
		html += '<td>75</td>';
		html += '<td>';
		html += '<button class="btn btn-primary btn-sm">수정</button>';
		html += '<button class="btn btn-danger btn-sm">삭제</button>';
		html += '</td>';
		html += '</tr>';
	}
	$(".score-tb").find("tbody").html(html);
}

function postScore(res) {
	if(res.code == 200) init();
	else alert("데이터 저장에 실패했습니다. 관리자에게 문의하세요.");
}

function err(xhr) {
	console.log(xhr);
}

$("#btSave").click(function(){
	$.ajax({
		url: "http://webmir.co.kr/score/php/score_in.php",
		type: "post",
		dataType: "json",
		data: {
			user: $("input[name='user']").val(),
			stdname: $("input[name='stdname']").val(),
			kor: $("input[name='kor']").val(),
			eng: $("input[name='eng']").val(),
			math: $("input[name='math']").val()
		},
		success: postScore,
		error: err
	});
});




/*********** 프로그램 시작 ***********/
init();