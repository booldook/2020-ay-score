$("#btSave").click(function() {
	$.ajax({
		url: "http://webmir.co.kr/score/php/score_in.php",
		type: "post",
		dataType: "json",
		data: { 
			user: $("input[name='user']").val(), 
			kor: $("input[name='kor']").val(), 
			eng: $("input[name='eng']").val(), 
			math: $("input[name='math']").val(), 
			stdname: $("input[name='stdname']").val()
		},
		success: function(res){
			if(res.code == 200) init();
			else alert("저장에 실패하였습니다. 관리자에게 문의하세요.");
		},
		error: err
	});
});


function init() {
	$.ajax({
		url: "http://webmir.co.kr/score/php/score_li.php",
		type: "get",
		dataType: "json",
		data: { user: "booldook" },
		success: getScore,
		error: err
	});
}

function getScore(res) {
	console.log(res);
	var html = '', id, stdname, kor, eng, math, total, avg;
	for(var i in res.student) {
		id = res.student[i].id;
		stdname = res.student[i].stdname;
		kor = Number(res.student[i].kor);
		eng = Number(res.student[i].eng);
		math = Number(res.student[i].math);
		total = kor + eng + math;
		avg = (total/3).toFixed(2);
		html += '<tr>';
		html += '<td>'+id+'</td>';
		html += '<td>'+stdname+'</td>';
		html += '<td>'+kor+'</td>';
		html += '<td>'+eng+'</td>';
		html += '<td>'+math+'</td>';
		html += '<td>'+total+'</td>';
		html += '<td>'+avg+'</td>';
		html += '<td>';
		html += '<button class="btn btn-primary">수정</button> ';
		html += '<button class="btn btn-danger">삭제</button> ';
		html += '</td>';
		html += '</tr>';
	}
	$(".score-tb").find("tbody").html(html);
}

function err(xhr) {
	console.log(xhr);
}

init();