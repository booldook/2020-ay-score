/* 
if(f.kor.value.trim() == "") {
	alert("국어점수를 입력하세요.");
	f.kor.focus();
	return false;
}
if(Number(f.kor.value) > 100 || Number(f.kor.value) < 0) {
	alert("국어점수를 올바르게 입력하세요. (0 ~ 100)");
	f.kor.focus();
	return false;
}
if(f.eng.value.trim() == "") {
	alert("영어점수를 입력하세요.");
	f.eng.focus();
	return false;
}
if(Number(f.eng.value) > 100 || Number(f.eng.value) < 0) {
	alert("영어점수를 올바르게 입력하세요. (0 ~ 100)");
	f.eng.focus();
	return false;
}
if(f.math.value.trim() == "") {
	alert("수학점수를 입력하세요.");
	f.math.focus();
	return false;
}
if(Number(f.math.value) > 100 || Number(f.math.value) < 0) {
	alert("수학점수를 올바르게 입력하세요. (0 ~ 100)");
	f.math.focus();
	return false;
} 
*/


$("#btSave").click(function() {
	var f = document.scoreForm;
	var user = f.user.value.trim();
	var stdname = f.stdname.value.trim();
	var score = [];
	var scoreName = [];
	if(stdname == "") {
		alert("학생이름을 입력하세요.");
		f.stdname.focus();
		return false;
	}

	for(var i=0; i<$(".score-input").length; i++) {
		score[i] = Number($(".score-input").eq(i).val().trim());
		scoreName[i] = $(".score-input").eq(i).attr("placeholder");
		if(score[i] == "" || score[i] < 0 || score[i] > 100) {
			alert(scoreName[i]+"점수를 올바르게 입력하세요 (0 ~ 100)");
			$(".score-input").eq(i).focus();
			return false;
		}
	}
	$.ajax({
		url: "http://webmir.co.kr/score/php/score_in.php",
		type: "post",
		dataType: "json",
		data: { 
			user: user, 
			stdname: stdname,
			kor: score[0], 
			eng: score[1], 
			math: score[2]
		},
		success: function(res){
			if(res.code == 200) init();
			else alert("저장에 실패하였습니다. 관리자에게 문의하세요.");
		},
		error: err
	});
});


function init() {
	$("#btChg").hide();
	$("#btReset").hide();
	$("#btSave").show();
	$("form[name='scoreForm']").find("input").each(function(i) {
		if(i>0) $(this).val(""); // f.input.value = ""
	});
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
		html += '<button class="btn btn-sm btn-primary" onclick="chg('+id+');">수정</button> ';
		html += '<button class="btn btn-sm btn-danger" onclick="del('+id+');">삭제</button> ';
		html += '</td>';
		html += '</tr>';
	}
	$(".score-tb").find("tbody").html(html);
}

function err(xhr) {
	console.log(xhr);
}

function del(id) {
	if(confirm("정말로 삭제하시겠습니까?")) {
		$.ajax({
			url: "http://webmir.co.kr/score/php/score_del.php",
			type: "post",
			dataType: "json",
			data: {
				id: id
			},
			error: err,
			success: function(res) {
				if(res.code == 200) init();
				else alert("삭제에 실패하였습니다. 관리자에게 문의하세요.");
			}
		});
	}
}

function chg(id) {
	$("#btSave").hide();
	$("#btChg").show();
	$("#btReset").show();
}

init();